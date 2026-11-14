// src/components/quizzes/games/KingsGame.tsx
import React, { useState, useEffect } from 'react';
import { 
  Crown, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ChevronRight, 
  Award, 
  Flame, 
  BookOpen, 
  ThumbsUp, 
  ThumbsDown 
} from 'lucide-react';
import { KINGS_DATA, type KingItem } from '../../../data/games/kingsData';

export const KingsGame: React.FC = () => {
  const [shuffledKings, setShuffledKings] = useState<KingItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userVerdict, setUserVerdict] = useState<'bom' | 'mau' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const shuffled = [...KINGS_DATA].sort(() => Math.random() - 0.5);
    setShuffledKings(shuffled);
  }, []);

  const king = shuffledKings[currentIndex] || KINGS_DATA[0];

  const handleVote = (verdict: 'bom' | 'mau') => {
    if (isAnswered) return;
    setUserVerdict(verdict);
    setIsAnswered(true);

    const isCorrect = verdict === king.verdict;
    if (isCorrect) {
      const bonus = streak >= 2 ? 150 : 100;
      setScore(prev => prev + bonus);
      setStreak(prev => {
        const next = prev + 1;
        if (next > bestStreak) setBestStreak(next);
        return next;
      });
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < shuffledKings.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserVerdict(null);
      setIsAnswered(false);
    } else {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    const shuffled = [...KINGS_DATA].sort(() => Math.random() - 0.5);
    setShuffledKings(shuffled);
    setCurrentIndex(0);
    setUserVerdict(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-amber-500/20 text-[#D4AF37] border border-[#D4AF37]/50 flex items-center justify-center mx-auto">
          <Award className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Tribunal dos Reis Concluído!
        </h2>
        <div className="flex justify-center space-x-6 text-sm">
          <div>Pontuação: <strong className="text-[#D4AF37]">{score} pts</strong></div>
          <div>Melhor Sequência: <strong className="text-amber-500">{bestStreak} 🔥</strong></div>
        </div>
        <button
          onClick={handleRestart}
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#1E3E62] text-[#D4AF37] font-semibold text-xs border border-[#D4AF37]/50 hover:bg-[#1E3E62]/80 transition-all shadow-md"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Julgar Novamente</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              Reis de Judá e Israel: Bom ou Mau?
            </span>
            <div className="text-xs text-slate-400">Monarca {currentIndex + 1} de {shuffledKings.length}</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {streak > 1 && (
            <div className="flex items-center space-x-1 text-xs font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
              <Flame className="w-3.5 h-3.5" />
              <span>{streak}x Combo</span>
            </div>
          )}
          <div className="text-right">
            <span className="text-[10px] uppercase text-slate-400">Pontos</span>
            <div className="text-sm font-bold text-[#D4AF37]">{score}</div>
          </div>
        </div>
      </div>

      {/* Cartão do Monarca */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 dark:from-slate-800/80 to-slate-100 dark:to-[#0B192C] border border-slate-200 dark:border-slate-700 text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1E3E62]/30 text-[11px] font-bold text-[#D4AF37] border border-[#D4AF37]/30">
          <span>Reino de {king.kingdom}</span>
          <span>•</span>
          <span>{king.reignYears}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-title">
          Rei {king.name}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
          {king.summary}
        </p>
      </div>

      {/* Pergunta de Julgamento */}
      <div className="text-center">
        <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
          Aos olhos de Jeová, este rei praticou o que era:
        </p>
      </div>

      {/* 2 Botões de Julgamento Gigantes */}
      <div className="grid grid-cols-2 gap-4">
        {/* RETO / BOM */}
        <button
          disabled={isAnswered}
          onClick={() => handleVote('bom')}
          className={`p-5 rounded-2xl border transition-all flex flex-col items-center justify-center space-y-2 font-bold ${
            isAnswered
              ? king.verdict === 'bom'
                ? 'bg-emerald-500 text-white border-emerald-600 shadow-lg scale-105'
                : userVerdict === 'bom'
                ? 'bg-rose-500/20 text-rose-500 border-rose-500 opacity-50'
                : 'opacity-30 border-slate-200 dark:border-slate-800'
              : 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white'
          }`}
        >
          <ThumbsUp className="w-7 h-7" />
          <span className="text-xs sm:text-sm uppercase tracking-wide">Fez o que era RETO</span>
        </button>

        {/* MAU */}
        <button
          disabled={isAnswered}
          onClick={() => handleVote('mau')}
          className={`p-5 rounded-2xl border transition-all flex flex-col items-center justify-center space-y-2 font-bold ${
            isAnswered
              ? king.verdict === 'mau'
                ? 'bg-rose-600 text-white border-rose-700 shadow-lg scale-105'
                : userVerdict === 'mau'
                ? 'bg-rose-500/20 text-rose-500 border-rose-500 opacity-50'
                : 'opacity-30 border-slate-200 dark:border-slate-800'
              : 'bg-rose-50 dark:bg-rose-950/30 border-rose-500/40 text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white'
          }`}
        >
          <ThumbsDown className="w-7 h-7" />
          <span className="text-xs sm:text-sm uppercase tracking-wide">Fez o que era MAU</span>
        </button>
      </div>

      {/* Veredito das Escrituras */}
      {isAnswered && (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2 animate-fadeIn">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#D4AF37]">
            <BookOpen className="w-4 h-4" />
            <span>Registo Bíblico: {king.biblicalRecord}</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-200">
            {king.keyAction}
          </p>
        </div>
      )}

      {/* Próximo */}
      {isAnswered && (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B192C] font-semibold text-xs hover:bg-amber-400 transition-all shadow-md"
          >
            <span>{currentIndex < shuffledKings.length - 1 ? 'Próximo Rei' : 'Ver Resultado'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
