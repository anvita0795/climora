import React, { useState } from 'react';
import {
  MapPin,
  Thermometer,
  Calendar,
  Cpu,
  Play,
  Maximize2,
  ChevronDown,
  SlidersHorizontal,
  FileText,
  TrendingUp,
  TrendingDown,
  Scale,
  Target,
  BarChart2,
  Settings,
  Sparkles,
  ArrowRight,
  Box,
  Activity,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  MOCK_PREDICTION_SETTINGS,
  MOCK_PREDICTION_SERIES,
  MOCK_PREDICTION_SUMMARY,
  MOCK_SCENARIO_COMPARISON,
  MOCK_MODEL_PERFORMANCE,
  MOCK_FEATURE_IMPORTANCE,
} from '../../data/predictionData';

export const PredictionPage: React.FC = () => {
  // Control States
  const [selectedLocation, setSelectedLocation] = useState<string>('Chennai, India');
  const [selectedVariable, setSelectedVariable] = useState<string>('Temperature');
  const [forecastHorizon, setForecastHorizon] = useState<string>('Next 12 Months');
  const [selectedModel, setSelectedModel] = useState<string>('XGBoost (Ensemble)');
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Dropdown States
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showVarDropdown, setShowVarDropdown] = useState(false);
  const [showHorizonDropdown, setShowHorizonDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);

  // Options
  const locationOptions = ['Chennai, India', 'Mumbai, India', 'Delhi, India', 'Bengaluru, India'];
  const variableOptions = ['Temperature', 'Rainfall', 'CO₂', 'Humidity', 'Pressure', 'Climate Forcing'];
  const horizonOptions = ['Next 3 Months', 'Next 6 Months', 'Next 12 Months', 'Next 24 Months', 'Next 5 Years'];
  const modelOptions = ['XGBoost (Ensemble)', 'LightGBM', 'LSTM'];

  // Handle Run Prediction
  const handleRunPrediction = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 600);
  };

  return (
    <div className="w-full h-full flex flex-col space-y-6 text-white overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-2 pt-3 pb-8 select-none">
      {/* 1. PAGE HEADER & PREDICTION SETTINGS CARD */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-1">
        {/* Left: Title & Identity */}
        <div className="space-y-2 py-2">
          <div className="flex items-center space-x-2 text-[#16E0D0] font-semibold text-xs tracking-[0.18em] uppercase">
            <span className="w-1.5 h-3.5 bg-[#16E0D0] rounded-full inline-block" />
            <span>CLIMATE PREDICTION</span>
          </div>
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-snug">
            Predict Future <span className="text-[#16E0D0]">Climate Conditions</span>
          </h1>
          <p className="text-xs lg:text-sm text-gray-200 font-medium max-w-2xl leading-relaxed">
            Leverage AI models to forecast key climate variables and explore future scenarios across different time horizons.
          </p>
        </div>

        {/* Right: Prediction Settings Card */}
        <div className="glass-panel p-4 w-full lg:w-auto min-w-[340px] max-w-[380px] shadow-2xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/15">
            <div className="flex items-center space-x-2 text-white font-semibold text-xs md:text-sm">
              <Settings className="w-4 h-4 text-[#16E0D0]" />
              <span>Prediction Settings</span>
            </div>
            <button className="px-3 py-1 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-xs text-gray-200 font-medium transition-all cursor-pointer">
              Advanced
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-0.5">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-300 font-medium">Dataset</p>
              <p className="text-xs font-semibold text-white truncate" title={MOCK_PREDICTION_SETTINGS.dataset}>
                {MOCK_PREDICTION_SETTINGS.dataset}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-300 font-medium">Base Period</p>
              <p className="text-xs font-semibold text-white">{MOCK_PREDICTION_SETTINGS.basePeriod}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-300 font-medium">Scenario</p>
              <p className="text-xs font-semibold text-[#16E0D0] truncate" title={MOCK_PREDICTION_SETTINGS.scenario}>
                {MOCK_PREDICTION_SETTINGS.scenario}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN PREDICTION CONTROL ROW (HORIZONTAL FILTERS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
        {/* Location Selector (Col Span 3) */}
        <div className="lg:col-span-3 relative">
          <button
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            className="w-full h-[60px] glass-panel px-4 py-3 flex items-center justify-between hover:border-[#16E0D0]/50 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0]">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="truncate">
                <p className="text-[10px] uppercase tracking-wider text-gray-300 font-medium">Location</p>
                <p className="text-xs md:text-sm font-semibold text-white truncate">{selectedLocation}</p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-300 shrink-0 transition-transform ${showLocationDropdown ? 'rotate-180 text-[#16E0D0]' : ''}`} />
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

        {/* Variable Selector (Col Span 2) */}
        <div className="lg:col-span-2 relative">
          <button
            onClick={() => setShowVarDropdown(!showVarDropdown)}
            className="w-full h-[60px] glass-panel px-4 py-3 flex items-center justify-between hover:border-[#16E0D0]/50 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0]">
                <Thermometer className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-300 font-medium">Variable</p>
                <p className="text-xs md:text-sm font-semibold text-white">{selectedVariable}</p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-300 shrink-0 transition-transform ${showVarDropdown ? 'rotate-180 text-[#16E0D0]' : ''}`} />
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

        {/* Forecast Horizon Selector (Col Span 2.5) */}
        <div className="lg:col-span-3 relative">
          <button
            onClick={() => setShowHorizonDropdown(!showHorizonDropdown)}
            className="w-full h-[60px] glass-panel px-4 py-3 flex items-center justify-between hover:border-[#16E0D0]/50 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0]">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-300 font-medium">Forecast Horizon</p>
                <p className="text-xs md:text-sm font-semibold text-white">{forecastHorizon}</p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-300 shrink-0 transition-transform ${showHorizonDropdown ? 'rotate-180 text-[#16E0D0]' : ''}`} />
          </button>
          {showHorizonDropdown && (
            <div className="absolute top-full left-0 mt-1.5 w-full bg-[#082633]/95 border border-white/20 rounded-xl shadow-2xl py-1.5 z-30 backdrop-blur-2xl">
              {horizonOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setForecastHorizon(opt);
                    setShowHorizonDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                    forecastHorizon === opt ? 'bg-[#16E0D0]/20 text-[#16E0D0] font-semibold' : 'text-gray-200 hover:bg-white/10'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Model Selector (Col Span 2.5) */}
        <div className="lg:col-span-2 relative">
          <button
            onClick={() => setShowModelDropdown(!showModelDropdown)}
            className="w-full h-[60px] glass-panel px-4 py-3 flex items-center justify-between hover:border-[#16E0D0]/50 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0]">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="truncate">
                <p className="text-[10px] uppercase tracking-wider text-gray-300 font-medium">Model</p>
                <p className="text-xs md:text-sm font-semibold text-white truncate">{selectedModel}</p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-300 shrink-0 transition-transform ${showModelDropdown ? 'rotate-180 text-[#16E0D0]' : ''}`} />
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

        {/* Run Prediction Button & Secondary Icon Button (Col Span 2) */}
        <div className="lg:col-span-2 flex items-center space-x-2">
          <button
            onClick={handleRunPrediction}
            disabled={isRunning}
            className="flex-1 h-[60px] bg-gradient-to-r from-[#16E0D0] to-[#35D6F5] text-[#03141C] font-bold rounded-full px-5 py-3 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(22,224,208,0.45)] hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-75"
          >
            <Play className={`w-4 h-4 fill-[#03141C] ${isRunning ? 'animate-spin' : ''}`} />
            <span className="text-xs md:text-sm tracking-wide whitespace-nowrap">
              {isRunning ? 'Analyzing...' : 'Run Prediction'}
            </span>
          </button>
          <button className="w-[60px] h-[60px] shrink-0 glass-panel rounded-full flex items-center justify-center text-gray-300 hover:text-[#16E0D0] transition-colors cursor-pointer">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. PRIMARY CONTENT ROW (FORECAST CHART & PREDICTION SUMMARY - 65%/35%) */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 transition-opacity duration-300 ${isRunning ? 'opacity-50' : 'opacity-100'}`}>
        {/* Left Panel: Temperature Forecast (7 of 12 cols ~ 65%) */}
        <div className="lg:col-span-8 glass-panel p-5 md:p-6 flex flex-col justify-between shadow-2xl min-h-[340px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0]">
                <Thermometer className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  {selectedVariable} Forecast
                </h3>
                <p className="text-xs text-gray-300">Predicted monthly average {selectedVariable.toLowerCase()} with uncertainty range</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="px-3 py-1 rounded-lg border border-white/20 bg-black/40 text-xs text-gray-200 font-medium flex items-center gap-1 cursor-pointer">
                {forecastHorizon} <ChevronDown className="w-3.5 h-3.5 text-gray-300" />
              </button>
              <button className="text-gray-300 hover:text-[#16E0D0] p-1.5 transition-colors cursor-pointer">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chart Canvas */}
          <div className="w-full h-[230px] md:h-[250px] pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={MOCK_PREDICTION_SERIES} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="uncertaintyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#16E0D0" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#16E0D0" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.12)" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="rgba(255,255,255,0.4)"
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.4)"
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                  domain={[20, 40]}
                  unit="°C"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(7, 35, 45, 0.95)',
                    borderColor: 'rgba(22, 224, 208, 0.4)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(val: any, name: any) => {
                    if (name === 'historicalTemp') return [`${val} °C`, 'Historical'];
                    if (name === 'predictedTemp') return [`${val} °C`, 'Predicted'];
                    return [val, name];
                  }}
                />
                {/* Uncertainty Range Band */}
                <Area
                  type="monotone"
                  dataKey="bandRange"
                  stroke="none"
                  fill="url(#uncertaintyGrad)"
                />
                {/* Historical Line (Dashed) */}
                <Line
                  type="monotone"
                  dataKey="historicalTemp"
                  stroke="rgba(255,255,255,0.7)"
                  strokeDasharray="4 4"
                  strokeWidth={2}
                  dot={{ r: 4, fill: 'rgba(255,255,255,0.7)' }}
                  connectNulls
                />
                {/* Predicted Line (Solid Cyan) */}
                <Line
                  type="monotone"
                  dataKey="predictedTemp"
                  stroke="#16E0D0"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#16E0D0', stroke: '#fff' }}
                  activeDot={{ r: 6, fill: '#16E0D0' }}
                  connectNulls
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Chart Legend */}
          <div className="flex items-center justify-center space-x-6 pt-2 text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white/70" />
              <span className="text-gray-300 font-medium">Historical</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16E0D0]" />
              <span className="text-gray-300 font-medium">Predicted</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-4 h-2.5 rounded bg-[#16E0D0]/30 border border-[#16E0D0]/60" />
              <span className="text-gray-300 font-medium">Uncertainty Range</span>
            </div>
          </div>
        </div>

        {/* Right Panel: Prediction Summary (5 of 12 cols ~ 35%) */}
        <div className="lg:col-span-4 glass-panel p-5 md:p-6 flex flex-col justify-between shadow-2xl min-h-[340px] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0]">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Prediction Summary</h3>
              </div>
            </div>

            <button className="text-xs text-[#16E0D0] hover:underline font-semibold flex items-center gap-1 cursor-pointer">
              View Details <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3 Metric Sub-Blocks */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col justify-between">
              <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-400 mb-2">
                <Thermometer className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-lg md:text-xl font-extrabold text-white">{MOCK_PREDICTION_SUMMARY.peakTemp}</p>
                <p className="text-[11px] font-semibold text-gray-200 mt-0.5">Predicted Peak</p>
                <p className="text-[10px] text-gray-400">{MOCK_PREDICTION_SUMMARY.peakMonthYear}</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col justify-between">
              <div className="w-7 h-7 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-300 mb-2">
                <TrendingDown className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-lg md:text-xl font-extrabold text-white">{MOCK_PREDICTION_SUMMARY.lowTemp}</p>
                <p className="text-[11px] font-semibold text-gray-200 mt-0.5">Predicted Low</p>
                <p className="text-[10px] text-gray-400">{MOCK_PREDICTION_SUMMARY.lowMonthYear}</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col justify-between">
              <div className="w-7 h-7 rounded-lg bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0] mb-2">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-lg md:text-xl font-extrabold text-[#16E0D0]">{MOCK_PREDICTION_SUMMARY.changeFromAvg}</p>
                <p className="text-[11px] font-semibold text-gray-200 mt-0.5">Change from</p>
                <p className="text-[10px] text-gray-400">Historical Avg.</p>
              </div>
            </div>
          </div>

          {/* Key Insight Box */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex items-start space-x-3">
            <div className="w-7 h-7 rounded-lg bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0] shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white">Key Insight</h4>
                <ArrowRight className="w-3.5 h-3.5 text-[#16E0D0]" />
              </div>
              <p className="text-xs text-gray-300 leading-relaxed mt-1">
                {MOCK_PREDICTION_SUMMARY.keyInsight}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SECONDARY ANALYTICS ROW (SCENARIO, MODEL PERFORMANCE, FEATURE IMPORTANCE - 45%/27.5%/27.5%) */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 transition-opacity duration-300 ${isRunning ? 'opacity-50' : 'opacity-100'}`}>
        {/* Panel 1: Scenario Comparison (5.5 of 12 cols ~ 45%) */}
        <div className="lg:col-span-5 glass-panel p-5 md:p-6 flex flex-col justify-between shadow-2xl min-h-[290px]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0]">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Scenario Comparison</h3>
                <p className="text-xs text-gray-300">Compare different climate scenarios</p>
              </div>
            </div>

            <button className="px-2.5 py-1 rounded-lg border border-white/20 bg-black/40 text-xs text-gray-200 font-medium flex items-center gap-1 cursor-pointer">
              {selectedVariable} <ChevronDown className="w-3.5 h-3.5 text-gray-300" />
            </button>
          </div>

          {/* Legend */}
          <div className="flex items-center space-x-4 mb-2 text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/70" />
              <span className="text-gray-300 font-medium">Historical</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6]" />
              <span className="text-gray-300 font-medium">SSP1-2.6</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#35D6F5]" />
              <span className="text-gray-300 font-medium">SSP2-4.5</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7]" />
              <span className="text-gray-300 font-medium">SSP5-8.5</span>
            </div>
          </div>

          <div className="w-full h-[190px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_SCENARIO_COMPARISON} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.12)" vertical={false} />
                <XAxis
                  dataKey="year"
                  stroke="rgba(255,255,255,0.4)"
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.4)"
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                  domain={[20, 40]}
                  unit="°C"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(7, 35, 45, 0.95)',
                    borderColor: 'rgba(22, 224, 208, 0.4)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Line type="monotone" dataKey="historical" stroke="rgba(255,255,255,0.6)" strokeDasharray="3 3" strokeWidth={1.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="ssp126" stroke="#14B8A6" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="ssp245" stroke="#35D6F5" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="ssp585" stroke="#A855F7" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Panel 2: Model Performance (3.25 of 12 cols ~ 27.5%) */}
        <div className="lg:col-span-3 glass-panel p-5 md:p-6 flex flex-col justify-between shadow-2xl min-h-[290px]">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0]">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Model Performance</h3>
              <p className="text-xs text-gray-300">Evaluation metrics on test data</p>
            </div>
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3 my-auto">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col justify-between">
              <div className="w-6 h-6 rounded-lg bg-cyan-500/15 flex items-center justify-center text-cyan-300 mb-1">
                <Box className="w-3.5 h-3.5" />
              </div>
              <p className="text-lg font-extrabold text-white">{MOCK_MODEL_PERFORMANCE[0].value}</p>
              <p className="text-[11px] text-gray-300 font-medium">{MOCK_MODEL_PERFORMANCE[0].label}</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col justify-between">
              <div className="w-6 h-6 rounded-lg bg-purple-500/15 flex items-center justify-center text-purple-300 mb-1">
                <Activity className="w-3.5 h-3.5" />
              </div>
              <p className="text-lg font-extrabold text-white">{MOCK_MODEL_PERFORMANCE[1].value}</p>
              <p className="text-[11px] text-gray-300 font-medium">{MOCK_MODEL_PERFORMANCE[1].label}</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col justify-between">
              <div className="w-6 h-6 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-300 mb-1">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <p className="text-lg font-extrabold text-white">{MOCK_MODEL_PERFORMANCE[2].value}</p>
              <p className="text-[11px] text-gray-300 font-medium">{MOCK_MODEL_PERFORMANCE[2].label}</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col justify-between">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-300 mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <p className="text-lg font-extrabold text-[#16E0D0]">{MOCK_MODEL_PERFORMANCE[3].value}</p>
              <p className="text-[11px] text-gray-300 font-medium">{MOCK_MODEL_PERFORMANCE[3].label}</p>
            </div>
          </div>
        </div>

        {/* Panel 3: Feature Importance (3.25 of 12 cols ~ 27.5%) */}
        <div className="lg:col-span-4 glass-panel p-5 md:p-6 flex flex-col justify-between shadow-2xl min-h-[290px]">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0]">
              <BarChart2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Feature Importance</h3>
              <p className="text-xs text-gray-300">Top factors influencing predictions</p>
            </div>
          </div>

          {/* Horizontal Bar List */}
          <div className="space-y-2.5 my-auto">
            {MOCK_FEATURE_IMPORTANCE.map((item) => (
              <div key={item.feature} className="space-y-1 text-xs">
                <div className="flex items-center justify-between text-gray-200">
                  <span className="font-medium text-[11px]">{item.feature}</span>
                  <span className="font-semibold text-white text-[11px]">{item.importance.toFixed(2)}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#16E0D0] to-[#35D6F5] h-full rounded-full transition-all duration-500"
                    style={{ width: `${(item.importance / 0.35) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
