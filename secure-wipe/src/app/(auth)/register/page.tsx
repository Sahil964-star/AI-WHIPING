"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, Building, Lock, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-warmBeige-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-xl bg-peach-500 flex items-center justify-center text-white font-bold text-2xl mx-auto shadow-soft-lg mb-4">
            SW
          </div>
          <h1 className="text-3xl font-bold text-darkBrown-800 tracking-tight">SecureWipe</h1>
          <p className="text-darkBrown-500 mt-2">Wipe. Verify. Certify. Protect.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-soft p-8">
          <h2 className="text-xl font-semibold text-darkBrown-800 mb-6">Create Account</h2>
          
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-darkBrown-600 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-darkBrown-400" />
                  </div>
                  <input
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-2.5 border border-warmBeige-200 rounded-lg focus:ring-2 focus:ring-peach-300 focus:border-peach-300 transition-colors bg-warmBeige-50 text-darkBrown-800 outline-none"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-darkBrown-600 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-darkBrown-400" />
                  </div>
                  <input
                    type="email"
                    required
                    className="block w-full pl-10 pr-3 py-2.5 border border-warmBeige-200 rounded-lg focus:ring-2 focus:ring-peach-300 focus:border-peach-300 transition-colors bg-warmBeige-50 text-darkBrown-800 outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-darkBrown-600 mb-2">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-darkBrown-400" />
                  </div>
                  <input
                    type="tel"
                    required
                    className="block w-full pl-10 pr-3 py-2.5 border border-warmBeige-200 rounded-lg focus:ring-2 focus:ring-peach-300 focus:border-peach-300 transition-colors bg-warmBeige-50 text-darkBrown-800 outline-none"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-darkBrown-600 mb-2">Organization</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-darkBrown-400" />
                  </div>
                  <input
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-2.5 border border-warmBeige-200 rounded-lg focus:ring-2 focus:ring-peach-300 focus:border-peach-300 transition-colors bg-warmBeige-50 text-darkBrown-800 outline-none"
                    placeholder="Company or Institution"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-darkBrown-600 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-darkBrown-400" />
                  </div>
                  <input
                    type="password"
                    required
                    className="block w-full pl-10 pr-3 py-2.5 border border-warmBeige-200 rounded-lg focus:ring-2 focus:ring-peach-300 focus:border-peach-300 transition-colors bg-warmBeige-50 text-darkBrown-800 outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-darkBrown-600 mb-2">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-darkBrown-400" />
                  </div>
                  <input
                    type="password"
                    required
                    className="block w-full pl-10 pr-3 py-2.5 border border-warmBeige-200 rounded-lg focus:ring-2 focus:ring-peach-300 focus:border-peach-300 transition-colors bg-warmBeige-50 text-darkBrown-800 outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-peach-500 hover:bg-peach-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-peach-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-darkBrown-500">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-peach-600 hover:text-peach-700">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
