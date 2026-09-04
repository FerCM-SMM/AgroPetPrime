'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Gift, Mail, CheckCircle2 } from 'lucide-react';

export function ClubNewsletter() {
  const [contact, setContact] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contact.trim()) {
      toast.success('🎉 Parabéns! Cupom PRIME10 ativado com sucesso para sua primeira compra.');
      setContact('');
    }
  };

  return (
    <section className="w-full py-16 bg-[#FFFDF8]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-[#12c0e0] via-[#0ea5c2] to-[#3591A1] rounded-3xl p-8 md:p-12 text-[#20241F] shadow-lg relative overflow-hidden border border-[#12c0e0]/30">
          {/* Subtle background glow */}
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-white/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#20241F] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 shadow-xs">
              <Gift className="w-3.5 h-3.5 text-[#12c0e0]" />
              <span>Clube de Vantagens AgroPet Pr1me</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#20241F] leading-tight mb-3">
              Economize 10% na sua primeira compra de ração ou medicamento
            </h3>

            <p className="text-sm sm:text-base text-[#20241F]/85 mb-8 leading-relaxed font-normal">
              Cadastre seu WhatsApp ou e-mail para receber cupons exclusivos, avisos de vacinas anuais e ofertas de saca fechada antes de todo mundo em Sorocaba.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-2.5 max-w-lg">
              <div className="flex-1 bg-white rounded-xl px-4 py-3 flex items-center shadow-sm border border-white/60">
                <Mail className="w-4 h-4 text-gray-400 mr-2.5 shrink-0" />
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Digite seu e-mail ou WhatsApp"
                  className="w-full bg-transparent text-[#20241F] placeholder:text-gray-400 outline-none text-xs sm:text-sm font-medium"
                />
              </div>
              <button
                type="submit"
                className="bg-[#20241F] hover:bg-[#E06F12] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap shadow-md"
              >
                Quero 10% OFF
              </button>
            </form>

            <div className="flex items-center gap-2 mt-4 text-xs text-[#20241F]/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
              <span>Sem spam. Apenas descontos reais e lembretes de saúde para Sorocaba e chácaras da região.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}