export const kpiStats = {
  totalDevices: 1248,
  devicesWiped: 982,
  successfullyVerified: 950,
  certificatesGenerated: 890,
};

export type DeviceStatus = 'Registered' | 'Wiping' | 'Verification Pending' | 'Verified' | 'Recovery Failed' | 'Certificate Generated';

export interface RecentDevice {
  id: string;
  deviceType: string;
  brand: string;
  status: DeviceStatus;
  date: string;
}

export const recentDevices: RecentDevice[] = [
  {
    id: 'DEV-8923',
    deviceType: 'Laptop',
    brand: 'Dell Latitude',
    status: 'Certificate Generated',
    date: '2026-08-19',
  },
  {
    id: 'DEV-8924',
    deviceType: 'Smartphone',
    brand: 'iPhone 13',
    status: 'Wiping',
    date: '2026-08-19',
  },
  {
    id: 'DEV-8925',
    deviceType: 'Desktop',
    brand: 'HP EliteDesk',
    status: 'Verification Pending',
    date: '2026-08-18',
  },
  {
    id: 'DEV-8926',
    deviceType: 'Tablet',
    brand: 'iPad Pro',
    status: 'Registered',
    date: '2026-08-18',
  },
  {
    id: 'DEV-8927',
    deviceType: 'Laptop',
    brand: 'Lenovo ThinkPad',
    status: 'Verified',
    date: '2026-08-17',
  },
];

export interface SystemActivity {
  id: string;
  action: string;
  user: string;
  time: string;
}

export const recentActivities: SystemActivity[] = [
  { id: 'ACT-1', action: 'Generated wipe certificate for DEV-8923', user: 'System', time: '10 mins ago' },
  { id: 'ACT-2', action: 'Initiated secure wipe protocol', user: 'John Doe', time: '1 hour ago' },
  { id: 'ACT-3', action: 'Registered new batch of 50 devices', user: 'Admin User', time: '3 hours ago' },
  { id: 'ACT-4', action: 'Failed sector verification on DEV-8801', user: 'System', time: '5 hours ago' },
  { id: 'ACT-5', action: 'Exported monthly audit report', user: 'John Doe', time: '1 day ago' },
];
