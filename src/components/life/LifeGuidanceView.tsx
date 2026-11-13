// src/components/life/LifeGuidanceView.tsx
import React, { useState } from 'react';
import { Heart, BookOpen, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { LIFE_GUIDANCE_DATA } from '../../data/lifeGuidanceData';
import type { LifeGuidanceTopic } from '../../types';

export const LifeGuidanceView: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<LifeGuidanceTopic>(LIFE_GUIDANCE_DATA[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabeçalho */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
          <Heart className="w-4 h-4" />
          <span>Orientador Prático das Escrituras para o Dia a Dia</span>
        </div>
        <h1 className="font-title text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Princípios Bíblicos para a Vida Real
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl">
          Como aplicar a sabedoria divina no casamento, na ansiedade diária, nas relações humanas, nas perdas e no cultivo da paz interior.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Painel Esquerdo: Lista de Temas de Vida */}
        <div className="lg:col-span-1 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Áreas de Orientação
          </h2>
          {LIFE_GUIDANCE_DATA.map((topic) => {
            const isSelected = selectedTopic.id === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className={`w-full text-left p-3.5 rounded-xl text-xs transition-all flex flex-col ${
                  isSelected
                    ? 'bg-[#1E3E62] text-[#D4AF37] font-semibold border border-[#D4AF37]/50 shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <span className="font-semibold text-sm mb-1">{topic.title}</span>
                <span className="text-[10px] text-slate-400 capitalize">Categoria: {topic.category}</span>
              </button>
            );
          })}
        </div>

        {/* Painel Central e Direito: Guia Prático */}
        <div className="lg:col-span-3 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/40 uppercase font-semibold">
              {selectedTopic.category}
            </span>
            <h2 className="font-title text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-3 mb-2">
              {selectedTopic.title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {selectedTopic.description}
            </p>
          </div>

          {/* Princípios Fundamentais */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-amber-600 dark:text-[#D4AF37] mb-3 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Princípios Bíblicos Fundamentais</span>
            </h3>
            <div className="space-y-2">
              {selectedTopic.principles.map((pr, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{pr}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Passagens Bíblicas com Aplicação Prática */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center space-x-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Passagens Bíblicas & Como Aplicar na Prática</span>
            </h3>
            <div className="space-y-3">
              {selectedTopic.keyVerses.map((kv, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold text-xs text-[#D4AF37] block mb-1">{kv.reference}</span>
                  <p className="font-scripture text-xs sm:text-sm text-slate-800 dark:text-slate-200 italic mb-2">
                    "{kv.text}"
                  </p>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 pt-2 border-t border-slate-200 dark:border-slate-700/60">
                    <strong>Aplicação no dia a dia: </strong>{kv.practicalApplication}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Passos Práticos */}
          <div className="p-5 rounded-xl bg-blue-50 dark:bg-[#1E3E62]/30 border border-blue-200 dark:border-blue-900/40">
            <h3 className="font-bold text-xs uppercase tracking-wider text-blue-700 dark:text-blue-300 mb-2">
              Passos Recomendados para Hoje
            </h3>
            <ul className="space-y-2">
              {selectedTopic.practicalSteps.map((step, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start space-x-2">
                  <span className="text-[#D4AF37] font-bold">•</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Aviso Ético Obrigatório */}
          {selectedTopic.safetyDisclaimer && (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-800/50 text-xs text-amber-900 dark:text-amber-200 flex items-start space-x-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong>Aviso de Cuidado Humano: </strong>
                <span>{selectedTopic.safetyDisclaimer}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
