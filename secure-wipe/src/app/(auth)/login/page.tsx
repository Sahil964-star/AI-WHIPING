"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-warmBeige-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-xl bg-peach-500 flex items-center justify-center text-white font-bold text-2xl mx-auto shadow-soft-lg mb-4">
            SW
          </div>
          <h1 className="text-3xl font-bold text-darkBrown-800 tracking-tight">SecureWipe</h1>
          <p className="text-darkBrown-500 mt-2">Wipe. Verify. Certify. Protect.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-soft p-8">
          <h2 className="text-xl font-semibold text-darkBrown-800 mb-6">Welcome back</h2>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-darkBrown-600 mb-2">Email or Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-darkBrown-400" />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-warmBeige-200 rounded-lg focus:ring-2 focus:ring-peach-300 focus:border-peach-300 transition-colors bg-warmBeige-50 text-darkBrown-800 outline-none"
                  placeholder="admin@securewipe.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-darkBrown-600">Password</label>
                <Link href="#" className="text-sm font-medium text-peach-600 hover:text-peach-700">
                  Forgot password?
                </Link>
              </div>
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

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-warmBeige-300 text-peach-600 focus:ring-peach-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-darkBrown-600">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-peach-500 hover:bg-peach-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-peach-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Login'}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-darkBrown-500">
              Don't have an account?{' '}
              <Link href="/register" className="font-medium text-peach-600 hover:text-peach-700">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
