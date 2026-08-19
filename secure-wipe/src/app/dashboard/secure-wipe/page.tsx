"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Sliders, 
  Terminal as TerminalIcon, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  FileBadge, 
  ShieldAlert, 
  Cpu, 
  HardDrive,
  Loader2
} from 'lucide-react';

interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'warn' | 'success' | 'process';
}

const mockDevices = [
  { id: 'DEV-1042', name: 'Dell Latitude 5420', serial: 'CN-0ABCDE-1042', type: 'Laptop', storage: '512 GB NVMe SSD' },
  { id: 'DEV-1088', name: 'Lenovo ThinkPad T14', serial: 'PF-29X88-1088', type: 'Laptop', storage: '1 TB PCIe Gen4 SSD' },
  { id: 'DEV-1104', name: 'Samsung Galaxy S22', serial: '358941011104', type: 'Smartphone', storage: '256 GB UFS 3.1' },
  { id: 'DEV-1150', name: 'Apple MacBook Pro M1', serial: 'C02F12341150', type: 'Laptop', storage: '512 GB APFS SSD' },
  { id: 'DEV-1192', name: 'HP EliteDesk 800 G6', serial: '2UA011192X', type: 'Desktop PC', storage: '2 TB SATA HDD' },
];

const wipeAlgorithms = [
  { id: 'nist-clear', name: 'NIST SP 800-88 Rev 1 (Clear)', passes: '1-Pass Zero Fill', desc: 'Logical overwrite of all addressable storage locations.' },
  { id: 'nist-purge', name: 'NIST SP 800-88 Rev 1 (Purge)', passes: 'Cryptographic Erase', desc: 'Sanitization via cryptographic key destruction & ATA Secure Erase.' },
  { id: 'dod-5220', name: 'DoD 5220.22-M (3-Pass)', passes: '3-Pass Overwrite', desc: 'Pass 1: Fixed Char, Pass 2: Complement, Pass 3: Random bits.' },
  { id: 'ieee-2883', name: 'IEEE 2883-2022', passes: 'Multi-Pass Purge', desc: 'Modern global standard for magnetic, flash and hybrid solid state media.' },
];

