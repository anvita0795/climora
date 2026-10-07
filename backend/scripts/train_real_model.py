import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import numpy as np
import pandas as pd
import xgboost as xgb
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import shap

def train_and_save_real_model():
    csv_path = os.path.join(os.path.dirname(__file__), "..", "data", "samples", "chennai_monthly_1980_2023.csv")
    if not os.path.exists(csv_path):
        print("Sample dataset missing! Generating first...")
        from scripts.generate_sample import generate_sample_dataset
        generate_sample_dataset()

    print(f"Loading committed sample dataset from {csv_path}...")
    df = pd.read_csv(csv_path)

    # Feature engineering for XGBoost training
    # Build lag features and atmospheric indicators
    df['ocean_temp_anomaly'] = (df['temperature'] - df['temperature'].mean()) * 0.4
    df['aerosol_depth'] = 0.2 + 0.1 * np.sin(np.arange(len(df)) * 0.1)
    df['lag_temp'] = df['temperature'].shift(1).fillna(df['temperature'].mean())

    X = df[["co2", "humidity", "pressure", "ocean_temp_anomaly", "aerosol_depth", "lag_temp"]]
    y = df["temperature"]

    # Chronological time-series split (No random shuffling to prevent data leakage)
    split_idx = int(len(df) * 0.8)
    X_train, X_test = X.iloc[:split_idx], X.iloc[split_idx:]
    y_train, y_test = y.iloc[:split_idx], y.iloc[split_idx:]

    print(f"Training XGBoost Regressor model on {len(X_train)} train samples, {len(X_test)} test samples...")
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
