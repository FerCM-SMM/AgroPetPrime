'use client';

import { ArrowRight, MessageCircle, Search, ShieldCheck, Stethoscope, Truck } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { MouseTilt } from '@/components/motion/mouse-tilt';
import { SplitText } from '@/components/motion/split-text';

interface HeroProps {
  activeAudience?: 'pet' | 'agro';
  onAudienceChange?: (audience: 'pet' | 'agro') => void;
}

export function Hero({ activeAudience = 'pet', onAudienceChange }: HeroProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const heroRef = useRef<HTMLElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setSpotlight({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/categorias?busca=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleToggle = (audience: 'pet' | 'agro') => {
    if (onAudienceChange) {
      onAudienceChange(audience);
    }
  };

  return (
    <section
      ref={heroRef}
      data-cursor="magic"
      className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center justify-center overflow-hidden bg-black text-white selection:bg-[#20BEE2] selection:text-black"
    >
      {/* 1. Background com efeito Ken Burns & Imagem Pitbull Oficial */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="relative w-full h-full animate-kenburns transition-transform duration-1000 ease-out">
          <Image
            src="/images/hero-pitbull-tight.png"
            alt="Mascote Pitbull AgroPet Pr1me"
            fill
            priority
            className="object-cover object-center opacity-85 scale-105 transition-opacity duration-700"
            sizes="100vw"
          />
        </div>

        {/* Dynamic Interactive Spotlight following cursor */}
        <div
          aria-hidden="true"
          style={{
            background: `radial-gradient(circle 600px at ${spotlight.x}% ${spotlight.y}%, rgba(32, 190, 226, 0.12), transparent 70%)`,
          }}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        />

        {/* Overlay escuro de alto contraste (estilo Voldog) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/85" />
      </div>

      {/* 2. Conteúdo Central Sobreposto */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-20 lg:py-24 text-center flex flex-col items-center">
        {/* Badges de Confiança com MouseTilt 3D */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-6">
          <MouseTilt maxTilt={6} scale={1.04}>
            <span
              data-cursor="pointer"
              className="inline-flex items-center gap-1.5 bg-black/70 border border-white/20 text-[#51FFE6] text-[11px] font-bold px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-lg cursor-default"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#20BEE2]" />
              <span>100% Originais</span>
            </span>
          </MouseTilt>

          <MouseTilt maxTilt={6} scale={1.04}>
            <span
              data-cursor="pointer"
              className="inline-flex items-center gap-1.5 bg-black/70 border border-white/20 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-lg cursor-default"
            >
              <Stethoscope className="w-3.5 h-3.5 text-[#20BEE2]" />
              <span>Apoio Veterinário</span>
            </span>
          </MouseTilt>

          <MouseTilt maxTilt={6} scale={1.04}>
            <span
              data-cursor="pointer"
              className="inline-flex items-center gap-1.5 bg-black/70 border border-white/20 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-lg cursor-default"
            >
              <Truck className="w-3.5 h-3.5 text-[#51FFE6]" />
              <span>Entrega Expressa Sorocaba</span>
            </span>
          </MouseTilt>
        </div>

        {/* Headline Principal com SplitText Staggered Reveal */}
        <div className="mb-6 max-w-4xl">
          <SplitText
            text="O Melhor Cuidado para seu Pet e sua Propriedade com a Nutrição Ideal"
            as="h1"
            className="font-['Archivo_Black',sans-serif] text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] uppercase"
            highlightWord="Nutrição"
            highlightClassName="text-[#20BEE2]"
            staggerMs={24}
          />
        </div>

        {/* Subtítulo Acolhedor */}
        <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed mb-8 font-medium">
          Rações super premium selecionadas, farmácia veterinária especializada e artigos para o
          campo. Atendimento amigo de loja de bairro, com entrega rápida para Sorocaba e região.
        </p>

        {/* 3. TOGGLE SWITCH ESTILIZADO (Pílula Deslizante com Física Voldog) */}
        <div className="mb-8 w-full max-w-md">
          <div className="bg-neutral-900/90 border border-white/20 p-1.5 rounded-full flex items-center shadow-2xl backdrop-blur-md relative">
            {/* Indicador deslizante elástico com spring timing */}
            <div
              style={{
                transform: activeAudience === 'pet' ? 'translateX(0%)' : 'translateX(100%)',
                transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] rounded-full bg-[#20BEE2] shadow-md pointer-events-none"
            />

            <button
              type="button"
              data-cursor="pointer"
              onClick={() => handleToggle('pet')}
              className={`relative z-10 w-1/2 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-black transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                activeAudience === 'pet'
                  ? 'text-black font-extrabold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <span>🐾</span>
              <span>Tutor de Pet</span>
            </button>

            <button
              type="button"
              data-cursor="pointer"
              onClick={() => handleToggle('agro')}
              className={`relative z-10 w-1/2 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-black transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                activeAudience === 'agro'
                  ? 'text-black font-extrabold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <span>🌾</span>
              <span>Campo / Agro</span>
            </button>
          </div>
          <span className="text-[11px] text-gray-400 font-semibold mt-2.5 block tracking-wide">
            {activeAudience === 'pet'
              ? 'Exibindo nutrição para Cães, Gatos e Pássaros'
              : 'Exibindo rações para Cavalos, Haras e Chácaras'}
          </span>
        </div>

        {/* 4. Campo de Busca Pílula Sobreposto ao Vídeo */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-full p-2 pl-6 flex items-center shadow-2xl border border-white/40 mb-6 transition-all focus-within:ring-4 focus-within:ring-[#20BEE2]/40"
        >
          <Search className="w-5 h-5 text-gray-500 mr-3 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              activeAudience === 'pet'
                ? 'Buscar Premier, Royal Canin, Simparic, caminhas...'
                : 'Buscar ração de cavalo, sal mineral, selaria...'
            }
            className="w-full bg-transparent text-black text-xs sm:text-sm placeholder:text-gray-500 outline-none font-medium"
          />
          <button
            type="submit"
            data-cursor="pointer"
            className="bg-[#000000] hover:bg-[#20BEE2] text-white hover:text-black text-xs sm:text-sm font-extrabold px-6 py-3 rounded-full transition-all shrink-0 ml-2 cursor-pointer"
          >
            Buscar
          </button>
        </form>

        {/* 5. CTAs de Ação Rápida */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#produtos"
            data-cursor="pointer"
            className="inline-flex items-center gap-2 bg-[#20BEE2] hover:bg-[#51FFE6] text-black font-black text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            <span>Ver Produtos em Destaque</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="https://wa.me/5515996580804"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            className="inline-flex items-center gap-2 bg-black/80 hover:bg-black text-white border border-white/30 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full backdrop-blur-md transition-all hover:border-[#20BEE2]"
          >
            <MessageCircle className="w-4 h-4 text-[#20BEE2]" />
            <span>Pedir no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
