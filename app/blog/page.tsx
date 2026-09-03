import Link from 'next/link';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { Footer } from '@/components/layout/footer';

export const metadata = {
  title: 'Blog & Dicas Veterinárias | AgroPet Pr1me',
  description: 'Artigos, guias de nutrição e cuidados com a saúde de cães, gatos, equinos e pássaros.',
};

export default function BlogPage() {
  const posts = [
    {
      slug: 'como-escolher-a-racao-ideal-para-seu-cao',
      title: 'Como escolher a ração ideal para seu cão',
      desc: 'Dicas essenciais para avaliar ingredientes, níveis de proteína e necessidades por porte e idade.',
      date: '02 de Setembro de 2026',
      tag: 'Nutrição Canina',
    },
    {
      slug: 'cuidados-essenciais-com-gatos-adultos',
      title: 'Cuidados essenciais com gatos adultos',
      desc: 'Informações sobre hidratação, controle de bolas de pelo, estímulos físicos e saúde renal.',
      date: '28 de Agosto de 2026',
      tag: 'Saúde Felina',
    },
    {
      slug: 'suplementos-para-cavalos-quando-usar',
      title: 'Suplementos para equinos: quando e como usar?',
      desc: 'Guia completo sobre suplementação mineral e vitamínica para cavalos de esporte e trabalho.',
      date: '15 de Agosto de 2026',
      tag: 'Linha Agro & Campo',
    },
    {
      slug: 'saude-de-passarinhos-dicas-basicas',
      title: 'Saúde de pássaros e aves: cuidados essenciais',
      desc: 'Higiene de viveiros, sementes nobres e prevenção de problemas respiratórios em aves.',
      date: '05 de Agosto de 2026',
      tag: 'Aves & Pássaros',
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Blog Header */}
      <div className="bg-white border-b border-[#ede8dc] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-[#12c0e0]/15 text-[#0284c7] text-xs font-extrabold px-3 py-1 rounded-full mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>BLOG AGROPET PR1ME</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Dicas Veterinárias & Cuidados com seu Pet
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl">
            Artigos escritos e revisados para garantir a melhor nutrição, saúde e felicidade para animais domésticos e do campo.
          </p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-3xl p-6 border border-[#ede8dc] shadow-xs hover-lift transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="bg-[#faf8f5] text-[#0284c7] border border-[#ede8dc] text-[11px] font-bold px-3 py-1 rounded-full">
                    {post.tag}
                  </span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#111827] group-hover:text-[#0284c7] transition-colors leading-snug mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {post.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#f4f0e8] flex items-center justify-between text-xs font-bold text-[#0284c7] group-hover:text-[#0369a1]">
                <span>Ler Artigo Completo</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}