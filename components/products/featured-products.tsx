import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/products/product-card';
import { getFeaturedProductsServer } from '@/lib/supabase/queries';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';

export async function FeaturedProducts() {
  let products = await getFeaturedProductsServer();
  if (!products || products.length === 0) {
    products = MOCK_PRODUCTS;
  }

  return (
    <section className="py-16 sm:py-20 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0284c7] bg-[#12c0e0]/10 px-3.5 py-1 rounded-full mb-2">
              <span>⭐</span> Mais Vendidos <span>⭐</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
              Os favoritos dos nossos clientes
            </h2>
          </div>

          <Link
            href="/categorias"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0284c7] hover:text-[#0369a1] group transition-colors self-start sm:self-auto"
          >
            <span>Ver Catálogo Completo</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product, idx) => (
            <AnimatedWrapper key={product.id} delayMs={idx * 60}>
              <ProductCard product={product} />
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
