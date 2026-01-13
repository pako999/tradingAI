# AlphaPulse Phase 3: Trust & Verify (Database)

## 1. Database Infrastructure
- [ ] **Setup**
    - [ ] Install `sqlalchemy`, `alembic` (or just use simple sqlite for dev).
    - [ ] Define `SignalHistory` and `PredictionLog` models.
    - [ ] Create database connection logic (`database.py`).

## 2. Background Jobs (The "Recorder")
- [ ] **Scheduler**
    - [ ] Implement `APScheduler` (Advanced Python Scheduler).
    - [ ] Create a job that runs every 15 minutes.
    - [ ] Job logic: Fetch forecast -> Save to DB.

## 3. API API Endpoints
- [ ] `GET /history/performance`: Returns win-rate and PnL log.
- [ ] `GET /history/signals`: Returns list of past signals for the frontend.

## 4. Frontend "Win-Rate" Dashboard
- [ ] **New Page/Section**
    - [ ] `PerformanceChart`: Line chart showing cumulative PnL.
    - [ ] `SignalHistoryTable`: List of past calls and their outcomes.
