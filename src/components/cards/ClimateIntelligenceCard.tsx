import React from 'react';
import type { ClimateSummary } from '../../types';
import { MapPin, Sun, Cloud, Droplets, Wind, CloudRain, Leaf } from 'lucide-react';

interface ClimateIntelligenceCardProps {
  data: ClimateSummary;
  className?: string;
}

export const ClimateIntelligenceCard: React.FC<ClimateIntelligenceCardProps> = ({
  data,
  className = '',
}) => {
  const { location, metrics, lastUpdated } = data;

  return (
    <div className={`glass-panel p-6 space-y-4 text-white w-full ${className}`}>
      {/* Location & Timestamp Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 text-base font-bold">
          <MapPin className="w-4.5 h-4.5 text-[#00D4C3]" />
          <span>{location}</span>
        </div>
        <div className="text-xs text-[#94A3B8] font-mono">
          {lastUpdated}
        </div>
      </div>

      {/* Main Weather Information Row */}
      <div className="flex items-center justify-between pt-1">
        {/* Left: Weather Icon & Temperature */}
        <div className="flex items-center gap-4">
          <div className="relative text-amber-400">
            <Sun className="w-11 h-11 stroke-[1.8]" />
            <Cloud className="w-7 h-7 text-slate-300 absolute -bottom-1 -right-1 stroke-[1.8]" />
          </div>
          <div>
            <div className="text-5xl font-black text-white leading-none tracking-tight">
              {metrics.temperature}°C
            </div>
            <div className="text-sm font-semibold text-white/90 mt-1">
              {metrics.conditionText}
            </div>
            <div className="text-xs text-[#94A3B8] font-medium mt-0.5">
              Feels like {metrics.feelsLike}°C
            </div>
          </div>
        </div>

        {/* Right: Parameters Column */}
        <div className="space-y-2 text-xs text-[#CBD5E1]">
          <div className="flex items-center gap-6 justify-between">
            <span className="flex items-center gap-2 text-[#94A3B8]">
              <Droplets className="w-4 h-4 text-[#00D4C3]" /> Humidity
            </span>
            <span className="font-bold text-white text-sm">{metrics.humidity}%</span>
          </div>

          <div className="flex items-center gap-6 justify-between">
            <span className="flex items-center gap-2 text-[#94A3B8]">
              <Wind className="w-4 h-4 text-[#00D4C3]" /> Wind
            </span>
            <span className="font-bold text-white text-sm">{metrics.windSpeed} km/h</span>
          </div>

          <div className="flex items-center gap-6 justify-between">
            <span className="flex items-center gap-2 text-[#94A3B8]">
              <CloudRain className="w-4 h-4 text-[#00D4C3]" /> Precipitation
            </span>
            <span className="font-bold text-white text-sm">{metrics.precipitation}%</span>
          </div>

          <div className="flex items-center gap-6 justify-between">
            <span className="flex items-center gap-2 text-[#94A3B8]">
              <Leaf className="w-4 h-4 text-[#00D4C3]" /> Air Quality
            </span>
            <span className="font-bold text-white text-sm">{metrics.airQuality}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
