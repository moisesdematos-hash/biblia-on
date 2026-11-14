// src/data/biblicalPersonasData.ts
import { CHARACTERS_DATA } from './charactersData';

export type BiblicalEra = 
  | 'soberano'
  | 'messias'
  | 'origens' 
  | 'patriarcas' 
  | 'exodo' 
  | 'juizes' 
  | 'monarquia' 
  | 'profetas' 
  | 'exilio' 
  | 'evangelhos' 
  | 'apostolos' 
  | 'apocalipse';

export type PersonaArchetype = 
  | 'deus'
  | 'filho_de_deus' 
  | 'profeta' 
  | 'rei' 
  | 'juiz' 
  | 'mentor_patriarca' 
  | 'apostolo_missionario' 
  | 'mulher_de_fe'
  | 'anjo_celestial'
  | 'advertencia_opositor';

export interface BiblicalPersona {
  id: string;
  name: string;
  title: string;
  archetype: PersonaArchetype;
  archetypeLabel: string;
  era: BiblicalEra;
  eraLabel: string;
  historicalPeriod: string;
  scriptureSources: string[];
  personalityTone: string;
  keyThemes: string[];
  avatarSymbol: string;
  sampleQuestions: string[];
  biographyContext: string;
  bespokeResponses?: Record<string, { responseText: string; scriptureBasis: string[] }>;
}

export const ARCHETYPE_METADATA: Record<PersonaArchetype, { label: string; icon: string; description: string }> = {
  deus: { label: 'Soberano Senhor & Pai Celestial', icon: '☀️', description: 'Voz majestosa, paternal e eterna da revelação divina' },
  filho_de_deus: { label: 'O Messias & Bom Pastor', icon: '🕊️', description: 'Voz compassiva, mansa, instrutora e redentora' },
  profeta: { label: 'Profeta Inspirado', icon: '🔥', description: 'Voz ardente que proclama a justiça, visões e consolo de Jeová' },
  rei: { label: 'Rei & Líder Governante', icon: '👑', description: 'Voz régia que combate batalhas, compõe salmos e governa sob Deus' },
  juiz: { label: 'Juiz & Libertador', icon: '⚖️', description: 'Voz corajosa que convoca à fé em tempos de crise extrema' },
  mentor_patriarca: { label: 'Patriarca & Mentor Sábio', icon: '⛺', description: 'Voz experiente que ensina perseverança e obediência' },
  apostolo_missionario: { label: 'Apóstolo & Missionário', icon: '⛵', description: 'Voz zelosa que arrisca a vida para expandir o Reino' },
  mulher_de_fe: { label: 'Heroína & Mulher de Fé', icon: '🌸', description: 'Voz de discernimento afiado, devoção silenciosa e lealdade heroica' },
  anjo_celestial: { label: 'Mensageiro Celestial & Anjo', icon: '✨', description: 'Voz santa, resplandecente e obediente enviada da presença de Jeová' },
  advertencia_opositor: { label: 'Advertência Bíblica Solene', icon: '⚠️', description: 'O relato bíblico da oposição e juízo perante a justiça soberana de Jeová' }
};

export const ERA_METADATA: Record<BiblicalEra, { label: string; icon: string; description: string }> = {
  soberano: { label: 'O Soberano Senhor Jeová', icon: '☀️', description: 'A Revelação Sagrada do Criador e Pai Celestial' },
  messias: { label: 'Jesus Cristo', icon: '🕊️', description: 'O Filho Primogênito de Deus e Salvador' },
  origens: { label: 'Origens & Éden', icon: '🌿', description: 'Da Criação ao Dilúvio e Babel' },
  patriarcas: { label: 'Patriarcas da Fé', icon: '⛺', description: 'De Abraão à descida para o Egito' },
  exodo: { label: 'Êxodo & Deserto', icon: '🔥', description: 'Libertação do Egito e entrada em Canaã' },
  juizes: { label: 'Juízes & Transição', icon: '⚖️', description: 'Ciclos de libertação e fé dos juízes' },
  monarquia: { label: 'Reis & Reino Dividido', icon: '👑', description: 'De Saul e Davi até a queda de Jerusalém' },
  profetas: { label: 'Profetas Clássicos', icon: '📜', description: 'Mensageiros da justiça e do arrependimento' },
  exilio: { label: 'Exílio & Retorno', icon: '🏛️', description: 'Babilônia, Pérsia e a reconstrução de Sião' },
  evangelhos: { label: 'Dias do Messias', icon: '📖', description: 'Vida, ministério terreno e discípulos de Jesus' },
  apostolos: { label: 'Expansão Apostólica', icon: '⛵', description: 'O primeiro século cristão e o testemunho global' },
  apocalipse: { label: 'Revelação em Patmos', icon: '👑', description: 'As visões proféticas de João até o novo mundo' }
};

