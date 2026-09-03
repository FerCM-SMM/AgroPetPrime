'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Copy, Check, MessageCircle, ArrowRight, ShieldCheck, Truck, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Footer } from '@/components/layout/footer';

export default function CheckoutSucessoPage() {
  const [copied, setCopied] = useState(false);
  const orderId = 'AGP-2026-9842';
  const pixCode = '00020126580014br.gov.bcb.pix0136agropetpr1me-pix-98425204000053039865406189.905802BR5913AgroPet Pr1me6009Sao Paulo62070503***6304E8A1';

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    toast.success('Chave Pix Copia e Cola copiada para a área de transferência! ✓');
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappUrl = `https://wa.me/5515996580804?text=Ol%C3%A1!%20Acabei%20de%20realizar%20o%20pedido%20%23${orderId}%20no%20site%20da%20AgroPet%20Pr1me%20e%20gostaria%20de%20confirmar%20a%20entrega.`;

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#ede8dc] shadow-sm text-center space-y-6">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-[#10b981]/15 text-[#059669] flex items-center justify-center mx-auto animate-fade-in-up">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div>
            <span className="bg-[#12c0e0] text-black text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              🐾 Pedido Confirmado!
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#111827] mt-3">
              Obrigado pela sua compra!
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Seu pedido <strong className="text-gray-900">#{orderId}</strong> foi registrado e já está sendo preparado com todo o carinho.
            </p>
          </div>

          {/* Pix Payment Box */}
          <div className="bg-[#faf8f5] rounded-2xl p-6 border border-[#ede8dc] text-left space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Pagamento via Pix Instantâneo
              </span>
              <span className="bg-[#10b981]/15 text-[#059669] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                Aprovação Imediata
              </span>
            </div>

            <p className="text-xs text-gray-500">
              Copie o código abaixo e utilize a opção <strong>Pix Copia e Cola</strong> no aplicativo do seu banco:
            </p>

            <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-[#ede8dc]">
              <input
                type="text"
                readOnly
                value={pixCode}
                className="flex-1 bg-transparent text-xs text-gray-600 font-mono focus:outline-none truncate"
              />
              <Button
                type="button"
                size="sm"
                onClick={handleCopyPix}
                className={`rounded-lg text-xs font-bold shrink-0 transition-all ${
                  copied
                    ? 'bg-[#10b981] text-white'
                    : 'bg-[#12c0e0] hover:bg-[#0ea5e9] text-black'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                {copied ? 'Copiado!' : 'Copiar Chave'}
              </Button>
            </div>
          </div>

          {/* WhatsApp Fast Contact Button */}
          <div className="space-y-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                size="lg"
                className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-extrabold text-sm py-6 rounded-full shadow-xs hover-lift active-press flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>CONFIRMAR PEDIDO NO WHATSAPP</span>
              </Button>
            </a>
            <p className="text-xs text-gray-500">
              Envie o comprovante para agilizar o envio imediato da sua encomenda.
            </p>
          </div>

          {/* Delivery & Security Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#ede8dc] text-left">
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-[#0284c7] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-gray-900">Previsão de Entrega</p>
                <p className="text-xs text-gray-500">24h a 48h úteis com rastreamento via WhatsApp</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-gray-900">Garantia Pr1me</p>
                <p className="text-xs text-gray-500">Produtos lacrados de fábrica com nota fiscal e garantia</p>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/perfil">
              <Button variant="outline" className="rounded-full border-[#ede8dc] text-xs font-bold hover-lift">
                Ver Meus Pedidos
              </Button>
            </Link>
            <Link href="/categorias">
              <Button variant="ghost" className="rounded-full text-xs font-bold text-[#0284c7] hover-lift">
                <span>Continuar Comprando</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}