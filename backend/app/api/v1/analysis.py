from fastapi import APIRouter, Query
from app.schemas.analysis import CorrelationResponse, DecompositionResponse
from app.services.analysis_service import AnalysisService

router = APIRouter(prefix="/analysis", tags=["Climate Analysis"])

@router.get("/correlation", response_model=CorrelationResponse, summary="Get Climate Variable Correlation Matrix")
def get_correlation(method: str = Query("Pearson", description="Correlation method (Pearson/Spearman)")):
    return AnalysisService.get_correlation_matrix(method=method)

@router.get("/decomposition", response_model=DecompositionResponse, summary="Get Seasonal STL Decomposition")
def get_decomposition(
    location: str = Query("Chennai, India", description="Location name"),
    variable: str = Query("Temperature", description="Climate variable")
):
    return AnalysisService.get_stl_decomposition(location=location, variable=variable)
