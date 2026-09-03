'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, ShoppingCart, Search, Phone, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#000000]">
              AgroPet{' '}
              <span className="text-[#12c0e0]">Pr1me</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/categorias" className="text-gray-700 hover:text-[#12c0e0] transition-colors font-medium">
              Catalogo
            </Link>
            <Link href="/quem-somos" className="text-gray-700 hover:text-[#12c0e0] transition-colors font-medium">
              Quem Somos
            </Link>
            <Link href="/contato" className="text-gray-700 hover:text-[#12c0e0] transition-colors font-medium">
              Contato
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <a href="https://wa.me/5515996580804" target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5 text-[#12c0e0]" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Link href="/carrinho">
                <ShoppingCart className="w-5 h-5" />
                {count > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-[#12c0e0] text-black text-[10px] px-1.5 py-0">
                    {count}
                  </Badge>
                )}
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Link href="/login">
                <User className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col gap-4">
              <Link href="/categorias" className="text-gray-700 hover:text-[#12c0e0] font-medium" onClick={() => setMobileMenuOpen(false)}>
                Catalogo
              </Link>
              <Link href="/quem-somos" className="text-gray-700 hover:text-[#12c0e0] font-medium" onClick={() => setMobileMenuOpen(false)}>
                Quem Somos
              </Link>
              <Link href="/contato" className="text-gray-700 hover:text-[#12c0e0] font-medium" onClick={() => setMobileMenuOpen(false)}>
                Contato
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
