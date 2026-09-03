'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { toast } from 'sonner';

interface ProductItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice: number;
  image: string;
  rating: number;
  reviewsCount: number;
  badges: string[];
  unitBadge?: string;
}

const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'prod-premier-15kg',
    name: 'Ração Premier Formula Cães Adultos Raças Médias e Grandes 15kg',
    brand: 'Premier Pet • Cães',
    category: 'caes',
    price: 237.70,
    oldPrice: 289.90,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLjV5W5nC3XQkXwwsJ-zzHFDaLwjYLTA3ssLwdXzElv8_P7lHBDs1L-QhUTr5zi_5OwUmPNgYJY0H52HdccZq6zVIB4RfvOZ0kgpsAsuHQo5a693llZYG_zeQAK6uoqobber8rtXLZdo3HJOGY9GNxuhzY9rTXVziGzsBk8mA-hliNviiGhab6U6qTifNtPGWVcfDmoCWYegn1Da1SyoixARlehvRhkHTi9mVV0yyr3TsuFYMHe-7Q',
    rating: 5,
    reviewsCount: 142,
    badges: ['-18% OFF', 'Mais Vendido'],
  },
  {
    id: 'prod-royal-canin-cat',
    name: 'Ração Royal Canin Gatos Adultos Castrados 7.5kg',
    brand: 'Royal Canin • Gatos',
    category: 'gatos',
    price: 254.15,
    oldPrice: 299.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMy1FziA-yfwim1xT-Wn8N3lJbm5ol9mTnf6WV-Ye4uOQK5noAIQOsf2JLeEtjRgVpBxqyVQEfyDRieCThPgYYgxUDQ5Y-eoeXnsqVCYGA6cyQniSkFkq90-zWpTeXwCDEif7WSyrCGrP8-izPrc71_doPw8wFPdBVVFZZbYRp9dbMI2sZHxHaaZAgUsvPdy1xoOtbpO7SFS8HhLB7QOPUHijJ6BpMsdraW0ktAsmnZrcnfugLDzZl',
    rating: 5,
    reviewsCount: 98,
    badges: ['-15% OFF'],
  },
  {
    id: 'prod-simparic-80mg',
    name: 'Antipulgas e Carrapatos Simparic 80mg (Cães 20 a 40kg) 1 Comp.',
    brand: 'Zoetis • Farmácia Cães',
    category: 'farmacia',
    price: 119.90,
    oldPrice: 139.90,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2RTizwlF1mzVgaRF1qk68KmR2VEOQ-WXa1EqTJnJbxHTVnhyPfjucaPx03Wb8iMYh_Hd13I6My3WkGxl2AQxjnPuzjJDqqm4ZAnDTiBRj9QDDYH85CNmGcRAtHGN3k-tTVwrItbU98jOlK7yCcgBsjWzIgLmqqC7fvZlpsaGN6Pd-q5tj3ILni7MqVWNy6v4N8QYby3jRMMwZORCiyKkQWBtRJ513BZxkLApP9DdgKX--UHwoeV9b',
    rating: 5,
    reviewsCount: 215,
    badges: ['Frete Sorocaba Grátis', 'Original Zoetis'],
  },
  {
    id: 'prod-equinos-25kg',
    name: 'Ração Equinos Alta Energia Cavalo Atleta Laminada 25kg',
    brand: 'Agro & Equinos • Alta Energia',
    category: 'agro',
    price: 142.50,
    oldPrice: 165.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFOUHyxrytUlqlsTBQlJLc4lggzz0Fk_vbmBw6NEG5KPDCK5-xkM05zxBotxoezEjf2JJFlMYPDqehqb-4NrODO8w6BlJ4b-n59s96gKBEOstH4c89_24D3O3adObsrGkmzM66cF43PCbImsbMLOeaGuHldTM5CprpsF8-akfeAGJFjfxjs3VDPKzuQ7lKABWe1wvGokxdlR7UlAYkO3nSj067agsKupRJEeibt4hEhK0WwCvJnezg',
    rating: 5,
    reviewsCount: 47,
    badges: ['Linha Campo & Haras'],
    unitBadge: 'Saca',
  },
  {
    id: 'prod-bravecto-10-20',
    name: 'Bravecto Cães de 10 a 20kg Comprimido Mastigável (500mg)',
    brand: 'MSD Saúde Animal',
    category: 'farmacia',
    price: 219.90,
    oldPrice: 259.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuXLWGzzXajtsjUTNXpDxiXgdfG_n88d5xfszvRvUGJ0qx6bnXDxByU-joakfC7wXeyPfJRvUALgVwIMSUtM43HRPz89Qfb1mgERS96qSsjKEn42ZJiFuZ_0SvJ9HdgQXY_2GYXNld9WghFVNK9YlxuQXLrHlXv0Y0LJ_Vy7oComedc_XceAv7fEhvihJweqaGZWNx4IC2qmukYkUNaxxbJ1R0mx8wbZn0KtWdZJA9PSv2xUeplkQa',
    rating: 5,
    reviewsCount: 310,
    badges: ['Proteção 12 Semanas'],
  },
  {
    id: 'prod-mistura-aves-1kg',
    name: 'Mistura Especial Super Premium Calopsita & Agapornis 1kg',
    brand: 'Nutrição de Aves',
    category: 'passaros',
    price: 22.80,
    oldPrice: 29.90,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJi21R4VuEfMOdOtp_RPZFGeDgYMvjaluYuv1fjO5bBhWWmqkISP0E6NLFhYCJzFcM8ows0dMmJIHT-FiIL7Zb0LRyESzKpUNNsugaOWVqkjD_Kt4lUjLHqPJi8yWsgCC03p0_E_WIOqB8A9ovQQRSu7fPI3wDf5sX6g7aotFHllo2HGRqNAEdaZhOcaIQx_wNqcWlntpKlzj3X1oek08Z7YC4qJiwjaH1xUN-wNKHTzb6ckkaZZ1O',
    rating: 5,
    reviewsCount: 84,
    badges: ['100% Natural'],
  },
];

