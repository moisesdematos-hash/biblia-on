// src/App.tsx
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar, type ActiveTab } from './components/layout/Navbar';
import { InstitutionalBanner } from './components/layout/InstitutionalBanner';
import { HomePage } from './components/home/HomePage';
import { BottomNav } from './components/layout/BottomNav';
import { Bot, Sparkles } from 'lucide-react';
import type { LanguageCode } from './data/i18nData';

// Carregamento Sob Demanda (Code-Splitting) para Inicialização Ultra-Rápida em Telemóveis
const BibleExplorer = lazy(() => import('./components/explorer/BibleExplorer').then(m => ({ default: m.BibleExplorer })));
const AIChat = lazy(() => import('./components/chat/AIChat').then(m => ({ default: m.AIChat })));
const CharactersEncyclopedia = lazy(() => import('./components/characters/CharactersEncyclopedia').then(m => ({ default: m.CharactersEncyclopedia })));
const OriginalWordsLab = lazy(() => import('./components/lexicon/OriginalWordsLab').then(m => ({ default: m.OriginalWordsLab })));
const PropheciesLab = lazy(() => import('./components/prophecies/PropheciesLab').then(m => ({ default: m.PropheciesLab })));
const ContradictionsInvestigator = lazy(() => import('./components/contradictions/ContradictionsInvestigator').then(m => ({ default: m.ContradictionsInvestigator })));
const AtlasAndTimeline = lazy(() => import('./components/atlas/AtlasAndTimeline').then(m => ({ default: m.AtlasAndTimeline })));
const LifeGuidanceView = lazy(() => import('./components/life/LifeGuidanceView').then(m => ({ default: m.LifeGuidanceView })));
const QuizzesView = lazy(() => import('./components/quizzes/QuizzesView').then(m => ({ default: m.QuizzesView })));
const PersonalLibrary = lazy(() => import('./components/library/PersonalLibrary').then(m => ({ default: m.PersonalLibrary })));
const DonationsAndTransparency = lazy(() => import('./components/donations/DonationsAndTransparency').then(m => ({ default: m.DonationsAndTransparency })));
const AdminPanel = lazy(() => import('./components/admin/AdminPanel').then(m => ({ default: m.AdminPanel })));
const GenealogyTree = lazy(() => import('./components/genealogy/GenealogyTree').then(m => ({ default: m.GenealogyTree })));
const ReadingPlansView = lazy(() => import('./components/readingPlans/ReadingPlansView').then(m => ({ default: m.ReadingPlansView })));
const AdaptiveTutor = lazy(() => import('./components/tutor/AdaptiveTutor').then(m => ({ default: m.AdaptiveTutor })));
const TranslationComparator = lazy(() => import('./components/translations/TranslationComparator').then(m => ({ default: m.TranslationComparator })));
const LivingCodexView = lazy(() => import('./components/codex/LivingCodexView').then(m => ({ default: m.LivingCodexView })));
const CharacterDialogView = lazy(() => import('./components/characters/CharacterDialogView').then(m => ({ default: m.CharacterDialogView })));
const ToolExpertChat = lazy(() => import('./components/assistant/ToolExpertChat').then(m => ({ default: m.ToolExpertChat })));

