// src/components/home/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Mic, 
  Sparkles, 
  BookOpen, 
  Users, 
  Languages, 
  Compass, 
  Heart, 
  Clock, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Bookmark,
  MessageSquare,
  Gamepad2,
  GraduationCap,
  TreePine,
  MapPin,
  FileText,
  Lock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Bot,
  Star,
  Smartphone,
  Eye
} from 'lucide-react';
import type { ActiveTab } from '../layout/Navbar';
import { getLastRead, type ReadingHistoryItem } from '../../db/bibliaOnDb';
import { readerCounterService, type ReaderStats } from '../../services/readerCounterService';
import { pwaService, type PWAState } from '../../services/pwaService';
import { LegalModal, type LegalTab } from '../legal/LegalModal';

interface HomePageProps {
  onNavigate: (tab: ActiveTab, context?: any) => void;
  onSearchSubmit: (query: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSearchSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [lastRead, setLastRead] = useState<ReadingHistoryItem | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [readerStats, setReaderStats] = useState<ReaderStats>(() => readerCounterService.getStats());
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalTab>('termos');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [pwaState, setPwaState] = useState<PWAState>(() => pwaService.getState());
  const [showInstallHelp, setShowInstallHelp] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<'all' | 'exegesis' | 'history' | 'practical'>('all');

  useEffect(() => {
    getLastRead().then((item) => {
      if (item) setLastRead(item);
    });

    const unsubscribe = readerCounterService.subscribe((stats) => {
      setReaderStats(stats);
    });

    const unsubPwa = pwaService.subscribe((state) => {
      setPwaState(state);
    });

    return () => {
      unsubscribe();
      unsubPwa();
    };
  }, []);

  const handleInstallClick = async () => {
    if (pwaState.isInstallable) {
      const ok = await pwaService.promptInstall();
      if (!ok) {
        setShowInstallHelp(prev => !prev);
      }
    } else {
      setShowInstallHelp(prev => !prev);
    }
  };

  const openLegal = (tab: LegalTab) => {
    setLegalModalTab(tab);
    setLegalModalOpen(true);
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('O reconhecimento de voz não é suportado pelo seu navegador atual.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'pt-PT';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(true);
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
        onSearchSubmit(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    } catch {
      setIsListening(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery.trim());
    }
  };

  const suggestedQuestions = [
    'O que a Bíblia ensina sobre a morte?',
    'Quem foi Melquisedeque?',
    'Qual é a relação entre Daniel e Apocalipse?',
    'Porque é que Jesus utilizava parábolas?',
    'Que textos falam sobre a esperança da ressurreição?',
    'Como posso melhorar o meu casamento segundo a Bíblia?'
  ];

  // 3 Grandes Trilhas Integradas de Estudo (17 Módulos Especializados)
  const STUDY_TRACKS = [
    {
      id: 'exegesis' as const,
      title: 'Trilha 1: Investigação & Exegese Textual',
      shortTitle: '📜 Investigação & Exegese',
      tagline: 'Manuscritos originais, códices interlineares e rigor teológico na Tradução do Novo Mundo',
      items: [
        { id: 'explorer' as ActiveTab, title: 'Bíblia dos 66 Livros', desc: 'Texto canónico completo com notas de estudo e referências cruzadas', badge: 'Canónico', icon: BookOpen, color: 'text-amber-500', highlight: true },
        { id: 'codex' as ActiveTab, title: 'O Codex Vivo 👑', desc: 'O Fio Dourado de Gênesis a Apocalipse e réplicas dos Rolos do Mar Morto', badge: 'Exclusivo 👑', icon: Sparkles, color: 'text-[#D4AF37]', highlight: true },
        { id: 'compare' as ActiveTab, title: 'Comparador de Traduções', desc: 'TNM de Estudo, Almeida e King James versículo a versículo em paralelo', badge: 'Interlinear', icon: Eye, color: 'text-sky-400' },
        { id: 'lexicon' as ActiveTab, title: 'Léxico Hebraico & Grego', desc: 'Códigos Strong, lemas, morfologia e termos YHWH, néphesh, staurós', badge: 'Original', icon: Languages, color: 'text-purple-400' },
        { id: 'contradictions' as ActiveTab, title: 'Harmonizações Bíblicas', desc: 'Investigação honesta e rigorosa de aparentes contradições bíblicas', badge: 'Defesa da Fé', icon: ShieldCheck, color: 'text-cyan-400' },
        { id: 'prophecies' as ActiveTab, title: 'Profecias Bíblicas', desc: 'Cumprimentos messiânicos, profecias de Daniel e cronologias bíblicas', badge: 'Messiânico', icon: Layers, color: 'text-rose-400' },
      ]
    },
    {
      id: 'history' as const,
      title: 'Trilha 2: História, Tempo & Geografia Sagrada',
      shortTitle: '🗺️ História & Geografia',
      tagline: 'Mapeamento geográfico interativo, cronologia universal e personagens das Escrituras',
      items: [
        { id: 'personas' as ActiveTab, title: 'O Criador & Figuras Bíblicas', desc: 'Diálogo histórico e imersivo com 58 personagens sagrados com guardrails rigorosos', badge: 'Imersivo', icon: MessageSquare, color: 'text-[#D4AF37]', highlight: true },
        { id: 'atlas' as ActiveTab, title: 'Atlas & Lugares Bíblicos', desc: 'Mapas vectoriais, rotas do Êxodo e viagens missionárias do apóstolo Paulo', badge: 'Mapas 3D', icon: MapPin, color: 'text-red-400' },
        { id: 'timeline' as ActiveTab, title: 'Linha do Tempo Mundial', desc: 'Cronologia histórica universal desde a criação até ao século I d.C.', badge: 'Cronologia', icon: Clock, color: 'text-yellow-400' },
        { id: 'genealogy' as ActiveTab, title: 'Genealogias Bíblicas', desc: 'Árvore genealógica de Adão a Jesus Cristo e as 12 Tribos de Israel', badge: 'Linhagem', icon: TreePine, color: 'text-emerald-500' },
        { id: 'chat' as ActiveTab, title: 'Assistente Bíblico IA', desc: 'Pesquisa e auxílio exegético imediato com 3 níveis de profundidade de estudo', badge: 'IA Exegética', icon: Bot, color: 'text-blue-400' },
      ]
    },
    {
      id: 'practical' as const,
      title: 'Trilha 3: Edificação Prática, Ensino & Família',
      shortTitle: '🌿 Edificação & Família',
      tagline: 'Ferramentas dinâmicas para fixação do conhecimento, estudo diário e aplicação na vida',
      items: [
        { id: 'quizzes' as ActiveTab, title: 'Arcade Bíblico Completo', desc: '13 Jogos pedagógicos: Linha do Tempo, Frutos do Espírito, Quem Sou Eu? e Quiz Relâmpago', badge: '13 Jogos', icon: Gamepad2, color: 'text-emerald-400', highlight: true },
        { id: 'tutor' as ActiveTab, title: 'Professor Adaptativo', desc: 'Método pedagógico "Ensina-me até eu compreender" em 3 níveis + flashcards', badge: 'Pedagógico', icon: GraduationCap, color: 'text-indigo-400' },
        { id: 'plans' as ActiveTab, title: 'Planos de Leitura', desc: 'Leitura de 1 Ano, Cronológica e dos Evangelhos com medalhas de progresso', badge: 'Sistemático', icon: Compass, color: 'text-teal-400' },
        { id: 'life' as ActiveTab, title: 'Orientador de Vida', desc: 'Princípios práticos para casamento, paz mental, ansiedade e esperança', badge: 'Vida Cristã', icon: Heart, color: 'text-pink-400' },
        { id: 'library' as ActiveTab, title: 'Biblioteca Pessoal', desc: 'Notas, versículos favoritos e exportação de backups seguros no seu dispositivo', badge: '100% Privado', icon: Bookmark, color: 'text-blue-300' },
        { id: 'tool_assistant' as ActiveTab, title: 'Especialista da Ferramenta', desc: 'Guia interactivo completo para navegar e tirar o máximo proveito da app', badge: 'Tutorial', icon: Sparkles, color: 'text-amber-400' },
      ]
    }
  ];

  const FAQ_ITEMS = [
    {
      q: 'A BIBLIA ON é 100% gratuita?',
      a: 'Sim, incondicionalmente. O nosso compromisso institucional garante que qualquer pessoa no mundo pode estudar as Sagradas Escrituras sem assinaturas, sem anúncios e sem barreiras financeiras.'
    },
    {
      q: 'Como funciona a conversa com Jesus e com os personagens bíblicos?',
      a: 'O sistema utiliza modelos de linguagem com guardrails teológicos rigorosos baseados na Tradução do Novo Mundo e no cânon de 66 livros. Cada personagem responde em primeira pessoa respeitando o contexto histórico, as lições e as palavras exatas registadas na Bíblia.'
    },
    {
      q: 'Quem tem a esperança de ir para o céu segundo a Bíblia?',
      a: 'Em estrita conformidade com as Escrituras (Lucas 12:32; Apocalipse 7:4; 14:1, 3; 20:6), apenas Jesus Cristo (o Filho do homem) e os 144.000 membros do "pequeno rebanho" ressuscitam para a vida celestial, tendo a missão exclusiva de governar como reis e sacerdotes sobre a Terra. Os restantes seres humanos fiéis têm a gloriosa esperança da vida eterna no Paraíso terrestre restaurado (Salmo 37:11, 29; Mateus 5:5; João 5:28, 29).'
    },
    {
      q: 'Os meus dados e pesquisas são gravados em servidores externos?',
      a: 'Não. Todas as suas anotações, histórico de leitura, favoritos e configurações ficam guardados unicamente no seu navegador e dispositivo (IndexedDB / LocalStorage). Nós não rastreamos nem vendemos os seus dados.'
    },
    {
      q: 'A aplicação funciona sem ligação à Internet (Modo Offline PWA)?',
      a: 'Sim! Ao aceder pelo navegador, a aplicação é armazenada em cache e pode ser instalada no telemóvel ou computador. Pode ler todos os 66 livros e notas mesmo em locais sem qualquer sinal de rede.'
    },
    {
      q: 'Porque é que o botão "Apoiar" está temporariamente marcado como BREVEMENTE?',
      a: 'As contas bancárias oficiais para doações voluntárias encontram-se em homologação institucional e testes finais de conformidade. Durante este período, o apoio financeiro está desativado.'
    }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between w-full overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. SEÇÃO HERO PRINCIPAL */}
      {/* ========================================================================= */}
      <section className="relative pt-8 sm:pt-12 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-6xl mx-auto w-full">
        
        {/* Emblemas Superiores: Missão & Contador de Leitores Ativos */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1E3E62]/40 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider backdrop-blur-sm shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Plataforma Mundial de Investigação Bíblica 👑</span>
          </div>

          <div 
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold backdrop-blur-sm shadow-sm transition-all"
            title="Contador anónimo em tempo real de pessoas conectadas e a estudar as Sagradas Escrituras"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Users className="w-3.5 h-3.5 text-emerald-500" />
            <span>{readerStats.onlineNow} {readerStats.onlineNow === 1 ? 'Pessoa Online Agora' : 'Pessoas Online Agora'} • {readerStats.totalReaders.toLocaleString()} Leitores Registados</span>
          </div>
        </div>

        {/* Título Principal & Slogan */}
        <h1 className="font-title text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-4 leading-tight">
          O Conhecimento Bíblico{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-[#D4AF37] to-amber-500 dark:from-[#D4AF37] dark:via-amber-200 dark:to-[#D4AF37]">
            ao alcance de todos.
          </span>
        </h1>

        <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8 font-normal leading-relaxed">
          Pesquisa canónica dos 66 livros sagrados, exegese linguística em hebraico e grego, códices interlineares e inteligência artificial doutrinariamente alinhada à Tradução do Novo Mundo.
        </p>

        {/* Caixa Central de Busca & Perguntas */}
        <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto relative mb-6">
          <div className="relative flex items-center shadow-2xl rounded-2xl bg-white dark:bg-[#1E3E62]/90 border-2 border-slate-200 dark:border-[#D4AF37]/50 focus-within:border-[#D4AF37] transition-all overflow-hidden p-1.5">
            <div className="pl-3 sm:pl-4 text-slate-400 dark:text-slate-300">
              <Search className="w-5 h-5 text-[#D4AF37]" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisa qualquer passagem, personagem ou pergunta bíblica..."
              className="w-full px-2 sm:px-4 py-2.5 sm:py-3.5 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-base focus:outline-none"
            />

            {/* Botão de Voz */}
            <button
              type="button"
              onClick={handleVoiceSearch}
              className={`p-2 sm:p-2.5 rounded-xl mr-1 transition-colors shrink-0 cursor-pointer ${
                isListening 
                  ? 'bg-rose-500 text-white animate-pulse' 
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/60'
              }`}
              title="Perguntar por voz (Microfone)"
              aria-label="Pesquisar por voz"
            >
              <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Botão Pesquisar */}
            <button
              type="submit"
              className="px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#0B192C] to-[#1E3E62] dark:from-[#D4AF37] dark:to-amber-500 text-white dark:text-[#0B192C] font-semibold text-xs sm:text-sm hover:opacity-95 transition-all shadow-md flex items-center space-x-1 sm:space-x-1.5 shrink-0 cursor-pointer"
            >
              <span className="hidden xs:inline">Explorar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Sugestões Rápidas de Perguntas */}
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-2 mb-10">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1">Sugestões:</span>
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => onSearchSubmit(q)}
              className="text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* ⭐ GRANDE DESTAQUE DE CURIOSIDADE: DIÁLOGO COM DEUS, JESUS E PERSONAGENS */}
        {/* ========================================================================= */}
        <div className="relative my-8 sm:my-14 rounded-3xl bg-gradient-to-br from-[#0B192C] via-[#1E3E62] to-[#0B192C] border-2 border-[#D4AF37] p-6 sm:p-12 shadow-2xl overflow-hidden text-center group">
          {/* Brilhos decorativos de fundo */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-bold uppercase tracking-wider shadow-inner">
              <Sparkles className="w-4 h-4 text-[#D4AF37] animate-spin" />
              <span>Funcionalidade Exclusiva & Inovadora</span>
            </div>

            {/* Título Nobre & Solene */}
            <h2 className="font-title text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight sm:leading-snug drop-shadow-md">
              Diálogo Histórico com Figuras Bíblicas
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Questione, investigue e descubra respostas imediatas fundamentadas rigorosamente no texto sagrado da Tradução do Novo Mundo e no cânon dos 66 livros.
            </p>

            {/* Mosaico de Avatares das Personas com Clique Direto */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 pt-2">
              {[
                { id: 'jesus_cristo', name: 'Jesus Cristo', role: 'Filho & Messias', icon: '🕊️', highlight: true },
                { id: 'abraao', name: 'Abraão', role: 'Pai da Fé', icon: '⛺' },
                { id: 'moises', name: 'Moisés', role: 'Legislador', icon: '📜' },
                { id: 'davi', name: 'Rei David', role: 'Salmista', icon: '👑' },
                { id: 'paulo', name: 'Ap. Paulo', role: 'Missionário', icon: '⚔️' },
                { id: 'ester', name: 'Rainha Ester', role: 'Coragem', icon: '🌸' },
                { id: 'rute', name: 'Rute', role: 'Lealdade', icon: '🌾' },
                { id: 'pedro', name: 'Ap. Pedro', role: 'Apóstolo', icon: '⛵' },
              ].map((p, idx) => (
                <div 
                  key={idx}
                  onClick={() => onNavigate('personas', { personaId: p.id })}
                  title={`Conversar diretamente com ${p.name}`}
                  className={`p-3 rounded-2xl text-center border transition-all cursor-pointer hover:scale-105 active:scale-95 group/avatar ${
                    p.highlight 
                      ? 'bg-gradient-to-b from-[#1E3E62] to-[#0B192C] border-[#D4AF37] shadow-lg ring-1 ring-[#D4AF37]/50'
                      : 'bg-[#0B192C]/80 border-slate-700/80 hover:border-[#D4AF37]'
                  }`}
                >
                  <div className="text-2xl sm:text-3xl mb-1 group-hover/avatar:scale-110 transition-transform">{p.icon}</div>
                  <div className="text-xs font-bold text-white truncate">{p.name}</div>
                  <div className="text-[10px] text-slate-400 truncate">{p.role}</div>
                  <div className="mt-1 text-[9px] text-[#D4AF37] font-semibold opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                    Conversar 💬
                  </div>
                </div>
              ))}
            </div>

            {/* Botão de Ação Imediata */}
            <div className="pt-4 flex items-center justify-center">
              <button
                onClick={() => onNavigate('personas')}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] text-slate-950 font-extrabold text-sm sm:text-base hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center justify-center space-x-2 cursor-pointer border-2 border-white/40"
              >
                <MessageSquare className="w-5 h-5 text-slate-950 fill-current" />
                <span>Explorar Todos os 58 Personagens Bíblicos</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BANNER DESTAQUE: O CODEX VIVO & O FIO DOURADO DE GÊNESIS 3:15 */}
        {/* ========================================================================= */}
        <div 
          onClick={() => onNavigate('codex')}
          className="max-w-4xl mx-auto mb-12 p-5 sm:p-7 rounded-2xl bg-gradient-to-r from-[#1E3E62] via-[#2A4F77] to-[#1E3E62] border-2 border-[#D4AF37] shadow-xl text-left cursor-pointer group hover:scale-[1.01] transition-all"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-[#0B192C] text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>Recurso Exclusivo Mundial 👑</span>
              </div>
              <h2 className="font-title text-xl sm:text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                O Codex Vivo & O Fio Dourado das Escrituras
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
                Descubra como os 66 livros convergem para a promessa de Gênesis 3:15, explore réplicas interativas dos Rolos do Mar Morto (1QIsaᵃ) e testemunhos proféticos.
              </p>
            </div>
            <div className="shrink-0 flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B192C] text-xs font-bold shadow-md group-hover:bg-amber-400 transition-colors">
              <span>Abrir o Codex</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. PROGRESSO DE LEITURA & PERGUNTA BÍBLICA DO DIA (VALOR IMEDIATO) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left mb-10">
          {/* Cartão de Continuação de Leitura Aprimorado */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1E3E62]/60 border-2 border-emerald-500/30 dark:border-emerald-500/40 shadow-lg relative overflow-hidden group flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-emerald-500" />
                  <span>{lastRead ? 'Continuar Leitura Recente' : 'Iniciar Estudo Bíblico'}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  {lastRead ? 'Guardado no Dispositivo' : 'Canónico'}
                </span>
              </div>

              {lastRead ? (
                <div className="space-y-1.5 mb-4">
                  <h3 className="font-title font-extrabold text-slate-900 dark:text-white text-lg sm:text-xl group-hover:text-[#D4AF37] transition-colors">
                    {lastRead.bookName} — Capítulo {lastRead.chapter}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Retome o seu estudo exatamente no ponto onde parou. O seu progresso é mantido em segurança no seu navegador.
                  </p>
                </div>
              ) : (
                <div className="space-y-1.5 mb-4">
                  <h3 className="font-title font-extrabold text-slate-900 dark:text-white text-lg sm:text-xl">
                    Gênesis 1 — No Princípio
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Comece a explorar o relato sagrado da criação, a perfeição do Éden e o propósito soberano do Criador para a humanidade.
                  </p>
                </div>
              )}
            </div>

            <div>
              {lastRead ? (
                <button
                  onClick={() => onNavigate('explorer', { bookId: lastRead.bookId, chapter: lastRead.chapter })}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <span>Retomar Leitura Agora</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => onNavigate('explorer', { bookId: 'gen', chapter: 1 })}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-xs shadow-md flex items-center space-x-1.5 transition-all cursor-pointer hover:scale-105"
                  >
                    <span>Começar em Gênesis 1</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onNavigate('explorer', { bookId: 'mat', chapter: 1 })}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700/80 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 font-semibold text-xs transition-all cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600"
                  >
                    <span>Evangelho de Mateus</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Pergunta Bíblica do Dia */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1E3E62]/60 border-2 border-amber-500/30 dark:border-[#D4AF37]/40 shadow-lg relative overflow-hidden group flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center space-x-2 text-amber-600 dark:text-[#D4AF37] font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Pergunta Bíblica do Dia</span>
                </div>
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30">
                  Línguas Originais
                </span>
              </div>
              <h3 className="font-title font-extrabold text-slate-900 dark:text-white text-base sm:text-lg mb-1.5 leading-snug">
                "Qual é o significado do nome pessoal de Deus, Jeová?"
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                O Tetragrama YHWH procede da raiz causativa do verbo hebraico que significa "tornar-se", revelando que Ele se torna o que for necessário para cumprir o Seu propósito infalível.
              </p>
            </div>
            <div>
              <button
                onClick={() => onSearchSubmit('Qual o significado do nome Jeová segundo o hebraico?')}
                className="px-4 py-2 rounded-xl bg-amber-50 dark:bg-slate-800 text-amber-800 dark:text-[#D4AF37] border border-amber-300 dark:border-amber-500/40 font-bold text-xs hover:bg-[#D4AF37] hover:text-slate-950 transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <span>Investigar estudo completo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. BANNER INSTALAR APLICAÇÃO (PWA / MODO OFFLINE PARA TELEMÓVEL) */}
        {/* ========================================================================= */}
        <div className="max-w-4xl mx-auto mb-14 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0B192C] via-[#1E3E62] to-[#0B192C] border-2 border-[#D4AF37]/60 shadow-xl text-left relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start sm:items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center shrink-0 shadow-inner">
                <Smartphone className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/15 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
                    Instalação Rápida PWA
                  </span>
                  <span className="text-[11px] text-emerald-400 font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Funciona 100% Offline</span>
                  </span>
                </div>
                <h3 className="font-title text-base sm:text-lg font-bold text-white">
                  Tenha a BIBLIA ON no seu Ecrã Principal
                </h3>
                <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                  Adicione ao ecrã inicial do seu telemóvel ou computador para acesso instantâneo em ecrã inteiro e estudo bíblico sem necessidade de internet.
                </p>
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <button
                onClick={handleInstallClick}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] text-slate-950 font-extrabold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer border border-white/30"
              >
                <Smartphone className="w-4 h-4 text-slate-950" />
                <span>{pwaState.isInstalled ? 'Aplicação Já Instalada ✓' : '📲 Adicionar ao Ecrã Principal'}</span>
              </button>
            </div>
          </div>

          {/* Instruções Intuitivas de Instalação */}
          {showInstallHelp && (
            <div className="mt-4 pt-4 border-t border-slate-700/80 text-xs text-slate-300 space-y-2 animate-in fade-in duration-200">
              <div className="font-bold text-[#D4AF37] flex items-center justify-between">
                <span>Como adicionar ao seu ecrã inicial em qualquer dispositivo:</span>
                <button 
                  onClick={() => setShowInstallHelp(false)}
                  className="text-slate-400 hover:text-white text-xs underline cursor-pointer"
                >
                  Fechar
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px]">
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                  <span className="font-bold text-white block mb-0.5">📱 Android (Chrome):</span>
                  Toque nos três pontos <strong>⋮</strong> no topo e escolha <strong>"Instalar aplicativo"</strong> ou <strong>"Adicionar ao ecrã principal"</strong>.
                </div>
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                  <span className="font-bold text-white block mb-0.5">🍏 iPhone / iPad (Safari):</span>
                  Toque no botão de <strong>Partilha (quadrado com seta 📤)</strong> no rodapé e selecione <strong>"Adicionar ao Ecrã Principal"</strong>.
                </div>
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                  <span className="font-bold text-white block mb-0.5">💻 Computador (Chrome/Edge):</span>
                  Clique no ícone de instalação <strong>⊕</strong> na barra de endereços ao lado da estrela de favoritos.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 4. AS 3 TRILHAS INTEGRADAS DE ESTUDO DA BIBLIA ON (17 MÓDULOS) */}
        {/* ========================================================================= */}
        <div className="max-w-6xl mx-auto space-y-8 text-left mb-16">
          <div className="text-center space-y-2">
            <h2 className="font-title text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Trilhas Temáticas de Estudo Bíblico
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              17 módulos especializados de alta precisão organizados para guiar o leitor desde a exegese original até à aplicação prática no quotidiano.
            </p>
          </div>

          {/* Abas de Filtro de Trilhas */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setSelectedTrack('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTrack === 'all'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 shadow-md scale-105'
                  : 'bg-white dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-[#D4AF37]'
              }`}
            >
              Todas as Trilhas (17 Módulos)
            </button>
            {STUDY_TRACKS.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTrack(t.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  selectedTrack === t.id
                    ? 'bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 shadow-md scale-105'
                    : 'bg-white dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-[#D4AF37]'
                }`}
              >
                <span>{t.shortTitle}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  selectedTrack === t.id ? 'bg-slate-950 text-[#D4AF37]' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}>
                  {t.items.length}
                </span>
              </button>
            ))}
          </div>

          {/* Renderização das Trilhas e Cards com Badges */}
          <div className="space-y-10 pt-4">
            {STUDY_TRACKS
              .filter((track) => selectedTrack === 'all' || selectedTrack === track.id)
              .map((track) => (
                <div key={track.id} className="space-y-4">
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div className="flex items-center space-x-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span>
                      <h3 className="font-title text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {track.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 pl-5">
                      {track.tagline}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {track.items.map((mod) => {
                      const Icon = mod.icon;
                      return (
                        <div
                          key={mod.id}
                          onClick={() => onNavigate(mod.id)}
                          className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
                            mod.highlight
                              ? 'bg-gradient-to-br from-[#1E3E62]/80 to-[#0B192C] border-[#D4AF37] shadow-lg hover:shadow-2xl hover:scale-[1.02]'
                              : 'bg-white dark:bg-[#1E3E62]/40 border-slate-200 dark:border-slate-700/70 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] hover:shadow-md hover:scale-[1.01]'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2.5">
                              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                                <Icon className={`w-5 h-5 ${mod.color}`} />
                              </div>
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-[#D4AF37] border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-full">
                                {mod.badge}
                              </span>
                            </div>
                            <h4 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base mb-1.5 group-hover:text-[#D4AF37] transition-colors">
                              {mod.title}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
                              {mod.desc}
                            </p>
                          </div>

                          <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between text-xs font-semibold text-[#D4AF37]">
                            <span>Aceder ao Módulo</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ⭐ SEÇÃO DE PERGUNTAS FREQUENTES (FAQ) EXPANDÍVEL */}
        {/* ========================================================================= */}
        <div className="max-w-4xl mx-auto text-left mb-16 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Dúvidas Comuns</span>
            </div>
            <h2 className="font-title text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Perguntas Frequentes (FAQ)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Tudo o que precisa de saber sobre o funcionamento, privacidade e rigor bíblico da plataforma.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isExpanded = expandedFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B192C] overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between space-x-4 cursor-pointer"
                  >
                    <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {item.q}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="px-4 sm:px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. RODAPÉ PROFISSIONAL COMPLETO (TERMOS, PRIVACIDADE, FAQ, DOCUMENTAÇÃO) */}
      {/* ========================================================================= */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#071322] py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
            {/* Coluna 1: Sobre */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#1E3E62] to-[#0B192C] p-1 border border-[#D4AF37]/50">
                  <img src="/logo.svg" alt="BIBLIA ON" className="w-full h-full object-contain" />
                </div>
                <span className="font-title font-bold text-base text-slate-900 dark:text-white">BIBLIA ON</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                Plataforma independente de investigação exegética, hermenêutica bíblica e inteligência artificial canónica.
              </p>
              <div className="text-[11px] font-semibold text-emerald-500 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Gratuito • Sem Publicidade</span>
              </div>
            </div>

            {/* Coluna 2: Navegação Rápida */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Estudo & Recursos
              </h4>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 text-xs">
                <li><button onClick={() => onNavigate('explorer')} className="hover:text-[#D4AF37] transition-colors">Bíblia dos 66 Livros</button></li>
                <li><button onClick={() => onNavigate('personas')} className="hover:text-[#D4AF37] transition-colors">Diálogo com Personagens</button></li>
                <li><button onClick={() => onNavigate('codex')} className="hover:text-[#D4AF37] transition-colors">O Codex Vivo 👑</button></li>
                <li><button onClick={() => onNavigate('quizzes')} className="hover:text-[#D4AF37] transition-colors">Arcade & Jogos Bíblicos</button></li>
                <li><button onClick={() => onNavigate('lexicon')} className="hover:text-[#D4AF37] transition-colors">Hebraico & Grego</button></li>
              </ul>
            </div>

            {/* Coluna 3: Conformidade & Legal */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Transparência & Ética
              </h4>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 text-xs">
                <li><button onClick={() => openLegal('termos')} className="hover:text-[#D4AF37] transition-colors flex items-center space-x-1"><span>Termos de Uso</span></button></li>
                <li><button onClick={() => openLegal('privacidade')} className="hover:text-[#D4AF37] transition-colors flex items-center space-x-1"><span>Política de Privacidade</span></button></li>
                <li><button onClick={() => openLegal('faq')} className="hover:text-[#D4AF37] transition-colors">Perguntas Frequentes (FAQ)</button></li>
                <li><button onClick={() => openLegal('documentacao')} className="hover:text-[#D4AF37] transition-colors">Documentação & Cânon</button></li>
                <li><button onClick={() => onNavigate('library')} className="hover:text-[#D4AF37] transition-colors">Minhas Notas Privadas</button></li>
              </ul>
            </div>

            {/* Coluna 4: Apoio & Status */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Sustentabilidade
              </h4>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                O projeto não cobra taxas nem comercializa o conhecimento das Escrituras.
              </p>
              
              {/* Botão Apoiar Bloqueado com a palavra BREVEMENTE */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-[#D4AF37]/30 text-xs space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-[#D4AF37]">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>Apoio / Contribuições:</span>
                </div>
                <div className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                  BREVEMENTE
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Contas bancárias em processo de homologação institucional.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
            <div>
              © 2026 <strong>BIBLIA ON</strong> — "O Conhecimento Bíblico ao alcance de todos."
            </div>
            <div className="flex items-center space-x-3 text-slate-500">
              <span>Tradução do Novo Mundo de Estudo (TNM)</span>
              <span>•</span>
              <span>Sem Fins Lucrativos</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Modal Profissional de Termos, Privacidade, FAQ e Documentação */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialTab={legalModalTab}
      />

    </div>
  );
};
