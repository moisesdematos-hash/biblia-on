// src/data/goldenThreadData.ts

export interface GoldenThreadConnection {
  id: string;
  sourcePassage: string;
  sourceBook: string;
  themeNode: string;
  connectionToProtoevangel: string; // Como se liga a Gênesis 3:15
  historicalChain: {
    stage: string;
    passage: string;
    explanation: string;
  }[];
  culminationInRevelation: string; // Apocalipse 21/22
}

export interface AncientManuscript {
  id: string;
  name: string;
  dateApprox: string;
  locationFound: string;
  material: 'Papiro' | 'Pergaminho de Couro' | 'Códice';
  language: 'Hebraico Antigo' | 'Aramaico' | 'Grego Uncial';
  significance: string;
  scriptureContained: string;
  highlightedWord: {
    original: string;
    transliteration: string;
    meaning: string;
    significanceNote: string;
  };
  visualRepresentation: {
    scrollColor: string;
    archivalReference: string;
    ancientScriptSample: string;
  };
}

export interface EyewitnessProfile {
  id: string;
  name: string;
  era: string;
  scripturalVoice: string;
  coreTestimony: string;
  sampleQuestions: {
    question: string;
    firstPersonAnswer: string;
    scriptureBasis: string[];
  }[];
}

// 1. DADOS DO FIO DOURADO (Gênesis 3:15 ao Reino)
export const GOLDEN_THREAD_DATA: GoldenThreadConnection[] = [
  {
    id: 'gt_gen_3_15',
    sourcePassage: 'Gênesis 3:15',
    sourceBook: 'Gênesis',
    themeNode: 'O Protoevangelho: O Nascimento da Promessa',
    connectionToProtoevangel: 'O próprio ponto de partida: a primeira profecia bíblica prometendo a vitória final do Descendente sobre a serpente.',
    historicalChain: [
      { stage: '1. O Éden', passage: 'Gênesis 3:15', explanation: 'A promessa imediata dada à humanidade decaída: haverá inimizade perpétua e o Descendente da mulher esmagará a cabeça da serpente.' },
      { stage: '2. O Pacto Abraâmico', passage: 'Gênesis 22:18', explanation: '"Por meio do teu descendente todas as nações da terra abençoarão a si mesmas."' },
      { stage: '3. A Tribo de Judá', passage: 'Gênesis 49:10', explanation: '"O cetro não se afastará de Judá... até que venha Siló, e a ele pertencerá a obediência dos povos."' },
      { stage: '4. O Pacto do Reino Davídico', passage: '2 Samuel 7:12, 13', explanation: '"Estabelecerei firmemente o trono do seu reino para sempre."' },
      { stage: '5. O Sacrifício na Estaca', passage: 'Gálatas 3:16; 1 Pedro 2:24', explanation: 'O Descendente tem o calcanhar machucado na estaca de execução e providencia o resgate perfeitamente.' },
      { stage: '6. Entronização Celestial', passage: 'Daniel 7:13, 14; Apocalipse 11:15', explanation: 'O Filho de Deus recebe o domínio eterno sobre todas as nações.' }
    ],
    culminationInRevelation: 'Apocalipse 20:2, 10 & 21:4: A serpente original é lançada no lago de fogo e a morte é reduzida a nada; Deus enxuga toda lágrima dos olhos humanos.'
  },
  {
    id: 'gt_levitico_sangue',
    sourcePassage: 'Levítico 17:11',
    sourceBook: 'Levítico',
    themeNode: 'A Santidade do Sangue e o Resgate Perfeito',
    connectionToProtoevangel: 'Mostra o custo da redenção para anular o dano causado pela serpente original: a vida está no sangue.',
    historicalChain: [
      { stage: '1. Promessa de Redenção', passage: 'Gênesis 3:21', explanation: 'Deus providenciou túnicas de pele após o pecado, tipificando que a expiação exigia vida correspondente.' },
      { stage: '2. O Sacrifício Mosaico', passage: 'Levítico 17:11', explanation: '"A vida da carne está no sangue, e eu mesmo o pus sobre o altar para fazer expiação por vós."' },
      { stage: '3. O Cordeiro Pascal', passage: 'Êxodo 12:13; 1 Coríntios 5:7', explanation: 'O sangue nas ombreiras livrou os primogênitos da morte no Egito; Cristo tornou-se a nossa Páscoa.' },
      { stage: '4. Cumprimento na Estaca', passage: 'Hebreus 9:12, 14', explanation: 'Jesus entrou de uma vez para sempre no lugar santo celestial não com sangue de bodes, mas com o seu próprio sangue precioso.' }
    ],
    culminationInRevelation: 'Apocalipse 7:14: A grande multidão que sobrevive à grande tribulação "lavou as suas vestes compridas e as embranqueceu no sangue do Cordeiro".'
  },
  {
    id: 'gt_daniel_reino',
    sourcePassage: 'Daniel 2:44',
    sourceBook: 'Daniel',
    themeNode: 'A Pedra Que Esmaga Todos os Governos Humanos',
    connectionToProtoevangel: 'A culminação da destruição da descendência da serpente (os impérios políticos terrestres sob controle de Satanás).',
    historicalChain: [
      { stage: '1. Inimizade das Descendências', passage: 'Gênesis 3:15', explanation: 'Inimizade entre o Descendente da mulher de Deus e a descendência política/religiosa da serpente.' },
      { stage: '2. A Sucessão dos Impérios', passage: 'Daniel 2:31-43', explanation: 'Babilônia, Média-Pérsia, Grécia, Roma e a Potência Anglo-Americana descritas na estátua.' },
      { stage: '3. O Golpe da Pedra Divina', passage: 'Daniel 2:44, 45', explanation: 'A pedra cortada da montanha sem mãos humanas atinge a estátua nos pés e esmiúça todos os reinos humanos.' }
    ],
    culminationInRevelation: 'Apocalipse 19:11-16: O Rei dos reis cavalga para vindicar a soberania de Jeová, destruindo o sistema satânico e governando a Terra para todo o sempre.'
  }
];

