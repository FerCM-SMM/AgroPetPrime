import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import Link from 'next/link';

export function CTA() {
  return (
    <section className="bg-[#12c0e0] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
          Tem duvidas ou quer fazer um pedido?
        </h2>
        <p className="text-xl text-gray-700 mb-8">
          Fale com a gente pelo WhatsApp. Estamos a disposicao para ajudar!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-black text-[#12c0e0] hover:bg-gray-800">
            <a href="https://wa.me/5515996580804" target="_blank" rel="noopener noreferrer">
              <Phone className="w-5 h-5 mr-2" />
              Falar no WhatsApp
            </a>
          </Button>
          <Button size="lg" variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white">
            <Link href="/contato">Fale Conosco</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
