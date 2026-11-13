// src/components/lexicon/OriginalWordsLab.tsx
import React, { useState } from 'react';
import { Languages, Search, BookOpen, Info, ShieldCheck, Check } from 'lucide-react';
import { ORIGINAL_WORDS } from '../../data/originalWordsData';
import type { OriginalWord } from '../../types';

export const OriginalWordsLab: React.FC = () => {
  const [selectedWord, setSelectedWord] = useState<OriginalWord>(ORIGINAL_WORDS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [languageFilter, setLanguageFilter] = useState<'todos' | 'hebraico' | 'grego'>('todos');

  const filteredWords = ORIGINAL_WORDS.filter(w => {
    if (languageFilter !== 'todos' && w.language !== languageFilter) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      w.transliteration.toLowerCase().includes(q) ||
      w.originalWord.includes(q) ||
      w.strongId.toLowerCase().includes(q) ||
      w.primaryMeanings.some(m => m.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabeçalho */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
          <Languages className="w-4 h-4" />
          <span>Laboratório Exegético de Línguas Originais</span>
        </div>
        <h1 className="font-title text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Hebraico, Aramaico e Grego Koiné
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl">
          Análise honesta e rigorosa das palavras originais das Escrituras Sagradas com Concordância de Strong, lemas, significados fundamentais e contextos bíblicos sem etimologias especulativas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Painel Esquerdo: Lista de Termos Originais */}
        <div className="lg:col-span-1 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col h-[750px]">
          {/* Busca */}
          <div className="relative mb-3">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar termo ou Strong (ex: H3068, stauros)..."
              className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Filtro de Idioma */}
          <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1 mb-3 text-xs">
            {(['todos', 'hebraico', 'grego'] as const).map(lang => (
              <button
                key={lang}
                onClick={() => setLanguageFilter(lang)}
                className={`flex-1 py-1 text-center rounded-md font-medium capitalize transition-all ${
                  languageFilter === lang
                    ? 'bg-white dark:bg-[#1E3E62] text-[#D4AF37] shadow-xs'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Lista com scroll */}
          <div className="overflow-y-auto flex-1 space-y-1.5 pr-1">
            {filteredWords.map((word) => {
              const isSelected = selectedWord.strongId === word.strongId;
              return (
                <button
                  key={word.strongId}
                  onClick={() => setSelectedWord(word)}
                  className={`w-full text-left p-3 rounded-xl text-xs transition-all flex flex-col ${
                    isSelected
                      ? 'bg-[#1E3E62] text-[#D4AF37] font-semibold border border-[#D4AF37]/50 shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-slate-400">{word.strongId}</span>
                    <span className="text-[10px] uppercase font-bold text-[#D4AF37]">{word.language}</span>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-base font-serif font-bold text-slate-900 dark:text-white">{word.originalWord}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">({word.transliteration})</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Painel Central e Direito: Ficha Exegética Completa */}
        <div className="lg:col-span-3 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          {/* Cabeçalho do Termo */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/40 font-semibold">
                Strong: {selectedWord.strongId}
              </span>
              <span className="text-xs text-slate-400">
                {selectedWord.occurrencesCount} ocorrências nas Escrituras
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-3">
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-wide" dir={selectedWord.language === 'hebraico' ? 'rtl' : 'ltr'}>
                {selectedWord.originalWord}
              </h2>
              <div className="text-base sm:text-lg text-[#D4AF37] font-medium">
                {selectedWord.transliteration} <span className="text-xs text-slate-400">/ {selectedWord.phoneticPronunciation} /</span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span>Classe: <strong className="text-slate-800 dark:text-slate-200 font-medium">{selectedWord.partOfSpeech}</strong></span>
              <span>•</span>
              <span>Lema: <strong className="text-slate-800 dark:text-slate-200 font-medium">{selectedWord.lemma}</strong></span>
            </div>
          </div>

          {/* Significados Primários */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Significados e Aplicações Principais
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedWord.primaryMeanings.map((meaning, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 font-medium flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>{meaning}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nota Exegética & Histórica */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-[#1E3E62]/30 border border-amber-200 dark:border-amber-900/40">
            <h3 className="font-bold text-xs uppercase tracking-wider text-amber-700 dark:text-[#D4AF37] mb-2 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Análise Exegética & Fidelidade do Texto</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              {selectedWord.exegesisNotes}
            </p>
          </div>

          {/* Exemplos de Ocorrências e Usos nas Escrituras */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center space-x-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Exemplos em Passagens das Escrituras (TNM)</span>
            </h3>
            <div className="space-y-3">
              {selectedWord.biblicalOccurrencesExamples.map((ex, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-[#D4AF37]">{ex.reference}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Edição: {ex.translationUsed}</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 italic">
                    {ex.contextNotes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
