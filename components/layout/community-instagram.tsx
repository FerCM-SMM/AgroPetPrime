import Image from 'next/image';

export function CommunityInstagram() {
  const feed = [
    {
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjhSypO24VZxLy_ujJRQX4Z30qxDb6l4InUO0XGUWJIAhjptPhqXUEb_2RBXIkfrl68co3YHJ7MDqNrTCt2g00EIN_3OxBIhGFrIui6Ar1mOc3WCb3ZaB9-0SssfliC_h9zt2d5W56n4ZgX2YWajGNiiOcQ5J_RBhsrMANr1Lz6IAfMmt1F-KpxMjHD5_F1ZVUbbk_fCetn_epQ-HMDfKy09wo5fJYn4WOsLB1qJ7y5--cPdbPf7G0',
      alt: 'Cliente com Golden Retriever na loja AgroPet Prime Sorocaba',
    },
    {
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD__CHH-H4lFHIugcJPRwope9LtpH1vOC0az3bl0P8OAMHAk9-1zaRON2QgjCNF2KSp32KIJ4IXL8NeB7lymLVH3onrcvjD_ZchEy_f_cc73TK07P2NOlL2ymju4kZ5jKQW8VXtcNGX_TRzNs-4JQOAnDIgCfhlyvCXd6M2ZFxxTpDNnnsETrA-b8aSf39NpqX5g9F_PC1tHnFc-JNHHemS96G0EgNdhSTfdWHOUeNJmAuKMywU5tPM',
      alt: 'Gato Persa descansando em caminha confortável',
    },
    {
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_zNatf_ZJdCR9q_HSI8iCY_4mZ_zisWFMzsjPi2--hX1Cu6BQPWO5cEOfp302-pguskckUiKHpld2EDiEq9Jwi2iHeR3ws1rZmj6m65ty2SbLwuZB8JGzgbqb2jvcuYPurRpHin3qRoFk6i4bhQ89_GBf4Cn-jkrTW24GDYNowB42uvDjlp33xbO6SrmLsM2f4BjC_4CZI8e7CMEXorDTgO1zBmL0xlWTnGybdcQ6-dEvYRxIGAxL',
      alt: 'Cavalo Quarto de Milha bem cuidado na fazenda',
    },
    {
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDr51H6I-J1KOMsRQW-gNi5Np22f9_pBQI8fxc9gRfH_FonTDWYwwTGnye-ebcH_pP5yWS4vmpeVkxQM-As9KKOo4Wxowf9bvK3PJPx7c9rS8J7j5YYtJ7f4YE9rUErAk89E9umX1aG7goRKQiLhCmouM7Ximc5efWWr-oisbr0W4xpXeC_YeF7JmcnByAFpk_ElGcn7ExdKBEVZR2XL1w3WKcUapMgNTyCsY1-4Y2L71wkeO6hRwSB',
      alt: 'Entrega rápida de rações em Sorocaba',
    },
  ];

  return (
    <section className="w-full py-16 bg-[#eff4ff] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md shrink-0">
              <span className="material-symbols-outlined text-[28px]">photo_camera</span>
            </div>
            <div>
              <span className="text-xs font-extrabold text-[#00687b] uppercase tracking-wider block">
                Comunidade @agropetprime.sorocaba
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B0F17]">
                Junte-se a mais de 10 mil tutores e produtores
              </h3>
            </div>
          </div>

          <a
            href="https://instagram.com/agropetprime.sorocaba"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0B0F17] hover:bg-gray-800 text-white text-xs font-extrabold px-6 py-3 rounded-full transition-all hover-lift active-press shrink-0"
          >
            <span>Seguir no Instagram</span>
            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
          </a>
        </div>

        {/* Feed Collage (4 images) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {feed.map((item, idx) => (
            <div
              key={idx}
              className="relative aspect-square rounded-2xl overflow-hidden group shadow-xs border border-gray-200"
            >
              <Image
                src={item.img}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 300px"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#0B0F17]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[32px] text-white">favorite</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}