// src/data/bibleBooks.ts
import type { BibleBook } from '../types';

export const BIBLE_BOOKS: BibleBook[] = [
  // PENTATEUCO
  { id: 'gen', name: 'Gênesis', testament: 'antigo', division: 'pentateuco', chaptersCount: 50, abbreviation: 'Gên', order: 1, author: 'Moisés', writtenPeriod: 'c. 1513 a.C.' },
  { id: 'exo', name: 'Êxodo', testament: 'antigo', division: 'pentateuco', chaptersCount: 40, abbreviation: 'Êxo', order: 2, author: 'Moisés', writtenPeriod: 'c. 1512 a.C.' },
  { id: 'lev', name: 'Levítico', testament: 'antigo', division: 'pentateuco', chaptersCount: 27, abbreviation: 'Lev', order: 3, author: 'Moisés', writtenPeriod: 'c. 1512 a.C.' },
  { id: 'num', name: 'Números', testament: 'antigo', division: 'pentateuco', chaptersCount: 36, abbreviation: 'Núm', order: 4, author: 'Moisés', writtenPeriod: 'c. 1473 a.C.' },
  { id: 'deu', name: 'Deuteronômio', testament: 'antigo', division: 'pentateuco', chaptersCount: 34, abbreviation: 'Deu', order: 5, author: 'Moisés', writtenPeriod: 'c. 1473 a.C.' },

  // HISTÓRICOS
  { id: 'jos', name: 'Josué', testament: 'antigo', division: 'historicos', chaptersCount: 24, abbreviation: 'Jos', order: 6, author: 'Josué', writtenPeriod: 'c. 1450 a.C.' },
  { id: 'jdg', name: 'Juízes', testament: 'antigo', division: 'historicos', chaptersCount: 21, abbreviation: 'Juí', order: 7, author: 'Samuel', writtenPeriod: 'c. 1100 a.C.' },
  { id: 'rut', name: 'Rute', testament: 'antigo', division: 'historicos', chaptersCount: 4, abbreviation: 'Rut', order: 8, author: 'Samuel', writtenPeriod: 'c. 1090 a.C.' },
  { id: '1sa', name: '1 Samuel', testament: 'antigo', division: 'historicos', chaptersCount: 31, abbreviation: '1 Sam', order: 9, author: 'Samuel; Gade; Natã', writtenPeriod: 'c. 1078 a.C.' },
  { id: '2sa', name: '2 Samuel', testament: 'antigo', division: 'historicos', chaptersCount: 24, abbreviation: '2 Sam', order: 10, author: 'Gade; Natã', writtenPeriod: 'c. 1040 a.C.' },
  { id: '1ki', name: '1 Reis', testament: 'antigo', division: 'historicos', chaptersCount: 22, abbreviation: '1 Reis', order: 11, author: 'Jeremias', writtenPeriod: 'c. 580 a.C.' },
  { id: '2ki', name: '2 Reis', testament: 'antigo', division: 'historicos', chaptersCount: 25, abbreviation: '2 Reis', order: 12, author: 'Jeremias', writtenPeriod: 'c. 580 a.C.' },
  { id: '1ch', name: '1 Crônicas', testament: 'antigo', division: 'historicos', chaptersCount: 29, abbreviation: '1 Crô', order: 13, author: 'Esdras', writtenPeriod: 'c. 460 a.C.' },
  { id: '2ch', name: '2 Crônicas', testament: 'antigo', division: 'historicos', chaptersCount: 36, abbreviation: '2 Crô', order: 14, author: 'Esdras', writtenPeriod: 'c. 460 a.C.' },
  { id: 'ezr', name: 'Esdras', testament: 'antigo', division: 'historicos', chaptersCount: 10, abbreviation: 'Esd', order: 15, author: 'Esdras', writtenPeriod: 'c. 460 a.C.' },
  { id: 'neh', name: 'Neemias', testament: 'antigo', division: 'historicos', chaptersCount: 13, abbreviation: 'Nee', order: 16, author: 'Neemias', writtenPeriod: 'c. 443 a.C.' },
  { id: 'est', name: 'Ester', testament: 'antigo', division: 'historicos', chaptersCount: 10, abbreviation: 'Est', order: 17, author: 'Mordecai', writtenPeriod: 'c. 475 a.C.' },

  // POÉTICOS
  { id: 'job', name: 'Jó', testament: 'antigo', division: 'poeticos', chaptersCount: 42, abbreviation: 'Jó', order: 18, author: 'Moisés', writtenPeriod: 'c. 1473 a.C.' },
  { id: 'psa', name: 'Salmos', testament: 'antigo', division: 'poeticos', chaptersCount: 150, abbreviation: 'Sal', order: 19, author: 'David e outros', writtenPeriod: 'c. 460 a.C.' },
  { id: 'pro', name: 'Provérbios', testament: 'antigo', division: 'poeticos', chaptersCount: 31, abbreviation: 'Pro', order: 20, author: 'Salomão e outros', writtenPeriod: 'c. 717 a.C.' },
  { id: 'ecc', name: 'Eclesiastes', testament: 'antigo', division: 'poeticos', chaptersCount: 12, abbreviation: 'Ecl', order: 21, author: 'Salomão', writtenPeriod: 'c. 1000 a.C.' },
  { id: 'sng', name: 'Cântico de Salomão', testament: 'antigo', division: 'poeticos', chaptersCount: 8, abbreviation: 'Cân', order: 22, author: 'Salomão', writtenPeriod: 'c. 1020 a.C.' },

  // PROFÉTICOS
  { id: 'isa', name: 'Isaías', testament: 'antigo', division: 'profeticos', chaptersCount: 66, abbreviation: 'Isa', order: 23, author: 'Isaías', writtenPeriod: 'c. 732 a.C.' },
  { id: 'jer', name: 'Jeremias', testament: 'antigo', division: 'profeticos', chaptersCount: 52, abbreviation: 'Jer', order: 24, author: 'Jeremias', writtenPeriod: 'c. 580 a.C.' },
  { id: 'lam', name: 'Lamentações', testament: 'antigo', division: 'profeticos', chaptersCount: 5, abbreviation: 'Lam', order: 25, author: 'Jeremias', writtenPeriod: 'c. 607 a.C.' },
  { id: 'ezk', name: 'Ezequiel', testament: 'antigo', division: 'profeticos', chaptersCount: 48, abbreviation: 'Eze', order: 26, author: 'Ezequiel', writtenPeriod: 'c. 591 a.C.' },
  { id: 'dan', name: 'Daniel', testament: 'antigo', division: 'profeticos', chaptersCount: 12, abbreviation: 'Dan', order: 27, author: 'Daniel', writtenPeriod: 'c. 536 a.C.' },
  { id: 'hos', name: 'Oseias', testament: 'antigo', division: 'profeticos', chaptersCount: 14, abbreviation: 'Ose', order: 28, author: 'Oseias', writtenPeriod: 'c. 745 a.C.' },
  { id: 'joe', name: 'Joel', testament: 'antigo', division: 'profeticos', chaptersCount: 3, abbreviation: 'Joe', order: 29, author: 'Joel', writtenPeriod: 'c. 820 a.C.' },
  { id: 'amo', name: 'Amós', testament: 'antigo', division: 'profeticos', chaptersCount: 9, abbreviation: 'Amó', order: 30, author: 'Amós', writtenPeriod: 'c. 804 a.C.' },
  { id: 'oba', name: 'Obadias', testament: 'antigo', division: 'profeticos', chaptersCount: 1, abbreviation: 'Oba', order: 31, author: 'Obadias', writtenPeriod: 'c. 607 a.C.' },
  { id: 'jon', name: 'Jonas', testament: 'antigo', division: 'profeticos', chaptersCount: 4, abbreviation: 'Jon', order: 32, author: 'Jonas', writtenPeriod: 'c. 844 a.C.' },
  { id: 'mic', name: 'Miqueias', testament: 'antigo', division: 'profeticos', chaptersCount: 7, abbreviation: 'Miq', order: 33, author: 'Miqueias', writtenPeriod: 'c. 717 a.C.' },
  { id: 'nah', name: 'Naum', testament: 'antigo', division: 'profeticos', chaptersCount: 3, abbreviation: 'Nau', order: 34, author: 'Naum', writtenPeriod: 'c. 632 a.C.' },
  { id: 'hab', name: 'Habacuque', testament: 'antigo', division: 'profeticos', chaptersCount: 3, abbreviation: 'Hab', order: 35, author: 'Habacuque', writtenPeriod: 'c. 628 a.C.' },
  { id: 'zep', name: 'Sofonias', testament: 'antigo', division: 'profeticos', chaptersCount: 3, abbreviation: 'Sof', order: 36, author: 'Sofonias', writtenPeriod: 'c. 648 a.C.' },
  { id: 'hag', name: 'Ageu', testament: 'antigo', division: 'profeticos', chaptersCount: 2, abbreviation: 'Age', order: 37, author: 'Ageu', writtenPeriod: '520 a.C.' },
  { id: 'zec', name: 'Zacarias', testament: 'antigo', division: 'profeticos', chaptersCount: 14, abbreviation: 'Zac', order: 38, author: 'Zacarias', writtenPeriod: '518 a.C.' },
  { id: 'mal', name: 'Malaquias', testament: 'antigo', division: 'profeticos', chaptersCount: 4, abbreviation: 'Mal', order: 39, author: 'Malaquias', writtenPeriod: 'c. 443 a.C.' },

  // EVANGELHOS
  { id: 'mat', name: 'Mateus', testament: 'novo', division: 'evangelhos', chaptersCount: 28, abbreviation: 'Mat', order: 40, author: 'Mateus', writtenPeriod: 'c. 41 d.C.' },
  { id: 'mrk', name: 'Marcos', testament: 'novo', division: 'evangelhos', chaptersCount: 16, abbreviation: 'Mar', order: 41, author: 'Marcos', writtenPeriod: 'c. 60-65 d.C.' },
  { id: 'luk', name: 'Lucas', testament: 'novo', division: 'evangelhos', chaptersCount: 24, abbreviation: 'Luc', order: 42, author: 'Lucas', writtenPeriod: 'c. 56-58 d.C.' },
  { id: 'jhn', name: 'João', testament: 'novo', division: 'evangelhos', chaptersCount: 21, abbreviation: 'Joã', order: 43, author: 'Apóstolo João', writtenPeriod: 'c. 98 d.C.' },

  // HISTÓRICO CRISTÃO
  { id: 'act', name: 'Atos', testament: 'novo', division: 'atos', chaptersCount: 28, abbreviation: 'Ato', order: 44, author: 'Lucas', writtenPeriod: 'c. 61 d.C.' },

  // CARTAS PAULINAS
  { id: 'rom', name: 'Romanos', testament: 'novo', division: 'cartas-paulinas', chaptersCount: 16, abbreviation: 'Rom', order: 45, author: 'Paulo', writtenPeriod: 'c. 56 d.C.' },
  { id: '1co', name: '1 Coríntios', testament: 'novo', division: 'cartas-paulinas', chaptersCount: 16, abbreviation: '1 Cor', order: 46, author: 'Paulo', writtenPeriod: 'c. 55 d.C.' },
  { id: '2co', name: '2 Coríntios', testament: 'novo', division: 'cartas-paulinas', chaptersCount: 13, abbreviation: '2 Cor', order: 47, author: 'Paulo', writtenPeriod: 'c. 55 d.C.' },
  { id: 'gal', name: 'Gálatas', testament: 'novo', division: 'cartas-paulinas', chaptersCount: 6, abbreviation: 'Gál', order: 48, author: 'Paulo', writtenPeriod: 'c. 50-52 d.C.' },
  { id: 'eph', name: 'Efésios', testament: 'novo', division: 'cartas-paulinas', chaptersCount: 6, abbreviation: 'Efé', order: 49, author: 'Paulo', writtenPeriod: 'c. 60-61 d.C.' },
  { id: 'php', name: 'Filipenses', testament: 'novo', division: 'cartas-paulinas', chaptersCount: 4, abbreviation: 'Fil', order: 50, author: 'Paulo', writtenPeriod: 'c. 60-61 d.C.' },
  { id: 'col', name: 'Colossenses', testament: 'novo', division: 'cartas-paulinas', chaptersCount: 4, abbreviation: 'Col', order: 51, author: 'Paulo', writtenPeriod: 'c. 60-61 d.C.' },
  { id: '1th', name: '1 Tessalonicenses', testament: 'novo', division: 'cartas-paulinas', chaptersCount: 5, abbreviation: '1 Tes', order: 52, author: 'Paulo', writtenPeriod: 'c. 50 d.C.' },
  { id: '2th', name: '2 Tessalonicenses', testament: 'novo', division: 'cartas-paulinas', chaptersCount: 3, abbreviation: '2 Tes', order: 53, author: 'Paulo', writtenPeriod: 'c. 51 d.C.' },
  { id: '1ti', name: '1 Timóteo', testament: 'novo', division: 'cartas-paulinas', chaptersCount: 6, abbreviation: '1 Tim', order: 54, author: 'Paulo', writtenPeriod: 'c. 61-64 d.C.' },
  { id: '2ti', name: '2 Timóteo', testament: 'novo', division: 'cartas-paulinas', chaptersCount: 4, abbreviation: '2 Tim', order: 55, author: 'Paulo', writtenPeriod: 'c. 65 d.C.' },
  { id: 'tit', name: 'Tito', testament: 'novo', division: 'cartas-paulinas', chaptersCount: 3, abbreviation: 'Tit', order: 56, author: 'Paulo', writtenPeriod: 'c. 61-64 d.C.' },
  { id: 'phm', name: 'Filêmon', testament: 'novo', division: 'cartas-paulinas', chaptersCount: 1, abbreviation: 'Flm', order: 57, author: 'Paulo', writtenPeriod: 'c. 60-61 d.C.' },
  { id: 'heb', name: 'Hebreus', testament: 'novo', division: 'cartas-paulinas', chaptersCount: 13, abbreviation: 'Heb', order: 58, author: 'Paulo', writtenPeriod: 'c. 61 d.C.' },

  // CARTAS GERAIS
  { id: 'jas', name: 'Tiago', testament: 'novo', division: 'cartas-gerais', chaptersCount: 5, abbreviation: 'Tia', order: 59, author: 'Tiago', writtenPeriod: 'c. 62 d.C.' },
  { id: '1pe', name: '1 Pedro', testament: 'novo', division: 'cartas-gerais', chaptersCount: 5, abbreviation: '1 Ped', order: 60, author: 'Pedro', writtenPeriod: 'c. 62-64 d.C.' },
  { id: '2pe', name: '2 Pedro', testament: 'novo', division: 'cartas-gerais', chaptersCount: 3, abbreviation: '2 Ped', order: 61, author: 'Pedro', writtenPeriod: 'c. 64 d.C.' },
  { id: '1jn', name: '1 João', testament: 'novo', division: 'cartas-gerais', chaptersCount: 5, abbreviation: '1 Joã', order: 62, author: 'João', writtenPeriod: 'c. 98 d.C.' },
  { id: '2jn', name: '2 João', testament: 'novo', division: 'cartas-gerais', chaptersCount: 1, abbreviation: '2 Joã', order: 63, author: 'João', writtenPeriod: 'c. 98 d.C.' },
  { id: '3jn', name: '3 João', testament: 'novo', division: 'cartas-gerais', chaptersCount: 1, abbreviation: '3 Joã', order: 64, author: 'João', writtenPeriod: 'c. 98 d.C.' },
  { id: 'jud', name: 'Judas', testament: 'novo', division: 'cartas-gerais', chaptersCount: 1, abbreviation: 'Jud', order: 65, author: 'Judas', writtenPeriod: 'c. 65 d.C.' },

  // APOCALIPSE
  { id: 'rev', name: 'Apocalipse', testament: 'novo', division: 'apocalipse', chaptersCount: 22, abbreviation: 'Apo', order: 66, author: 'João', writtenPeriod: 'c. 96 d.C.' }
];

export const BIBLE_DIVISIONS = [
  { id: 'pentateuco', label: 'Pentateuco / Lei', testament: 'antigo' },
  { id: 'historicos', label: 'Livros Históricos', testament: 'antigo' },
  { id: 'poeticos', label: 'Poéticos e Sabedoria', testament: 'antigo' },
  { id: 'profeticos', label: 'Livros Proféticos', testament: 'antigo' },
  { id: 'evangelhos', label: 'Evangelhos', testament: 'novo' },
  { id: 'atos', label: 'Histórico Cristão (Atos)', testament: 'novo' },
  { id: 'cartas-paulinas', label: 'Cartas de Paulo', testament: 'novo' },
  { id: 'cartas-gerais', label: 'Cartas Gerais', testament: 'novo' },
  { id: 'apocalipse', label: 'Profecia (Apocalipse)', testament: 'novo' }
];
