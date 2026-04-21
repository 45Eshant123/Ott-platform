import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Film } from 'lucide-react';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const { signup, sendSignupOtp, verifySignupOtp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!otpSent && password !== passwordConfirm) {
            toast.error('Passwords do not match');
            return;
        }

        if (!otpSent && password.length < 8) {
            toast.error('Password must be at least 8 characters');
            return;
        }

        setLoading(true);

        try {
            if (!otpSent) {
                await sendSignupOtp(name, email, password, passwordConfirm);
                setOtpSent(true);
                toast('Confirmation OTP sent to your email');
            } else {
                await verifySignupOtp(email, otp);
                toast('Account created successfully');
                navigate('/');
            }
        } catch (error) {
            toast.error(error.message || 'Unable to complete signup');
        } finally {
            setLoading(false);
        }
    };

    const handleManualSignup = async () => {
        if (password !== passwordConfirm) {
            toast.error('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            toast.error('Password must be at least 8 characters');
            return;
        }

        setLoading(true);
        try {
            await signup(name, email, password, passwordConfirm);
            toast('Account created successfully');
            navigate('/');
        } catch (error) {
            toast.error(error.message || 'Failed to create account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Sign Up - StreamVault</title>
                <meta name="description" content="Create your StreamVault account and start streaming" />
            </Helmet>

            <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-flex items-center gap-2 mb-6">
                            <Film className="w-10 h-10 text-primary" />
                            <span className="font-display font-bold text-2xl text-foreground">StreamVault</span>
                        </Link>
                        <h1 className="font-display font-bold text-3xl mb-2 text-foreground">Create account</h1>
                        <p className="text-muted-foreground">Start your streaming journey today</p>
                    </div>

                    <div className="bg-card rounded-2xl p-8 shadow-lg">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="name" className="text-card-foreground">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    disabled={otpSent}
                                    className="mt-2 bg-background text-foreground"
                                    placeholder="Maya Chen"
                                />
                            </div>

                            <div>
                                <Label htmlFor="email" className="text-card-foreground">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={otpSent}
                                    className="mt-2 bg-background text-foreground"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div>
                                <Label htmlFor="password" className="text-card-foreground">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={8}
                                    disabled={otpSent}
                                    className="mt-2 bg-background text-foreground"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div>
                                <Label htmlFor="passwordConfirm" className="text-card-foreground">Confirm Password</Label>
                                <Input
                                    id="passwordConfirm"
                                    type="password"
                                    value={passwordConfirm}
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    required
                                    minLength={8}
                                    disabled={otpSent}
                                    className="mt-2 bg-background text-foreground"
                                    placeholder="••••••••"
                                />
                            </div>

                            {otpSent && (
                                <div>
                                    <Label htmlFor="otp" className="text-card-foreground">Confirmation OTP</Label>
                                    <Input
                                        id="otp"
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        required
                                        className="mt-2 bg-background text-foreground tracking-[0.4em]"
                                        placeholder="123456"
                                        maxLength={6}
                                    />
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : otpSent ? 'Verify OTP & Create Account' : 'Send Confirmation OTP'}
                            </Button>

                            {!otpSent && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    disabled={loading}
                                    onClick={handleManualSignup}
                                >
                                    Sign Up Without OTP
                                </Button>
                            )}

                            {otpSent && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    disabled={loading}
                                    onClick={() => {
                                        setOtpSent(false);
                                        setOtp('');
                                    }}
                                >
                                    Edit account details
                                </Button>
                            )}
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-muted-foreground">
                                Already have an account?{' '}
                                <Link to="/login" className="text-primary hover:underline font-medium">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignupPage;