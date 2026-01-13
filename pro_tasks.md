# AlphaPulse Pro 2026 - Upgrade Plan

## 1. Product Tiers & Monetization
- [x] **Auth & Tier Logic**
    - [x] Implement `UserTier` Enum (FREE, ALPHA, PRO).
    - [x] Create dependency `get_current_user_tier` (Mock for now).
    - [x] Protect `/signals/pro` endpoints.

## 2. Backend "Intelligence" (Railway Agent)
- [x] **AI Models**
    - [x] Install `darts`, `torch` for Temporal Fusion Transformer (TFT).
    - [x] Scaffold `TFTForecastService` for Quantile Forecasts (P10, P50, P90).
- [x] **Signal Generator**
    - [x] Create `SignalEngine` for Entry/Exit/Stop-Loss logic.
    - [x] Implement Risk/Reward calc (Min 2.5:1).
- [x] **Data Pipeline (Pro)**
    - [x] `LiquidityService`: Mock Liquidation Heatmap data.
    - [x] `WhaleService`: Mock Institutional/Smart Money flows.

## 3. Frontend "Terminal" (Vercel Agent)
- [x] **New Components**
    - [x] `LiquidityHeatmap`: Visual depth chart (Canvas/SVG).
    - [x] `TradeSignalCard`: PRO-only card with R/R ratio & Probability.
    - [x] `InstitutionalTicker`: Scrolling text for whale moves.
    - [ ] `TierLockedOverlay`: Blur effect for non-pro users.
- [x] **Dashboard Layout**
    - [x] "Pro Terminal" View: Grid layout for charts + signals.

## 4. Execution
- [x] Verify TFT scaffolding (mock inference).
- [x] Connect Frontend to new `/pro` endpoints.
