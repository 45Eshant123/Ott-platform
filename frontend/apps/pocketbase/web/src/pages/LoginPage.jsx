import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Film } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login, sendLoginOtp, verifyLoginOtp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!otpSent) {
                await sendLoginOtp(email, password);
                setOtpSent(true);
                toast('OTP sent to your email');
            } else {
                await verifyLoginOtp(email, otp);
                toast('Welcome back');
                navigate('/');
            }
        } catch (error) {
            toast.error(error.message || 'Unable to complete sign in');
        } finally {
            setLoading(false);
        }
    };

    const handleManualLogin = async () => {
        setLoading(true);
        try {
            await login(email, password);
            toast('Welcome back');
            navigate('/');
        } catch (error) {
            toast.error(error.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Sign In - StreamVault</title>
                <meta name="description" content="Sign in to your StreamVault account to continue watching" />
            </Helmet>

            <div className="min-h-screen bg-background flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-flex items-center gap-2 mb-6">
                            <Film className="w-10 h-10 text-primary" />
                            <span className="font-display font-bold text-2xl text-foreground">StreamVault</span>
                        </Link>
                        <h1 className="font-display font-bold text-3xl mb-2 text-foreground">Welcome back</h1>
                        <p className="text-muted-foreground">Sign in to continue watching</p>
                    </div>

                    <div className="bg-card rounded-2xl p-8 shadow-lg">
                        <form onSubmit={handleSubmit} className="space-y-6">
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

                            <div>
                                <Label htmlFor="password" className="text-card-foreground">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="mt-2 bg-background text-foreground"
                                    placeholder="••••••••"
                                />
                            </div>

                            {otpSent && (
                                <div>
                                    <Label htmlFor="otp" className="text-card-foreground">Email OTP</Label>
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

                            <div className="flex items-center justify-between">
                                <Link to="/password-reset" className="text-sm text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : otpSent ? 'Verify OTP & Sign In' : 'Send OTP'}
                            </Button>

                            {!otpSent && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    disabled={loading}
                                    onClick={handleManualLogin}
                                >
                                    Sign In With Password
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
                                    Change email or password
                                </Button>
                            )}
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-muted-foreground">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-primary hover:underline font-medium">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;