// Indicador elegante de carregamento sob demanda
const ModuleLoadingFallback: React.FC = () => (
  <div className="min-h-[450px] flex flex-col items-center justify-center p-8 space-y-4 animate-in fade-in duration-200">
    <div className="relative flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-slate-700/60 border-t-[#D4AF37] animate-spin" />
      <Sparkles className="w-5 h-5 text-[#D4AF37] absolute animate-pulse" />
    </div>
    <div className="text-center space-y-1">
      <h3 className="font-title text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">
        A carregar módulo bíblico...
      </h3>
      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
        Otimização de dados para navegação ultrarrápida
      </p>
    </div>
  </div>
);

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [currentLang, setCurrentLang] = useState<LanguageCode>('pt');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('biblia_on_theme');
      return saved ? saved === 'dark' : true;
    }
    return true;
  });
  const [fontSize, setFontSize] = useState<'small' | 'normal' | 'large'>('normal');
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [chatInitialQuery, setChatInitialQuery] = useState<string>('');
  const [explorerTarget, setExplorerTarget] = useState<{ bookId?: string; chapter?: number }>({});
  const [isFloatingExpertOpen, setIsFloatingExpertOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sincroniza tema no elemento html
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('biblia_on_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('biblia_on_theme', 'light');
    }
  }, [isDarkMode]);

  // Monitora conectividade offline/online
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleNavigate = (tab: ActiveTab, context?: any) => {
    if (tab === 'explorer' && context) {
      setExplorerTarget(context);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (query: string) => {
    setChatInitialQuery(query);
    setActiveTab('chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenExplorerFromPlan = (_bookName: string, chapter: number) => {
    setExplorerTarget({ chapter });
    setActiveTab('explorer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B192C] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 overflow-x-hidden w-full max-w-full">
      {/* Banner Institucional Obrigatório de Gratuidade */}
      <InstitutionalBanner onOpenDonations={() => handleNavigate('donations')} />

      {/* Barra de Navegação Superior */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        fontSize={fontSize}
        setFontSize={setFontSize}
        isOfflineMode={isOffline}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Conteúdo Dinâmico com Carregamento Otimizado (Suspense) */}
      <main className="flex-1 pb-20 md:pb-8 w-full max-w-full">
        {activeTab === 'home' ? (
          <HomePage
            onNavigate={handleNavigate}
            onSearchSubmit={handleSearchSubmit}
          />
        ) : (
          <Suspense fallback={<ModuleLoadingFallback />}>
            {/* Chave de Ouro: O Codex Vivo */}
            {activeTab === 'codex' && <LivingCodexView />}

            {/* Mecanismo de Diálogo com Personagens Bíblicos */}
            {activeTab === 'personas' && <CharacterDialogView />}

            {activeTab === 'explorer' && (
              <BibleExplorer
                initialBookId={explorerTarget.bookId || 'gen'}
                initialChapter={explorerTarget.chapter || 1}
                fontSize={fontSize}
              />
            )}

            {activeTab === 'chat' && (
              <AIChat
                initialQuery={chatInitialQuery}
                isOfflineMode={isOffline}
              />
            )}

            {activeTab === 'plans' && (
              <ReadingPlansView onOpenExplorer={handleOpenExplorerFromPlan} />
            )}

            {activeTab === 'tutor' && <AdaptiveTutor />}

            {activeTab === 'genealogy' && <GenealogyTree />}

            {activeTab === 'compare' && <TranslationComparator />}

            {activeTab === 'characters' && <CharactersEncyclopedia />}

            {activeTab === 'lexicon' && <OriginalWordsLab />}

            {activeTab === 'prophecies' && <PropheciesLab />}

            {activeTab === 'contradictions' && <ContradictionsInvestigator />}

            {activeTab === 'atlas' && <AtlasAndTimeline initialMode="atlas" />}

            {activeTab === 'timeline' && <AtlasAndTimeline initialMode="timeline" />}

            {activeTab === 'life' && <LifeGuidanceView />}

            {activeTab === 'quizzes' && <QuizzesView />}

            {activeTab === 'library' && <PersonalLibrary />}

            {activeTab === 'donations' && <DonationsAndTransparency />}

            {activeTab === 'admin' && <AdminPanel />}

            {/* Chat da Ferramenta Expert em Todas as Funcionalidades */}
            {activeTab === 'tool_assistant' && (
              <div className="py-6 px-4">
                <ToolExpertChat onNavigate={handleNavigate} isFloating={false} />
              </div>
            )}
          </Suspense>
        )}
      </main>

      {/* Botão Flutuante Compacto do Copiloto (Oculto no Mobile Durante Conversas para Não Obstruir Textos) */}
      {!isFloatingExpertOpen && activeTab !== 'tool_assistant' && (
        <button
          onClick={() => setIsFloatingExpertOpen(true)}
          className={`fixed bottom-24 right-4 sm:bottom-28 sm:right-6 z-40 p-2.5 sm:p-3 rounded-full bg-gradient-to-tr from-[#D4AF37] via-amber-400 to-[#D4AF37] text-slate-950 shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white/80 ring-2 ring-[#D4AF37]/60 group items-center justify-center ${
            activeTab === 'personas' || activeTab === 'chat' ? 'hidden sm:flex' : 'flex'
          }`}
          title="Abrir o Copiloto Especialista da Ferramenta"
          aria-label="Abrir Copiloto Especialista BIBLIA ON"
        >
          <Bot className="w-5 h-5 text-slate-950 fill-current animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-white"></span>
          </span>
          {/* Tooltip discreto no hover que nunca obstrui os campos */}
          <span className="pointer-events-none absolute right-full mr-2.5 px-2.5 py-1 rounded-xl bg-[#0B192C] text-[#D4AF37] text-[11px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-[#D4AF37]/40 shadow-xl hidden sm:inline-block">
            Copiloto da Ferramenta
          </span>
        </button>
      )}

      {/* Janela Flutuante do Especialista */}
      {isFloatingExpertOpen && (
        <Suspense fallback={null}>
          <ToolExpertChat
            isFloating={true}
            isOpen={isFloatingExpertOpen}
            onClose={() => setIsFloatingExpertOpen(false)}
            onNavigate={(tab, ctx) => {
              handleNavigate(tab, ctx);
            }}
          />
        </Suspense>
      )}

      {/* Barra de Navegação Inferior Mobile (PWA & Ergonomia) */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          handleNavigate(tab);
          setIsMobileMenuOpen(false);
        }}
        onOpenMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />
    </div>
  );
};
