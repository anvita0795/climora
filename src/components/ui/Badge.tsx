import React from 'react';
import type { RiskLevel, EventSeverity } from '../../types';

interface BadgeProps {
  type: 'risk' | 'severity' | 'status';
  value: RiskLevel | EventSeverity | string;
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  type,
  value,
  size = 'md',
  className = '',
}) => {
  const upperVal = String(value).toUpperCase();

  let colorClasses = 'bg-teal-500/20 text-teal-300 border-teal-500/30';

  if (type === 'risk' || type === 'severity') {
    if (upperVal === 'LOW') {
      colorClasses = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    } else if (upperVal === 'MODERATE') {
      colorClasses = 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    } else if (upperVal === 'HIGH') {
      colorClasses = 'bg-orange-500/15 text-orange-400 border-orange-500/30';
    } else if (upperVal === 'CRITICAL') {
      colorClasses = 'bg-rose-500/20 text-rose-400 border-rose-500/40 glow-rose-sm';
    }
  } else if (type === 'status') {
    if (upperVal.includes('READY') || upperVal.includes('OPERATIONAL') || upperVal.includes('ONLINE')) {
      colorClasses = 'bg-[#22D3C5]/15 text-[#22D3C5] border-[#22D3C5]/30';
    } else {
      colorClasses = 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  }

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold tracking-wider uppercase rounded-full border backdrop-blur-sm ${sizeClasses} ${colorClasses} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {String(value)}
    </span>
  );
};
