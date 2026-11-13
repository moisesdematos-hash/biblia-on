// src/components/tutor/AdaptiveTutor.tsx
import React, { useState } from 'react';
import { Sparkles, Brain, RotateCcw, Check, HelpCircle, Layers, ArrowRight } from 'lucide-react';
import { FLASHCARDS_DATA, type Flashcard } from '../../data/flashcardsData';

export const AdaptiveTutor: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'tutor' | 'flashcards'>('tutor');

  // Estados do Tutor Adaptativo
  const [selectedTopic, setSelectedTopic] = useState<'resgate' | 'soberania' | 'alma' | 'reino'>('resgate');
  const [comprehensionLevel, setComprehensionLevel] = useState<number>(1); // 1 = Básico/Analogia, 2 = Exegético, 3 = Teológico Completo

  // Estados dos Flashcards
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardsLearned, setCardsLearned] = useState<string[]>([]);

  const currentCard = FLASHCARDS_DATA[currentCardIndex];

  // Conteúdos adaptativos multinível
  const adaptiveTopics = {
    resgate: {
      title: 'O Resgate de Jesus Cristo (Correspondência Perfeita)',
      level1: {
        heading: 'Nível 1: A Analogia da Dívida e do Resgate',
        text: 'Imagina que um pai de família acumulou uma dívida imensa numa mina e faliu, tornando escravos todos os seus filhos que nasceram depois. Eles não têm dinheiro para se libertar. Então, um benfeitor rico e bondoso chega e paga a dívida exata centavo por centavo, libertando todos os filhos da escravidão. Adão vendeu a humanidade ao pecado e à morte; Jesus pagou o preço exato com a sua vida humana perfeita para nos libertar.',
        scriptures: ['Mateus 20:28', 'Romanos 5:12']
      },
      level2: {
        heading: 'Nível 2: O Princípio Jurídico da Correspondência',
        text: 'A Lei de Deus exige estrita justiça equitativa: "vida por vida" (Êxodo 21:23). Adão era um homem perfeito de carne e sangue quando pecou no Éden e perdeu a vida perfeita para si e para os seus descendentes. Nenhum humano imperfeito podia pagar o preço. Por isso, o Filho de Deus despiu-se da sua glória espiritual, nasceu como um ser humano perfeito de carne e sangue e ofereceu a sua vida como um "resgate correspondente" (antílytron em 1 Timóteo 2:6).',
        scriptures: ['1 Timóteo 2:5, 6', '1 Coríntios 15:45']
      },
      level3: {
        heading: 'Nível 3: Exegese e Fundamentação nas Línguas Originais',
        text: 'O termo grego antílytron combina antí (correspondência simétrica, face a face) com lýtron (preço de libertação). O resgate não foi pago a Satanás, mas satisfez a majestade da justiça divina universal de Jeová. Jesus não era o Deus Todo-Poderoso (caso contrário não haveria correspondência com o homem finito Adão), mas sim o homem perfeito gerado pelo espírito de Deus.',
        scriptures: ['Hebreus 9:11-14', 'Salmos 49:7-9']
      }
    },
    soberania: {
      title: 'A Questão Universal da Soberania Divina',
      level1: {
        heading: 'Nível 1: A Analogia do Professor e do Aluno',
        text: 'Se um aluno arrogante afirmar na sala de aula que o professor não sabe ensinar e que ele tem um método muito melhor, o que deve fazer um bom professor? Se expulsar o aluno imediatamente pela força, os outros alunos podem pensar que o rebelde talvez tivesse razão. O professor permite que o aluno vá ao quadro e tente resolver o problema. Com o tempo, a incompetência do aluno fica evidente para toda a turma. Satanás desafiou o direito de Deus governar; o tempo provou que os humanos não conseguem dirigir os próprios passos com justiça.',
        scriptures: ['Gênesis 3:1-5', 'Jeremias 10:23']
      },
      level2: {
        heading: 'Nível 2: As Duas Questões do Éden e de Jó',
        text: 'No Éden foi questionada a legitimidade e a bondade da soberania de Jeová: "Será que Deus realmente disse?". Mais tarde, no livro de Jó, Satanás levantou uma segunda questão íntima: a integridade do ser humano. Ele alegou que as pessoas só servem a Deus por interesse material egoísta (Jó 1:9-11; 2:4). A integridade inabalável de Jesus na estaca de execução e a fidelidade dos crentes desmentem categoricamente essa calúnia.',
        scriptures: ['Jó 1:9-11', 'Provérbios 27:11']
      },
      level3: {
        heading: 'Nível 3: Vindicação da Santidade do Nome Divino',
        text: 'A salvação humana é vital, mas o tema primordial de todas as Escrituras é a vindicação da soberania de Jeová e a santificação do Seu santo nome perante todas as miríades de anjos e humanos. A permissão do mal é temporária e atua como precedente jurídico cósmico irrevogável para a eternidade.',
        scriptures: ['Ezequiel 38:23', 'Mateus 6:9']
      }
    },
    alma: {
      title: 'A Mortalidade da Alma e o Estado dos Mortos',
      level1: {
        heading: 'Nível 1: O Que É Uma Alma?',
        text: 'A Bíblia não diz que tu tens uma alma invisível dentro de ti que sai quando morres. A Bíblia diz que TU ÉS a alma! Gênesis 2:7 diz que Deus soprou o fôlego nas narinas do homem e "o homem tornou-se uma alma vivente". Assim como juntar farinha e água faz a massa de pão, o corpo e o fôlego juntos formam a alma.',
        scriptures: ['Gênesis 2:7', 'Ezequiel 18:4']
      },
      level2: {
        heading: 'Nível 2: O Sono Inconsciente da Sepultura',
        text: 'Quando uma pessoa falece, os seus pensamentos cessam de imediato (Salmo 146:4). Ela não está no céu nem a queimar num inferno de fogo; está a dormir no pó do solo, sem consciência de nada (Eclesiastes 9:5, 10). Jesus comparou a morte de seu amigo Lázaro a um sono do qual ele o foi acordar.',
        scriptures: ['Eclesiastes 9:5, 10', 'João 11:11-14']
      },
      level3: {
        heading: 'Nível 3: Análise Léxica de Néphesh, Psykhē e Sheol',
        text: 'Nenhum dos 754 usos de néphesh nas Escrituras Hebraicas ou 102 usos de psykhē nas Escrituras Gregas qualifica a alma como imortal (athanasía). Pelo contrário, a Escritura diz repetidamente que as almas morrem, são destruídas ou devoradas (Levítico 23:30; Tiago 5:20). A imortalidade é uma dádiva que Deus concede unicamente aos fiéis na ressurreição.',
        scriptures: ['1 Coríntios 15:53', 'Romanos 2:7']
      }
    },
    reino: {
      title: 'O Reino de Deus Estabelecido nos Céus',
      level1: {
        heading: 'Nível 1: Um Governo Real com um Rei Justo',
        text: 'O Reino de Deus não é apenas um sentimento bom no coração. É um governo real de verdade, com um Rei celestial perfeito (Jesus Cristo), leis justas baseadas no amor e cidadãos obedientes em toda a Terra.',
        scriptures: ['Isaías 9:6, 7', 'Mateus 6:10']
      },
      level2: {
        heading: 'Nível 2: Substituição de Todos os Governos Humanos',
        text: 'Daniel 2:44 garante que este Reino celestial esmiuçará e porá fim a todos os impérios e sistemas opressores humanos, permanecendo inabalável para sempre. Não haverá mais corrupção, pobreza, guerras ou fronteiras divididas.',
        scriptures: ['Daniel 2:44', 'Apocalipse 11:15']
      },
      level3: {
        heading: 'Nível 3: O Julgamento Milenar e a Restauração da Terra',
        text: 'Durante o Reinado Milenar de Cristo, a Terra será gradualmente restaurada ao padrão do Éden, a morte herdada de Adão será eliminada e os túmulos serão esvaziados pela ressurreição. No final dos mil anos, Jesus entregará com humildade o Reino submetido ao seu Deus e Pai.',
        scriptures: ['1 Coríntios 15:24-28', 'Apocalipse 20:1-6']
      }
    }
  };

  const currentTopicData = adaptiveTopics[selectedTopic];

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = (markLearned: boolean) => {
    if (markLearned && !cardsLearned.includes(currentCard.id)) {
      setCardsLearned([...cardsLearned, currentCard.id]);
    }
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % FLASHCARDS_DATA.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
            <Brain className="w-4 h-4" />
            <span>Professor Bíblico Adaptativo & Memorização Espaçada</span>
          </div>
          <h1 className="font-title text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Ensino Adaptativo & Flashcards
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Aprende no teu próprio ritmo. Se tiveres dúvidas, o professor adapta a explicação com analogias progressivas.
          </p>
        </div>

        {/* Alternador de Modo */}
        <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 text-xs">
          <button
            onClick={() => setActiveMode('tutor')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg font-semibold transition-all ${
              activeMode === 'tutor'
                ? 'bg-[#1E3E62] text-[#D4AF37] shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Ensina-me até Eu Compreender</span>
          </button>
          <button
            onClick={() => setActiveMode('flashcards')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg font-semibold transition-all ${
              activeMode === 'flashcards'
                ? 'bg-[#1E3E62] text-[#D4AF37] shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Flashcards ({cardsLearned.length}/{FLASHCARDS_DATA.length})</span>
          </button>
        </div>
      </div>

      {activeMode === 'tutor' ? (
        /* MODO PROFESSOR ADAPTATIVO */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Seletor de Tópicos */}
          <div className="lg:col-span-1 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Conceitos Fundamentais
            </h2>
            {[
              { id: 'resgate', label: 'O Resgate de Cristo' },
              { id: 'soberania', label: 'A Questão da Soberania' },
              { id: 'alma', label: 'A Alma e os Mortos' },
              { id: 'reino', label: 'O Reino Celestial' },
            ].map(top => (
              <button
                key={top.id}
                onClick={() => {
                  setSelectedTopic(top.id as any);
                  setComprehensionLevel(1);
                }}
                className={`w-full text-left p-3.5 rounded-xl text-xs transition-all font-semibold ${
                  selectedTopic === top.id
                    ? 'bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/50 shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                {top.label}
              </button>
            ))}
          </div>

          {/* Painel da Explicação Adaptativa */}
          <div className="lg:col-span-3 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <span className="text-xs font-mono text-[#D4AF37] uppercase font-bold block mb-1">
                PROGRESSÃO DIDÁTICA: NÍVEL {comprehensionLevel} DE 3
              </span>
              <h2 className="font-title text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {currentTopicData.title}
              </h2>
            </div>

            {/* Conteúdo do Nível Selecionado */}
            <div className="space-y-4">
              {comprehensionLevel === 1 && (
                <div className="p-5 rounded-2xl bg-amber-50 dark:bg-[#1E3E62]/30 border border-amber-200 dark:border-amber-900/40 space-y-3">
                  <h3 className="font-bold text-sm text-amber-800 dark:text-[#D4AF37]">
                    {currentTopicData.level1.heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    {currentTopicData.level1.text}
                  </p>
                  <div className="pt-2 text-xs font-mono text-[#D4AF37]">
                    Textos de Apoio: {currentTopicData.level1.scriptures.join('; ')}
                  </div>
                </div>
              )}

              {comprehensionLevel === 2 && (
                <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 space-y-3">
                  <h3 className="font-bold text-sm text-blue-800 dark:text-blue-300">
                    {currentTopicData.level2.heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    {currentTopicData.level2.text}
                  </p>
                  <div className="pt-2 text-xs font-mono text-[#D4AF37]">
                    Textos de Apoio: {currentTopicData.level2.scriptures.join('; ')}
                  </div>
                </div>
              )}

              {comprehensionLevel === 3 && (
                <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-3">
                  <h3 className="font-bold text-sm text-emerald-800 dark:text-emerald-300">
                    {currentTopicData.level3.heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    {currentTopicData.level3.text}
                  </p>
                  <div className="pt-2 text-xs font-mono text-[#D4AF37]">
                    Textos de Apoio: {currentTopicData.level3.scriptures.join('; ')}
                  </div>
                </div>
              )}
            </div>

            {/* Controles Adaptativos do Aluno */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Como avalias a tua compreensão deste ponto?
              </span>

              <div className="flex items-center space-x-2">
                <button
                  disabled={comprehensionLevel <= 1}
                  onClick={() => setComprehensionLevel(prev => Math.max(1, prev - 1))}
                  className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold disabled:opacity-40 hover:bg-slate-300"
                >
                  ← Simplificar Mais
                </button>
                <button
                  disabled={comprehensionLevel >= 3}
                  onClick={() => setComprehensionLevel(prev => Math.min(3, prev + 1))}
                  className="flex items-center space-x-1 px-4 py-1.5 rounded-lg bg-[#1E3E62] text-[#D4AF37] text-xs font-semibold disabled:opacity-40 hover:bg-[#1E3E62]/80 border border-[#D4AF37]/40 shadow-xs"
                >
                  <span>Aprofundar Explicação</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* MODO FLASHCARDS COM REPETIÇÃO ESPAÇADA */
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Categoria: <strong className="text-[#D4AF37]">{currentCard.category}</strong></span>
            <span>Cartão {currentCardIndex + 1} de {FLASHCARDS_DATA.length}</span>
          </div>

          {/* Cartão com Efeito de Virar */}
          <div
            onClick={handleFlipCard}
            className={`min-h-[280px] p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-xl ${
              isFlipped
                ? 'bg-[#1E3E62] border-[#D4AF37] text-white'
                : 'bg-white dark:bg-[#0B192C] border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:border-[#D4AF37]'
            }`}
          >
            <div>
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-wider block mb-2">
                {isFlipped ? 'RESPOSTA & EXEGESE BÍBLICA' : 'CONCEITO / PERGUNTA'}
              </span>
              <p className="font-serif text-lg sm:text-xl font-bold leading-relaxed">
                {isFlipped ? currentCard.back : currentCard.front}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs">
              <span className="font-mono text-[#D4AF37]">{currentCard.scriptureReference}</span>
              <span className="text-[11px] text-slate-400">Clica para virar ↺</span>
            </div>
          </div>

          {/* Botões de Avaliação da Repetição Espaçada */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleNextCard(false)}
              className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700"
            >
              Revisar Depois
            </button>
            <button
              onClick={() => handleNextCard(true)}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-xs font-semibold hover:opacity-95 shadow-md flex items-center justify-center space-x-1"
            >
              <Check className="w-4 h-4" />
              <span>Já Sei / Memorizado</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
