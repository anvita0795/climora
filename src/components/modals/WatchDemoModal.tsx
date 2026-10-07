import React from 'react';
import { Play, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface WatchDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WatchDemoModal: React.FC<WatchDemoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-fadeIn select-none">
      <div className="relative w-full max-w-3xl glass-panel p-6 border border-white/20 shadow-2xl rounded-2xl text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#16E0D0]/20 flex items-center justify-center text-[#16E0D0]">
            <Play className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">CLIMORA AI Platform Walkthrough</h3>
            <p className="text-xs text-[#A8BAC4]">Product Overview & Real-time Climate Telemetry</p>
          </div>
        </div>

        {/* Video Player Frame Container */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/15 bg-black/80 flex items-center justify-center shadow-inner group">
          <img
            src="/assets/data_bg.jpg"
            alt="Demo Walkthrough"
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Central Play Button */}
          <div className="relative z-10 flex flex-col items-center justify-center cursor-pointer group-hover:scale-110 transition-transform">
            <div className="w-16 h-16 rounded-full bg-[#16E0D0] text-[#04131D] flex items-center justify-center shadow-[0_0_30px_rgba(22,224,208,0.7)] pl-1">
              <Play className="w-8 h-8 fill-current" />
            </div>
            <span className="text-xs font-bold text-white mt-3 tracking-wider uppercase bg-black/60 px-3 py-1 rounded-full border border-white/20">
              Interactive 4K Demo Stream
            </span>
          </div>

          {/* Video Controls overlay */}
          <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5 text-[#16E0D0] font-semibold">
              <Sparkles className="w-4 h-4" /> Live AI Ensemble Simulation
            </span>
            <span>02:45 / 04:30</span>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#A8BAC4]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>XGBoost & Spatial LSTM Neural Forecasting</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full text-xs font-bold bg-[#16E0D0] text-[#04131D] hover:bg-[#25ECE0] transition-colors cursor-pointer"
          >
            Close Demo
          </button>
        </div>
      </div>
    </div>
  );
};
