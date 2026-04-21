import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient';
import apiServerClient from '@/lib/apiServerClient';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const [otpId, setOtpId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (pb.authStore.isValid) {
            setCurrentUser(pb.authStore.model);
        }
        setInitialLoading(false);

        const unsubscribe = pb.authStore.onChange((token, model) => {
            setCurrentUser(model);
        });

        return () => unsubscribe();
    }, []);

    const parseApiError = async (response, fallbackMessage) => {
        let errorMessage = fallbackMessage;

        try {
            const body = await response.json();
            if (body?.message) {
                errorMessage = body.message;
            }
        } catch {
            // Ignore JSON parsing errors and keep fallback message.
        }

        throw new Error(errorMessage);
    };

    const login = async (email, password) => {
        const authData = await pb.collection('users').authWithPassword(email, password, { $autoCancel: false });
        setCurrentUser(authData.record);
        return authData;
    };

    const signup = async (name, email, password, passwordConfirm) => {
        const data = {
            name,
            email,
            password,
            passwordConfirm,
            role: 'user'
        };
        const record = await pb.collection('users').create(data, { $autoCancel: false });
        await login(email, password);
        return record;
    };

    const sendLoginOtp = async (email, password) => {
        const response = await apiServerClient.fetch('/auth/login/request-otp', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            await parseApiError(response, 'Unable to send login OTP');
        }

        return response.json();
    };

    const verifyLoginOtp = async (email, otp) => {
        const response = await apiServerClient.fetch('/auth/login/verify-otp', {
            method: 'POST',
            body: JSON.stringify({ email, otp })
        });

        if (!response.ok) {
            await parseApiError(response, 'Invalid login OTP');
        }

        const authData = await response.json();
        pb.authStore.save(authData.token, authData.record);
        setCurrentUser(authData.record);
        return authData;
    };

    const sendSignupOtp = async (name, email, password, passwordConfirm) => {
        const response = await apiServerClient.fetch('/auth/signup/request-otp', {
            method: 'POST',
            body: JSON.stringify({ name, email, password, passwordConfirm })
        });

        if (!response.ok) {
            await parseApiError(response, 'Unable to send signup OTP');
        }

        return response.json();
    };

    const verifySignupOtp = async (email, otp) => {
        const response = await apiServerClient.fetch('/auth/signup/verify-otp', {
            method: 'POST',
            body: JSON.stringify({ email, otp })
        });

        if (!response.ok) {
            await parseApiError(response, 'Invalid signup OTP');
        }

        const authData = await response.json();
        pb.authStore.save(authData.token, authData.record);
        setCurrentUser(authData.record);
        return authData;
    };

    const logout = () => {
        pb.authStore.clear();
        setCurrentUser(null);
        navigate('/');
    };

    const requestPasswordReset = async (email) => {
        const result = await pb.collection('users').requestOTP(email, { $autoCancel: false });
        setOtpId(result.otpId);
        return result;
    };

    const confirmPasswordReset = async (otpIdParam, code, newPassword, newPasswordConfirm) => {
        await pb.collection('users').confirmPasswordReset(
            otpIdParam,
            code,
            newPassword,
            newPasswordConfirm,
            { $autoCancel: false }
        );
    };

    const updateProfile = async (data) => {
        const updated = await pb.collection('users').update(currentUser.id, data, { $autoCancel: false });
        setCurrentUser(updated);
        return updated;
    };

    const isAuthenticated = !!currentUser;
    const userRole = currentUser?.role || 'user';
    const isAdmin = userRole === 'admin';

    const value = {
        currentUser,
        isAuthenticated,
        userRole,
        isAdmin,
        login,
        signup,
        sendLoginOtp,
        verifyLoginOtp,
        sendSignupOtp,
        verifySignupOtp,
        logout,
        requestPasswordReset,
        confirmPasswordReset,
        updateProfile,
        otpId,
        initialLoading
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};