'use client';
import { ProSignal } from '@/lib/api';
import { Target, TrendingUp, TrendingDown, AlertTriangle, ShieldCheck } from 'lucide-react';

interface Props {
    data: ProSignal;
}

export default function TradeSignalCard({ data }: Props) {
    if (!data) return null;

    // Use signal_type (LONG/SHORT/NEUTRAL)
    const isLong = data.signal_type === 'LONG';
    const isNeutral = data.signal_type === 'NEUTRAL';

    // Safely access setup
    const setup = data.setup;

    return (
        <div className="glass-panel p-6 border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.1)] w-full relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-black text-white flex items-center gap-2">
                        {data.ticker}
                        <span className="text-xs font-mono text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">PERP</span>
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${isLong ? 'bg-green-500' : isNeutral ? 'bg-yellow-500' : 'bg-red-500'} animate-pulse`} />
                        <span className={`text-sm font-bold tracking-widest ${isLong ? 'text-green-500' : isNeutral ? 'text-yellow-500' : 'text-red-500'}`}>
                            {data.signal_type} SIGNAL
                        </span>
                    </div>
                </div>

                <div className="text-right">
                    <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Confidence</div>
                    <div className="text-3xl font-black text-white">{data.confidence}%</div>
                </div>
            </div>

            {/* Trade Setup Details */}
            {setup ? (
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-neutral-900/50 rounded-lg p-3 border border-white/5">
                        <div className="text-[10px] text-neutral-500 uppercase mb-1 flex items-center gap-1">
                            <Target className="w-3 h-3" /> Entry Zone
                        </div>
                        <div className="text-sm font-mono text-blue-300">
                            ${setup.entry_zone[0]} - ${setup.entry_zone[1]}
                        </div>
                    </div>
                    <div className="bg-neutral-900/50 rounded-lg p-3 border border-white/5">
                        <div className="text-[10px] text-neutral-500 uppercase mb-1 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Stop Loss
                        </div>
                        <div className="text-sm font-mono text-red-400">
                            ${setup.stop_loss}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-lg text-xs mb-6 text-center">
                    <AlertTriangle className="w-4 h-4 mx-auto mb-2" />
                    Waiting for High-R Risk Setup...
                </div>
            )}

            {/* Confluence Factors */}
            <div className="space-y-2">
                <div className="text-xs text-neutral-600 font-bold uppercase tracking-wider mb-2">AI Confluence Factors</div>
                {setup?.confluence && setup.confluence.map((c: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-400">
                        <div className="w-1 h-1 bg-amber-500 rounded-full" />
                        {c}
                    </div>
                ))}
            </div>

            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-10 pointer-events-none transition-opacity">
                {isLong ? <TrendingUp className="w-32 h-32 text-green-500" /> : <TrendingDown className="w-32 h-32 text-red-500" />}
            </div>
        </div>
    );
}
