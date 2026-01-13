import { Activity, BarChart3, Globe } from 'lucide-react';
import { AnalysisResult } from '@/lib/api';

export default function LogicBreakdown({ data }: { data: AnalysisResult }) {
    const components = [
        {
            title: "Macro Consensus",
            icon: Globe,
            score: data.components.macro.score,
            desc: data.components.macro.desc,
            weight: "30%"
        },
        {
            title: "On-Chain Activity",
            icon: Activity,
            score: data.components.onchain.score,
            desc: data.components.onchain.desc,
            weight: "40%"
        },
        {
            title: "Derivatives Market",
            icon: BarChart3,
            score: data.components.derivatives.score,
            desc: data.components.derivatives.desc,
            weight: "30%"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl mx-auto mt-8">
            {components.map((c, i) => (
                <div key={i} className="glass-panel p-6 hover:bg-neutral-900/60 transition-all group border-amber-500/10 hover:border-amber-500/30 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 rounded-xl bg-neutral-900/80 text-amber-500 group-hover:text-amber-300 group-hover:scale-110 transition-all shadow-inner shadow-black/50 border border-white/5">
                            <c.icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase border border-neutral-800 px-2 py-0.5 rounded-full">Weight: {c.weight}</span>
                    </div>

                    <h4 className="text-neutral-200 font-bold mb-2 tracking-wide text-sm">{c.title}</h4>
                    <p className="text-xs text-neutral-500 mb-6 h-8 line-clamp-2 leading-relaxed">
                        {c.desc}
                    </p>

                    <div className="flex items-end gap-3">
                        <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                                style={{ width: `${c.score}%` }}
                            />
                        </div>
                        <span className="text-sm font-bold text-amber-500 font-mono w-8 text-right tabular-nums">{c.score.toFixed(0)}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
