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
    <aside aria-label="Aviso Institucional" className="bg-gradient-to-r from-[#0B192C] via-[#1E3E62] to-[#0B192C] text-slate-200 border-b border-[#D4AF37]/30 px-4 py-2.5 text-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <Heart className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <p className="font-normal text-slate-200 leading-tight">
            <strong className="text-[#D4AF37] font-semibold">Princípio Fundamental: </strong>
            "A BIBLIA ON é gratuita para todos. As contribuições são voluntárias e ajudam a manter a tecnologia necessária para disponibilizar este projeto ao mundo. Doar é opcional. Estudar é sempre gratuito."
          </p>
        </div>
        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={onOpenDonations}
            className="text-[11px] underline text-[#D4AF37] hover:text-white font-medium transition-colors"
          >
            Saber mais
          </button>
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
