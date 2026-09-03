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
    <section className="relative w-full bg-[#f4efe7] overflow-hidden min-h-[580px] lg:min-h-[640px] flex flex-col justify-between">
      {/* Subtle background decorative pet paw prints */}
      <div className="absolute top-12 left-10 text-[#12C0E0]/15 select-none pointer-events-none transform -rotate-12 z-0">
        <span className="material-symbols-outlined text-[64px]">pets</span>
      </div>
      <div className="absolute top-1/3 left-1/2 text-[#D97706]/10 select-none pointer-events-none transform rotate-45 z-0">
        <span className="material-symbols-outlined text-[72px]">pets</span>
      </div>

      {/* Hero Content Container */}
      <div className="relative max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8 lg:pb-0 z-10 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full min-h-[480px]">
          
          {/* Left Column: Clean Editorial, Search & Trust Badges */}
          <div className="lg:col-span-6 flex flex-col items-start z-20 max-w-xl">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 bg-[#12C0E0]/15 text-[#00687b] text-xs font-extrabold px-3.5 py-1.5 rounded-full mb-4 border border-[#12C0E0]/30 shadow-2xs">
              <span className="material-symbols-outlined text-[16px] text-[#00687b]">verified</span>
              <span>NUTRIÇÃO &amp; CUIDADO PR1ME</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[52px] font-extrabold text-[#0B0F17] tracking-tight leading-[1.12] mb-4">
              O Melhor Cuidado <br />
              para seu Pet com a{' '}
              <span className="text-[#00687b] italic font-serif">Nutrição Ideal</span>
            </h1>

            {/* Explanatory Paragraph */}
            <p className="text-sm sm:text-base text-gray-700 max-w-lg mb-8 leading-relaxed font-medium">
              Rações super premium selecionadas, farmácia veterinária especializada e artigos para o campo. Tudo com pronta entrega para Sorocaba e região com atendimento amigo.
            </p>

            {/* Pill Search Form */}
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
                className="bg-[#0B0F17] hover:bg-gray-800 text-white text-xs sm:text-sm font-extrabold px-6 sm:px-7 py-3 rounded-full transition-all shrink-0 shadow-md hover-lift active-press"
              >
                Buscar
              </button>
            </form>

            {/* 3 Trust Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-md text-xs font-bold text-gray-800">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3 py-2.5 rounded-xl border border-gray-200/60 shadow-2xs">
                <span className="material-symbols-outlined text-[#10B981] text-[18px]">eco</span>
                <span>100% Originais</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3 py-2.5 rounded-xl border border-gray-200/60 shadow-2xs">
                <span className="material-symbols-outlined text-[#00687b] text-[18px]">health_and_safety</span>
                <span>Apoio Vet</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3 py-2.5 rounded-xl border border-gray-200/60 shadow-2xs">
                <span className="material-symbols-outlined text-[#D97706] text-[18px]">bolt</span>
                <span>Entrega Expressa</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dog Grandão seamlessly integrated without any card border */}
          <div className="lg:col-span-6 relative flex items-end justify-center lg:justify-end h-[360px] sm:h-[460px] lg:h-[560px] w-full mt-4 lg:mt-0">
            <div className="relative w-full h-full max-w-[650px] flex items-end justify-center lg:justify-end">
              <Image
                src="/images/hero-pitbull-grandona.jpg"
                alt="Pitbull carismático grandão com pote de ração na Hero"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 680px"
                className="object-contain object-bottom select-none pointer-events-none"
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
