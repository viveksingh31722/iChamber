'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refreshUser = async () => {
    try {
      const res = await api.get('/users/profile');
      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (credentials: any) => {
    const res = await api.post('/auth/login', credentials);
    if (res.data.success) {
      setUser(res.data.data.user);
      router.push('/');
    }
  };

  const logout = async () => {
    try {
      await api.get('/auth/logout');
    } finally {
      setUser(null);
      router.push('/login');
    }
  };

  const updateProfile = async (data: any) => {
    const res = await api.put('/users/profile', data);
    if (res.data.success) {
      setUser(res.data.data);
    }
  };

  const deleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This will permanently remove all your data.')) {
      await api.delete('/users/profile');
      setUser(null);
      router.push('/register');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, deleteAccount, updateProfile, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
