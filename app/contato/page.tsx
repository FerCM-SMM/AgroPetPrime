'use client';

import { useState } from 'react';
import { Footer } from '@/components/layout/footer';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5515996580804';
    const text = encodeURIComponent(
      `*MENSAGEM DE CONTATO - SITE AGROPET PR1ME*\n` +
      `========================\n` +
      `👤 *Nome:* ${formData.name}\n` +
      `📧 *Email:* ${formData.email}\n` +
      `📱 *Telefone:* ${formData.phone || 'Não informado'}\n` +
      `📌 *Assunto:* ${formData.subject || 'Dúvida geral'}\n` +
      `========================\n` +
      `💬 *Mensagem:*\n${formData.message}`
    );

    window.open(`https://wa.me/${whatsapp}?text=${text}`, '_blank', 'noopener,noreferrer');
    toast.success('Redirecionando sua mensagem para nossa equipe no WhatsApp!');
    setSending(false);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <>
      <main className="bg-[#FFFDF8] min-h-screen py-12 md:py-20 text-[#20241F]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#1C4E47] bg-[#E2EBE8] px-3.5 py-1 rounded-full mb-3">
              Fale com a AgroPet Pr1me
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#20241F]">
              Estamos prontos para atender você e seu melhor amigo.
            </h1>
            <p className="text-[#555C54] text-base sm:text-lg mt-3 font-normal leading-relaxed">
              Tire dúvidas sobre dosagens de antiparasitários, compatibilidade de rações ou agende a entrega do seu pedido em Sorocaba.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Form Section */}
            <div className="lg:col-span-7 bg-[#FAF7F2] border border-[#EBE3D5] rounded-3xl p-6 sm:p-10 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-[#20241F] mb-2">Envie uma Mensagem</h2>
              <p className="text-xs text-[#555C54] mb-6">
                Nossa equipe responde em minutos durante o horário comercial.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#20241F] mb-1.5 block">
                      Seu Nome *
                    </label>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 bg-white border border-[#D6CBB8] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#12C0E0] transition text-[#20241F]"
                      placeholder="Ex: Carlos Silva"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#20241F] mb-1.5 block">
                      WhatsApp com DDD *
                    </label>
                    <input
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 bg-white border border-[#D6CBB8] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#12C0E0] transition text-[#20241F]"
                      placeholder="(15) 99999-9999"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#20241F] mb-1.5 block">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 bg-white border border-[#D6CBB8] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#12C0E0] transition text-[#20241F]"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#20241F] mb-1.5 block">
                      Assunto
                    </label>
                    <input
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full p-3 bg-white border border-[#D6CBB8] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#12C0E0] transition text-[#20241F]"
                      placeholder="Dúvida sobre ração, entrega..."
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#20241F] mb-1.5 block">
                    Mensagem *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 bg-white border border-[#D6CBB8] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#12C0E0] transition text-[#20241F]"
                    placeholder="Como podemos te ajudar hoje?"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-[#12C0E0] hover:bg-[#0EA5E9] text-black font-extrabold text-sm py-3.5 rounded-full shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {sending ? 'Enviando...' : 'Enviar para o WhatsApp da Loja'}
                </Button>
              </form>
            </div>

            {/* Direct Contact Details Cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* WhatsApp Highlight Box */}
              <div className="bg-[#1C4E47] text-white rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#D8E934] text-[#1C4E47] flex items-center justify-center font-bold">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg">Atendimento Imediato</h3>
                    <p className="text-xs text-[#E2EBE8]">Canal direto com nossos especialistas</p>
                  </div>
                </div>
                <p className="text-sm text-[#E2EBE8] leading-relaxed mb-6">
                  Precisa de uma recomendação urgente de antiparasitário ou saber se temos um produto em estoque? Fale agora no WhatsApp:
                </p>
                <a
                  href="https://wa.me/5515996580804?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20produtos%20da%20AgroPet%20Pr1me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-[#12C0E0] text-black font-extrabold text-sm py-3 px-6 rounded-full hover:bg-[#0EA5E9] transition-all gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  (15) 99658-0804 • Conversar Agora
                </a>
              </div>

              {/* Physical Store & Hours Card */}
              <div className="bg-[#FAF7F2] border border-[#EBE3D5] rounded-3xl p-6 sm:p-8 shadow-sm space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#E2EBE8] text-[#1C4E47] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#20241F]">Endereço da Loja</h4>
                    <p className="text-[#555C54] mt-0.5 leading-snug">
                      Rua Antônio Silva Saladino, 878<br />
                      Parque Vitória Régia, Sorocaba - SP<br />
                      CEP: 18078-110
                    </p>
                    <a
                      href="https://maps.google.com/?q=Rua+Antônio+Silva+Saladino+878+Sorocaba"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#1C4E47] hover:underline mt-2"
                    >
                      Como chegar via Google Maps <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="border-t border-[#EBE3D5] pt-4 flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#E2EBE8] text-[#1C4E47] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#20241F]">Horário de Atendimento</h4>
                    <div className="text-xs text-[#555C54] space-y-1 mt-1">
                      <div className="flex justify-between gap-4">
                        <span>Segunda a Sexta:</span>
                        <span className="font-semibold text-[#20241F]">08:00 às 18:30</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Sábados:</span>
                        <span className="font-semibold text-[#20241F]">08:00 às 14:00</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Domingos e Feriados:</span>
                        <span className="text-[#555C54]">Plantão WhatsApp</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#EBE3D5] pt-4 flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#E2EBE8] text-[#1C4E47] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#20241F]">Email</h4>
                    <p className="text-[#555C54] mt-0.5">atendimento@agropetpr1me.com.br</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
