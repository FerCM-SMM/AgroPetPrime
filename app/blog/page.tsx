import { Footer } from '@/components/layout/footer';

export default function BlogPage() {
  return (
    <>
            <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#000000] mb-8">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Como escolher a racao ideal para seu cao', desc: 'Dicas importantes para escolher a melhor racao para o seu pet.', date: 'Jan 2026' },
            { title: 'Cuidados essenciais com gatos adultos', desc: 'Informacoes sobre a saude e bem-estar do seu gato.', date: 'Jan 2026' },
            { title: 'Supplements para cavalos: quando usar?', desc: 'Guia completo sobre suplementacao equina.', date: 'Jan 2026' },
            { title: 'Saude de passarinhos: dicas basicas', desc: 'Cuidados essenciais para manter seu passaro saudavel.', date: 'Jan 2026' },
          ].map((post, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <p className="text-sm text-[#12c0e0] mb-2">{post.date}</p>
              <h3 className="text-lg font-semibold text-[#000000] mb-2">{post.title}</h3>
              <p className="text-gray-600">{post.desc}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
