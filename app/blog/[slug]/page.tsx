import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, User, Heart, Share2, Sparkles, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/product-card';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { Footer } from '@/components/layout/footer';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const titleFormatted = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return {
    title: `${titleFormatted} | Blog AgroPet Pr1me`,
    description: `Confira nosso guia completo sobre ${titleFormatted}. Dicas veterinárias e nutrição para o seu animal.`,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const titleFormatted = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const relatedProducts = MOCK_PRODUCTS.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header Breadcrumb */}
      <div className="bg-white border-b border-[#ede8dc] py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284c7] hover:text-[#0369a1] mb-4 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Voltar para todos os artigos</span>
          </Link>

          <div className="inline-flex items-center gap-2 bg-[#12c0e0]/15 text-[#0284c7] text-xs font-extrabold px-3 py-1 rounded-full mb-3">
            <span>🐾</span> GUIA VETERINÁRIO PR1ME
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
            {titleFormatted}
          </h1>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-gray-500 mt-4 pt-4 border-t border-[#f4f0e8]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#12c0e0]" />
              <span>02 de Setembro de 2026</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#12c0e0]" />
              <span>5 min de leitura</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#12c0e0]" />
              <span>Dr. Veterinário AgroPet Pr1me</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Article Body */}
        <article className="bg-white rounded-3xl p-6 sm:p-10 border border-[#ede8dc] shadow-xs space-y-6 text-[#18202f] leading-relaxed text-base sm:text-lg">
          <p className="text-xl font-medium text-gray-700 leading-relaxed italic border-l-4 border-[#12c0e0] pl-4 py-1">
            Garantir a alimentação e o bem-estar adequados para o seu companheiro é o primeiro passo para uma vida longa, saudável e repleta de energia.
          </p>

          <h2 className="text-2xl font-bold text-[#111827] pt-4">
            1. Compreendendo as necessidades específicas da fase de vida
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Cada animal possui exigências calóricas, proteicas e minerais que variam conforme a idade, porte físico e nível de atividade diária. Filhotes demandam níveis maiores de cálcio e fósforo para o desenvolvimento ósseo sadio, enquanto animais adultos se beneficiam de condroitina e glicosamina para a preservação articular.
          </p>

          {/* Practical Tips Card */}
          <div className="bg-[#faf8f5] rounded-2xl p-6 border border-[#ede8dc] space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[#0284c7]">
              <Sparkles className="w-4 h-4" />
              <span>Dicas de Ouro dos Nossos Especialistas:</span>
            </div>
            <ul className="text-xs sm:text-sm text-gray-600 space-y-2 list-disc list-inside">
              <li>Mantenha sempre água fresca e filtrada disponível ao lado do comedouro.</li>
              <li>Realize a transição de ração de forma gradual ao longo de 7 a 10 dias.</li>
              <li>Consulte um médico veterinário periodicamente para avaliar peso e exames preventivos.</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-[#111827] pt-4">
            2. Ingredientes nobres e nutrição funcional
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Optar por linhas super premium com fontes de proteína de alta digestibilidade reduz a formação de tártaro, melhora o aspecto da pelagem e resulta em fezes mais firmes e com menos odor.
          </p>
        </article>

        {/* Related Products Showcase */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0284c7]">
                🐾 Recomendados para Este Tema
              </span>
              <h3 className="text-2xl font-extrabold text-[#111827]">
                Produtos Selecionados na Loja
              </h3>
            </div>
            <Link href="/categorias">
              <Button variant="outline" size="sm" className="rounded-full border-[#ede8dc] text-xs font-bold hover-lift">
                Ver Catálogo
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}