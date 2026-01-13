from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from database import init_db, get_db, SessionLocal, Signal
from scheduler import start_scheduler
from sqlalchemy.orm import Session
import os
from engine import WeightedConsensusEngine

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    init_db()
    start_scheduler()
    yield
    # Shutdown
    pass

app = FastAPI(title="AlphaPulse 2026 API", lifespan=lifespan)

# --- HISTORY ENDPOINTS ---

@app.get("/history/signals")
def get_signal_history(db: Session = Depends(get_db)):
    """
    Fetch last 50 signals for transparency.
    """
    return db.query(Signal).order_by(Signal.timestamp.desc()).limit(50).all()

@app.get("/history/performance")
def get_performance_stats(db: Session = Depends(get_db)):
    """
    Mock Performance Stats (until we have real historical data outcome checking).
    """
    return {
        "acc_win_rate": 78.4,
        "total_pnl_30d": 342.5,  # Percentage
        "active_streak": 4
    }

# Configure CORS


# Configure CORS
# In production, specific domains should be set.
origins = [
    "http://localhost:3000",
    "https://alphapulse-frontend.vercel.app",  # Example Vercel app
    "*" # Allowing all for now to ensure smooth dev/demo
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = WeightedConsensusEngine()

from services.intelligence import AlphaIntelligenceEngine
from typing import Optional

# ... previous imports

# Initialize Pro Engine
ai_engine = AlphaIntelligenceEngine()

@app.get("/")
def read_root():
    return {"status": "AlphaPulse Brain is Active", "version": "v2026.4"}

@app.get("/predict/{ticker}")
def get_prediction(ticker: str):
    return engine.analyze_ticker(ticker)

# --- PRO ENDPOINTS ---

@app.get("/pro/forecast/{ticker}")
def get_pro_forecast(ticker: str, tier: str = "FREE"):
    """
    Tier-Gated Endpoint for TFT Forecasts.
    """
    if tier != "PRO":
        return {"error": "Upgrade to PRO for Quantile Forecasts"}
    return ai_engine.get_tft_forecast(ticker.upper())

@app.get("/pro/signals/{ticker}")
def get_pro_signals(ticker: str, tier: str = "FREE"):
    """
    Returns specific Trade Cards with Stop/Loss.
    """
    if tier != "PRO":
        return {"error": "Upgrade to PRO for Trade Setups"}
    return ai_engine.generate_trade_setup(ticker.upper())

@app.get("/pro/liquidity/{ticker}")
def get_liquidity_map(ticker: str, tier: str = "FREE"):
    """
    Returns Liquidation Heatmap zones.
    """
    if tier != "PRO":
        return {"error": "Upgrade to PRO for Liquidity Maps"}
    return ai_engine.get_liquidation_heatmap(ticker.upper())

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
