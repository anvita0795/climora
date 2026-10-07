export interface PredictionSettings {
  dataset: string;
  basePeriod: string;
  scenario: string;
}

export const MOCK_PREDICTION_SETTINGS: PredictionSettings = {
  dataset: 'NASA Global Climate Data',
  basePeriod: '1980 - 2023',
  scenario: 'Historical + Trends',
};

export interface PredictionChartPoint {
  month: string;
  historicalTemp?: number | null;
  predictedTemp?: number | null;
  upperBound?: number | null;
  lowerBound?: number | null;
  bandRange?: [number, number] | null;
}

export const MOCK_PREDICTION_SERIES: PredictionChartPoint[] = [
  { month: 'Jan', historicalTemp: 25.4 },
  { month: 'Feb', historicalTemp: 25.8 },
  { month: 'Mar', historicalTemp: 26.4 },
  { month: 'Apr', historicalTemp: 27.5, predictedTemp: 27.5, upperBound: 29.2, lowerBound: 25.8, bandRange: [25.8, 29.2] },
  { month: 'May', predictedTemp: 29.8, upperBound: 33.2, lowerBound: 26.4, bandRange: [26.4, 33.2] },
  { month: 'Jun', predictedTemp: 31.6, upperBound: 36.2, lowerBound: 27.0, bandRange: [27.0, 36.2] },
  { month: 'Jul', predictedTemp: 32.1, upperBound: 37.5, lowerBound: 26.7, bandRange: [26.7, 37.5] },
  { month: 'Aug', predictedTemp: 30.4, upperBound: 35.8, lowerBound: 25.0, bandRange: [25.0, 35.8] },
  { month: 'Sep', predictedTemp: 28.9, upperBound: 34.0, lowerBound: 23.8, bandRange: [23.8, 34.0] },
  { month: 'Oct', predictedTemp: 27.2, upperBound: 32.5, lowerBound: 21.9, bandRange: [21.9, 32.5] },
  { month: 'Nov', predictedTemp: 25.8, upperBound: 31.0, lowerBound: 20.6, bandRange: [20.6, 31.0] },
  { month: 'Dec', predictedTemp: 24.8, upperBound: 30.2, lowerBound: 19.4, bandRange: [19.4, 30.2] },
];

export interface PredictionSummary {
  peakTemp: string;
  peakMonthYear: string;
  lowTemp: string;
  lowMonthYear: string;
  changeFromAvg: string;
  keyInsight: string;
}

export const MOCK_PREDICTION_SUMMARY: PredictionSummary = {
  peakTemp: '32.1 °C',
  peakMonthYear: 'Jul 2026',
  lowTemp: '24.8 °C',
  lowMonthYear: 'Jan 2026',
  changeFromAvg: '+1.6 °C',
  keyInsight: 'Temperatures are expected to be 1.6°C higher than the historical average, with peak temperatures in July 2026.',
};

export interface ScenarioPoint {
  year: string;
  historical: number;
  ssp126: number;
  ssp245: number;
  ssp585: number;
}

export const MOCK_SCENARIO_COMPARISON: ScenarioPoint[] = [
  { year: '2024', historical: 24.5, ssp126: 24.8, ssp245: 25.0, ssp585: 25.2 },
  { year: '2026', historical: 24.8, ssp126: 25.4, ssp245: 26.5, ssp585: 27.8 },
  { year: '2028', historical: 25.0, ssp126: 25.9, ssp245: 28.2, ssp585: 30.6 },
  { year: '2030', historical: 25.2, ssp126: 26.4, ssp245: 29.8, ssp585: 33.5 },
  { year: '2032', historical: 25.4, ssp126: 26.8, ssp245: 31.2, ssp585: 36.2 },
  { year: '2034', historical: 25.6, ssp126: 27.2, ssp245: 32.8, ssp585: 39.5 },
];

export interface ModelMetric {
  id: string;
  label: string;
  value: string;
  iconName: string;
}

export const MOCK_MODEL_PERFORMANCE: ModelMetric[] = [
  { id: 'r2', label: 'R² Score', value: '0.92', iconName: 'Box' },
  { id: 'rmse', label: 'RMSE', value: '1.8 °C', iconName: 'Activity' },
  { id: 'mae', label: 'MAE', value: '2.4 °C', iconName: 'Layers' },
  { id: 'acc', label: 'Accuracy', value: '96.1%', iconName: 'ShieldCheck' },
];

export interface FeatureImportancePoint {
  feature: string;
  importance: number;
}

export const MOCK_FEATURE_IMPORTANCE: FeatureImportancePoint[] = [
  { feature: 'Historical Temperature', importance: 0.34 },
  { feature: 'Humidity', importance: 0.22 },
  { feature: 'CO₂ Concentration', importance: 0.18 },
  { feature: 'Sea Surface Temperature', importance: 0.12 },
  { feature: 'Wind Speed', importance: 0.08 },
  { feature: 'Pressure', importance: 0.06 },
];
