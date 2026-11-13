// src/components/layout/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Users, 
  Languages, 
  Compass, 
  Heart, 
  HelpCircle, 
  Bookmark, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Layers,
  Calendar,
  Mic,
  Brain,
  Columns,
  GitBranch,
  Globe,
  MessageSquare,
  Download,
  Smartphone,
  Bot
} from 'lucide-react';
import { I18N_TRANSLATIONS, type LanguageCode } from '../../data/i18nData';
import { pwaService } from '../../services/pwaService';

export type ActiveTab = 
  | 'home' 
  | 'codex'
  | 'explorer' 
  | 'chat' 
  | 'personas'
  | 'tool_assistant'
  | 'characters' 
  | 'lexicon' 
  | 'prophecies' 
  | 'contradictions' 
  | 'atlas' 
  | 'timeline' 
  | 'life' 
  | 'quizzes' 
  | 'library' 
  | 'plans'
  | 'speeches'
  | 'tutor'
  | 'compare'
  | 'genealogy'
  | 'donations'
  | 'admin';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  fontSize: 'small' | 'normal' | 'large';
  setFontSize: (size: 'small' | 'normal' | 'large') => void;
  isOfflineMode: boolean;
  currentLang: LanguageCode;
  setCurrentLang: (lang: LanguageCode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isDarkMode,
  setIsDarkMode,
  fontSize,
  setFontSize,
  isOfflineMode,
  currentLang,
  setCurrentLang
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [pwaState, setPwaState] = useState(pwaService.getState());

  useEffect(() => {
    return pwaService.subscribe((s) => setPwaState(s));
  }, []);

  const t = I18N_TRANSLATIONS[currentLang];

  const navItems = [
    { id: 'home' as ActiveTab, label: t.nav.home, icon: Compass },
    { id: 'codex' as ActiveTab, label: 'O Codex Vivo 👑', icon: Sparkles, special: true },
    { id: 'personas' as ActiveTab, label: 'Conversar com Personagens', icon: MessageSquare },
    { id: 'explorer' as ActiveTab, label: t.nav.explorer, icon: BookOpen },
    { id: 'chat' as ActiveTab, label: t.nav.chat, icon: Brain },
    { id: 'plans' as ActiveTab, label: t.nav.plans, icon: Calendar },
    { id: 'speeches' as ActiveTab, label: t.nav.speeches, icon: Mic },
    { id: 'tutor' as ActiveTab, label: t.nav.tutor, icon: Brain },
    { id: 'genealogy' as ActiveTab, label: t.nav.genealogy, icon: GitBranch },
    { id: 'characters' as ActiveTab, label: t.nav.characters, icon: Users },
    { id: 'lexicon' as ActiveTab, label: t.nav.lexicon, icon: Languages },
    { id: 'compare' as ActiveTab, label: t.nav.compare, icon: Columns },
    { id: 'prophecies' as ActiveTab, label: t.nav.prophecies, icon: Layers },
    { id: 'contradictions' as ActiveTab, label: t.nav.contradictions, icon: ShieldCheck },
    { id: 'atlas' as ActiveTab, label: t.nav.atlas, icon: MapPin },
    { id: 'timeline' as ActiveTab, label: t.nav.timeline, icon: Clock },
    { id: 'life' as ActiveTab, label: t.nav.life, icon: Heart },
    { id: 'quizzes' as ActiveTab, label: t.nav.quizzes, icon: HelpCircle },
    { id: 'library' as ActiveTab, label: t.nav.library, icon: Bookmark },
  ];

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const languages: { code: LanguageCode; label: string }[] = [
    { code: 'pt', label: 'Português' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B192C] text-white border-b border-slate-700/60 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Marca */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleSelectTab('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3E62] to-[#0B192C] p-1.5 border border-[#D4AF37]/50 shadow-inner group-hover:border-[#D4AF37] transition-all">
              <img src="/logo.svg" alt="BIBLIA ON" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-title font-bold text-lg tracking-wider text-slate-100 group-hover:text-[#D4AF37] transition-colors">
                  {t.appName}
                </span>
                <span className="bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded tracking-wide border border-[#D4AF37]/30">
                  {t.freeBadge}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block truncate max-w-[200px]">
                {t.slogan}
              </p>
            </div>
          </div>

          {/* Navegação Desktop */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.slice(0, 7).map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isSpecial = item.special;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/60 shadow-sm'
                      : isSpecial
                      ? 'bg-amber-500/15 text-[#D4AF37] border border-[#D4AF37]/40 hover:bg-amber-500/25'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive || isSpecial ? 'text-[#D4AF37]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Menu Dropdown "Todos os Módulos" */}
            <div className="relative group">
              <button 
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  navItems.slice(7).some(i => i.id === activeTab)
                    ? 'bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>Mais Recursos</span>
                <span className="text-[10px]">▼</span>
              </button>
              <div className="absolute right-0 mt-1 w-56 bg-[#0B192C] border border-slate-700 rounded-xl shadow-2xl py-2 hidden group-hover:block transition-all z-50 max-h-[480px] overflow-y-auto">
                {navItems.slice(7).map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectTab(item.id)}
                      className="w-full text-left flex items-center space-x-2.5 px-4 py-2 text-xs text-slate-300 hover:bg-[#1E3E62] hover:text-[#D4AF37] transition-colors"
                    >
                      <Icon className="w-4 h-4 text-[#D4AF37]" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
                <div className="border-t border-slate-700/80 my-1"></div>
                <button
                  onClick={() => handleSelectTab('donations')}
                  className="w-full text-left flex items-center space-x-2.5 px-4 py-2 text-xs text-amber-300 hover:bg-[#1E3E62] transition-colors font-medium"
                >
                  <Heart className="w-4 h-4 text-amber-400" />
                  <span>{t.nav.donations}</span>
                </button>
                <button
                  onClick={() => handleSelectTab('admin')}
                  className="w-full text-left flex items-center space-x-2.5 px-4 py-2 text-xs text-slate-400 hover:bg-[#1E3E62] hover:text-slate-200 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-400" />
                  <span>{t.nav.admin}</span>
                </button>
              </div>
            </div>
          </nav>

          {/* Controles de Interface */}
          <div className="flex items-center space-x-2">
            {/* Botão Especialista da Ferramenta */}
            <button
              onClick={() => handleSelectTab('tool_assistant')}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                activeTab === 'tool_assistant'
                  ? 'bg-[#1E3E62] text-[#D4AF37] border-[#D4AF37] shadow-sm'
                  : 'bg-amber-500/10 hover:bg-amber-500/20 text-[#D4AF37] border-[#D4AF37]/40 hover:border-[#D4AF37]'
              }`}
              title="Abrir o Chat Especialista em todas as funcionalidades da ferramenta"
            >
              <Bot className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden md:inline">Especialista</span>
            </button>

            {/* Botão de Instalação PWA Rápido */}
            {pwaState.isInstallable && (
              <button
                onClick={() => pwaService.promptInstall()}
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] to-amber-400 text-slate-950 font-bold text-xs hover:scale-105 transition-all shadow-md animate-pulse"
                title="Instalar BIBLIA ON no dispositivo com suporte offline"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Instalar App</span>
              </button>
            )}

            {/* Seletor de Idioma */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-300 hover:text-white hover:border-[#D4AF37] transition-colors"
                title="Selecionar Idioma"
              >
                <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="uppercase font-mono text-[11px] font-bold">{currentLang}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-[#0B192C] border border-slate-700 rounded-xl shadow-2xl py-1 z-50">
                  {languages.map(l => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setCurrentLang(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                        currentLang === l.code ? 'bg-[#1E3E62] text-[#D4AF37] font-semibold' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Ajuste de Tamanho de Fonte */}
            <div className="hidden sm:flex items-center bg-slate-800/80 rounded-lg p-0.5 border border-slate-700 text-xs">
              <button 
                onClick={() => setFontSize('small')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${fontSize === 'small' ? 'bg-[#1E3E62] text-[#D4AF37]' : 'text-slate-400 hover:text-white'}`}
                title="Texto Pequeno"
              >
                A-
              </button>
              <button 
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 rounded text-xs font-bold ${fontSize === 'normal' ? 'bg-[#1E3E62] text-[#D4AF37]' : 'text-slate-400 hover:text-white'}`}
                title="Texto Padrão"
              >
                A
              </button>
              <button 
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded text-sm font-bold ${fontSize === 'large' ? 'bg-[#1E3E62] text-[#D4AF37]' : 'text-slate-400 hover:text-white'}`}
                title="Texto Grande"
              >
                A+
              </button>
            </div>

            {/* Alternar Tema Claro/Escuro */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-[#D4AF37] hover:bg-slate-700/80 border border-slate-700 transition-colors"
              title={isDarkMode ? "Mudar para Tema Claro" : "Mudar para Tema Escuro"}
              aria-label="Alternar tema visual"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-200" />}
            </button>

            {/* Botão Menu Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0B192C] border-b border-slate-700 px-4 pt-2 pb-6 space-y-2 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all ${
                    isActive
                      ? 'bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/50'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Botão Especialista da Ferramenta Mobile */}
          <button
            onClick={() => handleSelectTab('tool_assistant')}
            className="w-full text-left flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-amber-500/20 via-[#1E3E62] to-amber-500/20 text-[#D4AF37] border border-[#D4AF37]/50 font-bold rounded-xl shadow-md text-xs cursor-pointer"
          >
            <Bot className="w-4 h-4 text-[#D4AF37]" />
            <span>Especialista BIBLIA ON (Guia da Ferramenta)</span>
          </button>

          {/* Botão PWA Mobile */}
          {pwaState.isInstallable && (
            <button
              onClick={() => {
                pwaService.promptInstall();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-[#D4AF37] to-amber-400 text-slate-950 font-bold rounded-xl shadow-md text-xs"
            >
              <Download className="w-4 h-4" />
              <span>Instalar Aplicativo BIBLIA ON</span>
            </button>
          )}

          <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between">
            <button
              onClick={() => handleSelectTab('donations')}
              className="flex items-center space-x-2 text-xs text-amber-300 font-semibold px-3 py-2 rounded-lg bg-amber-950/40 border border-amber-600/40"
            >
              <Heart className="w-4 h-4 text-amber-400" />
              <span>{t.nav.donations}</span>
            </button>
            <button
              onClick={() => handleSelectTab('admin')}
              className="text-xs text-slate-400 hover:text-slate-200 px-3 py-2"
            >
              {t.nav.admin}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
