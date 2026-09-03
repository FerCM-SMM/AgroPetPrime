'use client';

import { useState } from 'react';
import { toast } from 'sonner';

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
    <section className="w-full py-16 bg-[#f8f9ff]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-[#00c0e3] via-[#00A8C7] to-[#006398] rounded-[36px] p-8 md:p-14 text-[#0B0F17] shadow-xl relative overflow-hidden">
          {/* Decorative subtle paw pattern */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none flex items-center justify-center">
            <span className="material-symbols-outlined text-[260px] text-white select-none">pets</span>
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#0B0F17] text-white text-[11px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider mb-4">
              <span className="material-symbols-outlined text-[16px] text-[#00c0e3]">card_giftcard</span>
              <span>Clube de Benefícios Prime</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B0F17] leading-tight mb-3">
              Ganhe 10% OFF na sua primeira compra de ração ou medicamento!
            </h3>

            <p className="text-sm sm:text-base text-[#0B0F17]/85 mb-8 leading-relaxed font-medium">
              Cadastre seu WhatsApp ou e-mail para receber cupons exclusivos, avisos de vacinas anuais e ofertas de saca fechada antes de todo mundo.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-2 max-w-lg">
              <div className="flex-1 bg-white rounded-full px-4 py-3 flex items-center shadow-xs border border-white/40">
                <span className="material-symbols-outlined text-gray-400 mr-2">mail</span>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Digite seu melhor e-mail ou telefone"
                  className="w-full bg-transparent text-[#0B0F17] placeholder:text-gray-500 outline-none text-xs sm:text-sm font-medium"
                />
              </div>
              <button
                type="submit"
                className="bg-[#0B0F17] hover:bg-gray-800 text-white text-xs font-extrabold px-7 py-3 rounded-full transition-all whitespace-nowrap shadow-md hover-lift active-press"
              >
                Quero 10% OFF
              </button>
            </form>

            <span className="text-[11px] text-[#0B0F17]/75 mt-3 block font-semibold">
              Sem spam. Apenas promoções reais e lembretes de saúde para Sorocaba e região.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}