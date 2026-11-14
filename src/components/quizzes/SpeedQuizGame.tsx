// src/components/quizzes/SpeedQuizGame.tsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Clock, 
  Trophy, 
  Flame, 
  HelpCircle, 
  Lightbulb, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  BookOpen, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/quizzesData';
import { db } from '../../db/bibliaOnDb';
import type { QuizQuestion } from '../../types';

export const SpeedQuizGame: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [timerActive, setTimerActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Lifelines (Ajudas)
  const [lifeline5050Used, setLifeline5050Used] = useState(false);
  const [lifelineTimeUsed, setLifelineTimeUsed] = useState(false);
  const [lifelineHintUsed, setLifelineHintUsed] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);

  const timerRef = useRef<any>(null);

  useEffect(() => {
    // Baralhar 10 perguntas para cada sessão de Speed Quiz
    const shuffled = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setTimeLeft(15);
    setTimerActive(true);
  }, []);

  const currentQ = questions[currentIndex] || QUIZ_QUESTIONS[0];

  // Contagem regressiva do Timer
  useEffect(() => {
    if (!timerActive || isAnswered || gameOver) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timerActive, isAnswered, currentIndex, gameOver]);

  const handleTimeExpired = () => {
    setIsAnswered(true);
    setStreak(0);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered || !timerActive) return;

    clearInterval(timerRef.current);
    setSelectedOption(idx);
    setIsAnswered(true);
    setTimerActive(false);

    const isCorrect = idx === currentQ.correctOptionIndex;
    if (isCorrect) {
      // Pontos base + bónus pelo tempo restante + bónus de streak
      const timeBonus = timeLeft * 10;
      const streakBonus = streak * 20;
      const pointsGained = 100 + timeBonus + streakBonus;

      setScore(prev => prev + pointsGained);
      setStreak(prev => {
        const next = prev + 1;
        if (next > bestStreak) setBestStreak(next);
        return next;
      });
    } else {
      setStreak(0);
    }
  };

  // Ajuda 1: 50/50 (elimina 2 alternativas erradas)
  const useLifeline5050 = () => {
    if (lifeline5050Used || isAnswered) return;
    setLifeline5050Used(true);

    const wrongIndexes = currentQ.options
      .map((_, i) => i)
      .filter(i => i !== currentQ.correctOptionIndex);

    // Escolhe 2 erradas para esconder
    const toHide = wrongIndexes.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenOptions(toHide);
  };

  // Ajuda 2: +10 Segundos
  const useLifelineTime = () => {
    if (lifelineTimeUsed || isAnswered) return;
    setLifelineTimeUsed(true);
    setTimeLeft(prev => prev + 10);
  };

  // Ajuda 3: Dica Bíblica
  const useLifelineHint = () => {
    if (lifelineHintUsed || isAnswered) return;
    setLifelineHintUsed(true);
    setShowHint(true);
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(15);
      setHiddenOptions([]);
      setShowHint(false);
      setTimerActive(true);
    } else {
      setGameOver(true);
      await db.quizProgress.add({
        quizId: `speed_${Date.now()}`,
        score,
        totalQuestions: questions.length,
        completedAt: Date.now()
      });
    }
  };

  const handleRestart = () => {
    const shuffled = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setTimeLeft(15);
    setScore(0);
    setStreak(0);
    setGameOver(false);
    setLifeline5050Used(false);
    setLifelineTimeUsed(false);
    setLifelineHintUsed(false);
    setHiddenOptions([]);
    setShowHint(false);
    setTimerActive(true);
  };

  if (gameOver) {
    const percentage = Math.round((score / 2500) * 100);
    return (
      <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 text-center shadow-lg space-y-6 max-w-xl mx-auto animate-in zoom-in-95">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/20 border border-[#D4AF37]/50 flex items-center justify-center text-4xl shadow-inner">
          ⚡
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-1">
            Velocidade & Conhecimento
          </span>
          <h2 className="font-title text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Desafio Concluído!
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Respondeste ao questionário rápido de alta fidelidade bíblica.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 py-2">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] text-slate-400 block mb-1">Pontuação Total</span>
            <span className="font-title text-2xl sm:text-3xl font-bold text-[#D4AF37]">{score}</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] text-slate-400 block mb-1">Maior Combo 🔥</span>
            <span className="font-title text-2xl sm:text-3xl font-bold text-rose-500">{bestStreak}x</span>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-[#D4AF37] text-slate-950 font-bold text-sm hover:opacity-95 transition-all shadow-md flex items-center justify-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Jogar Novamente</span>
        </button>
      </div>
    );
  }

  const timerPercent = (timeLeft / 15) * 100;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Placar Superior: Timer, Combo e Pontos */}
      <div className="flex items-center justify-between bg-white dark:bg-[#0B192C] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Timer regressivo */}
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-xl flex items-center justify-center font-mono font-bold text-sm border transition-all ${
            timeLeft <= 5 ? 'bg-rose-500/20 text-rose-500 border-rose-500 animate-pulse' : 'bg-amber-500/10 text-[#D4AF37] border-[#D4AF37]/30'
          }`}>
            <Clock className="w-4 h-4 mr-1.5" />
            <span>{timeLeft}s</span>
          </div>
        </div>

        {/* Combo */}
        {streak > 1 && (
          <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-500 text-xs font-bold animate-bounce">
            <Flame className="w-4 h-4 text-rose-500" />
            <span>Combo {streak}x!</span>
          </div>
        )}

        {/* Pontuação */}
        <div className="text-right">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Pontos</span>
          <span className="font-title text-base font-bold text-[#D4AF37]">{score}</span>
        </div>
      </div>

      {/* Barra de Tempo Animada */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden shadow-inner">
        <div
          className={`h-full transition-all duration-1000 ${
            timeLeft <= 5 ? 'bg-rose-500' : 'bg-gradient-to-r from-amber-500 to-[#D4AF37]'
          }`}
          style={{ width: `${Math.min(timerPercent, 100)}%` }}
        />
      </div>

      {/* Cartão Central da Pergunta */}
      <div className="bg-white dark:bg-[#0B192C] border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        {/* Cabeçalho da Pergunta & Ajudas / Lifelines */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block">
              {currentQ.category}
            </span>
            <span className="text-xs font-mono text-slate-400">
              Questão {currentIndex + 1} de {questions.length}
            </span>
          </div>

          {/* 3 Linhas de Ajuda */}
          <div className="flex items-center space-x-2">
            <button
              onClick={useLifeline5050}
              disabled={lifeline5050Used || isAnswered}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                lifeline5050Used ? 'opacity-30 border-slate-700 bg-slate-800 text-slate-500' : 'bg-sky-500/10 text-sky-400 border-sky-500/40 hover:bg-sky-500/20'
              }`}
              title="Elimina 2 alternativas incorretas"
            >
              50:50
            </button>
            <button
              onClick={useLifelineTime}
              disabled={lifelineTimeUsed || isAnswered}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                lifelineTimeUsed ? 'opacity-30 border-slate-700 bg-slate-800 text-slate-500' : 'bg-amber-500/10 text-amber-400 border-amber-500/40 hover:bg-amber-500/20'
              }`}
              title="+10 segundos no cronómetro"
            >
              +10s
            </button>
            <button
              onClick={useLifelineHint}
              disabled={lifelineHintUsed || isAnswered}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                lifelineHintUsed ? 'opacity-30 border-slate-700 bg-slate-800 text-slate-500' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/20'
              }`}
              title="Revelar dica bíblica"
            >
              <Lightbulb className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dica Revelada se Solicitada */}
        {showHint && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center space-x-2 animate-in fade-in">
            <BookOpen className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Pista Bíblica: Examina o relato em <strong>{currentQ.scriptureReference}</strong></span>
          </div>
        )}

        {/* Enunciado */}
        <h2 className="font-title text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
          {currentQ.question}
        </h2>

        {/* 4 Alternativas */}
        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isCorrect = idx === currentQ.correctOptionIndex;
            const isSelected = selectedOption === idx;
            const isHidden = hiddenOptions.includes(idx);

            if (isHidden) {
              return (
                <div key={idx} className="p-3.5 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 opacity-20 text-xs font-mono text-center">
                  --- Eliminado 50:50 ---
                </div>
              );
            }

            let btnStyle = 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-[#D4AF37]';
            if (isAnswered) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-500 text-white font-bold border-emerald-400 shadow-md ring-2 ring-emerald-400/40';
              } else if (isSelected) {
                btnStyle = 'bg-rose-500 text-white font-bold border-rose-400';
              } else {
                btnStyle = 'opacity-30 bg-slate-100 dark:bg-slate-800 text-slate-400 border-transparent';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between text-left cursor-pointer active:scale-98 ${btnStyle}`}
              >
                <span>{opt}</span>
                {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-white shrink-0" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-white shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Feedback Exegético & Avanço */}
        {isAnswered && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-[#D4AF37]/40 space-y-2 text-xs animate-in fade-in">
            <div className="flex items-center space-x-2 font-bold text-amber-500 dark:text-[#D4AF37]">
              <span>💡 Explicação das Escrituras:</span>
              <span className="font-mono text-[11px] underline">({currentQ.scriptureReference})</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-serif">
              {currentQ.explanation}
            </p>

            <button
              onClick={handleNext}
              className="mt-3 w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-[#D4AF37] text-slate-950 font-bold text-xs hover:opacity-95 transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <span>{currentIndex < questions.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado Final'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
