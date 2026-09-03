'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, Package, MapPin, Settings, LogOut, Phone, CheckCircle2, Clock, Truck, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';
import { Footer } from '@/components/layout/footer';

export default function PerfilPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'pedidos' | 'dados' | 'enderecos'>('pedidos');

  const mockOrders = [
    {
      id: 'AGP-9842',
      date: '02/09/2026',
      total: 189.90,
      status: 'Em Separação',
      statusColor: 'bg-[#12c0e0]/15 text-[#0284c7]',
      icon: Clock,
      items: [
        {
          name: 'Ração Super Premium Aurora Holistic Nutrition Cães Adultos 12kg',
          qty: 1,
          price: 189.90,
          image: '/images/prod-dog-food.jpg',
        },
      ],
    },
    {
      id: 'AGP-9610',
      date: '18/08/2026',
      total: 199.80,
      status: 'Entregue',
      statusColor: 'bg-[#10b981]/15 text-[#059669]',
      icon: CheckCircle2,
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
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Dados cadastrais atualizados com sucesso! ✓');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header Profile Title */}
      <div className="bg-white border-b border-[#ede8dc] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#12c0e0]/20 text-[#0284c7] flex items-center justify-center font-black text-2xl border-2 border-white shadow-xs">
                {user?.email ? user.email.slice(0, 2).toUpperCase() : 'AG'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-[#111827]">
                    {user?.email ? user.email.split('@')[0] : 'Fernando Costa'}
                  </h1>
                  <span className="bg-[#12c0e0] text-black text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                    🐾 CLIENTE PR1ME
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {user?.email || 'fernando.costam90@outlook.com'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/5515996580804"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#12c0e0]/10 hover:bg-[#12c0e0]/20 text-[#0284c7] text-xs font-bold px-4 py-2 rounded-full border border-[#12c0e0]/30 transition-all hover-lift"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Ajuda no WhatsApp</span>
              </a>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  logout();
                  toast.info('Sessão encerrada com sucesso.');
                }}
                className="border-[#ede8dc] text-gray-700 hover:text-red-600 rounded-full text-xs font-semibold hover-lift"
              >
                <LogOut className="w-3.5 h-3.5 mr-1" />
                <span>Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Menu Tabs */}
          <div className="lg:col-span-4 space-y-2">
            <div className="bg-white rounded-3xl p-3 border border-[#ede8dc] shadow-xs space-y-1">
              <button
                type="button"
                onClick={() => setActiveTab('pedidos')}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                  activeTab === 'pedidos'
                    ? 'bg-[#12c0e0] text-black shadow-xs'
                    : 'text-gray-700 hover:bg-[#faf8f5]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4" />
                  <span>Meus Pedidos</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('dados')}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                  activeTab === 'dados'
                    ? 'bg-[#12c0e0] text-black shadow-xs'
                    : 'text-gray-700 hover:bg-[#faf8f5]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4" />
                  <span>Meus Dados Cadastrais</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('enderecos')}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                  activeTab === 'enderecos'
                    ? 'bg-[#12c0e0] text-black shadow-xs'
                    : 'text-gray-700 hover:bg-[#faf8f5]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" />
                  <span>Endereço de Entrega</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            </div>
          </div>

          {/* Tab Content Area */}
          <div className="lg:col-span-8">
            {activeTab === 'pedidos' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-extrabold text-[#111827]">
                    Histórico de Pedidos
                  </h2>
                  <span className="text-xs text-gray-500 font-medium">
                    {mockOrders.length} pedidos encontrados
                  </span>
                </div>

                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-3xl p-6 border border-[#ede8dc] shadow-xs hover-lift transition-all space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f4f0e8] pb-4">
                        <div>
                          <span className="text-xs font-bold text-gray-400">PEDIDO</span>
                          <p className="text-base font-black text-[#111827]">#{order.id}</p>
                          <span className="text-xs text-gray-500">Realizado em {order.date}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${order.statusColor}`}>
                            <order.icon className="w-3.5 h-3.5" />
                            <span>{order.status}</span>
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="relative w-14 h-14 bg-[#faf8f5] rounded-xl overflow-hidden shrink-0 border border-[#ede8dc]">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-contain p-1"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-gray-900 truncate">
                                {item.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {item.qty}x R$ {item.price.toFixed(2).replace('.', ',')}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Total & Action */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#f4f0e8]">
                        <div>
                          <span className="text-xs text-gray-500">Valor Total</span>
                          <p className="text-lg font-extrabold text-[#111827]">
                            R$ {order.total.toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                        <a
                          href={`https://wa.me/5515996580804?text=Ol%C3%A1!%20Gostaria%20de%20consultar%20o%20status%20do%20meu%20pedido%20%23${order.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#faf8f5] hover:bg-[#12c0e0] text-gray-800 hover:text-black font-bold text-xs px-4 py-2 rounded-full border border-[#ede8dc] transition-colors"
                        >
                          Acompanhar Entrega
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'dados' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ede8dc] shadow-xs space-y-6">
                <h2 className="text-xl font-extrabold text-[#111827]">
                  Dados Pessoais
                </h2>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        defaultValue="Fernando Costa"
                        className="w-full bg-[#faf8f5] px-4 py-2.5 rounded-full border border-[#ede8dc] text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#12c0e0]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        E-mail
                      </label>
                      <input
                        type="email"
                        defaultValue={user?.email || 'fernando.costam90@outlook.com'}
                        className="w-full bg-[#faf8f5] px-4 py-2.5 rounded-full border border-[#ede8dc] text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#12c0e0]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        WhatsApp / Celular
                      </label>
                      <input
                        type="tel"
                        defaultValue="(15) 99658-0804"
                        className="w-full bg-[#faf8f5] px-4 py-2.5 rounded-full border border-[#ede8dc] text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#12c0e0]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        CPF
                      </label>
                      <input
                        type="text"
                        defaultValue="***.***.***-00"
                        className="w-full bg-[#faf8f5] px-4 py-2.5 rounded-full border border-[#ede8dc] text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#12c0e0]"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="bg-[#12c0e0] hover:bg-[#0ea5e9] text-black font-extrabold text-xs px-7 py-3 rounded-full hover-lift"
                    >
                      Salvar Alterações
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'enderecos' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ede8dc] shadow-xs space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-extrabold text-[#111827]">
                    Endereços Cadastrados
                  </h2>
                  <Button
                    size="sm"
                    className="bg-[#12c0e0] hover:bg-[#0ea5e9] text-black font-bold text-xs rounded-full"
                  >
                    + Novo Endereço
                  </Button>
                </div>

                <div className="border border-[#ede8dc] rounded-2xl p-5 bg-[#faf8f5] relative">
                  <span className="absolute top-4 right-4 bg-[#10b981]/15 text-[#059669] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                    PRINCIPAL
                  </span>
                  <p className="font-bold text-[#111827]">Endereço Residencial</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Av. Principal, 1500 - Bairro Centro
                  </p>
                  <p className="text-sm text-gray-600">
                    Sorocaba / SP - CEP: 18000-000
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Destinatário: Fernando Costa • (15) 99658-0804
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}