// src/components/translations/TranslationComparator.tsx
import React, { useState } from 'react';
import { Columns, BookOpen, ShieldCheck, Languages, AlertCircle } from 'lucide-react';
import { COMPARISON_DATA, type VerseComparison } from '../../data/translationsData';

export const TranslationComparator: React.FC = () => {
  const [selectedComparison, setSelectedComparison] = useState<VerseComparison>(COMPARISON_DATA[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabeçalho */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
          <Columns className="w-4 h-4" />
          <span>Comparador de Versões & Análise Textual</span>
        </div>
        <h1 className="font-title text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Comparação de Traduções Bíblicas Autorizadas
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl">
          Visualização paralela e transparente de diferentes edições das Escrituras Sagradas, examinando o vocabulário, as línguas originais e a fidelidade ao texto antigo sem deturpações.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Lista de Versículos em Comparação */}
        <div className="lg:col-span-1 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Passagens Chave
          </h2>
          {COMPARISON_DATA.map((comp) => {
            const isSelected = selectedComparison.reference === comp.reference;
            return (
              <button
                key={comp.reference}
                onClick={() => setSelectedComparison(comp)}
                className={`w-full text-left p-3.5 rounded-xl text-xs transition-all flex flex-col ${
                  isSelected
                    ? 'bg-[#1E3E62] text-[#D4AF37] font-semibold border border-[#D4AF37]/50 shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <span className="font-bold text-sm mb-0.5">{comp.reference}</span>
                <span className="text-[10px] text-slate-400 capitalize">Original: {comp.originalLanguage}</span>
              </button>
            );
          })}
        </div>

        {/* Painel Central e Direito: Comparador Lado a Lado */}
        <div className="lg:col-span-3 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
            <h2 className="font-title text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {selectedComparison.reference}
            </h2>

            {/* Texto Original em Hebraico / Grego */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold block mb-1">
                Texto Manuscrito Original ({selectedComparison.originalLanguage})
              </span>
              <p
                className="font-serif text-lg sm:text-xl text-slate-800 dark:text-slate-100 leading-relaxed"
                dir={selectedComparison.originalLanguage === 'hebraico' ? 'rtl' : 'ltr'}
              >
                {selectedComparison.originalText}
              </p>
            </div>
          </div>

          {/* Colunas Lado a Lado das Traduções */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedComparison.translations.map((tr, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between space-y-3"
              >
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-[#D4AF37] mb-2 border-b border-slate-700/40 pb-1">
                    {tr.edition}
                  </h3>
                  <p className="font-scripture text-xs sm:text-sm text-slate-800 dark:text-slate-200 italic leading-relaxed">
                    "{tr.text}"
                  </p>
                </div>

                {tr.notes && (
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                    <strong>Nota: </strong>{tr.notes}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Análise Crítica e Exegética */}
          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-[#1E3E62]/30 border border-amber-200 dark:border-amber-900/40 space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-amber-700 dark:text-[#D4AF37] flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Análise Crítica & Fidelidade Linguística</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              {selectedComparison.criticalAnalysis}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
