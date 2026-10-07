import React from 'react';
import type { IntelligenceEvent } from '../../types';
import { FileText, AlertTriangle, CloudRain, TrendingUp, Info, ArrowRight } from 'lucide-react';

interface RecentIntelligenceCardProps {
  events: IntelligenceEvent[];
  className?: string;
}

export const RecentIntelligenceCard: React.FC<RecentIntelligenceCardProps> = ({
  events,
  className = '',
}) => {
  const getEventIcon = (index: number) => {
    switch (index) {
      case 0:
        return (
          <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
            <AlertTriangle className="w-4 h-4" />
          </div>
        );
      case 1:
        return (
          <div className="w-8 h-8 rounded-full bg-[#00D4C3]/20 text-[#00D4C3] flex items-center justify-center border border-[#00D4C3]/30">
            <CloudRain className="w-4 h-4" />
          </div>
        );
      case 2:
        return (
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <TrendingUp className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
            <Info className="w-4 h-4" />
          </div>
        );
    }
  };

  const getBadgeStyle = (severity: string) => {
    if (severity === 'high') {
      return 'bg-rose-500/20 text-rose-300 border border-rose-500/30';
    }
    if (severity === 'moderate') {
      return 'bg-amber-500/20 text-amber-300 border border-amber-500/30';
    }
    return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
  };

  return (
    <div className={`glass-panel p-6 space-y-4 text-white ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <FileText className="w-4.5 h-4.5 text-[#00D4C3]" />
          <h4 className="text-sm font-bold text-white">Recent Intelligence</h4>
        </div>

        <button className="flex items-center gap-1 text-xs text-[#00D4C3] hover:underline font-semibold cursor-pointer">
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-3.5 pt-1">
        {events.map((evt, idx) => (
          <div key={evt.id} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {getEventIcon(idx)}
              <div>
                <div className="text-xs font-bold text-white tracking-tight">{evt.title}</div>
                <div className="text-[11px] text-[#94A3B8] font-medium mt-0.5">
                  {evt.timestamp} • {evt.location}
                </div>
              </div>
            </div>

            <span className={`px-3 py-1 rounded-full text-[10px] font-bold capitalize ${getBadgeStyle(evt.severity)}`}>
              {evt.severity === 'high' ? 'High' : evt.severity === 'moderate' ? 'Moderate' : 'Low'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
