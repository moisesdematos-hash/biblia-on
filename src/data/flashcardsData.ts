// src/data/flashcardsData.ts

export interface Flashcard {
  id: string;
  category: 'Línguas Originais' | 'Doutrinas' | 'Profecias' | 'Personagens';
  front: string; // Pergunta ou conceito
  back: string; // Resposta ou explicação detalhada
  scriptureReference: string;
  difficulty: 'fácil' | 'médio' | 'avançado';
}

export const FLASHCARDS_DATA: Flashcard[] = [
  {
    id: 'fc_1',
    category: 'Línguas Originais',
    front: 'O que significa a palavra hebraica NÉPHESH e como é usada em Gênesis 2:7?',
    back: 'Significa "ser vivente", "pessoa" ou "respiração". A Bíblia ensina que o homem TORNOU-SE uma alma viva, e não que recebeu uma alma imaterial imortal.',
    scriptureReference: 'Gênesis 2:7; 1 Coríntios 15:45',
    difficulty: 'fácil'
  },
  {
    id: 'fc_2',
    category: 'Línguas Originais',
    front: 'Qual é a diferença exegética entre SHEOL e GEENA?',
    back: 'Sheol é a sepultura comum e inconsciente da humanidade onde todos aguardam a ressurreição. Geena (Vale de Hinom) simboliza a destruição eterna definitiva (segunda morte), sem esperança de ressurreição.',
    scriptureReference: 'Eclesiastes 9:10; Mateus 10:28; Apocalipse 20:14',
    difficulty: 'médio'
  },
  {
    id: 'fc_3',
    category: 'Línguas Originais',
    front: 'Qual é o sentido original da palavra grega STAURÓS no século I?',
    back: 'Designava primariamente uma estaca, viga ereta ou madeiro vertical (xýlon), sem haste transversal.',
    scriptureReference: 'Mateus 27:32; Gálatas 3:13; Atos 5:30',
    difficulty: 'médio'
  },
  {
    id: 'fc_4',
    category: 'Profecias',
    front: 'O que representa o "machucar a cabeça da serpente" em Gênesis 3:15?',
    back: 'Representa a aniquilação completa e definitiva de Satanás e do seu sistema ímpio por Jesus Cristo, o Descendente principal da mulher.',
    scriptureReference: 'Gênesis 3:15; Romanos 16:20; Apocalipse 20:10',
    difficulty: 'avançado'
  },
  {
    id: 'fc_5',
    category: 'Personagens',
    front: 'Por que Melquisedeque é um tipo profético do sacerdócio de Jesus?',
    back: 'Porque ele era simultaneamente rei e sacerdote de Deus, sem depender de linhagem genealógica levítica e prefigurando um sacerdócio celestial eterno por juramento divino.',
    scriptureReference: 'Salmos 110:4; Hebreus 7:1-17',
    difficulty: 'avançado'
  }
];
