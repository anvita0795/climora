export interface KPIItem {
  id: string;
  title: string;
  value: string;
  subtext: string;
  iconName: 'box' | 'database' | 'activity' | 'cpu';
  accentColor: string;
}

export interface ModelPerformanceData {
  model: string;
  accuracy: number;
  precision: number;
  recall: number;
}

export interface TrainingJob {
  id: string;
  model: string;
  dataset: string;
  status: 'Completed' | 'Training' | 'Queued' | 'Failed' | 'Paused';
  progress: number;
  started: string;
}

export interface SystemResource {
  id: string;
  name: string;
  usage: number;
  color: string;
  sparklineData: { val: number }[];
}

export interface DatasetItem {
  id: string;
  name: string;
  type: string;
  size: string;
  timeRange: string;
  records?: string;
  lastUpdated?: string;
  status: 'Available' | 'Processing' | 'Archived';
}

export interface SystemActivity {
  id: string;
  time: string;
  event: string;
  status: 'Success' | 'Info' | 'Warning' | 'Error';
}

export interface SystemHealthItem {
  id: string;
  component: string;
  status: 'Healthy' | 'Warning' | 'Critical';
  latency: string;
  uptime: string;
  lastChecked: string;
}

export interface SystemSetting {
  id: string;
  name: string;
  description: string;
  value: string | boolean;
  type: 'select' | 'toggle' | 'input';
  options?: string[];
}

// ----------------------------------------------------
// MOCK DATASETS
// ----------------------------------------------------



export const MOCK_KPIS: KPIItem[] = [
  {
    id: 'kpi-1',
    title: 'Active Models',
    value: '4',
    subtext: '3 trained · 1 running',
    iconName: 'box',
    accentColor: '#16E0D0',
  },
  {
    id: 'kpi-2',
    title: 'Total Datasets',
    value: '6',
    subtext: '2.8 TB processed',
    iconName: 'database',
    accentColor: '#35D6F5',
  },
  {
    id: 'kpi-3',
    title: 'System Uptime',
    value: '99.8%',
    subtext: '↑ +0.2% this month',
    iconName: 'activity',
    accentColor: '#22D3A3',
  },
  {
    id: 'kpi-4',
    title: 'Total Predictions',
    value: '1.2M',
    subtext: '+18% this month',
    iconName: 'cpu',
    accentColor: '#16E0D0',
  },
];

export const MOCK_MODEL_PERFORMANCE: Record<string, ModelPerformanceData[]> = {
  'Temperature Prediction': [
    { model: 'XGBoost (Ensemble)', accuracy: 91, precision: 86, recall: 89 },
    { model: 'LightGBM', accuracy: 75, precision: 72, recall: 76 },
    { model: 'LSTM', accuracy: 66, precision: 71, recall: 73 },
    { model: 'Random Forest', accuracy: 61, precision: 65, recall: 69 },
  ],
  'Rainfall Prediction': [
    { model: 'XGBoost (Ensemble)', accuracy: 88, precision: 84, recall: 85 },
    { model: 'LightGBM', accuracy: 82, precision: 79, recall: 80 },
    { model: 'LSTM', accuracy: 79, precision: 76, recall: 81 },
    { model: 'Random Forest', accuracy: 68, precision: 70, recall: 72 },
  ],
  'CO₂ Prediction': [
    { model: 'XGBoost (Ensemble)', accuracy: 94, precision: 92, recall: 93 },
    { model: 'LightGBM', accuracy: 89, precision: 88, recall: 87 },
    { model: 'LSTM', accuracy: 85, precision: 83, recall: 86 },
    { model: 'Random Forest', accuracy: 77, precision: 75, recall: 78 },
  ],
  'Humidity Prediction': [
    { model: 'XGBoost (Ensemble)', accuracy: 89, precision: 87, recall: 88 },
    { model: 'LightGBM', accuracy: 81, precision: 78, recall: 80 },
    { model: 'LSTM', accuracy: 72, precision: 74, recall: 75 },
    { model: 'Random Forest', accuracy: 65, precision: 67, recall: 68 },
  ],
  'Pressure Prediction': [
    { model: 'XGBoost (Ensemble)', accuracy: 92, precision: 90, recall: 91 },
    { model: 'LightGBM', accuracy: 84, precision: 82, recall: 85 },
    { model: 'LSTM', accuracy: 78, precision: 75, recall: 79 },
    { model: 'Random Forest', accuracy: 70, precision: 68, recall: 71 },
  ],
};

export const MOCK_TRAINING_JOBS: TrainingJob[] = [
  {
    id: 'job-1',
    model: 'XGBoost (Ensemble)',
    dataset: 'Climate Historical',
    status: 'Completed',
    progress: 100,
    started: 'Oct 02, 2026',
  },
  {
    id: 'job-2',
    model: 'LSTM',
    dataset: 'Time Series (1980–2023)',
    status: 'Training',
    progress: 68,
    started: 'Oct 02, 2026',
  },
  {
    id: 'job-3',
    model: 'LightGBM',
    dataset: 'Multi-Variable',
    status: 'Queued',
    progress: 0,
    started: 'Oct 02, 2026',
  },
  {
    id: 'job-4',
    model: 'Random Forest',
    dataset: 'Environmental',
    status: 'Completed',
    progress: 100,
    started: 'Oct 01, 2026',
  },
];

