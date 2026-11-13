// src/types/index.ts

export type Testament = 'antigo' | 'novo';

export interface BibleBook {
  id: string; // Ex: 'gen', 'exo', 'mat', 'rev'
  name: string; // Ex: 'Gênesis', 'Mateus'
  testament: Testament;
  division: 'pentateuco' | 'historicos' | 'poeticos' | 'profeticos' | 'evangelhos' | 'atos' | 'cartas-paulinas' | 'cartas-gerais' | 'apocalipse';
  chaptersCount: number;
  abbreviation: string;
  order: number;
  writtenPeriod?: string;
  author?: string;
  theme?: string;
}

export interface BibleVerse {
  id: string; // Ex: 'gen_1_1'
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  translation: string; // Default: 'TNM' (Tradução do Novo Mundo de Estudo)
  footnotes?: string[];
  crossReferences?: string[];
}

export interface Character {
  id: string;
  name: string;
  nameMeaning?: string;
  period: string;
  location: string;
  family?: {
    father?: string;
    mother?: string;
    spouse?: string[];
    children?: string[];
  };
  events: string[];
  qualities: string[];
  flawsOrErrors?: string[];
  decisions: string[];
  consequences: string[];
  keyVerses: string[];
  lessons: string[];
  timelineEra: string;
  relatedCharacters: string[];
}

export interface OriginalWord {
  strongId: string; // Ex: 'H3068', 'G4716'
  language: 'hebraico' | 'grego' | 'aramaico';
  originalWord: string;
  transliteration: string;
  phoneticPronunciation: string;
  partOfSpeech: string;
  morphology?: string;
  lemma: string;
  occurrencesCount: number;
  primaryMeanings: string[];
  exegesisNotes: string;
  biblicalOccurrencesExamples: {
    reference: string;
    translationUsed: string;
    contextNotes: string;
  }[];
}

export interface Prophecy {
  id: string;
  title: string;
  propheticText: string;
  originalContext: string;
  recipients: string;
  fulfillmentType: 'literal_historico' | 'messianico' | 'maior_escatologico';
  fulfillmentPassages: string[];
  fulfillmentExplanation: string;
  distinctionNote: string; // Distingue cumprimento explícito de interpretação
}

export interface ApparentContradiction {
  id: string;
  title: string;
  passages: {
    reference: string;
    text: string;
    context: string;
  }[];
  challengeExplanation: string;
  harmonizationPrinciples: string[];
  contextualAnalysis: string;
  honestUncertainties?: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  yearApproximate: string;
  isApproximate: boolean;
  category: 'patriarcas' | 'exodo' | 'juizes' | 'monarquia' | 'exilio' | 'jesus' | 'apostolos';
  description: string;
  keyScriptures: string[];
  keyFigures: string[];
  location: string;
}

export interface BiblicalPlace {
  id: string;
  name: string;
  modernName?: string;
  region: string;
  confirmedLocation: boolean;
  coordinates?: { x: number; y: number }; // Percentual para visualização vetorial
  description: string;
  majorEvents: string[];
  associatedCharacters: string[];
  keyVerses: string[];
}

export interface UserNote {
  id: string;
  reference: string;
  bookId: string;
  chapter: number;
  verse?: number;
  title: string;
  content: string;
  tags: string[];
  color?: string;
  createdAt: number;
  updatedAt: number;
}

export interface UserBookmark {
  id: string;
  reference: string;
  bookId: string;
  chapter: number;
  verse?: number;
  createdAt: number;
}

export interface ReadingPlan {
  id: string;
  title: string;
  description: string;
  durationDays: number;
  currentDay: number;
  completedDays: number[];
  category: 'cronologico' | 'canonico' | 'tematico' | 'evangelhos';
}

export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  scriptureReference: string;
}

export interface LifeGuidanceTopic {
  id: string;
  title: string;
  description: string;
  category: 'familia' | 'emocoes' | 'fe' | 'conduta' | 'trabalho';
  principles: string[];
  keyVerses: {
    reference: string;
    text: string;
    practicalApplication: string;
  }[];
  practicalSteps: string[];
  safetyDisclaimer?: string;
}

export interface SpeechOutline {
  id: string;
  title: string;
  theme: string;
  objective: string;
  targetMinutes: 5 | 10 | 15 | 30;
  targetAudience: string;
  introduction: {
    hook: string;
    themeStatement: string;
    mainScripture: string;
  };
  mainPoints: {
    heading: string;
    scripture: string;
    explanation: string;
    illustration?: string;
    application: string;
  }[];
  conclusion: {
    summary: string;
    actionCall: string;
    encouragement: string;
  };
}

export interface FinancialReport {
  period: string;
  lastUpdated: string;
  totalDonations: number;
  expenses: {
    aiServers: number;
    translationServices: number;
    hostingAndDatabase: number;
    securityAndMaintenance: number;
  };
  netBalance: number;
  currency: string;
}

export type HighlightColor = 'yellow' | 'green' | 'blue' | 'red' | 'purple';

export interface UserHighlight {
  id: string;
  reference: string;
  bookId: string;
  chapter: number;
  verse: number;
  color: HighlightColor;
  meaningLabel?: string;
  createdAt: number;
}

export interface PersonaChatMessage {
  id: string;
  sender: 'user' | 'persona';
  text: string;
  scriptures?: string[];
  timestamp: number;
}

export interface PersonaConversationRecord {
  personaId: string;
  personaName: string;
  messages: PersonaChatMessage[];
  updatedAt: number;
}

export interface ArchaeologicalFinding {
  id: string;
  title: string;
  discoveryYear: string;
  locationFound: string;
  currentLocation: string;
  period: string;
  biblicalCorrelation: string;
  keyVerses: string[];
  description: string;
  significance: string;
  iconSymbol: string;
  mapPlaceId?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'leitura' | 'personagens' | 'quiz' | 'estudo';
  unlockedAt?: number;
  progress: number;
  maxProgress: number;
  isUnlocked: boolean;
}

