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
import { Zap, Lock, Rocket, Smartphone } from 'lucide-react';
import PricingModal from '@/components/PricingModal';

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


  const [showPricing, setShowPricing] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center p-8 md:p-12 relative overflow-hidden bg-[#050505]">
      {/* Top Bar */}
      <div className="absolute top-6 right-8 z-20">
        <AuthButton />
      </div>

      {/* Pricing Modal */}
      <PricingModal isOpen={showPricing} onClose={() => setShowPricing(false)} />

      {/* Header & Hero */}
      <div className="text-center z-10 mb-12 max-w-4xl">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full glass-panel text-xs font-mono text-amber-300 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
          <Zap className="w-3 h-3 fill-current text-amber-400" />
          <span className="tracking-widest">ALPHAPULSE PRO v2026.5</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 drop-shadow-2xl">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-neutral-500">Alpha</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-200">Pulse</span>
        </h1>

        <p className="text-xl md:text-2xl text-neutral-400 font-light mb-10 max-w-2xl mx-auto">
          Institutional-Grade AI Signals & Whale Tracking for Everyone.
        </p>

        {/* Feature Grid (Value Props) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {/* Card 1 */}
          <div onClick={() => setShowPricing(true)} className="glass-panel p-6 border-white/5 hover:border-amber-500/30 transition-all cursor-pointer group text-left">
            <div className="mb-4 bg-gradient-to-br from-amber-500/20 to-amber-900/10 w-12 h-12 rounded-xl flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform">
              <Rocket className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="font-bold text-white mb-1">AI Trade Signals</h3>
            <p className="text-xs text-neutral-500">83% Win Rate algorithm scanning 100+ pairs 24/7.</p>
          </div>

          {/* Card 2 - Telegram */}
          <div onClick={() => setShowPricing(true)} className="glass-panel p-6 border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2"><div className="w-2 h-2 bg-red-500 rounded-full animate-ping" /></div>
            <div className="mb-4 bg-gradient-to-br from-blue-500/20 to-blue-900/10 w-12 h-12 rounded-xl flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
              <Smartphone className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="font-bold text-white mb-1">Telegram Alerts</h3>
            <p className="text-xs text-neutral-500">Instant phone notifications. Never miss a pump again.</p>
          </div>

          {/* Card 3 - Whales */}
          <div onClick={() => setShowPricing(true)} className="glass-panel p-6 border-white/5 hover:border-purple-500/30 transition-all cursor-pointer group text-left">
            <div className="mb-4 bg-gradient-to-br from-purple-500/20 to-purple-900/10 w-12 h-12 rounded-xl flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform">
              <Lock className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-bold text-white mb-1">Whale Heatmaps</h3>
            <p className="text-xs text-neutral-500">See where Smart Money is executing hidden orders.</p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => setShowPricing(true)}
          className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl font-black uppercase tracking-widest text-black shadow-[0_0_40px_rgba(245,158,11,0.4)] hover:shadow-[0_0_60px_rgba(245,158,11,0.6)] hover:scale-105 transition-all duration-300"
        >
          <span className="flex items-center gap-2">
            <Zap className="w-5 h-5 fill-black" />
            Get Instant Alerts
          </span>
          <div className="absolute inset-0 rounded-xl ring-2 ring-white/50 animate-pulse group-hover:ring-white/80" />
        </button>
      </div>

      {/* Search */}
      <div className="w-full z-10 mb-10 max-w-2xl">
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

            {/* Clickable Lock Logic Area */}
            <div
              onClick={() => setShowPricing(true)}
              className="glass-panel p-6 border-amber-500/10 relative overflow-hidden h-fit cursor-pointer hover:border-amber-500/30 transition-all group"
            >
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              <div className="absolute top-0 right-0 p-3 z-10">
                <div className="bg-neutral-900 rounded-full p-1.5 border border-neutral-700 group-hover:border-amber-500 transition-colors">
                  <Lock className="w-3 h-3 text-neutral-400 group-hover:text-amber-500" />
                </div>
              </div>

              <h3 className="text-neutral-400 font-bold mb-4 text-sm blur-[2px] group-hover:blur-0 transition-all">INSTITUTIONAL FLOW</h3>
              <div className="space-y-3 blur-sm group-hover:blur-md transition-all">
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

              {/* Lock Overlay Content */}
              <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">UNLOCK ALPHA</span>
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
            <SignalHistoryLog ticker={data?.ticker} />
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
