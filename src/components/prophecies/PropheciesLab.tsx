// src/components/prophecies/PropheciesLab.tsx
import React, { useState } from 'react';
import { Layers, BookOpen, CheckCircle, ShieldAlert, Sparkles } from 'lucide-react';
import { PROPHECIES_DATA } from '../../data/propheciesData';
import type { Prophecy } from '../../types';

export const PropheciesLab: React.FC = () => {
  const [selectedProphecy, setSelectedProphecy] = useState<Prophecy>(PROPHECIES_DATA[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabeçalho */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
          <Layers className="w-4 h-4" />
          <span>Laboratório de Profecias Bíblicas</span>
        </div>
        <h1 className="font-title text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
          A Revelação Infalível do Propósito de Deus
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl">
          Investigação de profecias messiânicas, históricas e escatológicas. Distinção estrita entre cumprimento explícito atestado pelas Escrituras e interpretações teológicas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Painel Esquerdo: Lista de Profecias */}
        <div className="lg:col-span-1 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Profecias em Destaque
          </h2>
          {PROPHECIES_DATA.map((prop) => {
            const isSelected = selectedProphecy.id === prop.id;
            return (
              <button
                key={prop.id}
                onClick={() => setSelectedProphecy(prop)}
                className={`w-full text-left p-3.5 rounded-xl text-xs transition-all flex flex-col ${
                  isSelected
                    ? 'bg-[#1E3E62] text-[#D4AF37] font-semibold border border-[#D4AF37]/50 shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <span className="font-semibold text-sm mb-1">{prop.title}</span>
                <span className="text-[10px] text-slate-400 capitalize">Tipo: {prop.fulfillmentType.replace('_', ' ')}</span>
              </button>
            );
          })}
        </div>

        {/* Painel Central e Direito: Detalhamento da Profecia */}
        <div className="lg:col-span-3 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/40 uppercase font-semibold">
              {selectedProphecy.fulfillmentType.replace('_', ' ')}
            </span>
            <h2 className="font-title text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-3 mb-2">
              {selectedProphecy.title}
            </h2>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 font-scripture text-sm sm:text-base text-slate-800 dark:text-slate-200 italic">
              {selectedProphecy.propheticText}
            </div>
          </div>

          {/* Contexto Original e Destinatários */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-white block mb-1">Contexto Histórico Original:</strong>
              <p className="text-slate-600 dark:text-slate-300">{selectedProphecy.originalContext}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-white block mb-1">Destinatários Primários:</strong>
              <p className="text-slate-600 dark:text-slate-300">{selectedProphecy.recipients}</p>
            </div>
          </div>

          {/* Cumprimento & Passagens de Cumprimento */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2 flex items-center space-x-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Explicação do Cumprimento</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              {selectedProphecy.fulfillmentExplanation}
            </p>
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Textos que registam o cumprimento:</span>
              {selectedProphecy.fulfillmentPassages.map((pass, i) => (
                <div key={i} className="text-xs font-mono p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
                  {pass}
                </div>
              ))}
            </div>
          </div>

          {/* Distinção Rigorosa: Fato Explícito vs Interpretação */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-[#1E3E62]/30 border border-amber-200 dark:border-amber-900/40">
            <h3 className="font-bold text-xs uppercase tracking-wider text-amber-700 dark:text-[#D4AF37] mb-2 flex items-center space-x-1.5">
              <ShieldAlert className="w-4 h-4 text-[#D4AF37]" />
              <span>Critério de Distinção Exegética</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {selectedProphecy.distinctionNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
