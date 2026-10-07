export interface RiskKpiMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'negative' | 'warning' | 'info' | 'positive';
  iconName: string;
}

export const MOCK_RISK_KPIS: RiskKpiMetric[] = [
  {
    id: 'kpi-anom',
    title: 'Anomalies Detected',
    value: '12',
    change: '↑ +33% from previous',
    changeType: 'negative',
    iconName: 'AlertTriangle',
  },
  {
    id: 'kpi-high',
    title: 'High Risk Events',
    value: '3',
    change: '↑ +1 from previous',
    changeType: 'warning',
    iconName: 'BarChart2',
  },
  {
    id: 'kpi-idx',
    title: 'Risk Index',
    value: '72',
    change: 'High Risk',
    changeType: 'negative',
    iconName: 'ShieldAlert',
  },
  {
    id: 'kpi-reg',
    title: 'Regions Monitored',
    value: '5',
    change: '↑ No change',
    changeType: 'positive',
    iconName: 'Clock',
  },
];

export interface AnomalyTrendPoint {
  year: string;
  actualTemp: number;
  expectedTemp: number;
  isAnomaly: boolean;
  anomalyVal?: number | null;
  riskThreshold: number;
}

export const MOCK_ANOMALY_TIMELINE: AnomalyTrendPoint[] = [
  { year: '2019', actualTemp: 24.2, expectedTemp: 20.5, isAnomaly: false, riskThreshold: 28 },
  { year: '2019.5', actualTemp: 26.5, expectedTemp: 20.8, isAnomaly: false, riskThreshold: 28 },
  { year: '2020', actualTemp: 28.4, expectedTemp: 21.0, isAnomaly: true, anomalyVal: 28.4, riskThreshold: 28 },
  { year: '2020.5', actualTemp: 25.1, expectedTemp: 21.2, isAnomaly: false, riskThreshold: 28 },
  { year: '2021', actualTemp: 27.8, expectedTemp: 21.4, isAnomaly: false, riskThreshold: 28 },
  { year: '2021.5', actualTemp: 32.1, expectedTemp: 21.5, isAnomaly: true, anomalyVal: 32.1, riskThreshold: 28 },
  { year: '2022', actualTemp: 26.2, expectedTemp: 21.7, isAnomaly: false, riskThreshold: 28 },
  { year: '2022.5', actualTemp: 29.8, expectedTemp: 21.8, isAnomaly: true, anomalyVal: 29.8, riskThreshold: 28 },
  { year: '2023', actualTemp: 30.5, expectedTemp: 22.0, isAnomaly: true, anomalyVal: 30.5, riskThreshold: 28 },
  { year: '2023.5', actualTemp: 24.8, expectedTemp: 22.2, isAnomaly: false, riskThreshold: 28 },
  { year: '2024', actualTemp: 29.4, expectedTemp: 22.4, isAnomaly: true, anomalyVal: 29.4, riskThreshold: 28 },
  { year: '2024.5', actualTemp: 25.6, expectedTemp: 22.5, isAnomaly: false, riskThreshold: 28 },
];

export interface RiskDistributionSegment {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export const MOCK_RISK_DISTRIBUTION: RiskDistributionSegment[] = [
  { name: 'High Risk', count: 3, percentage: 25, color: '#FF3B3B' },
  { name: 'Medium Risk', count: 4, percentage: 33, color: '#FF9F1C' },
  { name: 'Low Risk', count: 3, percentage: 25, color: '#F4D35E' },
  { name: 'Normal', count: 2, percentage: 17, color: '#4ADE80' },
];

export interface AnomalyTypePoint {
  category: string;
  count: number;
  color: string;
}

export const MOCK_ANOMALY_TYPES: AnomalyTypePoint[] = [
  { category: 'Heat Wave', count: 6, color: '#FF3B3B' },
  { category: 'Cold Spikes', count: 2, color: '#FF9F1C' },
  { category: 'Heavy Rainfall', count: 3, color: '#35D6F5' },
  { category: 'Drought', count: 1, color: '#A855F7' },
];

export interface RecentAnomalyItem {
  id: string;
  date: string;
  location: string;
  variable: string;
  anomalyType: string;
  riskLevel: 'High' | 'Medium' | 'Low' | 'Normal';
}

export const MOCK_RECENT_ANOMALIES: RecentAnomalyItem[] = [
  { id: '1', date: '2024-07-15', location: 'Chennai', variable: 'Temperature', anomalyType: 'Heat Wave', riskLevel: 'High' },
  { id: '2', date: '2024-06-28', location: 'Chennai', variable: 'Temperature', anomalyType: 'Heat Wave', riskLevel: 'High' },
  { id: '3', date: '2024-05-12', location: 'Chennai', variable: 'Rainfall', anomalyType: 'Heavy Rainfall', riskLevel: 'Medium' },
  { id: '4', date: '2024-01-08', location: 'Chennai', variable: 'Temperature', anomalyType: 'Cold Spike', riskLevel: 'Medium' },
  { id: '5', date: '2023-11-21', location: 'Chennai', variable: 'Drought Index', anomalyType: 'Drought', riskLevel: 'Low' },
];

export interface MapHotspot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  riskLevel: 'High' | 'Medium' | 'Low' | 'Normal';
  color: string;
  xPercent: number; // For custom vector map placement
  yPercent: number;
}

export const MOCK_MAP_HOTSPOTS: MapHotspot[] = [
  { id: 'h1', name: 'Chennai Central', lat: 13.0827, lng: 80.2707, riskLevel: 'High', color: '#FF3B3B', xPercent: 68, yPercent: 48 },
  { id: 'h2', name: 'Kanchipuram Corridor', lat: 12.8342, lng: 79.7036, riskLevel: 'Medium', color: '#FF9F1C', xPercent: 45, yPercent: 35 },
  { id: 'h3', name: 'Thiruvallur North', lat: 13.1432, lng: 79.9056, riskLevel: 'High', color: '#FF3B3B', xPercent: 52, yPercent: 22 },
  { id: 'h4', name: 'Chengalpattu Coastal', lat: 12.6939, lng: 79.9757, riskLevel: 'Medium', color: '#FF9F1C', xPercent: 58, yPercent: 65 },
  { id: 'h5', name: 'Vellore West', lat: 12.9165, lng: 79.1325, riskLevel: 'Low', color: '#F4D35E', xPercent: 25, yPercent: 52 },
];
