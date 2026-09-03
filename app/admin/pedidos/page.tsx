'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Search,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle,
  Phone,
  Eye,
  X,
  MessageCircle,
  FileText,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface OrderItem {
  name: string;
  qty: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  date: string;
  paymentMethod: string;
  status: 'Pendente' | 'Pago' | 'Em Separação' | 'Enviado' | 'Entregue' | 'Cancelado';
  total: number;
  items: OrderItem[];
}

const INITIAL_ORDERS: Order[] = [
  {
    id: 'AGP-9842',
    customerName: 'Fernando Costa',
    customerPhone: '15996580804',
    customerEmail: 'fernando.costam90@outlook.com',
    address: 'R. Antônio Silva Saladino, 878 - Pq. Vitória Régia, Sorocaba/SP',
    date: '02/09/2026 14:32',
    paymentMethod: 'Pix Instantâneo (5% OFF)',
    status: 'Em Separação',
    total: 237.70,
    items: [
      {
        name: 'Ração Premier Formula Cães Adultos Raças Médias e Grandes 15kg',
        qty: 1,
        price: 237.70,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLjV5W5nC3XQkXwwsJ-zzHFDaLwjYLTA3ssLwdXzElv8_P7lHBDs1L-QhUTr5zi_5OwUmPNgYJY0H52HdccZq6zVIB4RfvOZ0kgpsAsuHQo5a693llZYG_zeQAK6uoqobber8rtXLZdo3HJOGY9GNxuhzY9rTXVziGzsBk8mA-hliNviiGhab6U6qTifNtPGWVcfDmoCWYegn1Da1SyoixARlehvRhkHTi9mVV0yyr3TsuFYMHe-7Q',
      },
    ],
  },
  {
    id: 'AGP-9610',
    customerName: 'Mariana Silva Alencar',
    customerPhone: '15991234567',
    customerEmail: 'mariana.silva@gmail.com',
    address: 'Av. Ipanema, 1400 - Vila Nova, Sorocaba/SP',
    date: '01/09/2026 10:15',
    paymentMethod: 'Cartão de Crédito (3x sem juros)',
    status: 'Enviado',
    total: 199.80,
    items: [
      {
        name: 'Caminha Donut Faux-Fur Nuvem Ultra Macia Bege',
        qty: 1,
        price: 149.90,
        image: '/images/prod-pet-bed.jpg',
      },
      {
        name: 'Brinquedo Pelúcia Raposinha Plush Squeaky com Corda',
        qty: 1,
        price: 49.90,
        image: '/images/prod-pet-toy.jpg',
      },
    ],
  },
  {
    id: 'AGP-9504',
    customerName: 'Carlos Eduardo Nogueira',
    customerPhone: '15981123344',
    customerEmail: 'carlos.equinos@agro.com.br',
    address: 'Haras Primavera, Rod. Raposo Tavares Km 98, Votorantim/SP',
    date: '31/08/2026 18:40',
    paymentMethod: 'Pix Instantâneo',
    status: 'Entregue',
    total: 285.00,
    items: [
      {
        name: 'Ração Equinos Alta Energia Cavalo Atleta Laminada 25kg',
        qty: 2,
        price: 142.50,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFOUHyxrytUlqlsTBQlJLc4lggzz0Fk_vbmBw6NEG5KPDCK5-xkM05zxBotxoezEjf2JJFlMYPDqehqb-4NrODO8w6BlJ4b-n59s96gKBEOstH4c89_24D3O3adObsrGkmzM66cF43PCbImsbMLOeaGuHldTM5CprpsF8-akfeAGJFjfxjs3VDPKzuQ7lKABWe1wvGokxdlR7UlAYkO3nSj067agsKupRJEeibt4hEhK0WwCvJnezg',
      },
    ],
  },
  {
    id: 'AGP-9480',
    customerName: 'Beatriz Vasconcelos',
    customerPhone: '15974445566',
    customerEmail: 'beatriz.v@uol.com.br',
    address: 'Rua São Bento, 450 - Centro, Sorocaba/SP',
    date: '30/08/2026 09:20',
    paymentMethod: 'Pix Instantâneo',
    status: 'Pendente',
    total: 119.90,
    items: [
      {
        name: 'Antipulgas e Carrapatos Simparic 80mg (Cães 20 a 40kg) 1 Comp.',
        qty: 1,
        price: 119.90,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2RTizwlF1mzVgaRF1qk68KmR2VEOQ-WXa1EqTJnJbxHTVnhyPfjucaPx03Wb8iMYh_Hd13I6My3WkGxl2AQxjnPuzjJDqqm4ZAnDTiBRj9QDDYH85CNmGcRAtHGN3k-tTVwrItbU98jOlK7yCcgBsjWzIgLmqqC7fvZlpsaGN6Pd-q5tj3ILni7MqVWNy6v4N8QYby3jRMMwZORCiyKkQWBtRJ513BZxkLApP9DdgKX--UHwoeV9b',
      },
    ],
  },
];

