'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Send, ShieldCheck } from 'lucide-react';

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#111827] text-white pt-16 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Callout */}
        <div className="bg-[#1f2937] rounded-3xl p-6 sm:p-10 mb-14 border border-gray-700/60 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#12c0e0] uppercase tracking-wider">
                <span>🐾</span> Clube Pr1me VIP
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Receba 10% OFF no seu primeiro pedido
              </h3>
              <p className="text-gray-400 text-sm">
                Cadastre seu email para receber novidades, ofertas secretas e dicas de saúde veterinária.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0 lg:ml-auto"
              >
                <input
                  type="email"
                  placeholder="Seu melhor e-mail..."
                  className="flex-1 bg-white px-5 py-3.5 rounded-full text-sm text-[#111827] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#12c0e0]"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#12c0e0] hover:bg-[#0ea5e9] text-black font-extrabold text-xs tracking-wider uppercase px-7 py-3.5 rounded-full shadow-xs hover-lift active-press flex items-center justify-center gap-2 shrink-0 transition-all"
                >
                  <span>INSCREVER</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* 4 Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative w-44 h-12">
                <Image
                  src="/images/logo.png"
                  alt="AgroPet Pr1me"
                  width={176}
                  height={48}
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              O shopping completo do seu animal de estimação e do campo. Rações super premium, farmácia veterinária, acessórios selecionados e suporte técnico com quem entende.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/agropetpr1me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#12c0e0] hover:text-black text-gray-300 flex items-center justify-center transition-all hover-lift"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/5515996580804"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#12c0e0] hover:text-black text-gray-300 flex items-center justify-center transition-all hover-lift"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#12c0e0] hover:text-black text-gray-300 flex items-center justify-center transition-all hover-lift"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Departamentos */}
          <div>
            <h4 className="font-bold text-base text-white mb-4 tracking-wide uppercase text-xs text-[#12c0e0]">
              Departamentos
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link href="/categorias/cachorros" className="hover:text-white transition-colors">
                  Cães & Rações
                </Link>
              </li>
              <li>
                <Link href="/categorias/gatos" className="hover:text-white transition-colors">
                  Gatos & Felinos
                </Link>
              </li>
              <li>
                <Link href="/categorias/farmacia" className="hover:text-white transition-colors">
                  Farmácia & Antipulgas
                </Link>
              </li>
              <li>
                <Link href="/categorias/agro" className="hover:text-white transition-colors">
                  Linha Agro & Equinos
                </Link>
              </li>
              <li>
                <Link href="/categorias/conforto" className="hover:text-white transition-colors">
                  Camas & Acessórios
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Institucional */}
          <div>
            <h4 className="font-bold text-base text-white mb-4 tracking-wide uppercase text-xs text-[#12c0e0]">
              Institucional
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link href="/quem-somos" className="hover:text-white transition-colors">
                  Sobre a AgroPet Pr1me
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog & Dicas Veterinárias
                </Link>
              </li>
              <li>
                <Link href="/politica-privacidade" className="hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos-de-uso" className="hover:text-white transition-colors">
                  Termos & Condições
                </Link>
              </li>
              <li>
                <Link href="/politica-cookies" className="hover:text-white transition-colors">
                  Preferências de Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Atendimento & Segurança */}
          <div>
            <h4 className="font-bold text-base text-white mb-4 tracking-wide uppercase text-xs text-[#12c0e0]">
              Atendimento Especializado
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#12c0e0] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-white">(15) 99658-0804</span>
                  <span className="text-xs text-gray-500">Plantão WhatsApp</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#12c0e0] shrink-0 mt-0.5" />
                <span>contato@agropetpr1me.com.br</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#12c0e0] shrink-0 mt-0.5" />
                <span>São Paulo / Interior - Entregas para todo o Brasil</span>
              </li>
            </ul>

            {/* Trust Badges */}
            <div className="mt-6 pt-4 border-t border-gray-800 flex items-center gap-3 text-xs text-gray-400">
              <ShieldCheck className="w-5 h-5 text-[#10b981]" />
              <span>Ambiente 100% Criptografado & Seguro</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment icons */}
        <div className="border-t border-gray-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 text-center md:text-left">
          <p>© 2026 AgroPet Pr1me. Todos os direitos reservados. CNPJ: 00.000.000/0001-00.</p>
          <div className="flex items-center gap-3">
            <span className="bg-gray-800/80 px-2.5 py-1 rounded text-gray-300 font-semibold">
              PIX
            </span>
            <span className="bg-gray-800/80 px-2.5 py-1 rounded text-gray-300 font-semibold">
              Cartão até 12x
            </span>
            <span className="bg-gray-800/80 px-2.5 py-1 rounded text-gray-300 font-semibold">
              Boleto
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}