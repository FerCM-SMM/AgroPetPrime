import { ProductCard } from '@/components/products/product-card';
import { getFeaturedProductsServer } from '@/lib/supabase/queries';

export async function FeaturedProducts() {
  const products = await getFeaturedProductsServer();
  if (products.length === 0) return null;
  return (
    <section className="py-16 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#000000] mb-12">
          Produtos em Destaque
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
