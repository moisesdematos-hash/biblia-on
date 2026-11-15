// src/data/i18nData.ts

export type LanguageCode = 'pt' | 'en' | 'es' | 'fr';

export interface TranslationDictionary {
  appName: string;
  slogan: string;
  heroQuestion: string;
  searchPlaceholder: string;
  voiceTooltip: string;
  exploreBtn: string;
  freeBadge: string;
  institutionalPrinciple: string;
  nav: {
    home: string;
    explorer: string;
    chat: string;
    characters: string;
    lexicon: string;
    prophecies: string;
    contradictions: string;
    atlas: string;
    timeline: string;
    life: string;
    quizzes: string;
    library: string;
    plans: string;
    tutor: string;
    compare: string;
    genealogy: string;
    donations: string;
    admin: string;
  };
  glossary: {
    stake: string;
    soul: string;
    grave: string;
    kingdom: string;
  };
}

export const I18N_TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  pt: {
    appName: 'BIBLIA ON',
    slogan: 'O Conhecimento Bíblico ao alcance de todos.',
    heroQuestion: 'O que gostarias de descobrir nas Escrituras?',
    searchPlaceholder: 'Pergunta em linguagem natural ou digita uma passagem bíblica...',
    voiceTooltip: 'Pesquisar por voz (Microfone)',
    exploreBtn: 'Explorar',
    freeBadge: '100% Grátis',
    institutionalPrinciple: 'A BIBLIA ON é gratuita para todos. As contribuições são voluntárias e ajudam a manter a tecnologia necessária para disponibilizar este projeto ao mundo. Doar é opcional. Estudar é sempre gratuito.',
    nav: {
      home: 'Início',
      explorer: 'Bíblia',
      chat: 'IA & Estudo',
      characters: 'Personagens',
      lexicon: 'Hebraico / Grego',
      prophecies: 'Profecias',
      contradictions: 'Harmonizações',
      atlas: 'Atlas & Lugares',
      timeline: 'Cronologia',
      life: 'Guia de Vida',
      quizzes: 'Desafios',
      library: 'Minhas Notas',
      plans: 'Planos de Leitura',
      tutor: 'Professor Adaptativo',
      compare: 'Comparar Traduções',
      genealogy: 'Genealogias',
      donations: 'Apoiar o Projeto',
      admin: 'Painel Admin'
    },
    glossary: {
      stake: 'Estaca de execução / Madeiro (staurós / xýlon)',
      soul: 'Alma vivente / Pessoa (néphesh / psykhē)',
      grave: 'Sepultura comum (Sheol / Hades)',
      kingdom: 'Reino de Deus'
    }
  },
  en: {
    appName: 'BIBLIA ON',
    slogan: 'Biblical Knowledge within everyone’s reach.',
    heroQuestion: 'What would you like to discover in the Scriptures?',
    searchPlaceholder: 'Ask in natural language or type a Bible passage...',
    voiceTooltip: 'Voice Search (Microphone)',
    exploreBtn: 'Explore',
    freeBadge: '100% Free',
    institutionalPrinciple: 'BIBLIA ON is free for all. Contributions are voluntary and help maintain the technology needed to provide this project to the world. Donating is optional. Studying is always free.',
    nav: {
      home: 'Home',
      explorer: 'Bible',
      chat: 'AI & Study',
      characters: 'Characters',
      lexicon: 'Hebrew / Greek',
      prophecies: 'Prophecies',
      contradictions: 'Harmonizations',
      atlas: 'Atlas & Places',
      timeline: 'Timeline',
      life: 'Life Guidance',
      quizzes: 'Quizzes',
      library: 'My Notes',
      plans: 'Reading Plans',
      tutor: 'Adaptive Tutor',
      compare: 'Compare Versions',
      genealogy: 'Genealogies',
      donations: 'Support Project',
      admin: 'Admin Panel'
    },
    glossary: {
      stake: 'Torture stake / Tree (staurós / xýlon)',
      soul: 'Living soul / Person (néphesh / psykhē)',
      grave: 'Common grave of mankind (Sheol / Hades)',
      kingdom: 'Kingdom of God'
    }
  },
  es: {
    appName: 'BIBLIA ON',
    slogan: 'El Conocimiento Bíblico al alcance de todos.',
    heroQuestion: '¿Qué te gustaría descubrir en las Escrituras?',
    searchPlaceholder: 'Pregunta en lenguaje natural o escribe un pasaje bíblico...',
    voiceTooltip: 'Búsqueda por voz (Micrófono)',
    exploreBtn: 'Explorar',
    freeBadge: '100% Gratis',
    institutionalPrinciple: 'BIBLIA ON es gratuita para todos. Las contribuciones son voluntarias y ayudan a mantener la tecnología necesaria para poner este proyecto a disposición del mundo. Donar es opcional. Estudiar es siempre gratuito.',
    nav: {
      home: 'Inicio',
      explorer: 'Biblia',
      chat: 'IA y Estudio',
      characters: 'Personajes',
      lexicon: 'Hebreo / Griego',
      prophecies: 'Profecías',
      contradictions: 'Armonizaciones',
      atlas: 'Atlas y Lugares',
      timeline: 'Cronología',
      life: 'Guía de Vida',
      quizzes: 'Cuestionarios',
      library: 'Mis Notas',
      plans: 'Planes de Lectura',
      tutor: 'Profesor Adaptativo',
      compare: 'Comparar Versiones',
      genealogy: 'Genealogías',
      donations: 'Apoyar Proyecto',
      admin: 'Panel Admin'
    },
    glossary: {
      stake: 'Madero de tormento / Poste de ejecución (staurós / xýlon)',
      soul: 'Alma viviente / Persona (néphesh / psykhē)',
      grave: 'Sepulcro común de la humanidad (Seol / Hades)',
      kingdom: 'Reino de Dios'
    }
  },
  fr: {
    appName: 'BIBLIA ON',
    slogan: 'La Connaissance Biblique à la portée de tous.',
    heroQuestion: 'Que souhaiteriez-vous découvrir dans les Écritures ?',
    searchPlaceholder: 'Posez une question ou tapez un passage biblique...',
    voiceTooltip: 'Recherche vocale (Microphone)',
    exploreBtn: 'Explorer',
    freeBadge: '100% Gratuit',
    institutionalPrinciple: 'BIBLIA ON est gratuit pour tous. Les contributions sont volontaires et aident à maintenir la technologie nécessaire pour offrir ce projet au monde. Donner est facultatif. Étudier est toujours gratuit.',
    nav: {
      home: 'Accueil',
      explorer: 'Bible',
      chat: 'IA & Étude',
      characters: 'Personnages',
      lexicon: 'Hébreu / Grec',
      prophecies: 'Prophéties',
      contradictions: 'Harmonisations',
      atlas: 'Atlas & Lieux',
      timeline: 'Chronologie',
      life: 'Guide de Vie',
      quizzes: 'Défis',
      library: 'Mes Notes',
      plans: 'Plans de Lecture',
      tutor: 'Tuteur Adaptatif',
      compare: 'Comparer Versions',
      genealogy: 'Généalogies',
      donations: 'Soutenir Projet',
      admin: 'Panneau Admin'
    },
    glossary: {
      stake: 'Poteau de supplice / Bois (staurós / xýlon)',
      soul: 'Âme vivante / Personne (néphesh / psykhē)',
      grave: 'Tombe commune des humains (Schéol / Hadès)',
      kingdom: 'Royaume de Dieu'
    }
  }
};
