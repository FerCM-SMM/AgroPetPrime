'use client';

import { Dog, Cat, Bird } from 'lucide-react';

export function Categories() {
  const cats = [
    { name: 'Cachorros', slug: 'cachorros', icon: Dog },
    { name: 'Gatos', slug: 'gatos', icon: Cat },
    { name: 'Passarinhos', slug: 'passarinhos', icon: Bird },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#000000] mb-12">
          Escolha pelo seu pet
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {cats.map((cat) => (
            <a
              key={cat.slug}
              href={'/categorias/' + cat.slug}
              className="block bg-[#f8fafc] rounded-xl p-6 text-center hover:shadow-lg hover:shadow-[#12c0e0]/10 transition-all border border-gray-100 hover:border-[#12c0e0]"
            >
              <cat.icon className="w-10 h-10 mx-auto mb-3 text-[#12c0e0]" />
              <h3 className="text-lg font-semibold text-[#000000]">{cat.name}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
