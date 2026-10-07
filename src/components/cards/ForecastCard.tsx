import React from 'react';
import type { ForecastDay } from '../../types';
import { Calendar, ArrowRight, Sun, Cloud, CloudRain } from 'lucide-react';

interface ForecastCardProps {
  days: ForecastDay[];
  onViewAll?: () => void;
  className?: string;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({
  days,
  onViewAll,
  className = '',
}) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'rain':
        return <CloudRain className="w-6 h-6 text-sky-400 stroke-[1.8]" />;
      case 'cloud':
        return <Cloud className="w-6 h-6 text-slate-300 stroke-[1.8]" />;
      default:
        return (
          <div className="relative text-amber-400">
            <Sun className="w-6 h-6 stroke-[1.8]" />
          </div>
        );
    }
  };

  return (
    <div className={`glass-panel p-5 px-6 text-white space-y-4 w-full ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Calendar className="w-4.5 h-4.5 text-[#94A3B8]" />
          <span className="text-sm font-bold text-white">Next 5 Days Forecast</span>
        </div>

        <button
          onClick={onViewAll}
          className="p-1 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* 5 Day Forecast Grid */}
      <div className="grid grid-cols-5 gap-3 text-center pt-2 border-t border-white/10">
        {days.map((item) => (
          <div key={item.day} className="flex flex-col items-center space-y-2 py-1">
            <span className="text-xs font-semibold text-[#94A3B8]">{item.day}</span>
            <div className="py-1">{getWeatherIcon(item.condition)}</div>
            <div className="text-base font-bold text-white">{item.highTemp}°</div>
            <div className="text-xs font-medium text-[#94A3B8]">{item.lowTemp}°</div>
          </div>
        ))}
      </div>
    </div>
  );
};