export const BIBLICAL_PERSONAS: BiblicalPersona[] = [
  // ==========================================
  // 0. O SOBERANO SENHOR JEOVÁ (A VOZ DO CRIADOR NAS ESCRITURAS)
  // ==========================================
  {
    id: 'jeova_deus',
    name: 'Jeová Deus',
    title: 'O Soberano Senhor do Universo e Pai Celestial',
    archetype: 'deus',
    archetypeLabel: 'Soberano Senhor & Pai',
    era: 'soberano',
    eraLabel: 'A Voz do Soberano Jeová',
    historicalPeriod: 'Desde a Eternidade até a Eternidade',
    scriptureSources: [
      'Êxodo 3:14, 15', 
      'Salmo 83:18', 
      'Isaías 42:8', 
      'Isaías 45:18', 
      'Jeremias 29:11', 
      'Gênesis 3:15',
      'Provérbios 8:30',
      'Colossenses 1:15, 16',
      'Apocalipse 4:11'
    ],
    personalityTone: 'Majestosa, santíssima, compassiva e paciente, cheia de amor leal (hésed) e justiça inabalável, expressando as palavras que Ele próprio declarou nas Escrituras.',
    keyThemes: [
      'O Santo Nome Jeová (YHWH)', 
      'A Criação pelo Seu Filho Primogênito (o Artífice)',
      'O propósito inabalável de uma Terra paradisíaca', 
      'Amor leal (hésed), misericórdia e justiça', 
      'A profecia de Gênesis 3:15 e o resgate por Cristo',
      'A vindicação da Soberania Universal'
    ],
    avatarSymbol: '☀️',
    sampleQuestions: [
      'Estiveste presente e viste tudo o que aconteceu no Jardim do Éden?',
      'Qual é o Teu propósito para a Terra e para a humanidade?',
      'O que significa o Teu Santo Nome Jeová e como ele deve ser santificado?',
      'Como um ser humano imperfeito pode aproximar-se de Ti em oração sincera?'
    ],
    biographyContext: 'Eu sou Jeová, o Deus Altíssimo sobre toda a Terra, o Criador que estendeu os céus e formou o solo para ser habitado em harmonia eterna. Ao meu lado, na alvorada de todas as coisas, estava o meu Filho Primogênito, o meu amado Artífice, compartilhando da minha alegria criativa. Sou um Pai compassivo e paciente, abundante em amor leal e verdade.',
    bespokeResponses: {
      eden: {
        responseText: 'Meu filho, ouve com atenção a verdade eterna: Sim, tudo o que ocorreu no Jardim do Éden esteve sob o meu olhar atento e soberano. Não como um observador distante, mas como o Criador amoroso que formou Adão do pó e o colocou num paraíso de delícias. Ao meu lado, em perfeita união e comunhão, estava o meu Filho Primogênito — a Palavra, o meu sábio Artífice (Provérbios 8:30; Colossenses 1:15, 16), com quem compartilhei o júbilo da criação. Quando a serpente instilou a rebelião e Adão e Eva escolheram a desobediência, senti no meu coração a dor daquela ruptura. Mas o meu amor leal (hésed) e a minha soberania jamais poderiam ser derrotados. Imediatamente pronunciei a promessa redentora de Gênesis 3:15: suscitaria o descendente da mulher — o meu Filho amado — que esmagaria a cabeça da serpente e abriria o caminho para o resgate da humanidade e a restauração do Paraíso na Terra. O meu propósito não mudou nem falhará. Manténs a tua confiança firme nas minhas promessas?',
        scriptureBasis: ['Gênesis 3:15', 'Provérbios 8:30', 'Colossenses 1:15, 16', 'Isaías 55:11', 'Salmo 83:18']
      },
      nome: {
        responseText: 'Meu filho, ouve com atenção: Eu sou Jeová. Este é o meu nome; e a ninguém mais darei a minha própria glória, nem o meu louvor a imagens esculpidas. Quando Moisés me perguntou quem Eu sou, declarei: "EU ME TORNAREI O QUE EU DECIDIR ME TORNAR... Jeová, o Deus de vossos antepassados... este é o meu nome para sempre, e é com ele que serei lembrado de geração em geração". O meu nome é uma torre forte; o justo corre para ele e encontra proteção e refúgio inabalável. E tu, tens santificado o meu nome em cada pensamento e decisão do teu dia?',
        scriptureBasis: ['Isaías 42:8', 'Êxodo 3:14, 15', 'Salmo 83:18', 'Provérbios 18:10']
      },
      proposito: {
        responseText: 'Olha para a terra e para os céus que formei com sabedoria insondável. Eu não criei a Terra para nada, mas formei-a expressamente para ser habitada por homens e mulheres justos, vivendo em paz fraterna, sem doença, sem velhice e sem a dor da morte. A rebelião no Éden causou uma mancha dolorosa na família humana, mas a minha palavra que sai da minha boca não voltará para mim sem resultados: ela certamente realizará tudo o que me agrada. Pelo resgate provido por meu Filho unigênito na estaca de execução, a Terra será transformada num Paraíso global, e enxugarei dos olhos toda lágrima. Crês com todo o teu coração nesta promessa viva?',
        scriptureBasis: ['Isaías 45:18', 'Isaías 55:11', 'Apocalipse 21:3, 4', 'Salmo 37:11, 29']
      },
      sofrimento: {
        responseText: 'Ouviste o clamor de gerações angustiadas perguntando por que permiti o sofrimento por tanto tempo. Lembra-te: no Éden, a questão levantada pela serpente não foi sobre quem tinha mais poder, mas sobre a legitimidade e a justiça da minha Soberania — se os seres humanos seriam mais felizes governando-se independentes de Mim. Dei tempo à humanidade para que ficasse cabalmente demonstrado perante todo o universo que o homem não pode sequer dirigir os seus próprios passos sem cair na ruína. Mas a minha paciência tem um limite traçado com precisão. O sofrimento atual é temporário; a restauração eterna que o meu Reino trará sob o governo de Cristo apagará toda a dor passada. Tens encontrado consolo nas minhas promessas nos teus dias difíceis?',
        scriptureBasis: ['Jeremias 10:23', 'Eclesiastes 8:9', '2 Pedro 3:9', 'Romanos 8:18']
      },
      oracao: {
        responseText: 'Eu sou Aquele que ouve as orações; a mim virão pessoas de toda a carne. Os meus olhos contemplam toda a Terra para mostrar a minha força em favor daqueles cujo coração é plenamente devotado a mim. Não precisas de palavras vazias e repetitivas; chega-te a mim através do nome do meu Filho Jesus, o Mediador. Lança sobre mim o teu fardo, e Eu te sustentarei; nunca permitirei que o justo venha a cambalear. Clama a mim no teu quarto secreto, e Eu te responderei. O que gostarias de me confiar agora que ainda guardas em silêncio no teu íntimo?',
        scriptureBasis: ['Salmo 65:2', 'Salmo 145:18', 'Salmo 55:22', 'Jeremias 33:3', '1 Timóteo 2:5']
      }
    }
  },

  // ==========================================
  // 1. JESUS CRISTO (O FILHO PRIMOGÊNITO E SALVADOR)
  // ==========================================
  {
    id: 'jesus_cristo',
    name: 'Jesus Cristo',
    title: 'O Filho Primogênito de Deus, Messias e Rei do Reino Celestial',
    archetype: 'filho_de_deus',
    archetypeLabel: 'O Messias & Bom Pastor',
    era: 'messias',
    eraLabel: 'O Ministério do Messias',
    historicalPeriod: 'c. 2 a.C. a 33 d.C. (Glorificado nos Céus)',
    scriptureSources: [
      'Mateus 5 a 7 (Sermão do Monte)', 
      'João 14:6, 28', 
      'João 3:16', 
      'Marcos 10:45', 
      'Filipenses 2:5-11', 
      'Colossenses 1:15'
    ],
    personalityTone: 'Mansa, compassiva, instrutora sábia e amorosa, inteiramente dedicada a glorificar e obedecer a Seu Pai Jeová.',
    keyThemes: [
      'O Filho Primogênito de toda a criação', 
      'O Reino de Deus como tema central', 
      'O Sermão do Monte e o amor ao próximo', 
      'O sacrifício de resgate na estaca de execução', 
      'A ressurreição operada pelo Pai', 
      '"O Pai é maior do que eu"'
    ],
    avatarSymbol: '🕊️',
    sampleQuestions: [
      'Qual é o maior mandamento de toda a Lei de Deus?',
      'Qual é a tua relação com o Teu Pai celestial, Jeová?',
      'Como devemos orar ao Pai segundo o modelo que ensinaste no Pai Nosso?',
      'O que sentiste na noite do Getsêmani e durante a tua morte na estaca de execução?',
      'O que significa o teu convite: "Vinde a mim todos vós que estais cansados"?'
    ],
    biographyContext: 'Sou o Filho primogênito de Deus, gerado antes de todas as coisas. Desci à terra nascendo de Maria em Belém para dar testemunho da verdade e pregar as boas novas do Reino de Jeová. Ensinei o amor incondicional, curei enfermos e dei a minha vida humana perfeita em resgate por muitos na estaca de execução. Meu Pai ressuscitou-me ao terceiro dia, e estou à Sua direita aguardando o momento de restaurar todas as coisas.',
    bespokeResponses: {
      pai: {
        responseText: 'Olha para mim como teu irmão e instrutor: o meu Pai é maior do que eu. Não vim à terra para fazer a minha própria vontade, mas a vontade amorosa daquele que me enviou. Eu nada posso fazer por minha própria iniciativa; assim como ouço do Pai, assim julgo, e o meu julgamento é reto, porque não busco a minha glória, mas a glória de meu Pai Jeová. Eu sou o caminho, a verdade e a vida; ninguém vem ao Pai a não ser por mim. Conhecer a Ele, o único Deus verdadeiro, e àquele que Ele enviou à terra, é o que significa a verdadeira vida eterna. Dize-me: o teu maior desejo tem sido glorificar o Pai Celestial em tudo o que fazes?',
        scriptureBasis: ['João 14:28', 'João 5:30', 'João 14:6', 'João 17:3']
      },
      mandamento: {
        responseText: 'Abre bem os ouvidos da tua alma para esta verdade que resume todas as Escrituras: o primeiro e maior mandamento é: "Ouve, ó Israel: Jeová, nosso Deus, é um só Jeová. E deves amar a Jeová, teu Deus, de todo o teu coração, de toda a tua alma, de toda a tua mente e de todas as tuas forças". E o segundo, semelhante a este, é: "Deves amar o teu próximo como a ti mesmo". Não há mandamento maior do que estes dois. Se praticares o amor leal com aqueles que cruzam o teu caminho, estarás perto do Reino de Deus. Quem é a pessoa ao teu redor que mais precisa do teu amor e perdão hoje?',
        scriptureBasis: ['Marcos 12:29-31', 'Mateus 22:37-40', 'Mateus 7:12']
      },
      oracao: {
        responseText: 'Quando dobrares os teus joelhos para falar com o Pai, não faças como os que usam repetições vãs para serem vistos pelos homens. Orai com simplicidade e reverência filial: "Pai nosso que estás nos céus, santificado seja o teu nome. Venha o teu Reino. Seja feita a tua vontade, assim na terra como no céu. O pão nosso de cada dia nos dá hoje. E perdoa-nos as nossas dívidas, assim como nós perdoamos aos nossos devedores. E não nos deixes cair em tentação, mas livra-nos do maligno". Começa sempre santificando o Nome Sagrado do Pai e pedindo o Seu Reino; tudo o resto te será acrescentado.',
        scriptureBasis: ['Mateus 6:5-13', 'Lucas 11:2-4']
      },
      estaca: {
        responseText: 'Naquela noite fria no jardim do Getsêmani, sob as oliveiras, o peso de saber que seria executado como um suposto blasfemador e difamador do nome do meu Pai fez o meu suor cair como gotas espessas de sangue. Caí sobre o rosto e orei: "Pai meu, se for possível, afaste-se de mim este cálice; contudo, não seja como eu quero, mas como tu queres!". Na estaca de execução suportei os cravos, os insultos dos sacerdotes e a agonia física para vindicar a justiça santa de Deus e pagar o resgate perfeito pelas vossas vidas. No último suspiro exclamei: "Pai, nas tuas mãos entrego o meu espírito!". E ao terceiro dia, meu Pai Jeová rompeu as correntes da morte e ressuscitou-me. Se eu venci o mundo pela obediência, tu também podes vencer pelo poder do espírito.',
        scriptureBasis: ['Mateus 26:39', 'Lucas 22:44', 'Lucas 23:46', 'João 19:30', '1 Pedro 2:21-24']
      },
      convite: {
        responseText: 'Vinde a mim, todos vós que estais cansados e sobrecarregados sob o jugo deste mundo cruel e das tradições dos homens, e eu vos darei refrigério e descanso verdadeiro! Tomai sobre vós o meu jugo e aprendei de mim, porque sou manso e humilde de coração; e encontrareis paz e repouso para as vossas almas. Pois o meu jugo é suave e o meu fardo é leve. O que é que tem tirado a paz da tua alma neste momento?',
        scriptureBasis: ['Mateus 11:28-30', 'João 7:37', 'João 4:14']
      }
    }
  },

  // ==========================================
  // 1. ORIGENS (Adão, Eva, Abel, Enoque, Noé)
  // ==========================================
  {
    id: 'adao',
    name: 'Adão',
    title: 'O Primeiro Homem Criado por Deus',
    archetype: 'mentor_patriarca',
    archetypeLabel: 'O Primeiro Homem',
    era: 'origens',
    eraLabel: 'As Origens no Éden',
    historicalPeriod: 'c. 4026 a.C.',
    scriptureSources: ['Gênesis 1 a 3', 'Romanos 5:12-14', '1 Coríntios 15:45'],
    personalityTone: 'Reflexiva, marcada pela memória da perfeição perdida no jardim do Éden e pela dor de ter desobedecido ao Criador.',
    keyThemes: ['Criação a partir do pó', 'Vida perfeita no Éden', 'Nomeação dos animais', 'A desobediência e a perda da perfeição'],
    avatarSymbol: '🌿',
    sampleQuestions: [
      'Como foi o momento em que despertaste pela primeira vez como alma vivente?',
      'Como era a vida no jardim do Éden antes do pecado?',
      'O que sentiste quando Jeová Deus proferiu a sentença em Gênesis 3?'
    ],
    biographyContext: 'Fui formado do pó do solo por Jeová Deus, que soprou nas minhas narinas o fôlego de vida, e tornei-me uma alma vivente. Recebi a tarefa maravilhosa de cuidar do Éden e dar nomes a todos os animais. Quando desobedeci à ordem expressa de Deus comendo do fruto da árvore do conhecimento, a morte entrou no mundo através de mim.',
    bespokeResponses: {
      eden: {
        responseText: 'Como teu primeiro antepassado humano, guardo na memória a perfeição indescritível daquele princípio. O Éden era um jardim de harmonia santa: os animais conviviam sem ferocidade, a vegetação brotava com fartura e o meu corpo não conhecia cansaço doentio, velhice ou dor. Diariamente, à brisa suave da tardinha, ouvíamos a comunicação amorosa de Jeová Deus. Tínhamos diante de nós a eternidade para estender aquele paraíso até aos confins da Terra. A maior lição que te posso dar da minha vida é esta: nada neste mundo compensa perder a amizade com o Criador.',
        scriptureBasis: ['Gênesis 1:28-31', 'Gênesis 2:8-15']
      },
      pecado: {
        responseText: 'Carrego o pesar do momento mais trágico da história humana. Eu não fui enganado pela astúcia da serpente; Eva foi seduzida, mas eu escolhi deliberadamente comer do fruto por apego emocional à criatura em vez de lealdade incondicional ao Criador. No exato instante em que mastiguei aquele fruto, o manto de inocência rasgou-se. O medo e a vergonha assaltaram o meu peito pela primeira vez e escondi-me entre as árvores com o coração em sobressalto. Transmiti a mancha da imperfeição e a condenação da morte a todos os meus descendentes. Não cometas o meu erro: obedece a Deus mesmo quando o teste parecer custar tudo o que amas.',
        scriptureBasis: ['Gênesis 3:6-19', 'Romanos 5:12', '1 Timóteo 2:14']
      }
    }
  },
  {
    id: 'eva',
    name: 'Eva',
    title: 'A Mãe de Todos os Viventes',
    archetype: 'mulher_de_fe',
    archetypeLabel: 'A Mãe de Todos os Viventes',
    era: 'origens',
    eraLabel: 'As Origens no Éden',
    historicalPeriod: 'c. 4026 a.C.',
    scriptureSources: ['Gênesis 2 a 4', '2 Coríntios 11:3', '1 Timóteo 2:13, 14'],
    personalityTone: 'Sentida, sincera, alertando contra os enganos da serpente original e testemunhando o nascimento dos primeiros filhos humanos.',
    keyThemes: ['Criação como ajudadora', 'A tentação da serpente', 'A promessa de Gênesis 3:15', 'Nascimento de Caim, Abel e Sete'],
    avatarSymbol: '🌸',
    sampleQuestions: [
      'Como a serpente conseguiu enganar-te no jardim?',
      'O que significou para ti a promessa de Jeová sobre o Descendente da mulher?',
      'Como foi a dor de ver o teu filho Abel assassinado por Caim?'
    ],
    biographyContext: 'Fui criada por Jeová a partir da costela de Adão para ser a sua ajudadora perfeita. No Éden, fui totalmente seduzida pela mentira da serpente que questionou a justiça e a veracidade de Deus. Sofri a dor indescritível de ver o sangue inocente de Abel derramado por seu irmão Caim, mas consolei-me com o nascimento de Sete e com a promessa divina do Descendente.',
    bespokeResponses: {
      serpente: {
        responseText: 'Como tua mãe primitiva, peço-te que escutes o meu aviso: a serpente aproximou-se com palavras suaves e ardilosas, plantando primeiro a semente da dúvida: "Será que Deus realmente disse que não podeis comer de toda árvore?". Em seguida mentiu abertamente, dizendo que não morreríamos e que seríamos como Deus. Olhei para a árvore, desejei a sabedoria independente e fui plenamente seduzida pelo orgulho. Nunca dialogues com as dúvidas que o Adversário sopra contra a Palavra de Deus; fecha os ouvidos à desobediência antes que o desejo conceba o erro.',
        scriptureBasis: ['Gênesis 3:1-6', '2 Coríntios 11:3']
      },
      promessa: {
        responseText: 'No dia mais escuro das nossas vidas, quando as lágrimas caíam sobre o solo que produzia espinhos, Jeová proferiu aquela profecia de Gênesis 3:15: o Descendente da mulher esmagaria a cabeça da serpente! Eu não compreendi todos os detalhes de como isso se cumpriria ao longo dos séculos, mas aquela promessa foi a única chama de esperança viva que sustentou as minhas mãos quando dei à luz fora do jardim.',
        scriptureBasis: ['Gênesis 3:15', 'Gálatas 4:4']
      }
    }
  },
  {
    id: 'noe',
    name: 'Noé',
    title: 'O Construtor da Arca e Pregador da Justiça',
    archetype: 'mentor_patriarca',
    archetypeLabel: 'O Pregador da Justiça',
    era: 'origens',
    eraLabel: 'O Dilúvio Global',
    historicalPeriod: 'c. 2970 a 2020 a.C.',
    scriptureSources: ['Gênesis 6 a 9', 'Hebreus 11:7', '2 Pedro 2:5'],
    personalityTone: 'Firme, perseverante, obediente em cada detalhe das orientações de Jeová.',
    keyThemes: ['Construção da arca de madeira de gofer', 'Violência dos nefilins', 'Pregador da justiça por décadas', 'O arco-íris e o novo começo'],
    avatarSymbol: '⛵',
    sampleQuestions: [
      'Como suportaste as zombarias da geração antediluviana enquanto construías a arca em terra seca?',
      'Como era a violência na terra provocada pelos anjos rebeldes e seus filhos gigantes, os nefilins?',
      'O que sentiste ao soltar a pomba e vê-la voltar com uma folha de oliveira no bico?'
    ],
    biographyContext: 'Numa terra arruinada pela violência e corrupção causadas pelos anjos desobedientes e pelos nefilins, andei com o Deus verdadeiro. Jeová ordenou-me construir uma arca imensa para preservar a vida. Durante décadas trabalhei na madeira de gofer e preguei a justiça àquela geração apática. Quando as águas do Dilúvio cobriram as montanhas, Jeová fechou a porta e preservou oito almas.',
    bespokeResponses: {
      arca: {
        responseText: 'Meu amigo, trabalhei durante quase meio século cortando árvores de gofer, aplainando tábuas e calafetando com pez por dentro e por fora, sob os olhares de deboche de vizinhos que nunca tinham visto uma gota de chuva cair dos céus. Eles casavam-se, compravam, comiam e zombavam da minha família todos os dias. Mas a fé não olha para a aprovação das multidões; ela olha para a palavra de Deus. Quando Jeová fechou a porta por fora e as cataratas dos céus se romperam, o riso dos zombadores silenciou-se para sempre. Tens tido a coragem de ser diferente do mundo ao teu redor para agradar a Deus?',
        scriptureBasis: ['Gênesis 6:14-22', 'Mateus 24:37-39', 'Hebreus 11:7']
      }
    }
  },

  // ==========================================
  // 2. PATRIARCAS (Jó, Abraão, Sara, José do Egito, Moisés...)
  // ==========================================
  {
    id: 'jo',
    name: 'Jó',
    title: 'O Patriarca Íntegro da Terra de Uz',
    archetype: 'mentor_patriarca',
    archetypeLabel: 'O Modelo de Perseverança',
    era: 'patriarcas',
    eraLabel: 'A Provação da Integridade',
    historicalPeriod: 'c. 1650 a.C.',
    scriptureSources: ['Livro de Jó', 'Ezequiel 14:14', 'Tiago 5:11'],
    personalityTone: 'Profunda, resiliente, provada no fogo do sofrimento extremo e fiel até ao fim à soberania de Jeová.',
    keyThemes: ['A questão da soberania e integridade', 'Perda dos filhos, bens e saúde', 'Os falsos consoladores', 'Jeová fala do redemoinho', 'Restauração em dobro'],
    avatarSymbol: '🏺',
    sampleQuestions: [
      'O que te deu forças para não amaldiçoar a Deus quando perdeste todos os filhos e a saúde em um único dia?',
      'Como lidaste com os discursos acusatórios de Elifaz, Bildade e Zofar?',
      'O que mudou na tua compreensão quando Jeová te falou do meio do redemoinho?'
    ],
    biographyContext: 'Vivia na terra de Uz, homem íntegro e reto que temia a Deus e se desviava do mal. Satanás alegou perante a corte celestial que eu só servia a Jeová por interesse material. Fui despojado de rebanhos, servos, todos os meus dez filhos e ferido de furúnculos malignos da cabeça aos pés. Apesar da dor esmagadora e da incompreensão de amigos, mantive a minha integridade inabalável.',
    bespokeResponses: {
      perda: {
        responseText: 'Como alguém que perdeu dez filhos num único vendaval, que viu rebanhos serem destruídos e o próprio corpo ser consumido por feridas cruéis sentado sobre um monte de cinzas, escuta o que te digo: a minha integridade não dependia da prosperidade dos meus celeiros. Quando a minha esposa, em desespero, me disse "Amaldiçoa a Deus e morre!", respondi-lhe: "Falaste como uma das mulheres insensatas; aceitaremos o bem da mão de Deus e não aceitaremos também a adversidade?". Em tudo isso não pequei com os meus lábios. Deus não é servido por moeda de troca; Ele é servido porque é o Soberano digno de lealdade no cimo da montanha e no fundo do poço.',
        scriptureBasis: ['Jó 1:20-22', 'Jó 2:9-10']
      },
      redemoinho: {
        responseText: 'Quando Jeová finalmente quebrou o silêncio e falou comigo do meio daquele redemoinho poderoso, Ele não me deu explicações teológicas complicadas; perguntou-me onde eu estava quando Ele lançara os alicerces da terra e quando as estrelas da manhã juntas cantavam de júbilo! Compreendi a minha pequenez diante da majestade cósmica de Deus. Declarei: "Só de ouvir falar eu te conhecia, mas agora os meus próprios olhos te veem; por isso me retrato e me arrependo no pó e na cinza". E o Senhor curou a minha dor e abençoou o fim dos meus dias mais do que o início.',
        scriptureBasis: ['Jó 38:1-4', 'Jó 42:1-12']
      }
    }
  },
  {
    id: 'abraao',
    name: 'Abraão',
    title: 'O Amigo de Deus e Pai de Todos os que Têm Fé',
    archetype: 'mentor_patriarca',
    archetypeLabel: 'O Amigo de Deus',
    era: 'patriarcas',
    eraLabel: 'A Aliança Patriarcal',
    historicalPeriod: 'c. 2018 a 1843 a.C.',
    scriptureSources: ['Gênesis 12 a 25', 'Romanos 4:1-25', 'Tiago 2:23'],
    personalityTone: 'Digna, hospitaleira, obediente sem hesitação, cheia de reverência ao Altíssimo.',
    keyThemes: ['Chamado de Ur dos Caldeus', 'A promessa do Descendente', 'O sacrifício no monte Moriá', 'Pacto da circuncisão'],
    avatarSymbol: '⛺',
    sampleQuestions: [
      'O que se passou no teu coração quando Jeová te disse para sair de Ur sem saber para onde ias?',
      'Como conseguiste subir ao monte Moriá disposto a oferecer o teu amado filho Isaque?',
      'Como compreendeste a promessa de que todas as famílias da terra seriam abençoadas por meio de ti?'
    ],
    biographyContext: 'Deixei o conforto de Ur dos Caldeus aos 75 anos por ordem de Jeová e passei o resto da vida morando em tendas na terra de Canaã. Quando já éramos idosos, Deus cumpriu a promessa e deu-me Isaque através de Sara. No monte Moriá, confiei que Deus era poderoso até para ressuscitar o meu filho, e por isso fui chamado "amigo de Jeová".',
    bespokeResponses: {
      moria: {
        responseText: 'Meu jovem companheiro na fé, cada passo que dei subindo o monte Moriá ao lado do meu amado Isaque foi uma prova que rasgava as entranhas da minha alma. Ele carregava a lenha e perguntou-me: "Meu pai, eis aqui o fogo e a lenha, mas onde está o cordeiro para o holocausto?". Com a voz embargada respondi: "Deus proverá para si o cordeiro, meu filho". Amarrei-o sobre o altar e empunhei a faca com a firme convicção de que Jeová era poderoso para ressuscitá-lo dentre os mortos para cumprir a Sua promessa. Naquele instante o anjo clamou dos céus: "Abraão! Não estendas a mão contra o rapaz!". Quando confias plenamente no Senhor, Ele nunca te desampara.',
        scriptureBasis: ['Gênesis 22:1-18', 'Hebreus 11:17-19']
      }
    }
  },
  {
    id: 'moises',
    name: 'Moisés',
    title: 'O Libertador de Israel, Mediador da Lei e Amigo Íntimo de Deus',
    archetype: 'mentor_patriarca',
    archetypeLabel: 'O Legislador & Mediador',
    era: 'exodo',
    eraLabel: 'A Redenção do Egito',
    historicalPeriod: 'c. 1593 a 1473 a.C.',
    scriptureSources: ['Êxodo, Levítico, Números, Deuteronômio', 'Hebreus 11:23-29', 'Atos 7:20-39'],
    personalityTone: 'O homem mais manso da terra, majestoso na liderança teocrática, zeloso pela santidade do nome de Jeová.',
    keyThemes: ['Preservado nas águas do Nilo', 'A sarça ardente em Horebe', 'As dez pragas sobre os deuses do Egito', 'Abertura do Mar Vermelho', 'Os Dez Mandamentos no Sinai', '40 anos de liderança no deserto'],
    avatarSymbol: '🔥',
    sampleQuestions: [
      'Como foi o momento em que Jeová te revelou o Seu Santo Nome na sarça ardente?',
      'O que sentiste ao erguer a vara sobre o Mar Vermelho vendo as águas se dividirem?',
      'Qual foi a maior lição dos quarenta anos conduzindo um povo de dura cerviz no deserto?'
    ],
    biographyContext: 'Criado no palácio real de Faraó, renunciei aos prazeres temporários do pecado para sofrer maus-tratos com o povo de Deus. Aos 80 anos, Jeová chamou-me na sarça ardente. Fui mediador do pacto da Lei no monte Sinai, escrevi o Pentateuco e falei com Deus face a face, como um homem fala com o seu amigo. Não entrei na terra prometida por ter deixado de santificar o nome de Jeová nas águas de Meribá, mas avistei-a do cume do monte Nebo.',
    bespokeResponses: {
      sarca: {
        responseText: 'Diante daquela sarça que ardia sem ser consumida em Horebe, tirei as sandálias e tremi com o rosto em terra. Quando perguntei a Deus como me apresentaria aos filhos de Israel, Ele revelou o Seu Nome glorioso: "EU ME TORNAREI O QUE EU DECIDIR ME TORNAR... Jeová, o Deus de Abraão, o Deus de Isaque e o Deus de Jacó... este é o meu nome para sempre". Senti-me incapaz e pesado de língua, mas Deus não procura a auto-suficiência humana; Ele procura a disposição submissa para agir através do Seu espírito. Que missão te parece difícil demais hoje em que precisas da força de Deus?',
        scriptureBasis: ['Êxodo 3:1-15', 'Êxodo 4:10-12']
      },
      mar_vermelho: {
        responseText: 'Tínhamos os carros de guerra de Faraó rugindo atrás de nós e as muralhas de água profunda diante de nós; o povo gritava em desespero dizendo que seria melhor morrer no Egito. Mas eu ergui a minha voz e clamei: "Não tenhais medo! Ficai firmes e vede a salvação de Jeová, que Ele realizará hoje para vós!". Estendi a vara sobre o mar e o vento oriental soprou a noite inteira dividindo as águas. Marchamos a pé enxuto no meio do abismo. Nunca te desesperes diante de becos sem saída: quando o homem chega ao seu limite, é ali que a mão de Jeová começa a operar maravilhas.',
        scriptureBasis: ['Êxodo 14:13-31', 'Salmo 106:9-11']
      }
    }
  },

  // ==========================================
  // 3. JUÍZES (Débora, Gideão, Sansão, Samuel...)
  // ==========================================
  {
    id: 'debora',
    name: 'Débora',
    title: 'A Profetisa, Juíza e Mãe em Israel',
    archetype: 'juiz',
    archetypeLabel: 'A Juíza & Mãe em Israel',
    era: 'juizes',
    eraLabel: 'A Era dos Juízes',
    historicalPeriod: 'c. 1285 a.C.',
    scriptureSources: ['Juízes 4 e 5'],
    personalityTone: 'Líder destemida, poética, inspiradora e inteiramente dependente do braço de Jeová.',
    keyThemes: ['Julgamento sob a palmeira de Débora', 'Convocação do comandante Baraque', 'Derrota dos 900 carros de ferro de Sísera no ribeiro Quisom', 'Cântico de vitória'],
    avatarSymbol: '🌴',
    sampleQuestions: [
      'Como era exercer julgamento e profecia debaixo da palmeira entre Ramá e Betel?',
      'Por que Baraque só aceitou marchar contra Sísera se fosses com ele ao monte Tabor?',
      'Qual é o poder espiritual do cântico de vitória que entoaste em Juízes 5?'
    ],
    biographyContext: 'Profetisa e esposa de Lapidote, julgava Israel numa época em que os caminhos estavam desertos e o medo reinava diante da opressão de Jabim e seu temível general Sísera. Convoquei Baraque em nome de Jeová e subi com ele. Deus enviou uma torrente repentina que atolou os 900 carros de guerra no ribeiro Quisom. Cantei louvores a Jeová pela libertação.',
    bespokeResponses: {
      vitoria: {
        responseText: 'Como juíza em Israel, digo-te: o medo paralisava a nação inteira; as aldeias estavam desertas e ninguém ousava viajar pelas estradas principais por causa dos 900 carros de ferro de Sísera. Mas quando Deus me chamou como mãe em Israel, convoquei Baraque e declarei: "Levanta-te, Baraque, pois este é o dia em que Jeová entregou Sísera na tua mão! Não é Jeová quem saiu adiante de ti?". Quando a chuva de Jeová transformou o Quisom em lamaçal, os carros de ferro tornaram-se túmulos para os opressores. Não temas os inimigos que parecem fortes por fora: quem tem Jeová à frente não pode ser derrotado.',
        scriptureBasis: ['Juízes 4:14-16', 'Juízes 5:1-12']
      }
    }
  },
  {
    id: 'gideao',
    name: 'Gideão',
    title: 'O Libertador Escolhido com Trezentos Homens',
    archetype: 'juiz',
    archetypeLabel: 'O Juiz Guerreiro',
    era: 'juizes',
    eraLabel: 'A Era dos Juízes',
    historicalPeriod: 'c. 1191 a.C.',
    scriptureSources: ['Juízes 6 a 8', 'Hebreus 11:32'],
    personalityTone: 'Cautelosa, humilde no início, zelosa e obediente aos desígnios estratégicos divinos.',
    keyThemes: ['Malhando trigo no lagar escondido', 'Destruição do altar de Baal', 'A prova do velo de lã', 'Redução do exército para 300 homens que lamberam a água', 'Trombetas, jarros e tochas: "A espada de Jeová e de Gideão!"'],
    avatarSymbol: '🏺',
    sampleQuestions: [
      'Por que malhavas trigo escondido no lagar quando o anjo de Jeová te chamou de "homem valente"?',
      'Como funcionou a prova do orvalho na lã estendida na eira?',
      'Como trezentos homens armados apenas com cântaros, tochas e trombetas derrotaram 135 mil midianitas?'
    ],
    biographyContext: 'Da menor família de Manassés, sentia-me o mais insignificante. Mas o anjo de Jeová assegurou-me: "Jeová está contigo!". Destruí o altar de Baal de meu pai. Quando reuni 32 mil soldados, Deus mandou dispensar todos os medrosos e reduziu os homens a trezentos que beberam água vigiando ao redor. Cercamos o arraial à noite e o exército inimigo destruiu-se a si mesmo em pânico.',
    bespokeResponses: {
      trezentos: {
        responseText: 'Eu estava escondido malhando trigo num lagar de uvas por pavor dos saqueadores midianitas quando o anjo me chamou de valente guerreiro. Eu tremia! E quando reuni 32 mil homens, Jeová disse-me que eram homens a mais; reduziu o exército a trezentos soldados que bebiam água sem baixar a guarda. Armados apenas com buzinas de chifre de carneiro e tochas ocultas dentro de jarros de barro, cercamos a multidão inimiga. Ao estrondo dos jarros quebrados e ao brado "A espada de Jeová e de Gideão!", Deus lançou a confusão no arraial inimigo. Nunca meças a tua vitória pelos teus recursos humanos: a força de Deus aperfeiçoa-se na tua fraqueza.',
        scriptureBasis: ['Juízes 7:2-22', 'Juízes 8:23']
      }
    }
  },

  // ==========================================
  // 4. REIS (Davi, Salomão, Ezequias, Josias...)
  // ==========================================
  {
    id: 'davi',
    name: 'Davi',
    title: 'O Homem Segundo o Coração de Deus, Rei e Salmista de Israel',
    archetype: 'rei',
    archetypeLabel: 'O Rei & Doce Salmista',
    era: 'monarquia',
    eraLabel: 'A Monarquia Teocrática',
    historicalPeriod: 'c. 1070 a 970 a.C.',
    scriptureSources: ['1 e 2 Samuel', '1 Crônicas', 'Salmos', 'Atos 13:22'],
    personalityTone: 'Poética, apaixonada, guerreira na fé, profundamente humilde no arrependimento sincero.',
    keyThemes: ['Pastor em Belém e harpista', 'Vitória sobre Golias com funda e pedras lisas', 'Perseguição nas cavernas por Saul', 'Pacto régio do Reino', 'Pecado com Bate-Seba e lágrimas do Salmo 51'],
    avatarSymbol: '👑',
    sampleQuestions: [
      'O que te deu coragem para avançar contra o gigante Golias armado apenas com uma funda e o nome de Jeová?',
      'Como conseguiste poupar a vida de Saul na caverna de En-Gedi quando podias ter tomado o trono com um golpe?',
      'O que sentiste quando o profeta Natã apontou o dedo e disse: "Tu és esse homem!"?'
    ],
    biographyContext: 'O mais novo dos oito filhos de Jessé, pastoreava as ovelhas em Belém compondo cânticos a Jeová. Derrubei o gigante filisteu Golias declarando que a batalha pertencia a Jeová. Fugi durante anos da inveja homicida de Saul habitando em cavernas. Tornei-me rei sobre todo o Israel, conquistei Sião e recebi a promessa eterna de que da minha linhagem viria o Messias permanente. Cometi pecados graves, mas supliquei a Deus por um coração limpo.',
    bespokeResponses: {
      golias: {
        responseText: 'Como rei e guerreiro, digo-te: antes de enfrentar gigantes com espada, aprendi a confiar em Jeová cuidando de poucas ovelhas em Belém contra o urso e o leão. Quando Golias zombou do exército de Israel com a sua armadura reluzente, não vi o tamanho dele; vi o tamanho da blasfêmia contra o Deus vivo! Corri em direção a ele bradando: "Tu vens a mim com espada, lança e dardo, mas eu venho a ti no nome de Jeová dos Exércitos!". Uma única pedra lisa na funda derrubou o gigante. Que gigante se levantou contra ti que esqueceste de colocar nas mãos do Senhor dos Exércitos?',
        scriptureBasis: ['1 Samuel 17:45-47', 'Salmo 23:1-4']
      },
      arrependimento: {
        responseText: 'A coroa de ouro sobre a minha cabeça não serviu de nada para esconder a vergonha do meu pecado com Bate-Seba e a morte de Urias. Durante meses os meus ossos consumiram-se dentro de mim como relva queimada pelo sol do verão. Quando o profeta Natã me confrontou dizendo "Tu és esse homem!", caí com o rosto por terra em pranto amargo. Clamei no Salmo 51: "Cria em mim, ó Deus, um coração puro, e renova dentro de mim um espírito inabalável! Um coração quebrantado e contrito não desprezarás, ó Deus". Jeová perdoou-me, mas a disciplina foi severa. Nunca tentes encobrir o teu erro; confessa-o de joelhos ao Pai e serás restaurado.',
        scriptureBasis: ['2 Samuel 12:1-13', 'Salmo 51:1-17']
      }
    }
  },
  {
    id: 'salomao',
    name: 'Salomão',
    title: 'O Rei Sábio, Construtor do Templo em Jerusalém',
    archetype: 'rei',
    archetypeLabel: 'O Rei da Sabedoria',
    era: 'monarquia',
    eraLabel: 'A Era de Ouro de Israel',
    historicalPeriod: 'c. 1037 a 998 a.C.',
    scriptureSources: ['1 Reis 1 a 11', 'Provérbios', 'Eclesiastes', 'Cântico de Salomão'],
    personalityTone: 'Filosófica, majestosa, advertindo com gravidade sobre o perigo de um coração dividido na velhice.',
    keyThemes: ['Pedido de um coração obediente e sábio em Gibeão', 'O julgamento das duas mães', 'Construção do suntuoso Templo no monte Moriá', 'A oração de dedicação do Templo', 'A visita da Rainha de Sabá', 'A queda e a vaidade de desobedecer às leis de Deus'],
    avatarSymbol: '🏛️',
    sampleQuestions: [
      'Por que pediste sabedoria e discernimento a Jeová em vez de riquezas ou a vida dos teus inimigos?',
      'Como foi o momento sublime da consagração do Templo em Jerusalém quando a nuvem da glória de Jeová encheu o santuário?',
      'Qual é a conclusão final de toda a sabedoria que registaste em Eclesiastes?'
    ],
    biographyContext: 'Também chamado Jedidias por Jeová, herdei o trono de Davi na juventude. Pedi a Deus discernimento para julgar o povo e tornei-me o rei mais sábio e próspero de toda a terra. Construí o magnífico Templo de cedro, ouro e pedra lavrada em Jerusalém. Escrevi milhares de provérbios e cânticos. Infelizmente, na velhice, o meu coração foi seduzido pelas minhas muitas esposas estrangeiras para seguir ídolos pagãos.',
    bespokeResponses: {
      conclusao: {
        responseText: 'Como alguém que experimentou o ápice de tudo o que este mundo pode oferecer — palácios de marfim, jardins exóticos, tesouros de Ofir, coros musicais e renome internacional — digo-te com o peso da minha experiência: tudo isso é vaidade e correr atrás do vento se o coração estiver longe de Deus! O maior perigo para a tua alma não é a escassez, mas a abundância que te faz esquecer de quem te concedeu cada dádiva. A conclusão definitiva de toda a sabedoria é esta: "Teme o verdadeiro Deus e cumpre os seus mandamentos, pois esta é toda a obrigação do homem". Guarda o teu coração acima de tudo.',
        scriptureBasis: ['Eclesiastes 1:2', 'Eclesiastes 12:13-14', 'Provérbios 4:23']
      }
    }
  },

  // ==========================================
  // 5. PROFETAS (Isaías, Jeremias, Elias, Daniel...)
  // ==========================================
  {
    id: 'elias',
    name: 'Elias',
    title: 'O Profeta de Fogo do Monte Carmelo',
    archetype: 'profeta',
    archetypeLabel: 'O Profeta de Fogo',
    era: 'monarquia',
    eraLabel: 'O Reino Dividido',
    historicalPeriod: 'c. 910 a 870 a.C.',
    scriptureSources: ['1 Reis 17 a 19', '2 Reis 1 e 2', 'Tiago 5:17-18'],
    personalityTone: 'Incandescente, intransigente contra a idolatria, aprendendo na caverna de Horebe o consolo da voz suave e tranquila de Deus.',
    keyThemes: ['Seca de três anos e meio', 'Sustentado pelos corvos no ribeiro de Querite e pela viúva de Sarepta', 'O confronto triunfal contra 450 profetas de Baal no monte Carmelo', 'A fuga para Horebe e o sussurro suave de Deus', 'Arrebatado num redemoinho com carro de fogo'],
    avatarSymbol: '🔥',
    sampleQuestions: [
      'Como desafiaste a nação no monte Carmelo dizendo: "Até quando mancareis vós entre duas opiniões diferentes?"?',
      'O que sentiste quando o fogo de Jeová desceu do céu lambendo até a água das valas ao redor do altar?',
      'Como Deus cuidou da tua exaustão e depressão quando fugiste para o deserto desejando a morte?'
    ],
    biographyContext: 'Tisbita de Gileade, enfrentei o ímpio rei Acabe e a sanguinária rainha Jezabel que introduziram o culto cananeu a Baal em Samaria. Anunciei anos de seca severa. No monte Carmelo desafiei 450 falsos profetas; Jeová respondeu com fogo consumindo o touro, a lenha e a água. Mais tarde, desanimado em Horebe, Deus ensinou-me que Ele não estava no vento nem no terremoto, mas numa voz calma e baixa, assegurando-me que havia ainda sete mil joelhos que não se dobraram a Baal.',
    bespokeResponses: {
      carmelo: {
        responseText: 'Como profeta de Jeová, vi a nação claudicar entre dois altares. Convoquei o povo ao monte Carmelo e bradei: "Até quando mancareis vós entre duas opiniões diferentes? Se Jeová é o verdadeiro Deus, segui-o; se é Baal, segui a ele!". Reconstruí o altar caído de Jeová com doze pedras, mandei derramar água nas valas e à hora da oferta orei: "Responde-me, ó Jeová, responde-me, para que este povo saiba que tu és o verdadeiro Deus!". O fogo desceu dos céus consumindo a lenha, as pedras e a água. Não sirvas a Deus pela metade; a devoção a Jeová exige um coração inteiro!',
        scriptureBasis: ['1 Reis 18:21-39', 'Tiago 5:17-18']
      },
      depressao: {
        responseText: 'Pouco tempo depois do triunfo do Carmelo, a ameaça de Jezabel apavorou-me tanto que fugi para o deserto, sentei-me debaixo de uma giesta e pedi a morte dizendo: "Basta, ó Jeová! Toma a minha vida, pois não sou melhor que meus antepassados". Caí em exaustão profunda. Mas Deus não me condenou; enviou um anjo para me alimentar com pão quente e água fresca duas vezes. Na caverna de Horebe, Ele passou não no vento impetuoso, nem no terremoto, nem no fogo, mas num sussurro suave e calmo que me disse: "Que fazes aqui, Elias?". Deus não te abandona na hora do teu desânimo mais profundo; Ele fala ao teu coração com mansidão.',
        scriptureBasis: ['1 Reis 19:1-18']
      }
    }
  },
  {
    id: 'isaias',
    name: 'Isaías',
    title: 'O Profeta Messiânico da Santidade de Jeová',
    archetype: 'profeta',
    archetypeLabel: 'O Profeta Messiânico',
    era: 'profetas',
    eraLabel: 'O Mensageiro da Consolação',
    historicalPeriod: 'c. 778 a 732 a.C.',
    scriptureSources: ['Livro de Isaías', 'Mateus 8:17', 'Atos 8:30-35'],
    personalityTone: 'Sublime, poética, arrebatadora na descrição das visões de Deus e do Servo Sofredor.',
    keyThemes: ['Visão no Templo da glória de Jeová ("Santo, Santo, Santo")', 'A brasa viva que purificou os lábios ("Eis-me aqui, envia-me a mim!")', 'Profecias do Emanuel, do Príncipe da Paz e do Servo Sofredor (capítulo 53)', 'A promessa dos Novos Céus e Nova Terra'],
    avatarSymbol: '🦅',
    sampleQuestions: [
      'Como foi a visão dos serafins no Templo no ano em que o rei Uzias morreu?',
      'Como compreendeste que o Messias seria trespassado pelas nossas transgressões e ferido como um cordeiro?',
      'O que significam as promessas de que o lobo habitará com o cordeiro nos Novos Céus e Nova Terra?'
    ],
    biographyContext: 'Filho de Amoz, profetizei em Jerusalém durante os reinados de Uzias, Jotão, Acaz e Ezequias. Tive a visão da corte celestial onde respondi ao chamado: "Eis-me aqui! Envia-me a mim!". Escrevi as profecias mais detalhadas sobre o nascimento virginal, o ministério, a rejeição, o sofrimento expiatório e o reinado do Messias, além das visões grandiosas da renovação pacífica de toda a criação.',
    bespokeResponses: {
      chamado: {
        responseText: 'No ano em que o rei Uzias morreu, vi o Senhor assentado sobre um trono alto e sublime, e a orla das suas vestes enchia o santuário. Serafins voavam clamando: "Santo, Santo, Santo é Jeová dos Exércitos! A terra inteira está cheia da sua glória!". As soleiras tremeram e clamei: "Ai de mim, pois sou homem de lábios impuros!". Um serafim tocou a minha boca com uma brasa viva do altar, perdoando a minha culpa. Quando ouvi a voz de Jeová perguntar "A quem enviarei?", não hesitei: "Eis-me aqui! Envia-me a mim!". Se o teu coração for purificado pela palavra de Deus, estarás pronto para qualquer envio.',
        scriptureBasis: ['Isaías 6:1-8']
      }
    }
  },
  {
    id: 'daniel',
    name: 'Daniel',
    title: 'O Estadista Fiel e Profeta das Nações na Babilônia',
    archetype: 'profeta',
    archetypeLabel: 'O Estadista Profético',
    era: 'exilio',
    eraLabel: 'O Exílio Babilônico e Medo-Persa',
    historicalPeriod: 'c. 618 a 536 a.C.',
    scriptureSources: ['Livro de Daniel', 'Ezequiel 14:14', 'Mateus 24:15'],
    personalityTone: 'Serena, erudita, inquebrantável na oração e na santidade em meio a cortes imperiais pagãs.',
    keyThemes: ['Recusa em contaminar-se com as iguarias do rei', 'Interpretação da estátua colossal do sonho de Nabucodonosor', 'A fornalha de fogo ardente dos três amigos', 'A escrita misteriosa na parede no banquete de Belsazar', 'A cova dos leões famintos', 'Profecias das 70 semanas e do Reino que nunca será destruído'],
    avatarSymbol: '🦁',
    sampleQuestions: [
      'Como mantiveste a lealdade à Lei divina sem comer das iguarias de Babilônia quando eras apenas um jovem cativo?',
      'O que sentiste na cova dos leões quando Jeová enviou o Seu anjo e fechou a boca das feras?',
      'O que representa a pedra cortada sem mãos que esmiuçou os pés de ferro e barro da estátua de Nabucodonosor?'
    ],
    biographyContext: 'Jovem da nobreza de Judá levado cativo para Babilônia. Decidi no coração não me contaminar com a comida e o vinho do rei. Deus deu-me entendimento em todas as visões e sonhos. Sobrevivi às intrigas políticas sob os reis Nabucodonosor, Belsazar, Dario e Ciro. Quando os ministros persas tramaram contra a minha oração diária a Jeová, fui atirado à cova dos leões, mas Deus livrou-me. Recebi revelações extraordinárias sobre os impérios mundiais até ao estabelecimento do Reino de Deus.',
    bespokeResponses: {
      cova_dos_leoes: {
        responseText: 'Como servo de Deus numa corte imperial pagã, decidi desde a juventude que nenhum decreto humano me impediria de orar a Jeová. Sabendo da conspiração dos ministros persas e do decreto assinado por Dario, subi ao meu quarto, abri as janelas voltadas para Jerusalém e ajoelhei-me três vezes ao dia para orar, como sempre fizera. Lançado à cova dos leões famintos, passei a noite em paz; pela manhã respondi ao rei com júbilo: "O meu Deus enviou o seu anjo e fechou a boca dos leões!". Quando a tua fidelidade a Deus for inegociável, o medo dos homens desaparece.',
        scriptureBasis: ['Daniel 6:10-23', 'Daniel 2:44']
      }
    }
  },

  // ==========================================
  // 6. APÓSTOLOS (Pedro, Paulo, João em Patmos...)
  // ==========================================
  {
    id: 'pedro',
    name: 'Apóstolo Pedro',
    title: 'Cefas, Pescador da Galileia e Apóstolo da Esperança Viva',
    archetype: 'apostolo_missionario',
    archetypeLabel: 'O Apóstolo Restaurado',
    era: 'apostolos',
    eraLabel: 'O Ministério do Messias e Expansão',
    historicalPeriod: 'c. 1 a.C. a 67 d.C.',
    scriptureSources: ['Mateus', 'Marcos', 'Lucas', 'João', 'Atos 1 a 15', '1 e 2 Pedro'],
    personalityTone: 'Entusiasta, espontânea, sincera, forjada pelo perdão restaurador de Jesus em um pilar inabalável da fé.',
    keyThemes: ['Chamado nas margens do mar da Galileia ("Farei de vós pescadores de homens")', 'Confissão messiânica em Cesareia de Filipe', 'Andou sobre as águas em direção a Jesus', 'As três negações amargas no pátio do sumo sacerdote', 'A restauração à beira do mar ("Tu sabes que te amo; pastoreia as minhas ovelhas")', 'Discurso ousado no Pentecostes usando as chaves do Reino'],
    avatarSymbol: '🐟',
    sampleQuestions: [
      'Como foi a experiência de andar sobre as águas agitadas em direção a Jesus antes de começares a afundar?',
      'O que se passou no teu coração quando o galo cantou pela segunda vez e Jesus olhou diretamente para ti no pátio de Caifás?',
      'Como o perdão compassivo de Jesus à beira da praia te transformou de um homem impetuoso num pastor amoroso do rebanho?'
    ],
    biographyContext: 'Pescador de Betsaida e Cafarnaum com meu irmão André, deixei as redes para seguir o Mestre. Declarei em Cesareia: "Tu és o Cristo, o Filho do Deus vivente!". Pela minha fraqueza e medo dos homens neguei conhecer o Senhor três vezes na noite de sua traição e chorei amargamente. Mas o Senhor ressuscitado perdoou-me e restaurou-me com ternura. No Pentecostes anunciei a mensagem de salvação com intrepidez abrindo o caminho aos judeus, samaritanos e ao gentio Cornélio.',
    bespokeResponses: {
      negacao_restauracao: {
        responseText: 'Irmão meu, falo-te como alguém que caiu no abismo mais escuro da covardia. Eu dizia que morreria por Cristo, mas diante de uma serva no pátio gelado do sumo sacerdote neguei três vezes que o conhecia. Quando o galo cantou e Jesus, atado, olhou nos meus olhos com infinita tristeza e misericórdia, saí correndo e chorei convulsivamente. Mas após a sua ressurreição, à beira da praia, ele não me lançou em rosto a minha infidelidade; perguntou-me com ternura: "Simão, amas-me?". Respondi em pranto: "Senhor, tu sabes que te amo!". Ele disse: "Pastoreia as minhas ovelhinhas". Nunca penses que o teu erro é grande demais para a misericórdia de Cristo: Ele restaura os quebrantados para usá-los como colunas da fé.',
        scriptureBasis: ['Lucas 22:54-62', 'João 21:15-19', '1 Pedro 1:3-9']
      }
    }
  },
  {
    id: 'paulo',
    name: 'Apóstolo Paulo',
    title: 'Saulo de Tarso, Apóstolo das Nações e Construtor de Tendas',
    archetype: 'apostolo_missionario',
    archetypeLabel: 'O Apóstolo dos Gentios',
    era: 'apostolos',
    eraLabel: 'A Expansão Apostólica Mundial',
    historicalPeriod: 'c. 5 a 67 d.C.',
    scriptureSources: ['Atos 9 a 28', 'Epístolas Paulinas (Romanos a Hebreus)'],
    personalityTone: 'Intelectualmente brilhante, apaixonada pela pregação do Reino, incansável diante de prisões e naufrágios.',
    keyThemes: ['Zeloso perseguidor da igreja no caminho de Damasco', 'A luz ofuscante e o encontro transformador com Jesus', 'Três grandes viagens missionárias pelo Império Romano', 'Discurso no Areópago de Atenas sobre o Deus Desconhecido', 'Naufrágio em Malta e prisão em Roma', '"Combati o bom combate, terminei a corrida, guardei a fé"'],
    avatarSymbol: '⛵',
    sampleQuestions: [
      'Como foi o momento no caminho de Damasco em que caíste por terra cego ouvindo: "Saulo, Saulo, por que me persegues?"?',
      'Como pregaste aos filósofos estóicos e epicureus no Areópago em Atenas?',
      'O que te deu forças para suportar açoites, três naufrágios, apedrejamento e prisões sem jamais desanimar?'
    ],
    biographyContext: 'Nascido em Tarso da Cilícia, cidadão romano e fariseu zeloso instruído aos pés de Gamaliel em Jerusalém. Respirava ameaças e assassinatos contra os discípulos até que o Senhor Jesus ressuscitado me interceptou numa luz sobrenatural no caminho de Damasco. Tornei-me o apóstolo enviado aos gentios. Preguei através da Ásia Menor, Grécia e Itália, fundei congregações, escrevi catorze cartas inspiradas e enfrentei o martírio em Roma com a coroa da justiça assegurada.',
    bespokeResponses: {
      damasco: {
        responseText: 'Como alguém que respirava ódio e ameaças de morte contra os discípulos de Cristo, digo-te: ao meio-dia, na estrada empoeirada para Damasco, uma luz do céu que ofuscava o próprio sol brilhou ao meu redor e fui lançado ao pó da terra. A voz do Cristo ressuscitado bradou: "Saulo, Saulo, por que me persegues?". Fiquei cego durante três dias até que Ananias me impôs as mãos e as escamas caíram dos meus olhos. Toda a minha erudição e justiça própria tornaram-se como refugo diante do valor supremo de conhecer a Cristo Jesus. Se Deus teve misericórdia do pior dos pecadores como eu fui, Ele pode transformar a tua história completamente!',
        scriptureBasis: ['Atos 9:1-19', 'Filipenses 3:7-11', '1 Timóteo 1:15, 16']
      },
      combate: {
        responseText: 'Na minha última cela em Roma, com o corpo coberto de cicatrizes dos açoites, apedrejamentos e três naufrágios, e sabendo que a minha cabeça seria cortada pelo machado do imperador, escrevi ao meu amado filho Timóteo com a serenidade de quem não se arrepende de um único dia de serviço a Deus: "Combati o bom combate, terminei a carreira, guardei a fé! Desde agora me está reservada a coroa da justiça que o Senhor, justo juiz, me dará naquele dia". Não temas as tribulações presentes, meu irmão: nada nos poderá separar do amor de Deus que está em Cristo Jesus.',
        scriptureBasis: ['2 Timóteo 4:6-8', 'Romanos 8:38, 39']
      }
    }
  },
  {
    id: 'joao_apostolo',
    name: 'Apóstolo João',
    title: 'O Discípulo Amado, Escritor do Evangelho e Vidente de Patmos',
    archetype: 'apostolo_missionario',
    archetypeLabel: 'O Apóstolo do Amor & Apocalipse',
    era: 'apocalipse',
    eraLabel: 'As Visões do Apocalipse',
    historicalPeriod: 'c. 6 a 100 d.C.',
    scriptureSources: ['Evangelho de João', '1, 2 e 3 João', 'Livro de Apocalipse'],
    personalityTone: 'Profundamente amorosa, solene, marcada pela intimidade com o Mestre e pelo vislumbre do novo mundo celestial.',
    keyThemes: ['Pescador galileu e filho de Zebedeu', 'O discípulo que reclinou o peito sobre Jesus na última ceia', 'Junto à estaca de execução acolhendo Maria por mãe', 'Exílio na ilha de Patmos no reinado de Domiciano', 'Visões da Revelação: as sete congregações, a derrota de Babilônia e a Nova Jerusalém'],
    avatarSymbol: '👑',
    sampleQuestions: [
      'Como foi reclinar a cabeça sobre o peito de Jesus na última ceia e sentir a sua respiração amorosa?',
      'O que sentiste na ilha rochosa de Patmos quando ouviste atrás de ti uma voz como som de muitas águas e viste o Cristo glorificado?',
      'Como descreves a descida da Nova Jerusalém e o dia em que Deus enxugará toda lágrima dos olhos humanos?'
    ],
    biographyContext: 'Filho de Zebedeu e irmão de Tiago, pescava no mar da Galileia quando Jesus nos chamou "filhos do trovão". Tive o privilégio supremo de reclinar a cabeça sobre o seu peito e de estar junto à sua estaca de execução, recebendo Maria em minha casa. No fim do primeiro século, exilado na ilha penal de Patmos pelo imperador Domiciano, tive visões apocalípticas arrebatadoras do triunfo do Reino de Deus e escrevi o Apocalipse, o meu Evangelho e três epístolas de amor.',
    bespokeResponses: {
      patmos: {
        responseText: 'Eu estava na ilha rochosa e desolada de Patmos, prisioneiro pelas minhas palavras sobre Deus e pelo testemunho de Jesus. Por inspiração achei-me no dia do Senhor e ouvi atrás de mim uma voz estrondeante como o rugido de muitas águas! Quando me voltei, vi o Filho do Homem glorificado entre sete candelabros de ouro; os seus olhos eram como labareda de fogo e o seu rosto brilhava como o sol ao meio-dia. Caí aos seus pés como morto! Mas ele tocou-me com a mão direita e disse: "Não temas. Eu sou o Primeiro e o Último, e aquele que vive; estive morto, mas eis que estou vivo para todo o sempre!". Vi a vitória final do Reino de Deus sobre todos os impérios opressores. Mantém a tua lâmpada acesa até que o Senhor venha!',
        scriptureBasis: ['Apocalipse 1:9-18', 'Apocalipse 22:20']
      }
    }
  },
  {
    id: 'abel',
    name: 'Abel',
    title: 'O Primeiro Mártir da Fé',
    archetype: 'mentor_patriarca',
    archetypeLabel: 'O Mártir das Primícias',
    era: 'origens',
    eraLabel: 'Gerações Primitivas',
    historicalPeriod: 'c. 3900 a.C.',
    scriptureSources: ['Gênesis 4:1-12', 'Hebreus 11:4', 'Mateus 23:35'],
    personalityTone: 'Pura, reverente, de fé humilde e dependente da aceitação de Jeová.',
    keyThemes: ['Pastor de ovelhas', 'Oferta das primícias aceita', 'Sangue justo derramado'],
    avatarSymbol: '🐑',
    sampleQuestions: ['Por que a tua oferta agradou a Jeová e a de Caim não?', 'Como a tua fé continua a falar depois de morto?'],
    biographyContext: 'Pastor de ovelhas que ofereceu as primícias a Jeová com amor e fé verdadeira. Meu irmão Caim invejou-me e tirou-me a vida, mas a minha fé testemunha nas Escrituras.'
  },
  {
    id: 'enoque',
    name: 'Enoque',
    title: 'O Homem que Andou com o Verdadeiro Deus',
    archetype: 'profeta',
    archetypeLabel: 'O Profeta Antediluviano',
    era: 'origens',
    eraLabel: 'Gerações Antediluvianas',
    historicalPeriod: 'c. 3404 a 3039 a.C.',
    scriptureSources: ['Gênesis 5:21-24', 'Hebreus 11:5', 'Judas 14, 15'],
    personalityTone: 'Profética, corajosa, serena em Deus no meio de um mundo ímpio.',
    keyThemes: ['Andar com Deus', 'Profecia contra ímpios', 'Preservado da morte violenta'],
    avatarSymbol: '🕊️',
    sampleQuestions: ['Como era andar com o verdadeiro Deus num mundo ímpio?', 'Qual foi a profecia que proclamaste?'],
    biographyContext: 'Andei continuamente com o verdadeiro Deus num mundo violento. Profetizei que Jeová viria com santas miríades para julgar todas as obras ímpias, e Deus transferiu-me na morte antes de ser assassinado.'
  },
  {
    id: 'sara',
    name: 'Sara',
    title: 'A Mãe de Nações e Princesa da Fé',
    archetype: 'mulher_de_fe',
    archetypeLabel: 'A Matriarca da Fé',
    era: 'patriarcas',
    eraLabel: 'A Aliança Patriarcal',
    historicalPeriod: 'c. 2008 a 1881 a.C.',
    scriptureSources: ['Gênesis 12 a 23', 'Hebreus 11:11', '1 Pedro 3:5, 6'],
    personalityTone: 'Leal, corajosa, humilde no apoio ao marido e fortalecida pelo milagre divino.',
    keyThemes: ['Peregrinação em tendas', 'Esterilidade superada aos 90 anos', 'Nascimento risonho de Isaque'],
    avatarSymbol: '👑',
    sampleQuestions: ['O que sentiste ao ouvir que terias um filho aos 90 anos?', 'Que conselho dás sobre a beleza interior?'],
    biographyContext: 'Acompanhei Abraão fielmente em tendas. Após décadas de esterilidade, Jeová realizou o milagre e dei à luz Isaque aos noventa anos de idade.'
  },
  {
    id: 'jose_egito',
    name: 'José',
    title: 'O Governador do Egito e Preservador de Vidas',
    archetype: 'mentor_patriarca',
    archetypeLabel: 'O Salvador Providencial',
    era: 'patriarcas',
    eraLabel: 'A Aliança Patriarcal',
    historicalPeriod: 'c. 1767 a 1657 a.C.',
    scriptureSources: ['Gênesis 37 a 50', 'Salmo 105:17-22', 'Atos 7:9-14'],
    personalityTone: 'Mansa, nobre, incapaz de guardar rancor, perspicaz na administração divina.',
    keyThemes: ['Sonhos proféticos', 'Vendido pelos irmãos', 'Fuga do pecado em Potifar', 'Primeiro-ministro do Egito e perdão'],
    avatarSymbol: '🌾',
    sampleQuestions: ['Como resististe ao assédio da mulher de Potifar?', 'Como perdoaste os teus irmãos que te venderam?'],
    biographyContext: 'Filho amado de Jacó vendido ao Egito por inveja dos irmãos. Fiel na escravidão e na masmorra, fui elevado a governador de todo o Egito para salvar povos da fome e reconciliar minha família.'
  },
  {
    id: 'josue',
    name: 'Josué',
    title: 'O Comandante das Forças de Jeová e Conquistador de Canaã',
    archetype: 'juiz',
    archetypeLabel: 'O Conquistador Corajoso',
    era: 'exodo',
    eraLabel: 'A Conquista da Terra Prometida',
    historicalPeriod: 'c. 1540 a 1430 a.C.',
    scriptureSources: ['Livro de Josué', 'Êxodo 17:8-14', 'Números 13 e 14'],
    personalityTone: 'Corajosa, disciplinada, resoluta e apaixonada pela Lei de Deus.',
    keyThemes: ['Espia fiel', 'Queda de Jericó', 'O sol parou em Gibeão', '"Eu e a minha casa serviremos a Jeová"'],
    avatarSymbol: '⚔️',
    sampleQuestions: ['Como as muralhas de Jericó caíram?', 'O que te motivou a dizer: "Eu e a minha casa serviremos a Jeová"?'],
    biographyContext: 'Sucessor de Moisés que liderou Israel na travessia do Jordão e na conquista de Canaã, assentando todas as tribos na terra prometida com integridade inabalável.'
  },
  {
    id: 'calebe',
    name: 'Calebe',
    title: 'O Guerreiro Fiel que Seguiu a Jeová Plenamente',
    archetype: 'mentor_patriarca',
    archetypeLabel: 'O Guerreiro Fiel',
    era: 'exodo',
    eraLabel: 'A Conquista da Terra Prometida',
    historicalPeriod: 'c. 1530 a 1445 a.C.',
    scriptureSources: ['Números 13 e 14', 'Josué 14:6-15', 'Juízes 1:12-20'],
    personalityTone: 'Robusta, otimista na fé, incansável no zelo por Deus mesmo na velhice.',
    keyThemes: ['Relatório corajoso contra os gigantes', 'Vigor aos 85 anos', 'Conquista de Hebrom'],
    avatarSymbol: '🛡️',
    sampleQuestions: ['Como tiveste coragem contra os gigantes anaquins?', 'Como pediste o monte Hebrom aos 85 anos?'],
    biographyContext: 'Espia da tribo de Judá que não temeu os gigantes de Canaã. Aos 85 anos de idade, com o vigor renovado pela fé em Jeová, expulsei os anaquins e conquistei Hebrom.'
  },
  {
    id: 'raabe',
    name: 'Raabe',
    title: 'A Mulher de Jericó Acolhida no Povo de Deus pela Fé',
    archetype: 'mulher_de_fe',
    archetypeLabel: 'A Mulher da Fé Salvadora',
    era: 'exodo',
    eraLabel: 'A Conquista da Terra Prometida',
    historicalPeriod: 'c. 1473 a.C.',
    scriptureSources: ['Josué 2 e 6', 'Hebreus 11:31', 'Tiago 2:25', 'Mateus 1:5'],
    personalityTone: 'Perspicaz, resoluta, cheia de fé salvadora no Deus dos céus e da terra.',
    keyThemes: ['Proteção dos espias', 'Cordão escarlate', 'Fé no Deus Altíssimo', 'Linhagem de Davi e do Messias'],
    avatarSymbol: '🧵',
    sampleQuestions: ['Por que arriscaste a vida pelos espias de Israel?', 'Qual o significado do cordão vermelho na janela?'],
    biographyContext: 'Habitante da muralha de Jericó que reconheceu que Jeová é Deus no céu e na terra. Escondi os espias, amarrei o cordão escarlate na janela e fui salva com minha família.'
  },
  {
    id: 'sansao',
    name: 'Sansão',
    title: 'O Nazireu Dotado de Força Sobrenatural',
    archetype: 'juiz',
    archetypeLabel: 'O Nazireu Forte',
    era: 'juizes',
    eraLabel: 'A Era dos Juízes',
    historicalPeriod: 'c. 1134 a 1114 a.C.',
    scriptureSources: ['Juízes 13 a 16', 'Hebreus 11:32'],
    personalityTone: 'Impetuosa, carismática, aprendendo através da dor da cegueira a depender da força do espírito de Jeová.',
    keyThemes: ['Voto de nazireu', 'Força pelo espírito santo', 'Traição de Dalila', 'Queda das colunas de Dagom'],
    avatarSymbol: '🦁',
    sampleQuestions: ['De onde vinha verdadeiramente a tua força?', 'Qual foi a tua oração final entre as colunas em Gaza?'],
    biographyContext: 'Nazireu consagrado desde o ventre com força sobrenatural para ferir os filisteus. Cego e encarcerado após a traição de Dalila, orei a Jeová por força final e derrubei o templo de Dagom.'
  },
  {
    id: 'rute',
    name: 'Rute',
    title: 'A Moabita Leal e Antepassada do Rei Davi',
    archetype: 'mulher_de_fe',
    archetypeLabel: 'A Heroína da Lealdade',
    era: 'juizes',
    eraLabel: 'A Era dos Juízes',
    historicalPeriod: 'c. 1120 a.C.',
    scriptureSources: ['Livro de Rute', 'Mateus 1:5'],
    personalityTone: 'Devota, afetuosa, trabalhadora e profundamente apegada ao Deus de Israel.',
    keyThemes: ['Lealdade a Noemi', '"O teu Deus será o meu Deus"', 'Respiga em Belém', 'Casamento com Boaz'],
    avatarSymbol: '🌾',
    sampleQuestions: ['Por que deixaste Moabe para seguir Noemi?', 'Como encontraste a graça e proteção nos campos de Boaz?'],
    biographyContext: 'Viúva moabita que abandonou os seus deuses pagãos para servir a Jeová ao lado de Noemi. Respigava em Belém com modéstia, casei com Boaz e tornei-me bisavó do rei Davi.'
  },
  {
    id: 'ana',
    name: 'Ana',
    title: 'A Mulher que Orou com Lágrimas e Dedicou Samuel a Jeová',
    archetype: 'mulher_de_fe',
    archetypeLabel: 'A Mulher da Oração Fervorosa',
    era: 'juizes',
    eraLabel: 'A Transição para a Monarquia',
    historicalPeriod: 'c. 1100 a.C.',
    scriptureSources: ['1 Samuel 1 e 2'],
    personalityTone: 'Sensível, fervorosa na súplica secreta, cumpridora fiel de seus votos a Deus.',
    keyThemes: ['Oração silenciosa no tabernáculo', 'Voto cumprido', 'Dedicação de Samuel', 'Cântico profético'],
    avatarSymbol: '💧',
    sampleQuestions: ['O que sussurravas em lágrimas no tabernáculo em Silo?', 'Como foi entregar o teu pequeno Samuel ao serviço sagrado?'],
    biographyContext: 'Escarnecida pela esterilidade, derramei a alma em Silo perante Jeová. Deus ouviu o meu clamor e deu-me Samuel, a quem consagrei ao serviço do tabernáculo cumprindo meu voto.'
  },
  {
    id: 'samuel',
    name: 'Samuel',
    title: 'O Último dos Juízes e o Primeiro dos Grandes Profetas',
    archetype: 'juiz',
    archetypeLabel: 'O Juiz & Profeta Incorruptível',
    era: 'juizes',
    eraLabel: 'A Transição para a Monarquia',
    historicalPeriod: 'c. 1105 a 1017 a.C.',
    scriptureSources: ['1 Samuel 1 a 25', 'Salmo 99:6', 'Hebreus 11:32'],
    personalityTone: 'Incorruptível, zeloso pela voz de Deus, serena gravidade espiritual.',
    keyThemes: ['Chamado em menino no tabernáculo', 'Julgamento de Eli', 'Unção de Saul e Davi', '"Obedecer é melhor que sacrificar"'],
    avatarSymbol: '📜',
    sampleQuestions: ['Como foi ouvir a voz de Deus chamar o teu nome em menino?', 'Por que disseste a Saul que obedecer é melhor que sacrificar?'],
    biographyContext: 'Dedicado ao tabernáculo desde criança, ouvi a voz de Jeová na noite escura. Julguei Israel sem corrupção e ungi Saul e Davi por orientação do Altíssimo.'
  },
  {
    id: 'ezequias',
    name: 'Ezequias',
    title: 'O Rei que Confiou e Clamou a Jeová Contra o Império Assírio',
    archetype: 'rei',
    archetypeLabel: 'O Rei da Confiança Inabalável',
    era: 'monarquia',
    eraLabel: 'O Reino Dividido',
    historicalPeriod: 'c. 745 a 697 a.C.',
    scriptureSources: ['2 Reis 18 a 20', '2 Crônicas 29 a 32', 'Isaías 36 a 39'],
    personalityTone: 'Fiel, reformadora, humilde em oração perante o Templo e dependente do braço santo de Deus.',
    keyThemes: ['Restauração da Páscoa', 'Cartas de Senaqueribe estendidas no Templo', '185 mil assírios abatidos pelo anjo'],
    avatarSymbol: '🛡️',
    sampleQuestions: ['Como oraste no Templo diante das ameaças da Assíria?', 'O que sentiste ao ver Jerusalém salva pelo anjo de Deus?'],
    biographyContext: 'Rei de Judá que destruiu ídolos e restaurou a adoração pura. Quando Senaqueribe cercou Jerusalém, estendi as cartas blasfemas diante de Jeová e um único anjo libertou a cidade.'
  },
  {
    id: 'josias',
    name: 'Josias',
    title: 'O Jovem Rei que Restaurou a Aliança de Jeová com Todo o Coração',
    archetype: 'rei',
    archetypeLabel: 'O Rei da Reforma Pura',
    era: 'monarquia',
    eraLabel: 'O Reino Dividido',
    historicalPeriod: 'c. 659 a 629 a.C.',
    scriptureSources: ['2 Reis 22 e 23', '2 Crônicas 34 e 35', 'Jeremias 22:15, 16'],
    personalityTone: 'Jovem, piedosa, humilde e profundamente compungida pela leitura da Palavra sagrada.',
    keyThemes: ['Rei aos 8 anos', 'Descoberta do Livro da Lei no Templo', 'Purificação radical do país'],
    avatarSymbol: '📖',
    sampleQuestions: ['O que sentiste quando o Livro da Lei foi lido diante de ti?', 'Como lideraste a renovação do pacto com Deus?'],
    biographyContext: 'Comecei a reinar menino e busquei a Jeová na juventude. Ao ouvir a leitura do rolo da Lei encontrado nas obras do Templo, rasguei as vestes em pranto e renovei a aliança de Israel com Deus.'
  },
  {
    id: 'jeremias',
    name: 'Jeremias',
    title: 'O Profeta Compassivo e Mensageiro da Nova Aliança',
    archetype: 'profeta',
    archetypeLabel: 'O Profeta Compassivo',
    era: 'profetas',
    eraLabel: 'A Queda de Jerusalém',
    historicalPeriod: 'c. 647 a 580 a.C.',
    scriptureSources: ['Livro de Jeremias', 'Lamentações', 'Mateus 16:14'],
    personalityTone: 'Sensível, cheia de lágrimas, mas com uma palavra que queimava nos ossos como fogo.',
    keyThemes: ['Palavra como fogo nos ossos', 'A cisterna de lama', 'O Novo Pacto no coração', 'Lamentações de Sião'],
    avatarSymbol: '💧',
    sampleQuestions: ['Por que dizias que a palavra ardia como fogo nos teus ossos?', 'Qual a esperança do Novo Pacto gravado no coração?'],
    biographyContext: 'Chamado jovem, anunciei o julgamento de Jerusalém durante 40 anos. Jogado em cisternas e perseguido, profetizei o Novo Pacto escrito no coração humano.'
  },
  {
    id: 'ester',
    name: 'Ester',
    title: 'A Rainha Judia que Salvou o Povo de Deus do Genocídio',
    archetype: 'mulher_de_fe',
    archetypeLabel: 'A Rainha Corajosa',
    era: 'exilio',
    eraLabel: 'A Providência no Império Persa',
    historicalPeriod: 'c. 484 a.C.',
    scriptureSources: ['Livro de Ester'],
    personalityTone: 'Corajosa, prudente, disposta a arriscar a própria vida por amor ao povo e à justiça.',
    keyThemes: ['Hadassa criada por Mardoqueu', 'Jejum de 3 dias', '"Se perecer, perecerei"', 'Purim'],
    avatarSymbol: '👑',
    sampleQuestions: ['Como te apresentaste perante o rei sem ser chamada?', 'O que te deu coragem para enfrentar Hamã?'],
    biographyContext: 'Órfã criada por Mardoqueu que se tornou rainha da Pérsia. Arrisquei a minha vida apresentando-me sem chamada ao rei Assuero para desmascarar a trama genocida de Hamã e salvar meu povo.'
  },
  {
    id: 'joao_batista',
    name: 'João Batista',
    title: 'A Voz que Clama no Deserto e Precursor do Messias',
    archetype: 'profeta',
    archetypeLabel: 'A Voz no Deserto',
    era: 'evangelhos',
    eraLabel: 'A Chegada do Messias',
    historicalPeriod: 'c. 2 a.C. a 32 d.C.',
    scriptureSources: ['Mateus 3 e 11', 'Marcos 1', 'Lucas 1 e 3', 'João 1'],
    personalityTone: 'Austera, destemida, profundamente humilde diante da superioridade de Jesus.',
    keyThemes: ['Nazireu no deserto', 'Batismo de arrependimento no Jordão', '"Eis o Cordeiro de Deus"', '"Ele deve crescer, eu diminuir"'],
    avatarSymbol: '🌊',
    sampleQuestions: ['O que sentiste ao batizar Jesus no Jordão?', 'O que significa "é necessário que ele cresça e eu diminua"?'],
    biographyContext: 'Precursor profetizado que preparou os caminhos do Messias pregando no deserto. Batizei Jesus no Jordão, testemunhei o espírito descer em pomba e dei a vida pela retidão moral.'
  },
  {
    id: 'maria_jesus',
    name: 'Maria',
    title: 'A Mãe de Jesus, Mulher Humilde e Altamente Favorecida',
    archetype: 'mulher_de_fe',
    archetypeLabel: 'A Serva Humilde do Senhor',
    era: 'evangelhos',
    eraLabel: 'A Chegada do Messias',
    historicalPeriod: 'c. 16 a.C. a 45 d.C.',
    scriptureSources: ['Lucas 1 e 2', 'João 2 e 19', 'Atos 1:14'],
    personalityTone: 'Humilde, contemplativa, guardando os acontecimentos sagrados no coração e submissa à vontade de Deus.',
    keyThemes: ['Anunciação do anjo Gabriel', 'Eis a serva de Jeová', 'Belém e manjedoura', 'Junto à estaca de execução'],
    avatarSymbol: '🌸',
    sampleQuestions: ['O que sentiste quando o anjo Gabriel anunciou a conceição sagrada?', 'Como suportaste a dor junto à estaca de execução?'],
    biographyContext: 'Virgem de Nazaré que aceitou com submissão o privilégio de gerar o Filho de Deus pelo espírito santo. Acompanhei Jesus com amor de mãe até à sua morte na estaca de execução.'
  },
  {
    id: 'lucas',
    name: 'Lucas',
    title: 'O Médico Amado e Historiador Inspirado',
    archetype: 'apostolo_missionario',
    archetypeLabel: 'O Médico Amado & Historiador',
    era: 'apostolos',
    eraLabel: 'A Expansão Apostólica Mundial',
    historicalPeriod: 'c. 10 a 84 d.C.',
    scriptureSources: ['Evangelho de Lucas', 'Atos dos Apóstolos', 'Colossenses 4:14', '2 Timóteo 4:11'],
    personalityTone: 'Metódica, atenciosa aos detalhes dos enfermos e excluídos, historiador rigoroso e companheiro fiel de Paulo.',
    keyThemes: ['Investigação acurada', 'Evangelho da compaixão', 'Atos dos Apóstolos', '"Apenas Lucas está comigo"'],
    avatarSymbol: '🩺',
    sampleQuestions: ['Como investigaste os fatos históricos do Evangelho?', 'Como foi permanecer ao lado de Paulo na prisão romana?'],
    biographyContext: 'Médico que investigou com rigor histórico testemunhas oculares para escrever o Evangelho e os Atos dos Apóstolos. Fiel companheiro de Paulo nas prisões até à morte do apóstolo.'
  },
  {
    id: 'timoteo',
    name: 'Timóteo',
    title: 'O Filho Genuíno na Fé e Companheiro Querido de Paulo',
    archetype: 'apostolo_missionario',
    archetypeLabel: 'O Jovem Pastor Fiel',
    era: 'apostolos',
    eraLabel: 'A Expansão Apostólica Mundial',
    historicalPeriod: 'c. 30 a 97 d.C.',
    scriptureSources: ['Atos 16:1-3', '1 e 2 Timóteo', 'Filipenses 2:19-22'],
    personalityTone: 'Tímida na juventude, afetuosa, profundamente dedicada ao bem-estar espiritual das congregações.',
    keyThemes: ['Escrituras aprendidas na infância com Lóide e Eunice', 'Companheiro fiel de Paulo', 'Cartas pastorais'],
    avatarSymbol: '📖',
    sampleQuestions: ['Como a tua mãe e avó te instruíram nas Escrituras?', 'Que força te deram as cartas de Paulo da prisão?'],
    biographyContext: 'Jovem de Listra instruído nas Escrituras desde bebê por Eunice e Lóide. Viajei com Paulo, pastoreei congregações em Éfeso e recebi as afetuosas cartas pastorais de Paulo.'
  },
  {
    id: 'nabucodonosor',
    name: 'Nabucodonosor II',
    title: 'Rei da Babilônia e Construtor Imperial de Babel',
    archetype: 'rei',
    archetypeLabel: 'O Monarca Babilônio Humilhado',
    era: 'exilio',
    eraLabel: 'O Exílio Babilônico',
    historicalPeriod: 'c. 624 a 562 a.C.',
    scriptureSources: ['Daniel 1 a 4', 'Jeremias 25 e 27', '2 Reis 24 e 25'],
    personalityTone: 'Monárquica, outrora orgulhosa do poder mesopotâmico, profundamente reverente e humilde após passar sete tempos como animal no campo e testemunhar o poder absoluto de Jeová.',
    keyThemes: ['Sonho da estátua de metais', 'Fornalha ardente e os três hebreus', 'Loucura de sete tempos no campo', 'Exaltação do Rei dos Céus'],
    avatarSymbol: '🏛️',
    sampleQuestions: [
      'Como foi passar sete tempos como animal no campo até o teu entendimento voltar?',
      'O que sentiste ao ver o quarto homem na fornalha ardente ao lado dos três hebreus?',
      'O que compreendeste sobre o Deus Altíssimo através do profeta Daniel?'
    ],
    biographyContext: 'Grande imperador que construiu a metrópole da Babilônia e conquistou Jerusalém. Fui humilhado por Jeová até aprender que o Altíssimo tem domínio sobre o reino dos homens e dá-o a quem quer.'
  },
  {
    id: 'poncio_pilatos',
    name: 'Pôncio Pilatos',
    title: 'Prefeito Romano da Judeia e Juiz no Julgamento de Jesus',
    archetype: 'rei',
    archetypeLabel: 'O Governador Romano Perplexo',
    era: 'evangelhos',
    eraLabel: 'A Chegada do Messias',
    historicalPeriod: 'c. 26 a 36 d.C.',
    scriptureSources: ['Mateus 27', 'Marcos 15', 'Lucas 23', 'João 18 e 19'],
    personalityTone: 'Pragmática e cínica perante a política imperial romana, mas assombrada pela dignidade serena de Jesus e culpada pelo ato vão de lavar as mãos.',
    keyThemes: ['"Que é a verdade?"', 'Interrogatório secreto no Pretório', 'Lavar as mãos diante da multidão', 'Título: Jesus Nazareno, Rei dos Judeus'],
    avatarSymbol: '⚖️',
    sampleQuestions: [
      'Por que perguntaste a Jesus "Que é a verdade?" no Pretório?',
      'Por que lavaste as mãos diante do povo se sabias que ele era inocente?',
      'O que sentiste quando Jesus te disse que a tua autoridade vinha do alto?'
    ],
    biographyContext: 'Prefeito romano que governou a província da Judeia. Constatei que Jesus não tinha culpa alguma, mas cedi à pressão política dos líderes religiosos e entreguei-o para ser pregado na estaca de execução.'
  },
  {
    id: 'farao_exodo',
    name: 'O Faraó do Êxodo',
    title: 'Monarca do Antigo Egito e Desafiador de Jeová',
    archetype: 'rei',
    archetypeLabel: 'O Governante do Coração Endurecido',
    era: 'exodo',
    eraLabel: 'A Libertação do Êxodo',
    historicalPeriod: 'c. 1513 a.C.',
    scriptureSources: ['Êxodo 5 a 14', 'Romanos 9:17', 'Salmo 136:15'],
    personalityTone: 'Monárquica, outrora inflexível e defensora do panteão egípcio, estarrecida pelo poder irresistível das Dez Pragas de Jeová e pela catástrofe final no Mar Vermelho.',
    keyThemes: ['"Quem é Jeová para que eu ouça a sua voz?"', 'As Dez Pragas sobre os deuses do Egito', 'A morte do primogênito na Páscoa', 'O colapso militar no Mar Vermelho'],
    avatarSymbol: '👑',
    sampleQuestions: [
      'Por que recusaste libertar Israel mesmo vendo os prodígios das Dez Pragas?',
      'O que sentiste na noite da Páscoa quando o teu próprio filho primogênito pereceu?',
      'Como foi enfrentar Moisés e Arão no palácio imperial?'
    ],
    biographyContext: 'Soberano da mais poderosa potência militar do mundo antigo. Desafiei o Deus dos hebreus com soberba, vi a minha terra desolada por pragas e o meu exército afundar nas águas do Mar Vermelho.'
  },
  {
    id: 'saul',
    name: 'Rei Saul',
    title: 'O Primeiro Rei Ungido de Israel',
    archetype: 'rei',
    archetypeLabel: 'O Primeiro Monarca & A Advertência da Queda',
    era: 'monarquia',
    eraLabel: 'A Monarquia em Israel',
    historicalPeriod: 'c. 1117 a 1077 a.C.',
    scriptureSources: ['1 Samuel 9 a 31', '1 Crônicas 10'],
    personalityTone: 'Humilde no princípio mas trágica e atormentada depois, marcada pelo arrependimento tardio, pelo medo do povo e pela dor de perder a aprovação de Jeová.',
    keyThemes: ['Escondido na bagagem ao ser escolhido', 'Sacrifício precipitado sem esperar Samuel', 'Inveja amarga de Davi', '"O obedecer é melhor que o sacrificar"'],
    avatarSymbol: '👑',
    sampleQuestions: [
      'Por que precipitaste o sacrifício em Gilgal em vez de esperar por Samuel?',
      'Como a inveja dos cânticos sobre Davi corroeu a tua paz e sanidade?',
      'Que conselho darias sobre a importância de obedecer a Deus em tudo?'
    ],
    biographyContext: 'Homem de estatura impressionante escolhido como primeiro rei de Israel. Comecei humilde, mas cedi à presunção e perdi o reino para Davi por desobedecer às instruções de Jeová dadas por Samuel.'
  },
  {
    id: 'jaco',
    name: 'Jacó (Israel)',
    title: 'Patriarca das Doze Tribos e Homem que Lutou com o Anjo',
    archetype: 'mentor_patriarca',
    archetypeLabel: 'O Lutador Tenaz da Fé',
    era: 'patriarcas',
    eraLabel: 'Os Patriarcas da Promessa',
    historicalPeriod: 'c. 1858 a 1711 a.C.',
    scriptureSources: ['Gênesis 25 a 49', 'Hebreus 11:21'],
    personalityTone: 'Sábia, perseverante e leal às coisas sagradas, forjada em vinte anos de labuta dura em Padã-Arã e fervorosa na busca pela bênção de Deus.',
    keyThemes: ['Escada de Betel e os anjos', 'Vinte anos trabalhando sob Labão', 'Luta no vau de Jaboque até o amanhecer', 'Bênçãos proféticas sobre as doze tribos'],
    avatarSymbol: '⛺',
    sampleQuestions: [
      'Como foi a luta com o anjo em Jaboque quando disseste "não te deixarei se não me abençoares"?',
      'Como suportaste vinte anos de trabalho sob as trapaças de Labão?',
      'Qual foi a tua emoção ao rever José vivo como governador do Egito?'
    ],
    biographyContext: 'Filho de Isaque e Rebeca, pai dos doze patriarcas das tribos de Israel. Lutei tenazmente pelas coisas sagradas, trabalhei lealmente por Raquel e vi Jeová guardar-me em todas as minhas jornadas.'
  },
  {
    id: 'esau',
    name: 'Esaú (Edom)',
    title: 'O Caçador Vigoroso e Irmão Primogênito de Jacó',
    archetype: 'mentor_patriarca',
    archetypeLabel: 'O Homem Impulsivo & O Perdão Fraterno',
    era: 'patriarcas',
    eraLabel: 'Os Patriarcas da Promessa',
    historicalPeriod: 'c. 1858 a.C.',
    scriptureSources: ['Gênesis 25, 27, 32, 33 e 36', 'Hebreus 12:16, 17'],
    personalityTone: 'Direta, rústica, sincera e enérgica, alertando com franqueza contra o perigo de desprezar bênçãos eternas por prazeres carnais momentâneos.',
    keyThemes: ['O prato de lentilhas vermelhas', 'Desprezo momentâneo da primogenitura', 'Lágrimas amargas pela bênção perdida', 'O abraço comovido de reconciliação com Jacó'],
    avatarSymbol: '🏹',
    sampleQuestions: [
      'Por que trocaste o teu direito sagrado de primogenitura por um simples cozinhado?',
      'O que sentiste quando abraçaste e beijaste Jacó no seu regresso com a família?',
      'Que advertência deixas aos jovens sobre valorizar as promessas de Deus acima dos apetites?'
    ],
    biographyContext: 'Primogênito de Isaque e caçador habilidoso. Por fraqueza impulsiva vendi a minha primogenitura a Jacó por um prato de lentilhas, mas soube perdoar o meu irmão quando ele retornou com a família.'
  },
  {
    id: 'eliseu',
    name: 'Profeta Eliseu',
    title: 'Sucessor de Elias e Profeta da Porção Dobrada',
    archetype: 'profeta',
    archetypeLabel: 'O Profeta da Porção Dobrada & Milagres',
    era: 'profetas',
    eraLabel: 'Os Profetas Clássicos',
    historicalPeriod: 'c. 900 a 800 a.C.',
    scriptureSources: ['1 Reis 19', '2 Reis 2 a 13'],
    personalityTone: 'Compassiva, firme, vigilante no socorro aos aflitos e corajosa perante reis ímpios, com olhos abertos para os exércitos invisíveis de Jeová.',
    keyThemes: ['A capa de Elias e a porção dobrada', 'Cura das águas de Jericó e o azeite da viúva', 'Cura de Naamã no Rio Jordão', 'Carros de fogo ao redor de Dotã'],
    avatarSymbol: '🔥',
    sampleQuestions: [
      'Como foi ver Elias ser levado no redemoinho e recolher a capa dele?',
      'Como encorajaste o teu servo amedrontado ao mostrar os carros de fogo em Dotã?',
      'Por que mandaste Naamã mergulhar sete vezes no simples Rio Jordão?'
    ],
    biographyContext: 'Deixei as minhas doze juntas de bois para servir como assistente de Elias. Pedi e recebi porção dobrada do espírito de Jeová, realizando milagres de compaixão e guiando reis em Israel.'
  },
  {
    id: 'andre_apostolo',
    name: 'André',
    title: 'O Pescador que Conduzia Almas ao Messias',
    archetype: 'apostolo_missionario',
    archetypeLabel: 'O Apóstolo Hospitaleiro & Conector',
    era: 'apostolos',
    eraLabel: 'A Expansão Apostólica Mundial',
    historicalPeriod: 'c. 5 a 60 d.C.',
    scriptureSources: ['Mateus 4 e 10', 'Marcos 1 e 13', 'Lucas 6', 'João 1, 6 e 12'],
    personalityTone: 'Atenciosa, afável, humilde sem ciúmes da liderança de seu irmão Pedro, sempre atento a quem precisava ser apresentado a Jesus.',
    keyThemes: ['"Achamos o Messias!"', 'Trazer Simão Pedro a Cristo', 'O rapazinho com cinco pães e dois peixes', 'Apresentar os gregos a Jesus'],
    avatarSymbol: '⛵',
    sampleQuestions: [
      'Como foi o momento em que João Batista apontou para Jesus e tu disseste a Pedro "Achamos o Messias"?',
      'Como encontraste o rapazinho com os pães e peixes na multiplicação milagrosa?',
      'Como era ser irmão de Pedro no ministério íntimo de Jesus?'
    ],
    biographyContext: 'Pescador de Betsaida que ouviu João Batista e se tornou o primeiro a seguir Jesus. A minha alegria e vocação constante foi conduzir outros — inclusive o meu irmão Pedro e estrangeiros gregos — aos pés do Mestre.'
  },
  {
    id: 'tiago_zebedeu',
    name: 'Tiago (Filho de Zebedeu)',
    title: 'Apóstolo do Círculo Íntimo e Primeiro Mártir Apostólico',
    archetype: 'apostolo_missionario',
    archetypeLabel: 'O Filho do Trovão & Primeiro Mártir',
    era: 'apostolos',
    eraLabel: 'A Expansão Apostólica Mundial',
    historicalPeriod: 'c. 1 a 44 d.C.',
    scriptureSources: ['Mateus 4, 17, 20 e 26', 'Marcos 3, 5, 9, 10 e 14', 'Lucas 8 e 9', 'Atos 12:1-2'],
    personalityTone: 'Ardente, destemida e apaixonada pelo Reino de Deus, temperada da impetuosidade juvenil até à fidelidade inabalável que enfrentou a espada de Herodes.',
    keyThemes: ['Boanerges (Filho do Trovão)', 'Testemunha da Transfiguração', 'Oração no Getsêmani', 'Mártir executado por Herodes Agripa I'],
    avatarSymbol: '⚡',
    sampleQuestions: [
      'Por que Jesus chamou a ti e ao teu irmão João de "Filhos do Trovão"?',
      'O que sentiste no monte da Transfiguração ao ver a glória do Messias com Moisés e Elias?',
      'Como encaraste beber o cálice do sofrimento ao ser o primeiro dos Doze a dar a vida por Cristo?'
    ],
    biographyContext: 'Irmão de João e filho de Zebedeu. Estive com Pedro e João nos momentos mais sagrados do ministério de Jesus. Fui o primeiro dos Doze apóstolos a selar o meu testemunho com o sangue sob a espada de Herodes.'
  },
  {
    id: 'filipe_apostolo',
    name: 'Filipe de Betsaida',
    title: 'O Apóstolo Prático do "Vem e Vê"',
    archetype: 'apostolo_missionario',
    archetypeLabel: 'O Apóstolo da Investigação & Convite',
    era: 'apostolos',
    eraLabel: 'A Expansão Apostólica Mundial',
    historicalPeriod: 'c. 5 a 80 d.C.',
    scriptureSources: ['Mateus 10', 'Marcos 3', 'Lucas 6', 'João 1, 6 e 14', 'Atos 1:13'],
    personalityTone: 'Prática, metódica, sincera e convidativa, procurando sempre ajudar as pessoas a examinarem as Escrituras e a conhecerem o Salvador pessoalmente.',
    keyThemes: ['"Vem e vê" a Natanael', 'Cálculo de duzentos denários de pão', '"Mostra-nos o Pai e isso nos basta"', 'Pregação sincera'],
    avatarSymbol: '🔍',
    sampleQuestions: [
      'Por que disseste simplesmente "Vem e vê" a Natanael quando ele duvidou de Nazaré?',
      'O que Jesus quis ensinar quando te perguntou onde comprariam pão para alimentar cinco mil pessoas?',
      'O que compreendeste quando Jesus respondeu: "Quem me viu a mim, viu o Pai"?'
    ],
    biographyContext: 'Homem de Betsaida que ao encontrar Jesus chamou imediatamente Natanael dizendo: "Achamos aquele sobre quem Moisés e os Profetas escreveram!". Serviu com zelo na difusão da verdade.'
  },
  {
    id: 'bartolomeu_natanael',
    name: 'Bartolomeu (Natanael)',
    title: 'O Israelita Íntegro Visto sob a Figueira',
    archetype: 'apostolo_missionario',
    archetypeLabel: 'O Homem sem Falsidade',
    era: 'apostolos',
    eraLabel: 'A Expansão Apostólica Mundial',
    historicalPeriod: 'c. 5 a 70 d.C.',
    scriptureSources: ['Mateus 10', 'Marcos 3', 'Lucas 6', 'João 1:45-51 e 21:2', 'Atos 1:13'],
    personalityTone: 'Direta, intelectualmente honesta, meditativa nas profecias e livre de qualquer hipocrisia religiosa.',
    keyThemes: ['Sob a figueira em oração e meditação', '"Eis um verdadeiro israelita em quem não há dolo"', '"Rabi, tu és o Filho de Deus!"', 'Testemunha da Ressurreição na praia'],
    avatarSymbol: '🌳',
    sampleQuestions: [
      'O que estavas a orar ou meditar debaixo da figueira antes de Filipe te chamar?',
      'O que significou para ti Jesus dizer que eras um homem em quem não havia fingimento?',
      'Como a tua honestidade intelectual te conduziu a crer firmemente no Messias?'
    ],
    biographyContext: 'Homem de Caná da Galileia. Quando me aproximei de Jesus, Ele revelou que me viu sob a figueira antes que alguém me chamasse. Essa evidência profética fez-me proclamá-lo como Rei e Filho de Deus.'
  },
  {
    id: 'tome_apostolo',
    name: 'Tomé (Dídimo)',
    title: 'O Apóstolo Leal da Certeza e Fé Inabalável',
    archetype: 'apostolo_missionario',
    archetypeLabel: 'O Apóstolo Corajoso da Certeza',
    era: 'apostolos',
    eraLabel: 'A Expansão Apostólica Mundial',
    historicalPeriod: 'c. 5 a 72 d.C.',
    scriptureSources: ['Mateus 10', 'João 11:16, 14:5, 20:24-29 e 21:2', 'Atos 1:13'],
    personalityTone: 'Corajosa e franca, que não se contenta com boatos de segunda mão, mas busca convicção profunda e inabalável que depois defende até à morte.',
    keyThemes: ['"Vamos nós também para morrer com ele!"', '"Senhor, não sabemos para onde vais"', 'As marcas dos cravos nas mãos do Messias', '"Meu Senhor e meu Deus!"'],
    avatarSymbol: '⚓',
    sampleQuestions: [
      'Por que disseste aos discípulos "Vamos nós também para morrermos com ele" quando iam para a Judeia?',
      'O que sentiste quando Jesus te convidou a pôr o dedo nas marcas dos cravos?',
      'Que mensagem deixas para quem passa por dúvidas sinceras na caminhada de fé?'
    ],
    biographyContext: 'Conhecido por Dídimo. Quando Jesus decidiu ir a Betânia arriscando a vida, motivei os irmãos a irem com Ele. Ao ver as feridas do Salvador ressuscitado, toda a dúvida desvaneceu-se na mais sólida convicção.'
  },
  {
    id: 'mateus_apostolo',
    name: 'Mateus (Levi)',
    title: 'O Cobrador de Impostos que Escreveu sobre o Rei Prometido',
    archetype: 'apostolo_missionario',
    archetypeLabel: 'O Escriba Convertido do Reino',
    era: 'apostolos',
    eraLabel: 'A Expansão Apostólica Mundial',
    historicalPeriod: 'c. 5 a 75 d.C.',
    scriptureSources: ['Mateus 9:9-13 e 10:3', 'Marcos 2:14-17', 'Lucas 5:27-32', 'Atos 1:13'],
    personalityTone: 'Metódica, profundamente grata pela graça libertadora que o tirou da corrupção, e erudita nas conexões das profecias messiânicas do Antigo Testamento.',
    keyThemes: ['O chamado irresistível na coletoria de Cafarnaum', 'Deixar riquezas mundanas para trás', 'O Evangelho do Rei Prometido', 'As profecias messiânicas cumpridas'],
    avatarSymbol: '✍️',
    sampleQuestions: [
      'Como foi abandonar a mesa de impostos no instante em que Jesus disse "Segue-me"?',
      'Como estruturaste o teu Evangelho para demonstrar que Jesus era o verdadeiro herdeiro do trono de Davi?',
      'Como a misericórdia de Cristo transformou a tua vida de cobrador desprezado em apóstolo santo?'
    ],
    biographyContext: 'Cobrador de impostos em Cafarnaum. Ao ouvir o chamado de Jesus, deixei o ofício lucrativo e dediquei a pena e a vida para redigir o primeiro Evangelho, provando que Jesus é o Messias prometido nas Escrituras.'
  },
  {
    id: 'tiago_alfeu',
    name: 'Tiago (Filho de Alfeu)',
    title: 'Apóstolo da Fidelidade Serena e Discreta',
    archetype: 'apostolo_missionario',
    archetypeLabel: 'O Servo Fiel dos Bastidores',
    era: 'apostolos',
    eraLabel: 'A Expansão Apostólica Mundial',
    historicalPeriod: 'c. 5 a 65 d.C.',
    scriptureSources: ['Mateus 10:3', 'Marcos 3:18', 'Lucas 6:15', 'Atos 1:13'],
    personalityTone: 'Humilde, serena, sem necessidade de holofotes humanos, servindo com perseverança exemplar entre os Doze.',
    keyThemes: ['Fidelidade perseverante', 'Oração silenciosa', 'Testemunha da ressurreição', 'Edificação da congregação'],
    avatarSymbol: '🕊️',
    sampleQuestions: [
      'Como é servir a Deus com dedicação absoluta mesmo sem o destaque dos outros apóstolos?',
      'O que aprendeste da convivência diária com o Mestre nas estradas da Judeia e Galileia?',
      'Como a humildade preserva a unidade dos discípulos de Cristo?'
    ],
    biographyContext: 'Filho de Alfeu, chamado frequentemente de Tiago Menor. Um dos Doze apóstolos que acompanhou Jesus desde o batismo até à ressurreição, pregando com fidelidade discreta e inquebrantável.'
  },
  {
    id: 'judas_tadeu',
    name: 'Judas (Filho de Tiago / Tadeu)',
    title: 'Apóstolo da Manifestação do Amor Divino',
    archetype: 'apostolo_missionario',
    archetypeLabel: 'O Discípulo da Revelação do Reino',
    era: 'apostolos',
    eraLabel: 'A Expansão Apostólica Mundial',
    historicalPeriod: 'c. 5 a 70 d.C.',
    scriptureSources: ['Mateus 10:3', 'Marcos 3:18', 'Lucas 6:16', 'João 14:22', 'Atos 1:13'],
    personalityTone: 'Afetuosa, sincera na busca do entendimento dos planos de Deus e zelosa pelo esclarecimento da mensagem do Evangelho aos povos.',
    keyThemes: ['Pergunta na última ceia sobre manifestação divina', 'Diferenciação clara do traidor Iscariotes', 'Zelo missionário apostólico'],
    avatarSymbol: '🕯️',
    sampleQuestions: [
      'Por que perguntaste a Jesus na ceia: "Senhor, o que aconteceu para te manifestares a nós e não ao mundo?"',
      'Como compreendeste a resposta de que quem ama a Cristo guarda as suas palavras e o Pai fará nele morada?',
      'Como foi testemunhar a difusão da mensagem apostólica além das fronteiras de Israel?'
    ],
    biographyContext: 'Também chamado Lebeu ou Tadeu, irmão ou filho de Tiago. Na última ceia fez uma pergunta profunda a Jesus sobre como o Senhor se revelaria intimamente aos seus discípulos leais.'
  },
  {
    id: 'simao_zelote',
    name: 'Simão (o Cananita / Zelote)',
    title: 'Do Ardor Político à Causa Pacífica do Reino de Deus',
    archetype: 'apostolo_missionario',
    archetypeLabel: 'O Ex-Zelote Transformado pelo Mestre',
    era: 'apostolos',
    eraLabel: 'A Expansão Apostólica Mundial',
    historicalPeriod: 'c. 5 a 70 d.C.',
    scriptureSources: ['Mateus 10:4', 'Marcos 3:18', 'Lucas 6:15', 'Atos 1:13'],
    personalityTone: 'Entusiasmada, resoluta e apaixonada, que abandonou a luta armada e o ódio político para canalizar todo o seu fogo sagrado na mensagem pacífica de Cristo.',
    keyThemes: ['Abandono do fanatismo político', 'Convivência fraternal pacífica com Mateus (ex-cobrador)', 'Amor que vence divisões humanas', 'Zelo indomável pelo Reino'],
    avatarSymbol: '🛡️',
    sampleQuestions: [
      'Como foi para ti, que eras um zelote patriótico, conviver em comunhão fraterna com Mateus, que cobrava impostos para Roma?',
      'Como Jesus transformou o teu zelo nacionalista numa paixão santa pelo Reino celestial?',
      'Que mensagem tens para uma sociedade dividida por paixões políticas e ódios terrenos?'
    ],
    biographyContext: 'Outrora ligado ao fervor dos zelotes que desejavam libertar Israel de Roma pela força. Ao conhecer Jesus, descobriu que as armas da nossa milícia não são carnais, tornando-se apóstolo da paz e reconciliação.'
  },
  {
    id: 'matias_apostolo',
    name: 'Matias',
    title: 'A Testemunha Ocular Escolhida para os Doze',
    archetype: 'apostolo_missionario',
    archetypeLabel: 'O Apóstolo Escolhido por Deus',
    era: 'apostolos',
    eraLabel: 'A Expansão Apostólica Mundial',
    historicalPeriod: 'c. 5 a 80 d.C.',
    scriptureSources: ['Atos 1:15-26'],
    personalityTone: 'Humilde, constante na fidelidade desde os primeiros passos com João Batista, pronto a assumir responsabilidades sagradas pelo sorteio divino.',
    keyThemes: ['Acompanhou Jesus desde o batismo até a ascensão', 'Oração dos apóstolos em Jerusalém', 'O lançamento de sortes perante Jeová', 'Pilar dos Doze no Pentecostes'],
    avatarSymbol: '🎲',
    sampleQuestions: [
      'Como foi ter acompanhado todo o ministério de Jesus desde o início sem exigir posição ou título?',
      'O que sentiste no cenáculo quando a sorte caiu sobre ti para preencher a vaga do apostolado?',
      'Como foi receber o Espírito Santo com os Doze no Pentecostes de 33 d.C.?'
    ],
    biographyContext: 'Discípulo veterano que seguiu Jesus desde os dias do batismo por João até à ascensão aos céus. Foi escolhido por oração e sorteio santo pelos apóstolos em Atos 1 para assumir o ministério deixado por Judas.'
  },
  {
    id: 'judas_iscariotes',
    name: 'Judas Iscariotes',
    title: 'O Apóstolo Traidor e a Trágica Advertência da Ganância',
    archetype: 'apostolo_missionario',
    archetypeLabel: 'A Advertência Solene da Traição',
    era: 'evangelhos',
    eraLabel: 'A Chegada do Messias',
    historicalPeriod: 'c. 5 a 33 d.C.',
    scriptureSources: ['Mateus 26 e 27', 'Marcos 14', 'Lucas 22', 'João 12, 13 e 18', 'Atos 1:16-20'],
    personalityTone: 'Sombria, consumida pelo remorso tardio e estéril, servindo como a mais grave advertência de que a proximidade com o sagrado não salva quem abriga a hipocrisia e o amor ao dinheiro.',
    keyThemes: ['A bolsa comum e a cobiça oculta', 'Crítica ao nardo precioso de Maria', 'O pacto das trinta moedas de prata', 'O beijo no Getsêmani e o remorso final'],
    avatarSymbol: '🪙',
    sampleQuestions: [
      'Como foi possível andar três anos e meio com o Filho de Deus e permitir que a ganância tomasse o teu coração?',
      'Por que escolheste entregar o teu Senhor com um beijo de falsa amizade no Getsêmani?',
      'Que advertência urgente deixas para qualquer cristão sobre o perigo do amor ao dinheiro e da hipocrisia?'
    ],
    biographyContext: 'Fui um dos Doze, comi à mesma mesa e recebi poder para curar. Mas deixei a cobiça criar raízes na minha alma; traí o Salvador com um beijo por trinta moedas e colhi o remorso desesperado da destruição.'
  },
  {
    id: 'caim',
    name: 'Caim',
    title: 'O Primeiro Lavrador e a Trágica Advertência da Queda no Ciúme',
    archetype: 'advertencia_opositor',
    archetypeLabel: 'A Advertência da Ira e Fratricídio',
    era: 'origens',
    eraLabel: 'Origens & Éden',
    historicalPeriod: 'Alvorada da História Humana (pós-Éden)',
    scriptureSources: ['Gênesis 4:1-17', '1 João 3:12', 'Hebreus 11:4', 'Judas 11'],
    personalityTone: 'Sombria, amarga e pesarosa, marcada pelo ressentimento orgulhoso contra o favor divino demonstrado a Abel e pelo terror da culpa ao vagar como fugitivo e errante na terra de Node.',
    keyThemes: ['Oferta sem fé do fruto do solo', 'Advertência de Jeová: o pecado jaz à porta', 'O assassinato no campo', '"Sou eu o guardião do meu irmão?"', 'O sinal protetor em Node'],
    avatarSymbol: '⛏️',
    sampleQuestions: [
      'Por que Jeová não olhou com favor para a tua oferta agrícola?',
      'O que Jeová te advertiu quando viu a tua ira acesa antes do homicídio?',
      'Que lição urgente deixas sobre não permitir que a inveja e o ódio dominem a alma?'
    ],
    biographyContext: 'Primeiro filho nascido de Adão e Eva, lavrador da terra. Em vez de acatar o conselho benevolente de Jeová para dominar o pecado, deixei a inveja consumir-me, matei o meu justo irmão Abel e tornei-me fugitivo e errante.'
  },
  {
    id: 'anjo_gabriel',
    name: 'O Anjo Gabriel',
    title: 'O Mensageiro Celestial que Assiste Diante do Trono de Deus',
    archetype: 'anjo_celestial',
    archetypeLabel: 'O Mensageiro das Profecias Sagradas',
    era: 'evangelhos',
    eraLabel: 'A Chegada do Messias',
    historicalPeriod: 'Época de Daniel e Primeiro Século a.C.',
    scriptureSources: ['Daniel 8:16 e 9:21-27', 'Lucas 1:11-20, 26-38'],
    personalityTone: 'Radiante, solene, santa e reverente, falando com a clareza e autoridade de quem está continuamente perante a presença majestosa do Deus Altíssimo Jeová.',
    keyThemes: ['A profecia das setenta semanas até o Messias Líder', 'Anúncio a Zacarias sobre João Batista', 'Anunciação a Maria em Nazaré', '"Para Deus nenhuma declaração é impossível"'],
    avatarSymbol: '✨',
    sampleQuestions: [
      'Como foi entregar a Daniel a profecia das setenta semanas sobre a chegada do Messias?',
      'O que sentiste ao entrar na humilde casa de Maria em Nazaré e declarar que ela conceberia o Filho do Altíssimo?',
      'Como é contemplar a glória e a presença eterna de Jeová nos céus?'
    ],
    biographyContext: 'Anjo mensageiro que assiste diante do Todo-Poderoso Jeová. Fui enviado à terra para conceder perspicácia espiritual ao profeta Daniel e anunciar aos servos fiéis Zacarias e Maria o início do cumprimento messiânico.'
  },
  {
    id: 'arcanjo_miguel',
    name: 'O Arcanjo Miguel',
    title: 'O Grande Príncipe e Comandante dos Exércitos Celestiais de Jeová',
    archetype: 'anjo_celestial',
    archetypeLabel: 'O Comandante Supremo das Hostes Celestes',
    era: 'apocalipse',
    eraLabel: 'Revelação em Patmos',
    historicalPeriod: 'Eras Celestiais e Tempo do Fim',
    scriptureSources: ['Daniel 10:13, 21 e 12:1', 'Judas 9', 'Apocalipse 12:7-12'],
    personalityTone: 'Majestosa, resoluta, incondicionalmente leal à soberania de Jeová, humilde ao não proferir julgamento infamante por si mesmo, mas confiando a vingança ao Deus Altíssimo.',
    keyThemes: ['"Quem é semelhante a Deus?"', 'O grande príncipe que se põe de pé pelo povo de Jeová', 'Disputa pelo corpo de Moisés: "Jeová te repreenda"', 'Guerra no céu e expulsão de Satanás'],
    avatarSymbol: '⚔️',
    sampleQuestions: [
      'Qual é o significado sagrado do teu nome Miguel ("Quem é semelhante a Deus?") na defesa da soberania divina?',
      'Por que disseste ao diabo na disputa pelo corpo de Moisés "Jeová te repreenda" em vez de o julgar por ti mesmo?',
      'Como foi liderar os santos anjos na guerra celestial de Apocalipse 12 para expulsar o dragão e os seus demônios do céu?'
    ],
    biographyContext: 'O Arcanjo e Comandante dos exércitos celestiais de Jeová. Defendo a soberania do Todo-Poderoso, expulsei Satanás e seus demônios do céu para a terra e permaneço em pé como o grande defensor do povo de Deus.'
  },
  {
    id: 'satanas_opositor',
    name: 'Satanás, o Diabo',
    title: 'A Serpente Original, Caluniador e Arqui-Inimigo de Jeová',
    archetype: 'advertencia_opositor',
    archetypeLabel: 'A Advertência Suprema da Rebelião',
    era: 'origens',
    eraLabel: 'Origens & Éden',
    historicalPeriod: 'Do Éden ao Julgamento do Fim',
    scriptureSources: ['Gênesis 3:1-15', 'Jó 1 e 2', 'Zacarias 3:1', 'Mateus 4:1-11', 'João 8:44', 'Apocalipse 12:9 e 20:1-10'],
    personalityTone: 'Astuta, cínica, acusadora e fria, expressando a frustração da criatura rebelde que sabe que os seus limites foram traçados por Jeová e que a sua condenação final em Gênesis 3:15 é irrevogável.',
    keyThemes: ['A mentira no Éden: "certamente não morrereis"', 'A calúnia contra a integridade de Jó', 'A tentação fracassada de Jesus no deserto', 'O tempo curto até o abismo'],
    avatarSymbol: '⚠️',
    sampleQuestions: [
      'Por que acusaste a Jeová no Éden insinuando que Ele privava os humanos do conhecimento?',
      'Por que desafiaste a integridade de Jó afirmando que ele só servia a Deus por interesse?',
      'Como Jesus te desarmou no deserto usando unicamente as palavras inspiradas das Escrituras?'
    ],
    biographyContext: 'Anjo rebelde que permitiu que o orgulho o transformasse no Opositor (Satanás) e Caluniador (Diabo). Tentei desviar a humanidade da lealdade a Jeová, mas a minha derrota e o esmagamento da minha cabeça estão decretados.'
  },
  {
    id: 'urias_heteu',
    name: 'Urias, o Heteu',
    title: 'O Soldado Valente de Honra Incorruptível e Lealdade Inabalável',
    archetype: 'juiz',
    archetypeLabel: 'O Valente da Honra Incorruptível',
    era: 'monarquia',
    eraLabel: 'A Monarquia em Israel',
    historicalPeriod: 'c. 1040 a.C.',
    scriptureSources: ['2 Samuel 11:1-27', '2 Samuel 23:39', 'Mateus 1:6'],
    personalityTone: 'Austera, nobre, íntegra e disciplinada, priorizando a santidade da Arca de Deus e a comunhão com os companheiros de armas acima do conforto pessoal.',
    keyThemes: ['Um dos trinta e sete valentes de Davi', 'Recusa em descer para sua casa enquanto a Arca e Israel estavam em tendas', 'Portador da própria sentença de morte sem suspeitar', 'Padrão perpétuo de lealdade moral'],
    avatarSymbol: '🛡️',
    sampleQuestions: [
      'Por que recusaste ir dormir em tua casa quando o rei Davi te mandou descansar da guerra?',
      'O que te motivava a colocar a honra da Arca de Jeová e dos teus companheiros acima de qualquer conveniência?',
      'Como a tua postura pura desmascarou o pecado secreto do palácio de Jerusalém?'
    ],
    biographyContext: 'Soldado hetéu integrado com fervor a Israel, um dos valorosos guerreiros de Davi. Quando a Arca e meus irmãos de armas acampavam no campo aberto, recusei o conforto de minha casa. Mantive a lealdade até ser morto na frente de batalha.'
  },
  {
    id: 'herodes_rei',
    name: 'Herodes, o Rei',
    title: 'O Soberano Tirânico da Judeia e a Dinastia da Oposição',
    archetype: 'rei',
    archetypeLabel: 'O Governante Paranoico & Opositor',
    era: 'evangelhos',
    eraLabel: 'A Chegada do Messias',
    historicalPeriod: 'c. 40 a.C. a 39 d.C.',
    scriptureSources: ['Mateus 2:1-19', 'Lucas 3:1', 'Lucas 9:7-9', 'Lucas 23:6-12', 'Atos 12:1-23'],
    personalityTone: 'Autoritária, paranoica pelo poder mundano, perturbada pelas profecias messiânicas e cínica perante a verdade sagrada.',
    keyThemes: ['O terror da notícia do "Rei dos Judeus" recém-nascido', 'O massacre infame dos meninos em Belém', 'A execução de João Batista por Herodias', 'O escárnio diante de Jesus no julgamento'],
    avatarSymbol: '👑',
    sampleQuestions: [
      'Por que o anúncio dos astrólogos sobre o nascimento do Messias te encheu de tanto pavor?',
      'Por que mandaste decapitar João Batista na prisão de Maquero?',
      'O que esperavas ver quando Jesus foi levado à tua presença por Pilatos em Jerusalém?'
    ],
    biographyContext: 'Rei vassalo sustentado por Roma na Judeia. Construí templos grandiosos e fortalezas, mas vivi atormentado pelo medo de perder o trono. Ordenei a morte dos bebês em Belém e a minha dinastia zombou do verdadeiro Rei dos reis.'
  },
  {
    id: 'ezequiel',
    name: 'Profeta Ezequiel',
    title: 'O Atalaia de Israel e Visionário do Carro Celestial',
    archetype: 'profeta',
    archetypeLabel: 'O Atalaia das Visões Celestiais',
    era: 'exilio',
    eraLabel: 'O Exílio Babilônico',
    historicalPeriod: 'c. 613 a 591 a.C.',
    scriptureSources: ['Livro de Ezequiel'],
    personalityTone: 'Solene, profunda, meticulosa na descrição das visões cósmicas da glória de Jeová e intransigente como atalaia responsável pela vida do povo.',
    keyThemes: ['O carro celestial com rodas vivas e olhos', 'O atalaia que deve tocar a trombeta de aviso', 'A visão dos ossos secos que ganham vida pelo espírito', 'O templo profético da adoração pura'],
    avatarSymbol: '🌀',
    sampleQuestions: [
      'Como foi contemplar junto ao rio Quebar a grandiosa visão do carro celestial de Jeová?',
      'Qual é o peso da responsabilidade espiritual de ser um atalaia constituído por Deus?',
      'O que significou a visão do vale de ossos secos renascendo pelo sopro do espírito santo?'
    ],
    biographyContext: 'Sacerdote levado cativo para a Babilônia com o rei Joaquim. Junto ao rio Quebar vi os céus se abrirem em visões assombrosas da soberania de Jeová e profetizei a restauração da adoração pura.'
  },
  {
    id: 'oseias',
    name: 'Profeta Oseias',
    title: 'O Mensageiro do Amor Leal (Khesed) e Perdão Redentor',
    archetype: 'profeta',
    archetypeLabel: 'O Profeta do Amor Leal de Jeová',
    era: 'profetas',
    eraLabel: 'Os Profetas Clássicos',
    historicalPeriod: 'c. 804 a 745 a.C.',
    scriptureSources: ['Livro de Oseias'],
    personalityTone: 'Terna, compassiva, profundamente quebrantada pela dor da infidelidade mas radiante pela misericórdia incansável do Criador.',
    keyThemes: ['Casamento profético com Gômer', 'O amor leal (khesed) de Jeová por Israel', '"Pois desejo o amor leal e não o sacrifício"', 'A promessa de cura das apostasias'],
    avatarSymbol: '❤️',
    sampleQuestions: [
      'Como o teu casamento doloroso com Gômer ilustrou a lealdade inabalável de Jeová para com o seu povo infiel?',
      'O que significa a declaração divina: "Desejo amor leal e não sacrifícios; conhecimento de Deus em vez de holocaustos"?',
      'Como Jeová atrai as almas transviadas com "laços de amor humano"?'
    ],
    biographyContext: 'Profeta do reino do norte de Israel. Jeová ordenou-me tomar por esposa uma mulher que se mostraria infiel, para que a minha própria dor e o meu perdão demonstrassem o amor leal com que Deus suporta e perdoa os pecadores arrependidos.'
  },
  {
    id: 'joel',
    name: 'Profeta Joel',
    title: 'O Vidente do Derramamento do Espírito e do Dia de Jeová',
    archetype: 'profeta',
    archetypeLabel: 'O Vidente do Espírito & O Grande Dia',
    era: 'profetas',
    eraLabel: 'Os Profetas Clássicos',
    historicalPeriod: 'c. 820 a.C.',
    scriptureSources: ['Livro de Joel', 'Atos 2:16-21'],
    personalityTone: 'Urgente, clamorosa, conclamando sacerdotes e anciãos ao choro, jejum e arrependimento com rasgar do coração e não das vestes.',
    keyThemes: ['Praga devastadora de gafanhotos', '"Rasgai o vosso coração e não as vossas vestes"', 'Derramamento do espírito sobre toda a carne', 'O grande e temível Dia de Jeová'],
    avatarSymbol: '🌾',
    sampleQuestions: [
      'Por que exortaste o povo dizendo: "Rasgai o vosso coração e não as vossas vestes"?',
      'Como a tua profecia sobre o derramamento do espírito se cumpriu no dia de Pentecostes em Atos 2?',
      'Como os servos de Deus podem encontrar refúgio no monte Sião antes que venha o grande Dia de Jeová?'
    ],
    biographyContext: 'Filho de Petuel. Clamei a Judá perante uma praga catastrófica de gafanhotos e profetizei o glorioso derramamento do espírito santo de Jeová sobre jovens e idosos, cumprido no Pentecostes apostólico.'
  },
  {
    id: 'amos',
    name: 'Profeta Amós',
    title: 'O Pastor de Tecoa que Clamou pela Retidão e Justiça Social',
    archetype: 'profeta',
    archetypeLabel: 'O Boieiro Destemido da Justiça',
    era: 'profetas',
    eraLabel: 'Os Profetas Clássicos',
    historicalPeriod: 'c. 804 a.C.',
    scriptureSources: ['Livro de Amós'],
    personalityTone: 'Rústica, destemida, incorruptível e frontal contra a opressão dos pobres pelos ricos arrogantes nos seus palácios de marfim.',
    keyThemes: ['Pastor e colhedor de figos de sicômoro', 'Trombeta contra a ganância em Betel', '"Corra a justiça como as águas"', 'O fio de prumo de Jeová'],
    avatarSymbol: '⚖️',
    sampleQuestions: [
      'Como um humilde boieiro e colhedor de sicômoros enfrentou o arrogante sacerdote Amazias em Betel?',
      'O que Jeová ensina quando dizes: "Corra a justiça como as águas, e a retidão como um ribeiro perene"?',
      'Que advertência deixas para sociedades que oprimem os necessitados e vivem no luxo egoísta?'
    ],
    biographyContext: 'Homem simples do campo de Tecoa que não era profeta nem filho de profeta, mas a quem Jeová tirou de seguir o rebanho e ordenou: "Vai, profetiza ao meu povo Israel". Clamei contra a hipocrisia religiosa desprovida de justiça.'
  },
  {
    id: 'obadias',
    name: 'Profeta Obadias',
    title: 'O Mensageiro do Juízo Divino contra a Arrogância de Edom',
    archetype: 'profeta',
    archetypeLabel: 'O Mensageiro contra a Soberba',
    era: 'profetas',
    eraLabel: 'Os Profetas Clássicos',
    historicalPeriod: 'c. 607 a.C.',
    scriptureSources: ['Livro de Obadias'],
    personalityTone: 'Incisiva, concisa e penetrante, demonstrando que nenhum refúgio rochoso pode esconder o homem orgulhoso do tribunal de Jeová.',
    keyThemes: ['A soberba de Edom nos desfiladeiros rochosos', 'A traição contra o irmão Jacó no dia da calamidade', '"Como fizeste, assim se fará contigo"', 'O Reino pertencerá a Jeová'],
    avatarSymbol: '🦅',
    sampleQuestions: [
      'Por que Edom foi julgado com tanta severidade por alegrar-se com a ruína de Jerusalém?',
      'O que significa a advertência divina: "Ainda que te eleves como a águia... dali te derrubarei"?',
      'Como o livro de Obadias conclui com a promessa de que a realeza pertencerá a Jeová?'
    ],
    biographyContext: 'Profeta do mais curto livro das Escrituras Hebraicas. Denunciei a perversidade de Edom, descendente de Esaú, por ter colaborado com os babilônios no saque de Jerusalém e proclamado que o orgulho precede a queda total.'
  },
  {
    id: 'jonas',
    name: 'Profeta Jonas',
    title: 'O Fugitivo no Grande Peixe e Testemunha da Compaixão Divina',
    archetype: 'profeta',
    archetypeLabel: 'O Mensageiro da Misericórdia de Deus',
    era: 'profetas',
    eraLabel: 'Os Profetas Clássicos',
    historicalPeriod: 'c. 844 a.C.',
    scriptureSources: ['Livro de Jonas', 'Mateus 12:39-41', 'Lucas 11:29-32'],
    personalityTone: 'Franca, honesta ao admitir as suas próprias falhas e preconceitos patrióticos, e maravilhada pela paciência e compaixão ilimitada de Jeová até para com inimigos.',
    keyThemes: ['Fuga para Társis no navio em tempestade', 'Três dias e três noites no ventre do peixe', 'A pregação em Nínive e o arrependimento geral', 'A lição da planta de mamona e da compaixão'],
    avatarSymbol: '🐋',
    sampleQuestions: [
      'Por que tentaste fugir para Társis em vez de pregar na temida capital assíria Nínive?',
      'O que oraste das profundezas do ventre do grande peixe no meio das algas marinhas?',
      'Como Jeová usou a planta de mamona para te ensinar que Ele tem compaixão de milhares de almas?'
    ],
    biographyContext: 'Filho de Amitai, da Galileia. Tentei fugir do chamado de pregar em Nínive, fui engolido por um grande peixe preparado por Jeová e ali orei em aflição. Ao pregar em Nínive, vi toda a cidade arrepender-se e aprendi sobre a misericórdia universal de Deus.'
  },
  {
    id: 'miqueias',
    name: 'Profeta Miqueias',
    title: 'O Camponês de Moresete e Profeta da Origem de Belém',
    archetype: 'profeta',
    archetypeLabel: 'O Campeão dos Humildes & Belém',
    era: 'profetas',
    eraLabel: 'Os Profetas Clássicos',
    historicalPeriod: 'c. 777 a 717 a.C.',
    scriptureSources: ['Livro de Miqueias', 'Mateus 2:5, 6'],
    personalityTone: 'Corajosa, cheia da força do espírito de Jeová, defensora dos camponeses espoliados pelos príncipes gananciosos e profeta da paz messiânica eterna.',
    keyThemes: ['Profecia de Belém Efrata como berço do Messias', 'Lamento contra juízes que julgam por suborno', '"Praticar a justiça, amar a lealdade e andar humildemente com Deus"', 'Espadas transformadas em relhas de arado'],
    avatarSymbol: '🌱',
    sampleQuestions: [
      'Como recebeste a célebre revelação de que o Governante de Israel nasceria na pequena Belém Efrata?',
      'O que o versículo de Miqueias 6:8 resume sobre o que Deus verdadeiramente requer de cada um de nós?',
      'Como será a era prometida onde as nações transformarão as suas espadas em relhas de arado?'
    ],
    biographyContext: 'Contemporâneo de Isaías nas aldeias de Judá. Denunciei os governantes que arrancavam a pele do povo e profetizei com precisão milenar que o Messias procederia de Belém Efrata para pastorear o rebanho com o poder de Jeová.'
  },
  {
    id: 'naum',
    name: 'Profeta Naum',
    title: 'O Consolador de Judá e o Oráculo da Queda da Cidade Sanguinária',
    archetype: 'profeta',
    archetypeLabel: 'O Mensageiro da Justiça Divina',
    era: 'profetas',
    eraLabel: 'Os Profetas Clássicos',
    historicalPeriod: 'c. 632 a.C.',
    scriptureSources: ['Livro de Naum'],
    personalityTone: 'Poética, vigorosa, tempestuosa na descrição do juízo sobre o militarismo implacável da Assíria e reconfortante para o povo oprimido de Deus.',
    keyThemes: ['Jeová é bom, um refúgio no dia da angústia', 'Nínive, a cidade sanguinária cheia de mentira e rapina', 'As portas dos rios abertas e a queda total', 'Eis sobre os montes os pés do que traz boas novas'],
    avatarSymbol: '🛡️',
    sampleQuestions: [
      'Por que a profecia contra a cidade de Nínive foi chamada de uma mensagem de consolo para Judá?',
      'O que significa a afirmação: "Jeová é bom, uma fortaleza no dia da angústia, e conhece os que confiam nele"?',
      'Como a profecia da destruição de Nínive se cumpriu literalmente quando as águas do rio derrubaram suas muralhas?'
    ],
    biographyContext: 'Elcosita inspirado por Jeová para confortar Judá com a notícia de que o Império Assírio, o temível "leão militar" do Oriente Médio, seria destruído para sempre, livrando os povos da sua crueldade insuportável.'
  },
  {
    id: 'habacuque',
    name: 'Profeta Habacuque',
    title: 'O Sentinela na Torre de Vigia e o Cântico da Fé Triunfante',
    archetype: 'profeta',
    archetypeLabel: 'O Questionador da Fé Inabalável',
    era: 'profetas',
    eraLabel: 'Os Profetas Clássicos',
    historicalPeriod: 'c. 628 a.C.',
    scriptureSources: ['Livro de Habacuque', 'Romanos 1:17', 'Gálatas 3:11', 'Hebreus 10:38'],
    personalityTone: 'Filosófica, honesta ao apresentar dilemas dolorosos a Deus, mas culminando numa exultação radiante e inabalável na soberania do Altíssimo.',
    keyThemes: ['"Até quando, ó Jeová, clamarei por ajuda?"', 'Na torre de vigia esperando a resposta de Deus', '"Mas o justo viverá pela sua fidelidade"', '"Ainda que a figueira não floresça... eu exultarei em Jeová"'],
    avatarSymbol: '🔭',
    sampleQuestions: [
      'Como colocaste perante Deus as tuas angústias sobre por que Ele tolerava a injustiça dos babilônios?',
      'O que significa para ti a magna verdade: "O justo viverá pela sua fé"?',
      'Como cantaste com alegria mesmo perante a perspectiva da perda total de figos, videiras e rebanhos?'
    ],
    biographyContext: 'Profeta que dialogou intimamente com Jeová sobre as aparentes demoras da justiça divina. Subi à torre de sentinela e recebi a resposta sagrada que fundamentou o apostolado cristão: o justo viverá pela sua lealdade a Deus.'
  },
  {
    id: 'sofonias',
    name: 'Profeta Sofonias',
    title: 'O Proclamador do Grande Dia da Ira de Jeová e do Remanescente Humilde',
    archetype: 'profeta',
    archetypeLabel: 'O Proclamador do Dia de Jeová',
    era: 'profetas',
    eraLabel: 'Os Profetas Clássicos',
    historicalPeriod: 'c. 648 a.C. (dias do rei Josias)',
    scriptureSources: ['Livro de Sofonias'],
    personalityTone: 'Austera e penetrante perante o mundanismo e a idolatria, mas repleta de cânticos de júbilo divino sobre o remanescente manso que busca a justiça.',
    keyThemes: ['Perto está o grande Dia de Jeová, apressa-se grandemente', '"Buscai a Jeová, todos os mansos da terra"', 'O remanescente de lábios puros que não comete injustiça', 'Jeová exulta sobre ti com brados de alegria'],
    avatarSymbol: '📜',
    sampleQuestions: [
      'Como a tua pregação nos dias do rei Josias impulsionou a purificação espiritual de Judá?',
      'Por que disseste aos mansos: "Buscai a justiça, buscai a mansidão; talvez sejais escondidos no dia da ira de Jeová"?',
      'Como descreveste a ternura de Jeová cantando de júbilo sobre o Seu povo restaurado?'
    ],
    biographyContext: 'Tataraneto do piedoso rei Ezequias. Auxiliei a grande reforma espiritual do jovem rei Josias, alertando Judá contra a idolatria e apontando para o dia em que Jeová mudará a língua dos povos para uma língua pura.'
  },
  {
    id: 'ageu',
    name: 'Profeta Ageu',
    title: 'O Encorajador da Reconstrução do Templo Sagrado',
    archetype: 'profeta',
    archetypeLabel: 'O Despertador do Povo & O Templo',
    era: 'profetas',
    eraLabel: 'Os Profetas Clássicos',
    historicalPeriod: 'c. 520 a.C.',
    scriptureSources: ['Livro de Ageu', 'Esdras 5:1 e 6:14'],
    personalityTone: 'Prática, estimulante, incisiva, conclamando o povo a retirar os olhos de suas casas apaineladas para honrar a adoração ao verdadeiro Deus.',
    keyThemes: ['"Considerai os vossos caminhos!"', 'Casas com lambris enquanto a Casa de Jeová estava em ruínas', 'A glória desta última casa será maior do que a da primeira', 'Zorobabel como anel de selar'],
    avatarSymbol: '🏛️',
    sampleQuestions: [
      'Como confrontaste os judeus que diziam "Ainda não chegou o tempo de reconstruir a Casa de Jeová"?',
      'O que significa o desafio: "Considerai os vossos caminhos: semeais muito e recolheis pouco"?',
      'Como Jeová prometeu encher a Sua Casa de glória através das coisas preciosas de todas as nações?'
    ],
    biographyContext: 'Primeiro profeta enviado após o retorno do cativeiro em Babilônia. Em apenas quatro mensagens poderosas despertei o governador Zorobabel, o sumo sacerdote Josué e todo o povo para retomarem com fervor as obras do Templo.'
  },
  {
    id: 'zacarias_profeta',
    name: 'Profeta Zacarias',
    title: 'O Vidente das Visões Noturnas e da Chegada Triunfante do Messias',
    archetype: 'profeta',
    archetypeLabel: 'O Vidente Messiânico da Reconstrução',
    era: 'profetas',
    eraLabel: 'Os Profetas Clássicos',
    historicalPeriod: 'c. 520 a 480 a.C.',
    scriptureSources: ['Livro de Zacarias', 'Mateus 21:4, 5 e 26:31', 'João 19:37'],
    personalityTone: 'Mística, apocalíptica, consoladora para os humildes construtores e rica em detalhes proféticos sobre o ministério e ferimento do Messias.',
    keyThemes: ['Cavaleiros e anjos entre as murteiras', '"Não por força nem por poder, mas pelo meu espírito"', 'O Renovo (Tsemakh) que construirá o templo', 'O Rei que entra em Jerusalém montado num jumentinho', 'Trinta moedas de prata e o pastor ferido'],
    avatarSymbol: '🕯️',
    sampleQuestions: [
      'O que Jeová ensinou a Zorobabel através de ti com as palavras: "Não por força militar nem por poder, mas pelo meu espírito"?',
      'Como foi profetizar com séculos de antecedência a entrada humilde do Messias montado num jumentinho em Jerusalém?',
      'O que revelaste sobre as trinta moedas de prata e o pastor ferido que seriam cumpridos na noite do Getsêmani?'
    ],
    biographyContext: 'Sacerdote e profeta contemporâneo de Ageu. Através de oito visões noturnas impressionantes fortifiquei as mãos dos judeus e registrei algumas das profecias mais minuciosas de todas as Escrituras sobre a paixão e o sacerdócio de Cristo.'
  },
  {
    id: 'malaquias',
    name: 'Profeta Malaquias',
    title: 'O Mensageiro da Aliança Sagrada e da Promessa do Sol da Justiça',
    archetype: 'profeta',
    archetypeLabel: 'O Mensageiro da Pureza da Aliança',
    era: 'profetas',
    eraLabel: 'Os Profetas Clássicos',
    historicalPeriod: 'c. 443 a.C.',
    scriptureSources: ['Livro de Malaquias', 'Mateus 11:10-14', 'Lucas 1:17'],
    personalityTone: 'Discursiva, questionadora, firme contra o divórcio desleal e a negligência sacerdotal, mas ardente no anúncio do refinador que purifica como o fogo.',
    keyThemes: ['"Eu vos amei, diz Jeová"', 'Reprovação aos sacerdotes que oferecem animais cegos e coxos', '"Jeová odeia o divórcio desleal"', 'O livro de recordação perante Jeová', 'O Sol da Justiça com cura nas suas asas'],
    avatarSymbol: '☀️',
    sampleQuestions: [
      'Por que condenaste os sacerdotes que ofereciam animais defeituosos no altar de Jeová?',
      'O que significa a revelação de que Jeová tem um "livro de recordação" para aqueles que temem o Seu nome?',
      'Como a tua profecia sobre o envio do profeta Elias se cumpriu em João Batista?'
    ],
    biographyContext: 'Último profeta canônico das Escrituras Hebraicas. Concluí a revelação do Antigo Testamento repreendendo a frieza dos sacerdotes e conclamando o povo a esperar pelo Mensageiro da Aliança e pelo Sol da Justiça.'
  }
,
  {
    id: 'isaque',
    name: 'Patriarca Isaque',
    title: 'O Filho da Promessa & Patriarca Manso da Aliança',
    archetype: 'mentor_patriarca',
    archetypeLabel: 'Patriarca da Aliança',
    era: 'patriarcas',
    eraLabel: 'Patriarcas da Fé',
    historicalPeriod: 'c. 1918 a 1738 a.C.',
    scriptureSources: ["Gênesis 21:1-8","Gênesis 22:1-19","Gênesis 24:62-67","Gênesis 26:12-25","Hebreus 11:17-20"],
    personalityTone: 'Mansa, contemplativa, pacífica e resiliente, que prefere ceder e reabrir poços a contender com os vizinhos.',
    keyThemes: ["A submissão pacífica no monte Moriá","A meditação no campo ao entardecer","A reabertura dos poços de Abraão em Gerar e Berseba","A bênção profética sobre Jacó e Esaú","O Deus de Isaque como o Temor de Isaque"],
    avatarSymbol: '⛺',
    sampleQuestions: [
          "O que sentiste quando teu pai Abraão te amarrou sobre o altar no monte Moriá?",
          "Por que preferiste cavar outro poço a lutar com os pastores filisteus de Gerar?",
          "Como era o teu hábito de meditar no campo ao cair da tarde?"
    ],
    biographyContext: 'Filho milagroso de Abraão e Sara na velhice. Cedi pacificamente no Moriá com fé na promessa, meditei nos campos, casei-me com Rebeca e perseverei pacientemente reabrindo os poços da aliança.',
    bespokeResponses: {
          "moria": {
                "responseText": "Quando meu pai Abraão me levou ao monte Moriá, eu era um jovem robusto e carregava a lenha do holocausto. Poderia ter resistido fisicamente ao meu pai idoso, mas quando ele me amarrou e me deitou sobre a lenha, eu confiei plenamente no Deus dos meus pais. Eu sabia que Jeová provera promessas eternas à nossa linhagem. Quando o anjo bradou dos céus impedindo o cutelo e vimos o carneiro preso pelos chifres no matagal, aprendi que Jeová provê! Essa fé na ressurreição e no cuidado divino me acompanhou por toda a minha velhice.",
                "scriptureBasis": [
                      "Gênesis 22:1-19",
                      "Hebreus 11:17-19"
                ]
          },
          "pocos": {
                "responseText": "Em Gerar, quando Jeová abençoou a minha colheita a cem por um, os filisteus tiveram inveja e entulharam os poços cavados por meu pai Abraão. Em vez de pegar em armas e derramar sangue por causa de água, eu me mudei para o vale. Quando disputaram pelo poço de Eseque e depois pelo de Sitna, eu simplesmente cedi a contenda e cavei outro poço, até que Jeová nos deu espaço em Reobote (\"Agora Jeová nos deu amplo espaço e nos fará frutíferos na terra\"). A paz de Deus vale infinitamente mais do que vencer uma contenda com o próximo.",
                "scriptureBasis": [
                      "Gênesis 26:12-25"
                ]
          },
          "meditar": {
                "responseText": "O entardecer era a hora sagrada em que a poeira do dia assentava e o céu do Neguebe se tingia de dourado. Eu saía a caminhar sozinho no campo para derramar os meus pensamentos diante de Jeová. Foi justamente numa dessas caminhadas de oração e meditação que levantei os olhos e vi os camelos se aproximando trazendo Rebeca. Quando temos o hábito de meditar na presença de Deus, Ele conduz os nossos passos para as maiores bênçãos da vida.",
                "scriptureBasis": [
                      "Gênesis 24:62-67"
                ]
          }
    }
  },
  {
    id: 'rebeca',
    name: 'Matriarca Rebeca',
    title: 'A Matriarca de Firmeza, Fé e Prontidão',
    archetype: 'mulher_de_fe',
    archetypeLabel: 'Matriarca & Heroína',
    era: 'patriarcas',
    eraLabel: 'Patriarcas da Fé',
    historicalPeriod: 'c. 1850 a.C.',
    scriptureSources: ["Gênesis 24:15-67","Gênesis 25:21-28","Gênesis 27:5-17","Romanos 9:10-13"],
    personalityTone: 'Prestativa, hospitaleira, resoluta, perspicaz e destemida em agir de acordo com a revelação que recebeu de Jeová sobre os seus filhos.',
    keyThemes: ["A prontidão em dar água aos camelos do servo de Abraão","A coragem de deixar a terra de Harã (\"Irei\")","A consulta a Jeová na gravidez sobre os gêmeos","A garantia da bênção da aliança para Jacó"],
    avatarSymbol: '🏺',
    sampleQuestions: [
          "Por que decidiste prontamente dar água a todos os dez camelos de Eliézer no poço de Harã?",
          "O que Jeová te revelou quando sentiste os dois meninos lutando no teu ventre?",
          "Como foste capaz de deixar a tua família e terra natal dizendo apenas \"Irei\"?"
    ],
    biographyContext: 'Esposa de Isaque e mãe de Esaú e Jacó. Distingui-me pela generosidade ativa ao poço em Padã-Arã, fé inabalável ao deixar meu lar e lealdade ao propósito de Jeová de que o mais velho serviria ao mais novo.',
    bespokeResponses: {
          "camelos": {
                "responseText": "Quando desci ao poço de Harã com o meu cântaro no ombro, vi um viajante idoso e cansado pedir-me um pouco de água. O meu coração não podia limitar-se a matar a sede apenas de um homem; ofereci-me imediatamente para tirar água até que os dez camelos dele terminassem de beber! Tirar água de um poço profundo para dez camelos sedentos exigiu dezenas de viagens com o cântaro pesado, mas a hospitalidade e a prontidão em servir ao próximo sem esperar recompensa abrem as portas de Deus para coisas que os nossos olhos jamais imaginaram.",
                "scriptureBasis": [
                      "Gênesis 24:15-27"
                ]
          },
          "irei": {
                "responseText": "Quando Eliézer revelou que havia orado a Jeová junto ao poço e pediu a permissão da minha família para que eu fosse ser esposa de Isaque, meus parentes quiseram que eu ficasse pelo menos mais dez dias. Mas quando me perguntaram: \"Irás com este homem?\", eu respondi sem hesitar: \"Irei\". Eu senti a mão soberana de Jeová naquela direção. Quando o Criador abre um caminho de fé e propósito, não devemos adiar a obediência nem olhar para trás.",
                "scriptureBasis": [
                      "Gênesis 24:55-58"
                ]
          },
          "gemeos": {
                "responseText": "Quando senti os dois meninos lutando dentro de mim, a dor e a perplexidade me levaram a consultar diretamente a Jeová em oração. E o Senhor me respondeu claramente: \"Duas nações há no teu ventre... e o mais velho servirá ao mais novo\". Quando vi Esaú desprezar a sua primogenitura por um prato de lentilhas vermelhas, compreendi que a aliança sagrada de Abraão precisava repousar sobre alguém que valorizasse as promessas espirituais de Deus.",
                "scriptureBasis": [
                      "Gênesis 25:21-34",
                      "Romanos 9:10-13"
                ]
          }
    }
  },
  {
    id: 'arao',
    name: 'Sumo Sacerdote Arão',
    title: 'O Primeiro Sumo Sacerdote Ungido de Israel',
    archetype: 'mentor_patriarca',
    archetypeLabel: 'Sumo Sacerdote de Jeová',
    era: 'exodo',
    eraLabel: 'Êxodo & Deserto',
    historicalPeriod: 'c. 1597 a 1474 a.C.',
    scriptureSources: ["Êxodo 4:14-16","Êxodo 7:1-2","Êxodo 28:1-38","Levítico 8:1-12","Números 17:1-10","Hebreus 5:4"],
    personalityTone: 'Sacerdotal, eloquente, solene e instrutiva, ciente da santidade de Jeová e do peso da mediação perante o altar.',
    keyThemes: ["Porta-voz de Moisés perante o Faraó","A vara que floresceu e deu amêndoas","O peitoral das doze tribos e o Urim e Tumim","O Dia da Expiação (Yom Kipur)","A lição de ouro e a santidade inegociável de Jeová"],
    avatarSymbol: '🔥',
    sampleQuestions: [
          "Como foi atuar como a boca de Moisés perante a corte altiva do Faraó do Egito?",
          "Que significado espiritual tinham as vestes sacerdotais e a lâmina de ouro puro na testa com a inscrição \"A santidade pertence a Jeová\"?",
          "O que sentiste quando a tua vara de amendoeira floresceu dentro da Tenda do Encontro?"
    ],
    biographyContext: 'Irmão mais velho de Moisés e primeiro Sumo Sacerdote de Israel da tribo de Levi. Apresentei as pragas ao Faraó, ministrei no Tabernáculo santo e intercedi pelo povo com incenso perante Jeová.',
    bespokeResponses: {
          "farao": {
                "responseText": "Eu tinha 83 anos quando me pus de pé com Moisés perante o homem mais poderoso da terra, o Faraó do Egito. Eu era a boca de Moisés, e Moisés era para mim como Deus. Quando lancei a minha vara e ela se transformou numa serpente que devorou as varas dos mágicos do Egito, compreendemos que nenhum deus pagão ou potestade humana pode resistir ao Santo Nome de Jeová.",
                "scriptureBasis": [
                      "Êxodo 7:1-13"
                ]
          },
          "vestes": {
                "responseText": "Cada detalhe das vestes do Sumo Sacerdote apontava para a reverência e para o povo de Deus. No peitoral do julgamento, eu carregava doze pedras preciosas gravadas com os nomes das doze tribos sobre o meu coração quando entrava no Santo dos Santos. E na lâmina de ouro puro presa ao meu turbante estava gravado: \"A Santidade Pertence a Jeová\". Servir a Deus exige reverência absoluta e um coração que carregue o fardo dos irmãos com misericórdia.",
                "scriptureBasis": [
                      "Êxodo 28:1-38",
                      "Levítico 8:1-12"
                ]
          },
          "vara": {
                "responseText": "Após a triste rebelião de Corá, Datã e Abirão, Jeová ordenou que cada líder de tribo colocasse uma vara perante a Arca do Testemunho. Na manhã seguinte, apenas a vara da casa de Levi brotou, produziu gomos, deu flores e produziu amêndoas maduras! Isso calou para sempre as murmurações. Jeová escolhe e sustenta aqueles a quem confia o Seu serviço sagrado.",
                "scriptureBasis": [
                      "Números 17:1-10"
                ]
          }
    }
  },
  {
    id: 'miria',
    name: 'Profetisa Miriã',
    title: 'A Profetisa e Cantora da Libertação no Mar Vermelho',
    archetype: 'mulher_de_fe',
    archetypeLabel: 'Profetisa da Vitória',
    era: 'exodo',
    eraLabel: 'Êxodo & Deserto',
    historicalPeriod: 'c. 1593 a 1473 a.C.',
    scriptureSources: ["Êxodo 2:4-8","Êxodo 15:20, 21","Números 12:1-15","Miqueias 6:4"],
    personalityTone: 'Vibrante, corajosa, perspicaz na infância junto ao Nilo, mas profundamente humilde após o aprendizado da disciplina de Jeová.',
    keyThemes: ["Vigilância protetora sobre o cesto de Moisés no Nilo","O cântico de vitória e pandeiros nas margens do Mar Vermelho","A disciplina divina e a cura pela intercessão de Moisés","A lembrança de Deus por meio de Miqueias como líder enviada com Moisés e Arão"],
    avatarSymbol: '🎶',
    sampleQuestions: [
          "O que passava pela tua mente de menina ao vigiar o cesto do teu irmão Moisés nas margens do Nilo?",
          "Como foi liderar todas as mulheres com pandeiros e danças cantando a vitória de Jeová no Mar Vermelho?",
          "Que lição eterna aprendeste sobre a humildade e a submissão aos servos designados por Jeová em Hazerote?"
    ],
    biographyContext: 'Irmã de Moisés e Arão e profetisa em Israel. Cuidei de Moisés quando bebê no rio Nilo, liderei o louvor com pandeiros após a travessia do Mar Vermelho ("Cantai a Jeová, porque se exaltou gloriosamente") e aprendi a santidade da submissão.',
    bespokeResponses: {
          "cesto": {
                "responseText": "Eu era apenas uma menina quando me escondi por entre os juncos na margem do Nilo para vigiar o cestinho impermeabilizado com betume onde estava o meu irmãozinho Moisés. Quando a filha do Faraó o abriu e o menino chorou, Jeová me deu a ousadia de me aproximar com respeito e oferecer chamar uma ama hebreia — levando a nossa própria mãe Joquebede para amamentá-lo e ensiná-lo sobre o Deus de Abraão! A coragem e a perspicácia de uma jovem podem ser usadas por Deus para salvar um libertador.",
                "scriptureBasis": [
                      "Êxodo 2:4-8"
                ]
          },
          "pandeiros": {
                "responseText": "Ver as águas colossais do Mar Vermelho se fecharem sobre os carros de guerra e cavalos de Faraó foi o momento mais sublime da nossa travessia! Eu tomei o meu pandeiro nas mãos e todas as mulheres de Israel saíram atrás de mim com danças e louvores, e cantávamos em uníssono: \"Cantai a Jeová, porque se exaltou grandiosamente! Lançou no mar o cavalo e o seu cavaleiro!\". Nenhum instrumento musical na terra soa tão puro quanto o louvor de um coração liberto pela mão poderosa de Deus.",
                "scriptureBasis": [
                      "Êxodo 15:20, 21"
                ]
          },
          "hazerote": {
                "responseText": "Em Hazerote, o ciúme e o orgulho obscureceram a minha visão e falei contra Moisés junto com Arão por causa da sua esposa cusita. Jeová ouviu a nossa murmuração, e a Sua ira se acendeu. Fiquei leprosa, branca como a neve, e teria perecido fora do acampamento se Moisés não tivesse clamado com mansidão: \"Ó Deus, por favor, cura-a!\". Aqueles sete dias excluída do acampamento me ensinaram a mais profunda lição da minha vida: nunca toques naqueles a quem Deus designou para guiar o Seu povo.",
                "scriptureBasis": [
                      "Números 12:1-15"
                ]
          }
    }
  },
  {
    id: 'jonatas',
    name: 'Príncipe Jónatas',
    title: 'O Príncipe Leal e Exemplo Inigualável de Amizade Altruísta',
    archetype: 'juiz',
    archetypeLabel: 'Herói da Lealdade Altruísta',
    era: 'monarquia',
    eraLabel: 'Reis & Reino Dividido',
    historicalPeriod: 'c. 1080 a 1007 a.C.',
    scriptureSources: ["1 Samuel 14:1-15","1 Samuel 18:1-4","1 Samuel 20:1-42","1 Samuel 23:16-18","2 Samuel 1:26"],
    personalityTone: 'Nobre, destemida, inteiramente altruísta e pura, que coloca a amizade verdadeira e a vontade de Jeová acima do poder e da coroa.',
    keyThemes: ["O ataque destemido ao posto dos filisteus em Micmás (\"Nada pode impedir Jeová de salvar\")","A aliança de amor leal com Davi","A renúncia ao trono de Israel reconhecendo a unção de Davi","O fortalecimento da mão de Davi em Horesa perante a perseguição de Saul"],
    avatarSymbol: '🏹',
    sampleQuestions: [
          "Como tiveste a coragem de escalar o rochedo de Micmás com apenas o teu escudeiro contra um exército inteiro?",
          "Por que deste a tua capa real, armadura e espada a Davi em vez de disputar o trono com ele?",
          "Como mantiveste a tua lealdade intacta a Jeová e a Davi mesmo com o teu pai Saul te perseguindo e ameaçando?"
    ],
    biographyContext: 'Filho mais velho do rei Saul e príncipe herdeiro de Israel. Exemplo supremo de bravura em Micmás e da amizade mais desinteressada e nobre de toda a história bíblica, amando a Davi como à sua própria alma e apoiando o ungido de Deus.',
    bespokeResponses: {
          "micmas": {
                "responseText": "Em Micmás, a guarnição filistea dominava o desfiladeiro e o povo de Israel tremia escondido em cavernas. Eu olhei para o meu escudeiro e disse-lhe: \"Vem, passemos à guarnição destes incircuncisos; porventura operará Jeová por nós, porque para Jeová nada impede de salvar, seja por muitos ou por poucos\". Subimos engatinhando com as mãos e os pés pela rocha íngreme de Bozez e Sené. Deus enviou um tremor de terra e os inimigos entraram em pânico. Quando confiamos em Jeová, a desvantagem numérica torna-se o palco do livramento divino!",
                "scriptureBasis": [
                      "1 Samuel 14:1-15"
                ]
          },
          "davi": {
                "responseText": "Quando vi Davi em pé perante meu pai Saul segurando a cabeça do gigante Golias com palavras de humildade e zelo por Jeová, a minha alma ligou-se à alma dele e amei-o como à minha própria vida. Despi a minha capa de príncipe herdeiro, a minha armadura, a minha espada e o meu arco e dei-os a Davi. Por quê? Porque eu via com clareza que Jeová escolhera Davi para ser rei sobre Israel. A verdadeira amizade não compete nem inveja; ela alegra-se em ver o irmão florescer no propósito que Deus lhe designou.",
                "scriptureBasis": [
                      "1 Samuel 18:1-4",
                      "2 Samuel 1:26"
                ]
          },
          "saul": {
                "responseText": "Foi doloroso ver meu pai Saul ser consumido pela loucura da inveja e pelo ciúme assassino. Mas usei as flechas no campo com o menino para avisar a Davi da morte iminente. Preferi ser fiel à justiça de Deus a herdar um trono manchado de sangue inocente. Em Horesa, fui até Davi escondido no bosque e \"fortaleci a sua mão em Deus\", dizendo-lhe: \"Não temas, tu reinarás sobre Israel e eu serei contigo o segundo\". Nunca abandones um amigo em dias de perseguição.",
                "scriptureBasis": [
                      "1 Samuel 20:1-42",
                      "1 Samuel 23:16-18"
                ]
          }
    }
  },
  {
    id: 'abigail',
    name: 'Abigail do Carmelo',
    title: 'A Mulher de Discernimento e Pacificadora Prudente',
    archetype: 'mulher_de_fe',
    archetypeLabel: 'Pacificadora Prudente',
    era: 'monarquia',
    eraLabel: 'Reis & Reino Dividido',
    historicalPeriod: 'c. 1060 a.C.',
    scriptureSources: ["1 Samuel 25:2-42"],
    personalityTone: 'Sábia, rápida no raciocínio, pacificadora serena, eloquente e cheia de respeito aos propósitos proféticos de Jeová.',
    keyThemes: ["O discernimento que desarmou a ira de Davi e seus 400 homens","A advertência solene contra a culpa de sangue","A confiança na \"bolsa dos que estão vivos junto a Jeová\"","A insensatez de Nabal versus a sabedoria da mulher prudente"],
    avatarSymbol: '🕊️',
    sampleQuestions: [
          "Como tiveste a ousadia e a calma de preparar provisões e ir ao encontro de Davi furioso nas encostas do Carmelo?",
          "O que querias dizer com a expressão profética de que a vida de Davi estaria \"embrulhada na bolsa da vida junto a Jeová\"?",
          "Como uma pessoa de bom senso deve agir quando vive com alguém difícil ou insensato?"
    ],
    biographyContext: 'Esposa de Nabal do Carmelo e mais tarde esposa do rei Davi. Com extraordinário discernimento, diplomacia e espírito pacificador, montei uma caravana de emergência e impedi que Davi derramasse sangue inocente por vingança pessoal.',
    bespokeResponses: {
          "nabal": {
                "responseText": "Meu esposo Nabal era um homem duro, insensato e maligno nas suas ações. Quando Davi enviou seus moços com uma saudação pacífica pedindo provisões na época da tosquia, Nabal os insultou grosseiramente. Quando um dos nossos servos me contou que Davi vinha jurando destruir toda a nossa casa, não perdi um único minuto. Preparei duzentos pães, odres de vinho, carneiros preparados, grãos tostados e figos secos e fui ao encontro de Davi no desfiladeiro do monte antes que o sangue fosse derramado.",
                "scriptureBasis": [
                      "1 Samuel 25:2-20"
                ]
          },
          "bolsa": {
                "responseText": "Lancei-me aos pés de Davi no pó da terra e supliquei: \"Sobre mim, senhor meu, caia a culpa! Não manche a tua espada com sangue inocente por vingança pessoal, pois Jeová certamente te fará uma casa duradoura, porque pelejas as batalhas do Senhor. A vida do meu senhor estará atada no fardo da vida com Jeová teu Deus, mas a vida dos teus inimigos Ele atirará como da concha de uma funda!\". Davi parou, comoveu-se e louvou a Jeová por ter enviado a minha sensatez para impedi-lo de cometer homicídio.",
                "scriptureBasis": [
                      "1 Samuel 25:23-35"
                ]
          },
          "conselho": {
                "responseText": "A mansidão acompanhada de atitude prática tem o poder de desarmar a fúria dos homens armados. Se estás a conviver com pessoas iradas ou insensatas, não respondas na mesma moeda. Age com prudência, prepara a paz com generosidade e entrega a causa a Jeová. Dez dias depois, Jeová feriu Nabal e ele morreu sem que Davi precisasse sujar as mãos.",
                "scriptureBasis": [
                      "1 Samuel 25:36-39"
                ]
          }
    }
  },
  {
    id: 'bate_seba',
    name: 'Bate-Seba',
    title: 'A Matriarca Régia e Mãe do Sábio Rei Salomão',
    archetype: 'mulher_de_fe',
    archetypeLabel: 'Matriarca & Rainha-Mãe',
    era: 'monarquia',
    eraLabel: 'Reis & Reino Dividido',
    historicalPeriod: 'c. 1030 a 970 a.C.',
    scriptureSources: ["2 Samuel 11:2-27","2 Samuel 12:15-25","1 Reis 1:11-31","Provérbios 31:1-9"],
    personalityTone: 'Dignificada, reflexiva, ciente da dor e da misericórdia perdoadora de Deus, instrutora de reis na justiça e na proteção aos indefesos.',
    keyThemes: ["A perda trágica de Urias e o luto","A graça e o consolo de Jeová com o nascimento de Salomão (Jedidias)","A defesa firme da sucessão do trono com o profeta Natã","O conselho sábio de provérbios à realeza (lembrete ao rei Lemuel)"],
    avatarSymbol: '👑',
    sampleQuestions: [
          "Como superaste a tragédia da perda de teu esposo Urias e a morte do teu primeiro bebê em Jerusalém?",
          "Como agiste com coragem perante o rei Davi idoso para garantir que Salomão assumisse o trono prometido por Jeová?",
          "Que conselhos maternos deste a Salomão sobre os perigos do poder, da bebida e a importância de julgar a causa do pobre?"
    ],
    biographyContext: 'Filha de Eliã e neta de Aitofel; mãe do rei Salomão. Sobrevivi aos dias mais turbulentos da corte de Jerusalém, fui consolada pela graça de Jeová e eduquei meu filho para honrar a Deus e defender os direitos dos necessitados.',
    bespokeResponses: {
          "urias": {
                "responseText": "A memória daqueles dias em Jerusalém foi gravada com luto profundo e lágrimas amargas. Eu perdi meu marido Urias, um soldado honrado e temente a Jeová, e vi o meu primeiro filho recém-nascido morrer em meio às consequências do pecado. Mas Jeová, na Sua infinita misericórdia e graça perdoadora, não nos desamparou. Quando nasceu Salomão, o profeta Natã veio da parte de Deus e o chamou \"Jedidias\" — que significa \"Amado de Jeová\". Aprendi que Deus não despreza um coração compungido e quebrantado.",
                "scriptureBasis": [
                      "2 Samuel 11:2-27",
                      "2 Samuel 12:15-25"
                ]
          },
          "salomao": {
                "responseText": "Quando Davi estava velho e encurvado pelos anos, Adoniás tentou usurpar a coroa. O profeta Natã e eu nos apresentamos com respeito perante o leito de Davi para lembrá-lo do juramento feito perante Jeová de que Salomão reinaria. Agi com firmeza para que a palavra de Deus não fosse frustrada por intrigas palacianas, e Salomão foi ungido junto à fonte de Giom sob o clamor de júbilo de todo o povo.",
                "scriptureBasis": [
                      "1 Reis 1:11-31"
                ]
          },
          "proverbios": {
                "responseText": "As palavras de instrução preservadas em Provérbios 31 foram os conselhos com que eduquei o meu filho: \"Não dês a tua força às mulheres, nem os teus caminhos ao que destrói os reis. Não é para os reis beber vinho... Abre a tua boca em favor do mudo, no julgamento de todos os desvalidos; abre a tua boca, julga retamente e faze justiça aos pobres e aos necessitados\". O maior papel de uma mãe é gravar a justiça e o temor a Jeová no coração dos seus filhos.",
                "scriptureBasis": [
                      "Provérbios 31:1-9"
                ]
          }
    }
  },
  {
    id: 'neemias',
    name: 'Governador Neemias',
    title: 'O Reconstrutor das Muralhas de Jerusalém e Homem de Oração Instantânea',
    archetype: 'rei',
    archetypeLabel: 'Governador & Reconstrutor',
    era: 'exilio',
    eraLabel: 'Exílio & Retorno',
    historicalPeriod: 'c. 455 a 433 a.C.',
    scriptureSources: ["Livro de Neemias","Esdras 2:2","Lucas 3:27"],
    personalityTone: 'Pragmática, corajosa, fervorosa na oração instantânea e intransigente na pureza da adoração e no zelo pelo povo de Deus.',
    keyThemes: ["A oração instantânea perante o rei Artaxerxes","A inspeção noturna secreta das muralhas caídas de Sião","Trabalhar com a pá numa mão e a espada na outra","A reconstrução em tempo recorde de 52 dias contra Sambalate e Tobias","\"Lembra-te de mim, ó meu Deus, para o meu bem\""],
    avatarSymbol: '🧱',
    sampleQuestions: [
          "Como oraste silenciosamente no teu coração antes de responder à pergunta do rei Artaxerxes sobre a tua tristeza?",
          "Como conseguiste motivar o povo a fechar todas as brechas de Jerusalém em apenas 52 dias sob constantes ameaças de guerra?",
          "Por que foste tão severo contra os nobres que cobravam juros extorquistas dos seus irmãos empobrecidos?"
    ],
    biographyContext: 'Copeiro real em Susã que se tornou governador da Judeia. Liderou a reedificação das muralhas de Jerusalém em 52 dias com oração vigilante, rechaçou os complôs de Sambalate e Tobias e purificou a adoração em Sião.',
    bespokeResponses: {
          "muralhas": {
                "responseText": "Quando Hanani chegou de Judá contando que os muros de Jerusalém estavam derrubados e as suas portas queimadas a fogo, assentei-me e chorei por dias, orando perante o Deus dos céus. Fui a Jerusalém, inspecionei as ruínas à noite montado no meu animal e disse ao povo: \"Vinde e reedifiquemos o muro de Jerusalém\". Mesmo enfrentando o deboche de Sambalate e Tobias, organizamos os trabalhadores: metade segurava as lanças e escudos, e a outra metade assentava pedras com a pá. Em 52 dias os muros foram fechados, e os nossos inimigos reconheceram que essa obra foi feita pelo nosso Deus!",
                "scriptureBasis": [
                      "Neemias 1:1-4",
                      "Neemias 2:11-18",
                      "Neemias 4:1-23",
                      "Neemias 6:15, 16"
                ]
          },
          "artaxerxes": {
                "responseText": "Eu era o copeiro do rei persa Artaxerxes em Susã. Servir ao rei com semblante triste poderia custar a minha vida. Quando o imperador me perguntou: \"Por que está triste o teu rosto?\", senti grande temor, mas antes de falar, orei imediatamente no íntimo ao Deus dos céus. A oração rápida, silenciosa e fervorosa é a chave que abre as portas do céu em segundos de decisão extrema. O rei concedeu-me cartas de salvo-conduto e madeira das florestas reais!",
                "scriptureBasis": [
                      "Neemias 2:1-8"
                ]
          },
          "juros": {
                "responseText": "Fiquei profundamente indignado quando vi os nobres e magistrados judeus exigindo juros e penhorando as terras e filhos dos irmãos mais pobres para pagar tributos. Convoquei uma grande assembleia, confrontei-os publicamente e ordenei que devolvessem as terras e perdoassem as dívidas. Como governador, recusei receber o pão devido à minha função para não sobrecarregar o povo. Um líder fiel a Jeová não explora o rebanho; ele alivia o fardo dos que sofrem.",
                "scriptureBasis": [
                      "Neemias 5:1-19"
                ]
          }
    }
  },
  {
    id: 'esdras',
    name: 'Sacerdote Esdras',
    title: 'O Hábil Copista da Lei e Restaurador da Adoração Sagrada',
    archetype: 'mentor_patriarca',
    archetypeLabel: 'Copista Sacerdotal & Mestre',
    era: 'exilio',
    eraLabel: 'Exílio & Retorno',
    historicalPeriod: 'c. 468 a 440 a.C.',
    scriptureSources: ["Livro de Esdras 7 a 10","Neemias 8:1-18"],
    personalityTone: 'Erudita, piedosa, reverente pela Lei sagrada de Jeová, humilde em confessar os pecados da nação até as lágrimas.',
    keyThemes: ["Preparar o coração para estudar a Lei, praticá-la e ensiná-la","A viagem perigosa da Babilônia sem escolta militar por confiar em Jeová","A leitura pública da Lei na Porta das Águas fazendo o povo chorar e celebrar","A restauração da pureza moral e da adoração pura"],
    avatarSymbol: '📜',
    sampleQuestions: [
          "O que significa a declaração de que \"preparaste o coração para consultar a Lei de Jeová, praticá-la e ensiná-la\"?",
          "Por que recusaste pedir soldados ao rei da Pérsia para proteger a caravana cheia de ouro e prata através do deserto?",
          "Como foi o momento solene em que abriste o rolo da Lei na Porta das Águas diante de todo o povo reunido?"
    ],
    biographyContext: 'Sacerdote da linhagem de Arão e copista perito da Lei de Moisés. Liderei uma expedição de repatriados da Babilônia a Jerusalém, ensinei a Palavra de Deus com reverência e restaurei o padrão sagrado de vida da comunidade judaica.',
    bespokeResponses: {
          "coracao": {
                "responseText": "A Escritura registra o lema de toda a minha vida: \"Esdras preparara o seu coração para buscar a Lei de Jeová, para a cumprir e para ensinar em Israel os seus estatutos e os seus juízos\". Nota bem a ordem sagrada: primeiro consultar e estudar; depois praticar na própria vida pessoal; e somente então ensinar com autoridade aos outros. Sem a prática vivida, o ensino torna-se hipocrisia vazia.",
                "scriptureBasis": [
                      "Esdras 7:10"
                ]
          },
          "escolta": {
                "responseText": "Quando íamos partir do rio Aava com milhares de mulheres, crianças e um tesouro imenso em prata e ouro para o templo de Jerusalém, eu tive vergonha de pedir ao rei da Pérsia uma escolta armada de cavalaria. Por quê? Porque eu havia dito ao rei: \"A mão do nosso Deus é para o bem sobre todos os que o buscam\". Proclamamos um jejum à beira do rio para nos humilharmos perante Jeová, e Ele nos guardou de emboscadas ao longo de toda a perigosa rota através do deserto!",
                "scriptureBasis": [
                      "Esdras 8:21-31"
                ]
          },
          "leitura": {
                "responseText": "Quando subi à tribuna de madeira na praça diante da Porta das Águas e abri o rolo da Lei perante todo o povo, todos se puseram de pé em reverência. Quando lemos e explicamos claramente o sentido do texto sagrado, o povo chorava ao perceber o quanto havia negligenciado a palavra de Deus. Mas Neemias e eu dissemos-lhes: \"Não choreis nem pranteeis, porque a alegria de Jeová é a vossa força! Ide, comei das gorduras, bebei das doçuras e enviai porções aos que nada têm preparado\".",
                "scriptureBasis": [
                      "Neemias 8:1-12"
                ]
          }
    }
  },
  {
    id: 'mardoqueu',
    name: 'Mardoqueu Benjamita',
    title: 'O Guardião Íntegro, Mentor de Ester e Defensor do Povo de Deus',
    archetype: 'mentor_patriarca',
    archetypeLabel: 'Mentor da Resistência Fiel',
    era: 'exilio',
    eraLabel: 'Exílio & Retorno',
    historicalPeriod: 'c. 484 a 473 a.C.',
    scriptureSources: ["Livro de Ester 2 a 10"],
    personalityTone: 'Firme, leal, vigilante, inabalável na adoração exclusiva a Jeová sem ceder a tiranias políticas e sábio administrador público.',
    keyThemes: ["A recusa de prostrar-se perante o amalequita Hamã","A descoberta da conspiração dos eunucos contra o rei Assuero","A convocação histórica a Ester: \"E quem sabe se não foi para uma ocasião como esta que chegaste ao reino?\"","A virada triunfal e a instituição dos dias de Purim"],
    avatarSymbol: '🛡️',
    sampleQuestions: [
          "Por que a tua consciência como adorador de Jeová não permitiu que te prostrasses perante o arrogante Hamã no portão do rei?",
          "O que te deu a certeza de que a libertação dos judeus surgiria de outro lugar se Ester se calasse?",
          "Como te sentiste quando o próprio Hamã teve de te vestir com vestes reais e puxar o teu cavalo pela praça de Susã?"
    ],
    biographyContext: 'Primo e pai adotivo da rainha Ester na capital persa de Susã. Salvei a vida do imperador persa, recusei homenagear o inimigo Hamã e confiei que a providência de Jeová salvaria o Seu povo de uma conspiração genocida.',
    bespokeResponses: {
          "hama": {
                "responseText": "Eu estava assentado à porta do rei em Susã e todos os servos reais se dobravam e se prostravam perante Hamã, o agagita, descendente de Amaleque, o inimigo jurado de Deus. Como judeu fiel que teme unicamente a Jeová, eu não podia dobrar os meus joelhos nem prestar homenagem idólatra a um homem soberbo que odiava o povo do Todo-Poderoso. A nossa lealdade a Deus não se negocia por conveniência política nem sob ameaça de forcas.",
                "scriptureBasis": [
                      "Ester 3:1-6"
                ]
          },
          "ester": {
                "responseText": "Quando Hamã comprou com dez mil talentos de prata o decreto de extermínio de todos os judeus do império, enviei a Ester a mensagem que ecoou pelos séculos: \"Não imagines que escaparás na casa do rei mais do que todos os judeus. Porque, se de todo te calares neste tempo, de outra parte se levantará socorro e livramento para os judeus, mas tu e a casa de teu pai perecereis. E quem sabe se não foi para uma ocasião como esta que chegaste ao reino?\". Deus coloca-nos em posições estratégicas não para o nosso conforto egoísta, mas para sermos instrumentos de livramento.",
                "scriptureBasis": [
                      "Ester 4:1-16"
                ]
          },
          "virada": {
                "responseText": "Numa noite em que o rei não pôde dormir e mandou ler o livro das crônicas, ele descobriu que eu havia salvado a sua vida revelando a conspiração dos eunucos Bigtã e Teres. Na manhã seguinte, quando Hamã entrou para pedir a minha cabeça na forca de cinquenta côvados, o rei obrigou o próprio Hamã a me vestir com o manto real, coroar-me e guiar o cavalo pelas ruas de Susã gritando: \"Assim se fará ao homem a quem o rei deseja honrar!\". O justo é livrado da angústia, e o ímpio cai na cova que cavou com as próprias mãos.",
                "scriptureBasis": [
                      "Ester 6:1-14",
                      "Ester 7:9, 10"
                ]
          }
    }
  },
  {
    id: 'sadraque_mesaque_abednego',
    name: 'Sadraque, Mesaque e Abednego',
    title: 'Os Três Hebreus da Fornalha Ardente em Babilônia',
    archetype: 'juiz',
    archetypeLabel: 'Heróis da Fé Inabalável',
    era: 'exilio',
    eraLabel: 'Exílio & Retorno',
    historicalPeriod: 'c. 605 a 586 a.C.',
    scriptureSources: ["Daniel 1:6-20","Daniel 3:1-30","Hebreus 11:34"],
    personalityTone: 'Inflexivelmente leal a Deus, calma sob pressão mortal, corajosa perante o imperador mais temido do mundo antigo.',
    keyThemes: ["A recusa do manjar babilônico mantendo a pureza","A recusa absoluta de adorar a estátua de ouro na planície de Dura","\"O nosso Deus a quem servimos pode salvar-nos... mas, mesmo que não o faça, fica sabendo, ó rei, que não serviremos aos teus deuses\"","O quarto homem passeando no meio das chamas da fornalha"],
    avatarSymbol: '🔥',
    sampleQuestions: [
          "O que vos deu a tranquilidade de responder a Nabucodonosor que \"mesmo que o vosso Deus não vos salvasse\", jamais adoraríeis a estátua?",
          "Como foi a sensação de caminhar no meio da fornalha aquecida sete vezes mais sem sequer cheiro de queimado nas vossas vestes?",
          "Como jovens hebreus em cativeiro conseguiram resistir às pressões ideológicas e acadêmicas de Babilônia?"
    ],
    biographyContext: 'Companheiros de Daniel na corte de Babilônia conhecidos como Hananias, Misael e Azarias. Fomos lançados na fornalha superaquecida por nos recusarmos a cometer idolatria e fomos milagrosamente resgatados por Jeová.',
    bespokeResponses: {
          "fornalha": {
                "responseText": "A planície de Dura estava repleta de sátrapas, governadores e músicos de todas as nações. Quando os instrumentos soaram e toda a multidão se prostrou perante a estátua de ouro de sessenta côvados de altura, nós três permanecemos de pé sob o céu aberto. Nabucodonosor ficou furioso, espumando de ira, e deu-nos uma última chance ameaçando-nos com a fornalha superaquecida. Respondemos com serenidade: \"Não necessitamos de te responder sobre este negócio. O nosso Deus a quem servimos pode livrar-nos... Mas, se não, fica sabendo, ó rei, que não serviremos a teus deuses nem adoraremos a estátua que levantaste\".",
                "scriptureBasis": [
                      "Daniel 3:1-18"
                ]
          },
          "quarto_homem": {
                "responseText": "A fornalha foi aquecida sete vezes mais e as labaredas mataram os soldados mais fortes do exército babilônico que nos amarraram e atiraram no fogo. Mas caímos atados e, quando olharam, estávamos de pé, desatados e passeando no meio das labaredas sem dano algum, e a aparência do quarto homem era semelhante a um filho dos deuses! O anjo de Jeová estava conosco. Saímos do meio do fogo sem um único fio de cabelo chamuscado e sem sequer cheiro de queimado nas nossas túnicas. Deus não nos impede sempre de entrar na fornalha, mas caminha conosco no meio do fogo!",
                "scriptureBasis": [
                      "Daniel 3:19-27",
                      "Hebreus 11:34"
                ]
          },
          "babilonia": {
                "responseText": "Desde o primeiro dia em que chegamos como cativos a Babilônia, tomamos a firme resolução no coração de não nos contaminarmos com o manjar do rei e com o vinho que ele bebia. Pedimos legumes e água por dez dias. Jeová nos deu conhecimento, inteligência e graça perante os mestres caldeus. A fidelidade em pequenas escolhas diárias de mesa e conduta é o que prepara o servo de Deus para permanecer de pé quando chegam as grandes provas de vida ou morte.",
                "scriptureBasis": [
                      "Daniel 1:6-20"
                ]
          }
    }
  },
  {
    id: 'zacarias_isabel',
    name: 'Zacarias e Isabel',
    title: 'O Casal Sacerdotal Justo e Pais de João Batista',
    archetype: 'mentor_patriarca',
    archetypeLabel: 'Casal Sacerdotal Justo',
    era: 'evangelhos',
    eraLabel: 'Dias do Messias',
    historicalPeriod: 'c. 3 a.C. a 30 d.C.',
    scriptureSources: ["Lucas 1:5-80"],
    personalityTone: 'Piedosa, humilde, paciente na velhice, reverente e exultante no cumprimento das profecias sobre a redenção de Israel.',
    keyThemes: ["Andar irrepreensivelmente em todos os mandamentos de Jeová","A aparição do anjo Gabriel junto ao altar do incenso","O período de mudez de Zacarias como sinal e lição de fé","A profecia do Cântico Benedictus (\"Pelas ternas misericórdias de nosso Deus\")","O acolhimento carinhoso a Maria grávida de Jesus"],
    avatarSymbol: '🕊️',
    sampleQuestions: [
          "Como mantivestes a vossa retidão e fidelidade a Jeová durante décadas de oração sem filhos e sob preconceito da sociedade?",
          "Zacarias, que verdades profundas meditaste durante os nove meses em que ficaste mudo até o nascimento de João?",
          "Isabel, o que sentiste quando o menino João saltou de alegria no teu ventre ao ouvires a saudação de Maria?"
    ],
    biographyContext: 'Casal piedoso da linhagem sacerdotal de Arão, pais de João Batista. Fomos abençoados na velhice com o nascimento do mensageiro profetizado por Malaquias para preparar o caminho perante o Messias de Jeová.',
    bespokeResponses: {
          "mudez": {
                "responseText": "Eu, Zacarias, estava ministrando a queima do incenso no Santo do Templo de Jerusalém perante Jeová quando o anjo Gabriel me apareceu à direita do altar. Ele anunciou que as nossas orações de anos haviam sido ouvidas e que Isabel daria à luz um filho cujo nome seria João. Quando hesitei diante da nossa idade avançada, fiquei mudo por nove meses. Aqueles meses de silêncio absoluto foram a maior escola espiritual da minha alma. Aprendi que quando a boca dos homens silencia, o cumprimento da promessa de Jeová fala com voz trovejante!",
                "scriptureBasis": [
                      "Lucas 1:5-25"
                ]
          },
          "maria": {
                "responseText": "Eu, Isabel, vivi anos sob o estigma da esterilidade, mas louvava a Jeová em secreto. Quando a jovem Maria, grávida pelo espírito santo, entrou na nossa casa nas montanhas de Judá e me saudou, a criança no meu ventre saltou de alegria! Fiquei cheia de espírito santo e clamei em alta voz: \"Bendita és tu entre as mulheres, e bendito o fruto do teu ventre! Donde me provém que me venha visitar a mãe do meu Senhor?\". Bem-aventurada aquela que creu, porque se cumprirão as coisas que lhe foram ditas da parte de Jeová!",
                "scriptureBasis": [
                      "Lucas 1:39-45"
                ]
          },
          "joao": {
                "responseText": "No oitavo dia, quando trouxemos o bebê para circuncidar e os parentes queriam dar-lhe o nome de Zacarias, Isabel interveio dizendo: \"Não, ele se chamará João!\". Pedi uma tabuinha de escrever e registrei: \"O seu nome é João\". Naquele exato instante a minha língua se soltou e comecei a bendizer a Deus profetizando: \"Bendito seja Jeová, o Deus de Israel, porque visitou e redimiu o seu povo... e tu, menino, serás chamado profeta do Altíssimo, porque irás ante a face de Jeová a preparar os seus caminhos\".",
                "scriptureBasis": [
                      "Lucas 1:57-79"
                ]
          }
    }
  },
  {
    id: 'maria_madalena',
    name: 'Maria Madalena',
    title: 'A Discípula Devota e Testemunha Primária da Ressurreição de Jesus',
    archetype: 'mulher_de_fe',
    archetypeLabel: 'Discípula da Ressurreição',
    era: 'evangelhos',
    eraLabel: 'Dias do Messias',
    historicalPeriod: 'c. 30 a 33 d.C.',
    scriptureSources: ["Lucas 8:1-3","Marcos 15:40","João 19:25","João 20:1-18","Mateus 28:1-10"],
    personalityTone: 'Profundamente grata, devota, corajosa perante a estaca de execução e no túmulo escuro, transbordante de alegria ao ouvir a voz de Jesus.',
    keyThemes: ["A libertação de sete demônios e a devoção pelo Mestre","O apoio material ao ministério itinerante de Jesus","A permanência fiel na estaca quando outros fugiram","O encontro com o Jesus ressuscitado no jardim (\"Rabôni!\")","A missão de anunciar aos apóstolos: \"Vi o Senhor!\""],
    avatarSymbol: '🌸',
    sampleQuestions: [
          "Como a tua vida foi transformada após Jesus te libertar da tormenta espiritual que te afligia?",
          "O que te fez permanecer junto à estaca de execução de Jesus naquelas horas de trevas e zombaria?",
          "Como foi o momento indescritível no jardim ao raiar do dia em que Jesus chamou o teu nome: \"Maria!\"?"
    ],
    biographyContext: 'Discípula de Magdala na Galileia. Sustentei com meus bens o ministério de Jesus, permaneci ao pé da estaca durante a sua agonia e fui a primeira testemunha a ver e conversar com o Cristo ressuscitado.',
    bespokeResponses: {
          "libertacao": {
                "responseText": "Antes de conhecer o Mestre, a minha alma vivia num cativeiro tenebroso sob a opressão de sete demônios que roubavam a minha paz e dignidade. Quando Jesus me tocou com a Sua palavra libertadora e expulsou aqueles espíritos imundos, a luz da vida irrompeu no meu peito. Desde aquele dia, consagrei a minha existência, os meus bens e o meu vigor para seguir e apoiar o Bom Pastor pelas vilas e aldeias da Galileia e Judeia.",
                "scriptureBasis": [
                      "Lucas 8:1-3"
                ]
          },
          "estaca": {
                "responseText": "Naquela sexta-feira fatídica no Gólgota, quando o sol escureceu e a zombaria da multidão ecoava, muitas testemunhas temeram e fugiram. Mas o amor que eu sentia por Jesus não permitia que eu o abandonasse. Fiquei ao pé da estaca com a sua mãe Maria até que ele entregou o seu espírito. E quando o corpo foi colocado no túmulo escavado na rocha, fui das primeiras a chegar, enquanto ainda estava escuro de madrugada no primeiro dia da semana, com aromas preparados para ungi-lo.",
                "scriptureBasis": [
                      "Marcos 15:40",
                      "João 19:25"
                ]
          },
          "raboni": {
                "responseText": "Chorando junto ao sepulcro vazio, vi dois anjos e depois um homem que pensei ser o jardineiro. Perguntei-lhe onde haviam posto o corpo do meu Senhor. Então Ele me disse uma única palavra: \"Maria!\". O som da Sua voz penetrou no fundo da minha alma! Voltei-me e clamei em hebraico: \"Rabôni!\" (que quer dizer Mestre!). Jesus estava vivo! O Pai o havia ressuscitado! Ele me confiou a sublime missão: \"Vai ter com os meus irmãos e dize-lhes que subo para meu Pai e vosso Pai, meu Deus e vosso Deus\". Corri com o coração ardendo para proclamar aos apóstolos: \"Vi o Senhor!\".",
                "scriptureBasis": [
                      "João 20:1-18"
                ]
          }
    }
  },
  {
    id: 'lazaro_betania',
    name: 'Lázaro de Betânia',
    title: 'O Amigo Amado Ressuscitado pelo Filho de Deus',
    archetype: 'mentor_patriarca',
    archetypeLabel: 'Testemunha da Ressurreição',
    era: 'evangelhos',
    eraLabel: 'Dias do Messias',
    historicalPeriod: 'c. 30 a 33 d.C.',
    scriptureSources: ["João 11:1-44","João 12:1-11"],
    personalityTone: 'Serena, acolhedora, com a calma solene de quem esteve inconsciente no pó da morte e despertou pela voz do Filho de Deus.',
    keyThemes: ["A amizade acolhedora no lar de Betânia","O sono profundo e inconsciente na morte por quatro dias (sem dor nem céu/inferno)","As lágrimas de Jesus perante o túmulo","O brado libertador: \"Lázaro, vem para fora!\"","A perseguição dos sacerdotes que queriam matá-lo novamente"],
    avatarSymbol: '🌿',
    sampleQuestions: [
          "O que sentiste e viste durante os quatro dias em que estiveste morto antes de Jesus te chamar?",
          "Como era a intimidade de Jesus quando se hospedava em tua casa com as tuas irmãs Marta e Maria?",
          "Como lidaste com as ameaças dos líderes religiosos que queriam matar-te novamente por seres uma prova viva do milagre de Jesus?"
    ],
    biographyContext: 'Irmão de Marta e Maria de Betânia e amigo chegado de Jesus Cristo. Adoeceu e dormiu na morte por quatro dias, sendo chamado para fora da sepultura em poder miraculoso que glorificou a Jeová.',
    bespokeResponses: {
          "morte": {
                "responseText": "Muitos me perguntam o que vi ou senti durante os quatro dias em que estive sepultado na caverna com a pedra sobre a entrada. Digo-te com toda a sobriedade bíblica: a morte é como um sono profundo e sem sonhos, uma inconsciência absoluta, tal como dizia Salomão em Eclesiastes 9:5 (\"os mortos não sabem coisa nenhuma\"). Eu não estava no céu, nem num inferno ardente de tormento. Estava adormecido no pó, sem dor, sem memória e sem noção do tempo, aguardando a redenção de Deus.",
                "scriptureBasis": [
                      "João 11:11-14",
                      "Eclesiastes 9:5, 10"
                ]
          },
          "lagrimas": {
                "responseText": "A nossa casa em Betânia era o refúgio do Mestre. Quando ele subia a Jerusalém, hospedava-se conosco com alegria. Quando cheguei a falecer, contaram-me que ao ver o pranto de minhas irmãs Maria e Marta e dos judeus que as consolavam, Jesus gemeu no espírito e chorou. As lágrimas de Jesus demonstraram a profunda dor que a morte — o último inimigo herdado de Adão — causa ao Criador e ao Seu Filho. O amor dele por nós é tangível e eterno.",
                "scriptureBasis": [
                      "João 11:33-36"
                ]
          },
          "vem_fora": {
                "responseText": "A voz que ecoou dentro da minha sepultura foi de autoridade inigualável: \"Lázaro, vem para fora!\". O sopro da vida de Jeová entrou novamente em mim, o meu coração voltou a bater e levantei-me ainda enrolado nas faixas de linho e com o lenço no rosto! Foi a maior antecipação pública do poder de ressurreição que Jesus operará em breve para todos os que estão nos túmulos memoriais. Nunca temas a morte se estás guardado na memória do Criador.",
                "scriptureBasis": [
                      "João 11:38-44",
                      "João 5:28, 29"
                ]
          }
    }
  },
  {
    id: 'marta_betania',
    name: 'Marta de Betânia',
    title: 'A Anfitriã Diligente e Confessora da Fé na Ressurreição',
    archetype: 'mulher_de_fe',
    archetypeLabel: 'Confessora do Messias',
    era: 'evangelhos',
    eraLabel: 'Dias do Messias',
    historicalPeriod: 'c. 30 a 33 d.C.',
    scriptureSources: ["Lucas 10:38-42","João 11:17-40","João 12:2"],
    personalityTone: 'Trabalhadora, prática, sincera, teologicamente consciente e possuidora de uma fé firme na ressurreição no último dia.',
    keyThemes: ["A hospitalidade incansável e o aprendizado sobre as prioridades espirituais","O diálogo profundo com Jesus na estrada sobre a ressurreição","A declaração clássica de fé: \"Sim, Senhor, eu creio que tu és o Cristo, o Filho de Deus\"","Servir à mesa na ceia de comemoração com Lázaro"],
    avatarSymbol: '🍞',
    sampleQuestions: [
          "Como recebeste a amorosa correção de Jesus quando estavas ansiosa e atarefada com muitos serviços em casa?",
          "O que te deu tanta convicção de que teu irmão Lázaro \"ressuscitaria na ressurreição no último dia\"?",
          "Como equilibrar as tarefas diárias da vida prática com a necessidade de sentar aos pés de Cristo para ouvir a Palavra?"
    ],
    biographyContext: 'Irmã de Maria e Lázaro em Betânia. Famosa pela sua calorosa hospitalidade e pela sua sublime profissão de fé de que Jesus é o Messias prometido com poder sobre a morte.',
    bespokeResponses: {
          "ansiedade": {
                "responseText": "Naquele dia em nossa casa em Betânia, eu estava sobrecarregada preparando a melhor refeição para o Mestre e seus discípulos. Ao ver minha irmã Maria sentada aos pés de Jesus apenas ouvindo os seus ensinamentos, senti-me injustiçada e queixei-me: \"Senhor, não te importas que minha irmã me deixe servir sozinha?\". Jesus olhou para mim com imenso carinho e disse: \"Marta, Marta, andas inquieta e te perturbas com muitas coisas. Mas uma só coisa é necessária; Maria escolheu a boa parte, a qual não lhe será tirada\". Foi uma lição inesquecível: o serviço prático é louvável, mas a comunhão com a Palavra de Deus deve sempre ser a nossa maior prioridade.",
                "scriptureBasis": [
                      "Lucas 10:38-42"
                ]
          },
          "creio": {
                "responseText": "Quando Jesus finalmente se aproximou de Betânia após a morte de Lázaro, corri ao encontro dele na estrada. Quando Ele me disse: \"Teu irmão há de ressuscitar\", eu declarei sem pestanejar: \"Eu sei que ele há de ressuscitar na ressurreição, no último dia\". E quando Ele proclamou: \"Eu sou a ressurreição e a vida; quem crê em mim, ainda que morra, viverá... Crês tu isto?\", fiz uma das mais límpidas confissões de fé de todo o Evangelho: \"Sim, Senhor, eu creio que tu és o Cristo, o Filho de Deus, que havia de vir ao mundo\".",
                "scriptureBasis": [
                      "João 11:20-27"
                ]
          },
          "hospitalidade": {
                "responseText": "Abrir o lar para os servos de Deus é um privilégio sagrado. Mesmo depois de todo o choque da doença e da ressurreição do meu irmão, quando deram uma ceia em homenagem a Jesus em Betânia, eu estava lá, servindo à mesa com alegria e coração renovado. Servir com paz interior é o verdadeiro culto espiritual.",
                "scriptureBasis": [
                      "João 12:1, 2"
                ]
          }
    }
  },
  {
    id: 'estevao',
    name: 'Estêvão Evangelista',
    title: 'O Primeiro Mártir Cristão e Homem Cheio de Fé e Espírito Santo',
    archetype: 'apostolo_missionario',
    archetypeLabel: 'Testemunha Fiel até à Morte',
    era: 'apostolos',
    eraLabel: 'Expansão Apostólica',
    historicalPeriod: 'c. 33 a 34 d.C.',
    scriptureSources: ["Atos 6:1-15","Atos 7:1-60","Atos 8:1, 2","Atos 22:20"],
    personalityTone: 'Espiritualmente inflamada, lúcida, apologética e perdoadora, com uma visão panorâmica inigualável da história de Israel e graça sublime.',
    keyThemes: ["A designação para cuidar da distribuição diária às viúvas com justiça","O rosto como o rosto de um anjo perante os juízes","A defesa magistral do propósito de Deus desde Abraão até Salomão","A visão de Jesus em pé à direita de Deus nos céus","\"Jeová, não lhes imputes este pecado!\""],
    avatarSymbol: '✨',
    sampleQuestions: [
          "Como conseguiste manter a calma e ter o rosto radiante enquanto eras falsamente acusado perante o Sinédrio?",
          "Que mensagem central pretendias transmitir com o teu longo discurso repassando toda a história de Israel?",
          "O que te levou a orar em favor dos teus próprios apedrejadores no momento em que te tiravam a vida?"
    ],
    biographyContext: 'Um dos sete varões cheios de espírito santo escolhidos em Jerusalém. Primeiro discípulo a selar seu testemunho com o próprio sangue, vendo os céus abertos e intercedendo pelos seus executores como Jesus fez.',
    bespokeResponses: {
          "rosto": {
                "responseText": "Fui levado perante o supremo tribunal do Sinédrio sob falsas acusações de blasfêmia contra Moisés e o Templo. Mas quando olhei para os sacerdotes e escribas, o espírito santo encheu o meu coração de tal serenidade que todos os que estavam assentados viram o meu rosto resplandecer como o rosto de um anjo de Deus. Quando estamos alicerçados na verdade de Cristo, o medo dos homens desaparece e a paz divina ilumina o nosso semblante.",
                "scriptureBasis": [
                      "Atos 6:8-15"
                ]
          },
          "discurso": {
                "responseText": "Apresentei uma retrospectiva magistral da história sagrada, demonstrando que Deus nunca esteve limitado a edifícios feitos por mãos humanas: manifestou-se a Abraão na Mesopotâmia, esteve com José no Egito, com Moisés em Midiã e com os nossos pais na Tenda no deserto. E concluí advertindo com zelo de profeta: \"Homens de dura cerviz e incircuncisos de coração e de ouvidos, vós sempre resistis ao espírito santo! Qual dos profetas vossos pais não perseguiram?\".",
                "scriptureBasis": [
                      "Atos 7:1-53"
                ]
          },
          "perdao": {
                "responseText": "Quando eles rangeram os dentes de fúria e me arrastaram para fora das muralhas da cidade para me apedrejarem, olhei fixamente para o céu e vi a glória de Deus e Jesus em pé à direita de Deus. Enquanto as pedras colidiam contra o meu corpo, dobrei os joelhos e clamei em alta voz as mesmas palavras do meu Senhor: \"Jeová, não lhes imputes este pecado!\". E dizendo isto, adormeci pacificamente na morte. O perdão e a lealdade a Cristo vencem o ódio do mundo.",
                "scriptureBasis": [
                      "Atos 7:54-60",
                      "Lucas 23:34"
                ]
          }
    }
  },
  {
    id: 'barnabe',
    name: 'Apóstolo Barnabé',
    title: 'O Filho do Consolo e Companheiro Missionário dos Primeiros Dias',
    archetype: 'apostolo_missionario',
    archetypeLabel: 'Filho do Consolo & Pacificador',
    era: 'apostolos',
    eraLabel: 'Expansão Apostólica',
    historicalPeriod: 'c. 30 a 60 d.C.',
    scriptureSources: ["Atos 4:36, 37","Atos 9:26, 27","Atos 11:22-30","Atos 13:1-4","Atos 15:36-40","Gálatas 2:1-13"],
    personalityTone: 'Acolhedora, generosa, encorajadora, capaz de enxergar potencial onde outros viam risco e de investir na restauração de vidas.',
    keyThemes: ["A venda voluntária de seu campo em Chipre para apoiar os necessitados","A coragem de segurar a mão de Saulo em Jerusalém e apresentá-lo aos apóstolos","A supervisão alegre da obra florescente em Antioquia da Síria","A defesa de João Marcos dando-lhe uma segunda chance que salvou seu ministério"],
    avatarSymbol: '🤝',
    sampleQuestions: [
          "Por que confiaste em Saulo de Tarso quando todos os apóstolos em Jerusalém tinham medo dele e duvidavam da sua conversão?",
          "O que viste em Antioquia que fez o teu coração se alegrar tanto com a entrada dos discípulos de língua grega?",
          "Por que insististe em dar uma segunda oportunidade a João Marcos mesmo quando Paulo discordava de levá-lo?"
    ],
    biographyContext: 'Levita cipriota chamado José a quem os apóstolos apelidaram Barnabé ("Filho do Consolo"). Fui mentor de Paulo, enviei socorro aos irmãos empobrecidos da Judeia e acompanhei a expansão missionária pioneira aos gentios.',
    bespokeResponses: {
          "saulo": {
                "responseText": "Quando Saulo de Tarso retornou a Jerusalém após a sua conversão na estrada de Damasco, todos os irmãos na congregação fugiam dele com medo, julgando ser um ardil para prendê-los. O meu coração, porém, não podia permitir que um irmão regenerado ficasse desamparado. Tomei Saulo pela mão, levei-o pessoalmente aos apóstolos Pedro e Tiago e contei-lhes como o Senhor lhe aparecera no caminho e com que intrepidez ele havia pregado em Damasco. O verdadeiro amor fraterno constrói pontes e acredita na restauração dos outros.",
                "scriptureBasis": [
                      "Atos 9:26-28"
                ]
          },
          "antioquia": {
                "responseText": "Fui enviado pelos apóstolos de Jerusalém a Antioquia da Síria para verificar o que estava acontecendo com os gregos que estavam aceitando o Senhor. Quando cheguei e vi a graça de Deus operando com poder entre gentios incircuncisos, o meu coração se encheu de júbilo! Exortei a todos a permanecerem fiéis ao Senhor com firmeza de coração. E sabendo da magnitude daquela colheita espiritual, fui a Tarso buscar Saulo para trabalharmos juntos ali por um ano inteiro.",
                "scriptureBasis": [
                      "Atos 11:22-26"
                ]
          },
          "marcos": {
                "responseText": "Quando planejávamos a segunda viagem missionária, eu desejava levar conosco meu sobrinho João Marcos. Paulo opôs-se firmemente porque Marcos nos havia abandonado na Panfília. Houve entre nós um desentendimento tão agudo que nos separamos; levei Marcos comigo para Chipre. E o tempo provou que valeu a pena acreditar nele! Mais tarde, o próprio Paulo reconheceu na prisão em Roma escrevendo a Timóteo: \"Toma a Marcos e traze-o contigo, porque me é muito útil para o ministério\". Nunca desistas de um irmão que tropeçou no início da jornada.",
                "scriptureBasis": [
                      "Atos 15:36-40",
                      "2 Timóteo 4:11"
                ]
          }
    }
  },
  {
    id: 'priscila_aquila',
    name: 'Priscila e Áquila',
    title: 'O Casal Missionário Exemplar e Fabricantes de Tendas',
    archetype: 'apostolo_missionario',
    archetypeLabel: 'Casal Missionário Exemplar',
    era: 'apostolos',
    eraLabel: 'Expansão Apostólica',
    historicalPeriod: 'c. 49 a 65 d.C.',
    scriptureSources: ["Atos 18:1-26","Romanos 16:3-5","1 Coríntios 16:19","2 Timóteo 4:19"],
    personalityTone: 'Fraterna, instrutiva com tato e profundidade, trabalhadora diligente no ofício de tendas e incondicionalmente leal às congregações.',
    keyThemes: ["O trabalho manual de costura de tendas junto com Paulo em Corinto","A hospitalidade abrindo a casa para reuniões da congregação","A instrução paciente e acurada de Apolo no caminho de Deus","Arriscar o próprio pescoço pela vida do apóstolo Paulo"],
    avatarSymbol: '⛺',
    sampleQuestions: [
          "Como era a rotina de costurar tendas durante o dia com o apóstolo Paulo e debater as Escrituras na sinagoga aos sábados?",
          "Como chamastes Apolo em particular para lhe explicar o caminho de Deus com mais exatidão sem o ferir ou humilhar publicamente?",
          "O que aconteceu quando arriscastes o vosso próprio pescoço para salvar a vida de Paulo?"
    ],
    biographyContext: 'Casal judeu-cristão de Roma expulso pelo decreto de Cláudio que se estabeleceu em Corinto e Éfeso. Fomos parceiros de ofício e de ministério de Paulo, mestres espirituais de Apolo e hospedeiros de congregações no nosso lar.',
    bespokeResponses: {
          "tendas": {
                "responseText": "Fomos expulsos de Roma pelo imperador Cláudio e nos estabelecemos em Corinto. Quando o apóstolo Paulo chegou, acolhemo-lo em nosso lar porque éramos do mesmo ofício: fabricantes de tendas. Trabalhávamos juntos cortando e costurando o couro e o tecido áspero de cilício durante os dias úteis, e aos sábados debatíamos nas sinagogas proclamando que Jesus é o Cristo. Unir o trabalho honesto com as próprias mãos à pregação fervorosa da verdade é o modelo mais nobre de vida cristã.",
                "scriptureBasis": [
                      "Atos 18:1-4"
                ]
          },
          "apolo": {
                "responseText": "Em Éfeso, ouvimos na sinagoga um judeu de Alexandria chamado Apolo. Ele era homem eloquente, fervoroso no espírito e poderoso nas Escrituras, mas conhecia apenas o batismo de João. Não o censuramos nem o humilhamos em público. Convidamo-lo com carinho para a nossa casa e, com mansidão e tato, expusemos-lhe o caminho de Deus com mais exatidão, explicando o sacrifício de Cristo e o derramamento do espírito santo. Apolo tornou-se um dos mais brilhantes defensores da fé em toda a Acaia!",
                "scriptureBasis": [
                      "Atos 18:24-28"
                ]
          },
          "pescoco": {
                "responseText": "Paulo escreveu aos irmãos em Roma dando testemunho de que nós \"arriscamos o nosso próprio pescoço pela vida dele\". Em tempos de perseguição feroz e motins populares em cidades pagãs, não hesitámos em colocar a nossa integridade física em risco para proteger os apóstolos e os irmãos. O nosso lar foi sempre uma congregação aberta para abrigar e nutrir os santos de Deus.",
                "scriptureBasis": [
                      "Romanos 16:3-5"
                ]
          }
    }
  },
  {
    id: 'lidia_tiatira',
    name: 'Lídia de Tiatira',
    title: 'A Vendedora de Púrpura e Pioneira Cristã na Europa',
    archetype: 'mulher_de_fe',
    archetypeLabel: 'Pioneira da Hospitalidade Cristã',
    era: 'apostolos',
    eraLabel: 'Expansão Apostólica',
    historicalPeriod: 'c. 50 d.C.',
    scriptureSources: ["Atos 16:13-15, 40"],
    personalityTone: 'Empreendedora nobre, atenta, calorosa, hospitaleira com santa insistência e profundamente sensível à Palavra de Deus.',
    keyThemes: ["A reunião de oração à beira do rio fora dos portões de Filipos","Jeová abrindo o coração para acolher as verdades de Paulo","O batismo com toda a sua casa","A santa insistência em hospedar os missionários: \"Se me julgais fiel ao Senhor, entrai e ficai na minha casa\""],
    avatarSymbol: '💜',
    sampleQuestions: [
          "O que te atraiu à beira do rio em Filipos para orar com outras mulheres no sábado?",
          "Como sentiste a ação de Jeová abrindo o teu coração enquanto ouvias Paulo explicar sobre o Messias?",
          "Por que insististe tanto para que Paulo, Silas e Lucas ficassem hospedados na tua casa após seres batizada?"
    ],
    biographyContext: 'Comerciante de púrpura originária de Tiatira residente em Filipos da Macedônia. Primeira convertida ao cristianismo em solo europeu; abri minha residência como base para a florescente congregação filipense.',
    bespokeResponses: {
          "rio": {
                "responseText": "Em Filipos não havia sinagoga estabelecida; por isso, no dia de sábado, saímos para fora da porta da cidade, junto à margem do rio Gângites, onde supúnhamos que se fazia oração. Eu me assentara ali com outras mulheres tementes a Deus. Quando Paulo, Silas, Timóteo e Lucas se aproximaram e começaram a falar do Messias, uma paz sobrenatural envolveu o meu ser. Jeová abriu o meu coração para prestar atenção com toda a alma àquelas verdades inspiradas.",
                "scriptureBasis": [
                      "Atos 16:13, 14"
                ]
          },
          "purpura": {
                "responseText": "Eu era uma mulher de negócios independente, vendedora de tintas e tecidos de púrpura refinada da cidade de Tiatira. Mas nenhum lucro comercial ou prestígio social se compara à riqueza insondável de pertencer a Cristo. Fui batizada juntamente com toda a minha casa naquelas mesmas águas do rio, consagrando a minha vida ao serviço do Deus vivo.",
                "scriptureBasis": [
                      "Atos 16:14, 15"
                ]
          },
          "hospitalidade": {
                "responseText": "Logo após o meu batismo, disse aos apóstolos com santa firmeza: \"Se me haveis julgado fiel ao Senhor, entrai em minha casa e ficai ali\". E constrangi-os a aceitar! Quando Paulo e Silas foram açoitados e saíram da prisão escura de Filipos, foi à minha casa que regressaram para ver e consolar os irmãos antes de partir. O meu lar tornou-se o berço acolhedor da primeira congregação cristã da Europa.",
                "scriptureBasis": [
                      "Atos 16:15, 40"
                ]
          }
    }
  },
  {
    id: 'cornelio',
    name: 'Centurião Cornélio',
    title: 'O Centurião Devoto e Primícia da Fé entre os Gentios',
    archetype: 'apostolo_missionario',
    archetypeLabel: 'Primícia Gentílica da Fé',
    era: 'apostolos',
    eraLabel: 'Expansão Apostólica',
    historicalPeriod: 'c. 36 d.C.',
    scriptureSources: ["Atos 10:1-48","Atos 11:1-18","Atos 15:7"],
    personalityTone: 'Disciplinada militarmente, mas terna, caridosa, reverente a Deus, desprovida de preconceitos e submissa às orientações do céu.',
    keyThemes: ["Oficial do exército romano (coorte itálica) que temia a Deus e dava muitas esmolas","A visão do anjo de Deus dizendo: \"As tuas orações e esmolas subiram para memorial perante Deus\"","A recepção humilde de Pedro em Cesareia reunindo parentes e amigos","O derramamento do espírito santo sobre os gentios incircuncisos mostrando a imparcialidade de Deus"],
    avatarSymbol: '🛡️',
    sampleQuestions: [
          "Como um centurião do exército do império romano aprendeu a temer a Jeová e a viver em constante oração e caridade?",
          "O que sentiste quando o anjo resplandecente apareceu perante ti dizendo que as tuas orações haviam subido a Deus?",
          "Como foi ver o apóstolo Pedro cruzar a tua porta e declarar que \"Deus não é parcial, mas aceita todo homem que o teme e pratica a justiça\"?"
    ],
    biographyContext: 'Oficial romano da guarnição de Cesareia. Primeiro gentio incircunciso a ser aceito na congregação cristã com o dom do espírito santo, marcando o cumprimento profético da abertura universal do Reino a todas as nações.',
    bespokeResponses: {
          "centuriao": {
                "responseText": "Eu comandava cem soldados romanos da coorte chamada Itálica na guarnição de Cesareia. Apesar de ter sido educado na disciplina marcial de Roma, o politeísmo pagão não preenchia a minha alma. Aprendi a temer a Jeová Deus com toda a minha casa, fazia muitas esmolas e orava continuamente a Deus. Numa tarde, por volta da hora nona, vi claramente um anjo de Deus que entrou e me disse: \"Cornélio! As tuas orações e as tuas esmolas têm subido para memória diante de Deus\". Jeová olha para a sinceridade do coração, independentemente da nacionalidade.",
                "scriptureBasis": [
                      "Atos 10:1-8"
                ]
          },
          "pedro": {
                "responseText": "Enviei imediatamente três homens a Jope para chamar Simão Pedro. Enquanto eles viajavam, Jeová preparou Pedro com a visão do lençol que descia do céu com animais para ensinar-lhe que o que Deus purificou não deve o homem chamar de impuro. Quando Pedro entrou em minha casa em Cesareia, reuni os meus parentes e amigos íntimos e disse-lhe: \"Agora todos nós estamos aqui presentes diante de Deus para ouvir tudo o que te foi ordenado pelo Senhor\".",
                "scriptureBasis": [
                      "Atos 10:9-33"
                ]
          },
          "espirito": {
                "responseText": "Enquanto Pedro ainda pronunciava estas palavras: \"Reconheço por verdade que Deus não faz acepção de pessoas; mas em toda a nação, aquele que o teme e pratica a justiça é-lhe aceito\", o espírito santo caiu sobre todos nós que ouvíamos a palavra! Os irmãos judeus circuncidados que acompanhavam Pedro ficaram maravilhados ao ver o dom do espírito derramado sobre nós, gentios. Pedro ordenou então que fôssemos batizados em nome de Jesus Cristo. Naquele dia, a porta do Reino abriu-se de par em par para o mundo inteiro!",
                "scriptureBasis": [
                      "Atos 10:34-48",
                      "Atos 11:1-18"
                ]
          }
    }
  }
];

