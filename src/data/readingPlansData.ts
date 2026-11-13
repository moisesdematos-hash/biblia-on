// src/data/readingPlansData.ts

export interface PlanDaySchedule {
  day: number;
  title: string;
  readings: string[]; // ex: ["Gênesis 1", "Gênesis 2", "Gênesis 3"]
  focusThought: string;
}

export interface ReadingPlanDefinition {
  id: string;
  title: string;
  description: string;
  category: 'canonico' | 'cronologico' | 'evangelhos' | 'sabedoria';
  totalDays: number;
  days: PlanDaySchedule[];
}

export const READING_PLANS: ReadingPlanDefinition[] = [
  {
    id: 'plano_1_ano',
    title: 'A Bíblia Completa em 1 Ano',
    description: 'Leitura metódica e contínua dos 66 livros das Escrituras Sagradas, cerca de 3 a 4 capítulos por dia.',
    category: 'canonico',
    totalDays: 365,
    days: [
      { day: 1, title: 'A Criação e o Éden', readings: ['Gênesis 1', 'Gênesis 2', 'Gênesis 3'], focusThought: 'O propósito original de Deus para uma Terra perfeita habitada por pessoas justas.' },
      { day: 2, title: 'A Humanidade Primitiva e o Dilúvio', readings: ['Gênesis 4', 'Gênesis 5', 'Gênesis 6'], focusThought: 'A fidelidade inabalável de Noé em meio a um mundo violento.' },
      { day: 3, title: 'A Arca e o Novo Começo', readings: ['Gênesis 7', 'Gênesis 8', 'Gênesis 9'], focusThought: 'A aliança do arco-íris e o cuidado preservador do Soberano Jeová.' },
      { day: 4, title: 'Babel e a Chamada de Abraão', readings: ['Gênesis 10', 'Gênesis 11', 'Gênesis 12'], focusThought: 'A partida pela fé de Ur para a terra que Deus havia de mostrar.' },
      { day: 5, title: 'A Aliança Abraâmica e Melquisedeque', readings: ['Gênesis 13', 'Gênesis 14', 'Gênesis 15'], focusThought: 'O encontro grandioso com Melquisedeque, sacerdote do Deus Altíssimo.' }
    ]
  },
  {
    id: 'plano_cronologico',
    title: 'Plano Cronológico Histórico',
    description: 'Lê os livros e acontecimentos na ordem aproximada em que ocorreram no tempo bíblico.',
    category: 'cronologico',
    totalDays: 180,
    days: [
      { day: 1, title: 'As Origens do Cosmos', readings: ['Gênesis 1', 'Gênesis 2'], focusThought: 'Ordem divina e santidade do matrimônio e do descanso sabático.' },
      { day: 2, title: 'A Integridade no Sofrimento', readings: ['Jó 1', 'Jó 2', 'Jó 3'], focusThought: 'A questão universal da soberania levantada perante os anjos no céu.' },
      { day: 3, title: 'A Resposta da Fé', readings: ['Jó 38', 'Jó 39', 'Jó 42'], focusThought: 'A grandeza insuperável do Criador diante da pequenez humana.' },
      { day: 4, title: 'O Êxodo Glorioso', readings: ['Êxodo 12', 'Êxodo 13', 'Êxodo 14'], focusThought: 'O braço forte de Jeová libertando o Seu povo das potências mundiais.' }
    ]
  },
  {
    id: 'plano_evangelhos',
    title: 'Os Evangelhos & Ministério de Jesus',
    description: 'Imersão nos passos, ensinamentos, milagres e sacrifício do Filho de Deus.',
    category: 'evangelhos',
    totalDays: 60,
    days: [
      { day: 1, title: 'O Prólogo e o Nascimento', readings: ['Lucas 1', 'Mateus 1'], focusThought: 'A intervenção profética na chegada do Messias prometido.' },
      { day: 2, title: 'A Infância e o Batismo', readings: ['Lucas 2', 'Mateus 3', 'Marcos 1'], focusThought: 'A identificação pública do Filho Amado ungido com espírito santo.' },
      { day: 3, title: 'O Sermão do Monte (Parte 1)', readings: ['Mateus 5'], focusThought: 'As bem-aventuranças dos mansos e a responsabilidade de ser sal e luz.' },
      { day: 4, title: 'O Sermão do Monte (Parte 2)', readings: ['Mateus 6', 'Mateus 7'], focusThought: 'A oração modelo, o alívio das ansiedades e a busca primordial pelo Reino.' }
    ]
  }
];
