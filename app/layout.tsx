import type { Metadata } from 'next';
import { Poppins, Archivo_Black } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/components/layout/header';
import { CookieBanner } from '@/components/layout/cookie-banner';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { BottomNav } from '@/components/layout/bottom-nav';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://agropet-pr1me.com.br'),
  title: {
    default: 'AgroPet Pr1me - O Destino Definitivo para seu Pet & Campo em Sorocaba',
    template: '%s | AgroPet Pr1me',
  },
  description:
    'AgroPet Pr1me: pet shop e agropecuária acolhedora em Sorocaba/SP. Rações super premium (Premier, Royal Canin), farmácia veterinária especializada (Simparic, Bravecto), linha agro/campo e entrega expressa.',
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
  authors: [{ name: 'AgroPet Pr1me' }],
  creator: 'AgroPet Pr1me',
  publisher: 'AgroPet Pr1me',
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
    <html lang="pt-BR" className={`${poppins.variable} ${archivoBlack.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen font-sans bg-[#FFFFFF] text-[#000000] antialiased selection:bg-[#20BEE2]/30 selection:text-[#000000] pb-16 lg:pb-0">
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