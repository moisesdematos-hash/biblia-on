// src/data/games/bibleMapData.ts

export interface BibleLocationItem {
  id: string;
  locationName: string;
  regionOrEmpire: string;
  geographicalClue: string;
  historicEvent: string;
  options: string[];
  scripture: string;
  modernLocation: string;
}

export const BIBLE_LOCATIONS: BibleLocationItem[] = [
  {
    id: 'loc_1',
    locationName: 'Monte Sinai (Horebe)',
    regionOrEmpire: 'Península do Sinai / Arábia',
    geographicalClue: 'Montanha escarpada cercada por deserto rochoso onde relâmpagos e fogo desceram do céu.',
    historicEvent: 'Onde Moisés recebeu a Lei e os Dez Mandamentos escritos em tábuas de pedra pelas mãos de Jeová.',
    options: ['Monte Sinai (Horebe)', 'Monte Carmelo', 'Monte Hermom', 'Monte Nebo'],
    scripture: 'Êxodo 19:16-20; 24:12',
    modernLocation: 'Região montanhosa na Península do Sinai'
  },
  {
    id: 'loc_2',
    locationName: 'Ur dos Caldeus',
    regionOrEmpire: 'Mesopotâmia (Babilónia antiga)',
    geographicalClue: 'Próspera cidade comercial localizada perto do rio Eufrates e do Golfo Pérsico.',
    historicEvent: 'A terra natal abastada que Abraão abandonou pela fé quando Jeová lhe disse para ir para uma terra desconhecida.',
    options: ['Ur dos Caldeus', 'Nínive', 'Damasco', 'Tiro'],
    scripture: 'Gênesis 11:31; 12:1; Hebreus 11:8',
    modernLocation: 'Sul do atual Iraque (Tell el-Mukayyar)'
  },
  {
    id: 'loc_3',
    locationName: 'Mar da Galileia (Lago Quinerete)',
    regionOrEmpire: 'Galileia (Norte de Israel)',
    geographicalClue: 'Lago de água doce em forma de harpa, cercado por colinas a cerca de 210 metros abaixo do nível do mar.',
    historicEvent: 'Onde Jesus andou sobre as águas, acalmou uma terrível tempestade e chamou os pescadores para serem pescadores de homens.',
    options: ['Mar da Galileia', 'Mar Morto', 'Mar Vermelho', 'Rio Eufrates'],
    scripture: 'Mateus 4:18-22; 8:23-27; 14:25',
    modernLocation: 'Lago de Tiberíades, Norte de Israel'
  },
  {
    id: 'loc_4',
    locationName: 'Damasco',
    regionOrEmpire: 'Síria antiga',
    geographicalClue: 'Oásis fértil regado pelos rios Abana e Farfar, uma das cidades habitadas mais antigas do mundo.',
    historicEvent: 'Na estrada que leva a esta cidade, Saulo de Tarso foi cegado por uma luz celestial e teve um encontro com o Cristo glorificado.',
    options: ['Damasco', 'Antioquia', 'Éfeso', 'Atenas'],
    scripture: 'Atos 9:1-9; 2 Coríntios 11:32',
    modernLocation: 'Capital da atual Síria'
  },
  {
    id: 'loc_5',
    locationName: 'Ilha de Patmos',
    regionOrEmpire: 'Mar Egeu (Província romana da Ásia)',
    geographicalClue: 'Pequena ilha rochosa e vulcânica no Mar Egeu utilizada por Roma como colônia penal.',
    historicEvent: 'O apóstolo João foi exilado aqui por proclamar a palavra de Deus e recebeu a majestosa visão do Apocalipse.',
    options: ['Ilha de Patmos', 'Ilha de Creta', 'Ilha de Chipre', 'Ilha de Malta'],
    scripture: 'Apocalipse 1:9',
    modernLocation: 'Ilha grega de Patmos, Mar Egeu'
  },
  {
    id: 'loc_6',
    locationName: 'Jericó',
    regionOrEmpire: 'Vale do Rio Jordão',
    geographicalClue: 'Cidade das palmeiras fortificada situada a cerca de 250 metros abaixo do nível do mar ao norte do Mar Salgado.',
    historicEvent: 'A primeira cidade cananeia a ser conquistada por Israel após as suas gigantescas muralhas desmoronarem milagrosamente.',
    options: ['Jericó', 'Hebrom', 'Siquém', 'Gate'],
    scripture: 'Josué 6:1-20; Deuteronômio 34:3',
    modernLocation: 'Tell es-Sultan, Cisjordânia'
  }
];
