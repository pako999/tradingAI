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
            border: 'border-neutral-800',
            bg: 'bg-neutral-900/50',
            button: 'START FREE',
            buttonStyle: 'bg-neutral-800 hover:bg-neutral-700 text-white',
            features: [
                'Real-Time Market Data',
                'Top 10 Crypto Pairs',
                'Daily Sentiment Analysis',
                'Community Access',
                'No Telegram Alerts'
            ],
            checks: [true, true, true, true, false]
        },
        {
            name: 'TRADER',
            price: billingCycle === 'monthly' ? '29' : '24',
            description: 'For active traders',
            color: 'text-amber-400',
            border: 'border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.2)]',
            bg: 'bg-gradient-to-b from-amber-900/20 to-neutral-900/90',
            button: 'GO PRO',
            buttonStyle: 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-bold shadow-lg shadow-amber-900/20',
            badge: 'BEST VALUE',
            features: [
                'AI Trade Signals (Entry/Exit)',
                'Telegram Alerts (100/mo)',
                'Win-Rate History',
                'Risk/Reward Calculator',
                'Priority Support'
            ],
            checks: [true, true, true, true, true]
        },
        {
            name: 'ALPHA',
            price: billingCycle === 'monthly' ? '79' : '65',
            description: 'For elite professionals',
            color: 'text-purple-400',
            border: 'border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.2)]',
            bg: 'bg-gradient-to-b from-purple-900/20 to-neutral-900/90',
            button: 'UNLOCK ALPHA',
            buttonStyle: 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold shadow-lg shadow-purple-900/20',
            badge: 'ELITE ACCESS',
            features: [
                'Unlimited Telegram Alerts',
                'Whale Liquidation Heatmaps',
                'AI Price Forecasts (TFT)',
                'Smart Money Confluence',
                'VIP Concierge Support'
            ],
            checks: [true, true, true, true, true]
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
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 overflow-hidden shadow-2xl"
                >
                    {/* Close Button */}
                    <button onClick={onClose} className="absolute top-6 right-6 text-neutral-500 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>

                    {/* Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">AlphaPulse</span>
                        </h2>
                        <p className="text-neutral-400 mb-8">Choose the plan that fits your trading style.</p>

                        {/* Billing Toggle */}
                        <div className="flex items-center justify-center gap-4">
                            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-white' : 'text-neutral-500'}`}>Monthly</span>
                            <button
                                onClick={() => setBillingCycle(c => c === 'monthly' ? 'annual' : 'monthly')}
                                className="w-14 h-7 bg-neutral-800 rounded-full relative p-1 transition-colors hover:bg-neutral-700"
                            >
                                <motion.div
                                    animate={{ x: billingCycle === 'monthly' ? 0 : 28 }}
                                    className="w-5 h-5 bg-amber-500 rounded-full shadow-sm"
                                />
                            </button>
                            <span className={`text-sm ${billingCycle === 'annual' ? 'text-white' : 'text-neutral-500'}`}>
                                Annual <span className="text-green-400 text-xs ml-1">(Save 20%)</span>
                            </span>
                        </div>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {tiers.map((tier, i) => (
                            <div
                                key={i}
                                className={`relative flex flex-col p-8 rounded-2xl border ${tier.border} ${tier.bg} backdrop-blur-md transition-all hover:transform hover:-translate-y-1`}
                            >
                                {/* Badge if exists */}
                                {tier.badge && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${i === 1 ? 'bg-amber-500 text-black' : 'bg-purple-500 text-white'
                                            }`}>
                                            {tier.badge}
                                        </span>
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <h3 className={`text-lg font-bold mb-2 ${tier.color}`}>{tier.name}</h3>
                                    <div className="flex items-baseline justify-center gap-1 mb-2">
                                        <span className="text-4xl font-bold text-white">${tier.price}</span>
                                        <span className="text-neutral-500 text-sm">/mo</span>
                                    </div>
                                    <p className="text-xs text-neutral-500">{tier.description}</p>
                                </div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {tier.features.map((feat, j) => (
                                        <li key={j} className="flex items-start gap-3 text-sm">
                                            {tier.checks[j] ? (
                                                <Check className={`w-4 h-4 mt-0.5 ${tier.color}`} />
                                            ) : (
                                                <X className="w-4 h-4 mt-0.5 text-neutral-700" />
                                            )}
                                            <span className={tier.checks[j] ? 'text-neutral-300' : 'text-neutral-600'}>
                                                {feat}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full py-3 rounded-xl text-sm tracking-wide transition-all ${tier.buttonStyle}`}>
                                    {tier.button}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-neutral-600 text-xs">
                            Secure payments powered by Stripe. Cancel anytime.
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
