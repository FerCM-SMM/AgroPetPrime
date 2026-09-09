'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface DepartmentsSectionProps {
  activeAudience?: 'pet' | 'agro';
}

export function DepartmentsSection({ activeAudience = 'pet' }: DepartmentsSectionProps) {
  const departments = [
    {
      id: 'caes',
      emoji: '🐕',
      name: 'Cães',
      description: 'Super Premium, Sachês & Antipulgas',
      href: '/categorias/cachorros',
      audience: 'pet',
      badge: 'Mais Buscado',
    },
    {
      id: 'gatos',
      emoji: '🐈',
      name: 'Gatos',
      description: 'Areias Sílica, Rações Castrados & Brinquedos',
      href: '/categorias/gatos',
      audience: 'pet',
      badge: null,
    },
    {
      id: 'passaros',
      emoji: '🐦',
      name: 'Pássaros',
      description: 'Sementes Selecionadas, Gaiolas & Blocos',
      href: '/categorias/passaros',
      audience: 'pet',
      badge: null,
    },
    {
      id: 'cavalos',
      emoji: '🐴',
      name: 'Cavalos & Agro',
      description: 'Ração Alta Performance, Selaria & Minerais',
      href: '/categorias/agro',
      audience: 'agro',
      badge: 'Linha Haras',
    },
    {
      id: 'farmacia',
      emoji: '💊',
      name: 'Farmácia Veterinária',
      description: 'Antibióticos, Vacinas & Suplementos',
      href: '/categorias/farmacia',
      audience: 'all',
      badge: 'Receituário',
    },
    {
      id: 'higiene',
      emoji: '🛁',
      name: 'Higiene & Banho',
      description: 'Shampoos Neutros, Rasqueadeiras & Camas',
      href: '/categorias/conforto',
      audience: 'pet',
      badge: null,
    },
  ];

  // Reordena destacando itens do público selecionado
  const sortedDepartments = [...departments].sort((a, b) => {
    if (activeAudience === 'agro') {
      if (a.audience === 'agro') return -1;
      if (b.audience === 'agro') return 1;
      if (a.id === 'farmacia') return -1;
    }
    return 0;
  });

  return (
    <section id="departamentos" className="py-20 bg-white text-black border-b border-neutral-100">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-[#20BEE2] bg-[#20BEE2]/10 px-4 py-1.5 rounded-full mb-3">
            Departamentos &amp; Espécies
          </span>
          <h2 className="font-['Archivo_Black',sans-serif] text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-black">
            Qual é a sua necessidade hoje?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3 font-normal">
            Selecione o departamento ideal para encontrar rações nobres, dosagens veterinárias seguras e suprimentos para campo ou residência.
          </p>
        </div>

        {/* Grid de 6 Cards com Stagger Suave */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedDepartments.map((dept, index) => {
            const isHighlighted =
              (activeAudience === 'agro' && (dept.audience === 'agro' || dept.id === 'farmacia')) ||
              (activeAudience === 'pet' && (dept.id === 'caes' || dept.id === 'gatos'));

            return (
              <Link
                key={dept.id}
                href={dept.href}
                className={`group relative rounded-3xl p-7 border transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-xl hover:-translate-y-1 ${
                  isHighlighted
                    ? 'bg-neutral-950 text-white border-neutral-800 shadow-md'
                    : 'bg-[#FAF7F2] text-black border-neutral-200 hover:border-[#20BEE2]'
                }`}
                style={{
                  animationDelay: `${index * 90}ms`,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-300 block">
                      {dept.emoji}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-[#20BEE2] text-current group-hover:text-black flex items-center justify-center transition-colors">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>

                  {dept.badge && (
                    <span
                      className={`inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2 ${
                        isHighlighted ? 'bg-[#20BEE2] text-black' : 'bg-[#000000] text-white'
                      }`}
                    >
                      {dept.badge}
                    </span>
                  )}

                  <h3
                    className={`font-['Archivo_Black',sans-serif] text-2xl font-black tracking-tight mb-2 ${
                      isHighlighted ? 'text-white' : 'text-black'
                    }`}
                  >
                    {dept.name}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm font-medium leading-relaxed ${
                      isHighlighted ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {dept.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-current/10 flex items-center justify-between text-xs font-bold">
                  <span className={isHighlighted ? 'text-[#51FFE6]' : 'text-[#20BEE2]'}>
                    Explorar Catálogo
                  </span>
                  <span className="opacity-60 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
