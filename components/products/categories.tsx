'use client';

import Link from 'next/link';
import { Dog, Cat, ShieldAlert, Sparkles, BedDouble, Scissors, ArrowRight } from 'lucide-react';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';

export function Categories() {
  const categories = [
    {
      name: 'Cães & Filhotes',
      description: 'Rações Super Premium & Petiscos',
      slug: 'cachorros',
      icon: Dog,
      badgeColor: 'bg-[#12c0e0]/15 text-[#0284c7]',
    },
    {
      name: 'Gatos & Felinos',
      description: 'Arranhadores, Areias & Sachês',
      slug: 'gatos',
      icon: Cat,
      badgeColor: 'bg-[#f59e0b]/15 text-[#d97706]',
    },
    {
      name: 'Farmácia Veterinária',
      description: 'Antipulgas, Medicamentos & Vermífugos',
      slug: 'farmacia',
      icon: ShieldAlert,
      badgeColor: 'bg-[#10b981]/15 text-[#059669]',
    },
    {
      name: 'Linha Agro & Campo',
      description: 'Equinos, Aves & Nutrição Animal',
      slug: 'agro',
      icon: Sparkles,
      badgeColor: 'bg-[#0284c7]/15 text-[#0369a1]',
    },
    {
      name: 'Camas & Conforto',
      description: 'Caminhas Acolchoadas & Almofadas',
      slug: 'conforto',
      icon: BedDouble,
      badgeColor: 'bg-[#8b5cf6]/15 text-[#7c3aed]',
    },
    {
      name: 'Higiene & Estética',
      description: 'Shampoos, Escovas & Banho',
      slug: 'higiene',
      icon: Scissors,
      badgeColor: 'bg-[#ec4899]/15 text-[#db2777]',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0284c7] bg-[#12c0e0]/10 px-3.5 py-1 rounded-full mb-3">
            <span>🐾</span> Compre por Categoria <span>🐾</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Tudo para o bem-estar do seu animal
          </h2>
          <p className="mt-3 text-gray-600 text-sm sm:text-base">
            Selecione o departamento ideal para encontrar produtos selecionados com garantia de qualidade.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat, idx) => (
            <AnimatedWrapper key={cat.slug} delayMs={idx * 50}>
              <Link
                href={`/categorias/${cat.slug}`}
                className="group flex flex-col items-center text-center bg-white rounded-3xl p-5 border border-[#ede8dc] shadow-xs hover-lift active-press h-full justify-between"
              >
                {/* Circular Icon Container */}
                <div className={`w-20 h-20 rounded-full ${cat.badgeColor} flex items-center justify-center mb-4 transition-transform group-hover:scale-108 duration-300`}>
                  <cat.icon className="w-9 h-9" />
                </div>

                {/* Info */}
                <div className="space-y-1 mb-4">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#0284c7] transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-500 line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                {/* Pill Button */}
                <div className="w-full pt-2">
                  <span className="inline-flex items-center justify-center w-full py-2 px-3 rounded-full bg-[#faf8f5] group-hover:bg-[#12c0e0] text-gray-700 group-hover:text-black font-semibold text-xs transition-colors border border-[#ede8dc] group-hover:border-[#12c0e0]">
                    Explorar
                    <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