export const MOCK_SYSTEM_RESOURCES: SystemResource[] = [
  {
    id: 'res-cpu',
    name: 'CPU',
    usage: 32,
    color: '#16E0D0',
    sparklineData: [{ val: 20 }, { val: 25 }, { val: 22 }, { val: 35 }, { val: 28 }, { val: 32 }, { val: 30 }],
  },
  {
    id: 'res-gpu',
    name: 'GPU',
    usage: 68,
    color: '#A855F7',
    sparklineData: [{ val: 50 }, { val: 65 }, { val: 72 }, { val: 60 }, { val: 75 }, { val: 64 }, { val: 68 }],
  },
  {
    id: 'res-memory',
    name: 'Memory',
    usage: 54,
    color: '#35D6F5',
    sparklineData: [{ val: 40 }, { val: 48 }, { val: 52 }, { val: 50 }, { val: 56 }, { val: 53 }, { val: 54 }],
  },
  {
    id: 'res-storage',
    name: 'Storage',
    usage: 41,
    color: '#22D3A3',
    sparklineData: [{ val: 38 }, { val: 39 }, { val: 40 }, { val: 40 }, { val: 41 }, { val: 41 }, { val: 41 }],
  },
];

export const MOCK_DATASETS: DatasetItem[] = [
  {
    id: 'ds-1',
    name: 'Climate Historical',
    type: 'Multi-Variable',
    size: '1.2 TB',
    timeRange: '1980–2023',
    records: '142,500,000',
    lastUpdated: '2 hours ago',
    status: 'Available',
  },
  {
    id: 'ds-2',
    name: 'Satellite Data',
    type: 'Remote Sensing',
    size: '850 GB',
    timeRange: '2000–2024',
    records: '89,200,000',
    lastUpdated: '1 day ago',
    status: 'Available',
  },
  {
    id: 'ds-3',
    name: 'Reanalysis Data',
    type: 'Atmospheric',
    size: '420 GB',
    timeRange: '1990–2023',
    records: '45,100,000',
    lastUpdated: '3 days ago',
    status: 'Available',
  },
  {
    id: 'ds-4',
    name: 'Ocean Data',
    type: 'Oceanographic',
    size: '280 GB',
    timeRange: '1985–2023',
    records: '31,800,000',
    lastUpdated: '5 days ago',
    status: 'Available',
  },
];

export const MOCK_SYSTEM_ACTIVITIES: SystemActivity[] = [
  {
    id: 'act-1',
    time: '14:32',
    event: 'XGBoost training completed',
    status: 'Success',
  },
  {
    id: 'act-2',
    time: '14:28',
    event: 'Dataset preprocessing started',
    status: 'Info',
  },
  {
    id: 'act-3',
    time: '14:15',
    event: 'New climate data ingested (50 GB)',
    status: 'Success',
  },
  {
    id: 'act-4',
    time: '13:40',
    event: 'System backup completed',
    status: 'Success',
  },
  {
    id: 'act-5',
    time: '12:22',
    event: 'Model deployment initiated',
    status: 'Info',
  },
];

export const MOCK_SYSTEM_HEALTH: SystemHealthItem[] = [
  {
    id: 'sh-1',
    component: 'API Gateway',
    status: 'Healthy',
    latency: '12 ms',
    uptime: '99.99%',
    lastChecked: 'Just now',
  },
  {
    id: 'sh-2',
    component: 'Primary Database (PostgreSQL / Timescale)',
    status: 'Healthy',
    latency: '4 ms',
    uptime: '99.95%',
    lastChecked: '1 min ago',
  },
  {
    id: 'sh-3',
    component: 'Model Inference Microservices',
    status: 'Healthy',
    latency: '45 ms',
    uptime: '99.80%',
    lastChecked: 'Just now',
  },
  {
    id: 'sh-4',
    component: 'Data Ingestion Pipeline (Kafka / MQTT)',
    status: 'Healthy',
    latency: '8 ms',
    uptime: '99.90%',
    lastChecked: '2 mins ago',
  },
  {
    id: 'sh-5',
    component: 'Object Storage (AWS S3 Parquet)',
    status: 'Healthy',
    latency: '24 ms',
    uptime: '100.0%',
    lastChecked: '5 mins ago',
  },
];

export const MOCK_PIPELINE_STAGES = [
  { stage: 'Data Validation', status: 'Completed', duration: '12m 40s', progress: 100 },
  { stage: 'Preprocessing', status: 'Completed', duration: '45m 10s', progress: 100 },
  { stage: 'Feature Engineering', status: 'Completed', duration: '1h 15m', progress: 100 },
  { stage: 'Training (LSTM)', status: 'In Progress', duration: '3h 22m', progress: 68 },
  { stage: 'Evaluation', status: 'Pending', duration: '--', progress: 0 },
  { stage: 'Deployment', status: 'Pending', duration: '--', progress: 0 },
];
