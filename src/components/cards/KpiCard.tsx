import React from 'react';
import type { KpiMetric } from '../../types';
import { BarChart2, Database, AlertTriangle, ShieldCheck, GitBranch } from 'lucide-react';

interface KpiCardProps {
  metric: KpiMetric;
  className?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({ metric, className = '' }) => {
  const isObs = metric.id === 'kpi-obs';
  const isVars = metric.id === 'kpi-vars';
  const isAnom = metric.id === 'kpi-anom';
  const isRisk = metric.id === 'kpi-risk';

  return (
    <div className={`glass-panel p-5 flex flex-col justify-between items-start min-h-[145px] w-full text-white ${className}`}>
      {/* Top Icon Badge */}
      <div className="flex items-center justify-between w-full">
        {isObs && (
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <BarChart2 className="w-5 h-5" />
          </div>
        )}
        {isVars && (
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Database className="w-5 h-5" />
          </div>
        )}
        {isAnom && (
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <AlertTriangle className="w-5 h-5" />
          </div>
        )}
        {isRisk && (
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
        )}
        {!isObs && !isVars && !isAnom && !isRisk && (
          <div className="w-10 h-10 rounded-xl bg-[#00D4C3]/20 text-[#00D4C3] flex items-center justify-center border border-[#00D4C3]/30">
            <GitBranch className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Center Value */}
      <div className="my-1">
        <div className="text-3xl lg:text-3.5xl font-black text-white tracking-tight">{metric.value}</div>
      </div>

      {/* Bottom Label & Subtext */}
      <div className="w-full space-y-0.5">
        <div className="text-xs font-semibold text-[#94A3B8] tracking-tight">{metric.label}</div>

        {metric.change && (
          <div className={`text-xs font-bold flex items-center gap-1 ${metric.changeType === 'positive' ? 'text-emerald-400' : 'text-rose-400'}`}>
            <span>▲ {metric.change}</span>
            <span className="text-[#94A3B8] font-normal truncate text-[11px]">{metric.subtext}</span>
          </div>
        )}

        {isRisk && (
          <div className="w-full h-1.5 rounded-full bg-black/40 overflow-hidden mt-1 border border-white/10">
            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-emerald-400 to-amber-400" />
          </div>
        )}

        {!metric.change && !isRisk && (
          <div className="text-[11px] text-[#94A3B8] font-normal truncate">
            {metric.subtext}
          </div>
        )}
      </div>
    </div>
  );
};
