import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PromoBanner() {
  return (
    <section className="py-10 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#e0f7fa]/60 via-[#fbf7ee] to-[#fef3c7]/60 border border-[#ede8dc] shadow-sm p-6 sm:p-10 lg:p-12">
          {/* Subtle Decorative Paws */}
          <div className="absolute top-4 right-12 text-5xl opacity-10 select-none pointer-events-none">
            🐾
          </div>
          <div className="absolute bottom-4 left-8 text-4xl opacity-10 select-none pointer-events-none">
            🐾
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Corgi Puppy Image */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm aspect-4/3 sm:aspect-16/10 rounded-2xl overflow-hidden shadow-md border-3 border-white">
                <Image
                  src="/images/promo-corgi.jpg"
                  alt="Filhote Corgi AgroPet Pr1me Promoção"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Promo Text & Offer */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/90 border border-[#ede8dc] px-3.5 py-1 rounded-full text-xs font-bold text-[#b45309] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>OFERTA DA SEMANA</span>
                <span className="text-gray-300">•</span>
                <span className="flex items-center gap-1 text-gray-600">
                  <Clock className="w-3 h-3 text-red-500" />
                  Tempo Limitado!
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] tracking-tight">
                ATÉ <span className="text-[#0284c7]">30% OFF</span> <br />
                EM ACESSÓRIOS & BRINQUEDOS
              </h2>

              <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto lg:mx-0">
                Renove o conforto e a diversão do seu melhor amigo com caminhas anatômicas, arranhadores, mordedores e coleiras com frete rápido.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/categorias">
                  <Button
                    size="lg"
                    className="bg-[#12c0e0] hover:bg-[#0ea5e9] text-black font-extrabold text-sm px-8 py-6 rounded-full shadow-xs hover-lift active-press flex items-center gap-2"
                  >
                    <span>APROVEITAR DESCONTO</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <span className="text-xs text-gray-500 font-medium">
                  *Válido enquanto durarem os estoques
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
