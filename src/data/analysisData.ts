export interface DatasetContextInfo {
  location: string;
  datasetName: string;
  period: string;
  frequency: string;
  columnsCount: number;
}

export const MOCK_DATASET_CONTEXT: DatasetContextInfo = {
  location: 'Chennai, India',
  datasetName: 'NASA Global Climate Data',
  period: '1980–2023',
  frequency: 'Monthly',
  columnsCount: 8,
};

export interface TemperatureTrendPoint {
  year: string;
  showTick: boolean;
  temp: number;
  lowTemp: number;
  highTemp: number;
}

// Generate realistic trend data from 1980 to 2023 with monthly sinusoids and global warming slope
export const MOCK_TEMPERATURE_TREND: TemperatureTrendPoint[] = (() => {
  const points: TemperatureTrendPoint[] = [];
  const startYear = 1980;
  const endYear = 2023;
  
  for (let y = startYear; y <= endYear; y++) {
    // 4 sample points per year for smooth sine wave (Winter, Spring, Summer, Autumn)
    const seasons = [
      { month: 1, offset: -4.5 },
      { month: 5, offset: 4.8 },
      { month: 8, offset: 1.2 },
      { month: 11, offset: -3.0 }
    ];

    const warmingSlope = ((y - 1980) / 43) * 2.4; // +2.4°C over 43 years

    seasons.forEach((s) => {
      // Natural noise fluctuation
      const noise = (Math.sin(y * 1.7 + s.month * 0.8) * 0.8);
      const temp = Number((26.5 + s.offset + warmingSlope + noise).toFixed(1));
      
      points.push({
        year: y.toString(),
        showTick: s.month === 1 && y % 5 === 0 || y === 1980 || y === 2023,
        temp: Math.min(36, Math.max(20, temp)),
        lowTemp: Number((temp - 3.2).toFixed(1)),
        highTemp: Number((temp + 3.2).toFixed(1))
      });
    });
  }
  return points;
})();

export interface SeasonalPoint {
  month: string;
  temp: number;
}

export const MOCK_SEASONAL_PATTERN: SeasonalPoint[] = [
  { month: 'Jan', temp: 24.2 },
  { month: 'Feb', temp: 26.8 },
  { month: 'Mar', temp: 29.5 },
  { month: 'Apr', temp: 32.4 },
  { month: 'May', temp: 33.8 },
  { month: 'Jun', temp: 31.0 },
  { month: 'Jul', temp: 29.8 },
  { month: 'Aug', temp: 29.2 },
  { month: 'Sep', temp: 28.8 },
  { month: 'Oct', temp: 27.5 },
  { month: 'Nov', temp: 25.8 },
  { month: 'Dec', temp: 24.5 },
];

export interface VariableComparisonPoint {
  month: string;
  temp: number;
  rainfall: number;
  co2Scaled: number;
}

export const MOCK_VARIABLE_COMPARISON: VariableComparisonPoint[] = [
  { month: 'Jan', temp: 24.2, rainfall: 25, co2Scaled: 230 },
  { month: 'Feb', temp: 26.8, rainfall: 18, co2Scaled: 235 },
  { month: 'Mar', temp: 29.5, rainfall: 15, co2Scaled: 242 },
  { month: 'Apr', temp: 32.4, rainfall: 22, co2Scaled: 255 },
  { month: 'May', temp: 33.8, rainfall: 45, co2Scaled: 270 },
  { month: 'Jun', temp: 31.0, rainfall: 120, co2Scaled: 295 },
  { month: 'Jul', temp: 29.8, rainfall: 280, co2Scaled: 330 },
  { month: 'Aug', temp: 29.2, rainfall: 350, co2Scaled: 310 },
  { month: 'Sep', temp: 28.8, rainfall: 320, co2Scaled: 285 },
  { month: 'Oct', temp: 27.5, rainfall: 240, co2Scaled: 260 },
  { month: 'Nov', temp: 25.8, rainfall: 140, co2Scaled: 248 },
  { month: 'Dec', temp: 24.5, rainfall: 65, co2Scaled: 238 },
];

export interface DistributionPoint {
  tempBin: string;
  frequency: number;
}

export const MOCK_VARIABLE_DISTRIBUTION: DistributionPoint[] = [
  { tempBin: '20', frequency: 35 },
  { tempBin: '22', frequency: 110 },
  { tempBin: '24', frequency: 340 },
  { tempBin: '26', frequency: 540 },
  { tempBin: '28', frequency: 650 },
  { tempBin: '30', frequency: 680 },
  { tempBin: '32', frequency: 590 },
  { tempBin: '34', frequency: 380 },
  { tempBin: '36', frequency: 180 },
  { tempBin: '38', frequency: 65 },
  { tempBin: '40', frequency: 15 },
];

export interface CorrelationVariable {
  id: string;
  name: string;
}

export const CORRELATION_VARIABLES: CorrelationVariable[] = [
  { id: 'temperature', name: 'temperature' },
  { id: 'rainfall', name: 'rainfall' },
  { id: 'co2', name: 'co2' },
  { id: 'humidity', name: 'humidity' },
  { id: 'pressure', name: 'pressure' },
  { id: 'climate_forcing', name: 'climate_forcing' },
];

export const MOCK_CORRELATION_MATRIX: number[][] = [
  [ 1.00, -0.42,  0.84, -0.65, -0.72,  0.78],
  [-0.42,  1.00, -0.28,  0.88, -0.55, -0.31],
  [ 0.84, -0.28,  1.00, -0.45, -0.68,  0.92],
  [-0.65,  0.88, -0.45,  1.00,  0.42, -0.51],
  [-0.72, -0.55, -0.68,  0.42,  1.00, -0.74],
  [ 0.78, -0.31,  0.92, -0.51, -0.74,  1.00],
];
