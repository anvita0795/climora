import React, { useState } from 'react';
import {
  Lightbulb,
  Cpu,
  MapPin,
  Thermometer,
  Calendar,
  Play,
  Maximize2,
  ChevronDown,
  BarChart3,
  ScatterChart as ScatterIcon,
  Layers,
  ArrowRight,
  TrendingUp,
  SlidersHorizontal,
} from 'lucide-react';
import {
  MOCK_MODEL_CONTEXT,
  MOCK_FEATURE_IMPORTANCE,
  MOCK_SHAP_POINTS,
  MOCK_WATERFALL_STEPS,
  MOCK_RELATIONSHIP_POINTS,
  MOCK_SCENARIO_COMPARISON,
} from '../../data/explainData';

export const ExplainPage: React.FC = () => {
  // Control Bar States
  const [explanationType, setExplanationType] = useState<string>('Prediction Explanation');
  const [selectedModel, setSelectedModel] = useState<string>('XGBoost (Ensemble)');
  const [selectedLocation, setSelectedLocation] = useState<string>('Chennai, India');
  const [selectedVariable, setSelectedVariable] = useState<string>('Temperature');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationState, setGenerationState] = useState<'idle' | 'loading' | 'success'>('idle');

  // Dropdown Visibility States
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showVarDropdown, setShowVarDropdown] = useState(false);

  // Secondary Dropdowns
  const [showTopFeaturesDropdown, setShowTopFeaturesDropdown] = useState(false);
  const [showShapDropdown, setShowShapDropdown] = useState(false);
  const [showRelDropdown, setShowRelDropdown] = useState(false);
  const [showScenarioDropdown, setShowScenarioDropdown] = useState(false);

  // Dropdown Options
  const typeOptions = ['Prediction Explanation', 'Feature Attribution', 'Global Importance', 'SHAP Summary'];
  const modelOptions = ['XGBoost (Ensemble)', 'LightGBM', 'LSTM Neural Network'];
  const locationOptions = ['Chennai, India', 'Mumbai, India', 'Delhi, India', 'Bengaluru, India'];
  const variableOptions = ['Temperature', 'Rainfall', 'CO₂', 'Humidity', 'Pressure', 'Climate Forcing'];

  // Handle Generate Explanation Action
  const handleGenerateExplanation = () => {
    setIsGenerating(true);
    setGenerationState('loading');
    setTimeout(() => {
      setIsGenerating(false);
      setGenerationState('success');
      setTimeout(() => setGenerationState('idle'), 2000);
    }, 700);
  };

  return (
    <div className="w-full h-full flex flex-col space-y-5 text-white overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-2 pt-2 pb-8 select-none">
      {/* 1. PAGE HEADER & CURRENT ANALYSIS CONTEXT */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 pt-1">
        {/* Left: Page Title & Identity */}
        <div className="space-y-1.5 py-1">
          <div className="flex items-center space-x-2 text-[#16E0D0] font-semibold text-xs tracking-[0.18em] uppercase">
            <span className="w-1.5 h-3.5 bg-[#16E0D0] rounded-full inline-block" />
            <span>EXPLAINABILITY</span>
          </div>
          <h1 className="text-3xl lg:text-4xl xl:text-[44px] font-extrabold text-white tracking-tight leading-none">
            Understand <span className="bg-gradient-to-r from-[#16E0D0] to-[#35D6F5] bg-clip-text text-transparent">AI Climate Predictions</span>
          </h1>
          <p className="text-xs lg:text-sm text-gray-300 font-medium max-w-xl leading-relaxed pt-0.5">
            Explore model explanations, feature importance and how different factors influence climate predictions and risk assessments.
          </p>
        </div>

        {/* Right: Current Analysis Context Glass Card */}
        <div className="glass-panel p-3.5 md:p-4 rounded-2xl w-full lg:w-[680px] shadow-2xl border border-white/20">
          <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-lg bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0]">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-white tracking-wide">Current Analysis Context</span>
            </div>
            <button className="text-[11px] font-semibold text-[#16E0D0] hover:text-[#35D6F5] flex items-center gap-1 transition-colors cursor-pointer">
              Change <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {/* Model */}
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#16E0D0] shrink-0">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-gray-400 font-medium">Model</p>
                <p className="text-xs font-semibold text-white truncate">{MOCK_MODEL_CONTEXT.model}</p>
              </div>
            </div>
            {/* Location */}
            <div className="flex items-center space-x-2 pl-1 border-l border-white/10">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#16E0D0] shrink-0">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-gray-400 font-medium">Location</p>
                <p className="text-xs font-semibold text-white truncate">{MOCK_MODEL_CONTEXT.location}</p>
              </div>
            </div>
            {/* Variable */}
            <div className="flex items-center space-x-2 pl-1 border-l border-white/10">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#16E0D0] shrink-0">
                <Thermometer className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-gray-400 font-medium">Variable</p>
                <p className="text-xs font-semibold text-white truncate">{MOCK_MODEL_CONTEXT.variable}</p>
              </div>
            </div>
            {/* Time Range */}
            <div className="flex items-center space-x-2 pl-1 border-l border-white/10">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#16E0D0] shrink-0">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-gray-400 font-medium">Time Range</p>
                <p className="text-xs font-semibold text-white truncate">{MOCK_MODEL_CONTEXT.timeRange}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PRIMARY CONTROL ROW (HORIZONTAL FILTERS + CTA BUTTON) */}
      <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full">
        {/* Explanation Type */}
        <div className="flex-[1.2] w-full relative min-w-0">
          <button
            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            className="w-full h-[58px] glass-panel px-4 py-2.5 flex items-center justify-between hover:border-[#16E0D0]/50 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0] shrink-0">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] uppercase tracking-wider text-gray-400 font-medium">Explanation Type</p>
                <p className="text-xs md:text-sm font-semibold text-white truncate">{explanationType}</p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-300 shrink-0 transition-transform ml-1 ${showTypeDropdown ? 'rotate-180 text-[#16E0D0]' : ''}`} />
          </button>
          {showTypeDropdown && (
            <div className="absolute top-full left-0 mt-1.5 w-full bg-[#082633]/95 border border-white/20 rounded-xl shadow-2xl py-1.5 z-30 backdrop-blur-2xl">
              {typeOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setExplanationType(opt);
                    setShowTypeDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                    explanationType === opt ? 'bg-[#16E0D0]/20 text-[#16E0D0] font-semibold' : 'text-gray-200 hover:bg-white/10'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Model Selector */}
        <div className="flex-1 w-full relative min-w-0">
          <button
            onClick={() => setShowModelDropdown(!showModelDropdown)}
            className="w-full h-[58px] glass-panel px-4 py-2.5 flex items-center justify-between hover:border-[#16E0D0]/50 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0] shrink-0">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] uppercase tracking-wider text-gray-400 font-medium">Model</p>
                <p className="text-xs md:text-sm font-semibold text-white truncate">{selectedModel}</p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-300 shrink-0 transition-transform ml-1 ${showModelDropdown ? 'rotate-180 text-[#16E0D0]' : ''}`} />
          </button>
          {showModelDropdown && (
            <div className="absolute top-full left-0 mt-1.5 w-full bg-[#082633]/95 border border-white/20 rounded-xl shadow-2xl py-1.5 z-30 backdrop-blur-2xl">
              {modelOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSelectedModel(opt);
                    setShowModelDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                    selectedModel === opt ? 'bg-[#16E0D0]/20 text-[#16E0D0] font-semibold' : 'text-gray-200 hover:bg-white/10'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Location Selector */}
        <div className="flex-1 w-full relative min-w-0">
          <button
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            className="w-full h-[58px] glass-panel px-4 py-2.5 flex items-center justify-between hover:border-[#16E0D0]/50 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0] shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] uppercase tracking-wider text-gray-400 font-medium">Location</p>
                <p className="text-xs md:text-sm font-semibold text-white truncate">{selectedLocation}</p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-300 shrink-0 transition-transform ml-1 ${showLocationDropdown ? 'rotate-180 text-[#16E0D0]' : ''}`} />
          </button>
          {showLocationDropdown && (
            <div className="absolute top-full left-0 mt-1.5 w-full bg-[#082633]/95 border border-white/20 rounded-xl shadow-2xl py-1.5 z-30 backdrop-blur-2xl">
              {locationOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSelectedLocation(opt);
                    setShowLocationDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                    selectedLocation === opt ? 'bg-[#16E0D0]/20 text-[#16E0D0] font-semibold' : 'text-gray-200 hover:bg-white/10'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Variable Selector */}
        <div className="flex-1 w-full relative min-w-0">
          <button
            onClick={() => setShowVarDropdown(!showVarDropdown)}
            className="w-full h-[58px] glass-panel px-4 py-2.5 flex items-center justify-between hover:border-[#16E0D0]/50 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0] shrink-0">
                <Thermometer className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] uppercase tracking-wider text-gray-400 font-medium">Variable</p>
                <p className="text-xs md:text-sm font-semibold text-white truncate">{selectedVariable}</p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-300 shrink-0 transition-transform ml-1 ${showVarDropdown ? 'rotate-180 text-[#16E0D0]' : ''}`} />
          </button>
          {showVarDropdown && (
            <div className="absolute top-full left-0 mt-1.5 w-full bg-[#082633]/95 border border-white/20 rounded-xl shadow-2xl py-1.5 z-30 backdrop-blur-2xl">
              {variableOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSelectedVariable(opt);
                    setShowVarDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                    selectedVariable === opt ? 'bg-[#16E0D0]/20 text-[#16E0D0] font-semibold' : 'text-gray-200 hover:bg-white/10'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Generate Explanation CTA */}
        <div className="flex-[1.2] w-full shrink-0 min-w-0">
          <button
            onClick={handleGenerateExplanation}
            disabled={isGenerating}
            className="w-full h-[58px] bg-gradient-to-r from-[#16E0D0] to-[#35D6F5] text-[#03141C] font-bold rounded-full px-5 py-2.5 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(22,224,208,0.45)] hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-80"
          >
            <Play className={`w-4 h-4 fill-[#03141C] ${isGenerating ? 'animate-spin' : ''}`} />
            <span className="text-xs md:text-sm tracking-tight whitespace-nowrap">
              {isGenerating ? 'Generating...' : generationState === 'success' ? 'Explanation Ready' : 'Generate Explanation'}
            </span>
          </button>
        </div>
      </div>

      {/* 3. PRIMARY ANALYSIS ROW (FEATURE IMPORTANCE & SHAP EXPLANATION - 49%/51%) */}
      <div className={`flex flex-col lg:flex-row items-stretch gap-5 transition-opacity duration-300 ${isGenerating ? 'opacity-50' : 'opacity-100'}`}>
        {/* Left Panel: Feature Importance (49%) */}
        <div className="w-full lg:w-[49%] glass-panel p-5 md:p-6 flex flex-col justify-between shadow-2xl min-h-[360px]">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0] shrink-0">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-white truncate">Feature Importance</h3>
                <p className="text-xs text-gray-300 truncate">Top factors influencing the prediction</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0 relative">
              <div className="relative">
                <button
                  onClick={() => setShowTopFeaturesDropdown(!showTopFeaturesDropdown)}
                  className="px-2.5 py-1 rounded-lg border border-white/20 bg-black/40 text-xs text-gray-200 font-medium flex items-center gap-1 cursor-pointer hover:border-[#16E0D0]/50 transition-colors"
                >
                  <span>Top 10 Features</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-300" />
                </button>
                {showTopFeaturesDropdown && (
                  <div className="absolute right-0 top-full mt-1.5 w-36 bg-[#082633]/95 border border-white/20 rounded-xl shadow-2xl py-1 z-30 backdrop-blur-2xl text-xs">
                    {['Top 5 Features', 'Top 10 Features', 'All Features'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setShowTopFeaturesDropdown(false)}
                        className="w-full text-left px-3 py-1.5 text-gray-200 hover:bg-white/10 transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button className="w-7 h-7 rounded-lg border border-white/20 bg-black/40 text-gray-300 hover:text-[#16E0D0] hover:border-[#16E0D0]/50 transition-colors flex items-center justify-center shrink-0 cursor-pointer shadow">
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Horizontal Bar Chart Container */}
          <div className="w-full flex-1 flex flex-col justify-between space-y-2 pt-1">
            {MOCK_FEATURE_IMPORTANCE.map((item, idx) => {
              const maxVal = 0.34;
              const widthPct = Math.max(4, (item.importance / maxVal) * 100);
              return (
                <div key={item.id} className="flex items-center text-xs space-x-3 group">
                  <span className="w-44 truncate text-gray-200 font-medium text-right text-[11px]">
                    {item.feature}
                  </span>
                  <div className="flex-1 h-3.5 bg-black/30 rounded-full overflow-hidden border border-white/5 relative">
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${widthPct}%`,
                        background:
                          idx === 0
                            ? 'linear-gradient(90deg, #16E0D0 0%, #35D6F5 50%, #E879F9 100%)'
                            : idx === 1
                            ? 'linear-gradient(90deg, #16E0D0 0%, #35D6F5 100%)'
                            : 'linear-gradient(90deg, #16E0D0 0%, #0284C7 100%)',
                      }}
                    />
                  </div>
                  <span className="w-10 text-right font-mono text-[11px] font-bold text-gray-300">
                    {item.importance.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Axis Scale */}
          <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono pt-3 border-t border-white/10 mt-2 pl-48 pr-10">
            <span>0</span>
            <span>0.1</span>
            <span>0.2</span>
            <span>0.3</span>
            <span>0.4</span>
          </div>
          <p className="text-[10px] text-gray-400 font-medium text-center mt-1">Importance Score</p>
        </div>

        {/* Right Panel: SHAP Explanation (Global View) (51%) */}
        <div className="w-full lg:w-[51%] glass-panel p-5 md:p-6 flex flex-col justify-between shadow-2xl min-h-[360px] relative">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0] shrink-0">
                <ScatterIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-white truncate">SHAP Explanation (Global View)</h3>
                <p className="text-xs text-gray-300 truncate">How each feature impacts the prediction</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0 relative">
              <div className="relative">
                <button
                  onClick={() => setShowShapDropdown(!showShapDropdown)}
                  className="px-2.5 py-1 rounded-lg border border-white/20 bg-black/40 text-xs text-gray-200 font-medium flex items-center gap-1 cursor-pointer hover:border-[#16E0D0]/50 transition-colors"
                >
                  <span>SHAP Summary</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-300" />
                </button>
                {showShapDropdown && (
                  <div className="absolute right-0 top-full mt-1.5 w-36 bg-[#082633]/95 border border-white/20 rounded-xl shadow-2xl py-1 z-30 backdrop-blur-2xl text-xs">
                    {['SHAP Summary', 'SHAP Dependence', 'Force Plot'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setShowShapDropdown(false)}
                        className="w-full text-left px-3 py-1.5 text-gray-200 hover:bg-white/10 transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button className="w-7 h-7 rounded-lg border border-white/20 bg-black/40 text-gray-300 hover:text-[#16E0D0] hover:border-[#16E0D0]/50 transition-colors flex items-center justify-center shrink-0 cursor-pointer shadow">
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* SHAP Beeswarm Plot Body */}
          <div className="w-full flex-1 flex items-stretch space-x-4 pt-1">
            {/* Feature Names Axis (Left) */}
            <div className="w-44 flex flex-col justify-between text-right text-[11px] font-medium text-gray-200 py-1">
              {MOCK_FEATURE_IMPORTANCE.map((f) => (
                <span key={f.id} className="truncate">
                  {f.feature}
                </span>
              ))}
            </div>

            {/* Beeswarm Plot Area */}
            <div className="flex-1 relative border-l border-r border-white/10 flex flex-col justify-between">
              {/* Center Baseline (x = 0) */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20 z-0" />

              {/* Feature Rows with Scattered Beeswarm Dots */}
              {MOCK_FEATURE_IMPORTANCE.map((f, rowIdx) => {
                const rowDots = MOCK_SHAP_POINTS.filter((p) => p.featureIndex === rowIdx);
                return (
                  <div key={f.id} className="relative h-4 w-full flex items-center z-10">
                    {rowDots.map((pt) => {
                      // Map shapValue (-2 to +2) to percentage (0% to 100%)
                      const leftPct = Math.min(96, Math.max(4, ((pt.shapValue + 2) / 4) * 100));
                      const topShift = pt.yJitter * 6;

                      // Color gradient mapping: low = cyan (#35D6F5), high = red/pink (#FF3B3B)
                      const dotColor =
                        pt.featureValue > 0.65
                          ? '#FF3B3B'
                          : pt.featureValue > 0.35
                          ? '#C084FC'
                          : '#35D6F5';

                      return (
                        <div
                          key={pt.id}
                          className="absolute w-2 h-2 rounded-full border border-black/40 transform -translate-x-1/2 hover:scale-150 hover:z-20 transition-transform"
                          style={{
                            left: `${leftPct}%`,
                            top: `calc(50% + ${topShift}px)`,
                            backgroundColor: dotColor,
                            boxShadow: `0 0 6px ${dotColor}`,
                          }}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Feature Value Gradient Legend Bar (Right) */}
            <div className="flex flex-col items-center justify-between text-[10px] text-gray-300 py-1 shrink-0">
              <span className="text-[9px] font-bold text-gray-400">Feature Value</span>
              <span className="text-red-400 font-semibold">High</span>
              <div className="w-2.5 h-32 rounded-full bg-gradient-to-b from-[#FF3B3B] via-[#C084FC] to-[#35D6F5] border border-white/20 shadow-md" />
              <span className="text-[#35D6F5] font-semibold">Low</span>
            </div>
          </div>

          {/* X Axis Labels */}
          <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono pt-3 border-t border-white/10 mt-2 pl-44 pr-12">
            <span>-2</span>
            <span>-1</span>
            <span>0</span>
            <span>1</span>
            <span>2</span>
          </div>
          <p className="text-[10px] text-gray-400 font-medium text-center mt-1">SHAP Value (Impact on Prediction)</p>
        </div>
      </div>

      {/* 4. SECONDARY ANALYTICS ROW (INDIVIDUAL PREDICTION, FEATURE RELATIONSHIP, SCENARIO COMPARISON - 42%/29%/29%) */}
      <div className={`flex flex-col lg:flex-row items-stretch gap-5 transition-opacity duration-300 ${isGenerating ? 'opacity-50' : 'opacity-100'}`}>
        {/* Panel 1: Individual Prediction Explanation (Waterfall Chart - 42%) */}
        <div className="w-full lg:w-[42%] glass-panel p-5 md:p-6 flex flex-col justify-between shadow-2xl min-h-[300px]">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0] shrink-0">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-white truncate">Individual Prediction Explanation</h3>
                <p className="text-xs text-gray-300 truncate">Feature contribution for the current prediction</p>
              </div>
            </div>
            <button className="w-7 h-7 rounded-lg border border-white/20 bg-black/40 text-gray-300 hover:text-[#16E0D0] hover:border-[#16E0D0]/50 transition-colors flex items-center justify-center shrink-0 cursor-pointer shadow">
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Custom Waterfall Chart Rendering */}
          <div className="w-full flex-1 flex items-end justify-between gap-2 pt-6 pb-2 px-1 relative">
            {/* Grid Line Baseline */}
            <div className="absolute inset-x-0 bottom-10 h-px bg-white/15" />

            {MOCK_WATERFALL_STEPS.map((step) => {
              const isBase = step.type === 'base';
              const isFinal = step.type === 'final';
              const isPos = step.type === 'positive';

              return (
                <div key={step.id} className="flex-1 flex flex-col items-center h-full justify-end group z-10">
                  {/* Step Value Label (Top) */}
                  <span
                    className={`text-[10px] font-bold font-mono mb-1.5 ${
                      isPos ? 'text-red-400' : isBase || isFinal ? 'text-white' : 'text-[#35D6F5]'
                    }`}
                  >
                    {step.formattedVal}
                  </span>

                  {/* Waterfall Bar Column */}
                  <div className="w-full max-w-[38px] flex flex-col justify-end h-32 relative">
                    {isBase || isFinal ? (
                      <div
                        className="w-full rounded-t border border-white/20 transition-all shadow-md"
                        style={{
                          height: `${(step.endVal / 35) * 100}%`,
                          backgroundColor: isFinal ? '#16E0D0' : 'rgba(255,255,255,0.25)',
                        }}
                      />
                    ) : (
                      <div
                        className="w-full rounded border border-white/20 transition-all shadow-md"
                        style={{
                          height: `${(Math.abs(step.contribution) / 8) * 100}%`,
                          marginBottom: `${((step.startVal - 22) / 14) * 100}%`,
                          backgroundColor: isPos ? '#FF3B3B' : '#35D6F5',
                        }}
                      />
                    )}
                  </div>

                  {/* Feature Category Label (Bottom) */}
                  <span className="text-[10px] font-medium text-gray-300 mt-2 text-center truncate max-w-full leading-tight">
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Panel 2: Feature Relationship (Scatter Plot - 29%) */}
        <div className="w-full lg:w-[29%] glass-panel p-5 md:p-6 flex flex-col justify-between shadow-2xl min-h-[300px]">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center space-x-2.5 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0] shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm md:text-base font-bold text-white truncate">Feature Relationship</h3>
                <p className="text-[11px] text-gray-300 truncate">Relationship between key features</p>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 shrink-0 relative">
              <div className="relative">
                <button
                  onClick={() => setShowRelDropdown(!showRelDropdown)}
                  className="px-2 py-1 rounded-lg border border-white/20 bg-black/40 text-[10px] text-gray-200 font-medium flex items-center gap-1 cursor-pointer hover:border-[#16E0D0]/50 transition-colors"
                >
                  <span className="truncate max-w-[90px]">Temp vs Hum</span>
                  <ChevronDown className="w-3 h-3 text-gray-300 shrink-0" />
                </button>
                {showRelDropdown && (
                  <div className="absolute right-0 top-full mt-1.5 w-36 bg-[#082633]/95 border border-white/20 rounded-xl shadow-2xl py-1 z-30 backdrop-blur-2xl text-xs">
                    {['Temp vs Humidity', 'Temp vs CO₂', 'Temp vs Pressure'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setShowRelDropdown(false)}
                        className="w-full text-left px-3 py-1.5 text-gray-200 hover:bg-white/10 transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button className="w-7 h-7 rounded-lg border border-white/20 bg-black/40 text-gray-300 hover:text-[#16E0D0] hover:border-[#16E0D0]/50 transition-colors flex items-center justify-center shrink-0 cursor-pointer shadow">
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Scatter Canvas Container */}
          <div className="w-full h-[180px] relative border-l border-b border-white/20 pt-2 pb-1 pr-2 flex flex-col justify-between">
            {/* Gridlines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-b border-white/30 w-full" />
              <div className="border-b border-white/30 w-full" />
              <div className="border-b border-white/30 w-full" />
              <div className="border-b border-white/30 w-full" />
            </div>

            {/* Scatter Dots */}
            {MOCK_RELATIONSHIP_POINTS.map((pt) => {
              const xPct = (pt.humidity / 100) * 100;
              const yPct = Math.min(95, Math.max(5, ((pt.predictedTemp - 20) / 20) * 100));
              return (
                <div
                  key={pt.id}
                  className="absolute w-2 h-2 rounded-full bg-[#16E0D0] border border-white/40 shadow-[0_0_8px_#16E0D0] opacity-80 hover:opacity-100 transition-opacity"
                  style={{ left: `${xPct}%`, bottom: `${yPct}%` }}
                />
              );
            })}

            {/* Linear Trend Line SVG Overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="5%" y1="85%" x2="95%" y2="15%" stroke="#35D6F5" strokeWidth="2" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* Axis Labels */}
          <div className="w-full flex items-center justify-between text-[10px] text-gray-400 font-mono pt-1">
            <span>0</span>
            <span>20</span>
            <span>40</span>
            <span>60</span>
            <span>80</span>
            <span>100</span>
          </div>
          <p className="text-[10px] text-gray-400 font-medium text-center mt-0.5">Humidity (%)</p>
        </div>

        {/* Panel 3: Scenario Comparison (Grouped Bar Chart - 29%) */}
        <div className="w-full lg:w-[29%] glass-panel p-5 md:p-6 flex flex-col justify-between shadow-2xl min-h-[300px]">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center space-x-2.5 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0] shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm md:text-base font-bold text-white truncate">Scenario Comparison</h3>
                <p className="text-[11px] text-gray-300 truncate">Feature impact across scenarios</p>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 shrink-0 relative">
              <div className="relative">
                <button
                  onClick={() => setShowScenarioDropdown(!showScenarioDropdown)}
                  className="px-2 py-1 rounded-lg border border-white/20 bg-black/40 text-[10px] text-gray-200 font-medium flex items-center gap-1 cursor-pointer hover:border-[#16E0D0]/50 transition-colors"
                >
                  <span className="truncate max-w-[80px]">Temperature</span>
                  <ChevronDown className="w-3 h-3 text-gray-300 shrink-0" />
                </button>
                {showScenarioDropdown && (
                  <div className="absolute right-0 top-full mt-1.5 w-36 bg-[#082633]/95 border border-white/20 rounded-xl shadow-2xl py-1 z-30 backdrop-blur-2xl text-xs">
                    {['Temperature', 'Precipitation', 'Risk Index'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setShowScenarioDropdown(false)}
                        className="w-full text-left px-3 py-1.5 text-gray-200 hover:bg-white/10 transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button className="w-7 h-7 rounded-lg border border-white/20 bg-black/40 text-gray-300 hover:text-[#16E0D0] hover:border-[#16E0D0]/50 transition-colors flex items-center justify-center shrink-0 cursor-pointer shadow">
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Grouped Bar Chart Body */}
          <div className="w-full h-[155px] flex items-end justify-between gap-3 pt-3 pb-1 border-b border-white/20">
            {MOCK_SCENARIO_COMPARISON.map((sc, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end space-y-1">
                <div className="w-full flex items-end justify-center gap-1 h-32">
                  <div
                    className="w-2 rounded-t bg-[#FF3B3B] transition-all shadow"
                    style={{ height: `${(sc.histTemp / 4) * 100}%` }}
                  />
                  <div
                    className="w-2 rounded-t bg-[#35D6F5] transition-all shadow"
                    style={{ height: `${(sc.co2Level / 4) * 100}%` }}
                  />
                  <div
                    className="w-2 rounded-t bg-[#A855F7] transition-all shadow"
                    style={{ height: `${(sc.humidity / 4) * 100}%` }}
                  />
                  <div
                    className="w-2 rounded-t bg-[#FF9F1C] transition-all shadow"
                    style={{ height: `${(sc.urbanHeat / 4) * 100}%` }}
                  />
                </div>
                <span className="text-[9px] font-medium text-gray-300 text-center leading-tight truncate w-full">
                  {sc.scenario.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Scenario Legend */}
          <div className="grid grid-cols-2 gap-y-1 gap-x-2 pt-2 text-[10px]">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF3B3B]" />
              <span className="text-gray-300 truncate">Historical Temp</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#35D6F5]" />
              <span className="text-gray-300 truncate">CO₂ Level</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#A855F7]" />
              <span className="text-gray-300 truncate">Humidity</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF9F1C]" />
              <span className="text-gray-300 truncate">Urban Heat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
