'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function CookieBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const accepted = localStorage.getItem('cookies-accepted');
    if (accepted) setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#000000] text-white p-4 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm">Utilizamos cookies para melhorar sua experiencia. Ao usar nosso site, voce concorda.</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-black" onClick={() => { setVisible(false); localStorage.setItem('cookies-accepted', 'true'); }}>
            Rejeitar
          </Button>
          <Button size="sm" className="bg-[#12c0e0] text-black hover:bg-[#0ea5e9]" onClick={() => { setVisible(false); localStorage.setItem('cookies-accepted', 'true'); }}>
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  );
}
