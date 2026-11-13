// src/components/readingPlans/AchievementsModal.tsx
import React, { useState, useEffect } from 'react';
import { Award, Bell, BellRing, Check, Clock, Sparkles, X, ShieldCheck } from 'lucide-react';
import { calculateUserAchievements } from '../../services/achievementsService';
import { notificationService, type NotificationSettings } from '../../services/notificationService';
import type { Achievement } from '../../types';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({ isOpen, onClose }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [notifSettings, setNotifSettings] = useState<NotificationSettings>(() => notificationService.getSettings());
  const [notifSent, setNotifSent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      calculateUserAchievements().then(setAchievements);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggleNotifications = async () => {
    if (!notifSettings.enabled) {
      const granted = await notificationService.requestPermission();
      if (granted) {
        const updated = { ...notifSettings, enabled: true };
        setNotifSettings(updated);
        notificationService.saveSettings(updated);
        notificationService.testDailyReminder();
      }
    } else {
      const updated = { ...notifSettings, enabled: false };
      setNotifSettings(updated);
      notificationService.saveSettings(updated);
    }
  };

  const handleTestNotification = () => {
    const success = notificationService.testDailyReminder();
    if (success) {
      setNotifSent(true);
      setTimeout(() => setNotifSent(false), 3000);
    }
  };

  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const percentTotal = Math.round((unlockedCount / (achievements.length || 1)) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Cabeçalho */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#1E3E62]/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-title font-bold text-slate-900 dark:text-white">
                Metas, Conquistas & Lembretes
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Acompanhe o seu progresso espiritual e configure o seu momento sagrado diário
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Card de Resumo de Progresso */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1E3E62] to-[#0B192C] border border-[#D4AF37]/40 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37]">
                Nível de Dedicação Bíblica
              </span>
              <h3 className="text-2xl font-bold">
                {unlockedCount} de {achievements.length} Medalhas Desbloqueadas
              </h3>
              <p className="text-xs text-slate-300">
                A cada capítulo lido, nota escrita e quiz respondido, o seu conhecimento das Escrituras expande-se.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center w-24 h-24 rounded-full bg-[#051121] border-4 border-[#D4AF37] shrink-0">
              <span className="text-2xl font-bold text-[#D4AF37]">{percentTotal}%</span>
              <span className="text-[9px] uppercase tracking-wider text-slate-400">Completo</span>
            </div>
          </div>

          {/* Configuração de Lembrete Diário PWA */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <BellRing className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Lembrete Diário de Estudo Bíblico
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Receba uma notificação no seu dispositivo para manter a sua rotina de leitura (Salmo 119:105).
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={handleToggleNotifications}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  notifSettings.enabled
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-[#1E3E62] text-[#D4AF37] border-[#D4AF37]/50'
                }`}
              >
                {notifSettings.enabled ? 'Ativado ✓' : 'Ativar Lembrete'}
              </button>
              {notifSettings.enabled && (
                <button
                  onClick={handleTestNotification}
                  className="px-3 py-2 rounded-xl text-xs bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 transition-colors"
                  title="Testar emissão de notificação agora"
                >
                  {notifSent ? 'Enviado!' : 'Testar'}
                </button>
              )}
            </div>
          </div>

          {/* Grade de Conquistas */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Medalhas de Mérito & Estudo
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className={`p-4 rounded-2xl border transition-all flex items-start space-x-3 ${
                    ach.isUnlocked
                      ? 'bg-amber-500/5 dark:bg-[#1E3E62]/30 border-[#D4AF37]/50 shadow-sm'
                      : 'bg-slate-50/60 dark:bg-slate-800/20 border-slate-200 dark:border-slate-800/80 opacity-70'
                  }`}
                >
                  <div className="text-2xl p-2 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">
                    {ach.icon}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                        {ach.title}
                      </h4>
                      {ach.isUnlocked ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                          Conquistado ✓
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-mono">
                          {ach.progress} / {ach.maxProgress}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      {ach.description}
                    </p>
                    {/* Barra de Progresso */}
                    {!ach.isUnlocked && (
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-1.5">
                        <div
                          className="bg-[#D4AF37] h-full transition-all duration-500"
                          style={{ width: `${(ach.progress / ach.maxProgress) * 100}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
