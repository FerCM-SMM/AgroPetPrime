import Link from 'next/link';
import {
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  Plus,
  ArrowRight,
  AlertTriangle,
  Clock,
  CheckCircle2,
  DollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Faturamento Mensal',
      value: 'R$ 24.890,00',
      icon: DollarSign,
      change: '+18.4%',
      color: 'bg-[#10B981]/15 text-[#10B981]',
    },
    {
      title: 'Pedidos Realizados',
      value: '156',
      icon: ShoppingCart,
      change: '+12%',
      color: 'bg-[#12C0E0]/15 text-[#00687b]',
    },
    {
      title: 'Produtos no Catálogo',
      value: '48',
      icon: Package,
      change: '6 ativos recentes',
      color: 'bg-[#5ab7fd]/20 text-[#006398]',
    },
    {
      title: 'Clientes Ativos',
      value: '342',
      icon: Users,
      change: '+24 novos esse mês',
      color: 'bg-[#D97706]/15 text-[#D97706]',
    },
  ];

  const recentOrders = [
    {
      id: 'AGP-9842',
      customer: 'Fernando Costa',
      total: 237.70,
      status: 'Em Separação',
      statusColor: 'bg-cyan-100 text-[#00687b]',
      date: 'Hoje, 14:32',
    },
    {
      id: 'AGP-9610',
      customer: 'Mariana Silva Alencar',
      total: 199.80,
      status: 'Enviado',
      statusColor: 'bg-purple-100 text-purple-800',
      date: 'Ontem, 10:15',
    },
    {
      id: 'AGP-9504',
      customer: 'Carlos Eduardo Nogueira',
      total: 285.00,
      status: 'Entregue',
      statusColor: 'bg-green-100 text-green-800',
      date: '31/08, 18:40',
    },
  ];

  const lowStockAlerts = [
    { name: 'Simparic 80mg Cães 20 a 40kg', current: 5, min: 10 },
    { name: 'Caminha Donut Faux-Fur Bege', current: 8, min: 10 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-extrabold text-[#12C0E0] uppercase tracking-wider block mb-1">
            🐾 Painel Administrativo Pr1me
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0B0F17]">
            Visão Geral da Loja
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Acompanhe o desempenho de vendas, pedidos para envio e estoque em tempo real.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/produtos">
            <Button className="bg-[#12C0E0] hover:bg-[#00A8C7] text-black font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-xs hover-lift active-press flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>Novo Produto</span>
            </Button>
          </Link>
          <Link href="/admin/pedidos">
            <Button
              variant="outline"
              className="rounded-xl border-gray-200 text-xs font-bold hover-lift"
            >
              Ver Pedidos
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between hover-lift"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-500">{stat.title}</span>
              <div className={`w-9 h-9 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-black text-[#0B0F17] block">
                {stat.value}
              </span>
              <span className="text-[11px] font-bold text-green-600 mt-1 block">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 2-Column Section: Recent Orders & Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2 className="font-extrabold text-base text-[#0B0F17]">
                Últimos Pedidos Realizados
              </h2>
              <span className="text-xs text-gray-400">Compras recentes no site</span>
            </div>
            <Link
              href="/admin/pedidos"
              className="text-xs font-bold text-[#00687b] hover:underline flex items-center gap-1"
            >
              <span>Ver todos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {recentOrders.map((order) => (
              <div key={order.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#00687b] font-black text-xs shrink-0">
                    #
                  </div>
                  <div>
                    <p className="font-bold text-xs text-[#0B0F17]">{order.customer}</p>
                    <span className="text-[11px] text-gray-400">{order.id} • {order.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${order.statusColor}`}>
                    {order.status}
                  </span>
                  <span className="font-extrabold text-xs text-[#0B0F17]">
                    R$ {order.total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts & Quick Help (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Low Stock Box */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="font-extrabold text-xs uppercase tracking-wider">
                Alerta de Estoque Baixo
              </h3>
            </div>
            <p className="text-xs text-gray-500">
              Estes produtos estão com quantidade menor que o estoque mínimo:
            </p>
            <div className="space-y-2 pt-1">
              {lowStockAlerts.map((item, i) => (
                <div key={i} className="p-2.5 bg-amber-50/70 rounded-xl border border-amber-200/50 flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-800 truncate mr-2">{item.name}</span>
                  <span className="font-black text-amber-700 whitespace-nowrap">{item.current} un</span>
                </div>
              ))}
            </div>
            <Link href="/admin/produtos" className="block pt-2">
              <Button size="sm" variant="outline" className="w-full text-xs font-bold rounded-xl">
                Ajustar Estoque
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}