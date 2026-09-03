import Image from 'next/image';

export function PharmacySection() {
  return (
    <section className="w-full py-16 bg-[#f8f9ff]" id="farmacia">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="bg-[#0B0F17] rounded-[36px] p-6 sm:p-10 lg:p-14 text-white relative overflow-hidden shadow-2xl">
          {/* Ambient decorative cyan glow */}
          <div className="absolute -right-16 -bottom-16 w-96 h-96 bg-[#00c0e3]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full mb-4">
                <span className="material-symbols-outlined text-[#00c0e3] text-[18px]">health_and_safety</span>
                <span className="text-xs text-[#00c0e3] font-extrabold uppercase tracking-wider">
                  Farmácia &amp; Cuidados Críticos
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
                Cuide da saúde com quem entende. Farmácia completa com orientação segura.
              </h2>

              <p className="text-sm text-gray-300 mb-8 leading-relaxed">
                Trabalhamos exclusivamente com laboratórios credenciados (Zoetis, MSD, Elanco, Bravet, Ourofino). Medicamentos refrigerados mantidos em temperatura estritamente monitorada.
              </p>

              {/* 4 Pillar Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="material-symbols-outlined text-[#00c0e3] text-[24px] mb-1">pest_control</span>
                  <h5 className="font-extrabold text-white text-sm mb-0.5">Antiparasitários</h5>
                  <p className="text-xs text-gray-400">Pipetas, coleiras e mastigáveis palatáveis.</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="material-symbols-outlined text-[#D97706] text-[24px] mb-1">vital_signs</span>
                  <h5 className="font-extrabold text-white text-sm mb-0.5">Suplementos &amp; Ômegas</h5>
                  <p className="text-xs text-gray-400">Fortalecimento imunológico e sênior.</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="material-symbols-outlined text-[#10B981] text-[24px] mb-1">clean_hands</span>
                  <h5 className="font-extrabold text-white text-sm mb-0.5">Dermatológicos</h5>
                  <p className="text-xs text-gray-400">Shampoos terapêuticos e sprays calmantes.</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="material-symbols-outlined text-[#EF4444] text-[24px] mb-1">cardiology</span>
                  <h5 className="font-extrabold text-white text-sm mb-0.5">Articulações &amp; Dor</h5>
                  <p className="text-xs text-gray-400">Condroitina, glicosamina e anti-inflamatórios.</p>
                </div>
              </div>

              {/* WhatsApp Prescription Box */}
              <div className="w-full bg-[#00c0e3]/10 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#00c0e3]/20">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#00c0e3] text-[28px] shrink-0">receipt_long</span>
                  <div>
                    <span className="text-xs text-white font-extrabold block">
                      Tem receita do médico veterinário?
                    </span>
                    <span className="text-[11px] text-gray-300">
                      Envie a foto no WhatsApp para cotação em minutos!
                    </span>
                  </div>
                </div>
                <a
                  href="https://wa.me/5515996580804?text=Ol%C3%A1,%20gostaria%20de%20cotar%20uma%20receita%20veterin%C3%A1ria."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#00c0e3] hover:bg-[#00A8C7] text-[#0B0F17] text-xs font-extrabold px-5 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 shrink-0 hover-lift active-press"
                >
                  <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                  <span>Enviar Receita</span>
                </a>
              </div>
            </div>

            {/* Right Visual Showcase */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZFhCnfP9DOts5hDIntnCaqzgJ6FYSkLl1wCzYMnaAO6hFjFT-HekzwUHE9zqdQqTPqBcj00ilsf5dvl7Eiq3NprY_jFDRF4jO5oipDcnecWTvqJ5R5Y3Rk2xg8WoPfW-J_S89gcVGEu0WJfClWx92_V1cAOCcN8pMIXCILpXLQMxEE20F6eFqVxjaAJD2TLPLUBO_bNemBP94AAKMxC6ai7bt6Vts-6eh5cMY8ozvsfJ9z6d4sKuc"
                  alt="Médico veterinário examinando cãozinho saudável"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-extrabold text-[#00c0e3] uppercase tracking-wider block">
                    Unidade Física Sorocaba
                  </span>
                  <p className="text-xs text-gray-200 mt-0.5 leading-snug">
                    Armazenamento adequado de vacinas com controle contínuo de temperatura 24h.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}