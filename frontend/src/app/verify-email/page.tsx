'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/utils/api';
import Container from '@/components/layout/Container';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email...');
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    
    const verify = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Invalid or missing verification token.');
        return;
      }
      
      hasFetched.current = true;

      try {
        // Backend expects :token param, but we have it as query param in frontend
        // We call the backend GET /api/auth/verify-email/:token
        const res = await api.get(`/auth/verify-email/${token}`);
        
        // Note: The backend controller actually redirects if called directly,
        // but since we are calling it via axios, we handle the redirect here.
        setStatus('success');
        setMessage('Email verified successfully! Redirecting to login...');
        
        setTimeout(() => {
          router.push('/login?verified=true');
        }, 3000);
      } catch (err: any) {
        setStatus('error');
        setMessage(err.response?.data?.error || 'Verification failed. The link may have expired.');
      }
    };

    verify();
  }, [token, router]);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50 flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto bg-white p-10 rounded-2xl shadow-xl text-center">
          {status === 'loading' && (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-6"></div>
              <h1 className="text-2xl font-bold text-primary">{message}</h1>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-primary mb-2">Verified!</h1>
              <p className="text-gray-600">{message}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-primary mb-2">Verification Failed</h1>
              <p className="text-gray-600 mb-8">{message}</p>
              <button 
                onClick={() => router.push('/register')}
                className="text-secondary font-bold hover:underline"
              >
                Go back to Registration
              </button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
