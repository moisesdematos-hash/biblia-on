// src/data/quizzesData.ts
import type { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'Personagens',
    question: 'Quem era rei de Salém e sacerdote do Deus Altíssimo nos dias de Abraão?',
    options: ['Melquisedeque', 'Moisés', 'Aarão', 'Ninrode'],
    correctOptionIndex: 0,
    explanation: 'Melquisedeque era simultaneamente rei de Salém e sacerdote do Deus Altíssimo (Gênesis 14:18; Hebreus 7:1).',
    scriptureReference: 'Gênesis 14:18-20'
  },
  {
    id: 'q2',
    category: 'Doutrinas e Ensinamentos',
    question: 'De acordo com Eclesiastes 9:5, qual é a condição dos mortos?',
    options: [
      'Estão vivos num reino espiritual superior',
      'Estão a sofrer num inferno de fogo',
      'Não sabem absolutamente nada e não têm consciência',
      'Estão a reencarnar noutro corpo'
    ],
    correctOptionIndex: 2,
    explanation: 'Eclesiastes 9:5 declara cristalinamente que "os vivos sabem que hão de morrer, mas os mortos não sabem absolutamente nada".',
    scriptureReference: 'Eclesiastes 9:5, 10'
  },
  {
    id: 'q3',
    category: 'Profecias',
    question: 'Em que cidade profetizou Miqueias que nasceria o futuro Governante de Israel?',
    options: ['Jerusalém', 'Belém Efrata', 'Nazaré', 'Damasco'],
    correctOptionIndex: 1,
    explanation: 'Miqueias 5:2 profetizou especificamente que o Messias procederia de Belém Efrata da Judeia.',
    scriptureReference: 'Miqueias 5:2; Mateus 2:5, 6'
  },
  {
    id: 'q4',
    category: 'Línguas Originais',
    question: 'Qual é o sentido original da palavra grega staurós no primeiro século?',
    options: [
      'Uma cruz com barra transversal romana',
      'Uma estaca vertical ou poste reto',
      'Um amuleto místico',
      'Um templo pagão'
    ],
    correctOptionIndex: 1,
    explanation: 'No grego clássico e koiné bíblico, staurós significa primariamente uma estaca ou viga ereta sem barra transversal.',
    scriptureReference: 'Mateus 27:32; Gálatas 3:13'
  },
  {
    id: 'q5',
    category: 'Relação entre Daniel e Apocalipse',
    question: 'No sonho da estátua de Daniel 2, o que representa a pedra cortada sem mãos que esmiúça a estátua?',
    options: [
      'Um império militar humano',
      'O Reino de Deus que durará para sempre',
      'A Liga das Nações',
      'Uma catástrofe meteorológica'
    ],
    correctOptionIndex: 1,
    explanation: 'Daniel 2:44 explica que a pedra é o Reino estabelecido pelo Deus do céu, que nunca será destruído e substituirá todos os reinos humanos.',
    scriptureReference: 'Daniel 2:44; Apocalipse 11:15'
  },
  {
    id: 'q6',
    category: 'Doutrinas e Ensinamentos',
    question: 'Segundo 1 Coríntios 8:6 e João 17:3, quem é o único Deus verdadeiro?',
    options: [
      'Uma Trindade de três pessoas iguais e coeternas',
      'O Pai, Jeová, de quem procedem todas as coisas',
      'Jesus Cristo juntamente com o espírito santo',
      'O arcanjo Miguel'
    ],
    correctOptionIndex: 1,
    explanation: 'Paulo afirma: "Para nós há realmente um só Deus, o Pai, de quem procedem todas as coisas... e um só Senhor, Jesus Cristo" (1 Co 8:6).',
    scriptureReference: '1 Coríntios 8:6; João 17:3'
  },
  {
    id: 'q7',
    category: 'Personagens',
    question: 'Que profetisa e juíza de Israel convocou Baraque para libertar o povo do general Sísera?',
    options: ['Débora', 'Miriam', 'Hulda', 'Rute'],
    correctOptionIndex: 0,
    explanation: 'Débora julgava Israel debaixo de uma palmeira e convocou Baraque para a batalha em monte Tabor (Juízes 4:4-9).',
    scriptureReference: 'Juízes 4:4-9'
  },
  {
    id: 'q8',
    category: 'Línguas Originais',
    question: 'Qual é o significado profundo do termo hebraico hésed (חֶסֶד) aplicado a Deus?',
    options: [
      'Severidade e castigo rigoroso',
      'Amor leal, apego amoroso e fidelidade eterna',
      'Riqueza material abundante',
      'Sacrifício cerimonial de animais'
    ],
    correctOptionIndex: 1,
    explanation: 'Hésed expressa o amor leal inabalável fundamentado em compromisso, integridade e fidelidade de pacto.',
    scriptureReference: 'Salmo 136:1; Êxodo 34:6'
  },
  {
    id: 'q9',
    category: 'Profecias',
    question: 'Qual foi a primeira profecia messiânica de toda a Bíblia (o Protoevangelho)?',
    options: [
      'Gênesis 3:15 (a semente da mulher machucará a cabeça da serpente)',
      'Isaías 53:5 (ele foi traspassado pelas nossas transgressões)',
      'Salmo 22:1 (Deus meu, porque me abandonaste?)',
      'Daniel 9:24 (as 70 semanas de anos)'
    ],
    correctOptionIndex: 0,
    explanation: 'Em Gênesis 3:15, Deus profetizou que o descendente da mulher machucaria a cabeça da serpente original.',
    scriptureReference: 'Gênesis 3:15; Romanos 16:20'
  },
  {
    id: 'q10',
    category: 'Geografia Bíblica',
    question: 'Em que ilha estava exilado o apóstolo João quando recebeu as visões de Apocalipse?',
    options: ['Creta', 'Chipre', 'Patmos', 'Malta'],
    correctOptionIndex: 2,
    explanation: 'Apocalipse 1:9 afirma: "Eu, João... achei-me na ilha chamada Patmos por ter falado sobre Deus e dado testemunho de Jesus."',
    scriptureReference: 'Apocalipse 1:9'
  },
  {
    id: 'q11',
    category: 'Doutrinas e Ensinamentos',
    question: 'Em Gênesis 2:7, o que aconteceu quando Deus soprou nas narinas do homem o fôlego de vida?',
    options: [
      'O homem recebeu uma alma imortal independente',
      'O homem tornou-se uma alma vivente (néfesh)',
      'A alma do homem separou-se do corpo',
      'O homem foi elevado à categoria angelical'
    ],
    correctOptionIndex: 1,
    explanation: 'A Bíblia diz que o homem "tornou-se uma alma vivente" (ele é uma alma), desmistificando a ideia pagã de posse de uma alma imortal.',
    scriptureReference: 'Gênesis 2:7; 1 Coríntios 15:45'
  },
  {
    id: 'q12',
    category: 'Personagens',
    question: 'Quem desceu à eira de Boaz em Belém durante a respiga da cevada e pediu para ser resgatada?',
    options: ['Rute', 'Orfa', 'Tamar', 'Bate-Seba'],
    correctOptionIndex: 0,
    explanation: 'Rute, a moabita leal, deitou-se aos pés de Boaz como sinal humilde de pedido de resgate segundo a lei do levirato.',
    scriptureReference: 'Rute 3:1-9'
  },
  {
    id: 'q13',
    category: 'Arqueologia Bíblica',
    question: 'Que artefato de basalto negro do século IX a.C. contém a primeira menção extra-bíblica de "Jeová" e do rei Onri de Israel?',
    options: ['Prisma de Senaqueribe', 'A Pedra Moabita (Estela de Mesa)', 'O Cilindro de Ciro', 'O Código de Hamurabi'],
    correctOptionIndex: 1,
    explanation: 'A Pedra Moabita erguida pelo rei Mesa de Moabe menciona expressamente os "vasos de Jeová" e confirma 2 Reis 3.',
    scriptureReference: '2 Reis 3:4, 5'
  },
  {
    id: 'q14',
    category: 'Profecias',
    question: 'De acordo com Daniel 7:13, 14, quem se apresentou perante o "Antigo de Dias" para receber o Reino eterno?',
    options: ['O anjo Gabriel', 'Alguém parecido a um filho de homem (Jesus)', 'O rei Ciro da Pérsia', 'O profeta Daniel'],
    correctOptionIndex: 1,
    explanation: 'Jesus Cristo, o Filho do Homem, compareceu perante Jeová (o Antigo de Dias) para receber domínio, honra e reino.',
    scriptureReference: 'Daniel 7:13, 14; Mateus 28:18'
  },
  {
    id: 'q15',
    category: 'Línguas Originais',
    question: 'O que significa a palavra hebraica Shéol (שְׁאוֹל) e a sua correspondente grega Hádes (ᾅδης)?',
    options: [
      'Um lugar subterrâneo de tormento com chamas eternas',
      'A sepultura comum da humanidade no pó da terra',
      'O purgatório de purificação temporal',
      'O reino dos espíritos desencarnados'
    ],
    correctOptionIndex: 1,
    explanation: 'Nas Escrituras, Sheol e Hades referem-se à sepultura comum da humanidade onde não há atividade nem consciência.',
    scriptureReference: 'Salmo 16:10; Atos 2:31; Eclesiastes 9:10'
  },
  {
    id: 'q16',
    category: 'História Bíblica',
    question: 'Quantos dias e noites durou a chuva torrencial do Dilúvio nos dias de Noé?',
    options: ['7 dias e 7 noites', '40 dias e 40 noites', '150 dias e 150 noites', '120 dias'],
    correctOptionIndex: 1,
    explanation: 'Gênesis 7:12 registra que "a chuva torrencial caiu sobre a terra durante 40 dias e 40 noites".',
    scriptureReference: 'Gênesis 7:12'
  }
];
