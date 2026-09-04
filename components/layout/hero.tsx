'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  ShieldCheck,
  Stethoscope,
  Zap,
  CheckCircle2,
  ArrowRight,
  Package,
} from 'lucide-react';
import { getStoredProducts, AdminProduct } from '@/lib/admin-store';

export function Hero() {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);

  // Estados de busca e autocomplete
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<AdminProduct[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [allProducts, setAllProducts] = useState<AdminProduct[]>([]);

  // Estados de Micro-interação 3D (Tilt) & Parallax
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detectar dispositivos touch para desabilitar tilt de mouse
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    setAllProducts(getStoredProducts());
  }, []);

  // Filtragem de autocomplete da busca em tempo real
  useEffect(() => {
    if (search.trim().length >= 2) {
      const term = search.toLowerCase();
      const matches = allProducts
        .filter(
          (p) =>
            p.name.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term)
        )
        .slice(0, 4);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [search, allProducts]);

  // Listener de mouse para o efeito Tilt 3D suave
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Rotação máxima de 5 graus
    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -5;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 5;

    setTilt({
      x: Math.max(-5, Math.min(5, rotateX)),
      y: Math.max(-5, Math.min(5, rotateY)),
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push('/categorias?busca=' + encodeURIComponent(search.trim()));
      setIsSearchFocused(false);
    }
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden bg-[#FFFDF8] min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-end pt-8 lg:pt-14 border-b border-[#8B5F3A]/10"
      style={{
        perspective: '1200px',
      }}
    >
      {/* CAMADA 1: FUNDO FIXO COM GRADIENTE SUTIL (Verde-Mata Suave -> Areia Quente) */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 75% 45%, rgba(53, 145, 161, 0.08) 0%, rgba(139, 95, 58, 0.06) 45%, rgba(255, 253, 248, 0.95) 100%)',
        }}
      />

      {/* CAMADA 2: ELEMENTO MÉDIO DE PROFUNDIDADE (Halo translúcido orgânico atrás do cachorro) */}
      <div
        className="absolute right-[5%] lg:right-[15%] top-1/4 w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] rounded-full bg-gradient-to-tr from-[#3591A1]/12 to-[#E06F12]/8 blur-3xl pointer-events-none z-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${tilt.y * -4}px, ${tilt.x * -4}px, 0)`,
        }}
      />

      {/* CONTAINER PRINCIPAL DA CENA */}
      <div className="relative max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 z-10 flex-1 flex items-end">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end w-full">

          {/* COLUNA ESQUERDA: TEXTO, BUSCA INTELIGENTE E PROPOSTA DE VALOR */}
          <div className="lg:col-span-6 flex flex-col justify-center items-start z-20 pb-10 sm:pb-14 lg:pb-16 max-w-xl animate-[fadeSlideUp_0.6s_ease-out_forwards]">
            {/* Eyebrow Pill com tom acolhedor (sem all-caps gritante) */}
            <div className="inline-flex items-center gap-2 bg-[#12c0e0]/15 text-[#00687B] text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4 border border-[#12c0e0]/30 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span>Nutrição &amp; cuidado selecionado para seu pet</span>
            </div>

            {/* Headline com tipografia serifada acolhedora */}
            <h1 className="text-3xl sm:text-4xl lg:text-[52px] font-serif font-black text-[#20241F] tracking-tight leading-[1.12] mb-4">
              O Melhor Cuidado <br />
              para seu Pet com a{' '}
              <span className="text-[#00829B] italic underline decoration-[#E06F12]/40 decoration-wavy decoration-2">
                Nutrição Ideal
              </span>
            </h1>

            {/* Sub-headline com tom amigável e regional */}
            <p className="text-sm sm:text-base text-[#20241F]/80 max-w-lg mb-8 leading-relaxed font-normal">
              Rações super premium selecionadas, farmácia veterinária especializada e artigos para o campo. Atendimento amigo de loja de bairro, com entrega rápida para Sorocaba e região.
            </p>

            {/* Campo de Busca Inteligente com Autocomplete em Tempo Real */}
            <div className="relative w-full max-w-md mb-8 z-30">
              <form
                onSubmit={handleSearchSubmit}
                className="w-full bg-white rounded-full p-1.5 sm:p-2 flex items-center shadow-lg border border-[#8B5F3A]/20 focus-within:border-[#12c0e0] focus-within:ring-2 focus-within:ring-[#12c0e0]/20 transition-all"
              >
                <div className="flex items-center pl-3 sm:pl-4 text-gray-400">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#12c0e0]" />
                </div>
                <input
                  type="text"
                  value={search}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Qual ração ou medicamento seu pet precisa?"
                  className="w-full bg-transparent px-3 text-xs sm:text-sm text-[#20241F] placeholder:text-gray-400 outline-hidden font-medium"
                />
                <button
                  type="submit"
                  className="bg-[#20241F] hover:bg-[#3591A1] text-white text-xs sm:text-sm font-extrabold px-6 sm:px-8 py-3 rounded-full transition-all shrink-0 shadow-md hover:scale-[1.02] active:scale-[0.98]"
                >
                  Buscar
                </button>
              </form>

              {/* Dropdown de Sugestões de Autocomplete em Tempo Real */}
              {isSearchFocused && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 p-2 space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1 block">
                    Produtos Sugeridos:
                  </span>
                  {suggestions.map((item) => (
                    <Link
                      key={item.id}
                      href={`/categorias?busca=${encodeURIComponent(item.name)}`}
                      onClick={() => setIsSearchFocused(false)}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#20241F] line-clamp-1 group-hover:text-[#00829B]">
                            {item.name}
                          </p>
                          <span className="text-[10px] font-semibold text-gray-400">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-black text-[#20241F] whitespace-nowrap ml-2">
                        R$ {item.price.toFixed(2)}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 3 Badges de Confiança com Ícones Lucide Confiáveis (Sem Material Symbols) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-md text-xs font-bold text-[#20241F]">
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-[#8B5F3A]/15 shadow-xs transition-transform hover:scale-[1.02]">
                <ShieldCheck className="w-4 h-4 text-[#10b981] shrink-0" />
                <span>100% Originais</span>
              </div>
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-[#8B5F3A]/15 shadow-xs transition-transform hover:scale-[1.02]">
                <Stethoscope className="w-4 h-4 text-[#00829B] shrink-0" />
                <span>Apoio Vet</span>
              </div>
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-[#8B5F3A]/15 shadow-xs transition-transform hover:scale-[1.02]">
                <Zap className="w-4 h-4 text-[#E06F12] shrink-0" />
                <span>Entrega Expressa</span>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: CENA 3D DO PITBULL COM ANCORAGEM, PROFUNDIDADE E EFEITO TILT */}
          <div className="lg:col-span-6 relative flex items-end justify-center w-full h-[400px] sm:h-[500px] lg:h-[640px] xl:h-[700px] z-10 overflow-visible">
            
            {/* CONTAINER COM EFEITO TILT 3D NO MOUSE */}
            <div
              className="relative w-full h-full max-w-[520px] sm:max-w-[600px] lg:max-w-[680px] flex items-end justify-center transition-transform duration-200 ease-out"
              style={{
                transform: !isTouchDevice
                  ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                  : 'none',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Sombra de Contato Realista sob as patas no chão */}
              <div className="absolute bottom-0 w-64 sm:w-80 lg:w-96 h-8 bg-black/20 blur-xl rounded-[100%] mx-auto z-10 pointer-events-none" />
              <div className="absolute bottom-1 w-48 sm:w-60 lg:w-72 h-4 bg-black/35 blur-md rounded-[100%] mx-auto z-10 pointer-events-none" />

              {/* Imagem do Pitbull Monumental com base ancorada e sangria superior */}
              <div className="relative w-full h-full flex items-end justify-center z-20 animate-[heroZoomIn_0.7s_ease-out_0.2s_forwards]">
                <Image
                  src="/images/hero-pitbull-tight.png"
                  alt="Pitbull AgroPet Prime - O melhor amigo do seu pet e da sua fazenda"
                  priority
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 680px"
                  className="object-contain object-bottom drop-shadow-2xl select-none pointer-events-none"
                />
              </div>

              {/* BADGES FLUTUANTES COM PARALLAX INVERSO (Sensação de profundidade tridimensional) */}
              
              {/* Badge 1: Qualidade Comprovada (Superior Esquerdo) */}
              <div
                className="hidden sm:flex absolute top-12 lg:top-20 -left-4 lg:-left-6 z-30 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl border border-white/80 items-center gap-2.5 transition-transform duration-200 ease-out animate-[fadeSlideUp_0.6s_ease-out_0.35s_forwards]"
                style={{
                  transform: !isTouchDevice
                    ? `translate3d(${tilt.y * -2.5}px, ${tilt.x * -2.5}px, 20px)`
                    : 'none',
                }}
              >
                <div className="w-8 h-8 rounded-xl bg-[#12c0e0]/15 text-[#00829B] flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider leading-none">
                    Garantia Total
                  </span>
                  <span className="text-xs font-black text-[#20241F]">
                    Alimentos 100% Originais
                  </span>
                </div>
              </div>

              {/* Badge 2: Entrega Rápida & Pronta Entrega (Meio Direito) */}
              <div
                className="hidden sm:flex absolute bottom-28 lg:bottom-36 -right-2 lg:-right-4 z-30 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl border border-white/80 items-center gap-2.5 transition-transform duration-200 ease-out animate-[fadeSlideUp_0.6s_ease-out_0.45s_forwards]"
                style={{
                  transform: !isTouchDevice
                    ? `translate3d(${tilt.y * -3}px, ${tilt.x * -3}px, 30px)`
                    : 'none',
                }}
              >
                <div className="w-8 h-8 rounded-xl bg-[#E06F12]/15 text-[#E06F12] flex items-center justify-center font-bold">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider leading-none">
                    Atendimento Sorocaba
                  </span>
                  <span className="text-xs font-black text-[#20241F]">
                    Pronta Entrega no Dia
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}