export default function SecureWipeConsole() {
  const [selectedDevice, setSelectedDevice] = useState(mockDevices[0].id);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(wipeAlgorithms[0].id);
  const [isWiping, setIsWiping] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const activeDeviceObj = mockDevices.find(d => d.id === selectedDevice) || mockDevices[0];
  const activeAlgoObj = wipeAlgorithms.find(a => a.id === selectedAlgorithm) || wipeAlgorithms[0];

  // Auto scroll terminal to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (message: string, type: 'info' | 'warn' | 'success' | 'process' = 'info') => {
    const now = new Date();
    const timestamp = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
    setLogs(prev => [...prev, { timestamp, message, type }]);
  };

  const handleStartWipe = () => {
    setIsWiping(true);
    setProgress(0);
    setIsComplete(false);
    setLogs([]);

    const sequence: { delay: number; pct: number; msg: string; type: LogEntry['type'] }[] = [
      { delay: 400, pct: 5, msg: `[INIT] Establishing low-level hardware link to ${activeDeviceObj.name} (${activeDeviceObj.id})...`, type: 'info' },
      { delay: 1200, pct: 15, msg: `[IOCTL] Checking drive controller state on ${activeDeviceObj.storage}... OK`, type: 'info' },
      { delay: 2000, pct: 25, msg: `[SECURITY] Bypassing OS kernel protections and unmounting all volumes...`, type: 'warn' },
      { delay: 3000, pct: 40, msg: `[ERASE] Applying sanitization standard: ${activeAlgoObj.name}`, type: 'process' },
      { delay: 4200, pct: 55, msg: `[STREAM] Executing ${activeAlgoObj.passes} on LBA sectors 0x00000000 -> 0x3B9ACA00...`, type: 'process' },
      { delay: 5800, pct: 70, msg: `[WRITE] Sector block overwrites in progress: 1,048,576 / 1,048,576 blocks queued...`, type: 'process' },
      { delay: 7200, pct: 85, msg: `[VERIFY] Initiating pseudo-random sector sampling (10,000 blocks verification)...`, type: 'warn' },
      { delay: 8400, pct: 95, msg: `[VERIFY] Zero residual entropy detected. Verification check PASSED.`, type: 'success' },
      { delay: 9600, pct: 100, msg: `[COMPLETE] Sanitization successfully executed! Ready for certification.`, type: 'success' },
    ];

    sequence.forEach(({ delay, pct, msg, type }) => {
      setTimeout(() => {
        setProgress(pct);
        addLog(msg, type);
        if (pct === 100) {
          setIsWiping(false);
          setIsComplete(true);
        }
      }, delay);
    });
  };

  const handleReset = () => {
    setIsWiping(false);
    setProgress(0);
    setLogs([]);
    setIsComplete(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Interactive Secure Wipe Console</h2>
          <p className="text-[#9e7669] text-sm mt-1">
            Execute certified, tamper-proof hardware sanitization directly from your browser.
          </p>
        </div>
        
        {isComplete && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1b2b1a] border border-[#2e522c] text-emerald-400 text-xs font-semibold animate-pulse">
            <CheckCircle2 className="w-4 h-4" />
            <span>Sanitization Complete</span>
          </div>
        )}
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Configuration Panel */}
        <div className="lg:col-span-5 bg-[#190906] border border-[#381811] rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-[#381811] pb-4">
            <div className="w-9 h-9 rounded-xl bg-[#28110c] border border-[#461e15] flex items-center justify-center text-[#e07a52]">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Sanitization Configuration</h3>
              <p className="text-xs text-[#8c675c]">Select hardware target and erase protocol</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Target Device Dropdown */}
            <div>
              <label className="block text-xs font-medium text-[#ba9083] mb-2 flex items-center gap-2">
                <HardDrive className="w-3.5 h-3.5 text-[#e07a52]" />
                Target Device
              </label>
              <select
                disabled={isWiping}
                value={selectedDevice}
                onChange={(e) => setSelectedDevice(e.target.value)}
                className="w-full bg-[#120604] border border-[#3a1a13] rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-[#e07a52] focus:ring-1 focus:ring-[#e07a52] transition-colors disabled:opacity-60 cursor-pointer"
              >
                {mockDevices.map((dev) => (
                  <option key={dev.id} value={dev.id} className="bg-[#190906] text-white">
                    {dev.name} ({dev.id}) — {dev.storage}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Device Details Preview */}
            <div className="bg-[#120604] border border-[#2b130e] rounded-xl p-4 text-xs space-y-2">
              <div className="flex justify-between text-[#8c675c]">
                <span>Device Serial:</span>
                <span className="text-stone-300 font-mono">{activeDeviceObj.serial}</span>
              </div>
              <div className="flex justify-between text-[#8c675c]">
                <span>Storage Medium:</span>
                <span className="text-stone-300">{activeDeviceObj.storage}</span>
              </div>
              <div className="flex justify-between text-[#8c675c]">
                <span>Device Category:</span>
                <span className="text-stone-300">{activeDeviceObj.type}</span>
              </div>
            </div>

            {/* Wipe Algorithm Dropdown */}
            <div>
              <label className="block text-xs font-medium text-[#ba9083] mb-2 flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-[#e07a52]" />
                Wipe Algorithm
              </label>
              <select
                disabled={isWiping}
                value={selectedAlgorithm}
                onChange={(e) => setSelectedAlgorithm(e.target.value)}
                className="w-full bg-[#120604] border border-[#3a1a13] rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-[#e07a52] focus:ring-1 focus:ring-[#e07a52] transition-colors disabled:opacity-60 cursor-pointer"
              >
                {wipeAlgorithms.map((algo) => (
                  <option key={algo.id} value={algo.id} className="bg-[#190906] text-white">
                    {algo.name}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-[#8c675c] mt-2 leading-relaxed">
                {activeAlgoObj.desc}
              </p>
            </div>

            {/* Warning Banner */}
            <div className="p-3.5 rounded-xl bg-[#26120b] border border-[#482015] flex gap-3 text-xs text-[#d48b79]">
              <ShieldAlert className="w-4 h-4 text-[#e07a52] flex-shrink-0 mt-0.5" />
              <span>Warning: This operation will irretrievably destroy all master partition tables and data payloads.</span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleStartWipe}
                disabled={isWiping}
                className="flex-1 bg-[#d86b40] hover:bg-[#e07a52] active:bg-[#c95f35] text-[#190906] font-semibold py-3 px-4 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isWiping ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sanitizing ({progress}%)...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Initiate Secure Wipe</span>
                  </>
                )}
              </button>

              {logs.length > 0 && !isWiping && (
                <button
                  onClick={handleReset}
                  className="px-4 py-3 bg-[#24100b] hover:bg-[#301610] text-[#c9a69b] rounded-xl text-sm border border-[#3e1c15] transition-colors flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Simulation Terminal */}
        <div className="lg:col-span-7 bg-[#190906] border border-[#381811] rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col min-h-[540px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#381811] pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#28110c] border border-[#461e15] flex items-center justify-center text-[#e07a52]">
                <TerminalIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Live Erasure Console</h3>
                <p className="text-xs text-[#8c675c]">Real-time disk I/O stream and sector telemetry</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isWiping ? 'bg-amber-400 animate-ping' : isComplete ? 'bg-emerald-400' : 'bg-stone-600'}`} />
              <span className="text-xs font-mono text-stone-400">
                {isWiping ? 'RUNNING' : isComplete ? 'SUCCESS' : 'IDLE'}
              </span>
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="mb-4 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#8c675c]">Wipe Progress</span>
              <span className="text-[#e07a52] font-semibold">{progress}%</span>
            </div>
            <div className="w-full h-2.5 bg-[#120604] rounded-full overflow-hidden border border-[#381811]">
              <div 
                className="h-full bg-gradient-to-r from-[#b34925] via-[#d86b40] to-[#e07a52] transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Terminal Box */}
          <div className="flex-1 bg-black rounded-2xl border border-[#2b120c] p-4 font-mono text-xs overflow-y-auto max-h-[340px] flex flex-col space-y-2 shadow-inner">
            {logs.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-stone-600 space-y-2 my-auto py-12">
                <TerminalIcon className="w-8 h-8 opacity-40 text-[#e07a52]" />
                <p className="text-stone-500">Console ready. Click &quot;Initiate Secure Wipe&quot; to begin the sanitization cycle.</p>
              </div>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-stone-600 select-none">[{log.timestamp}]</span>
                  <span className={`
                    ${log.type === 'success' ? 'text-emerald-400 font-semibold' : ''}
                    ${log.type === 'warn' ? 'text-amber-400' : ''}
                    ${log.type === 'process' ? 'text-cyan-400' : ''}
                    ${log.type === 'info' ? 'text-stone-300' : ''}
                  `}>
                    {log.message}
                  </span>
                </div>
              ))
            )}
            <div ref={terminalEndRef} />
          </div>

          {/* Success State Banner & Certificate Action */}
          {isComplete && (
            <div className="mt-4 p-4 rounded-2xl bg-[#132214] border border-[#254625] flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1d381f] flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-emerald-300">Erasure Passed Verification</h4>
                  <p className="text-xs text-emerald-500/80">Tamper-evident record generated with zero entropy.</p>
                </div>
              </div>

              <Link
                href="/dashboard/certificates"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-colors shadow-md whitespace-nowrap"
              >
                <FileBadge className="w-4 h-4" />
                <span>Generate Certificate</span>
              </Link>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
