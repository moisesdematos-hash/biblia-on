// src/components/readingPlans/ReadingPlansView.tsx
import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Circle, BookOpen, ArrowRight, Award, Bell } from 'lucide-react';
import { READING_PLANS, type ReadingPlanDefinition, type PlanDaySchedule } from '../../data/readingPlansData';
import { db } from '../../db/bibliaOnDb';
import type { ReadingPlan } from '../../types';
import { AchievementsModal } from './AchievementsModal';

interface ReadingPlansViewProps {
  onOpenExplorer: (bookName: string, chapter: number) => void;
}

export const ReadingPlansView: React.FC<ReadingPlansViewProps> = ({ onOpenExplorer }) => {
  const [selectedPlanDef, setSelectedPlanDef] = useState<ReadingPlanDefinition>(READING_PLANS[0]);
  const [userPlanRecord, setUserPlanRecord] = useState<ReadingPlan | null>(null);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);

  // Carrega ou inicializa o progresso do plano selecionado no IndexedDB
  useEffect(() => {
    db.readingPlans.get(selectedPlanDef.id).then((rec) => {
      if (rec) {
        setUserPlanRecord(rec);
      } else {
        const newRec: ReadingPlan = {
          id: selectedPlanDef.id,
          title: selectedPlanDef.title,
          description: selectedPlanDef.description,
          durationDays: selectedPlanDef.totalDays,
          currentDay: 1,
          completedDays: [],
          category: selectedPlanDef.category as any
        };
        db.readingPlans.put(newRec);
        setUserPlanRecord(newRec);
      }
    });
  }, [selectedPlanDef]);

  const handleToggleDay = async (dayNumber: number) => {
    if (!userPlanRecord) return;

    const isAlreadyCompleted = userPlanRecord.completedDays.includes(dayNumber);
    const updatedDays = isAlreadyCompleted
      ? userPlanRecord.completedDays.filter(d => d !== dayNumber)
      : [...userPlanRecord.completedDays, dayNumber];

    const updatedRecord: ReadingPlan = {
      ...userPlanRecord,
      completedDays: updatedDays,
      currentDay: Math.max(...updatedDays, 0) + 1
    };

    await db.readingPlans.put(updatedRecord);
    setUserPlanRecord(updatedRecord);
  };

  const completedCount = userPlanRecord?.completedDays.length || 0;
  const progressPercent = Math.round((completedCount / selectedPlanDef.days.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
            <Calendar className="w-4 h-4" />
            <span>Planos de Leitura Sistemática das Escrituras</span>
          </div>
          <h1 className="font-title text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Hábito de Estudo Diário
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            Acompanha o teu progresso na leitura da Bíblia. Os dias concluídos são gravados localmente no teu dispositivo.
          </p>
        </div>

        <button
          onClick={() => setIsAchievementsOpen(true)}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[#1E3E62] hover:bg-[#28507d] text-[#D4AF37] font-semibold text-xs flex items-center space-x-2 border border-[#D4AF37]/50 shadow-sm transition-all"
        >
          <Award className="w-4 h-4" />
          <span>Metas, Medalhas & Lembretes</span>
        </button>
      </div>

      {/* Seletor de Planos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {READING_PLANS.map((plan) => {
          const isSelected = selectedPlanDef.id === plan.id;
          return (
            <button
              key={plan.id}
              onClick={() => setSelectedPlanDef(plan)}
              className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#1E3E62] text-white border-[#D4AF37] shadow-lg'
                  : 'bg-white dark:bg-[#0B192C] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#D4AF37]'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold block mb-1">
                  {plan.category}
                </span>
                <h3 className="font-title text-lg font-bold mb-1">{plan.title}</h3>
                <p className="text-xs text-slate-400 leading-snug">{plan.description}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
                <span>Duração: <strong>{plan.totalDays} dias</strong></span>
                <span className="text-[#D4AF37] font-semibold">Ver cronograma →</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Painel do Plano Ativo */}
      <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5 gap-4">
          <div>
            <h2 className="font-title text-2xl font-bold text-slate-900 dark:text-white">
              {selectedPlanDef.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {completedCount} de {selectedPlanDef.days.length} sessões concluídas ({progressPercent}%)
            </p>
          </div>

          {/* Barra de Progresso */}
          <div className="w-full sm:w-64 bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
            <div
              className="bg-gradient-to-r from-amber-500 to-[#D4AF37] h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Lista de Dias de Leitura */}
        <div className="space-y-3">
          {selectedPlanDef.days.map((day) => {
            const isCompleted = userPlanRecord?.completedDays.includes(day.day) || false;

            return (
              <div
                key={day.day}
                className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isCompleted
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900/40'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/80'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <button
                    onClick={() => handleToggleDay(day.day)}
                    className="p-1 text-slate-400 hover:text-[#D4AF37] transition-colors mt-0.5"
                    title={isCompleted ? "Desmarcar leitura" : "Marcar como lido"}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs text-[#D4AF37]">Dia {day.day}</span>
                      <span className="text-slate-400">•</span>
                      <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{day.title}</h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      {day.focusThought}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {day.readings.map((r, i) => (
                        <span key={i} className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Botão para Ler */}
                <button
                  onClick={() => {
                    const firstReading = day.readings[0] || 'Gênesis 1';
                    const [book, cap] = firstReading.split(' ');
                    onOpenExplorer(book.toLowerCase(), parseInt(cap, 10) || 1);
                  }}
                  className="self-end sm:self-auto flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#1E3E62] text-[#D4AF37] text-xs font-semibold hover:bg-[#1E3E62]/80 transition-all shrink-0"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Ler Agora</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal de Conquistas e Lembretes */}
      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
      />
    </div>
  );
};
