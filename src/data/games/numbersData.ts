// src/data/games/numbersData.ts

export interface BibleNumberQuestion {
  id: string;
  question: string;
  correctNumber: number;
  options: number[];
  unitOrClue: string;
  scripture: string;
  explanation: string;
}

export const BIBLE_NUMBERS: BibleNumberQuestion[] = [
  {
    id: 'num_1',
    question: 'Quantos espias Moisés enviou para explorar a terra de Canaã?',
    correctNumber: 12,
    options: [10, 12, 7, 70],
    unitOrClue: 'homens (um de cada tribo)',
    scripture: 'Números 13:1-16',
    explanation: 'Foi enviado um líder representativo de cada uma das 12 tribos de Israel; apenas Josué e Calebe trouxeram relatório de fé.'
  },
  {
    id: 'num_2',
    question: 'Quantos dias e noites choveu ininterruptamente no Dilúvio de Noé?',
    correctNumber: 40,
    options: [7, 30, 40, 150],
    unitOrClue: 'dias e noites',
    scripture: 'Gênesis 7:12',
    explanation: 'A chuva torrencial caiu durante 40 dias e noites, e as águas prevaleceram sobre a terra por 150 dias.'
  },
  {
    id: 'num_3',
    question: 'Quantas pedras lisas Davi escolheu no ribeiro antes de enfrentar Golias?',
    correctNumber: 5,
    options: [1, 3, 5, 7],
    unitOrClue: 'pedras lisas',
    scripture: '1 Samuel 17:40',
    explanation: 'Davi escolheu cinco pedras lisas no leito do ribeiro e colocou-as na sua bolsa de pastor, embora tenha precisado de apenas uma.'
  },
  {
    id: 'num_4',
    question: 'Quantas pragas Jeová enviou sobre o Egito antes de Faraó libertar Israel?',
    correctNumber: 10,
    options: [7, 10, 12, 14],
    unitOrClue: 'pragas devastadoras',
    scripture: 'Êxodo 7 a 12',
    explanation: 'As 10 pragas desmascararam a impotência dos deuses do Egito, culminando na morte dos primogênitos.'
  },
  {
    id: 'num_5',
    question: 'Quantas vezes o exército de Israel marchou em redor de Jericó no 7º dia?',
    correctNumber: 7,
    options: [1, 3, 7, 12],
    unitOrClue: 'voltas completas',
    scripture: 'Josué 6:15',
    explanation: 'Nos primeiros 6 dias marcharam 1 vez por dia; no sétimo dia marcharam 7 vezes antes de tocarem as buzinas e as muralhas caírem.'
  },
  {
    id: 'num_6',
    question: 'Quantos apóstolos fiéis tomaram a Refeição Noturna com Jesus após a saída de Judas?',
    correctNumber: 11,
    options: [10, 11, 12, 70],
    unitOrClue: 'apóstolos leais',
    scripture: 'Mateus 26:20-30; João 13:30',
    explanation: 'Judas Iscariotes saiu durante a ceia pascal ("e era noite"); Jesus instituiu o Memorial apenas com os 11 apóstolos fiéis.'
  },
  {
    id: 'num_7',
    question: 'Quantos anos viveu Metusalém, o homem de maior longevidade registado na Bíblia?',
    correctNumber: 969,
    options: [930, 950, 969, 1000],
    unitOrClue: 'anos de idade',
    scripture: 'Gênesis 5:27',
    explanation: 'Metusalém viveu 969 anos e faleceu no mesmo ano em que veio o Dilúvio.'
  },
  {
    id: 'num_8',
    question: 'Quantos homens (além de mulheres e crianças) Jesus alimentou com 5 pães e 2 peixes?',
    correctNumber: 5000,
    options: [1000, 4000, 5000, 10000],
    unitOrClue: 'homens adultos',
    scripture: 'Mateus 14:21',
    explanation: 'Havia cerca de 5.000 homens, além de mulheres e crianças. Sobraram ainda 12 cestos cheios de pedaços.'
  }
];