// 2. MANUSCRITOS ANTIGOS & RÉPLICAS DIGITAIS
export const ANCIENT_MANUSCRIPTS: AncientManuscript[] = [
  {
    id: 'ms_rolo_isaias',
    name: 'Grande Rolo de Isaías (1QIsaᵃ)',
    dateApprox: 'c. 125 a 100 a.C. (Mais de 2.100 anos)',
    locationFound: 'Caverna 1 de Qumran (Mar Morto)',
    material: 'Pergaminho de Couro',
    language: 'Hebraico Antigo',
    significance: 'O rolo bíblico completo mais antigo do mundo preservado intacto. Demonstra que o texto hebraico de Isaías utilizado hoje difere em menos de 1% (apenas variantes ortográficas menores) após mil anos de cópias sucessivas!',
    scriptureContained: 'Todos os 66 capítulos do livro de Isaías.',
    highlightedWord: {
      original: 'יהוה',
      transliteration: 'YHWH (Jeová)',
      meaning: 'Ele Faz que Venha a Ser',
      significanceNote: 'O Tetragrama sagrado aparece centenas de vezes no rolo com caracteres paleo-hebraicos nítidos.'
    },
    visualRepresentation: {
      scrollColor: '#2b2317',
      archivalReference: 'Santuário do Livro, Museu de Israel, Jerusalém',
      ancientScriptSample: 'ק֥וֹל קוֹרֵ֬א בַּמִּדְבָּר֙ פַּנּ֖וּ דֶּ֣רֶךְ יְהוָ֑ה (Isaías 40:3)'
    }
  },
  {
    id: 'ms_papiro_46',
    name: 'Papiro Chester Beatty II (𝔓⁴⁶)',
    dateApprox: 'c. 175 a 225 d.C. (Fim do séc. II)',
    locationFound: 'Faium, Egito',
    material: 'Papiro',
    language: 'Grego Uncial',
    significance: 'O mais antigo manuscrito existente das cartas do Apóstolo Paulo e de Hebreus. Comprova a circulação canônica das epístolas paulinas logo após a morte dos apóstolos.',
    scriptureContained: 'Romanos, Hebreus, 1 e 2 Coríntios, Efésios, Gálatas, Filipenses, Colossenses, 1 Tessalonicenses.',
    highlightedWord: {
      original: 'σταυρὸς',
      transliteration: 'staurós',
      meaning: 'Estaca ereta / Madeiro',
      significanceNote: 'Manuscrito livre de representações em forma de cruz com travessão pagão.'
    },
    visualRepresentation: {
      scrollColor: '#3d2f1f',
      archivalReference: 'Biblioteca Chester Beatty, Dublin / Univ. de Michigan',
      ancientScriptSample: 'ΕΝ ΑΡΧΗ ΗΝ Ο ΛΟΓΟΣ (Escrita contínua em maiúsculas unciais)'
    }
  },
  {
    id: 'ms_codice_leningrado',
    name: 'Códice de Leningrado (B19A)',
    dateApprox: '1008 d.C.',
    locationFound: 'Cairo, Egito (Preservado em São Petersburgo)',
    material: 'Pergaminho de Couro',
    language: 'Hebraico Antigo',
    significance: 'O mais completo e perfeito manuscrito do Texto Massorético com vocalização tiberiense e masorah magna/parva. Base primária de todas as traduções modernas fidedignas (incluindo a Biblia Hebraica Stuttgartensia e a TNM).',
    scriptureContained: 'Todas as Escrituras Hebraico-Aramaicas (Gênesis a Malaquias).',
    highlightedWord: {
      original: 'יְהוָה',
      transliteration: 'Yehovah (Jeová)',
      meaning: 'O Deus Altíssimo sobre toda a Terra',
      significanceNote: 'Contém a pontuação vocálica massorética preservada com exatidão monumental em Salmo 83:18.'
    },
    visualRepresentation: {
      scrollColor: '#241c13',
      archivalReference: 'Biblioteca Nacional da Rússia, São Petersburgo',
      ancientScriptSample: 'בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים אֵ֥ת הַשָּׁמַ֖יִם וְאֵ֥ת הָאָֽרֶץ׃'
    }
  }
];

