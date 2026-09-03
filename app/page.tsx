import { Hero } from '@/components/layout/hero';
import { Categories } from '@/components/products/categories';
import { FeaturedProducts } from '@/components/products/featured-products';
import { Stats } from '@/components/layout/stats';
import { Footer } from '@/components/layout/footer';
import { CTA } from '@/components/layout/cta';

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Categories />
      <FeaturedProducts />
      <CTA />
      <Footer />
    </main>
  );
}
