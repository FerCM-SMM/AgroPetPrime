'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, ArrowRight, MessageCircle } from 'lucide-react';

export function HomeFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Qual é o prazo e o valor do frete para Sorocaba e região?',
      a: 'O frete é grátis para compras acima de R$ 149,00 em Sorocaba e Votorantim. Pedidos confirmados até as 13h são entregues no mesmo dia. Para chácaras e propriedades rurais, combinamos o melhor horário direto no WhatsApp.',
    },
    {
      q: 'Quais são as formas de pagamento aceitas?',
      a: 'Aceitamos Pix (com aprovação imediata e 5% de cashback), Cartões de Crédito em até 6x sem juros (ou 12x) e pagamento no ato da entrega (maquininha de cartão ou dinheiro) em Sorocaba.',
    },
    {
      q: 'Como funciona a compra com receita médica veterinária?',
      a: 'Você pode enviar a foto da receita diretamente no nosso WhatsApp. Nossa equipe veterinária confere a dosagem, laboratório recomendado e faz a separação imediata dos medicamentos.',
    },
    {
      q: 'Vocês entregam sacarias grandes de ração para chácaras e haras?',
      a: 'Sim! Temos estoque amplo e logística para grandes volumes de sacos de 15kg e 20kg para cães e gatos, além de nutrição pesada equina (sacos de 25kg) e insumos para aves e cavalos.',
    },
    {
      q: 'Como funciona a política de troca e satisfação garantida?',
      a: 'Trabalhamos com marcas que possuem programa de 100% de satisfação (Premier, Royal Canin, etc). Se o seu pet não se adaptar ao sabor ou grão nos primeiros dias, realizamos a troca ou reembolso sem burocracia.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-white text-black border-b border-neutral-100">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-[#20BEE2] bg-[#20BEE2]/10 px-4 py-1.5 rounded-full mb-3">
            Dúvidas Frequentes
          </span>
          <h2 className="font-['Archivo_Black',sans-serif] text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-black">
            Tem dúvidas? Temos as respostas.
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3 font-normal">
            Esclareça as principais dúvidas sobre pedidos, frete, pagamentos e atendimento veterinário.
          </p>
        </div>

        {/* Acordeão */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#20BEE2] bg-[#FAF7F2] shadow-sm'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 text-left font-bold text-base sm:text-lg text-black flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-['Archivo_Black',sans-serif] text-sm sm:text-base tracking-tight uppercase">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#20BEE2] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-neutral-200/60 animate-fade-in-up">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Botões de Ação Final */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 bg-black hover:bg-neutral-800 text-white font-black text-xs px-6 py-3.5 rounded-full transition-all"
          >
            <span>Ver Todas as Perguntas</span>
            <ArrowRight className="w-4 h-4 text-[#20BEE2]" />
          </Link>

          <a
            href="https://wa.me/5515996580804"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#20BEE2] hover:bg-[#51FFE6] text-black font-black text-xs px-6 py-3.5 rounded-full transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-black" />
            <span>Tirar Dúvida no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
