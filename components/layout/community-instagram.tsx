'use client';

import Image from 'next/image';
import { ExternalLink, Heart } from 'lucide-react';

function InstagramIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function CommunityInstagram() {
  const stories = [
    {
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjhSypO24VZxLy_ujJRQX4Z30qxDb6l4InUO0XGUWJIAhjptPhqXUEb_2RBXIkfrl68co3YHJ7MDqNrTCt2g00EIN_3OxBIhGFrIui6Ar1mOc3WCb3ZaB9-0SssfliC_h9zt2d5W56n4ZgX2YWajGNiiOcQ5J_RBhsrMANr1Lz6IAfMmt1F-KpxMjHD5_F1ZVUbbk_fCetn_epQ-HMDfKy09wo5fJYn4WOsLB1qJ7y5--cPdbPf7G0',
      tag: 'Cães da Região',
      title: 'Thor na loja física',
      desc: 'Visita semanal para garantir ração super premium e um bom papo no balcão.',
    },
    {
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD__CHH-H4lFHIugcJPRwope9LtpH1vOC0az3bl0P8OAMHAk9-1zaRON2QgjCNF2KSp32KIJ4IXL8NeB7lymLVH3onrcvjD_ZchEy_f_cc73TK07P2NOlL2ymju4kZ5jKQW8VXtcNGX_TRzNs-4JQOAnDIgCfhlyvCXd6M2ZFxxTpDNnnsETrA-b8aSf39NpqX5g9F_PC1tHnFc-JNHHemS96G0EgNdhSTfdWHOUeNJmAuKMywU5tPM',
      tag: 'Cuidado Felino',
      title: 'Mel em casa',
      desc: 'Conforto e areia mineral de alta absorção recomendada pela nossa equipe.',
    },
    {
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_zNatf_ZJdCR9q_HSI8iCY_4mZ_zisWFMzsjPi2--hX1Cu6BQPWO5cEOfp302-pguskckUiKHpld2EDiEq9Jwi2iHeR3ws1rZmj6m65ty2SbLwuZB8JGzgbqb2jvcuYPurRpHin3qRoFk6i4bhQ89_GBf4Cn-jkrTW24GDYNowB42uvDjlp33xbO6SrmLsM2f4BjC_4CZI8e7CMEXorDTgO1zBmL0xlWTnGybdcQ6-dEvYRxIGAxL',
      tag: 'Equinos & Haras',
      title: 'Haras Boa Vista',
      desc: 'Nutrição pesada e sal mineral entregues com cuidado direto na cocheira.',
    },
    {
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDr51H6I-J1KOMsRQW-gNi5Np22f9_pBQI8fxc9gRfH_FonTDWYwwTGnye-ebcH_pP5yWS4vmpeVkxQM-As9KKOo4Wxowf9bvK3PJPx7c9rS8J7j5YYtJ7f4YE9rUErAk89E9umX1aG7goRKQiLhCmouM7Ximc5efWWr-oisbr0W4xpXeC_YeF7JmcnByAFpk_ElGcn7ExdKBEVZR2XL1w3WKcUapMgNTyCsY1-4Y2L71wkeO6hRwSB',
      tag: 'Entrega Expressa',
      title: 'Chácara Recanto Verde',
      desc: 'Sacarias de 15kg e 20kg descarregadas no mesmo dia em Sorocaba.',
    },
  ];

  return (
    <section className="w-full py-16 bg-[#FBF9F4] border-b border-[#8B5F3A]/10 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md shrink-0">
              <InstagramIcon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#12c0e0] block mb-0.5">
                Comunidade @agropetprime.sorocaba
              </span>
              <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#20241F]">
                De chácaras a lares urbanos: histórias de quem confia
              </h3>
            </div>
          </div>

          <a
            href="https://instagram.com/agropetprime.sorocaba"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#20241F] hover:bg-[#12c0e0] text-white hover:text-[#20241F] text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-xs hover-lift shrink-0"
          >
            <span>Ver fotos no Instagram</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Storytelling Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stories.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl overflow-hidden border border-[#8B5F3A]/15 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#20241F]/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-1 rounded-md">
                  {item.tag}
                </div>
                <div className="absolute inset-0 bg-[#20241F]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                    <Heart className="w-5 h-5 fill-white text-white" />
                  </div>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h4 className="font-bold text-sm text-[#20241F] mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-[#20241F]/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}