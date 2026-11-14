// src/components/quizzes/QuizzesView.tsx
import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  Puzzle, 
  History, 
  MessageSquareQuote, 
  Binary, 
  Crown, 
  ShieldAlert, 
  Languages, 
  Compass, 
  TreePine, 
  Sparkles, 
  Gamepad2, 
  BookOpen, 
  ChevronLeft,
  Flame,
  Award,
  Play
} from 'lucide-react';

// Jogos
import { SpeedQuizGame } from './SpeedQuizGame';
import { GuessWhoGame } from './GuessWhoGame';
import { VerseBuilderGame } from './VerseBuilderGame';
import { TimelineGame } from './games/TimelineGame';
import { QuotesGame } from './games/QuotesGame';
import { BibleNumbersGame } from './games/BibleNumbersGame';
import { KingsGame } from './games/KingsGame';
import { SpiritualArmourGame } from './games/SpiritualArmourGame';
import { BibleAnimalsGame } from './games/BibleAnimalsGame';
import { ParablesGame } from './games/ParablesGame';
import { OriginalTermsGame } from './games/OriginalTermsGame';
import { BibleMapGame } from './games/BibleMapGame';
import { FruitOfSpiritGame } from './games/FruitOfSpiritGame';

export type GameId = 
  | 'speed_quiz'
  | 'guess_who'
  | 'verse_builder'
  | 'timeline'
  | 'quotes'
  | 'numbers'
  | 'kings'
  | 'armour'
  | 'animals'
  | 'parables'
  | 'original_terms'
  | 'bible_map'
  | 'fruit_of_spirit';

type GameCategory = 'todos' | 'velocidade' | 'historia' | 'linguagem' | 'enigmas';

interface GameDef {
  id: GameId;
  title: string;
  badge: string;
  category: GameCategory;
  icon: any;
  desc: string;
  gradient: string;
  accentColor: string;
  borderColor: string;
  component: React.FC;
}

