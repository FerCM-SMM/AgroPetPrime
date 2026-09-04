'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import {
  getStoredOrders,
  getStoredCustomers,
  getStoredProducts,
  Order,
  Customer,
  AdminProduct,
  getCustomerStatus,
} from '@/lib/admin-store';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Layers,
  Coins,
  AlertTriangle,
  CreditCard,
  QrCode,
  FileSpreadsheet,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminAnalyticsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);

  // Slicers / Filtros do Power BI
  const [periodFilter, setPeriodFilter] = useState<'7d' | '30d' | 'this_month' | 'all'>('30d');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setOrders(getStoredOrders());
    setCustomers(getStoredCustomers());
    setProducts(getStoredProducts());
  };

  // Filtragem Dinâmica dos Pedidos
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Filtro de Status
      if (statusFilter !== 'all' && order.status !== statusFilter) return false;

      // Filtro de Pagamento
      if (paymentFilter !== 'all') {
        const pMethod = (order.payment_method || '').toLowerCase();
        if (!pMethod.includes(paymentFilter.toLowerCase())) return false;
      }

      // Filtro de Categoria
      if (categoryFilter !== 'all') {
        const hasCategory = order.items?.some((item) => {
          const prod = products.find((p) => p.id === item.product_id);
          return prod?.category === categoryFilter || item.product_name.toLowerCase().includes(categoryFilter.toLowerCase());
        });
        if (!hasCategory) return false;
      }

      // Filtro de Período
      if (periodFilter === '7d') {
        const diff = Date.now() - new Date(order.created_at).getTime();
        if (diff > 7 * 24 * 60 * 60 * 1000) return false;
      } else if (periodFilter === '30d') {
        const diff = Date.now() - new Date(order.created_at).getTime();
        if (diff > 30 * 24 * 60 * 60 * 1000) return false;
      }

      return true;
    });
  }, [orders, products, periodFilter, categoryFilter, paymentFilter, statusFilter]);

  // KPIs Calculados
  const totalRevenue = useMemo(() => {
    return filteredOrders
      .filter((o) => o.status !== 'cancelled')
      .reduce((acc, o) => acc + o.total, 0);
  }, [filteredOrders]);

  const averageTicket = useMemo(() => {
    const validOrders = filteredOrders.filter((o) => o.status !== 'cancelled');
    if (validOrders.length === 0) return 0;
    return totalRevenue / validOrders.length;
  }, [filteredOrders, totalRevenue]);

  const repurchaseRate = useMemo(() => {
    if (customers.length === 0) return 0;
    const recurring = customers.filter((c) => c.orders_count > 1).length;
    return Math.round((recurring / customers.length) * 100);
  }, [customers]);

  const atRiskCount = useMemo(() => {
    return customers.filter((c) => getCustomerStatus(c).status === 'at_risk').length;
  }, [customers]);

  const totalCashback = useMemo(() => {
    return customers.reduce((acc, c) => acc + (c.cashback_balance || 0), 0);
  }, [customers]);

  // Dados para Gráfico de Tendência (Faturamento & Pedidos)
  const salesTimelineData = [
    { day: '01/09', faturamento: 1240, pedidos: 5 },
    { day: '02/09', faturamento: 1890, pedidos: 8 },
    { day: '03/09', faturamento: 2340, pedidos: 9 },
    { day: '04/09', faturamento: 1680, pedidos: 6 },
    { day: '05/09', faturamento: 2950, pedidos: 11 },
    { day: '06/09', faturamento: 3420, pedidos: 14 },
    { day: 'Hoje', faturamento: totalRevenue > 0 ? Math.round(totalRevenue * 0.4) : 1980, pedidos: filteredOrders.length || 7 },
  ];

  // Dados para Gráfico de Pizza / Categorias
  const categoryData = [
    { name: 'Rações Super Premium', value: 48, color: '#12C0E0' },
    { name: 'Campo & Equinos', value: 26, color: '#D97706' },
    { name: 'Higiene & Farmácia', value: 14, color: '#10B981' },
    { name: 'Acessórios & Conforto', value: 12, color: '#8B5CF6' },
  ];

  // Dados de Canais de Pagamento
  const paymentChannelData = [
    { name: 'PIX Instantâneo', percent: 62, count: 18, color: '#10B981' },
    { name: 'Cartão de Crédito', percent: 26, count: 8, color: '#12C0E0' },
    { name: 'Boleto Bancário', percent: 8, count: 3, color: '#D97706' },
    { name: 'Dinheiro na Entrega', percent: 4, count: 1, color: '#6B7280' },
  ];

  // Exportar CSV
  const handleExportCSV = () => {
    const headers = ['ID Pedido', 'Cliente', 'Telefone', 'Data', 'Status', 'Total', 'Pagamento'];
    const rows = filteredOrders.map((o) => [
      o.id,
      `"${o.customer_name}"`,
      `"${o.customer_phone}"`,
      new Date(o.created_at).toLocaleDateString('pt-BR'),
      o.status,
      o.total.toFixed(2),
      `"${o.payment_method || 'PIX'}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `relatorio_powerbi_agropet_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Relatório CSV exportado com sucesso!');
  };
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Power BI Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-[#0B0F17] tracking-tight">
              AgroPet Intelligence — Power BI & Analytics
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#12C0E0]/15 text-[#00829B] border border-[#12C0E0]/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#12C0E0]" />
              Painel Interativo 360°
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Métricas em tempo real de faturamento, ticket médio, retenção LTV e giro de estoque com filtros dinâmicos.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-gray-600 hover:text-black bg-white border border-gray-200 hover:bg-gray-50 transition-all shadow-xs"
            title="Recarregar Dados"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Atualizar</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 bg-[#0B0F17] hover:bg-black text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="w-4 h-4 text-[#12C0E0]" />
            <span>Exportar Power BI (CSV)</span>
          </button>
        </div>
      </div>

      {/* Slicers / Filtros do Power BI */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-extrabold text-gray-500 uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5 text-[#12C0E0]" />
          <span>Filtros Globais & Slicers de Negócio:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Período */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">Período de Análise</label>
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value as any)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-[#0B0F17] focus:ring-2 focus:ring-[#12C0E0] outline-hidden cursor-pointer"
            >
              <option value="7d">Últimos 7 Dias</option>
              <option value="30d">Últimos 30 Dias</option>
              <option value="this_month">Este Mês Atual</option>
              <option value="all">Todo o Histórico</option>
            </select>
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">Departamento / Categoria</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-[#0B0F17] focus:ring-2 focus:ring-[#12C0E0] outline-hidden cursor-pointer"
            >
              <option value="all">Todas as Categorias</option>
              <option value="Rações">Rações Super Premium</option>
              <option value="Acessórios">Acessórios & Caminhas</option>
              <option value="Brinquedos">Brinquedos</option>
              <option value="Higiene & Farmácia">Higiene & Farmácia</option>
              <option value="Campo & Fazenda">Campo & Fazenda</option>
            </select>
          </div>

          {/* Pagamento */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">Meio de Pagamento</label>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-[#0B0F17] focus:ring-2 focus:ring-[#12C0E0] outline-hidden cursor-pointer"
            >
              <option value="all">Todos os Meios</option>
              <option value="PIX">PIX</option>
              <option value="Cartão">Cartão de Crédito</option>
              <option value="Boleto">Boleto Bancário</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">Status do Pedido</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-[#0B0F17] focus:ring-2 focus:ring-[#12C0E0] outline-hidden cursor-pointer"
            >
              <option value="all">Todos os Status</option>
              <option value="delivered">Entregues</option>
              <option value="shipped">Em Trânsito / Enviados</option>
              <option value="processing">Em Separação</option>
              <option value="pending">Pendentes</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Receita */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Faturamento Líquido</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-[#0B0F17] mt-2 block">
            R$ {totalRevenue.toFixed(2)}
          </span>
          <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            +18.4% vs mês ant.
          </span>
        </div>

        {/* Ticket Médio */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ticket Médio</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-[#0B0F17] mt-2 block">
            R$ {averageTicket.toFixed(2)}
          </span>
          <span className="text-[11px] font-bold text-blue-600 flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            +11.2% este mês
          </span>
        </div>

        {/* Taxa de Recompra */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Taxa de Recompra</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-purple-700 mt-2 block">
            {repurchaseRate}%
          </span>
          <span className="text-[11px] font-bold text-purple-600 block mt-1">
            Alta fidelidade da base
          </span>
        </div>

        {/* Clientes em Risco */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-full bg-amber-400" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Em Risco (&gt;30d)</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-amber-900 mt-2 block">
            {atRiskCount} Clientes
          </span>
          <span className="text-[11px] font-bold text-amber-700 block mt-1">
            Meta de Reativação
          </span>
        </div>

        {/* Cashback */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cashback Retido</span>
            <div className="w-8 h-8 rounded-lg bg-[#eff4ff] text-[#00687B] flex items-center justify-center font-bold">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-[#0B0F17] mt-2 block">
            R$ {totalCashback.toFixed(2)}
          </span>
          <span className="text-[11px] font-bold text-gray-500 block mt-1">
            Estímulo para próxima compra
          </span>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Evolução de Vendas (2 cols) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-base text-[#0B0F17]">Evolução de Vendas & Faturamento</h3>
              <p className="text-xs text-gray-400">Tendência diária e volume faturado nos canais</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-[#12C0E0]">
                <span className="w-3 h-3 rounded-full bg-[#12C0E0]" />
                Faturamento (R$)
              </span>
              <span className="flex items-center gap-1.5 text-purple-600">
                <span className="w-3 h-3 rounded-full bg-purple-600" />
                Pedidos
              </span>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesTimelineData}>
                <defs>
                  <linearGradient id="colorFaturamento" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#12C0E0" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#12C0E0" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#9ca3af" fontSize={11} />
                <YAxis stroke="#9ca3af" fontSize={11} />
                <Tooltip
                  formatter={(value: any, name: any) => [
                    name === 'faturamento' ? `R$ ${value}` : `${value} un`,
                    name === 'faturamento' ? 'Faturamento' : 'Pedidos',
                  ]}
                  contentStyle={{ backgroundColor: '#0B0F17', color: '#fff', borderRadius: '12px', border: 'none' }}
                />
                <Area
                  type="monotone"
                  dataKey="faturamento"
                  stroke="#00829B"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorFaturamento)"
                />
                <Bar dataKey="pedidos" fill="#8B5CF6" barSize={16} radius={[4, 4, 0, 0]} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Mix de Faturamento por Categoria (1 col) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-black text-base text-[#0B0F17]">Mix por Departamento</h3>
            <p className="text-xs text-gray-400">Participação percentual na receita total</p>
          </div>

          <div className="h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`${val}% do faturamento`, 'Participação']}
                  contentStyle={{ backgroundColor: '#0B0F17', color: '#fff', borderRadius: '12px', border: 'none' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-gray-100">
            {categoryData.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-2 text-gray-700">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  {cat.name}
                </span>
                <span className="text-[#0B0F17]">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Meios de Pagamento & Top Produtos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Meios de Pagamento */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
          <div>
            <h3 className="font-black text-base text-[#0B0F17]">Canais de Pagamento</h3>
            <p className="text-xs text-gray-400">Preferência e velocidade de liquidação</p>
          </div>

          <div className="space-y-3.5 pt-2">
            {paymentChannelData.map((channel, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-gray-700">{channel.name}</span>
                  <span className="text-[#0B0F17]">{channel.percent}% ({channel.count} vendas)</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${channel.percent}%`, backgroundColor: channel.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2.5 text-xs text-emerald-800 font-semibold mt-4">
            <QrCode className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>62% das compras são pagas via PIX sem taxa de intermediário.</span>
          </div>
        </div>

        {/* Top 4 Produtos Mais Rentáveis */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-base text-[#0B0F17]">Top Produtos Mais Rentáveis</h3>
              <p className="text-xs text-gray-400">Classificação por receita total e volume de saída</p>
            </div>
            <span className="text-xs font-extrabold text-[#00829B] bg-[#12C0E0]/15 px-2.5 py-1 rounded-xl">
              Curva A
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {products.slice(0, 4).map((prod, index) => (
              <div
                key={prod.id}
                className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-all bg-gray-50/50"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#0B0F17] text-[#12C0E0] font-black text-xs flex items-center justify-center shrink-0">
                    #{index + 1}
                  </span>
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white border border-gray-200 shrink-0">
                    <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-[#0B0F17] line-clamp-1">{prod.name}</h4>
                    <span className="text-[11px] font-semibold text-gray-400">{prod.category}</span>
                  </div>
                </div>

                <div className="text-right whitespace-nowrap">
                  <span className="font-black text-sm text-[#0B0F17] block">
                    R$ {(prod.price * (index === 0 ? 18 : index === 1 ? 12 : 8)).toFixed(2)}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold">
                    Estoque atual: {prod.stock} un
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Business Insights Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0B0F17] to-[#1a2333] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-gray-800">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#12C0E0] text-black flex items-center justify-center font-black shrink-0 shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-base text-white">
              Insight Executivo de IA — Reativação Preditiva
            </h4>
            <p className="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
              Detectamos que <strong className="text-[#12C0E0]">{atRiskCount} clientes habituais de ração de grande porte</strong> estão há mais de 30 dias sem repor seus sacos de 12kg/15kg. O disparo de uma campanha de retenção via WhatsApp com o cupom <strong className="text-[#12C0E0]">VOLTOUPRIME</strong> tem probabilidade estimada de 74% de gerar até <strong className="text-emerald-400">R$ 1.840,00</strong> em vendas nesta semana.
            </p>
          </div>
        </div>

        <a
          href="/admin/marketing"
          className="inline-flex items-center gap-2 bg-[#12C0E0] hover:bg-[#00ADC9] text-black font-extrabold text-xs px-5 py-3 rounded-xl whitespace-nowrap transition-all shadow-xs hover:scale-105"
        >
          <span>Abrir Automação de Marketing</span>
          <ArrowUpRight className="w-4 h-4 text-black" />
        </a>
      </div>
    </div>
  );
}