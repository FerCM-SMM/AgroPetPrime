'use client';

import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SupabaseProvider } from '@/components/providers/supabase-provider';
import { CartProvider } from '@/hooks/use-cart';
import { AuthProvider } from '@/hooks/use-auth';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/providers/theme-provider';

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <SupabaseProvider>
          <AuthProvider>
            <CartProvider>
              {children}
              <Toaster position="top-right" />
            </CartProvider>
          </AuthProvider>
        </SupabaseProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
