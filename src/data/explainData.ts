export interface ModelContext {
  model: string;
  location: string;
  variable: string;
  timeRange: string;
}

export const MOCK_MODEL_CONTEXT: ModelContext = {
  model: 'XGBoost (Ensemble)',
  location: 'Chennai, India',
  variable: 'Temperature',
  timeRange: 'Next 12 Months',
};

export interface FeatureImportanceItem {
  id: string;
  feature: string;
  importance: number;
}

export const MOCK_FEATURE_IMPORTANCE: FeatureImportanceItem[] = [
  { id: 'f1', feature: 'Historical Temperature', importance: 0.34 },
  { id: 'f2', feature: 'Humidity', importance: 0.22 },
  { id: 'f3', feature: 'CO₂ Concentration', importance: 0.18 },
  { id: 'f4', feature: 'Sea Surface Temperature', importance: 0.12 },
  { id: 'f5', feature: 'Wind Speed', importance: 0.08 },
  { id: 'f6', feature: 'Pressure', importance: 0.06 },
  { id: 'f7', feature: 'Solar Radiation', importance: 0.04 },
  { id: 'f8', feature: 'Rainfall', importance: 0.03 },
  { id: 'f9', feature: 'Cloud Cover', importance: 0.02 },
  { id: 'f10', feature: 'Land Use', importance: 0.01 },
];

export interface ShapPoint {
  id: string;
  feature: string;
  featureIndex: number;
  shapValue: number; // -2 to +2
  featureValue: number; // 0 (Low - cyan) to 1 (High - red)
  yJitter: number;
}

// Generate realistic beeswarm distribution points for SHAP plot
const FEATURES_LIST = [
  'Historical Temperature',
  'Humidity',
  'CO₂ Concentration',
  'Sea Surface Temperature',
  'Wind Speed',
  'Pressure',
  'Solar Radiation',
  'Rainfall',
  'Cloud Cover',
  'Land Use',
];

export const MOCK_SHAP_POINTS: ShapPoint[] = [];

FEATURES_LIST.forEach((feat, featIdx) => {
  // Generate 25 points per feature forming a natural bell/density shape
  const count = 25 - featIdx * 1.5;
  for (let i = 0; i < count; i++) {
    const norm = (i / count) * 2 - 1; // -1 to 1
    const spread = (11 - featIdx) * 0.16;
    const shapValue = norm * spread + (Math.random() - 0.5) * 0.25;
    const featureValue = Math.min(1, Math.max(0, (shapValue + 1.8) / 3.6));
    const yJitter = (Math.random() - 0.5) * 0.35;

    MOCK_SHAP_POINTS.push({
      id: `shap-${featIdx}-${i}`,
      feature: feat,
      featureIndex: featIdx,
      shapValue: parseFloat(shapValue.toFixed(2)),
      featureValue: parseFloat(featureValue.toFixed(2)),
      yJitter: parseFloat(yJitter.toFixed(2)),
    });
  }
});

export interface WaterfallStep {
  id: string;
  label: string;
  contribution: number;
  formattedVal: string;
  type: 'base' | 'positive' | 'negative' | 'final';
  startVal: number;
  endVal: number;
}

export const MOCK_WATERFALL_STEPS: WaterfallStep[] = [
  {
    id: 'w1',
    label: 'Base Value',
    contribution: 26.4,
    formattedVal: '26.4°C',
    type: 'base',
    startVal: 0,
    endVal: 26.4,
  },
  {
    id: 'w2',
    label: 'Historical Temp',
    contribution: 2.1,
    formattedVal: '+2.1°C',
    type: 'positive',
    startVal: 26.4,
    endVal: 28.5,
  },
  {
    id: 'w3',
    label: 'CO₂ Level',
    contribution: 1.4,
    formattedVal: '+1.4°C',
    type: 'positive',
    startVal: 28.5,
    endVal: 29.9,
  },
  {
    id: 'w4',
    label: 'Urban Heat',
    contribution: 0.8,
    formattedVal: '+0.8°C',
    type: 'positive',
    startVal: 29.9,
    endVal: 30.7,
  },
  {
    id: 'w5',
    label: 'Humidity',
    contribution: 0.6,
    formattedVal: '+0.6°C',
    type: 'positive',
    startVal: 30.7,
    endVal: 31.3,
  },
  {
    id: 'w6',
    label: 'Cloud Cover',
    contribution: -0.5,
    formattedVal: '-0.5°C',
    type: 'negative',
    startVal: 31.3,
    endVal: 30.8,
  },
  {
    id: 'w7',
    label: 'Wind Speed',
    contribution: -0.4,
    formattedVal: '-0.4°C',
    type: 'negative',
    startVal: 30.8,
    endVal: 30.4,
  },
  {
    id: 'w8',
    label: 'Final Prediction',
    contribution: 31.8,
    formattedVal: '31.8°C',
    type: 'final',
    startVal: 0,
    endVal: 31.8,
  },
];

export interface RelationshipPoint {
  id: string;
  humidity: number; // 0 - 100%
  predictedTemp: number; // 20 - 40 °C
  trendTemp: number;
}

export const MOCK_RELATIONSHIP_POINTS: RelationshipPoint[] = Array.from({ length: 45 }).map((_, idx) => {
  const humidity = Math.floor(10 + (idx / 45) * 85);
  const baseTrend = 23 + (humidity / 100) * 12;
  const noise = (Math.sin(idx * 1.5) + (Math.random() - 0.5)) * 2.2;
  return {
    id: `rel-${idx}`,
    humidity,
    predictedTemp: parseFloat((baseTrend + noise).toFixed(1)),
    trendTemp: parseFloat(baseTrend.toFixed(1)),
  };
});

export interface ScenarioImpactItem {
  scenario: string;
  histTemp: number;
  co2Level: number;
  humidity: number;
  urbanHeat: number;
}

export const MOCK_SCENARIO_COMPARISON: ScenarioImpactItem[] = [
  { scenario: 'Historical (1980–2023)', histTemp: 1.5, co2Level: 0.8, humidity: 0.6, urbanHeat: 0.4 },
  { scenario: 'SSP1-2.6 (Low Emissions)', histTemp: 2.1, co2Level: 1.2, humidity: 0.8, urbanHeat: 0.6 },
  { scenario: 'SSP2-4.5 (Medium)', histTemp: 2.8, co2Level: 1.9, humidity: 1.1, urbanHeat: 0.9 },
  { scenario: 'SSP5-8.5 (High Emissions)', histTemp: 3.9, co2Level: 2.8, humidity: 1.5, urbanHeat: 1.2 },
];
