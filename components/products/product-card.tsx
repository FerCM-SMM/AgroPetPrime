'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Check, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { Product } from '@/types/schema';
import { useCart } from '@/hooks/use-cart';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const discountPercent = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : null;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAdded(true);
    toast.success(`${product.name} adicionado ao carrinho! 🛒`);
    setTimeout(() => setAdded(false), 1400);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      toast.info('Salvo na sua lista de desejos! ❤️');
    }
  };

  const imageUrl = product.image_urls?.[0] || '/images/hero-pets.jpg';

  return (
    <div className="bg-white rounded-3xl p-5 border border-[#ede8dc] shadow-xs hover-lift group relative flex flex-col justify-between h-full transition-all">
      {/* Top Floating Badges */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
        {discountPercent ? (
          <span className="bg-[#12c0e0] text-black text-[11px] font-extrabold px-3 py-1 rounded-full shadow-xs pointer-events-auto">
            -{discountPercent}% OFF
          </span>
        ) : (
          <span className="bg-[#10b981]/15 text-[#059669] text-[11px] font-bold px-3 py-1 rounded-full shadow-xs pointer-events-auto">
            Destaque
          </span>
        )}

        <button
          type="button"
          onClick={handleFavorite}
          className={`w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xs border border-[#ede8dc] transition-all hover-lift active-press pointer-events-auto ${
            isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-500'
          }`}
          aria-label="Adicionar aos favoritos"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
      </div>

      <Link href={`/produto/${product.slug}`} className="block flex-1">
        {/* Product Image Container */}
        <div className="relative w-full aspect-square bg-[#faf8f5] rounded-2xl overflow-hidden mb-4 p-4 flex items-center justify-center">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-contain p-2 transition-transform duration-500 group-hover:scale-106"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Rating & Brand */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="flex text-[#f59e0b]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
            ))}
          </div>
          <span className="text-xs font-semibold text-gray-500">4.9 (128)</span>
        </div>

        {/* Name */}
        <h3 className="font-bold text-[#111827] text-sm sm:text-base line-clamp-2 group-hover:text-[#0284c7] transition-colors mb-2 leading-snug">
          {product.name}
        </h3>

        {/* Price Section */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-[#111827]">
              {formatCurrency(product.price)}
            </span>
            {product.compare_at_price && (
              <span className="text-xs text-gray-400 line-through">
                {formatCurrency(product.compare_at_price)}
              </span>
            )}
          </div>
          <p className="text-[11px] text-gray-500 mt-0.5">
            ou 3x de {formatCurrency(product.price / 3)} sem juros
          </p>
        </div>
      </Link>

      {/* Add to Cart Pill Button */}
      <Button
        type="button"
        onClick={handleAdd}
        className={`w-full py-5 rounded-full font-bold text-xs tracking-wide transition-all hover-lift active-press flex items-center justify-center gap-2 ${
          added
            ? 'bg-[#10b981] text-white'
            : 'bg-[#12c0e0] hover:bg-[#0ea5e9] text-black shadow-xs'
        }`}
      >
        {added ? (
          <>
            <Check className="w-4 h-4 stroke-[3]" />
            <span>ADICIONADO!</span>
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" />
            <span>ADICIONAR AO CARRINHO</span>
          </>
        )}
      </Button>
    </div>
  );
}
