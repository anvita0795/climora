import React, { useState } from 'react';
import type { TrendPoint } from '../../types';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { BarChart3 } from 'lucide-react';

interface ClimateTrendChartProps {
  data: TrendPoint[];
  className?: string;
}

export const ClimateTrendChart: React.FC<ClimateTrendChartProps> = ({
  data,
  className = '',
}) => {
  const [activeRange, setActiveRange] = useState<'7D' | '30D' | '3M' | '1Y'>('30D');

  return (
    <div className={`glass-panel p-6 space-y-4 text-white ${className}`}>
      {/* Chart Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <BarChart3 className="w-5 h-5 text-[#00D4C3]" />
          <h4 className="text-base font-bold text-white tracking-tight">Temperature Trend</h4>
        </div>

        {/* Range Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-black/40 border border-white/10 text-xs">
          {(['7D', '30D', '3M', '1Y'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                activeRange === range
                  ? 'bg-[#00D4C3] text-[#071722] shadow-[0_0_12px_rgba(0,212,195,0.4)]'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-52 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTempGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D4C3" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#00D4C3" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />

            <XAxis
              dataKey="time"
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            />

            <YAxis
              domain={[18, 38]}
              ticks={[20, 25, 30, 35]}
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              unit="°C"
            />

            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(8, 20, 28, 0.95)',
                borderColor: 'rgba(0, 212, 195, 0.5)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '12px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
              }}
              itemStyle={{ color: '#00D4C3', fontWeight: 'bold' }}
              formatter={(val: any) => [`${val}°C`, 'Temperature']}
              labelFormatter={(label: any) => `Date: ${label}`}
            />

            <Area
              type="monotone"
              dataKey="temperature"
              stroke="#00D4C3"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorTempGlow)"
              dot={{ r: 4, fill: '#00D4C3', strokeWidth: 2, stroke: '#FFFFFF' }}
              activeDot={{ r: 7, fill: '#FFFFFF', stroke: '#00D4C3', strokeWidth: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
