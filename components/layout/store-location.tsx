import Image from 'next/image';

export function StoreLocation() {
  return (
    <section className="w-full py-16 bg-[#eff4ff]" id="nossa-loja">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Address card */}
          <div className="lg:col-span-5 flex flex-col gap-4 bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#00c0e3]/20 flex items-center justify-center text-[#00687b] shrink-0">
                <span className="material-symbols-outlined text-[28px]">pin_drop</span>
              </div>
              <div>
                <span className="text-xs font-extrabold text-[#00687b] uppercase tracking-wider block">
                  Venha nos Visitar
                </span>
                <h4 className="font-extrabold text-xl text-[#0B0F17]">
                  Nossa Loja em Sorocaba
                </h4>
              </div>
            </div>

            <div className="flex flex-col gap-1 text-xs sm:text-sm text-gray-600">
              <p className="font-extrabold text-[#0B0F17] text-sm sm:text-base">
                Rua Antônio Silva Saladino, 878
              </p>
              <p>Parque Vitória Régia — Sorocaba / SP</p>
              <p className="text-gray-400 text-xs mt-1">
                Estacionamento facilitado na porta para carregamento de sacarias pesadas.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://maps.google.com/?q=Rua+Antônio+Silva+Saladino+878+Sorocaba"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0B0F17] text-xs font-extrabold px-4 py-2.5 rounded-xl transition-colors hover-lift"
              >
                <span className="material-symbols-outlined text-[18px]">directions</span>
                <span>Como Chegar (GPS)</span>
              </a>
              <a
                href="tel:15996580804"
                className="inline-flex items-center gap-2 text-[#10B981] text-xs font-extrabold hover:underline py-2.5"
              >
                <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
                <span>Ligar (15) 9 9658.0804</span>
              </a>
            </div>
          </div>

          {/* Map Image Container */}
          <div className="lg:col-span-7">
            <div className="relative w-full h-72 rounded-3xl shadow-xs overflow-hidden border border-gray-200">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD341rC2x7H500TgWPGCkGTpXbUguT2qrEzEZfPbjVkguM7sMbhI-N8KEEWnPa3NQIkqSG8u4HK1VxuCmxSZOc6kSs4989doY5v6BACevpi8QfTLpQPzh6TKZWDysMw0_4YP5y-07LPKDKwM3tzT6-3VoarHboGtSsXOyNW1z2H6dTbD8PJIZ1oNmPBS4hwf_M4vxi6wiQqlI1OhP0QTShMvnSKcIzo4LcoyjSmv5t9Trz1iZ2_cbsv"
                alt="Mapa da AgroPet Prime Sorocaba"
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-md flex items-center gap-2 text-[#0B0F17] text-xs font-extrabold">
                <span className="material-symbols-outlined text-[#00687b] text-[18px]">location_on</span>
                <span>AgroPet Prime • Sorocaba - SP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}