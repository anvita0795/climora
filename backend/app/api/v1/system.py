from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List
import asyncio
import json
from app.schemas.system import SystemTelemetryResponse, SystemActivitySchema, SystemHealthItemSchema
from app.services.system_service import SystemService

router = APIRouter(prefix="/system", tags=["System Telemetry & Operations"])

@router.get("/telemetry", response_model=SystemTelemetryResponse, summary="Get Real-time System Resource Telemetry")
def get_telemetry():
    return SystemService.get_system_telemetry()

@router.get("/activity", response_model=List[SystemActivitySchema], summary="Get System Event Logs")
def get_activity():
    return SystemService.get_system_activities()

@router.get("/health", response_model=List[SystemHealthItemSchema], summary="Get Infrastructure Health Status")
def get_health():
    return SystemService.get_system_health()

@router.websocket("/ws")
async def websocket_system_telemetry(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = SystemService.get_system_telemetry()
            await websocket.send_text(json.dumps(data))
            await asyncio.sleep(3)
    except WebSocketDisconnect:
        pass
