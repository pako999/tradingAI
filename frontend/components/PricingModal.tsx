'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Bell, Zap, Brain, Shield, TrendingUp } from 'lucide-react';

interface PricingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

    if (!isOpen) return null;

    const tiers = [
        {
            name: "ROOKIE",
            price: "FREE",
            description: "Forever",
            features: [
                "Basic AI Market Analysis",
                "Limited Crypto Pairs (Top 10)",
                "Daily Summary Alerts",
                "Community Access",
            ],
            icon: <TrendingUp className="w-12 h-12 text-neutral-400 group-hover:text-white transition-colors" />,
            button: "START FREE",
            buttonStyle: "border border-neutral-600 hover:bg-neutral-800 text-white",
            bg: "bg-neutral-900/50 backdrop-blur-xl",
            border: "border-white/10",
            color: "text-neutral-400",
            badge: null
        },
        {
            name: "TRADER",
            price: billingCycle === 'monthly' ? "$29" : "$24",
            description: "/mo",
            features: [
                "Real-time AI Trading Signals",
                "Advanced Backtesting Engine",
                "Unlimited Crypto Pairs",
                "Priority Support",
                "Customizable Dashboards",
                "Volatility Alerts"
            ],
            icon: <Zap className="w-12 h-12 text-amber-400 fill-amber-400/20 group-hover:scale-110 transition-transform" />,
            button: "GO PRO",
            buttonStyle: "bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)]",
            bg: "bg-gradient-to-b from-amber-900/20 to-black/80 backdrop-blur-xl",
            border: "border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.15)]",
            color: "text-amber-400",
            badge: "BEST VALUE"
        },
        {
            name: "ALPHA",
            price: billingCycle === 'monthly' ? "$79" : "$65",
            description: "/mo",
            features: [
                "Whale Wallet Heatmaps & Tracking",
                "Exclusive AI Price Forecasts",
                "Institutional Grade Data Feeds",
                "VIP Concierge Support",
                "Early Access to New Features",
                "Dedicated Account Manager",
                "Smart Contract Analysis"
            ],
            icon: (
                <div className="relative">
                    <Brain className="w-12 h-12 text-purple-400 group-hover:animate-pulse transition-all" />
                    <div className="absolute -top-2 -right-2"><Shield className="w-4 h-4 text-purple-200 fill-purple-400" /></div>
                </div>
            ),
            button: "UNLOCK ALPHA",
            buttonStyle: "bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]",
            bg: "bg-gradient-to-b from-purple-900/20 to-black/80 backdrop-blur-xl",
            border: "border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)]",
            color: "text-purple-400",
            badge: "ELITE ACCESS"
        }
    ];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative max-w-6xl w-full bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">Alpha</span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Pulse</span>
                        </h2>
                        <div className="text-xl tracking-[0.3em] font-light text-neutral-400 uppercase">Premium Access</div>
                        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Billing Toggle */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-neutral-900/80 p-1 rounded-full flex items-center text-sm font-bold border border-white/10">
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-6 py-2 rounded-full transition-all ${billingCycle === 'monthly' ? 'bg-neutral-700 text-white shadow-lg' : 'text-neutral-500 hover:text-white'}`}
                            >
                                Monthly Billing
                            </button>
                            <button
                                onClick={() => setBillingCycle('annual')}
                                className={`px-6 py-2 rounded-full transition-all flex items-center gap-2 ${billingCycle === 'annual' ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg' : 'text-neutral-500 hover:text-white'}`}
                            >
                                Annual Billing <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-white font-normal">Save 20%</span>
                            </button>
                        </div>
                    </div>

                    {/* Tiers Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {tiers.map((tier) => (
                            <div
                                key={tier.name}
                                className={`group relative rounded-2xl border ${tier.border} ${tier.bg} p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02] overflow-hidden`}
                            >
                                {/* Corner Ribbon Badges */}
                                {tier.badge === "BEST VALUE" && (
                                    <div className="absolute top-0 right-0 overflow-hidden w-32 h-32 pointer-events-none">
                                        <div className="absolute top-[24px] right-[-34px] rotate-[45deg] bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black text-[10px] font-black tracking-widest py-1.5 w-[120px] shadow-lg text-center z-10 border-y border-white/20">
                                            BEST VALUE
                                        </div>
                                    </div>
                                )}
                                {tier.badge === "ELITE ACCESS" && (
                                    <div className="absolute top-0 left-0 overflow-hidden w-32 h-32 pointer-events-none">
                                        <div className="absolute top-[24px] left-[-34px] -rotate-[45deg] bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-700 text-white text-[10px] font-black tracking-widest py-1.5 w-[120px] shadow-lg text-center z-10 border-y border-white/20">
                                            ELITE ACCESS
                                        </div>
                                    </div>
                                )}

                                <h3 className={`text-2xl font-black ${tier.color} tracking-tighter mb-1`}>{tier.name}</h3>
                                <p className="text-sm text-neutral-500 mb-6">({tier.name === 'ALPHA' ? 'Elite' : tier.name === 'TRADER' ? 'Pro' : 'Free'})</p>

                                <div className="mb-8 transform group-hover:scale-110 transition-transform duration-500">
                                    {tier.icon}
                                </div>

                                <div className="mb-8">
                                    <span className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400`}>{tier.price}</span>
                                    <span className="text-neutral-500 text-sm">{tier.description}</span>
                                    {billingCycle === 'annual' && tier.price !== 'FREE' && (
                                        <div className="text-xs text-green-400 mt-1 line-through opacity-60">
                                            {tier.name === 'TRADER' ? '$49/mo' : '$99/mo'}
                                        </div>
                                    )}
                                </div>

                                <ul className="space-y-4 mb-8 w-full text-left">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-neutral-300 group-hover:text-white transition-colors">
                                            <div className={`mt-0.5 p-0.5 rounded-full ${tier.name === 'ROOKIE' ? 'bg-neutral-800' : 'bg-green-500/20'}`}>
                                                {tier.name === 'ROOKIE' ? <div className="w-3 h-3 rounded-full bg-neutral-600" /> : <Check className="w-3 h-3 text-green-400" />}
                                            </div>
                                            <span className="leading-tight">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full py-4 rounded-xl text-sm font-black tracking-widest transition-all uppercase mt-auto ${tier.buttonStyle}`}>
                                    {tier.button}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-12 text-center text-xs text-neutral-600 flex justify-center gap-6">
                        <a href="#" className="hover:text-neutral-400 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-neutral-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-neutral-400 transition-colors">Help Center</a>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
