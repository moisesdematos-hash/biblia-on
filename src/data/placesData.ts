// src/data/placesData.ts
import type { BiblicalPlace } from '../types';

export interface ExtendedBiblicalPlace extends BiblicalPlace {
  canaanCoordinates?: { x: number; y: number }; // Percentual para o mapa regional de Canaã (0-100)
  category: 'cidade' | 'montanha' | 'mar_rio' | 'regiao' | 'santuario';
  epoch: 'patriarcas' | 'exodo' | 'monarquia' | 'exilio' | 'evangelhos' | 'apostolos';
}

export const PLACES_DATA: ExtendedBiblicalPlace[] = [
  {
    id: 'jerusalem',
    name: 'Jerusalém (Salém / Sião)',
    modernName: 'Al-Quds / Yerushalayim',
    region: 'Montanhas da Judeia',
    category: 'cidade',
    epoch: 'monarquia',
    confirmedLocation: true,
    coordinates: { x: 57.4, y: 59.3 },
    canaanCoordinates: { x: 50.0, y: 62.8 },
    description: 'Cidade da paz e capital da monarquia unida e do reino de Judá. Local do monte Moriá onde Salomão construiu o Templo sagrado dedicado a Jeová. Palco dos acontecimentos culminantes do ministério terrestre e execução de Jesus Cristo na estaca de execução.',
    majorEvents: [
      'Encontro do rei-sacerdote Melquisedeque com Abraão (Gênesis 14)',
      'Conquista da fortaleza de Sião por David',
      'Dedicação solene do Templo por Salomão com a glória de Jeová',
      'Execução e ressurreição de Jesus Cristo',
      'Derramamento do Espírito Santo no Pentecostes de 33 d.C.'
    ],
    associatedCharacters: ['Melquisedeque', 'David', 'Salomão', 'Ezequias', 'Jesus Cristo', 'Pedro'],
    keyVerses: ['Gênesis 14:18', 'Salmos 122:6', 'Lucas 24:52', 'Atos 1:8', 'Hebreus 7:1-3']
  },
  {
    id: 'belem',
    name: 'Belém Efrata',
    modernName: 'Beit Lahm',
    region: 'Judeia (8 km ao sul de Jerusalém)',
    category: 'cidade',
    epoch: 'evangelhos',
    confirmedLocation: true,
    coordinates: { x: 57.4, y: 60.7 },
    canaanCoordinates: { x: 50.0, y: 67.8 },
    description: 'Pequena povoação agrícola nas colinas de Judá cercada por campos férteis. Cidade natal do rei David e local profético do nascimento humano de Jesus, cumprindo a profecia messiânica de Miqueias 5:2.',
    majorEvents: [
      'Sepultamento da matriarca Raquel no caminho de Efrata',
      'História de lealdade de Rute com Boaz durante a colheita da cevada',
      'Unção do pastorzinho David pelo profeta Samuel',
      'Nascimento virginal de Jesus Cristo em cumprimento profético'
    ],
    associatedCharacters: ['Rute', 'Boaz', 'David', 'Jesus Cristo', 'Maria', 'José'],
    keyVerses: ['Miqueias 5:2', 'Mateus 2:1-6', 'Lucas 2:4-7', 'Rute 4:11']
  },
  {
    id: 'nazare',
    name: 'Nazaré',
    modernName: 'En-Nasira',
    region: 'Baixa Galileia',
    category: 'cidade',
    epoch: 'evangelhos',
    confirmedLocation: true,
    coordinates: { x: 57.5, y: 53.0 },
    canaanCoordinates: { x: 46.6, y: 27.8 },
    description: 'Aldeia montanhosa nas colinas da Baixa Galileia. Cidade onde o anjo Gabriel visitou Maria e onde Jesus passou a infância e juventude trabalhando como carpinteiro, motivo pelo qual foi conhecido como "o Nazareno".',
    majorEvents: [
      'Anúncio do anjo Gabriel a Maria sobre a concepção miraculosa',
      'Juventude de Jesus crescendo em sabedoria, estatura e favor divino',
      'Leitura pública do rolo do profeta Isaías na sinagoga local'
    ],
    associatedCharacters: ['Jesus Cristo', 'José', 'Maria', 'Natanael'],
    keyVerses: ['Lucas 1:26-38', 'Lucas 4:16-30', 'Mateus 2:23', 'João 1:46']
  },
  {
    id: 'cafarnaum',
    name: 'Cafarnaum',
    modernName: 'Kfar Nahum / Tell Hum',
    region: 'Noroeste do Mar da Galileia',
    category: 'cidade',
    epoch: 'evangelhos',
    confirmedLocation: true,
    coordinates: { x: 58.2, y: 51.3 },
    canaanCoordinates: { x: 60.0, y: 22.8 },
    description: 'Próspera vila de pescadores na rota comercial Via Maris, às margens do Mar da Galileia. Conhecida como "a sua própria cidade" por Jesus durante seu ministério público na Galileia.',
    majorEvents: [
      'Cura do servo do centurião e da sogra de Pedro',
      'Cura do paralítico descido pelo teto da casa',
      'Discurso do "Pão da Vida" proferido na sinagoga de Cafarnaum',
      'Chamado de Mateus (Levi) na coletoria de impostos'
    ],
    associatedCharacters: ['Jesus Cristo', 'Pedro', 'André', 'Mateus', 'Centurião'],
    keyVerses: ['Mateus 4:13', 'Marcos 2:1-12', 'João 6:24-59']
  },
  {
    id: 'monte_sinai',
    name: 'Monte Sinai (Horebe)',
    modernName: 'Jabal Musa (Tradição) / Península do Sinai',
    region: 'Península do Sinai',
    category: 'montanha',
    epoch: 'exodo',
    confirmedLocation: false,
    coordinates: { x: 53.8, y: 84.1 },
    canaanCoordinates: { x: 20.0, y: 92.0 },
    description: 'A sublime "montanha do verdadeiro Deus", onde Moisés presenciou a sarça ardente e mais tarde o povo de Israel acampou ao receber a Lei da Aliança e as Duas Tábuas do Testemunho das mãos de Jeová.',
    majorEvents: [
      'Chamado divino de Moisés na sarça ardente que não se consumia',
      'Proclamação dos Dez Mandamentos em meio a trovões, fumaça e toque de buzina',
      'Construção do Tabernáculo sob o modelo celestial revelado no monte',
      'Fuga do profeta Elias e conversa com Jeová na voz mansa e baixa'
    ],
    associatedCharacters: ['Moisés', 'Aarão', 'Josué', 'Elias'],
    keyVerses: ['Êxodo 3:1-12', 'Êxodo 19:16-25', 'Êxodo 20:1-17', '1 Reis 19:8-18']
  },
  {
    id: 'jerico',
    name: 'Jericó (Cidade das Palmeiras)',
    modernName: 'Ariha / Tell es-Sultan',
    region: 'Vale do Jordão (Depressão do Mar Salgado)',
    category: 'cidade',
    epoch: 'exodo',
    confirmedLocation: true,
    coordinates: { x: 58.0, y: 58.7 },
    canaanCoordinates: { x: 58.3, y: 60.0 },
    description: 'Uma das cidades continuamente habitadas mais antigas do mundo, situada num oásis fértil 250 metros abaixo do nível do mar. Primeira fortaleza cananeia conquistada milagrosamente pelos israelitas liderados por Josué.',
    majorEvents: [
      'Acolhimento dos espiões israelitas pela fiel Raabe',
      'Queda miraculosa das muralhas após o povo marchar 7 dias',
      'Cura das águas estéreis pelo profeta Eliseu com sal',
      'Encontro transformador de Jesus com o cobrador de impostos Zaqueu'
    ],
    associatedCharacters: ['Raabe', 'Josué', 'Eliseu', 'Zaqueu', 'Bartimeu'],
    keyVerses: ['Josué 2:1-21', 'Josué 6:1-27', 'Lucas 19:1-10', 'Hebreus 11:30-31']
  },
  {
    id: 'monte_carmelo',
    name: 'Monte Carmelo',
    modernName: 'Har HaKarmel',
    region: 'Costa Noroeste de Canaã',
    category: 'montanha',
    epoch: 'monarquia',
    confirmedLocation: true,
    coordinates: { x: 56.6, y: 52.0 },
    canaanCoordinates: { x: 35.0, y: 24.2 },
    description: 'Proeminente cordilheira verdejante que se projeta no Mar Mediterrâneo. Célebre pelo confronto histórico entre o profeta Elias e os 450 profetas de Baal para provar quem é o verdadeiro Deus.',
    majorEvents: [
      'O grande teste do fogo: Jeová responde à oração de Elias consumindo o sacrifício',
      'Execução dos falsos profetas de Baal no ribeiro de Quisom',
      'Oração fervorosa de Elias pela chuva após três anos e meio de seca'
    ],
    associatedCharacters: ['Elias', 'Acabe', 'Jezabel', 'Eliseu'],
    keyVerses: ['1 Reis 18:19-46', '2 Reis 4:25', 'Isaías 35:2']
  },
  {
    id: 'hebrom',
    name: 'Hebrom (Quiriate-Arba)',
    modernName: 'Al-Khalil',
    region: 'Montanhas do Sul da Judeia',
    category: 'cidade',
    epoch: 'patriarcas',
    confirmedLocation: true,
    coordinates: { x: 57.2, y: 62.7 },
    canaanCoordinates: { x: 46.6, y: 75.7 },
    description: 'Cidade venerável nas terras altas de Judá. Lar dos grandes carvalhos de Manre onde Abraão montou tendas e comprou o campo de Macpela como sepultura familiar para os patriarcas.',
    majorEvents: [
      'Permanência de Abraão e recepção dos anjos visitantes',
      'Compra da caverna de Macpela para o sepultamento de Sara',
      'Calebe herda a cidade por sua fé inabalável em Jeová aos 85 anos',
      'Primeira capital do rei David durante seus primeiros 7 anos e meio de reinado'
    ],
    associatedCharacters: ['Abraão', 'Sara', 'Isaque', 'Calebe', 'David'],
    keyVerses: ['Gênesis 13:18', 'Gênesis 23:1-20', 'Josué 14:13-15', '2 Samuel 2:1-4']
  },
  {
    id: 'mar_galileia',
    name: 'Mar da Galileia (Quinerete / Tiberíades)',
    modernName: 'Lago Kinneret',
    region: 'Vale do Rift Jordaniano',
    category: 'mar_rio',
    epoch: 'evangelhos',
    confirmedLocation: true,
    coordinates: { x: 58.0, y: 51.5 },
    canaanCoordinates: { x: 61.6, y: 25.7 },
    description: 'Lago de água doce em formato de harpa situado a 210 metros abaixo do nível do mar, cercado por encostas e sujeito a ventos repentinos. Palco de inúmeros milagres e ensinos de Jesus.',
    majorEvents: [
      'Jesus acalma uma tempestade violenta com uma simples ordem',
      'Caminhada de Jesus e de Pedro sobre as águas agitadas',
      'Pesca milagrosa que levou Pedro, Tiago e João a abandonarem tudo',
      'Aparição do Cristo ressuscitado aos discípulos na praia'
    ],
    associatedCharacters: ['Jesus Cristo', 'Pedro', 'João', 'Tiago', 'André'],
    keyVerses: ['Mateus 8:23-27', 'Mateus 14:22-33', 'Lucas 5:1-11', 'João 21:1-14']
  },
  {
    id: 'mar_morto',
    name: 'Mar Salgado (Mar Morto / Arabá)',
    modernName: 'Bahr al-Mayyit / Yam HaMelah',
    region: 'Ponto mais baixo da crosta terrestre',
    category: 'mar_rio',
    epoch: 'patriarcas',
    confirmedLocation: true,
    coordinates: { x: 58.2, y: 61.0 },
    canaanCoordinates: { x: 62.5, y: 72.8 },
    description: 'Lago hipersalino encravado na grande fenda do Jordão, situado a mais de 430 metros abaixo do nível do mar. Em suas proximidades floresciam antigamente as cidades da planície (Sodoma e Gomorra).',
    majorEvents: [
      'Batalha do vale de Sidim narrada em Gênesis 14',
      'Destruição de Sodoma e Gomorra com fogo e enxofre dos céus',
      'Refúgio de David no deserto de En-Gedi à beira de seus penhascos',
      'Esconderijo dos manuscritos bíblicos sagrados nas cavernas de Qumran'
    ],
    associatedCharacters: ['Ló', 'Abraão', 'David', 'Escribas Essênios'],
    keyVerses: ['Gênesis 14:3', 'Gênesis 19:24-29', '1 Samuel 23:29', 'Ezequiel 47:8-10']
  },
  {
    id: 'rio_jordao',
    name: 'Rio Jordão',
    modernName: 'Nahr al-Urdun',
    region: 'Vale da Fenda Siro-Africana',
    category: 'mar_rio',
    epoch: 'exodo',
    confirmedLocation: true,
    coordinates: { x: 58.0, y: 55.0 },
    canaanCoordinates: { x: 61.0, y: 44.0 },
    description: 'O principal rio de Israel, nascido no Monte Hermom e correndo veloz para o sul através do Mar da Galileia até desaguar no Mar Salgado. Linha de passagem sagrada para a Terra Prometida.',
    majorEvents: [
      'Travessia miraculosa de Israel a seco liderada por Josué com a Arca',
      'Separação das águas pelos mantos proféticos de Elias e Eliseu',
      'Cura da lepra do comandante sírio Naamã após mergulhar sete vezes',
      'Batismo de Jesus Cristo por João Batista e abertura dos céus'
    ],
    associatedCharacters: ['Josué', 'Elias', 'Eliseu', 'João Batista', 'Jesus Cristo'],
    keyVerses: ['Josué 3:14-17', '2 Reis 2:8', '2 Reis 5:14', 'Mateus 3:13-17']
  },
  {
    id: 'monte_oliveiras',
    name: 'Monte das Oliveiras',
    modernName: 'Jabal az-Zaytūn / Har HaZeitim',
    region: 'A leste de Jerusalém, além do vale do Cídron',
    category: 'montanha',
    epoch: 'evangelhos',
    confirmedLocation: true,
    coordinates: { x: 57.6, y: 59.2 },
    canaanCoordinates: { x: 51.5, y: 62.5 },
    description: 'Colina alongada com olivais ancestrais situada a leste do Monte do Templo. Local de refúgio, oração e grandes profecias escatológicas de Jesus Cristo.',
    majorEvents: [
      'Fuga chorosa do rei David perante a revolta de Absalão',
      'A profecia de Jesus sobre o sinal de sua presença e o fim do sistema',
      'Agonia e oração fervorosa de Jesus no jardim de Getsêmani',
      'Ascensão triunfante de Jesus ressuscitado aos céus'
    ],
    associatedCharacters: ['David', 'Jesus Cristo', 'Pedro', 'Tiago', 'João'],
    keyVerses: ['Mateus 24:3', 'Lucas 22:39-46', 'Atos 1:9-12', 'Zacarias 14:4']
  },
  {
    id: 'babilonia',
    name: 'Babilônia',
    modernName: 'Perto de Al-Hillah, Iraque',
    region: 'Planície de Sinear / Rio Eufrates',
    category: 'cidade',
    epoch: 'exilio',
    confirmedLocation: true,
    coordinates: { x: 77.5, y: 49.2 },
    description: 'Metrópole imperial mesopotâmica às margens do rio Eufrates. Berço do desafio da Torre de Babel sob Ninrode, centro do império neobabilônico de Nabucodonosor e local do exílio de 70 anos do povo judeu.',
    majorEvents: [
      'Construção da Torre de Babel e confusão divina dos idiomas',
      'Destruição de Jerusalém e cativeiro judaico sob Nabucodonosor',
      'Fidelidade inabalável de Daniel na cova dos leões e dos três hebreus na fornalha',
      'Queda repentina ante Ciro o Grande em 539 a.C. profetizada por Isaías'
    ],
    associatedCharacters: ['Ninrode', 'Nabucodonosor', 'Daniel', 'Belsazar', 'Ciro'],
    keyVerses: ['Gênesis 11:1-9', 'Jeremias 51:6-9', 'Daniel 5:25-31', 'Isaías 45:1-3']
  },
  {
    id: 'ur_dos_caldeus',
    name: 'Ur dos Caldeus',
    modernName: 'Tell el-Mukayyar, Iraque',
    region: 'Baixa Mesopotâmia / Próximo ao Golfo Pérsico',
    category: 'cidade',
    epoch: 'patriarcas',
    confirmedLocation: true,
    coordinates: { x: 82.5, y: 61.7 },
    description: 'Rica cidade-estado suméria cosmopolita com zigurates e sofisticado comércio. Cidade de onde Abraão partiu em obediência à chamada de Jeová, abandonando o conforto material por uma pátria melhor.',
    majorEvents: [
      'Chamado soberano de Jeová a Abrão para deixar sua parentela',
      'Partida fiel de Abraão e Sara rumo a uma terra que não conheciam'
    ],
    associatedCharacters: ['Abraão', 'Sara', 'Terá', 'Ló'],
    keyVerses: ['Gênesis 11:31', 'Gênesis 15:7', 'Atos 7:2-4', 'Hebreus 11:8-10']
  },
  {
    id: 'hara',
    name: 'Harã',
    modernName: 'Altınbaşak / Harran, Turquia',
    region: 'Noroeste da Mesopotâmia (Padã-Arã)',
    category: 'cidade',
    epoch: 'patriarcas',
    confirmedLocation: true,
    coordinates: { x: 65.0, y: 30.8 },
    description: 'Importante entreposto de caravanas no cruzamento entre os rios Eufrates e Tigre. Estação onde Terá faleceu e onde Jacó serviu a Labão por vinte anos.',
    majorEvents: [
      'Morte de Terá e retomada da viagem de Abraão rumo a Canaã',
      'Encontro do servo de Abraão com Rebeca no poço',
      'Trabalho de Jacó pelos rebanhos de Labão e casamento com Leia e Raquel'
    ],
    associatedCharacters: ['Abraão', 'Terá', 'Jacó', 'Labão', 'Raquel', 'Leia'],
    keyVerses: ['Gênesis 12:4-5', 'Gênesis 24:10', 'Gênesis 28:10', 'Gênesis 29:1-30']
  },
  {
    id: 'ninive',
    name: 'Nínive',
    modernName: 'Mosul, Iraque',
    region: 'Assíria / Rio Tigre',
    category: 'cidade',
    epoch: 'monarquia',
    confirmedLocation: true,
    coordinates: { x: 73.5, y: 29.2 },
    description: 'Imponente capital militar do Império Assírio, conhecida pela sua crueldade marcial. Destino da missão profética de Jonas e alvo dos oráculos de Naum.',
    majorEvents: [
      'Proclamação do profeta Jonas e arrependimento geral dos ninivitas com jejum',
      'Fracasso do rei Senaqueribe perante Jerusalém após ameaçar o Deus vivo Jeová',
      'Destruição final da cidade profetizada com rigor por Naum'
    ],
    associatedCharacters: ['Jonas', 'Senaqueribe', 'Naum', 'Sofonias'],
    keyVerses: ['Jonas 3:1-10', '2 Reis 19:35-37', 'Naum 3:1-7', 'Mateus 12:41']
  },
  {
    id: 'roma',
    name: 'Roma',
    modernName: 'Roma, Itália',
    region: 'Península Itálica / Rio Tibre',
    category: 'cidade',
    epoch: 'apostolos',
    confirmedLocation: true,
    coordinates: { x: 13.0, y: 25.0 },
    description: 'Capital do Império Romano dominante no primeiro século. Cidade destinatária da magna epístola do apóstolo Paulo e sede da sua pregação destemida durante dois anos de prisão domiciliar.',
    majorEvents: [
      'Formação de uma robusta congregação cristã multilíngue',
      'Chegada de Paulo após náufrago em Malta e acolhida pelos irmãos na Praça de Ápio',
      'Pregação de Paulo em casa alugada ensinando sobre o Reino de Deus a todos',
      'Martírio de inúmeros cristãos sob a tirania do imperador Nero'
    ],
    associatedCharacters: ['Apóstolo Paulo', 'Lucas', 'Áquila e Priscila', 'Onesíforo'],
    keyVerses: ['Atos 28:14-31', 'Romanos 1:7-15', '2 Timóteo 1:16-17']
  },
  {
    id: 'atenas',
    name: 'Atenas',
    modernName: 'Atenas, Grécia',
    region: 'Ática / Península Balcânica',
    category: 'cidade',
    epoch: 'apostolos',
    confirmedLocation: true,
    coordinates: { x: 26.5, y: 40.8 },
    description: 'Capital intelectual, filosófica e artística do mundo grego clássico. Repleta de ídolos e de templos grandiosos como o Partenon.',
    majorEvents: [
      'Indignação de Paulo ao contemplar a cidade dominada por ídolos pagãos',
      'O célebre discurso no Areópago sobre o "Deus Desconhecido" que criou todas as coisas',
      'Conversão de Dionísio o areopagita e de uma mulher chamada Dâmaris'
    ],
    associatedCharacters: ['Apóstolo Paulo', 'Dionísio', 'Dâmaris'],
    keyVerses: ['Atos 17:16-34', '1 Tessalonicenses 3:1']
  },
  {
    id: 'corinto',
    name: 'Corinto',
    modernName: 'Korinthos, Grécia',
    region: 'Istmo de Corinto / Peloponeso',
    category: 'cidade',
    epoch: 'apostolos',
    confirmedLocation: true,
    coordinates: { x: 25.5, y: 42.0 },
    description: 'Movimentado centro marítimo e comercial cosmopolita ligando dois mares. Cidade onde Paulo permaneceu um ano e meio fabricando tendas e fundando a congregação.',
    majorEvents: [
      'Trabalho de Paulo como fabricante de tendas ao lado de Áquila e Priscila',
      'Visão de encorajamento de Jesus garantindo a Paulo que tinha muito povo na cidade',
      'Julgamento de Paulo perante o tribunal do procônsul Gálio',
      'Envio das duas magistrais cartas pastorais de Paulo aos Coríntios'
    ],
    associatedCharacters: ['Apóstolo Paulo', 'Áquila e Priscila', 'Apolo', 'Gálio', 'Sóstenes'],
    keyVerses: ['Atos 18:1-18', '1 Coríntios 13:1-13', '2 Coríntios 5:17-20']
  },
  {
    id: 'efeso',
    name: 'Éfeso',
    modernName: 'Selçuk, Turquia',
    region: 'Costa Ocidental da Ásia Menor',
    category: 'cidade',
    epoch: 'apostolos',
    confirmedLocation: true,
    coordinates: { x: 34.5, y: 35.8 },
    description: 'Importante metrópole comercial da província romana da Ásia. Notória pelo grandioso templo da deusa Ártemis e sede de três anos de labor intenso do apóstolo Paulo.',
    majorEvents: [
      'Pregação diária de Paulo na escola de Tirano por dois anos',
      'Queima pública voluntária de caros rolos de artes mágicas pelos novos convertidos',
      'Tumulto gigantesco no teatro promovido pelo prateiro Demétrio',
      'Carta de Paulo aos Efésios e mensagem de Jesus em Apocalipse 2'
    ],
    associatedCharacters: ['Apóstolo Paulo', 'Timóteo', 'João Evangelista', 'Áquila e Priscila'],
    keyVerses: ['Atos 19:1-41', 'Efésios 1:3-14', 'Apocalipse 2:1-7']
  },
  {
    id: 'damasco',
    name: 'Damasco',
    modernName: 'Dimashq, Síria',
    region: 'Oásis da planície síria',
    category: 'cidade',
    epoch: 'apostolos',
    confirmedLocation: true,
    coordinates: { x: 60.5, y: 46.7 },
    canaanCoordinates: { x: 78.0, y: 8.0 },
    description: 'Uma das cidades mais antigas habitadas continuamente. Cidade para onde Saulo de Tarso se dirigia com cartas para prender cristãos quando foi surpreendido pela luz celestial de Cristo.',
    majorEvents: [
      'Aparição fulgurante do Cristo glorificado a Saulo na estrada de Damasco',
      'Cura da cegueira de Saulo e seu batismo pelo discípulo Ananias na rua Direita',
      'Fuga espetacular de Paulo descido num cesto pelas muralhas da cidade'
    ],
    associatedCharacters: ['Apóstolo Paulo (Saulo)', 'Ananias', 'Jesus Cristo'],
    keyVerses: ['Atos 9:1-25', 'Gênesis 15:2', 'Gálatas 1:17', '2 Coríntios 11:32-33']
  },
  {
    id: 'antioquia_siria',
    name: 'Antioquia da Síria',
    modernName: 'Antakya, Turquia',
    region: 'Rio Orontes / Síria Setentrional',
    category: 'cidade',
    epoch: 'apostolos',
    confirmedLocation: true,
    coordinates: { x: 57.5, y: 39.2 },
    description: 'A terceira maior cidade do Império Romano. Berço das viagens missionárias às nações e local onde os seguidores de Jesus receberam pela primeira vez o nome de "cristãos".',
    majorEvents: [
      'Refúgio de discípulos judeus e pregação aos falantes de grego',
      'Chegada de Barnabé e convocação de Saulo de Tarso para ensinar a congregação',
      'Envio formal de Paulo e Barnabé pelo espírito santo para a 1ª viagem missionária',
      'Disputa sobre a circuncisão que levou ao concílio de Jerusalém em Atos 15'
    ],
    associatedCharacters: ['Barnabé', 'Apóstolo Paulo', 'Pedro', 'Profeta Ágabo'],
    keyVerses: ['Atos 11:19-26', 'Atos 13:1-3', 'Gálatas 2:11-14']
  },
  {
    id: 'alexandria',
    name: 'Alexandria',
    modernName: 'Al-Iskandariyya, Egito',
    region: 'Costa Mediterrânea do Delta do Nilo',
    category: 'cidade',
    epoch: 'apostolos',
    confirmedLocation: true,
    coordinates: { x: 45.0, y: 67.5 },
    description: 'Centro monumental de erudição helenística, biblioteca mundial e berço da tradução grega Septuaginta (LXX) das Escrituras Hebraicas nos séculos III e II a.C.',
    majorEvents: [
      'Tradução da Septuaginta adotada amplamente pelos judeus da diáspora e cristãos',
      'Cidade natal de Apolo, homem eloquente e muito versado nas Escrituras Sagradas'
    ],
    associatedCharacters: ['Apolo', 'Escribas da Septuaginta', 'Fílon'],
    keyVerses: ['Atos 18:24-28', 'Atos 27:6']
  }
];

