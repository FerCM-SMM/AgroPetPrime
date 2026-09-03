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
      window.open(`https://wa.me/${whatsapp}?text=${message}`, '_blank');
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
      <main className="max-w-4xl mx-auto px-4 py-24 text-center">
        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#000000] mb-4">Carrinho vazio</h2>
        <p className="text-gray-600 mb-8">Adicione produtos ao carrinho para finalizar seu pedido.</p>
        <Link href="/categorias/racoes">
          <Button className="bg-[#12c0e0] text-black hover:bg-[#0ea5e9]">Ver Catálogo</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#000000] mb-8">Finalizar Pedido</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-[#000000] mb-4">Seus Dados de Contato & Entrega</h2>
            <div className="space-y-4">
              <div>
                <Label>Nome completo</Label>
                <Input placeholder="Seu nome completo" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <Label>Telefone / WhatsApp</Label>
                <Input placeholder="(00) 00000-0000" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div>
                <Label>CEP</Label>
                <Input placeholder="00000-000" required value={formData.zip_code} onChange={(e) => setFormData({...formData, zip_code: e.target.value})} />
              </div>
              <div>
                <Label>Endereço</Label>
                <Input placeholder="Nome da rua ou avenida" required value={formData.street} onChange={(e) => setFormData({...formData, street: e.target.value})} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label>Número</Label>
                  <Input placeholder="123" required value={formData.number} onChange={(e) => setFormData({...formData, number: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <Label>Complemento</Label>
                  <Input placeholder="Apto, bloco, etc (opcional)" value={formData.complement} onChange={(e) => setFormData({...formData, complement: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Cidade</Label>
                  <Input placeholder="Cidade" required value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                </div>
                <div>
                  <Label>Estado</Label>
                  <Input placeholder="SP" required value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-[#000000] mb-4">Observações do Pedido (opcional)</h2>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
              rows={3}
              placeholder="Ex: Entregar após as 14h, interfone 42, etc..."
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
            />
          </Card>

          <Button type="submit" size="lg" disabled={loading} className="w-full bg-[#12c0e0] text-black hover:bg-[#0ea5e9] font-black">
            <Send className="w-5 h-5 mr-2" />
            {loading ? 'Processando Pedido...' : 'Enviar Pedido pelo WhatsApp'}
          </Button>
        </form>

        <div>
          <Card className="p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-[#000000] mb-4">Resumo do Pedido</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.product.name} x{item.quantity}</span>
                  <span className="font-medium">{formatCurrency(item.product.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-[#00829B]">{formatCurrency(total)}</span>
              </div>
              <div className="bg-purple-50 p-2.5 rounded-xl border border-purple-100 flex items-center justify-between text-xs text-purple-700 font-bold mt-2">
                <span>🎁 Cashback a receber (5%):</span>
                <span>{formatCurrency(total * 0.05)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}