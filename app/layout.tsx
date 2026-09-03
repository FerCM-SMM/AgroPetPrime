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
  title: {
    default: 'AgroPet Prime - O Destino Definitivo para seu Pet & Campo',
    template: '%s | AgroPet Prime',
  },
  description: 'AgroPet Prime: pet shop e agropecuária completa em Sorocaba. Rações super premium, farmácia veterinária, acessórios e linha para o campo.',
  keywords: ['pet shop sorocaba', 'ração premier sorocaba', 'agropecuária', 'simparic', 'bravecto', 'medicamentos veterinários', 'AgroPet Prime'],
  authors: [{ name: 'AgroPet Prime' }],
  creator: 'AgroPet Prime',
  publisher: 'AgroPet Prime',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://agropet-pr1me.com.br',
    siteName: 'AgroPet Prime',
    title: 'AgroPet Prime - O Destino Definitivo para seu Pet & Campo',
    description: 'Rações, medicamentos, acessórios e suprimentos para cães, gatos, pássaros e equinos em Sorocaba.',
    images: ['/images/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgroPet Prime',
    description: 'Tudo para o seu pet e campo com entrega rápida em Sorocaba e região.',
    images: ['/images/og-image.png'],
    creator: '@agropetprime',
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