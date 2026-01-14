'use client';

import { useState, useEffect } from 'react';
import { History, TrendingUp, TrendingDown } from 'lucide-react';

import { getSignalHistory, HistoricalSignal } from '@/lib/api';

interface Props {
    ticker?: string;
}

export default function SignalHistoryLog({ ticker }: Props) {
    const [history, setHistory] = useState<HistoricalSignal[]>([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getSignalHistory(ticker);
                if (data && data.length > 0) {
                    setHistory(data);
                } else {
                    setHistory([]); // Reset if empty
                }
            } catch (err) {
                console.error("Failed to fetch logs");
                setHistory([]);
            }
        };
        fetchHistory();
    }, [ticker]);

    // ... 

    return (
        <div className="w-full glass-panel p-6 border-neutral-800 mt-6">
            <div className="flex items-center gap-2 mb-4">
                <History className="w-4 h-4 text-neutral-500" />
                <h3 className="text-sm font-bold text-neutral-300 tracking-wide">
                    {ticker ? `${ticker} EXECUTION LOG` : 'GLOBAL SIGNAL FEED'} (Last 24h)
                </h3>
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
                        {history.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="py-8 text-center text-neutral-600 font-mono text-xs">
                                    WAITING FOR NEXT SIGNAL CYCLE... (5 min)
                                </td>
                            </tr>
                        ) : (
                            history.map((s) => (
                                <tr key={s.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-3 pl-2 opacity-60">{s.timestamp ? s.timestamp.split('T')[1].slice(0, 5) : '--:--'}</td>
                                    <td className="py-3 font-bold text-neutral-200">{s.ticker}</td>
                                    <td className="py-3">
                                        <span className={`px-1.5 py-0.5 rounded ${s.signal_type === 'LONG' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                            {s.signal_type}
                                        </span>
                                    </td>
                                    <td className="py-3">${s.entry_price ? s.entry_price.toLocaleString() : '0.00'}</td>
                                    <td className="py-3">
                                        {s.outcome === 'WIN' ? (
                                            <span className="flex items-center gap-1 text-green-400"><TrendingUp className="w-3 h-3" /> WIN</span>
                                        ) : s.outcome === 'LOSS' ? (
                                            <span className="flex items-center gap-1 text-red-400"><TrendingDown className="w-3 h-3" /> LOSS</span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-neutral-500">PENDING</span>
                                        )}
                                    </td>
                                    <td className={`py-3 text-right pr-2 font-bold ${s.pnl_percent > 0 ? 'text-green-400' : s.pnl_percent < 0 ? 'text-red-400' : 'text-neutral-500'}`}>
                                        {s.pnl_percent > 0 ? '+' : ''}{s.pnl_percent}%
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
