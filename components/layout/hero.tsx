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
      router.push(`/categorias?busca=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <section className="relative w-full bg-[#faf8f5] overflow-hidden">
      {/* Decorative subtle background paw prints */}
      <div className="absolute top-10 left-12 text-[#12C0E0]/15 select-none pointer-events-none transform -rotate-12">
        <span className="material-symbols-outlined text-[64px]">pets</span>
      </div>
      <div className="absolute top-1/2 right-8 text-[#D97706]/10 select-none pointer-events-none transform rotate-45">
        <span className="material-symbols-outlined text-[80px]">pets</span>
      </div>
      <div className="absolute bottom-16 left-1/3 text-[#12C0E0]/10 select-none pointer-events-none">
        <span className="material-symbols-outlined text-[48px]">pets</span>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-14 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Clean Editorial, Search & Trust Badges */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 bg-[#12C0E0]/15 text-[#00687b] text-xs font-extrabold px-3.5 py-1.5 rounded-full mb-4 border border-[#12C0E0]/30 shadow-2xs">
              <span className="material-symbols-outlined text-[16px] text-[#00687b]">verified</span>
              <span>NUTRIÇÃO &amp; CUIDADO PR1ME</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[54px] font-extrabold text-[#0B0F17] tracking-tight leading-[1.15] mb-4">
              O Melhor Cuidado <br />
              para seu Pet com a{' '}
              <span className="text-[#00687b] italic font-serif">Nutrição Ideal</span>
            </h1>

            {/* Explanatory Paragraph */}
            <p className="text-sm sm:text-base text-gray-600 max-w-xl mb-8 leading-relaxed">
              Encontre rações super premium, farmácia veterinária completa, petiscos naturais e artigos para o campo. Tudo com pronta entrega para Sorocaba e região com atendimento amigo.
            </p>

            {/* Pill Search Form (Inspired by reference) */}
            <form
              onSubmit={handleSearch}
              className="w-full max-w-lg bg-white rounded-full p-1.5 sm:p-2 flex items-center shadow-lg border border-gray-200 focus-within:border-[#12C0E0] transition-all mb-8"
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

            {/* 3 Trust Pillars (Directly matched to reference) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-lg text-xs font-bold text-gray-700">
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-xs px-3 py-2 rounded-xl border border-gray-100 shadow-2xs">
                <span className="material-symbols-outlined text-[#10B981] text-[18px]">eco</span>
                <span>100% Originais</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-xs px-3 py-2 rounded-xl border border-gray-100 shadow-2xs">
                <span className="material-symbols-outlined text-[#00687b] text-[18px]">health_and_safety</span>
                <span>Apoio Veterinário</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-xs px-3 py-2 rounded-xl border border-gray-100 shadow-2xs">
                <span className="material-symbols-outlined text-[#D97706] text-[18px]">bolt</span>
                <span>Entrega Expressa</span>
              </div>
            </div>
          </div>

          {/* Right Column: Charismatic Pitbull with Food Bowl */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-[460px] aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/images/hero-pitbull-bowl.jpg"
                alt="Pitbull carismático e feliz com tigela de ração deliciosa na frente"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 460px"
                className="object-cover"
              />
              {/* Subtle quality badge overlay on top-left of image */}
              <div className="absolute top-4 left-4 bg-[#0B0F17]/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <span className="material-symbols-outlined text-[#12C0E0] text-[16px]">favorite</span>
                <span>Amado pelos Pets</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Organic Wave & Dark Metrics Bar (Like the reference image) */}
      <div className="w-full bg-[#0B0F17] text-white py-6 border-t border-gray-800">
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