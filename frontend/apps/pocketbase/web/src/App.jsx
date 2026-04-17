import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext.jsx';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import HomePage from '@/pages/HomePage.jsx';
import LoginPage from '@/pages/LoginPage.jsx';
import SignupPage from '@/pages/SignupPage.jsx';
import PasswordResetPage from '@/pages/PasswordResetPage.jsx';
import CategoriesPage from '@/pages/CategoriesPage.jsx';
import SearchPage from '@/pages/SearchPage.jsx';
import ContentDetailPage from '@/pages/ContentDetailPage.jsx';
import VideoPlayerPage from '@/pages/VideoPlayerPage.jsx';
import ProfilePage from '@/pages/ProfilePage.jsx';
import WatchlistPage from '@/pages/WatchlistPage.jsx';
import HistoryPage from '@/pages/HistoryPage.jsx';
import AdminDashboard from '@/pages/AdminDashboard.jsx';
import LegalPage from '@/pages/LegalPage.jsx';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage.jsx';
import TermsOfServicePage from '@/pages/TermsOfServicePage.jsx';

function App() {
    return (
        <Router>
            <AuthProvider>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/password-reset" element={<PasswordResetPage />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/content/:id" element={<ContentDetailPage />} />
                    <Route path="/legal" element={<LegalPage />} />
                    <Route path="/privacy" element={<PrivacyPolicyPage />} />
                    <Route path="/terms" element={<TermsOfServicePage />} />
                    <Route
                        path="/watch/:id"
                        element={
                            <ProtectedRoute>
                                <VideoPlayerPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/watchlist"
                        element={
                            <ProtectedRoute>
                                <WatchlistPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/history"
                        element={
                            <ProtectedRoute>
                                <HistoryPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute requireAdmin>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={
                        <div className="min-h-screen bg-background flex items-center justify-center">
                            <div className="text-center">
                                <h1 className="font-display font-bold text-6xl text-foreground mb-4">404</h1>
                                <p className="text-muted-foreground mb-6">Page not found</p>
                                <a href="/" className="text-primary hover:underline">Back to home</a>
                            </div>
                        </div>
                    } />
                </Routes>
                <Toaster />
            </AuthProvider>
        </Router>
    );
}

export default App;