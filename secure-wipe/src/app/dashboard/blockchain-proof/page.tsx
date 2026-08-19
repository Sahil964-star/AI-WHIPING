"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Database, 
  Search, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowLeft, 
  ExternalLink, 
  ShieldCheck, 
  Boxes, 
  Cpu, 
  Layers,
  Code2
} from 'lucide-react';

const mockTxData = {
  txHash: '0x8f3c4e1b7a9d205f6e8b1a3c5d7f9e2a4b6c8d0e1f3a5b7c9d1e3f5a7b9c1d3e',
  blockNumber: '42,195,881',
  blockConfirmations: 256,
  timestamp: 'Aug 20, 2026 01:28:44 UTC (22 mins ago)',
  contractAddress: '0x71C8F5B85324D6392095f92275465C59F7d28820',
  contractName: 'SecureWipeRegistry.eth',
  gasUsed: '45,210 wei (0.0012 MATIC)',
  network: 'Polygon PoS Mainnet',
  chainIndex: 'ChainID: 137',
  merkleRoot: '0x99a4c871182ef0c0924b11f26a5c10291e1d3e8a7c2b4d6f8e0a2b4c6d8e0f1a',
  payload: {
    certificateId: 'SW-CERT-2026-8A9B',
    deviceId: 'DEV-1042',
    serialNumber: 'CN-0ABCDE-1042',
    assetId: 'AST-2026-0892',
    erasureStandard: 'NIST SP 800-88 Rev 1 (Purge)',
    passesCompleted: 1,
    residualEntropyRatio: '0.00000000',
    zeroEntropyProof: true,
    operatorId: 'OP-9482',
    facilityJurisdiction: 'GreenCycle Certified Sanitization Facility #4',
    complianceStandard: ['NIST-SP-800-88', 'ISO-IEC-27001', 'IEEE-2883-2022'],
    signedByAuthority: '0x35B891A9...84E1 (SecureWipe Verification Node #01)'
  }
};

