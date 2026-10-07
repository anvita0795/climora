import React from 'react';
import { Search, Bell } from 'lucide-react';

interface TopHeaderProps {
  locationName?: string;
  onSearch?: (query: string) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onSearch }) => {
  return (
    <header className="h-16 md:h-18 w-full px-8 flex items-center justify-between z-30 text-white select-none shrink-0">
      {/* Brand Title (Spec #12) */}
      <div className="flex items-center gap-3">
        {/* Globe Cyan Icon Logo */}
        <div className="w-9 h-9 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="20" cy="20" r="17" stroke="#16E0D0" strokeWidth="2.5" />
            <path d="M 6 20 C 10 13, 30 13, 34 20" stroke="#16E0D0" strokeWidth="1.5" strokeDasharray="2 2" strokeOpacity="0.7" />
            <path
              d="M 12 28 C 12 20, 24 14, 28 10 C 28 18, 20 28, 12 28 Z"
              fill="#16E0D0"
              stroke="#16E0D0"
              strokeWidth="1.5"
            />
            <path d="M 16 24 L 24 16" stroke="#061A24" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        <div className="flex items-center text-xl font-bold tracking-tight">
          <span className="text-white font-extrabold tracking-wide">CLIMORA</span>
          <span className="text-[#16E0D0] font-bold ml-1.5">AI</span>
        </div>
      </div>

      {/* Right Controls Header (Spec #13, #14) */}
      <div className="flex items-center gap-4">
        {/* Search Field (Spec #13: 300-340px width, 42-46px height, placeholder "Search dataset, variable or location...") */}
        <div className="relative flex items-center w-[320px]">
          <Search className="w-4 h-4 text-[#A8BAC4] absolute left-3.5" />
          <input
            type="text"
            placeholder="Search dataset, variable or location..."
            onChange={(e) => onSearch && onSearch(e.target.value)}
            className="w-full pl-10 pr-4 h-[44px] rounded-full bg-white/5 border border-white/12 text-xs text-white placeholder:text-[#78909C] focus:outline-none focus:border-[#16E0D0] focus:ring-1 focus:ring-[#16E0D0]/30 transition-all backdrop-blur-md"
          />
        </div>

        {/* Notification Bell Icon */}
        <button
          className="relative p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4.5 h-4.5 text-[#A8BAC4]" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#061A24]" />
        </button>

        {/* User Profile Avatar SK */}
        <div className="relative cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00A89A] to-[#16E0D0] text-[#04131D] font-extrabold text-xs flex items-center justify-center shadow-md">
            SK
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#061A24]" />
        </div>
      </div>
    </header>
  );
};
