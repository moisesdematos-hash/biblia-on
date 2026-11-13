// src/components/quizzes/QuizzesView.tsx
import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, ArrowRight, RotateCcw, Award, BookOpen } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/quizzesData';
import { db } from '../../db/bibliaOnDb';

export const QuizzesView: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (!isAnswerSubmitted) {
      setSelectedOption(idx);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQuestion.correctOptionIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizCompleted(true);
      await db.quizProgress.add({
        quizId: 'geral_1',
        score: score + (selectedOption === currentQuestion.correctOptionIndex ? 1 : 0),
        totalQuestions: QUIZ_QUESTIONS.length,
        completedAt: Date.now()
      });
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabeçalho */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4" />
          <span>Desafios de Conhecimento das Escrituras</span>
        </div>
        <h1 className="font-title text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Questionários Bíblicos
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Testa a tua compreensão das passagens, genealogias e acontecimentos sagrados. Cada pergunta traz uma explicação bíblica completa.
        </p>
      </div>

      {!quizCompleted ? (
        <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          {/* Progresso */}
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-3">
            <span>Categoria: <strong className="text-[#D4AF37]">{currentQuestion.category}</strong></span>
            <span>Pergunta {currentQuestionIndex + 1} de {QUIZ_QUESTIONS.length}</span>
          </div>

          {/* Barra de Progresso */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#D4AF37] h-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            ></div>
          </div>

          {/* Texto da Pergunta */}
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {currentQuestion.question}
          </h2>

          {/* Opções de Resposta */}
          <div className="space-y-3">
            {currentQuestion.options.map((opt, idx) => {
              let btnStyle = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#D4AF37]';
              
              if (selectedOption === idx) {
                btnStyle = 'bg-[#1E3E62] border-[#D4AF37] text-[#D4AF37] font-semibold';
              }

              if (isAnswerSubmitted) {
                if (idx === currentQuestion.correctOptionIndex) {
                  btnStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-semibold';
                } else if (selectedOption === idx) {
                  btnStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-600 dark:text-rose-400';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswerSubmitted && idx === currentQuestion.correctOptionIndex && (
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  )}
                  {isAnswerSubmitted && selectedOption === idx && idx !== currentQuestion.correctOptionIndex && (
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explicação e Referência após resposta */}
          {isAnswerSubmitted && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center space-x-2 font-semibold text-xs text-[#D4AF37]">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Explicação & Referência: {currentQuestion.scriptureReference}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Botões de Ação */}
          <div className="flex justify-end pt-2">
            {!isAnswerSubmitted ? (
              <button
                disabled={selectedOption === null}
                onClick={handleSubmitAnswer}
                className="px-6 py-2.5 rounded-xl bg-[#1E3E62] text-[#D4AF37] font-semibold text-xs border border-[#D4AF37]/50 disabled:opacity-40 hover:bg-[#1E3E62]/80 transition-all"
              >
                Confirmar Resposta
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center space-x-1.5 px-6 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B192C] font-semibold text-xs hover:bg-amber-400 transition-all shadow-md"
              >
                <span>{currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Tela de Resultado Final */
        <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 text-[#D4AF37] border border-[#D4AF37]/50 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <h2 className="font-title text-2xl font-bold text-slate-900 dark:text-white">
              Desafio Concluído!
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Acertaste <strong className="text-[#D4AF37]">{score}</strong> de <strong className="text-slate-900 dark:text-white">{QUIZ_QUESTIONS.length}</strong> perguntas.
            </p>
          </div>
          <div className="max-w-md mx-auto text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            O estudo contínuo das Escrituras fortalece a fé e o discernimento. O teu progresso foi gravado com segurança no teu dispositivo local.
          </div>
          <button
            onClick={handleRestart}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#1E3E62] text-[#D4AF37] font-semibold text-xs border border-[#D4AF37]/50 hover:bg-[#1E3E62]/80 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Tentar Novamente</span>
          </button>
        </div>
      )}
    </div>
  );
};