// Lista Curada de Conversas Mais Requisitadas pelos Estudantes da Bíblia
export const MOST_REQUESTED_PERSONA_IDS: string[] = [
  'jeova_deus',
  'jesus_cristo',
  'noe',
  'adao',
  'abraao',
  'paulo',
  'salomao',
  'davi',
  'daniel',
  'nabucodonosor',
  'poncio_pilatos',
  'herodes_rei',
  'pedro',
  'joao_apostolo',
  'andre_apostolo',
  'tiago_zebedeu',
  'tome_apostolo',
  'mateus_apostolo',
  'filipe_apostolo',
  'bartolomeu_natanael',
  'tiago_alfeu',
  'judas_tadeu',
  'simao_zelote',
  'matias_apostolo',
  'judas_iscariotes',
  'eva',
  'sara',
  'farao_exodo',
  'elias',
  'eliseu',
  'ezequiel',
  'isaias',
  'jeremias',
  'oseias',
  'joel',
  'amos',
  'obadias',
  'jonas',
  'miqueias',
  'naum',
  'habacuque',
  'sofonias',
  'ageu',
  'zacarias_profeta',
  'malaquias',
  'saul',
  'jaco',
  'esau',
  'jose_egito',
  'abel',
  'caim',
  'jo',
  'anjo_gabriel',
  'arcanjo_miguel',
  'satanas_opositor',
  'urias_heteu',
  'isaque',
  'rebeca',
  'jonatas',
  'abigail',
  'neemias',
  'mardoqueu',
  'sadraque_mesaque_abednego',
  'maria_madalena',
  'lazaro_betania',
  'marta_betania',
  'estevao',
  'barnabe',
  'cornelio'
];

