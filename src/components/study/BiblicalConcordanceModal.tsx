// src/components/study/BiblicalConcordanceModal.tsx
import React, { useState } from 'react';
import { Search, BookOpen, Layers, X, ChevronRight, Hash, ArrowRight } from 'lucide-react';
import { searchBiblicalConcordance, type ConcordanceResult } from '../../services/bibleTextService';
import type { BibleVerse } from '../../types';

interface BiblicalConcordanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVerse: (bookId: string, chapter: number) => void;
  initialQuery?: string;
}

export const BiblicalConcordanceModal: React.FC<BiblicalConcordanceModalProps> = ({
  isOpen,
  onClose,
  onSelectVerse,
  initialQuery = 'amor leal'
}) => {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [results, setResults] = useState<ConcordanceResult | null>(() => {
    return initialQuery ? searchBiblicalConcordance(initialQuery) : null;
  });

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    const res = searchBiblicalConcordance(searchTerm);
    setResults(res);
  };

  const quickTerms = ['Jeová', 'amor leal', 'Reino', 'ressurreição', 'paz', 'fé', 'esperança', 'criação'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Cabeçalho */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#1E3E62]/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-title font-bold text-slate-900 dark:text-white">
                Concordância Bíblica Exaustiva
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pesquise termos sagrados em todo o cânon com distribuição por testamentos e divisões
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de Pesquisa e Termos Rápidos */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Ex: amor leal, Jeová, ressurreição, paz, oração..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#1E3E62] hover:bg-[#2b5380] text-[#D4AF37] font-semibold text-sm rounded-xl border border-[#D4AF37]/40 shadow-sm transition-all"
            >
              Pesquisar
            </button>
          </form>

          {/* Sugestões rápidas */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Termos frequentes:</span>
            {quickTerms.map(term => (
              <button
                key={term}
                onClick={() => {
                  setSearchTerm(term);
                  setResults(searchBiblicalConcordance(term));
                }}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] transition-all"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdo com Estatísticas e Resultados */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {results ? (
            <>
              {/* Painel Estatístico */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                  <div className="flex items-center justify-between text-amber-500 text-xs font-bold uppercase tracking-wider mb-1">
                    <span>Ocorrências Encontradas</span>
                    <Hash className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {results.totalOccurrences} <span className="text-xs font-normal text-slate-400">versículos</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30">
                  <div className="flex items-center justify-between text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <span>Escrituras Hebraicas</span>
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {results.testamentBreakdown.antigo} <span className="text-xs font-normal text-slate-400">passagens</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                  <div className="flex items-center justify-between text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <span>Escrituras Gregas</span>
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {results.testamentBreakdown.novo} <span className="text-xs font-normal text-slate-400">passagens</span>
                  </div>
                </div>
              </div>

              {/* Lista de Versículos Localizados */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Passagens Bíblicas ({results.matchedVerses.length})
                </h3>

                {results.matchedVerses.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-sm">
                    Nenhum versículo encontrado para o termo pesquisado. Tente uma palavra-chave diferente.
                  </div>
                ) : (
                  results.matchedVerses.map(v => (
                    <div
                      key={v.id}
                      onClick={() => {
                        onSelectVerse(v.bookId, v.chapter);
                        onClose();
                      }}
                      className="group p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 hover:border-[#D4AF37]/50 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all cursor-pointer flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-title font-bold text-sm text-[#D4AF37]">
                            {v.bookName} {v.chapter}:{v.verse}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                            {v.translation}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                          {v.text}
                        </p>
                      </div>
                      <button className="text-slate-400 group-hover:text-[#D4AF37] p-1.5 transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            <div className="py-16 text-center text-slate-400 space-y-2">
              <Search className="w-8 h-8 mx-auto opacity-50 text-[#D4AF37]" />
              <p className="text-sm">Digite uma palavra ou selecione um dos termos rápidos acima para pesquisar.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
