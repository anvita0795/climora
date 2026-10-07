import os
import pandas as pd
import numpy as np

def generate_sample_dataset():
    out_dir = os.path.join(os.path.dirname(__file__), "..", "data", "samples")
    os.makedirs(out_dir, exist_ok=True)
    out_file = os.path.join(out_dir, "chennai_monthly_1980_2023.csv")

    months_count = 516 # 43 years * 12 months (1980 to 2022)
    start_date = pd.date_range(start="1980-01-01", periods=months_count, freq="MS")

    step = np.arange(months_count)

    # 1. Temperature: 26.5 base + seasonal (amplitude 3.5) + warming slope (2.4C / 516) + deterministic sin noise
    temp_seasonal = 3.5 * np.sin(2 * np.pi * (step % 12) / 12 - np.pi / 2)
    temp_warming = 2.4 * (step / months_count)
    temp_noise = 0.3 * np.sin(step * 0.7) + 0.2 * np.cos(step * 1.3)
    temperature = np.round(26.5 + temp_seasonal + temp_warming + temp_noise, 2)

    # 2. Rainfall: Seasonal monsoon peak (Oct-Nov), low in spring
    month_of_year = step % 12
    # Chennai rainfall peaks in Oct (m=9) and Nov (m=10)
    rain_pattern = np.array([20, 15, 10, 15, 40, 55, 100, 130, 150, 300, 350, 140])
    rain_base = rain_pattern[month_of_year]
    rain_trend = 15.0 * np.sin(step / 60.0) # decadal oscillation
    rain_noise = 10.0 * np.sin(step * 1.1)
    rainfall = np.round(np.maximum(5.0, rain_base + rain_trend + rain_noise), 1)

    # 3. CO2: 338 ppm in 1980 to 420 ppm in 2022 + small seasonal amplitude
    co2_trend = 338.0 + (420.0 - 338.0) * (step / months_count)
    co2_seasonal = 2.5 * np.cos(2 * np.pi * (step % 12) / 12)
    co2 = np.round(co2_trend + co2_seasonal, 2)

    # 4. Humidity: 65.0 base + seasonal
    humidity_base = 65.0 + 10.0 * np.sin(2 * np.pi * (step % 12) / 12)
    humidity_noise = 2.0 * np.sin(step * 0.5)
    humidity = np.round(np.clip(humidity_base + humidity_noise, 40.0, 95.0), 1)

    # 5. Pressure: 1012.0 base - seasonal + noise
    pressure_base = 1012.0 - 4.0 * np.sin(2 * np.pi * (step % 12) / 12)
    pressure_noise = 1.0 * np.cos(step * 0.9)
    pressure = np.round(pressure_base + pressure_noise, 1)

    # 6. Climate Forcing (W/m2): 1.2 base + growth
    forcing = np.round(1.2 + 1.6 * (step / months_count) + 0.1 * np.sin(step * 0.3), 2)

    df = pd.DataFrame({
        "date": start_date.strftime("%Y-%m-%d"),
        "temperature": temperature,
        "rainfall": rainfall,
        "co2": co2,
        "humidity": humidity,
        "pressure": pressure,
        "climate_forcing": forcing,
        "region": "Chennai, India"
    })

    df.to_csv(out_file, index=False)
    print(f"Generated sample dataset with {len(df)} rows at: {out_file}")

if __name__ == "__main__":
    generate_sample_dataset()
