'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  BarChart3,
  Store,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', label: 'Dashboard & Vendas', icon: LayoutDashboard },
  { href: '/admin/produtos', label: 'Gerenciar Produtos', icon: Package },
  { href: '/admin/pedidos', label: 'Pedidos do Site', icon: ShoppingCart },
  { href: '/admin/clientes', label: 'Base de Clientes', icon: Users },
  { href: '/admin/analytics', label: 'Relatórios & Métricas', icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col justify-between shrink-0">
      <div>
        {/* Admin Logo Header */}
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="relative w-8 h-8">
            <Image
              src="/images/logo-dark.png"
              alt="AgroPet Prime"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-[#0B0F17] block leading-none">
              AgroPet<span className="text-[#12C0E0]">Prime</span>
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Painel Admin
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all',
                  isActive
                    ? 'bg-[#0B0F17] text-[#12C0E0] shadow-sm'
                    : 'text-gray-600 hover:bg-[#f8f9ff] hover:text-[#0B0F17]'
                )}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Links & Back to Store */}
      <div className="p-4 border-t border-gray-100 space-y-2">
        <div className="bg-[#eff4ff] p-3 rounded-xl flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#12C0E0] text-black font-extrabold text-xs flex items-center justify-center shrink-0">
            AD
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-[#0B0F17] truncate">Admin Master</p>
            <span className="text-[10px] text-gray-500 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#10B981]" />
              Acesso Total
            </span>
          </div>
        </div>

        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 hover:text-black transition-all border border-gray-200"
        >
          <Store className="w-4 h-4 text-[#12C0E0]" />
          <span>Ver Loja Online</span>
        </Link>
      </div>
    </aside>
  );
}