'use client';

import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    name: 'Cães',
    desc: 'Super Premium, Sachês & Antipulgas',
    slug: 'cachorros',
    bg: 'bg-[#00c0e3]/20',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEaWT9py4TyTU_5Geq6hs1tdwmoyJqs5aBqo5j9BGeueJMJepRqXH-E3H6GQuThugvXt1LP4q3HqsYB-ityfMn0jOIRxZdmcil7HFJq6GkNhpC-jf61UPNTFZDe02OPEh34sCahKPxpq9lVzERsNUcdW4SC-WMq13COcE15T7Et0uXN4-A-I6tzMd570bCkfFYgJX2LlzYmACV6_499UJY9l_KB3BvIJemsvSpO-daqg8yqQovywjZ',
  },
  {
    name: 'Gatos',
    desc: 'Areias Sílica, Rações Castrados & Brinquedos',
    slug: 'gatos',
    bg: 'bg-[#d9dff5]/60',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPzEl89FQDA9Qd1Wlq4PNc2h3JDrEKi66TuQFPtZjWu1OjSK_mopqv9dihi1v77jxYnxS7j8EbkQhql2UBd7VjCufOqZDkzHSTCjR-yQpxPy5dnYwREgHZ67WQ4K_QJW5CkB6-zx0ys8UM0rf425JwSBeC5_N9FMm5cHEsDrp9MLTWbYBy5yooxbJkRHUqonZyg2ZdVztKuGv_yHDDnWH6HslhXuE_8ancXWB-oBJt_4-z810CRG7Z',
  },
  {
    name: 'Pássaros',
    desc: 'Sementes Selecionadas, Gaiolas & Blocos',
    slug: 'passaros',
    bg: 'bg-[#afecff]/40',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdNDEI3hj2lJTPczQEH-Pr4ihgf8xfZZUMHZUo7yh9QksILjHlt9tqhTUJo3ti5i9dcfFzmH5Tq7e1UlF9oy6PO0MAwgszZn0TBdU0EYOLg9RR8_3tr2kMXhq3c3af-yDQuoDaj5OYVbYKcXV15aD63Ir_HfrR1aCHjZTyONQDIw70fD1q3kHRbjrFge31hl0F3QVQfq16jHZR1oGZsaD9dRf9A5VGqPGG_YZtddELqt89T-nvxn9J',
  },
  {
    name: 'Cavalos & Agro',
    desc: 'Ração Alta Performance, Selaria & Sal',
    slug: 'agro',
    bg: 'bg-[#D97706]/15',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkiSxNQkU2zCbdvqIk4yVMGgdCnOvSn4EiPRjhNwVSd-6-abPBozzO1l9BShukxf-k4eJDIE53MK9mLULyzTYJUmbtEzxgnyGgflhET2yCkIt_PaPuWlGHjKnf5H_HwCQGlBEwu_B8sGytczgc4e_ZxJEUkbbgwH0OAIiENPTwbHtvf41zIiOjgsPmc5kbcAEZP-edWG_VUktMJwiWPdTEFDEISj5mrZuTsBvZz8p-NzSQYdwb-uRw',
  },
  {
    name: 'Farmácia',
    desc: 'Antibióticos, Vacinas & Suplementos',
    slug: 'farmacia',
    bg: 'bg-red-100',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVnpiTmCYf87YuFk9SHOIJoktlEvlzz8u0S1szrLCy4-wjTP-bWKVmndo6iIH3Qqqct3McxolyqevrfcHZtYiCOXx3GVFXbxI4MbhNR_V1dZ8BhLiARPGzbO5CajB8-s0oIgTfJQ7ahuemP__AROHSTaxi--h9WucdK8AYuWSnujd6ro9cqFhBna0SDvd55KoR9BUQkj00TLomDA9CklGMaxYXGPOnQRfWatSbVG7VI86v376KZFaD',
  },
  {
    name: 'Higiene & Banho',
    desc: 'Shampoos Neutros, Rasqueadeiras & Tapetes',
    slug: 'conforto',
    bg: 'bg-[#cce5ff]/50',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClPDVt8KtSyOqcfp5SsnVmysEtWgVioPaoSe3pzROOF_cU-oiuj7f_DBQ6U8UoOqUM2RPZp_LGp6lUemcBJXbn1tdvXv2oUU8fPGJsnHZc5Wbk8qrTBGo9-bR09zxEJY1FltsMwlvN0sqAUPifnWZ4mzDhFz6TrWjv3JnLb3yIVEJ6qgRz_B6Avcp7ROTjMoaFNQrMAF8IjL4jDw53EImsK1xfLKwwjYvIn1APHu5aQY5ks5oICEHx',
  },
];

export function Categories() {
  return (
    <section className="w-full py-16 bg-[#f8f9ff]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-extrabold text-[#00687b] uppercase tracking-wider">
              Navegue por Espécie &amp; Cuidado
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B0F17] mt-1">
              Qual é a sua necessidade hoje?
            </h2>
          </div>
          <p className="text-sm text-gray-600 max-w-md">
            Selecione o departamento ideal para encontrar rações específicas, dosagens e produtos agrícolas homologados.
          </p>
        </div>

        {/* 6 Category Pills Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categorias/${cat.slug}`}
              className="group flex flex-col items-center text-center p-4 bg-white rounded-3xl shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover-lift"
            >
              <div className={`w-24 h-24 rounded-full ${cat.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform overflow-hidden relative shadow-xs`}>
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="96px"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-extrabold text-base text-[#0B0F17] mb-1 group-hover:text-[#00687b] transition-colors">
                {cat.name}
              </span>
              <span className="text-[11px] text-gray-500 line-clamp-2 leading-tight">
                {cat.desc}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}