import { Footer } from '@/components/layout/footer';

export default function CookiesPage() {
  return (
    <>
            <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#000000] mb-8">Politica de Cookies</h1>
        <div className="prose max-w-none text-gray-600 space-y-4">
          <p>Utilizamos cookies para melhorar sua experiencia no nosso site. Ao continuar navegando, voce concorda com nossa politica de cookies.</p>
          <p><strong>Cookies Necessarios</strong> - Essenciais para o funcionamento do site, incluindo carrinho e autenticacao.</p>
          <p><strong>Cookies de Analytics</strong> - Ajudam-nos a entender como os visitantes interagem com o site.</p>
          <p><strong>Cookies de Marketing</strong> - Usados para personalizar anuncios e acompanhar campanhas.</p>
          <p>Pode gerir as preferencias de cookies nas configuracoes do seu navegador.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
