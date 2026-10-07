from typing import List, Dict, Any

class RiskService:
    @staticmethod
    def get_anomalies() -> List[dict]:
        return [
            {
                "id": "anom-1",
                "date": "Oct 02, 2026",
                "location": "Chennai, India",
                "variable": "Temperature",
                "anomalyType": "Heat Wave",
                "riskLevel": "High",
                "observedValue": 38.4,
                "expectedValue": 31.2,
                "anomalyScore": 0.92
            },
            {
                "id": "anom-2",
                "date": "Sep 28, 2026",
                "location": "Mumbai, India",
                "variable": "Rainfall",
                "anomalyType": "Heavy Rainfall",
                "riskLevel": "High",
                "observedValue": 240.5,
                "expectedValue": 110.0,
                "anomalyScore": 0.88
            },
            {
                "id": "anom-3",
                "date": "Sep 22, 2026",
                "location": "Delhi, India",
                "variable": "Humidity",
                "anomalyType": "Drought Spike",
                "riskLevel": "Medium",
                "observedValue": 22.0,
                "expectedValue": 55.0,
                "anomalyScore": 0.74
            },
            {
                "id": "anom-4",
                "date": "Sep 15, 2026",
                "location": "Bengaluru, India",
                "variable": "Temperature",
                "anomalyType": "Cold Spike",
                "riskLevel": "Low",
                "observedValue": 16.2,
                "expectedValue": 24.5,
                "anomalyScore": 0.55
            }
        ]

    @staticmethod
    def get_geojson_hotspots() -> dict:
        features = [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [80.2707, 13.0827] # Chennai
                },
                "properties": {
                    "id": "hot-1",
                    "name": "Chennai Coastal Zone",
                    "riskLevel": "High",
                    "color": "#FF3B3B",
                    "anomaliesCount": 5,
                    "dominantAnomaly": "Heat Wave & Coastal Surge"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [72.8777, 19.0760] # Mumbai
                },
                "properties": {
                    "id": "hot-2",
                    "name": "Mumbai Urban Island",
                    "riskLevel": "High",
                    "color": "#FF3B3B",
                    "anomaliesCount": 4,
                    "dominantAnomaly": "Heavy Rainfall Surge"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [77.1025, 28.7041] # Delhi
                },
                "properties": {
                    "id": "hot-3",
                    "name": "Delhi Thermal Corridor",
                    "riskLevel": "Medium",
                    "color": "#FF9F1C",
                    "anomaliesCount": 3,
                    "dominantAnomaly": "Heat Stress"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [77.5946, 12.9716] # Bengaluru
                },
                "properties": {
                    "id": "hot-4",
                    "name": "Bengaluru Plateau",
                    "riskLevel": "Normal",
                    "color": "#4ADE80",
                    "anomaliesCount": 1,
                    "dominantAnomaly": "Normal Oscillation"
                }
            }
        ]

        return {
            "type": "FeatureCollection",
            "features": features
        }
