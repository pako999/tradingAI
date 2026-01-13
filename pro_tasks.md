# AlphaPulse Pro 2026 - Upgrade Plan

## 1. Product Tiers & Monetization
- [ ] **Auth & Tier Logic**
    - [ ] Implement `UserTier` Enum (FREE, ALPHA, PRO).
    - [ ] Create dependency `get_current_user_tier` (Mock for now).
    - [ ] Protect `/signals/pro` endpoints.

## 2. Backend "Intelligence" (Railway Agent)
- [ ] **AI Models**
    - [ ] Install `darts`, `torch` for Temporal Fusion Transformer (TFT).
    - [ ] Scaffold `TFTForecastService` for Quantile Forecasts (P10, P50, P90).
- [ ] **Signal Generator**
    - [ ] Create `SignalEngine` for Entry/Exit/Stop-Loss logic.
    - [ ] Implement Risk/Reward calc (Min 2.5:1).
- [ ] **Data Pipeline (Pro)**
    - [ ] `LiquidityService`: Mock Liquidation Heatmap data.
    - [ ] `WhaleService`: Mock Institutional/Smart Money flows.

## 3. Frontend "Terminal" (Vercel Agent)
- [ ] **New Components**
    - [ ] `LiquidityHeatmap`: Visual depth chart (Canvas/SVG).
    - [ ] `TradeSignalCard`: PRO-only card with R/R ratio & Probability.
    - [ ] `InstitutionalTicker`: Scrolling text for whale moves.
    - [ ] `TierLockedOverlay`: Blur effect for non-pro users.
- [ ] **Dashboard Layout**
    - [ ] "Pro Terminal" View: Grid layout for charts + signals.

## 4. Execution
- [ ] Verify TFT scaffolding (mock inference).
- [ ] Connect Frontend to new `/pro` endpoints.
