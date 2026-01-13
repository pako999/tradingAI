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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mx-auto mt-8">
            {components.map((c, i) => (
                <div key={i} className="glass-panel p-5 hover:bg-slate-800/40 transition-colors group">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2 rounded-lg bg-slate-800/50 text-sky-400 group-hover:text-sky-300 group-hover:scale-110 transition-all">
                            <c.icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs text-slate-500 font-mono">WEIGHT: {c.weight}</span>
                    </div>

                    <h4 className="text-slate-200 font-medium mb-1">{c.title}</h4>
                    <p className="text-sm text-slate-400 mb-4 h-10 line-clamp-2 leading-relaxed">
                        {c.desc}
                    </p>

                    <div className="flex items-end gap-2">
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-sky-500 rounded-full transition-all duration-1000"
                                style={{ width: `${c.score}%` }}
                            />
                        </div>
                        <span className="text-xs font-bold text-sky-400 font-mono w-8 text-right">{c.score.toFixed(0)}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
