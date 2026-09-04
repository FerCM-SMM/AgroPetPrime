'use client';

import Image from 'next/image';
import { MapPin, Navigation, Phone, Clock, Store } from 'lucide-react';

export function StoreLocation() {
  return (
    <section className="w-full py-16 bg-[#FBF9F4] border-t border-[#8B5F3A]/10" id="nossa-loja">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Address card */}
          <div className="lg:col-span-5 flex flex-col gap-4 bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-[#8B5F3A]/15">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#12c0e0]/15 flex items-center justify-center text-[#12c0e0] shrink-0">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-[#12c0e0] block">
                  Atendimento de Prosa &amp; Confiança
                </span>
                <h4 className="font-serif font-bold text-xl sm:text-2xl text-[#20241F]">
                  Nossa Loja em Sorocaba
                </h4>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-xs sm:text-sm text-[#20241F]/80">
              <p className="font-bold text-[#20241F] text-sm sm:text-base flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E06F12] shrink-0" />
                Rua Antônio Silva Saladino, 878
              </p>
              <p className="pl-6 text-gray-600">Parque Vitória Régia — Sorocaba / SP</p>
              <p className="pl-6 text-xs text-gray-500 mt-1">
                Estacionamento amplo e facilitado na porta para carregamento de sacarias pesadas e produtos de chácara.
              </p>
              <p className="pl-6 text-xs text-emerald-700 font-medium flex items-center gap-1.5 mt-1">
                <Clock className="w-3.5 h-3.5" />
                Segunda a Sábado: 08:00 às 19:00
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-100">
              <a
                href="https://maps.google.com/?q=Rua+Antonio+Silva+Saladino+878+Sorocaba"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#12c0e0]/15 hover:bg-[#12c0e0]/25 text-[#20241F] text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
              >
                <Navigation className="w-4 h-4 text-[#12c0e0]" />
                <span>Como Chegar (GPS)</span>
              </a>
              <a
                href="tel:15996580804"
                className="inline-flex items-center gap-2 text-[#E06F12] text-xs font-bold hover:underline py-2.5"
              >
                <Phone className="w-4 h-4" />
                <span>(15) 9 9658-0804</span>
              </a>
            </div>
          </div>

          {/* Map Image Container */}
          <div className="lg:col-span-7">
            <div className="relative w-full h-72 sm:h-80 rounded-3xl shadow-sm overflow-hidden border border-[#8B5F3A]/20">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD341rC2x7H500TgWPGCkGTpXbUguT2qrEzEZfPbjVkguM7sMbhI-N8KEEWnPa3NQIkqSG8u4HK1VxuCmxSZOc6kSs4989doY5v6BACevpi8QfTLpQPzh6TKZWDysMw0_4YP5y-07LPKDKwM3tzT6-3VoarHboGtSsXOyNW1z2H6dTbD8PJIZ1oNmPBS4hwf_M4vxi6wiQqlI1OhP0QTShMvnSKcIzo4LcoyjSmv5t9Trz1iZ2_cbsv"
                alt="Mapa da AgroPet Prime Sorocaba"
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 text-[#20241F] text-xs font-bold border border-gray-100">
                <MapPin className="w-4 h-4 text-[#12c0e0]" />
                <span>AgroPet Prime • Sorocaba - SP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}