import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/components/layout/header';
import { CookieBanner } from '@/components/layout/cookie-banner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'AgroPet Pr1me - Tudo para o seu pet, com o melhor atendimento',
    template: '%s | AgroPet Pr1me',
  },
  description: 'AgroPet Pr1me e o pet shop completo para caes, gatos, passarinhos e cavalos. Racoes, medicamentos, acessorios e muito mais. Compre pelo site e receba pelo WhatsApp.',
  keywords: ['pet shop', 'racoes para caes', 'racoes para gatos', 'acessorios para pets', 'medicamentos veterinarios', 'AgroPet Pr1me', 'pet shop online'],
  authors: [{ name: 'AgroPet Pr1me' }],
  creator: 'AgroPet Pr1me',
  publisher: 'AgroPet Pr1me',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://agropet-pr1me.com.br',
    siteName: 'AgroPet Pr1me',
    title: 'AgroPet Pr1me - Tudo para o seu pet',
    description: 'Racoess, medicamentos, acessorios e equipamentos para caes, gatos, passarinhos e cavalos.',
    images: ['/images/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgroPet Pr1me',
    description: 'Tudo para o seu pet, com o melhor atendimento.',
    images: ['/images/og-image.png'],
    creator: '@agropetpr1me',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <Header />
          {children}
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
