import os
import pandas as pd
import numpy as np
from typing import Dict, Any

class AnalysisService:
    @staticmethod
    def _get_sample_df() -> pd.DataFrame:
        csv_path = os.path.join(
            os.path.dirname(__file__), "..", "..", "data", "samples", "chennai_monthly_1980_2023.csv"
        )
        if os.path.exists(csv_path):
            return pd.read_csv(csv_path)
        return pd.DataFrame()

    @staticmethod
    def get_correlation_matrix(method: str = "Pearson") -> Dict[str, Any]:
        df = AnalysisService._get_sample_df()
        
        display_names = {
            "temperature": "Temperature",
            "rainfall": "Rainfall",
            "co2": "CO₂",
            "humidity": "Humidity",
            "pressure": "Pressure",
            "climate_forcing": "Climate Forcing"
        }
        
        cols = ["temperature", "rainfall", "co2", "humidity", "pressure", "climate_forcing"]
        
        if not df.empty and all(c in df.columns for c in cols):
            corr_df = df[cols].corr(method=method.lower())
            variables = [display_names[c] for c in cols]
            matrix = np.round(corr_df.values, 2).tolist()
            sample_count = len(df)
            source_info = "sample_csv"
        else:
            # FALLBACK
            variables = ["Temperature", "Rainfall", "CO₂", "Humidity", "Pressure", "Climate Forcing"]
            matrix = [
              [ 1.00, -0.42,  0.78, -0.65, -0.38,  0.82 ],
              [-0.42,  1.00, -0.25,  0.84, -0.52, -0.31 ],
              [ 0.78, -0.25,  1.00, -0.45, -0.22,  0.94 ],
              [-0.65,  0.84, -0.45,  1.00, -0.40, -0.50 ],
              [-0.38, -0.52, -0.22, -0.40,  1.00, -0.28 ],
              [ 0.82, -0.31,  0.94, -0.50, -0.28,  1.00 ]
            ]
            sample_count = 516
            source_info = "fallback_literal"

        return {
            "variables": variables,
            "matrix": matrix,
            "method": method,
            "sample_count": sample_count,
            "provenance": {
                "source": source_info,
                "snapshot": "2026-10-07",
                "sha": "demo-sample"
            }
        }

    @staticmethod
    def get_stl_decomposition(location: str, variable: str) -> Dict[str, Any]:
        df = AnalysisService._get_sample_df()
        var_key = variable.lower().replace("co2", "co2").replace("co₂", "co2")
        if var_key not in ["temperature", "rainfall", "co2", "humidity", "pressure", "climate_forcing"]:
            var_key = "temperature"
            
        timestamps = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        
        if not df.empty and var_key in df.columns:
            # STL decomposition over 12 months (latest cycle or average monthly profile)
            df['date'] = pd.to_datetime(df['date'])
            df['month'] = df['date'].dt.month
            
            # Compute rolling trend (window 12) and monthly seasonality
            df['trend'] = df[var_key].rolling(window=12, center=True, min_periods=1).mean()
            monthly_means = df.groupby('month')[var_key].transform('mean')
            overall_mean = df[var_key].mean()
            df['seasonal'] = monthly_means - overall_mean
            df['residual'] = df[var_key] - df['trend'] - df['seasonal']
            
            # Take average 12-month profile for clear STL visual representation
            points = []
            for m_idx, month_name in enumerate(timestamps, start=1):
                m_sub = df[df['month'] == m_idx]
                obs_val = float(m_sub[var_key].iloc[-1]) # latest year value
                tr_val = float(m_sub['trend'].iloc[-1])
                seas_val = float(m_sub['seasonal'].mean())
                res_val = float(m_sub['residual'].iloc[-1])
                
                points.append({
                    "timestamp": month_name,
                    "observed": round(obs_val, 2),
                    "trend": round(tr_val, 2),
                    "seasonal": round(seas_val, 2),
                    "residual": round(res_val, 2)
                })
            source_info = "sample_csv"
        else:
            # FALLBACK
            points = []
            base = 28.0 if var_key == "temperature" else 120.0
            for idx, month in enumerate(timestamps):
                trend_val = base + (idx * 0.15)
                seasonal_val = np.sin(idx * np.pi / 6) * 3.5
                res_val = float(np.random.uniform(-0.4, 0.4))
                obs_val = trend_val + seasonal_val + res_val
                points.append({
                    "timestamp": month,
                    "observed": round(float(obs_val), 2),
                    "trend": round(float(trend_val), 2),
                    "seasonal": round(float(seasonal_val), 2),
                    "residual": round(float(res_val), 2)
                })
            source_info = "fallback_synthetic"

        return {
            "location": location,
            "variable": variable,
            "points": points,
            "provenance": {
                "source": source_info,
                "snapshot": "2026-10-07",
                "sha": "demo-sample"
            }
        }
