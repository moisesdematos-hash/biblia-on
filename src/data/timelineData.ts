// src/data/timelineData.ts
import type { TimelineEvent } from '../types';

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 't_criacao',
    title: 'Criação do Homem (Adão e Eva)',
    yearApproximate: '4026 a.C.',
    isApproximate: true,
    category: 'patriarcas',
    description: 'Deus cria o primeiro homem no jardim do Éden a partir do pó do solo como uma alma vivente.',
    keyScriptures: ['Gênesis 1:26-28', 'Gênesis 2:7'],
    keyFigures: ['Adão', 'Eva'],
    location: 'Jardim do Éden (região dos rios Eufrates e Tigre)'
  },
  {
    id: 't_diluvio',
    title: 'O Dilúvio Global nos Dias de Noé',
    yearApproximate: '2370 a.C.',
    isApproximate: true,
    category: 'patriarcas',
    description: 'Catástrofe aquática global que purificou a terra da violência dos nefilins; preservação de Noé e sua família na arca.',
    keyScriptures: ['Gênesis 7:11-24', '1 Pedro 3:20'],
    keyFigures: ['Noé', 'Sem', 'Cam', 'Jafé'],
    location: 'Montes de Ararate'
  },
  {
    id: 't_abraao_pacto',
    title: 'Pacto Abraâmico e Saída de Ur',
    yearApproximate: '1943 a.C.',
    isApproximate: true,
    category: 'patriarcas',
    description: 'Abraão atravessa o rio Eufrates e entra em Canaã; validação do pacto da promessa.',
    keyScriptures: ['Gênesis 12:1-4', 'Gálatas 3:17'],
    keyFigures: ['Abraão', 'Sara', 'Ló', 'Melquisedeque'],
    location: 'Ur, Harã, Canaã'
  },
  {
    id: 't_exodo',
    title: 'O Êxodo do Egito e o Pacto da Lei no Sinai',
    yearApproximate: '1513 a.C.',
    isApproximate: true,
    category: 'exodo',
    description: 'Libertação de Israel após as Dez Pragas, travessia do Mar Vermelho e outorga dos Dez Mandamentos no Sinai.',
    keyScriptures: ['Êxodo 12:40-41', 'Êxodo 20:1-17'],
    keyFigures: ['Moisés', 'Aarão', 'Miriã', 'Josué'],
    location: 'Egito, Mar Vermelho, Monte Sinai'
  },
  {
    id: 't_david_rei',
    title: 'Reinado de David em Toda a Nação de Israel',
    yearApproximate: '1077 a 1037 a.C.',
    isApproximate: true,
    category: 'monarquia',
    description: 'Conquista de Jerusalém, estabelecimento de Sião como centro de adoração e pacto para o Reino eterno.',
    keyScriptures: ['2 Samuel 5:4-5', '2 Samuel 7:12-16'],
    keyFigures: ['David', 'Natã', 'Jonatas', 'Salomão'],
    location: 'Hebrom, Jerusalém'
  },
  {
    id: 't_exilio_babilonia',
    title: 'Destruição de Jerusalém e Início do Exílio em Babilônia',
    yearApproximate: '607 a.C. / c. 586 a.C.',
    isApproximate: true,
    category: 'exilio',
    description: 'Destruição do Templo de Salomão pelo exército babilônico de Nabucodonosor e desolação de Judá por 70 anos.',
    keyScriptures: ['2 Reis 25:8-11', 'Jeremias 25:11-12', 'Daniel 9:2'],
    keyFigures: ['Jeremias', 'Ezequiel', 'Daniel', 'Nabucodonosor'],
    location: 'Jerusalém, Babilônia'
  },
  {
    id: 't_jesus_morte',
    title: 'Ministério, Morte na Estaca e Ressurreição de Jesus',
    yearApproximate: '29 a 33 d.C.',
    isApproximate: false,
    category: 'jesus',
    description: 'Batismo no Jordão, ministério do Reino por 3 anos e meio, morte sacrificial na Páscoa e ressurreição ao 3º dia.',
    keyScriptures: ['Lucas 3:23', 'Mateus 27:45-54', 'Atos 2:32'],
    keyFigures: ['Jesus Cristo', 'João Batista', 'Pedro', 'Maria'],
    location: 'Judeia, Galileia, Getsêmani, Gólgota'
  },
  {
    id: 't_pentecostes',
    title: 'Derramamento do Espírito Santo no Pentecostes',
    yearApproximate: '33 d.C.',
    isApproximate: false,
    category: 'apostolos',
    description: 'Nascimento da congregação cristã ungida com línguas de fogo e testemunho corajoso em Jerusalém.',
    keyScriptures: ['Atos 2:1-47'],
    keyFigures: ['Pedro', '12 Apóstolos', 'Discípulos'],
    location: 'Jerusalém (quarto de cima)'
  }
];
