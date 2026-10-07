import React, { useState } from 'react';
import {
  Box,
  Database,
  Activity,
  Cpu,
  BarChart3,
  Layers,
  ChevronDown,
  Eye,
  Pause,
  Play,
  ArrowRight,
  Search,
  Upload,
  CheckCircle2,
  RefreshCw,
  Server,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import {
  MOCK_KPIS,
  MOCK_MODEL_PERFORMANCE,
  MOCK_TRAINING_JOBS,
  MOCK_SYSTEM_RESOURCES,
  MOCK_DATASETS,
  MOCK_SYSTEM_ACTIVITIES,
  MOCK_SYSTEM_HEALTH,
  MOCK_PIPELINE_STAGES,
  type TrainingJob,
} from '../../data/systemData';

export const SystemPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'datasets' | 'pipeline' | 'health' | 'settings'
  >('overview');
  const [selectedPredictionTarget, setSelectedPredictionTarget] = useState<string>(
    'Temperature Prediction'
  );
  const [timeRangeFilter, setTimeRangeFilter] = useState<string>('Last 24 Hours');
  const [trainingJobs, setTrainingJobs] = useState<TrainingJob[]>(MOCK_TRAINING_JOBS);
  const [datasetSearch, setDatasetSearch] = useState<string>('');
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);

  // Toggle job status
  const handleJobAction = (id: string, action: 'start' | 'pause') => {
    setTrainingJobs((prev) =>
      prev.map((job) => {
        if (job.id === id) {
          if (action === 'pause') return { ...job, status: 'Paused' };
          if (action === 'start') return { ...job, status: 'Training' };
        }
        return job;
      })
    );
  };

  // Helper for KPI Icon rendering
  const renderKpiIcon = (iconName: string) => {
    switch (iconName) {
      case 'box':
        return <Box className="w-5 h-5 text-[#16E0D0]" />;
      case 'database':
        return <Database className="w-5 h-5 text-[#35D6F5]" />;
      case 'activity':
        return <Activity className="w-5 h-5 text-[#22D3A3]" />;
      case 'cpu':
        return <Cpu className="w-5 h-5 text-[#16E0D0]" />;
      default:
        return <Cpu className="w-5 h-5 text-[#16E0D0]" />;
    }
  };

  // Custom Circular Progress Ring for System Resources
  const renderCircularProgress = (
    percentage: number,
    color: string,
    size: number = 72,
    strokeWidth: number = 7
  ) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <span className="absolute text-sm font-bold text-white">{percentage}%</span>
      </div>
    );
  };

  const currentPerformanceData =
    MOCK_MODEL_PERFORMANCE[selectedPredictionTarget] ||
    MOCK_MODEL_PERFORMANCE['Temperature Prediction'];

  return (
    <div className="w-full h-full text-white overflow-y-auto pr-1 space-y-5 pb-8 select-none">
      {/* ============================================================ */}
      {/* PAGE HEADER & TOP KPI AREA                                   */}
      {/* ============================================================ */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5">
        {/* Page Title Area */}
        <div className="max-w-xl space-y-1.5">
          <div className="flex items-center space-x-2">
            <span className="w-1 h-3.5 bg-[#16E0D0] rounded-sm inline-block" />
            <span className="text-[11px] font-bold tracking-[0.16em] text-[#16E0D0] uppercase">
              MODEL & SYSTEM
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Manage <span className="text-[#16E0D0]">AI Models</span>
            <br />
            and System
          </h1>
          <p className="text-xs md:text-sm text-[#A8BAC4] leading-relaxed max-w-lg">
            Monitor model performance, manage datasets, configure system settings and ensure
            reliable climate intelligence operations.
          </p>
        </div>

        {/* TOP KPI STRIP (4 Liquid Glass Panels Horizontal) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 flex-1 max-w-4xl">
          {MOCK_KPIS.map((kpi) => (
            <div
              key={kpi.id}
              className="glass-panel p-4 h-[135px] flex flex-col justify-between hover:border-[#16E0D0]/50 transition-all duration-200 group shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
                  {kpi.title}
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#16E0D0]/15 border border-[#16E0D0]/30 flex items-center justify-center">
                  {renderKpiIcon(kpi.iconName)}
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {kpi.value}
                </div>
                <div className="text-[11px] text-[#A8BAC4] flex items-center gap-1 font-medium">
                  {kpi.subtext.includes('↑') ? (
                    <span className="text-[#22D3A3] font-semibold">{kpi.subtext}</span>
                  ) : (
                    <span>{kpi.subtext}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* SEGMENTED TAB NAVIGATION BAR (LIQUID GLASS)                  */}
      {/* ============================================================ */}
      <div className="glass-panel p-1.5 rounded-full inline-flex items-center gap-1 overflow-x-auto max-w-full shadow-lg">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-[#16E0D0] text-[#061A24] shadow-md shadow-[#16E0D0]/30 font-bold'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          Model Overview
        </button>
        <button
          onClick={() => setActiveTab('datasets')}
          className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'datasets'
              ? 'bg-[#16E0D0] text-[#061A24] shadow-md shadow-[#16E0D0]/30 font-bold'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          Dataset Management
        </button>
        <button
          onClick={() => setActiveTab('pipeline')}
          className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'pipeline'
              ? 'bg-[#16E0D0] text-[#061A24] shadow-md shadow-[#16E0D0]/30 font-bold'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          Training & Pipeline
        </button>
        <button
          onClick={() => setActiveTab('health')}
          className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'health'
              ? 'bg-[#16E0D0] text-[#061A24] shadow-md shadow-[#16E0D0]/30 font-bold'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          System Health
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-[#16E0D0] text-[#061A24] shadow-md shadow-[#16E0D0]/30 font-bold'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          Settings
        </button>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: MODEL OVERVIEW (DEFAULT VIEW)                         */}
      {/* ============================================================ */}
      {activeTab === 'overview' && (
        <div className="space-y-5">
          {/* PRIMARY ROW: MODEL PERFORMANCE & TRAINING STATUS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* LEFT PANEL: MODEL PERFORMANCE (~48-49% width / 6 cols) */}
            <div className="lg:col-span-6 glass-panel p-5 md:p-6 flex flex-col justify-between min-h-[340px] shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-3 min-w-0">
                <div className="flex items-start gap-2.5 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-xl bg-[#16E0D0]/15 border border-[#16E0D0]/30 flex items-center justify-center text-[#16E0D0] shrink-0 mt-0.5">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base font-bold text-white truncate">Model Performance</h2>
                    <p className="text-xs text-[#A8BAC4] truncate">
                      Comparison of AI models for climate prediction
                    </p>
                  </div>
                </div>

                {/* Dropdown Target Selection */}
                <div className="relative shrink-0 ml-2">
                  <select
                    value={selectedPredictionTarget}
                    onChange={(e) => setSelectedPredictionTarget(e.target.value)}
                    className="bg-black/40 backdrop-blur-md text-xs text-white border border-white/20 rounded-xl px-3 py-1.5 pr-8 appearance-none focus:outline-none focus:border-[#16E0D0] cursor-pointer hover:border-white/30 transition-all"
                  >
                    <option value="Temperature Prediction" className="bg-[#082633]">Temperature Prediction</option>
                    <option value="Rainfall Prediction" className="bg-[#082633]">Rainfall Prediction</option>
                    <option value="CO₂ Prediction" className="bg-[#082633]">CO₂ Prediction</option>
                    <option value="Humidity Prediction" className="bg-[#082633]">Humidity Prediction</option>
                    <option value="Pressure Prediction" className="bg-[#082633]">Pressure Prediction</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-300 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Grouped Bar Chart */}
              <div className="h-[230px] w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.12)" vertical={false} />
                    <XAxis
                      dataKey="model"
                      tick={{ fill: 'rgba(255,255,255,0.85)', fontSize: 11 }}
                      axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fill: 'rgba(255,255,255,0.85)', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      unit="%"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(7, 35, 45, 0.95)',
                        borderColor: 'rgba(22, 224, 208, 0.4)',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '12px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                      }}
                    />
                    <Bar dataKey="accuracy" name="Accuracy" fill="#16E0D0" radius={[3, 3, 0, 0]} barSize={14} />
                    <Bar dataKey="precision" name="Precision" fill="#A855F7" radius={[3, 3, 0, 0]} barSize={14} />
                    <Bar dataKey="recall" name="Recall" fill="#35D6F5" radius={[3, 3, 0, 0]} barSize={14} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Custom Legend */}
              <div className="flex items-center justify-center gap-6 pt-2 text-xs text-gray-200 font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#16E0D0]" />
                  <span>Accuracy</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#A855F7]" />
                  <span>Precision</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#35D6F5]" />
                  <span>Recall</span>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL: TRAINING STATUS (~51-52% width / 6 cols) */}
            <div className="lg:col-span-6 glass-panel p-5 md:p-6 flex flex-col justify-between min-h-[340px] shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-3 min-w-0">
                <div className="flex items-start gap-2.5 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-xl bg-[#35D6F5]/15 border border-[#35D6F5]/30 flex items-center justify-center text-[#35D6F5] shrink-0 mt-0.5">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base font-bold text-white truncate">Training Status</h2>
                    <p className="text-xs text-[#A8BAC4] truncate">
                      Recent and ongoing model training processes
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('pipeline')}
                  className="text-xs text-[#16E0D0] hover:text-[#35D6F5] font-semibold flex items-center gap-1 transition-colors shrink-0 ml-2 cursor-pointer"
                >
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto my-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="text-gray-300 border-b border-white/15 text-[11px] uppercase tracking-wider font-semibold">
                      <th className="py-2.5 px-2">Model</th>
                      <th className="py-2.5 px-2">Dataset</th>
                      <th className="py-2.5 px-2">Status</th>
                      <th className="py-2.5 px-2 min-w-[110px]">Progress</th>
                      <th className="py-2.5 px-2">Started</th>
                      <th className="py-2.5 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {trainingJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-white/10 transition-colors group">
                        <td className="py-3 px-2 font-semibold text-white">{job.model}</td>
                        <td className="py-3 px-2 text-gray-200">{job.dataset}</td>
                        <td className="py-3 px-2">
                          {job.status === 'Completed' && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Completed
                            </span>
                          )}
                          {job.status === 'Training' && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 inline-flex items-center gap-1 animate-pulse">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Training
                            </span>
                          )}
                          {job.status === 'Queued' && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/40 inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Queued
                            </span>
                          )}
                          {job.status === 'Paused' && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-gray-500/25 text-gray-200 border border-gray-500/40 inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-300" /> Paused
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden border border-white/10">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  job.status === 'Completed'
                                    ? 'bg-emerald-400'
                                    : job.status === 'Training'
                                    ? 'bg-[#16E0D0]'
                                    : 'bg-amber-400'
                                }`}
                                style={{ width: `${job.progress}%` }}
                              />
                            </div>
                            <span className="text-[11px] font-medium text-gray-200 w-7 text-right">
                              {job.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-gray-300">{job.started}</td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {job.status === 'Training' ? (
                              <button
                                onClick={() => handleJobAction(job.id, 'pause')}
                                title="Pause Training"
                                className="p-1.5 rounded-lg bg-white/10 hover:bg-amber-500/30 text-gray-200 hover:text-amber-300 transition-colors cursor-pointer"
                              >
                                <Pause className="w-3.5 h-3.5" />
                              </button>
                            ) : job.status === 'Queued' || job.status === 'Paused' ? (
                              <button
                                onClick={() => handleJobAction(job.id, 'start')}
                                title="Start Training"
                                className="p-1.5 rounded-lg bg-white/10 hover:bg-[#16E0D0]/30 text-gray-200 hover:text-[#16E0D0] transition-colors cursor-pointer"
                              >
                                <Play className="w-3.5 h-3.5" />
                              </button>
                            ) : (
                              <button
                                title="View Details"
                                className="p-1.5 rounded-lg bg-white/10 hover:bg-[#16E0D0]/30 text-gray-200 hover:text-[#16E0D0] transition-colors cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              title="View Metrics"
                              className="p-1.5 rounded-lg bg-white/10 hover:bg-[#35D6F5]/30 text-gray-200 hover:text-[#35D6F5] transition-colors cursor-pointer"
                            >
                              <BarChart3 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* SECONDARY ROW: SYSTEM RESOURCES, DATASET INFO, RECENT SYSTEM ACTIVITY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* PANEL 1: SYSTEM RESOURCES (~35% width / 4 cols) */}
            <div className="lg:col-span-4 glass-panel p-5 flex flex-col justify-between min-h-[260px] shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-base font-bold text-white">System Resources</h2>
                  <p className="text-xs text-[#A8BAC4]">Real-time system resource usage</p>
                </div>
                <div className="relative shrink-0">
                  <select
                    value={timeRangeFilter}
                    onChange={(e) => setTimeRangeFilter(e.target.value)}
                    className="bg-black/40 backdrop-blur-md text-[11px] text-white border border-white/20 rounded-xl px-2.5 py-1 pr-6 appearance-none focus:outline-none focus:border-[#16E0D0] cursor-pointer hover:border-white/30 transition-all"
                  >
                    <option value="Last 24 Hours" className="bg-[#082633]">Last 24 Hours</option>
                    <option value="Last 7 Days" className="bg-[#082633]">Last 7 Days</option>
                    <option value="Real-time" className="bg-[#082633]">Real-time</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-gray-300 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 4 Circular Rings with Sparklines */}
              <div className="grid grid-cols-4 gap-2 py-2 my-auto">
                {MOCK_SYSTEM_RESOURCES.map((res) => (
                  <div key={res.id} className="flex flex-col items-center space-y-1 text-center">
                    {renderCircularProgress(res.usage, res.color, 64, 6)}
                    <div className="text-[11px] font-semibold text-white mt-1">
                      {res.name}
                      <span className="block text-[10px] text-gray-300 font-normal">{res.usage}%</span>
                    </div>
                    {/* Mini Sparkline Chart */}
                    <div className="h-6 w-full px-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={res.sparklineData}>
                          <Line
                            type="monotone"
                            dataKey="val"
                            stroke={res.color}
                            strokeWidth={1.5}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PANEL 2: DATASET INFORMATION (~35% width / 4 cols) */}
            <div className="lg:col-span-4 glass-panel p-5 flex flex-col justify-between min-h-[260px] shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-base font-bold text-white">Dataset Information</h2>
                  <p className="text-xs text-[#A8BAC4]">Available datasets and their details</p>
                </div>
                <button
                  onClick={() => setActiveTab('datasets')}
                  className="text-xs text-[#16E0D0] hover:text-[#35D6F5] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto my-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="text-gray-300 border-b border-white/15 text-[11px] uppercase tracking-wider font-semibold">
                      <th className="py-2 px-1.5">Dataset</th>
                      <th className="py-2 px-1.5">Type</th>
                      <th className="py-2 px-1.5">Size</th>
                      <th className="py-2 px-1.5">Time Range</th>
                      <th className="py-2 px-1.5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {MOCK_DATASETS.map((ds) => (
                      <tr key={ds.id} className="hover:bg-white/10 transition-colors">
                        <td className="py-2.5 px-1.5 font-semibold text-white truncate max-w-[110px]">
                          {ds.name}
                        </td>
                        <td className="py-2.5 px-1.5 text-gray-200 text-[11px] truncate max-w-[90px]">
                          {ds.type}
                        </td>
                        <td className="py-2.5 px-1.5 text-[#A8BAC4] font-medium">{ds.size}</td>
                        <td className="py-2.5 px-1.5 text-gray-300 text-[11px]">{ds.timeRange}</td>
                        <td className="py-2.5 px-1.5 text-right">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Available
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PANEL 3: RECENT SYSTEM ACTIVITY (~30% width / 4 cols) */}
            <div className="lg:col-span-4 glass-panel p-5 flex flex-col justify-between min-h-[260px] shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-base font-bold text-white">Recent System Activity</h2>
                  <p className="text-xs text-[#A8BAC4]">System event logs & tasks</p>
                </div>
                <button
                  onClick={() => setActiveTab('health')}
                  className="text-xs text-[#16E0D0] hover:text-[#35D6F5] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Activity Table */}
              <div className="overflow-x-auto my-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="text-gray-300 border-b border-white/15 text-[11px] uppercase tracking-wider font-semibold">
                      <th className="py-2 px-1.5 w-16">Time</th>
                      <th className="py-2 px-1.5">Event</th>
                      <th className="py-2 px-1.5 text-right w-20">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {MOCK_SYSTEM_ACTIVITIES.map((act) => (
                      <tr key={act.id} className="hover:bg-white/10 transition-colors">
                        <td className="py-2.5 px-1.5 text-[#A8BAC4] font-mono text-[11px]">
                          {act.time}
                        </td>
                        <td className="py-2.5 px-1.5 text-gray-200 text-[11px] truncate max-w-[170px]">
                          {act.event}
                        </td>
                        <td className="py-2.5 px-1.5 text-right">
                          {act.status === 'Success' ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Success
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Info
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: DATASET MANAGEMENT VIEW                               */}
      {/* ============================================================ */}
      {activeTab === 'datasets' && (
        <div className="glass-panel p-6 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">Dataset Management</h2>
              <p className="text-xs text-[#A8BAC4] mt-0.5">
                Explore, upload, and inspect climate telemetry datasets used for AI training.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-gray-300 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search datasets..."
                  value={datasetSearch}
                  onChange={(e) => setDatasetSearch(e.target.value)}
                  className="bg-black/40 text-xs text-white pl-9 pr-4 py-2 rounded-xl border border-white/20 focus:outline-none focus:border-[#16E0D0] w-56"
                />
              </div>

              {/* Upload dataset button */}
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-[#16E0D0] hover:bg-[#16E0D0]/90 text-[#061A24] font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-[#16E0D0]/30 transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4" /> Upload Dataset
              </button>
            </div>
          </div>

          {/* Expanded Dataset Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="text-gray-300 border-b border-white/15 text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-3 px-3">Dataset Name</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">File Size</th>
                  <th className="py-3 px-3">Record Count</th>
                  <th className="py-3 px-3">Coverage</th>
                  <th className="py-3 px-3">Last Updated</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {MOCK_DATASETS.filter((ds) =>
                  ds.name.toLowerCase().includes(datasetSearch.toLowerCase())
                ).map((ds) => (
                  <tr key={ds.id} className="hover:bg-white/10 transition-colors">
                    <td className="py-3 px-3 font-semibold text-white">{ds.name}</td>
                    <td className="py-3 px-3 text-gray-200">{ds.type}</td>
                    <td className="py-3 px-3 text-[#A8BAC4] font-mono">{ds.size}</td>
                    <td className="py-3 px-3 text-[#16E0D0] font-mono">{ds.records}</td>
                    <td className="py-3 px-3 text-gray-200">{ds.timeRange}</td>
                    <td className="py-3 px-3 text-gray-300">{ds.lastUpdated}</td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Available
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button className="text-xs text-[#16E0D0] hover:underline font-medium cursor-pointer">
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Simple Modal placeholder when Upload Dataset is clicked */}
          {showUploadModal && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
              <div className="glass-panel p-6 max-w-md w-full space-y-4 shadow-2xl border border-white/30">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Upload New Dataset</h3>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="text-gray-400 hover:text-white text-sm cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-xs text-gray-300">
                  Select NetCDF4, Parquet, or GeoTIFF dataset files to ingest into CLIMORA Data Lake.
                </p>
                <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center space-y-2 hover:border-[#16E0D0] transition-colors cursor-pointer bg-black/30">
                  <Upload className="w-8 h-8 text-[#16E0D0] mx-auto" />
                  <p className="text-xs font-semibold text-white">Drag & drop files here or click to browse</p>
                  <p className="text-[10px] text-gray-300">Supports .nc, .parquet, .tif up to 50 GB</p>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:bg-white/10 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#16E0D0] text-[#061A24] cursor-pointer"
                  >
                    Ingest Dataset
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: TRAINING & PIPELINE VIEW                               */}
      {/* ============================================================ */}
      {activeTab === 'pipeline' && (
        <div className="space-y-6">
          {/* Horizontal Visual Pipeline Stages */}
          <div className="glass-panel p-6 space-y-4 shadow-2xl">
            <h2 className="text-lg font-bold text-white">ML Training Pipeline Flow</h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {MOCK_PIPELINE_STAGES.map((stg, idx) => (
                <div
                  key={stg.stage}
                  className="glass-panel p-3.5 space-y-2 relative border border-white/20"
                >
                  <div className="text-[10px] uppercase tracking-wider text-gray-300 font-semibold flex items-center justify-between">
                    <span>Stage 0{idx + 1}</span>
                    {stg.status === 'Completed' && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                    {stg.status === 'In Progress' && (
                      <RefreshCw className="w-3.5 h-3.5 text-[#16E0D0] animate-spin" />
                    )}
                  </div>
                  <div className="text-xs font-bold text-white">{stg.stage}</div>
                  <div className="text-[11px] text-[#A8BAC4]">{stg.duration}</div>
                  <div className="w-full bg-black/50 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full ${
                        stg.status === 'Completed'
                          ? 'bg-emerald-400'
                          : stg.status === 'In Progress'
                          ? 'bg-[#16E0D0]'
                          : 'bg-gray-600'
                      }`}
                      style={{ width: `${stg.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Training Queue Table */}
          <div className="glass-panel p-6 space-y-4 shadow-2xl">
            <h2 className="text-lg font-bold text-white">Active Training Workflows</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="text-gray-300 border-b border-white/15 text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-3 px-3">Job ID</th>
                    <th className="py-3 px-3">Target Model</th>
                    <th className="py-3 px-3">Source Dataset</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 min-w-[150px]">Progress Bar</th>
                    <th className="py-3 px-3">Started</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {trainingJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-white/10 transition-colors">
                      <td className="py-3 px-3 font-mono text-[#16E0D0]">{job.id}</td>
                      <td className="py-3 px-3 font-semibold text-white">{job.model}</td>
                      <td className="py-3 px-3 text-gray-200">{job.dataset}</td>
                      <td className="py-3 px-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                          {job.status}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden border border-white/10">
                            <div
                              className="h-full bg-[#16E0D0] rounded-full"
                              style={{ width: `${job.progress}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-mono text-gray-200">{job.progress}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-gray-300">{job.started}</td>
                      <td className="py-3 px-3 text-right">
                        <button className="text-xs text-[#16E0D0] hover:underline font-medium cursor-pointer">
                          Logs
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: SYSTEM HEALTH VIEW                                    */}
      {/* ============================================================ */}
      {activeTab === 'health' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">System Infrastructure & Health</h2>
                <p className="text-xs text-[#A8BAC4] mt-0.5">
                  Real-time heartbeat and telemetry monitoring of all backend microservices.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> All Systems Operational
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {MOCK_SYSTEM_HEALTH.map((sh) => (
                <div
                  key={sh.id}
                  className="glass-panel p-4 space-y-3 border border-white/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-[#16E0D0]" />
                      <span className="text-xs font-bold text-white">{sh.component}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      {sh.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-white/10">
                    <div>
                      <span className="text-gray-300 text-[11px] block">Latency</span>
                      <span className="font-mono font-bold text-[#16E0D0]">{sh.latency}</span>
                    </div>
                    <div>
                      <span className="text-gray-300 text-[11px] block">Uptime</span>
                      <span className="font-mono font-bold text-white">{sh.uptime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 5: SETTINGS VIEW                                         */}
      {/* ============================================================ */}
      {activeTab === 'settings' && (
        <div className="glass-panel p-6 max-w-3xl space-y-6 shadow-2xl">
          <div>
            <h2 className="text-xl font-bold text-white">System Settings & Defaults</h2>
            <p className="text-xs text-[#A8BAC4] mt-0.5">
              Configure baseline AI models, dataset refresh frequency, and notification alerts.
            </p>
          </div>

          <div className="space-y-4 divide-y divide-white/10 text-xs">
            <div className="pt-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">Default Prediction Model</div>
                <div className="text-gray-300 text-[11px]">Primary model for real-time inference</div>
              </div>
              <select className="bg-black/40 border border-white/20 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-[#16E0D0] cursor-pointer">
                <option value="XGBoost" className="bg-[#082633]">XGBoost (Ensemble)</option>
                <option value="LightGBM" className="bg-[#082633]">LightGBM</option>
                <option value="LSTM" className="bg-[#082633]">LSTM Deep Learning</option>
              </select>
            </div>

            <div className="pt-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">Data Refresh Interval</div>
                <div className="text-gray-300 text-[11px]">Frequency of satellite dataset ingestion</div>
              </div>
              <select className="bg-black/40 border border-white/20 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-[#16E0D0] cursor-pointer">
                <option value="15m" className="bg-[#082633]">Every 15 minutes</option>
                <option value="1h" className="bg-[#082633]">Every 1 hour</option>
                <option value="6h" className="bg-[#082633]">Every 6 hours</option>
              </select>
            </div>

            <div className="pt-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">Automatic Model Retraining</div>
                <div className="text-gray-300 text-[11px]">Trigger pipeline when metric drift exceeds 5%</div>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 accent-[#16E0D0] cursor-pointer rounded"
              />
            </div>

            <div className="pt-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">System Anomaly Alerts</div>
                <div className="text-gray-300 text-[11px]">Notify operations team via Webhook / Email</div>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 accent-[#16E0D0] cursor-pointer rounded"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/15 flex justify-end gap-3">
            <button className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:bg-white/10 cursor-pointer">
              Reset Defaults
            </button>
            <button className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#16E0D0] text-[#061A24] shadow-md shadow-[#16E0D0]/30 cursor-pointer">
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
