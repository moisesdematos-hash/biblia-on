// src/data/games/fruitOfSpiritData.ts

export interface FruitQuestion {
  id: string;
  situation: string;
  biblicalExample: string;
  correctFruit: string;
  options: string[];
  scripture: string;
  practicalReflection: string;
}

export const FRUIT_OF_SPIRIT_ITEMS: FruitQuestion[] = [
  {
    id: 'fr_1',
    situation: 'Você é insultado ou provocado injustamente no trabalho ou na escola, mas decide não revidar, mantendo uma fala calma e serena.',
    biblicalExample: 'Moisés, descrito como o homem mais manso e paciente de toda a terra, que intercedeu pelo povo mesmo quando se rebelaram.',
    correctFruit: 'Brandura',
    options: ['Brandura', 'Amor Leal', 'Alegria', 'Paz'],
    scripture: 'Números 12:3; Provérbios 15:1; Gálatas 5:23',
    practicalReflection: 'A brandura não é fraqueza; é poder sob controle obediente aos princípios divinos.'
  },
  {
    id: 'fr_2',
    situation: 'Mesmo a passar por graves dificuldades financeiras ou de saúde, o seu coração transborda de gratidão pelas bênçãos eternas do Reino.',
    biblicalExample: 'Paulo e Silas, que mesmo acorrentados e feridos na masmorra de Filipos, cantavam louvores a Jeová à meia-noite.',
    correctFruit: 'Alegria',
    options: ['Alegria', 'Bondade', 'Autodomínio', 'Paciência'],
    scripture: 'Atos 16:25; Filipenses 4:4; Neemias 8:10',
    practicalReflection: '"A alegria que vem de Jeová é a vossa fortaleza."'
  },
  {
    id: 'fr_3',
    situation: 'Diante de desejos fortes ou pressões para ceder a um impulso carnal prejudicial, você diz firmemente "não" e preserva a sua dignidade.',
    biblicalExample: 'José, que fugiu da esposa de Potifar dizendo: "Como poderia eu cometer esta grande maldade e realmente pecar contra Deus?"',
    correctFruit: 'Autodomínio',
    options: ['Autodomínio', 'Paz', 'Amor', 'Fé'],
    scripture: 'Gênesis 39:9; 1 Coríntios 9:25; Gálatas 5:23',
    practicalReflection: 'Quem governa o próprio espírito é mais forte do que quem conquista uma cidade fortificada.'
  },
  {
    id: 'fr_4',
    situation: 'Você aguarda calmamente a realização das promessas divinas e suporta o comportamento difícil de outras pessoas com tolerância amorosa.',
    biblicalExample: 'Noé, que trabalhou fielmente durante décadas na construção da arca e na pregação da justiça em meio a um mundo violento.',
    correctFruit: 'Paciência (Longanimidade)',
    options: ['Paciência (Longanimidade)', 'Fé', 'Benignidade', 'Brandura'],
    scripture: '2 Pedro 3:9; Colossenses 3:12, 13',
    practicalReflection: 'A paciência reflete a própria longanimidade de Jeová, que deseja que todos alcancem o arrependimento.'
  },
  {
    id: 'fr_5',
    situation: 'Você toma a iniciativa ativa de prestar ajuda prática a alguém necessitado sem esperar nada em troca nem buscar reconhecimento.',
    biblicalExample: 'O Bom Samaritano, que enfaixou as feridas do homem assaltado, colocou-o sobre o seu animal e pagou todas as despesas da hospedaria.',
    correctFruit: 'Bondade',
    options: ['Bondade', 'Autodomínio', 'Paz', 'Alegria'],
    scripture: 'Lucas 10:33-35; Gálatas 6:10',
    practicalReflection: 'A verdadeira bondade expressa-se em atos generosos e tangíveis em favor do próximo.'
  },
  {
    id: 'fr_6',
    situation: 'Você confia plenamente na soberania de Jeová, descansando o coração contra a ansiedade debilitante e buscando a concórdia com todos.',
    biblicalExample: 'Jesus a acalmar os discípulos no barco em meio à tempestade e a dizer aos Seus seguidores: "Deixo-vos a paz, a minha paz vos dou."',
    correctFruit: 'Paz',
    options: ['Paz', 'Brandura', 'Benignidade', 'Autodomínio'],
    scripture: 'João 14:27; Filipenses 4:6, 7',
    practicalReflection: 'A paz de Deus que excede todo o entendimento guarda a mente e o coração por meio de Cristo.'
  }
];
