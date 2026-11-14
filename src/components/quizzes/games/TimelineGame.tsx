// src/components/quizzes/games/TimelineGame.tsx
import React, { useState, useEffect } from 'react';
import { 
  History, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ChevronRight, 
  Sparkles, 
  ArrowUpDown, 
  Award,
  BookOpen,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { TIMELINE_ROUNDS, type TimelineEvent } from '../../../data/games/timelineData';

export const TimelineGame: React.FC = () => {
  const [roundIndex, setRoundIndex] = useState(0);
  const [orderedEvents, setOrderedEvents] = useState<TimelineEvent[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const currentRound = TIMELINE_ROUNDS[roundIndex] || TIMELINE_ROUNDS[0];

  useEffect(() => {
    setupRound(roundIndex);
  }, [roundIndex]);

  const setupRound = (index: number) => {
    const round = TIMELINE_ROUNDS[index];
    if (!round) return;
    // Baralhar os eventos da rodada
    const shuffled = [...round.events].sort(() => Math.random() - 0.5);
    setOrderedEvents(shuffled);
    setIsSubmitted(false);
    setIsCorrect(null);
  };

  const moveUp = (idx: number) => {
    if (isSubmitted || idx === 0) return;
    const newArr = [...orderedEvents];
    const temp = newArr[idx];
    newArr[idx] = newArr[idx - 1];
    newArr[idx - 1] = temp;
    setOrderedEvents(newArr);
  };

  const moveDown = (idx: number) => {
    if (isSubmitted || idx === orderedEvents.length - 1) return;
    const newArr = [...orderedEvents];
    const temp = newArr[idx];
    newArr[idx] = newArr[idx + 1];
    newArr[idx + 1] = temp;
    setOrderedEvents(newArr);
  };

  const checkOrder = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);

    let allCorrect = true;
    for (let i = 0; i < orderedEvents.length - 1; i++) {
      if (orderedEvents[i].numericOrder > orderedEvents[i + 1].numericOrder) {
        allCorrect = false;
        break;
      }
    }

    setIsCorrect(allCorrect);
    if (allCorrect) {
      setScore(prev => prev + 100);
    }
  };

  const handleNextRound = () => {
    if (roundIndex < TIMELINE_ROUNDS.length - 1) {
      setRoundIndex(prev => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    setRoundIndex(0);
    setScore(0);
    setGameOver(false);
    setupRound(0);
  };

  if (gameOver) {
    return (
      <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-amber-500/20 text-[#D4AF37] border border-[#D4AF37]/50 flex items-center justify-center mx-auto">
          <Award className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Cronologia Sagrada Concluída!
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Pontuação Final: <strong className="text-[#D4AF37]">{score}</strong> pontos
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
          Compreender a ordem cronológica dos fatos bíblicos elucida o desenrolar das profecias e o propósito soberano de Jeová ao longo das eras.
        </p>
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
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-amber-500/10 text-[#D4AF37]">
            <History className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              Linha do Tempo Bíblica
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              {currentRound.title} (Fase {roundIndex + 1}/{TIMELINE_ROUNDS.length})
            </h3>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase text-slate-400">Pontuação</span>
          <div className="text-sm font-bold text-[#D4AF37]">{score} pts</div>
        </div>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400">
        Usa os botões <ArrowUp className="w-3.5 h-3.5 inline text-[#D4AF37]" /> e <ArrowDown className="w-3.5 h-3.5 inline text-[#D4AF37]" /> para ordenar os acontecimentos do **mais antigo (topo)** para o **mais recente (fundo)**.
      </p>

      {/* Lista Reordenável de Eventos */}
      <div className="space-y-3">
        {orderedEvents.map((evt, idx) => {
          let cardStyle = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700';

          if (isSubmitted) {
            // Se já submeteu, mostrar se está na posição certa ou mostrar o ano
            cardStyle = 'bg-slate-50 dark:bg-slate-800/80 border-slate-300 dark:border-slate-600';
          }

          return (
            <div
              key={evt.id}
              className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${cardStyle}`}
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <span className="w-6 h-6 rounded-full bg-[#1E3E62] text-[#D4AF37] text-xs font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                      {evt.title}
                    </h4>
                    {isSubmitted && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-[#D4AF37] border border-[#D4AF37]/30">
                        {evt.approxYear}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {evt.description}
                  </p>
                </div>
              </div>

              {!isSubmitted ? (
                <div className="flex items-center space-x-1 shrink-0">
                  <button
                    disabled={idx === 0}
                    onClick={() => moveUp(idx)}
                    className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-[#1E3E62] hover:text-[#D4AF37] disabled:opacity-30 transition-colors"
                    title="Mover para cima"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={idx === orderedEvents.length - 1}
                    onClick={() => moveDown(idx)}
                    className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-[#1E3E62] hover:text-[#D4AF37] disabled:opacity-30 transition-colors"
                    title="Mover para baixo"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <span className="text-xs font-semibold text-slate-400 shrink-0">
                  {evt.scripture}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Feedback após Verificação */}
      {isSubmitted && (
        <div className={`p-4 rounded-xl border space-y-2 ${
          isCorrect 
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/50 text-emerald-800 dark:text-emerald-300' 
            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500/50 text-rose-800 dark:text-rose-300'
        }`}>
          <div className="flex items-center space-x-2 font-bold text-xs sm:text-sm">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Excelente! Cronologia 100% Exata! (+100 pts)</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                <span>A ordem cronológica não estava perfeita. Consulta os anos revelados acima!</span>
              </>
            )}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            A cronologia da Tradução do Novo Mundo baseia-se em sincronismos históricos fiáveis das Escrituras e evidências arqueológicas.
          </p>
        </div>
      )}

      {/* Ações */}
      <div className="flex justify-end pt-2">
        {!isSubmitted ? (
          <button
            onClick={checkOrder}
            className="px-6 py-2.5 rounded-xl bg-[#1E3E62] text-[#D4AF37] font-semibold text-xs border border-[#D4AF37]/50 hover:bg-[#1E3E62]/80 transition-all shadow-md"
          >
            Confirmar Ordem Cronológica
          </button>
        ) : (
          <button
            onClick={handleNextRound}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B192C] font-semibold text-xs hover:bg-amber-400 transition-all shadow-md"
          >
            <span>{roundIndex < TIMELINE_ROUNDS.length - 1 ? 'Próxima Fase' : 'Ver Resultado Final'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
