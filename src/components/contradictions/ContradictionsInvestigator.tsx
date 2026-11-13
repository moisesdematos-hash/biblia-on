// src/components/contradictions/ContradictionsInvestigator.tsx
import React, { useState } from 'react';
import { ShieldCheck, BookOpen, AlertCircle, HelpCircle, CheckCircle2 } from 'lucide-react';
import { CONTRADICTIONS_DATA } from '../../data/contradictionsData';
import type { ApparentContradiction } from '../../types';

export const ContradictionsInvestigator: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<ApparentContradiction>(CONTRADICTIONS_DATA[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabeçalho */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Investigador de Harmonizações Textuais</span>
        </div>
        <h1 className="font-title text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Aparentes Contradições Sob Análise Rigorosa
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl">
          Exame honesto e sem subterfúgios de passagens bíblicas que à primeira vista parecem divergir. Análise de perspectiva dos escritores, línguas originais e reconhecimento sincero de incertezas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Painel Esquerdo: Lista de Casos */}
        <div className="lg:col-span-1 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Casos em Investigação
          </h2>
          {CONTRADICTIONS_DATA.map((item) => {
            const isSelected = selectedCase.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedCase(item)}
                className={`w-full text-left p-3.5 rounded-xl text-xs transition-all flex flex-col ${
                  isSelected
                    ? 'bg-[#1E3E62] text-[#D4AF37] font-semibold border border-[#D4AF37]/50 shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <span className="font-semibold text-sm">{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Painel Central e Direito: Investigação Completa */}
        <div className="lg:col-span-3 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
            <h2 className="font-title text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              {selectedCase.title}
            </h2>
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 text-xs sm:text-sm text-rose-900 dark:text-rose-200 flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
              <div>
                <strong>A Dificuldade Aparente: </strong>
                <span>{selectedCase.challengeExplanation}</span>
              </div>
            </div>
          </div>

          {/* Comparação Lado a Lado dos Textos */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center space-x-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Comparação Direta dos Relatos Bíblicos</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedCase.passages.map((p, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold text-xs text-[#D4AF37] block mb-1">{p.reference}</span>
                  <p className="font-scripture text-xs sm:text-sm text-slate-800 dark:text-slate-200 italic mb-2">
                    "{p.text}"
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700/60 pt-2">
                    <strong>Contexto da passagem: </strong>{p.context}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Princípios de Harmonização Racional */}
          <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30">
            <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-3 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Princípios Racionais de Harmonização</span>
            </h3>
            <ul className="space-y-2">
              {selectedCase.harmonizationPrinciples.map((principle, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start space-x-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{principle}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Análise Contextual Detalhada */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Análise Contextual & Literária
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              {selectedCase.contextualAnalysis}
            </p>
          </div>

          {/* Honestidade Intelectual: O Que Permanece Incerto */}
          {selectedCase.honestUncertainties && (
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-start space-x-2">
              <HelpCircle className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <strong className="text-slate-800 dark:text-slate-100">Transparência Acadêmica: </strong>
                <span>{selectedCase.honestUncertainties}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
