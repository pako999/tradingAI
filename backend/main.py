from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from engine import WeightedConsensusEngine
import os

app = FastAPI(title="AlphaPulse 2026 API")

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

@app.get("/")
def read_root():
    return {"status": "AlphaPulse Brain is Active"}

@app.get("/predict/{ticker}")
def get_prediction(ticker: str):
    return engine.analyze_ticker(ticker)

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
