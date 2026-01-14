'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { X, Mail, ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');
    const supabase = createClient();

    const handleMagicLink = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) throw error;
            setSent(true);
        } catch (err: any) {
            setError(err.message || 'Failed to send login link');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            >
                <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
                    <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>

                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                        <p className="text-neutral-400 text-sm">Enter your email to receive a secure Magic Link.</p>
                    </div>

                    {!sent ? (
                        <form onSubmit={handleMagicLink} className="space-y-4">
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-neutral-500" />
                                <input
                                    type="email"
                                    required
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                                />
                            </div>

                            {error && (
                                <div className="text-red-400 text-xs bg-red-400/10 p-2 rounded border border-red-400/20 text-center">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold py-3 rounded-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? 'Sending...' : 'Send Magic Link'}
                                {!loading && <ArrowRight className="w-4 h-4" />}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-6 animate-in zoom-in duration-300">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                                <Check className="w-8 h-8 text-green-500" />
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">Check your inbox!</h3>
                            <p className="text-neutral-400 text-sm mb-6">
                                We sent a secure login link to <br /><span className="text-white">{email}</span>
                            </p>
                            <button
                                onClick={onClose}
                                className="text-neutral-500 hover:text-white text-xs underline"
                            >
                                Close Window
                            </button>
                        </div>
                    )}

                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <p className="text-[10px] text-neutral-600">
                            By clicking continue, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
