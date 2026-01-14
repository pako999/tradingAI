import { AnalysisResult, LiquidityZone, ProSignal, HistoricalSignal } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface AnalysisResult {
    ticker: string;
    price: number;
    change_24h: number;
    volume: number;
    confidence_score: number;
    signal: string;
    market_sentiment: string;
    macro: {
        trend: string;
        volatility: string;
    };
    onchain: {
        net_flow: string;
        whale_activity: string;
    };
    derivatives: {
        long_short_ratio: number;
        open_interest: string;
    };
}

export interface ProSignal {
    ticker: string;
    sentiment: number;
    confidence: number;
    signal_type: "LONG" | "SHORT" | "NEUTRAL";
    setup?: {
        entry_zone: number[];
        take_profit_1: number;
        take_profit_2: number;
        stop_loss: number;
        risk_reward_ratio: number;
        confluence: string[];
        validity_hours: number;
    };
}

export interface LiquidityZone {
    price_level: number;
    intensity: number;  // 1-100
    type: "buy" | "sell";
    leverage_tier: string; // "50x", "100x"
    volume_estimated: number;
}

export interface HistoricalSignal {
    id: string | number;
    ticker: string;
    signal_type: "LONG" | "SHORT";
    entry_price: number;
    result_pnl?: number;
    timestamp: string;
    status: "OPEN" | "CLOSED";
    outcome?: string; // "WIN" | "LOSS"
    pnl_percent?: number;
    confidence?: number;
}

export interface NewsItem {
    title: string;
    url: string;
    published_at: string;
    image_url?: string;
}

export async function getPrediction(ticker: string): Promise<AnalysisResult> {
    const res = await fetch(`${API_URL}/predict/${ticker}`);
    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
}

export async function getProSignals(ticker: string): Promise<ProSignal> {
    const res = await fetch(`${API_URL}/pro/signals/${ticker}?tier=PRO`);
    if (!res.ok) throw new Error('Failed to fetch signals');
    return res.json();
}

export async function getLiquidityMap(ticker: string): Promise<LiquidityZone[]> {
    const res = await fetch(`${API_URL}/pro/liquidity/${ticker}?tier=PRO`);
    if (!res.ok) throw new Error('Failed to fetch liquidity');
    return res.json();
}

export async function getSignalHistory(ticker?: string): Promise<HistoricalSignal[]> {
    const url = ticker
        ? `${API_URL}/history/signals?ticker=${ticker}`
        : `${API_URL}/history/signals`;

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch Signal History');
    return res.json();
}

export async function getNews(): Promise<NewsItem[]> {
    const res = await fetch(`${API_URL}/news`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch News');
    return res.json();
}
