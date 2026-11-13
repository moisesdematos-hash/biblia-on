// src/data/charactersData.ts
import type { Character } from '../types';

export const CHARACTERS_DATA: Character[] = [
  {
    id: 'melquisedeque',
    name: 'Melquisedeque',
    nameMeaning: 'Rei de Justiça (Hebraico: Malki-Tsédeq)',
    period: 'c. 1930 a.C. (Época Patriarcal)',
    location: 'Salém (posterior Jerusalém)',
    family: {
      father: 'Sem registro genealógico intencional nas Escrituras',
      mother: 'Sem registro genealógico nas Escrituras'
    },
    events: [
      'Encontrou Abraão após a derrota de Quedorlaomer e reis aliados no vale de Savé.',
      'Abençoou Abraão em nome do Deus Altíssimo (El Elyon).',
      'Recebeu os dízimos de tudo o que Abraão trazia.',
      'Serviu como rei de Salém e sacerdote de Deus simultaneamente.'
    ],
    qualities: [
      'Justiça exemplar',
      'Hospitalidade e reverência ao Altíssimo',
      'Fidelidade sacerdotal'
    ],
    decisions: [
      'Reconheceu a bênção divina sobre Abraão e prestou-lhe assistência com pão e vinho.'
    ],
    consequences: [
      'Tornou-se o protótipo profético definitivo do sacerdócio eterno de Jesus Cristo (Salmo 110:4; Hebreus 7).'
    ],
    keyVerses: [
      'Gênesis 14:18-20',
      'Salmos 110:4',
      'Hebreus 5:6, 10',
      'Hebreus 7:1-17'
    ],
    lessons: [
      'A fidelidade a Deus independe de linhagem sacerdotal levítica.',
      'Prefiguração perfeita do sacerdócio régio eterno do Messias.',
      'Reconhecimento de Deus como Soberano e Criador de todas as coisas.'
    ],
    timelineEra: 'patriarcas',
    relatedCharacters: ['abraao', 'jesus']
  },
  {
    id: 'abraao',
    name: 'Abraão',
    nameMeaning: 'Pai de uma Multidão (Originalmente Abrão: Pai Elevado)',
    period: 'c. 2018 a 1843 a.C.',
    location: 'Ur dos Caldeus, Harã, Canaã, Hebrom',
    family: {
      father: 'Terá',
      spouse: ['Sara', 'Quetura', 'Agar'],
      children: ['Isaque', 'Ismael', 'Zinrã', 'Jocsã', 'Medã', 'Midiã', 'Isbaque', 'Suá']
    },
    events: [
      'Chamado por Deus para sair de Ur e peregrinar na terra da promessa.',
      'Recebeu o pacto abraâmico com a promessa de que todas as nações seriam abençoadas por meio de seu descendente.',
      'Demonstrou fé suprema ao estar disposto a oferecer Isaque no monte Moriá.',
      'Intercedeu com humildade e persistência em favor dos justos de Sodoma.'
    ],
    qualities: [
      'Fé inabalável ("Pai de todos os que têm fé")',
      'Generosidade e hospitalidade com estranhos',
      'Paz e desprendimento material'
    ],
    flawsOrErrors: [
      'Apresentou Sara como sua irmã no Egito e em Gerar por receio prudente pela vida.'
    ],
    decisions: [
      'Obedeceu prontamente à voz de Deus sem hesitar quanto ao destino geográfico desconhecido.'
    ],
    consequences: [
      'Tornou-se amigo de Jeová Deus (Isaías 41:8; Tiago 2:23) e pai da linhagem do Messias.'
    ],
    keyVerses: [
      'Gênesis 12:1-3',
      'Gênesis 15:6',
      'Gênesis 22:1-18',
      'Romanos 4:1-12',
      'Hebreus 11:8-19'
    ],
    lessons: [
      'A fé genuína é demonstrada por ações práticas e obediência total.',
      'A amizade com Deus é o maior privilégio que um ser humano pode desfrutar.'
    ],
    timelineEra: 'patriarcas',
    relatedCharacters: ['melquisedeque', 'sara', 'isaque', 'lo']
  },
  {
    id: 'moises',
    name: 'Moisés',
    nameMeaning: 'Tirado da Água (Hebraico: Moshéh)',
    period: '1593 a 1473 a.C.',
    location: 'Egito, Midiã, Deserto do Sinai, Moabe',
    family: {
      father: 'Anrão',
      mother: 'Joquebede',
      spouse: ['Zípora'],
      children: ['Gérson', 'Eliézer']
    },
    events: [
      'Salvo do decreto de morte do Faraó no rio Nilo.',
      'Escolheu ser maltratado com o povo de Deus em vez de usufruir dos prazeres do Egito.',
      'Encontrou Jeová no arbusto ardente no monte Horebe.',
      'Liderou o Êxodo de Israel e a travessia milagrosa do Mar Vermelho.',
      'Mediador do pacto da Lei no Monte Sinai e redator do Pentateuco.'
    ],
    qualities: [
      'O homem mais manso da face da terra (Números 12:3)',
      'Lealdade incondicional a Jeová',
      'Zelo pela santificação do nome divino'
    ],
    flawsOrErrors: [
      'Impaciência em Meribá, deixando de atribuir publicamente o mérito da água a Jeová.'
    ],
    decisions: [
      'Renunciou à nobreza e ao trono do Egito pela causa de Deus.'
    ],
    consequences: [
      'Não entrou na Terra Prometida, mas contemplou-a do alto do monte Nebo com visão preservada e amado por Deus.'
    ],
    keyVerses: [
      'Êxodo 3:1-15',
      'Êxodo 20:1-17',
      'Números 12:3',
      'Deuteronômio 34:10-12',
      'Hebreus 11:24-29'
    ],
    lessons: [
      'A mansidão e a força espiritual caminham de mãos dadas.',
      'A glória e os milagres pertencem unicamente a Deus.'
    ],
    timelineEra: 'exodo',
    relatedCharacters: ['arao', 'miriã', 'josue']
  },
  {
    id: 'david',
    name: 'David',
    nameMeaning: 'Amado',
    period: '1107 a 1037 a.C.',
    location: 'Belém, Deserto de Judá, Hebrom, Jerusalém',
    family: {
      father: 'Jessé',
      spouse: ['Mical', 'Abigail', 'Bate-Seba e outras'],
      children: ['Salomão', 'Absalão', 'Amnon', 'Adonias e outros']
    },
    events: [
      'Ungido por Samuel enquanto ainda era um jovem pastor de ovelhas.',
      'Derrotou o gigante Golias com funda e pedra em nome de Jeová dos exércitos.',
      'Perseguido injustamente pelo rei Saul por longos anos nas cavernas.',
      'Conquistou Jerusalém (Sião) e estabeleceu-a como capital do reino unificado.',
      'Recebeu o pacto do Reino eterno para a sua linhagem régia.'
    ],
    qualities: [
      'Homem segundo o coração de Deus',
      'Coragem extraordinária baseada na fé',
      'Compositor e poeta inspirado dos Salmos'
    ],
    flawsOrErrors: [
      'Pecado com Bate-Seba e envolvimento na morte de Urias.',
      'Recenseamento pecaminoso de Israel.'
    ],
    decisions: [
      'Arrependeu-se profundamente e aceitou com submissão a disciplina divina sem desculpas.'
    ],
    consequences: [
      'Perdoado por Deus quanto à vida eterna, embora sofrendo duras consequências domésticas.',
      'Linhagem estabelecida até o nascimento do Messias (Jesus).'
    ],
    keyVerses: [
      '1 Samuel 16:7',
      '1 Samuel 17:45-47',
      '2 Samuel 7:12-16',
      'Salmos 23:1-6',
      'Salmos 51:1-17'
    ],
    lessons: [
      'Deus olha para a integridade interior e não para as aparências exteriores.',
      'O arrependimento genuíno restaura a comunhão com Deus.'
    ],
    timelineEra: 'monarquia',
    relatedCharacters: ['saul', 'jonatas', 'salomao', 'samuel']
  },
  {
    id: 'daniel',
    name: 'Daniel',
    nameMeaning: 'Meu Juiz É Deus (Babilônio: Baltazar)',
    period: 'c. 620 a 536 a.C.',
    location: 'Jerusalém, Babilônia, Susã (Império Medo-Persa)',
    family: {
      father: 'Linhagem nobre de Judá'
    },
    events: [
      'Levado cativo para a Babilônia ainda jovem por Nabucodonosor.',
      'Recusou as iguarias reais e o vinho contaminado com idolatria.',
      'Interpretou o sonho da imensa estátua (Daniel 2) e a visão dos animais (Daniel 7).',
      'Preservado milagrosamente na cova dos leões sob o rei Dario, o Medo.',
      'Recebeu a profecia das 70 semanas até o aparecimento do Messias (Daniel 9).'
    ],
    qualities: [
      'Homem muito precioso aos olhos de Deus',
      'Fidelidade inabalável em meio ao paganismo',
      'Estudo diligente das profecias e oração três vezes ao dia'
    ],
    decisions: [
      'Resolveu no seu coração não se manchar com os banquetes do rei.',
      'Manteve a sua adoração aberta a Jeová mesmo sob ameaça de pena capital.'
    ],
    consequences: [
      'Elevado a posições de altíssima autoridade governamental sob múltiplos impérios mundiais.'
    ],
    keyVerses: [
      'Daniel 1:8',
      'Daniel 2:44',
      'Daniel 6:10, 22',
      'Daniel 9:24-27',
      'Daniel 12:13'
    ],
    lessons: [
      'A lealdade a Deus em pequenas coisas fortalece para os maiores testes.',
      'Deus é o Soberano Supremo que muda tempos e governos humanos.'
    ],
    timelineEra: 'exilio',
    relatedCharacters: ['nabucodonosor', 'ciro', 'dario']
  },
  {
    id: 'jesus',
    name: 'Jesus Cristo',
    nameMeaning: 'Jeová É Salvação (Grego: Iesoús; Hebraico: Yeshúa)',
    period: 'c. 2 a.C. a 33 d.C.',
    location: 'Belém, Nazaré, Galileia, Samaria, Judeia, Jerusalém',
    family: {
      mother: 'Maria',
      father: 'Gerado pelo espírito santo de Deus (José foi seu pai adotivo)',
      children: ['Sem descendência carnal; Pai Eterno profético da humanidade obediente']
    },
    events: [
      'Nascido em Belém em cumprimento de Miqueias 5:2.',
      'Batizado no rio Jordão por João Batista, ungido com espírito santo.',
      'Venceu as tentações de Satanás no deserto citando Deuteronômio.',
      'Pregou as boas novas do Reino de Deus e realizou milagres compassivos.',
      'Instituiu a Refeição Noturna com pão e vinho.',
      'Entregou a sua vida como resgate numa estaca de execução.',
      'Ressuscitado por Deus no terceiro dia como criatura espiritual imortal.',
      'Ascendeu ao céu à direita do Pai aguardando a coroação régia.'
    ],
    qualities: [
      'Santo, inocente, imaculado, separado dos pecadores (Hebreus 7:26)',
      'Amor perfeito, compaixão e humildade suprema',
      'Obediência total até à morte na estaca'
    ],
    decisions: [
      'Fazer sempre a vontade do Pai e não a sua própria.',
      'Dar a sua vida em resgate por muitos (Marcos 10:45).'
    ],
    consequences: [
      'Provou que um ser humano perfeito pode manter integridade perfeita a Deus.',
      'Providenciou o fundamento legal para a redenção e ressurreição da humanidade.'
    ],
    keyVerses: [
      'Mateus 20:28',
      'João 3:16',
      'João 14:6, 28',
      'Filipenses 2:5-11',
      'Hebreus 12:2'
    ],
    lessons: [
      'Seguir os seus passos com fidelidade e humildade.',
      'O Reino de Deus é o tema central de toda a Bíblia.'
    ],
    timelineEra: 'jesus',
    relatedCharacters: ['maria', 'jose', 'joao_batista', 'pedro', 'paulo']
  },
  {
    id: 'paulo',
    name: 'Apóstolo Paulo',
    nameMeaning: 'Pequeno / Pouco (Originalmente Saulo de Tarso)',
    period: 'c. 5 a 65 d.C.',
    location: 'Tarso, Jerusalém, Antioquia, Ásia Menor, Grécia, Roma',
    family: {
      father: 'Fariseu da tribo de Benjamim, cidadão romano'
    },
    events: [
      'Instruído aos pés de Gamaliel na estrita Lei mosaica.',
      'Perseguiu tenazmente os discípulos de Cristo até à estrada de Damasco.',
      'Visão miraculosa do Cristo ressuscitado e conversão radical.',
      'Três grandes viagens missionárias estabelecendo congregações cristãs.',
      'Redator de 14 cartas inspiradas do Novo Testamento.',
      'Preso e julgado perante governadores romanos e César em Roma.'
    ],
    qualities: [
      'Zelo incansável e amor pelas congregações',
      'Profunda honestidade espiritual e humildade',
      'Capacidade argumentativa e exegese brilhante'
    ],
    decisions: [
      'Considerou todas as vantagens sociais anteriores como perda pela excelência de Cristo.'
    ],
    consequences: [
      'Tornou-se o vaso escolhido para levar o nome de Cristo às nações gentílicas.'
    ],
    keyVerses: [
      'Atos 9:1-19',
      'Romanos 8:38-39',
      '1 Coríntios 9:22',
      'Gálatas 2:20',
      '2 Timóteo 4:7-8'
    ],
    lessons: [
      'Ninguém está além do alcance da graça e transformação de Deus.',
      'Combater o bom combate da fé com perseverança até ao fim.'
    ],
    timelineEra: 'apostolos',
    relatedCharacters: ['jesus', 'pedro', 'lucas', 'timoteo', 'barnabe']
  }
];

export function getCharacterById(id: string): Character | undefined {
  return CHARACTERS_DATA.find(c => c.id === id);
}
