'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Send, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { createOrderBrowser } from '@/lib/supabase/orders';
import { recordCheckoutOrder } from '@/lib/admin-store';
import { toast } from 'sonner';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [observation, setObservation] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    street: '',
    number: '',
    complement: '',
    zip_code: '',
    city: '',
    state: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error('Seu carrinho está vazio');
      return;
    }
    setLoading(true);
    try {
      const address = `${formData.street}, ${formData.number}${formData.complement ? ' - ' + formData.complement : ''} – ${formData.zip_code} ${formData.city}/${formData.state}`;

      // 1. Grava no banco de dados local do painel admin (Pedidos, CRM de Clientes e Baixa no Estoque)
      try {
        recordCheckoutOrder({
          customerName: formData.name,
          customerPhone: formData.phone,
          customerAddress: address,
          total,
          observation: observation || undefined,
          items: items.map((i) => ({
            product_id: i.product.id,
            product_name: i.product.name,
            quantity: i.quantity,
            unit_price: i.product.price,
            image: (i.product as any).image_urls?.[0] || (i.product as any).image || '/images/prod-dog-food.jpg',
          })),
        });
      } catch (err) {
        console.warn('Admin store order sync notice:', err);
      }

      // 2. Tenta salvar no Supabase (se configurado)
      try {
        await createOrderBrowser({
          customer_name: formData.name,
          customer_phone: formData.phone,
          customer_address: address,
          total,
          observation: observation || undefined,
          items: items.map((i) => ({
            product_id: i.product.id,
            quantity: i.quantity,
            unit_price: i.product.price,
          })),
        });
      } catch (err) {
        console.warn('Supabase order save notice (fallback to local + WhatsApp):', err);
      }

      // 3. Envia mensagem formatada no WhatsApp
      const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5515996580804';
      const message = encodeURIComponent(
        `*PEDIDO NOVO - AGROPET PR1ME*\n` +
          `========================\n` +
          `👤 *Cliente:* ${formData.name}\n` +
          `📱 *WhatsApp:* ${formData.phone}\n` +
          `📍 *Endereço:* ${formData.street}, ${formData.number}` +
          (formData.complement ? ` - ${formData.complement}\n` : '\n') +
          `CEP: ${formData.zip_code} - ${formData.city}/${formData.state}\n` +
          (observation ? `📝 *Obs:* ${observation}\n` : '') +
          `========================\n` +
          `🛒 *ITENS DO PEDIDO:*\n` +
          items.map((item) => `- ${item.product.name} x${item.quantity} = ${formatCurrency(item.product.price * item.quantity)}`).join('\n') +
          `\n========================\n` +
          `💰 *TOTAL DO PEDIDO:* ${formatCurrency(total)}\n` +
          `========================\n` +
          `Aguardando confirmação de entrega!`
      );
      window.open(`https://wa.me/${whatsapp}?text=${message}`, '_blank', 'noopener,noreferrer');
      toast.success('Pedido registrado com sucesso! Redirecionando para o WhatsApp.');
      clearCart();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erro ao enviar pedido';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-[70vh] bg-[#FFFDF8] flex items-center justify-center px-4 py-24">
        <div className="max-w-md w-full bg-[#FAF7F2] border border-[#EBE3D5] rounded-3xl p-8 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-[#EBE3D5]/50 flex items-center justify-center mx-auto mb-4 text-[#1C4E47]">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#20241F] mb-3">Seu carrinho está vazio</h2>
          <p className="text-[#555C54] text-sm mb-6 leading-relaxed">Adicione produtos nutritivos e itens de cuidado pet ao seu carrinho para finalizar seu pedido.</p>
          <Link href="/categorias/racoes">
            <Button className="w-full bg-[#12C0E0] text-black hover:bg-[#0EA5E9] font-bold py-3 rounded-full shadow-sm hover:scale-[1.01] transition-transform">
              Ver Catálogo Completo
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFFDF8] py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center md:text-left">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#1C4E47] bg-[#E2EBE8] px-3.5 py-1 rounded-full mb-3">
            Finalização Segura
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#20241F] tracking-tight">
            Concluir seu Pedido
          </h1>
          <p className="text-sm text-[#555C54] mt-2">
            Preencha seus dados para receber o atendimento personalizado e agendamento da entrega.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
            {/* Step 1: Dados e Entrega */}
            <div className="bg-[#FAF7F2] border border-[#EBE3D5] rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#EBE3D5]">
                <div className="w-8 h-8 rounded-full bg-[#1C4E47] text-white flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#20241F]">Dados de Contato & Entrega</h2>
                  <p className="text-xs text-[#555C54]">Informe onde seus produtos devem ser entregues</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-[#20241F] mb-1.5 block">Nome completo *</Label>
                  <Input 
                    placeholder="Seu nome completo" 
                    required 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-white border-[#D6CBB8] focus-visible:ring-[#12C0E0] rounded-xl h-11 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-[#20241F] mb-1.5 block">WhatsApp / Telefone com DDD *</Label>
                  <Input 
                    placeholder="(15) 99999-9999" 
                    required 
                    value={formData.phone} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="bg-white border-[#D6CBB8] focus-visible:ring-[#12C0E0] rounded-xl h-11 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-[#20241F] mb-1.5 block">CEP *</Label>
                  <Input 
                    placeholder="18070-000" 
                    required 
                    value={formData.zip_code} 
                    onChange={(e) => setFormData({...formData, zip_code: e.target.value})}
                    className="bg-white border-[#D6CBB8] focus-visible:ring-[#12C0E0] rounded-xl h-11 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-[#20241F] mb-1.5 block">Endereço (Rua / Avenida) *</Label>
                  <Input 
                    placeholder="Ex: Rua Antônio Silva Saladino" 
                    required 
                    value={formData.street} 
                    onChange={(e) => setFormData({...formData, street: e.target.value})}
                    className="bg-white border-[#D6CBB8] focus-visible:ring-[#12C0E0] rounded-xl h-11 text-sm"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label className="text-xs font-semibold uppercase tracking-wider text-[#20241F] mb-1.5 block">Número *</Label>
                    <Input 
                      placeholder="878" 
                      required 
                      value={formData.number} 
                      onChange={(e) => setFormData({...formData, number: e.target.value})}
                      className="bg-white border-[#D6CBB8] focus-visible:ring-[#12C0E0] rounded-xl h-11 text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-[#20241F] mb-1.5 block">Complemento</Label>
                    <Input 
                      placeholder="Bloco, apto, casa 2 (opcional)" 
                      value={formData.complement} 
                      onChange={(e) => setFormData({...formData, complement: e.target.value})}
                      className="bg-white border-[#D6CBB8] focus-visible:ring-[#12C0E0] rounded-xl h-11 text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs font-semibold uppercase tracking-wider text-[#20241F] mb-1.5 block">Cidade *</Label>
                    <Input 
                      placeholder="Sorocaba" 
                      required 
                      value={formData.city} 
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="bg-white border-[#D6CBB8] focus-visible:ring-[#12C0E0] rounded-xl h-11 text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold uppercase tracking-wider text-[#20241F] mb-1.5 block">Estado *</Label>
                    <Input 
                      placeholder="SP" 
                      required 
                      value={formData.state} 
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                      className="bg-white border-[#D6CBB8] focus-visible:ring-[#12C0E0] rounded-xl h-11 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Observações */}
            <div className="bg-[#FAF7F2] border border-[#EBE3D5] rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#EBE3D5]">
                <div className="w-8 h-8 rounded-full bg-[#1C4E47] text-white flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#20241F]">Observações para a Entrega</h2>
                  <p className="text-xs text-[#555C54]">Prefere algum horário ou forma de contato específica?</p>
                </div>
              </div>
              <textarea
                className="w-full p-3.5 bg-white border border-[#D6CBB8] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#12C0E0] transition text-[#20241F] placeholder:text-gray-400"
                rows={3}
                placeholder="Ex: Tocar o interfone 12, entregar preferencialmente após as 15h..."
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              size="lg" 
              disabled={loading} 
              className="w-full bg-[#12C0E0] hover:bg-[#0EA5E9] text-black font-extrabold text-base py-6 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              {loading ? 'Processando Pedido...' : 'Concluir e Enviar pelo WhatsApp'}
            </Button>
            <p className="text-xs text-center text-[#555C54]">
              🔒 Ao clicar, seu pedido será registrado e você falará diretamente com nossa equipe em Sorocaba para combinar o pagamento e entrega.
            </p>
          </form>

          {/* Right Summary Column */}
          <div className="lg:col-span-5">
            <div className="bg-[#FAF7F2] border border-[#EBE3D5] rounded-3xl p-6 sm:p-8 sticky top-24 shadow-sm">
              <h2 className="font-serif text-xl font-bold text-[#20241F] mb-6 pb-4 border-b border-[#EBE3D5]">
                Resumo do Pedido ({items.reduce((acc, item) => acc + item.quantity, 0)} itens)
              </h2>

              <div className="space-y-3.5 mb-6 max-h-[320px] overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-start text-sm gap-3 pb-3 border-b border-[#EBE3D5]/60 last:border-b-0">
                    <div>
                      <span className="font-medium text-[#20241F] block leading-snug">{item.product.name}</span>
                      <span className="text-xs text-[#555C54]">Qtd: {item.quantity} × {formatCurrency(item.product.price)}</span>
                    </div>
                    <span className="font-bold text-[#1C4E47] shrink-0">{formatCurrency(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5 pt-4 border-t border-[#EBE3D5] text-sm">
                <div className="flex justify-between text-[#555C54]">
                  <span>Subtotal</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between text-[#555C54]">
                  <span>Entrega em Sorocaba</span>
                  <span className="text-emerald-600 font-semibold">{total >= 150 ? 'Grátis' : 'A combinar'}</span>
                </div>
                <div className="pt-3 border-t border-[#EBE3D5] flex justify-between items-baseline font-serif font-bold text-xl text-[#20241F]">
                  <span>Total</span>
                  <span className="text-[#1C4E47] text-2xl">{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Cashback badge */}
              <div className="bg-[#E2EBE8] p-3 rounded-2xl border border-[#C5D8D3] flex items-center justify-between text-xs text-[#1C4E47] font-bold mt-6">
                <span>🎁 Cashback acumulado (5%):</span>
                <span>{formatCurrency(total * 0.05)}</span>
              </div>

              <div className="mt-6 pt-5 border-t border-[#EBE3D5] text-xs text-[#555C54] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                  <span>Produtos com validade garantida e procedência oficial.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                  <span>Pagamento via PIX, Cartão ou Dinheiro na entrega.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}