'use client';

import { createClient } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import { User, LogIn, Crown } from 'lucide-react';
import { Session, AuthChangeEvent } from '@supabase/supabase-js';

export default function AuthButton() {
    const [session, setSession] = useState<Session | null>(null);
    const supabase = createClient();

    useEffect(() => {
        // Get initial session
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
        };
        getSession();

        // Listen for changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    const handleLogin = async () => {
        // For demo/dev purposes, we might not have keys set. 
        // This would trigger the real Supabase OAuth flow.
        console.log("Triggering Supabase Login...");
        await supabase.auth.signInWithOAuth({
            provider: 'github', // or google
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        });
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    if (!session) {
        return (
            <button
                onClick={handleLogin}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white hover:border-amber-500/50 transition-all font-mono text-xs"
            >
                <LogIn className="w-3 h-3" />
                CONNECT
            </button>
        );
    }

    return (
        <div className="flex items-center gap-4">
            {/* Upgrade Button (Mock logic for now, assumes everyone is FREE tier initially) */}
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-600 text-white font-bold hover:bg-amber-500 transition-all font-mono text-xs shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                <Crown className="w-3 h-3 fill-current" />
                UPGRADE PRO
            </button>

            <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-neutral-500 hover:text-neutral-300 transition-colors text-xs font-mono"
            >
                SIGNOUT
            </button>
        </div>
    );
}
