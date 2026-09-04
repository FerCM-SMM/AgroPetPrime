import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/components/layout/header';
import { CookieBanner } from '@/components/layout/cookie-banner';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { BottomNav } from '@/components/layout/bottom-nav';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://agropet-pr1me.com.br'),
  title: {
    default: 'AgroPet Prime - O Destino Definitivo para seu Pet & Campo em Sorocaba',
    template: '%s | AgroPet Prime',
  },
  description:
    'AgroPet Prime: pet shop e agropecuária acolhedora em Sorocaba/SP. Rações super premium (Premier, Royal Canin), farmácia veterinária especializada (Simparic, Bravecto), linha agro/campo e entrega expressa.',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${fraunces.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen font-sans bg-[#FFFDF8] text-[#20241F] antialiased selection:bg-[#12c0e0]/20 selection:text-[#00829B] pb-16 lg:pb-0">
        <Providers>
          <Header />
          {children}
          <FloatingWhatsApp />
          <BottomNav />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}