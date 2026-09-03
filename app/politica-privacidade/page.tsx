import { Footer } from '@/components/layout/footer';

export default function PrivacyPolicy() {
  return (
    <>
            <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#000000] mb-8">Politica de Privacidade</h1>
        <div className="prose max-w-none text-gray-600 space-y-4">
          <p><strong>1. Coleta de Dados</strong> - Coletamos informacoes como nome, email, telefone e endereco quando voce cria uma conta ou faz um pedido.</p>
          <p><strong>2. Uso de Dados</strong> - Utilizamos seus dados para processar pedidos, melhorar nossos servicos e enviar comunicacoes sobre produtos.</p>
          <p><strong>3. Compartilhamento</strong> - Nao compartilhamos suas informacoes com terceiros, exceto quando necessario para processar seu pedido.</p>
          <p><strong>4. Armazenamento</strong> - Seus dados sao armazenados de forma segura por periodo necessario para as finalidades descritas nesta politica.</p>
          <p><strong>5. Seus Direitos</strong> - Voce pode solicitar acesso, correcao ou exclusao dos seus dados a qualquer momento.</p>
          <p><strong>6. Cookies</strong> - Utilizamos cookies para melhorar sua experiencia no site. Voce pode desativar cookies nas configuracoes do seu navegador.</p>
          <p><strong>7. Menores de Idade</strong> - Nosso site e dirigido a maiores de 18 anos.</p>
          <p><strong>8. Contato</strong> - Para duvidas sobre esta politica, entre em contato: contato@agropetpr1me.com.br</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
