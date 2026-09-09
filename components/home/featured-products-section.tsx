'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star, MessageCircle, ArrowRight, Check } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { toast } from 'sonner';

interface FeaturedProductsSectionProps {
  activeAudience?: 'pet' | 'agro';
}

export function FeaturedProductsSection({ activeAudience = 'pet' }: FeaturedProductsSectionProps) {
  const { addItem } = useCart();
  const [activeTab, setActiveTab] = useState<string>('todos');

  // Sincroniza tab com o toggle da Hero
  useEffect(() => {
    if (activeAudience === 'agro') {
      setActiveTab('agro');
    } else {
      if (activeTab === 'agro') {
        setActiveTab('todos');
      }
    }
  }, [activeAudience]);

  const tabs = [
    { id: 'todos', label: 'Todos os Itens' },
    { id: 'caes', label: 'Cães Adultos' },
    { id: 'gatos', label: 'Gatos Castrados' },
    { id: 'farmacia', label: 'Farmácia Veterinária' },
    { id: 'agro', label: 'Campo & Equinos' },
  ];

  const products = [
    {
      id: 'premier-formula-15kg',
      name: 'Ração Premier Formula Cães Adultos Raças Médias e Grandes 15kg',
      category: 'caes',
      badge: 'Mais Vendido',
      badgeColor: 'bg-[#20BEE2] text-black',
      price: 237.7,
      comparePrice: 289.9,
      discount: '-18% OFF',
      reviews: 142,
      rating: 4.9,
      image: '/images/prod-dog-food.jpg',
      variations: ['15kg', '20kg'],
      description: 'Alta digestibilidade, pelagem brilhante e suporte articular.',
    },
    {
      id: 'royal-canin-castrados-7kg',
      name: 'Ração Royal Canin Gatos Adultos Castrados 7.5kg',
      category: 'gatos',
      badge: '-15% OFF',
      badgeColor: 'bg-emerald-500 text-white',
      price: 254.15,
      comparePrice: 299.0,
      discount: '-15% OFF',
      reviews: 98,
      rating: 4.9,
      image: '/images/prod-grooming.jpg',
      variations: ['7.5kg', '10kg'],
      description: 'Controle de peso rigoroso e saúde do trato urinário felino.',
    },
    {
      id: 'simparic-80mg',
      name: 'Antipulgas e Carrapatos Simparic 80mg (Cães 20-40kg)',
      category: 'farmacia',
      badge: 'Original Zoetis',
      badgeColor: 'bg-[#51FFE6] text-black',
      price: 119.9,
      comparePrice: 139.9,
      discount: '-14% OFF',
      reviews: 215,
      rating: 5.0,
      image: '/images/hero-pets.jpg',
      variations: ['1 Comprimido', '3 Comprimidos'],
      description: 'Ação rápida em até 3 horas contra pulgas, carrapatos e sarnas.',
    },
    {
      id: 'racao-cavalo-atleta-25kg',
      name: 'Ração Equinos Alta Energia Cavalo Atleta Laminada 25kg',
      category: 'agro',
      badge: 'Linha Campo & Haras',
      badgeColor: 'bg-amber-500 text-black',
      price: 142.5,
      comparePrice: 165.0,
      discount: '-13% OFF',
      reviews: 64,
      rating: 4.8,
      image: '/images/hero-pitbull-bowl.jpg',
      variations: ['25kg', '50kg (2x25)'],
      description: 'Aveia laminada, melaço e minerais quelatados para força muscular.',
    },
    {
      id: 'caminha-donut-nuvem',
      name: 'Caminha Donut Faux-Fur Nuvem Ultra Macia Lavável Bege',
      category: 'caes',
      badge: 'Toque Macio',
      badgeColor: 'bg-purple-500 text-white',
      price: 149.9,
      comparePrice: 189.9,
      discount: '-21% OFF',
      reviews: 87,
      rating: 4.9,
      image: '/images/prod-pet-bed.jpg',
      variations: ['Tamanho M', 'Tamanho G'],
      description: 'Borda elevada para apoio de cabeça e fundo impermeável lavável.',
    },
    {
      id: 'kit-banho-tosa-vegano',
      name: 'Kit Banho & Tosa: Shampoo Hipoalergênico 473ml + Escova Bambu',
      category: 'caes',
      badge: 'Fórmula Vegana',
      badgeColor: 'bg-teal-600 text-white',
      price: 89.9,
      comparePrice: 110.0,
      discount: '-18% OFF',
      reviews: 43,
      rating: 4.7,
      image: '/images/prod-pet-toy.jpg',
      variations: ['Kit Completo'],
      description: 'Sem corantes ou sulfatos pesados, ideal para pele sensível.',
    },
  ];

  const filteredProducts =
    activeTab === 'todos'
      ? products
      : products.filter((p) => p.category === activeTab);

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.id,
      price: product.price,
      compare_at_price: product.comparePrice,
      description: product.description,
      short_description: product.description,
      stock: 50,
      category_id: product.category,
      brand: 'AgroPet Pr1me',
      image_urls: [product.image],
      animal_types: ['dog'],
      featured: true,
      active: true,
      tags: [product.category],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  return (
    <section id="produtos" className="py-20 bg-[#FAF7F2] text-black">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-[#20BEE2] bg-black text-white px-4 py-1.5 rounded-full mb-3">
            Seleção Especial
          </span>
          <h2 className="font-['Archivo_Black',sans-serif] text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-black">
            Destaques para seu Pet &amp; Campo
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3 font-normal">
            Itens originais de alta nutrição e saúde, com entrega expressa para toda a região de Sorocaba.
          </p>
        </div>

        {/* Tabs de Filtro */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-12 select-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-black whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-black text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:text-black hover:bg-white/80 border border-neutral-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid de Cards de Produto */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="group bg-white rounded-3xl p-6 border border-neutral-200 hover:border-[#20BEE2] shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Imagem com Badge e Efeito Zoom no Hover */}
                <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-neutral-100 mb-5">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {prod.badge && (
                    <span
                      className={`absolute top-3 left-3 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md ${prod.badgeColor}`}
                    >
                      {prod.badge}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 bg-black/80 text-white text-[10px] font-black px-2.5 py-1 rounded-full backdrop-blur-xs">
                    {prod.discount}
                  </span>
                </div>

                {/* Avaliação */}
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-500">
                    {prod.rating} ({prod.reviews} avaliações)
                  </span>
                </div>

                {/* Nome do Produto */}
                <h3 className="font-bold text-base text-black leading-snug line-clamp-2 mb-3 group-hover:text-[#20BEE2] transition-colors">
                  {prod.name}
                </h3>

                {/* Variações */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {prod.variations.map((v, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-bold text-gray-600 bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded-md"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              {/* Preços e Ação de Compra */}
              <div className="pt-4 border-t border-neutral-100">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xs text-gray-400 line-through">
                    R$ {prod.comparePrice.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="font-['Archivo_Black',sans-serif] text-2xl font-black text-black">
                    R$ {prod.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(prod)}
                    className="w-full bg-black hover:bg-neutral-800 text-white text-xs font-black py-3 rounded-full flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 text-[#20BEE2]" />
                    <span>Adicionar</span>
                  </button>

                  <a
                    href={`https://wa.me/5515996580804?text=Ol%C3%A1!%20Gostaria%20de%20comprar%20o%20produto%20${encodeURIComponent(prod.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#20BEE2] hover:bg-[#51FFE6] text-black text-xs font-black py-3 rounded-full flex items-center justify-center gap-1.5 transition-all active:scale-95"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-black" />
                    <span>Pedir Zap</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botão Final: Ver Catálogo Completo */}
        <div className="mt-14 text-center">
          <Link
            href="/categorias/racoes"
            className="inline-flex items-center gap-2 bg-black hover:bg-neutral-800 text-white font-black text-xs sm:text-sm px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-all"
          >
            <span>Ver Todos os Itens do Catálogo</span>
            <ArrowRight className="w-4 h-4 text-[#20BEE2]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
