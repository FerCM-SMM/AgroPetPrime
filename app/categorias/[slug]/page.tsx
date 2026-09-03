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
      <h1 className="text-3xl font-bold text-[#000000] mb-2">{title}</h1>
      {category?.description && <p className="text-gray-600 mb-8">{category.description}</p>}
      {!category && <p className="text-gray-500 mb-8">Exibindo todos os produtos (catálogo demo)</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
