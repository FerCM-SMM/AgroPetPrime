import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://agropet-pr1me.com.br';
  const currentDate = new Date();

  const routes = [
    '',
    '/categorias',
    '/categorias/caes',
    '/categorias/gatos',
    '/categorias/passaros',
    '/categorias/agro',
    '/categorias/farmacia',
    '/categorias/conforto',
    '/quem-somos',
    '/contato',
    '/faq',
    '/blog',
    '/carrinho',
    '/termos-de-uso',
    '/politica-privacidade',
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' || route === '/categorias' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/categorias') ? 0.9 : 0.7,
  }));

  const productSlugs = [
    'racao-premier-formula-caes-adultos-15kg',
    'racao-royal-canin-gatos-castrados-7-5kg',
    'simparic-80mg-caes-20-a-40kg',
    'racao-equinos-alta-energia-25kg',
    'bravecto-caes-10-a-20kg',
    'caminha-donut-nuvem-ultra-macia',
  ];

  const productEntries: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${baseUrl}/produto/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 0.85,
  }));

  return [...staticEntries, ...productEntries];
}