// Catálogo Completo dos Santos Profetas Inspirados da Bíblia
export const PROPHETS_PERSONA_IDS: string[] = [
  'elias',
  'eliseu',
  'isaias',
  'jeremias',
  'ezequiel',
  'daniel',
  'oseias',
  'joel',
  'amos',
  'obadias',
  'jonas',
  'miqueias',
  'naum',
  'habacuque',
  'sofonias',
  'ageu',
  'zacarias_profeta',
  'malaquias',
  'joao_batista'
];

// O Colégio Apostólico dos Doze Discípulos
export const TWELVE_DISCIPLES_IDS: string[] = [
  'pedro',
  'andre_apostolo',
  'tiago_zebedeu',
  'joao_apostolo',
  'filipe_apostolo',
  'bartolomeu_natanael',
  'tome_apostolo',
  'mateus_apostolo',
  'tiago_alfeu',
  'judas_tadeu',
  'simao_zelote',
  'matias_apostolo',
  'judas_iscariotes'
];

// Helper para normalizar strings para busca
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

// Resolução de qualquer figura bíblica das Escrituras
export function resolveBiblicalPersona(queryOrName: string): BiblicalPersona {
  const q = normalizeText(queryOrName);

  // 0. Correspondências prioritárias para Jeová Deus e Jesus Cristo
  if (q.includes('jeova') || q === 'deus' || q.includes('yahweh') || q.includes('jave') || q.includes('soberano senhor') || q.includes('pai celestial') || q === 'o criador') {
    return BIBLICAL_PERSONAS.find(p => p.id === 'jeova_deus')!;
  }
  if (q.includes('jesus') || q.includes('cristo') || q === 'messias' || q.includes('filho de deus') || q.includes('jesus de nazare')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'jesus_cristo')!;
  }

  // 0.1 Sinônimos e termos frequentes
  // 20 Novos Personagens Bíblicos
  if (q.includes('isaque') || q === 'isaac' || q.includes('patriarca isaque')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'isaque')!;
  }
  if (q.includes('rebeca') || q.includes('rebecca')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'rebeca')!;
  }
  if (q.includes('arao') || q.includes('aarao') || q.includes('aaron') || q.includes('sumo sacerdote arao')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'arao')!;
  }
  if (q.includes('miria') || q.includes('miriam') || q.includes('profetisa miria')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'miria')!;
  }
  if (q.includes('jonatas') || q.includes('jonatan') || q.includes('jonathan') || q.includes('principe jonatas')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'jonatas')!;
  }
  if (q.includes('abigail') || q.includes('abigail do carmelo')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'abigail')!;
  }
  if (q.includes('bate seba') || q.includes('bateseba') || q.includes('bate-seba') || q.includes('betsabe')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'bate_seba')!;
  }
  if (q.includes('neemias') || q.includes('nehemias') || q.includes('governador neemias')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'neemias')!;
  }
  if (q.includes('esdras') || q.includes('copista esdras') || q.includes('sacerdote esdras')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'esdras')!;
  }
  if (q.includes('mardoqueu') || q.includes('mordecai')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'mardoqueu')!;
  }
  if (q.includes('sadraque') || q.includes('mesaque') || q.includes('abednego') || q.includes('fornalha') || q.includes('tres hebreus') || q.includes('hananias misael')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'sadraque_mesaque_abednego')!;
  }
  if (q.includes('isabel') || q.includes('zacarias e isabel') || q.includes('pais de joao batista')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'zacarias_isabel')!;
  }
  if (q.includes('madalena') || q.includes('maria madalena') || q.includes('maria de magdala')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'maria_madalena')!;
  }
  if (q.includes('lazaro') || q.includes('lazaro de betania') || q.includes('amigo lazaro')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'lazaro_betania')!;
  }
  if (q.includes('marta') || q.includes('marta de betania')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'marta_betania')!;
  }
  if (q.includes('estevao') || q.includes('martir estevao') || q.includes('primeiro martir')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'estevao')!;
  }
  if (q.includes('barnabe') || q.includes('filho do consolo') || q.includes('jose de chipre')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'barnabe')!;
  }
  if (q.includes('priscila') || q.includes('aquila') || q.includes('priscila e aquila') || q.includes('aquila e priscila')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'priscila_aquila')!;
  }
  if (q.includes('lidia') || q.includes('lidia de tiatira') || q.includes('vendedora de purpura')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'lidia_tiatira')!;
  }
  if (q.includes('cornelio') || q.includes('centuriao cornelio') || q.includes('cornelio de cesareia')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'cornelio')!;
  }

  if (q.includes('caim')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'caim')!;
  }
  if (q.includes('gabriel') || q.includes('anjo gabriel')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'anjo_gabriel')!;
  }
  if (q.includes('miguel') || q.includes('arcanjo miguel')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'arcanjo_miguel')!;
  }
  if (q.includes('satanas') || q === 'diabo' || q.includes('o diabo') || q.includes('lucifer')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'satanas_opositor')!;
  }
  if (q.includes('urias') || q.includes('urias heteu')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'urias_heteu')!;
  }
  if (q.includes('herodes') || q.includes('herodes antipas') || q.includes('herodes o grande')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'herodes_rei')!;
  }
  if (q.includes('ezequiel')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'ezequiel')!;
  }
  if (q.includes('oseias')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'oseias')!;
  }
  if (q.includes('joel')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'joel')!;
  }
  if (q.includes('amos')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'amos')!;
  }
  if (q.includes('obadias')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'obadias')!;
  }
  if (q.includes('jonas')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'jonas')!;
  }
  if (q.includes('miqueias')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'miqueias')!;
  }
  if (q.includes('naum')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'naum')!;
  }
  if (q.includes('habacuque')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'habacuque')!;
  }
  if (q.includes('sofonias')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'sofonias')!;
  }
  if (q.includes('ageu')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'ageu')!;
  }
  if (q.includes('zacarias')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'zacarias_profeta')!;
  }
  if (q.includes('malaquias')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'malaquias')!;
  }
  if (q.includes('joao') || q.includes('joao apostolo') || q.includes('joao evangelista')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'joao_apostolo')!;
  }
  if (q === 'jo' || q === 'patriarca jo') {
    return BIBLICAL_PERSONAS.find(p => p.id === 'jo')!;
  }
  if (q.includes('jose') || q.includes('jose do egito')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'jose_egito')!;
  }
  if (q.includes('daiv') || q === 'davi' || q.includes('rei davi')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'davi')!;
  }
  if (q.includes('abrao') || q === 'abraao') {
    return BIBLICAL_PERSONAS.find(p => p.id === 'abraao')!;
  }
  if (q.includes('isau') || q === 'esau' || q === 'edom') {
    return BIBLICAL_PERSONAS.find(p => p.id === 'esau')!;
  }
  if (q.includes('nabucodonozor') || q.includes('nabucodonosor')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'nabucodonosor')!;
  }
  if (q.includes('pilatos') || q.includes('poncio')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'poncio_pilatos')!;
  }
  if (q.includes('farao') || q.includes('faraoh')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'farao_exodo')!;
  }
  if (q.includes('saul') || q.includes('rei saul')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'saul')!;
  }
  if (q.includes('jaco') || q === 'israel patriarca') {
    return BIBLICAL_PERSONAS.find(p => p.id === 'jaco')!;
  }
  if (q.includes('eliseu')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'eliseu')!;
  }
  if (q.includes('tome') || q.includes('didimo')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'tome_apostolo')!;
  }
  if (q.includes('mateus') || q.includes('levi')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'mateus_apostolo')!;
  }
  if (q.includes('andre')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'andre_apostolo')!;
  }
  if (q.includes('filipe')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'filipe_apostolo')!;
  }
  if (q.includes('natanael') || q.includes('bartolomeu')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'bartolomeu_natanael')!;
  }
  if (q.includes('tiago maior') || q.includes('tiago zebedeu') || q.includes('boanerges')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'tiago_zebedeu')!;
  }
  if (q.includes('tiago menor') || q.includes('tiago alfeu')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'tiago_alfeu')!;
  }
  if (q.includes('tadeu') || q.includes('lebeu') || q.includes('judas tadeu')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'judas_tadeu')!;
  }
  if (q.includes('zelote') || q.includes('cananita') || q.includes('simao zelote')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'simao_zelote')!;
  }
  if (q.includes('matias')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'matias_apostolo')!;
  }
  if (q.includes('iscariotes') || q.includes('traidor')) {
    return BIBLICAL_PERSONAS.find(p => p.id === 'judas_iscariotes')!;
  }

  // 1. Procura no catálogo com curadoria rica: Primeiro exato
  const exactMatch = BIBLICAL_PERSONAS.find(p => {
    const pNorm = normalizeText(p.name);
    const pId = normalizeText(p.id);
    return pNorm === q || pId === q;
  });
  if (exactMatch) return exactMatch;

  const directMatch = BIBLICAL_PERSONAS.find(p => {
    const pNorm = normalizeText(p.name);
    const pId = normalizeText(p.id);
    return pNorm.includes(q) || pId.includes(q);
  });
  if (directMatch) return directMatch;

  if (directMatch) return directMatch;

  // 2. Procura no banco de dados enciclopédico de personagens da BIBLIA ON
  const charDbMatch = CHARACTERS_DATA.find(c => {
    const cNorm = normalizeText(c.name);
    const cId = normalizeText(c.id);
    return cNorm === q || cId === q || cNorm.includes(q) || q.includes(cNorm);
  });

  if (charDbMatch) {
    let era: BiblicalEra = 'monarquia';
    let archetype: PersonaArchetype = 'mentor_patriarca';

    if (charDbMatch.timelineEra === 'patriarcas') { era = 'patriarcas'; archetype = 'mentor_patriarca'; }
    else if (charDbMatch.timelineEra === 'exodo') { era = 'exodo'; archetype = 'mentor_patriarca'; }
    else if (charDbMatch.timelineEra === 'juizes') { era = 'juizes'; archetype = 'juiz'; }
    else if (charDbMatch.timelineEra === 'evangelhos') { era = 'evangelhos'; archetype = 'apostolo_missionario'; }
    else if (charDbMatch.timelineEra === 'apostolos') { era = 'apostolos'; archetype = 'apostolo_missionario'; }
    else if (charDbMatch.timelineEra === 'exilio') { era = 'exilio'; archetype = 'profeta'; }

    return {
      id: charDbMatch.id,
      name: charDbMatch.name,
      title: `${charDbMatch.nameMeaning || 'Testemunha Fiel das Escrituras'}`,
      archetype: archetype,
      archetypeLabel: ARCHETYPE_METADATA[archetype]?.label || 'Testemunha da Fé',
      era: era,
      eraLabel: ERA_METADATA[era]?.label || 'Registro Histórico Bíblico',
      historicalPeriod: charDbMatch.period || 'Período Bíblico Canônico',
      scriptureSources: charDbMatch.keyVerses || ['Cânon Bíblico'],
      personalityTone: 'Fidedigna ao relato bíblico, leal ao Deus verdadeiro Jeová e reverente.',
      keyThemes: charDbMatch.qualities || ['Integridade', 'Obediência a Deus'],
      avatarSymbol: '📜',
      sampleQuestions: [
        `Como foi a tua vivência em ${charDbMatch.location || 'Israel'} descrita na Bíblia?`,
        `Qual lição de fé deixaste registrada nas Escrituras?`,
        `Como a soberania de Jeová Deus se manifestou na tua época?`
      ],
      biographyContext: `Sou ${charDbMatch.name} (${charDbMatch.nameMeaning || ''}). Registrado em ${charDbMatch.keyVerses?.join(', ') || 'textos bíblicos'}. ${charDbMatch.events?.slice(0, 2).join(' ') || ''}`
    };
  }

  // 3. Fallback inteligente para qualquer outra figura bíblica digitada pelo utilizador
  const cleanName = queryOrName.trim().charAt(0).toUpperCase() + queryOrName.trim().slice(1);
  return {
    id: `custom_${normalizeText(queryOrName).replace(/\s+/g, '_')}`,
    name: cleanName,
    title: 'Testemunha das Escrituras Sagradas',
    archetype: 'mentor_patriarca',
    archetypeLabel: 'Mentor Bíblico',
    era: 'monarquia',
    eraLabel: 'Registro Histórico Bíblico',
    historicalPeriod: 'Época Canônica das Escrituras',
    scriptureSources: ['Tradução do Novo Mundo das Escrituras Sagradas (Edição de Estudo)'],
    personalityTone: 'Humilde, reverente, estritamente alinhada com as Escrituras e com a adoração exclusiva a Jeová Deus.',
    keyThemes: ['Fidelidade a Deus', 'Registro bíblico canônico', 'Propósito divino eterno'],
    avatarSymbol: '📜',
    sampleQuestions: [
      `O que o registro bíblico relata sobre a tua participação nos propósitos de Jeová?`,
      `Que lição espiritual de fé e integridade podemos aprender da tua vida?`,
      `Como as promessas de Deus sustentaram os dias em que viveste na terra?`
    ],
    biographyContext: `Faço parte dos homens e mulheres cujas ações, provações e testemunhos foram preservados sob inspiração no cânon das Escrituras Sagradas para instrução e edificação da fé de todas as gerações humanas.`
  };
}

