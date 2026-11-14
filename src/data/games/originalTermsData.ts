// src/data/games/originalTermsData.ts

export interface OriginalTermItem {
  id: string;
  term: string;
  transliteration: string;
  originalLanguage: 'Hebraico' | 'Grego' | 'Aramaico';
  correctDefinition: string;
  options: string[];
  scriptureReference: string;
  theologicalInsight: string;
}

export const ORIGINAL_TERMS: OriginalTermItem[] = [
  {
    id: 't_1',
    term: 'יהוה (YHWH)',
    transliteration: 'Tetragrama Sagrado (Jeová / Yahweh)',
    originalLanguage: 'Hebraico',
    correctDefinition: 'Ele faz que venha a ser (O Deus Todo-Poderoso e Autodeterminador)',
    options: [
      'Ele faz que venha a ser (O Todo-Poderoso)',
      'O Senhor do Universo Trino',
      'Aquele que não se envolve com homens',
      'Um título genérico de governante'
    ],
    scriptureReference: 'Êxodo 3:14, 15; Salmo 83:18',
    theologicalInsight: 'O nome divino expressa que Jeová cumpre infalivelmente todos os Seus propósitos e promessas.'
  },
  {
    id: 't_2',
    term: 'חֶסֶד (Hésed)',
    transliteration: 'Chésed / Hésed',
    originalLanguage: 'Hebraico',
    correctDefinition: 'Amor leal, bondade amorosa motivada por fidelidade a um pacto',
    options: [
      'Amor leal, bondade por compromisso firme',
      'Sentimento romântico passageiro',
      'Ira justa e julgamento punitivo',
      'Um sacrifício de animais no altar'
    ],
    scriptureReference: 'Salmo 136:1; Miqueias 6:8; Rute 1:8',
    theologicalInsight: 'Descreve o afeto firme e inquebrantável de Jeová para com aqueles que O amam e guardam a Sua aliança.'
  },
  {
    id: 't_3',
    term: 'σταυρός (Staurós)',
    transliteration: 'Staurós',
    originalLanguage: 'Grego',
    correctDefinition: 'Madeiro vertical reto ou estaca pontiaguda (sem travessão)',
    options: [
      'Madeiro vertical reto / estaca de execução',
      'Uma cruz de duas traves cruzadas',
      'Um amuleto sagrado de proteção',
      'Uma espada cerimonial militar'
    ],
    scriptureReference: 'Atos 5:30; Gálatas 3:13; 1 Pedro 2:24',
    theologicalInsight: 'No grego clássico e no Novo Testamento, refere-se a um tronco ereto ou madeiro simples no qual criminosos eram pregados.'
  },
  {
    id: 't_4',
    term: 'שאול / ᾅδης (Sheol / Hades)',
    transliteration: 'Sheol (Hebraico) / Hades (Grego)',
    originalLanguage: 'Hebraico',
    correctDefinition: 'A sepultura comum de toda a humanidade (estado de inconsciência)',
    options: [
      'A sepultura comum e inconsciência da morte',
      'Um inferno de fogo e tormento eterno',
      'O paraíso celestial dos anjos',
      'O purgatório de purificação temporária'
    ],
    scriptureReference: 'Eclesiastes 9:5, 10; Salmo 16:10; Atos 2:27',
    theologicalInsight: 'Nas Escrituras, os mortos não sentem nada; estão a descansar na memória de Deus aguardando a ressurreição.'
  },
  {
    id: 't_5',
    term: 'γέεννα (Geena)',
    transliteration: 'Geena (do vale de Hinom)',
    originalLanguage: 'Grego',
    correctDefinition: 'Símbolo da destruição total e definitiva (segunda morte sem ressurreição)',
    options: [
      'Símbolo de aniquilação e destruição eterna',
      'Um submundo onde demônios torturam almas',
      'Uma prisão subterrânea temporária',
      'Um rio de enxofre literal'
    ],
    scriptureReference: 'Mateus 10:28; Lucas 12:5; Apocalipse 20:14',
    theologicalInsight: 'O lixo e os cadáveres de criminosos eram queimados com fogo e enxofre no vale de Hinom fora de Jerusalém até serem extintos.'
  },
  {
    id: 't_6',
    term: 'ἀγάπη (Agápe)',
    transliteration: 'Agápe',
    originalLanguage: 'Grego',
    correctDefinition: 'Amor nobre orientado por princípios justos, altruísmo e devoção desinteressada',
    options: [
      'Amor guiado por princípios altruístas elevados',
      'Paixão carnal e atração física (Eros)',
      'Afeição entre amigos íntimos (Philia)',
      'Afeto natural entre membros da família (Storgé)'
    ],
    scriptureReference: '1 Coríntios 13:4-8; 1 João 4:8',
    theologicalInsight: '"Deus é amor (agape)" — não apenas uma emoção, mas a própria essência de agir para o maior bem do outro.'
  }
];
