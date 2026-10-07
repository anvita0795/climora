from pydantic import BaseModel
from typing import List, Optional

class FeatureImportanceSchema(BaseModel):
    feature: str
    importance: float
    category: str
    description: str

class ShapBeeswarmPointSchema(BaseModel):
    feature: str
    shapValue: float
    featureValue: float
    featureValueLabel: str

class WaterfallStepSchema(BaseModel):
    name: str
    value: float
    shapValue: float
    accumulated: float
    isPositive: bool

class FeatureRelationshipPointSchema(BaseModel):
    x: float
    shap: float
    interaction: float

class ShapValuesResponse(BaseModel):
    prediction_id: str
    base_value: float
    final_prediction: float
    global_importance: List[FeatureImportanceSchema]
    beeswarm: List[ShapBeeswarmPointSchema]
    waterfall: List[WaterfallStepSchema]
    dependence: List[FeatureRelationshipPointSchema]
