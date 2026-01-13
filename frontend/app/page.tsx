'use client';

import { useState } from 'react';
import { getPrediction, AnalysisResult } from '@/lib/api';
import AlphaGauge from '@/components/AlphaGauge';
import TickerSearch from '@/components/TickerSearch';
import LogicBreakdown from '@/components/LogicBreakdown';
import { Zap } from 'lucide-react';

export default function Home() {
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (ticker: string) => {
    setLoading(true);
    setError('');
    try {
      const result = await getPrediction(ticker);
      setData(result);
    } catch (err) {
      setError('Failed to fetch prediction. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-8 md:p-24 relative overflow-hidden">
      {/* Header */}
      <div className="text-center z-10 mb-12">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full glass-panel text-xs font-mono text-sky-300 border-sky-500/20">
          <Zap className="w-3 h-3 fill-current" />
          ALPHAPULSE SYSTEM v2026.2
        </div>
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 tracking-tight">
          AlphaPulse
        </h1>
        <p className="text-slate-400 mt-4 text-lg">
          Institutional-Grade Crypto Prediction Engine
        </p>
      </div>

      {/* Search */}
      <div className="w-full z-10 mb-12">
        <TickerSearch onSearch={handleSearch} loading={loading} />
      </div>

      {/* Content */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 mb-8">
          {error}
        </div>
      )}

      {data && (
        <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="glass-panel p-8 mb-8">
            <h2 className="text-center text-slate-400 mb-2 font-mono text-sm">CONFIDENCE SCORE ({data.ticker})</h2>
            <AlphaGauge score={data.confidence_score} sentiment={data.market_sentiment} />
          </div>

          <LogicBreakdown data={data} />
        </div>
      )}

      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-sky-500/10 rounded-full blur-[100px]" />
      </div>
    </main>
  );
}
