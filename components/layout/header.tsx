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
  Sparkles,
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
  const [activeJourney, setActiveJourney] = useState<'all' | 'pet' | 'agro'>('all');

  // Autocomplete
  const [suggestions, setSuggestions] = useState<AdminProduct[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [allProducts, setAllProducts] = useState<AdminProduct[]>([]);

  useEffect(() => {
    setAllProducts(getStoredProducts());
    const saved = sessionStorage.getItem('agropet_user_journey') as any;
    if (saved) {
      setActiveJourney(saved);
    }
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

  const handleSelectJourney = (journey: 'all' | 'pet' | 'agro') => {
    setActiveJourney(journey);
    sessionStorage.setItem('agropet_user_journey', journey);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('user-journey-change', { detail: journey }));
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/categorias?busca=${encodeURIComponent(searchQuery.trim())}`);
      setIsFocused(false);
    }
  };

  const navDepartments = [
    { label: 'Cães', href: '/categorias/cachorros' },
    { label: 'Gatos', href: '/categorias/gatos' },
    { label: 'Pássaros', href: '/categorias/passaros' },
    { label: 'Cavalos & Agro', href: '/categorias/agro' },
    { label: 'Farmácia & Saúde', href: '/categorias/farmacia' },
    { label: 'Acessórios & Conforto', href: '/categorias/conforto' },
    { label: 'Ofertas da Loja', href: '#destaques' },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#FFFDF8]/95 backdrop-blur-xl shadow-xs border-b border-[#8B5F3A]/10">
      
      {/* 1. Barra Superior de Confiança & Localização com Lucide Icons */}
      <div className="bg-[#20241F] text-white text-[11px] font-semibold">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 h-9 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="flex items-center gap-1.5 text-gray-200">
              <Truck className="w-3.5 h-3.5 text-[#12c0e0]" />
              <span>Entregas rápidas em Sorocaba e região</span>
            </span>
            <span className="hidden md:inline text-gray-500">•</span>
            <a
              href="https://wa.me/5515996580804"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-gray-200 hover:text-[#10b981] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#10b981]" />
              <span>WhatsApp: (15) 9 9658-0804</span>
            </a>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden lg:flex items-center gap-1.5 text-gray-300">
              <MapPin className="w-3.5 h-3.5 text-[#12c0e0]" />
              <span>R. Antônio Silva Saladino, 878 - Pq. Vitória Régia</span>
            </span>
            <span className="flex items-center gap-1.5 text-gray-200">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E06F12]" />
              <span>Loja Oficial Prime</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Barra de Navegação Principal */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4 sm:gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-2xl overflow-hidden bg-white shadow-xs p-1 border border-[#8B5F3A]/15 group-hover:scale-105 transition-transform">
            <Image
              src="/images/logo.png"
              alt="AgroPet Prime"
              fill
              className="object-contain p-0.5"
              priority
            />
          </div>
          <div>
            <span className="font-serif font-black text-xl sm:text-2xl tracking-tight text-[#20241F] block leading-none">
              AgroPet<span className="text-[#12c0e0]">Prime</span>
            </span>
            <span className="text-[10px] font-bold text-gray-500 tracking-wider block mt-0.5">
              Pet Shop &amp; Campo Acolhedor
            </span>
          </div>
        </Link>

        {/* Campo de Busca com Autocomplete */}
        <div className="relative flex-1 max-w-xl hidden md:block">
          <form
            onSubmit={handleSearch}
            className="w-full bg-white rounded-full px-4 py-2 flex items-center border border-[#8B5F3A]/20 shadow-2xs focus-within:border-[#12c0e0] focus-within:ring-2 focus-within:ring-[#12c0e0]/20 transition-all"
          >
            <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsFocused(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar rações, medicamentos, antipulgas ou campo..."
              className="w-full bg-transparent text-xs sm:text-sm text-[#20241F] placeholder:text-gray-400 outline-hidden font-medium"
            />
            <button
              type="submit"
              className="bg-[#20241F] hover:bg-[#3591A1] text-white text-xs font-bold px-4 py-1.5 rounded-full transition-all shrink-0 ml-2"
            >
              Buscar
            </button>
          </form>

          {/* Autocomplete Popup */}
          {isFocused && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1 block">
                Sugestões Rápidas:
              </span>
              {suggestions.map((p) => (
                <Link
                  key={p.id}
                  href={`/categorias?busca=${encodeURIComponent(p.name)}`}
                  onClick={() => setIsFocused(false)}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                      <Image src={p.image} alt={p.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#20241F] line-clamp-1">{p.name}</p>
                      <span className="text-[10px] text-gray-400">{p.category}</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-[#20241F]">R$ {p.price.toFixed(2)}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Ações: WhatsApp & Carrinho */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://wa.me/5515996580804"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:flex items-center gap-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#1b8743] px-3.5 py-2 rounded-xl text-xs font-extrabold border border-[#25D366]/30 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
            <span>Pedir no WhatsApp</span>
          </a>

          <Link
            href="/carrinho"
            className="relative flex items-center gap-2.5 bg-white hover:bg-gray-50 text-[#20241F] px-3.5 sm:px-4 py-2 rounded-2xl border border-[#8B5F3A]/20 shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-[#00829B]" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E06F12] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              )}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[10px] font-bold text-gray-400 leading-none">Seu Carrinho</span>
              <span className="text-xs font-black text-[#20241F]">
                R$ {totalPrice.toFixed(2)}
              </span>
            </div>
          </Link>

          {/* Menu Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-black rounded-xl hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. SELETOR DAS DUAS JORNADAS DO PÚBLICO (Tutor de Pet vs Produtor Rural / Campo) */}
      <div className="bg-[#f7f4ec] border-t border-[#8B5F3A]/10 px-4 py-2">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[11px] font-bold text-gray-500 shrink-0 hidden md:inline">
              Qual é o seu foco hoje?
            </span>
            <button
              onClick={() => handleSelectJourney('pet')}
              className={`px-3 py-1.5 rounded-full font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeJourney === 'pet'
                  ? 'bg-[#12c0e0] text-[#20241F] shadow-xs'
                  : 'bg-white text-gray-700 border border-[#8B5F3A]/15 hover:border-[#12c0e0]'
              }`}
            >
              <span>🐾 Sou tutor de pet (Cães &amp; Gatos)</span>
            </button>
            <button
              onClick={() => handleSelectJourney('agro')}
              className={`px-3 py-1.5 rounded-full font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeJourney === 'agro'
                  ? 'bg-[#3591A1] text-white shadow-xs'
                  : 'bg-white text-gray-700 border border-[#8B5F3A]/15 hover:border-[#3591A1]'
              }`}
            >
              <span>🌾 Trabalho com campo/agro (Cavalos &amp; Haras)</span>
            </button>
            {activeJourney !== 'all' && (
              <button
                onClick={() => handleSelectJourney('all')}
                className="text-[10px] font-bold text-gray-400 hover:text-gray-700 underline ml-1 shrink-0"
              >
                Ver tudo
              </button>
            )}
          </div>

          {/* Links de navegação tradicionais */}
          <nav className="hidden lg:flex items-center gap-4 text-xs font-bold text-[#20241F]/80">
            {navDepartments.map((dept, idx) => (
              <Link
                key={idx}
                href={dept.href}
                className="hover:text-[#00829B] transition-colors whitespace-nowrap"
              >
                {dept.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Menu Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar produtos..."
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs"
            />
          </form>
          <div className="space-y-1">
            {navDepartments.map((dept, idx) => (
              <Link
                key={idx}
                href={dept.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 rounded-lg text-xs font-bold text-[#20241F] hover:bg-gray-50"
              >
                {dept.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}