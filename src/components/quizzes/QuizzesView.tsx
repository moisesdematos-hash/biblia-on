// src/components/quizzes/QuizzesView.tsx
import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  Puzzle, 
  Award, 
  Sparkles, 
  Gamepad2,
  BookOpen
} from 'lucide-react';
import { SpeedQuizGame } from './SpeedQuizGame';
import { GuessWhoGame } from './GuessWhoGame';
import { VerseBuilderGame } from './VerseBuilderGame';

type GameMode = 'speed_quiz' | 'guess_who' | 'verse_builder';

export const QuizzesView: React.FC = () => {
  const [activeMode, setActiveMode] = useState<GameMode>('speed_quiz');

  const modes = [
    {
      id: 'speed_quiz' as GameMode,
      title: 'Super Quiz da Velocidade',
      badge: '⚡ 15s Countdown',
      icon: Zap,
      desc: 'Perguntas cronometradas, combos e 3 ajudas estratégicas.',
      gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
      accentColor: 'text-[#D4AF37]',
      borderColor: 'border-amber-500/40'
    },
    {
      id: 'guess_who' as GameMode,
      title: 'Quem Sou Eu? (Detetive)',
      badge: '🕵️‍♂️ 4 Pistas',
      icon: Search,
      desc: 'Descobre a personagem misteriosa com o menor número de pistas.',
      gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
      accentColor: 'text-blue-400',
      borderColor: 'border-blue-500/40'
    },
    {
      id: 'verse_builder' as GameMode,
      title: 'Construtor de Versículos',
      badge: '🧩 Memorização',
      icon: Puzzle,
      desc: 'Monta versículos áureos da TNM bloco a bloco sem perder vidas.',
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      accentColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/40'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Cabeçalho Principal */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1E3E62]/40 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37]">
          <Gamepad2 className="w-4 h-4" />
          <span>Central de Jogos & Quizzes Bíblicos</span>
        </div>
        <h1 className="font-title text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
          Aprende & Desafia a Tua Mente
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Mergulha nas Escrituras com jogos dinâmicos baseados na Tradução do Novo Mundo. Acumula pontos, descobre fatos históricos e memoriza a Palavra sagrada.
        </p>
      </div>

      {/* Seletor de Modos de Jogo (Tabs com Cards Interativos) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = activeMode === mode.id;

          return (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={`text-left p-4 rounded-2xl border transition-all duration-200 relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? `bg-gradient-to-br ${mode.gradient} bg-white dark:bg-[#0B192C] ${mode.borderColor} shadow-lg ring-1 ring-[#D4AF37]/50`
                  : 'bg-white dark:bg-[#0B192C]/50 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 opacity-75 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-[#1E3E62] text-[#D4AF37]' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {mode.badge}
                </span>
              </div>
              <div>
                <h3 className={`text-sm font-bold transition-colors ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                  {mode.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {mode.desc}
                </p>
              </div>
              {isSelected && (
                <div className="mt-3 flex items-center space-x-1 text-[11px] font-semibold text-[#D4AF37]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Em Jogo</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Área Ativa do Jogo */}
      <div className="transition-all duration-300">
        {activeMode === 'speed_quiz' && <SpeedQuizGame />}
        {activeMode === 'guess_who' && <GuessWhoGame />}
        {activeMode === 'verse_builder' && <VerseBuilderGame />}
      </div>

      {/* Rodapé Inspiracional */}
      <div className="text-center pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center space-x-2">
        <BookOpen className="w-4 h-4 text-[#D4AF37]" />
        <span>"A tua palavra é lâmpada para o meu pé e luz para o meu caminho." — Salmo 119:105</span>
      </div>
    </div>
  );
};
