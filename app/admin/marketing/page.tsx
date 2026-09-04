'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Customer,
  getStoredCustomers,
  getDaysSinceLastOrder,
  getCustomerStatus,
} from '@/lib/admin-store';
import {
  Sparkles,
  Send,
  MessageCircle,
  Clock,
  Coins,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Play,
  Settings,
  Users,
  TrendingUp,
  Percent,
  Check,
  Copy,
  ExternalLink,
  ChevronRight,
  Phone,
  Flame,
} from 'lucide-react';
import { toast } from 'sonner';

interface MarketingRule {
  id: string;
  title: string;
  description: string;
  category: string;
  triggerDays: number;
  badge: string;
  iconColor: string;
  template: (c: Customer, days: number) => string;
}

export default function AdminMarketingPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedRuleId, setSelectedRuleId] = useState<string>('rule-reactivation');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const list = getStoredCustomers();
    setCustomers(list);
    if (list.length > 0) {
      setSelectedCustomerId(list[0].id);
    }
  }, []);

  // 4 Réguas de Automação de Marketing Inteligente
  const marketingRules: MarketingRule[] = [
    {
      id: 'rule-reactivation',
      title: '🚨 Reativação de Clientes em Risco (>30 dias sem comprar)',
      description: 'Dispara automaticamente para tutores cujo tempo desde a última compra excedeu 30 dias.',
      category: 'Retenção & Churn',
      triggerDays: 30,
      badge: 'Alta Conversão',
      iconColor: 'bg-amber-500',
      template: (c, days) =>
        `Olá ${c.name}! Tudo bem?\n\n` +
        `Aqui é da equipe da *AgroPet Pr1me* 🐾\n\n` +
        `Sentimos sua falta! Já faz cerca de *${days} dias* desde a sua última visita à nossa loja.\n\n` +
        `Seu pet já deve estar precisando de suprimentos novos! Para comemorar seu retorno, preparamos um presente especial:\n` +
        `🎁 Você possui *R$ ${c.cashback_balance.toFixed(2)}* de Cashback acumulado para abater no pedido!\n` +
        `🚚 Use o cupom *VOLTOUPRIME* e ganhe *Frete Grátis* hoje mesmo!\n\n` +
        `Gostaria de ver as ofertas ou repetir seu pedido anterior? Posso separar para você agora!`,
    },
    {
      id: 'rule-food-replenish',
      title: '🦴 Lembrete Preditivo de Reposição de Ração (Periodicidade)',
      description: 'Calcula o tempo de duração estimado do saco de ração (ex: 25 a 35 dias) e avisa antes que o pote esvazie.',
      category: 'Recorrência Preditiva',
      triggerDays: 25,
      badge: 'Frequência Regular',
      iconColor: 'bg-[#12C0E0]',
      template: (c, days) =>
        `Olá ${c.name}! Tudo bem?\n\n` +
        `Passando rapidinho da *AgroPet Pr1me*! 🐕🥣\n\n` +
        `Pelo nosso cálculo de consumo, a ração do seu pet deve estar quase no finalzinho!\n\n` +
        `Para que ele não fique sem a refeição favorita, nós já podemos deixar o seu pacote de costume reservado com entrega rápida hoje:\n` +
        `✨ Prefere que enviemos no mesmo endereço (${c.address})?\n\n` +
        `É só responder com um "SIM" que já organizamos a sua entrega!`,
    },
    {
      id: 'rule-flea-prevention',
      title: '🛡️ Alerta de Proteção Antipulgas & Carrapatos (Sazonal)',
      description: 'Lembrete de renovação de dose para clientes compradores de Simparic, NexGard ou Bravecto.',
      category: 'Saúde Animal',
      triggerDays: 30,
      badge: 'Saúde & Cuidados',
      iconColor: 'bg-emerald-500',
      template: (c) =>
        `Oi ${c.name}! Passando com um lembrete de saúde importante da *AgroPet Pr1me* 🛡️🐾\n\n` +
        `A dose de proteção contra pulgas, carrapatos e sarnas do seu pet está completando o ciclo este mês!\n\n` +
        `Manter a dosagem em dia é essencial para evitar parasitas e alergias graves. Temos estoque a pronta entrega dos melhores comprimidos mastigáveis palatáveis com entrega expressa.\n\n` +
        `Quer que eu separe a dose de reforço dele para envio hoje?`,
    },
    {
      id: 'rule-cashback-rescue',
      title: '💰 Resgate de Saldo de Cashback Acumulado',
      description: 'Incentiva clientes com créditos acumulados acima de R$ 20,00 a voltarem e aproveitarem o desconto.',
      category: 'Fidelidade & Cashback',
      triggerDays: 15,
      badge: 'Crédito Ativo',
      iconColor: 'bg-purple-600',
      template: (c) =>
        `Olá ${c.name}! Notícia boa da *AgroPet Pr1me*! 🎉\n\n` +
        `Você sabia que possui *R$ ${c.cashback_balance.toFixed(2)} de saldo em Cashback* disponível para usar na nossa loja?\n\n` +
        `Esse crédito é todo seu e pode ser descontado agora mesmo em qualquer produto (rações, brinquedos, petiscos ou farmácia).\n\n` +
        `Aproveite para garantir o mimo do seu pet com desconto exclusivo! O que você gostaria de pedir hoje?`,
    },
  ];

  const currentRule = marketingRules.find((r) => r.id === selectedRuleId) || marketingRules[0];
  const currentCustomer = customers.find((c) => c.id === selectedCustomerId) || customers[0];

  // Clientes elegíveis para a régua selecionada
  const eligibleCustomers = useMemo(() => {
    if (currentRule.id === 'rule-reactivation') {
      return customers.filter((c) => getDaysSinceLastOrder(c.last_order_date) >= 30);
    } else if (currentRule.id === 'rule-cashback-rescue') {
      return customers.filter((c) => (c.cashback_balance || 0) >= 15);
    } else {
      return customers;
    }
  }, [customers, currentRule]);

  // Mensagem gerada
  const generatedMessage = useMemo(() => {
    if (!currentCustomer) return '';
    const days = getDaysSinceLastOrder(currentCustomer.last_order_date);
    return currentRule.template(currentCustomer, days);
  }, [currentCustomer, currentRule]);

  // Enviar WhatsApp
  const handleSendWhatsApp = (customer: Customer) => {
    const cleanPhone = customer.phone.replace(/\D/g, '');
    const finalPhone = cleanPhone.length <= 11 ? '55' + cleanPhone : cleanPhone;
    const days = getDaysSinceLastOrder(customer.last_order_date);
    const msg = currentRule.template(customer, days);
    const url = `https://wa.me/${finalPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    toast.success(`Abrindo WhatsApp para enviar campanha a ${customer.name}!`);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    toast.success('Texto da mensagem copiado com sucesso!');
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-[#0B0F17] tracking-tight">
              Automação de Marketing & CRM Pr1me
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-purple-100 text-purple-700 border border-purple-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-600" />
              Réguas Inteligentes WhatsApp
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Campanhas preditivas de reativação com cupom de desconto, avisos de reposição de ração e resgate de cashback.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-extrabold text-emerald-800">4 Réguas Ativas</span>
          </div>
        </div>
      </div>

      {/* KPI Cards de Marketing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Clientes Monitorados</span>
            <span className="text-2xl font-black text-[#0B0F17] mt-1 block">{customers.length} Tutores</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-full bg-amber-400" />
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">Elegíveis para Reativação</span>
            <span className="text-2xl font-black text-amber-900 mt-1 block">
              {customers.filter((c) => getDaysSinceLastOrder(c.last_order_date) >= 30).length} Clientes
            </span>
            <span className="text-[11px] font-semibold text-amber-700">&gt; 30 dias sem compras</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Flame className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Taxa de Abertura WhatsApp</span>
            <span className="text-2xl font-black text-emerald-600 mt-1 block">98.2%</span>
            <span className="text-[11px] font-semibold text-gray-400">vs 18% em e-mail</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Cashback Pronto para Resgate</span>
            <span className="text-2xl font-black text-purple-700 mt-1 block">
              R$ {customers.reduce((acc, c) => acc + (c.cashback_balance || 0), 0).toFixed(2)}
            </span>
            <span className="text-[11px] font-semibold text-purple-600">Alavanca de recompra</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Coins className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Grid Principal: Réguas à Esquerda + Simulador Mobile à Direita */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Lado Esquerdo: Réguas de Automação (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-[#0B0F17]">Escolha a Régua de Campanha:</h2>
            <span className="text-xs font-bold text-gray-400">Clique para selecionar</span>
          </div>

          <div className="space-y-3">
            {marketingRules.map((rule) => {
              const isSelected = rule.id === selectedRuleId;
              return (
                <div
                  key={rule.id}
                  onClick={() => setSelectedRuleId(rule.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#12C0E0] ring-2 ring-[#12C0E0]/20 shadow-md'
                      : 'bg-white border-gray-200 hover:border-gray-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${rule.iconColor}`} />
                        <h3 className="font-extrabold text-sm text-[#0B0F17]">{rule.title}</h3>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed pl-4">{rule.description}</p>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 shrink-0">
                      {rule.badge}
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-500">
                      Audiência: <strong className="text-[#0B0F17]">{rule.category}</strong>
                    </span>
                    <span className="text-[#00829B] font-extrabold flex items-center gap-1">
                      {isSelected ? '✓ Selecionada' : 'Visualizar →'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Clientes Elegíveis para esta régua */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-sm text-[#0B0F17] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#12C0E0]" />
                Clientes Elegíveis para esta Régua ({eligibleCustomers.length}):
              </h3>
              <span className="text-[11px] font-bold text-gray-400">Clique para testar</span>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {eligibleCustomers.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-4">Nenhum cliente elegível no momento.</p>
              ) : (
                eligibleCustomers.map((cust) => {
                  const days = getDaysSinceLastOrder(cust.last_order_date);
                  const isSelectedCust = cust.id === selectedCustomerId;

                  return (
                    <div
                      key={cust.id}
                      onClick={() => setSelectedCustomerId(cust.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer text-xs ${
                        isSelectedCust
                          ? 'bg-[#eff4ff] border-[#12C0E0] font-bold text-[#0B0F17]'
                          : 'bg-gray-50/70 border-gray-200 hover:bg-gray-100/80 text-gray-600'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-[#0B0F17]">{cust.name}</span>
                          <span className="text-[10px] text-gray-400">({cust.phone})</span>
                        </div>
                        <span className="text-[11px] text-gray-500 block">
                          Última compra: há {days} dias • Saldo: R$ {cust.cashback_balance.toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSendWhatsApp(cust);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black bg-[#25D366] hover:bg-[#20b858] text-white transition-all shadow-xs shrink-0"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>Disparar</span>
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Lado Direito: Simulador de Celular / WhatsApp (5 cols) */}
        <div className="lg:col-span-5 space-y-4 sticky top-24">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-[#0B0F17]">Pré-Visualização no WhatsApp:</h2>
            <button
              onClick={handleCopyMessage}
              className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-black"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
            </button>
          </div>

          {/* Smartphone Mockup */}
          <div className="w-full max-w-sm mx-auto bg-[#111B21] rounded-[38px] p-3.5 shadow-2xl border-4 border-gray-800">
            {/* Top Bar do Celular */}
            <div className="pt-2 pb-3 px-3 flex items-center justify-between border-b border-gray-800 text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#12C0E0] text-black font-black text-xs flex items-center justify-center">
                  🐾
                </div>
                <div>
                  <p className="text-xs font-bold leading-tight">AgroPet Pr1me Oficial</p>
                  <span className="text-[10px] text-emerald-400">Conta Comercial Verificada</span>
                </div>
              </div>
              <Phone className="w-4 h-4 text-gray-400" />
            </div>

            {/* Mensagem dentro do WhatsApp */}
            <div className="p-3 my-4 space-y-3 min-h-[340px] flex flex-col justify-end bg-[#0B141A]/60 rounded-2xl">
              <div className="max-w-[90%] bg-[#005C4B] text-white text-[11px] p-3 rounded-2xl rounded-tl-xs shadow-md space-y-1.5 leading-relaxed self-start">
                <p className="whitespace-pre-line">{generatedMessage}</p>
                <span className="text-[9px] text-gray-300 block text-right">Agora mesmo ✓✓</span>
              </div>
            </div>

            {/* Ação de Envio Real */}
            <div className="pt-2 pb-1">
              <button
                disabled={!currentCustomer}
                onClick={() => currentCustomer && handleSendWhatsApp(currentCustomer)}
                className="w-full py-3 px-4 rounded-2xl font-black text-xs bg-[#25D366] hover:bg-[#20b858] text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Testar Disparo para {currentCustomer?.name || 'Cliente'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}