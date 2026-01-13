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
                className="glass-input w-full pl-12 pr-4 uppercase tracking-widest font-mono"
                disabled={loading}
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-400 transition-colors">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            </div>

            <button
                type="submit"
                disabled={loading || !input}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-sky-500/20 hover:bg-sky-500/40 text-sky-300 px-3 py-1 rounded-lg text-xs font-bold transition-all disabled:opacity-0"
            >
                ANALYZE
            </button>
        </form>
    );
}
