'use client';

import { Button } from '@/components/ui/button';
import { ShoppingCart, MessageCircle } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { formatCurrency } from '@/lib/utils';
import { Product } from '@/types/schema';
import { toast } from 'sonner';

export function ProductDetailClient({ product, whatsapp }: { product: Product; whatsapp: string }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(product, 1);
    toast.success(`${product.name} adicionado ao carrinho`);
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Olá AgroPet Pr1me! Gostaria de comprar:\n- ${product.name} — ${formatCurrency(product.price)}\nhttps://agropetpr1me.com.br/produto/${product.slug}`
    );
    window.open(`https://wa.me/${whatsapp}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col gap-3">
      <Button size="lg" onClick={handleAdd} className="w-full bg-[#12c0e0] text-black hover:bg-[#0ea5e9]">
        <ShoppingCart className="w-5 h-5 mr-2" />
        Adicionar ao Carrinho
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={handleWhatsApp}
        className="w-full border-[#12c0e0] text-[#12c0e0] hover:bg-[#12c0e0] hover:text-black"
      >
        <MessageCircle className="w-5 h-5 mr-2" />
        Comprar pelo WhatsApp
      </Button>
    </div>
  );
}
