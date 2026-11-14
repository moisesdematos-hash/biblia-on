// src/data/games/parablesData.ts

export interface ParableMatchItem {
  id: string;
  parableTitle: string;
  symbol: string;
  question: string;
  correctMeaning: string;
  options: string[];
  scripture: string;
  spiritualTruth: string;
}

export const PARABLES_DATA: ParableMatchItem[] = [
  {
    id: 'par_1',
    parableTitle: 'O Semeador (Mateus 13)',
    symbol: 'A Semente lançada pelo semeador',
    question: 'O que representa a "semente" lançada pelo semeador?',
    correctMeaning: 'A palavra do Reino de Deus',
    options: ['A palavra do Reino de Deus', 'A riqueza material', 'A congregação cristã', 'As boas obras'],
    scripture: 'Mateus 13:19; Lucas 8:11',
    spiritualTruth: 'A semente é a mensagem divina que produz frutos duradouros somente no solo de um coração nobre e sincero.'
  },
  {
    id: 'par_2',
    parableTitle: 'O Joio e o Trigo (Mateus 13)',
    symbol: 'O Campo onde foi semeado o trigo',
    question: 'O que representa o "campo" nesta ilustração?',
    correctMeaning: 'O mundo da humanidade',
    options: ['O mundo da humanidade', 'O jardim do Éden', 'O templo de Jerusalém', 'O mar da Galileia'],
    scripture: 'Mateus 13:38',
    spiritualTruth: 'Jesus explicou expressamente: "O campo é o mundo; quanto à boa semente, estes são os filhos do Reino."'
  },
  {
    id: 'par_3',
    parableTitle: 'O Joio e o Trigo (Mateus 13)',
    symbol: 'Os Ceifeiros no tempo da colheita',
    question: 'Quem são os "ceifeiros" que fazem a separação final?',
    correctMeaning: 'Os anjos celestiais',
    options: ['Os anjos celestiais', 'Os governantes do mundo', 'Os escribas e fariseus', 'Os apóstolos humanos'],
    scripture: 'Mateus 13:39',
    spiritualTruth: 'Na terminação do sistema de coisas, os anjos ajuntam o joio para o fogo e recolhem o trigo para o celeiro.'
  },
  {
    id: 'par_4',
    parableTitle: 'O Filho Pródigo (Lucas 15)',
    symbol: 'O Pai que corre de braços abertos',
    question: 'Quem é retratado pelo pai compassivo que perdoa o filho rebelde?',
    correctMeaning: 'Jeová Deus e a Sua misericórdia com os pecadores arrependidos',
    options: ['Jeová Deus e a Sua misericórdia', 'O sumo sacerdote', 'A nação de Israel', 'O profeta Moisés'],
    scripture: 'Lucas 15:20-24',
    spiritualTruth: 'Deus acolhe com imensa alegria e benevolência todo aquele que retorna com um coração contrito e humilde.'
  },
  {
    id: 'par_5',
    parableTitle: 'As Dez Virgens (Mateus 25)',
    symbol: 'O Óleo nas lâmpadas das cinco virgens prudentes',
    question: 'O que simboliza o suprimento contínuo de "óleo"?',
    correctMeaning: 'Vigilância espiritual contínua e luz da fé',
    options: ['Vigilância espiritual contínua e fé', 'Riqueza acumulada', 'A genealogia levítica', 'A lei mosaica'],
    scripture: 'Mateus 25:1-13',
    spiritualTruth: 'A vigilância e o apego aos princípios espirituais não podem ser comprados à última hora nem emprestados.'
  },
  {
    id: 'par_6',
    parableTitle: 'A Pérola de Grande Valor (Mateus 13)',
    symbol: 'O Mercador que vende tudo o que tem',
    question: 'Que atitude este mercador representa?',
    correctMeaning: 'Reconhecer que o Reino de Deus vale qualquer sacrifício pessoal',
    options: ['Reconhecer que o Reino vale qualquer sacrifício', 'O desejo de enriquecer na terra', 'O comércio internacional', 'A conquista militar'],
    scripture: 'Mateus 13:45, 46',
    spiritualTruth: 'Encontrar a verdade do Reino é um tesouro inestimável pelo qual uma pessoa sábia renuncia a prioridades egoístas.'
  }
];
