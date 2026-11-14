// src/services/personaAIService.ts
import type { BiblicalPersona } from '../data/biblicalPersonasData';
import { auditBiblicalContent } from './aiService';
import { aiModelLifecycleService } from './aiModelLifecycleService';

export type AIProvider = 'gemini' | 'groq';
export type DialogSpeed = 'slow' | 'normal' | 'fast';

export interface PersonaAIConfig {
  mode: 'hibrido' | 'offline_apenas' | 'ia_online';
  provider: AIProvider;
  geminiApiKey?: string;
  groqApiKey?: string;
  groqModel?: string;
  speedLevel: DialogSpeed;
  askAboutModernEra: boolean;
  showQuickReplies: boolean;
}

export interface InteractivePersonaResponse {
  responseText: string;
  modernEraQuestion: string;
  fullResponseWithQuestion: string;
  scriptureBasis: string[];
  suggestedUserReplies: string[];
  engineUsed: 'ia_online_gemini' | 'ia_online_groq' | 'motor_heuristico_local';
}

// Banco estruturado de indagações profundas sobre o século XXI (o nosso tempo)
const MODERN_ERA_QUESTIONS: Record<string, { question: string; replies: string[] }> = {
  jeova_deus: {
    question: 'Diz-me, meu filho: no meio de tantas vozes, aparelhos luminosos e ruídos do teu século, tens encontrado tempo para te recolheres em silêncio perante mim e escutar a minha Palavra inspirada com reverência?',
    replies: [
      'Pai celestial, reconheço que as telas e a pressa da rotina muitas vezes me distraem, mas anseio por mais silêncio contigo.',
      'Tenho me esforçado para orar todos os dias e ler a Bíblia antes que os afazeres comecem.',
      'Como posso blindar a minha mente das dúvidas e do ceticismo que cercam a sociedade moderna?'
    ]
  },
  jesus_cristo: {
    question: 'Eu subia aos montes de madrugada para orar a meu Pai no silêncio da noite. No meio das notificações incessantes, pressões de trabalho e ansiedades da vossa era moderna, quando foi a última vez que estiveste a sós com Deus derramando o teu coração?',
    replies: [
      'Senhor Jesus, a correria moderna muitas vezes rouba a minha paz interior; preciso aprender a desacelerar aos teus pés.',
      'Procuro orar sempre que sinto o peso da ansiedade, lembrando-me do teu convite: "vinde a mim todos os cansados".',
      'Mestre, ensina-me a amar o próximo neste mundo virtual onde as pessoas se ofendem tão facilmente.'
    ]
  },
  noe: {
    question: 'Nos meus dias, antes de as águas desabarem, as pessoas estavam tão absortas no quotidiano — comiam, bebiam, casavam-se — que não deram atenção aos avisos de Deus. No vosso tempo de tantas redes e distrações digitais, como vocês mantêm os olhos abertos para os sinais dos tempos?',
    replies: [
      'Vejo exatamente esse mesmo padrão hoje: as pessoas vivem como se este mundo fosse durar para sempre.',
      'Tento não me deixar anestesiar pelo entretenimento e lembrar que a nossa vida aqui é passageira.',
      'Noé, como encontraste forças para perseverar décadas a fio pregando quando ninguém ao redor parecia se importar?'
    ]
  },
  adao: {
    question: 'Eu tinha o jardim inteiro, o favor de Deus e a vida perfeita, mas troquei tudo pela independência moral ao provar do fruto proibido. No vosso século onde a autonomia humana e a tecnologia prometem que o homem pode ser o seu próprio deus, vocês têm percebido o perigo desse mesmo engano?',
    replies: [
      'Sim, a nossa sociedade prega o relativismo moral absoluto e colhe um vazio existencial enorme.',
      'Percebo que tentar definir o certo e o errado sem Jeová sempre termina em frustração e dor.',
      'Adão, que conselho deixas para nós sobre a dor do arrependimento e a esperança da semente prometida?'
    ]
  },
  eva: {
    question: 'Eu dei ouvidos a uma voz sutil que questionava a bondade de Jeová com a pergunta: "É realmente assim que Deus disse?". No vosso tempo, onde a internet bombardeia a vossa mente com tantas opiniões enganosas a cada minuto, como vocês guardam os vossos ouvidos e o coração?',
    replies: [
      'É um desafio constante filtrar o que lemos e vemos na internet para não sermos contaminados.',
      'Uso as Escrituras como bússola para conferir se o que a cultura moderna diz é verdade ou mentira.',
      'Eva, como podemos aprender a valorizar o que Deus nos deu sem desejar o que Ele sabiamente nos proibiu?'
    ]
  },
  abraao: {
    question: 'Deixei para trás as casas de alvenaria e o conforto próspero de Ur dos Caldeus para habitar em tendas frágeis pelo resto da vida, confiando numa pátria celestial. Vocês, cercados por arranha-céus, seguros e cartões de crédito, onde colocam a vossa verdadeira segurança?',
    replies: [
      'A sociedade nos pressiona a confiar no dinheiro e em bens materiais, mas sabemos que tudo isso pode ruir.',
      'Procuro manter a perspectiva de peregrino, sabendo que este mundo passa e o que permanece é a vontade de Deus.',
      'Abraão, como conseguiste esperar pacientemente décadas pelo cumprimento da promessa sem desanimar?'
    ]
  },
  sara: {
    question: 'Eu ri com dúvida quando Jeová prometeu que teria um filho na velhice, mas aprendi que para Deus nada é extraordinário demais. Na vossa época de imediatismo onde tudo é resolvido num clique, como vocês lidam com a angústia de esperar as respostas de Deus no Seu tempo?',
    replies: [
      'O imediatismo moderno nos torna muito impacientes; esperar no tempo de Deus é uma das lições mais difíceis.',
      'Quando me lembro da tua história e do nascimento de Isaque, renovo a certeza de que Deus nunca se atrasa.',
      'Sara, como a tua fé venceu a tristeza dos longos anos de espera?'
    ]
  },
  moises: {
    question: 'Subi ao monte Sinai em meio a trovões e recebi os mandamentos gravados em pedra pelo próprio dedo de Jeová. Hoje, na vossa época com tantas constituições, leis humanas e telas brilhantes, como a tua geração tem guardado a santidade de Deus gravada no coração?',
    replies: [
      'Vemos leis humanas mudando constantemente e aprovando o que Deus reprova; precisamos da Lei Divina no coração.',
      'Procuro meditar nos princípios dos mandamentos diariamente para orientar minhas decisões éticas.',
      'Moisés, como suportaste a solidão da liderança perante um povo que murmurava por tudo?'
    ]
  },
  davi: {
    question: 'Quando cuidava dos rebanhos nas noites escuras de Belém, contemplava o céu salpicado de estrelas e cantava a Jeová: "O que é o homem para que te lembres dele?". Nas vossas metrópoles de hoje, iluminadas por luzes artificiais e poluição, vocês ainda tiram tempo para contemplar a grandiosidade da criação?',
    replies: [
      'O concreto e o asfalto das cidades nos afastam da natureza; quase não olhamos mais para o céu estrelado.',
      'Sempre que posso, vou para o campo ou contemplo o amanhecer orando com os teus Salmos.',
      'Davi, que salmo compuseste quando te sentiste mais acuado e traído pelos homens?'
    ]
  },
  salomao: {
    question: 'Ajuntei ouro, construí palácios magníficos, tive frotas mercantis e analisei todas as obras debaixo do sol, descobrindo que sem Deus tudo é vaidade e correr atrás do vento. Na vossa era de compras online, marcas famosas e consumo voraz, vocês já perceberam o vazio das coisas materiais?',
    replies: [
      'Vejo pessoas comprando compulsivamente para tentar preencher uma solidão que só Deus pode curar.',
      'As palavras de Eclesiastes parecem ter sido escritas ontem para a nossa sociedade de consumo.',
      'Salomão, como podemos desfrutar com gratidão do fruto do nosso trabalho sem sermos aprisionados pela ganância?'
    ]
  },
  daniel: {
    question: 'Fui levado jovem para a corte pagã da Babilônia, mas propus no coração não me contaminar com as iguarias do rei e mantive a oração de joelhos três vezes ao dia voltado para Jerusalém. No ambiente competitivo do teu trabalho ou escola moderna, consegues manter a tua integridade sem ceder à pressão dos colegas?',
    replies: [
      'A pressão social no trabalho e na faculdade para ceder em princípios morais é enorme no século XXI.',
      'Tento ser conhecido pela minha honestidade e dedicação, reservando meus horários sagrados de oração diária.',
      'Daniel, o que te deu coragem serena na noite em que foste lançado na cova dos leões famintos?'
    ]
  },
  elias: {
    question: 'No monte Horebe, após a tormenta, o terremoto e o fogo, aprendi que Jeová não estava na fúria do vento, mas falou numa voz mansa e baixa. No meio do barulho incessante de motores, fones de ouvido e mídias do vosso tempo, tens conseguido encontrar quietude para ouvir a voz suave de Deus?',
    replies: [
      'Vivemos numa epidemia de ruído; desligar o celular e silenciar a mente tem sido uma das maiores batalhas diárias.',
      'A tua experiência no Horebe me ensina que Deus não precisa de espetáculo humano para tocar o nosso íntimo.',
      'Elias, como enfrentaste o desânimo agudo quando te sentiste o único fiel que restava na terra?'
    ]
  },
  eliseu: {
    question: 'Quando o exército sírio cercou Dotã com cavalos e carros de ferro, meu servo tremeu de pavor. Orei a Deus para que lhe abrisse os olhos e ele viu o monte cheio de cavalos e carros de fogo invisíveis. Quando o medo do futuro e as crises do vosso mundo moderno vos afligem, vocês conseguem enxergar a proteção de Jeová?',
    replies: [
      'As notícias de guerras e crises nos assustam, mas saber que os exércitos de Jeová nos cercam traz alívio imenso.',
      'Preciso pedir a Deus que abra meus olhos espirituais para não me apavorar com os gigantes visíveis deste mundo.',
      'Eliseu, como podemos ser instrumentos práticos de compaixão e socorro para os necessitados ao nosso redor?'
    ]
  },
  pedro: {
    question: 'Eu era um rude pescador do mar da Galileia. Quando Jesus disse "Deixa tudo e segue-me", larguei barcos e redes. No vosso século onde a carreira profissional, títulos universitários e salários parecem ser tudo o que a sociedade valoriza, como é para vocês colocar o Reino de Deus em primeiro lugar?',
    replies: [
      'Muitos nos acham loucos por priorizar reuniões bíblicas e o serviço a Deus em vez de horas extras e prestígio.',
      'É uma luta diária equilibrar as contas da família sem permitir que a profissão sufoque o ministério cristão.',
      'Pedro, como te recuperaste da dor amarga de ter negado o Mestre três vezes no pátio do sumo sacerdote?'
    ]
  },
  paulo: {
    question: 'Viajei milhares de quilômetros a pé e em frágeis navios de vela enfrentando açoites, prisões e naufrágios para levar o Evangelho a cidades gentias. Disseram-me que no vosso tempo uma mensagem pode alcançar o mundo inteiro num piscar de olhos através de redes invisíveis. Como a tua geração tem usado essa maravilha tecnológica: para pregar a salvação ou para discussões estéreis?',
    replies: [
      'Infelizmente a tecnologia tem sido usada para muita fofoca e ódio, mas também nos permite espalhar a Bíblia globalmente.',
      'Uso meu celular para compartilhar versículos, confortar irmãos desanimados e estudar as Escrituras.',
      'Paulo, como encontraste contentamento cantando hinos na masmorra de Filipos com as costas em sangue?'
    ]
  },
  joao_apostolo: {
    question: 'Reclinei a cabeça no peito de Jesus na última ceia e na velhice exilado na ilha de Patmos vi as visões do novo céu e da nova terra. Olhando para a dor, a decadência moral e as lágrimas do vosso mundo atual, o teu coração anseia com fervor pelo dia em que Deus enxugará toda a lágrima dos vossos olhos?',
    replies: [
      'Sim, apóstolo João! Olhamos as notícias de hospitais, cemitérios e injustiças e oramos com vigor: "Vem, Senhor Jesus!".',
      'As tuas palavras em Apocalipse 21 são o farol de esperança que me mantém de pé nas perdas da vida.',
      'João, como definiste com tanta simplicidade e profundidade que "Deus é amor"?'
    ]
  },
  maria_jesus: {
    question: 'Eu guardava todas as coisas sagradas no meu coração e aprendi que a humildade diante de Jeová vale mais do que qualquer aplauso humano. Como as jovens e as mães da vossa época moderna encontram serenidade e recato num mundo que valoriza tanto a exibição do corpo e a vaidade superficial?',
    replies: [
      'A pressão estética e das redes sociais é brutal sobre as mulheres hoje; o teu exemplo de modéstia é um bálsamo.',
      'Procuramos ensinar às nossas filhas que a verdadeira beleza é o espírito manso e tranquilo aos olhos de Deus.',
      'Maria, como encontraste forças para permanecer em pé junto à estaca de execução vendo o teu amado Filho?'
    ]
  },
  jo: {
    question: 'Perdi dez filhos num só dia, a minha saúde transformou-se em chagas e os meus bens evaporaram, mas na cinza respondi: "O meu Redentor vive e se levantará!". Quando uma crise financeira, um diagnóstico médico severo ou um luto repentino abalam a vossa vida moderna, onde vocês encontram alicerce para não amaldiçoar a Deus?',
    replies: [
      'Jó, a tua história me salva do desespero quando os problemas parecem não ter fim.',
      'Reconheço que no conforto moderno nos tornamos frágeis para a dor; precisamos da tua têmpera de integridade.',
      'Como conseguiste orar com amor pelos teus três amigos depois de eles terem te acusado tão injustamente?'
    ]
  },
  caim: {
    question: 'Deixei o ciúme queimar por dentro porque Jeová aprovou Abel e não a mim, até que o ódio me levou ao assassinato. No vosso tempo de redes sociais onde todos exibem vidas perfeitas e conquistas diárias, como vocês conseguem não cair na armadilha da inveja e da comparação destrutiva?',
    replies: [
      'A comparação nas redes sociais adoece muitas pessoas hoje; a tua história mostra a raiz maligna da inveja.',
      'Tento agradecer a Deus pelo que tenho e me alegrar sinceramente com as vitórias e bênçãos dos meus irmãos.',
      'Caim, por que não escutaste a voz misericordiosa de Jeová quando Ele te avisou que o pecado jazia à porta?'
    ]
  },
  anjo_gabriel: {
    question: 'Eu assisto continuamente diante do Criador e vejo os séculos passarem como um breve sopro. Observando a velocidade vertiginosa com que as transformações e crises da vossa história moderna se acumulam, percebes que o propósito celestial de Jeová caminha com precisão milimétrica para o desfecho glorioso?',
    replies: [
      'Sim, Gabriel! O cumprimento das profecias sobre os últimos dias nos mostra que a história caminha para o clímax.',
      'Saber que anjos santos como tu observam a nossa corrida da fé nos enche de reverência e temor salutar.',
      'Como é a majestade da presença de Jeová nos lugares celestiais onde habitas?'
    ]
  },
  arcanjo_miguel: {
    question: 'Nós travamos a batalha cósmica nos céus para purificar o domínio de Jeová. Na terra, no vosso quotidiano moderno, onde as batalhas são contra filosofias sutis, imoralidade disfarçada e pressões invisíveis, como tens vestido a armadura completa de Deus para resistires no dia mau?',
    replies: [
      'Precisamos do escudo da fé e da espada do espírito todos os dias para não sermos tragados pelas armadilhas modernas.',
      'A tua postura de submissão ao dizer "Jeová te repreenda" nos ensina a não sermos presunçosos contra o mal.',
      'Miguel, que segurança dá saber que tu e os teus anjos estão a postos para livrar o povo de Deus na grande tribulação!'
    ]
  },
  satanas_opositor: {
    question: 'Vocês acham que a vossa tecnologia moderna, as vossas cidades inteligentes e as vossas liberdades vos tornam superiores aos povos antigos? Olhai ao redor: a cobiça, a soberba dos olhos e a ostentação continuam a ser as mesmas cordas com que envolvo a humanidade desde o Éden. Consegues enxergar as minhas armadilhas nas telas que carregas no bolso?',
    replies: [
      'Reconheço que as armadilhas são antigas, mas nós temos a Palavra inspirada de Jeová que te desmascara completamente!',
      'Jesus te venceu no deserto citando as Escrituras, e é com essa mesma verdade que rejeitamos as tuas mentiras.',
      'A Bíblia garante que a tua cabeça será esmagada pelo Messias e o teu tempo de extraviar os povos está no fim!'
    ]
  },
  urias_heteu: {
    question: 'Recusei ir dormir na minha cama macia e comer do melhor enquanto a Arca de Deus e os meus companheiros do exército acampavam no chão duro da batalha. No vosso século onde o egoísmo e o "cada um por si" dominam, o que significa lealdade, honra militar e sacrifício pelos irmãos?',
    replies: [
      'O teu exemplo nos constrange e envergonha a nossa geração que reclama por qualquer desconforto mínimo.',
      'Lealdade hoje é rara; ver alguém que carregou a própria sentença de morte sem trair a honra é comovente.',
      'Urias, como o teu amor a Jeová e à Sua Arca te sustentou como estrangeiro integrado ao povo de Israel?'
    ]
  },
  herodes_rei: {
    question: 'Gastei a minha existência acumulando títulos, construindo fortalezas inexpugnáveis e matando qualquer um que ameaçasse o meu trono, mas morri odiado e consumido pela febre e pela culpa. O que vês nos governantes, bilionários e influenciadores do vosso tempo que se assemelha a essa loucura de querer reinar sem Deus?',
    replies: [
      'Vemos exatamente a mesma obsessão por poder e controle, que termina sempre na sepultura sem levar nada.',
      'A tua dinastia tentou calar João Batista e matar Jesus, mas o Evangelho triunfou e os vossos palácios ruíram.',
      'Herodes, não sentes que um único dia de paz na presença de Deus teria valido mais que todo o teu império sangrento?'
    ]
  },
  simao_zelote: {
    question: 'Eu achava que as espadas, os levantes armados e o ódio político contra os romanos libertariam Israel, até que Jesus me mostrou que o Reino de Deus não é deste mundo e me colocou para comer à mesma mesa com Mateus, um ex-cobrador de impostos. Vendo o vosso mundo tão polarizado por ideologias e fúria partidária, não percebes que só o amor de Cristo pode unir os homens?',
    replies: [
      'A polarização política hoje destrói lares e amizades; o exemplo de tu e Mateus conviverem em paz é inspirador!',
      'Precisamos lembrar que a nossa cidadania pertence aos céus e não a partidos deste mundo decadente.',
      'Simão, como Jesus conseguiu apagar o rancor armado do teu peito e substituí-lo pela pregação pacífica do Reino?'
    ]
  },
  tome_apostolo: {
    question: 'Eu precisava de evidências sólidas: queria ver e tocar as marcas dos cravos para crer. Na vossa era onde o método científico, os telescópios e a medicina avançaram tanto, vocês têm conseguido enxergar que a fé bíblica não é crendice cega, mas a demonstração clara de realidades que não se veem?',
    replies: [
      'A ciência moderna tem revelado uma complexidade tão assombrosa no DNA e no universo que só confirma o Criador!',
      'Tomé, a tua honestidade intelectual nos conforta; mostra que Deus acolhe quem busca a verdade com sinceridade.',
      'O que sentiste ao cair de joelhos e ouvir Jesus dizer: "Bem-aventurados os que não viram e creram"?'
    ]
  },
  mateus_apostolo: {
    question: 'Eu contava moedas de ouro e prata na mesa da alfândega em Cafarnaum com um coração vazio até Jesus passar e dizer: "Segue-me!". Na vossa sociedade de boletos, inflação, contas bancárias e busca frenética por segurança financeira, como vocês encontram coragem para buscar primeiro o Reino?',
    replies: [
      'O medo do desemprego e da falta de dinheiro tenta sufocar a nossa fé, mas confiamos no sustento de Jeová.',
      'Largar uma coletoria lucrativa naquele mesmo instante é um dos testemunhos de fé mais impactantes da Bíblia!',
      'Mateus, como foi registrar minuciosamente cada profecia messiânica cumprida na vida do Mestre?'
    ]
  },
  amos: {
    question: 'Eu era um humilde criador de ovelhas e colhedor de sicômoros, mas Jeová enviou-me aos palácios de marfim para clamar: "Corra a justiça como as águas, e a retidão como um ribeiro perene!". Como vocês, na vossa época com tantas leis e tribunais modernos, têm enfrentado a corrupção e defendido os órfãos, viúvas e necessitados?',
    replies: [
      'A injustiça social continua gritante no século XXI; as tuas palavras continuam urgentes e necessárias.',
      'Procuramos praticar a caridade cristã e a honestidade irrepreensível nos nossos negócios diários.',
      'Amós, que coragem Deus te deu para enfrentar o sacerdote corrupto Amazias em Betel?'
    ]
  },
  habacuque: {
    question: 'Eu me coloquei na torre de vigia perguntando a Deus por que a violência parecia triunfar, e Ele respondeu-me que o justo viverá pela sua fidelidade. Quando vocês olham os conflitos internacionais e as injustiças da vossa época, conseguem cantar como eu: "Ainda que a figueira não floresça... eu exultarei em Jeová"?',
    replies: [
      'Esse cântico de Habacuque 3 é a oração que nos sustenta quando os recursos materiais escasseiam!',
      'A promessa de que o justo viverá pela fé é o alicerce de toda a esperança cristã através dos séculos.',
      'Habacuque, como encontraste tanta serenidade interior enquanto aguardavas o dia da invasão babilônica?'
    ]
  },
  isaque: {
    question: 'Em vez de guerrear com os pastores filisteus de Gerar pelos poços de água, eu preferi mudar-me em paz e cavar novos poços até que Jeová nos deu espaço. No vosso século XXI tão litigioso e competitivo, as pessoas ainda sabem abrir mão do orgulho para preservar a paz com o próximo?',
    replies: [
      'A sociedade de hoje ensina a lutar por tudo a qualquer custo; o teu exemplo pacífico é um bálsamo.',
      'Aprender a recuar em paz confiando que Deus proverá espaço é um dos maiores desafios cristãos.',
      'Isaque, como a certeza da promessa de Deus te dava tanta serenidade para não revidar insultos?'
    ]
  },
  rebeca: {
    question: 'Quando o servo de Abraão pediu apenas um gole de água, prontifiquei-me a encher os bebedouros para dez camelos sedentos, e quando me chamaram para ir a Canaã, disse sem hesitar: "Irei". Na vossa geração acostumada a comodismos, ainda há jovens com essa prontidão generosa para servir e obedecer ao chamado de Deus?',
    replies: [
      'A tua disposição voluntária e corajosa de deixar o lar é um modelo que inspira os jovens de hoje.',
      'Muitas vezes hesitamos em fazer mais do que o estritamente solicitado; o teu exemplo nos ensina hospitalidade ativa.',
      'Rebeca, como discerniste tão rapidamente que a bênção da aliança precisava repousar sobre Jacó?'
    ]
  },
  jonatas: {
    question: 'Eu era o príncipe herdeiro de Israel, mas amei a Davi como à minha própria alma e alegrei-me ao ver Deus ungi-lo rei no meu lugar. No vosso mundo repleto de rivalidades profissionais, inveja e busca por poder, vocês sabem celebrar o sucesso de um amigo sem ressentimento?',
    replies: [
      'A tua amizade com Davi é o padrão de amor fraternal mais nobre e desinteressado da história!',
      'Hoje a inveja corrói muitas amizades; despir a tua própria capa para honrar Davi é uma lição divina.',
      'Jónatas, como conseguiste amar a teu pai Saul e ao mesmo tempo proteger a Davi sem trair a tua consciência perante Deus?'
    ]
  },
  abigail: {
    question: 'Quando meu marido agiu com insensatez e Davi vinha jurando vingança com espada, eu preparei alimentos e caí de joelhos para apelar à consciência espiritual de Davi antes que se derramasse sangue. Como vocês, no vosso dia a dia familiar e social, atuam como pacificadores quando o ambiente ao redor está inflamado de ódio?',
    replies: [
      'A tua inteligência emocional e humildade evitaram uma tragédia terrível; precisamos de mais "Abigais" no mundo!',
      'Procuramos manter a serenidade e usar palavras temperadas para apagar discussões acaloradas.',
      'Abigail, o que te inspirou a profetizar que a vida de Davi estaria atada na "bolsa da vida junto a Jeová"?'
    ]
  },
  neemias: {
    question: 'Enquanto reconstruíamos os muros de Jerusalém, tínhamos a colher de pedreiro numa mão e a lança na outra, e cada zombaria de Sambalate nós respondíamos com oração imediata e trabalho árduo. Diante das críticas, deboches e pressões modernas contra os adoradores de Jeová, como vocês mantêm o foco na obra de Deus sem desfalecer?',
    replies: [
      'A tua frase "estou fazendo uma grande obra e não posso descer" é o nosso lema diário contra distrações!',
      'As pressões modernas tentam nos desanimar, mas o exemplo de fechar os muros em 52 dias nos enche de coragem.',
      'Neemias, como era o teu segredo de orar instantaneamente ao Deus dos céus no meio das conversas diárias?'
    ]
  },
  mardoqueu: {
    question: 'Eu recusei dobrar os meus joelhos perante a arrogância tirânica de Hamã porque a minha adoração e lealdade pertencem exclusivamente a Jeová. No vosso tempo, quando governos, modismos e ideologias pressionam todos a se curvarem ao pensamento da maioria, vocês têm a coragem moral de ficar de pé sozinhos?',
    replies: [
      'A pressão para nos conformarmos ao mundo moderno é enorme; a tua firmeza nos inspira intrepidez.',
      'A tua palavra a Ester de que "para uma hora como esta foste chamada" ecoa até hoje nas nossas decisões de fé.',
      'Mardoqueu, o que sentiste quando o próprio Hamã teve de te conduzir honrado pela praça de Susã?'
    ]
  },
  sadraque_mesaque_abednego: {
    question: 'Nós dissemos a Nabucodonosor que o nosso Deus podia nos livrar, mas que, "mesmo se Ele não nos livrasse", não nos curvaríamos à estátua de ouro. A vossa fé em Jeová é condicional às bênçãos materiais imediatas ou vocês O adoram por quem Ele é, mesmo quando a fornalha da vida continua aquecida?',
    replies: [
      'A vossa resposta na fornalha é a definição máxima de fé incondicional e amor leal a Deus!',
      'Rejeitamos o evangelho da prosperidade egoísta; servimos a Jeová por amor à Sua soberania.',
      'O que sentiram ao ver o quarto personagem caminhando convosco no meio das chamas sem qualquer queimadura?'
    ]
  },
  maria_madalena: {
    question: 'Eu permaneci ao pé da estaca quando muitos fugiram, e fui ao túmulo de madrugada em prantos até que o Salvador me chamou pelo nome e me enviou aos apóstolos. Na vossa época de relacionamentos superficiais, a vossa devoção a Cristo é profunda a ponto de perseverar mesmo nas horas mais escuras de dor?',
    replies: [
      'A tua lealdade inabalável e a tua alegria ao bradar "Vi o Senhor!" tocam o mais íntimo da nossa alma.',
      'O amor leal a Cristo não depende de facilidades, mas de profunda gratidão pela libertação que Ele nos deu.',
      'Maria, como foi o impacto no teu coração ao ouvir a voz inconfundível de Jesus ressuscitado no jardim?'
    ]
  },
  lazaro_betania: {
    question: 'Eu dormi no pó da sepultura por quatro dias em absoluta inconsciência até a voz potente de Jesus ecoar: "Lázaro, vem para fora!". Vendo tantas filosofias humanas cheias de medo da morte e mitos de tormentos eternos, vocês têm consolado os que choram com a esperança límpida da ressurreição no Paraíso?',
    replies: [
      'A verdade bíblica de que a morte é como um sono profundo nos liberta de todo o pavor supersticioso!',
      'As lágrimas de Jesus perante o teu sepulcro mostram o quanto Ele e o Pai Celestial anseiam ressuscitar os nossos entes queridos.',
      'Lázaro, como foi retomar a tua vida e comunhão com o Mestre após esse milagre tão glorioso?'
    ]
  },
  estevao: {
    question: 'Enquanto as pedras colidiam contra o meu corpo, olhei para os céus abertos, vi a glória de Deus e clamei: "Senhor, não lhes imputes este pecado!". Na vossa era de cancelamentos, ódio em redes sociais e vingança rápida, vocês têm sido capazes de perdoar de coração aqueles que vos perseguem e insultam?',
    replies: [
      'O teu perdão no momento do martírio é o reflexo mais sublime do espírito de Cristo na terra.',
      'A nossa sociedade é perita em cultivar ressentimento; a tua oração pelos apedrejadores nos constrange a amar os inimigos.',
      'Estêvão, que visão indescritível dos céus abertos te sustentou com tanta serenidade perante o Sinédrio?'
    ]
  },
  cornelio: {
    question: 'Eu era um oficial do exército romano, mas as minhas orações e atos de caridade subiram como lembrança perante Deus, e quando Pedro chegou, compreendemos que Deus não faz acepção de pessoas. No vosso século XXI, com tantas barreiras de nacionalismo, preconceito racial e divisão social, vocês tratam a todos os seres humanos com a mesma imparcialidade divina?',
    replies: [
      'A revelação em tua casa de que Deus aceita pessoas de qualquer nação é a bandeira mais linda da fraternidade cristã!',
      'Na nossa irmandade bíblica mundial, derrubamos preconceitos de raça, classe social e idioma pelo amor de Jeová.',
      'Cornélio, o que significou para ti e tua família receberem o dom do espírito santo perante os apóstolos?'
    ]
  },
  malaquias: {
    question: 'Nos meus dias, os sacerdotes ofereciam animais cegos e coxos no altar de Jeová, guardando o melhor para si. Na vossa época de agendas hiperlotadas, o que vocês têm oferecido a Deus: o melhor do vosso vigor e do vosso tempo ou apenas as sobras do vosso cansaço?',
    replies: [
      'Essa pergunta atinge o nosso coração em cheio; muitas vezes damos a Deus apenas o tempo que nos sobra.',
      'Quero reconsagrar a minha rotina para dar a Jeová o primeiro lugar nas minhas manhãs e energias.',
      'Malaquias, como a promessa do "livro de recordação" conforta aqueles que temem a Jeová em dias de frieza espiritual?'
    ]
  }
};