// 3. SIMULADOR DE TESTEMUNHAS OCULARES EM 1ª PESSOA
export const EYEWITNESSES_PROFILES: EyewitnessProfile[] = [
  {
    id: 'noe_testemunha',
    name: 'Noé, o Construtor da Arca',
    era: 'c. 2400 a.C. (Mundo Antediluviano)',
    scripturalVoice: 'Sóbria, reverente, com profunda fé em Jeová e compaixão pela humanidade perdida.',
    coreTestimony: 'Andei com o Deus verdadeiro durante décadas enquanto a terra se enchia de violência por causa dos nefilins. A obediência exata salvou a minha família.',
    sampleQuestions: [
      {
        question: 'Como conseguiste manter a fé e construir uma arca tão colossal enquanto todos zombavam?',
        firstPersonAnswer: 'A zombaria era diária e ensurdecedora. Imagina construir durante décadas uma estrutura gigantesca no meio de terra seca, sem chuva à vista! Mas Jeová não é um homem para mentir. Cada tábua de madeira resinosa que cortei, cada camada de alcatrão que apliquei foi uma proclamação pública de justiça (2 Pedro 2:5). Eu não confiei no que os meus olhos viam ao redor, mas naquilo que Aquele que me chamou prometeu.',
        scriptureBasis: ['Gênesis 6:9-22', 'Hebreus 11:7', '2 Pedro 2:5']
      },
      {
        question: 'O que sentiste quando a porta da arca se fechou?',
        firstPersonAnswer: 'Não fui eu quem fechou a porta pesada da arca. Foi o próprio Jeová quem a fechou por fora (Gênesis 7:16). Naquele momento, compreendi que o tempo da paciência de Deus para com aquele mundo violento havia terminado. O barulho das torrentes que caíam das comportas do céu foi aterrorizador, mas dentro da arca sentíamos a paz sublime de quem está debaixo da guarda do Altíssimo.',
        scriptureBasis: ['Gênesis 7:16-24', '1 Pedro 3:20']
      }
    ]
  },
  {
    id: 'daniel_testemunha',
    name: 'Profeta Daniel em Babilônia',
    era: 'c. 600 a 536 a.C. (Cativeiro Babilônico e Medo-Persa)',
    scripturalVoice: 'Profunda humildade, coragem inabalável, zelo pela adoração pura e respeito pelas profecias.',
    coreTestimony: 'Servi em palácios pagãos desde a juventude até à velhice, mas nunca permiti que as iguarias do rei ou a cova dos leões comprometessem a minha lealdade a Jeová.',
    sampleQuestions: [
      {
        question: 'O que te deu coragem para continuar a orar ao teu Deus mesmo sabendo da pena de morte na cova dos leões?',
        firstPersonAnswer: 'Três vezes ao dia eu abria as janelas do meu quarto de terraço voltadas para Jerusalém para orar e louvar a Jeová, como sempre tinha feito (Daniel 6:10). Quando o decreto idólatra foi assinado pelo rei Dario, esconder a minha fé teria sido uma traição ao Deus que governa os céus. A minha vida não pertencia aos reis da Pérsia, mas a Jeová. Ele enviou o Seu anjo e fechou a boca dos leões porque perante Ele fui achado inocente.',
        scriptureBasis: ['Daniel 6:10, 22', 'Hebreus 11:33']
      },
      {
        question: 'O que representa a pedra cortada sem mãos na visão da estátua de Nabucodonosor?',
        firstPersonAnswer: 'Eu vi diante de mim a marcha das superpotências: o ouro babilônico, a prata medo-persa, o cobre grego e o ferro romano. Mas a pedra não procedeu de nenhum governo humano — foi cortada da montanha da soberania divina de Jeová. Essa pedra é o Reino eterno do Deus do céu, que esmigalhará todos os governos terrenos e encherá toda a Terra de justiça perene (Daniel 2:44).',
        scriptureBasis: ['Daniel 2:31-45', 'Daniel 7:13, 14']
      }
    ]
  },
  {
    id: 'paulo_testemunha',
    name: 'Apóstolo Paulo',
    era: 'c. 33 a 65 d.C. (Primeiro Século Cristão)',
    scripturalVoice: 'Ardente, transparente, teologicamente magistral, impelido pelo amor sacrificial de Cristo.',
    coreTestimony: 'Fui um perseguidor cego e blasfemo, mas a misericórdia de Cristo alcançou-me no caminho de Damasco. Nada me poderá separar do amor de Deus.',
    sampleQuestions: [
      {
        question: 'Como suportaste prisões, naufrágios, açoites e difamações com tanta alegria?',
        firstPersonAnswer: 'Eu considero que os sofrimentos do tempo presente não se comparam com a glória que há de ser revelada em nós (Romanos 8:18). Quando estou fraco, é então que sou poderoso, porque o poder de Cristo repousa sobre mim como uma tenda. O meu lema até ao último suspiro em Roma foi: combati o bom combate, terminei a corrida, guardei a fé (2 Timóteo 4:7).',
        scriptureBasis: ['2 Coríntios 11:23-28', 'Romanos 8:38, 39', '2 Timóteo 4:7, 8']
      }
    ]
  }
];
