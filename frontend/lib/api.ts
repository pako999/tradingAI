export interface AnalysisResult {
    ticker: string;
    confidence_score: number;
    market_sentiment: string;
    components: {
        macro: { score: number; desc: string };
        onchain: { score: number; desc: string };
        derivatives: { score: number; desc: string };
    };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ProSignal {
    ticker: string;
    signal: "LONG" | "SHORT";
    success_probability: number;
    setup: {
        entry_zone: number[];
        stop_loss: number;
        take_profit_1: number;
        risk_reward_ratio: number;
    };
    confluence: string[];
}

export interface LiquidityZone {
    price_level: number;
    type: string;
    leverage_tier: string;
    liquidity_intensity: string;
}

export async function getPrediction(ticker: string): Promise<AnalysisResult> {
    const res = await fetch(`${API_URL}/predict/${ticker}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch prediction');
    return res.json();
}

export async function getProSignals(ticker: string): Promise<ProSignal> {
    const res = await fetch(`${API_URL}/pro/signals/${ticker}?tier=PRO`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch Pro Signals');
    return res.json();
}

export async function getLiquidityMap(ticker: string): Promise<LiquidityZone[]> {
    const res = await fetch(`${API_URL}/pro/liquidity/${ticker}?tier=PRO`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch Liquidity Map');
    return res.json();
}
