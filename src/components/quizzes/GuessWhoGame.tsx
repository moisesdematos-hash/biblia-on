// src/components/quizzes/GuessWhoGame.tsx
import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, Award, RotateCcw, ChevronRight, CheckCircle2, XCircle, Flame, Eye, HelpCircle } from 'lucide-react';
import { GUESS_WHO_CHARACTERS, type GuessWhoCharacter } from '../../data/guessWhoData';
import { speechService } from '../../services/speechService';

export const GuessWhoGame: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedCluesCount, setRevealedCluesCount] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [shuffledCharacters, setShuffledCharacters] = useState<GuessWhoCharacter[]>([]);

  useEffect(() => {
    // Baralhar a lista no início
    const shuffled = [...GUESS_WHO_CHARACTERS].sort(() => Math.random() - 0.5);
    setShuffledCharacters(shuffled);
  }, []);

  const character = shuffledCharacters[currentIndex] || GUESS_WHO_CHARACTERS[0];

  const currentPointsValue = Math.max(125 - revealedCluesCount * 25, 25);

  const handleRevealNextClue = () => {
    if (revealedCluesCount < 4 && !isAnswered) {
      setRevealedCluesCount(prev => prev + 1);
    }
  };

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    const isCorrect = opt === character.name;
    if (isCorrect) {
      const multiplier = streak >= 3 ? 1.5 : 1.0;
      const gained = Math.round(currentPointsValue * multiplier);
      setScore(prev => prev + gained);
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
    if (currentIndex < shuffledCharacters.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setRevealedCluesCount(1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    const shuffled = [...GUESS_WHO_CHARACTERS].sort(() => Math.random() - 0.5);
    setShuffledCharacters(shuffled);
    setCurrentIndex(0);
    setRevealedCluesCount(1);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 text-center shadow-lg space-y-6 max-w-xl mx-auto animate-in zoom-in-95">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/20 border border-[#D4AF37]/50 flex items-center justify-center text-4xl shadow-inner">
          🏆
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-1">
            Missão Concluída!
          </span>
          <h2 className="font-title text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Detetive Bíblico Notável
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Desvendaste as figuras das Escrituras com perspicácia e conhecimento!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 py-2">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] text-slate-400 block mb-1">Pontuação Final</span>
            <span className="font-title text-2xl sm:text-3xl font-bold text-[#D4AF37]">{score}</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] text-slate-400 block mb-1">Maior Sequência 🔥</span>
            <span className="font-title text-2xl sm:text-3xl font-bold text-rose-500">{bestStreak}</span>
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

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Placar Superior & Sequência */}
      <div className="flex items-center justify-between bg-white dark:bg-[#0B192C] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-[#D4AF37] border border-[#D4AF37]/30">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Pontos</span>
            <span className="font-title text-lg font-bold text-[#D4AF37]">{score}</span>
          </div>
        </div>

        {/* Combo Streak */}
        {streak > 1 && (
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-500 dark:text-rose-400 text-xs font-bold animate-bounce">
            <Flame className="w-4 h-4 text-rose-500" />
            <span>Combo {streak}x! (+50% bónus)</span>
          </div>
        )}

        <div className="text-right">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Caso</span>
          <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
            {currentIndex + 1} de {shuffledCharacters.length}
          </span>
        </div>
      </div>

      {/* Cartão de Investigação com Pistas Progressivas */}
      <div className="bg-white dark:bg-[#0B192C] border-2 border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
        {/* Faixa Superior do Caso */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{isAnswered ? character.avatarSymbol : '🕵️‍♂️'}</span>
            <div>
              <h3 className="font-title text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {isAnswered ? character.name : 'Mistério Bíblico: Quem Sou Eu?'}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {character.period}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Vale Agora</span>
            <span className="font-title text-sm font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              +{currentPointsValue} pts
            </span>
          </div>
        </div>

        {/* Lista de Pistas Reveladas */}
        <div className="space-y-3">
          {character.clues.slice(0, revealedCluesCount).map((clue, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed flex items-start space-x-3 animate-in fade-in slide-in-from-top-2"
            >
              <span className="w-5 h-5 rounded-full bg-[#1E3E62] text-[#D4AF37] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="font-serif">{clue}</p>
            </div>
          ))}

          {/* Botão para pedir próxima pista se ainda houver */}
          {!isAnswered && revealedCluesCount < 4 && (
            <button
              onClick={handleRevealNextClue}
              className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-semibold hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all flex items-center justify-center space-x-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Revelar Pista {revealedCluesCount + 1} de 4 (Custa 25 pontos)</span>
            </button>
          )}
        </div>

        {/* 4 Opções de Resposta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {character.options.map((option, idx) => {
            const isCorrect = option === character.name;
            const isSelected = selectedOption === option;

            let btnStyle = 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-[#D4AF37]';
            if (isAnswered) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-500 text-white font-bold border-emerald-400 shadow-md ring-2 ring-emerald-400/40';
              } else if (isSelected) {
                btnStyle = 'bg-rose-500 text-white font-bold border-rose-400';
              } else {
                btnStyle = 'opacity-40 bg-slate-100 dark:bg-slate-800 text-slate-400 border-transparent';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(option)}
                className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between text-left cursor-pointer active:scale-98 ${btnStyle}`}
              >
                <span>{option}</span>
                {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-white" />}
              </button>
            );
          })}
        </div>

        {/* Revelação & Explicação Bíblica ao Responder */}
        {isAnswered && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-[#D4AF37]/40 space-y-2 text-xs animate-in fade-in">
            <div className="flex items-center space-x-2 font-bold text-amber-500 dark:text-[#D4AF37]">
              <span>💡 Facto Bíblico Exegético:</span>
              <span className="font-mono text-[11px] underline">({character.scriptureReference})</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-serif">
              {character.funFact}
            </p>

            <button
              onClick={handleNext}
              className="mt-3 w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-[#D4AF37] text-slate-950 font-bold text-xs hover:opacity-95 transition-all shadow-md flex items-center justify-center space-x-1.5"
            >
              <span>Próximo Mistério</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
