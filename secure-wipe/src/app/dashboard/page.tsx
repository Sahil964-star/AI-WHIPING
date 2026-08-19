import React from 'react';
import { 
  HardDrive, 
  Trash2, 
  ShieldCheck, 
  FileBadge, 
  MoreVertical,
  Laptop,
  Smartphone,
  Monitor
} from 'lucide-react';
import { kpiStats, recentDevices, recentActivities, DeviceStatus } from '@/data/mock-kpi';

const StatCard = ({ title, value, icon: Icon, trend }: { title: string, value: number, icon: any, trend?: string }) => (
  <div className="bg-white rounded-2xl p-6 shadow-soft border border-warmBeige-100 flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-darkBrown-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-darkBrown-800">{value.toLocaleString()}</h3>
      {trend && <p className="text-sm text-green-600 font-medium mt-2">{trend}</p>}
    </div>
    <div className="w-12 h-12 rounded-xl bg-peach-50 flex items-center justify-center text-peach-600">
      <Icon className="w-6 h-6" />
    </div>
  </div>
);

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

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-darkBrown-800">Dashboard Overview</h2>
          <p className="text-darkBrown-500 mt-1">Track device lifecycle and wiping status in real-time.</p>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Devices" value={kpiStats.totalDevices} icon={HardDrive} trend="+12% this month" />
        <StatCard title="Devices Wiped" value={kpiStats.devicesWiped} icon={Trash2} trend="+8% this month" />
        <StatCard title="Successfully Verified" value={kpiStats.successfullyVerified} icon={ShieldCheck} trend="+15% this month" />
        <StatCard title="Certificates Generated" value={kpiStats.certificatesGenerated} icon={FileBadge} trend="+10% this month" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        
        {/* Recent Devices Table/List */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-soft border border-warmBeige-100 overflow-hidden">
          <div className="p-6 border-b border-warmBeige-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-darkBrown-800">Recent Devices</h3>
            <button className="text-sm font-medium text-peach-600 hover:text-peach-700">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-warmBeige-50/50">
                  <th className="py-3 px-6 text-xs font-semibold text-darkBrown-500 uppercase tracking-wider">Device</th>
                  <th className="py-3 px-6 text-xs font-semibold text-darkBrown-500 uppercase tracking-wider">ID</th>
                  <th className="py-3 px-6 text-xs font-semibold text-darkBrown-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-xs font-semibold text-darkBrown-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warmBeige-100">
                {recentDevices.map((device) => (
                  <tr key={device.id} className="hover:bg-warmBeige-50/50 transition-colors">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-warmBeige-50 flex items-center justify-center border border-warmBeige-100">
                        {getDeviceIcon(device.deviceType)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-darkBrown-800">{device.brand}</p>
                        <p className="text-xs text-darkBrown-500">{device.deviceType}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-darkBrown-600 font-medium">{device.id}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(device.status)}`}>
                        {device.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-darkBrown-500">{device.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Activity */}
        <div className="bg-white rounded-2xl shadow-soft border border-warmBeige-100 overflow-hidden">
          <div className="p-6 border-b border-warmBeige-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-darkBrown-800">System Activity</h3>
            <button className="p-1 text-darkBrown-400 hover:text-darkBrown-600 rounded">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {recentActivities.map((activity, index) => (
                <div key={activity.id} className="flex gap-4 relative">
                  {/* Timeline connecting line */}
                  {index !== recentActivities.length - 1 && (
                    <div className="absolute top-8 left-4 w-px h-full -ml-px bg-warmBeige-200"></div>
                  )}
                  
                  <div className="relative z-10 w-8 h-8 rounded-full bg-peach-100 border-2 border-white flex items-center justify-center flex-shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-peach-500"></div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-darkBrown-800">{activity.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium text-peach-600">{activity.user}</span>
                      <span className="text-xs text-darkBrown-400">• {activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-2.5 text-sm font-medium text-darkBrown-600 hover:bg-warmBeige-50 border border-warmBeige-200 rounded-lg transition-colors">
              View All Activity
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
