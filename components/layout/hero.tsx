import { ArrowRight, ShieldCheck, ShoppingCart, Sparkles, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#faf8f5] via-[#f5f1e8] to-[#faf8f5] pt-10 pb-20 lg:pt-14 lg:pb-28">
      {/* Decorative Organic Backdrop Shapes */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-[#12c0e0]/10 via-[#fbbf24]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-white/90 border border-[#ede8dc] px-4 py-1.5 rounded-full shadow-xs text-xs font-semibold text-gray-800">
              <span className="text-base">🐾</span>
              <span className="text-[#0284c7] font-bold">QUALIDADE PR1ME</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">Marcas Aprovadas por Veterinários</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight leading-[1.15]">
              O MELHOR PARA <br className="hidden sm:inline" />
              <span className="text-[#0284c7]">O SEU PET</span>
            </h1>

            <p className="text-xl sm:text-2xl font-medium text-gray-700 italic">
              Com todo o amor e carinho que ele merece ♡
            </p>

            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Encontre rações super premium, farmácia veterinária completa, petiscos naturais,
              acessórios e itens para o campo. Tudo com entrega rápida e atendimento dedicado.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/categorias">
                <Button
                  size="lg"
                  className="bg-[#12c0e0] hover:bg-[#0ea5e9] text-black font-bold text-base px-8 py-6 rounded-full shadow-sm hover-lift active-press flex items-center gap-2.5"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>COMPRAR AGORA</span>
                </Button>
              </Link>
              <Link href="/categorias">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/80 hover:bg-white text-gray-800 border-[#ede8dc] font-semibold text-base px-7 py-6 rounded-full shadow-xs hover-lift active-press flex items-center gap-2"
                >
                  <span>Explorar Catálogo</span>
                  <ArrowRight className="w-4 h-4 text-gray-500" />
                </Button>
              </Link>
            </div>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#ede8dc]/80">
              <div className="flex items-center justify-center lg:justify-start gap-2.5 text-left">
                <div className="w-9 h-9 rounded-full bg-[#10b981]/15 text-[#059669] flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 leading-tight">100% Seguro</p>
                  <p className="text-[11px] text-gray-500">Amigável ao pet</p>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2.5 text-left">
                <div className="w-9 h-9 rounded-full bg-[#12c0e0]/15 text-[#0284c7] flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 leading-tight">Entrega Rápida</p>
                  <p className="text-[11px] text-gray-500">Acima de R$ 149</p>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2.5 text-left">
                <div className="w-9 h-9 rounded-full bg-[#fbbf24]/20 text-[#b45309] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 leading-tight">Compra Segura</p>
                  <p className="text-[11px] text-gray-500">100% Protegida</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Imagery */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Rounded Frame Backdrop */}
            <div className="relative w-full max-w-md aspect-4/3 rounded-3xl overflow-hidden shadow-xl border-4 border-white/80 bg-white group">
              <Image
                src="/images/hero-pets.jpg"
                alt="Golden Retriever e Gatinho AgroPet Pr1me"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-103"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Floating Review Badge */}
            <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-[#ede8dc] flex items-center gap-2.5 animate-fade-in-up">
              <div className="w-8 h-8 rounded-full bg-[#fbbf24] text-white flex items-center justify-center font-bold text-xs">
                ★
              </div>
              <div className="text-left">
                <div className="flex text-[#f59e0b] text-xs">★★★★★</div>
                <p className="text-[11px] font-bold text-gray-900">+2.400 Clientes Felizes</p>
              </div>
            </div>

            {/* Floating Trust Badge */}
            <div className="absolute -bottom-4 -left-2 sm:-left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-[#ede8dc] flex items-center gap-2.5 animate-fade-in-up">
              <div className="w-8 h-8 rounded-full bg-[#12c0e0] text-black flex items-center justify-center font-bold text-xs">
                ✓
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-gray-900">Atendimento Dedicado</p>
                <p className="text-[10px] text-gray-500">Suporte Especializado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
