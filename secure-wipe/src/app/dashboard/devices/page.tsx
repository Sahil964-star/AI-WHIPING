import React from 'react';
import Link from 'next/link';
import { Search, Plus, Filter, Monitor, Smartphone, Laptop, Eye } from 'lucide-react';
import { recentDevices, DeviceStatus } from '@/data/mock-kpi';

// Combine the mock data with a few more entries to fill out the table
const allDevices = [
  ...recentDevices,
  {
    id: 'DEV-8928',
    deviceType: 'Smartphone',
    brand: 'Samsung Galaxy S22',
    status: 'Recovery Failed' as DeviceStatus,
    date: '2026-08-16',
    model: 'SM-S901U',
    serial: '358941011234567',
  },
  {
    id: 'DEV-8929',
    deviceType: 'Desktop PC',
    brand: 'Dell OptiPlex',
    status: 'Wiping' as DeviceStatus,
    date: '2026-08-15',
    model: '7090 Micro',
    serial: 'CN-0ABCDE-12345',
  },
  {
    id: 'DEV-8930',
    deviceType: 'Laptop',
    brand: 'Apple MacBook Pro',
    status: 'Registered' as DeviceStatus,
    date: '2026-08-14',
    model: 'A2338 (M1, 2020)',
    serial: 'C02F12345678',
  },
  {
    id: 'DEV-8931',
    deviceType: 'Tablet',
    brand: 'Samsung Galaxy Tab S8',
    status: 'Verification Pending' as DeviceStatus,
    date: '2026-08-13',
    model: 'SM-X700',
    serial: 'R52T123456A',
  },
].map(dev => ({
  ...dev,
  // Ensure model and serial exist for all items, padding the old mock data
  model: (dev as any).model || `${dev.brand} Model X`,
  serial: (dev as any).serial || `SN-${dev.id.split('-')[1]}00X`,
}));

const getStatusColor = (status: DeviceStatus) => {
  switch (status) {
    case 'Certificate Generated':
    case 'Verified':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'Wiping':
    case 'Verification Pending':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'Recovery Failed':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'Registered':
    default:
      return 'bg-warmBeige-100 text-darkBrown-600 border-warmBeige-200';
  }
};

const getDeviceIcon = (type: string) => {
  if (type.toLowerCase().includes('laptop')) return <Laptop className="w-5 h-5 text-darkBrown-400" />;
  if (type.toLowerCase().includes('phone')) return <Smartphone className="w-5 h-5 text-darkBrown-400" />;
  return <Monitor className="w-5 h-5 text-darkBrown-400" />;
};

export default function MyDevicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-darkBrown-800">My Devices</h2>
          <p className="text-darkBrown-500 mt-1">Manage and track your inventory of registered hardware.</p>
        </div>
        <Link 
          href="/dashboard/devices/register"
          className="inline-flex items-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium text-white bg-peach-500 hover:bg-peach-600 transition-colors shadow-sm whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Device</span>
        </Link>
      </div>

      {/* Action Bar */}
      <div className="bg-white p-4 rounded-xl shadow-soft border border-warmBeige-100 flex flex-col lg:flex-row gap-4 items-center justify-between">
        
        <div className="relative w-full lg:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-darkBrown-400" />
          <input 
            type="text" 
            placeholder="Search by ID, Brand, or Serial..." 
            className="w-full pl-9 pr-4 py-2 bg-warmBeige-50 border border-warmBeige-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-peach-300 focus:border-peach-300 transition-all placeholder:text-darkBrown-400 text-darkBrown-800"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-2 bg-warmBeige-50 border border-warmBeige-200 rounded-lg px-3 py-2">
            <Filter className="w-4 h-4 text-darkBrown-400" />
            <select className="bg-transparent text-sm text-darkBrown-600 outline-none w-24">
              <option value="">All Types</option>
              <option value="Laptop">Laptop</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Desktop">Desktop PC</option>
            </select>
          </div>
          
          <select className="bg-warmBeige-50 border border-warmBeige-200 rounded-lg px-3 py-2 text-sm text-darkBrown-600 outline-none w-28">
            <option value="">All Brands</option>
            <option value="Apple">Apple</option>
            <option value="Dell">Dell</option>
            <option value="HP">HP</option>
            <option value="Samsung">Samsung</option>
          </select>

          <select className="bg-warmBeige-50 border border-warmBeige-200 rounded-lg px-3 py-2 text-sm text-darkBrown-600 outline-none w-32">
            <option value="">All Statuses</option>
            <option value="Registered">Registered</option>
            <option value="Wiping">Wiping</option>
            <option value="Verified">Verified</option>
          </select>
        </div>

      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-soft border border-warmBeige-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-warmBeige-50/50">
                <th className="py-4 px-6 text-xs font-semibold text-darkBrown-500 uppercase tracking-wider">Device ID</th>
                <th className="py-4 px-6 text-xs font-semibold text-darkBrown-500 uppercase tracking-wider">Device Info</th>
                <th className="py-4 px-6 text-xs font-semibold text-darkBrown-500 uppercase tracking-wider">Model & Serial</th>
                <th className="py-4 px-6 text-xs font-semibold text-darkBrown-500 uppercase tracking-wider">Reg. Date</th>
                <th className="py-4 px-6 text-xs font-semibold text-darkBrown-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-darkBrown-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warmBeige-100">
              {allDevices.map((device) => (
                <tr key={device.id} className="hover:bg-warmBeige-50/50 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium text-darkBrown-800 whitespace-nowrap">
                    {device.id}
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-warmBeige-50 flex items-center justify-center border border-warmBeige-100 flex-shrink-0">
                        {getDeviceIcon(device.deviceType)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-darkBrown-800">{device.brand}</p>
                        <p className="text-xs text-darkBrown-500">{device.deviceType}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <p className="text-sm text-darkBrown-800">{device.model}</p>
                    <p className="text-xs text-darkBrown-500 font-mono mt-0.5">{device.serial}</p>
                  </td>
                  
                  <td className="py-4 px-6 text-sm text-darkBrown-600 whitespace-nowrap">
                    {device.date}
                  </td>
                  
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(device.status)}`}>
                      {device.status}
                    </span>
                  </td>
                  
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <button className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-peach-700 bg-peach-50 hover:bg-peach-100 transition-colors border border-peach-200">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
