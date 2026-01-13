'use client';

import { useState } from 'react';
import { getPrediction, getLiquidityMap, getProSignals, AnalysisResult, LiquidityZone, ProSignal } from '@/lib/api';
import AlphaGauge from '@/components/AlphaGauge';
import TickerSearch from '@/components/TickerSearch';
import LogicBreakdown from '@/components/LogicBreakdown';
import LiquidityHeatmap from '@/components/LiquidityHeatmap';
import TradeSignalCard from '@/components/TradeSignalCard';
import SignalHistoryLog from '@/components/SignalHistoryLog';
import AuthButton from '@/components/AuthButton';
import { Zap, Lock } from 'lucide-react';

export default function Home() {
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [liquidity, setLiquidity] = useState<LiquidityZone[] | null>(null);
  const [signal, setSignal] = useState<ProSignal | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (ticker: string) => {
    setLoading(true);
    setError('');
    setData(null);
    setLiquidity(null);
    setSignal(null);

    try {
      // Parallel fetch for speed
      const [baseResult, liqResult, sigResult] = await Promise.all([
        getPrediction(ticker),
        getLiquidityMap(ticker),
        getProSignals(ticker)
      ]);

      setData(baseResult);
      setLiquidity(liqResult);
      setSignal(sigResult);
    } catch (err) {
      setError('Failed to fetch intelligence. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-8 md:p-12 relative overflow-hidden bg-[#050505]">
      {/* Top Bar */}
      <div className="absolute top-6 right-8 z-20">
        <AuthButton />
      </div>

      {/* Header */}
      <div className="text-center z-10 mb-8">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full glass-panel text-xs font-mono text-amber-300 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
          <Zap className="w-3 h-3 fill-current text-amber-400" />
          <span className="tracking-widest">ALPHAPULSE PRO v2026.5</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter gold-gradient-text drop-shadow-2xl mb-2">
          AlphaPulse
        </h1>
      </div>

      {/* Search */}
      <div className="w-full z-10 mb-10">
        <TickerSearch onSearch={handleSearch} loading={loading} />
      </div>

      {/* Content */}
      {error && (
        <div className="p-4 rounded-xl bg-red-900/20 border border-red-500/20 text-red-400 mb-8 backdrop-blur-sm">
          {error}
        </div>
      )}

      {data && (
        <div className="w-full max-w-7xl animate-in fade-in slide-in-from-bottom-8 duration-700 grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* LEFT COL: Signal Card + Intelligence */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {signal && <TradeSignalCard data={signal} />}

            <div className="glass-panel p-6 border-amber-500/10 relative overflow-hidden h-fit">
              <div className="absolute top-0 right-0 p-2 opacity-50"><Lock className="w-4 h-4 text-neutral-600" /></div>
              <h3 className="text-neutral-400 font-bold mb-4 text-sm">INSTITUTIONAL FLOW</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-xs border-b border-white/5 pb-2">
                  <span className="text-neutral-500">BlackRock IBIT</span>
                  <span className="text-green-400">+$45.2M (1h)</span>
                </div>
                <div className="flex justify-between text-xs border-b border-white/5 pb-2">
                  <span className="text-neutral-500">Fidelity FBTC</span>
                  <span className="text-green-400">+$12.8M (1h)</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-500">Coinbase Custody</span>
                  <span className="text-amber-500">Active Accumulation</span>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER COL: Gauge & Heatmap */}
          <div className="md:col-span-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-panel p-8 relative overflow-hidden ring-1 ring-amber-500/10 flex flex-col items-center justify-center">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-50" />
                <h2 className="text-center text-amber-500/60 mb-2 font-mono text-xs tracking-[0.2em] uppercase">MARKET SENTIMENT</h2>
                <AlphaGauge score={data.confidence_score} sentiment={data.market_sentiment} />
              </div>

              {liquidity && <LiquidityHeatmap data={liquidity} />}
            </div>

            <LogicBreakdown data={data} />

            {/* History Log */}
            <SignalHistoryLog />
          </div>

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
