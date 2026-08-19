"use client";

import React, { useState } from 'react';
import { 
  Activity, 
  Download, 
  Search, 
  Filter, 
  Shield, 
  LogIn, 
  HardDrive, 
  Trash2, 
  FileBadge, 
  Link as LinkIcon,
  AlertTriangle,
  User
} from 'lucide-react';

type EventType = 'Authentication' | 'Device Registration' | 'Sanitization' | 'Certificate' | 'Blockchain Sync' | 'System Alert';

interface LogEntry {
  id: string;
  timestamp: string;
  eventType: EventType;
  operator: string;
  action: string;
  ipAddress: string;
  location: string;
}

const mockLogs: LogEntry[] = [
  {
    id: 'LOG-0021',
    timestamp: 'Aug 20, 2026 – 01:28:44 UTC',
    eventType: 'Blockchain Sync',
    operator: 'system@securewipe.eth',
    action: 'Certificate SW-CERT-2026-8A9B anchored to Polygon PoS Block #42,195,881',
    ipAddress: '10.0.0.1',
    location: 'Mumbai, IN (Node)',
  },
  {
    id: 'LOG-0020',
    timestamp: 'Aug 20, 2026 – 01:28:02 UTC',
    eventType: 'Certificate',
    operator: 'operator@greencycle.in',
    action: 'Certificate of Data Erasure generated for Asset #1042 (Dell Latitude 5420)',
    ipAddress: '192.168.1.45',
    location: 'Delhi, IN',
  },
  {
    id: 'LOG-0019',
    timestamp: 'Aug 20, 2026 – 01:16:50 UTC',
    eventType: 'Sanitization',
    operator: 'operator@greencycle.in',
    action: 'NIST SP 800-88 Rev 1 (Purge) wipe completed on Asset #1042. Residual entropy: 0.0',
    ipAddress: '192.168.1.45',
    location: 'Delhi, IN',
  },
  {
    id: 'LOG-0018',
    timestamp: 'Aug 20, 2026 – 01:04:23 UTC',
    eventType: 'Sanitization',
    operator: 'operator@greencycle.in',
    action: 'Initiated NIST SP 800-88 (Purge) protocol on Serial No. CN-0ABCDE-1042',
    ipAddress: '192.168.1.45',
    location: 'Delhi, IN',
  },
  {
    id: 'LOG-0017',
    timestamp: 'Aug 20, 2026 – 00:55:10 UTC',
    eventType: 'Device Registration',
    operator: 'operator@greencycle.in',
    action: 'Registered new asset: Dell Latitude 5420 (Asset #1042, S/N: CN-0ABCDE-1042)',
    ipAddress: '192.168.1.45',
    location: 'Delhi, IN',
  },
  {
    id: 'LOG-0016',
    timestamp: 'Aug 20, 2026 – 00:51:38 UTC',
    eventType: 'Authentication',
    operator: 'operator@greencycle.in',
    action: 'Successful login. Session token issued. 2FA verified.',
    ipAddress: '192.168.1.45',
    location: 'Delhi, IN',
  },
  {
    id: 'LOG-0015',
    timestamp: 'Aug 19, 2026 – 22:14:05 UTC',
    eventType: 'System Alert',
    operator: 'system@securewipe.eth',
    action: 'Failed login attempt (3/5) detected for admin@securewipe.com. Account throttled.',
    ipAddress: '45.33.32.156',
    location: 'Ashburn, US (Flagged)',
  },
  {
    id: 'LOG-0014',
    timestamp: 'Aug 19, 2026 – 18:45:20 UTC',
    eventType: 'Certificate',
    operator: 'sarah.c@securewipe.in',
    action: 'Certificate of Data Erasure generated for Apple MacBook Pro M1 (Asset #1150)',
    ipAddress: '10.0.1.12',
    location: 'Bangalore, IN',
  },
];

