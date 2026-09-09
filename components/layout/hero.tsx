'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, ShieldCheck, Stethoscope, Truck, MessageCircle, ArrowRight } from 'lucide-react';

interface HeroProps {
  activeAudience?: 'pet' | 'agro';
  onAudienceChange?: (audience: 'pet' | 'agro') => void;
}

export function Hero({ activeAudience = 'pet', onAudienceChange }: HeroProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

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
    <section className="relative min-h-[90vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-black text-white">
      {/* 1. Background com efeito Ken Burns cinematográfico & Fallback para Pitbull Oficial */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="relative w-full h-full animate-kenburns">
          <Image
            src="/images/hero-pitbull-tight.png"
            alt="Mascote Pitbull AgroPet Pr1me"
            fill
            priority
            className="object-cover object-center opacity-85 scale-105"
            sizes="100vw"
          />
        </div>

        {/* Overlay escuro/petróleo de alto contraste (estilo Voldog) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/45" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/80" />
      </div>

      {/* 2. Conteúdo Central Sobreposto */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-20 lg:py-24 text-center flex flex-col items-center">
        {/* Badges de Confiança em Linha */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 animate-[fadeSlideUp_0.4s_ease-out_forwards]">
          <span className="inline-flex items-center gap-1.5 bg-black/60 border border-white/20 text-[#51FFE6] text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-[#20BEE2]" />
            <span>100% Originais</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-black/60 border border-white/20 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-md">
            <Stethoscope className="w-3.5 h-3.5 text-[#20BEE2]" />
            <span>Apoio Vet</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-black/60 border border-white/20 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-md">
            <Truck className="w-3.5 h-3.5 text-[#51FFE6]" />
            <span>Entrega Expressa Sorocaba</span>
          </span>
        </div>

        {/* Headline Principal de Autoridade */}
        <h1 className="font-['Archivo_Black',sans-serif] text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] max-w-4xl uppercase mb-6 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          O Melhor Cuidado para seu Pet e sua Propriedade com a <span className="text-[#20BEE2]">Nutrição Ideal</span>
        </h1>

        {/* Subtítulo Acolhedor */}
        <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed mb-8 font-medium animate-[fadeSlideUp_0.7s_ease-out_forwards]">
          Rações super premium selecionadas, farmácia veterinária especializada e artigos para o campo. Atendimento amigo de loja de bairro, com entrega rápida para Sorocaba e região.
        </p>

        {/* 3. TOGGLE SWITCH ESTILIZADO (Pílula Deslizante: Tutor de Pet vs Campo/Agro) */}
        <div className="mb-8 w-full max-w-md animate-[fadeSlideUp_0.8s_ease-out_forwards]">
          <div className="bg-neutral-900/90 border border-white/20 p-1.5 rounded-full flex items-center shadow-2xl backdrop-blur-md relative">
            {/* Indicador deslizante animado */}
            <div
              className={`absolute top-1.5 bottom-1.5 rounded-full bg-[#20BEE2] transition-all duration-300 ease-out shadow-md ${
                activeAudience === 'pet' ? 'left-1.5 w-[calc(50%-6px)]' : 'left-[calc(50%+3px)] w-[calc(50%-6px)]'
              }`}
            />

            <button
              type="button"
              onClick={() => handleToggle('pet')}
              className={`relative z-10 w-1/2 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-black transition-colors duration-200 flex items-center justify-center gap-2 ${
                activeAudience === 'pet' ? 'text-black font-extrabold' : 'text-gray-300 hover:text-white'
              }`}
            >
              <span>🐾</span>
              <span>Tutor de Pet</span>
            </button>

            <button
              type="button"
              onClick={() => handleToggle('agro')}
              className={`relative z-10 w-1/2 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-black transition-colors duration-200 flex items-center justify-center gap-2 ${
                activeAudience === 'agro' ? 'text-black font-extrabold' : 'text-gray-300 hover:text-white'
              }`}
            >
              <span>🌾</span>
              <span>Campo / Agro</span>
            </button>
          </div>
          <span className="text-[11px] text-gray-400 font-semibold mt-2 block">
            {activeAudience === 'pet'
              ? 'Exibindo nutrição para Cães, Gatos e Pássaros'
              : 'Exibindo rações para Cavalos, Haras e Chácaras'}
          </span>
        </div>

        {/* 4. Campo de Busca Pílula Sobreposto ao Vídeo */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-full p-2 pl-6 flex items-center shadow-2xl border border-white/40 mb-6 transition-all focus-within:ring-4 focus-within:ring-[#20BEE2]/30 animate-[fadeSlideUp_0.9s_ease-out_forwards]"
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
            className="bg-[#000000] hover:bg-[#20BEE2] text-white hover:text-black text-xs sm:text-sm font-extrabold px-6 py-3 rounded-full transition-all shrink-0 ml-2"
          >
            Buscar
          </button>
        </form>

        {/* 5. CTAs de Ação Rápida */}
        <div className="flex flex-wrap items-center justify-center gap-4 animate-[fadeSlideUp_1s_ease-out_forwards]">
          <a
            href="#produtos"
            className="inline-flex items-center gap-2 bg-[#20BEE2] hover:bg-[#51FFE6] text-black font-black text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            <span>Ver Produtos em Destaque</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="https://wa.me/5515996580804"
            target="_blank"
            rel="noopener noreferrer"
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