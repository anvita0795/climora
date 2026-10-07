import type {
  ClimateSummary,
  RiskSummary,
  ForecastDay,
  KpiMetric,
  NavItem,
  ModelStatusItem,
  IntelligenceEvent,
  TrendPoint
} from '../types';

export const MOCK_NAVIGATION: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'Home', isActive: true },
  { id: 'data', label: 'Data', icon: 'Database', isActive: false },
  { id: 'analysis', label: 'Analysis', icon: 'BarChart3', isActive: false },
  { id: 'prediction', label: 'Prediction', icon: 'GitBranch', isActive: false },
  { id: 'risk', label: 'Risk', icon: 'Shield', isActive: false },
  { id: 'explain', label: 'Explain', icon: 'HelpCircle', isActive: false },
  { id: 'system', label: 'System', icon: 'Settings', isActive: false },
];

export const MOCK_CLIMATE_SUMMARY: ClimateSummary = {
  location: 'Chennai, India',
  region: 'Tamil Nadu',
  country: 'India',
  coordinates: { lat: 13.0827, lng: 80.2707 },
  climateIndex: 72,
  statusText: 'Moderate',
  lastUpdated: 'Wed, 20 Nov 2024 • 10:45 AM',
  metrics: {
    temperature: 32,
    feelsLike: 36,
    conditionText: 'Partly Cloudy',
    humidity: 68,
    windSpeed: 18,
    precipitation: 10,
    airQuality: 'Moderate',
  },
};

export const MOCK_RISK_SUMMARY: RiskSummary = {
  level: 'MODERATE',
  score: 68,
  drivers: ['Thermal Accumulation', 'Monsoon Surge'],
  forecastPeriod: 'Next 72 Hours',
  summary: 'Moderate regional climate stress index detected.',
};

export const MOCK_FORECAST_DAYS: ForecastDay[] = [
  { day: 'Wed', condition: 'sun-cloud', highTemp: 32, lowTemp: 26 },
  { day: 'Thu', condition: 'rain', highTemp: 31, lowTemp: 25 },
  { day: 'Fri', condition: 'rain', highTemp: 30, lowTemp: 25 },
  { day: 'Sat', condition: 'cloud', highTemp: 31, lowTemp: 26 },
  { day: 'Sun', condition: 'sun-cloud', highTemp: 32, lowTemp: 26 },
];

export const MOCK_KPIS: KpiMetric[] = [
  {
    id: 'kpi-obs',
    label: 'Total Observations',
    value: '52,340',
    change: '+12%',
    changeType: 'positive',
    subtext: 'from last update',
    iconName: 'BarChart2',
  },
  {
    id: 'kpi-vars',
    label: 'Climate Variables',
    value: '8',
    subtext: 'Temperature, Rainfall, CO2 +5 more',
    iconName: 'Database',
  },
  {
    id: 'kpi-anom',
    label: 'Detected Anomalies',
    value: '342',
    change: '+8%',
    changeType: 'negative',
    subtext: 'from previous period',
    iconName: 'AlertTriangle',
  },
  {
    id: 'kpi-risk',
    label: 'Current Risk Level',
    value: 'Moderate',
    subtext: 'Optimal operational risk window',
    iconName: 'ShieldCheck',
  },
  {
    id: 'kpi-models',
    label: 'Models Ready',
    value: '4/4',
    subtext: 'XGBoost • LightGBM • LSTM • Isolation Forest',
    iconName: 'GitBranch',
  },
];

export const MOCK_MODELS: ModelStatusItem[] = [
  { id: 'm1', name: 'XGBoost Thermal Predictor', algorithm: 'Gradient Boosting', status: 'Operational', version: 'v2.4.1', latencyMs: 12 },
  { id: 'm2', name: 'Spatial LSTM Monsoon Regressor', algorithm: 'Recurrent Neural Net', status: 'Operational', version: 'v1.8.0', latencyMs: 24 },
  { id: 'm3', name: 'Isolation Forest Anomaly Detector', algorithm: 'Unsupervised Ensemble', status: 'Operational', version: 'v3.1.2', latencyMs: 8 },
  { id: 'm4', name: 'LightGBM CO2 Trajectory Model', algorithm: 'Tree Ensemble', status: 'Operational', version: 'v2.0.5', latencyMs: 15 },
];

export const MOCK_INTELLIGENCE_EVENTS: IntelligenceEvent[] = [
  {
    id: 'evt-1',
    title: 'Thermal Spike Anomaly Detected',
    category: 'Thermal',
    severity: 'high',
    timestamp: '10 min ago',
    location: 'Coastal Zone A',
    description: 'Surface temperature anomaly exceeding +3.8°C above historical baseline.',
  },
  {
    id: 'evt-2',
    title: 'Monsoon Surge Forecast Updated',
    category: 'Precipitation',
    severity: 'moderate',
    timestamp: '45 min ago',
    location: 'Southern Corridor',
    description: 'Cumulative precipitation model revised upward by +18.4mm.',
  },
  {
    id: 'evt-3',
    title: 'CO2 Dispersion Drift Normal',
    category: 'Anomaly',
    severity: 'low',
    timestamp: '2 hours ago',
    location: 'Urban Basin B',
    description: 'Atmospheric carbon concentrations steady at 381.5 ppm.',
  },
];

export const MOCK_TREND_POINTS: TrendPoint[] = [
  { time: 'Nov 14', temperature: 28.2, rainfall: 12.0, co2: 338.7, anomalyScore: 0.1 },
  { time: 'Nov 15', temperature: 29.0, rainfall: 4.2, co2: 339.1, anomalyScore: 0.2 },
  { time: 'Nov 16', temperature: 31.4, rainfall: 0.0, co2: 339.5, anomalyScore: 0.8 },
  { time: 'Nov 17', temperature: 32.8, rainfall: 0.0, co2: 340.0, anomalyScore: 1.2 },
  { time: 'Nov 18', temperature: 30.5, rainfall: 18.4, co2: 340.2, anomalyScore: 0.4 },
  { time: 'Nov 19', temperature: 29.8, rainfall: 24.1, co2: 340.5, anomalyScore: 0.3 },
  { time: 'Nov 20', temperature: 32.0, rainfall: 8.5, co2: 341.0, anomalyScore: 0.6 },
];
