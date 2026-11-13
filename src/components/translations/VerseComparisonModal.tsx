// src/components/translations/VerseComparisonModal.tsx
import React from 'react';
import { Columns3, X, BookOpen, Layers, ShieldCheck, Info } from 'lucide-react';
import { getVerseComparisons } from '../../services/bibleTextService';
import type { BibleVerse } from '../../types';

interface VerseComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  verse: BibleVerse;
}

export const VerseComparisonModal: React.FC<VerseComparisonModalProps> = ({
  isOpen,
  onClose,
  verse
}) => {
  if (!isOpen) return null;

  const comparisons = getVerseComparisons(verse);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Cabeçalho */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#1E3E62]/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Columns3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-title font-bold text-slate-900 dark:text-white">
                Comparador Paralelo de Traduções
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Comparando {verse.bookName} {verse.chapter}:{verse.verse} em 4 vertentes textuais
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Versículo em Destaque no Topo */}
        <div className="px-6 py-4 bg-[#D4AF37]/10 border-b border-[#D4AF37]/20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Passagem Referenciada:</span>
            <span className="font-title font-bold text-slate-900 dark:text-white">{verse.bookName} {verse.chapter}:{verse.verse}</span>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/30">
            Cânon Canônico Inspirado
          </span>
        </div>

        {/* Grade de Traduções em Colunas */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {comparisons.map(c => {
            const isTnm = c.translationId === 'tnm';
            return (
              <div
                key={c.translationId}
                className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 transition-all ${
                  isTnm
                    ? 'bg-amber-500/5 dark:bg-[#1E3E62]/40 border-[#D4AF37]/60 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold uppercase tracking-wider ${isTnm ? 'text-[#D4AF37]' : 'text-slate-400'}`}>
                      {c.translationName}
                    </span>
                    {isTnm && (
                      <span className="inline-flex items-center space-x-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Fidelidade TNM</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                    "{c.text}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-700/50 space-y-1">
                  <div className="flex items-start space-x-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                    <Info className="w-3 h-3 text-[#D4AF37] mt-0.5 shrink-0" />
                    <span>{c.notes}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Base: {c.manuscriptBasis}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
