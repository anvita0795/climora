import React from 'react';

interface BrandLogoProps {
  collapsed?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ collapsed = false, className = '' }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Original minimal climate-inspired symbol */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#123B43] to-[#071923] border border-[#22D3C5]/30 glow-teal-sm group cursor-pointer">
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
        >
          {/* Atmospheric wave & climate circulation rings */}
          <circle cx="18" cy="18" r="14" stroke="#22D3C5" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="3 3" />
          <path
            d="M 8 18 C 12 12, 24 12, 28 18 C 24 24, 12 24, 8 18 Z"
            stroke="#67E8F9"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="18" cy="18" r="4" fill="#22D3C5" className="animate-pulse" />
          <path d="M 18 6 L 18 10 M 18 26 L 18 30 M 6 18 L 10 18 M 26 18 L 30 18" stroke="#22D3C5" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6" />
        </svg>
      </div>

      {!collapsed && (
        <div className="flex flex-col">
          <div className="flex items-center tracking-wider font-extrabold text-lg leading-none">
            <span className="text-white">CLIMORA</span>
            <span className="text-[#22D3C5] ml-1.5 glow-cyan-text">AI</span>
          </div>
          <span className="text-[9px] uppercase tracking-widest text-[#CBD5E1]/60 font-semibold mt-0.5">
            Climate Intelligence
          </span>
        </div>
      )}
    </div>
  );
};
