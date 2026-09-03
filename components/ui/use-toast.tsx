'use client';

import { createContext, useContext, useState } from 'react';
import { toast, type ToastOptions } from 'sonner';

interface Toast {
  id: string;
  title?: string;
  description?: string;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <ToastContext.Provider value={{ toast: (options) => toast(options) }}>
      {children}
    </ToastContext.Provider>
  );
}
