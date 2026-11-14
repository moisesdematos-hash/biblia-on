// src/components/layout/InstitutionalBanner.tsx
import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';

interface Props {
  onOpenDonations: () => void;
}

export const InstitutionalBanner: React.FC<Props> = ({ onOpenDonations }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside aria-label="Aviso Institucional" className="bg-gradient-to-r from-[#0B192C] via-[#1E3E62] to-[#0B192C] text-slate-200 border-b border-[#D4AF37]/30 px-3 sm:px-4 py-2 text-xs overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
        <div className="flex items-center space-x-2 min-w-0 flex-1">
          <Heart className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <p className="font-normal text-slate-200 leading-tight text-[11px] sm:text-xs">
            <span className="hidden sm:inline">
              <strong className="text-[#D4AF37] font-semibold">Princípio Fundamental: </strong>
              "A BIBLIA ON é gratuita para todos. As contribuições são voluntárias e ajudam a manter o projeto. Doar é opcional. Estudar é sempre gratuito."
            </span>
            <span className="sm:hidden truncate block">
              <strong className="text-[#D4AF37]">100% Gratuito:</strong> Estudo bíblico livre e sem anúncios.
            </span>
          </p>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40 select-none">
            Apoio: BREVEMENTE
          </span>
          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
            title="Fechar aviso"
            aria-label="Fechar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
