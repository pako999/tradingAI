# 💰 Monetization & Tier Strategy

To monetize AlphaPulse effectively, we effectively gate the "Alpha" (high-value data) behind paid tiers while giving enough "Beta" (general market info) for free to attract users.

## 📦 The 3 Tiers

### 1. **ROOKIE (Free)**
*   **Target:** Casual observers, people testing the app.
*   **Price:** **$0 / month**
*   **Features:**
    *   ✅ Real-Time Price & Volume (Binance/DexScreener)
    *   ✅ 24h Market Sentiment (Bullish/Bearish tag only)
    *   ✅ limited to 3 searches per day (Optional friction)
    *   ❌ **NO** Entry/Exit Signals
    *   ❌ **NO** Liquidation Heatmaps
    *   ❌ **NO** AI Price Predictions

### 2. **TRADER (Pro)**
*   **Target:** Active traders looking for setups.
*   **Price:** **$29 / month**
*   **Features:**
    *   ✅ **AI Trade Signals:** Exact Entry, Stop Loss, Take Profit.
    *   ✅ **Telegram Alerts:** Get notified instantly (Max 100/mo).
    *   ✅ **Risk/Reward Calculation.**
    *   ✅ **Win-Rate History.**
    *   ✅ Backtesting Data.
    *   ❌ **NO** Deep Liquidation Data.

### 3. **ALPHA (Elite)**
*   **Target:** Professional / High-Net-Worth traders.
*   **Price:** **$79 / month**
*   **Features:**
    *   ✅ **Everything in TRADER.**
    *   ✅ **Unlimited Telegram Alerts:** Real-time Whale & volatility pings.
    *   ✅ **Liquidation Heatmaps:** See where others are getting wrecked.
    *   ✅ **TFT AI Forecasts:** 4-hour price path prediction (P10/P90).
    *   ✅ **Whale Confluence:** "Smart Money" divergence signals.
    *   ✅ Priority Support.

---

## 📱 Telegram Notification Cost Analysis
*   **API Cost:** **$0.00** (Telegram Bot API is free).
*   **Server Cost:** Negligible (Runs on existing backend).
*   **Value:** Extremely High. Users love "passive" monitoring.
*   **Implementation:** Users link their Telegram ID in settings. We send messages via a simple Python bot.

---

## 🔒 Technical Implementation

### Frontend (User Experience)
1.  **Blurred Data:** On the main dashboard, "Signal" and "Heatmap" cards should appear **blurred** with a "LOCK" icon for Free users.
2.  **Upgrade Call-to-Action:** Clicking the lock opens the Pricing Modal.

### Backend (Security)
1.  **Supabase Database:** Add `tier` column to `profiles` table.
2.  **API Guard:**
    *   `/predict/{ticker}` -> Public (Free)
    *   `/pro/signals/{ticker}` -> Requires `tier >= TRADER`
    *   `/pro/liquidity/{ticker}` -> Requires `tier == ALPHA`

## 🛠 Next Steps
1.  **Create Pricing UI:** Display these 3 cards clearly.
2.  **Update Supabase Schema:** Add `subscription_tier` to users.
3.  **Lock the UI:** Blur the components if user is not logged in / not Pro.
