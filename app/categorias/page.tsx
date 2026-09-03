import Link from 'next/link';
import { ArrowRight, Dog, Cat, ShieldAlert, Sparkles, BedDouble, Scissors, Filter } from 'lucide-react';
import { ProductCard } from '@/components/products/product-card';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { getFeaturedProductsServer } from '@/lib/supabase/queries';
import { Footer } from '@/components/layout/footer';

export const metadata = {
  title: 'Categorias & Catálogo Completo | AgroPet Pr1me',
  description: 'Explore todos os departamentos da AgroPet Pr1me: rações super premium, farmácia veterinária, acessórios para pets e insumos para o campo.',
};

export default async function CategoriasPage() {
  let products = await getFeaturedProductsServer();
  if (!products || products.length === 0) {
    products = MOCK_PRODUCTS;
  }

  const categories = [
    {
      name: 'Cães & Filhotes',
      slug: 'cachorros',
      count: '48 produtos',
      icon: Dog,
      color: 'bg-[#12c0e0]/15 text-[#0284c7]',
    },
    {
      name: 'Gatos & Felinos',
      slug: 'gatos',
      count: '36 produtos',
      icon: Cat,
      color: 'bg-[#f59e0b]/15 text-[#d97706]',
    },
    {
      name: 'Farmácia Veterinária',
      slug: 'farmacia',
      count: '52 produtos',
      icon: ShieldAlert,
      color: 'bg-[#10b981]/15 text-[#059669]',
    },
    {
      name: 'Linha Agro & Campo',
      slug: 'agro',
      count: '24 produtos',
      icon: Sparkles,
      color: 'bg-[#0284c7]/15 text-[#0369a1]',
    },
    {
      name: 'Camas & Conforto',
      slug: 'conforto',
      count: '18 produtos',
      icon: BedDouble,
      color: 'bg-[#8b5cf6]/15 text-[#7c3aed]',
    },
    {
      name: 'Higiene & Estética',
      slug: 'higiene',
      count: '29 produtos',
      icon: Scissors,
      color: 'bg-[#ec4899]/15 text-[#db2777]',
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-[#ede8dc] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-gray-500 mb-2 flex items-center gap-1.5 font-medium">
            <Link href="/" className="hover:text-[#0284c7]">Início</Link>
            <span>/</span>
            <span className="text-gray-900 font-bold">Categorias & Catálogo</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
                Departamentos & Catálogo Geral
              </h1>
              <p className="text-gray-600 text-sm sm:text-base mt-1">
                Selecione uma categoria abaixo ou navegue por todos os produtos da loja com entrega rápida.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#faf8f5] border border-[#ede8dc] px-4 py-2 rounded-full text-xs font-semibold text-gray-700">
              <Filter className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>Exibindo todos os produtos</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Categories Cards */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categorias/${cat.slug}`}
                className="group bg-white rounded-3xl p-5 border border-[#ede8dc] shadow-xs hover-lift flex flex-col items-center text-center transition-all"
              >
                <div className={`w-16 h-16 rounded-full ${cat.color} flex items-center justify-center mb-3 transition-transform group-hover:scale-108 duration-300`}>
                  <cat.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-sm text-[#111827] group-hover:text-[#0284c7] transition-colors leading-tight mb-1">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-gray-500 font-medium">
                  {cat.count}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* All Products Showcase */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#ede8dc] pb-4">
            <h2 className="text-2xl font-bold text-[#111827]">
              Todos os Produtos em Destaque
            </h2>
            <span className="text-xs text-gray-500 font-medium">
              {products.length} itens disponíveis
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}