// src/data/games/armourData.ts

export interface ArmourPiece {
  id: string;
  name: string;
  iconName: string;
  biblicalPart: string;
  spiritualMeaning: string;
}

export interface AttackScenario {
  id: string;
  incomingAttack: string;
  attackDescription: string;
  correctPieceId: string;
  scriptureDefense: string;
  teaching: string;
}

export const ARMOUR_PIECES: ArmourPiece[] = [
  {
    id: 'belt',
    name: 'Cinturão da Verdade',
    iconName: 'Shield',
    biblicalPart: 'Lombos cingidos com a verdade',
    spiritualMeaning: 'A verdade das Escrituras nos dá firmeza e protege de ensinos falsos e hipocrisia.'
  },
  {
    id: 'breastplate',
    name: 'Couraça da Justiça',
    iconName: 'Heart',
    biblicalPart: 'Couraça da justiça',
    spiritualMeaning: 'Protege o coração figurativo com os padrões justos e amorosos de Jeová.'
  },
  {
    id: 'shoes',
    name: 'Calçado das Boas Novas de Paz',
    iconName: 'Footprints',
    biblicalPart: 'Pés calçados com a prontidão para pregar',
    spiritualMeaning: 'Prontidão ativa para proclamar as boas novas do Reino de Deus e partilhar a paz.'
  },
  {
    id: 'shield',
    name: 'Grande Escudo da Fé',
    iconName: 'ShieldAlert',
    biblicalPart: 'O grande escudo da fé',
    spiritualMeaning: 'Apaga todos os dardos inflamáveis da dúvida, medo, cinismo e calúnias do Inimigo.'
  },
  {
    id: 'helmet',
    name: 'Capacete da Salvação',
    iconName: 'HardHat',
    biblicalPart: 'Capacete da salvação',
    spiritualMeaning: 'Protege os pensamentos e a mente com a esperança inabalável da vida eterna e da ressurreição.'
  },
  {
    id: 'sword',
    name: 'Espada do Espírito',
    iconName: 'Sword',
    biblicalPart: 'A palavra de Deus',
    spiritualMeaning: 'A Palavra inspirada por Jeová, usada para desmascarar falsidades e defender a verdade.'
  }
];

export const ATTACK_SCENARIOS: AttackScenario[] = [
  {
    id: 'att_1',
    incomingAttack: 'Dardos da Dúvida e do Cinismo',
    attackDescription: 'O mundo tenta fazê-lo duvidar do amor leal de Jeová e das promessas do Reino vindouro.',
    correctPieceId: 'shield',
    scriptureDefense: 'Efésios 6:16: "Acima de tudo, usem o grande escudo da fé, com o qual poderão apagar todos os dardos inflamados do Maligno."',
    teaching: 'A fé fundamentada em evidências sólidas atua como um escudo intransponível contra a descrença.'
  },
  {
    id: 'att_2',
    incomingAttack: 'Ataque de Mentiras e Filosofias Enganosas',
    attackDescription: 'Propagandas e teorias humanas tentam relativizar os fatos bíblicos e a retidão divina.',
    correctPieceId: 'belt',
    scriptureDefense: 'Efésios 6:14a; João 8:32: "Conhecereis a verdade, e a verdade vos libertará."',
    teaching: 'O soldado romano usava o cinturão bem apertado para apoiar as armas e proteger o ventre; a verdade bíblica nos mantém firmes.'
  },
  {
    id: 'att_3',
    incomingAttack: 'Desânimo Mental e Medo do Futuro',
    attackDescription: 'Preocupações sombrias atacam a sua mente com pensamentos de desespero e ansiedade sobre o amanhã.',
    correctPieceId: 'helmet',
    scriptureDefense: '1 Tessalonicenses 5:8: "...tendo por capacete a esperança da salvação."',
    teaching: 'Assim como o capacete protege a cabeça física de golpes mortais, a esperança da salvação protege os nossos pensamentos.'
  },
  {
    id: 'att_4',
    incomingAttack: 'Tentação Moral e Desejos Iníquos',
    attackDescription: 'Pressões para ceder à imoralidade ou à ganância tentam seduzir os afetos e inclinações do seu coração.',
    correctPieceId: 'breastplate',
    scriptureDefense: 'Provérbios 4:23: "Proteja o seu coração mais do que qualquer outra coisa, pois dele procedem as fontes da vida."',
    teaching: 'A couraça romana protegia órgãos vitais; amar o que é justo aos olhos de Jeová protege o coração moral.'
  },
  {
    id: 'att_5',
    incomingAttack: 'Contra-argumentação Falsa sobre as Escrituras',
    attackDescription: 'Um oponente torce um texto sagrado para desorientar quem busca sinceramente a verdade.',
    correctPieceId: 'sword',
    scriptureDefense: 'Hebreus 4:12: "A palavra de Deus é viva e exerce poder, e é mais afiada do que qualquer espada de dois gumes."',
    teaching: 'A Bíblia é a nossa única arma ofensiva e defensiva; Jesus citou as Escrituras dizendo: "Está escrito!"'
  },
  {
    id: 'att_6',
    incomingAttack: 'Apatia e Medo de Testemunhar a Verdade',
    attackDescription: 'Sentimento de timidez ou vergonha para proclamar as boas novas aos vizinhos e familiares.',
    correctPieceId: 'shoes',
    scriptureDefense: 'Romanos 10:15: "Quão belos são os pés dos que declaram boas novas de coisas boas!"',
    teaching: 'O calçado romano com cravos permitia marchar com segurança em terrenos difíceis para anunciar a paz do Reino.'
  }
];
