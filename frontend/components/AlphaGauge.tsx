'use client';

import { motion } from 'framer-motion';

interface AlphaGaugeProps {
    score: number;
    sentiment: string;
}

export default function AlphaGauge({ score, sentiment }: AlphaGaugeProps) {
    // Convert score (0-100) to rotation degrees (-90 to 90)
    const rotation = (score / 100) * 180 - 90;

    // Determine color based on score
    const getColor = (s: number) => {
        if (s >= 80) return '#22c55e'; // Green
        if (s >= 60) return '#84cc16'; // Lime
        if (s >= 40) return '#eab308'; // Yellow
        if (s >= 20) return '#f97316'; // Orange
        return '#ef4444'; // Red
    };

    const color = getColor(score);

    return (
        <div className="flex flex-col items-center justify-center p-6 relative">
            <div className="w-64 h-32 overflow-hidden relative">
                {/* Gauge Background */}
                <div className="w-64 h-64 rounded-full border-[12px] border-slate-700/50 box-border absolute top-0 left-0" />

                {/* Needle */}
                <motion.div
                    className="w-1 h-32 bg-white absolute left-1/2 bottom-0 origin-bottom"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: rotation }}
                    transition={{ type: "spring", stiffness: 60, damping: 15 }}
                    style={{ marginLeft: '-2px' }}
                >
                    <div className={`w-4 h-4 rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_${color}] bg-white`} />
                </motion.div>
            </div>

            <div className="mt-4 text-center z-10">
                <h3 className="text-4xl font-bold font-mono tracking-tighter text-white" style={{ textShadow: `0 0 20px ${color}80` }}>
                    {score.toFixed(1)}
                </h3>
                <p className="text-sm uppercase tracking-widest text-slate-400 mt-1">{sentiment}</p>
            </div>

            {/* Decorative Glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 blur-3xl -z-10 opacity-30"
                style={{ backgroundColor: color }}
            />
        </div>
    );
}
