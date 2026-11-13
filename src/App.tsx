// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Navbar, type ActiveTab } from './components/layout/Navbar';
import { InstitutionalBanner } from './components/layout/InstitutionalBanner';
import { HomePage } from './components/home/HomePage';
import { BibleExplorer } from './components/explorer/BibleExplorer';
import { AIChat } from './components/chat/AIChat';
import { CharactersEncyclopedia } from './components/characters/CharactersEncyclopedia';
import { OriginalWordsLab } from './components/lexicon/OriginalWordsLab';
import { PropheciesLab } from './components/prophecies/PropheciesLab';
import { ContradictionsInvestigator } from './components/contradictions/ContradictionsInvestigator';
import { AtlasAndTimeline } from './components/atlas/AtlasAndTimeline';
import { LifeGuidanceView } from './components/life/LifeGuidanceView';
import { QuizzesView } from './components/quizzes/QuizzesView';
import { PersonalLibrary } from './components/library/PersonalLibrary';
import { DonationsAndTransparency } from './components/donations/DonationsAndTransparency';
import { AdminPanel } from './components/admin/AdminPanel';

// Novos módulos integrados
import { GenealogyTree } from './components/genealogy/GenealogyTree';
import { ReadingPlansView } from './components/readingPlans/ReadingPlansView';
import { SpeechPreparer } from './components/teaching/SpeechPreparer';
import { AdaptiveTutor } from './components/tutor/AdaptiveTutor';
import { TranslationComparator } from './components/translations/TranslationComparator';
import { LivingCodexView } from './components/codex/LivingCodexView';
import { CharacterDialogView } from './components/characters/CharacterDialogView';
import { ToolExpertChat } from './components/assistant/ToolExpertChat';
import { Bot } from 'lucide-react';
import type { LanguageCode } from './data/i18nData';

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
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B192C] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
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
      />

      {/* Conteúdo Dinâmico */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSearchSubmit={handleSearchSubmit}
          />
        )}

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

        {activeTab === 'speeches' && <SpeechPreparer />}

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
      </main>

      {/* Botão Flutuante Compacto do Copiloto (Redimensionado e Reposicionado Acima da Barra de Envio) */}
      {!isFloatingExpertOpen && activeTab !== 'tool_assistant' && (
        <button
          onClick={() => setIsFloatingExpertOpen(true)}
          className="fixed bottom-24 right-4 sm:bottom-28 sm:right-6 z-40 p-2.5 sm:p-3 rounded-full bg-gradient-to-tr from-[#D4AF37] via-amber-400 to-[#D4AF37] text-slate-950 shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white/80 ring-2 ring-[#D4AF37]/60 group flex items-center justify-center"
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
        <ToolExpertChat
          isFloating={true}
          isOpen={isFloatingExpertOpen}
          onClose={() => setIsFloatingExpertOpen(false)}
          onNavigate={(tab, ctx) => {
            handleNavigate(tab, ctx);
          }}
        />
      )}
    </div>
  );
};
