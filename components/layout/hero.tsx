'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function Hero() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push('/categorias?busca=' + encodeURIComponent(search.trim()));
    }
  };

  return (
    <section className="relative w-full bg-[#faf8f5] overflow-hidden min-h-[580px] lg:min-h-[660px] flex flex-col justify-between">
      {/* Decorative ambient subtle pet paw prints in background */}
      <div className="absolute top-10 left-8 text-[#12C0E0]/15 select-none pointer-events-none transform -rotate-12 z-0">
        <span className="material-symbols-outlined text-[64px]">pets</span>
      </div>
      <div className="absolute top-1/4 left-1/3 text-[#D97706]/10 select-none pointer-events-none transform rotate-45 z-0">
        <span className="material-symbols-outlined text-[80px]">pets</span>
      </div>
      <div className="absolute bottom-20 left-12 text-[#10B981]/10 select-none pointer-events-none z-0">
        <span className="material-symbols-outlined text-[52px]">pets</span>
      </div>

      {/* Main Container */}
      <div className="relative max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-0 z-10 flex-1 flex items-end">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-end w-full">
          
          {/* Left Column: Clean Editorial, Search & Trust Badges */}
          <div className="lg:col-span-6 flex flex-col items-start z-20 pb-10 sm:pb-14 lg:pb-16 max-w-xl">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 bg-[#12C0E0]/15 text-[#00687b] text-xs font-extrabold px-4 py-1.5 rounded-full mb-4 border border-[#12C0E0]/30 shadow-2xs">
              <span className="material-symbols-outlined text-[16px] text-[#00687b]">verified</span>
              <span>NUTRIÇÃO &amp; CUIDADO PR1ME</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[54px] font-extrabold text-[#0B0F17] tracking-tight leading-[1.12] mb-4">
              O Melhor Cuidado <br />
              para seu Pet com a{' '}
              <span className="text-[#00687b] italic font-serif">Nutrição Ideal</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base text-gray-700 max-w-lg mb-8 leading-relaxed font-medium">
              Rações super premium selecionadas, farmácia veterinária completa e artigos para o campo. Tudo com pronta entrega para Sorocaba e região com atendimento amigo.
            </p>

            {/* Search Pill Form */}
            <form
              onSubmit={handleSearch}
              className="w-full max-w-md bg-white rounded-full p-1.5 sm:p-2 flex items-center shadow-lg border border-gray-200/80 focus-within:border-[#12C0E0] transition-all mb-8"
            >
              <div className="flex items-center pl-3 sm:pl-4 text-gray-400">
                <span className="material-symbols-outlined text-[20px] text-[#12C0E0]">search</span>
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Qual ração ou medicamento seu pet precisa?"
                className="w-full bg-transparent px-3 text-xs sm:text-sm text-[#0B0F17] placeholder:text-gray-400 outline-none font-medium"
              />
              <button
                type="submit"
                className="bg-[#0B0F17] hover:bg-gray-800 text-white text-xs sm:text-sm font-extrabold px-6 sm:px-8 py-3 rounded-full transition-all shrink-0 shadow-md hover-lift active-press"
              >
                Buscar
              </button>
            </form>

            {/* 3 Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-md text-xs font-bold text-gray-800">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs px-3.5 py-2.5 rounded-xl border border-gray-200/60 shadow-2xs">
                <span className="material-symbols-outlined text-[#10B981] text-[18px]">eco</span>
                <span>100% Originais</span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs px-3.5 py-2.5 rounded-xl border border-gray-200/60 shadow-2xs">
                <span className="material-symbols-outlined text-[#00687b] text-[18px]">health_and_safety</span>
                <span>Apoio Vet</span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs px-3.5 py-2.5 rounded-xl border border-gray-200/60 shadow-2xs">
                <span className="material-symbols-outlined text-[#D97706] text-[18px]">bolt</span>
                <span>Entrega Expressa</span>
              </div>
            </div>
          </div>

          {/* Right Column: Pitbull Grandão Vazado em PNG (Sem bordas, cobrindo o espaço) */}
          <div className="lg:col-span-6 relative flex items-end justify-center lg:justify-end w-full h-[380px] sm:h-[480px] lg:h-[580px] xl:h-[640px] z-10 -mb-px">
            <div className="relative w-full h-full max-w-[620px] lg:max-w-[780px] xl:max-w-[860px] flex items-end justify-center lg:justify-end">
              <Image
                src="/images/hero-pitbull-cutout.png"
                alt="Pitbull carismático e feliz com tigela de ração saudável AgroPet Prime"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 860px"
                className="object-contain object-bottom select-none pointer-events-none drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Dark Metrics Bar */}
      <div className="w-full bg-[#0B0F17] text-white py-6 border-t border-gray-800 relative z-20 shadow-md">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-[#12C0E0] mb-0.5">
                <span className="material-symbols-outlined text-[22px]">group</span>
                <span className="text-xl sm:text-2xl font-extrabold text-white">+10.000</span>
              </div>
              <span className="text-xs text-gray-400 font-medium">Clientes Felizes</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-[#10B981] mb-0.5">
                <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
                <span className="text-xl sm:text-2xl font-extrabold text-white">+500</span>
              </div>
              <span className="text-xs text-gray-400 font-medium">Produtos em Estoque</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-[#D97706] mb-0.5">
                <span className="material-symbols-outlined text-[22px]">local_shipping</span>
                <span className="text-xl sm:text-2xl font-extrabold text-white">24h a 48h</span>
              </div>
              <span className="text-xs text-gray-400 font-medium">Entrega em Sorocaba</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-[#F59E0B] mb-0.5">
                <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                <span className="text-xl sm:text-2xl font-extrabold text-white">4.9 / 5</span>
              </div>
              <span className="text-xs text-gray-400 font-medium">Avaliação Google</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
