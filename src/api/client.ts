/**
 * CLIMORA AI Centralized API Client
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody?.detail || `API request failed with status ${response.status}`);
  }

  return response.json();
}

// ----------------------------------------------------
// API Methods for 7 Workspaces
// ----------------------------------------------------

export const ClimoraApi = {
  // Health
  checkHealth: () => fetchApi<{ status: string }>('/health'),

  // 1. Overview Dashboard Summary
  getDashboardSummary: () => fetchApi<any>('/dashboard/summary'),

  // 2. Data Explorer Datasets
  getDatasets: (search?: string, variable?: string) => {
    const query = new URLSearchParams();
    if (search) query.append('search', search);
    if (variable) query.append('variable', variable);
    return fetchApi<any[]>(`/datasets?${query.toString()}`);
  },
  getDatasetPreview: (id: string, limit = 10) => fetchApi<any>(`/datasets/${id}/preview?limit=${limit}`),

  // 3. Climate Analysis
  getCorrelationMatrix: (method = 'Pearson') => fetchApi<any>(`/analysis/correlation?method=${method}`),
  getDecomposition: (location: string, variable: string) =>
    fetchApi<any>(`/analysis/decomposition?location=${encodeURIComponent(location)}&variable=${encodeURIComponent(variable)}`),

  // 4. Climate Prediction
  runInference: (body: any) =>
    fetchApi<any>('/predictions/inference', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  // 5. Risk & Anomalies
  getAnomalies: () => fetchApi<{ anomalies: any[] }>('/risk/anomalies'),
  getGeoJSONHotspots: () => fetchApi<any>('/risk/hotspots/geojson'),

  // 6. Explainability (SHAP)
  getShapValues: (predictionId = 'pred-latest') =>
    fetchApi<any>(`/explain/shap-values?prediction_id=${predictionId}`, {
      method: 'POST',
    }),

  // 7. Model & System Operations
  getModels: () => fetchApi<any[]>('/models'),
  getTrainingJobs: () => fetchApi<any[]>('/models/training'),
  triggerTraining: (modelType: string, datasetName: string) =>
    fetchApi<any>('/models/train', {
      method: 'POST',
      body: JSON.stringify({ model_type: modelType, dataset_name: datasetName }),
    }),
  getTelemetry: () => fetchApi<any>('/system/telemetry'),
  getSystemActivities: () => fetchApi<any[]>('/system/activity'),
  getSystemHealth: () => fetchApi<any[]>('/system/health'),
};
