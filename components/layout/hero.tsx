'use client';

import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#ebebea] min-h-[580px] lg:min-h-[640px] flex items-center py-12">
      {/* Subtle Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0 opacity-15">
        <span className="text-[#0B0F17] text-[120px] md:text-[200px] lg:text-[280px] font-extrabold tracking-tighter leading-none whitespace-nowrap transform -translate-y-6 md:-translate-y-10">
          pet prime
        </span>
      </div>

      {/* Dog Hero Image positioned centrally */}
      <div className="absolute inset-0 flex justify-center items-end pointer-events-none z-10">
        <div className="relative h-[80%] sm:h-[88%] md:h-[94%] max-h-[620px] w-full max-w-xl transform lg:translate-x-6">
          <Image
            src="https://lh3.googleusercontent.com/aida/AEtjO1VZG7VfjwYNU3t0CsgXFZbHpgcDVy0yBM556UxfNDax_H4-aogah_niOElZffQuQZz3T9te0f_uRewV3Aco6f4hS7EVZISJO5LC0Zn47EVr_kBNlInDznyHA7yyMfo4CnTZTUdtMdFqJ2fOZQvfrl5JrpoggXJEEerhh3PwuZ1gSE93Tl1EqQoe-1m53heWT4Jyf2hqQsYlGvmIPafKwA0S2SUrx9l3sVuEbhBMrlOoJho2d0BW7lZGCw"
            alt="Pitbull nobre e amigável vestindo moletom com capuz"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-contain object-bottom"
          />
        </div>
      </div>

      {/* Foreground Container with 3-column balanced grid */}
      <div className="relative z-20 max-w-[1280px] w-full mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center min-h-[480px]">
          {/* Left Column: Editorial & CTA Block */}
          <div className="lg:col-span-5 flex flex-col items-start pt-4 lg:pt-0 max-w-lg">
            {/* Big Hero Headline styled with crisp contrast */}
            <h1 className="text-[#0B0F17] tracking-tight leading-[1.1] mb-6 text-[34px] sm:text-[44px] lg:text-[50px] font-extrabold">
              O Destino Definitivo <br />
              <span className="text-gray-600 font-medium">para seu Pet &amp; Campo</span>
            </h1>

            {/* Pill CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Link
                href="#destaques"
                className="inline-flex items-center justify-center bg-[#12C0E0] hover:bg-[#00A8C7] text-black text-sm px-7 py-3 rounded-full shadow-md hover:shadow-lg transition-all font-extrabold hover-lift active-press"
              >
                <span>Conheça as Ofertas</span>
              </Link>
              <Link
                href="/categorias"
                className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-[#0B0F17] text-sm px-7 py-3 rounded-full shadow-xs hover:shadow-md transition-all border border-gray-200 font-bold hover-lift active-press"
              >
                <span>Todos os Produtos</span>
              </Link>
            </div>

            {/* Reassurance Badges Pill */}
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0B0F17]/85 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-xs">
              <span className="material-symbols-outlined text-[#10B981] text-[18px]">check_circle</span>
              <span>100% Produtos Originais • Entrega Rápida em Sorocaba</span>
            </div>
          </div>

          {/* Center Spacer reserved for dog visual */}
          <div className="hidden lg:block lg:col-span-3 pointer-events-none"></div>

          {/* Right Column: Clean Floating Product Cards */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-4 justify-end items-end mt-6 lg:mt-0">
            {/* Floating Card 1: Premier Formula 15kg */}
            <div className="bg-white rounded-3xl p-4 shadow-xl w-44 md:w-52 backdrop-blur-md transform transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover-lift">
              <div className="relative w-full aspect-square bg-[#f6f6f6] rounded-2xl flex items-center justify-center p-2 mb-2 overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLjV5W5nC3XQkXwwsJ-zzHFDaLwjYLTA3ssLwdXzElv8_P7lHBDs1L-QhUTr5zi_5OwUmPNgYJY0H52HdccZq6zVIB4RfvOZ0kgpsAsuHQo5a693llZYG_zeQAK6uoqobber8rtXLZdo3HJOGY9GNxuhzY9rTXVziGzsBk8mA-hliNviiGhab6U6qTifNtPGWVcfDmoCWYegn1Da1SyoixARlehvRhkHTi9mVV0yyr3TsuFYMHe-7Q"
                  alt="Premier Formula 15kg"
                  fill
                  sizes="200px"
                  className="object-contain p-2"
                />
              </div>
              <div className="flex items-center gap-0.5 text-[#D97706] mb-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                    star
                  </span>
                ))}
              </div>
              <span className="text-[13px] text-[#0B0F17] font-bold line-clamp-1 block">
                Premier Formula 15kg
              </span>
              <span className="text-[16px] text-[#00687b] font-extrabold">
                R$ 237,70
              </span>
            </div>

            {/* Floating Card 2: Simparic 80mg Cães */}
            <div className="bg-white rounded-3xl p-4 shadow-xl w-44 md:w-52 backdrop-blur-md transform transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover-lift">
              <div className="relative w-full aspect-square bg-[#f6f6f6] rounded-2xl flex items-center justify-center p-2 mb-2 overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2RTizwlF1mzVgaRF1qk68KmR2VEOQ-WXa1EqTJnJbxHTVnhyPfjucaPx03Wb8iMYh_Hd13I6My3WkGxl2AQxjnPuzjJDqqm4ZAnDTiBRj9QDDYH85CNmGcRAtHGN3k-tTVwrItbU98jOlK7yCcgBsjWzIgLmqqC7fvZlpsaGN6Pd-q5tj3ILni7MqVWNy6v4N8QYby3jRMMwZORCiyKkQWBtRJ513BZxkLApP9DdgKX--UHwoeV9b"
                  alt="Simparic 80mg Cães"
                  fill
                  sizes="200px"
                  className="object-contain p-2"
                />
              </div>
              <div className="flex items-center gap-0.5 text-[#D97706] mb-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                    star
                  </span>
                ))}
              </div>
              <span className="text-[13px] text-[#0B0F17] font-bold line-clamp-1 block">
                Simparic 80mg Cães
              </span>
              <span className="text-[16px] text-[#00687b] font-extrabold">
                R$ 119,90
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}