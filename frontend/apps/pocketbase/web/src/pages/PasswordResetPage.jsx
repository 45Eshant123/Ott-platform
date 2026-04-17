import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Film, ArrowLeft } from 'lucide-react';

const PasswordResetPage = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const { requestPasswordReset, confirmPasswordReset, otpId } = useAuth();
    const navigate = useNavigate();

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await requestPasswordReset(email);
            toast('Verification code sent to your email');
            setStep(2);
        } catch (error) {
            toast.error(error.message || 'Failed to send verification code');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (newPassword !== newPasswordConfirm) {
            toast.error('Passwords do not match');
            return;
        }

        if (newPassword.length < 8) {
            toast.error('Password must be at least 8 characters');
            return;
        }

        setLoading(true);

        try {
            await confirmPasswordReset(otpId, code, newPassword, newPasswordConfirm);
            toast('Password reset successfully');
            navigate('/login');
        } catch (error) {
            toast.error(error.message || 'Invalid verification code');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Reset Password - StreamVault</title>
                <meta name="description" content="Reset your StreamVault account password" />
            </Helmet>

            <div className="min-h-screen bg-background flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-flex items-center gap-2 mb-6">
                            <Film className="w-10 h-10 text-primary" />
                            <span className="font-display font-bold text-2xl text-foreground">StreamVault</span>
                        </Link>
                        <h1 className="font-display font-bold text-3xl mb-2 text-foreground">Reset password</h1>
                        <p className="text-muted-foreground">
                            {step === 1 ? 'Enter your email to receive a verification code' : 'Enter the code and your new password'}
                        </p>
                    </div>

                    <div className="bg-card rounded-2xl p-8 shadow-lg">
                        {step === 1 ? (
                            <form onSubmit={handleRequestOTP} className="space-y-6">
                                <div>
                                    <Label htmlFor="email" className="text-card-foreground">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="mt-2 bg-background text-foreground"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? 'Sending code...' : 'Send verification code'}
                                </Button>
                            </form>
                        ) : (
                            <form onSubmit={handleResetPassword} className="space-y-6">
                                <div>
                                    <Label htmlFor="code" className="text-card-foreground">Verification Code</Label>
                                    <Input
                                        id="code"
                                        type="text"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        required
                                        maxLength={8}
                                        className="mt-2 bg-background text-foreground"
                                        placeholder="00000000"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Check your email for the 8-digit code
                                    </p>
                                </div>

                                <div>
                                    <Label htmlFor="newPassword" className="text-card-foreground">New Password</Label>
                                    <Input
                                        id="newPassword"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        minLength={8}
                                        className="mt-2 bg-background text-foreground"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="newPasswordConfirm" className="text-card-foreground">Confirm New Password</Label>
                                    <Input
                                        id="newPasswordConfirm"
                                        type="password"
                                        value={newPasswordConfirm}
                                        onChange={(e) => setNewPasswordConfirm(e.target.value)}
                                        required
                                        minLength={8}
                                        className="mt-2 bg-background text-foreground"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? 'Resetting password...' : 'Reset password'}
                                </Button>

                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="w-full"
                                    onClick={() => setStep(1)}
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back
                                </Button>
                            </form>
                        )}

                        <div className="mt-6 text-center">
                            <Link to="/login" className="text-sm text-primary hover:underline">
                                Back to sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PasswordResetPage;