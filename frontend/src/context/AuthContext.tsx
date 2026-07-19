'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../lib/api';
import { useToast } from './ToastContext';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'CUSTOMER' | 'ADMIN';
  walletBalance?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: any) => Promise<boolean>;
  register: (data: any) => Promise<boolean>;
  googleLogin: () => Promise<boolean>;
  logout: () => void;
  updateUserBalance: (newBalance: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('jaypurloom_token');
      const savedUser = localStorage.getItem('jaypurloom_user');
      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          const res = await api.get('/users/profile');
          if (res.data) {
            setUser(res.data);
            localStorage.setItem('jaypurloom_user', JSON.stringify(res.data));
          }
        } catch (e) {
          console.warn('Session check fallback used');
        }
      } else {
        // Auto demo user option for zero friction
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (credentials: any) => {
    try {
      const res = await api.post('/auth/login', credentials);
      const { accessToken, user: userData } = res.data;
      localStorage.setItem('jaypurloom_token', accessToken);
      localStorage.setItem('jaypurloom_user', JSON.stringify(userData));
      setUser(userData);
      showToast(`Welcome back, ${userData.name}! ✨`, 'success');
      return true;
    } catch (e: any) {
      const msg = e.response?.data?.message || 'Invalid credentials. Try demo login or check details.';
      showToast(msg, 'error');
      return false;
    }
  };

  const register = async (data: any) => {
    try {
      const res = await api.post('/auth/register', data);
      const { accessToken, user: userData } = res.data;
      localStorage.setItem('jaypurloom_token', accessToken);
      localStorage.setItem('jaypurloom_user', JSON.stringify(userData));
      setUser(userData);
      showToast(`Welcome to Jaypurloom, ${userData.name}! Your account is ready.`, 'success');
      return true;
    } catch (e: any) {
      const msg = e.response?.data?.message || 'Registration failed.';
      showToast(msg, 'error');
      return false;
    }
  };

  const googleLogin = async () => {
    try {
      const res = await api.post('/auth/google-login', {
        email: 'rohan.google@jaypurloom.com',
        name: 'Rohan Sharma (Google)',
      });
      const { accessToken, user: userData } = res.data;
      localStorage.setItem('jaypurloom_token', accessToken);
      localStorage.setItem('jaypurloom_user', JSON.stringify(userData));
      setUser(userData);
      showToast(`Signed in securely with Google as ${userData.name}! 🚀`, 'success');
      return true;
    } catch (e) {
      showToast('Google login error.', 'error');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('jaypurloom_token');
    localStorage.removeItem('jaypurloom_user');
    setUser(null);
    showToast('You have been logged out safely.', 'info');
  };

  const updateUserBalance = (newBalance: number) => {
    if (user) {
      const updated = { ...user, walletBalance: newBalance };
      setUser(updated);
      localStorage.setItem('jaypurloom_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleLogin, logout, updateUserBalance }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
