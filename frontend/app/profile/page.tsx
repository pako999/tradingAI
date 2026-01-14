'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { User, Shield, Zap, CreditCard, Key, LogOut } from 'lucide-react';
import PricingModal from '@/components/PricingModal';

export default function ProfilePage() {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [showPricing, setShowPricing] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/');
            } else {
                setSession(session);
            }
            setLoading(false);
        };
        checkAuth();
    }, [router, supabase]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-neutral-500">Loading Profile...</div>;
    if (!session) return null;

    return (
        <main className="min-h-screen bg-black text-white p-6 md:p-12 font-sans relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <header className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl font-black tracking-tighter">
                        MY <span className="text-amber-500">ACCOUNT</span>
                    </h1>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 text-xs font-mono text-opacity-50 text-white hover:text-red-400 transition-colors"
                    >
                        <LogOut className="w-4 h-4" /> SIGN OUT
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* User Info Card */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="glass-panel p-6 border-white/5 flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neutral-800 to-black border border-neutral-700 flex items-center justify-center mb-4">
                                <User className="w-8 h-8 text-neutral-400" />
                            </div>
                            <div className="text-sm font-bold text-white mb-1 truncate w-full">
                                {session.user.email}
                            </div>
                            <div className="text-[10px] text-neutral-500 font-mono mb-6 uppercase">
                                User ID: {session.user.id.slice(0, 8)}...
                            </div>

                            <div className="w-full bg-neutral-900 rounded-lg p-3 border border-white/5 mb-4">
                                <div className="text-[10px] text-neutral-500 uppercase mb-1">Current Plan</div>
                                <div className="text-xl font-black text-neutral-400">FREE TIER</div>
                            </div>

                            <button onClick={() => setShowPricing(true)} className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg text-xs uppercase tracking-widest transition-all">
                                Upgrade Now
                            </button>
                        </div>
                    </div>

                    {/* Settings & Usage */}
                    <div className="md:col-span-2 space-y-6">

                        {/* Security Section */}
                        <div className="glass-panel p-8 border-white/5">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-amber-500" /> Security & Billing
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-white/20 transition-all text-left group">
                                    <div className="mb-3 p-2 bg-neutral-900 w-fit rounded-lg group-hover:text-amber-500 transition-colors text-neutral-500">
                                        <Key className="w-5 h-5" />
                                    </div>
                                    <div className="font-bold text-sm text-neutral-300">Reset Password</div>
                                    <div className="text-[10px] text-neutral-600 mt-1">Send recovery email</div>
                                </button>

                                <button className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-white/20 transition-all text-left group">
                                    <div className="mb-3 p-2 bg-neutral-900 w-fit rounded-lg group-hover:text-purple-500 transition-colors text-neutral-500">
                                        <CreditCard className="w-5 h-5" />
                                    </div>
                                    <div className="font-bold text-sm text-neutral-300">Billing Portal</div>
                                    <div className="text-[10px] text-neutral-600 mt-1">Manage subscriptions</div>
                                </button>
                            </div>
                        </div>

                        {/* Recent Activity (Mock) */}
                        <div className="glass-panel p-8 border-white/5 opacity-50 pointer-events-none">
                            <h3 className="text-lg font-bold text-neutral-500 mb-6 flex items-center gap-2">
                                <Zap className="w-5 h-5" /> Signal Usage
                            </h3>
                            <div className="text-center py-8">
                                <div className="text-sm text-neutral-600">No active signals used today.</div>
                                <div className="text-[10px] text-neutral-700 mt-2">Upgrade to PRO to see detailed analytics.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PricingModal isOpen={showPricing} onClose={() => setShowPricing(false)} />
        </main>
    );
}
