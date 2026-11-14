// src/data/games/kingsData.ts

export interface KingItem {
  id: string;
  name: string;
  kingdom: 'Judá (Sul)' | 'Israel (Norte)';
  verdict: 'bom' | 'mau'; // Fez o que era reto ou mau aos olhos de Jeová
  reignYears: string;
  summary: string;
  biblicalRecord: string;
  keyAction: string;
}

export const KINGS_DATA: KingItem[] = [
  {
    id: 'k1',
    name: 'Josias',
    kingdom: 'Judá (Sul)',
    verdict: 'bom',
    reignYears: '31 anos (659–628 a.C.)',
    summary: 'Começou a reinar com 8 anos. Removeu altares pagãos e restaurou a adoração pura após encontrar o rolo da Lei no templo.',
    biblicalRecord: '2 Reis 22:1, 2; 2 Crónicas 34:1-3',
    keyAction: 'Fez o que era reto aos olhos de Jeová e celebrou uma Páscoa sem igual.'
  },
  {
    id: 'k2',
    name: 'Acabe',
    kingdom: 'Israel (Norte)',
    verdict: 'mau',
    reignYears: '22 anos (c. 940–919 a.C.)',
    summary: 'Casou-se com a ímpia Jezabel, introduziu o culto a Baal em Samaria e perseguiu os profetas de Jeová.',
    biblicalRecord: '1 Reis 16:30-33; 21:25',
    keyAction: 'Provocou Jeová mais do que todos os reis de Israel que vieram antes dele.'
  },
  {
    id: 'k3',
    name: 'Ezequias',
    kingdom: 'Judá (Sul)',
    verdict: 'bom',
    reignYears: '29 anos (745–716 a.C.)',
    summary: 'Destruiu a serpente de cobre idólatra e confiou plenamente em Jeová quando Senaqueribe da Assíria sitiou Jerusalém.',
    biblicalRecord: '2 Reis 18:3-6; Isaías 36-37',
    keyAction: 'Apegou-se a Jeová; um anjo de Jeová aniquilou 185.000 soldados assírios numa só noite.'
  },
  {
    id: 'k4',
    name: 'Manassés (início do reinado)',
    kingdom: 'Judá (Sul)',
    verdict: 'mau',
    reignYears: '55 anos (716–661 a.C.)',
    summary: 'Ergueu altares para Baal no próprio templo e sacrificou seus filhos no fogo, antes de se humilhar na prisão em Babilónia.',
    biblicalRecord: '2 Reis 21:1-9; 2 Crónicas 33:1-13',
    keyAction: 'Derramou muito sangue inocente e fez Judá pecar gravemente.'
  },
  {
    id: 'k5',
    name: 'Asa',
    kingdom: 'Judá (Sul)',
    verdict: 'bom',
    reignYears: '41 anos (977–937 a.C.)',
    summary: 'Removeu a idolatria em Judá, depôs a sua avó Maacá do posto de rainha-mãe por fazer um ídolo obsceno e venceu os etíopes.',
    biblicalRecord: '1 Reis 15:9-14; 2 Crónicas 14:1-12',
    keyAction: 'O coração de Asa foi pleno para com Jeová durante todos os seus dias.'
  },
  {
    id: 'k6',
    name: 'Jeroboão I',
    kingdom: 'Israel (Norte)',
    verdict: 'mau',
    reignYears: '22 anos (997–976 a.C.)',
    summary: 'Primeiro rei das 10 tribos. Ergueu bezerros de ouro em Dã e Betel temendo que o povo voltasse a Jerusalém.',
    biblicalRecord: '1 Reis 12:26-33',
    keyAction: 'Introduziu o pecado de bezerros que manchou todos os reis subsequentes de Israel.'
  },
  {
    id: 'k7',
    name: 'Jeosafá',
    kingdom: 'Judá (Sul)',
    verdict: 'bom',
    reignYears: '25 anos (936–911 a.C.)',
    summary: 'Enviou príncipes e levitas pelas cidades para ensinar a Lei de Jeová ao povo. Venceu uma vasta aliança através da fé e do louvor.',
    biblicalRecord: '2 Crónicas 17:7-10; 20:1-24',
    keyAction: 'Andou nos caminhos de Davi e buscou o Deus de seu pai.'
  },
  {
    id: 'k8',
    name: 'Acaz',
    kingdom: 'Judá (Sul)',
    verdict: 'mau',
    reignYears: '16 anos (761–745 a.C.)',
    summary: 'Fechou as portas do templo de Jeová, copiou um altar pagão de Damasco e queimou os próprios filhos em sacrifício.',
    biblicalRecord: '2 Reis 16:1-4; 2 Crónicas 28:1-4',
    keyAction: 'Agia com infidelidade contínua contra Jeová.'
  }
];
