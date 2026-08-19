"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Download, 
  Link as LinkIcon, 
  QrCode, 
  Copy, 
  Check, 
  FileBadge, 
  Award,
  Cpu,
  Laptop,
  User,
  Calendar,
  ExternalLink
} from 'lucide-react';

interface CertificateData {
  certId: string;
  deviceName: string;
  serialNumber: string;
  assetId: string;
  algorithm: string;
  passes: string;
  sanitizationLevel: string;
  timestamp: string;
  operator: string;
  operatorId: string;
  organization: string;
  blockHash: string;
  blockNumber: string;
}

const mockCertificates: CertificateData[] = [
  {
    certId: 'SW-CERT-2026-8A9B',
    deviceName: 'Dell Latitude 5420',
    serialNumber: 'CN-0ABCDE-1042',
    assetId: 'AST-2026-0892',
    algorithm: 'NIST SP 800-88 Rev 1 (Purge)',
    passes: '1-Pass Cryptographic Erase + Sector Zero-Fill',
    sanitizationLevel: 'Purge (Permanent Non-Recoverable)',
    timestamp: '2026-08-20 01:28:44 UTC',
    operator: 'John Doe',
    operatorId: 'OP-9482',
    organization: 'GreenCycle Certified Sanitization Facility #4',
    blockHash: '0x8f3c4e1b7a9d205f6e8b1a3c5d7f9e2a4b6c8d0e1f3a5b7c9d1e3f5a7b9c1d3e',
    blockNumber: '#19,482,109 (Polygon L2 / Ethereum Anchor)',
  },
  {
    certId: 'SW-CERT-2026-9C4D',
    deviceName: 'Apple MacBook Pro M1',
    serialNumber: 'C02F12341150',
    assetId: 'AST-2026-0914',
    algorithm: 'IEEE 2883-2022',
    passes: 'Cryptographic Key Shredding',
    sanitizationLevel: 'Purge (Physical Controller Wipe)',
    timestamp: '2026-08-19 18:14:02 UTC',
    operator: 'Sarah Connor',
    operatorId: 'OP-7731',
    organization: 'SecureWipe Central Processing Hub',
    blockHash: '0x3a9b2c5d7e1f4a8b0c2e6d8f1a3b5c7e9f0a2b4c6d8e0f1a3b5c7e9d1f3a5b7c',
    blockNumber: '#19,481,854 (Polygon L2 / Ethereum Anchor)',
  },
];

