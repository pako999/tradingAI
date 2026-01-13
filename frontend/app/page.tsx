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
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full glass-panel text-xs font-mono text-amber-300 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
          <Zap className="w-3 h-3 fill-current text-amber-400" />
          <span className="tracking-widest">ALPHAPULSE SYSTEM v2026.4</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter gold-gradient-text drop-shadow-2xl">
          AlphaPulse
        </h1>
        <p className="text-neutral-400 mt-6 text-lg font-light tracking-wide">
          Institutional-Grade <span className="text-amber-500/80 font-medium">Crypto Prediction Engine</span>
        </p>
      </div>

      {/* Search */}
      <div className="w-full z-10 mb-12">
        <TickerSearch onSearch={handleSearch} loading={loading} />
      </div>

      {/* Content */}
      {error && (
        <div className="p-4 rounded-xl bg-red-900/20 border border-red-500/20 text-red-400 mb-8 backdrop-blur-sm">
          {error}
        </div>
      )}

      {data && (
        <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="glass-panel p-10 mb-8 relative overflow-hidden ring-1 ring-amber-500/10">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-50" />
            <h2 className="text-center text-amber-500/60 mb-4 font-mono text-xs tracking-[0.2em] uppercase">Confidence Score ({data.ticker})</h2>
            <AlphaGauge score={data.confidence_score} sentiment={data.market_sentiment} />
          </div>

          <LogicBreakdown data={data} />
        </div>
      )}

      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-yellow-700/5 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neutral-800/20 rounded-full blur-[150px] -z-10" />
      </div>
    </main>
  );
}
