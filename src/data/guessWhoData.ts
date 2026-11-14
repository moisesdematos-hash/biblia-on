// src/data/guessWhoData.ts

export interface GuessWhoCharacter {
  id: string;
  name: string;
  title: string;
  avatarSymbol: string;
  clues: [string, string, string, string]; // 4 pistas da mais difícil para a mais fácil
  options: string[]; // 4 alternativas (1 correta + 3 distratores)
  scriptureReference: string;
  funFact: string;
  period: string;
}

export const GUESS_WHO_CHARACTERS: GuessWhoCharacter[] = [
  {
    id: 'gideao',
    name: 'Gideão',
    title: 'Juiz & Libertador de Israel',
    avatarSymbol: '🏺',
    clues: [
      'Pertenço à menor família da tribo de Manassés e considerava-me o mais insignificante na casa de meu pai.',
      'Derrubei o altar de Baal pertencente a meu pai e recebi o nome de Jerubaal.',
      'Pedi um sinal milagroso a Jeová com um velo de lã que ficou molhado enquanto o chão ao redor permaneceu seco.',
      'Com apenas 300 homens equipados com buzinas, jarros e tochas, derrotei 135.000 midianitas.'
    ],
    options: ['Gideão', 'Sansão', 'Baraque', 'Jefté'],
    scriptureReference: 'Juízes 6:11-16; 7:16-22',
    funFact: 'O teste da água no ribeiro reduziu o exército de 32.000 para apenas 300 homens que lamberam a água vigilantes.',
    period: 'Era dos Juízes (c. 1300 a.C.)'
  },
  {
    id: 'ester',
    name: 'Ester (Hadassa)',
    title: 'Rainha da Pérsia & Heroína de Fé',
    avatarSymbol: '👑',
    clues: [
      'O meu nome hebraico original era Hadassa e fui criada como órfã pelo meu primo mais velho.',
      'Fui escolhida entre muitas donzelas do vasto império persa que se estendia da Índia à Etiópia.',
      'Arrisquei a minha própria vida entrando no pátio real sem ter sido chamada pelo cetro de ouro do rei.',
      'Desmascarei a conspiração de Hamã num banquete privado e salvei o meu povo do extermínio total.'
    ],
    options: ['Ester', 'Rute', 'Débora', 'Abigail'],
    scriptureReference: 'Ester 2:7; 4:16; 7:1-6',
    funFact: 'Disse a célebre frase de coragem inabalável: "Se eu tiver de morrer, morrerei."',
    period: 'Império Persa (c. 475 a.C.)'
  },
  {
    id: 'elias',
    name: 'Elias',
    title: 'Profeta do Fogo & Defensor de Jeová',
    avatarSymbol: '🔥',
    clues: [
      'Vim da terra de Gileade e profetizei uma terrível seca de três anos e meio perante o rei Acabe.',
      'Fui alimentado milagrosamente por corvos junto ao ribeiro de Querite e multipliquei a farinha de uma viúva.',
      'Desafiei 450 profetas de Baal no Monte Carmelo para provar quem era o Deus verdadeiro.',
      'O fogo de Jeová desceu dos céus consumindo o sacrifício, a lenha, as pedras e até a água na vala.'
    ],
    options: ['Elias', 'Eliseu', 'Isaías', 'Jeremias'],
    scriptureReference: '1 Reis 17:1-6; 18:21-39',
    funFact: 'Após a vitória no Carmelo, correu à frente do carro de Acabe até Jezreel fortalecido pelo espírito de Deus.',
    period: 'Monarquia Dividida (c. 900 a.C.)'
  },
  {
    id: 'noe',
    name: 'Noé',
    title: 'Patriarca Fiel & Construtor da Arca',
    avatarSymbol: '🕊️',
    clues: [
      'O meu pai Lameque deu-me um nome profético que significa "Descanso" ou "Consolação".',
      'Andei com o Deus verdadeiro numa época em que a Terra se encheu de violência extrema por causa dos nefilins.',
      'Trabalhei durante décadas como pregador da justiça enquanto construía uma gigantesca embarcação de madeira de gofer.',
      'Sobrevivi com a minha esposa, três filhos e três noras à destruição do antigo mundo pelo grande Dilúvio.'
    ],
    options: ['Noé', 'Enoque', 'Abraão', 'Jó'],
    scriptureReference: 'Gênesis 5:29; 6:9-14; 2 Pedro 2:5',
    funFact: 'A arca tinha cerca de 133 metros de comprimento, 22 de largura e 13 de altura, com 3 andares.',
    period: 'Mundo Antediluviano (c. 2370 a.C.)'
  },
  {
    id: 'daniel',
    name: 'Daniel (Beltessazar)',
    title: 'Profeta em Babilónia & Estadista Íntegro',
    avatarSymbol: '🦁',
    clues: [
      'Fui levado como jovem cativo de nobre linhagem para Babilónia e recusei comer as iguarias e vinho do rei.',
      'Jeová deu-me a capacidade única de recordar e interpretar o sonho da colossal estátua metálica de Nabucodonosor.',
      'Decifrei a escrita misteriosa que surgiu na parede durante o banquete profano do rei Belsazar: MENE, MENE, TEQUEL, PARSIM.',
      'Fui atirado a uma cova de leões famintos por orar a Jeová três vezes ao dia e Deus enviou o Seu anjo para fechar a boca das feras.'
    ],
    options: ['Daniel', 'Ezequiel', 'Jeremias', 'Neemias'],
    scriptureReference: 'Daniel 1:8; 2:27-45; 6:10-22',
    funFact: 'Serviu fielmente durante os reinados de Nabucodonosor, Belsazar, Dario, o Medo, e Ciro, o Persa.',
    period: 'Cativeiro Babilónico (c. 600-530 a.C.)'
  },
  {
    id: 'rute',
    name: 'Rute',
    title: 'Moabita Leal & Bisavó de David',
    avatarSymbol: '🌾',
    clues: [
      'Nasci em Moabe, casei-me com um israelita e fiquei viúva sem filhos ainda jovem.',
      'Recusei abandonar a minha sogra Noemi quando ela decidiu regressar pobre a Belém de Judá.',
      'Proferi a promessa: "O teu povo será o meu povo, e o teu Deus será o meu Deus."',
      'Respiguei espigas de cevada nos campos de Boaz, que se tornou o meu resgatador e marido.'
    ],
    options: ['Rute', 'Orfa', 'Raabe', 'Ana'],
    scriptureReference: 'Rute 1:16, 17; 2:2; 4:13-17',
    funFact: 'Tornou-se ancestral direta do Rei David e de Jesus Cristo, figurando na genealogia messiânica.',
    period: 'Era dos Juízes (c. 1100 a.C.)'
  },
  {
    id: 'paulo',
    name: 'Apóstolo Paulo (Saulo de Tarso)',
    title: 'Apóstolo das Nações & Doutor Gentio',
    avatarSymbol: '⛵',
    clues: [
      'Fui instruído aos pés de Gamaliel e era um fariseu zeloso que perseguia implacavelmente os discípulos de Jesus.',
      'Uma luz ofuscante do céu derrubou-me na estrada de Damasco e ouvi a voz: "Saulo, Saulo, porque me persegues?"',
      'Realizei três grandes viagens missionárias marítimas pelo Mediterrâneo, fundando congregações na Ásia e Europa.',
      'Sobrevivi a naufrágios, apedrejamento, prisões e escrevi 14 cartas inspiradas do Novo Testamento.'
    ],
    options: ['Apóstolo Paulo', 'Apóstolo Pedro', 'Estêvão', 'Barnabé'],
    scriptureReference: 'Atos 9:1-9; 22:3; 2 Coríntios 11:23-28',
    funFact: 'Fabricava tendas como sustento para não ser um fardo financeiro às congregações cristãs.',
    period: 'Século I Cristão (c. 5-65 d.C.)'
  },
  {
    id: 'raabe',
    name: 'Raabe',
    title: 'Mulher de Fé de Jericó',
    avatarSymbol: '🎗️',
    clues: [
      'Vivia nas muralhas da fortificada cidade cananeia de Jericó.',
      'Reconheci a supremacia do Deus de Israel ao ouvir como Jeová secara as águas do Mar Vermelho.',
      'Escondi dois espias israelitas no meu terraço sob hastes de linho para salvá-los dos soldados do rei.',
      'Atei um cordão de fio escarlate à minha janela e toda a minha família foi preservada quando as muralhas desabaram.'
    ],
    options: ['Raabe', 'Dalila', 'Jael', 'Zípora'],
    scriptureReference: 'Josué 2:1-21; 6:22-25; Hebreus 11:31',
    funFact: 'Casou-se com Salmom da tribo de Judá e foi mãe de Boaz, integrando a linhagem do Messias.',
    period: 'Conquista de Canaã (c. 1473 a.C.)'
  },
  {
    id: 'pedro',
    name: 'Apóstolo Pedro (Simão Barjonas)',
    title: 'Pescador da Galileia & Coluna Apostólica',
    avatarSymbol: '🗝️',
    clues: [
      'Era pescador no Mar da Galileia em parceria com meu irmão André quando Jesus me chamou para ser "pescador de homens".',
      'Tive a coragem de sair do barco e andar sobre as águas agitadas em direção a Jesus até que a dúvida me fez afundar.',
      'Neguei Jesus três vezes antes de o galo cantar na noite do seu julgamento ilegal e chorei amargamente com arrependimento sincero.',
      'Recebi as chaves do Reino e no Pentecostes de 33 d.C. fiz o poderoso discurso que converteu cerca de 3.000 pessoas.'
    ],
    options: ['Apóstolo Pedro', 'Apóstolo João', 'Tomé', 'Filipe'],
    scriptureReference: 'Mateus 14:28-31; 26:69-75; Atos 2:14-41',
    funFact: 'Jesus deu-lhe o cognome de Cefas (em aramaico) ou Pedro (em grego), que significa "um pedaço de rocha".',
    period: 'Século I Cristão (c. 1 a.C. - 67 d.C.)'
  },
  {
    id: 'joao_batista',
    name: 'João Batista',
    title: 'Precursor do Messias & O Maior dos Nascidos de Mulher',
    avatarSymbol: '🌊',
    clues: [
      'O meu nascimento na velhice de Zacarias e Elisabete foi anunciado pelo anjo Gabriel no templo.',
      'Vivi no ermo da Judeia, vestia roupas de pelos de camelo com cinto de couro e alimentava-me de gafanhotos e mel silvestre.',
      'Preguei o batismo de arrependimento e apontei para Jesus dizendo: "Eis o Cordeiro de Deus, que tira o pecado do mundo!"',
      'Tive o imenso privilégio de batizar o próprio Filho de Deus nas águas do Rio Jordão.'
    ],
    options: ['João Batista', 'Elias', 'Malaquias', 'Apóstolo João'],
    scriptureReference: 'Lucas 1:13-17; Mateus 3:1-17; João 1:29',
    funFact: 'Jesus declarou a seu respeito: "Entre os nascidos de mulher não surgiu ninguém maior do que João Batista."',
    period: 'Transição Evangélica (c. 2 a.C. - 30 d.C.)'
  }
];
