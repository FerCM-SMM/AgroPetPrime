'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-[#0B0F17] text-white pt-16 pb-8 border-t border-gray-900">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-gray-800/80">
          {/* Col 1: Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight text-white">
                AgroPet<span className="text-[#00c0e3]">Prime</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Seu pet shop e agropecuária de confiança em Sorocaba. Cuidado dedicado, rações nobres, medicamentos veterinários e suprimentos para campo e montaria.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-white/10 text-[#00c0e3] text-[10px] font-extrabold px-3 py-1 rounded-full">
                CNPJ Ativo
              </span>
              <span className="bg-white/10 text-[#10B981] text-[10px] font-extrabold px-3 py-1 rounded-full">
                Entrega Sorocaba
              </span>
            </div>
          </div>

          {/* Col 2: Canais de Atendimento */}
          <div className="flex flex-col gap-3">
            <span className="font-extrabold text-sm text-white mb-1">
              Canais de Atendimento
            </span>
            <div className="flex items-start gap-2 text-gray-400 text-xs leading-snug">
              <span className="material-symbols-outlined text-[#00c0e3] text-[18px] shrink-0">location_on</span>
              <span>R. Antônio Silva Saladino, 878 - Pq. Vitória Régia, Sorocaba - SP</span>
            </div>
            <a
              href="https://wa.me/5515996580804"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-[#10B981] text-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[#10B981] text-[18px] shrink-0">chat</span>
              <span>WhatsApp: (15) 9 9658.0804</span>
            </a>
            <a
              href="https://instagram.com/agropetprime.sorocaba"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-[#00c0e3] text-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[#00c0e3] text-[18px] shrink-0">share</span>
              <span>Instagram: @agropetprime.sorocaba</span>
            </a>
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <span className="material-symbols-outlined text-[#00c0e3] text-[18px] shrink-0">schedule</span>
              <span>Seg a Sáb: 08:00 às 19:00</span>
            </div>
          </div>

          {/* Col 3: Departamentos */}
          <div className="flex flex-col gap-2.5">
            <span className="font-extrabold text-sm text-white mb-1">
              Departamentos
            </span>
            <Link href="/categorias/cachorros" className="text-gray-400 hover:text-white transition-colors text-xs">
              Rações para Cães &amp; Petiscos
            </Link>
            <Link href="/categorias/gatos" className="text-gray-400 hover:text-white transition-colors text-xs">
              Areias, Arranhadores &amp; Sachês
            </Link>
            <Link href="/categorias/farmacia" className="text-gray-400 hover:text-white transition-colors text-xs">
              Farmácia &amp; Vacinas Veterinárias
            </Link>
            <Link href="/categorias/agro" className="text-gray-400 hover:text-white transition-colors text-xs">
              Linha Agro, Aves &amp; Equinos
            </Link>
            <Link href="/#destaques" className="text-gray-400 hover:text-[#00c0e3] transition-colors text-xs font-bold">
              Clube Prime de Descontos
            </Link>
          </div>

          {/* Col 4: Segurança & Pagamento */}
          <div className="flex flex-col gap-3">
            <span className="font-extrabold text-sm text-white">
              Segurança &amp; Pagamento
            </span>
            <p className="text-xs text-gray-400 leading-relaxed">
              Pague via PIX com desconto, cartões de crédito em até 6x ou na entrega para Sorocaba.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="bg-white/10 text-gray-200 text-[10px] font-extrabold px-2.5 py-1 rounded">
                PIX
              </span>
              <span className="bg-white/10 text-gray-200 text-[10px] font-extrabold px-2.5 py-1 rounded">
                Cartão de Crédito
              </span>
              <span className="bg-white/10 text-gray-200 text-[10px] font-extrabold px-2.5 py-1 rounded">
                Boleto
              </span>
              <span className="bg-white/10 text-gray-200 text-[10px] font-extrabold px-2.5 py-1 rounded">
                Débito
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[#10B981] text-[11px] font-extrabold pt-1">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span>Ambiente Seguro com Criptografia SSL</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-xs">
          <p>© 2025-2026 AgroPet Prime Sorocaba. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <Link href="/termos-de-uso" className="hover:text-gray-300 transition-colors">
              Termos de Uso
            </Link>
            <Link href="/politica-privacidade" className="hover:text-gray-300 transition-colors">
              Privacidade
            </Link>
            <Link href="/faq" className="hover:text-gray-300 transition-colors">
              Política de Entregas &amp; FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}