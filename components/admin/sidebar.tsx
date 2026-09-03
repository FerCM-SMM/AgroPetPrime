'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingCart, Users, Package, BarChart3, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/pedidos', label: 'Pedidos', icon: ShoppingCart },
  { href: '/admin/clientes', label: 'Clientes', icon: Users },
  { href: '/admin/produtos', label: 'Produtos', icon: Package },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/config', label: 'Configuracoes', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
              pathname === item.href
                ? 'bg-[#12c0e0] text-black'
                : 'text-gray-600 hover:bg-[#f1f5f9] hover:text-[#12c0e0]'
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
