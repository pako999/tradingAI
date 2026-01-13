# 🚂 Production Database Setup (Railway)

To make your "Signal History" persist forever (instead of resetting on every deploy), follow these steps to attach a real PostgreSQL database.

## 1. Provision Database
1. Go to your [Railway Dashboard](https://railway.app/dashboard).
2. Open the **"AlphaPulse"** project.
3. Click **"New"** (Top right) -> **"Database"** -> **"PostgreSQL"**.
4. Wait a moment for it to deploy.

## 2. Connect Backend to Database
1. Click on the new **PostgreSQL** card in your canvas.
2. Go to the **"Variables"** tab.
3. Find `DATABASE_URL` (it will look like `postgresql://postgres:password@roundhouse.proxy.rlwy.net:PORT/railway`).
4. **Copy** the value.

## 3. Configure Backend Service
1. Go back to your **Backend (FastAPI)** service card.
2. Go to **"Variables"**.
3. Click **"New Variable"**.
4. Key: `DATABASE_URL`
5. Value: *[Paste the value you copied]*
6. Click **Add**.

## 4. Redeploy
1. Railway will automatically trigger a redeploy of your backend.
2. Once the deploy is green, your app is now using a production-grade SQL database!
   - All signal logs will be saved permanently.
   - You can connect to this DB using TablePlus or DBeaver to view the raw data.
