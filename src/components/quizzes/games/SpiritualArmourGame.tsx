// src/components/quizzes/games/SpiritualArmourGame.tsx
import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Shield, 
  Sword, 
  Heart, 
  Footprints, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ChevronRight, 
  Award, 
  Flame, 
  BookOpen,
  Sparkles,
  Zap
} from 'lucide-react';
import { 
  ARMOUR_PIECES, 
  ATTACK_SCENARIOS, 
  type AttackScenario, 
  type ArmourPiece 
} from '../../../data/games/armourData';

export const SpiritualArmourGame: React.FC = () => {
  const [scenarios, setScenarios] = useState<AttackScenario[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [hp, setHp] = useState(100);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const shuffled = [...ATTACK_SCENARIOS].sort(() => Math.random() - 0.5);
    setScenarios(shuffled);
  }, []);

  const scenario = scenarios[currentIndex] || ATTACK_SCENARIOS[0];

  const handleSelectPiece = (pieceId: string) => {
    if (isAnswered || hp <= 0) return;
    setSelectedPieceId(pieceId);
    setIsAnswered(true);

    const isCorrect = pieceId === scenario.correctPieceId;
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
      setHp(prev => Math.max(prev - 25, 0));
    }
  };

  const handleNext = () => {
    if (currentIndex < scenarios.length - 1 && hp > 0) {
      setCurrentIndex(prev => prev + 1);
      setSelectedPieceId(null);
      setIsAnswered(false);
    } else {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    const shuffled = [...ATTACK_SCENARIOS].sort(() => Math.random() - 0.5);
    setScenarios(shuffled);
    setCurrentIndex(0);
    setSelectedPieceId(null);
    setIsAnswered(false);
    setHp(100);
    setScore(0);
    setStreak(0);
    setGameOver(false);
  };

  const getArmourIcon = (id: string) => {
    switch (id) {
      case 'belt': return Shield;
      case 'breastplate': return Heart;
      case 'shoes': return Footprints;
      case 'shield': return ShieldAlert;
      case 'helmet': return Sparkles;
      case 'sword': return Sword;
      default: return Shield;
    }
  };

  if (gameOver || hp <= 0) {
    const survived = hp > 0;
    return (
      <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-6">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto border ${
          survived ? 'bg-amber-500/20 text-[#D4AF37] border-[#D4AF37]/50' : 'bg-rose-500/20 text-rose-500 border-rose-500/50'
        }`}>
          {survived ? <Award className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {survived ? 'Batalha Espiritual Vencida!' : 'Armadura Quebrada!'}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {survived 
            ? 'Vestiste a armadura completa de Deus e permaneceste firme!' 
            : 'Os dardos inflamáveis romperam a defesa. Reveste-te da palavra sagrada!'}
        </p>
        <div className="flex justify-center space-x-6 text-sm">
          <div>Pontuação: <strong className="text-[#D4AF37]">{score} pts</strong></div>
          <div>Vida Restante: <strong className={hp > 50 ? 'text-emerald-500' : 'text-rose-500'}>{hp}%</strong></div>
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
          <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              Armadura Espiritual (Efésios 6)
            </span>
            <div className="text-xs text-slate-400">Ataque {currentIndex + 1} de {scenarios.length}</div>
          </div>
        </div>
        
        {/* Barra de Vida do Escudo Espiritual */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <span className="text-[10px] uppercase text-slate-400">Escudo</span>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">{hp}%</div>
          </div>
          <div className="w-20 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                hp > 50 ? 'bg-emerald-500' : hp > 25 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${hp}%` }}
            />
          </div>
        </div>
      </div>

      {/* Dardo Inimigo / Ataque */}
      <div className="p-5 sm:p-6 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-500/30 space-y-2">
        <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wide">
          <Zap className="w-4 h-4" />
          <span>Dardo Inflamável Iminente:</span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          {scenario.incomingAttack}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {scenario.attackDescription}
        </p>
      </div>

      {/* Instrução */}
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
        Aciona a peça da Armadura Completa de Deus necessária para neutralizar este ataque:
      </p>

      {/* 6 Peças da Armadura */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {ARMOUR_PIECES.map((piece) => {
          const Icon = getArmourIcon(piece.id);
          let cardStyle = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-[#D4AF37]';

          if (isAnswered) {
            if (piece.id === scenario.correctPieceId) {
              cardStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold';
            } else if (selectedPieceId === piece.id) {
              cardStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-600 dark:text-rose-400';
            } else {
              cardStyle = 'opacity-40 border-slate-200 dark:border-slate-800';
            }
          }

          return (
            <button
              key={piece.id}
              disabled={isAnswered}
              onClick={() => handleSelectPiece(piece.id)}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 ${cardStyle}`}
            >
              <div className="flex items-center justify-between">
                <Icon className="w-5 h-5 text-[#D4AF37]" />
                {isAnswered && piece.id === scenario.correctPieceId && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                )}
                {isAnswered && selectedPieceId === piece.id && piece.id !== scenario.correctPieceId && (
                  <XCircle className="w-4 h-4 text-rose-500" />
                )}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                  {piece.name}
                </div>
                <div className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">
                  {piece.spiritualMeaning}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback e Defesa Bíblica */}
      {isAnswered && (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2 animate-fadeIn">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#D4AF37]">
            <BookOpen className="w-4 h-4" />
            <span>Defesa Inspirada:</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-200 italic font-serif">
            {scenario.scriptureDefense}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            💡 {scenario.teaching}
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
            <span>{currentIndex < scenarios.length - 1 ? 'Próximo Dardo' : 'Ver Resultado'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
