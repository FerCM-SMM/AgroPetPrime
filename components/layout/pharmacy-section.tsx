import Image from 'next/image';
import {
  ShieldCheck,
  Bug,
  Activity,
  Sparkles,
  Heart,
  FileText,
  Camera,
  MessageCircle,
} from 'lucide-react';

export function PharmacySection() {
  return (
    <section className="w-full py-16 sm:py-20 bg-[#FFFDF8]" id="farmacia">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#20241F] rounded-[36px] p-6 sm:p-10 lg:p-14 text-white relative overflow-hidden shadow-2xl border border-[#8B5F3A]/20">
          {/* Ambient decorative subtle glow */}
          <div className="absolute -right-16 -bottom-16 w-96 h-96 bg-[#12c0e0]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full mb-4 border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#12c0e0]" />
                <span className="text-xs text-[#12c0e0] font-semibold">
                  Farmácia &amp; Cuidados Veterinários
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mb-4 leading-tight">
                Cuide da saúde com quem entende. Farmácia completa com orientação segura.
              </h2>

              <p className="text-sm text-gray-300 mb-8 leading-relaxed">
                Trabalhamos exclusivamente com laboratórios credenciados (Zoetis, MSD, Elanco, Bravet, Ourofino). Medicamentos e antipulgas mantidos em armazenamento estritamente monitorado.
              </p>

              {/* 4 Pillar Badges com Lucide Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#12c0e0]/15 text-[#12c0e0] shrink-0">
                    <Bug className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-white text-sm mb-0.5">Antiparasitários</h5>
                    <p className="text-xs text-gray-400">Pipetas, coleiras e mastigáveis palatáveis.</p>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#E06F12]/15 text-[#E06F12] shrink-0">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-white text-sm mb-0.5">Suplementos &amp; Ômegas</h5>
                    <p className="text-xs text-gray-400">Fortalecimento imunológico e suporte sênior.</p>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#10b981]/15 text-[#10b981] shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-white text-sm mb-0.5">Dermatológicos</h5>
                    <p className="text-xs text-gray-400">Shampoos terapêuticos e sprays calmantes.</p>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-rose-500/15 text-rose-400 shrink-0">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-white text-sm mb-0.5">Articulações &amp; Dor</h5>
                    <p className="text-xs text-gray-400">Condroitina, glicosamina e anti-inflamatórios.</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Prescription Box */}
              <div className="w-full bg-[#12c0e0]/10 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#12c0e0]/20">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#12c0e0]/20 text-[#12c0e0]">
                    <FileText className="w-6 h-6" />
                  </div>
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
                  className="bg-[#12c0e0] hover:bg-[#00ADC9] text-[#20241F] text-xs font-extrabold px-5 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 shrink-0 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Camera className="w-4 h-4" />
                  <span>Enviar Receita</span>
                </a>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full h-[320px] sm:h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=800&auto=format&fit=crop"
                  alt="Farmácia Veterinária AgroPet Prime"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#20241F] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-white/40 text-[#20241F]">
                  <p className="text-xs font-extrabold font-serif">
                    Atendimento Farmacêutico &amp; Veterinário
                  </p>
                  <p className="text-[11px] text-gray-600">
                    Acompanhamento de dosagens e linhas pediátricas e geriátricas para cães, gatos e equinos.
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