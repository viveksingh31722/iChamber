'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import api from '@/utils/api';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await api.post('/auth/register', formData);
      if (res.data.success) {
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-gray-50 flex items-center justify-center text-center px-6">
        <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-primary mb-4">Check Your Email</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            We&apos;ve sent a verification link to <span className="font-bold">{formData.email}</span>. 
            Once you verify your email, you can log in to your account.
          </p>
          <Link href="/login">
            <Button className="w-full py-4 text-lg">Continue to Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <Container>
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-primary mb-2 text-center">Create Account</h1>
            <p className="text-gray-500 text-center mb-8">Join the India Chamber platform</p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-secondary focus:border-transparent transition-all outline-none"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-secondary focus:border-transparent transition-all outline-none"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-secondary focus:border-transparent transition-all outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-secondary focus:border-transparent transition-all outline-none"
                  placeholder="At least 6 characters"
                  minLength={6}
                />
              </div>

              <div className="pt-2">
                <Button type="submit" className="w-full py-4 text-lg" disabled={submitting}>
                  {submitting ? 'Creating account...' : 'Create Account'}
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
              <p className="text-gray-500 text-sm">
                Already have an account?{' '}
                <Link href="/login" className="text-secondary font-bold hover:underline">
                  Log in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
