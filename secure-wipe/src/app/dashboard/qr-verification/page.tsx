"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  QrCode, 
  Camera, 
  Search, 
  CheckCircle2, 
  Upload, 
  FileBadge, 
  ShieldCheck, 
  Laptop, 
  RotateCcw, 
  Loader2,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';

export default function QrVerificationPage() {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'verified'>('idle');

  const handleSimulateScan = () => {
    setScanState('scanning');
    setTimeout(() => {
      setScanState('verified');
    }, 2000);
  };

  const handleReset = () => {
    setScanState('idle');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#381811] pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#28110c] border border-[#461e15] flex items-center justify-center text-[#e07a52]">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">QR Asset Verification</h2>
            <p className="text-[#9e7669] text-xs sm:text-sm mt-0.5">
              Scan physical device QR tags to instantly verify on-chain sanitization provenance.
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2a120d] border border-[#4a2218] text-[#c9a69b] text-xs font-medium self-start sm:self-auto">
          <Camera className="w-3.5 h-3.5 text-[#e07a52]" />
          <span>Optical Lens Active</span>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Scanner Viewport */}
        <div className="lg:col-span-6 bg-[#190906] border border-[#381811] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#381811] pb-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider">
              <Camera className="w-4 h-4 text-[#e07a52]" />
              <span>Live Sensor Feed</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              1080p • 60 FPS
            </span>
          </div>

          {/* Camera Viewfinder Container */}
          <div className="relative aspect-square sm:aspect-[4/3] w-full bg-[#0a0302] rounded-2xl border-2 border-[#3d1a12] overflow-hidden flex items-center justify-center shadow-inner">
            
            {/* Viewfinder Grid Overlay */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(224, 122, 82, 0.2) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(224, 122, 82, 0.2) 1px, transparent 1px)
                `,
                backgroundSize: '24px 24px',
              }}
            />

            {/* Target Reticle Frame */}
            <div className="relative w-52 h-52 sm:w-60 sm:h-60 border-2 border-[#e07a52]/40 rounded-2xl p-4 flex flex-col items-center justify-center">
              {/* Corner Accents */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-[#e07a52] rounded-tl-lg" />
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-[#e07a52] rounded-tr-lg" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-[#e07a52] rounded-bl-lg" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-[#e07a52] rounded-br-lg" />

              {/* Sample QR Graphic */}
              <div className="w-36 h-36 bg-[#1a0c09] border border-[#4a2218] rounded-xl p-3 flex flex-col items-center justify-center text-[#e07a52] shadow-md relative">
                <QrCode className="w-24 h-24 stroke-1" />
                <span className="text-[9px] font-mono text-[#8c675c] mt-1">SW-CERT-2026-8A9B</span>
              </div>

              {/* Animated Laser Scanning Line */}
              {scanState === 'scanning' && (
                <div className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-[#e07a52] to-transparent shadow-[0_0_15px_#e07a52] animate-bounce" />
              )}
            </div>

            {/* Viewfinder Status Footer */}
            <div className="absolute bottom-3 inset-x-3 py-1.5 px-3 rounded-xl bg-[#140604]/80 backdrop-blur-sm border border-[#381811] flex items-center justify-between text-[11px] text-[#8c675c]">
              <span>Align QR code inside box</span>
              <span className="font-mono text-stone-300">
                {scanState === 'scanning' ? 'DECODING...' : scanState === 'verified' ? 'MATCH FOUND' : 'AUTO-FOCUS'}
              </span>
            </div>
          </div>

          {/* Scanner Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              onClick={handleSimulateScan}
              disabled={scanState === 'scanning'}
              className="flex-1 bg-[#d86b40] hover:bg-[#e07a52] active:bg-[#c95f35] text-[#190906] font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {scanState === 'scanning' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Decoding Payload...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Simulate Device Scan</span>
                </>
              )}
            </button>

            <button
              onClick={handleSimulateScan}
              disabled={scanState === 'scanning'}
              className="px-4 py-3 bg-[#190906] hover:bg-[#250f0a] text-[#c9a69b] hover:text-white rounded-xl text-xs sm:text-sm border border-[#381811] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Image</span>
            </button>
          </div>
        </div>

        {/* Right Column: Scan Results */}
        <div className="lg:col-span-6">
          {scanState === 'idle' || scanState === 'scanning' ? (
            /* Awaiting Scan Placeholder */
            <div className="bg-[#190906] border border-[#381811] rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col items-center justify-center text-center min-h-[460px] space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#28110c] border border-[#461e15] flex items-center justify-center text-[#e07a52] mb-2">
                {scanState === 'scanning' ? (
                  <Loader2 className="w-8 h-8 animate-spin" />
                ) : (
                  <Search className="w-8 h-8" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-white">
                {scanState === 'scanning' ? 'Reading Cryptographic Tag...' : 'Awaiting Tag Detection'}
              </h3>
              <p className="text-xs text-[#8c675c] max-w-sm leading-relaxed">
                {scanState === 'scanning'
                  ? 'Connecting to the Polygon network node to verify hash matching and zero-remanence signatures...'
                  : 'Position any SecureWipe physical QR sticker in front of your camera or click "Simulate Device Scan".'}
              </p>
            </div>
          ) : (
            /* Verified Asset Result Card */
            <div className="bg-[#190906] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fadeIn relative overflow-hidden">
              
              {/* Glowing Accent */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Status Header */}
              <div className="flex items-center justify-between border-b border-[#381811] pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#172d1a] border border-[#27532b] flex items-center justify-center text-emerald-400 shadow-md">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">Valid Sanitization Certificate</h3>
                    <p className="text-xs text-emerald-400 font-medium">100% Cryptographic Match Confirmed</p>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  title="Scan Another"
                  className="p-2 rounded-xl bg-[#240e09] hover:bg-[#381811] text-[#c9a69b] border border-[#441d14] transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Asset Details Table */}
              <div className="space-y-3 bg-[#120604] border border-[#2b120c] rounded-2xl p-4 sm:p-5 text-xs">
                <div className="flex justify-between border-b border-[#220d08] pb-2.5">
                  <span className="text-[#8c675c]">Certificate ID:</span>
                  <span className="text-white font-mono font-semibold">SW-CERT-2026-8A9B</span>
                </div>
                <div className="flex justify-between border-b border-[#220d08] pb-2.5">
                  <span className="text-[#8c675c]">Target Asset:</span>
                  <span className="text-white font-medium">Dell Latitude 5420</span>
                </div>
                <div className="flex justify-between border-b border-[#220d08] pb-2.5">
                  <span className="text-[#8c675c]">Serial Number:</span>
                  <span className="text-stone-300 font-mono">CN-0ABCDE-1042</span>
                </div>
                <div className="flex justify-between border-b border-[#220d08] pb-2.5">
                  <span className="text-[#8c675c]">Erasure Protocol:</span>
                  <span className="text-white">NIST SP 800-88 Rev 1 (Purge)</span>
                </div>
                <div className="flex justify-between border-b border-[#220d08] pb-2.5">
                  <span className="text-[#8c675c]">Sanitization Date:</span>
                  <span className="text-stone-300 font-mono">2026-08-20 01:28:44 UTC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8c675c]">Ledger State:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Polygon Block #42,195,881
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <Link
                  href="/dashboard/certificates"
                  className="w-full bg-[#d86b40] hover:bg-[#e07a52] text-[#190906] font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <FileBadge className="w-4 h-4" />
                  <span>View Full Certificate</span>
                </Link>

                <button
                  onClick={handleReset}
                  className="w-full bg-[#190906] hover:bg-[#250f0a] text-stone-300 font-medium py-2.5 px-4 rounded-xl text-xs sm:text-sm border border-[#381811] transition-colors flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#e07a52]" />
                  <span>Scan Next Device</span>
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