export default function AdminPedidosPage() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const statuses = ['Todos', 'Pendente', 'Pago', 'Em Separação', 'Enviado', 'Entregue', 'Cancelado'];

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Pendente':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Pago':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Em Separação':
        return 'bg-cyan-100 text-[#00687b] border-cyan-200';
      case 'Enviado':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Entregue':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelado':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    toast.success(`Pedido #${orderId} alterado para "${newStatus}"! ✓`);
  };

  const handleNotifyWhatsApp = (order: Order) => {
    const text = encodeURIComponent(
      `Olá ${order.customerName}! Aqui é da equipe AgroPet Prime.\nSeu pedido #${order.id} foi atualizado para o status: *${order.status}*.\nTotal: R$ ${order.total.toFixed(2).replace('.', ',')}.\nQualquer dúvida estamos à disposição!`
    );
    window.open(`https://wa.me/55${order.customerPhone}?text=${text}`, '_blank');
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerPhone.includes(search);
    const matchesStatus = statusFilter === 'Todos' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#0B0F17]">Gestão de Pedidos</h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Acompanhe compras realizadas no site, atualize status de entrega e notifique clientes no WhatsApp.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500">
            Total: <strong>{orders.length} pedidos</strong>
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por código (#AGP), cliente..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#f8f9ff] border border-gray-200 text-xs font-medium focus:outline-none focus:border-[#12C0E0]"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar">
          {statuses.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === st
                  ? 'bg-[#0B0F17] text-white shadow-xs'
                  : 'bg-[#f8f9ff] text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f9ff] border-b border-gray-200 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">
                <th className="p-4">Pedido</th>
                <th className="p-4">Cliente &amp; Contato</th>
                <th className="p-4">Data</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status Atual</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                  {/* Order ID */}
                  <td className="p-4">
                    <span className="font-black text-[#0B0F17] block">#{order.id}</span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {order.items.length} {order.items.length > 1 ? 'itens' : 'item'}
                    </span>
                  </td>

                  {/* Customer */}
                  <td className="p-4">
                    <p className="font-bold text-[#0B0F17]">{order.customerName}</p>
                    <p className="text-[11px] text-gray-500">{order.customerPhone}</p>
                  </td>

                  {/* Date */}
                  <td className="p-4 text-gray-500 text-[11px] font-medium">
                    {order.date}
                  </td>

                  {/* Total */}
                  <td className="p-4">
                    <span className="font-black text-[#00687b] text-sm block">
                      R$ {order.total.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-[10px] text-gray-400">{order.paymentMethod}</span>
                  </td>

                  {/* Status Dropdown */}
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value as Order['status'])
                      }
                      className={`text-[11px] font-extrabold px-3 py-1.5 rounded-full border focus:outline-none cursor-pointer ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      <option value="Pendente">Pendente</option>
                      <option value="Pago">Pago</option>
                      <option value="Em Separação">Em Separação</option>
                      <option value="Enviado">Enviado</option>
                      <option value="Entregue">Entregue</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="p-1.5 text-gray-600 hover:text-[#00687b] hover:bg-gray-100 rounded-lg transition-colors"
                        title="Ver Detalhes do Pedido"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleNotifyWhatsApp(order)}
                        className="p-1.5 text-[#10B981] hover:bg-green-50 rounded-lg transition-colors"
                        title="Notificar no WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Detalhes do Pedido */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-gray-200 animate-fade-in-up">
            {/* Modal Header */}
            <div className="bg-[#f8f9ff] px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Detalhes da Venda
                </span>
                <h3 className="font-extrabold text-lg text-[#0B0F17]">
                  Pedido #{selectedOrder.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="p-1 text-gray-400 hover:text-black rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 text-xs">
              {/* Customer & Address */}
              <div className="bg-[#f8f9ff] p-4 rounded-2xl border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-700">Dados do Cliente:</span>
                  <span className="text-gray-500">{selectedOrder.date}</span>
                </div>
                <p className="font-bold text-[#0B0F17] text-sm">{selectedOrder.customerName}</p>
                <p className="text-gray-600">Telefone: {selectedOrder.customerPhone} • {selectedOrder.customerEmail}</p>
                <p className="text-gray-600">Endereço de Entrega: <strong className="text-gray-800">{selectedOrder.address}</strong></p>
                <p className="text-gray-600">Forma de Pagamento: <strong className="text-[#00687b]">{selectedOrder.paymentMethod}</strong></p>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <span className="font-bold text-gray-700 block">Itens do Pedido:</span>
                {selectedOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100"
                  >
                    <div className="relative w-12 h-12 rounded-lg bg-[#f8f9ff] overflow-hidden border border-gray-200 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#0B0F17] truncate">{item.name}</p>
                      <p className="text-gray-500 text-[11px]">
                        {item.qty}x R$ {item.price.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                    <span className="font-bold text-sm text-[#00687b]">
                      R$ {(item.qty * item.price).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total & Action */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <span className="text-xs text-gray-400">Total do Pedido:</span>
                  <p className="text-xl font-black text-[#0B0F17]">
                    R$ {selectedOrder.total.toFixed(2).replace('.', ',')}
                  </p>
                </div>

                <Button
                  onClick={() => handleNotifyWhatsApp(selectedOrder)}
                  className="bg-[#25D366] hover:bg-[#1ebd59] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-xs hover-lift"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Notificar no WhatsApp</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}