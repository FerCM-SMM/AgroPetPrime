'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/hooks/use-cart';
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Truck,
  MessageCircle,
  MapPin,
  ShieldCheck,
  ChevronDown,
  Phone,
} from 'lucide-react';
import { getStoredProducts, AdminProduct } from '@/lib/admin-store';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // Não exibir no painel admin
  if (pathname.startsWith('/admin')) return null;

  const { totalItems, totalPrice } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Autocomplete
  const [suggestions, setSuggestions] = useState<AdminProduct[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [allProducts, setAllProducts] = useState<AdminProduct[]>([]);

  useEffect(() => {
    setAllProducts(getStoredProducts());
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const term = searchQuery.toLowerCase();
      const matches = allProducts
        .filter(
          (p) =>
            p.name.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term)
        )
        .slice(0, 4);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, allProducts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/categorias?busca=${encodeURIComponent(searchQuery.trim())}`);
      setIsFocused(false);
      setMobileMenuOpen(false);
    }
  };

  const navDepartments = [
    { label: 'Cães', href: '/categorias/cachorros' },
    { label: 'Gatos', href: '/categorias/gatos' },
    { label: 'Pássaros', href: '/categorias/passaros' },
    { label: 'Cavalos & Agro', href: '/categorias/agro' },
    { label: 'Farmácia & Saúde', href: '/categorias/farmacia' },
    { label: 'Acessórios & Conforto', href: '/categorias/conforto' },
  ];

  const marqueeText =
    "Entregas rápidas em Sorocaba e região • WhatsApp: (15) 9 9658-0804 • R. Antônio Silva Saladino, 878 - Pq. Vitória Régia • Loja Oficial Prime • ";

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-xl shadow-lg border-b border-white/10'
          : 'bg-black border-b border-neutral-900'
      }`}
    >
      {/* 1. Barra Superior com Marquee Infinito (Ticker Fino) */}
      <div className="bg-[#20BEE2] text-black text-[11px] font-extrabold tracking-wider overflow-hidden py-1.5 select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          <span className="mx-4">{marqueeText}</span>
          <span className="mx-4">{marqueeText}</span>
          <span className="mx-4">{marqueeText}</span>
          <span className="mx-4">{marqueeText}</span>
        </div>
      </div>

      {/* 2. Barra de Navegação Principal */}
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl overflow-hidden bg-white/10 p-1 border border-white/15 group-hover:scale-105 transition-transform flex items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="AgroPet Pr1me"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          <div>
            <span className="font-['Archivo_Black',sans-serif] text-xl sm:text-2xl tracking-tight text-white block leading-none">
              AGROPET <span className="text-[#20BEE2]">PR<span className="text-[#51FFE6]">1</span>ME</span>
            </span>
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase block mt-1">
              Pet Shop &amp; Campo • Sorocaba
            </span>
          </div>
        </Link>

        {/* Links de navegação desktop */}
        <nav className="hidden xl:flex items-center gap-6 text-xs font-bold text-white/90">
          {navDepartments.map((dept, idx) => (
            <Link
              key={idx}
              href={dept.href}
              className="hover:text-[#20BEE2] transition-colors whitespace-nowrap"
            >
              {dept.label}
            </Link>
          ))}
        </nav>

        {/* Campo de Busca com Autocomplete (Desktop & Tablet) */}
        <div className="relative flex-1 max-w-xs lg:max-w-sm hidden md:block">
          <form
            onSubmit={handleSearch}
            className="w-full bg-neutral-900 rounded-full px-4 py-2 flex items-center border border-neutral-700 focus-within:border-[#20BEE2] focus-within:ring-2 focus-within:ring-[#20BEE2]/20 transition-all"
          >
            <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsFocused(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar ração, remédio ou campo..."
              className="w-full bg-transparent text-xs text-white placeholder:text-gray-400 outline-none font-medium"
            />
          </form>

          {/* Autocomplete Popup */}
          {isFocused && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-700 p-2 z-50 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1 block">
                Sugestões Rápidas:
              </span>
              {suggestions.map((p) => (
                <Link
                  key={p.id}
                  href={`/categorias?busca=${encodeURIComponent(p.name)}`}
                  onClick={() => setIsFocused(false)}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-neutral-800 shrink-0 border border-neutral-700">
                      <Image src={p.image} alt={p.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white line-clamp-1">{p.name}</p>
                      <span className="text-[10px] text-gray-400">{p.category}</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-[#20BEE2]">R$ {p.price.toFixed(2)}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Ações: Pedir no WhatsApp & Carrinho */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://wa.me/5515996580804"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-[#20BEE2] hover:bg-[#51FFE6] text-black px-4 py-2.5 rounded-full text-xs font-extrabold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4 fill-black" />
            <span>Pedir no WhatsApp</span>
          </a>

          <Link
            href="/carrinho"
            className="relative flex items-center gap-2.5 bg-neutral-900 hover:bg-neutral-800 text-white px-3.5 sm:px-4 py-2.5 rounded-full border border-neutral-700 transition-all"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-[#20BEE2]" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#51FFE6] text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-black">
                  {totalItems}
                </span>
              )}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-[9px] font-bold text-gray-400 uppercase leading-none">Carrinho</span>
              <span className="text-xs font-black text-white">
                R$ {totalPrice.toFixed(2)}
              </span>
            </div>
          </Link>

          {/* Menu Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="xl:hidden relative w-10 h-10 flex flex-col items-center justify-center rounded-xl bg-neutral-900 border border-neutral-700 text-white hover:bg-neutral-800 transition-all"
          >
            <span
              className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1'
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : 'mb-1'
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Menu Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-neutral-950 border-t border-neutral-800 p-5 space-y-4 shadow-2xl animate-[fadeSlideUp_0.2s_ease-out_forwards]">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar ração, medicamentos..."
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-xl text-xs text-white placeholder:text-gray-400 focus:outline-none focus:border-[#20BEE2]"
            />
          </form>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 block mb-1">
              Departamentos
            </span>
            {navDepartments.map((dept, idx) => (
              <Link
                key={idx}
                href={dept.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl text-xs font-bold text-white hover:bg-neutral-900 hover:text-[#20BEE2] transition-all"
              >
                <span>{dept.label}</span>
                <span className="text-gray-500">→</span>
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
            <a
              href="https://wa.me/5515996580804"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#20BEE2] text-black py-3 rounded-full text-xs font-extrabold shadow-sm hover:bg-[#51FFE6] transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>Pedir no WhatsApp • (15) 9 9658-0804</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}