export default function BlockchainProofPage() {
  const [searchTerm, setSearchTerm] = useState(mockTxData.txHash);
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedContract, setCopiedContract] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleCopy = (text: string, type: 'hash' | 'contract' | 'payload') => {
    navigator.clipboard.writeText(text);
    if (type === 'hash') {
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    } else if (type === 'contract') {
      setCopiedContract(true);
      setTimeout(() => setCopiedContract(false), 2000);
    } else if (type === 'payload') {
      setCopiedPayload(true);
      setTimeout(() => setCopiedPayload(false), 2000);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 400);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#381811] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#28110c] border border-[#461e15] flex items-center justify-center text-[#e07a52]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Blockchain Ledger Proof</h2>
              <p className="text-[#9e7669] text-xs sm:text-sm mt-0.5">
                Cryptographic verification of sanitization records on the Polygon Proof-of-Stake network.
              </p>
            </div>
          </div>
        </div>

        {/* Network Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#162718] border border-[#254625] text-emerald-400 text-xs font-semibold self-start sm:self-auto shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Polygon Mainnet Connected</span>
        </div>
      </div>

      {/* Explorer Search Bar */}
      <form onSubmit={handleSearch} className="bg-[#190906] border border-[#381811] rounded-2xl p-3 sm:p-4 shadow-xl flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Transaction Hash (0x...), Certificate ID, or Block Number..."
            className="w-full bg-[#120604] border border-[#381811] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-mono text-white placeholder:text-stone-600 focus:outline-none focus:border-[#e07a52] transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={isSearching}
          className="w-full sm:w-auto px-6 py-2.5 bg-[#d86b40] hover:bg-[#e07a52] text-[#190906] font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
        >
          <Search className="w-4 h-4" />
          <span>{isSearching ? 'Querying...' : 'Search'}</span>
        </button>
      </form>

      {/* Transaction Details Card */}
      <div className="bg-[#190906] border border-[#381811] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Card Header with Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#381811] gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-[#8c675c] font-semibold">Ledger Transaction</span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b2b1a] border border-[#2e522c] text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Success (Finalized)</span>
            </div>
          </div>
          <span className="text-xs text-[#8c675c] font-mono">{mockTxData.chainIndex}</span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-5 gap-x-6 text-xs">
          
          {/* Row 1: Tx Hash */}
          <div className="md:col-span-4 text-[#8c675c] font-medium flex items-center gap-1.5">
            <Boxes className="w-3.5 h-3.5 text-[#e07a52]" />
            <span>Transaction Hash:</span>
          </div>
          <div className="md:col-span-8 flex items-center gap-2 bg-[#120604] border border-[#2b120c] p-2.5 rounded-xl">
            <span className="font-mono text-stone-200 break-all select-all flex-1 text-xs">
              {mockTxData.txHash}
            </span>
            <button
              onClick={() => handleCopy(mockTxData.txHash, 'hash')}
              title="Copy Transaction Hash"
              className="p-1.5 rounded-lg bg-[#27100b] hover:bg-[#381811] text-stone-400 hover:text-white transition-colors border border-[#441d14] flex-shrink-0"
            >
              {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Row 2: Block Number */}
          <div className="md:col-span-4 text-[#8c675c] font-medium flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#e07a52]" />
            <span>Block Number:</span>
          </div>
          <div className="md:col-span-8 flex items-center gap-3 text-white font-mono">
            <span className="text-stone-200 font-semibold">{mockTxData.blockNumber}</span>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#25100a] text-[#e07a52] border border-[#441d14]">
              {mockTxData.blockConfirmations} Block Confirmations
            </span>
          </div>

          {/* Row 3: Timestamp */}
          <div className="md:col-span-4 text-[#8c675c] font-medium">
            <span>Timestamp:</span>
          </div>
          <div className="md:col-span-8 text-stone-300 font-mono">
            {mockTxData.timestamp}
          </div>

          {/* Row 4: Smart Contract */}
          <div className="md:col-span-4 text-[#8c675c] font-medium flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#e07a52]" />
            <span>Smart Contract:</span>
          </div>
          <div className="md:col-span-8 flex items-center gap-2">
            <span className="font-mono text-[#e07a52] font-semibold">{mockTxData.contractName}</span>
            <span className="text-[#8c675c] font-mono text-[11px]">({mockTxData.contractAddress})</span>
            <button
              onClick={() => handleCopy(mockTxData.contractAddress, 'contract')}
              title="Copy Contract Address"
              className="p-1 rounded bg-[#27100b] hover:bg-[#381811] text-stone-400 hover:text-white transition-colors border border-[#441d14]"
            >
              {copiedContract ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>

          {/* Row 5: Gas & Execution */}
          <div className="md:col-span-4 text-[#8c675c] font-medium">
            <span>Gas &amp; Network Fee:</span>
          </div>
          <div className="md:col-span-8 text-stone-300 font-mono">
            {mockTxData.gasUsed}
          </div>

        </div>

        {/* Immutable Payload Section (Raw JSON Data) */}
        <div className="pt-4 border-t border-[#381811] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#e07a52]" />
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                Immutable On-Chain Payload (State Log)
              </h3>
            </div>
            <button
              onClick={() => handleCopy(JSON.stringify(mockTxData.payload, null, 2), 'payload')}
              className="text-xs text-[#e07a52] hover:text-[#f09a75] flex items-center gap-1 transition-colors"
            >
              {copiedPayload ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPayload ? 'Copied Payload!' : 'Copy JSON'}</span>
            </button>
          </div>

          {/* Code Window */}
          <div className="bg-black rounded-2xl border border-[#2b120c] p-4 sm:p-5 font-mono text-xs overflow-x-auto shadow-inner">
            <pre className="text-stone-300 leading-relaxed">
              <code>
                <span className="text-stone-500">&#123;</span>
                {'\n  '}<span className="text-[#e07a52]">&quot;certificateId&quot;</span>: <span className="text-emerald-400">&quot;{mockTxData.payload.certificateId}&quot;</span>,
                {'\n  '}<span className="text-[#e07a52]">&quot;deviceId&quot;</span>: <span className="text-emerald-400">&quot;{mockTxData.payload.deviceId}&quot;</span>,
                {'\n  '}<span className="text-[#e07a52]">&quot;serialNumber&quot;</span>: <span className="text-emerald-400">&quot;{mockTxData.payload.serialNumber}&quot;</span>,
                {'\n  '}<span className="text-[#e07a52]">&quot;assetId&quot;</span>: <span className="text-emerald-400">&quot;{mockTxData.payload.assetId}&quot;</span>,
                {'\n  '}<span className="text-[#e07a52]">&quot;erasureStandard&quot;</span>: <span className="text-emerald-400">&quot;{mockTxData.payload.erasureStandard}&quot;</span>,
                {'\n  '}<span className="text-[#e07a52]">&quot;passesCompleted&quot;</span>: <span className="text-cyan-400">{mockTxData.payload.passesCompleted}</span>,
                {'\n  '}<span className="text-[#e07a52]">&quot;residualEntropyRatio&quot;</span>: <span className="text-emerald-400">&quot;{mockTxData.payload.residualEntropyRatio}&quot;</span>,
                {'\n  '}<span className="text-[#e07a52]">&quot;zeroEntropyProof&quot;</span>: <span className="text-amber-400">{String(mockTxData.payload.zeroEntropyProof)}</span>,
                {'\n  '}<span className="text-[#e07a52]">&quot;operatorId&quot;</span>: <span className="text-emerald-400">&quot;{mockTxData.payload.operatorId}&quot;</span>,
                {'\n  '}<span className="text-[#e07a52]">&quot;facilityJurisdiction&quot;</span>: <span className="text-emerald-400">&quot;{mockTxData.payload.facilityJurisdiction}&quot;</span>,
                {'\n  '}<span className="text-[#e07a52]">&quot;complianceStandard&quot;</span>: <span className="text-stone-400">[&quot;NIST-SP-800-88&quot;, &quot;ISO-IEC-27001&quot;, &quot;IEEE-2883-2022&quot;]</span>,
                {'\n  '}<span className="text-[#e07a52]">&quot;signedByAuthority&quot;</span>: <span className="text-emerald-400">&quot;{mockTxData.payload.signedByAuthority}&quot;</span>
                {'\n'}<span className="text-stone-500">&#125;</span>
              </code>
            </pre>
          </div>
        </div>

      </div>

      {/* Footer Navigation Back to Certificates */}
      <div className="flex items-center justify-between pt-2">
        <Link
          href="/dashboard/certificates"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#190906] hover:bg-[#250f0a] text-white font-medium text-xs sm:text-sm border border-[#381811] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#e07a52]" />
          <span>Back to Certificates</span>
        </Link>

        <Link
          href="/dashboard/qr-verification"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#d86b40] hover:bg-[#e07a52] text-[#190906] font-semibold text-xs sm:text-sm transition-colors shadow-md"
        >
          <span>Proceed to QR Verification</span>
        </Link>
      </div>

    </div>
  );
}
