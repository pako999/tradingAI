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

export async function getPrediction(ticker: string): Promise<AnalysisResult> {
    const res = await fetch(`${API_URL}/predict/${ticker}`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch prediction');
    }

    return res.json();
}
