"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  HardDrive, 
  FileCheck2, 
  Boxes, 
  QrCode, 
  Lock, 
  Mail 
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('operator@greencycle.in');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-[#200c08] text-stone-200 relative flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-x-hidden font-sans selection:bg-[#e07a52] selection:text-[#180906]">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(235, 120, 80, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(235, 120, 80, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 py-6">
        
        {/* Left Column: Hero & Information */}
        <div className="lg:col-span-7 space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2a120d]/80 border border-[#4a2218] text-[#c9a69b] text-xs font-medium backdrop-blur-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#e07a52]" />
            <span>Smart India Hackathon prototype</span>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-white leading-[1.15]">
              Erase it. Prove it.
            </h1>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-[#e07a52] leading-[1.15]">
              Recycle with confidence.
            </h2>
          </div>

          {/* Subtext */}
          <p className="text-[#9e7669] text-base sm:text-lg leading-relaxed max-w-xl font-normal">
            SecureWipe is the certified data erasure console for retired laptops, desktops and phones — register the asset, wipe it, verify it and hand over tamper-evident proof.
          </p>

          {/* 2x2 Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-xl">
            {/* Card 1 */}
            <div className="bg-[#190906]/90 border border-[#381811] rounded-2xl p-5 hover:border-[#4d2319] transition-all">
              <div className="w-8 h-8 rounded-lg bg-[#27100b] border border-[#441d14] flex items-center justify-center text-[#e07a52] mb-3">
                <HardDrive className="w-4 h-4" />
              </div>
              <h3 className="text-white font-medium text-sm">Device registry</h3>
              <p className="text-xs text-[#8c675c] mt-1">Track every retired asset end to end</p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#190906]/90 border border-[#381811] rounded-2xl p-5 hover:border-[#4d2319] transition-all">
              <div className="w-8 h-8 rounded-lg bg-[#27100b] border border-[#441d14] flex items-center justify-center text-[#e07a52] mb-3">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <h3 className="text-white font-medium text-sm">Verified erasure</h3>
              <p className="text-xs text-[#8c675c] mt-1">Recovery checks before sign-off</p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#190906]/90 border border-[#381811] rounded-2xl p-5 hover:border-[#4d2319] transition-all">
              <div className="w-8 h-8 rounded-lg bg-[#27100b] border border-[#441d14] flex items-center justify-center text-[#e07a52] mb-3">
                <Boxes className="w-4 h-4" />
              </div>
              <h3 className="text-white font-medium text-sm">Blockchain proof</h3>
              <p className="text-xs text-[#8c675c] mt-1">Tamper-evident certificate ledger</p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#190906]/90 border border-[#381811] rounded-2xl p-5 hover:border-[#4d2319] transition-all">
              <div className="w-8 h-8 rounded-lg bg-[#27100b] border border-[#441d14] flex items-center justify-center text-[#e07a52] mb-3">
                <QrCode className="w-4 h-4" />
              </div>
              <h3 className="text-white font-medium text-sm">QR verification</h3>
              <p className="text-xs text-[#8c675c] mt-1">Scan to validate any certificate</p>
            </div>
          </div>
        </div>

        {/* Right Column: Authentication Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="w-full max-w-md bg-[#190906] border border-[#381811] rounded-3xl p-7 sm:p-9 shadow-2xl relative">
            
            {/* Header Icon */}
            <div className="w-11 h-11 rounded-2xl bg-[#28110c] border border-[#461e15] flex items-center justify-center text-[#e07a52] mb-6">
              <Lock className="w-5 h-5" />
            </div>

            {/* Form Title & Subtitle */}
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Welcome back
            </h2>
            <p className="text-xs text-[#8c675c] mt-1.5 mb-7">
              Sign in to your SecureWipe operator console.
            </p>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#ba9083] mb-1.5">
                  Email / Username
                </label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@greencycle.in"
                  className="w-full bg-[#120604] border border-[#3a1a13] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-[#5c352a] focus:outline-none focus:border-[#e07a52] focus:ring-1 focus:ring-[#e07a52] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#ba9083] mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#120604] border border-[#3a1a13] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-[#5c352a] focus:outline-none focus:border-[#e07a52] focus:ring-1 focus:ring-[#e07a52] transition-colors"
                />
              </div>

              {/* Options */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[#4a2218] bg-[#120604] text-[#e07a52] accent-[#e07a52] focus:ring-0 cursor-pointer"
                  />
                  <span className="text-xs text-[#ba9083]">Remember me</span>
                </label>

                <a 
                  href="#" 
                  onClick={(e) => e.preventDefault()}
                  className="text-xs text-[#e07a52] hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 bg-[#d86b40] hover:bg-[#e07a52] active:bg-[#c95f35] text-[#190906] font-semibold py-3 px-4 rounded-xl text-sm transition-all duration-150 shadow-md flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Login'}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-7 text-center space-y-4">
              <p className="text-xs text-[#8c675c]">
                New to SecureWipe?{' '}
                <Link href="/register" className="text-[#e07a52] font-medium hover:underline">
                  Create an account
                </Link>
              </p>

              {/* Demo Note */}
              <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-[#78544a]">
                <Mail className="w-3.5 h-3.5" />
                <span>Demo build — any valid email + 6 char password works.</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
