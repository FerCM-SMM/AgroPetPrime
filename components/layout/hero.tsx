import { Button } from '@/components/ui/button';
import { ShoppingCart, Phone, Heart } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative bg-[#000000] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Tudo para o seu
              <span className="text-[#12c0e0]"> pet</span>,
              com o melhor atendimento
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              Racacoes, medicamentos, acessorios e equipamentos para caes, gatos, passarinhos e cavalos.
              Compre pelo site e receba pelo WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/categorias">
                <Button size="lg" className="bg-[#12c0e0] text-black hover:bg-[#0ea5e9]">
                  Ver Catalogo
                </Button>
              </Link>
              <a href="https://wa.me/5515996580804" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-black">
                  <Phone className="w-5 h-5 mr-2" />
                  Falar no WhatsApp
                </Button>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: ShoppingCart, label: 'Produtos' },
              { icon: Phone, label: 'Pedido pelo WhatsApp' },
              { icon: Heart, label: 'Cuidado' },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <item.icon className="w-8 h-8 text-[#12c0e0] mb-3" />
                <p className="text-lg font-semibold">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
