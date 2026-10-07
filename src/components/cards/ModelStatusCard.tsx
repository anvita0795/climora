import React from 'react';
import { GlassPanel } from '../ui/GlassPanel';
import { Badge } from '../ui/Badge';
import type { ModelStatusItem } from '../../types';
import { Cpu, CheckCircle2, Zap, GitBranch } from 'lucide-react';

interface ModelStatusCardProps {
  models: ModelStatusItem[];
  className?: string;
}

export const ModelStatusCard: React.FC<ModelStatusCardProps> = ({
  models,
  className = '',
}) => {
  const readyCount = models.filter((m) => m.status === 'Operational').length;

  return (
    <GlassPanel variant="secondary" className={`p-5 space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#22D3C5]/15 text-[#22D3C5] border border-[#22D3C5]/30">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white tracking-tight">ML Models Engine Status</h4>
            <p className="text-[10px] text-[#CBD5E1]/60 font-mono">Inference Pipeline Health</p>
          </div>
        </div>

        <Badge type="status" value={`${readyCount} / ${models.length} READY`} />
      </div>

      {/* Model List */}
      <div className="space-y-2.5">
        {models.map((model) => (
          <div
            key={model.id}
            className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#22D3C5]/30 transition-all text-xs"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#22D3C5]" />
              <div>
                <div className="font-bold text-white leading-tight">{model.name}</div>
                <div className="text-[10px] text-[#CBD5E1]/60 font-mono flex items-center gap-1">
                  <GitBranch className="w-3 h-3 text-[#67E8F9]" />
                  <span>{model.algorithm}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-[#22D3C5] flex items-center gap-0.5">
                <Zap className="w-3 h-3" />
                {model.latencyMs}ms
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-white/80 font-mono">
                {model.version}
              </span>
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
};
