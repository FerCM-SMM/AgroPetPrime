'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/footer';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Qual é o prazo e valor do frete?',
      a: 'O frete é grátis para compras acima de R$ 149,00 para todo o Estado de São Paulo e principais regiões do Brasil. O prazo médio de entrega varia de 24h a 48h úteis após a confirmação do pagamento. Você receberá o código de rastreamento diretamente no seu WhatsApp.',
    },
    {
      q: 'Quais são as formas de pagamento aceitas?',
      a: 'Aceitamos Pix (com aprovação imediata e 5% de desconto adicional), Cartões de Crédito em até 12x (sendo até 3x sem juros) e Boleto Bancário.',
    },
    {
      q: 'Como funciona a garantia e a política de trocas?',
      a: 'Oferecemos 30 dias para trocas ou devoluções sem qualquer burocracia. Se o produto apresentar defeito ou seu pet não se adaptar à ração de marcas participantes do programa de satisfação 100%, realizamos a troca ou reembolso.',
    },
    {
      q: 'Como funciona o atendimento veterinário pelo WhatsApp?',
      a: 'Nossa equipe conta com profissionais capacitados para orientar sobre a escolha da ração adequada para o peso/porte, dosagem preventiva de antipulgas e orientações sobre produtos do catálogo de segunda a sábado das 8h às 19h.',
    },
    {
      q: 'Vocês entregam rações de grande porte para sítios e fazendas?',
      a: 'Sim! Possuímos logística especializada para sacarias de 15kg, 20kg e insumos para equinos, bovinos e aves em propriedades rurais e haras.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <div className="bg-white border-b border-[#ede8dc] py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-[#12c0e0]/15 text-[#0284c7] text-xs font-extrabold px-3 py-1 rounded-full mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>CENTRAL DE AJUDA</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Perguntas Frequentes (FAQ)
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Tire suas dúvidas sobre pedidos, frete, pagamentos e atendimento.
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#ede8dc] shadow-xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 text-left font-bold text-base sm:text-lg text-[#111827] flex items-center justify-between gap-4 hover:text-[#0284c7] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#0284c7]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-gray-600 leading-relaxed border-t border-[#f4f0e8] animate-fade-in-up">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Callout Card */}
        <div className="bg-[#111827] text-white rounded-3xl p-8 border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-black">Ainda tem dúvidas?</h3>
            <p className="text-sm text-gray-400">
              Nosso time responde em menos de 5 minutos no WhatsApp.
            </p>
          </div>
          <a
            href="https://wa.me/5515996580804"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-[#12c0e0] hover:bg-[#0ea5e9] text-black font-extrabold text-xs px-6 py-5 rounded-full shadow-xs hover-lift active-press flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>Falar no WhatsApp</span>
            </Button>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}