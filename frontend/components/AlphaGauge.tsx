'use client';

import { motion } from 'framer-motion';

interface AlphaGaugeProps {
    score: number;
    sentiment: string;
}

export default function AlphaGauge({ score, sentiment }: AlphaGaugeProps) {
    // Convert score (0-100) to rotation degrees (-90 to 90)
    const rotation = (score / 100) * 180 - 90;

    // Determine color based on score (Gold/Amber Spectrum)
    const getColor = (s: number) => {
        if (s >= 80) return '#fbbf24'; // Amber-400 (Bullish)
        if (s >= 60) return '#d97706'; // Amber-600
        if (s >= 40) return '#b45309'; // Amber-700
        if (s >= 20) return '#92400e'; // Amber-800
        return '#78350f'; // Amber-900 (Bearish)
    };

    const color = getColor(score);

    return (
        <div className="flex flex-col items-center justify-center p-6 relative">
            <div className="w-64 h-32 overflow-hidden relative">
                {/* Gauge Background */}
                <div className="w-64 h-64 rounded-full border-[12px] border-neutral-800 box-border absolute top-0 left-0" />

                {/* Needle */}
                <motion.div
                    className="w-1 h-32 bg-amber-100 absolute left-1/2 bottom-0 origin-bottom"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: rotation }}
                    transition={{ type: "spring", stiffness: 60, damping: 15 }}
                    style={{ marginLeft: '-2px' }}
                >
                    <div className={`w-4 h-4 rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_${color}] bg-amber-50`} />
                </motion.div>
            </div>

            <div className="mt-4 text-center z-10">
                <h3 className="text-4xl font-bold font-mono tracking-tighter text-amber-50" style={{ textShadow: `0 0 30px ${color}` }}>
                    {score.toFixed(1)}
                </h3>
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mt-2 font-bold">{sentiment}</p>
            </div>

            {/* Decorative Glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 blur-3xl -z-10 opacity-30"
                style={{ backgroundColor: color }}
            />
        </div>
    );
}
