'use client';

import { createClient } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import { User, LogIn, Crown } from 'lucide-react';
import { Session, AuthChangeEvent } from '@supabase/supabase-js';
import LoginModal from './LoginModal';
import Link from 'next/link';

export default function AuthButton() {
    const [session, setSession] = useState<Session | null>(null);
    const [showLogin, setShowLogin] = useState(false);
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

    const handleLogin = () => {
        setShowLogin(true);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    if (!session) {
        return (
            <>
                <button
                    onClick={handleLogin}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white hover:border-amber-500/50 transition-all font-mono text-xs"
                >
                    <LogIn className="w-3 h-3" />
                    CONNECT
                </button>
                <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
            </>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <Link href="/profile">
                <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-amber-500 transition-all font-mono text-xs group">
                    <User className="w-3 h-3 group-hover:text-amber-500" />
                    MY PROFILE
                </button>
            </Link>
        </div>
    );
}
