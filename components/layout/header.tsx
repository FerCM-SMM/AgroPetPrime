'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/use-cart';
import { Menu, X } from 'lucide-react';

export function Header() {
  const router = useRouter();
  const { totalItems, totalPrice } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/categorias?busca=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navDepartments = [
    { label: 'Cães', href: '/categorias/cachorros' },
    { label: 'Gatos', href: '/categorias/gatos' },
    { label: 'Pássaros', href: '/categorias/passaros' },
    { label: 'Cavalos & Agro', href: '/categorias/agro' },
    { label: 'Farmácia & Medicamentos', href: '/categorias/farmacia' },
    { label: 'Acessórios & Brinquedos', href: '/categorias/conforto' },
    { label: 'Ofertas Prime', href: '#destaques' },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* 1. Top Announcement Bar in Obsidian Dark */}
      <div className="bg-[#0B0F17] text-white text-[11px] font-bold">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-10 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="flex items-center gap-1.5 text-gray-200">
              <span className="material-symbols-outlined text-[#12C0E0] text-[16px]">local_shipping</span>
              <span>Entregas rápidas em Sorocaba e região</span>
            </span>
            <span className="hidden md:inline text-gray-500">•</span>
            <a
              href="https://wa.me/5515996580804"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-gray-200 hover:text-[#10B981] transition-colors"
            >
              <span className="material-symbols-outlined text-[#10B981] text-[16px]">chat</span>
              <span>WhatsApp: (15) 9 9658.0804</span>
            </a>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden lg:flex items-center gap-1.5 text-gray-300">
              <span className="material-symbols-outlined text-[#12C0E0] text-[16px]">location_on</span>
              <span>R. Antônio Silva Saladino, 878 - Pq. Vitória Régia</span>
            </span>
            <span className="flex items-center gap-1.5 text-gray-200">
              <span className="material-symbols-outlined text-[#F59E0B] text-[16px]">verified</span>
              <span>Loja Oficial Prime</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10">
              <Image
                src="/images/logo-dark.png"
                alt="AgroPet Prime"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#0B0F17]">
                AgroPet<span className="text-[#12C0E0]">Prime</span>
              </span>
              <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase -mt-1">
                Pet Shop &amp; Agro
              </span>
            </div>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="relative w-full flex items-center bg-[#eff4ff] rounded-full px-4 py-1.5 shadow-[0_1px_8px_rgba(0,0,0,0.04)] border border-[#E2E8F0] focus-within:border-[#12C0E0] transition-all">
              <span className="material-symbols-outlined text-[#12C0E0] mr-2">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="O que seu pet ou criação precisa hoje?"
                className="bg-transparent w-full text-[#0B0F17] placeholder:text-gray-500 outline-none text-xs sm:text-sm font-medium"
              />
              <button
                type="submit"
                className="bg-[#12C0E0] hover:bg-[#00A8C7] text-black text-xs font-bold px-4 py-1.5 rounded-full transition-all shrink-0 hover-lift active-press"
              >
                Buscar
              </button>
            </form>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              href="#nossa-loja"
              className="hidden lg:flex items-center gap-1.5 text-gray-600 hover:text-[#0B0F17] transition-colors text-xs font-bold"
            >
              <span className="material-symbols-outlined text-[20px]">store</span>
              <span>Nossa Loja</span>
            </Link>

            <Link
              href="/perfil"
              className="hidden sm:flex items-center gap-1.5 text-gray-600 hover:text-[#0B0F17] transition-colors text-xs font-bold"
            >
              <span className="material-symbols-outlined text-[20px]">receipt_long</span>
              <span>Meus Pedidos</span>
            </Link>

            {/* Cart Pill */}
            <Link
              href="/carrinho"
              className="flex items-center gap-2 bg-[#eff4ff] hover:bg-[#e5eeff] px-3.5 py-1.5 rounded-full transition-all border border-[#E2E8F0] hover-lift active-press"
            >
              <div className="relative flex items-center">
                <span className="material-symbols-outlined text-[#00687b] text-[22px]">shopping_bag</span>
                <span className="absolute -top-2 -right-2 bg-[#12C0E0] text-black text-[10px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center shadow-xs">
                  {totalItems > 0 ? totalItems : '0'}
                </span>
              </div>
              <div className="hidden xl:flex flex-col text-left leading-none">
                <span className="text-[10px] text-gray-500 font-semibold">Total</span>
                <span className="text-xs font-extrabold text-[#0B0F17]">
                  R$ {totalPrice > 0 ? totalPrice.toFixed(2).replace('.', ',') : '0,00'}
                </span>
              </div>
            </Link>

            {/* Profile Avatar Button */}
            <Link
              href="/perfil"
              className="w-8 h-8 rounded-full bg-[#00687b] hover:bg-[#004e5d] text-white flex items-center justify-center transition-all hover-lift"
              title="Minha Conta"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-gray-700 hover:text-black"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Sub-Navbar Departments (Google Stitch) */}
      <div className="bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-11 flex items-center justify-between">
          <nav className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-1 text-xs font-bold text-gray-600">
            {navDepartments.map((dept) => (
              <Link
                key={dept.label}
                href={dept.href}
                className="whitespace-nowrap hover:text-[#0B0F17] hover:text-[#12C0E0] transition-colors"
              >
                {dept.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2 shrink-0">
            <a
              href="https://wa.me/5515996580804"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#10B981] font-bold text-xs hover:underline"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>Atendimento WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E2E8F0] px-4 py-4 space-y-4 animate-fade-in-up">
          <form onSubmit={handleSearch} className="relative flex items-center bg-[#eff4ff] rounded-full px-4 py-2 border border-[#E2E8F0]">
            <span className="material-symbols-outlined text-[#12C0E0] mr-2 text-[20px]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="O que seu pet precisa hoje?"
              className="bg-transparent w-full text-xs outline-none"
            />
          </form>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold text-gray-800 pt-2 border-t border-gray-100">
            {navDepartments.map((dept) => (
              <Link
                key={dept.label}
                href={dept.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-xl hover:bg-[#eff4ff] transition-colors"
              >
                {dept.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2 text-xs font-bold">
            <Link
              href="/perfil"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 px-3 rounded-xl hover:bg-[#eff4ff]"
            >
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
              <span>Meus Pedidos</span>
            </Link>
            <a
              href="https://wa.me/5515996580804"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-2 px-3 rounded-xl bg-[#10B981]/10 text-[#059669]"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Chamar no WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}