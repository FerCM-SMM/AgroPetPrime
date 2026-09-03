'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, ShoppingCart, Search, Phone, User, X, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#ede8dc] transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#111827] text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#12c0e0] animate-pulse" />
            <span>🐾 <strong>Frete Grátis</strong> para pedidos acima de R$ 149</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-gray-300">
            <a
              href="https://wa.me/5515996580804"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#12c0e0] transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#12c0e0]" />
              <span>Plantão WhatsApp: (15) 99658-0804</span>
            </a>
            <span>Seg a Sáb: 8h às 19h</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="relative w-36 sm:w-44 h-12 flex items-center">
              <Image
                src="/images/logo-dark.png"
                alt="AgroPet Pr1me"
                width={176}
                height={48}
                className="object-contain transition-transform group-hover:scale-102"
                priority
              />
            </div>
          </Link>

          {/* Search Bar - Modern Pill */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="O que seu pet precisa hoje? (ex: ração, antipulgas...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white pl-11 pr-4 py-2.5 rounded-full border border-[#ede8dc] text-sm text-[#18202f] placeholder-gray-400 focus:outline-none focus:border-[#12c0e0] focus:ring-2 focus:ring-[#12c0e0]/20 transition-all shadow-xs"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-7">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-[#12c0e0] transition-colors"
            >
              Início
            </Link>
            <Link
              href="/categorias"
              className="text-sm font-medium text-gray-700 hover:text-[#12c0e0] transition-colors"
            >
              Categorias
            </Link>
            <Link
              href="/quem-somos"
              className="text-sm font-medium text-gray-700 hover:text-[#12c0e0] transition-colors"
            >
              Quem Somos
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-gray-700 hover:text-[#12c0e0] transition-colors"
            >
              Blog Pet
            </Link>
            <Link
              href="/contato"
              className="text-sm font-medium text-gray-700 hover:text-[#12c0e0] transition-colors"
            >
              Contato
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp Fast Button */}
            <a
              href="https://wa.me/5515996580804"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 bg-[#12c0e0]/10 hover:bg-[#12c0e0]/20 text-[#0284c7] font-semibold text-xs px-3.5 py-2 rounded-full border border-[#12c0e0]/30 transition-all hover-lift"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Button */}
            <Link href="/carrinho">
              <Button
                variant="ghost"
                size="icon"
                className="relative bg-white hover:bg-white/80 border border-[#ede8dc] rounded-full w-10 h-10 shadow-xs hover-lift active-press"
              >
                <ShoppingCart className="w-4 h-4 text-gray-700" />
                {count > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-[#12c0e0] text-black font-bold text-[10px] w-5 h-5 flex items-center justify-center p-0 rounded-full border-2 border-white shadow-xs">
                    {count}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Account */}
            <Link href="/login">
              <Button
                variant="ghost"
                size="icon"
                className="bg-white hover:bg-white/80 border border-[#ede8dc] rounded-full w-10 h-10 shadow-xs hover-lift active-press"
              >
                <User className="w-4 h-4 text-gray-700" />
              </Button>
            </Link>

            {/* Mobile Hamburger */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full border border-[#ede8dc] bg-white w-10 h-10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#ede8dc] py-4 bg-[#faf8f5] animate-fade-in-up">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Buscar no catálogo..."
                className="w-full bg-white px-4 py-2 rounded-full border border-[#ede8dc] text-sm text-[#18202f]"
              />
            </div>
            <nav className="flex flex-col gap-3 font-medium">
              <Link
                href="/"
                className="px-3 py-2 rounded-xl text-gray-700 hover:bg-white hover:text-[#12c0e0]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Início
              </Link>
              <Link
                href="/categorias"
                className="px-3 py-2 rounded-xl text-gray-700 hover:bg-white hover:text-[#12c0e0]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categorias
              </Link>
              <Link
                href="/quem-somos"
                className="px-3 py-2 rounded-xl text-gray-700 hover:bg-white hover:text-[#12c0e0]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Quem Somos
              </Link>
              <Link
                href="/blog"
                className="px-3 py-2 rounded-xl text-gray-700 hover:bg-white hover:text-[#12c0e0]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog Pet
              </Link>
              <Link
                href="/contato"
                className="px-3 py-2 rounded-xl text-gray-700 hover:bg-white hover:text-[#12c0e0]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contato
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
