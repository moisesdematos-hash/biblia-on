// src/components/quizzes/VerseBuilderGame.tsx
import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, RotateCcw, Volume2, Award, ChevronRight, CheckCircle2, Flame, Undo2 } from 'lucide-react';
import { VERSE_PUZZLES, type VersePuzzle } from '../../data/verseBuilderData';
import { speechService } from '../../services/speechService';

export const VerseBuilderGame: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [placedWords, setPlacedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<{ id: string; text: string }[]>([]);
  const [lives, setLives] = useState(3);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [puzzles, setPuzzles] = useState<VersePuzzle[]>([]);

  useEffect(() => {
    const shuffled = [...VERSE_PUZZLES].sort(() => Math.random() - 0.5);
    setPuzzles(shuffled);
    setupPuzzle(shuffled[0]);
  }, []);

  const setupPuzzle = (puzzle: VersePuzzle) => {
    if (!puzzle) return;
    const allWords = [...puzzle.wordsInOrder, ...(puzzle.distractorWords || [])];
    const shuffled = allWords
      .map((text, idx) => ({ id: `${text}_${idx}_${Math.random()}`, text }))
      .sort(() => Math.random() - 0.5);

    setAvailableWords(shuffled);
    setPlacedWords([]);
    setIsCompleted(false);
    setIsError(false);
  };

  const currentPuzzle = puzzles[currentIndex] || VERSE_PUZZLES[0];

  const handleWordClick = (wordObj: { id: string; text: string }) => {
    if (isCompleted || lives <= 0) return;

    const nextIndex = placedWords.length;
    const expectedWord = currentPuzzle.wordsInOrder[nextIndex];

    if (wordObj.text === expectedWord) {
      // Palavra Correta!
      const newPlaced = [...placedWords, wordObj.text];
      setPlacedWords(newPlaced);
      setAvailableWords(prev => prev.filter(w => w.id !== wordObj.id));

      // Se completou todas as palavras do versículo
      if (newPlaced.length === currentPuzzle.wordsInOrder.length) {
        setIsCompleted(true);
        const gained = 150 + streak * 25;
        setScore(prev => prev + gained);
        setStreak(prev => prev + 1);

        // Narração automática solene do texto sagrado completado
        speechService.speak(currentPuzzle.fullVerseText);
      }
    } else {
      // Erro! Perde uma vida e vibra
      setIsError(true);
      setTimeout(() => setIsError(false), 800);
      setStreak(0);
      setLives(prev => {
        const next = prev - 1;
        if (next <= 0) {
          setGameOver(true);
        }
        return next;
      });
    }
  };

  const handleNextPuzzle = () => {
    if (currentIndex < puzzles.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setupPuzzle(puzzles[nextIdx]);
    } else {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    const shuffled = [...VERSE_PUZZLES].sort(() => Math.random() - 0.5);
    setPuzzles(shuffled);
    setCurrentIndex(0);
    setLives(3);
    setScore(0);
    setStreak(0);
    setGameOver(false);
    setupPuzzle(shuffled[0]);
  };

  if (gameOver) {
    return (
      <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 text-center shadow-lg space-y-6 max-w-xl mx-auto animate-in zoom-in-95">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/20 border border-[#D4AF37]/50 flex items-center justify-center text-4xl shadow-inner">
          {lives > 0 ? '📜' : '💔'}
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-1">
            {lives > 0 ? 'Cânon Memorizado!' : 'Vidas Esgotadas'}
          </span>
          <h2 className="font-title text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            {lives > 0 ? 'Construtor de Fé Excelente' : 'Continua a Praticar!'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            A Palavra de Deus grava-se no coração com a repetição fiel e meditação.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 max-w-xs mx-auto">
          <span className="text-[11px] text-slate-400 block mb-1">Pontos Finais</span>
          <span className="font-title text-3xl font-bold text-[#D4AF37]">{score}</span>
        </div>

        <button
          onClick={handleRestart}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-[#D4AF37] text-slate-950 font-bold text-sm hover:opacity-95 transition-all shadow-md flex items-center justify-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Tentar Novamente</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Placar Superior: Vidas, Pontos e Sequência */}
      <div className="flex items-center justify-between bg-white dark:bg-[#0B192C] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Vidas ❤️❤️❤️ */}
        <div className="flex items-center space-x-1.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <Heart
              key={i}
              className={`w-5 h-5 transition-all ${
                i < lives ? 'text-rose-500 fill-rose-500 animate-pulse' : 'text-slate-300 dark:text-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Combo */}
        {streak > 1 && (
          <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-amber-500/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold animate-bounce">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>{streak}x Seguidos</span>
          </div>
        )}

        {/* Pontuação */}
        <div className="text-right">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Pontos</span>
          <span className="font-title text-base font-bold text-[#D4AF37]">{score}</span>
        </div>
      </div>

      {/* Cartão de Montagem do Versículo */}
      <div className={`bg-white dark:bg-[#0B192C] border-2 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 transition-all ${
        isError ? 'border-rose-500 ring-4 ring-rose-500/20 animate-shake' : isCompleted ? 'border-emerald-500 ring-4 ring-emerald-500/20' : 'border-slate-200 dark:border-slate-800'
      }`}>
        {/* Tema & Referência */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🧩</span>
            <div>
              <h3 className="font-title text-base font-bold text-slate-900 dark:text-white">
                {currentPuzzle.reference}
              </h3>
              <p className="text-[11px] text-slate-400">
                Tema: <strong className="text-[#D4AF37]">{currentPuzzle.theme}</strong>
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase font-mono bg-slate-100 dark:bg-slate-800 text-slate-500">
            {currentPuzzle.difficulty}
          </span>
        </div>

        {/* Área onde os blocos são montados */}
        <div className="min-h-[120px] p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-wrap gap-2 items-center content-start">
          {placedWords.length === 0 ? (
            <p className="text-xs text-slate-400 italic mx-auto self-center">
              Toca nas palavras abaixo na ordem canónica exata da Tradução do Novo Mundo...
            </p>
          ) : (
            placedWords.map((word, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/50 font-serif text-xs sm:text-sm font-semibold shadow-xs animate-in zoom-in-95"
              >
                {word}
              </span>
            ))
          )}
        </div>

        {/* Banco de Palavras Disponíveis para Tocar */}
        {!isCompleted && (
          <div className="space-y-2">
            <span className="text-[11px] text-slate-400 font-bold block uppercase tracking-wider">
              Palavras Disponíveis:
            </span>
            <div className="flex flex-wrap gap-2.5">
              {availableWords.map((w) => (
                <button
                  key={w.id}
                  onClick={() => handleWordClick(w)}
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 font-serif text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  {w.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Parabéns & Áudio ao Completar */}
        {isCompleted && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3 text-xs animate-in fade-in">
            <div className="flex items-center justify-between text-emerald-800 dark:text-emerald-300 font-bold">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Versículo Canónico Completo!</span>
              </div>
              <button
                onClick={() => speechService.speak(currentPuzzle.fullVerseText)}
                className="flex items-center space-x-1 text-[11px] text-[#D4AF37] hover:underline cursor-pointer"
                title="Ouvir versículo narrado"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Ouvir</span>
              </button>
            </div>

            <p className="font-serif italic text-sm text-slate-800 dark:text-slate-200 leading-relaxed border-l-2 border-emerald-500 pl-3">
              "{currentPuzzle.fullVerseText}"
            </p>

            <button
              onClick={handleNextPuzzle}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs hover:opacity-95 transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <span>Próximo Versículo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
