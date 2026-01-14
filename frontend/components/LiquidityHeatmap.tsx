'use client';

import { LiquidityZone } from '@/lib/api';

interface Props {
    data: LiquidityZone[];
}

export default function LiquidityHeatmap({ data }: Props) {
    if (!data || data.length === 0) return (
        <div className="glass-panel p-6 flex items-center justify-center min-h-[300px]">
            <div className="text-neutral-500 text-xs animate-pulse">Scanning Orderbooks...</div>
        </div>
    );

    // Sort by price descending
    const sortedZones = [...data].sort((a, b) => b.price_level - a.price_level).slice(0, 15);

    return (
        <div className="glass-panel p-6 relative overflow-hidden group">
            <h3 className="text-xs font-bold text-neutral-500 mb-6 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
                LIQUIDITY HEATMAP
            </h3>

            <div className="flex items-end justify-between gap-1 h-32 mt-8">
                {sortedZones.map((zone, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 flex-1 group/bar relative">
                        {/* Heat Bar */}
                        <div
                            className={`w-full rounded-t-sm transition-all duration-500 
                ${(zone.intensity || 0) > 80 ? 'h-full bg-gradient-to-t from-red-600 to-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]' :
                                    (zone.intensity || 0) > 50 ? 'h-2/3 bg-gradient-to-t from-orange-600 to-orange-400 opacity-90' : 'h-1/3 bg-gradient-to-t from-yellow-600 to-yellow-400 opacity-80'}`}
                        >
                            <div className="opacity-0 group-hover/bar:opacity-100 absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-neutral-900 border border-white/10 px-3 py-2 rounded shadow-xl text-center min-w-[120px] pointer-events-none z-20 backdrop-blur-md">
                                <div className="text-[10px] text-neutral-400 font-mono uppercase mb-1">{zone.type} WALL</div>
                                <div className="text-xs font-bold text-white mb-1">
                                    ${zone.price_level.toLocaleString()}
                                </div>
                                <div className="text-[10px] mt-1 text-white/50 border-t border-white/10 pt-1">
                                    Vol: ${(zone.volume_estimated / 1000000).toFixed(1)}M
                                    <div className={`text-xs font-bold ${(zone.intensity || 0) > 80 ? 'text-red-400' : 'text-yellow-400'}`}>
                                        {(zone.intensity || 0) > 80 ? 'Extreme' : 'Moderate'} ({zone.intensity}%)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between mt-4 text-[10px] text-neutral-600 font-mono">
                <span>${sortedZones[sortedZones.length - 1]?.price_level.toLocaleString()}</span>
                <span>${sortedZones[0]?.price_level.toLocaleString()}</span>
            </div>
        </div>
    );
}
