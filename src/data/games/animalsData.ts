// src/data/games/animalsData.ts

export interface AnimalRiddle {
  id: string;
  riddle: string;
  correctAnimal: string;
  options: string[];
  emoji: string;
  scripture: string;
  lesson: string;
}

export const ANIMAL_RIDDLES: AnimalRiddle[] = [
  {
    id: 'an_1',
    riddle: 'Falei com voz humana a um profeta teimoso para avisá-lo de que um anjo com espada desembainhada estava no caminho.',
    correctAnimal: 'A jumenta de Balaão',
    options: ['A jumenta de Balaão', 'O camelo de Rebeca', 'A ovelha de Davi', 'O leão de Judá'],
    emoji: '🫏',
    scripture: 'Números 22:28-30',
    lesson: 'Jeová pode capacitar até um animal de carga para expor a cegueira espiritual de um homem ganancioso.'
  },
  {
    id: 'an_2',
    riddle: 'Fui solta por Noé e regressei à arca ao entardecer trazendo no bico uma folha de oliveira recém-arrancada.',
    correctAnimal: 'A pomba',
    options: ['O corvo', 'A pomba', 'A águia', 'A andorinha'],
    emoji: '🕊️',
    scripture: 'Gênesis 8:11',
    lesson: 'A folha de oliveira provou a Noé que as águas haviam baixado e que a vegetação estava a brotar novamente.'
  },
  {
    id: 'an_3',
    riddle: 'Passei a noite inteira numa cova funda com Daniel, mas Jeová enviou o seu anjo para fechar a minha boca faminta.',
    correctAnimal: 'O leão',
    options: ['O urso', 'O leopardo', 'O leão', 'O lobo'],
    emoji: '🦁',
    scripture: 'Daniel 6:21, 22',
    lesson: 'A integridade de Daniel e a sua lealdade inabalável moveram o Todo-Poderoso a protegê-lo de feras vorazes.'
  },
  {
    id: 'an_4',
    riddle: 'Fui providenciado por Jeová nas profundezas do mar para engolir um profeta fugitivo e vomitá-lo em terra seca 3 dias depois.',
    correctAnimal: 'O grande peixe',
    options: ['O grande peixe', 'O crocodilo do Nilo', 'O beemote', 'O leviatã'],
    emoji: '🐋',
    scripture: 'Jonas 1:17; 2:10; Mateus 12:40',
    lesson: 'Serviu de sinal profético sobre os três dias de Jesus na sepultura antes da sua ressurreição.'
  },
  {
    id: 'an_5',
    riddle: 'Fiquei preso pelos chifres num arbusto no monte Moriá para ser sacrificado no lugar do filho da promessa.',
    correctAnimal: 'O carneiro',
    options: ['O cordeiro', 'O novilho', 'O carneiro', 'O bode'],
    emoji: '🐏',
    scripture: 'Gênesis 22:13',
    lesson: 'Jeová providenciou o substituto na provação suprema da fé de Abraão, prefigurando o resgate de Cristo.'
  },
  {
    id: 'an_6',
    riddle: 'Cantei de madrugada logo após um dos principais apóstolos negar o seu Mestre três vezes consecutivas.',
    correctAnimal: 'O galo',
    options: ['O galo', 'A coruja', 'O faisão', 'O gavião'],
    emoji: '🐓',
    scripture: 'Mateus 26:74, 75',
    lesson: 'Pedro lembrou-se imediatamente do aviso de Jesus, saindo dali e chorando amargamente com profundo arrependimento.'
  }
];
