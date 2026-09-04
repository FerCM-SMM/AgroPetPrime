'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5515996580804';
  const message = encodeURIComponent('Olá! Gostaria de tirar uma dúvida sobre rações e produtos da AgroPet Prime.');

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
      {/* Tooltip Balão Amigável */}
      {isOpen && (
        <div className="mb-3 max-w-xs bg-white rounded-2xl shadow-xl border border-gray-100 p-4 animate-[fadeSlideUp_0.3s_ease-out_forwards]">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-extrabold text-[#20241F]">Atendimento WhatsApp</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-2 leading-relaxed">
            Dúvidas sobre rações, dosagem de remédios ou entrega na sua região? Chame nossa equipe agora!
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-white font-extrabold text-xs transition-all shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>Iniciar Conversa</span>
          </a>
        </div>
      )}

      {/* Botão Flutuante Discreto */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20b858] text-white shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 group"
        title="Fale conosco no WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white animate-pulse" />
        <MessageCircle className="w-6 h-6 fill-white" />
      </button>
    </div>
  );
}