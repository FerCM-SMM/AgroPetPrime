'use client';

import { useState } from 'react';
import { ShoppingCart, MessageCircle, Plus, Minus } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { formatCurrency } from '@/lib/utils';
import { Product } from '@/types/schema';
import { toast } from 'sonner';

export function ProductDetailClient({ product, whatsapp }: { product: Product; whatsapp: string }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addItem(product, quantity);
    toast.success(`${quantity}x ${product.name} adicionado ao carrinho`);
  };

  const handleWhatsApp = () => {
    const total = product.price * quantity;
    const msg = encodeURIComponent(
      `Olá AgroPet Pr1me! Gostaria de comprar:\n- ${quantity}x ${product.name} — ${formatCurrency(total)}\nhttps://agropetpr1me.com.br/produto/${product.slug}`
    );
    window.open(`https://wa.me/${whatsapp}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Seletor de Quantidade */}
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          Quantidade:
        </span>
        <div className="flex items-center border border-[#8B5F3A]/20 bg-white rounded-full p-1 shadow-xs">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#20241F] hover:bg-gray-100 transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center font-bold text-sm text-[#20241F]">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#20241F] hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={handleAdd}
          className="flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm bg-[#1C4E47] hover:bg-[#12c0e0] text-white hover:text-[#20241F] flex items-center justify-center gap-2 transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Adicionar ao Carrinho</span>
        </button>

        <button
          type="button"
          onClick={handleWhatsApp}
          className="flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm bg-white hover:bg-emerald-50 text-emerald-700 border-2 border-emerald-600/40 hover:border-emerald-600 flex items-center justify-center gap-2 transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98]"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600" />
          <span>Comprar via WhatsApp</span>
        </button>
      </div>
    </div>
  );
}
