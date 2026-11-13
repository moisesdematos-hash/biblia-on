// src/services/achievementsService.ts
import { db } from '../db/bibliaOnDb';
import type { Achievement } from '../types';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'iniciador_fe',
    title: 'Iniciador da Fé',
    description: 'Leu o seu primeiro capítulo nas Escrituras Sagradas.',
    icon: '📖',
    category: 'leitura',
    progress: 0,
    maxProgress: 1,
    isUnlocked: false
  },
  {
    id: 'guardiao_alianca',
    title: 'Guardião da Aliança',
    description: 'Leu 10 capítulos das Escrituras inspiradas.',
    icon: '🛡️',
    category: 'leitura',
    progress: 0,
    maxProgress: 10,
    isUnlocked: false
  },
  {
    id: 'discipulo_oracao',
    title: 'Voz dos Profetas e do Mestre',
    description: 'Conversou com personagens bíblicas ou buscou instrução de Jesus e Jeová.',
    icon: '🕊️',
    category: 'personagens',
    progress: 0,
    maxProgress: 3,
    isUnlocked: false
  },
  {
    id: 'estudante_dedicado',
    title: 'Estudante Diligente',
    description: 'Registou 3 anotações ou reflexões pessoais nas passagens.',
    icon: '✍️',
    category: 'estudo',
    progress: 0,
    maxProgress: 3,
    isUnlocked: false
  },
  {
    id: 'amante_verdade',
    title: 'Cores da Revelação',
    description: 'Destacou 5 versículos com marcações semânticas coloridas.',
    icon: '🎨',
    category: 'estudo',
    progress: 0,
    maxProgress: 5,
    isUnlocked: false
  },
  {
    id: 'conhecedor_sabedoria',
    title: 'Sábio em Julgamento',
    description: 'Concluiu um Quiz Bíblico testando o conhecimento das Escrituras.',
    icon: '🏆',
    category: 'quiz',
    progress: 0,
    maxProgress: 1,
    isUnlocked: false
  }
];

export async function calculateUserAchievements(): Promise<Achievement[]> {
  try {
    const [historyCount, notesCount, highlightsCount, quizzesCount, personasCount] = await Promise.all([
      db.readingHistory.count(),
      db.notes.count(),
      db.highlights.count(),
      db.quizProgress.count(),
      db.personaConversations.count()
    ]);

    return INITIAL_ACHIEVEMENTS.map(ach => {
      let current = 0;
      if (ach.id === 'iniciador_fe') current = historyCount;
      else if (ach.id === 'guardiao_alianca') current = historyCount;
      else if (ach.id === 'discipulo_oracao') current = personasCount;
      else if (ach.id === 'estudante_dedicado') current = notesCount;
      else if (ach.id === 'amante_verdade') current = highlightsCount;
      else if (ach.id === 'conhecedor_sabedoria') current = quizzesCount;

      const progress = Math.min(current, ach.maxProgress);
      const isUnlocked = progress >= ach.maxProgress;

      return {
        ...ach,
        progress,
        isUnlocked,
        unlockedAt: isUnlocked ? Date.now() : undefined
      };
    });
  } catch (err) {
    console.error('Erro ao calcular conquistas:', err);
    return INITIAL_ACHIEVEMENTS;
  }
}
