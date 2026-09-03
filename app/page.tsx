import { CTA } from '@/components/layout/cta';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/layout/hero';
import { PromoBanner } from '@/components/layout/promo-banner';
import { Stats } from '@/components/layout/stats';
import { Categories } from '@/components/products/categories';
import { FeaturedProducts } from '@/components/products/featured-products';

export const metadata = {
  title: 'AgroPet Pr1me | O Melhor para o seu Pet e Campo',
  description:
    'Rações super premium, farmácia veterinária especializada, acessórios, camas confortáveis e artigos para o campo com frete rápido e atendimento atencioso.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <Hero />
      <Stats />
      <Categories />
      <FeaturedProducts />
      <PromoBanner />
      <CTA />
      <Footer />
    </main>
  );
}
