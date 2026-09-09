import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import { Truck, ShieldCheck, Clock, CheckCircle2, Award, HeartHandshake } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { getProductBySlugServer, getSettingsServer } from '@/lib/supabase/queries';
import { ProductDetailClient } from '@/components/products/product-detail-client';
import { notFound } from 'next/navigation';
import Link from 'next/link';

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

  const discountPercent = product.compare_at_price && product.compare_at_price > product.price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : null;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Breadcrumbs */}
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5 font-medium">
        <Link href="/" className="hover:text-[#1C4E47]">Início</Link>
        <span>/</span>
        <Link href="/categorias" className="hover:text-[#1C4E47]">Produtos</Link>
        <span>/</span>
        <span className="text-[#20241F] font-bold line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Coluna Esquerda: Showcase Fotográfico do Produto */}
        <div className="lg:col-span-6 bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 border border-[#8B5F3A]/15 shadow-xs flex flex-col items-center justify-center relative overflow-hidden">
          {discountPercent && (
            <span className="absolute top-5 left-5 bg-[#E06F12] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
              -{discountPercent}% OFF
            </span>
          )}
          
          <div className="relative w-full aspect-square max-w-[420px] mx-auto">
            {product.image_urls?.[0] ? (
              <Image
                src={product.image_urls[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 420px"
                className="object-contain p-4 drop-shadow-md hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 text-xs font-bold">
                Sem Imagem
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center gap-4 text-xs font-semibold text-[#1C4E47]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#10b981]" />
              Origem 100% Certificada
            </span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#D8E934] fill-[#1C4E47]" />
              Super Premium
            </span>
          </div>
        </div>

        {/* Coluna Direita: Informações, Nutrição e Ação */}
        <div className="lg:col-span-6 flex flex-col justify-start">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#1C4E47] uppercase tracking-wider mb-2">
            <span>{product.brand || 'AgroPet Pr1me'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#20241F] mb-4 leading-tight">
            {product.name}
          </h1>

          {/* Preço & Condições */}
          <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#8B5F3A]/15 mb-6">
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-3xl sm:text-4xl font-black text-[#20241F]">
                {formatCurrency(product.price)}
              </span>
              {product.compare_at_price && (
                <span className="text-base text-gray-400 line-through">
                  {formatCurrency(product.compare_at_price)}
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md">
                Pix com 5% de desconto
              </span>
              <span className="text-xs font-bold text-[#1C4E47] bg-[#1C4E47]/10 px-2.5 py-1 rounded-md">
                🎁 5% de cashback nesta compra
              </span>
            </div>
          </div>

          {/* Descrição Detalhada */}
          <div className="mb-8">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Sobre a Fórmula &amp; Indicação
            </h2>
            <p className="text-sm text-[#20241F]/80 leading-relaxed font-normal">
              {product.description || 'Produto de nutrição nobre e selecionada para promover vitalidade, pelagem brilhante e máxima digestibilidade.'}
            </p>
          </div>

          {/* 3 Benefícios de Compra Segura */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-[#8B5F3A]/15 text-xs text-[#20241F]">
              <Truck className="w-4 h-4 text-[#1C4E47] shrink-0" />
              <span>Entrega rápida em Sorocaba</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-[#8B5F3A]/15 text-xs text-[#20241F]">
              <Clock className="w-4 h-4 text-[#E06F12] shrink-0" />
              <span>Despacho em até 24h</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-[#8B5F3A]/15 text-xs text-[#20241F]">
              <HeartHandshake className="w-4 h-4 text-[#10b981] shrink-0" />
              <span>Apoio veterinário</span>
            </div>
          </div>

          {/* Ações de Conversão */}
          <ProductDetailClient product={product} whatsapp={whatsapp} />
        </div>
      </div>
    </main>
  );
}
