import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

interface HeroSectionProps {
  onExploreData?: () => void;
  onWatchDemo?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreData,
  onWatchDemo,
}) => {
  return (
    <div className="space-y-4 max-w-xl py-1">
      {/* Eyebrow */}
      <div className="text-sm font-medium text-white/90 tracking-wide font-heading">
        Data Today. A Safer Tomorrow.
      </div>

      {/* Main Headline Stack (Sinteca Font) */}
      <div className="space-y-1">
        <h1 className="text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none font-heading">
          CLIMORA <span className="text-[#00D4C3] font-black">AI</span>
        </h1>
        <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight font-heading">
          Advanced Climate Intelligence Platform
        </h2>
      </div>

      {/* Paragraph (Medium size) */}
      <div className="text-sm lg:text-base text-[#CBD5E1]/95 leading-relaxed font-normal space-y-1 max-w-lg">
        <p>Turning climate data into actionable intelligence.</p>
        <p>Explore real-world climate patterns, predict future conditions, assess risks, and detect anomalies – all in one platform.</p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3.5 pt-2">
        {/* Primary CTA */}
        <button
          onClick={onExploreData}
          className="btn-cyan-glow px-6 py-3 rounded-full flex items-center gap-2 text-sm font-bold cursor-pointer font-heading"
        >
          <span>Explore Climate Data</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Secondary CTA */}
        <button
          onClick={onWatchDemo}
          className="btn-secondary-glass px-6 py-3 rounded-full flex items-center gap-2 text-sm font-semibold cursor-pointer font-heading"
        >
          <div className="w-4.5 h-4.5 rounded-full bg-white text-[#071722] flex items-center justify-center pl-0.5">
            <Play className="w-2.5 h-2.5 fill-current" />
          </div>
          <span>Watch Demo</span>
        </button>
      </div>
    </div>
  );
};
