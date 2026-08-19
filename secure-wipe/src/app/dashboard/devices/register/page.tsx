"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Laptop, 
  Hash, 
  User, 
  Activity,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function RegisterDevicePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API submission
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Redirect after showing success
      setTimeout(() => {
        router.push('/dashboard/devices');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-darkBrown-800">Register New Device</h2>
        <p className="text-darkBrown-500 mt-1">Enter the details below to add a device to the secure wipe queue.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-soft border border-warmBeige-100 overflow-hidden relative">
        {/* Success overlay */}
        {isSuccess && (
          <div className="absolute inset-0 z-10 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
            <h3 className="text-2xl font-bold text-darkBrown-800">Device Registered!</h3>
            <p className="text-darkBrown-600 mt-2">Redirecting to device list...</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-10">
          
          {/* Section 1: Device Details */}
          <section>
            <div className="flex items-center gap-2 mb-6 border-b border-warmBeige-100 pb-3">
              <Laptop className="w-5 h-5 text-peach-600" />
              <h3 className="text-lg font-semibold text-darkBrown-800">Device Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-darkBrown-600 mb-2">Device Type</label>
                <select required className="block w-full px-3 py-2.5 border border-warmBeige-200 rounded-lg focus:ring-2 focus:ring-peach-300 focus:border-peach-300 transition-colors bg-warmBeige-50 text-darkBrown-800 outline-none">
                  <option value="">Select Type</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Desktop PC">Desktop PC</option>
                  <option value="Smartphone">Smartphone</option>
                  <option value="Tablet">Tablet</option>
                  <option value="Keypad Phone">Keypad Phone</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-darkBrown-600 mb-2">Brand</label>
                <select required className="block w-full px-3 py-2.5 border border-warmBeige-200 rounded-lg focus:ring-2 focus:ring-peach-300 focus:border-peach-300 transition-colors bg-warmBeige-50 text-darkBrown-800 outline-none">
                  <option value="">Select Brand</option>
                  <option value="Apple">Apple</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Vivo">Vivo</option>
                  <option value="Oppo">Oppo</option>
                  <option value="OnePlus">OnePlus</option>
                  <option value="Xiaomi">Xiaomi</option>
                  <option value="Realme">Realme</option>
                  <option value="Nokia">Nokia</option>
                  <option value="Motorola">Motorola</option>
                  <option value="Dell">Dell</option>
                  <option value="HP">HP</option>
                  <option value="Lenovo">Lenovo</option>
                  <option value="Asus">Asus</option>
                  <option value="Acer">Acer</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-darkBrown-600 mb-2">Model</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., ThinkPad T14 Gen 2"
                  className="block w-full px-3 py-2.5 border border-warmBeige-200 rounded-lg focus:ring-2 focus:ring-peach-300 focus:border-peach-300 transition-colors bg-warmBeige-50 text-darkBrown-800 outline-none"
                />
              </div>
            </div>
          </section>

          {/* Section 2: Identification */}
          <section>
            <div className="flex items-center gap-2 mb-6 border-b border-warmBeige-100 pb-3">
              <Hash className="w-5 h-5 text-peach-600" />
              <h3 className="text-lg font-semibold text-darkBrown-800">Identification</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-darkBrown-600 mb-2">IMEI (for phones)</label>
                <input
                  type="text"
                  placeholder="15-digit IMEI number"
                  className="block w-full px-3 py-2.5 border border-warmBeige-200 rounded-lg focus:ring-2 focus:ring-peach-300 focus:border-peach-300 transition-colors bg-warmBeige-50 text-darkBrown-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-darkBrown-600 mb-2">Serial Number</label>
                <input
                  type="text"
                  required
                  placeholder="Alphanumeric serial"
                  className="block w-full px-3 py-2.5 border border-warmBeige-200 rounded-lg focus:ring-2 focus:ring-peach-300 focus:border-peach-300 transition-colors bg-warmBeige-50 text-darkBrown-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-darkBrown-600 mb-2">Asset ID (Internal)</label>
                <input
                  type="text"
                  placeholder="e.g., AST-2026-001"
                  className="block w-full px-3 py-2.5 border border-warmBeige-200 rounded-lg focus:ring-2 focus:ring-peach-300 focus:border-peach-300 transition-colors bg-warmBeige-50 text-darkBrown-800 outline-none"
                />
              </div>
            </div>
          </section>

          {/* Section 3: Owner Information */}
          <section>
            <div className="flex items-center gap-2 mb-6 border-b border-warmBeige-100 pb-3">
              <User className="w-5 h-5 text-peach-600" />
              <h3 className="text-lg font-semibold text-darkBrown-800">Owner Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-darkBrown-600 mb-2">Owner Name</label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  className="block w-full px-3 py-2.5 border border-warmBeige-200 rounded-lg focus:ring-2 focus:ring-peach-300 focus:border-peach-300 transition-colors bg-warmBeige-50 text-darkBrown-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-darkBrown-600 mb-2">Contact Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="block w-full px-3 py-2.5 border border-warmBeige-200 rounded-lg focus:ring-2 focus:ring-peach-300 focus:border-peach-300 transition-colors bg-warmBeige-50 text-darkBrown-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-darkBrown-600 mb-2">Email</label>
                <input
                  type="email"
                  required
                  placeholder="owner@example.com"
                  className="block w-full px-3 py-2.5 border border-warmBeige-200 rounded-lg focus:ring-2 focus:ring-peach-300 focus:border-peach-300 transition-colors bg-warmBeige-50 text-darkBrown-800 outline-none"
                />
              </div>
            </div>
          </section>

          {/* Section 4: Device Condition */}
          <section>
            <div className="flex items-center gap-2 mb-6 border-b border-warmBeige-100 pb-3">
              <Activity className="w-5 h-5 text-peach-600" />
              <h3 className="text-lg font-semibold text-darkBrown-800">Device Condition</h3>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {['Working', 'Damaged', 'Non-functional'].map((condition) => (
                <label key={condition} className="flex-1 cursor-pointer">
                  <input type="radio" name="condition" value={condition} className="peer sr-only" defaultChecked={condition === 'Working'} />
                  <div className="p-4 border border-warmBeige-200 rounded-lg text-center peer-checked:border-peach-500 peer-checked:bg-peach-50 peer-checked:text-peach-700 text-darkBrown-600 hover:bg-warmBeige-50 transition-colors">
                    <span className="font-medium text-sm">{condition}</span>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Submit Button */}
          <div className="pt-6 border-t border-warmBeige-100 flex justify-end">
            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className="w-full sm:w-auto flex justify-center items-center gap-2 py-3 px-8 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-peach-500 hover:bg-peach-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-peach-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Registering...' : 'Register Device'}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