const eventConfig: Record<EventType, { label: string; color: string; icon: any }> = {
  Authentication: { label: 'Auth', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30', icon: LogIn },
  'Device Registration': { label: 'Registered', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30', icon: HardDrive },
  Sanitization: { label: 'Wipe', color: 'bg-amber-500/10 text-amber-400 border-amber-500/30', icon: Trash2 },
  Certificate: { label: 'Certificate', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', icon: FileBadge },
  'Blockchain Sync': { label: 'Blockchain', color: 'bg-violet-500/10 text-violet-400 border-violet-500/30', icon: LinkIcon },
  'System Alert': { label: 'Alert', color: 'bg-red-500/10 text-red-400 border-red-500/30', icon: AlertTriangle },
};

export default function ActivityLogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [eventFilter, setEventFilter] = useState('All Events');
  const [dateFilter, setDateFilter] = useState('Last 30 Days');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 1500);
  };

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      searchQuery === '' ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.operator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesEvent =
      eventFilter === 'All Events' || log.eventType === eventFilter;

    return matchesSearch && matchesEvent;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#381811] pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#28110c] border border-[#461e15] flex items-center justify-center text-[#e07a52]">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">System Audit Logs</h2>
            <p className="text-[#9e7669] text-xs sm:text-sm mt-0.5">
              Immutable chronological record of all operator actions and system events.
            </p>
          </div>
        </div>

        <button
          onClick={handleExport}
          disabled={isExporting}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#190906] hover:bg-[#250f0a] text-stone-300 font-medium text-xs sm:text-sm border border-[#381811] transition-colors cursor-pointer disabled:opacity-70"
        >
          <Download className="w-4 h-4 text-[#e07a52]" />
          <span>{isExporting ? 'Exporting...' : 'Export CSV'}</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-[#190906] border border-[#381811] rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] w-full sm:w-auto">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by operator, action or log ID..."
            className="w-full bg-[#120604] border border-[#381811] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-stone-600 focus:outline-none focus:border-[#e07a52] transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 bg-[#120604] border border-[#381811] rounded-xl px-3 py-2">
          <Filter className="w-3.5 h-3.5 text-[#e07a52] flex-shrink-0" />
          <select
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
            className="bg-transparent text-xs text-white outline-none cursor-pointer"
          >
            <option>All Events</option>
            <option>Authentication</option>
            <option>Device Registration</option>
            <option>Sanitization</option>
            <option>Certificate</option>
            <option>Blockchain Sync</option>
            <option>System Alert</option>
          </select>
        </div>

        <div className="flex items-center gap-2 bg-[#120604] border border-[#381811] rounded-xl px-3 py-2">
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-transparent text-xs text-white outline-none cursor-pointer"
          >
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>

        <span className="text-xs text-[#8c675c] ml-auto whitespace-nowrap">
          {filteredLogs.length} of {mockLogs.length} entries
        </span>
      </div>

      {/* Activity Table */}
      <div className="bg-[#190906] border border-[#381811] rounded-3xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left border-collapse">
            <thead>
              <tr className="bg-[#120604] border-b border-[#381811]">
                <th className="py-3.5 px-5 text-[11px] font-semibold text-[#8c675c] uppercase tracking-wider">Log ID</th>
                <th className="py-3.5 px-5 text-[11px] font-semibold text-[#8c675c] uppercase tracking-wider">Timestamp</th>
                <th className="py-3.5 px-5 text-[11px] font-semibold text-[#8c675c] uppercase tracking-wider">Event</th>
                <th className="py-3.5 px-5 text-[11px] font-semibold text-[#8c675c] uppercase tracking-wider">Operator</th>
                <th className="py-3.5 px-5 text-[11px] font-semibold text-[#8c675c] uppercase tracking-wider">Action Details</th>
                <th className="py-3.5 px-5 text-[11px] font-semibold text-[#8c675c] uppercase tracking-wider">Origin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a1108]">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <div className="flex flex-col items-center text-[#8c675c] gap-2">
                      <Search className="w-6 h-6 opacity-40" />
                      <span className="text-sm">No logs match your filters.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  const config = eventConfig[log.eventType];
                  const Icon = config.icon;
                  return (
                    <tr key={log.id} className="hover:bg-[#1f0b07]/60 transition-colors">
                      {/* Log ID */}
                      <td className="py-4 px-5 text-xs font-mono text-[#8c675c] whitespace-nowrap">
                        {log.id}
                      </td>

                      {/* Timestamp */}
                      <td className="py-4 px-5 text-xs font-mono text-stone-400 whitespace-nowrap">
                        {log.timestamp}
                      </td>

                      {/* Event Type Badge */}
                      <td className="py-4 px-5 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${config.color}`}>
                          <Icon className="w-3 h-3" />
                          {config.label}
                        </span>
                      </td>

                      {/* Operator */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#28110c] border border-[#461e15] flex items-center justify-center flex-shrink-0">
                            <User className="w-3 h-3 text-[#e07a52]" />
                          </div>
                          <span className="text-xs text-stone-300 whitespace-nowrap font-mono">{log.operator}</span>
                        </div>
                      </td>

                      {/* Action Details */}
                      <td className="py-4 px-5 text-xs text-stone-400 max-w-xs">
                        {log.action}
                      </td>

                      {/* IP / Location */}
                      <td className="py-4 px-5 text-xs text-stone-500 whitespace-nowrap">
                        <span className="font-mono text-[#8c675c]">{log.ipAddress}</span>
                        <br />
                        <span className={log.location.includes('Flagged') ? 'text-red-400 font-medium' : 'text-stone-600'}>
                          {log.location}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 border-t border-[#2a1108] flex items-center justify-between text-xs text-[#8c675c]">
          <span>Showing {filteredLogs.length} results</span>
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#e07a52]" />
            Log integrity verified — SHA-256 hash chain intact
          </span>
        </div>
      </div>
    </div>
  );
}
