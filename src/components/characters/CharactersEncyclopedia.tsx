// src/components/characters/CharactersEncyclopedia.tsx
import React, { useState } from 'react';
import { Users, Search, BookOpen, Clock, MapPin, Heart, ArrowRight, ShieldCheck } from 'lucide-react';
import { CHARACTERS_DATA } from '../../data/charactersData';
import type { Character } from '../../types';

export const CharactersEncyclopedia: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(CHARACTERS_DATA[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [eraFilter, setEraFilter] = useState<string>('todos');

  const eras = [
    { id: 'todos', label: 'Todas as Eras' },
    { id: 'patriarcas', label: 'Patriarcas' },
    { id: 'exodo', label: 'Êxodo & Lei' },
    { id: 'monarquia', label: 'Monarquia' },
    { id: 'exilio', label: 'Exílio' },
    { id: 'jesus', label: 'Jesus' },
    { id: 'apostolos', label: 'Apóstolos' },
  ];

  const filteredCharacters = CHARACTERS_DATA.filter(c => {
    if (eraFilter !== 'todos' && c.timelineEra !== eraFilter) return false;
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabeçalho */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
          <Users className="w-4 h-4" />
          <span>Enciclopédia Biográfica das Escrituras</span>
        </div>
        <h1 className="font-title text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Homens e Mulheres de Fé
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl">
          Explora as biografias, decisões, erros, consequências e lições atemporais de cada personagem bíblica em seu contexto histórico real.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Painel Esquerdo: Busca e Lista de Personagens */}
        <div className="lg:col-span-1 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col h-[750px]">
          {/* Busca */}
          <div className="relative mb-3">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar personagem..."
              className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Filtro por Era */}
          <div className="flex flex-wrap gap-1 mb-3">
            {eras.map(era => (
              <button
                key={era.id}
                onClick={() => setEraFilter(era.id)}
                className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-colors ${
                  eraFilter === era.id
                    ? 'bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/50'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}
              >
                {era.label}
              </button>
            ))}
          </div>

          {/* Lista com scroll */}
          <div className="overflow-y-auto flex-1 space-y-1.5 pr-1">
            {filteredCharacters.map((char) => {
              const isSelected = selectedCharacter.id === char.id;
              return (
                <button
                  key={char.id}
                  onClick={() => setSelectedCharacter(char)}
                  className={`w-full text-left p-3 rounded-xl text-xs transition-all flex flex-col ${
                    isSelected
                      ? 'bg-[#1E3E62] text-[#D4AF37] font-semibold border border-[#D4AF37]/50 shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">{char.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{char.timelineEra}</span>
                  </div>
                  {char.nameMeaning && (
                    <span className="text-[11px] text-slate-400 italic truncate mt-0.5">
                      {char.nameMeaning}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Painel Central e Direito: Ficha Completa da Personagem */}
        <div className="lg:col-span-3 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          {/* Cabeçalho da Personagem */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span className="flex items-center space-x-1 text-[#D4AF37] font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>{selectedCharacter.period}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{selectedCharacter.location}</span>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-title text-3xl font-bold text-slate-900 dark:text-white">
                  {selectedCharacter.name}
                </h2>
                {selectedCharacter.nameMeaning && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 italic mt-1">
                    Significado do Nome: <strong className="text-slate-700 dark:text-slate-200 font-medium">{selectedCharacter.nameMeaning}</strong>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Dados Familiares e Genealógicos */}
          {selectedCharacter.family && (
            <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
              <h3 className="font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                Família & Genealogia
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700 dark:text-slate-300">
                {selectedCharacter.family.father && (
                  <div><strong className="text-slate-900 dark:text-white">Pai: </strong>{selectedCharacter.family.father}</div>
                )}
                {selectedCharacter.family.mother && (
                  <div><strong className="text-slate-900 dark:text-white">Mãe: </strong>{selectedCharacter.family.mother}</div>
                )}
                {selectedCharacter.family.spouse && (
                  <div><strong className="text-slate-900 dark:text-white">Cônjuge(s): </strong>{selectedCharacter.family.spouse.join(', ')}</div>
                )}
                {selectedCharacter.family.children && (
                  <div><strong className="text-slate-900 dark:text-white">Filhos: </strong>{selectedCharacter.family.children.join(', ')}</div>
                )}
              </div>
            </div>
          )}

          {/* Acontecimentos Marcantes */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#D4AF37] mb-2 flex items-center space-x-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Acontecimentos Históricos Principais</span>
            </h3>
            <ul className="space-y-2">
              {selectedCharacter.events.map((ev, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start space-x-2">
                  <span className="text-[#D4AF37] font-bold">•</span>
                  <span>{ev}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Qualidades & Decisões */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30">
              <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
                Qualidades Notáveis
              </h4>
              <ul className="space-y-1.5">
                {selectedCharacter.qualities.map((q, i) => (
                  <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30">
              <h4 className="font-bold text-xs uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-2">
                Decisões Capitais & Consequências
              </h4>
              <ul className="space-y-1.5">
                {selectedCharacter.decisions.map((d, i) => (
                  <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lições Práticas para Hoje */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-[#1E3E62]/30 border border-amber-200 dark:border-amber-900/40">
            <h4 className="font-bold text-xs uppercase tracking-wider text-amber-700 dark:text-[#D4AF37] mb-2 flex items-center space-x-1.5">
              <Heart className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Lições Atemporais para a Nossa Vida</span>
            </h4>
            <div className="space-y-2">
              {selectedCharacter.lessons.map((lesson, i) => (
                <p key={i} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {lesson}
                </p>
              ))}
            </div>
          </div>

          {/* Versículos Chave */}
          <div className="pt-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Passagens Bíblicas Chave
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedCharacter.keyVerses.map((v, i) => (
                <span
                  key={i}
                  className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
