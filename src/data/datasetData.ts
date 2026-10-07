export interface ClimateDataset {
  id: string;
  name: string;
  source: string;
  dateRange: string;
  format: string;
  totalRecords: string;
  totalColumns: number;
  coverage: string;
  frequency: string;
  dataType: string;
  status: 'Loaded' | 'Available' | 'Processing';
  thumbnailUrl: string;
  description: string;
  fileSize: string;
}

export interface ClimateVariable {
  name: string;
  type: 'DateTime' | 'Numeric' | 'Categorical';
  unit?: string;
  min?: number | string;
  max?: number | string;
  mean?: number;
  nullCount: number;
  description: string;
  iconName: string;
}

export interface DatasetRow {
  id: number;
  date: string;
  region: string;
  temperature: number;
  rainfall: number;
  co2: number;
  humidity: number;
  pressure: number;
  climate_forcing: number;
}

export const AVAILABLE_DATASETS: ClimateDataset[] = [
  {
    id: 'nasa-global',
    name: 'NASA Global Climate Data',
    source: 'NASA EarthData',
    dateRange: '1980-01-01 → 2023-12-31',
    format: 'CSV',
    totalRecords: '52,340',
    totalColumns: 8,
    coverage: 'Global',
    frequency: 'Monthly',
    dataType: 'Climate & Environmental',
    status: 'Loaded',
    thumbnailUrl: '/assets/nasa_earth.jpg',
    description: 'High-resolution surface temperature, precipitation, atmospheric CO2, and climate forcing indices gathered from NASA satellite constellations.',
    fileSize: '14.8 MB',
  },
  {
    id: 'cmip6-models',
    name: 'CMIP6 Multi-Model Climate Projection',
    source: 'WCRP / CMIP6',
    dateRange: '2020-01-01 → 2100-12-31',
    format: 'NetCDF4',
    totalRecords: '128,900',
    totalColumns: 14,
    coverage: 'Global Grid (1°x1°)',
    frequency: 'Daily / Monthly',
    dataType: 'Model Forecast',
    status: 'Available',
    thumbnailUrl: '/assets/nasa_earth.jpg',
    description: 'Coupled Model Intercomparison Project Phase 6 global future climate projections across SSP1-2.6 to SSP5-8.5 radiative forcing scenarios.',
    fileSize: '84.2 MB',
  },
  {
    id: 'sentinel-co2',
    name: 'Sentinel-5P Atmospheric Carbon Monitoring',
    source: 'ESA Copernicus Open Hub',
    dateRange: '2018-05-01 → 2024-09-30',
    format: 'GeoJSON',
    totalRecords: '312,450',
    totalColumns: 10,
    coverage: 'Regional Hotspots',
    frequency: 'Bi-weekly',
    dataType: 'Satellite Remote Sensing',
    status: 'Available',
    thumbnailUrl: '/assets/nasa_earth.jpg',
    description: 'TROPOMI instrument tropospheric methane, carbon monoxide, and carbon dioxide atmospheric column observations.',
    fileSize: '42.1 MB',
  },
  {
    id: 'era5-reanalysis',
    name: 'ERA5 Global Reanalysis Surface Data',
    source: 'ECMWF Climate Data Store',
    dateRange: '1950-01-01 → 2024-08-31',
    format: 'CSV / Zarr',
    totalRecords: '890,200',
    totalColumns: 18,
    coverage: 'Global Land & Sea',
    frequency: 'Hourly Aggregate',
    dataType: 'Reanalysis Observation',
    status: 'Available',
    thumbnailUrl: '/assets/nasa_earth.jpg',
    description: 'Comprehensive 5th generation ECMWF global atmospheric reanalysis combining model data with observations worldwide.',
    fileSize: '210.5 MB',
  },
];

