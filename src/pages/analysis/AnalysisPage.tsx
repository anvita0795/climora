import React, { useState } from 'react';
import {
  Thermometer,
  Calendar,
  CalendarDays,
  Play,
  Maximize2,
  ChevronDown,
  TrendingUp,
  BarChart2,
  Share2,
  MapPin,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  MOCK_DATASET_CONTEXT,
  MOCK_TEMPERATURE_TREND,
  MOCK_SEASONAL_PATTERN,
  MOCK_VARIABLE_COMPARISON,
  MOCK_VARIABLE_DISTRIBUTION,
  CORRELATION_VARIABLES,
  MOCK_CORRELATION_MATRIX,
} from '../../data/analysisData';

export const AnalysisPage: React.FC = () => {
  // Control States
  const [selectedVariable, setSelectedVariable] = useState<string>('Temperature');
  const [timeScale, setTimeScale] = useState<string>('Monthly');
  const [dateRange, setDateRange] = useState<string>('1980 - 2023');
  const [trendChartType, setTrendChartType] = useState<'Line' | 'Area' | 'Bar'>('Line');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [hoveredCell, setHoveredCell] = useState<{ row: string; col: string; val: number } | null>(null);

  // Dropdown visibility states
  const [showVarDropdown, setShowVarDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  // Variable options
  const variableOptions = ['Temperature', 'Rainfall', 'CO₂', 'Humidity', 'Pressure', 'Climate Forcing'];
  const timeScaleOptions = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
  const dateRangeOptions = ['1980 - 2023', '1990 - 2023', '2000 - 2023', '2010 - 2023'];

  // Handle Update Analysis
  const handleUpdateAnalysis = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
    }, 400);
  };

  // Helper for heatmap cell color
  const getCorrelationColor = (val: number) => {
    if (val === 1.0) return 'bg-[#16E0D0] text-black font-semibold';
    if (val >= 0.7) return 'bg-[#14B8A6] text-white';
    if (val >= 0.3) return 'bg-[#0F766E] text-white';
    if (val >= 0.0) return 'bg-[#134E4A] text-white/90';
    if (val >= -0.4) return 'bg-[#1E3A8A]/60 text-white/80';
    if (val >= -0.7) return 'bg-[#1E293B] text-white/70';
    return 'bg-[#0F172A] text-white/60';
  };

  return (
    <div className="w-full h-full flex flex-col space-y-6 text-white overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-2 pt-3 pb-8 select-none">
      {/* 1. PAGE HEADER & DATASET CONTEXT CARD */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-1">
        {/* Left: Page Title & Identity */}
        <div className="space-y-2 py-2">
          <div className="flex items-center space-x-2 text-[#16E0D0] font-semibold text-xs tracking-[0.18em] uppercase">
            <span className="w-1.5 h-3.5 bg-[#16E0D0] rounded-full inline-block" />
            <span className="[text-shadow:_0_1px_4px_rgba(0,0,0,0.85)]">CLIMATE ANALYSIS</span>
          </div>
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-snug [text-shadow:_0_2px_10px_rgba(0,0,0,0.85)]">
            Understand <span className="text-[#16E0D0] [text-shadow:_0_0_15px_rgba(22,224,208,0.5),_0_2px_10px_rgba(0,0,0,0.85)]">Climate Patterns</span>
          </h1>
          <p className="text-xs lg:text-sm text-gray-100 font-medium max-w-2xl leading-relaxed pt-1 [text-shadow:_0_1px_6px_rgba(0,0,0,0.85)]">
            Analyze historical climate data, explore variable trends, seasonal patterns and key relationships across different time scales.
          </p>
        </div>

        {/* Right: Dataset Context Card */}
        <div className="glass-panel p-4 w-full lg:w-auto min-w-[340px] max-w-[380px] shadow-2xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/15">
            <div className="flex items-center space-x-2 text-white font-semibold text-xs md:text-sm">
              <MapPin className="w-4 h-4 text-[#16E0D0]" />
              <span>{MOCK_DATASET_CONTEXT.location}</span>
            </div>
            <button className="px-3 py-1 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-xs text-gray-100 font-medium flex items-center gap-1 transition-all cursor-pointer">
              Change <ChevronDown className="w-3.5 h-3.5 text-gray-300" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center pt-0.5">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-300 font-medium">Dataset</p>
              <p className="text-xs font-semibold text-white truncate" title={MOCK_DATASET_CONTEXT.datasetName}>
                NASA Global
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-300 font-medium">Period</p>
              <p className="text-xs font-semibold text-white">{MOCK_DATASET_CONTEXT.period}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-300 font-medium">Frequency</p>
              <p className="text-xs font-semibold text-white">{MOCK_DATASET_CONTEXT.frequency}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-300 font-medium">Variables</p>
              <p className="text-xs font-semibold text-[#16E0D0]">{MOCK_DATASET_CONTEXT.columnsCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CONTROL ROW (HORIZONTAL FILTERS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        {/* Variable Selector */}
        <div className="relative">
          <button
            onClick={() => setShowVarDropdown(!showVarDropdown)}
            className="w-full h-[60px] glass-panel px-4 py-3 flex items-center justify-between hover:border-[#16E0D0]/50 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0]">
                <Thermometer className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-300 font-medium">Variable</p>
                <p className="text-xs md:text-sm font-semibold text-white">{selectedVariable}</p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-300 transition-transform ${showVarDropdown ? 'rotate-180 text-[#16E0D0]' : ''}`} />
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

        {/* Time Scale Selector */}
        <div className="relative">
          <button
            onClick={() => setShowTimeDropdown(!showTimeDropdown)}
            className="w-full h-[60px] glass-panel px-4 py-3 flex items-center justify-between hover:border-[#16E0D0]/50 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0]">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-300 font-medium">Time Scale</p>
                <p className="text-xs md:text-sm font-semibold text-white">{timeScale}</p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-300 transition-transform ${showTimeDropdown ? 'rotate-180 text-[#16E0D0]' : ''}`} />
          </button>
          {showTimeDropdown && (
            <div className="absolute top-full left-0 mt-1.5 w-full bg-[#082633]/95 border border-white/20 rounded-xl shadow-2xl py-1.5 z-30 backdrop-blur-2xl">
              {timeScaleOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setTimeScale(opt);
                    setShowTimeDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                    timeScale === opt ? 'bg-[#16E0D0]/20 text-[#16E0D0] font-semibold' : 'text-gray-200 hover:bg-white/10'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Range Selector */}
        <div className="relative">
          <button
            onClick={() => setShowDateDropdown(!showDateDropdown)}
            className="w-full h-[60px] glass-panel px-4 py-3 flex items-center justify-between hover:border-[#16E0D0]/50 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0]">
                <CalendarDays className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-300 font-medium">Date Range</p>
                <p className="text-xs md:text-sm font-semibold text-white">{dateRange}</p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-300 transition-transform ${showDateDropdown ? 'rotate-180 text-[#16E0D0]' : ''}`} />
          </button>
          {showDateDropdown && (
            <div className="absolute top-full left-0 mt-1.5 w-full bg-[#082633]/95 border border-white/20 rounded-xl shadow-2xl py-1.5 z-30 backdrop-blur-2xl">
              {dateRangeOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setDateRange(opt);
                    setShowDateDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                    dateRange === opt ? 'bg-[#16E0D0]/20 text-[#16E0D0] font-semibold' : 'text-gray-200 hover:bg-white/10'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Update Analysis Button */}
        <button
          onClick={handleUpdateAnalysis}
          disabled={isUpdating}
          className="w-full h-[60px] bg-gradient-to-r from-[#16E0D0] to-[#35D6F5] text-[#03141C] font-bold rounded-full px-6 py-3 flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(22,224,208,0.45)] hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-75"
        >
          <Play className={`w-4 h-4 fill-[#03141C] ${isUpdating ? 'animate-spin' : ''}`} />
          <span className="text-xs md:text-sm tracking-wide">
            {isUpdating ? 'Updating...' : 'Update Analysis'}
          </span>
        </button>
      </div>

      {/* 3. PRIMARY CHART ROW (TEMPERATURE TREND & SEASONAL PATTERN) */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 transition-opacity duration-300 ${isUpdating ? 'opacity-50' : 'opacity-100'}`}>
        {/* Temperature Trend Panel (7 of 12 cols ~ 65%) */}
        <div className="lg:col-span-8 glass-panel p-5 md:p-6 flex flex-col justify-between shadow-2xl min-h-[320px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0]">
                <Thermometer className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  {selectedVariable} Trend
                </h3>
                <p className="text-xs text-gray-300">Monthly average {selectedVariable.toLowerCase()} over time</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Line / Area / Bar Switcher */}
              <div className="bg-black/40 border border-white/15 rounded-xl p-1 flex items-center space-x-1 text-xs">
                {(['Line', 'Area', 'Bar'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setTrendChartType(type)}
                    className={`px-3 py-1 rounded-lg transition-all font-medium cursor-pointer ${
                      trendChartType === type
                        ? 'bg-[#16E0D0] text-[#03141C] font-semibold shadow'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Expand Icon */}
              <button className="text-gray-300 hover:text-[#16E0D0] p-1.5 transition-colors cursor-pointer">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chart Canvas */}
          <div className="w-full h-[230px] md:h-[250px] pt-1">
            <ResponsiveContainer width="100%" height="100%">
              {trendChartType === 'Area' ? (
                <AreaChart data={MOCK_TEMPERATURE_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="tempTrendGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16E0D0" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#16E0D0" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.12)" vertical={false} />
                  <XAxis
                    dataKey="year"
                    stroke="rgba(255,255,255,0.4)"
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                    ticks={['1980', '1985', '1990', '1995', '2000', '2005', '2010', '2015', '2020', '2023']}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.4)"
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                    domain={[20, 36]}
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
                    formatter={(val: any) => [`${val} °C`, 'Avg Temp']}
                    labelFormatter={(year) => `Year: ${year}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="temp"
                    stroke="#16E0D0"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#tempTrendGrad)"
                  />
                </AreaChart>
              ) : trendChartType === 'Bar' ? (
                <BarChart data={MOCK_TEMPERATURE_TREND.filter((_, i) => i % 4 === 0)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.12)" vertical={false} />
                  <XAxis
                    dataKey="year"
                    stroke="rgba(255,255,255,0.4)"
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.4)"
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                    domain={[20, 36]}
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
                    formatter={(val: any) => [`${val} °C`, 'Avg Temp']}
                  />
                  <Bar dataKey="temp" fill="#16E0D0" radius={[3, 3, 0, 0]} />
                </BarChart>
              ) : (
                <LineChart data={MOCK_TEMPERATURE_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#16E0D0" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#16E0D0" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.12)" vertical={false} />
                  <XAxis
                    dataKey="year"
                    stroke="rgba(255,255,255,0.4)"
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                    ticks={['1980', '1985', '1990', '1995', '2000', '2005', '2010', '2015', '2020', '2023']}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.4)"
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                    domain={[20, 36]}
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
                    formatter={(val: any) => [`${val} °C`, 'Avg Temp']}
                    labelFormatter={(year) => `Year: ${year}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke="#16E0D0"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 5, fill: '#16E0D0', stroke: '#fff' }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Seasonal Pattern Panel (5 of 12 cols ~ 35%) */}
        <div className="lg:col-span-4 glass-panel p-5 md:p-6 flex flex-col justify-between shadow-2xl min-h-[320px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0]">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Seasonal Pattern</h3>
                <p className="text-xs text-gray-300">Average {selectedVariable.toLowerCase()} by month</p>
              </div>
            </div>

            <button className="px-3 py-1 rounded-lg border border-white/20 bg-black/40 text-xs text-gray-200 font-medium flex items-center gap-1 cursor-pointer">
              {selectedVariable} <ChevronDown className="w-3.5 h-3.5 text-gray-300" />
            </button>
          </div>

          {/* Chart Canvas */}
          <div className="w-full h-[230px] md:h-[250px] pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_SEASONAL_PATTERN} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="seasonalGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#35D6F5" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#16E0D0" stopOpacity={0.4} />
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
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(7, 35, 45, 0.95)',
                    borderColor: 'rgba(22, 224, 208, 0.4)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(val: any) => [`${val} °C`, 'Avg Temp']}
                />
                <Bar dataKey="temp" fill="url(#seasonalGrad)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. SECONDARY CHART ROW (VARIABLE COMPARISON, DISTRIBUTION, CORRELATION) */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 transition-opacity duration-300 ${isUpdating ? 'opacity-50' : 'opacity-100'}`}>
        {/* Panel 1: Variable Comparison (5 of 12 cols ~ 40%) */}
        <div className="lg:col-span-5 glass-panel p-5 md:p-6 flex flex-col justify-between shadow-2xl min-h-[290px]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0]">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Variable Comparison</h3>
                <p className="text-xs text-gray-300">Compare multiple climate variables</p>
              </div>
            </div>

            <button className="px-2.5 py-1 rounded-lg border border-white/20 bg-black/40 text-xs text-gray-200 font-medium flex items-center gap-1 cursor-pointer">
              Temperature, Rainfall, CO₂ <ChevronDown className="w-3.5 h-3.5 text-gray-300" />
            </button>
          </div>

          {/* Legend */}
          <div className="flex items-center space-x-5 mb-3 text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16E0D0]" />
              <span className="text-gray-200 font-medium">Temperature (°C)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7]" />
              <span className="text-gray-200 font-medium">Rainfall (mm)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span className="text-gray-200 font-medium">CO₂ (scaled)</span>
            </div>
          </div>

          <div className="w-full h-[200px] md:h-[215px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_VARIABLE_COMPARISON} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.12)" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="rgba(255,255,255,0.4)"
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                />
                <YAxis
                  yAxisId="left"
                  stroke="rgba(255,255,255,0.4)"
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                  domain={[20, 40]}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="rgba(255,255,255,0.4)"
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                  domain={[0, 400]}
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
                <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#16E0D0" strokeWidth={2} dot={{ r: 3 }} />
                <Line yAxisId="right" type="monotone" dataKey="rainfall" stroke="#A855F7" strokeWidth={2} dot={{ r: 3 }} />
                <Line yAxisId="right" type="monotone" dataKey="co2Scaled" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Panel 2: Variable Distribution (3.5 of 12 cols ~ 30%) */}
        <div className="lg:col-span-3 glass-panel p-5 md:p-6 flex flex-col justify-between shadow-2xl min-h-[290px]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0]">
                <BarChart2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Variable Distribution</h3>
                <p className="text-xs text-gray-300">Distribution of {selectedVariable.toLowerCase()}</p>
              </div>
            </div>

            <button className="px-2.5 py-1 rounded-lg border border-white/20 bg-black/40 text-xs text-gray-200 font-medium flex items-center gap-1 cursor-pointer">
              {selectedVariable} <ChevronDown className="w-3.5 h-3.5 text-gray-300" />
            </button>
          </div>

          <div className="w-full h-[215px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_VARIABLE_DISTRIBUTION} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.12)" vertical={false} />
                <XAxis
                  dataKey="tempBin"
                  stroke="rgba(255,255,255,0.4)"
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.4)"
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                  domain={[0, 800]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(7, 35, 45, 0.95)',
                    borderColor: 'rgba(22, 224, 208, 0.4)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(val: any) => [`${val} occurrences`, 'Frequency']}
                />
                <Bar dataKey="frequency" fill="#16E0D0" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Panel 3: Correlation Matrix (3.5 of 12 cols ~ 30%) */}
        <div className="lg:col-span-4 glass-panel p-5 md:p-6 flex flex-col justify-between shadow-2xl min-h-[290px]">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0]">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Correlation Matrix</h3>
              <p className="text-xs text-gray-300">Relationship between climate variables</p>
            </div>
          </div>

          <div className="flex items-center gap-3 my-auto pt-1">
            {/* Heatmap Grid */}
            <div className="flex-1 overflow-x-auto">
              <div className="inline-block min-w-full">
                <div className="grid grid-cols-7 gap-1.5 text-[10px]">
                  {/* Top-left empty cell */}
                  <div className="h-7" />
                  {/* Column headers */}
                  {CORRELATION_VARIABLES.map((v) => (
                    <div key={v.id} className="h-7 flex items-center justify-center text-gray-300 font-medium truncate transform -rotate-45 origin-bottom-left text-[9px]" title={v.name}>
                      {v.name}
                    </div>
                  ))}

                  {/* Matrix Rows */}
                  {CORRELATION_VARIABLES.map((rowVar, rIdx) => (
                    <React.Fragment key={rowVar.id}>
                      {/* Row Label */}
                      <div className="h-7 flex items-center text-gray-300 font-medium truncate text-[9.5px] pr-1" title={rowVar.name}>
                        {rowVar.name}
                      </div>

                      {/* Row Cells */}
                      {CORRELATION_VARIABLES.map((colVar, cIdx) => {
                        const val = MOCK_CORRELATION_MATRIX[rIdx][cIdx];
                        return (
                          <div
                            key={colVar.id}
                            onMouseEnter={() => setHoveredCell({ row: rowVar.name, col: colVar.name, val })}
                            onMouseLeave={() => setHoveredCell(null)}
                            className={`h-7 rounded-md flex items-center justify-center transition-transform hover:scale-105 cursor-pointer relative ${getCorrelationColor(val)}`}
                            title={`${rowVar.name} vs ${colVar.name}: ${val > 0 ? '+' : ''}${val}`}
                          >
                            <span className="text-[9px] opacity-95">{val.toFixed(1)}</span>
                          </div>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Scientific Scale Bar */}
            <div className="flex flex-col items-center pl-2 border-l border-white/15 text-[10px] text-gray-300 space-y-1.5">
              <span className="text-white font-semibold">1.0</span>
              <div className="w-3 h-32 rounded bg-gradient-to-b from-[#16E0D0] via-[#0F766E] to-[#0F172A]" />
              <span>-1.0</span>
            </div>
          </div>

          {/* Hovered cell info ticker */}
          <div className="text-xs text-gray-300 h-5 flex items-center justify-end pt-1">
            {hoveredCell ? (
              <span className="text-[#16E0D0] font-medium">
                {hoveredCell.row} vs {hoveredCell.col}: <strong className="text-[#F8FAFC]">{hoveredCell.val > 0 ? `+${hoveredCell.val}` : hoveredCell.val}</strong>
              </span>
            ) : (
              <span>Hover cell for exact r value</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
