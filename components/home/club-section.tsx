'use client';

import { useState } from 'react';
import { Tag, Sparkles, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export function ClubSection() {
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success('Cupom de 10% OFF enviado com sucesso! Verifique seu contato.');
    }, 600);
  };

  return (
    <section id="clube" className="py-20 bg-black text-white relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black border border-[#20BEE2]/40 rounded-3xl p-8 sm:p-14 text-center shadow-2xl relative">
          <div className="inline-flex items-center gap-2 bg-[#20BEE2] text-black text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 shadow-md">
            <Tag className="w-3.5 h-3.5" />
            <span>Clube Prime Exclusivo</span>
          </div>

          <h2 className="font-['Archivo_Black',sans-serif] text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-white mb-4 leading-tight max-w-3xl mx-auto">
            Economize <span className="text-[#20BEE2]">10%</span> na sua primeira compra de ração ou medicamento
          </h2>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Cadastre seu WhatsApp ou e-mail para receber cupons exclusivos, avisos de vacinas anuais e ofertas de saca fechada antes de todo mundo em Sorocaba.
          </p>

          {submitted ? (
            <div className="bg-neutral-900 border border-[#20BEE2] rounded-2xl p-6 max-w-md mx-auto flex items-center justify-center gap-3 text-white">
              <CheckCircle2 className="w-6 h-6 text-[#51FFE6]" />
              <div className="text-left">
                <span className="font-black text-sm block">Cupom PRIMEVIP10 Ativado!</span>
                <span className="text-xs text-gray-400">Apresente este código no WhatsApp ou na loja física.</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Digite seu WhatsApp com DDD ou e-mail..."
                  className="w-full bg-neutral-950 border border-neutral-700 text-white placeholder:text-gray-500 rounded-full px-6 py-4 text-xs sm:text-sm outline-none focus:border-[#20BEE2] transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-[#20BEE2] hover:bg-[#51FFE6] text-black font-black text-xs sm:text-sm px-8 py-4 rounded-full transition-all hover:scale-105 active:scale-95 shrink-0 shadow-lg cursor-pointer"
                >
                  {loading ? 'Cadastrando...' : 'Quero 10% OFF'}
                </button>
              </div>

              <p className="text-[11px] text-gray-400 mt-4 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#51FFE6]" />
                <span>Sem spam. Apenas descontos reais e lembretes de saúde para Sorocaba e chácaras da região.</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
