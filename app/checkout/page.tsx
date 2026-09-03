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
      const address = `${formData.street}, ${formData.number}${formData.complement ? ' - ' + formData.complement : ''} — ${formData.zip_code} ${formData.city}/${formData.state}`;

      // Tenta salvar no Supabase; se falhar (sem env), continua só com WhatsApp
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
        console.warn('Supabase order save failed (fallback to WhatsApp only):', err);
      }

      const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5515996580804';
      const message = encodeURIComponent(
        `Pedido - AgroPet Pr1me\n========================\n` +
          `Cliente: ${formData.name}\n` +
          `Telefone: ${formData.phone}\n` +
          `Endereco: ${formData.street}, ${formData.number}\n` +
          (formData.complement ? ` - ${formData.complement}\n` : '') +
          `CEP: ${formData.zip_code} - ${formData.city}/${formData.state}\n` +
          (observation ? `Obs: ${observation}\n` : '') +
          `========================\n` +
          `ITENS DO PEDIDO:\n` +
          items.map((item) => `- ${item.product.name} x${item.quantity} = ${formatCurrency(item.product.price * item.quantity)}`).join('\n') +
          `\n========================\n` +
          `TOTAL: ${formatCurrency(total)}\n` +
          `========================`
      );
      window.open(`https://wa.me/${whatsapp}?text=${message}`, '_blank');
      toast.success('Pedido enviado! Verifique seu WhatsApp.');
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
            <h2 className="text-xl font-semibold text-[#000000] mb-4">Seus Dados</h2>
            <div className="space-y-4">
              <div>
                <Label>Nome completo</Label>
                <Input placeholder="Seu nome completo" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <Label>Telefone</Label>
                <Input placeholder="(00) 00000-0000" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div>
                <Label>CEP</Label>
                <Input placeholder="00000-000" required value={formData.zip_code} onChange={(e) => setFormData({...formData, zip_code: e.target.value})} />
              </div>
              <div>
                <Label>Endereco</Label>
                <Input placeholder="Nome da rua" required value={formData.street} onChange={(e) => setFormData({...formData, street: e.target.value})} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label>Numero</Label>
                  <Input placeholder="123" required value={formData.number} onChange={(e) => setFormData({...formData, number: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <Label>Complemento</Label>
                  <Input placeholder="Apto, aparte, etc (opcional)" value={formData.complement} onChange={(e) => setFormData({...formData, complement: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Cidade</Label>
                  <Input placeholder="Cidade" required value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                </div>
                <div>
                  <Label>Estado</Label>
                  <Input placeholder="UF" required value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-[#000000] mb-4">Observação (opcional)</h2>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows={3}
              placeholder="Deixe sua mensagem..."
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
            />
          </Card>

          <Button type="submit" size="lg" disabled={loading} className="w-full bg-[#12c0e0] text-black hover:bg-[#0ea5e9]">
            <Send className="w-5 h-5 mr-2" />
            {loading ? 'Enviando...' : 'Enviar Pedido pelo WhatsApp'}
          </Button>
        </form>

        <div>
          <Card className="p-6">
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
                <span className="text-[#12c0e0]">{formatCurrency(total)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
