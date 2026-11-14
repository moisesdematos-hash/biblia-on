// src/data/verseBuilderData.ts

export interface VersePuzzle {
  id: string;
  reference: string;
  theme: string;
  fullVerseText: string;
  wordsInOrder: string[]; // Versículo ordenado em palavras ou pequenos blocos
  distractorWords?: string[]; // 2 ou 3 palavras falsas que não entram no versículo para dar desafio
  difficulty: 'facil' | 'medio' | 'desafio';
}

export const VERSE_PUZZLES: VersePuzzle[] = [
  {
    id: 'psa_83_18',
    reference: 'Salmo 83:18',
    theme: 'O Nome Divino Soberano',
    fullVerseText: 'Para que as pessoas saibam que tu, cujo nome é Jeová, somente tu és o Altíssimo sobre toda a terra.',
    wordsInOrder: [
      'Para que',
      'as pessoas',
      'saibam que tu,',
      'cujo nome',
      'é Jeová,',
      'somente tu',
      'és o Altíssimo',
      'sobre toda',
      'a terra.'
    ],
    distractorWords: ['SENHOR', 'Senhorio'],
    difficulty: 'facil'
  },
  {
    id: 'pro_3_5_6',
    reference: 'Provérbios 3:5, 6',
    theme: 'Confiança Inabalável em Deus',
    fullVerseText: 'Confia em Jeová de todo o teu coração e não te estribes na tua própria inteligência. Lembra-te dele em todos os teus caminhos, e ele endireitará as tuas veredas.',
    wordsInOrder: [
      'Confia em Jeová',
      'de todo o teu coração',
      'e não te estribes',
      'na tua própria inteligência.',
      'Lembra-te dele',
      'em todos os teus caminhos,',
      'e ele endireitará',
      'as tuas veredas.'
    ],
    distractorWords: ['força', 'riquezas'],
    difficulty: 'medio'
  },
  {
    id: 'jhn_17_3',
    reference: 'João 17:3',
    theme: 'A Estrada para a Vida Eterna',
    fullVerseText: 'Isto significa vida eterna: que te conheçam a ti, o único Deus verdadeiro, e àquele que enviaste, Jesus Cristo.',
    wordsInOrder: [
      'Isto significa',
      'vida eterna:',
      'que te conheçam',
      'a ti,',
      'o único Deus verdadeiro,',
      'e àquele',
      'que enviaste,',
      'Jesus Cristo.'
    ],
    distractorWords: ['trindade', 'mistério'],
    difficulty: 'facil'
  },
  {
    id: 'ecc_9_5',
    reference: 'Eclesiastes 9:5',
    theme: 'A Verdade sobre o Estado dos Mortos',
    fullVerseText: 'Pois os vivos sabem que hão de morrer, mas os mortos não sabem absolutamente nada.',
    wordsInOrder: [
      'Pois os vivos',
      'sabem que',
      'hão de morrer,',
      'mas os mortos',
      'não sabem',
      'absolutamente nada.'
    ],
    distractorWords: ['sofrem', 'queimam'],
    difficulty: 'facil'
  },
  {
    id: 'isa_40_31',
    reference: 'Isaías 40:31',
    theme: 'Forças Renováveis de Jeová',
    fullVerseText: 'Mas os que esperam em Jeová recuperarão as forças. Voarão bem alto com asas como as águias. Correrão e não ficarão exaustos; caminharão e não se cansarão.',
    wordsInOrder: [
      'Mas os que esperam',
      'em Jeová',
      'recuperarão as forças.',
      'Voarão bem alto',
      'com asas',
      'como as águias.',
      'Correrão e não',
      'ficarão exaustos;',
      'caminharão e não',
      'se cansarão.'
    ],
    distractorWords: ['dormirão', 'desfalecerão'],
    difficulty: 'medio'
  },
  {
    id: 'rev_21_4',
    reference: 'Apocalipse 21:4',
    theme: 'O Fim da Morte e do Sofrimento',
    fullVerseText: 'Ele enxugará dos seus olhos toda lágrima, e não haverá mais morte, nem haverá mais tristeza, nem choro, nem dor. As coisas anteriores já passaram.',
    wordsInOrder: [
      'Ele enxugará',
      'dos seus olhos',
      'toda lágrima,',
      'e não haverá',
      'mais morte,',
      'nem haverá mais tristeza,',
      'nem choro,',
      'nem dor.',
      'As coisas anteriores',
      'já passaram.'
    ],
    distractorWords: ['fogo', 'castigo'],
    difficulty: 'medio'
  },
  {
    id: 'jos_1_8',
    reference: 'Josué 1:8',
    theme: 'O Segredo do Verdadeiro Sucesso',
    fullVerseText: 'Não se afaste da tua boca este livro da Lei; deves ler nele em voz baixa dia e noite, a fim de obedecer cuidadosamente a tudo o que está escrito nele; pois assim serás bem-sucedido no teu caminho e agirás sabiamente.',
    wordsInOrder: [
      'Não se afaste',
      'da tua boca',
      'este livro da Lei;',
      'deves ler nele',
      'em voz baixa',
      'dia e noite,',
      'a fim de obedecer',
      'cuidadosamente a tudo',
      'o que está escrito nele;',
      'pois assim',
      'serás bem-sucedido',
      'no teu caminho',
      'e agirás sabiamente.'
    ],
    distractorWords: ['tradição', 'filosofia'],
    difficulty: 'desafio'
  },
  {
    id: 'mic_6_8',
    reference: 'Miqueias 6:8',
    theme: 'O Que Jeová Pede de Nós',
    fullVerseText: 'Ele declarou-te, ó homem, o que é bom. E o que Jeová pede de ti senão que pratiques a justiça, ames a lealdade e andes modestamente com o teu Deus?',
    wordsInOrder: [
      'Ele declarou-te,',
      'ó homem,',
      'o que é bom.',
      'E o que Jeová',
      'pede de ti senão',
      'que pratiques a justiça,',
      'ames a lealdade',
      'e andes modestamente',
      'com o teu Deus?'
    ],
    distractorWords: ['orgulho', 'riqueza'],
    difficulty: 'medio'
  }
];
