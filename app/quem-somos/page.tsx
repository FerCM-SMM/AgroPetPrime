import Link from 'next/link';
import Image from 'next/image';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Heart, Award, MapPin, Truck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <main className="bg-[#FFFDF8] min-h-screen text-[#20241F]">
        {/* Hero Editorial */}
        <section className="relative py-16 md:py-24 border-b border-[#EBE3D5] overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#1C4E47] bg-[#E2EBE8] px-3.5 py-1 rounded-full mb-4">
                Origem & Compromisso • Sorocaba / SP
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#20241F] leading-[1.1] mb-6">
                Nutrição de excelência e cuidado autêntico para quem faz parte da família.
              </h1>
              <p className="text-lg md:text-xl text-[#555C54] leading-relaxed font-normal">
                Na AgroPet Pr1me, acreditamos que animais saudáveis e vigorosos começam com uma alimentação biologicamente nobre, medicamentos com procedência rigorosa e a dedicação de quem realmente ama pets.
              </p>
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#FAF7F2] to-transparent pointer-events-none hidden lg:block" />
        </section>

        {/* Narrative Section with Cards */}
        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <div className="space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1C4E47]">Nossa Trajetória</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#20241F] tracking-tight leading-snug">
                  De uma loja de bairro ao centro de referência em nutrição e saúde pet em Sorocaba.
                </h2>
                <p className="text-[#555C54] text-base leading-relaxed">
                  Localizada no Parque Vitória Régia em Sorocaba, a AgroPet Pr1me nasceu com a missão de elevar os padrões de cuidado animal na região. Mais do que vender produtos, nós acompanhamos o desenvolvimento e o bem-estar de cada cão, gato, ave e animal do campo.
                </p>
                <p className="text-[#555C54] text-base leading-relaxed">
                  Trabalhamos em parceria direta com os maiores fabricantes veterinários e nutricionais do país, assegurando 100% de procedência, armazenamento em temperatura ideal e lotes com garantia de fábrica.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#1C4E47]">
                  <div className="flex items-center gap-2 bg-[#FAF7F2] border border-[#EBE3D5] px-3.5 py-2 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-[#1C4E47]" />
                    <span>Lotes com rastreabilidade</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#FAF7F2] border border-[#EBE3D5] px-3.5 py-2 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-[#1C4E47]" />
                    <span>Entrega rápida no mesmo dia</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#FAF7F2] border border-[#EBE3D5] px-3.5 py-2 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-[#1C4E47]" />
                    <span>Atendimento por especialistas</span>
                  </div>
                </div>
              </div>

              {/* Local Physical Store Highlight */}
              <div className="bg-[#FAF7F2] border border-[#EBE3D5] rounded-3xl p-8 sm:p-10 relative shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-[#1C4E47] text-white flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#20241F]">Nossa Loja Física</h3>
                    <p className="text-xs text-[#555C54]">Venha nos visitar ou retire seu pedido</p>
                  </div>
                </div>

                <p className="text-sm text-[#555C54] leading-relaxed mb-6">
                  Estamos de portas abertas na <strong>Rua Antônio Silva Saladino, 878 - Parque Vitória Régia, Sorocaba - SP</strong>. Nossa equipe está sempre pronta para auxiliar na escolha da melhor ração para a raça, idade e necessidades clínicas do seu companheiro.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#EBE3D5] text-center">
                  <div className="p-4 bg-white/80 rounded-2xl border border-[#EBE3D5]">
                    <span className="font-serif text-3xl font-bold text-[#1C4E47] block">+2.500</span>
                    <span className="text-xs text-[#555C54] mt-1 block">Itens a pronta entrega</span>
                  </div>
                  <div className="p-4 bg-white/80 rounded-2xl border border-[#EBE3D5]">
                    <span className="font-serif text-3xl font-bold text-[#1C4E47] block">4.9 ★</span>
                    <span className="text-xs text-[#555C54] mt-1 block">Avaliação dos clientes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Pillars */}
            <div className="pt-8 border-t border-[#EBE3D5]">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1C4E47]">Pilares AgroPet</span>
                <h2 className="font-serif text-3xl font-bold text-[#20241F] tracking-tight mt-2">
                  Por que milhares de tutores confiam na AgroPet Pr1me
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#FAF7F2] border border-[#EBE3D5] rounded-3xl p-6 sm:p-8 hover:border-[#1C4E47]/40 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-[#E2EBE8] text-[#1C4E47] flex items-center justify-center mb-5">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#20241F] mb-2">Marcas Consagradas</h3>
                  <p className="text-sm text-[#555C54] leading-relaxed">
                    Trabalhamos exclusivamente com marcas que realizam rigoroso controle bromatológico: Premier Pet, Royal Canin, GranNature, Golden, Special Dog, Magnus e SUPRA.
                  </p>
                </div>

                <div className="bg-[#FAF7F2] border border-[#EBE3D5] rounded-3xl p-6 sm:p-8 hover:border-[#1C4E47]/40 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-[#E2EBE8] text-[#1C4E47] flex items-center justify-center mb-5">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#20241F] mb-2">Farmácia Veterinária Segura</h3>
                  <p className="text-sm text-[#555C54] leading-relaxed">
                    Antiparasitários líderes (Simparic, Bravecto, NexGard) e dermocosméticos armazenados com climatização adequada para preservar 100% da eficácia farmacológica.
                  </p>
                </div>

                <div className="bg-[#FAF7F2] border border-[#EBE3D5] rounded-3xl p-6 sm:p-8 hover:border-[#1C4E47]/40 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-[#E2EBE8] text-[#1C4E47] flex items-center justify-center mb-5">
                    <Truck className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#20241F] mb-2">Logística Local Ágil</h3>
                  <p className="text-sm text-[#555C54] leading-relaxed">
                    Fim do desespero quando a ração acaba: entregamos rapidamente na sua porta em Sorocaba, com frete grátis em compras acima de R$ 150.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Call to Action */}
            <div className="mt-16 bg-[#1C4E47] text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
              <div className="max-w-2xl mx-auto relative z-10 space-y-6">
                <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
                  Pronto para oferecer o melhor para seu companheiro?
                </h3>
                <p className="text-[#E2EBE8] text-base leading-relaxed">
                  Conheça nossa seleção criteriosa de produtos ou fale com nossa equipe especializada no WhatsApp.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                  <Link href="/categorias/racoes">
                    <Button className="bg-[#12C0E0] text-black hover:bg-[#0EA5E9] font-bold px-8 py-3 rounded-full text-sm">
                      Explorar Produtos
                    </Button>
                  </Link>
                  <Link href="/contato">
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold px-8 py-3 rounded-full text-sm">
                      Falar com a Equipe
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
