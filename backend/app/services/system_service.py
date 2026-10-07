from typing import List, Dict, Any

class SystemService:
    @staticmethod
    def get_system_telemetry() -> dict:
        return {
            "cpu": 32.0,
            "gpu": 68.0,
            "memory": 54.0,
            "storage": 41.0,
            "healthy": True
        }

    @staticmethod
    def get_system_activities() -> List[dict]:
        return [
            {"id": "act-1", "time": "14:32", "event": "XGBoost training completed", "status": "Success"},
            {"id": "act-2", "time": "14:28", "event": "Dataset preprocessing started", "status": "Info"},
            {"id": "act-3", "time": "14:15", "event": "New climate data ingested (50 GB)", "status": "Success"},
            {"id": "act-4", "time": "13:40", "event": "System backup completed", "status": "Success"},
            {"id": "act-5", "time": "12:22", "event": "Model deployment initiated", "status": "Info"}
        ]

    @staticmethod
    def get_system_health() -> List[dict]:
        return [
            {"id": "sh-1", "component": "API Gateway", "status": "Healthy", "latency": "12 ms", "uptime": "99.99%", "lastChecked": "Just now"},
            {"id": "sh-2", "component": "Primary Database (PostgreSQL / Timescale)", "status": "Healthy", "latency": "4 ms", "uptime": "99.95%", "lastChecked": "1 min ago"},
            {"id": "sh-3", "component": "Model Inference Microservices", "status": "Healthy", "latency": "45 ms", "uptime": "99.80%", "lastChecked": "Just now"},
            {"id": "sh-4", "component": "Data Ingestion Pipeline (Kafka / MQTT)", "status": "Healthy", "latency": "8 ms", "uptime": "99.90%", "lastChecked": "2 mins ago"},
            {"id": "sh-5", "component": "Object Storage (AWS S3 Parquet)", "status": "Healthy", "latency": "24 ms", "uptime": "100.0%", "lastChecked": "5 mins ago"}
        ]
