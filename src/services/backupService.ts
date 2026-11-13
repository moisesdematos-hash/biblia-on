// src/services/backupService.ts
import { db } from '../db/bibliaOnDb';

export interface UserBackupData {
  version: number;
  exportedAt: string;
  notes: any[];
  bookmarks: any[];
  savedStudies: any[];
  readingHistory: any[];
  quizProgress: any[];
  readingPlans: any[];
}

export async function exportUserData(): Promise<string> {
  const notes = await db.notes.toArray();
  const bookmarks = await db.bookmarks.toArray();
  const savedStudies = await db.savedStudies.toArray();
  const readingHistory = await db.readingHistory.toArray();
  const quizProgress = await db.quizProgress.toArray();
  const readingPlans = await db.readingPlans.toArray();

  const backup: UserBackupData = {
    version: 1,
    exportedAt: new Date().toISOString(),
    notes,
    bookmarks,
    savedStudies,
    readingHistory,
    quizProgress,
    readingPlans
  };

  return JSON.stringify(backup, null, 2);
}

export async function importUserData(jsonContent: string): Promise<{ success: boolean; message: string; count: number }> {
  try {
    const data: UserBackupData = JSON.parse(jsonContent);

    if (!data.version || !Array.isArray(data.notes)) {
      return { success: false, message: 'Ficheiro de cópia de segurança inválido.', count: 0 };
    }

    let itemsRestored = 0;

    if (data.notes.length > 0) {
      await db.notes.bulkPut(data.notes);
      itemsRestored += data.notes.length;
    }
    if (data.bookmarks && data.bookmarks.length > 0) {
      await db.bookmarks.bulkPut(data.bookmarks);
      itemsRestored += data.bookmarks.length;
    }
    if (data.savedStudies && data.savedStudies.length > 0) {
      await db.savedStudies.bulkPut(data.savedStudies);
      itemsRestored += data.savedStudies.length;
    }
    if (data.readingPlans && data.readingPlans.length > 0) {
      await db.readingPlans.bulkPut(data.readingPlans);
      itemsRestored += data.readingPlans.length;
    }

    return {
      success: true,
      message: `Cópia de segurança restaurada com sucesso! ${itemsRestored} itens recuperados.`,
      count: itemsRestored
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Falha ao processar ficheiro: ${err.message || 'Erro desconhecido'}`,
      count: 0
    };
  }
}

export async function clearAllLocalUserData(): Promise<void> {
  await db.notes.clear();
  await db.bookmarks.clear();
  await db.savedStudies.clear();
  await db.readingHistory.clear();
  await db.quizProgress.clear();
  await db.readingPlans.clear();
}
