// src/data/quizzesData.ts
import type { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'Personagens',
    question: 'Quem era rei de Salém e sacerdote do Deus Altíssimo nos dias de Abraão?',
    options: ['Melquisedeque', 'Moisés', 'Aarão', 'Ninrode'],
    correctOptionIndex: 0,
    explanation: 'Melquisedeque era simultaneamente rei de Salém e sacerdote do Deus Altíssimo (Gênesis 14:18; Hebreus 7:1).',
    scriptureReference: 'Gênesis 14:18-20'
  },
  {
    id: 'q2',
    category: 'Doutrinas e Ensinamentos',
    question: 'De acordo com Eclesiastes 9:5, qual é a condição dos mortos?',
    options: [
      'Estão vivos num reino espiritual superior',
      'Estão a sofrer num inferno de fogo',
      'Não sabem absolutamente nada e não têm consciência',
      'Estão a reencarnar noutro corpo'
    ],
    correctOptionIndex: 2,
    explanation: 'Eclesiastes 9:5 declara cristalinamente que "os vivos sabem que hão de morrer, mas os mortos não sabem absolutamente nada".',
    scriptureReference: 'Eclesiastes 9:5, 10'
  },
  {
    id: 'q3',
    category: 'Profecias',
    question: 'Em que cidade profetizou Miqueias que nasceria o futuro Governante de Israel?',
    options: ['Jerusalém', 'Belém Efrata', 'Nazaré', 'Damasco'],
    correctOptionIndex: 1,
    explanation: 'Miqueias 5:2 profetizou especificamente que o Messias procederia de Belém Efrata da Judeia.',
    scriptureReference: 'Miqueias 5:2; Mateus 2:5, 6'
  },
  {
    id: 'q4',
    category: 'Línguas Originais',
    question: 'Qual é o sentido original da palavra grega staurós no primeiro século?',
    options: [
      'Uma cruz com barra transversal romana',
      'Uma estaca vertical ou poste reto',
      'Um amuleto místico',
      'Um templo pagão'
    ],
    correctOptionIndex: 1,
    explanation: 'No grego clássico e koiné bíblico, staurós significa primariamente uma estaca ou viga ereta sem barra transversal.',
    scriptureReference: 'Mateus 27:32; Gálatas 3:13'
  },
  {
    id: 'q5',
    category: 'Relação entre Daniel e Apocalipse',
    question: 'No sonho da estátua de Daniel 2, o que representa a pedra cortada sem mãos que esmiúça a estátua?',
    options: [
      'Um império militar humano',
      'O Reino de Deus que durará para sempre',
      'A Liga das Nações',
      'Uma catástrofe meteorológica'
    ],
    correctOptionIndex: 1,
    explanation: 'Daniel 2:44 explica que a pedra é o Reino estabelecido pelo Deus do céu, que nunca será destruído e substituirá todos os reinos humanos.',
    scriptureReference: 'Daniel 2:44; Apocalipse 11:15'
  }
];
