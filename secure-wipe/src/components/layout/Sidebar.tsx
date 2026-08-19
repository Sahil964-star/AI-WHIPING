"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  MonitorUp, 
  Laptop, 
  Trash2, 
  ShieldCheck, 
  FileBadge, 
  Link as LinkIcon, 
  QrCode, 
  Activity, 
  Settings,
  LogOut
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Register Device', href: '/dashboard/devices/register', icon: MonitorUp },
  { name: 'My Devices', href: '/dashboard/devices', icon: Laptop },
  { name: 'Secure Wipe', href: '/dashboard/secure-wipe', icon: Trash2 },
  { name: 'Verification', href: '/dashboard/verification', icon: ShieldCheck },
  { name: 'Certificates', href: '/dashboard/certificates', icon: FileBadge },
  { name: 'Blockchain Proof', href: '/dashboard/blockchain-proof', icon: LinkIcon },
  { name: 'QR Verification', href: '/dashboard/qr-verification', icon: QrCode },
  { name: 'Activity Logs', href: '/dashboard/activity-logs', icon: Activity },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-warmBeige-200 h-screen flex flex-col fixed left-0 top-0 shadow-soft z-20">
      <div className="p-6 flex items-center gap-3 border-b border-warmBeige-100">
        <div className="w-8 h-8 rounded bg-peach-500 flex items-center justify-center text-white font-bold">
          SW
        </div>
        <span className="text-xl font-bold text-darkBrown-800 tracking-tight">SecureWipe</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-warmBeige-100 text-peach-700 font-medium' 
                  : 'text-darkBrown-600 hover:bg-warmBeige-50 hover:text-darkBrown-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-warmBeige-100">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 rounded-full bg-peach-100 flex items-center justify-center text-peach-700 font-semibold shadow-sm">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-darkBrown-800 truncate">John Doe</p>
            <p className="text-xs text-darkBrown-500 truncate">admin@securewipe.com</p>
          </div>
        </div>
        <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-peach-700 rounded-lg hover:bg-peach-50 transition-colors">
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
