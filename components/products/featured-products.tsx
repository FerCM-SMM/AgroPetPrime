'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingCart, Star, Flame, Check } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { toast } from 'sonner';

interface ProductItem {
  id: string;
  name: string;
  brand: string;
  category: 'caes' | 'gatos' | 'farmacia' | 'agro' | 'conforto';
  price: number;
  oldPrice: number;
  image: string;
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
  badges: string[];
  sizes: string[];
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
    isBestSeller: true,
    badges: ['-18% OFF', 'Mais Vendido'],
    sizes: ['1kg', '15kg', '20kg'],
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
    sizes: ['1.5kg', '7.5kg', '10kg'],
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
    sizes: ['1 comp.', '3 comp.'],
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
    sizes: ['25kg', '40kg'],
  },
  {
    id: 'prod-caminha-donut',
    name: 'Caminha Donut Faux-Fur Nuvem Ultra Macia Lavável Bege',
    brand: 'AgroPet Prime • Conforto',
    category: 'conforto',
    price: 149.90,
    oldPrice: 189.90,
    image: '/images/prod-pet-bed.jpg',
    rating: 5,
    reviewsCount: 84,
    badges: ['Toque Macio'],
    sizes: ['P (50cm)', 'M (70cm)', 'G (90cm)'],
  },
  {
    id: 'prod-shampoo-bambu',
    name: 'Kit Banho & Tosa: Shampoo Hipoalergênico 473ml + Escova Bambu',
    brand: 'Higiene & Estética Natural',
    category: 'farmacia',
    price: 89.90,
    oldPrice: 110.00,
    image: '/images/prod-grooming.jpg',
    rating: 5,
    reviewsCount: 63,
    badges: ['Fórmula Vegana'],
    sizes: ['473ml', '1 Litro'],
  },
];

