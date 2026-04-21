import crypto from 'crypto';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import PocketBase from 'pocketbase';
import tmdbRoutes from "./routes/tmdbRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();
const app = express();

const PORT = Number(process.env.PORT || 4000);
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
const POCKETBASE_URL = process.env.POCKETBASE_URL || 'http://127.0.0.1:8090';
const OTP_EXPIRY_MINUTES = Number(process.env.OTP_EXPIRY_MINUTES || 5);
const OTP_MAX_ATTEMPTS = Number(process.env.OTP_MAX_ATTEMPTS || 5);

const pb = new PocketBase(POCKETBASE_URL);
pb.autoCancellation(false);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE).toLowerCase() === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const fromAddress = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;
const fromName = process.env.SMTP_FROM_NAME || 'StreamVault';

const pendingLoginOtps = new Map();
const pendingSignupOtps = new Map();

app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());
app.use("/api/tmdb", tmdbRoutes);
app.use("/api/content", contentRoutes);
const hashOtp = (otp) => crypto.createHash('sha256').update(otp).digest('hex');

const createOtpCode = () => `${crypto.randomInt(0, 1000000)}`.padStart(6, '0');

const getExpiryTime = () => Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000;

const sanitizeRecord = (record) => {
  if (!record) return null;
  const data = typeof record.export === 'function' ? record.export() : record;
  return {
    id: data.id,
    collectionId: data.collectionId,
    collectionName: data.collectionName,
    username: data.username,
    email: data.email,
    name: data.name,
    role: data.role,
    avatar: data.avatar,
    created: data.created,
    updated: data.updated
  };
};

const sendOtpEmail = async ({ toEmail, subject, otpCode, intro }) => {
  await transporter.sendMail({
    from: `\"${fromName}\" <${fromAddress}>`,
    to: toEmail,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
        <h2 style="margin: 0 0 12px;">StreamVault Security Code</h2>
        <p style="margin: 0 0 16px;">${intro}</p>
        <div style="font-size: 30px; letter-spacing: 8px; font-weight: 700; margin: 18px 0;">${otpCode}</div>
        <p style="margin: 0 0 8px;">This code expires in ${OTP_EXPIRY_MINUTES} minutes.</p>
        <p style="margin: 0; color: #666; font-size: 14px;">If you did not request this code, you can ignore this email.</p>
      </div>
    `
  });
};

const ensureEmailPassword = (email, password) => {
  if (!email || !password) {
    return 'Email and password are required';
  }
  return null;
};

const ensureOtpReady = (entry, otp) => {
  if (!entry) {
    return 'OTP request not found or expired';
  }
  if (!otp) {
    return 'OTP is required';
  }
  if (Date.now() > entry.expiresAt) {
    return 'OTP has expired. Please request a new OTP';
  }
  if (entry.attempts >= OTP_MAX_ATTEMPTS) {
    return 'Too many invalid attempts. Please request a new OTP';
  }
  return null;
};

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/auth/login/request-otp', async (req, res) => {
  const { email, password } = req.body || {};
  const validationError = ensureEmailPassword(email, password);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const authData = await pb.collection('users').authWithPassword(email, password, { $autoCancel: false });
    const otpCode = createOtpCode();

    pendingLoginOtps.set(email.toLowerCase(), {
      otpHash: hashOtp(otpCode),
      expiresAt: getExpiryTime(),
      attempts: 0,
      token: authData.token,
      record: sanitizeRecord(authData.record)
    });

    await sendOtpEmail({
      toEmail: email,
      subject: 'Your StreamVault login OTP',
      otpCode,
      intro: 'Use this one-time code to complete your sign in.'
    });

    return res.json({ message: 'OTP sent successfully' });
  } catch {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
});

app.post('/auth/login/verify-otp', async (req, res) => {
  const { email, otp } = req.body || {};
  const key = (email || '').toLowerCase();
  const entry = pendingLoginOtps.get(key);

  const validationError = ensureOtpReady(entry, otp);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  if (entry.otpHash !== hashOtp(otp)) {
    entry.attempts += 1;
    pendingLoginOtps.set(key, entry);
    return res.status(400).json({ message: 'Invalid OTP code' });
  }

  pendingLoginOtps.delete(key);
  return res.json({ token: entry.token, record: entry.record });
});

app.post('/auth/signup/request-otp', async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body || {};

  if (!name || !email || !password || !passwordConfirm) {
    return res.status(400).json({ message: 'Name, email, password and confirm password are required' });
  }

  if (password !== passwordConfirm) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' });
  }

  try {
    await pb.collection('users').getFirstListItem(`email=\"${email}\"`, { $autoCancel: false });
    return res.status(409).json({ message: 'Email is already registered' });
  } catch {
    // User not found is expected for signup flow.
  }

  try {
    const otpCode = createOtpCode();
    pendingSignupOtps.set(email.toLowerCase(), {
      otpHash: hashOtp(otpCode),
      expiresAt: getExpiryTime(),
      attempts: 0,
      payload: {
        name,
        email,
        password,
        passwordConfirm
      }
    });

    await sendOtpEmail({
      toEmail: email,
      subject: 'Confirm your StreamVault registration',
      otpCode,
      intro: 'Use this OTP to confirm your email and create your account.'
    });

    return res.json({ message: 'Confirmation OTP sent successfully' });
  } catch {
    return res.status(500).json({ message: 'Failed to send confirmation OTP email' });
  }
});

app.post('/auth/signup/verify-otp', async (req, res) => {
  const { email, otp } = req.body || {};
  const key = (email || '').toLowerCase();
  const entry = pendingSignupOtps.get(key);

  const validationError = ensureOtpReady(entry, otp);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  if (entry.otpHash !== hashOtp(otp)) {
    entry.attempts += 1;
    pendingSignupOtps.set(key, entry);
    return res.status(400).json({ message: 'Invalid OTP code' });
  }

  try {
    const { name, email: signupEmail, password, passwordConfirm } = entry.payload;
    await pb.collection('users').create(
      {
        name,
        email: signupEmail,
        password,
        passwordConfirm,
        role: 'user'
      },
      { $autoCancel: false }
    );

    const authData = await pb.collection('users').authWithPassword(signupEmail, password, { $autoCancel: false });
    pendingSignupOtps.delete(key);

    return res.json({
      token: authData.token,
      record: sanitizeRecord(authData.record)
    });
  } catch {
    return res.status(500).json({ message: 'Failed to create account after OTP verification' });
  }
});

app.listen(PORT, () => {
  console.log(`OTP auth service running on http://localhost:${PORT}`);
});
