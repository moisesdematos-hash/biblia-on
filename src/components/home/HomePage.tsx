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
  Bookmark
} from 'lucide-react';
import type { ActiveTab } from '../layout/Navbar';
import { getLastRead, type ReadingHistoryItem } from '../../db/bibliaOnDb';

interface HomePageProps {
  onNavigate: (tab: ActiveTab, context?: any) => void;
  onSearchSubmit: (query: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSearchSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [lastRead, setLastRead] = useState<ReadingHistoryItem | null>(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    getLastRead().then((item) => {
      if (item) setLastRead(item);
    });
  }, []);

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
    } catch (err) {
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

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      {/* Seção Hero Superior */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto w-full">
        {/* Emblema */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1E3E62]/40 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-sm shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Plataforma Mundial de Investigação Bíblica</span>
        </div>

        {/* Título Principal & Slogan */}
        <h1 className="font-title text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-4 leading-tight">
          A Bíblia ao alcance de todos.
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-[#D4AF37] to-amber-500 dark:from-[#D4AF37] dark:via-amber-200 dark:to-[#D4AF37]">
            Em qualquer idioma. Em qualquer lugar.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 font-normal">
          O que gostarias de descobrir nas Escrituras? Pesquisa capítulos, versículos, personagens, profecias, línguas originais e estudos com honestidade e rigor exegético.
        </p>

        {/* Caixa Central de Busca & Perguntas */}
        <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto relative mb-6">
          <div className="relative flex items-center shadow-2xl rounded-2xl bg-white dark:bg-[#1E3E62]/90 border-2 border-slate-200 dark:border-[#D4AF37]/50 focus-within:border-[#D4AF37] transition-all overflow-hidden p-1.5">
            <div className="pl-4 text-slate-400 dark:text-slate-300">
              <Search className="w-5 h-5 text-[#D4AF37]" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pergunta em linguagem natural ou digita uma passagem (ex: Melquisedeque, Salmo 83:18, alma)..."
              className="w-full px-4 py-3.5 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none"
            />

            {/* Botão de Voz */}
            <button
              type="button"
              onClick={handleVoiceSearch}
              className={`p-2.5 rounded-xl mr-1 transition-colors ${
                isListening 
                  ? 'bg-rose-500 text-white animate-pulse' 
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/60'
              }`}
              title="Perguntar por voz (Microfone)"
              aria-label="Pesquisar por voz"
            >
              <Mic className="w-5 h-5" />
            </button>

            {/* Botão Pesquisar */}
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#0B192C] to-[#1E3E62] dark:from-[#D4AF37] dark:to-amber-500 text-white dark:text-[#0B192C] font-semibold text-sm hover:opacity-95 transition-all shadow-md flex items-center space-x-1.5 shrink-0"
            >
              <span>Explorar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Sugestões Rápidas de Perguntas */}
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-2 mb-8">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1">Sugestões:</span>
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => onSearchSubmit(q)}
              className="text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Banner Destaque Chave de Ouro: O Codex Vivo */}
        <div 
          onClick={() => onNavigate('codex')}
          className="max-w-4xl mx-auto mb-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#1E3E62] via-[#2A4F77] to-[#1E3E62] border-2 border-[#D4AF37] shadow-xl text-left cursor-pointer group hover:scale-[1.01] transition-all"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-[#0B192C] text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>Recurso Exclusivo Mundial 👑</span>
              </div>
              <h2 className="font-title text-xl sm:text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                O Codex Vivo & O Fio Dourado de Gênesis 3:15
              </h2>
              <p className="text-xs text-slate-200 max-w-2xl leading-relaxed">
                Descobre como cada um dos 66 livros converge para a promessa do Reino, explora réplicas reais dos Rolos do Mar Morto (1QIsaᵃ) e ouve testemunhos em primeira pessoa.
              </p>
            </div>
            <div className="shrink-0 flex items-center space-x-1 px-4 py-2 rounded-xl bg-[#D4AF37] text-[#0B192C] text-xs font-bold shadow-md group-hover:bg-amber-400 transition-colors">
              <span>Abrir o Codex</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card: Pergunta Bíblica do Dia & Continuação de Leitura */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left mb-12">
          {/* Pergunta Bíblica do Dia */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#1E3E62]/50 border border-slate-200 dark:border-slate-700/80 shadow-md">
            <div className="flex items-center space-x-2 text-amber-600 dark:text-[#D4AF37] font-semibold text-xs mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Pergunta Bíblica do Dia</span>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-1">
              "Qual é o significado do nome pessoal de Deus, Jeová?"
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
              O Tetragrama YHWH procede do verbo hebraico que significa "tornar-se", revelando que Ele se torna o que for necessário para cumprir o Seu propósito infalível.
            </p>
            <button
              onClick={() => onSearchSubmit('Qual o significado do nome Jeová?')}
              className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center space-x-1"
            >
              <span>Ler estudo completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Continuação de Leitura ou Sugestão Canônica */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#1E3E62]/50 border border-slate-200 dark:border-slate-700/80 shadow-md">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs mb-2">
              <BookOpen className="w-4 h-4" />
              <span>{lastRead ? 'Continuar Leitura' : 'Sugestão de Leitura'}</span>
            </div>
            {lastRead ? (
              <>
                <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-1">
                  {lastRead.bookName} — Capítulo {lastRead.chapter}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                  Registrado no teu dispositivo. Continua o teu estudo exatamente de onde paraste.
                </p>
                <button
                  onClick={() => onNavigate('explorer', { bookId: lastRead.bookId, chapter: lastRead.chapter })}
                  className="text-xs font-semibold text-emerald-500 hover:underline flex items-center space-x-1"
                >
                  <span>Retomar agora</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <>
                <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-1">
                  Gênesis 1 — O Princípio da Criação
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                  Explora o relato dos céus e da terra e o propósito do Criador para a humanidade.
                </p>
                <button
                  onClick={() => onNavigate('explorer', { bookId: 'gen', chapter: 1 })}
                  className="text-xs font-semibold text-emerald-500 hover:underline flex items-center space-x-1"
                >
                  <span>Iniciar leitura</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Grid de Acesso Rápido aos Principais Módulos */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
            Módulos de Investigação & Conhecimento Bíblico
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-left">
            {[
              { id: 'explorer' as ActiveTab, title: 'Bíblia Completa', desc: '66 livros canônicos, capítulos e referências', icon: BookOpen, color: 'text-amber-500' },
              { id: 'chat' as ActiveTab, title: 'Chat IA & Exegese', desc: 'Assistente bíblico com 3 níveis de profundidade', icon: Sparkles, color: 'text-blue-400' },
              { id: 'characters' as ActiveTab, title: 'Personagens', desc: 'Enciclopédia biográfica com lições e linhagens', icon: Users, color: 'text-emerald-400' },
              { id: 'lexicon' as ActiveTab, title: 'Hebraico & Grego', desc: 'Concordância Strong, lema e significados reais', icon: Languages, color: 'text-purple-400' },
              { id: 'prophecies' as ActiveTab, title: 'Profecias Bíblicas', desc: 'Cumprimentos messiânicos e cronologias', icon: Layers, color: 'text-rose-400' },
              { id: 'contradictions' as ActiveTab, title: 'Harmonizações', desc: 'Investigação honesta de passagens difíceis', icon: ShieldCheck, color: 'text-cyan-400' },
              { id: 'atlas' as ActiveTab, title: 'Atlas & Cronologia', desc: 'Lugares bíblicos, rotas e linha temporal', icon: Compass, color: 'text-yellow-400' },
              { id: 'life' as ActiveTab, title: 'Guia de Vida', desc: 'Princípios práticos para casamento, dor e paz', icon: Heart, color: 'text-pink-400' },
            ].map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.id}
                  onClick={() => onNavigate(mod.id)}
                  className="p-4 rounded-xl bg-white dark:bg-[#1E3E62]/40 border border-slate-200 dark:border-slate-700/70 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] hover:shadow-lg transition-all cursor-pointer group"
                >
                  <Icon className={`w-5 h-5 ${mod.color} mb-2 group-hover:scale-110 transition-transform`} />
                  <h3 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm mb-1 group-hover:text-[#D4AF37] transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-300 leading-snug">
                    {mod.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rodapé da Página Inicial com Compromisso de Gratuidade */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#08121f] py-6 px-4 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="font-title font-bold text-slate-800 dark:text-slate-200">BIBLIA ON</span> — 100% Gratuita, Sem Publicidade, Sem Venda de Dados.
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => onNavigate('library')} className="hover:text-[#D4AF37] transition-colors">Minhas Notas</button>
            <button onClick={() => onNavigate('donations')} className="hover:text-[#D4AF37] transition-colors">Transparência</button>
            <button onClick={() => onNavigate('admin')} className="hover:text-[#D4AF37] transition-colors">Administração</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
