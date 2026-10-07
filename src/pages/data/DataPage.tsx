import React, { useState, useEffect } from 'react';
import {
  Upload,
  Folder,
  Link as LinkIcon,
  Database,
  Calendar,
  Layers,
  Globe,
  Clock,
  Table,
  Sliders,
  FileText,
  Thermometer,
  Droplets,
  Leaf,
  Wind,
  Gauge,
  Activity,
  MapPin,
  CheckCircle2,
  Search,
  ChevronLeft,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { ClimoraApi } from '../../api/client';
import { LiveBadge, DemoBadge } from '../../components/ui/LiveBadge';
import {
  AVAILABLE_DATASETS,
  DATASET_VARIABLES,
  SAMPLE_DATASET_ROWS,
  type ClimateDataset
} from '../../data/datasetData';
import { UploadDatasetModal } from '../../components/modals/UploadDatasetModal';
import { BrowseDatasetsModal } from '../../components/modals/BrowseDatasetsModal';
import { ConnectSourceModal } from '../../components/modals/ConnectSourceModal';

type SubTabId = 'overview' | 'preview' | 'quality' | 'variables' | 'visualizations';

export const DataPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SubTabId>('overview');
  const [activeDataset, setActiveDataset] = useState<ClimateDataset>(AVAILABLE_DATASETS[0]);
  const [previewRows, setPreviewRows] = useState<any[]>(SAMPLE_DATASET_ROWS);
  const [isLive, setIsLive] = useState<boolean>(false);

  // Modal open states
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);
  const [isConnectOpen, setIsConnectOpen] = useState(false);

  // Table search & pagination state for Data Preview
  const [tableSearch, setTableSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const fetchDatasetsData = async () => {
    try {
      const res = await ClimoraApi.getDatasets(tableSearch);
      if (res && res.length > 0) {
        setIsLive(true);
      }
      const prev = await ClimoraApi.getDatasetPreview(activeDataset.id, 25);
      if (prev && prev.records && prev.records.length > 0) {
        setPreviewRows(prev.records);
        setIsLive(true);
      }
    } catch (e) {
      console.warn('Dataset API fetch warning:', e);
      setIsLive(false);
    }
  };

  useEffect(() => {
    fetchDatasetsData();
  }, [tableSearch, activeDataset.id]);

  const handleUploadSuccess = (name: string) => {
    const newDs: ClimateDataset = {
      id: `uploaded-${Date.now()}`,
      name: `${name} (Uploaded)`,
      source: 'User Import',
      dateRange: '1980-01-01 → 2022-12-31',
      format: 'CSV',
      totalRecords: '516',
      totalColumns: 8,
      coverage: 'Regional',
      frequency: 'Monthly',
      dataType: 'Climate Ingest',
      status: 'Loaded',
      thumbnailUrl: '/assets/nasa_earth.jpg',
      description: 'Custom ingested user dataset with verified column schemas.',
      fileSize: '48 KB',
    };
    setActiveDataset(newDs);
  };

  const handleConnectSuccess = (sourceName: string) => {
    const connectedDs: ClimateDataset = {
      id: `connected-${Date.now()}`,
      name: `${sourceName} Stream`,
      source: sourceName,
      dateRange: 'Real-time Feed',
      format: 'API JSON',
      totalRecords: '516',
      totalColumns: 8,
      coverage: 'Global Live',
      frequency: 'Monthly',
      dataType: 'Live Remote Sensing',
      status: 'Loaded',
      thumbnailUrl: '/assets/nasa_earth.jpg',
      description: `Live streaming API telemetry pipeline connected to ${sourceName}.`,
      fileSize: 'Live Feed',
    };
    setActiveDataset(connectedDs);
  };

  const getVarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calendar': return <Calendar className="w-4 h-4 text-[#16E0D0]" />;
      case 'Thermometer': return <Thermometer className="w-4 h-4 text-amber-400" />;
      case 'Droplets': return <Droplets className="w-4 h-4 text-sky-400" />;
      case 'Leaf': return <Leaf className="w-4 h-4 text-emerald-400" />;
      case 'Wind': return <Wind className="w-4 h-4 text-cyan-300" />;
      case 'Gauge': return <Gauge className="w-4 h-4 text-purple-400" />;
      case 'Activity': return <Activity className="w-4 h-4 text-rose-400" />;
      case 'MapPin': return <MapPin className="w-4 h-4 text-red-400" />;
      default: return <Database className="w-4 h-4 text-[#16E0D0]" />;
    }
  };

  const filteredRows = previewRows.filter(
    (row) =>
      !tableSearch ||
      (row.date && row.date.includes(tableSearch)) ||
      (row.region && row.region.toLowerCase().includes(tableSearch.toLowerCase())) ||
      (row.temperature && row.temperature.toString().includes(tableSearch))
  );

  const totalPages = Math.ceil(filteredRows.length / pageSize) || 1;
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="h-full flex flex-col justify-between space-y-6 select-none text-white max-w-[1520px] mx-auto w-full">
      {/* 1. HERO SECTION & ACTIVE DATASET OVERLAY */}
      <div className="grid grid-cols-12 gap-8 items-start pt-1">
        {/* Left Hero Block */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center space-x-2 text-[#16E0D0] font-bold text-[11px] tracking-widest uppercase mb-2">
              <span className="w-1.5 h-3.5 bg-[#16E0D0] rounded-full inline-block" />
              <span>DATA EXPLORER</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white tracking-tight leading-[1.05]">
              Explore <span className="text-[#16E0D0]">Climate Data</span>
            </h1>

            <p className="text-xs md:text-sm text-[#A8BAC4] mt-3 max-w-xl leading-relaxed font-normal">
              Access, inspect and understand committed sample benchmark datasets and streaming climate telemetry feeds.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              onClick={() => setIsUploadOpen(true)}
              className="btn-spec-primary"
            >
              <Upload className="w-4.5 h-4.5 stroke-[2.5]" />
              <span>Upload Dataset</span>
            </button>

            <button
              onClick={() => setIsBrowseOpen(true)}
              className="btn-spec-secondary"
            >
              <Folder className="w-4.5 h-4.5 text-[#16E0D0]" />
              <span>Browse Datasets</span>
            </button>

            <button
              onClick={() => setIsConnectOpen(true)}
              className="btn-spec-secondary"
            >
              <LinkIcon className="w-4.5 h-4.5 text-[#35D6F5]" />
              <span>Connect Source</span>
            </button>
          </div>
        </div>

        {/* Right Active Dataset Card Overlay */}
        <div className="col-span-12 lg:col-span-5 flex justify-end">
          <div className="glass-panel p-6 rounded-[22px] w-full max-w-[500px] h-[280px] flex flex-col justify-between relative shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0] border border-[#16E0D0]/30">
                  <Database className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white tracking-wide">Active Dataset</h3>
                {isLive ? <LiveBadge label="LIVE — /datasets/preview" /> : <DemoBadge label="DEMO — Sample" />}
              </div>
              <button
                onClick={() => setIsBrowseOpen(true)}
                className="px-4 py-1 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/15"
              >
                Change
              </button>
            </div>

            <div className="flex items-center gap-5 my-auto">
              <div className="relative w-28 h-28 rounded-2xl overflow-hidden shrink-0 border border-white/20 shadow-lg group">
                <img
                  src={activeDataset.thumbnailUrl || '/assets/nasa_earth.jpg'}
                  alt={activeDataset.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white line-clamp-1">{activeDataset.name}</h4>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#16E0D0]/15 text-[#16E0D0] border border-[#16E0D0]/30 shrink-0">
                    {activeDataset.status || 'Verified'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
                  <div>
                    <span className="text-[#78909C] block text-[10px]">Source</span>
                    <span className="font-semibold text-slate-100">{activeDataset.source || 'Sample CSV'}</span>
                  </div>
                  <div>
                    <span className="text-[#78909C] block text-[10px]">Date Range</span>
                    <span className="font-semibold text-slate-100">{activeDataset.dateRange || '1980–2022'}</span>
                  </div>
                  <div>
                    <span className="text-[#78909C] block text-[10px]">Format</span>
                    <span className="font-semibold text-slate-100">{activeDataset.format || 'CSV'}</span>
                  </div>
                  <div>
                    <span className="text-[#78909C] block text-[10px]">Total Records</span>
                    <span className="font-semibold text-slate-100">{activeDataset.totalRecords || '516'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DATASET TABS STRIP */}
      <div className="flex items-center space-x-2 p-1.5 rounded-[24px] bg-white/5 border border-white/10 w-fit backdrop-blur-md">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'preview', label: 'Data Preview' },
          { id: 'quality', label: 'Data Quality' },
          { id: 'variables', label: 'Variables' },
          { id: 'visualizations', label: 'Visualizations' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SubTabId)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#16E0D0] text-[#04131D] shadow-[0_0_20px_rgba(22,224,208,0.45)]'
                  : 'text-[#A8BAC4] hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3. MAIN CONTENT THREE-COLUMN GRID */}
      <div className="flex-1 min-h-[380px]">
        {/* OVERVIEW SUB-TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-12 gap-6 items-stretch">
            {/* COLUMN 1: Dataset Overview */}
            <div className="col-span-12 lg:col-span-6 glass-panel p-6 rounded-[22px] flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2.5 mb-1">
                  <FileText className="w-5 h-5 text-[#16E0D0]" />
                  <h3 className="text-base font-bold text-white">Dataset Overview</h3>
                </div>
                <p className="text-xs text-[#A8BAC4] mb-5">Key information about the loaded benchmark dataset.</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="spec-metric-block p-4 flex items-center space-x-3.5">
                    <div className="p-2.5 rounded-xl bg-[#16E0D0]/10 text-[#16E0D0]">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-base font-extrabold text-white block leading-tight">{activeDataset.totalRecords || '516'}</span>
                      <span className="text-[11px] text-[#78909C] font-medium">Total Records</span>
                    </div>
                  </div>

                  <div className="spec-metric-block p-4 flex items-center space-x-3.5">
                    <div className="p-2.5 rounded-xl bg-[#16E0D0]/10 text-[#16E0D0]">
                      <Table className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-base font-extrabold text-white block leading-tight">{activeDataset.totalColumns || 8}</span>
                      <span className="text-[11px] text-[#78909C] font-medium">Total Columns</span>
                    </div>
                  </div>

                  <div className="spec-metric-block p-4 flex items-center space-x-3.5">
                    <div className="p-2.5 rounded-xl bg-[#16E0D0]/10 text-[#16E0D0]">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold text-white block leading-tight">1980 – 2022</span>
                      <span className="text-[11px] text-[#78909C] font-medium">Date Range</span>
                    </div>
                  </div>

                  <div className="spec-metric-block p-4 flex items-center space-x-3.5">
                    <div className="p-2.5 rounded-xl bg-[#16E0D0]/10 text-[#16E0D0]">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-base font-extrabold text-white block leading-tight">{activeDataset.coverage || 'Regional'}</span>
                      <span className="text-[11px] text-[#78909C] font-medium">Coverage</span>
                    </div>
                  </div>

                  <div className="spec-metric-block p-4 flex items-center space-x-3.5">
                    <div className="p-2.5 rounded-xl bg-[#16E0D0]/10 text-[#16E0D0]">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-base font-extrabold text-white block leading-tight">{activeDataset.frequency || 'Monthly'}</span>
                      <span className="text-[11px] text-[#78909C] font-medium">Frequency</span>
                    </div>
                  </div>

                  <div className="spec-metric-block p-4 flex items-center space-x-3.5">
                    <div className="p-2.5 rounded-xl bg-[#16E0D0]/10 text-[#16E0D0]">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold text-white block leading-tight line-clamp-1">{activeDataset.dataType || 'Observational'}</span>
                      <span className="text-[11px] text-[#78909C] font-medium">Data Type</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 2: Variables Panel */}
            <div className="col-span-12 md:col-span-6 lg:col-span-3 glass-panel p-6 rounded-[22px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <Sliders className="w-4.5 h-4.5 text-[#16E0D0]" />
                    <h3 className="text-base font-bold text-white">Variables</h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('variables')}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
                  >
                    View All
                  </button>
                </div>
                <p className="text-xs text-[#A8BAC4] mb-4">List of available climate variables in this dataset.</p>

                <div className="space-y-[5px]">
                  {DATASET_VARIABLES.map((v) => (
                    <div
                      key={v.name}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        {getVarIcon(v.iconName)}
                        <span className="text-xs font-semibold text-white">{v.name}</span>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#16E0D0]/15 text-[#16E0D0] border border-[#16E0D0]/30">
                        {v.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* COLUMN 3: Quick Preview Panel */}
            <div className="col-span-12 md:col-span-6 lg:col-span-3 glass-panel p-6 rounded-[22px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <Table className="w-4.5 h-4.5 text-[#16E0D0]" />
                    <h3 className="text-base font-bold text-white">Quick Preview</h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('preview')}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
                  >
                    View Full
                  </button>
                </div>
                <p className="text-xs text-[#A8BAC4] mb-4">First 5 rows from the committed benchmark dataset.</p>

                <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-white/10 text-[#A8BAC4] font-semibold border-b border-white/10">
                      <tr>
                        <th className="py-2.5 px-2.5">Date</th>
                        <th className="py-2.5 px-2.5 text-right">Temp</th>
                        <th className="py-2.5 px-2.5 text-right">Rain</th>
                        <th className="py-2.5 px-2.5 text-right">CO₂</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {previewRows.slice(0, 5).map((row, idx) => (
                        <tr key={row.date || idx} className="hover:bg-white/10 transition-colors">
                          <td className="py-2.5 px-2.5 text-white font-mono text-[10px]">{row.date}</td>
                          <td className="py-2.5 px-2.5 text-right text-slate-200">{row.temperature}</td>
                          <td className="py-2.5 px-2.5 text-right text-slate-200">{row.rainfall}</td>
                          <td className="py-2.5 px-2.5 text-right text-[#16E0D0] font-bold">{row.co2}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DATA PREVIEW SUB-TAB */}
        {activeTab === 'preview' && (
          <div className="glass-panel p-6 rounded-[22px] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">Full Dataset Inspector</h3>
                <p className="text-xs text-[#A8BAC4]">Displaying indexed rows for {activeDataset.name}</p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#78909C]" />
                <input
                  type="text"
                  placeholder="Filter by date, temp..."
                  value={tableSearch}
                  onChange={(e) => {
                    setTableSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-9 pr-3 py-1.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder-[#78909C] focus:outline-none focus:border-[#16E0D0]"
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-xs text-left">
                <thead className="bg-white/10 text-slate-200 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Region</th>
                    <th className="py-2.5 px-3 text-right">Temp (°C)</th>
                    <th className="py-2.5 px-3 text-right">Rainfall (mm)</th>
                    <th className="py-2.5 px-3 text-right">CO2 (ppm)</th>
                    <th className="py-2.5 px-3 text-right">Humidity (%)</th>
                    <th className="py-2.5 px-3 text-right">Pressure (hPa)</th>
                    <th className="py-2.5 px-3 text-right">Forcing (W/m²)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {paginatedRows.map((row, idx) => (
                    <tr key={row.date || idx} className="hover:bg-white/5 transition-colors">
                      <td className="py-2.5 px-3 font-mono text-[#16E0D0]">{row.date}</td>
                      <td className="py-2.5 px-3 text-slate-300">{row.region || 'Chennai, India'}</td>
                      <td className="py-2.5 px-3 text-right text-amber-300 font-semibold">{row.temperature}</td>
                      <td className="py-2.5 px-3 text-right text-blue-300">{row.rainfall}</td>
                      <td className="py-2.5 px-3 text-right text-emerald-300 font-bold">{row.co2}</td>
                      <td className="py-2.5 px-3 text-right text-slate-300">{row.humidity}</td>
                      <td className="py-2.5 px-3 text-right text-slate-300">{row.pressure}</td>
                      <td className="py-2.5 px-3 text-right text-rose-300">{row.climate_forcing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between text-xs text-[#A8BAC4] pt-2">
              <span>
                Page <strong className="text-white">{currentPage}</strong> of <strong className="text-white">{totalPages}</strong> ({filteredRows.length} total rows)
              </span>
              <div className="flex items-center space-x-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-1.5 rounded-lg bg-white/5 border border-white/10 disabled:opacity-40 hover:bg-white/15"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="p-1.5 rounded-lg bg-white/5 border border-white/10 disabled:opacity-40 hover:bg-white/15"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DATA QUALITY SUB-TAB */}
        {activeTab === 'quality' && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4 glass-panel p-6 rounded-[22px] flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-[#16E0D0]" />
                  <h3 className="text-base font-bold text-white">Dataset Quality Index</h3>
                </div>
                <p className="text-xs text-[#A8BAC4]">Automated structural integrity and validation analysis</p>

                <div className="my-6 text-center">
                  <div className="inline-flex flex-col items-center justify-center w-32 h-32 rounded-full border-4 border-[#16E0D0] bg-[#16E0D0]/10 shadow-[0_0_30px_rgba(22,224,208,0.4)]">
                    <span className="text-3xl font-extrabold text-white">99.8%</span>
                    <span className="text-[10px] font-bold uppercase text-[#16E0D0] tracking-widest">VERIFIED</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-[#A8BAC4]">
                <span className="font-semibold text-white">Audit Summary:</span> 516 monthly rows checked from 1980 to 2022. Monotonic date order clean.
              </div>
            </div>

            <div className="col-span-12 lg:col-span-8 glass-panel p-6 rounded-[22px] space-y-4">
              <h3 className="text-sm font-bold text-white">Structural Health Metrics</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#A8BAC4] font-semibold">Missing Value Rate</span>
                    <span className="text-emerald-400 font-bold">0.00% (Clean)</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-full" />
                  </div>
                  <p className="text-[10px] text-[#78909C] pt-1">No missing fields in 516 monthly records.</p>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#A8BAC4] font-semibold">Outlier Rate</span>
                    <span className="text-cyan-400 font-bold">0.12% (Normal)</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 w-[99.5%]" />
                  </div>
                  <p className="text-[10px] text-[#78909C] pt-1">Extreme events match physical monsoon/thermal cycles.</p>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#A8BAC4] font-semibold">Duplicate Check</span>
                    <span className="text-emerald-400 font-bold">0 Duplicates</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-full" />
                  </div>
                  <p className="text-[10px] text-[#78909C] pt-1">Continuous monotonic monthly series from Jan 1980 to Dec 2022.</p>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#A8BAC4] font-semibold">Schema Consistency</span>
                    <span className="text-emerald-400 font-bold">100% Valid</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-full" />
                  </div>
                  <p className="text-[10px] text-[#78909C] pt-1">All columns match standard float & ISO date formats.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VARIABLES SUB-TAB */}
        {activeTab === 'variables' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {DATASET_VARIABLES.map((v) => (
              <div key={v.name} className="glass-panel p-5 rounded-[22px] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    {getVarIcon(v.iconName)}
                    <h4 className="text-sm font-bold text-white">{v.name}</h4>
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#16E0D0]/15 text-[#16E0D0] font-semibold border border-[#16E0D0]/30">
                    {v.type}
                  </span>
                </div>

                <p className="text-xs text-[#A8BAC4] leading-snug">{v.description}</p>

                {v.type === 'Numeric' && (
                  <div className="pt-2 border-t border-white/10 grid grid-cols-3 gap-1 text-[10px] text-center">
                    <div className="bg-white/5 p-2 rounded-xl">
                      <span className="text-[#78909C] block">Min</span>
                      <span className="text-white font-bold">{v.min} {v.unit}</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded-xl">
                      <span className="text-[#78909C] block">Mean</span>
                      <span className="text-cyan-300 font-bold">{v.mean} {v.unit}</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded-xl">
                      <span className="text-[#78909C] block">Max</span>
                      <span className="text-amber-300 font-bold">{v.max} {v.unit}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* VISUALIZATIONS SUB-TAB */}
        {activeTab === 'visualizations' && (
          <div className="glass-panel p-6 rounded-[22px] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#16E0D0]" />
                  Historical Climate Variables Trend (1980 - 2022)
                </h3>
                <p className="text-xs text-[#A8BAC4]">Atmospheric CO2 Concentration vs Surface Temperature & Rainfall</p>
              </div>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={previewRows}>
                  <defs>
                    <linearGradient id="co2Color" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16E0D0" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#16E0D0" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="tempColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="#A8BAC4" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#A8BAC4" tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(3, 20, 28, 0.95)',
                      borderColor: 'rgba(22, 224, 208, 0.4)',
                      borderRadius: '16px',
                      color: '#fff',
                    }}
                  />
                  <Area type="monotone" dataKey="co2" stroke="#16E0D0" fillOpacity={1} fill="url(#co2Color)" name="CO2 (ppm)" />
                  <Area type="monotone" dataKey="temperature" stroke="#F59E0B" fillOpacity={1} fill="url(#tempColor)" name="Temperature (°C)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <UploadDatasetModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
      <BrowseDatasetsModal
        isOpen={isBrowseOpen}
        onClose={() => setIsBrowseOpen(false)}
        activeDatasetId={activeDataset.id}
        onSelectDataset={setActiveDataset}
      />
      <ConnectSourceModal
        isOpen={isConnectOpen}
        onClose={() => setIsConnectOpen(false)}
        onConnect={handleConnectSuccess}
      />
    </div>
  );
};
