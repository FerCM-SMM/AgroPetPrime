'use client';

import Link from 'next/link';
import { ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { Product } from '@/types/schema';
import { useCart } from '@/hooks/use-cart';
import { toast } from 'sonner';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAdded(true);
    toast.success(`${product.name} adicionado ao carrinho`);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <Link href={`/produto/${product.slug}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 group-hover:shadow-lg transition-all">
        <div className="aspect-square bg-[#f8fafc] flex items-center justify-center p-4">
          {product.image_urls?.[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.image_urls[0]} alt={product.name} className="object-contain w-full h-full" />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-lg" />
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-[#000000] mb-1 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-[#12c0e0]">{formatCurrency(product.price)}</span>
            {product.compare_at_price && (
              <span className="text-sm text-gray-400 line-through">{formatCurrency(product.compare_at_price)}</span>
            )}
          </div>
          <Button
            size="sm"
            onClick={handleAdd}
            className="w-full mt-3 bg-[#12c0e0] text-black hover:bg-[#0ea5e9]"
          >
            {added ? <Check className="w-4 h-4 mr-2" /> : <ShoppingCart className="w-4 h-4 mr-2" />}
            {added ? 'Adicionado!' : 'Adicionar'}
          </Button>
        </div>
      </div>
    </Link>
  );
}
