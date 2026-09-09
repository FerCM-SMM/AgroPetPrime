'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ShoppingCart, ArrowRight, Phone, ShieldCheck, Truck } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';

const FREE_SHIPPING_THRESHOLD = 149.0;

export default function CartPage() {
  const { items, total, updateQuantity, removeItem } = useCart();
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
  const freeShippingProgress = Math.min(100, Math.round((total / FREE_SHIPPING_THRESHOLD) * 100));

  if (items.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-[#FAF7F2] border border-[#8B5F3A]/15 flex items-center justify-center mx-auto mb-6 text-gray-400">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#20241F] mb-3">
          Seu carrinho está vazio
        </h2>
        <p className="text-sm text-[#20241F]/70 mb-8 max-w-md mx-auto">
          Explore nossas rações nobres super premium, petiscos e medicamentos veterinários com entrega rápida em Sorocaba.
        </p>
        <Link
          href="/categorias"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm bg-[#1C4E47] hover:bg-[#12c0e0] text-white hover:text-[#20241F] transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Ver Catálogo Completo</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#20241F] mb-8">
        Carrinho de Compras
      </h1>

      {/* Barra de Progresso de Frete Grátis para Sorocaba & Região */}
      <div className="bg-[#FAF7F2] border border-[#8B5F3A]/15 rounded-2xl p-4 mb-8">
        <div className="flex items-center justify-between text-xs font-bold text-[#20241F] mb-2">
          <span className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-[#1C4E47]" />
            {remainingForFreeShipping === 0
              ? 'Parabéns! Você ganhou Frete Grátis em Sorocaba!'
              : `Faltam ${formatCurrency(remainingForFreeShipping)} para FRETE GRÁTIS`}
          </span>
          <span className="text-[#1C4E47]">{freeShippingProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#1C4E47] h-full transition-all duration-500 rounded-full"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Lista de Itens do Carrinho */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-[#8B5F3A]/15 shadow-xs flex items-center gap-4 transition-all"
            >
              <div className="relative w-20 h-20 bg-[#FAF7F2] rounded-xl flex-shrink-0 overflow-hidden flex items-center justify-center p-2 border border-[#8B5F3A]/10">
                {item.product.image_urls?.[0] ? (
                  <Image
                    src={item.product.image_urls[0]}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                ) : (
                  <ShoppingCart className="w-6 h-6 text-gray-300" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-[#20241F] line-clamp-2 leading-snug mb-1">
                  {item.product.name}
                </h3>
                <p className="text-xs font-bold text-[#1C4E47]">
                  {formatCurrency(item.product.price)}
                </p>
              </div>

              {/* Seletor de Quantidade */}
              <div className="flex items-center gap-1 border border-gray-200 rounded-full p-1 bg-gray-50/50">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-200 text-[#20241F] font-bold text-xs transition-colors"
                >
                  -
                </button>
                <span className="w-7 text-center font-bold text-xs text-[#20241F]">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-200 text-[#20241F] font-bold text-xs transition-colors"
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <span className="font-bold text-sm text-[#20241F] block">
                  {formatCurrency(item.product.price * item.quantity)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => removeItem(item.product.id)}
                className="text-gray-400 hover:text-red-500 p-2 rounded-lg transition-colors"
                title="Remover item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Resumo do Pedido */}
        <div className="lg:col-span-4 bg-[#FAF7F2] rounded-3xl p-6 border border-[#8B5F3A]/15 sticky top-24 shadow-xs">
          <h2 className="text-xl font-serif font-bold text-[#20241F] mb-5">
            Resumo do Pedido
          </h2>
          <div className="space-y-3 mb-6 text-xs text-[#20241F]/80">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-sm text-[#20241F]">{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between">
              <span>Frete Sorocaba</span>
              <span className="font-semibold text-emerald-700">
                {remainingForFreeShipping === 0 ? 'Grátis' : 'Calculado no checkout'}
              </span>
            </div>
            <div className="flex justify-between items-center text-emerald-700 bg-emerald-50/80 p-2 rounded-xl border border-emerald-200/60">
              <span>🎁 Cashback de 5%:</span>
              <span className="font-bold">+{formatCurrency(total * 0.05)}</span>
            </div>
            <div className="border-t border-[#8B5F3A]/15 pt-4 flex justify-between items-baseline text-base font-bold text-[#20241F]">
              <span>Total</span>
              <span className="text-2xl font-black text-[#1C4E47]">{formatCurrency(total)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm bg-[#1C4E47] hover:bg-[#12c0e0] text-white hover:text-[#20241F] flex items-center justify-center gap-2 transition-all shadow-md mb-3 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Prosseguir para o Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 text-center mt-4">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Compra protegida com atendimento direto</span>
          </div>
        </div>
      </div>
    </main>
  );
}
