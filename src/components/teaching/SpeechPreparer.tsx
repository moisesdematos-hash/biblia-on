// src/components/teaching/SpeechPreparer.tsx
import React, { useState } from 'react';
import { Mic, Printer, Clock, BookOpen, Sparkles, BookmarkPlus, Check, Share2 } from 'lucide-react';
import { SPEECHES_DATA } from '../../data/speechesData';
import type { SpeechOutline } from '../../types';
import { db } from '../../db/bibliaOnDb';

export const SpeechPreparer: React.FC = () => {
  const [selectedSpeech, setSelectedSpeech] = useState<SpeechOutline>(SPEECHES_DATA[0]);
  const [durationFilter, setDurationFilter] = useState<number>(0); // 0 = todos
  const [savedSuccess, setSavedSuccess] = useState(false);

  const filteredSpeeches = SPEECHES_DATA.filter(s => {
    if (durationFilter === 0) return true;
    return s.targetMinutes === durationFilter;
  });

  const handlePrint = () => {
    window.print();
  };

  const handleSaveToLibrary = async () => {
    await db.savedStudies.add({
      id: `speech_${Date.now()}`,
      title: `Discurso (${selectedSpeech.targetMinutes} min): ${selectedSpeech.title}`,
      topic: 'Preparação de Ensino',
      content: `${selectedSpeech.theme}\n\nIntrodução: ${selectedSpeech.introduction.themeStatement}\n\nConclusão: ${selectedSpeech.conclusion.summary}`,
      keyVerses: [selectedSpeech.introduction.mainScripture, ...selectedSpeech.mainPoints.map(p => p.scripture)],
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
            <Mic className="w-4 h-4" />
            <span>Laboratório de Preparação de Reuniões & Discursos</span>
          </div>
          <h1 className="font-title text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Preparador de Discursos & Ensino
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Esboços cronometrados com linguagem conversacional, ilustrações cativantes, textos explicados e apelos práticos à ação.
          </p>
        </div>

        {/* Ações: Imprimir / Exportar para PDF */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleSaveToLibrary}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:text-[#D4AF37] border border-slate-200 dark:border-slate-700 transition-all"
          >
            <BookmarkPlus className="w-4 h-4 text-[#D4AF37]" />
            <span>{savedSuccess ? 'Guardado!' : 'Guardar Esboço'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#1E3E62] text-[#D4AF37] text-xs font-semibold hover:bg-[#1E3E62]/80 border border-[#D4AF37]/40 shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / PDF</span>
          </button>
        </div>
      </div>

      {/* Filtros de Duração */}
      <div className="flex items-center space-x-2 mb-6 text-xs">
        <span className="text-slate-400 font-medium">Filtrar por Duração:</span>
        {[0, 5, 10, 15, 30].map(mins => (
          <button
            key={mins}
            onClick={() => setDurationFilter(mins)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              durationFilter === mins
                ? 'bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {mins === 0 ? 'Todos' : `${mins} min`}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Lista de Esboços Disponíveis */}
        <div className="lg:col-span-1 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-2 h-[750px] overflow-y-auto">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Esboços Preparados
          </h2>
          {filteredSpeeches.map((sp) => {
            const isSelected = selectedSpeech.id === sp.id;
            return (
              <button
                key={sp.id}
                onClick={() => setSelectedSpeech(sp)}
                className={`w-full text-left p-3.5 rounded-xl text-xs transition-all flex flex-col ${
                  isSelected
                    ? 'bg-[#1E3E62] text-[#D4AF37] font-semibold border border-[#D4AF37]/50 shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] text-[#D4AF37]">{sp.targetMinutes} MINUTOS</span>
                  <span className="text-[10px] text-slate-400">{sp.targetAudience}</span>
                </div>
                <span className="font-semibold text-sm leading-snug">{sp.title}</span>
              </button>
            );
          })}
        </div>

        {/* Ficha Completa do Esboço Formatada para Impressão */}
        <div className="lg:col-span-3 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8 print:border-none print:shadow-none print:p-0">
          {/* Cabeçalho do Esboço */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#D4AF37] mb-2">
              <Clock className="w-4 h-4" />
              <span>TEMPO ALVO: {selectedSpeech.targetMinutes} MINUTOS • AUDIÊNCIA: {selectedSpeech.targetAudience.toUpperCase()}</span>
            </div>
            <h2 className="font-title text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {selectedSpeech.title}
            </h2>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
              Tema Central: <strong className="text-slate-900 dark:text-white">{selectedSpeech.theme}</strong>
            </p>
            <p className="text-xs text-slate-500 italic mt-0.5">
              Objetivo: {selectedSpeech.objective}
            </p>
          </div>

          {/* Introdução */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#D4AF37]">
              I. Introdução Cativante (Aprox. {Math.round(selectedSpeech.targetMinutes * 0.2)} min)
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
              <strong>Gancho Inicial: </strong>{selectedSpeech.introduction.hook}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <strong>Declaração do Tema: </strong>{selectedSpeech.introduction.themeStatement}
            </p>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 text-xs font-scripture text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
              <strong>Texto Principal de Entrada: </strong>{selectedSpeech.introduction.mainScripture}
            </div>
          </div>

          {/* Corpo do Discurso / Pontos Principais */}
          <div className="space-y-6">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
              II. Corpo do Discurso & Aplicação
            </h3>
            {selectedSpeech.mainPoints.map((point, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/80 space-y-3 shadow-xs">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
                  <span>{point.heading}</span>
                </h4>
                <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-xs font-mono text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-900/30">
                  {point.scripture}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  <strong>Explicação Exegética: </strong>{point.explanation}
                </p>
                {point.illustration && (
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-200 flex items-start space-x-2">
                    <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>Ilustração Prática: </strong>{point.illustration}
                    </div>
                  </div>
                )}
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <strong>Aplicação para o Ouvinte: </strong>{point.application}
                </div>
              </div>
            ))}
          </div>

          {/* Conclusão */}
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              III. Conclusão Motivadora & Apelo à Ação
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <strong>Resumo do Ensinamento: </strong>{selectedSpeech.conclusion.summary}
            </p>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <strong>Chamada à Ação Pessoal: </strong>{selectedSpeech.conclusion.actionCall}
            </p>
            <p className="text-xs text-emerald-700 dark:text-emerald-300 italic pt-1">
              "{selectedSpeech.conclusion.encouragement}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
