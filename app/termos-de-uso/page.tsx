import { Footer } from '@/components/layout/footer';

export default function TermsPage() {
  return (
    <>
            <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#000000] mb-8">Termos de Uso</h1>
        <div className="prose max-w-none text-gray-600 space-y-4">
          <p><strong>1. Aceitacao dos Termos</strong> - Ao acessar nosso site, voce concorda com estes termos de uso.</p>
          <p><strong>2. Uso do Site</strong> - O site e fornecido para fins informativos e de compra de produtos. Voce concorda em usar o site de forma legal.</p>
          <p><strong>3. Propriedade Intelectual</strong> - Todo o conteudo do site e de nossa propriedade.</p>
          <p><strong>4. Producao de Pedidos</strong> - Os pedidos sao processados via WhatsApp. A confirmacao do pedido esta sujeita a verificacao.</p>
          <p><strong>5. Precos</strong> - Todos os precos estao em BRL e podem ser alterados sem aviso previo.</p>
          <p><strong>6. Limitacao de Responsabilidade</strong> - Nao seremos responsaveis por danos indiretos ou incidentais.</p>
          <p><strong>7. Modificacoes</strong> - Nos reservamos o direito de modificar estes termos a qualquer momento.</p>
          <p><strong>8. Lei Aplicavel</strong> - Estes termos regidos pelas leis do Brasil.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
