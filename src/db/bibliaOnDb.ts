// src/db/bibliaOnDb.ts
import Dexie, { type Table } from 'dexie';
import type { 
  UserNote, 
  UserBookmark, 
  ReadingPlan, 
  UserHighlight, 
  PersonaConversationRecord, 
  Achievement 
} from '../types';

export interface ReadingHistoryItem {
  id?: number;
  bookId: string;
  bookName: string;
  chapter: number;
  timestamp: number;
}

export interface QuizProgressItem {
  id?: number;
  quizId: string;
  score: number;
  totalQuestions: number;
  completedAt: number;
}

export interface SavedStudy {
  id: string;
  title: string;
  topic: string;
  content: string;
  keyVerses: string[];
  createdAt: number;
  updatedAt: number;
}

export interface AppSetting {
  key: string;
  value: any;
}

export class BibliaOnDatabase extends Dexie {
  notes!: Table<UserNote, string>;
  bookmarks!: Table<UserBookmark, string>;
  readingPlans!: Table<ReadingPlan, string>;
  readingHistory!: Table<ReadingHistoryItem, number>;
  quizProgress!: Table<QuizProgressItem, number>;
  savedStudies!: Table<SavedStudy, string>;
  settings!: Table<AppSetting, string>;
  highlights!: Table<UserHighlight, string>;
  personaConversations!: Table<PersonaConversationRecord, string>;
  achievements!: Table<Achievement, string>;

  constructor() {
    super('BibliaOnLocalDB');
    this.version(1).stores({
      notes: 'id, reference, bookId, chapter, verse, createdAt, updatedAt',
      bookmarks: 'id, reference, bookId, chapter, verse, createdAt',
      readingPlans: 'id, category, currentDay',
      readingHistory: '++id, bookId, chapter, timestamp',
      quizProgress: '++id, quizId, completedAt',
      savedStudies: 'id, topic, createdAt',
      settings: 'key'
    });

    this.version(2).stores({
      highlights: 'id, reference, bookId, chapter, verse, color, createdAt',
      personaConversations: 'personaId, updatedAt',
      achievements: 'id, isUnlocked, category'
    });
  }
}

export const db = new BibliaOnDatabase();

// Funções utilitárias de persistência local
export async function getSetting<T>(key: string, defaultValue: T): Promise<T> {
  try {
    const item = await db.settings.get(key);
    return item ? (item.value as T) : defaultValue;
  } catch (err) {
    console.error('Erro ao ler configuração local:', err);
    return defaultValue;
  }
}

export async function setSetting<T>(key: string, value: T): Promise<void> {
  try {
    await db.settings.put({ key, value });
  } catch (err) {
    console.error('Erro ao salvar configuração local:', err);
  }
}

export async function addReadingHistory(bookId: string, bookName: string, chapter: number): Promise<void> {
  try {
    await db.readingHistory.add({
      bookId,
      bookName,
      chapter,
      timestamp: Date.now()
    });
  } catch (err) {
    console.error('Erro ao registrar histórico de leitura:', err);
  }
}

export async function getLastRead(): Promise<ReadingHistoryItem | null> {
  try {
    const items = await db.readingHistory.orderBy('timestamp').reverse().limit(1).toArray();
    return items[0] || null;
  } catch (err) {
    console.error('Erro ao obter última leitura:', err);
    return null;
  }
}

// Persistência de Conversas das Personagens Bíblicas
export async function getPersonaConversation(personaId: string): Promise<PersonaConversationRecord | null> {
  try {
    const record = await db.personaConversations.get(personaId);
    return record || null;
  } catch (err) {
    console.error('Erro ao buscar conversa da persona:', err);
    return null;
  }
}

export async function savePersonaConversation(
  personaId: string, 
  personaName: string, 
  messages: any[]
): Promise<void> {
  try {
    await db.personaConversations.put({
      personaId,
      personaName,
      messages,
      updatedAt: Date.now()
    });
  } catch (err) {
    console.error('Erro ao salvar conversa da persona:', err);
  }
}

export async function clearPersonaConversation(personaId: string): Promise<void> {
  try {
    await db.personaConversations.delete(personaId);
  } catch (err) {
    console.error('Erro ao limpar conversa da persona:', err);
  }
}

