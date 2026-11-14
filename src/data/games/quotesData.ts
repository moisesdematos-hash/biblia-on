// src/data/games/quotesData.ts

export interface BibleQuoteItem {
  id: string;
  quote: string;
  correctAuthor: string;
  options: string[];
  context: string;
  recipient: string;
  scripture: string;
  historicalNote: string;
}

export const BIBLE_QUOTES: BibleQuoteItem[] = [
  {
    id: 'q1',
    quote: 'Mas, quanto a mim e à minha família, serviremos a Jeová.',
    correctAuthor: 'Josué',
    options: ['Josué', 'Moisés', 'Calebe', 'Gideão'],
    context: 'Discurso de despedida ao povo de Israel em Siquém, desafiando a nação a escolher a quem servir.',
    recipient: 'Todo o povo e anciãos de Israel reunidos',
    scripture: 'Josué 24:15',
    historicalNote: 'Josué tinha cerca de 110 anos e permaneceu leal a Jeová durante toda a sua vida.'
  },
  {
    id: 'q2',
    quote: 'Eis-me aqui! Envia-me!',
    correctAuthor: 'Isaías',
    options: ['Isaías', 'Jeremias', 'Ezequiel', 'Daniel'],
    context: 'Após ter os lábios purificados com uma brasa do altar celestial, responde prontamente ao chamado de Jeová.',
    recipient: 'Jeová, em visão no templo',
    scripture: 'Isaías 6:8',
    historicalNote: 'Isaías profetizou durante o reinado de quatro reis de Judá: Uzias, Jotão, Acaz e Ezequias.'
  },
  {
    id: 'q3',
    quote: 'Aonde você for, eu irei, e onde passar a noite, eu passarei. O seu povo será o meu povo, e o seu Deus, o meu Deus.',
    correctAuthor: 'Rute',
    options: ['Rute', 'Ester', 'Sara', 'Rebeca'],
    context: 'Declaração comovente de amor leal (hésed) ao recusar abandonar a sua sogra Noemi rumo a Belém.',
    recipient: 'Noemi (sua sogra)',
    scripture: 'Rute 1:16',
    historicalNote: 'Rute, uma moabita, tornou-se antepassada direta do Rei Davi e de Jesus Cristo.'
  },
  {
    id: 'q4',
    quote: 'Tu vens a mim com espada, com lança e com dardo, mas eu vou contra ti em nome de Jeová dos exércitos!',
    correctAuthor: 'Davi',
    options: ['Davi', 'Jónatas', 'Saul', 'Sansão'],
    context: 'Davi avança no vale de Elá contra o gigante filisteu Golias de Gate armado apenas de uma funda e 5 pedras.',
    recipient: 'Golias, o campeão dos filisteus',
    scripture: '1 Samuel 17:45',
    historicalNote: 'Davi não confiou em armaduras carnais, mas na soberania e no poder salvador de Jeová.'
  },
  {
    id: 'q5',
    quote: 'Até quando vocês ficarão mancando entre duas opiniões? Se Jeová é o verdadeiro Deus, sigam-no!',
    correctAuthor: 'Elias',
    options: ['Elias', 'Eliseu', 'Samuel', 'Micaías'],
    context: 'O confronto espetacular no Monte Carmelo contra os 450 profetas de Baal.',
    recipient: 'Todo o povo do reino do norte de Israel reunido no Monte Carmelo',
    scripture: '1 Reis 18:21',
    historicalNote: 'O fogo de Jeová desceu dos céus e consumiu o sacrifício e a água na vala, provando quem é o verdadeiro Deus.'
  },
  {
    id: 'q6',
    quote: 'Não temos necessidade de lhe responder sobre isso... o nosso Deus, a quem servimos, é capaz de nos salvar.',
    correctAuthor: 'Sadraque, Mesaque e Abednego',
    options: ['Sadraque, Mesaque e Abednego', 'Daniel', 'Esdras e Neemias', 'Mardoqueu'],
    context: 'Recusa firme de adorar a enorme imagem de ouro erguida na planície de Dura sob pena da fornalha ardente.',
    recipient: 'Rei Nabucodonosor de Babilónia',
    scripture: 'Daniel 3:16-18',
    historicalNote: 'Eles declararam que, mesmo que Deus não os livrasse, jamais adorariam a imagem idólatra.'
  },
  {
    id: 'q7',
    quote: 'Temos de obedecer a Deus como governante em vez de a homens.',
    correctAuthor: 'Apóstolo Pedro (e os apóstolos)',
    options: ['Apóstolo Pedro', 'Apóstolo Paulo', 'Estêvão', 'Tiago'],
    context: 'Resposta corajosa perante o Supremo Tribunal judaico (Sinédrio) que lhes ordenara parar de pregar.',
    recipient: 'O sumo sacerdote e o Sinédrio em Jerusalém',
    scripture: 'Atos 5:29',
    historicalNote: 'Este é o princípio basilar da supremacia da lei divina sobre quaisquer ordens humanas arbitrárias.'
  },
  {
    id: 'q8',
    quote: 'O que é a verdade?',
    correctAuthor: 'Pôncio Pilatos',
    options: ['Pôncio Pilatos', 'Herodes Antipas', 'Caifás', 'Félix'],
    context: 'Pergunta cínica feita durante o interrogatório de Jesus no palácio do governador romano.',
    recipient: 'Jesus Cristo',
    scripture: 'João 18:38',
    historicalNote: 'Jesus acabara de dizer: "Para isto vim ao mundo: para dar testemunho da verdade."'
  }
];
