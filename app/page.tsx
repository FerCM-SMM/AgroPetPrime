import { Hero } from '@/components/layout/hero';
import { Ticker } from '@/components/layout/ticker';
import { Categories } from '@/components/products/categories';
import { FeaturedProducts } from '@/components/products/featured-products';
import { PharmacySection } from '@/components/layout/pharmacy-section';
import { Stats } from '@/components/layout/stats';
import { CommunityInstagram } from '@/components/layout/community-instagram';
import { ClubNewsletter } from '@/components/layout/club-newsletter';
import { StoreLocation } from '@/components/layout/store-location';
import { Footer } from '@/components/layout/footer';

export const metadata = {
  title: 'AgroPet Prime | O Destino Definitivo para seu Pet & Campo',
  description:
    'Rações super premium, farmácia veterinária especializada, acessórios, camas confortáveis e artigos para o campo com frete rápido e atendimento atencioso em Sorocaba e região.',
};

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f8f9ff]">
      <main className="w-full">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Quick Announcement Ticker */}
        <Ticker />

        {/* 3. Categories by Species & Care */}
        <Categories />

        {/* 4. Destaques & Mais Vendidos */}
        <FeaturedProducts />

        {/* 5. Farmácia Veterinária & Saúde */}
        <PharmacySection />

        {/* 6. Confiança & Diferenciais (4 Pilares) */}
        <Stats />

        {/* 7. Instagram & Comunidade Local */}
        <CommunityInstagram />

        {/* 8. Clube de Benefícios Prime (10% OFF) */}
        <ClubNewsletter />

        {/* 9. Localização & Venha nos Visitar */}
        <StoreLocation />
      </main>

      {/* 10. Rodapé Oficial */}
      <Footer />
    </div>
  );
}