import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function VerificationPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-darkBrown-800">Wipe Verification</h2>
        <p className="text-darkBrown-500 mt-1">Validate data destruction and check for residual sectors.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-soft border border-warmBeige-100 p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="w-20 h-20 rounded-2xl bg-warmBeige-50 flex items-center justify-center mb-6">
          <ShieldCheck className="w-10 h-10 text-peach-500" />
        </div>
        
        <h3 className="text-xl font-bold text-darkBrown-800 mb-2">Feature Under Development</h3>
        <p className="text-darkBrown-600 max-w-md mb-6">
          This module is part of the next development phase for the SecureWipe SIH prototype.
        </p>
        
        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-peach-50 text-peach-700 border border-peach-200">
          Coming Soon
        </span>
      </div>
    </div>
  );
}
