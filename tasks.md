# AlphaPulse 2026 - Project Task List

## Backend (FastAPI - Railway)
- [x] **Setup & Config**
    - [x] Initialize Python environment (requirements.txt)
    - [x] Create `Dockerfile` for Railway
    - [x] Configure Environment Variables (`COINGLASS_API_KEY`, `DATABASE_URL`)
    - [x] Setup CORS for Vercel domain
- [x] **Core Logic (Prediction Brain)**
    - [x] Implement `WeightedConsensusEngine` class
    - [x] **Data Sources (Mock/Simulated)**
        - [x] Macro (30%): CoinGecko V3 API simulation (BTC Net Flow)
        - [x] On-Chain (40%): Glassnode API simulation (Whale Concentration)
        - [x] Derivatives (30%): CoinGlass V4 API simulation (Funding Rates)
- [x] **API Endpoints**
    - [x] `GET /predict/{ticker}`: Returns Confidence Score, Sentiment, Whale Activity
    - [x] `GET /health`: Health check

## Frontend (Next.js - Vercel)
- [x] **Setup**
    - [x] Scaffold Next.js 15+ App Router (`/frontend`)
    - [x] Install Tailwind CSS, `lucide-react`
    - [x] Setup Glassmorphism CSS variables/utilities
- [x] **Components**
    - [x] `GlobalAlphaGauge`: Animated dial for market risk
    - [x] `TickerSearch`: Input to query API
    - [x] `LogicBreakdown`: Display prediction reasoning
    - [x] `DashboardLayout`: Main wrapper
- [x] **Integration**
    - [x] Fetch data from FastAPI backend
    - [x] Display real-time (mocked) data

## Deployment
- [x] Verify Docker build locally
- [x] Build Frontend
- [x] Record Browser Demo
