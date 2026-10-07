import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import {
  MapPin,
  Thermometer,
  Calendar,
  Activity,
  Play,
  Maximize2,
  ChevronDown,
  AlertTriangle,
  BarChart2,
  ShieldAlert,
  Clock,
  Scale,
  Target,
  Bell,
  ArrowRight,
  Plus,
  Minus,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Scatter,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { ClimoraApi } from '../../api/client';
import { LiveBadge, DemoBadge } from '../../components/ui/LiveBadge';
import {
  MOCK_RISK_KPIS,
  MOCK_ANOMALY_TIMELINE,
  MOCK_RISK_DISTRIBUTION,
  MOCK_ANOMALY_TYPES,
  MOCK_RECENT_ANOMALIES,
  MOCK_MAP_HOTSPOTS,
} from '../../data/riskData';

// Mapbox token loaded from environment variable (never hardcode secrets)
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string;

const CITY_COORDINATES: Record<string, [number, number]> = {
  'Chennai, India': [80.2707, 13.0827],
  'Mumbai, India': [72.8777, 19.0760],
  'Delhi, India': [77.1025, 28.7041],
  'Bengaluru, India': [77.5946, 12.9716],
};

export const RiskPage: React.FC = () => {
  // Control States
  const [selectedLocation, setSelectedLocation] = useState<string>('Chennai, India');
  const [selectedVariable, setSelectedVariable] = useState<string>('Temperature');
  const [timeRange, setTimeRange] = useState<string>('Last 5 Years');
  const [anomalyType, setAnomalyType] = useState<string>('All Types');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Live Data States
  const [anomalies, setAnomalies] = useState<any[]>(MOCK_RECENT_ANOMALIES);
  const [hotspots, setHotspots] = useState<any | null>(null);
  const [isLive, setIsLive] = useState<boolean>(false);

  // Mapbox GL State & Refs
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [selectedRiskLevelFilter, setSelectedRiskLevelFilter] = useState<string>('All Levels');
  const [showRiskLevelDropdown, setShowRiskLevelDropdown] = useState<boolean>(false);
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);

  // Dropdown States
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showVarDropdown, setShowVarDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  // Options
  const locationOptions = ['Chennai, India', 'Mumbai, India', 'Delhi, India', 'Bengaluru, India'];
  const variableOptions = ['Temperature', 'Rainfall', 'CO₂', 'Humidity', 'Pressure', 'Climate Forcing'];
  const timeRangeOptions = ['Last 1 Year', 'Last 3 Years', 'Last 5 Years', 'Last 10 Years'];
  const typeOptions = ['All Types', 'Heat Wave', 'Cold Spike', 'Heavy Rainfall', 'Drought', 'Extreme Wind'];
  const riskLevelFilterOptions = ['All Levels', 'High Risk', 'Medium Risk', 'Low Risk', 'Normal'];

  const fetchRiskData = async () => {
    try {
      const [anomRes, geoRes] = await Promise.all([
        ClimoraApi.getAnomalies().catch(() => null),
        ClimoraApi.getGeoJSONHotspots().catch(() => null),
      ]);
      if (anomRes?.anomalies && anomRes.anomalies.length > 0) {
        setAnomalies(anomRes.anomalies);
        setIsLive(true);
      }
      if (geoRes?.features && geoRes.features.length > 0) {
        setHotspots(geoRes);
        setIsLive(true);
      }
    } catch (e) {
      console.warn('Risk API fetch failed, fallback active:', e);
      setIsLive(false);
    }
  };

  useEffect(() => {
    fetchRiskData();
  }, [selectedLocation, timeRange]);

  // Initialize Mapbox map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initialCoords = CITY_COORDINATES[selectedLocation] || [80.2707, 13.0827];

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: initialCoords,
      zoom: 10,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    map.on('load', () => {
      setIsMapLoaded(true);
      map.resize();
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update map markers when filters, map state, or live hotspots arrive
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !isMapLoaded) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const activeHotspots = hotspots?.features
      ? hotspots.features.map((f: any) => ({
          name: f.properties?.name || 'Hotspot Zone',
          lat: f.geometry?.coordinates?.[1] || 13.0827,
          lng: f.geometry?.coordinates?.[0] || 80.2707,
          riskLevel: f.properties?.riskLevel || 'High',
          color: f.properties?.color || '#FF3B3B',
        }))
      : MOCK_MAP_HOTSPOTS;

    const filteredHotspots = activeHotspots.filter((spot: any) => {
      if (selectedRiskLevelFilter === 'All Levels') return true;
      const spotFilterName = spot.riskLevel.toLowerCase() + ' risk';
      return (
        spotFilterName === selectedRiskLevelFilter.toLowerCase() ||
        spot.riskLevel.toLowerCase() === selectedRiskLevelFilter.toLowerCase()
      );
    });

    filteredHotspots.forEach((spot: any) => {
      const el = document.createElement('div');
      el.className = 'group relative flex items-center justify-center cursor-pointer';
      el.style.width = '30px';
      el.style.height = '30px';

      el.innerHTML = `
        <div style="width: 32px; height: 32px; border-radius: 50%; background-color: ${spot.color}; opacity: 0.35; position: absolute; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
        <div style="width: 24px; height: 24px; border-radius: 50%; background-color: ${spot.color}; opacity: 0.65; filter: blur(3px); position: absolute;"></div>
        <div style="width: 12px; height: 12px; border-radius: 50%; background-color: ${spot.color}; border: 2px solid #ffffff; position: relative; z-index: 10; box-shadow: 0 0 10px ${spot.color};"></div>
        <div style="position: absolute; left: 18px; top: -4px; white-space: nowrap; background: rgba(3, 20, 28, 0.9); border: 1px solid rgba(255, 255, 255, 0.25); backdrop-filter: blur(8px); padding: 2px 7px; border-radius: 6px; color: #ffffff; font-size: 10px; font-weight: 600; box-shadow: 0 4px 12px rgba(0,0,0,0.6);">
          ${spot.name}
        </div>
      `;

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([spot.lng, spot.lat])
        .addTo(map);

      markersRef.current.push(marker);
    });
  }, [isMapLoaded, selectedRiskLevelFilter, hotspots]);

  // Fly map when selected location changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const coords = CITY_COORDINATES[selectedLocation];
    if (coords) {
      map.flyTo({
        center: coords,
        zoom: 10.5,
        essential: true,
        duration: 1500,
      });
    }
  }, [selectedLocation]);

  // Handle Run Analysis
  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    await fetchRiskData();
    setIsAnalyzing(false);
  };

  // Helper for KPI icon rendering
  const renderKpiIcon = (iconName: string) => {
    switch (iconName) {
      case 'AlertTriangle':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'BarChart2':
        return <BarChart2 className="w-4 h-4 text-amber-400" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-4 h-4 text-[#16E0D0]" />;
      case 'Clock':
      default:
        return <Clock className="w-4 h-4 text-[#4ADE80]" />;
    }
  };

  // Helper for risk level badge styling
  const getRiskBadgeStyle = (level: string) => {
    switch (level) {
      case 'High':
        return 'bg-red-500/20 border-red-500/40 text-red-400';
      case 'Medium':
        return 'bg-amber-500/20 border-amber-500/40 text-amber-400';
      case 'Low':
        return 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300';
      case 'Normal':
      default:
        return 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400';
    }
  };

  return (
    <div className="w-full h-full flex flex-col space-y-6 text-white overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-2 pt-3 pb-8 select-none">
      {/* 1. PAGE HEADER & TOP KPI STRIP */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-1">
        {/* Left: Page Title & Identity */}
        <div className="space-y-2 py-2">
          <div className="flex items-center space-x-2 text-[#16E0D0] font-semibold text-xs tracking-[0.18em] uppercase">
            <span className="w-1.5 h-3.5 bg-[#16E0D0] rounded-full inline-block" />
            <span>RISK AND ANOMALIES</span>
          </div>
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-snug">
            Monitor <span className="text-[#16E0D0]">Climate Risks</span> and Anomalies
          </h1>
          <p className="text-xs lg:text-sm text-gray-200 font-medium max-w-2xl leading-relaxed pt-0.5">
            Detect abnormal climate patterns, assess risk levels and monitor potential threats across regions using GeoJSON hotspots.
          </p>
        </div>

        {/* Right: 4 Compact KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
          {MOCK_RISK_KPIS.map((kpi) => (
            <div
              key={kpi.id}
              className="glass-panel p-3.5 flex flex-col justify-between min-w-[130px] shadow-xl hover:border-white/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                  {renderKpiIcon(kpi.iconName)}
                </div>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-extrabold text-white">{kpi.value}</p>
                <p className="text-[11px] font-semibold text-gray-200 mt-0.5 truncate">{kpi.title}</p>
                <p
                  className={`text-[10px] font-medium mt-1 truncate ${
                    kpi.changeType === 'negative'
                      ? 'text-red-400'
                      : kpi.changeType === 'warning'
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {kpi.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. CONTROL ROW (HORIZONTAL FILTERS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
        {/* Location Selector (Col Span 3) */}
        <div className="lg:col-span-3 relative">
          <button
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            className="w-full h-[60px] glass-panel px-4 py-3 flex items-center justify-between hover:border-[#16E0D0]/50 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center space-x-3.5">
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
            <div className="flex items-center space-x-3.5">
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

        {/* Time Range Selector (Col Span 2) */}
        <div className="lg:col-span-2 relative">
          <button
            onClick={() => setShowTimeDropdown(!showTimeDropdown)}
            className="w-full h-[60px] glass-panel px-4 py-3 flex items-center justify-between hover:border-[#16E0D0]/50 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0]">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-300 font-medium">Time Range</p>
                <p className="text-xs md:text-sm font-semibold text-white">{timeRange}</p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-300 shrink-0 transition-transform ${showTimeDropdown ? 'rotate-180 text-[#16E0D0]' : ''}`} />
          </button>
          {showTimeDropdown && (
            <div className="absolute top-full left-0 mt-1.5 w-full bg-[#082633]/95 border border-white/20 rounded-xl shadow-2xl py-1.5 z-30 backdrop-blur-2xl">
              {timeRangeOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setTimeRange(opt);
                    setShowTimeDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                    timeRange === opt ? 'bg-[#16E0D0]/20 text-[#16E0D0] font-semibold' : 'text-gray-200 hover:bg-white/10'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Anomaly Type Selector (Col Span 3) */}
        <div className="lg:col-span-3 relative">
          <button
            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            className="w-full h-[60px] glass-panel px-4 py-3 flex items-center justify-between hover:border-[#16E0D0]/50 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0]">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-300 font-medium">Anomaly Type</p>
                <p className="text-xs md:text-sm font-semibold text-white">{anomalyType}</p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-300 shrink-0 transition-transform ${showTypeDropdown ? 'rotate-180 text-[#16E0D0]' : ''}`} />
          </button>
          {showTypeDropdown && (
            <div className="absolute top-full left-0 mt-1.5 w-full bg-[#082633]/95 border border-white/20 rounded-xl shadow-2xl py-1.5 z-30 backdrop-blur-2xl">
              {typeOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setAnomalyType(opt);
                    setShowTypeDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                    anomalyType === opt ? 'bg-[#16E0D0]/20 text-[#16E0D0] font-semibold' : 'text-gray-200 hover:bg-white/10'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Run Analysis Button (Col Span 2) */}
        <div className="lg:col-span-2">
          <button
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
            className="w-full h-[60px] bg-gradient-to-r from-[#16E0D0] to-[#35D6F5] text-[#03141C] font-bold rounded-full px-6 py-3 flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(22,224,208,0.45)] hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-75"
          >
            <Play className={`w-4 h-4 fill-[#03141C] ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span className="text-xs md:text-sm tracking-wide">
              {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
            </span>
          </button>
        </div>
      </div>

      {/* 3. PRIMARY CONTENT ROW (ANOMALY DETECTION & GEOSPATIAL MAP - 58%/42%) */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 transition-opacity duration-300 ${isAnalyzing ? 'opacity-50' : 'opacity-100'}`}>
        {/* Left Panel: Anomaly Detection (7 of 12 cols ~ 58%) */}
        <div className="lg:col-span-7 glass-panel p-5 md:p-6 flex flex-col justify-between shadow-2xl min-h-[340px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0]">
                <BarChart2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  Anomaly Detection
                  {isLive ? <LiveBadge label="LIVE — /risk/anomalies" /> : <DemoBadge label="DEMO — Sample" />}
                </h3>
                <p className="text-xs text-gray-300">{selectedVariable} anomalies over time with risk thresholds</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="px-3 py-1 rounded-lg border border-white/20 bg-black/40 text-xs text-gray-200 font-medium flex items-center gap-1 cursor-pointer">
                {selectedVariable} <ChevronDown className="w-3.5 h-3.5 text-gray-300" />
              </button>
              <button className="text-gray-300 hover:text-[#16E0D0] p-1.5 transition-colors cursor-pointer">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chart Canvas */}
          <div className="w-full h-[230px] md:h-[250px] pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={MOCK_ANOMALY_TIMELINE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.12)" vertical={false} />
                <XAxis
                  dataKey="year"
                  stroke="rgba(255,255,255,0.4)"
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                  ticks={['2019', '2020', '2021', '2022', '2023', '2024']}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.4)"
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                  domain={[16, 36]}
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
                    if (name === 'actualTemp') return [`${val} °C`, 'Actual Temp'];
                    if (name === 'expectedTemp') return [`${val} °C`, 'Expected Baseline'];
                    if (name === 'anomalyVal') return [`${val} °C`, 'Anomaly Breach'];
                    return [val, name];
                  }}
                />
                <ReferenceLine
                  y={28}
                  stroke="#FF3B3B"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  label={{ value: 'High Risk Threshold', fill: '#FF3B3B', fontSize: 10, position: 'insideTopRight' }}
                />
                <Line
                  type="monotone"
                  dataKey="expectedTemp"
                  stroke="#16E0D0"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#16E0D0' }}
                />
                <Line
                  type="monotone"
                  dataKey="actualTemp"
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth={1.5}
                  dot={{ r: 2, fill: '#fff' }}
                />
                <Scatter dataKey="anomalyVal" fill="#FF3B3B" shape="circle" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Chart Legend */}
          <div className="flex items-center justify-center space-x-6 pt-2 text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white/80" />
              <span className="text-gray-300 font-medium">Actual Temperature</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16E0D0]" />
              <span className="text-gray-300 font-medium">Expected Temperature</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF3B3B]" />
              <span className="text-gray-300 font-medium">Anomaly Points</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-4 h-0.5 border-b border-dashed border-[#FF3B3B]" />
              <span className="text-gray-300 font-medium">High Risk Threshold</span>
            </div>
          </div>
        </div>

        {/* Right Panel: Geospatial Risk Map (5 of 12 cols ~ 42%) */}
        <div className="lg:col-span-5 glass-panel p-5 md:p-6 flex flex-col justify-between shadow-2xl min-h-[340px] relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between mb-3 z-10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0]">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  Geospatial Risk Map
                  {hotspots ? <LiveBadge label="GeoJSON Hotspots" /> : null}
                </h3>
                <p className="text-xs text-gray-300">Regional risk levels and anomaly distribution</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 relative">
              <div className="relative">
                <button
                  onClick={() => setShowRiskLevelDropdown(!showRiskLevelDropdown)}
                  className="px-3 py-1 rounded-lg border border-white/20 bg-black/40 text-xs text-gray-200 font-medium flex items-center gap-1 cursor-pointer hover:border-[#16E0D0]/50 transition-colors"
                >
                  <span>{selectedRiskLevelFilter}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-300 transition-transform ${showRiskLevelDropdown ? 'rotate-180 text-[#16E0D0]' : ''}`} />
                </button>
                {showRiskLevelDropdown && (
                  <div className="absolute right-0 top-full mt-1.5 w-36 bg-[#082633]/95 border border-white/20 rounded-xl shadow-2xl py-1.5 z-30 backdrop-blur-2xl">
                    {riskLevelFilterOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSelectedRiskLevelFilter(opt);
                          setShowRiskLevelDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                          selectedRiskLevelFilter === opt ? 'bg-[#16E0D0]/20 text-[#16E0D0] font-semibold' : 'text-gray-200 hover:bg-white/10'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button className="text-gray-300 hover:text-[#16E0D0] p-1.5 transition-colors cursor-pointer">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mapbox GL Map Container */}
          <div className="relative w-full h-[230px] md:h-[250px] rounded-xl overflow-hidden border border-white/15 bg-[#03151E]">
            <div ref={mapContainerRef} className="w-full h-full" />

            {/* Map Legend Overlay */}
            <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md border border-white/20 rounded-xl p-2.5 z-10 space-y-1.5 text-[10px] pointer-events-none shadow-xl">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF3B3B] shadow-[0_0_6px_#FF3B3B]" />
                <span className="text-gray-200 font-medium">High Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF9F1C] shadow-[0_0_6px_#FF9F1C]" />
                <span className="text-gray-200 font-medium">Medium Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F4D35E] shadow-[0_0_6px_#F4D35E]" />
                <span className="text-gray-200 font-medium">Low Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4ADE80] shadow-[0_0_6px_#4ADE80]" />
                <span className="text-gray-200 font-medium">Normal</span>
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="absolute bottom-3 right-3 flex flex-col space-y-1 z-10">
              <button
                onClick={() => mapInstanceRef.current?.zoomIn()}
                className="w-7 h-7 bg-black/75 hover:bg-black/90 backdrop-blur-md border border-white/25 rounded-lg flex items-center justify-center text-white cursor-pointer shadow-lg active:scale-95 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => mapInstanceRef.current?.zoomOut()}
                className="w-7 h-7 bg-black/75 hover:bg-black/90 backdrop-blur-md border border-white/25 rounded-lg flex items-center justify-center text-white cursor-pointer shadow-lg active:scale-95 transition-all"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SECONDARY ANALYTICS ROW */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 transition-opacity duration-300 ${isAnalyzing ? 'opacity-50' : 'opacity-100'}`}>
        {/* Panel 1: Risk Level Distribution */}
        <div className="lg:col-span-4 glass-panel p-5 md:p-6 flex flex-col justify-between shadow-2xl min-h-[290px]">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0]">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Risk Level Distribution</h3>
            </div>
          </div>

          <div className="flex items-center justify-between my-auto">
            <div className="w-[140px] h-[140px] relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={MOCK_RISK_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={42}
                    outerRadius={62}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {MOCK_RISK_DISTRIBUTION.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(7, 35, 45, 0.95)',
                      borderColor: 'rgba(22, 224, 208, 0.4)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '11px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-xl font-extrabold text-white leading-none">{anomalies.length}</span>
                <span className="text-[9px] uppercase tracking-wider text-gray-400 mt-0.5">Total Events</span>
              </div>
            </div>

            <div className="flex-1 pl-4 space-y-2 text-xs">
              {MOCK_RISK_DISTRIBUTION.map((seg) => (
                <div key={seg.name} className="flex items-center justify-between text-gray-200">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
                    <span className="font-medium text-xs">{seg.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-xs">{seg.count}</span>
                    <span className="text-[10px] text-gray-400">({seg.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel 2: Anomaly Types */}
        <div className="lg:col-span-4 glass-panel p-5 md:p-6 flex flex-col justify-between shadow-2xl min-h-[290px]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0]">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Anomaly Types</h3>
                <p className="text-xs text-gray-300">Number of detected anomalies by category</p>
              </div>
            </div>

            <button className="px-2.5 py-1 rounded-lg border border-white/20 bg-black/40 text-xs text-gray-200 font-medium flex items-center gap-1 cursor-pointer">
              {timeRange} <ChevronDown className="w-3.5 h-3.5 text-gray-300" />
            </button>
          </div>

          <div className="w-full h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_ANOMALY_TYPES} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.12)" vertical={false} />
                <XAxis
                  dataKey="category"
                  stroke="rgba(255,255,255,0.4)"
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 10 }}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.4)"
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 10 }}
                  domain={[0, 8]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(7, 35, 45, 0.95)',
                    borderColor: 'rgba(22, 224, 208, 0.4)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                  formatter={(val: any) => [`${val} anomalies`, 'Count']}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {MOCK_ANOMALY_TYPES.map((entry) => (
                    <Cell key={entry.category} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Panel 3: Recent Anomalies Table */}
        <div className="lg:col-span-4 glass-panel p-5 md:p-6 flex flex-col justify-between shadow-2xl min-h-[290px]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-[#16E0D0]/15 flex items-center justify-center text-[#16E0D0]">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Recent Anomalies</h3>
              </div>
            </div>

            <button className="text-xs text-[#16E0D0] hover:underline font-semibold flex items-center gap-1 cursor-pointer">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto my-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/15 text-gray-400 text-[10px] uppercase tracking-wider">
                  <th className="pb-2 font-medium">Date</th>
                  <th className="pb-2 font-medium">Location</th>
                  <th className="pb-2 font-medium">Variable</th>
                  <th className="pb-2 font-medium">Anomaly Type</th>
                  <th className="pb-2 font-medium text-right">Risk Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {anomalies.map((row: any) => (
                  <tr key={row.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-2 text-gray-300 font-mono text-[11px]">{row.date}</td>
                    <td className="py-2 text-white font-medium">{row.location}</td>
                    <td className="py-2 text-gray-300">{row.variable}</td>
                    <td className="py-2 text-gray-200">{row.anomalyType}</td>
                    <td className="py-2 text-right">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider ${getRiskBadgeStyle(
                          row.riskLevel
                        )}`}
                      >
                        {row.riskLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
