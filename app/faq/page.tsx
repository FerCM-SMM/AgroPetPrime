'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, MessageCircle, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/footer';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Qual é o prazo e valor do frete para Sorocaba e região?',
      a: 'Para compras acima de R$ 149,00 a entrega é gratuita em Sorocaba e Votorantim. Pedidos confirmados até as 13h são entregues no mesmo dia. Para demais cidades do Estado de São Paulo, o envio é despachado em até 24h úteis com código de rastreamento enviado diretamente no seu WhatsApp.',
    },
    {
      q: 'Quais são as formas de pagamento aceitas?',
      a: 'Aceitamos Pix (com aprovação imediata e 5% de cashback na conta da loja), Cartões de Crédito em até 12x (sendo até 3x sem juros) e pagamento no ato da entrega (cartão ou dinheiro) para pedidos realizados em Sorocaba.',
    },
    {
      q: 'Como funciona a garantia e política de adaptação de ração?',
      a: 'Trabalhamos com marcas de excelência (Premier, Royal Canin, GranNature, Golden) que participam do programa 100% Satisfação Garantida. Se o seu pet não se adaptar ao sabor ou grão nos primeiros dias de consumo, auxiliamos na troca ou reembolso sem complicações.',
    },
    {
      q: 'Como recebo orientação sobre antiparasitários e dosagens?',
      a: 'Nossa equipe possui treinamento veterinário contínuo para orientar sobre a dosagem correta de Simparic, Bravecto, NexGard e vermífugos conforme o peso corporal exato e idade do seu cão ou gato. Basta nos chamar no WhatsApp antes de fechar o pedido.',
    },
    {
      q: 'Vocês realizam entregas de sacarias grandes para haras, sítios e canis?',
      a: 'Sim! Temos estoque amplo e logística para grandes volumes de sacos de 15kg e 20kg de cães e gatos, além de insumos para nutrição equina (SUPRA PRO CAVALO) e aves em chácaras e propriedades rurais de toda a macrorregião de Sorocaba.',
    },
    {
      q: 'Onde fica localizada a loja física da AgroPet Pr1me?',
      a: 'Nossa sede fica na Rua Antônio Silva Saladino, 878 - Parque Vitória Régia, Sorocaba - SP. Você é muito bem-vindo para nos visitar, conhecer os produtos pessoalmente ou retirar seu pedido feito online.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#20241F]">
      {/* Header */}
      <section className="border-b border-[#EBE3D5] py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center sm:text-left">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#1C4E47] bg-[#E2EBE8] px-3.5 py-1 rounded-full mb-3">
            Central de Dúvidas
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#20241F]">
            Perguntas Frequentes
          </h1>
          <p className="text-[#555C54] text-sm sm:text-base mt-2 max-w-xl">
            Tudo o que você precisa saber sobre compras, entregas em Sorocaba, formas de pagamento e suporte veterinário.
          </p>
        </div>
      </section>

      {/* Accordion Questions */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-8">
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-[#FAF7F2] rounded-3xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-[#1C4E47]/40 shadow-sm' : 'border-[#EBE3D5] hover:border-[#D6CBB8]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 text-left font-bold text-base sm:text-lg text-[#20241F] flex items-center justify-between gap-4 transition-colors"
                >
                  <span className="font-serif">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#1C4E47] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-[#555C54] leading-relaxed border-t border-[#EBE3D5]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="bg-[#FAF7F2] border border-[#EBE3D5] p-5 rounded-2xl flex items-center gap-3">
            <Truck className="w-5 h-5 text-[#1C4E47] shrink-0" />
            <span className="text-xs font-semibold text-[#20241F]">Frete grátis acima de R$ 149</span>
          </div>
          <div className="bg-[#FAF7F2] border border-[#EBE3D5] p-5 rounded-2xl flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#1C4E47] shrink-0" />
            <span className="text-xs font-semibold text-[#20241F]">Produtos 100% Originais</span>
          </div>
          <div className="bg-[#FAF7F2] border border-[#EBE3D5] p-5 rounded-2xl flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-[#1C4E47] shrink-0" />
            <span className="text-xs font-semibold text-[#20241F]">Garantia de Adaptação</span>
          </div>
        </div>

        {/* WhatsApp Callout Card */}
        <div className="bg-[#1C4E47] text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="font-serif text-2xl font-bold tracking-tight">Ainda ficou com alguma dúvida?</h3>
            <p className="text-sm text-[#E2EBE8]">
              Nossa equipe em Sorocaba responde rapidamente no WhatsApp oficial da loja.
            </p>
          </div>
          <a
            href="https://wa.me/5515996580804?text=Ol%C3%A1!%20Tenho%20uma%20d%C3%BAvida%20sobre%20o%20site%20da%20AgroPet%20Pr1me"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <Button
              size="lg"
              className="bg-[#12C0E0] hover:bg-[#0EA5E9] text-black font-extrabold text-sm px-7 py-6 rounded-full shadow-sm hover:shadow transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>Chamar no WhatsApp</span>
            </Button>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}