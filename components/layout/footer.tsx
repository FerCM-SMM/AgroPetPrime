import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#000000] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              AgroPet{' '}
              <span className="text-[#12c0e0]">Pr1me</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Tudo para o seu pet, com o melhor atendimento. Racacoes, medicamentos, acessorios e equipamentos para caes, gatos, passarinhos e cavalos.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-[#12c0e0]">
                <span className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#12c0e0]">
                <span className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#12c0e0]">
                <span className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Categorias</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/categorias/racoes" className="hover:text-[#12c0e0] transition-colors">Racoes</Link></li>
              <li><Link href="/categorias/medicamentos" className="hover:text-[#12c0e0] transition-colors">Medicamentos</Link></li>
              <li><Link href="/categorias/acessorios" className="hover:text-[#12c0e0] transition-colors">Acessorios</Link></li>
              <li><Link href="/categorias/equipamentos" className="hover:text-[#12c0e0] transition-colors">Equipamentos</Link></li>
              <li><Link href="/categorias/higiene" className="hover:text-[#12c0e0] transition-colors">Higiene</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Atendimento</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/contato" className="hover:text-[#12c0e0] transition-colors">Contato</Link></li>
              <li><Link href="/quem-somos" className="hover:text-[#12c0e0] transition-colors">Quem Somos</Link></li>
              <li><a href="https://wa.me/5515996580804" className="hover:text-[#12c0e0] transition-colors" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><Link href="/blog" className="hover:text-[#12c0e0] transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contato</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#12c0e0]" />
                <span>(15) 99658-0804</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#12c0e0]" />
                <span>contato@agropetpr1me.com.br</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#12c0e0]" />
                <span>Endereco da loja</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2026 AgroPet Pr1me. Todos os direitos reservados.</p>
          <p className="mt-1">
            <Link href="/termos-de-uso" className="hover:text-[#12c0e0]">Termos de Uso</Link>
            {' | '}
            <Link href="/politica-privacidade" className="hover:text-[#12c0e0]">Politica de Privacidade</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
