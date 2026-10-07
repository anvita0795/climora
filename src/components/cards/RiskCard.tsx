import React from 'react';
import type { RiskSummary } from '../../types';
import { AlertCircle, ArrowRight } from 'lucide-react';

interface RiskCardProps {
  data: RiskSummary;
  onViewDetails?: () => void;
  className?: string;
}

export const RiskCard: React.FC<RiskCardProps> = ({
  data,
  onViewDetails,
  className = '',
}) => {
  return (
    <div className={`glass-risk p-4 px-5 text-white flex items-center justify-between w-full ${className}`}>
      {/* Left Icon & Text */}
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-full bg-rose-500/25 text-rose-400 flex items-center justify-center border border-rose-500/40 shrink-0">
          <AlertCircle className="w-5 h-5 fill-rose-500/30" />
        </div>
        <div>
          <div className="text-xs text-[#CBD5E1] font-semibold tracking-wide">Current Climate Risk</div>
          <div className="text-2xl font-black text-amber-400 tracking-wide mt-0.5 capitalize">
            {data.level.toLowerCase()}
          </div>
        </div>
      </div>

      {/* Right Progress Bar & Arrow */}
      <div className="flex items-center gap-4">
        {/* Horizontal bar */}
        <div className="w-32 sm:w-44 h-2.5 rounded-full bg-black/60 overflow-hidden p-0.5 border border-white/20">
          <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
        </div>

        <button
          onClick={onViewDetails}
          className="p-1 text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
