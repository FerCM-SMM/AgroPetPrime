import { formatCurrency } from '@/lib/utils';
import { Truck, Shield, Clock } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { getProductBySlugServer, getSettingsServer } from '@/lib/supabase/queries';
import { ProductDetailClient } from '@/components/products/product-detail-client';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return MOCK_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlugServer(slug);
  if (!product) notFound();
  const settings = await getSettingsServer();
  const whatsapp = settings?.whatsapp_number || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5515996580804';

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-[#f8fafc] rounded-xl flex items-center justify-center aspect-square overflow-hidden">
          {product.image_urls?.[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.image_urls[0]} alt={product.name} className="object-contain w-full h-full p-8" />
          ) : (
            <div className="w-64 h-64 bg-gray-200 rounded-lg" />
          )}
        </div>
        <div>
          <p className="text-[#12c0e0] font-semibold mb-2">{product.brand}</p>
          <h1 className="text-3xl font-bold text-[#000000] mb-4">{product.name}</h1>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-[#12c0e0]">{formatCurrency(product.price)}</span>
            {product.compare_at_price && (
              <span className="text-lg text-gray-400 line-through">{formatCurrency(product.compare_at_price)}</span>
            )}
          </div>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="flex flex-col gap-3 mb-8">
            {[
              { icon: Truck, text: 'Frete ate o seu endereco' },
              { icon: Shield, text: 'Produto original e com garantia' },
              { icon: Clock, text: 'Entrega em ate 24h' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-600">
                <item.icon className="w-5 h-5 text-[#12c0e0]" />
                {item.text}
              </div>
            ))}
          </div>
          <ProductDetailClient product={product} whatsapp={whatsapp} />
        </div>
      </div>
    </main>
  );
}
