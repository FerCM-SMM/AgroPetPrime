'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Order,
  getStoredOrders,
  saveOrder,
  updateOrder,
  deleteOrder,
} from '@/lib/admin-store';
import {
  ShoppingCart,
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  MessageCircle,
  X,
  Clock,
  Truck,
  DollarSign,
  Phone,
  MapPin,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const [newOrderData, setNewOrderData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_address: '',
    payment_method: 'PIX',
    status: 'pending' as Order['status'],
    observation: '',
    items: [
      {
        product_id: '1',
        product_name: 'Ração Super Premium Aurora Holistic Nutrition Cães Adultos 12kg',
        quantity: 1,
        unit_price: 189.90,
        image: '/images/prod-dog-food.jpg',
      },
    ],
  });

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setOrders(getStoredOrders());
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrder(orderId, { status: newStatus });
    toast.success(`Pedido #${orderId} atualizado para "${getStatusLabel(newStatus)}"`);
    loadOrders();
  };

  const handleDeleteOrder = (order: Order) => {
    if (confirm(`Tem certeza que deseja excluir o Pedido #${order.id} de ${order.customer_name}?`)) {
      deleteOrder(order.id);
      toast.success(`Pedido #${order.id} excluído com sucesso.`);
      loadOrders();
      if (selectedOrder?.id === order.id) setSelectedOrder(null);
    }
  };

  const handleSaveNewOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderData.customer_name || !newOrderData.customer_phone) {
      toast.error('Informe o nome e o telefone do cliente.');
      return;
    }

    const calculatedTotal = newOrderData.items.reduce(
      (acc, item) => acc + item.unit_price * item.quantity,
      0
    );

    saveOrder({
      customer_name: newOrderData.customer_name,
      customer_phone: newOrderData.customer_phone,
      customer_address: newOrderData.customer_address || 'Balcão / Retirada na Loja',
      payment_method: newOrderData.payment_method,
      status: newOrderData.status,
      observation: newOrderData.observation,
      total: calculatedTotal,
      items: newOrderData.items,
    });

    toast.success('Novo pedido manual adicionado com sucesso!');
    setIsNewOrderModalOpen(false);
    loadOrders();
  };

  const handleSaveEditOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;

    updateOrder(editingOrder.id, {
      customer_name: editingOrder.customer_name,
      customer_phone: editingOrder.customer_phone,
      customer_address: editingOrder.customer_address,
      payment_method: editingOrder.payment_method,
      status: editingOrder.status,
      observation: editingOrder.observation,
      total: Number(editingOrder.total),
    });

    toast.success(`Pedido #${editingOrder.id} atualizado com sucesso!`);
    setEditingOrder(null);
    loadOrders();
  };

  const handleNotifyWhatsApp = (order: Order) => {
    const cleanPhone = order.customer_phone.replace(/\D/g, '');
    const phoneWithCountry = cleanPhone.length <= 11 ? `55${cleanPhone}` : cleanPhone;
    const msg = encodeURIComponent(
      `Olá ${order.customer_name}! 🐾 Aqui é da *AgroPet Pr1me*.\n\n` +
      `Atualização sobre o seu pedido *#${order.id}*:\n` +
      `📦 Status atual: *${getStatusLabel(order.status).toUpperCase()}*\n` +
      `💰 Total: *R$ ${order.total.toFixed(2)}*\n\n` +
      `Se precisar de qualquer informação, estamos à disposição por aqui!`
    );
    window.open(`https://wa.me/${phoneWithCountry}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'shipped':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'processing':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'Entregue';
      case 'shipped':
        return 'Enviado';
      case 'processing':
        return 'Em Separação';
      case 'pending':
        return 'Pendente';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
    const term = search.toLowerCase();
    const matchesSearch =
      o.id.toLowerCase().includes(term) ||
      o.customer_name.toLowerCase().includes(term) ||
      o.customer_phone.toLowerCase().includes(term);
    return matchesStatus && matchesSearch;
  });

  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((acc, o) => acc + o.total, 0);
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-[#0B0F17] tracking-tight">
              Gestão de Pedidos do Site
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#12C0E0]/15 text-[#00829B] border border-[#12C0E0]/30">
              Vendas & Entregas
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Controle de pedidos do checkout, criação de vendas manuais, alterações de status e avisos no WhatsApp.
          </p>
        </div>

        <button
          onClick={() => setIsNewOrderModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 bg-[#12C0E0] hover:bg-[#00ADC9] text-black font-extrabold text-sm px-5 py-2.5 rounded-xl shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>+ Novo Pedido Manual</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total de Pedidos</span>
            <span className="text-2xl font-black text-[#0B0F17] mt-1 block">{orders.length}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <ShoppingCart className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">Pendentes</span>
            <span className="text-2xl font-black text-amber-900 mt-1 block">
              {orders.filter((o) => o.status === 'pending').length}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">Em Trânsito</span>
            <span className="text-2xl font-black text-blue-900 mt-1 block">
              {orders.filter((o) => o.status === 'shipped').length}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Truck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Faturamento</span>
            <span className="text-2xl font-black text-emerald-700 mt-1 block">
              R$ {totalRevenue.toFixed(2)}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por código (ex: PED-1024), nome do cliente ou telefone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#12C0E0] focus:bg-white transition-all text-[#0B0F17]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filterStatus === 'all' ? 'bg-[#0B0F17] text-white' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            Todos ({orders.length})
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filterStatus === 'pending' ? 'bg-amber-500 text-white' : 'text-amber-700 bg-amber-50 hover:bg-amber-100'
            }`}
          >
            Pendentes
          </button>
          <button
            onClick={() => setFilterStatus('shipped')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filterStatus === 'shipped' ? 'bg-blue-600 text-white' : 'text-blue-700 bg-blue-50 hover:bg-blue-100'
            }`}
          >
            Enviados
          </button>
          <button
            onClick={() => setFilterStatus('delivered')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filterStatus === 'delivered' ? 'bg-emerald-600 text-white' : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
            }`}
          >
            Entregues
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 text-[11px] font-extrabold uppercase tracking-wider">
                <th className="py-3.5 px-4">Pedido</th>
                <th className="py-3.5 px-4">Cliente / Contato</th>
                <th className="py-3.5 px-4">Data</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Status de Entrega</th>
                <th className="py-3.5 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400 font-medium">
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/70 transition-colors group">
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="font-black text-[#0B0F17] text-sm block">#{order.id}</span>
                      <span className="text-[10px] text-gray-400">
                        {order.items?.length || 1} {order.items?.length === 1 ? 'item' : 'itens'}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-extrabold text-[#0B0F17] text-sm block">
                        {order.customer_name}
                      </span>
                      <span className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-[#12C0E0]" />
                        {order.customer_phone}
                      </span>
                      <span className="text-[10px] text-gray-400 block truncate max-w-[200px] mt-0.5">
                        {order.customer_address}
                      </span>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap text-gray-500 font-medium text-[11px]">
                      {new Date(order.created_at).toLocaleDateString('pt-BR')}
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="font-black text-[#0B0F17] text-sm block">
                        R$ {order.total.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-gray-400 font-semibold">
                        {order.payment_method || 'WhatsApp / PIX'}
                      </span>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                        className={`text-[11px] font-extrabold px-3 py-1.5 rounded-full border cursor-pointer focus:outline-hidden ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        <option value="pending">Pendente</option>
                        <option value="processing">Em Separação</option>
                        <option value="shipped">Enviado</option>
                        <option value="delivered">Entregue</option>
                        <option value="cancelled">Cancelado</option>
                      </select>
                    </td>

                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleNotifyWhatsApp(order)}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Enviar atualização de status no WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 text-gray-500 hover:text-[#0B0F17] hover:bg-gray-100 rounded-lg transition-colors"
                          title="Ver Detalhes do Pedido"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setEditingOrder({ ...order })}
                          className="p-1.5 text-gray-500 hover:text-[#0B0F17] hover:bg-gray-100 rounded-lg transition-colors"
                          title="Editar Pedido"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteOrder(order)}
                          className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Excluir Pedido"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>      {isNewOrderModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#12C0E0]" />
                <h3 className="font-extrabold text-lg text-[#0B0F17]">Cadastrar Pedido Manual</h3>
              </div>
              <button onClick={() => setIsNewOrderModalOpen(false)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewOrder} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Nome do Cliente *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Maria Ferreira"
                  value={newOrderData.customer_name}
                  onChange={(e) => setNewOrderData({ ...newOrderData, customer_name: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Telefone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    placeholder="(15) 99999-9999"
                    value={newOrderData.customer_phone}
                    onChange={(e) => setNewOrderData({ ...newOrderData, customer_phone: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Forma de Pagamento</label>
                  <select
                    value={newOrderData.payment_method}
                    onChange={(e) => setNewOrderData({ ...newOrderData, payment_method: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                  >
                    <option value="PIX">PIX</option>
                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                    <option value="Cartão de Débito">Cartão de Débito</option>
                    <option value="Dinheiro na Entrega">Dinheiro na Entrega</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Endereço de Entrega</label>
                <input
                  type="text"
                  placeholder="Rua, Número, Bairro, Cidade/UF"
                  value={newOrderData.customer_address}
                  onChange={(e) => setNewOrderData({ ...newOrderData, customer_address: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                />
              </div>

              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-2">
                <span className="font-extrabold text-gray-700 block">Item do Pedido:</span>
                <div>
                  <label className="block font-medium text-gray-600 mb-1">Nome do Produto</label>
                  <input
                    type="text"
                    value={newOrderData.items[0].product_name}
                    onChange={(e) => {
                      const updated = [...newOrderData.items];
                      updated[0].product_name = e.target.value;
                      setNewOrderData({ ...newOrderData, items: updated });
                    }}
                    className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-medium text-gray-600 mb-1">Quantidade</label>
                    <input
                      type="number"
                      min="1"
                      value={newOrderData.items[0].quantity}
                      onChange={(e) => {
                        const updated = [...newOrderData.items];
                        updated[0].quantity = Number(e.target.value);
                        setNewOrderData({ ...newOrderData, items: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-600 mb-1">Preço Unitário (R$)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newOrderData.items[0].unit_price}
                      onChange={(e) => {
                        const updated = [...newOrderData.items];
                        updated[0].unit_price = Number(e.target.value);
                        setNewOrderData({ ...newOrderData, items: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Observações</label>
                <textarea
                  rows={2}
                  placeholder="Ex: Entregar após as 14h..."
                  value={newOrderData.observation}
                  onChange={(e) => setNewOrderData({ ...newOrderData, observation: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsNewOrderModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-extrabold bg-[#12C0E0] text-black hover:bg-[#00ADC9]"
                >
                  Criar Pedido
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-[#12C0E0]" />
                <h3 className="font-extrabold text-lg text-[#0B0F17]">
                  Editar Pedido #{editingOrder.id}
                </h3>
              </div>
              <button onClick={() => setEditingOrder(null)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditOrder} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Nome do Cliente</label>
                <input
                  type="text"
                  required
                  value={editingOrder.customer_name}
                  onChange={(e) => setEditingOrder({ ...editingOrder, customer_name: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Telefone</label>
                  <input
                    type="text"
                    required
                    value={editingOrder.customer_phone}
                    onChange={(e) => setEditingOrder({ ...editingOrder, customer_phone: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Status</label>
                  <select
                    value={editingOrder.status}
                    onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value as Order['status'] })}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                  >
                    <option value="pending">Pendente</option>
                    <option value="processing">Em Separação</option>
                    <option value="shipped">Enviado</option>
                    <option value="delivered">Entregue</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Endereço de Entrega</label>
                <input
                  type="text"
                  value={editingOrder.customer_address}
                  onChange={(e) => setEditingOrder({ ...editingOrder, customer_address: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Valor Total (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingOrder.total}
                    onChange={(e) => setEditingOrder({ ...editingOrder, total: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Forma de Pagamento</label>
                  <input
                    type="text"
                    value={editingOrder.payment_method || ''}
                    onChange={(e) => setEditingOrder({ ...editingOrder, payment_method: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Observações</label>
                <textarea
                  rows={2}
                  value={editingOrder.observation || ''}
                  onChange={(e) => setEditingOrder({ ...editingOrder, observation: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingOrder(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-extrabold bg-[#0B0F17] text-[#12C0E0] hover:bg-black"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Detalhes do Pedido
                </span>
                <h3 className="font-extrabold text-lg text-[#0B0F17]">
                  Pedido #{selectedOrder.id}
                </h3>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-1.5">
                <p className="font-extrabold text-sm text-[#0B0F17]">{selectedOrder.customer_name}</p>
                <p className="text-gray-600 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#12C0E0]" />
                  {selectedOrder.customer_phone}
                </p>
                <p className="text-gray-600 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  {selectedOrder.customer_address}
                </p>
                {selectedOrder.observation && (
                  <p className="text-gray-500 italic mt-2 pt-2 border-t border-gray-200">
                    Obs: {selectedOrder.observation}
                  </p>
                )}
              </div>

              <div>
                <span className="font-extrabold text-gray-700 block mb-2">Itens Solicitados:</span>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-gray-200">
                      <div className="flex items-center gap-2.5">
                        {item.image && (
                          <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                            <Image src={item.image} alt={item.product_name} fill className="object-cover" />
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-[#0B0F17]">{item.product_name}</p>
                          <span className="text-[11px] text-gray-400">{item.quantity}x R$ {item.unit_price.toFixed(2)}</span>
                        </div>
                      </div>
                      <span className="font-black text-[#0B0F17]">
                        R$ {(item.quantity * item.unit_price).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <span className="text-gray-400 block text-[11px]">Total do Pedido:</span>
                  <span className="text-xl font-black text-[#0B0F17]">
                    R$ {selectedOrder.total.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => handleNotifyWhatsApp(selectedOrder)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold bg-[#25D366] text-white hover:bg-[#20b858] transition-all shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Notificar no WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}