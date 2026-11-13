// src/components/codex/LivingCodexView.tsx
import React, { useState } from 'react';
import { Sparkles, Scroll, Users, GitBranch, ArrowRight, BookOpen, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { 
  GOLDEN_THREAD_DATA, 
  ANCIENT_MANUSCRIPTS, 
  EYEWITNESSES_PROFILES, 
  type GoldenThreadConnection, 
  type AncientManuscript, 
  type EyewitnessProfile 
} from '../../data/goldenThreadData';

export const LivingCodexView: React.FC = () => {
  const [subTab, setSubTab] = useState<'thread' | 'manuscripts' | 'eyewitnesses'>('thread');

  // Estados dos três módulos
  const [selectedThread, setSelectedThread] = useState<GoldenThreadConnection>(GOLDEN_THREAD_DATA[0]);
  const [selectedManuscript, setSelectedManuscript] = useState<AncientManuscript>(ANCIENT_MANUSCRIPTS[0]);
  const [selectedWitness, setSelectedWitness] = useState<EyewitnessProfile>(EYEWITNESSES_PROFILES[0]);
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState<number>(0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Cabeçalho da Chave de Ouro */}
      <div className="text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2 px-3.5 py-1 rounded-full bg-[#1E3E62]/40 border border-[#D4AF37]/50">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>O Codex Vivo & A Matriz Sagrada das Escrituras</span>
        </div>
        <h1 className="font-title text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-3">
          A Chave de Ouro das Escrituras
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
          A maior inovação conceitual das Escrituras: O Hipergrafo da Harmonia Bíblica unindo Gênesis a Apocalipse, réplicas arqueológicas dos Rolos do Mar Morto e testemunhos oculares imersivos em primeira pessoa.
        </p>
      </div>

      {/* Navegador das Três Portas da Chave de Ouro */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-2xl bg-white dark:bg-[#0B192C] p-1.5 border border-slate-200 dark:border-slate-800 shadow-md text-xs">
          <button
            onClick={() => setSubTab('thread')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold transition-all ${
              subTab === 'thread'
                ? 'bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/50 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>O Fio Dourado (Gênesis 3:15 ao Reino)</span>
          </button>
          <button
            onClick={() => setSubTab('manuscripts')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold transition-all ${
              subTab === 'manuscripts'
                ? 'bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/50 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            <Scroll className="w-4 h-4" />
            <span>A Mesa do Escriba (Rolos do Mar Morto & Manuscritos)</span>
          </button>
          <button
            onClick={() => setSubTab('eyewitnesses')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold transition-all ${
              subTab === 'eyewitnesses'
                ? 'bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/50 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Testemunhas Oculares em 1ª Pessoa</span>
          </button>
        </div>
      </div>

      {/* ABA 1: O FIO DOURADO DE GÊNESIS 3:15 AO REINO */}
      {subTab === 'thread' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Seletor de Conexões */}
          <div className="lg:col-span-1 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Passagens Mapeadas
            </h2>
            {GOLDEN_THREAD_DATA.map((item) => {
              const isSelected = selectedThread.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedThread(item)}
                  className={`w-full text-left p-3.5 rounded-xl text-xs transition-all flex flex-col ${
                    isSelected
                      ? 'bg-[#1E3E62] text-[#D4AF37] font-semibold border border-[#D4AF37]/50 shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span className="font-bold text-sm text-[#D4AF37]">{item.sourcePassage}</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 mt-0.5">{item.themeNode}</span>
                </button>
              );
            })}
          </div>

          {/* O Grafo Visual do Fio Dourado */}
          <div className="lg:col-span-3 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
              <span className="text-xs font-mono text-[#D4AF37] uppercase font-bold block mb-1">
                O HIPERGRAFO DO PROPÓSITO ETERNO
              </span>
              <h2 className="font-title text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {selectedThread.themeNode}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
                <strong>Elo com o Protoevangelho (Gn 3:15): </strong>{selectedThread.connectionToProtoevangel}
              </p>
            </div>

            {/* A Corrente Histórica Iluminada (Pipeline Visual) */}
            <div className="space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#D4AF37] flex items-center space-x-1.5">
                <GitBranch className="w-4 h-4 text-[#D4AF37]" />
                <span>A Corrente Histórica Ininterrupta (1.600 Anos em Harmonia Perfeita)</span>
              </h3>

              <div className="relative border-l-2 border-[#D4AF37] ml-4 pl-6 space-y-6">
                {selectedThread.historicalChain.map((step, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#D4AF37] ring-4 ring-[#D4AF37]/20"></div>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-slate-900 dark:text-white">{step.stage}</span>
                        <span className="font-mono text-xs text-[#D4AF37] font-semibold">{step.passage}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        {step.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Culminação Triunfal em Apocalipse */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-[#1E3E62]/40 to-amber-500/20 border border-[#D4AF37]/60 space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#D4AF37] flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Culminação Triunfal no Fim das Escrituras (Apocalipse 21 & 22)</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed font-sans">
                {selectedThread.culminationInRevelation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ABA 2: A MESA DO ESCRIBA (ROLOS DO MAR MORTO & MANUSCRITOS) */}
      {subTab === 'manuscripts' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Lista de Manuscritos */}
          <div className="lg:col-span-1 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Manuscritos Fundamentais
            </h2>
            {ANCIENT_MANUSCRIPTS.map((ms) => {
              const isSelected = selectedManuscript.id === ms.id;
              return (
                <button
                  key={ms.id}
                  onClick={() => setSelectedManuscript(ms)}
                  className={`w-full text-left p-3.5 rounded-xl text-xs transition-all flex flex-col ${
                    isSelected
                      ? 'bg-[#1E3E62] text-[#D4AF37] font-semibold border border-[#D4AF37]/50 shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span className="font-bold text-sm mb-0.5">{ms.name}</span>
                  <span className="text-[10px] text-slate-400">{ms.dateApprox}</span>
                </button>
              );
            })}
          </div>

          {/* Réplica Arqueológica Digital e Exegese */}
          <div className="lg:col-span-3 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-2">
                <span className="font-mono text-[#D4AF37] font-semibold">{selectedManuscript.dateApprox}</span>
                <span>•</span>
                <span>{selectedManuscript.locationFound}</span>
                <span>•</span>
                <span>Material: <strong>{selectedManuscript.material}</strong></span>
              </div>
              <h2 className="font-title text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {selectedManuscript.name}
              </h2>
              <p className="text-xs text-slate-500 italic mt-1">
                Custódia Atual: {selectedManuscript.visualRepresentation.archivalReference}
              </p>
            </div>

            {/* Simulação Visual do Pergaminho Antigo com Tinta Arqueológica */}
            <div className="p-6 rounded-2xl bg-[#1b150f] border-2 border-[#D4AF37]/50 shadow-2xl relative overflow-hidden">
              <div className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37]/80 mb-2">
                AMOSTRA DO TEXTO ORIGINAL EM {selectedManuscript.language.toUpperCase()}
              </div>
              <div className="font-serif text-2xl sm:text-3xl text-[#f3e5ab] tracking-wide leading-relaxed" dir={selectedManuscript.language.includes('Hebraico') ? 'rtl' : 'ltr'}>
                {selectedManuscript.visualRepresentation.ancientScriptSample}
              </div>
              <div className="mt-4 pt-3 border-t border-[#D4AF37]/30 flex items-center justify-between text-xs text-[#D4AF37]">
                <span>Palavra Chave Preservada: <strong className="text-xl font-bold">{selectedManuscript.highlightedWord.original}</strong> ({selectedManuscript.highlightedWord.transliteration})</span>
                <span className="text-[11px] font-mono">Significado: {selectedManuscript.highlightedWord.meaning}</span>
              </div>
            </div>

            {/* Importância Histórica & Arqueológica */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Importância Arqueológica para a Fé Racional</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {selectedManuscript.significance}
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-400 pt-2 border-t border-slate-200 dark:border-slate-700/60">
                <strong>Evidência Manuscrita: </strong>{selectedManuscript.highlightedWord.significanceNote}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ABA 3: TESTEMUNHAS OCULARES EM 1ª PESSOA */}
      {subTab === 'eyewitnesses' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Seletor de Testemunhas */}
          <div className="lg:col-span-1 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Testemunhas da História Sagrada
            </h2>
            {EYEWITNESSES_PROFILES.map((w) => {
              const isSelected = selectedWitness.id === w.id;
              return (
                <button
                  key={w.id}
                  onClick={() => {
                    setSelectedWitness(w);
                    setSelectedQuestionIdx(0);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl text-xs transition-all flex flex-col ${
                    isSelected
                      ? 'bg-[#1E3E62] text-[#D4AF37] font-semibold border border-[#D4AF37]/50 shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span className="font-bold text-sm mb-0.5">{w.name}</span>
                  <span className="text-[10px] text-slate-400">{w.era}</span>
                </button>
              );
            })}
          </div>

          {/* Diálogo Imersivo com a Testemunha */}
          <div className="lg:col-span-3 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <span className="text-xs font-mono text-[#D4AF37] uppercase font-bold block mb-1">
                TESTEMUNHO HISTÓRICO EM PRIMEIRA PESSOA
              </span>
              <h2 className="font-title text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {selectedWitness.name}
              </h2>
              <p className="text-xs text-slate-500 italic mt-1">
                Voz Narrativa: {selectedWitness.scripturalVoice}
              </p>
            </div>

            {/* Testemunho Central */}
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-[#1E3E62]/30 border border-amber-200 dark:border-amber-900/40 text-xs sm:text-sm text-slate-800 dark:text-slate-200 italic font-scripture">
              "{selectedWitness.coreTestimony}"
            </div>

            {/* Perguntas Disponíveis */}
            <div className="space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                Perguntas Registadas nas Escrituras:
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedWitness.sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedQuestionIdx(idx)}
                    className={`text-xs px-3.5 py-2 rounded-xl font-medium text-left transition-all ${
                      selectedQuestionIdx === idx
                        ? 'bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/50 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {q.question}
                  </button>
                ))}
              </div>
            </div>

            {/* Resposta em Primeira Pessoa Estritamente Bíblica */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-4 shadow-sm">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#D4AF37]">
                Resposta de {selectedWitness.name}:
              </h4>
              <p className="font-serif text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-relaxed italic">
                "{selectedWitness.sampleQuestions[selectedQuestionIdx].firstPersonAnswer}"
              </p>
              <div className="pt-3 border-t border-slate-200 dark:border-slate-700/60 flex items-center space-x-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Base Bíblica Exclusiva: {selectedWitness.sampleQuestions[selectedQuestionIdx].scriptureBasis.join('; ')}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