export default function CertificatesPage() {
  const [selectedCertIndex, setSelectedCertIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const cert = mockCertificates[selectedCertIndex];

  const handleCopyHash = () => {
    navigator.clipboard.writeText(cert.blockHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Sanitization Certificates</h2>
          <p className="text-[#9e7669] text-sm mt-1">
            Immutable, audit-ready compliance records of verified hardware data destruction.
          </p>
        </div>

        {/* Certificate Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#8c675c]">Select Record:</span>
          <select
            value={selectedCertIndex}
            onChange={(e) => setSelectedCertIndex(Number(e.target.value))}
            className="bg-[#190906] border border-[#381811] text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-[#e07a52] cursor-pointer"
          >
            {mockCertificates.map((c, idx) => (
              <option key={c.certId} value={idx}>
                {c.certId} — {c.deviceName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Certificate Document Card */}
      <div className="relative bg-[#180906] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border-2 border-[#e07a52]/30 overflow-hidden backdrop-blur-sm">
        
        {/* Glowing Ambient Corners */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#e07a52]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#e07a52]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Outer Fine Border Overlay */}
        <div className="border border-[#461e15] rounded-2xl p-6 sm:p-8 relative z-10 bg-[#140604]/80">
          
          {/* Certificate Header Banner */}
          <div className="flex flex-col md:flex-row items-center justify-between border-b border-[#381811] pb-8 mb-8 gap-6 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#28110c] border border-[#e07a52]/40 flex items-center justify-center text-[#e07a52] shadow-lg flex-shrink-0">
                <ShieldCheck className="w-9 h-9" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#e07a52] font-semibold">
                  Tamper-Evident Digital Proof
                </span>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide mt-0.5">
                  CERTIFICATE OF DATA ERASURE
                </h1>
                <p className="text-xs text-[#8c675c] mt-0.5">
                  Compliant with NIST SP 800-88 &amp; ISO/IEC 27001 Data Sanitization Standards
                </p>
              </div>
            </div>

            {/* Certificate ID Pill */}
            <div className="flex flex-col items-center md:items-end">
              <span className="text-[11px] text-[#8c675c] font-medium">Certificate Identifier</span>
              <div className="mt-1 px-3.5 py-1.5 rounded-xl bg-[#240e09] border border-[#482017] text-white font-mono text-sm font-semibold tracking-wider">
                {cert.certId}
              </div>
              <span className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Cryptographically Verified
              </span>
            </div>
          </div>

          {/* Certificate Details 3-Column / 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            
            {/* Box 1: Device Information */}
            <div className="bg-[#190906] border border-[#351811] rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#e07a52] uppercase tracking-wider">
                <Laptop className="w-4 h-4" />
                <span>Sanitized Asset Details</span>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-[#2b120c] pb-2">
                  <span className="text-[#8c675c]">Hardware Model:</span>
                  <span className="text-white font-medium">{cert.deviceName}</span>
                </div>
                <div className="flex justify-between border-b border-[#2b120c] pb-2">
                  <span className="text-[#8c675c]">Serial Number:</span>
                  <span className="text-stone-300 font-mono">{cert.serialNumber}</span>
                </div>
                <div className="flex justify-between border-b border-[#2b120c] pb-2">
                  <span className="text-[#8c675c]">Internal Asset ID:</span>
                  <span className="text-stone-300 font-mono">{cert.assetId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8c675c]">Destruction State:</span>
                  <span className="text-emerald-400 font-medium">{cert.sanitizationLevel}</span>
                </div>
              </div>
            </div>

            {/* Box 2: Erasure Protocol & Standards */}
            <div className="bg-[#190906] border border-[#351811] rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#e07a52] uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                <span>Erasure Specifications</span>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-[#2b120c] pb-2">
                  <span className="text-[#8c675c]">Protocol Standard:</span>
                  <span className="text-white font-medium">{cert.algorithm}</span>
                </div>
                <div className="flex justify-between border-b border-[#2b120c] pb-2">
                  <span className="text-[#8c675c]">Execution Passes:</span>
                  <span className="text-stone-300">{cert.passes}</span>
                </div>
                <div className="flex justify-between border-b border-[#2b120c] pb-2">
                  <span className="text-[#8c675c]">Residual Entropy:</span>
                  <span className="text-emerald-400 font-mono">0.00000000 (Zero Remanence)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8c675c]">Completed At:</span>
                  <span className="text-stone-300 font-mono">{cert.timestamp}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Box 3: Operator & Authority */}
          <div className="bg-[#190906] border border-[#351811] rounded-2xl p-5 mb-8">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#e07a52] uppercase tracking-wider mb-4">
              <User className="w-4 h-4" />
              <span>Certified Operator &amp; Facility</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-[#8c675c] block">Authorized Technician:</span>
                <span className="text-white font-medium mt-0.5 block">{cert.operator}</span>
              </div>
              <div>
                <span className="text-[#8c675c] block">Operator Badge:</span>
                <span className="text-stone-300 font-mono mt-0.5 block">{cert.operatorId}</span>
              </div>
              <div>
                <span className="text-[#8c675c] block">Facility Jurisdiction:</span>
                <span className="text-stone-300 mt-0.5 block truncate">{cert.organization}</span>
              </div>
            </div>
          </div>

          {/* Cryptographic Ledger Block */}
          <div className="bg-[#0f0402] border border-[#33140d] rounded-2xl p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <LinkIcon className="w-3.5 h-3.5 text-[#e07a52]" />
                <span className="text-xs font-semibold text-white uppercase tracking-wider">
                  Blockchain Verification Hash (SHA-256)
                </span>
              </div>
              <span className="text-[11px] text-[#8c675c] font-mono">{cert.blockNumber}</span>
            </div>

            <div className="flex items-center gap-3 bg-[#190906] border border-[#2b120c] rounded-xl p-3">
              <p className="font-mono text-xs text-[#d87d5b] break-all select-all flex-1">
                {cert.blockHash}
              </p>
              <button
                onClick={handleCopyHash}
                title="Copy Hash"
                className="p-2 rounded-lg bg-[#27100b] hover:bg-[#381811] text-[#c9a69b] hover:text-white transition-colors border border-[#441d14] flex-shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 pt-2">
        {/* Button 1: Download PDF */}
        <button
          onClick={handleDownloadPdf}
          disabled={isDownloading}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#d86b40] hover:bg-[#e07a52] text-[#190906] font-semibold text-sm transition-all shadow-lg shadow-[#d86b40]/10 disabled:opacity-75 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>{isDownloading ? 'Generating PDF...' : downloadSuccess ? 'PDF Downloaded!' : 'Download Certified PDF'}</span>
        </button>

        {/* Button 2: View Blockchain Proof */}
        <Link
          href="/dashboard/blockchain-proof"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#190906] hover:bg-[#250f0a] text-white font-medium text-sm border border-[#381811] transition-colors"
        >
          <LinkIcon className="w-4 h-4 text-[#e07a52]" />
          <span>View Blockchain Proof</span>
        </Link>

        {/* Button 3: QR Verification */}
        <Link
          href="/dashboard/qr-verification"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#190906] hover:bg-[#250f0a] text-white font-medium text-sm border border-[#381811] transition-colors"
        >
          <QrCode className="w-4 h-4 text-[#e07a52]" />
          <span>QR Verification</span>
        </Link>
      </div>

    </div>
  );
}
