import { Footer } from '@/components/layout/footer';

export default function AboutPage() {
  return (
    <>
            <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#000000] mb-8">Quem Somos</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-4">
            A AgroPet Pr1me e o pet shop que cuida do seu pet com o mesmo amor que voce cuida dele.
          </p>
          <p className="text-gray-600 mb-4">
            Trabalhamos com as melhores marcas do mercado: Pedigree, Whiskas, B-line, GranNature, Golden, Premier, BioCare, SoftDog Select, SoftCat Select, Magnus, SpecialDog e SUPRA PRO CAVALO.
          </p>
          <p className="text-gray-600 mb-4">
            Nosso compromisso e oferecer produtos de qualidade para caes, gatos, passarinhos e cavalos, sempre com o melhor atendimento.
          </p>
          <h2 className="text-2xl font-bold text-[#000000] mt-8 mb-4">Nossa Missao</h2>
          <p className="text-gray-600">
            Proporcionar aos pets todo o cuidado que merecem, com produtos premium e um atendimento excepcional.
          </p>
          <h2 className="text-2xl font-bold text-[#000000] mt-8 mb-4">Por que nos escolher?</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Produtos originais e de qualidade</li>
            <li>Precos competitivos</li>
            <li>Atendimento especializado</li>
            <li>Pedido facil pelo site, entrega pelo WhatsApp</li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
