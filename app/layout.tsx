import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/components/layout/header';
import { CookieBanner } from '@/components/layout/cookie-banner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://agropet-pr1me.com.br'),
  title: {
    default: 'AgroPet Prime - O Destino Definitivo para seu Pet & Campo em Sorocaba',
    template: '%s | AgroPet Prime',
  },
  description: 'AgroPet Prime: pet shop e agropecuária completa em Sorocaba/SP. Rações super premium (Premier, Royal Canin), farmácia veterinária especializada (Simparic, Bravecto), linha agro e entrega expressa.',
  keywords: [
    'pet shop sorocaba',
    'ração premier sorocaba',
    'royal canin sorocaba',
    'agropecuária sorocaba',
    'simparic 80mg',
    'bravecto cães',
    'farmácia veterinária sorocaba',
    'ração cavalos sorocaba',
    'AgroPet Prime',
    'pet shop vitória régia sorocaba',
  ],
  authors: [{ name: 'AgroPet Prime' }],
  creator: 'AgroPet Prime',
  publisher: 'AgroPet Prime',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://agropet-pr1me.com.br',
    siteName: 'AgroPet Prime',
    title: 'AgroPet Prime - Nutrição & Farmácia Veterinária em Sorocaba',
    description: 'Tudo para o seu cão, gato, pássaro ou criação do campo com entrega expressa para Sorocaba e região e 5% de desconto no Pix.',
    images: [
      {
        url: '/images/hero-pitbull-grandona.jpg',
        width: 1200,
        height: 630,
        alt: 'AgroPet Prime Sorocaba - Nutrição Animal e Farmácia Veterinária',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgroPet Prime - Pet Shop & Agro Sorocaba',
    description: 'Rações super premium, farmácia veterinária e linha agro com entrega rápida em Sorocaba e região.',
    images: ['/images/hero-pitbull-grandona.jpg'],
    creator: '@agropetprime',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLdStore = {
  '@context': 'https://schema.org',
  '@type': ['PetStore', 'LocalBusiness'],
  name: 'AgroPet Prime',
  image: 'https://agropet-pr1me.com.br/images/hero-pitbull-grandona.jpg',
  '@id': 'https://agropet-pr1me.com.br/#store',
  url: 'https://agropet-pr1me.com.br',
  telephone: '+5515996580804',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua Antônio Silva Saladino, 878',
    addressLocality: 'Sorocaba',
    addressRegion: 'SP',
    postalCode: '18078-110',
    addressCountry: 'BR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -23.4503,
    longitude: -47.4589,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: '08:00',
      closes: '13:00',
    },
  ],
  paymentAccepted: 'Cash, Credit Card, Pix',
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Sorocaba e Região Metropolitana',
  },
};

const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AgroPet Prime',
  url: 'https://agropet-pr1me.com.br',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://agropet-pr1me.com.br/categorias?busca={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
        {/* Link to LLMs discoverability document */}
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM Context" />
        
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdStore) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#f8f9ff] text-[#0b1c30]">
        <Providers>
          <Header />
          {children}
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}