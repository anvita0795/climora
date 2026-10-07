import React from 'react';

export const LiveBadge: React.FC<{ label?: string }> = ({ label = "LIVE — Backend" }) => (
  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
    {label}
  </span>
);

export const DemoBadge: React.FC<{ label?: string }> = ({ label = "DEMO — Sample Data" }) => (
  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
    {label}
  </span>
);
