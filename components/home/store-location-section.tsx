'use client';

import { MapPin, Clock, Phone, Navigation, ExternalLink, MessageCircle } from 'lucide-react';

export function StoreLocationSection() {
  return (
    <section id="loja" className="py-20 bg-[#FAF7F2] text-black">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Informações da Loja */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block text-xs font-black uppercase tracking-widest text-[#20BEE2] bg-black text-white px-4 py-1.5 rounded-full">
              Visite Nossa Loja Física
            </span>

            <h2 className="font-['Archivo_Black',sans-serif] text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-black leading-tight">
              Nossa Loja em Sorocaba
            </h2>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
              Estacionamento amplo e facilitado na porta para carregamento rápido de sacarias pesadas, medicamentos e produtos para chácaras e haras.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-neutral-200 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-black text-[#20BEE2] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-black">Endereço Completo</h4>
                  <p className="text-xs text-gray-600 mt-0.5 leading-snug">
                    Rua Antônio Silva Saladino, 878 — Parque Vitória Régia, Sorocaba/SP
                    <br />
                    CEP: 18078-110
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-neutral-200 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-black text-[#20BEE2] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-black">Horário de Funcionamento</h4>
                  <p className="text-xs text-gray-600 mt-0.5 leading-snug">
                    Segunda a Sábado, das 08:00 às 19:00
                    <br />
                    <span className="text-[#0090A8] font-bold">Plantão emergencial via WhatsApp aos domingos</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-neutral-200 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-black text-[#20BEE2] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-black">Telefone &amp; WhatsApp Oficial</h4>
                  <a
                    href="https://wa.me/5515996580804"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-black text-[#0090A8] hover:underline mt-0.5 block"
                  >
                    (15) 9 9658-0804 • Clique para iniciar conversa
                  </a>
                </div>
              </div>
            </div>

            {/* Ações de Navegação e Contato */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="https://maps.google.com/?q=Rua+Antônio+Silva+Saladino+878+Sorocaba"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black hover:bg-neutral-800 text-white font-black text-xs px-6 py-3.5 rounded-full shadow-md transition-all hover:scale-105"
              >
                <Navigation className="w-4 h-4 text-[#20BEE2]" />
                <span>Como Chegar (GPS)</span>
              </a>

              <a
                href="https://wa.me/5515996580804"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#20BEE2] hover:bg-[#51FFE6] text-black font-black text-xs px-6 py-3.5 rounded-full shadow-md transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>Falar no WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Mapa Embutido Interativo */}
          <div className="lg:col-span-6">
            <div className="w-full h-[420px] rounded-3xl overflow-hidden border border-neutral-300 shadow-xl bg-neutral-200 relative">
              <iframe
                title="Localização AgroPet Pr1me Sorocaba"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.8661623912953!2d-47.4720935!3d-23.4652233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf5f9227f67b57%3A0x89e02c914bf679e9!2sR.%20Ant%C3%B4nio%20Silva%20Saladino%2C%20878%20-%20Parque%20Vitoria%20Regia%2C%20Sorocaba%20-%20SP%2C%2018078-110!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              <div className="absolute bottom-3 left-3 bg-black/90 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl backdrop-blur-xs border border-white/20">
                📍 Estacionamento próprio gratuito na porta
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
