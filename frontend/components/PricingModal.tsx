'use client';

import { useState } from 'react';
import { Check, X, Bell, Zap, Crown, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PricingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

    if (!isOpen) return null;

    const tiers = [
        {
            name: 'ROOKIE',
            price: '0',
            description: 'For casual observers',
            color: 'text-neutral-400',
            border: 'border-white/10',
            bg: 'bg-gradient-to-br from-white/5 to-white/0',
            button: 'START FREE',
            buttonStyle: 'bg-white/10 hover:bg-white/20 text-white border border-white/10',
            features: [
                'Basic AI Market Analysis',
                'Limited Crypto Pairs (Top 10)',
                'Daily Summary Alerts',
                'Community Access',
                'No Telegram Alerts'
            ],
            checks: [true, true, true, true, false]
        },
        {
            name: 'TRADER',
            price: billingCycle === 'monthly' ? '29' : '24',
            description: 'For active traders',
            color: 'text-amber-200',
            border: 'border-amber-500/50',
            bg: 'bg-gradient-to-b from-amber-500/10 to-black',
            button: 'GO PRO',
            buttonStyle: 'bg-gradient-to-r from-amber-600 to-amber-400 hover:from-amber-500 hover:to-amber-300 text-black font-bold shadow-[0_0_20px_rgba(245,158,11,0.4)]',
            badge: 'BEST VALUE',
            features: [
                'Real-time AI Trading Signals',
                'Advanced Backtesting Engine',
                'Unlimited Crypto Pairs',
                'Priority Support',
                'Customizable Dashboards',
                'Volatility Alerts'
            ],
            checks: [true, true, true, true, true, true]
        },
        {
            name: 'ALPHA',
            price: billingCycle === 'monthly' ? '79' : '65',
            description: 'For elite professionals',
            color: 'text-purple-200',
            border: 'border-purple-500/50',
            bg: 'bg-gradient-to-b from-purple-600/10 to-black',
            button: 'UNLOCK ALPHA',
            buttonStyle: 'bg-gradient-to-r from-purple-600 to-fuchsia-400 hover:from-purple-500 hover:to-fuchsia-300 text-white font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)]',
            badge: 'ELITE ACCESS',
            features: [
                'Whale Wallet Heatmaps & Tracking',
                'Exclusive AI Price Forecasts',
                'Institutional Grade Data Feeds',
                'VIP Concierge Support',
                'Early Access to New Features',
                'Dedicated Account Manager',
                'Smart Contract Analysis'
            ],
            checks: [true, true, true, true, true, true, true]
        }
    ];

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                />

                {/* Modal */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-6xl bg-[#0a0a0a] ring-1 ring-white/10 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl"
                >
                    {/* Close Button */}
                    <button onClick={onClose} className="absolute top-6 right-6 text-neutral-500 hover:text-white transition-colors z-50">
                        <X className="w-6 h-6" />
                    </button>

                    {/* Header */}
                    <div className="text-center mb-16 relative">
                        {/* Glows */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

                        <h2 className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-200">AlphaPulse</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-neutral-400 font-light tracking-[0.2em] uppercase">PREMIUM ACCESS</p>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 items-end">
                        {tiers.map((tier, i) => (
                            <div
                                key={i}
                                className={`group relative flex flex-col p-8 rounded-3xl border ${tier.border} ${tier.bg} backdrop-blur-xl transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl ${i === 0 ? 'h-[500px]' : 'h-[580px]'}`}
                            >
                                {/* Diagonal Badge Sashes */}
                                {tier.badge && (
                                    <div className="absolute -top-[1px] -right-[1px] w-32 h-32 overflow-hidden rounded-tr-3xl pointer-events-none">
                                        <div className={`absolute top-[20px] -right-[40px] w-[150px] rotate-45 text-center text-[10px] font-black uppercase tracking-widest py-1 shadow-lg ${i === 1
                                                ? 'bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 text-black'
                                                : 'bg-gradient-to-r from-fuchsia-400 via-purple-500 to-fuchsia-400 text-white'
                                            }`}>
                                            {tier.badge}
                                        </div>
                                    </div>
                                )}

                                {/* Card Header */}
                                <div className="text-center mb-8 relative">
                                    <h3 className={`text-2xl font-bold tracking-wide mb-1 ${tier.color} uppercase`}>{tier.name}</h3>
                                    <p className="text-xs text-neutral-500 mb-6 font-mono">({tier.name === 'ROOKIE' ? 'Free' : i === 1 ? 'Pro' : 'Elite'})</p>

                                    {/* Icon */}
                                    <div className="mb-6 flex justify-center">
                                        {i === 0 && <div className="w-16 h-16"><Shield className="w-full h-full text-neutral-600" strokeWidth={1.5} /></div>}
                                        {i === 1 && <div className="w-20 h-20 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]"><Zap className="w-full h-full text-amber-400 fill-amber-400" /></div>}
                                        {i === 2 && <div className="w-20 h-20 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]"><Crown className="w-full h-full text-purple-400 fill-purple-400" /></div>}
                                    </div>

                                    <div className="flex flex-col items-center justify-center gap-0 mb-2">
                                        {i === 0 ? (
                                            <span className="text-4xl font-black text-white tracking-tight uppercase">FREE</span>
                                        ) : (
                                            <>
                                                <span className={`text-6xl font-black text-white tracking-tighter drop-shadow-xl`}>${tier.price}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-neutral-500 text-xs font-medium">/mo</span>
                                                    {billingCycle === 'annual' && <span className="text-neutral-600 text-xs line-through decoration-red-500/50">${i === 1 ? '49' : '99'}/mo</span>}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    {i === 0 && <p className="text-xs text-neutral-500 mt-2">Forever</p>}
                                </div>

                                {/* Features */}
                                <div className="flex-1 mb-8 overflow-y-auto custom-scrollbar">
                                    <ul className="space-y-3">
                                        {tier.features.map((feat, j) => (
                                            <li key={j} className="flex items-start gap-3 text-xs md:text-sm group/item">
                                                <div className={`mt-0.5 rounded-full p-0.5 flex-shrink-0 ${tier.checks[j] ? 'bg-white/10' : ''}`}>
                                                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                                </div>
                                                <span className="text-neutral-300 font-medium">
                                                    {feat}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button className={`w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all transform hover:scale-[1.02] active:scale-95 ${tier.buttonStyle}`}>
                                    {tier.button}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 flex justify-center">
                        <div className="bg-neutral-900/80 rounded-full p-1 border border-white/10 flex items-center gap-2 backdrop-blur-md">
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${billingCycle === 'monthly' ? 'bg-blue-600 text-white shadow-lg' : 'text-neutral-400 hover:text-white'}`}
                            >
                                Monthly Billing
                            </button>
                            <button
                                onClick={() => setBillingCycle('annual')}
                                className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${billingCycle === 'annual' ? 'bg-blue-600 text-white shadow-lg' : 'text-neutral-400 hover:text-white'}`}
                            >
                                Annual Billing <span className="text-green-300 ml-1">(Save 20%)</span>
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 text-center flex justify-center gap-6 text-[10px] text-neutral-600 uppercase tracking-widest">
                        <a href="#" className="hover:text-neutral-400">Terms of Service</a>
                        <a href="#" className="hover:text-neutral-400">Privacy Policy</a>
                        <a href="#" className="hover:text-neutral-400">Help Center</a>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
