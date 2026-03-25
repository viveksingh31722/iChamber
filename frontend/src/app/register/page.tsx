'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import api from '@/utils/api';
import Navbar from '@/components/layout/Navbar';
import Button from '@/components/ui/Button';

// Placeholder for Google Icon
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

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
      <div className="min-h-screen bg-white font-sans flex flex-col">
        <Navbar />
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 pt-[72px] lg:pt-0">
          
          {/* Left Side: Illustration / Placeholder */}
          <div className="hidden lg:flex flex-col items-center justify-center bg-[##DBE2E6] p-12 relative overflow-hidden">
            <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center mix-blend-multiply">
              <img src="/auth-illustration.png" alt="Authentication Graphic" className="w-full h-auto object-contain" />
            </div>
          </div>

          {/* Right Side: Success Message */}
          <div className="flex flex-col items-center justify-center p-6 sm:p-12 lg:p-20 bg-white text-center">
            <div className="w-full max-w-md pt-10 lg:pt-0">     
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-4" style={{ color: '#0f172a' }}>Check Your Email</h1>
              <p className="text-gray-500 mb-8 leading-relaxed text-sm">
                We&apos;ve sent a verification link to <span className="font-bold text-gray-800">{formData.email}</span>. 
                Once you verify your email, you can log in to your account.
              </p>
              <Link href="/login">
                <Button 
                  className="w-full py-3.5 text-[15px] font-medium rounded-xl shadow-none" 
                  style={{ backgroundColor: '#002244', color: 'white' }}
                >
                  Continue to Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Navbar />
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 pt-[72px] lg:pt-0">
        
        {/* Left Side: Illustration / Placeholder */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-[#f4f6f8] p-12 relative overflow-hidden">
          <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center mix-blend-multiply">
            <img src="/auth-illustration.png" alt="Authentication Graphic" className="w-full h-auto object-contain" />
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex flex-col items-center justify-center p-6 sm:p-12 lg:p-20 bg-white">
          <div className="w-full max-w-md pt-10 lg:pt-0">     
            {/* Header Content */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold tracking-tight mb-2 uppercase" style={{ color: '#0f172a' }}>Create Account</h1>
              <p className="text-gray-500 text-sm">Create Signup</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-gray-800 mb-1.5">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#002244] focus:border-transparent transition-all outline-none text-sm bg-white"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-800 mb-1.5">Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#002244] focus:border-transparent transition-all outline-none text-sm bg-white"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-800 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#002244] focus:border-transparent transition-all outline-none text-sm bg-white"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-800 mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#002244] focus:border-transparent transition-all outline-none text-sm bg-white"
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-3">
                <Button 
                  type="submit" 
                  className="w-full py-3.5 text-[15px] font-medium rounded-xl shadow-none" 
                  style={{ backgroundColor: '#002244', color: 'white' }}
                  disabled={submitting}
                >
                  {submitting ? 'Creating account...' : 'Create Account'}
                </Button>
                
                {/* <button 
                  type="button" 
                  className="w-full flex items-center justify-center py-3.5 px-4 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium text-[15px] hover:bg-gray-50 transition-colors shadow-none"
                  onClick={() => alert("Google Sign-In logic goes here")}
                >
                  <GoogleIcon />
                  Sign up with Google
                </button> */}
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold transition-opacity hover:opacity-80" style={{ color: '#d97706' }}>
                  Log in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