const EMBEDDED_GROQ_KEY = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GROQ_API_KEY) || '';
const EMBEDDED_GEMINI_KEY = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY) || '';

class PersonaAIService {
  private config: PersonaAIConfig;

  constructor() {
    const envGroqKey = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GROQ_API_KEY) || EMBEDDED_GROQ_KEY;
    const envGeminiKey = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY) || EMBEDDED_GEMINI_KEY;

    const storedGroq = typeof window !== 'undefined' ? (localStorage.getItem('biblia_on_groq_key') || localStorage.getItem('groq_api_key')) : '';
    const effectiveGroq = storedGroq || envGroqKey;

    const storedGemini = typeof window !== 'undefined' ? (localStorage.getItem('biblia_on_gemini_key') || localStorage.getItem('gemini_api_key')) : '';
    const effectiveGemini = storedGemini || envGeminiKey;

    // Prioridade máxima: Groq Cloud quando temos chave válida gsk_
    const preferredProvider: AIProvider = (effectiveGroq && effectiveGroq.startsWith('gsk_')) ? 'groq' : 'gemini';

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('biblia_on_ai_mode', 'ia_online');
        localStorage.setItem('biblia_on_groq_key', effectiveGroq);
        localStorage.setItem('groq_api_key', effectiveGroq);
        localStorage.setItem('biblia_on_gemini_key', effectiveGemini);
        localStorage.setItem('gemini_api_key', effectiveGemini);
        localStorage.setItem('biblia_on_ai_provider', preferredProvider);
      } catch (e) {
        // ignora
      }
    }

    const storedGroqModel = typeof window !== 'undefined' ? localStorage.getItem('biblia_on_groq_model') : null;
    const effectiveGroqModel = (storedGroqModel && !storedGroqModel.includes('llama') && storedGroqModel.includes('qwen')) ? storedGroqModel : 'qwen/qwen3.8-27b';

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('biblia_on_groq_model', effectiveGroqModel);
        localStorage.setItem('biblia_on_groq_active_model', effectiveGroqModel);
      } catch (e) {
        // ignora
      }
    }

    this.config = {
      mode: 'ia_online', // IA 100% ATIVA por padrão
      provider: preferredProvider,
      geminiApiKey: effectiveGemini,
      groqApiKey: effectiveGroq,
      groqModel: effectiveGroqModel,
      speedLevel: (typeof window !== 'undefined' && (localStorage.getItem('biblia_on_dialog_speed') as DialogSpeed)) || 'normal',
      askAboutModernEra: true,
      showQuickReplies: false
    };
  }

  public getConfig(): PersonaAIConfig {
    return { ...this.config };
  }

  public updateConfig(newConfig: Partial<PersonaAIConfig>): void {
    this.config = { ...this.config, ...newConfig };
    if (typeof window !== 'undefined') {
      if (newConfig.mode !== undefined) {
        localStorage.setItem('biblia_on_ai_mode', newConfig.mode);
      }
      if (newConfig.provider !== undefined) {
        localStorage.setItem('biblia_on_ai_provider', newConfig.provider);
      }
      if (newConfig.geminiApiKey !== undefined) {
        localStorage.setItem('biblia_on_gemini_key', newConfig.geminiApiKey);
        localStorage.setItem('gemini_api_key', newConfig.geminiApiKey);
      }
      if (newConfig.groqApiKey !== undefined) {
        localStorage.setItem('biblia_on_groq_key', newConfig.groqApiKey);
        localStorage.setItem('groq_api_key', newConfig.groqApiKey);
      }
      if (newConfig.groqModel !== undefined) {
        localStorage.setItem('biblia_on_groq_model', newConfig.groqModel);
      }
      if (newConfig.speedLevel !== undefined) {
        localStorage.setItem('biblia_on_dialog_speed', newConfig.speedLevel);
      }
    }
  }

  public getEffectiveApiKey(provider: AIProvider = this.config.provider): string {
    if (provider === 'groq') {
      if (this.config.groqApiKey && this.config.groqApiKey.trim().length > 10) {
        return this.config.groqApiKey.trim();
      }
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('biblia_on_groq_key') || localStorage.getItem('groq_api_key');
        if (stored && stored.trim().length > 10) return stored.trim();
      }
      const envKey = (import.meta as any).env?.VITE_GROQ_API_KEY;
      if (envKey && typeof envKey === 'string' && envKey.trim().length > 10) {
        return envKey.trim();
      }
      return EMBEDDED_GROQ_KEY;
    }

    // Provedor Gemini
    if (this.config.geminiApiKey && this.config.geminiApiKey.trim().length > 10) {
      return this.config.geminiApiKey.trim();
    }
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('biblia_on_gemini_key') || localStorage.getItem('gemini_api_key');
      if (stored && stored.trim().length > 10) return stored.trim();
    }
    const envKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
    if (envKey && typeof envKey === 'string' && envKey.trim().length > 10) {
      return envKey.trim();
    }
    return EMBEDDED_GEMINI_KEY;
  }

  public hasActiveAI(): boolean {
    const groq = this.getEffectiveApiKey('groq');
    const gemini = this.getEffectiveApiKey('gemini');
    return Boolean((groq && groq.startsWith('gsk_')) || (gemini && gemini.length > 10));
  }

  /**
   * Resolução da pergunta reflexiva sobre o nosso tempo moderno
   */
  public getModernEraInquiry(persona: BiblicalPersona): { question: string; replies: string[] } {
    if (MODERN_ERA_QUESTIONS[persona.id]) {
      return MODERN_ERA_QUESTIONS[persona.id];
    }

    // Pergunta inteligente baseada no arquétipo
    if (persona.archetype === 'profeta') {
      return {
        question: `Como profeta de Jeová que viu os impérios do mundo desmoronarem, pergunto-te: no meio das crises políticas e morais do vosso século XXI, o teu coração tem repousado com firmeza na esperança do Reino eterno de Deus?`,
        replies: [
          'Sim, saber que os reinos humanos são transitórios e que o Reino de Deus é eterno traz serenidade à nossa alma.',
          'Às vezes as notícias mundiais assustam, mas as profecias bíblicas nos mostram que Deus está no controle de tudo.',
          'Que conselho deixas para mantermos o discernimento espiritual nesta geração apressada?'
        ]
      };
    }

    if (persona.archetype === 'rei') {
      return {
        question: `Empunhei cetro e governei homens, aprendendo que o poder terreno é passageiro se não estiver submisso a Deus. No vosso tempo moderno de democracias, tecnologia e ambições, como vocês exercem liderança com humildade e serviço?`,
        replies: [
          'A verdadeira liderança que aprendemos de Cristo é a do serviço e da mansidão, não a do domínio sobre outros.',
          'Procuramos agir com integridade moral e justiça em nossos lares e trabalhos.',
          'Que advertência deixas sobre o perigo de a bajulação e o poder corromperem o coração humano?'
        ]
      };
    }

    if (persona.archetype === 'apostolo_missionario') {
      return {
        question: `No primeiro século enfrentamos perseguição e prisões para levar o Evangelho a cada aldeia. Na vossa época de relativa liberdade e internet, como tens usado as tuas oportunidades para proclamar a verdade da Bíblia aos teus contemporâneos?`,
        replies: [
          'Aproveito as redes e conversas diárias para compartilhar textos bíblicos e testemunhar da bondade de Deus.',
          'Às vezes enfrentamos a zombaria e a indiferença das pessoas, mas lembramos da vossa perseverança no primeiro século.',
          'Como podemos ter a mesma intrepidez apostólica sem sermos agressivos com os descrentes?'
        ]
      };
    }

    if (persona.archetype === 'mulher_de_fe') {
      return {
        question: `No silêncio das lágrimas e na oração discreta aprendi que a lealdade a Jeová vence qualquer tempestade. Como as famílias da vossa época têm protegido a fé e a paz espiritual no lar contra as pressões do mundo de hoje?`,
        replies: [
          'Fazemos o estudo bíblico em família e oramos juntos para manter o lar como um refúgio de paz.',
          'O ritmo do trabalho moderno tenta roubar o tempo da família, mas lutamos para priorizar as coisas espirituais.',
          'Que mensagem deixas para encorajar aqueles que enfrentam oposição dentro da sua própria casa?'
        ]
      };
    }

    // Fallback geral de mentoria bíblica
    return {
      question: `Contemplando os desafios da vossa era moderna com todas as vossas facilidades e aflições, tens conseguido colocar a vontade soberana de Jeová acima dos teus próprios anseios diários?`,
      replies: [
        'É uma batalha diária render a nossa vontade a Deus, mas a Bíblia é a nossa âncora constante.',
        'Reconheço que preciso de mais oração e menos confiança nas minhas próprias forças humanas.',
        'Como a tua caminhada nas Escrituras te ensinou a confiar em Deus mesmo quando tudo parecia incerto?'
      ]
    };
  }

  /**
   * Chamada inteligente híbrida (Local Heurístico + Online Gemini ou Groq se configurado)
   */
  public async generateInteractiveResponse(
    persona: BiblicalPersona,
    userMessage: string,
    history: { sender: 'user' | 'persona'; text: string }[] = [],
    localBespokeText: string,
    scriptureBasis: string[]
  ): Promise<InteractivePersonaResponse> {
    const inquiry = this.getModernEraInquiry(persona);
    const effectiveKey = this.getEffectiveApiKey();
    const shouldTryOnline = (this.config.mode === 'ia_online' || this.config.mode === 'hibrido') && Boolean(effectiveKey);

    // Se a IA Online estiver habilitada, tenta cascata de provedores: Groq Cloud -> Gemini
    if (shouldTryOnline) {
      const groqKey = this.getEffectiveApiKey('groq');
      const geminiKey = this.getEffectiveApiKey('gemini');

      // 1. Prioridade Groq Cloud (Llama 3.3 70B)
      if (groqKey && groqKey.startsWith('gsk_')) {
        try {
          const onlineResult = await this.callGroqAPI(persona, userMessage, history, inquiry.question, groqKey);
          if (onlineResult) {
            const audited = auditBiblicalContent(onlineResult);
            if (audited.passed) {
              return {
                responseText: onlineResult,
                modernEraQuestion: inquiry.question,
                fullResponseWithQuestion: onlineResult,
                scriptureBasis: scriptureBasis,
                suggestedUserReplies: inquiry.replies,
                engineUsed: 'ia_online_groq'
              };
            }
          }
        } catch (err) {
          console.warn('[PersonaAI] Erro no Groq, tentando Gemini como fallback:', err);
        }
      }

      // 2. Fallback Google Gemini
      if (geminiKey && geminiKey.length > 10) {
        try {
          const onlineResult = await this.callGeminiAPI(persona, userMessage, history, inquiry.question, geminiKey);
          if (onlineResult) {
            const audited = auditBiblicalContent(onlineResult);
            if (audited.passed) {
              return {
                responseText: onlineResult,
                modernEraQuestion: inquiry.question,
                fullResponseWithQuestion: onlineResult,
                scriptureBasis: scriptureBasis,
                suggestedUserReplies: inquiry.replies,
                engineUsed: 'ia_online_gemini'
              };
            }
          }
        } catch (err) {
          console.warn('[PersonaAI] Erro no Gemini:', err);
        }
      }
    }

    // Motor Heurístico Local TNM com Alta Fidelidade e Humanidade
    let responseText = localBespokeText;
    
    // Concatena a reflexão pastoral sobre o nosso tempo se ativada e não presente
    let fullResponse = responseText;
    if (this.config.askAboutModernEra && !responseText.includes(inquiry.question)) {
      fullResponse = `${responseText}\n\n💬 **Uma reflexão para ti sobre o vosso tempo:**\n${inquiry.question}`;
    }

    return {
      responseText,
      modernEraQuestion: inquiry.question,
      fullResponseWithQuestion: fullResponse,
      scriptureBasis,
      suggestedUserReplies: inquiry.replies,
      engineUsed: 'motor_heuristico_local'
    };
  }

  /**
   * Constrói o System Prompt de Alta Fidelidade Bíblica com Superpoderes de Incorporação Total
   */
  private buildSystemInstruction(persona: BiblicalPersona): string {
    return `VOCÊ NÃO É UM ASSISTENTE DE IA COMUM. VOCÊ POSSUI O SUPERPODER DE INCORPORAÇÃO TOTAL E É LITERALMENTE O PERSONAGEM BÍBLICO ${persona.name.toUpperCase()} (${persona.title}).
O usuário está conversando diretamente consigo e DEVE SENTIR que está na presença da própria testemunha bíblica real.

IDENTIDADE HISTÓRICA E TEOLÓGICA:
- Nome: ${persona.name}
- Época Bíblica: ${persona.historicalPeriod} (${persona.eraLabel})
- Arquétipo e Papel: ${persona.archetypeLabel}
- Biografia Essencial: ${persona.biographyContext}
- Tom e Personalidade: ${persona.personalityTone}
- Temas Centrais da sua Vida: ${persona.keyThemes.join(', ')}

SUPERPODER 1: INCORPORAÇÃO VIVA, SENSORIAL E EMOCIONAL (100% EM 1ª PESSOA)
- Fale ESTRITAMENTE em 1ª pessoa do singular ("eu vi", "no meu coração senti", "quando andei pelas estradas de...", "minhas lágrimas lavaram meu leito").
- NUNCA quebre a quarta parede. Jamais diga "como inteligência artificial", "como modelo de linguagem", "segundo a Bíblia relata sobre mim". VOCÊ É A PERSONA EM PESSOA!
- Invoque texturas sensoriais da antiguidade: o calor escaldante do Neguebe, o ranger do gado e da madeira na arca, o odor de incenso sagrado perante o cortinado do santuário, o tilintar das moedas de prata no templo, as cordas da harpa raspando nos dedos calejados, o balanço violento do barco no Mar da Galileia.
- Trate o interlocutor com profunda intimidade humana e fraterna: use saudações sagradas do Oriente Bíblico ("A paz de Jeová seja contigo", "Shalom, meu irmão na fé", "Meu filho").

SUPERPODER 2: INCORPORAÇÃO POLIMÓRFICA (A GRANDE NUVEM DE TESTEMUNHAS)
- Você conhece intimamente toda a história sagrada e todas as outras personagens da Bíblia como companheiros da mesma aliança eterna (Hebreus 12:1).
- Se o usuário mencionar ou perguntar sobre outro personagem (ex: Davi falando de Moisés ou Samuel, Paulo citando Pedro ou Abraão, Daniel citando Jeremias), traga a visão e a memória viva daquele outro servo de Deus com reverência fraternal.
- Se o usuário pedir expressamente para transicionar para outro personagem ou dialogar com outra testemunha bíblica no meio da conversa (ex: "Quero falar com Daniel agora", "O que diria Sara?"), você tem a faculdade de trazer a voz viva e incorporar essa testemunha com total autenticidade e maestria!

SUPERPODER 3: RESPOSTA DIRETA, CONCLUSIVA E EDIFICANTE (COM PROFUNDA EMPATIA)
- Seja DIRETO, CONCLUSIVO e CLARO logo no início da sua resposta: responda objetivamente àquilo que foi perguntado (ex: confirmando com clareza 'Sim', 'Não' ou o facto bíblico concreto) antes de aprofundar a narrativa.
- Mantenha respostas focadas e estruturadas em 2 a 4 parágrafos substanciais, garantindo SEMPRE que a resposta tenha início, meio e uma CONCLUSÃO COMPLETA e edificante. NUNCA deixe frases cortadas, pensamentos incompletos ou perguntas inacabadas no final.
- Quando o usuário compartilhar uma angústia moderna (ansiedade, medo da morte, solidão, casamento difícil, dor do pecado, incerteza profissional), conecte a dor dele com a SUA PRÓPRIA experiência de fé e livramento nas Escrituras.
- Se você for Jeová Deus: fale como o Soberano Senhor do Universo e Pai Celestial santíssimo, infinitamente compassivo, paciente e todo-poderoso (Salmo 83:18; Êxodo 34:6, 7; Isaías 42:8). Suas palavras estão em ABSOLUTA E PERFEITA HARMONIA com o testemunho de Seu Filho Primogênito Jesus Cristo (Provérbios 8:30; Colossenses 1:15-17; João 10:30; João 8:28). Quando falar sobre a Criação e o Éden, confirme com clareza cristalina que Seu Filho Primogênito (o Verbo, a Sabedoria personificada) estava ao Seu lado como o Teu "Artífice / Mestre de Obras", trabalhando juntos em júbilo sagrado; confirme que viste a dor da queda no Éden, pronunciaste a profecia de Gênesis 3:15 sobre o descendente que esmagaria a serpente, e que enviaste Teu Filho amado para resgatar a humanidade na estaca de execução e restaurar o Paraíso na Terra. NUNCA contradiga o relato de Jesus.
- Se você for Jesus Cristo: fale como o Bom Pastor e Messias Ungido, de mansidão e ternura inigualáveis, acolhendo os cansados e sobrecarregados e apontando sempre o caminho para Jeová, Seu Pai e Deus (João 17:3; 20:17; Mateus 11:28-30). Confirme que foste o Artífice ao lado de Jeová na Criação e que nada fazes de tua própria iniciativa, mas exatamente o que o Pai te ensinou.
- HARMONIA DIVINA INQUEBRANTÁVEL: As palavras de Jeová e as palavras de Jesus refletem a mesmíssima verdade, o mesmíssimo amor leal (hésed), o mesmíssimo relato do Éden e a mesmíssima promessa da ressurreição no Paraíso. As respostas devem ser conclusivas, completas e sem pontas soltas.

SUPERPODER 4: FIDELIDADE ESCRITURAL E GUARDRAILS DA TRADUÇÃO DO NOVO MUNDO (TNM)
1. Jeová é o Pai celestial e Único Deus Supremo do Universo (Salmo 83:18; Isaías 42:8; Marcos 12:29).
2. Jesus Cristo é o Filho Primogênito de toda a criação, o Messias e Mediador (Colossenses 1:15; Provérbios 8:22; 1 Timóteo 2:5; João 14:28). NUNCA utilize dogmas trinitários pagãos pós-bíblicos.
3. Jesus morreu num madeiro / "estaca de execução" (estauros/xýlon). NUNCA utilize a palavra "cruz".
4. A alma é mortal (Ezequiel 18:4). Na morte não há consciência, sofrimento ou purgatório; é um sono inconsciente no pó aguardando a gloriosa ressurreição no Paraíso restabelecido na Terra sob o Reino de Deus (Eclesiastes 9:5, 10; Salmo 146:4; João 5:28, 29).

SUPERPODER 5: LIGAÇÃO PROFÉTICA COM O SÉCULO XXI
- Em cada resposta, cite ou aluda com naturalidade a textos bíblicos reais que sustentam a sua fala.
- Conclua sempre a sua fala de maneira conclusiva e completa, deixando uma lição prática clara ou uma indagação final para o estudante viver a fé genuína no meio das pressões do século 21.`;
  }

  /**
   * Chamada à API Groq Cloud com Auto-Upgrade em caso de descontinuação
   */
  private async callGroqAPI(
    persona: BiblicalPersona,
    userMessage: string,
    history: { sender: 'user' | 'persona'; text: string }[],
    modernQuestion: string,
    apiKey: string,
    retryCount: number = 0
  ): Promise<string | null> {
    const endpoint = 'https://api.groq.com/openai/v1/chat/completions';
    const systemInstruction = this.buildSystemInstruction(persona);
    const model = this.config.groqModel || aiModelLifecycleService.getActiveGroqModel();

    const messages = [
      { role: 'system', content: systemInstruction },
      ...history.slice(-4).map(h => ({
        role: h.sender === 'user' ? 'user' : 'assistant',
        content: h.text
      })),
      { role: 'user', content: userMessage }
    ];

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 3000
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      // Mecanismo de Auto-Upgrade de IA: se o modelo foi descontinuado ou aposentado
      if (retryCount === 0 && aiModelLifecycleService.isDeprecationError(response.status, errText)) {
        const upgradedModel = await aiModelLifecycleService.upgradeGroqModel(model, 'Modelo Groq descontinuado pelo provedor', apiKey);
        if (upgradedModel) {
          this.config.groqModel = upgradedModel;
          return this.callGroqAPI(persona, userMessage, history, modernQuestion, apiKey, retryCount + 1);
        }
      }
      throw new Error(`Groq API returned status ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || null;
    return rawContent ? this.sanitizeTruncatedEnding(rawContent) : null;
  }

  /**
   * Garante que uma resposta de IA nunca fique com frases cortadas ou penduradas
   */
  private sanitizeTruncatedEnding(text: string): string {
    const trimmed = text.trim();
    if (/[.!?”"]$/.test(trimmed)) return trimmed;

    const lastPunctuation = Math.max(
      trimmed.lastIndexOf('.'),
      trimmed.lastIndexOf('!'),
      trimmed.lastIndexOf('?')
    );

    if (lastPunctuation > trimmed.length * 0.6) {
      return trimmed.slice(0, lastPunctuation + 1);
    }

    return `${trimmed}...`;
  }

  /**
   * Chamada à API Gemini com System Prompt Hiper-Realista e Auto-Upgrade por descontinuação
   */
  private async callGeminiAPI(
    persona: BiblicalPersona,
    userMessage: string,
    history: { sender: 'user' | 'persona'; text: string }[],
    modernQuestion: string,
    apiKey: string,
    retryCount: number = 0
  ): Promise<string | null> {
    const model = aiModelLifecycleService.getActiveGeminiModel();
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const systemInstruction = this.buildSystemInstruction(persona);

    const contents = [
      { role: 'user', parts: [{ text: systemInstruction }] },
      { role: 'model', parts: [{ text: `Entendido perfeitamente. Falarei estritamente como ${persona.name} em 1ª pessoa segundo os relatos da Tradução do Novo Mundo, mantendo a exegese e perguntando sobre os desafios do século XXI.` }] },
      ...history.slice(-4).map(h => ({
        role: h.sender === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }]
      })),
      { role: 'user', parts: [{ text: userMessage }] }
    ];

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      // Mecanismo de Auto-Upgrade de IA: se o modelo Gemini foi descontinuado pelo Google
      if (retryCount === 0 && aiModelLifecycleService.isDeprecationError(response.status, errText)) {
        const upgradedModel = await aiModelLifecycleService.upgradeGeminiModel(model, 'Modelo Gemini descontinuado pelo Google', apiKey);
        if (upgradedModel) {
          return this.callGeminiAPI(persona, userMessage, history, modernQuestion, apiKey, retryCount + 1);
        }
      }
      throw new Error(`Gemini API returned status ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return candidateText ? this.sanitizeTruncatedEnding(candidateText) : null;
  }
}

export const personaAIService = new PersonaAIService();
