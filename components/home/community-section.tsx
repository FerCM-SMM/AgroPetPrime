'use client';

import Image from 'next/image';
import { Star, Heart, CheckCircle2, ArrowRight } from 'lucide-react';

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function CommunitySection() {
  const stories = [
    {
      name: 'Thor',
      category: 'Cães da Região',
      description: 'Visita semanal para garantir ração super premium e um bom papo no balcão da loja.',
      image: '/images/hero-pitbull-grandona.jpg',
      badge: 'Cliente Frequente',
      stars: 5,
    },
    {
      name: 'Mel',
      category: 'Cuidado Felino',
      description: 'Conforto e areia mineral de alta absorção recomendada pela nossa equipe de especialistas.',
      image: '/images/promo-corgi.jpg',
      badge: 'Gatos Saudáveis',
      stars: 5,
    },
    {
      name: 'Haras Boa Vista',
      category: 'Equinos & Haras',
      description: 'Nutrição pesada e sal mineral entregues com pontualidade direto na cocheira.',
      image: '/images/hero-pitbull-bowl.jpg',
      badge: 'Linha Campo',
      stars: 5,
    },
    {
      name: 'Chácara Recanto Verde',
      category: 'Entrega Expressa',
      description: 'Sacarias de 15kg e 20kg descarregadas no mesmo dia em Sorocaba sem esforço.',
      image: '/images/hero-pets.jpg',
      badge: 'Entrega Expressa',
      stars: 5,
    },
  ];

  return (
    <section id="comunidade" className="py-20 bg-[#FAF7F2] text-black">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="inline-block text-xs font-black uppercase tracking-widest text-[#20BEE2] bg-black text-white px-4 py-1.5 rounded-full mb-3">
              Comunidade @agropetprime.sorocaba
            </span>
            <h2 className="font-['Archivo_Black',sans-serif] text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-black">
              De chácaras a lares urbanos:<br className="hidden sm:inline" /> histórias de quem confia
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Widget Google Reviews */}
            <div className="bg-white border border-neutral-200 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-xs">
              <span className="text-xl font-black text-black">4.9</span>
              <div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-gray-500">Google Avaliações (+480)</span>
              </div>
            </div>

            <a
              href="https://instagram.com/agropetprime.sorocaba"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black hover:bg-neutral-800 text-white font-black text-xs px-6 py-3.5 rounded-full shadow-md transition-all hover:scale-105"
            >
              <InstagramIcon className="w-4 h-4 text-[#20BEE2]" />
              <span>Ver no Instagram</span>
            </a>
          </div>
        </div>

        {/* Grid / Carrossel de Histórias */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-3xl overflow-hidden border border-neutral-200 hover:border-[#20BEE2] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative w-full h-56 overflow-hidden bg-neutral-100">
                <Image
                  src={story.image}
                  alt={story.name}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <span className="absolute top-3 left-3 bg-black/80 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-xs">
                  {story.category}
                </span>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-2">
                    {[...Array(story.stars)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>

                  <h3 className="font-['Archivo_Black',sans-serif] text-xl font-black text-black mb-2">
                    {story.name}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    &ldquo;{story.description}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-bold text-gray-500">
                  <span className="text-[#20BEE2] font-black">Cliente Verificado</span>
                  <CheckCircle2 className="w-4 h-4 text-[#20BEE2]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
