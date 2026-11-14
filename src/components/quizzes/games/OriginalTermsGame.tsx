// src/components/quizzes/games/OriginalTermsGame.tsx
import React, { useState, useEffect } from 'react';
import { 
  Languages, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ChevronRight, 
  Award, 
  Flame, 
  BookOpen, 
  Scroll 
} from 'lucide-react';
import { ORIGINAL_TERMS, type OriginalTermItem } from '../../../data/games/originalTermsData';

export const OriginalTermsGame: React.FC = () => {
  const [terms, setTerms] = useState<OriginalTermItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const shuffled = [...ORIGINAL_TERMS].sort(() => Math.random() - 0.5);
    setTerms(shuffled);
  }, []);

  const currentTerm = terms[currentIndex] || ORIGINAL_TERMS[0];

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    const isCorrect = opt === currentTerm.correctDefinition;
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
    if (currentIndex < terms.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    const shuffled = [...ORIGINAL_TERMS].sort(() => Math.random() - 0.5);
    setTerms(shuffled);
    setCurrentIndex(0);
    setSelectedOption(null);
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
          Línguas Originais Desvendadas!
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
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500">
            <Languages className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              Termos Originais & Exegese
            </span>
            <div className="text-xs text-slate-400">Termo {currentIndex + 1} de {terms.length}</div>
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

      {/* Cartão do Termo Original */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-slate-50 dark:via-[#0B192C] to-slate-100 dark:to-slate-800/40 border border-cyan-500/30 text-center space-y-3">
        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 uppercase tracking-widest inline-block border border-cyan-500/30">
          Língua: {currentTerm.originalLanguage}
        </span>
        <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-serif tracking-wider">
          {currentTerm.term}
        </div>
        <div className="text-sm font-semibold text-[#D4AF37]">
          {currentTerm.transliteration}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Qual é o verdadeiro significado exegético deste termo nas Escrituras?
        </p>
      </div>

      {/* Opções */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {currentTerm.options.map((opt, idx) => {
          let btnStyle = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#D4AF37]';

          if (isAnswered) {
            if (opt === currentTerm.correctDefinition) {
              btnStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold';
            } else if (selectedOption === opt) {
              btnStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-600 dark:text-rose-400';
            }
          }

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleSelectOption(opt)}
              className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${btnStyle}`}
            >
              <span>{opt}</span>
              {isAnswered && opt === currentTerm.correctDefinition && (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              )}
              {isAnswered && selectedOption === opt && opt !== currentTerm.correctDefinition && (
                <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Nota Exegética */}
      {isAnswered && (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2 animate-fadeIn">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#D4AF37]">
            <BookOpen className="w-4 h-4" />
            <span>Escrituras: {currentTerm.scriptureReference}</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            <strong>Exegese TNM:</strong> {currentTerm.theologicalInsight}
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
            <span>{currentIndex < terms.length - 1 ? 'Próximo Termo' : 'Ver Resultado'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
