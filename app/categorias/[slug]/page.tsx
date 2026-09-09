import { ProductCard } from '@/components/products/product-card';
import { getProductsByCategoryServer } from '@/lib/supabase/queries';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

type Props = { params: Promise<{ slug: string }> };

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const { products, category } = await getProductsByCategoryServer(slug);
  const list = products.length > 0 ? products : MOCK_PRODUCTS;
  const title = category?.name ?? 'Catálogo';
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#20241F] mb-3">{title}</h1>
      {category?.description && <p className="text-[#20241F]/70 text-sm sm:text-base mb-8 max-w-2xl">{category.description}</p>}
      {!category && <p className="text-gray-500 mb-8 text-sm">Exibindo produtos selecionados para esta categoria</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