export interface BiblicalRoute {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  color: string;
  points: { x: number; y: number; name: string }[];
  description: string;
}

export const BIBLICAL_ROUTES: BiblicalRoute[] = [
  {
    id: 'exodo_moises',
    title: 'A Rota Sagrada do Êxodo',
    subtitle: 'Do Egito à Terra Prometida através do Mar Vermelho e Sinai',
    period: 'c. 1513 a.C. - 1473 a.C.',
    color: '#EAB308', // Amber / Gold
    points: [
      { x: 50.0, y: 70.0, name: 'Ramessés (Gósen, Egito)' },
      { x: 52.0, y: 73.0, name: 'Sucote' },
      { x: 53.5, y: 76.0, name: 'Mar Vermelho (Travessia Miraculosa)' },
      { x: 54.0, y: 80.0, name: 'Deserto de Sim / Mara / Elim' },
      { x: 53.8, y: 84.1, name: 'Monte Sinai / Horebe (Entrega da Lei)' },
      { x: 56.5, y: 72.0, name: 'Cades-Barneia (Envio dos 12 Espiões)' },
      { x: 58.5, y: 64.0, name: 'Planícies de Moabe (Travessia do Jordão)' },
      { x: 58.0, y: 58.7, name: 'Jericó (Primeira Conquista)' }
    ],
    description: 'A épica jornada de 40 anos onde Jeová libertou Seu povo da escravidão egípcia com mão forte, abriu as águas do Mar Vermelho, sustentou a nação com o maná diário e a água do rochedo, e entregou o código da Lei no Monte Sinai.'
  },
  {
    id: 'viagem_paulo_1',
    title: '1ª Viagem Missionária de Paulo',
    subtitle: 'De Antioquia através de Chipre e Galácia',
    period: 'c. 47 - 48 d.C.',
    color: '#06B6D4', // Cyan
    points: [
      { x: 57.5, y: 39.2, name: 'Antioquia da Síria' },
      { x: 52.0, y: 44.0, name: 'Salamina (Chipre)' },
      { x: 49.0, y: 46.0, name: 'Pafos (Chipre)' },
      { x: 46.0, y: 36.0, name: 'Perge (Panfília)' },
      { x: 44.0, y: 32.0, name: 'Antioquia da Pisídia' },
      { x: 47.0, y: 33.0, name: 'Icônio' },
      { x: 48.0, y: 35.0, name: 'Listra' },
      { x: 50.0, y: 36.0, name: 'Derbe' },
      { x: 57.5, y: 39.2, name: 'Retorno a Antioquia' }
    ],
    description: 'A pioneira expedição de Paulo e Barnabé evangelizando Chipre e os altiplanos da Ásia Menor, fundando congregações gentílicas em meio a rigorosas oposições.'
  },
  {
    id: 'viagem_paulo_roma',
    title: 'Viagem de Paulo a Roma como Prisioneiro',
    subtitle: 'De Cesareia a Roma através do Mar Mediterrâneo',
    period: 'c. 58 - 59 d.C.',
    color: '#EC4899', // Pink / Rose
    points: [
      { x: 57.0, y: 56.0, name: 'Cesareia Marítima' },
      { x: 57.2, y: 46.0, name: 'Sidom' },
      { x: 44.0, y: 37.0, name: 'Mira (Lícia)' },
      { x: 33.0, y: 48.0, name: 'Bons Portos (Creta)' },
      { x: 18.0, y: 45.0, name: 'Ilha de Malta (Naufrágio)' },
      { x: 15.0, y: 38.0, name: 'Siracusa (Sicília)' },
      { x: 14.0, y: 31.0, name: 'Putéoli' },
      { x: 13.0, y: 25.0, name: 'Roma (Chegada e Prisão Domiciliar)' }
    ],
    description: 'A dramática travessia marítima tempestuosa do apóstolo Paulo guardado por anjos de Jeová, culminando no célebre naufrágio em Malta e sua triunfante proclamação da verdade em Roma.'
  },
  {
    id: 'jornada_abraao',
    title: 'A Peregrinação de Fé de Abraão',
    subtitle: 'De Ur dos Caldeus até a Terra da Promessa',
    period: 'c. 1943 a.C.',
    color: '#10B981', // Emerald
    points: [
      { x: 82.5, y: 61.7, name: 'Ur dos Caldeus (Partida)' },
      { x: 77.5, y: 49.2, name: 'Babilônia' },
      { x: 65.0, y: 30.8, name: 'Harã (Falecimento de Terá)' },
      { x: 60.5, y: 46.7, name: 'Damasco' },
      { x: 57.8, y: 56.0, name: 'Siquém (Primeiro Altar em Canaã)' },
      { x: 57.4, y: 59.3, name: 'Betel e Ai' },
      { x: 50.0, y: 72.0, name: 'Egito (Temporada da Fome)' },
      { x: 57.2, y: 62.7, name: 'Hebrom / Carvalhais de Manre' }
    ],
    description: 'A caminhada exemplar de lealdade e fé do patriarca Abraão, pai de todos os que têm fé, obedecendo à voz de Jeová ao migrar pela extensão do Crescente Fértil em tendas como estrangeiro.'
  }
];