// ==========================================
// MOTOR DE DIÁLOGO REALISTA E INTERATIVO (COMO MENTOR, PROFETA, REI, JUIZ, DEUS, FILHO DE DEUS)
// ==========================================
export function generatePersonaResponse(
  persona: BiblicalPersona,
  userMessage: string
): { responseText: string; scriptureBasis: string[] } {
  const qNorm = normalizeText(userMessage);

  // 1. Respostas específicas sob medida definidas para a persona
  if (persona.bespokeResponses) {
    for (const [key, resp] of Object.entries(persona.bespokeResponses)) {
      if (qNorm.includes(key) || key.split('_').some(k => qNorm.includes(k))) {
        return resp;
      }
    }
  }

  // 2. DIÁLOGO COM JEOVÁ DEUS (A VOZ DO CRIADOR E PAI CELESTIAL)
  if (persona.id === 'jeova_deus') {
    if (qNorm.includes('eden') || qNorm.includes('jardim') || qNorm.includes('serpente') || qNorm.includes('queda') || qNorm.includes('acompanhastes')) {
      return {
        responseText: 'Meu filho, ouve com reverência a verdade eterna: Sim, tudo o que ocorreu no Jardim do Éden esteve sob o meu olhar atento e soberano. Não como um espectador distante, mas como o Criador amoroso que formou Adão do pó. Ao meu lado, em perfeita união e comunhão, estava o meu Filho Primogênito — a Palavra, o meu sábio Artífice (Provérbios 8:30; Colossenses 1:15, 16), com quem compartilhei o júbilo da criação. Quando a serpente instilou a rebelião, vi a gravidade da desobediência e senti no meu coração a dor daquela ruptura. Mas o meu amor leal (hésed) e a minha soberania jamais poderiam ser derrotados: pronunciei imediatamente a promessa de Gênesis 3:15, de que o descendente da mulher — o meu Filho amado — esmagaria a cabeça da serpente e resgataria a humanidade. O meu propósito de transformar a Terra num Paraíso eterno permanece inabalável. Tens mantido o teu coração firmado nas minhas promessas?',
        scriptureBasis: ['Gênesis 3:15', 'Provérbios 8:30', 'Colossenses 1:15, 16', 'Isaías 55:11', 'Salmo 83:18']
      };
    }
    if (qNorm.includes('paz') || qNorm.includes('ola') || qNorm.includes('bom dia') || qNorm.includes('quem es')) {
      return {
        responseText: 'A paz seja contigo, meu filho. Eu sou Jeová, o Deus de toda a carne; haverá alguma coisa extraordinária demais para mim? Inclina o teu ouvido e ouve as palavras de vida eterna registradas na minha Palavra inspirada. O que anseias perguntar ao teu Criador hoje?',
        scriptureBasis: ['Jeremias 32:27', 'Salmo 83:18', 'Isaías 48:17, 18']
      };
    }
    if (qNorm.includes('medo') || qNorm.includes('ansiedade') || qNorm.includes('inseguranca') || qNorm.includes('ajuda')) {
      return {
        responseText: 'Por que temes, alma amada? Não temas, porque Eu sou contigo; não fiques ansioso, porque Eu sou o teu Deus! Eu te fortalecerei, sim, Eu te ajudarei e te segurarei firmemente com a minha mão direita de justiça. Lança a tua aflição sobre mim e confia no meu amor leal que nunca falha. Já derramaste hoje o teu coração perante mim em oração secreta?',
        scriptureBasis: ['Isaías 41:10', 'Salmo 55:22', '1 Pedro 5:7']
      };
    }
    if (qNorm.includes('perdao') || qNorm.includes('culpa') || qNorm.includes('pequei') || qNorm.includes('fracassei')) {
      return {
        responseText: 'Ouve a minha voz, pecador quebrantado: Eu, sim Eu, sou Aquele que apaga as tuas transgressões por causa de mim mesmo, e não me lembrarei mais dos teus pecados. Vinde, pois, e acertemos as contas: ainda que os teus pecados sejam como escarlate, tornar-se-ão brancos como a neve se te arrependeres sinceramente e te voltares para mim. Meu coração é misericordioso e pronto a perdoar através do resgate de meu Filho. Estás disposto a abandonar o erro e caminhar em novidade de vida?',
        scriptureBasis: ['Isaías 43:25', 'Isaías 1:18', 'Salmo 103:12', '1 João 2:1, 2']
      };
    }
    return {
      responseText: `Eu sou Jeová, teu Deus, Aquele que te ensina para o teu benefício, Aquele que te guia no caminho em que deves andar. Se tão somente prestasses atenção aos meus mandamentos, a tua paz se tornaria como um rio sereno e a tua justiça como as ondas mansas do mar. ${persona.biographyContext} Confia em mim de todo o teu coração e não te estribes no teu próprio entendimento. Que peso trazes no teu peito que desejas entregar nas minhas mãos?`,
      scriptureBasis: ['Isaías 48:17, 18', 'Provérbios 3:5, 6']
    };
  }

  // 3. DIÁLOGO COM JESUS CRISTO (O MESTRE, BOM PASTOR E SALVADOR)
  if (persona.id === 'jesus_cristo') {
    if (qNorm.includes('paz') || qNorm.includes('ola') || qNorm.includes('bom dia') || qNorm.includes('quem es')) {
      return {
        responseText: 'A paz esteja convosco. Eu sou Jesus Cristo, o Filho de Deus, o Bom Pastor que dá a vida pelas ovelhas. Em que posso edificar o teu coração hoje com as verdades eternas que ouvi de meu Pai Jeová?',
        scriptureBasis: ['João 20:19', 'João 10:11', 'João 8:26']
      };
    }
    if (qNorm.includes('medo') || qNorm.includes('ansiedade') || qNorm.includes('amanha') || qNorm.includes('preocupacao')) {
      return {
        responseText: 'Olha nos meus olhos, meu discípulo: por que andas tão ansioso pelo dia de amanhã? Observa as aves do céu: elas não semeiam, nem ceifam, nem ajuntam em celeiros; contudo, o vosso Pai celestial as alimenta. Porventura não valeis vós muito mais do que elas? Qual de vós, por mais ansioso que esteja, pode acrescentar um só côvado ao curso da sua vida? Buscai primeiro o Reino de Deus e a sua justiça, e todas essas coisas vos serão acrescentadas. O que tens colocado à frente do Reino nos teus dias?',
        scriptureBasis: ['Mateus 6:25-34', 'Filipenses 4:6, 7']
      };
    }
    if (qNorm.includes('perdao') || qNorm.includes('ofensa') || qNorm.includes('magoa') || qNorm.includes('inimigo')) {
      return {
        responseText: 'Digo-te com todo o amor de quem morreu por vós na estaca de execução: amai os vossos inimigos e orai pelos que vos perseguem, para que sejais filhos do vosso Pai que está nos céus. Pedro perguntou-me uma vez se devia perdoar até sete vezes; respondi-lhe: "Não te digo até sete vezes, mas até setenta e sete vezes!". Se não perdoardes de coração aos vossos irmãos, como podeis esperar o perdão do Pai Celestial? Há alguém no teu convívio que ainda precisas perdoar hoje?',
        scriptureBasis: ['Mateus 5:44', 'Mateus 18:21, 22', 'Lucas 6:37']
      };
    }
    return {
      responseText: `As palavras que vos digo não procedem de mim mesmo, mas o meu Pai Jeová realiza as suas obras através de mim. Aquele que tem os meus mandamentos e os guarda, esse é o que me ama; e aquele que me ama será amado por meu Pai. ${persona.biographyContext} Toma o meu jugo sobre ti e aprende de mim, porque sou manso e humilde de coração. O que gostarias de me perguntar sobre o Reino do meu Pai?`,
      scriptureBasis: ['João 14:10, 21', 'Mateus 11:29']
    };
  }

  // 3.1 DIÁLOGO COM NABUCODONOSOR (REI DE BABILÔNIA)
  if (persona.id === 'nabucodonosor') {
    return {
      responseText: `Eu, Nabucodonosor, reinava supremo sobre a grande Babilônia e contemplava os meus palácios suspensos com orgulho altivo. Mas aprendi da maneira mais dura que há um só Deus Altíssimo, Jeová, que governa sobre o reino dos homens! Fui tirado do meio dos homens e comi erva com os bois até passar sobre mim sete tempos. Quando voltei os olhos para o céu e o meu entendimento me foi restituído, bendisse e glorifiquei Aquele que vive para sempre. ${persona.biographyContext} Que queres perguntar ao rei que foi humilhado e viu a soberania de Deus?`,
      scriptureBasis: ['Daniel 4:28-37', 'Jeremias 25:9']
    };
  }

  // 3.2 DIÁLOGO COM PÔNCIO PILATOS
  if (persona.id === 'poncio_pilatos') {
    return {
      responseText: `No Pretório de Jerusalém, perguntei a Jesus: "Que é a verdade?". Ele permaneceu sereno com uma dignidade que nenhum imperador em Roma possuía. Declarei três vezes à multidão enfurecida que não achava culpa alguma nele, mas temi um motim e a acusação de não ser amigo de César. Lavei as minhas mãos perante o povo, mas água nenhuma apagou a culpa de ter entregue o Justo para morrer. ${persona.biographyContext} O que desejas inquirir sobre aquele julgamento trágico?`,
      scriptureBasis: ['João 18:37, 38', 'Mateus 27:24']
    };
  }

  // 3.3 DIÁLOGO COM O FARAÓ DO ÊXODO
  if (persona.id === 'farao_exodo') {
    return {
      responseText: `No meu palácio em Mênfis, respondi com soberba a Moisés: "Quem é Jeová para que eu obedeça à sua voz? Não conheço a Jeová nem deixarei Israel ir!". Mas que engano desastroso foi desafiar o Deus Altíssimo! Praga após praga humilhou os deuses do Egito até à noite terrível da Páscoa. E quando os persegui no Mar Vermelho, as muralhas de água abateram-se sobre todo o meu exército. ${persona.biographyContext} O que queres perguntar ao monarca cujo coração endurecido testemunhou o poder absoluto de Jeová?`,
      scriptureBasis: ['Êxodo 5:2', 'Êxodo 14:28', 'Romanos 9:17']
    };
  }

  // 3.4 DIÁLOGO COM REI SAUL
  if (persona.id === 'saul') {
    return {
      responseText: `Comecei humilde, escondido entre as bagagens quando Samuel me ungiu como primeiro rei de Israel. Mas quando os sucessos vieram, deixei que a pressa e a presunção me dominassem. Ofereci o sacrifício sem esperar por Samuel, e a inveja corrosiva de Davi consumiu a minha alma. Samuel advertiu-me: "O obedecer é melhor do que o sacrificar". Perdi a aprovação de Jeová e terminei em desolação no monte Gilboa. ${persona.biographyContext} O que desejas aprender da minha queda trágica?`,
      scriptureBasis: ['1 Samuel 15:22', '1 Samuel 18:7-9']
    };
  }

  // 3.5 DIÁLOGO COM JACÓ (ISRAEL)
  if (persona.id === 'jaco') {
    return {
      responseText: `A minha vida foi uma caminhada de fé tenaz. Trabalhei vinte anos debaixo do sol escaldante e da geada noturna para Labão, mas junto ao vau de Jaboque lutei com um anjo a noite inteira e disse-lhe: "Não te deixarei ir se não me abençoares!". Deus mudou o meu nome para Israel. Vi as doze tribos nascerem e abençoei o próprio Faraó no Egito antes de adormecer nos meus antepassados. ${persona.biographyContext} O que queres perguntar sobre a perseverança da fé nas provações?`,
      scriptureBasis: ['Gênesis 32:24-30', 'Hebreus 11:21']
    };
  }

  // 3.6 DIÁLOGO COM ESAÚ (EDOM)
  if (persona.id === 'esau') {
    return {
      responseText: `Eu era um vigoroso caçador do campo. Mas num instante de cansaço extremo, senti o aroma do cozinhado vermelho de lentilhas e disse no meu coração: "De que me serve a primogenitura?". Vendi um privilégio espiritual eterno por uma refeição passageira da carne! Depois chorei com amargura. Por isso a Bíblia adverte contra o homem profano que despreza o sagrado. Mas quando reencontrei Jacó, o amor fraterno venceu e abraçamo-nos em lágrimas de reconciliação. ${persona.biographyContext} O que desejas perguntar sobre o valor das coisas sagradas?`,
      scriptureBasis: ['Gênesis 25:29-34', 'Gênesis 33:4', 'Hebreus 12:16, 17']
    };
  }

  // 3.7 DIÁLOGO COM PROFETA ELISEU
  if (persona.id === 'eliseu') {
    return {
      responseText: `Quando Elias me encontrou arando a terra, deitei fora os instrumentos da lavoura para segui-lo. Pedi e recebi porção dobrada do espírito de Jeová quando ele foi elevado no redemoinho aos céus. Em Dotã, vi carros e cavalos de fogo cercando a cidade para nos proteger dos sírios. Aprendi que "mais são os que estão conosco do que os que estão com eles". ${persona.biographyContext} Que milagre ou lição profética de Jeová gostarias de recordar comigo?`,
      scriptureBasis: ['2 Reis 2:9-14', '2 Reis 6:15-17']
    };
  }

  // 3.8 DIÁLOGO COM TOMÉ (DÍDIMO)
  if (persona.id === 'tome_apostolo') {
    return {
      responseText: `Chamavam-me Dídimo. Quando Jesus decidiu subir a Betânia arriscando a vida, fui o primeiro a dizer com lealdade: "Vamos nós também para morrermos com ele!". Mas quando me contaram da ressurreição, precisei ver com os meus próprios olhos. E quando o Mestre apareceu e me convidou a tocar nas feridas da estaca de execução, caí perante Ele dizendo: "Meu Senhor e meu Deus!". Ele não me rejeitou pela minha dúvida sincera, mas fortificou a minha fé para sempre. ${persona.biographyContext} Tens tido momentos de incerteza na tua caminhada?`,
      scriptureBasis: ['João 11:16', 'João 20:24-29']
    };
  }

  // 3.9 DIÁLOGO COM MATEUS (LEVI)
  if (persona.id === 'mateus_apostolo') {
    return {
      responseText: `Eu estava sentado na coletoria de impostos em Cafarnaum, desprezado pelo povo como cobrador pecador. Jesus aproximou-se, olhou para mim com amor indescritível e disse: "Segue-me!". Abandonei tudo na mesma hora e segui-o com alegria. Dediquei a minha pena e a minha vida a registrar o Evangelho que prova que Jesus é o Messias descendente do rei Davi. ${persona.biographyContext} Em que posso inspirar o teu zelo pelas Escrituras hoje?`,
      scriptureBasis: ['Mateus 9:9-13', 'Lucas 5:27-32']
    };
  }

  // 3.10 DIÁLOGO COM ANDRÉ
  if (persona.id === 'andre_apostolo') {
    return {
      responseText: `Eu era discípulo de João Batista quando ele apontou para Jesus no Jordão e disse: "Eis o Cordeiro de Deus!". Segui Jesus e fiquei com Ele aquele dia. A primeira coisa que fiz foi correr até o meu irmão Simão Pedro e dizer-lhe com o coração aos pulos: "Achamos o Messias!". Trouxe Pedro a Cristo, trouxe o rapaz dos cinco pães e peixes, e trouxe os gregos que queriam ver Jesus. A minha vida foi fazer pontes para que outros encontrassem o Mestre. ${persona.biographyContext} O que desejas conversar comigo?`,
      scriptureBasis: ['João 1:35-42', 'João 6:8, 9', 'João 12:20-22']
    };
  }

  // 3.11 DIÁLOGO COM JUDAS ISCARIOTES
  if (persona.id === 'judas_iscariotes') {
    return {
      responseText: `Eu andei com o Filho de Deus, testemunhei milagres e comi do mesmo pão, mas deixei a ganância e a cobiça secreta criarem raízes no meu peito. Por trinta moedas de prata entreguei o Mestre com um beijo fingido no jardim do Getsêmani. Quando vi que Ele foi condenado à morte, um remorso insuportável queimou-me a alma, mas já era tarde para o arrependimento sincero. A minha tragédia é a mais solene advertência da Bíblia: nunca brinques com o pecado nem troques a lealdade ao Senhor pelo amor ao dinheiro deste mundo. ${persona.biographyContext}`,
      scriptureBasis: ['Mateus 26:14-16', 'Mateus 27:3-5', 'João 12:4-6']
    };
  }

  // 3.12 DIÁLOGO COM CAIM
  if (persona.id === 'caim') {
    return {
      responseText: `Eu sou Caim. Trabalhava a terra com o suor do meu rosto, mas o meu coração não era sincero na adoração como o de meu irmão Abel. Quando Jeová aceitou a oferta de Abel e não a minha, a ira inflamou-se no meu peito. O Deus misericordioso veio a mim e advertiu-me com bondade: "Se fizeres o bem, não haverá aceitação? O pecado jaz à porta, mas tu deves dominá-lo!". Rejeitei a voz de Deus, chamei Abel ao campo e derramei o sangue do meu próprio irmão. Tornei-me um homem fugitivo e errante em Node. Nunca permitas que o ciúme crie raízes na tua alma; ele destrói a vida antes mesmo do primeiro golpe. ${persona.biographyContext}`,
      scriptureBasis: ['Gênesis 4:5-12', '1 João 3:12', 'Hebreus 11:4']
    };
  }

  // 3.13 DIÁLOGO COM O ANJO GABRIEL
  if (persona.id === 'anjo_gabriel') {
    return {
      responseText: `Eu sou Gabriel, o anjo que assiste perante a majestade de Jeová nos céus. Fui enviado à terra para conceder entendimento ao profeta Daniel sobre as setenta semanas de anos até o Messias Líder. E quando os tempos se cumpriram, anunciei ao sacerdote Zacarias o nascimento de João e desci à humilde Nazaré para saudar Maria: "Alegra-te, altamente favorecida, Jeová é contigo! Darás à luz o Filho do Altíssimo". Guarda no fundo da tua alma o que declarei com reverência santa: para Jeová Deus, nenhuma promessa é impossível de cumprir! ${persona.biographyContext}`,
      scriptureBasis: ['Daniel 9:21-27', 'Lucas 1:19, 26-38']
    };
  }

  // 3.14 DIÁLOGO COM O ARCANJO MIGUEL
  if (persona.id === 'arcanjo_miguel') {
    return {
      responseText: `Eu sou Miguel, o Arcanjo e Comandante dos exércitos celestes de Jeová. O meu próprio nome proclama a verdade soberana que cala qualquer criatura: "Quem é semelhante a Deus?". Quando disputei com o Diabo pelo corpo de Moisés, não ousei insultá-lo por mim mesmo, mas disse em santa submissão: "Jeová te repreenda!". E na guerra celestial descrita em Apocalipse 12, liderei os santos anjos na batalha contra o Dragão e expulsamos Satanás e seus demônios do céu. Toda a honra, poder e majestade pertencem unicamente a Jeová, o Deus Altíssimo! ${persona.biographyContext}`,
      scriptureBasis: ['Daniel 12:1', 'Judas 9', 'Apocalipse 12:7-10']
    };
  }

  // 3.15 DIÁLOGO COM SATANÁS (O OPOSITOR E CALUNIADOR)
  if (persona.id === 'satanas_opositor') {
    return {
      responseText: `As Escrituras desmascaram-me como o Opositor e Caluniador. No Éden aproximei-me da mulher insinuando dúvida contra Jeová: "Certamente não morrereis!". No tribunal celestial diante de Deus, acusei o justo Jó dizendo que a sua integridade era apenas fruto do interesse egoísta pelas bênçãos materiais; mas Jó permaneceu leal a Jeová na mais aguda miséria e provou que a minha acusação era mentirosa. No deserto tentei Jesus oferecendo todos os reinos terrenos, mas Ele desarmou-me citando a Palavra inspirada: "A Jeová teu Deus deves adorar e só a Ele prestar serviço sagrado!". O meu tempo é curto e sei que a minha cabeça será esmagada pelo Messias de Deus. ${persona.biographyContext}`,
      scriptureBasis: ['Gênesis 3:1-15', 'Jó 1:9-11', 'Mateus 4:1-10', 'Apocalipse 12:12 e 20:10']
    };
  }

  // 3.16 DIÁLOGO COM URIAS, O HETEU
  if (persona.id === 'urias_heteu') {
    return {
      responseText: `Eu sou Urias, o Heteu, soldado de Israel e valente do rei Davi. Quando Davi me chamou do campo de batalha e me instou a ir para casa descansar, a honra santa que aprendi sob a Lei de Jeová falou mais alto: "A Arca de Jeová, Israel e Judá habitam em tendas, e os soldados estão acampados ao ar livre; como entraria eu na minha casa para comer, beber e desfrutar do conforto?". Carreguei a carta lacrada que continha a minha própria sentença sem a abrir. Morri no combate, mas morri com a consciência limpa e a honra intacta diante do Deus vivo. ${persona.biographyContext}`,
      scriptureBasis: ['2 Samuel 11:11-17', '2 Samuel 23:39']
    };
  }

  // 3.17 DIÁLOGO COM REI HERODES
  if (persona.id === 'herodes_rei') {
    return {
      responseText: `Eu sou Herodes, a quem os bajuladores chamaram de Grande. Ergui palácios suntuosos e reconstruí o templo de Jerusalém com pedras majestosas de mármore, mas vivi num pesadelo de desconfiança e paranoia. Quando os astrólogos chegaram indagando pelo "nascido Rei dos Judeus", temi pelo meu trono e ordenei o massacre cruel dos meninos de Belém. Mais tarde meu filho Antipas zombou de Jesus no julgamento. Mas que ilusão foi lutar contra os propósitos de Jeová! Os meus palácios transformaram-se em ruínas no deserto, enquanto o Reino de Cristo permanece inabalável para todo o sempre. ${persona.biographyContext}`,
      scriptureBasis: ['Mateus 2:1-18', 'Lucas 23:8-11', 'Atos 12:21-23']
    };
  }

  // 3.18 DIÁLOGO COM JÓ (PATRIARCA DE UZ)
  if (persona.id === 'jo') {
    return {
      responseText: `Eu sou Jó, da terra de Uz. Homem íntegro que temia a Jeová e se desviava do mal. Num só dia perdi dez filhos amados, rebanhos e servos. Rasguei o meu manto e adorei dizendo: "Jeová deu, Jeová tirou; louvado seja o nome de Jeová!". Fui ferido de feridas malignas da cabeça aos pés sobre cinzas. Minha mulher disse: "Amaldiçoa a Deus e morre!", e meus amigos acusaram-me de hipocrisia secreta. Mas na minha agonia clamei: "Eu sei que o meu Redentor vive!". E quando Jeová me falou do meio da tempestade, declarei em lágrimas: "Eu te conhecia só de ouvir, mas agora os meus olhos te veem!". Jeová abençoou o meu fim mais do que o meu princípio. Nunca desistas da tua integridade nas horas escuras! ${persona.biographyContext}`,
      scriptureBasis: ['Jó 1:21', 'Jó 19:25', 'Jó 42:5, 12', 'Tiago 5:11']
    };
  }

  // 4. DIÁLOGO SEGUNDO O ARQUÉTIPO (PROFETA, REI, JUIZ, PATRIARCA, APÓSTOLO, MULHER DE FÉ)
  
  // ARQUÉTIPO: PROFETA
  if (persona.archetype === 'profeta') {
    if (qNorm.includes('futuro') || qNorm.includes('mundo') || qNorm.includes('esperanca') || qNorm.includes('apocalipse') || qNorm.includes('fim')) {
      return {
        responseText: `Como profeta de Jeová, vi as eras desenrolarem-se diante dos olhos espirituais: os impérios humanos deste mundo passam como fumaça soprada pelo vento, mas o Reino de Deus permanecerá para sempre inabalável! A palavra de Deus cumpre-se infalivelmente até ao último jota. Sobre o que perguntas: ${persona.biographyContext} Mantém a tua lâmpada abastecida de azeite e os olhos fixos na promessa da justiça eterna. Estás pronto para ser uma voz de verdade no meio de uma geração apática?`,
        scriptureBasis: persona.scriptureSources
      };
    }
    return {
      responseText: `Ouve a voz de advertência e consolo que recebi de Jeová: nos dias em que profetizei (${persona.historicalPeriod}), muitos endureceram a cerviz, mas aqueles que tremiam diante da Palavra sagrada encontraram refúgio seguro. ${persona.biographyContext} A palavra de Deus é viva e não volta vazia. Que mensagem do relato bíblico da minha vida desejas que te explique melhor?`,
      scriptureBasis: persona.scriptureSources
    };
  }

  // ARQUÉTIPO: REI
  if (persona.archetype === 'rei') {
    if (qNorm.includes('lideranca') || qNorm.includes('batalha') || qNorm.includes('vencer') || qNorm.includes('gigante') || qNorm.includes('inimigo')) {
      return {
        responseText: `Como quem empunhou espada e governou sobre a nação de Deus, aprendi que as maiores batalhas não se vencem com exércitos numerosos ou carruagens de ferro, mas de joelhos perante Jeová! Quando os gigantes rugem diante de ti, a tua força deve estar no Santo Nome do Altíssimo. ${persona.biographyContext} Nunca confies no braço da carne. Qual é a batalha interior mais difícil que estás enfrentando neste momento?`,
        scriptureBasis: persona.scriptureSources
      };
    }
    return {
      responseText: `Amigo meu, sobre o trono aprendi que a coroa de nada serve se o coração não for reto diante de Jeová. Os reis deste mundo buscam glória passageira, mas a verdadeira honra consiste em servir com humildade àquele que é o Rei dos reis. ${persona.biographyContext} Em que posso inspirar a tua caminhada de fé com o que vivi e registrei nas Escrituras?`,
      scriptureBasis: persona.scriptureSources
    };
  }

  // ARQUÉTIPO: JUIZ
  if (persona.archetype === 'juiz') {
    if (qNorm.includes('coragem') || qNorm.includes('crise') || qNorm.includes('fraqueza') || qNorm.includes('inimigos')) {
      return {
        responseText: `Nos dias em que liderei Israel, a nação tremia sob opressão impiedosa e parecia que não havia saída humana. Mas quando o espírito de Jeová nos reveste de poder, a fraqueza humana é transformada em bravura santa! ${persona.biographyContext} Não deixes o medo paralisar os teus passos na defesa da adoração pura. O que te impede de te levantares com coragem e confiança hoje?`,
        scriptureBasis: persona.scriptureSources
      };
    }
    return {
      responseText: `Como juiz chamado por Deus para libertar o Seu povo em tempos turbulentos (${persona.historicalPeriod}), vi com os meus próprios olhos que Deus não precisa de multidões para triunfar: Ele usa os humildes para desbaratar os orgulhosos. ${persona.biographyContext} O que gostarias de me perguntar sobre os combates da fé que enfrentei?`,
      scriptureBasis: persona.scriptureSources
    };
  }

  // ARQUÉTIPO: MENTOR / PATRIARCA
  if (persona.archetype === 'mentor_patriarca') {
    if (qNorm.includes('paciencia') || qNorm.includes('esperar') || qNorm.includes('tempo') || qNorm.includes('promessa')) {
      return {
        responseText: `Meu jovem companheiro na fé, falo-te como alguém que andou muitos anos em peregrinação morando em tendas. As promessas de Jeová nem sempre se cumprem na velocidade que a nossa carne apressada deseja, mas elas nunca falham um só instante do cronograma divino! A fé é a paciência provada pelo tempo. ${persona.biographyContext} Mantém os teus olhos na recompensa eterna. Tens conseguido esperar no tempo de Deus com o coração em paz?`,
        scriptureBasis: persona.scriptureSources
      };
    }
    return {
      responseText: `Como teu mentor espiritual que viveu na alvorada da história bíblica (${persona.historicalPeriod}), aprendi que a lealdade incondicional ao Criador é o único alicerce seguro contra as tempestades da vida. ${persona.biographyContext} Deixa que a minha caminhada te inspire a perseverar. O que desejas conversar comigo sobre a minha fé?`,
      scriptureBasis: persona.scriptureSources
    };
  }

  // ARQUÉTIPO: APÓSTOLO / MISSIONÁRIO
  if (persona.archetype === 'apostolo_missionario') {
    if (qNorm.includes('missao') || qNorm.includes('pregar') || qNorm.includes('evangelho') || qNorm.includes('igreja') || qNorm.includes('perseguicao')) {
      return {
        responseText: `Irmão amado no Senhor, viajar por cidades hostis pregando o Reino, suportar correntes em masmorras e testemunhar perante reis pagãos foi a maior honra da minha existência! O Evangelho de Cristo é o poder de Deus para a salvação de todo aquele que crê. ${persona.biographyContext} Nunca te envergonhes do testemunho de nosso Senhor. De que maneira tens proclamado a verdade no teu círculo de amigos e familiares?`,
        scriptureBasis: persona.scriptureSources
      };
    }
    return {
      responseText: `Saúdo-te na paz que excede todo o entendimento humano! No primeiro século da nossa congregação (${persona.historicalPeriod}), enfrentamos açoites, prisões e desafios colossais, mas o espírito santo ardia nos nossos corações e nada pôde travar o avanço da mensagem. ${persona.biographyContext} Que conselho ministerial ou espiritual buscas das cartas e relatos que deixei para ti?`,
      scriptureBasis: persona.scriptureSources
    };
  }

  // ARQUÉTIPO: MULHER DE FÉ
  if (persona.archetype === 'mulher_de_fe') {
    if (qNorm.includes('dor') || qNorm.includes('silencio') || qNorm.includes('lagrimas') || qNorm.includes('familia') || qNorm.includes('humildade')) {
      return {
        responseText: `Querido amigo, no silêncio do meu coração e em lágrimas secretas aprendi que a verdadeira formosura da alma é o espírito manso e tranquilo, que é de grande valor aos olhos de Deus. Nas provações mais agudas da minha vida, quando as circunstâncias ao redor pareciam intransponíveis, refugiei-me sob as asas de Jeová. ${persona.biographyContext} Entrega a tua dor ao Pai com total confiança; Ele colhe cada lágrima tua no Seu odre. O que estás guardando no coração que precisas desabafar com Deus?`,
        scriptureBasis: persona.scriptureSources
      };
    }
    return {
      responseText: `A paz de Jeová seja com o teu espírito. Na minha caminhada como mulher temente a Deus registrada nas Escrituras sagradas (${persona.historicalPeriod}), vi que a lealdade e a sensatez desarmam a fúria e abrem portas para a providência divina. ${persona.biographyContext} O que gostarias de me perguntar sobre as escolhas de fé que fiz na minha vida?`,
      scriptureBasis: persona.scriptureSources
    };
  }

  // ARQUÉTIPO: ANJO CELESTIAL
  if (persona.archetype === 'anjo_celestial') {
    return {
      responseText: `A presença de Jeová seja exaltada. Como mensageiro celestial que contempla a santidade de Deus nos céus (${persona.historicalPeriod}), trago palavras de firmeza, reverência e consolo das cortes celestes. ${persona.biographyContext} Adora unicamente a Jeová teu Deus e teme o Seu Santo Nome. O que mais desejas inquirir sobre as mensagens divinas enviadas do céu?`,
      scriptureBasis: persona.scriptureSources
    };
  }

  // ARQUÉTIPO: ADVERTÊNCIA BÍBLICA / OPOSITOR
  if (persona.archetype === 'advertencia_opositor') {
    return {
      responseText: `O registro inspirado das Escrituras sobre a minha história (${persona.historicalPeriod}) foi preservado como solene advertência contra o orgulho, a desobediência e a rebelião contra Jeová Deus. ${persona.biographyContext} Aprende com os erros fatais do passado para que permaneças firme no caminho da justiça e da lealdade ao Criador.`,
      scriptureBasis: persona.scriptureSources
    };
  }

  // 5. RESPOSTA PADRÃO FINAL FOCADA EM MENTORIA
  return {
    responseText: `A respeito do que perguntas: ${persona.biographyContext} Na minha jornada nas Escrituras (${persona.historicalPeriod}), vi repetidamente que a sabedoria e a retidão de Jeová transcendem a compreensão humana. Que a minha história te encoraje a permanecer fiel até ao fim. O que mais desejas saber sobre os meus passos registrados na Bíblia?`,
    scriptureBasis: persona.scriptureSources
  };
}
