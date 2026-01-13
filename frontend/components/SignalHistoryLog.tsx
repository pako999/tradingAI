'use client';

import { useState, useEffect } from 'react';
import { History, TrendingUp, TrendingDown } from 'lucide-react';

interface HistoricalSignal {
    id: number;
    ticker: string;
    timestamp: string;
    signal_type: string;
    entry_price: number;
    confidence: number;
    outcome: string;
    pnl_percent: number;
}

export default function SignalHistoryLog() {
    const [history, setHistory] = useState<HistoricalSignal[]>([]);

    // Mock data for demo purposes if backend hasn't accumulated enough yet
    const mockHistory: HistoricalSignal[] = [
        { id: 101, ticker: 'BTC', timestamp: '2026-01-14T08:30:00', signal_type: 'LONG', entry_price: 94500, confidence: 88, outcome: 'WIN', pnl_percent: 4.2 },
        { id: 102, ticker: 'SOL', timestamp: '2026-01-14T07:15:00', signal_type: 'SHORT', entry_price: 148.50, confidence: 92, outcome: 'WIN', pnl_percent: 2.8 },
        { id: 103, ticker: 'ETH', timestamp: '2026-01-14T06:00:00', signal_type: 'LONG', entry_price: 3320, confidence: 75, outcome: 'LOSS', pnl_percent: -1.5 },
    ];

    return (
        <div className="w-full glass-panel p-6 border-neutral-800 mt-6">
            <div className="flex items-center gap-2 mb-4">
                <History className="w-4 h-4 text-neutral-500" />
                <h3 className="text-sm font-bold text-neutral-300 tracking-wide">SIGNAL EXECUTION LOG (Last 24h)</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-neutral-400 font-mono">
                    <thead>
                        <tr className="border-b border-white/5 text-neutral-600 uppercase tracking-wider">
                            <th className="pb-3 pl-2">Time</th>
                            <th className="pb-3">Ticker</th>
                            <th className="pb-3">Type</th>
                            <th className="pb-3">Entry</th>
                            <th className="pb-3">Outcome</th>
                            <th className="pb-3 text-right pr-2">PnL %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockHistory.map((s) => (
                            <tr key={s.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="py-3 pl-2 opacity-60">{s.timestamp.split('T')[1].slice(0, 5)}</td>
                                <td className="py-3 font-bold text-neutral-200">{s.ticker}</td>
                                <td className="py-3">
                                    <span className={`px-1.5 py-0.5 rounded ${s.signal_type === 'LONG' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                        {s.signal_type}
                                    </span>
                                </td>
                                <td className="py-3">${s.entry_price.toLocaleString()}</td>
                                <td className="py-3">
                                    {s.outcome === 'WIN' ? (
                                        <span className="flex items-center gap-1 text-green-400"><TrendingUp className="w-3 h-3" /> WIN</span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-red-400"><TrendingDown className="w-3 h-3" /> LOSS</span>
                                    )}
                                </td>
                                <td className={`py-3 text-right pr-2 font-bold ${s.pnl_percent > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {s.pnl_percent > 0 ? '+' : ''}{s.pnl_percent}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
