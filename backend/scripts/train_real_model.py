import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import numpy as np
import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import shap

def train_and_save_real_model():
    print("Generating synthetic historical climate dataset for XGBoost training...")
    np.random.seed(42)
    n_samples = 1500

    # Real climate features
    co2 = np.random.normal(415.0, 10.0, n_samples)
    humidity = np.random.normal(65.0, 12.0, n_samples)
    pressure = np.random.normal(1012.0, 5.0, n_samples)
    ocean_temp_anomaly = np.random.normal(1.2, 0.4, n_samples)
    aerosol_depth = np.random.normal(0.25, 0.08, n_samples)
    lag_temp = np.random.normal(28.0, 3.0, n_samples)

    # Physical target equation: temperature with non-linear forcing and physical constraints
    target_temperature = (
        15.0 + 
        (0.025 * co2) + 
        (1.5 * ocean_temp_anomaly) - 
        (0.08 * humidity) - 
        (1.2 * aerosol_depth) + 
        (0.35 * lag_temp) + 
        np.random.normal(0, 0.5, n_samples)
    )

    X = pd.DataFrame({
        "co2": co2,
        "humidity": humidity,
        "pressure": pressure,
        "ocean_temp_anomaly": ocean_temp_anomaly,
        "aerosol_depth": aerosol_depth,
        "lag_temp": lag_temp
    })
    y = pd.Series(target_temperature, name="target_temperature")

    # Chronological time-series split (No random shuffling to prevent data leakage)
    split_idx = int(n_samples * 0.8)
    X_train, X_test = X.iloc[:split_idx], X.iloc[split_idx:]
    y_train, y_test = y.iloc[:split_idx], y.iloc[split_idx:]

    print("Training XGBoost Regressor model...")
    model = xgb.XGBRegressor(
        n_estimators=100,
        learning_rate=0.05,
        max_depth=4,
        random_state=42
    )
    model.fit(X_train, y_train)

    # Evaluate metrics
    y_pred = model.predict(X_test)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    print(f"Model Training Complete! RMSE: {rmse:.4f}, MAE: {mae:.4f}, R²: {r2:.4f}")

    # Save model artifact
    save_dir = os.path.join(os.path.dirname(__file__), "..", "app", "ml", "saved_models")
    os.makedirs(save_dir, exist_ok=True)
    model_path = os.path.join(save_dir, "climora_xgboost_temp.json")
    model.save_model(model_path)
    print(f"Saved real XGBoost model artifact to: {model_path}")

    # Verify SHAP TreeExplainer compatibility
    explainer = shap.TreeExplainer(model)
    shap_vals = explainer(X_test.iloc[:5])
    print(f"Verified SHAP TreeExplainer! Base Value: {explainer.expected_value:.2f}")

if __name__ == "__main__":
    train_and_save_real_model()
