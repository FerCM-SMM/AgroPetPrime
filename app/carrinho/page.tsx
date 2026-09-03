'use client';

import Link from 'next/link';
import { Trash2, ShoppingCart, ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';

export default function CartPage() {
  const { items, total, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-24 text-center">
        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#000000] mb-4">Carrinho vazio</h2>
        <p className="text-gray-600 mb-8">Adicione produtos ao carrinho para comecar sua compra.</p>
        <Link href="/categorias">
          <Button className="bg-[#12c0e0] text-black hover:bg-[#0ea5e9]">Ver Catalogo</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#000000] mb-8">Carrinho de Compras</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.product.id} className="p-4 flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center">
                {item.product.image_urls?.[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.product.image_urls[0]} alt={item.product.name} className="object-cover w-full h-full" />
                ) : null}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#000000]">{item.product.name}</h3>
                <p className="text-[#12c0e0] font-bold">{formatCurrency(item.product.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#12c0e0] hover:text-white transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#12c0e0] hover:text-white transition-colors"
                >
                  +
                </button>
              </div>
              <span className="font-bold text-[#000000]">{formatCurrency(item.product.price * item.quantity)}</span>
              <button onClick={() => removeItem(item.product.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </Card>
          ))}
        </div>

        <div className="bg-[#f8fafc] rounded-xl p-6 h-fit">
          <h2 className="text-xl font-bold text-[#000000] mb-4">Resumo do Pedido</h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Frete</span>
              <span>Calculado no checkout</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-[#12c0e0]">{formatCurrency(total)}</span>
            </div>
          </div>
          <Link href="/checkout">
            <Button size="lg" className="w-full bg-[#12c0e0] text-black hover:bg-[#0ea5e9] mb-3">
              <ArrowRight className="w-5 h-5 mr-2" />
              Finalizar Pedido
            </Button>
          </Link>
          <Button variant="outline" className="w-full border-[#12c0e0] text-[#12c0e0] hover:bg-[#12c0e0] hover:text-black">
            <Phone className="w-5 h-5 mr-2" />
            Comprar pelo WhatsApp
          </Button>
        </div>
      </div>
    </main>
  );
}
