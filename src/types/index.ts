export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export type EventSeverity = 'low' | 'moderate' | 'high' | 'critical';

export interface ClimateMetrics {
  temperature: number; // °C
  feelsLike: number; // °C
  conditionText: string;
  humidity: number; // %
  windSpeed: number; // km/h
  precipitation: number; // %
  airQuality: string;
}

export interface ClimateSummary {
  location: string;
  region: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  climateIndex: number;
  statusText: string;
  metrics: ClimateMetrics;
  lastUpdated: string;
}

export interface RiskSummary {
  level: RiskLevel;
  score: number;
  drivers: string[];
  forecastPeriod: string;
  summary: string;
}

export interface ForecastDay {
  day: string;
  condition: 'sun-cloud' | 'rain' | 'cloud';
  highTemp: number;
  lowTemp: number;
}

export interface TrendPoint {
  time: string;
  temperature: number;
  rainfall: number;
  co2: number;
  anomalyScore: number;
}

export interface KpiMetric {
  id: string;
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  subtext: string;
  iconName: string;
}

export interface ModelStatusItem {
  id: string;
  name: string;
  algorithm: string;
  status: 'Operational' | 'Standby' | 'Updating';
  version: string;
  latencyMs: number;
}

export interface IntelligenceEvent {
  id: string;
  title: string;
  category: 'Anomaly' | 'Precipitation' | 'Thermal' | 'Coastal' | 'Model';
  severity: EventSeverity;
  timestamp: string;
  location: string;
  description: string;
}

export type NavItemId = 'home' | 'data' | 'analysis' | 'prediction' | 'risk' | 'explain' | 'system';

export interface NavItem {
  id: NavItemId;
  label: string;
  icon: string;
  isActive?: boolean;
}