export function FeaturedProducts() {
  const { addItem } = useCart();
  const [selectedFilter, setSelectedFilter] = useState('todos');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const filterOptions = [
    { label: 'Todos os Itens', value: 'todos' },
    { label: 'Cães Adultos', value: 'caes' },
    { label: 'Gatos Castrados', value: 'gatos' },
    { label: 'Antiparasitários', value: 'farmacia' },
    { label: 'Linha Cavalos', value: 'agro' },
  ];

  const filteredProducts =
    selectedFilter === 'todos'
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((p) => p.category === selectedFilter);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const nextState = !prev[id];
      if (nextState) {
        toast.success('Adicionado aos favoritos! ♡');
      }
      return { ...prev, [id]: nextState };
    });
  };

  const handleAddToCart = (product: ProductItem) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    toast.success(`${product.name.slice(0, 32)}... adicionado ao carrinho! ✓`);
  };

  return (
    <section className="w-full py-16 bg-[#eff4ff]" id="destaques">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header with Quick Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-1.5 text-[#00687b] text-xs uppercase tracking-wider font-extrabold mb-1">
              <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
              <span>Alta Procura na Região de Sorocaba</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B0F17]">
              Destaques &amp; Mais Vendidos
            </h2>
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSelectedFilter(opt.value)}
                className={`font-bold text-xs px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedFilter === opt.value
                    ? 'bg-[#0B0F17] text-white shadow-xs'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl p-6 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 relative group border border-gray-100 hover-lift"
            >
              {/* Badges Left */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
                {product.badges.map((b, idx) => (
                  <span
                    key={idx}
                    className={`font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase ${
                      b.includes('OFF')
                        ? 'bg-[#ba1a1a] text-white'
                        : b.includes('Frete')
                        ? 'bg-[#10B981] text-white'
                        : b.includes('Original') || b.includes('Proteção')
                        ? 'bg-[#00c0e3] text-black'
                        : 'bg-[#0B0F17] text-white'
                    }`}
                  >
                    {b}
                  </span>
                ))}
              </div>

              {/* Wishlist Button Right */}
              <button
                type="button"
                aria-label="Favoritar"
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#eff4ff] text-gray-400 hover:text-red-500 hover:bg-white flex items-center justify-center transition-colors shadow-xs"
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={favorites[product.id] ? { fontVariationSettings: '"FILL" 1', color: '#ef4444' } : {}}
                >
                  favorite
                </span>
              </button>

              {/* Image Container */}
              <div className="w-full aspect-square bg-white flex items-center justify-center p-4 mb-4 overflow-hidden rounded-2xl relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Details */}
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="flex text-[#F59E0B]">
                    {[...Array(product.rating)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[16px]"
                        style={{ fontVariationSettings: '"FILL" 1' }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 font-medium">({product.reviewsCount})</span>
                </div>

                <span className="text-[11px] text-[#00687b] uppercase font-extrabold tracking-wider block">
                  {product.brand}
                </span>

                <h3 className="font-extrabold text-sm sm:text-base text-[#0B0F17] mt-1 mb-2 line-clamp-2 leading-snug">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs text-gray-400 line-through">
                    R$ {product.oldPrice.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#00687b]">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="bg-[#00c0e3]/20 text-[#004a59] text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                    {product.unitBadge || 'PIX'}
                  </span>
                </div>
              </div>

              {/* Actions Bottom */}
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-[#0B0F17] hover:bg-gray-800 text-white text-xs font-extrabold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 hover-lift active-press"
                >
                  <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                  <span>Comprar Agora</span>
                </button>
                <button
                  type="button"
                  aria-label="Adicionar 1 unidade rápida"
                  onClick={() => handleAddToCart(product)}
                  className="w-11 h-11 rounded-xl bg-[#00c0e3] hover:bg-[#00A8C7] text-[#0B0F17] flex items-center justify-center transition-colors shadow-xs hover-lift active-press"
                >
                  <span className="material-symbols-outlined text-[20px]">add</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Help Banner */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#00c0e3]/20 flex items-center justify-center text-[#00687b] shrink-0">
              <span className="material-symbols-outlined text-[24px]">support_agent</span>
            </div>
            <div>
              <h4 className="font-extrabold text-base sm:text-lg text-[#0B0F17]">
                Dúvidas sobre o peso ou dosagem ideal?
              </h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Nossa equipe do balcão em Sorocaba ajuda você a escolher o produto certo para o porte do seu pet.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/5515996580804"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0B0F17] text-xs font-bold px-6 py-3 rounded-full transition-all flex items-center gap-2 whitespace-nowrap hover-lift shrink-0"
          >
            <span className="material-symbols-outlined text-[#10B981] text-[18px]">chat</span>
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}