// src/data/games/timelineData.ts

export interface TimelineEvent {
  id: string;
  title: string;
  approxYear: string;
  numericOrder: number; // Para validação da ordem cronológica
  era: 'antiga' | 'patriarcas' | 'exodo' | 'reis' | 'exilio' | 'crista';
  description: string;
  scripture: string;
  fact: string;
}

export interface TimelineRound {
  id: string;
  title: string;
  events: TimelineEvent[];
}

export const TIMELINE_ROUNDS: TimelineRound[] = [
  {
    id: 'round_1',
    title: 'Da Criação aos Patriarcas',
    events: [
      {
        id: 'ev_1',
        title: 'Criação de Adão e Eva',
        approxYear: '4026 a.C.',
        numericOrder: 1,
        era: 'antiga',
        description: 'Jeová cria o primeiro casal humano no Jardim do Éden.',
        scripture: 'Gênesis 1:26-28; 2:7',
        fact: 'Adão viveu 930 anos e foi pai de muitas gerações.'
      },
      {
        id: 'ev_2',
        title: 'O Dilúvio Global',
        approxYear: '2370 a.C.',
        numericOrder: 2,
        era: 'antiga',
        description: 'As águas cobrem toda a terra; Noé e a sua família sobrevivem na Arca.',
        scripture: 'Gênesis 7:11-24',
        fact: 'Choveu durante 40 dias e 40 noites consecutivas.'
      },
      {
        id: 'ev_3',
        title: 'Confusão das Línguas em Babel',
        approxYear: 'c. 2269 a.C.',
        numericOrder: 3,
        era: 'antiga',
        description: 'Jeová confunde a linguagem dos homens rebeldes liderados por Ninrode.',
        scripture: 'Gênesis 11:1-9',
        fact: 'Os povos foram espalhados por toda a superfície da Terra.'
      },
      {
        id: 'ev_4',
        title: 'Pacto Abraâmico e Saída de Harã',
        approxYear: '1943 a.C.',
        numericOrder: 4,
        era: 'patriarcas',
        description: 'Abraão cruza o Eufrates rumo à terra prometida de Canaã.',
        scripture: 'Gênesis 12:1-4; Gálatas 3:17',
        fact: 'Este acontecimento marcou o início dos 430 anos até o Êxodo.'
      }
    ]
  },
  {
    id: 'round_2',
    title: 'Do Êxodo à Monarquia',
    events: [
      {
        id: 'ev_5',
        title: 'O Êxodo do Egito',
        approxYear: '1513 a.C.',
        numericOrder: 5,
        era: 'exodo',
        description: 'Israel sai do Egito após as 10 pragas e cruza o Mar Vermelho a seco.',
        scripture: 'Êxodo 12:40, 41; 14:21',
        fact: 'A primeira Páscoa foi celebrada na noite anterior à partida.'
      },
      {
        id: 'ev_6',
        title: 'Queda das Muralhas de Jericó',
        approxYear: '1473 a.C.',
        numericOrder: 6,
        era: 'exodo',
        description: 'Sob a liderança de Josué, Israel marcha ao redor da cidade e os muros caem.',
        scripture: 'Josué 6:1-20',
        fact: 'A casa de Raabe na muralha foi a única preservada.'
      },
      {
        id: 'ev_7',
        title: 'Davi Torna-se Rei de Todo o Israel',
        approxYear: '1070 a.C.',
        numericOrder: 7,
        era: 'reis',
        description: 'Davi é ungido em Hebrom e mais tarde estabelece Jerusalém como capital.',
        scripture: '2 Samuel 5:1-7',
        fact: 'Davi reinou por 40 anos: 7 em Hebrom e 33 em Jerusalém.'
      },
      {
        id: 'ev_8',
        title: 'Inauguração do Templo de Salomão',
        approxYear: '1026 a.C.',
        numericOrder: 8,
        era: 'reis',
        description: 'Salomão dedica o glorioso templo em Jerusalém com a glória de Jeová descendo.',
        scripture: '1 Reis 8:1-11',
        fact: 'O templo levou 7 anos e meio para ser edificado.'
      }
    ]
  },
  {
    id: 'round_3',
    title: 'Do Exílio à Era Apostólica',
    events: [
      {
        id: 'ev_9',
        title: 'Destruição de Jerusalém por Nabucodonosor',
        approxYear: '607 a.C.',
        numericOrder: 9,
        era: 'exilio',
        description: 'O exército babilónico queima o templo e leva os judeus cativos para Babilónia.',
        scripture: '2 Reis 25:1-11; Jeremias 25:11',
        fact: 'Iniciou-se o período de 70 anos de desolação predito por Jeremias.'
      },
      {
        id: 'ev_10',
        title: 'Decreto de Ciro e Retorno dos Exilados',
        approxYear: '537 a.C.',
        numericOrder: 10,
        era: 'exilio',
        description: 'Ciro, o Persa, autoriza os judeus a regressar e reconstruir o templo de Jeová.',
        scripture: 'Esdras 1:1-4; Isaías 45:1',
        fact: 'Isaías profetizou Ciro pelo nome cerca de 150 anos antes de ele nascer.'
      },
      {
        id: 'ev_11',
        title: 'Batismo de Jesus no Rio Jordão',
        approxYear: '29 d.C.',
        numericOrder: 11,
        era: 'crista',
        description: 'Jesus é batizado por João Batista e ungido com espírito santo como Messias.',
        scripture: 'Mateus 3:13-17; Lucas 3:21-23',
        fact: 'Jesus tinha cerca de 30 anos ao iniciar o seu ministério terrestre.'
      },
      {
        id: 'ev_12',
        title: 'Derramamento do Espírito Santo no Pentecostes',
        approxYear: '33 d.C.',
        numericOrder: 12,
        era: 'crista',
        description: 'Cerca de 120 discípulos recebem o espírito santo no cenáculo em Jerusalém.',
        scripture: 'Atos 2:1-4',
        fact: 'Cerca de 3.000 almas foram batizadas naquele mesmo dia.'
      }
    ]
  }
];
