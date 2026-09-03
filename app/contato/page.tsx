import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#000000] mb-8">Contato</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-[#000000] mb-6">Fale Conosco</h2>
            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nome</label>
                <input className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Seu nome" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input type="email" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="seu@email.com" />
              </div>
              <div>
                <label className="text-sm font-medium">Mensagem</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-lg" rows={5} placeholder="Sua mensagem..." />
              </div>
              <Button className="bg-[#12c0e0] text-black hover:bg-[#0ea5e9]">Enviar Mensagem</Button>
            </form>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-[#12c0e0] mt-1" />
              <div>
                <h3 className="font-semibold text-[#000000]">Telefone</h3>
                <p className="text-gray-600">(11) 99999-9999</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-[#12c0e0] mt-1" />
              <div>
                <h3 className="font-semibold text-[#000000]">WhatsApp</h3>
                <p className="text-gray-600">(11) 99999-9999</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-[#12c0e0] mt-1" />
              <div>
                <h3 className="font-semibold text-[#000000]">Email</h3>
                <p className="text-gray-600">contato@agropetpr1me.com.br</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-[#12c0e0] mt-1" />
              <div>
                <h3 className="font-semibold text-[#000000]">Endereco</h3>
                <p className="text-gray-600">Endereco da loja, Cidade - Estado</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-[#12c0e0] mt-1" />
              <div>
                <h3 className="font-semibold text-[#000000]">Horario de Atendimento</h3>
                <p className="text-gray-600">Seg a Sex: 08h as 18h</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
