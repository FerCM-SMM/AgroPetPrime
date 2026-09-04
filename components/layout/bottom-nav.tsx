'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/hooks/use-cart';
import { Home, Layers, MessageCircle, ShoppingCart } from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  // Não exibir no admin
  if (pathname.startsWith('/admin')) return null;

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5515996580804';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de fazer um pedido pelo WhatsApp.')}`;

  const navs = [
    { label: 'Início', href: '/', icon: Home, active: pathname === '/' },
    { label: 'Categorias', href: '/categorias', icon: Layers, active: pathname.startsWith('/categorias') },
    { label: 'WhatsApp', href: whatsappUrl, icon: MessageCircle, isExternal: true },
    { label: 'Carrinho', href: '/carrinho', icon: ShoppingCart, badge: totalItems, active: pathname === '/carrinho' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FFFDF8]/95 backdrop-blur-xl border-t border-[#8B5F3A]/15 shadow-2xl px-2 py-2">
      <div className="grid grid-cols-4 gap-1 items-center">
        {navs.map((item, idx) => {
          const Icon = item.icon;
          const content = (
            <div
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
                item.active
                  ? 'text-[#00829B] font-extrabold'
                  : 'text-gray-500 hover:text-[#20241F]'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 w-4 h-4 rounded-full bg-[#E06F12] text-white text-[10px] font-black flex items-center justify-center border-2 border-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
            </div>
          );

          if (item.isExternal) {
            return (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </a>
            );
          }

          return (
            <Link key={idx} href={item.href}>
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}