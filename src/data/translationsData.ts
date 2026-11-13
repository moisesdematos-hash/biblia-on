// src/data/translationsData.ts

export interface VerseComparison {
  reference: string;
  originalText: string;
  originalLanguage: 'hebraico' | 'grego';
  translations: {
    edition: string;
    text: string;
    notes?: string;
  }[];
  criticalAnalysis: string;
}

export const COMPARISON_DATA: VerseComparison[] = [
  {
    reference: 'Salmos 83:18',
    originalText: 'וְיֵדְע֗וּ כִּֽי־אַתָּ֬ה שִׁמְךָ֣ יְהוָ֣ה לְבַדֶּ֑ךָ עֶ֝לְי֗וֹן עַל־כָּל־הָאָֽרֶץ׃',
    originalLanguage: 'hebraico',
    translations: [
      {
        edition: 'Tradução do Novo Mundo (TNM de Estudo)',
        text: 'Para que as pessoas saibam que tu, cujo nome é Jeová, somente tu és o Altíssimo sobre toda a terra.',
        notes: 'Preserva com exatidão o Tetragrama sagrado YHWH (יהוה) presente no manuscrito massorético.'
      },
      {
        edition: 'Almeida Revista e Atualizada (ARA)',
        text: 'Para que saibam que tu, cujo nome é SENHOR, és o Altíssimo sobre toda a terra.',
        notes: 'Substitui o nome próprio divino pelo título "SENHOR" em caixa alta, seguindo a tradição judaica posterior.'
      },
      {
        edition: 'King James Version (KJV)',
        text: 'That men may know that thou, whose name alone is JEHOVAH, art the most high over all the earth.',
        notes: 'Preserva o nome divino "JEHOVAH" em maiúsculas neste versículo específico.'
      }
    ],
    criticalAnalysis: 'O texto hebraico traz expressamente o Tetragrama YHWH. A omissão ou substituição por "Senhor" apaga a identidade pessoal do Criador, ao passo que a TNM e a KJV restituem o nome sagrado com fidelidade ao manuscrito original.'
  },
  {
    reference: 'João 1:1',
    originalText: 'Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος.',
    originalLanguage: 'grego',
    translations: [
      {
        edition: 'Tradução do Novo Mundo (TNM de Estudo)',
        text: 'No princípio era a Palavra, e a Palavra estava com o Deus, e a Palavra era um deus.',
        notes: 'O predicativo theós na oração 1c não tem o artigo definidor (anartro), indicando qualidade de natureza divina e não identidade numérica com ton theón (o Pai).'
      },
      {
        edition: 'Almeida Revista e Corrigida (ARC)',
        text: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.',
        notes: 'Usa a palavra maiúscula indistinta para as duas ocorrências gregas, obscurecendo a distinção gramatical grega entre theón com artigo e theós sem artigo.'
      },
      {
        edition: 'King James Version (KJV)',
        text: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
        notes: 'Tradução tradicional sem distinção do substantivo predicativo qualitativo.'
      }
    ],
    criticalAnalysis: 'A gramática grega koiné distingue intencionalmente o Deus Supremo com artigo (ton theón, v. 1b e 2) da Palavra que possui natureza divina qualitativa (theós anartro em posição pré-verbal, v. 1c). Manuscritos antigos cópticos saídicos do séc. III/IV d.C. traduzem expressamente "e a Palavra era um deus".'
  },
  {
    reference: 'Mateus 16:24',
    originalText: 'τότε ὁ Ἰησοῦς εἶπεν τοῖς μαθηταῖς αὐτοῦ· Εἴ τις θέλει ὀπίσω μου ἐλθεῖν, ἀπαρνησάσθω ἑαυτὸν καὶ ἀράτω τὸν σταυρὸν αὐτοῦ καὶ ἀκολουθείτω μοι.',
    originalLanguage: 'grego',
    translations: [
      {
        edition: 'Tradução do Novo Mundo (TNM de Estudo)',
        text: 'Então Jesus disse aos seus discípulos: "Se alguém quiser vir após mim, negue-se a si mesmo, apanhe a sua estaca de execução e siga-me continuamente."',
        notes: 'Traduz staurón de acordo com o significado clássico e bíblico de viga ereta ou madeiro vertical.'
      },
      {
        edition: 'Almeida Revista e Atualizada (ARA)',
        text: 'Então, disse Jesus aos seus discípulos: Se alguém quer vir após mim, a si mesmo se negue, tome a sua cruz e siga-me.',
        notes: 'Emprega o vocábulo anacrônico "cruz", derivado do latim crux séculos depois.'
      },
      {
        edition: 'King James Version (KJV)',
        text: 'Then said Jesus unto his disciples, If any man will come after me, let him deny himself, and take up his cross, and follow me.',
        notes: 'Usa o termo "cross".'
      }
    ],
    criticalAnalysis: 'O substantivo grego staurós (de hístēmi, fixar de pé) não significava duas peças de madeira cruzadas em ângulo, mas uma estaca ou tronco ereto onde criminosos eram pendurados ou empalados no primeiro século.'
  }
];
