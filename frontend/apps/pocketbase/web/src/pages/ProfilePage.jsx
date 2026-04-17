import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { toast } from 'sonner';

const ProfilePage = () => {
    const { currentUser, updateProfile } = useAuth();
    const [name, setName] = useState(currentUser?.name || '');
    const [preferredLanguage, setPreferredLanguage] = useState(currentUser?.preferredLanguage || 'English');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await updateProfile({
                name,
                preferredLanguage
            });
            toast('Profile updated successfully');
        } catch (error) {
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Profile - StreamVault</title>
                <meta name="description" content="Manage your StreamVault profile settings" />
            </Helmet>

            <div className="min-h-screen bg-background">
                <Header />

                <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="font-display font-bold text-4xl md:text-5xl mb-8 text-foreground" style={{ letterSpacing: '-0.02em' }}>
                        Profile settings
                    </h1>

                    <div className="bg-card rounded-2xl p-8 shadow-lg">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="email" className="text-card-foreground">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={currentUser?.email || ''}
                                    disabled
                                    className="mt-2 bg-muted text-muted-foreground"
                                />
                                <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                            </div>

                            <div>
                                <Label htmlFor="name" className="text-card-foreground">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-2 bg-background text-foreground"
                                />
                            </div>

                            <div>
                                <Label htmlFor="language" className="text-card-foreground">Preferred Language</Label>
                                <Select value={preferredLanguage} onValueChange={setPreferredLanguage}>
                                    <SelectTrigger className="mt-2 bg-background text-foreground">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="English">English</SelectItem>
                                        <SelectItem value="Hindi">Hindi</SelectItem>
                                        <SelectItem value="Spanish">Spanish</SelectItem>
                                        <SelectItem value="Japanese">Japanese</SelectItem>
                                        <SelectItem value="Korean">Korean</SelectItem>
                                        <SelectItem value="French">French</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="pt-4">
                                <Button type="submit" disabled={loading}>
                                    {loading ? 'Saving...' : 'Save changes'}
                                </Button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-8 bg-card rounded-2xl p-8 shadow-lg">
                        <h2 className="font-display font-semibold text-xl mb-4 text-card-foreground">Account Information</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Account Type</span>
                                <span className="text-card-foreground font-medium">
                                    {currentUser?.role === 'admin' ? 'Admin' : 'User'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Member Since</span>
                                <span className="text-card-foreground font-medium">
                                    {new Date(currentUser?.created).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default ProfilePage;