export function FeaturedProducts() {
  const { addItem } = useCart();
  const [activeTab, setActiveTab] = useState<'all' | 'caes' | 'gatos' | 'agro' | 'farmacia'>('all');
  const [userJourney, setUserJourney] = useState<'all' | 'pet' | 'agro'>('all');

  // Seletores rápidos de tamanho/peso no card
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    'prod-premier-15kg': '15kg',
    'prod-royal-canin-cat': '7.5kg',
    'prod-simparic-80mg': '1 comp.',
    'prod-equinos-25kg': '25kg',
    'prod-caminha-donut': 'M (70cm)',
    'prod-shampoo-bambu': '473ml',
  });

  // Ouve a jornada selecionada no Header
  useEffect(() => {
    const handleJourneyChange = (e: any) => {
      if (e.detail) {
        setUserJourney(e.detail);
        if (e.detail === 'agro') {
          setActiveTab('agro');
        } else if (e.detail === 'pet') {
          setActiveTab('caes');
        } else {
          setActiveTab('all');
        }
      }
    };

    window.addEventListener('agropet-journey-change', handleJourneyChange);
    try {
      const stored = localStorage.getItem('agropet-user-journey');
      if (stored === 'agro') {
        setUserJourney('agro');
        setActiveTab('agro');
      } else if (stored === 'pet') {
        setUserJourney('pet');
        setActiveTab('caes');
      }
    } catch {}

    return () => {
      window.removeEventListener('agropet-journey-change', handleJourneyChange);
    };
  }, []);

  const handleSelectSize = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product: ProductItem) => {
    const chosenSize = selectedSizes[product.id] || product.sizes[0];
    addItem({
      id: `${product.id}-${chosenSize}`,
      name: `${product.name} (${chosenSize})`,
      slug: product.id,
      price: product.price,
      stock: 50,
      category_id: product.category,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      image_urls: [product.image],
    });
    toast.success(`Adicionado: ${product.name} (${chosenSize})`);
  };

  // Filtra produtos de acordo com a aba e prioriza jornada
  const filteredProducts = PRODUCTS_DATA.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'caes') return p.category === 'caes';
    if (activeTab === 'gatos') return p.category === 'gatos';
    if (activeTab === 'agro') return p.category === 'agro';
    if (activeTab === 'farmacia') return p.category === 'farmacia';
    return true;
  }).sort((a, b) => {
    if (userJourney === 'agro') {
      if (a.category === 'agro' && b.category !== 'agro') return -1;
      if (b.category === 'agro' && a.category !== 'agro') return 1;
    }
    // "Mais Vendido" fica em destaque
    if (a.isBestSeller && !b.isBestSeller) return -1;
    if (b.isBestSeller && !a.isBestSeller) return 1;
    return 0;
  });

  return (
    <section id="destaques" className="w-full py-16 sm:py-20 bg-[#FFFDF8]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold text-[#E06F12] block mb-1">
              Catálogo Selecionado
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#20241F] tracking-tight">
              Destaques para seu Pet &amp; Campo
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#20241F]/70 max-w-md">
            Itens originais de alta nutrição e saúde, com entrega expressa para toda a região de Sorocaba.
          </p>
        </div>

        {/* FILTRO STICKY: Fixa no topo ao rolar a seção para facilitar a navegação */}
        <div className="sticky top-16 sm:top-20 z-30 bg-[#FFFDF8]/95 backdrop-blur-md py-3.5 mb-8 border-y border-[#8B5F3A]/10">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-[#20241F] text-white shadow-xs'
                  : 'bg-white text-[#20241F] border border-[#8B5F3A]/20 hover:border-[#20241F]'
              }`}
            >
              Todos os Itens
            </button>
            <button
              onClick={() => setActiveTab('caes')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'caes'
                  ? 'bg-[#12c0e0] text-[#20241F] shadow-xs'
                  : 'bg-white text-[#20241F] border border-[#8B5F3A]/20 hover:border-[#12c0e0]'
              }`}
            >
              Cães Adultos
            </button>
            <button
              onClick={() => setActiveTab('gatos')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'gatos'
                  ? 'bg-[#12c0e0] text-[#20241F] shadow-xs'
                  : 'bg-white text-[#20241F] border border-[#8B5F3A]/20 hover:border-[#12c0e0]'
              }`}
            >
              Gatos Castrados
            </button>
            <button
              onClick={() => setActiveTab('farmacia')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'farmacia'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-[#20241F] border border-[#8B5F3A]/20 hover:border-emerald-600'
              }`}
            >
              Farmácia Veterinária
            </button>
            <button
              onClick={() => setActiveTab('agro')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'agro'
                  ? 'bg-[#3591A1] text-white shadow-xs'
                  : 'bg-white text-[#20241F] border border-[#8B5F3A]/20 hover:border-[#3591A1]'
              }`}
            >
              Campo &amp; Equinos
            </button>
          </div>
        </div>

        {/* GRID DE PRODUTOS: Quebra do padrão kit SaaS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isHighlighted = product.isBestSeller;
            const currentSize = selectedSizes[product.id] || product.sizes[0];

            return (
              <div
                key={product.id}
                className={`group relative rounded-3xl transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  isHighlighted
                    ? 'bg-[#FFF9F2] border-2 border-[#E06F12]/40 shadow-md sm:col-span-2 lg:col-span-1'
                    : 'bg-white border border-[#8B5F3A]/15 hover:border-[#12c0e0]/50 hover:shadow-lg shadow-xs'
                }`}
              >
                {/* Top Badges */}
                <div className="p-4 pb-0 flex items-center justify-between z-10">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {product.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          badge.includes('Vendido')
                            ? 'bg-[#E06F12] text-white flex items-center gap-1 shadow-xs font-black'
                            : badge.includes('OFF')
                            ? 'bg-[#20241F] text-[#12c0e0]'
                            : 'bg-[#3591A1]/15 text-[#00829B]'
                        }`}
                      >
                        {badge.includes('Vendido') && <Flame className="w-3 h-3 fill-white" />}
                        {badge}
                      </span>
                    ))}
                  </div>

                  <span className="text-[11px] font-bold text-gray-400">
                    {product.brand.split(' ')[0]}
                  </span>
                </div>

                {/* Imagem do Produto */}
                <div className="relative w-full h-52 sm:h-56 p-4 flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Informações e Detalhes */}
                <div className="p-5 pt-2 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Avaliação em Estrelas */}
                    <div className="flex items-center gap-1 mb-1.5">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] font-bold text-gray-400 ml-1">
                        ({product.reviewsCount})
                      </span>
                    </div>

                    {/* Nome do Produto */}
                    <h3 className="font-bold text-sm text-[#20241F] leading-snug line-clamp-2 group-hover:text-[#12c0e0] transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  {/* Preços */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] text-gray-400 line-through block">
                        R$ {product.oldPrice.toFixed(2)}
                      </span>
                      <span className="text-xl font-black text-[#20241F]">
                        R$ {product.price.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      PIX ou Cartão
                    </span>
                  </div>

                  {/* AÇÃO NO HOVER: Opções de peso/tamanho com botão de 1 clique direto no card */}
                  <div className="mt-4 pt-3 border-t border-dashed border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-medium text-gray-500">
                        Embalagem / Tamanho:
                      </span>
                      <span className="text-xs font-bold text-[#20241F]">
                        {currentSize}
                      </span>
                    </div>

                    {/* Botões rápidos de peso */}
                    <div className="grid grid-cols-3 gap-1.5 mb-3">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleSelectSize(product.id, size)}
                          className={`py-1 px-1.5 rounded-lg text-[11px] font-bold transition-all text-center ${
                            currentSize === size
                              ? 'bg-[#12c0e0] text-[#20241F] shadow-xs'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>

                    {/* Botão Adicionar ao Carrinho */}
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-[#20241F] hover:bg-[#12c0e0] text-white hover:text-[#20241F] flex items-center justify-center gap-2 transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Adicionar ao Carrinho</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}