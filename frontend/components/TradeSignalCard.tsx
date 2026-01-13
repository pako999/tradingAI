'use client';

import { ProSignal } from '@/lib/api';
import { ArrowUp, ArrowDown, Target, Shield, AlertTriangle } from 'lucide-react';

interface Props {
    data: ProSignal;
}

export default function TradeSignalCard({ data }: Props) {
    const isLong = data.signal === 'LONG';

    return (
        <div className="glass-panel p-6 border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.1)] w-full max-w-md relative overflow-hidden group">
            {/* Background Pulse */}
            <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] rounded-full transition-colors duration-1000 ${isLong ? 'bg-green-500/20' : 'bg-red-500/20'}`} />

            {/* Header */}
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-black tracking-widest px-2 py-0.5 rounded border ${isLong ? 'text-green-400 border-green-500/30 bg-green-500/10' : 'text-red-400 border-red-500/30 bg-red-500/10'}`}>
                            {data.signal} SETUP
                        </span>
                        <span className="text-[10px] text-neutral-500 font-mono border border-neutral-800 px-1.5 rounded bg-black/40">PRO TIER</span>
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-200">{data.ticker} Perp</h3>
                </div>

                <div className="text-right">
                    <div className="text-sm text-neutral-500 font-mono mb-1">WIN PROBABILITY</div>
                    <div className="text-3xl font-black text-amber-500 tabular-nums tracking-tighter">
                        {data.success_probability}%
                    </div>
                </div>
            </div>

            {/* Entry Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
                <div className="bg-neutral-900/50 p-3 rounded-lg border border-white/5">
                    <div className="flex items-center gap-2 text-neutral-500 text-xs mb-1">
                        <Target className="w-3 h-3" /> ENTRY ZONE
                    </div>
                    <div className="text-lg font-mono text-neutral-200">
                        ${data.setup.entry_zone[0].toLocaleString()}
                    </div>
                </div>

                <div className="bg-neutral-900/50 p-3 rounded-lg border border-white/5">
                    <div className="flex items-center gap-2 text-neutral-500 text-xs mb-1">
                        <Shield className="w-3 h-3" /> STOP LOSS
                    </div>
                    <div className="text-lg font-mono text-red-400">
                        ${data.setup.stop_loss.toLocaleString()}
                    </div>
                </div>
            </div>

            {/* R/R & Targets */}
            <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5 relative z-10">
                <div className="flex-1 border-r border-white/10 pr-4">
                    <div className="text-xs text-neutral-500 mb-1">TARGET 1 (TP)</div>
                    <div className="text-xl font-bold text-green-400 font-mono">
                        ${data.setup.take_profit_1.toLocaleString()}
                    </div>
                </div>
                <div className="px-4 text-center">
                    <div className="text-xs text-neutral-500 mb-1">RISK/REWARD</div>
                    <div className="text-xl font-bold text-amber-400 font-mono">
                        1:{data.setup.risk_reward_ratio}
                    </div>
                </div>
            </div>

            {/* Confluence List */}
            <div className="mt-6 pt-4 border-t border-white/5 relative z-10">
                <div className="text-xs text-neutral-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3" /> AI Confluence
                </div>
                <div className="flex flex-wrap gap-2">
                    {data.confluence.map((c, i) => (
                        <span key={i} className="text-[10px] text-neutral-400 bg-neutral-800/50 px-2 py-1 rounded-md border border-white/5">
                            {c}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
