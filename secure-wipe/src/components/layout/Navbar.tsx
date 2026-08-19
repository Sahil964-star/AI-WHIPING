import React from 'react';
import { Menu, Search, Bell } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-warmBeige-200 shadow-sm flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        {/* Mobile menu button - normally hidden on lg screens */}
        <button className="lg:hidden p-2 text-darkBrown-600 hover:bg-warmBeige-50 rounded-lg transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold text-darkBrown-800 hidden sm:block">
          Good morning, John
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-darkBrown-400" />
          <input 
            type="text" 
            placeholder="Search devices, logs..." 
            className="pl-9 pr-4 py-2 w-64 bg-warmBeige-50 border border-warmBeige-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-peach-300 focus:border-peach-300 transition-all placeholder:text-darkBrown-400 text-darkBrown-800"
          />
        </div>
        
        <button className="relative p-2 text-darkBrown-600 hover:bg-warmBeige-50 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-peach-500 rounded-full border border-white"></span>
        </button>
      </div>
    </header>
  );
}