export const QuizzesView: React.FC = () => {
  const [selectedGameId, setSelectedGameId] = useState<GameId | null>(null);
  const [activeCategory, setActiveCategory] = useState<GameCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const games: GameDef[] = [
    {
      id: 'speed_quiz',
      title: 'Super Quiz da Velocidade',
      badge: '⚡ 15s Countdown',
      category: 'velocidade',
      icon: Zap,
      desc: 'Perguntas cronometradas sob pressão, combos de fogo e 3 ajudas estratégicas.',
      gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
      accentColor: 'text-[#D4AF37]',
      borderColor: 'border-amber-500/40',
      component: SpeedQuizGame
    },
    {
      id: 'guess_who',
      title: 'Quem Sou Eu? (Detetive)',
      badge: '🕵️‍♂️ 4 Pistas',
      category: 'enigmas',
      icon: Search,
      desc: 'Descobre a personagem bíblica com o menor número de pistas e ganha mais pontos.',
      gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
      accentColor: 'text-blue-400',
      borderColor: 'border-blue-500/40',
      component: GuessWhoGame
    },
    {
      id: 'verse_builder',
      title: 'Construtor de Versículos',
      badge: '🧩 Memorização',
      category: 'linguagem',
      icon: Puzzle,
      desc: 'Monta versículos áureos da TNM bloco a bloco e ouve a locução bíblica.',
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      accentColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/40',
      component: VerseBuilderGame
    },
    {
      id: 'timeline',
      title: 'Linha do Tempo Bíblica',
      badge: '⏳ Cronologia',
      category: 'historia',
      icon: History,
      desc: 'Ordena acontecimentos sagrados na ordem cronológica exata do propósito divino.',
      gradient: 'from-amber-600/20 via-yellow-600/10 to-transparent',
      accentColor: 'text-amber-400',
      borderColor: 'border-amber-500/40',
      component: TimelineGame
    },
    {
      id: 'quotes',
      title: 'Quem Disse Isso?',
      badge: '💬 Citações',
      category: 'enigmas',
      icon: MessageSquareQuote,
      desc: 'Identifica a personagem que proferiu declarações marcantes na história sagrada.',
      gradient: 'from-indigo-500/20 via-purple-500/10 to-transparent',
      accentColor: 'text-indigo-400',
      borderColor: 'border-indigo-500/40',
      component: QuotesGame
    },
    {
      id: 'numbers',
      title: 'Números Sagrados',
      badge: '🔢 Curiosidades',
      category: 'enigmas',
      icon: Binary,
      desc: 'Testa a tua memória em números bíblicos: dias, espias, idades e medidas milagrosas.',
      gradient: 'from-teal-500/20 via-emerald-500/10 to-transparent',
      accentColor: 'text-teal-400',
      borderColor: 'border-teal-500/40',
      component: BibleNumbersGame
    },
    {
      id: 'kings',
      title: 'Reis: Bom ou Mau?',
      badge: '👑 Tribunal Real',
      category: 'historia',
      icon: Crown,
      desc: 'Julga rapidamente se o rei de Judá ou Israel fez o que era RETO ou MAU perante Jeová.',
      gradient: 'from-amber-500/20 via-red-500/10 to-transparent',
      accentColor: 'text-amber-500',
      borderColor: 'border-amber-500/40',
      component: KingsGame
    },
    {
      id: 'armour',
      title: 'Armadura Espiritual',
      badge: '🛡️ Efésios 6',
      category: 'velocidade',
      icon: ShieldAlert,
      desc: 'Defende-te dos dardos inflamáveis ativando a peça certa da Armadura Completa.',
      gradient: 'from-rose-500/20 via-orange-500/10 to-transparent',
      accentColor: 'text-rose-400',
      borderColor: 'border-rose-500/40',
      component: SpiritualArmourGame
    },
    {
      id: 'animals',
      title: 'Animais da Bíblia',
      badge: '🐾 Criação & Lições',
      category: 'enigmas',
      icon: Sparkles,
      desc: 'Desvenda enigmas sobre a jumenta de Balaão, o peixe de Jonas, leões e pombas.',
      gradient: 'from-emerald-500/20 via-green-500/10 to-transparent',
      accentColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/40',
      component: BibleAnimalsGame
    },
    {
      id: 'parables',
      title: 'Desvendador de Parábolas',
      badge: '🌾 Simbologia de Jesus',
      category: 'linguagem',
      icon: BookOpen,
      desc: 'Associa os símbolos das ilustrações de Jesus (semente, ceifeiros, pérola) à sua verdade.',
      gradient: 'from-yellow-500/20 via-amber-500/10 to-transparent',
      accentColor: 'text-yellow-400',
      borderColor: 'border-yellow-500/40',
      component: ParablesGame
    },
    {
      id: 'original_terms',
      title: 'Línguas Originais (TNM)',
      badge: '📜 Hebraico & Grego',
      category: 'linguagem',
      icon: Languages,
      desc: 'Domina os conceitos exegéticos fundamentais: YHWH, Hésed, Staurós, Sheol e Geena.',
      gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
      accentColor: 'text-cyan-400',
      borderColor: 'border-cyan-500/40',
      component: OriginalTermsGame
    },
    {
      id: 'bible_map',
      title: 'Mapeador Bíblico',
      badge: '🗺️ Rotas Sagradas',
      category: 'historia',
      icon: Compass,
      desc: 'Identifica montes, desertos, rios e cidades históricas através de pistas geográficas.',
      gradient: 'from-orange-500/20 via-amber-500/10 to-transparent',
      accentColor: 'text-orange-400',
      borderColor: 'border-orange-500/40',
      component: BibleMapGame
    },
    {
      id: 'fruit_of_spirit',
      title: 'O Fruto do Espírito',
      badge: '🍇 Gálatas 5:22, 23',
      category: 'enigmas',
      icon: TreePine,
      desc: 'Analisa situações práticas da vida cristã e colhe a virtude do espírito correspondente.',
      gradient: 'from-green-500/20 via-emerald-500/10 to-transparent',
      accentColor: 'text-green-400',
      borderColor: 'border-green-500/40',
      component: FruitOfSpiritGame
    }
  ];

  const filteredGames = games.filter(g => {
    const matchesCategory = activeCategory === 'todos' || g.category === activeCategory;
    const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          g.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const currentGame = games.find(g => g.id === selectedGameId);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Se um jogo está ativo: cabeçalho com botão Voltar */}
      {selectedGameId && currentGame ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <button
              onClick={() => setSelectedGameId(null)}
              className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#1E3E62] text-slate-700 dark:text-slate-300 hover:text-[#D4AF37] transition-all text-xs font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Voltar ao Salão de Jogos</span>
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/30">
                {currentGame.badge}
              </span>
            </div>
          </div>

          {/* Renderização do Jogo Ativo */}
          <currentGame.component />
        </div>
      ) : (
        /* Salão Principal de Jogos (Arcade Lobby) */
        <div className="space-y-8">
          {/* Cabeçalho */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1E3E62]/40 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37]">
              <Gamepad2 className="w-4 h-4" />
              <span>Central de 13 Jogos & Quizzes Bíblicos</span>
            </div>
            <h1 className="font-title text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Salão de Jogos das Escrituras
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Desafia o teu conhecimento com 13 experiências dinâmicas fundamentadas na Tradução do Novo Mundo. Memoriza versículos, domina cronologias, viaja pela geografia bíblica e fortalece a tua fé.
            </p>
          </div>

          {/* Filtros de Categoria */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'todos', label: 'Todos (13)' },
              { id: 'velocidade', label: '⚡ Ação & Velocidade' },
              { id: 'historia', label: '📜 História & Reis' },
              { id: 'enigmas', label: '🕵️‍♂️ Enigmas & Dedução' },
              { id: 'linguagem', label: '🔤 Línguas & Versículos' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as GameCategory)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/50 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid de Jogos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGames.map((game) => {
              const Icon = game.icon;

              return (
                <div
                  key={game.id}
                  onClick={() => setSelectedGameId(game.id)}
                  className="group relative p-5 rounded-2xl bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 hover:border-[#D4AF37]/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                  <div className="relative space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 group-hover:bg-[#1E3E62] text-slate-600 dark:text-slate-300 group-hover:text-[#D4AF37] transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {game.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#D4AF37] transition-colors">
                        {game.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {game.desc}
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-[#D4AF37]">
                    <span className="flex items-center space-x-1">
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Jogar Agora</span>
                    </span>
                    <Sparkles className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rodapé Inspiracional */}
          <div className="text-center pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center space-x-2">
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            <span>"Toda a Escritura é inspirada por Deus e proveitosa para ensinar..." — 2 Timóteo 3:16</span>
          </div>
        </div>
      )}
    </div>
  );
};
