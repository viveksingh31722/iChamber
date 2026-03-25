'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Container from '@/components/layout/Container';
import Navbar from '@/components/layout/Navbar';
import Button from '@/components/ui/Button';

export default function ProfilePage() {
  const { user, loading, updateProfile, logout, deleteAccount } = useAuth();
  const [formData, setFormData] = useState({ firstName: '', lastName: '' });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const router = useRouter();

  useEffect(() => {
    if (user) {
      setFormData({ firstName: user.firstName, lastName: user.lastName });
    } else if (!loading) {
      router.push('/register');
    }
  }, [user, loading, router]);

  if (loading || !user) return <div className="pt-40 text-center">Loading...</div>;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: '', text: '' });
    try {
      await updateProfile(formData);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <Navbar />
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-8 px-4">Account Settings</h1>
          
          <div className="grid md:grid-cols-3 gap-8 px-4">
            {/* Sidebar info */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                  {user.firstName[0]}{user.lastName[0]}
                </div>
                <h2 className="text-xl font-bold text-primary">{user.firstName} {user.lastName}</h2>
                <p className="text-gray-500 text-sm mb-6">{user.email}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-2 h-2 rounded-full ${user.isVerified ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    {user.isVerified ? 'Verified Account' : 'Pending Verification'}
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={logout} className="w-full">
                  Sign Out
                </Button>
              </div>

              <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                <h3 className="text-red-800 font-bold mb-2">Danger Zone</h3>
                <p className="text-red-600 text-xs mb-4 leading-relaxed">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button 
                  onClick={deleteAccount}
                  className="text-red-700 font-bold text-sm hover:underline"
                >
                  Delete Account
                </button>
              </div>
            </div>

            {/* Main profile form */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-primary mb-6">Personal Information</h3>
                
                {message.text && (
                  <div className={`mb-6 p-4 rounded-lg text-sm font-medium border ${
                    message.type === 'success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
                  }`}>
                    {message.text}
                  </div>
                )}

                <form onSubmit={handleUpdate} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">First Name</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">Last Name</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="opacity-60 bg-gray-50 p-4 rounded-xl border border-dashed border-gray-200">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email Address (Locked)</label>
                    <p className="text-primary font-medium">{user.email}</p>
                  </div>

                  <div className="pt-4">
                    <Button type="submit" disabled={submitting}>
                      {submitting ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                 <h3 className="text-xl font-bold text-primary mb-2">Security</h3>
                 <p className="text-gray-500 text-sm mb-6">Password management is coming soon.</p>
                 <Button variant="outline" disabled>Change Password</Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
