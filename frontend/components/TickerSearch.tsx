'use client';

import { Search, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface TickerSearchProps {
    onSearch: (ticker: string) => void;
    loading: boolean;
}

export default function TickerSearch({ onSearch, loading }: TickerSearchProps) {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onSearch(input.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto relative group">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ENTER TOKEN (e.g. BTC)"
                className="glass-input w-full pl-6 pr-32 uppercase tracking-widest font-mono text-sm shadow-[0_0_15px_rgba(0,0,0,0.5)] border-neutral-800 focus:border-amber-500/50"
                disabled={loading}
            />

            {/* Search Icon / Loader */}
            <div className="absolute right-24 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-amber-400 transition-colors pointer-events-none">
                {loading ? <Loader2 className="w-4 h-4 animate-spin text-amber-500" /> : <Search className="w-4 h-4" />}
            </div>

            <button
                type="submit"
                disabled={loading || !input}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 hover:text-amber-300 border border-amber-500/20 px-4 py-1.5 rounded-lg text-[10px] font-bold tracking-widest transition-all disabled:opacity-0 hover:shadow-[0_0_10px_rgba(245,158,11,0.2)]"
            >
                ANALYZE
            </button>
        </form>
    );
}
