'use client';
import { AnalysisResult } from '@/lib/api';
import { Globe, BarChart2, Zap } from 'lucide-react';

interface Props {
    data: AnalysisResult;
}

export default function LogicBreakdown({ data }: Props) {
    // Helper to convert sentiment strings to 0-100 scores for visualization
    const getScore = (val: string) => {
        if (!val) return 50;
        const v = val.toLowerCase();
        if (v.includes('bullish') || v.includes('buying') || v.includes('high')) return 85;
        if (v.includes('bearish') || v.includes('selling') || v.includes('low')) return 30;
        return 50;
    };

    const sections = [
        {
            title: "Macro Consensus",
            icon: Globe,
            // Map new API fields
            score: getScore(data.macro.trend),
            desc: `Trend: ${data.macro.trend} | Volatility: ${data.macro.volatility}`,
            weight: "30%"
        },
        {
            title: "On-Chain Whales",
            icon: BarChart2,
            score: getScore(data.onchain.net_flow),
            desc: `Net Flow: ${data.onchain.net_flow} | Activity: ${data.onchain.whale_activity}`,
            weight: "40%"
        },
        {
            title: "Derivatives Data",
            icon: Zap,
            score: data.derivatives.long_short_ratio * 50, // simple heuristic
            desc: `L/S Ratio: ${data.derivatives.long_short_ratio}`,
            weight: "30%"
        }
    ];

    return (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mt-6">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                AI LOGIC BREAKDOWN
            </h3>

            <div className="space-y-6">
                {sections.map((s, i) => (
                    <div key={i} className="group">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-3 text-neutral-300">
                                <s.icon className="w-4 h-4 text-neutral-500" />
                                <span className="font-mono text-sm">{s.title}</span>
                            </div>
                            <div className="text-xs text-neutral-600 font-mono">Weight: {s.weight}</div>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-1000 ${s.score > 60 ? 'bg-green-500' : s.score < 40 ? 'bg-red-500' : 'bg-yellow-500'}`}
                                style={{ width: `${s.score}%` }}
                            />
                        </div>

                        <div className="flex justify-between mt-1.5">
                            <span className="text-[10px] text-neutral-500 uppercase">{s.desc}</span>
                            <span className={`text-[10px] font-bold ${s.score > 60 ? 'text-green-500' : s.score < 40 ? 'text-red-500' : 'text-yellow-500'}`}>
                                {s.score > 60 ? 'BULLISH' : s.score < 40 ? 'BEARISH' : 'NEUTRAL'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
