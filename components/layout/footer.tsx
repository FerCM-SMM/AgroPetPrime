'use client';

import Link from 'next/link';
import { MapPin, MessageCircle, Clock, ShieldCheck } from 'lucide-react';

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="w-full bg-black text-white pt-16 pb-12 border-t border-neutral-900">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-neutral-800">
          {/* Col 1: Descrição Institucional */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="font-['Archivo_Black',sans-serif] font-black text-2xl tracking-tight text-white uppercase">
                AgroPet <span className="text-[#20BEE2]">PR<span className="text-[#51FFE6]">1</span>ME</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-normal">
              O acolhimento de uma loja de bairro com a tradição do campo em Sorocaba. Nutrição nobre, farmácia veterinária responsável e artigos para cães, gatos, aves e cavalos.
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="bg-neutral-900 border border-neutral-800 text-[#20BEE2] text-[10px] font-black px-3 py-1 rounded-full">
                CNPJ Ativo
              </span>
              <span className="bg-neutral-900 border border-neutral-800 text-[#51FFE6] text-[10px] font-black px-3 py-1 rounded-full">
                Entrega em Sorocaba &amp; Região
              </span>
            </div>
          </div>

          {/* Col 2: Canais de Atendimento */}
          <div className="flex flex-col gap-3">
            <span className="font-['Archivo_Black',sans-serif] text-sm font-black text-white uppercase tracking-wider mb-1">
              Canais de Atendimento
            </span>
            <div className="flex items-start gap-2.5 text-gray-300 text-xs leading-snug">
              <MapPin className="w-4 h-4 text-[#20BEE2] shrink-0 mt-0.5" />
              <span>Rua Antônio Silva Saladino, 878 — Parque Vitória Régia, Sorocaba - SP</span>
            </div>
            <a
              href="https://wa.me/5515996580804"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-gray-300 hover:text-[#20BEE2] text-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#20BEE2] shrink-0" />
              <span>WhatsApp: (15) 9 9658-0804</span>
            </a>
            <a
              href="https://instagram.com/agropetprime.sorocaba"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-gray-300 hover:text-[#51FFE6] text-xs transition-colors"
            >
              <InstagramIcon className="w-4 h-4 text-[#51FFE6] shrink-0" />
              <span>Instagram: @agropetprime.sorocaba</span>
            </a>
            <div className="flex items-center gap-2.5 text-gray-300 text-xs">
              <Clock className="w-4 h-4 text-gray-400 shrink-0" />
              <span>Segunda a Sábado: 08:00 às 19:00</span>
            </div>
          </div>

          {/* Col 3: Departamentos */}
          <div className="flex flex-col gap-2.5">
            <span className="font-['Archivo_Black',sans-serif] text-sm font-black text-white uppercase tracking-wider mb-1">
              Departamentos
            </span>
            <Link href="/categorias/cachorros" className="text-gray-400 hover:text-white transition-colors text-xs font-medium">
              Cães (Super Premium &amp; Antipulgas)
            </Link>
            <Link href="/categorias/gatos" className="text-gray-400 hover:text-white transition-colors text-xs font-medium">
              Gatos (Areias &amp; Castrados)
            </Link>
            <Link href="/categorias/farmacia" className="text-gray-400 hover:text-white transition-colors text-xs font-medium">
              Farmácia Veterinária Especializada
            </Link>
            <Link href="/categorias/agro" className="text-gray-400 hover:text-white transition-colors text-xs font-medium">
              Campo, Aves &amp; Cavalos de Haras
            </Link>
            <Link href="/#clube" className="text-[#20BEE2] hover:text-[#51FFE6] transition-colors text-xs font-black">
              Clube Prime: Ganhe 10% OFF
            </Link>
          </div>

          {/* Col 4: Segurança & Pagamento */}
          <div className="flex flex-col gap-3">
            <span className="font-['Archivo_Black',sans-serif] text-sm font-black text-white uppercase tracking-wider">
              Formas de Pagamento
            </span>
            <p className="text-xs text-gray-400 leading-relaxed font-normal">
              Pague via PIX com desconto imediato, cartões de crédito em até 6x sem juros ou pague na entrega para Sorocaba.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="bg-neutral-900 border border-neutral-800 text-white text-[11px] font-black px-3 py-1 rounded-md">
                PIX
              </span>
              <span className="bg-neutral-900 border border-neutral-800 text-white text-[11px] font-black px-3 py-1 rounded-md">
                Cartão de Crédito
              </span>
              <span className="bg-neutral-900 border border-neutral-800 text-white text-[11px] font-black px-3 py-1 rounded-md">
                Boleto
              </span>
              <span className="bg-neutral-900 border border-neutral-800 text-white text-[11px] font-black px-3 py-1 rounded-md">
                Débito na Entrega
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#51FFE6] text-xs font-bold pt-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#20BEE2]" />
              <span>Ambiente Seguro com Criptografia SSL</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-xs">
          <p>© 2025-2026 AgroPet Pr1me Sorocaba. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <Link href="/termos-de-uso" className="hover:text-white transition-colors">
              Termos de Uso
            </Link>
            <Link href="/politica-privacidade" className="hover:text-white transition-colors">
              Privacidade
            </Link>
            <Link href="/faq" className="hover:text-white transition-colors">
              Política de Entregas &amp; FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}