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
  title: 'AgroPet Pr1me | Ração, Farmácia & Cuidados para seu Pet e Campo em Sorocaba',
  description:
    'Rações nobres super premium, farmácia veterinária especializada, acessórios, camas confortáveis e artigos para o campo com frete rápido e atendimento atencioso em Sorocaba e região.',
};

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FFFDF8]">
      <main className="w-full">
        {/* 1. Hero Section com Profundidade 3D & Pitbull Âncora */}
        <Hero />

        {/* 2. Barra Informativa de Vantagens */}
        <Ticker />

        {/* 3. Departamentos por Espécie & Finalidade */}
        <Categories />

        {/* 4. Destaques & Mais Vendidos com Troca Rápida de Embalagem */}
        <FeaturedProducts />

        {/* 5. Farmácia Veterinária Especializada */}
        <PharmacySection />

        {/* 6. Os 4 Pilares de Confiança AgroPet Pr1me */}
        <Stats />

        {/* 7. Histórias da Comunidade em Sorocaba */}
        <CommunityInstagram />

        {/* 8. Clube de Vantagens (10% OFF Primeira Compra) */}
        <ClubNewsletter />

        {/* 9. Localização & Venha nos Conhecer */}
        <StoreLocation />
      </main>

      {/* 10. Rodapé Oficial */}
      <Footer />
    </div>
  );
}