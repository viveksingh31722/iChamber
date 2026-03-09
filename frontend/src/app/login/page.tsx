'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login({ email, password });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <Container>
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-primary mb-2 text-center">Welcome Back</h1>
            <p className="text-gray-500 text-center mb-8">Sign in to manage your account</p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-secondary focus:border-transparent transition-all outline-none"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-secondary focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>

              <div className="pt-2">
                <Button type="submit" className="w-full py-4 text-lg" disabled={submitting}>
                  {submitting ? 'Signing in...' : 'Sign In'}
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
              <p className="text-gray-500 text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-secondary font-bold hover:underline">
                  Join India Chamber
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
