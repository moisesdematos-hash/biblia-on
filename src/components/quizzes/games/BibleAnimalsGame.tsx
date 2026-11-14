// src/components/quizzes/games/BibleAnimalsGame.tsx
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ChevronRight, 
  Award, 
  Flame, 
  BookOpen, 
  HelpCircle,
  Volume2
} from 'lucide-react';
import { ANIMAL_RIDDLES, type AnimalRiddle } from '../../../data/games/animalsData';
import { speechService } from '../../../services/speechService';

export const BibleAnimalsGame: React.FC = () => {
  const [riddles, setRiddles] = useState<AnimalRiddle[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const shuffled = [...ANIMAL_RIDDLES].sort(() => Math.random() - 0.5);
    setRiddles(shuffled);
  }, []);

  const riddle = riddles[currentIndex] || ANIMAL_RIDDLES[0];

  const handleSelect = (opt: string) => {
    if (isAnswered) return;
    setSelectedAnimal(opt);
    setIsAnswered(true);

    const isCorrect = opt === riddle.correctAnimal;
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

  const handleSpeak = () => {
    if (riddle) {
      speechService.speak(riddle.riddle, 0.95);
    }
  };

  const handleNext = () => {
    if (currentIndex < riddles.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnimal(null);
      setIsAnswered(false);
    } else {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    const shuffled = [...ANIMAL_RIDDLES].sort(() => Math.random() - 0.5);
    setRiddles(shuffled);
    setCurrentIndex(0);
    setSelectedAnimal(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-amber-500/20 text-[#D4AF37] border border-[#D4AF37]/50 flex items-center justify-center mx-auto text-3xl">
          🦁
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Enigmas dos Animais Concluído!
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
          <span>Jogar Novamente</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 text-lg">
            🐾
          </div>
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              Animais Bíblicos & Enigmas
            </span>
            <div className="text-xs text-slate-400">Enigma {currentIndex + 1} de {riddles.length}</div>
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

      {/* Cartão de Enigma */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-slate-50 dark:via-[#0B192C] to-slate-100 dark:to-slate-800/40 border border-emerald-500/30 text-center space-y-3">
        <button
          onClick={handleSpeak}
          className="absolute top-3 right-3 p-2 rounded-xl text-slate-400 hover:text-[#D4AF37] hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors"
          title="Ouvir enigma"
        >
          <Volume2 className="w-4 h-4" />
        </button>
        <div className="text-4xl animate-bounce">
          {isAnswered ? riddle.emoji : '❓'}
        </div>
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
          Quem sou eu na Criação de Jeová?
        </span>
        <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-relaxed max-w-lg mx-auto">
          "{riddle.riddle}"
        </p>
      </div>

      {/* Opções */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {riddle.options.map((opt, idx) => {
          let btnStyle = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#D4AF37]';

          if (isAnswered) {
            if (opt === riddle.correctAnimal) {
              btnStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold';
            } else if (selectedAnimal === opt) {
              btnStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-600 dark:text-rose-400';
            }
          }

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleSelect(opt)}
              className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${btnStyle}`}
            >
              <span>{opt}</span>
              {isAnswered && opt === riddle.correctAnimal && (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              )}
              {isAnswered && selectedAnimal === opt && opt !== riddle.correctAnimal && (
                <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Lição e Texto Bíblico */}
      {isAnswered && (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2 animate-fadeIn">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#D4AF37]">
            <BookOpen className="w-4 h-4" />
            <span>Passagem: {riddle.scripture}</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            <strong>Lição Espiritual:</strong> {riddle.lesson}
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
            <span>{currentIndex < riddles.length - 1 ? 'Próximo Animal' : 'Ver Resultado'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
