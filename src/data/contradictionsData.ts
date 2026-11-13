// src/data/contradictionsData.ts
import type { ApparentContradiction } from '../types';

export const CONTRADICTIONS_DATA: ApparentContradiction[] = [
  {
    id: 'criacao_ordem',
    title: 'A Ordem da Criação: Gênesis 1 vs. Gênesis 2',
    passages: [
      {
        reference: 'Gênesis 1:24-27',
        text: 'Criação dos animais terrestres seguida pela criação do homem e da mulher no sexto período criativo.',
        context: 'Visão panorâmica e cronológica cósmica de toda a criação em 6 "dias" épocas.'
      },
      {
        reference: 'Gênesis 2:7, 19',
        text: 'Menciona a formação do homem, e em seguida refere que Jeová formou os animais do solo e os trouxe a Adão para dar nomes.',
        context: 'Foco temático detalhado na experiência humana no jardim do Éden.'
      }
    ],
    challengeExplanation: 'Críticos argumentam que Gênesis 2 descreveria o homem sendo criado antes dos animais, ao passo que Gênesis 1 coloca os animais terrestres antes do homem.',
    harmonizationPrinciples: [
      'Gênesis 1 é um relato cronológico abrangente de toda a preparação da Terra.',
      'Gênesis 2 é um relato temático complementar e focado na relação do homem com o seu ambiente imediato no Éden.',
      'A gramática hebraica do verbo em Gênesis 2:19 ("wayyitser") admite a tradução no pretérito-mais-que-perfeito: "E Jeová Deus havia formado do solo..." ou "havia estado a formar".'
    ],
    contextualAnalysis: 'Moisés, autor de ambos os capítulos sob inspiração, não estava escrevendo duas cosmologias conflitantes, mas primeiro estabelecendo a ordem global dos fatos (cap. 1) e em seguida dando um zoom nos detalhes da criação do casal humano e das suas responsabilidades (cap. 2).',
    honestUncertainties: 'A língua hebraica bíblica não possui tempos verbais no sentido indo-europeu estrito, mas aspectos (perfeito e imperfeito), dependendo o pretérito exato do contexto literário imediato.'
  },
  {
    id: 'inscricao_estaca',
    title: 'A Inscrição na Estaca de Execução de Jesus',
    passages: [
      {
        reference: 'Mateus 27:37',
        text: '"Este é Jesus, o Rei dos judeus."',
        context: 'Evangelho escrito primariamente para judeus.'
      },
      {
        reference: 'Marcos 15:26',
        text: '"O Rei dos judeus."',
        context: 'Evangelho sucinto escrito para romanos.'
      },
      {
        reference: 'Lucas 23:38',
        text: '"Este é o Rei dos judeus."',
        context: 'Escrito por médico detalhista para leitores gregos.'
      },
      {
        reference: 'João 19:19',
        text: '"Jesus, o Nazareno, o Rei dos judeus."',
        context: 'Escrito por testemunha ocular presencial direta.'
      }
    ],
    challengeExplanation: 'Nenhum dos quatro evangelistas usa exatamente as mesmas palavras literais para o título afixado na estaca de execução.',
    harmonizationPrinciples: [
      'A própria Escritura explica que a inscrição foi redigida em três idiomas oficiais: hebraico, latim e grego (João 19:20).',
      'Cada evangelista citou o cerne essencial da acusação judicial ("O Rei dos judeus") ou traduziu com ênfase para o seu público.',
      'A testemunha ocular João registrou a versão completa do hebraico ou latim oficial ("Jesus, o Nazareno, o Rei dos judeus").'
    ],
    contextualAnalysis: 'Diferenças de formulação entre testemunhas honestas reforçam a autenticidade e a ausência de conluio forçado, preservando o significado idêntico do título legal imputado por Pilatos.',
    honestUncertainties: 'Não possuímos o documento físico original de madeira preservado, pelo que a correspondência exata de qual idioma cada evangelista traduziu diretamente permanece uma inferência provável.'
  },
  {
    id: 'genealogias_jesus',
    title: 'As Duas Genealogias de Jesus: Mateus 1 vs. Lucas 3',
    passages: [
      {
        reference: 'Mateus 1:1-16',
        text: 'Traça a linhagem de Abraão até Jesus por meio de Salomão, terminando em: "Jacó gerou José, o marido de Maria, da qual nasceu Jesus."',
        context: 'Genealogia legal e régia ao trono de David.'
      },
      {
        reference: 'Lucas 3:23-38',
        text: 'Traça a linhagem retrocedendo de Jesus até Adão por meio de Natã (outro filho de David), dizendo: "Jesus... sendo, como se cria, filho de José, filho de Heli..."',
        context: 'Genealogia biológica e natural pelo ramo materno.'
      }
    ],
    challengeExplanation: 'Mateus diz que o pai de José era Jacó, ao passo que Lucas declara que José era "filho de Heli", e os nomes entre David e Jesus são quase todos distintos.',
    harmonizationPrinciples: [
      'Mateus estabelece a sucessão legal ao trono de Judá através da linhagem de Salomão e José (pai legal/adotivo de Jesus).',
      'Lucas estabelece a ascendência sanguínea real de Jesus através de Natã e de sua mãe Maria.',
      'Heli era o pai biológico de Maria; na tradição jurídica judaica sem filhos homens para herança ou no registro genealógico de genros, José era contado como "filho" (isto é, genro) de Heli.'
    ],
    contextualAnalysis: 'Deste modo, Jesus tinha direito duplo inquestionável ao trono davídico: direito legal como filho primogênito adotivo de José e direito de linhagem carnal como descendente direto de David pelo ventre de Maria.',
    honestUncertainties: 'O Talmude de Jerusalém (Chagigah 77d) refere-se explicitamente a Maria como filha de Heli, corroborando o entendimento preservado historicamente pela antiguidade cristã.'
  }
];
