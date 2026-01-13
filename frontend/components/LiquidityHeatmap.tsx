'use client';

import { LiquidityZone } from '@/lib/api';

interface Props {
    data: LiquidityZone[];
}

export default function LiquidityHeatmap({ data }: Props) {
    // Find max price to scale visual
    const maxPrice = Math.max(...data.map(d => d.price_level)) * 1.05;
    const minPrice = Math.min(...data.map(d => d.price_level)) * 0.95;

    return (
        <div className="glass-panel p-6 border-amber-500/20 w-full relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-neutral-300 font-bold tracking-wide text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    LIQUIDATION HEATMAP (Binance/Bybit)
                </h3>
                <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-1 rounded border border-amber-500/20">LIVE FEED</span>
            </div>

            <div className="relative h-48 w-full bg-black/40 rounded-lg border border-white/5 flex items-center justify-around px-4">
                {/* Grid Lines */}
                <div className="absolute inset-0 grid grid-rows-4 w-full h-full pointer-events-none opacity-10">
                    <div className="border-b border-white"></div>
                    <div className="border-b border-white"></div>
                    <div className="border-b border-white"></div>
                    <div className="border-b border-white"></div>
                </div>

                {data.map((zone, i) => (
                    <div key={i} className="relative group flex flex-col items-center gap-2 z-10 w-full">
                        {/* Heat Bar */}
                        <div
                            className={`w-16 rounded-t-sm transition-all duration-500 group-hover:scale-110 
                ${zone.liquidity_intensity === 'Extreme' ? 'h-32 bg-gradient-to-t from-red-600 to-red-400 shadow-[0_0_20px_rgba(239,68,68,0.4)]' :
                                    zone.liquidity_intensity === 'High' ? 'h-24 bg-gradient-to-t from-orange-600 to-orange-400 opacity-90' : 'h-16 bg-gradient-to-t from-yellow-600 to-yellow-400 opacity-80'}`}
                        >
                            <div className="opacity-0 group-hover:opacity-100 absolute -top-12 left-1/2 -translate-x-1/2 bg-black border border-white/10 px-3 py-1.5 rounded shadow-xl text-center min-w-[120px] transition-opacity pointer-events-none z-20 backdrop-blur-md">
                                <div className="text-[10px] text-neutral-400 font-mono">{zone.type}</div>
                                <div className="text-amber-400 font-bold font-mono text-xs">{zone.leverage_tier} Leverage</div>
                            </div>
                        </div>

                        {/* Label */}
                        <div className="text-center">
                            <div className="text-neutral-200 font-mono text-sm font-bold">${zone.price_level.toLocaleString()}</div>
                            <div className={`text-[9px] uppercase tracking-wider ${zone.liquidity_intensity === 'Extreme' ? 'text-red-500' : 'text-amber-500'}`}>
                                {zone.liquidity_intensity} VOL
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-[10px] text-neutral-600 mt-4 text-center max-w-lg mx-auto">
                * "Extreme" zones indicate potential forced liquidations of over-leveraged positions. These often act as "Magnets" for price action.
            </p>
        </div>
    );
}
