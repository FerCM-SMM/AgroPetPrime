import Link from 'next/link';
import { Phone, MessageCircle, HeartHandshake } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTA() {
  return (
    <section className="py-16 bg-[#faf8f5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#111827] to-[#1f2937] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-800 text-center relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#12c0e0]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-[#12c0e0] mb-4">
            <HeartHandshake className="w-4 h-4" />
            <span>ATENDIMENTO CONSULTIVO & VETERINÁRIO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 max-w-2xl mx-auto">
            Dúvidas sobre a ração ideal ou receita de medicamento?
          </h2>

          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Nossa equipe especializada te ajuda a escolher o produto certo para a idade, porte e necessidades especiais do seu animal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/5515996580804"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#12c0e0] hover:bg-[#0ea5e9] text-black font-extrabold text-sm px-8 py-6 rounded-full shadow-md hover-lift active-press flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-black text-black" />
                <span>CHAMAR NO WHATSAPP</span>
              </Button>
            </a>

            <Link href="/contato" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-gray-600 text-white hover:bg-white hover:text-black font-semibold text-sm px-8 py-6 rounded-full hover-lift active-press"
              >
                <span>Enviar Mensagem</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
