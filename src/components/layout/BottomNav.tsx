// src/components/layout/BottomNav.tsx
import React from 'react';
import { 
  Compass, 
  BookOpen, 
  Sparkles, 
  MessageSquare, 
  Layers 
} from 'lucide-react';
import type { ActiveTab } from './Navbar';

interface BottomNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenMobileMenu,
  isMobileMenuOpen
}) => {
  const items = [
    { id: 'home' as ActiveTab, label: 'Início', icon: Compass },
    { id: 'explorer' as ActiveTab, label: 'Bíblia', icon: BookOpen },
    { id: 'codex' as ActiveTab, label: 'Codex 👑', icon: Sparkles, special: true },
    { id: 'chat' as ActiveTab, label: 'Chat IA', icon: MessageSquare },
  ];

  return (
    <nav 
      aria-label="Navegação Principal Mobile" 
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B192C]/95 backdrop-blur-md border-t border-slate-700/80 md:hidden px-2 py-1 shadow-2xl safe-area-bottom"
    >
      <div className="grid grid-cols-5 items-center justify-around h-14 max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id && !isMobileMenuOpen;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-[#D4AF37] font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-[#1E3E62]/80 border border-[#D4AF37]/40 shadow-sm' : ''}`}>
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : item.special ? 'text-amber-400' : 'text-slate-400'}`} />
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-full">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Botão de Todos os Módulos (Menu) */}
        <button
          onClick={onOpenMobileMenu}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${
            isMobileMenuOpen
              ? 'text-[#D4AF37] font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Ver todos os módulos e recursos bíblicos"
        >
          <div className={`p-1 rounded-lg ${isMobileMenuOpen ? 'bg-[#1E3E62]/80 border border-[#D4AF37]/40 shadow-sm' : ''}`}>
            <Layers className={`w-4 h-4 ${isMobileMenuOpen ? 'text-[#D4AF37]' : 'text-slate-400'}`} />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-full">
            Módulos
          </span>
        </button>
      </div>
    </nav>
  );
};
