"use client";

import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Building, 
  Key, 
  AlertTriangle, 
  Check, 
  RefreshCw, 
  LogOut, 
  ShieldCheck, 
  Globe 
} from 'lucide-react';

export default function SettingsPage() {
  const [fullName, setFullName] = useState('Demo Operator');
  const [email] = useState('operator@greencycle.in');
  const [role] = useState('Administrator');
  
  const [defaultStandard, setDefaultStandard] = useState('NIST SP 800-88 Rev 1 (Purge)');
  const [timezone, setTimezone] = useState('Asia/Kolkata (IST +05:30)');

  const [rpcKey, setRpcKey] = useState('sk_live_98a7b6c5d4e3f2a10987654321fedcba');
  const [webhookUrl, setWebhookUrl] = useState('https://greencycle.in/api/v1/securewipe-events');

  const [profileSuccess, setProfileSuccess] = useState(false);
  const [prefSuccess, setPrefSuccess] = useState(false);
  const [apiSuccess, setApiSuccess] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 2000);
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setPrefSuccess(true);
    setTimeout(() => setPrefSuccess(false), 2000);
  };

  const handleRegenerateKeys = () => {
    setRpcKey('sk_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
    setApiSuccess(true);
    setTimeout(() => setApiSuccess(false), 2000);
  };

  const handleLogoutAll = () => {
    setLogoutSuccess(true);
    setTimeout(() => setLogoutSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#381811] pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#28110c] border border-[#461e15] flex items-center justify-center text-[#e07a52]">
            <SettingsIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">System Settings</h2>
            <p className="text-[#9e7669] text-xs sm:text-sm mt-0.5">
              Manage operator profile, organizational preferences, and API integrations.
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1b2b1a] border border-[#2e522c] text-emerald-400 text-xs font-medium self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>System Environment Healthy</span>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* COLUMN 1: Profile & Organization */}
        <div className="space-y-8">
          
          {/* Card 1: Operator Profile */}
          <div className="bg-[#190906] border border-[#381811] rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-[#381811] pb-4">
              <div className="w-8 h-8 rounded-lg bg-[#28110c] border border-[#461e15] flex items-center justify-center text-[#e07a52]">
                <User className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-white">Operator Profile</h3>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-medium text-[#ba9083] mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#120604] border border-[#3a1a13] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#e07a52] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-[#ba9083] mb-1.5">Email Address (Read-only)</label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full bg-[#120604]/50 border border-[#2a120c] rounded-xl px-3.5 py-2.5 text-stone-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-medium text-[#ba9083] mb-1.5">Role Permissions (Read-only)</label>
                <input
                  type="text"
                  value={role}
                  readOnly
                  className="w-full bg-[#120604]/50 border border-[#2a120c] rounded-xl px-3.5 py-2.5 text-stone-400 cursor-not-allowed font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-[#d86b40] hover:bg-[#e07a52] text-[#190906] font-semibold py-2.5 px-5 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  {profileSuccess ? <Check className="w-4 h-4" /> : null}
                  <span>{profileSuccess ? 'Profile Updated!' : 'Update Profile'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Card 2: Organization Defaults */}
          <div className="bg-[#190906] border border-[#381811] rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-[#381811] pb-4">
              <div className="w-8 h-8 rounded-lg bg-[#28110c] border border-[#461e15] flex items-center justify-center text-[#e07a52]">
                <Building className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-white">Organization Preferences</h3>
            </div>

            <form onSubmit={handleSavePreferences} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-medium text-[#ba9083] mb-1.5">Default Erasure Standard</label>
                <select
                  value={defaultStandard}
                  onChange={(e) => setDefaultStandard(e.target.value)}
                  className="w-full bg-[#120604] border border-[#3a1a13] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#e07a52] transition-colors cursor-pointer"
                >
                  <option value="NIST SP 800-88 Rev 1 (Purge)">NIST SP 800-88 Rev 1 (Purge)</option>
                  <option value="NIST SP 800-88 Rev 1 (Clear)">NIST SP 800-88 Rev 1 (Clear)</option>
                  <option value="DoD 5220.22-M (3-Pass)">DoD 5220.22-M (3-Pass)</option>
                  <option value="IEEE 2883-2022">IEEE 2883-2022</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-[#ba9083] mb-1.5 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#e07a52]" />
                  System Timezone
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full bg-[#120604] border border-[#3a1a13] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#e07a52] transition-colors cursor-pointer"
                >
                  <option value="Asia/Kolkata (IST +05:30)">Asia/Kolkata (IST +05:30)</option>
                  <option value="UTC (Coordinated Universal Time)">UTC (Coordinated Universal Time)</option>
                  <option value="America/New_York (EST -05:00)">America/New_York (EST -05:00)</option>
                  <option value="Europe/London (GMT +00:00)">Europe/London (GMT +00:00)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-[#190906] hover:bg-[#250f0a] text-[#e07a52] font-semibold py-2.5 px-5 rounded-xl text-xs sm:text-sm border border-[#381811] transition-all flex items-center gap-2 cursor-pointer"
                >
                  {prefSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : null}
                  <span>{prefSuccess ? 'Preferences Saved!' : 'Save Preferences'}</span>
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* COLUMN 2: Security & API */}
        <div className="space-y-8">
          
          {/* Card 3: API Keys & Integrations */}
          <div className="bg-[#190906] border border-[#381811] rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-[#381811] pb-4">
              <div className="w-8 h-8 rounded-lg bg-[#28110c] border border-[#461e15] flex items-center justify-center text-[#e07a52]">
                <Key className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-white">API Keys &amp; Integrations</h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-medium text-[#ba9083] mb-1.5">Polygon Mainnet RPC Key</label>
                <input
                  type="password"
                  value={rpcKey}
                  onChange={(e) => setRpcKey(e.target.value)}
                  className="w-full bg-[#120604] border border-[#3a1a13] rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-[#e07a52] transition-colors"
                />
              </div>

              <div>
                <label className="block font-medium text-[#ba9083] mb-1.5">Event Webhook URL</label>
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full bg-[#120604] border border-[#3a1a13] rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-[#e07a52] transition-colors"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleRegenerateKeys}
                  className="bg-[#190906] hover:bg-[#250f0a] text-stone-300 font-semibold py-2.5 px-5 rounded-xl text-xs sm:text-sm border border-[#381811] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-[#e07a52] ${apiSuccess ? 'animate-spin' : ''}`} />
                  <span>{apiSuccess ? 'Keys Regenerated!' : 'Regenerate API Keys'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: Danger Zone */}
          <div className="bg-[#190906] border-2 border-red-950/60 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-[#381811] pb-4">
              <div className="w-8 h-8 rounded-lg bg-red-950/60 border border-red-800/40 flex items-center justify-center text-red-500">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-white">Danger Zone</h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <p className="text-[#9e7669] leading-relaxed">
                Revoke all active sessions and log out from all devices. This will invalidate current JWT bearer tokens immediately across all nodes.
              </p>

              {logoutSuccess && (
                <div className="p-3 rounded-xl bg-red-950/40 border border-red-900/50 text-red-300 text-xs">
                  All active sessions revoked successfully. You will be prompted on next navigation.
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleLogoutAll}
                  className="w-full bg-[#3d130e] hover:bg-[#521913] text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all border border-red-900/50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  <span>Log Out All Devices</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
