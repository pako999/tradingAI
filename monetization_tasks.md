# AlphaPulse Phase 4: Monetization (The Cash Register)

## 1. Authentication (Supabase Auth)
- [ ] **Setup**
    - [ ] Install `@supabase/auth-helpers-nextjs` `@supabase/supabase-js`.
    - [ ] Create `middleware.ts` for session handling.
    - [ ] Create `lib/supabase.ts` client.
- [ ] **Components**
    - [ ] `AuthButton`: specialized Login/Logout button.
    - [ ] `TierGuard`: Wrapper to gate content based on user metadata.

## 2. Payments (Stripe)
- [ ] **Setup**
    - [ ] Create Stripe "AlphaPulse Pro" Product ($127/mo).
    - [ ] Get Payment Link URL.
- [ ] **UI Integration**
    - [ ] Create `PricingModal` component.
    - [ ] Redirect non-pro users to Stripe upon clicking locked features.

## 3. Tier Enforcement
- [ ] **Frontend Logic**
    - [ ] If user is NOT logged in -> Show "Connect Wallet / Login".
    - [ ] If user IS logged in but Tier != Pro -> Show "Upgrade to Unlock".
- [ ] **Backend Enforcement** (Optional for now)
    - [ ] Verify JWT token on API calls (can be Phase 4.5).
