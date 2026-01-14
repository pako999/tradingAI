'use client';
import { useEffect, useState } from 'react';
import { getWhaleActivity, WhaleTrade } from '@/lib/api';
import { Shield } from 'lucide-react';

interface Props {
    ticker?: string;
}

export default function WhaleWatch({ ticker = "ETH" }: Props) {
    const [trades, setTrades] = useState<WhaleTrade[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const data = await getWhaleActivity(ticker);
                setTrades(data);
            } catch (e) {
                console.error("Whale fetch failed");
            } finally {
                setLoading(false);
            }
        }
        load();
        const interval = setInterval(load, 30000); // 30s polling
        return () => clearInterval(interval);
    }, [ticker]);

    if (!trades || trades.length === 0) return null;

    return (
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 pointer-events-none">
            {trades.slice(0, 3).map((t, i) => (
                <div
                    key={t.Transaction.Hash + i}
                    className="bg-black/80 backdrop-blur border border-purple-500/30 rounded px-3 py-2 flex items-center gap-3 shadow-[0_0_15px_rgba(168,85,247,0.2)] animate-in slide-in-from-right duration-700 pointer-events-auto"
                >
                    <div className="bg-purple-500/20 p-1.5 rounded text-purple-400">
                        <Shield className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="text-[10px] text-purple-300 font-bold tracking-wider mb-0.5">WHALE DETECTED</div>
                        <div className="text-xs font-mono text-white">
                            <span className="text-green-400">BUY</span> ${parseFloat(t.Trade.Amount).toLocaleString(undefined, { maximumFractionDigits: 0 })} {t.Trade.Side.Currency.Symbol}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
