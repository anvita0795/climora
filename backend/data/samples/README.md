# CLIMORA AI Sample Climate Dataset Provenance

## Dataset Overview
- **File**: `chennai_monthly_1980_2023.csv`
- **Location / Region**: Chennai, India (Lat: 13.0827° N, Lon: 80.2707° E)
- **Time Horizon**: Jan 1980 - Dec 2022 (43 Years, 516 Monthly Observations)
- **Variables**: `date`, `temperature` (°C), `rainfall` (mm), `co2` (ppm), `humidity` (%), `pressure` (hPa), `climate_forcing` (W/m²), `region`
- **Snapshot Date**: 2026-10-07
- **Provenance Source**: `sample_csv` (Committed benchmark sample derived from ERA5/GISTEMP regional dynamics)
- **Sha / ID**: `demo-sample`

## Usage in Platform
This committed sample is used by:
1. **Analysis Service**: Real Pearson & Spearman correlation calculations, real rolling STL seasonal trend decomposition.
2. **Prediction Engine**: Provides historical baselines and starting values for ML XGBoost / Ensemble forecasting.
3. **SHAP Explainability**: Calibrated against feature ranges in this 43-year historical record.
