// src/data/bibleVerses.ts
import type { BibleVerse } from '../types';

export const SAMPLE_VERSES: BibleVerse[] = [
  // GÊNESIS
  {
    id: 'gen_1_1',
    bookId: 'gen',
    bookName: 'Gênesis',
    chapter: 1,
    verse: 1,
    text: 'No princípio Deus criou os céus e a terra.',
    translation: 'TNM',
    crossReferences: ['psa_104_24', 'isa_40_26', 'jhn_1_1']
  },
  {
    id: 'gen_2_7',
    bookId: 'gen',
    bookName: 'Gênesis',
    chapter: 2,
    verse: 7,
    text: 'E Jeová Deus passou a formar o homem do pó do solo e a soprar nas suas narinas o fôlego de vida, e o homem tornou-se uma alma vivente.',
    translation: 'TNM',
    footnotes: ['"alma": hebraico né·fesh. O texto indica que o homem tornou-se uma alma, não que recebeu uma alma imortal.'],
    crossReferences: ['1co_15_45', 'ecc_9_5']
  },
  {
    id: 'gen_3_15',
    bookId: 'gen',
    bookName: 'Gênesis',
    chapter: 3,
    verse: 15,
    text: 'E porei inimizade entre ti e a mulher, e entre o teu descendente e o descendente dela. Ele te machucará a cabeça, e tu lhe machucarás o calcanhar.',
    translation: 'TNM',
    footnotes: ['Primeira profecia messiânica das Escrituras (Protoevangelho).'],
    crossReferences: ['rom_16_20', 'rev_12_9']
  },
  {
    id: 'gen_14_18',
    bookId: 'gen',
    bookName: 'Gênesis',
    chapter: 14,
    verse: 18,
    text: 'E Melquisedeque, rei de Salém, trouxe pão e vinho; ele era sacerdote do Deus Altíssimo.',
    translation: 'TNM',
    crossReferences: ['psa_110_4', 'heb_7_1', 'heb_7_17']
  },

  // ÊXODO
  {
    id: 'exo_3_14',
    bookId: 'exo',
    bookName: 'Êxodo',
    chapter: 3,
    verse: 14,
    text: 'Então Deus disse a Moisés: "EU ME TORNAREI O QUE EU DECIDIR ME TORNAR." E acrescentou: "Isto é o que deves dizer aos israelitas: \'EU ME TORNAREI enviou-me a vós.\'"',
    translation: 'TNM',
    footnotes: ['Hebraico: Eh·yéh Ashér Eh·yéh, indicando propósito dinâmico e realização infalível.'],
    crossReferences: ['isa_43_10']
  },
  {
    id: 'exo_20_3',
    bookId: 'exo',
    bookName: 'Êxodo',
    chapter: 20,
    verse: 3,
    text: 'Não deves ter outros deuses além de mim.',
    translation: 'TNM',
    crossReferences: ['deu_6_4', 'mat_4_10']
  },

  // SALMOS
  {
    id: 'psa_83_18',
    bookId: 'psa',
    bookName: 'Salmos',
    chapter: 83,
    verse: 18,
    text: 'Para que as pessoas saibam que tu, cujo nome é Jeová, somente tu és o Altíssimo sobre toda a terra.',
    translation: 'TNM',
    crossReferences: ['isa_42_8', 'exo_6_3']
  },
  {
    id: 'psa_110_1',
    bookId: 'psa',
    bookName: 'Salmos',
    chapter: 110,
    verse: 1,
    text: 'Jeová declarou ao meu Senhor: "Senta-te à minha direita, até que eu ponha os teus inimigos como escabelo para os teus pés."',
    translation: 'TNM',
    crossReferences: ['mat_22_44', 'act_2_34', 'heb_1_13']
  },
  {
    id: 'psa_110_4',
    bookId: 'psa',
    bookName: 'Salmos',
    chapter: 110,
    verse: 4,
    text: 'Jeová jurou e não mudará de ideia: "Tu és sacerdote para sempre à maneira de Melquisedeque!"',
    translation: 'TNM',
    crossReferences: ['gen_14_18', 'heb_5_6', 'heb_7_17']
  },
  {
    id: 'psa_146_4',
    bookId: 'psa',
    bookName: 'Salmos',
    chapter: 146,
    verse: 4,
    text: 'Sai-lhe o espírito, ele volta ao solo; nesse mesmo dia perecem os seus pensamentos.',
    translation: 'TNM',
    footnotes: ['Mostra claramente o estado inconsciente do ser humano na morte.'],
    crossReferences: ['ecc_9_5', 'ecc_9_10']
  },

  // PROVÉRBIOS
  {
    id: 'pro_3_5',
    bookId: 'pro',
    bookName: 'Provérbios',
    chapter: 3,
    verse: 5,
    text: 'Confia em Jeová de todo o teu coração e não te estribes na tua própria inteligência.',
    translation: 'TNM',
    crossReferences: ['psa_37_5', 'jer_17_7']
  },
  {
    id: 'pro_8_22',
    bookId: 'pro',
    bookName: 'Provérbios',
    chapter: 8,
    verse: 22,
    text: 'Jeová produziu-me como o princípio do seu caminho, a mais antiga das suas realizações de há muito.',
    translation: 'TNM',
    footnotes: ['Sabedoria personificada, aplicada nas Escrituras Cristãs a Cristo como primogênito de toda a criação.'],
    crossReferences: ['col_1_15', 'rev_3_14']
  },

  // ECLESIASTES
  {
    id: 'ecc_9_5',
    bookId: 'ecc',
    bookName: 'Eclesiastes',
    chapter: 9,
    verse: 5,
    text: 'Pois os vivos sabem que hão de morrer, mas os mortos não sabem absolutamente nada, nem têm mais recompensa, porque a sua memória caiu no esquecimento.',
    translation: 'TNM',
    crossReferences: ['ecc_9_10', 'psa_146_4', 'jhn_11_11']
  },
  {
    id: 'ecc_9_10',
    bookId: 'ecc',
    bookName: 'Eclesiastes',
    chapter: 9,
    verse: 10,
    text: 'Tudo o que a tua mão achar para fazer, faze-o com toda a tua força, pois não há trabalho, nem planejamento, nem conhecimento, nem sabedoria na Sepultura, o lugar para onde vais.',
    translation: 'TNM',
    footnotes: ['"Sepultura": hebraico Sheol, a sepultura comum da humanidade.'],
    crossReferences: ['psa_6_5', 'isa_38_18']
  },

  // ISAÍAS
  {
    id: 'isa_40_26',
    bookId: 'isa',
    bookName: 'Isaías',
    chapter: 40,
    verse: 26,
    text: 'Levantai os olhos para o alto e vede: Quem criou estas coisas? É Aquele que faz sair o exército delas por número; ele chama a todas elas por nome.',
    translation: 'TNM',
    crossReferences: ['psa_147_4', 'rom_1_20']
  },
  {
    id: 'isa_53_5',
    bookId: 'isa',
    bookName: 'Isaías',
    chapter: 53,
    verse: 5,
    text: 'Mas ele foi transpassado pela nossa transgressão; foi esmagado pelos nossos erros. O castigo que nos trouxe paz estava sobre ele, e pelas suas feridas fomos curados.',
    translation: 'TNM',
    crossReferences: ['1pe_2_24', 'mat_8_17']
  },

  // DANIEL
  {
    id: 'dan_2_44',
    bookId: 'dan',
    bookName: 'Daniel',
    chapter: 2,
    verse: 44,
    text: 'E nos dias desses reis, o Deus do céu estabelecerá um reino que nunca será destruído. Esse reino não passará para nenhum outro povo. Ele esmigalhará e porá fim a todos esses reinos, e apenas ele permanecerá para sempre.',
    translation: 'TNM',
    crossReferences: ['rev_11_15', 'luk_1_33']
  },

  // MATEUS
  {
    id: 'mat_6_9',
    bookId: 'mat',
    bookName: 'Mateus',
    chapter: 6,
    verse: 9,
    text: 'Portanto, deveis orar assim: "Pai nosso, que estás nos céus, santificado seja o teu nome."',
    translation: 'TNM',
    crossReferences: ['luk_11_2', 'psa_83_18']
  },
  {
    id: 'mat_6_10',
    bookId: 'mat',
    bookName: 'Mateus',
    chapter: 6,
    verse: 10,
    text: 'Venha o teu Reino. Seja feita a tua vontade, como no céu, assim também sobre a terra.',
    translation: 'TNM',
    crossReferences: ['dan_2_44', 'rev_21_3']
  },
  {
    id: 'mat_16_24',
    bookId: 'mat',
    bookName: 'Mateus',
    chapter: 16,
    verse: 24,
    text: 'Então Jesus disse aos seus discípulos: "Se alguém quiser vir após mim, negue-se a si mesmo, apanhe a sua estaca de execução e siga-me continuamente."',
    translation: 'TNM',
    footnotes: ['Grego: staurós, referindo-se a uma estaca reta ou madeiro vertical.'],
    crossReferences: ['luk_9_23', 'gal_3_13']
  },
  {
    id: 'mat_24_14',
    bookId: 'mat',
    bookName: 'Mateus',
    chapter: 24,
    verse: 14,
    text: 'E estas boas novas do Reino serão pregadas em toda a terra habitada, em testemunho a todas as nações, e então virá o fim.',
    translation: 'TNM',
    crossReferences: ['mrk_13_10', 'rev_14_6']
  },

  // JOÃO
  {
    id: 'jhn_1_1',
    bookId: 'jhn',
    bookName: 'João',
    chapter: 1,
    verse: 1,
    text: 'No princípio era a Palavra, e a Palavra estava com o Deus, e a Palavra era um deus.',
    translation: 'TNM',
    footnotes: ['Grego: the·ós sem artigo no predicativo, indicando qualidade divina ou natureza semelhante à de Deus, distinguindo-o de ton the·ón (o Deus Todo-Poderoso).'],
    crossReferences: ['col_1_15', 'rev_19_13']
  },
  {
    id: 'jhn_3_16',
    bookId: 'jhn',
    bookName: 'João',
    chapter: 3,
    verse: 16,
    text: 'Porque Deus amou tanto o mundo, que deu o seu Filho unigênito, para que todo aquele que nele exercer fé não seja destruído, mas tenha vida eterna.',
    translation: 'TNM',
    crossReferences: ['1jn_4_9', 'rom_5_8']
  },
  {
    id: 'jhn_14_28',
    bookId: 'jhn',
    bookName: 'João',
    chapter: 14,
    verse: 28,
    text: 'Ouvistes que eu vos disse: "Vou embora e volto para vós." Se me amásseis, alegrar-vos-íeis de que vou para o Pai, porque o Pai é maior do que eu.',
    translation: 'TNM',
    crossReferences: ['1co_11_3', 'jhn_20_17', '1co_15_28']
  },
  {
    id: 'jhn_17_3',
    bookId: 'jhn',
    bookName: 'João',
    chapter: 17,
    verse: 3,
    text: 'Isto significa vida eterna: que conheçam a ti, o único Deus verdadeiro, e àquele que enviaste, Jesus Cristo.',
    translation: 'TNM',
    crossReferences: ['1co_8_6', '1ti_2_5']
  },

  // ATOS
  {
    id: 'act_24_15',
    bookId: 'act',
    bookName: 'Atos',
    chapter: 24,
    verse: 15,
    text: 'E eu tenho esperança em Deus, esperança que estes homens também têm, de que haverá uma ressurreição tanto de justos como de injustos.',
    translation: 'TNM',
    crossReferences: ['jhn_5_28', 'dan_12_2']
  },

  // 1 CORÍNTIOS
  {
    id: '1co_15_26',
    bookId: '1co',
    bookName: '1 Coríntios',
    chapter: 15,
    verse: 26,
    text: 'E o último inimigo a ser reduzido a nada é a morte.',
    translation: 'TNM',
    crossReferences: ['rev_20_14', 'isa_25_8']
  },
  {
    id: '1co_15_28',
    bookId: '1co',
    bookName: '1 Coríntios',
    chapter: 15,
    verse: 28,
    text: 'Mas, quando todas as coisas lhe tiverem sido sujeitas, então o próprio Filho também se sujeitará Àquele que lhe sujeitou todas as coisas, para que Deus seja todas as coisas para com todos.',
    translation: 'TNM',
    crossReferences: ['1co_11_3', 'php_2_9']
  },

  // COLOSSENSES
  {
    id: 'col_1_15',
    bookId: 'col',
    bookName: 'Colossenses',
    chapter: 1,
    verse: 15,
    text: 'Ele é a imagem do Deus invisível, o primogênito de toda a criação.',
    translation: 'TNM',
    crossReferences: ['pro_8_22', 'rev_3_14']
  },

  // APOCALIPSE
  {
    id: 'rev_21_4',
    bookId: 'rev',
    bookName: 'Apocalipse',
    chapter: 21,
    verse: 4,
    text: 'E ele enxugará dos seus olhos toda lágrima, e não haverá mais morte, nem haverá mais tristeza, nem choro, nem dor. As coisas anteriores já passaram.',
    translation: 'TNM',
    crossReferences: ['isa_25_8', 'isa_65_17']
  }
];

export function getVerseById(id: string): BibleVerse | undefined {
  return SAMPLE_VERSES.find(v => v.id === id);
}

export function searchVerses(query: string): BibleVerse[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return SAMPLE_VERSES.filter(v => 
    v.text.toLowerCase().includes(q) ||
    v.bookName.toLowerCase().includes(q) ||
    `${v.bookName} ${v.chapter}:${v.verse}`.toLowerCase().includes(q)
  );
}
