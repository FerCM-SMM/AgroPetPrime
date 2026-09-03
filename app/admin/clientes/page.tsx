'use client';

import { useState, useEffect } from 'react';
import {
  Customer,
  getStoredCustomers,
  saveCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerStatus,
  generateReactivationWhatsAppLink,
  getDaysSinceLastOrder,
} from '@/lib/admin-store';
import {
  Users,
  UserPlus,
  Search,
  MessageCircle,
  Edit2,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Coins,
  Sparkles,
  ShoppingBag,
  MapPin,
  Phone,
  Mail,
  Filter,
  X,
  Plus,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminClientesPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'at_risk' | 'churned'>('all');

  // Modais
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    consumption_habits: '',
    purchase_frequency_days: 30,
    cashback_balance: 0,
    notes: '',
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = () => {
    setCustomers(getStoredCustomers());
  };

  const handleOpenNewModal = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      consumption_habits: 'Rações Super Premium, Cães Adultos',
      purchase_frequency_days: 30,
      cashback_balance: 10,
      notes: '',
    });
    setIsNewModalOpen(true);
  };

  const handleOpenEditModal = (c: Customer) => {
    setEditingCustomer(c);
    setFormData({
      name: c.name,
      email: c.email,
      phone: c.phone,
      address: c.address,
      consumption_habits: c.consumption_habits.join(', '),
      purchase_frequency_days: c.purchase_frequency_days || 30,
      cashback_balance: c.cashback_balance || 0,
      notes: c.notes || '',
    });
  };

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error('Preencha ao menos Nome e Telefone do cliente.');
      return;
    }

    const habits = formData.consumption_habits
      .split(',')
      .map((h) => h.trim())
      .filter(Boolean);

    saveCustomer({
      name: formData.name,
      email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '.')}@cliente.com`,
      phone: formData.phone,
      address: formData.address || 'Balcão / A retirar',
      orders_count: 1,
      total_spent: 0,
      last_order_date: new Date().toISOString(),
      consumption_habits: habits.length > 0 ? habits : ['Cliente Geral'],
      purchase_frequency_days: Number(formData.purchase_frequency_days) || 30,
      cashback_balance: Number(formData.cashback_balance) || 0,
      notes: formData.notes,
    });

    toast.success(`Cliente ${formData.name} cadastrado com sucesso!`);
    setIsNewModalOpen(false);
    loadCustomers();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCustomer) return;

    const habits = formData.consumption_habits
      .split(',')
      .map((h) => h.trim())
      .filter(Boolean);

    updateCustomer(editingCustomer.id, {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      consumption_habits: habits,
      purchase_frequency_days: Number(formData.purchase_frequency_days) || 30,
      cashback_balance: Number(formData.cashback_balance) || 0,
      notes: formData.notes,
    });

    toast.success(`Dados de ${formData.name} atualizados!`);
    setEditingCustomer(null);
    loadCustomers();
  };

  const handleDelete = (c: Customer) => {
    if (confirm(`Tem certeza que deseja remover o cliente "${c.name}" da base?`)) {
      deleteCustomer(c.id);
      toast.success(`Cliente ${c.name} removido da base.`);
      loadCustomers();
    }
  };

  // Filtragem e Busca
  const filteredCustomers = customers.filter((c) => {
    const statusObj = getCustomerStatus(c);
    const matchesStatus =
      filterStatus === 'all' || statusObj.status === filterStatus;

    const term = search.toLowerCase();
    const matchesSearch =
      c.name.toLowerCase().includes(term) ||
      c.phone.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term) ||
      c.consumption_habits.some((h) => h.toLowerCase().includes(term));

    return matchesStatus && matchesSearch;
  });

  // Métricas do Topo
  const totalClients = customers.length;
  const activeClients = customers.filter((c) => getCustomerStatus(c).status === 'active').length;
  const atRiskClients = customers.filter((c) => getCustomerStatus(c).status === 'at_risk').length;
  const totalCashback = customers.reduce((acc, c) => acc + (c.cashback_balance || 0), 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-[#0B0F17] tracking-tight">
              Base de Clientes & CRM Pr1me
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#12C0E0]/15 text-[#00829B] border border-[#12C0E0]/30">
              Inteligência de Consumo
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Reconhecimento de hábitos de compra, periodicidade, cashback e campanhas de reativação via WhatsApp.
          </p>
        </div>

        <button
          onClick={handleOpenNewModal}
          className="inline-flex items-center justify-center gap-2 bg-[#12C0E0] hover:bg-[#00ADC9] text-black font-extrabold text-sm px-5 py-2.5 rounded-xl shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <UserPlus className="w-4 h-4 text-black" />
          <span>+ Adicionar Cliente Manual</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total na Base</span>
            <span className="text-2xl font-black text-[#0B0F17] mt-1 block">{totalClients} Clientes</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Compraram &lt; 30d</span>
            <span className="text-2xl font-black text-emerald-600 mt-1 block">{activeClients} Ativos</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-full bg-amber-400" />
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              Em Risco (&gt; 30d)
            </span>
            <span className="text-2xl font-black text-amber-900 mt-1 block">{atRiskClients} Clientes</span>
            <span className="text-[11px] font-semibold text-amber-700">Oportunidade de Reativação</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Cashback Acumulado</span>
            <span className="text-2xl font-black text-[#0B0F17] mt-1 block">R$ {totalCashback.toFixed(2)}</span>
            <span className="text-[11px] font-semibold text-gray-500">Saldo retido p/ recompra</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Coins className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nome, telefone, email ou hábito de consumo (ex: ração, antipulgas)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#12C0E0] focus:bg-white transition-all text-[#0B0F17]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filterStatus === 'all'
                ? 'bg-[#0B0F17] text-white'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            Todos ({customers.length})
          </button>
          <button
            onClick={() => setFilterStatus('active')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filterStatus === 'active'
                ? 'bg-emerald-600 text-white'
                : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
            }`}
          >
            Ativos ({activeClients})
          </button>
          <button
            onClick={() => setFilterStatus('at_risk')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filterStatus === 'at_risk'
                ? 'bg-amber-500 text-white'
                : 'text-amber-700 bg-amber-50 hover:bg-amber-100'
            }`}
          >
            🚨 Em Risco (&gt;30d) ({atRiskClients})
          </button>
          <button
            onClick={() => setFilterStatus('churned')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filterStatus === 'churned'
                ? 'bg-rose-600 text-white'
                : 'text-rose-700 bg-rose-50 hover:bg-rose-100'
            }`}
          >
            Inativos (&gt;60d)
          </button>
        </div>
      </div>

      {/* Table of Customers */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 text-[11px] font-extrabold uppercase tracking-wider">
                <th className="py-3.5 px-4">Cliente / Contato</th>
                <th className="py-3.5 px-4">Status & Recência</th>
                <th className="py-3.5 px-4">Hábitos de Compra</th>
                <th className="py-3.5 px-4">Periodicidade</th>
                <th className="py-3.5 px-4">Cashback / LTV</th>
                <th className="py-3.5 px-4 text-right">Ações & Reativação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400 font-medium">
                    Nenhum cliente encontrado com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => {
                  const status = getCustomerStatus(c);
                  const waLink = generateReactivationWhatsAppLink(c);

                  return (
                    <tr key={c.id} className="hover:bg-gray-50/70 transition-colors group">
                      {/* Name & Contact */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#0B0F17] text-[#12C0E0] font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                            {c.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-extrabold text-[#0B0F17] text-sm block hover:text-[#00829B] cursor-pointer" onClick={() => setViewingCustomer(c)}>
                              {c.name}
                            </span>
                            <div className="flex items-center gap-3 text-gray-500 text-[11px] mt-0.5">
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3 text-[#12C0E0]" />
                                {c.phone}
                              </span>
                              <span className="flex items-center gap-1 truncate max-w-[160px]">
                                <Mail className="w-3 h-3 text-gray-400" />
                                {c.email}
                              </span>
                            </div>
                            <span className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5 truncate max-w-[240px]">
                              <MapPin className="w-2.5 h-2.5 shrink-0" />
                              {c.address}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${status.badgeClass}`}>
                          {status.status === 'at_risk' && <AlertTriangle className="w-3 h-3 text-amber-600" />}
                          {status.status === 'active' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                          {status.label}
                        </span>
                        <span className="block text-[10px] text-gray-400 mt-1">
                          Última compra: {new Date(c.last_order_date).toLocaleDateString('pt-BR')}
                        </span>
                      </td>

                      {/* Consumption Habits */}
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {c.consumption_habits.map((habit, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#eff4ff] text-[#00687B] border border-blue-100"
                            >
                              {habit}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Frequency */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="font-extrabold text-[#0B0F17] block">
                          A cada ~{c.purchase_frequency_days} dias
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {c.orders_count} pedidos realizados
                        </span>
                      </td>

                      {/* Cashback & Total */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Coins className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                          <span className="font-extrabold text-purple-700 text-xs">
                            R$ {c.cashback_balance.toFixed(2)}
                          </span>
                        </div>
                        <span className="block text-[10px] font-bold text-[#0B0F17] mt-0.5">
                          Total: R$ {c.total_spent.toFixed(2)}
                        </span>
                      </td>

                      {/* Action buttons */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Reativação WhatsApp */}
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366] hover:text-white transition-all shadow-xs"
                            title="Enviar mensagem de reativação com saldo de cashback e cupom"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Ativar</span>
                          </a>

                          {/* Editar */}
                          <button
                            onClick={() => handleOpenEditModal(c)}
                            className="p-1.5 text-gray-500 hover:text-[#0B0F17] hover:bg-gray-100 rounded-lg transition-colors"
                            title="Editar Dados do Cliente"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          {/* Excluir */}
                          <button
                            onClick={() => handleDelete(c)}
                            className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Excluir Cliente"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: NOVO CLIENTE */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#12C0E0]" />
                <h3 className="font-extrabold text-lg text-[#0B0F17]">Cadastrar Novo Cliente</h3>
              </div>
              <button onClick={() => setIsNewModalOpen(false)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNew} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nome Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Roberto Alencar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Telefone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    placeholder="(15) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">E-mail</label>
                  <input
                    type="email"
                    placeholder="cliente@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Endereço de Entrega</label>
                <input
                  type="text"
                  placeholder="Rua, Número, Bairro, Cidade/UF"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Hábitos de Consumo (separados por vírgula)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Ração Premier 15kg, Cães Grandes, Antipulgas"
                  value={formData.consumption_habits}
                  onChange={(e) => setFormData({ ...formData, consumption_habits: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                />
                <span className="text-[11px] text-gray-400 mt-1 block">
                  Ajuda a IA a sugerir reposições e promoções no momento exato de recompra.
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Periodicidade (dias)</label>
                  <input
                    type="number"
                    min="5"
                    max="180"
                    value={formData.purchase_frequency_days}
                    onChange={(e) => setFormData({ ...formData, purchase_frequency_days: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Saldo Cashback (R$)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.cashback_balance}
                    onChange={(e) => setFormData({ ...formData, cashback_balance: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Anotações Internas do Cliente</label>
                <textarea
                  rows={2}
                  placeholder="Ex: Tem um Pitbull de 3 anos e um gato persa..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-extrabold bg-[#12C0E0] text-black hover:bg-[#00ADC9]"
                >
                  Salvar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDITAR CLIENTE */}
      {editingCustomer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-[#12C0E0]" />
                <h3 className="font-extrabold text-lg text-[#0B0F17]">Editar Cliente</h3>
              </div>
              <button onClick={() => setEditingCustomer(null)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nome Completo *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Telefone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">E-mail</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Endereço de Entrega</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Hábitos de Consumo (separados por vírgula)
                </label>
                <input
                  type="text"
                  value={formData.consumption_habits}
                  onChange={(e) => setFormData({ ...formData, consumption_habits: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Periodicidade (dias)</label>
                  <input
                    type="number"
                    min="5"
                    max="180"
                    value={formData.purchase_frequency_days}
                    onChange={(e) => setFormData({ ...formData, purchase_frequency_days: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Saldo Cashback (R$)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.cashback_balance}
                    onChange={(e) => setFormData({ ...formData, cashback_balance: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Anotações Internas</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingCustomer(null)}
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
    </div>
  );
}