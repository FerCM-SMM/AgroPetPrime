'use client';

import { useState } from 'react';
import { Hero } from '@/components/layout/hero';
import { DepartmentsSection } from '@/components/home/departments-section';
import { FeaturedProductsSection } from '@/components/home/featured-products-section';
import { PharmacySection } from '@/components/home/pharmacy-section';
import { DifferentialsSection } from '@/components/home/differentials-section';
import { CommunitySection } from '@/components/home/community-section';
import { ClubSection } from '@/components/home/club-section';
import { HomeFaqSection } from '@/components/home/home-faq-section';
import { StoreLocationSection } from '@/components/home/store-location-section';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  const [activeAudience, setActiveAudience] = useState<'pet' | 'agro'>('pet');

  return (
    <div className="flex flex-col w-full min-h-screen bg-white text-black">
      <main className="w-full">
        {/* 1. Hero Full-Screen com Ken Burns, Busca, Badges e Toggle Switch */}
        <Hero
          activeAudience={activeAudience}
          onAudienceChange={setActiveAudience}
        />

        {/* 2. Departamentos & Espécies (Reativo ao Toggle) */}
        <DepartmentsSection activeAudience={activeAudience} />

        {/* 3. Produtos em Destaque (Tabs, Preços, Reativo ao Toggle) */}
        <FeaturedProductsSection activeAudience={activeAudience} />

        {/* 4. Farmácia Veterinária Especializada & Envio de Receita */}
        <PharmacySection />

        {/* 5. Diferenciais (4 Pilares AgroPet) */}
        <DifferentialsSection />

        {/* 6. Comunidade @agropetprime.sorocaba & Histórias de Clientes */}
        <CommunitySection />

        {/* 7. Clube de Vantagens (10% OFF na 1ª compra) */}
        <ClubSection />

        {/* 8. Perguntas Frequentes (FAQ) */}
        <HomeFaqSection />

        {/* 9. Nossa Loja em Sorocaba & Mapa Interativo */}
        <StoreLocationSection />
      </main>

      {/* 10. Rodapé Oficial */}
      <Footer />
    </div>
  );
}