'use client';

import { type ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient, User, Session } from '@supabase/supabase-js';

type SupabaseContextType = {
  supabase: SupabaseClient;
  user: User | null;
  session: Session | null;
  loading: boolean;
};

const SupabaseContext = createContext<SupabaseContextType | null>(null);

export function useSupabase() {
  const ctx = useContext(SupabaseContext);
  if (!ctx) throw new Error('useSupabase must be used within SupabaseProvider');
  return ctx;
}

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'
    )
  );
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  return (
    <SupabaseContext.Provider value={{ supabase, user, session, loading }}>
      {children}
    </SupabaseContext.Provider>
  );
}
