# Backend Implementation Plan - AlphaPulse 2026

## 1. Directory Structure
```
/backend
  ├── main.py              # Application entry point & API routes
  ├── requirements.txt     # Dependencies
  ├── Dockerfile           # Railway deployment config
  ├── engine.py            # Logic for Weighted Consensus
  ├── services/
  │   ├── macro.py         # Mock CoinGecko
  │   ├── onchain.py       # Mock Glassnode
  │   └── derivatives.py   # Mock CoinGlass
  └── utils.py             # Helpers
```

## 2. Dependencies (`requirements.txt`)
- fastapi
- uvicorn
- pydantic
- python-dotenv
- httpx (for async requests if we were real, but good for mocking too)

## 3. Core Logic (`engine.py`)
The `WeightedConsensusEngine` will aggregate scores:
- **Macro Score (0-100)**: Based on simulated ETF inflows/outflows.
- **On-Chain Score (0-100)**: Based on large transaction volume/whale wallet movement.
- **Derivatives Score (0-100)**: Based on funding rates (positive = bullish/overbought, negative = bearish/oversold - need logic interpretation).

Formula: `FinalScore = (Macro * 0.3) + (OnChain * 0.4) + (Derivatives * 0.3)`

## 4. API Response Schema
```json
{
  "ticker": "BTC",
  "timestamp": "2026-01-14T10:00:00Z",
  "confidence_score": 78.5,
  "market_sentiment": "Bullish",
  "breakdown": {
    "macro_impact": "Positive ETF Inflows",
    "onchain_analysis": "High Whale Accumulation",
    "derivatives_status": "Neutral Funding Rates"
  }
}
```

## 5. Deployment Checks
- CORS must allow `*` for dev, or specific Vercel URL for prod.
- Port handling for Railway (usually uses `PORT` env var).
