# CLIMORA AI — Climate Intelligence Forecasting Platform

> **College ML PBL Project**  
> **Authors**: Anvita S Prabhu & M. Lathika (Chennai Institute of Technology)  
> **Mentor**: S. Raja Priya  

CLIMORA AI is a full-stack, ML-driven climate forecasting and explainability platform built for presentation-ready regional climate intelligence, risk assessment, and decision support.

---

## 🌟 Architecture & Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS 4, Recharts, Mapbox GL JS, Lucide Icons
- **Backend API**: FastAPI, SQLAlchemy (SQLite/PostgreSQL), Pydantic v2, Uvicorn
- **ML & Explainability**: XGBoost Regressor (`climora_xgboost_temp.json`), SHAP (TreeExplainer), Scikit-Learn, Pandas, NumPy
- **Benchmark Sample**: 43-year monthly climate series for Chennai, India (1980–2022, 516 records) with zero data leakage (80/20 chronological time-series split).

---

## 🚀 Quick Start Guide

### 1. Backend Setup & Run

```bash
# Navigate to backend directory
cd backend

# Create virtual environment and install dependencies
python -m venv venv
venv\Scripts\activate # On Windows (or source venv/bin/activate on Linux/Mac)
pip install -r requirements.txt

# Generate committed benchmark sample data
python scripts/generate_sample.py

# Train XGBoost model artifact on benchmark CSV
python scripts/train_real_model.py

# Start FastAPI server
uvicorn app.main:app --reload --port 8000
```

### 2. Frontend Setup & Run

```bash
# Install frontend packages
npm install

# Start Vite development server
npm run dev

# Build production bundle (passes strict TypeScript checking)
npm run build
```

---

## 🛡️ Data Provenance & Transparency

Every interactive chart and map element in CLIMORA AI is live-wired to backend API endpoints and displays clear provenance badges:
- **`LIVE — Backend`**: Real-time response computed via FastAPI and trained XGBoost/SHAP models over the 516-record benchmark CSV.
- **`DEMO — Sample Data`**: Transparent indicator for fallback scenarios when offline.
