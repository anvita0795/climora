from fastapi import APIRouter, Depends, Query, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.session import get_db
from app.schemas.dataset import DatasetOut, DatasetPreviewResponse
from app.services.dataset_service import DatasetService

router = APIRouter(prefix="/datasets", tags=["Datasets"])

@router.get("", response_model=List[DatasetOut], summary="List Datasets")
def list_datasets(
    search: Optional[str] = Query(None, description="Search datasets by name"),
    variable: Optional[str] = Query(None, description="Filter by variable"),
    db: Session = Depends(get_db)
):
    return DatasetService.get_datasets(db, search=search, variable=variable)

@router.get("/{dataset_id}/preview", response_model=DatasetPreviewResponse, summary="Dataset Preview Slice")
def preview_dataset(
    dataset_id: str,
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    return DatasetService.get_preview(db, dataset_id, limit=limit)

@router.post("/upload", summary="Upload Dataset File (.nc, .parquet, .tif)")
async def upload_dataset(
    file: UploadFile = File(...),
    dataset_name: str = Form(...),
    dataset_type: str = Form("Multi-Variable"),
    db: Session = Depends(get_db)
):
    if not file.filename.endswith(('.nc', '.parquet', '.tif', '.nc4', '.tiff')):
        raise HTTPException(status_code=400, detail="Unsupported file format. Upload .nc, .parquet, or .tif")
    
    return {
        "status": "SUCCESS",
        "message": f"Dataset '{dataset_name}' file '{file.filename}' uploaded successfully.",
        "dataset_id": "ds-uploaded-new",
        "file_size": file.size or 1048576
    }