export const DATASET_VARIABLES: ClimateVariable[] = [
  {
    name: 'date',
    type: 'DateTime',
    nullCount: 0,
    description: 'Observation timestamp formatted as YYYY-MM-DD.',
    iconName: 'Calendar',
  },
  {
    name: 'temperature',
    type: 'Numeric',
    unit: '°C',
    min: 14.2,
    max: 38.6,
    mean: 28.3,
    nullCount: 0,
    description: 'Mean global surface ambient air temperature at 2 meters.',
    iconName: 'Thermometer',
  },
  {
    name: 'rainfall',
    type: 'Numeric',
    unit: 'mm',
    min: 0.0,
    max: 184.2,
    mean: 14.6,
    nullCount: 2,
    description: 'Total cumulative monthly precipitation volume.',
    iconName: 'Droplets',
  },
  {
    name: 'co2',
    type: 'Numeric',
    unit: 'ppm',
    min: 338.7,
    max: 422.4,
    mean: 381.5,
    nullCount: 0,
    description: 'Atmospheric carbon dioxide concentration measured at surface background monitoring sites.',
    iconName: 'Leaf',
  },
  {
    name: 'humidity',
    type: 'Numeric',
    unit: '%',
    min: 42.0,
    max: 98.0,
    mean: 76.4,
    nullCount: 1,
    description: 'Relative humidity level at standard atmospheric pressure.',
    iconName: 'Wind',
  },
  {
    name: 'pressure',
    type: 'Numeric',
    unit: 'hPa',
    min: 998.1,
    max: 1024.5,
    mean: 1012.3,
    nullCount: 0,
    description: 'Mean sea level barometric pressure.',
    iconName: 'Gauge',
  },
  {
    name: 'climate_forcing',
    type: 'Numeric',
    unit: 'W/m²',
    min: 1.12,
    max: 2.84,
    mean: 2.05,
    nullCount: 0,
    description: 'Net effective anthropogenic radiative forcing index.',
    iconName: 'Activity',
  },
  {
    name: 'region',
    type: 'Categorical',
    min: 'Africa',
    max: 'South America',
    nullCount: 0,
    description: 'Geographic climate observation regional classification sector.',
    iconName: 'MapPin',
  },
];

export const SAMPLE_DATASET_ROWS: DatasetRow[] = [
  { id: 1, date: '1980-01-01', region: 'Global', temperature: 28.4, rainfall: 12.5, co2: 338.7, humidity: 78, pressure: 1013.2, climate_forcing: 1.15 },
  { id: 2, date: '1980-01-02', region: 'Global', temperature: 28.1, rainfall: 0.0, co2: 338.9, humidity: 82, pressure: 1014.0, climate_forcing: 1.15 },
  { id: 3, date: '1980-01-03', region: 'Global', temperature: 27.9, rainfall: 5.2, co2: 339.1, humidity: 80, pressure: 1012.8, climate_forcing: 1.16 },
  { id: 4, date: '1980-01-04', region: 'Global', temperature: 28.6, rainfall: 0.0, co2: 339.3, humidity: 77, pressure: 1013.5, climate_forcing: 1.16 },
  { id: 5, date: '1980-01-05', region: 'Global', temperature: 29.1, rainfall: 18.4, co2: 339.6, humidity: 75, pressure: 1011.9, climate_forcing: 1.17 },
  { id: 6, date: '1980-01-06', region: 'Global', temperature: 28.8, rainfall: 8.1, co2: 339.8, humidity: 79, pressure: 1012.5, climate_forcing: 1.17 },
  { id: 7, date: '1980-01-07', region: 'Global', temperature: 29.3, rainfall: 22.0, co2: 340.1, humidity: 84, pressure: 1010.8, climate_forcing: 1.18 },
  { id: 8, date: '1980-01-08', region: 'Global', temperature: 28.5, rainfall: 4.0, co2: 340.2, humidity: 76, pressure: 1013.0, climate_forcing: 1.18 },
  { id: 9, date: '1980-01-09', region: 'Global', temperature: 27.8, rainfall: 0.0, co2: 340.4, humidity: 73, pressure: 1015.1, climate_forcing: 1.19 },
  { id: 10, date: '1980-01-10', region: 'Global', temperature: 28.2, rainfall: 1.5, co2: 340.5, humidity: 75, pressure: 1014.2, climate_forcing: 1.19 },
  { id: 11, date: '1980-01-11', region: 'Global', temperature: 28.9, rainfall: 14.8, co2: 340.7, humidity: 81, pressure: 1012.0, climate_forcing: 1.20 },
  { id: 12, date: '1980-01-12', region: 'Global', temperature: 29.4, rainfall: 31.0, co2: 341.0, humidity: 86, pressure: 1009.6, climate_forcing: 1.20 },
  { id: 13, date: '1980-01-13', region: 'Global', temperature: 28.0, rainfall: 3.2, co2: 341.1, humidity: 74, pressure: 1013.8, climate_forcing: 1.21 },
  { id: 14, date: '1980-01-14', region: 'Global', temperature: 27.6, rainfall: 0.0, co2: 341.3, humidity: 70, pressure: 1016.0, climate_forcing: 1.21 },
  { id: 15, date: '1980-01-15', region: 'Global', temperature: 28.7, rainfall: 9.6, co2: 341.5, humidity: 78, pressure: 1012.9, climate_forcing: 1.22 },
];
