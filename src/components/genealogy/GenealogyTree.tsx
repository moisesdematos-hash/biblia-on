// src/components/genealogy/GenealogyTree.tsx
import React, { useState } from 'react';
import { GitBranch, User, ChevronRight, BookOpen, Info, ShieldCheck } from 'lucide-react';
import { GENEALOGY_DATA, type GenealogyNode } from '../../data/genealogyData';

export const GenealogyTree: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<GenealogyNode>(
    GENEALOGY_DATA.find(n => n.id === 'jesus_cristo') || GENEALOGY_DATA[0]
  );
  const [lineageFilter, setLineageFilter] = useState<'todos' | 'patriarcal' | 'doze_tribos' | 'davi_salomao_legal' | 'davi_nata_biologico'>('todos');

  const filteredNodes = GENEALOGY_DATA.filter(n => {
    if (lineageFilter === 'todos') return true;
    return n.lineage === lineageFilter;
  });

  const father = GENEALOGY_DATA.find(n => n.id === selectedNode.fatherId);
  const children = GENEALOGY_DATA.filter(n => n.fatherId === selectedNode.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabeçalho */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
          <GitBranch className="w-4 h-4" />
          <span>Árvores Genealógicas & Linhagens Sagradas</span>
        </div>
        <h1 className="font-title text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
          As Gerações das Escrituras
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl">
          Explora a linhagem desde Adão até ao Messias Jesus Cristo, compreendendo as 12 Tribos de Israel e a convergência das genealogias legal (Mateus) e biológica (Lucas).
        </p>
      </div>

      {/* Filtros de Linhagem */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: 'todos', label: 'Toda a Linhagem' },
          { id: 'patriarcal', label: 'Linha Messiânica Patriarcal' },
          { id: 'doze_tribos', label: 'As 12 Tribos de Israel' },
          { id: 'davi_salomao_legal', label: 'Ramo Régio de Salomão (Mateus)' },
          { id: 'davi_nata_biologico', label: 'Ramo Materno de Natã (Lucas)' }
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => setLineageFilter(filter.id as any)}
            className={`text-xs px-3.5 py-1.5 rounded-xl font-medium transition-all ${
              lineageFilter === filter.id
                ? 'bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/50 shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de Gerações */}
        <div className="lg:col-span-1 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col h-[700px]">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Gerações ({filteredNodes.length})
          </h2>
          <div className="overflow-y-auto flex-1 space-y-1.5 pr-1">
            {filteredNodes.map((node) => {
              const isSelected = selectedNode.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`w-full text-left p-3 rounded-xl text-xs transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#1E3E62] text-[#D4AF37] font-semibold border border-[#D4AF37]/50 shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <User className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span className="font-medium text-sm">{node.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Geração {node.generation}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ficha da Pessoa e Relações Familiares */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/30 uppercase font-semibold">
                Geração {selectedNode.generation} • {selectedNode.lineage.replace(/_/g, ' ')}
              </span>
              <h2 className="font-title text-3xl font-bold text-slate-900 dark:text-white mt-2">
                {selectedNode.name}
              </h2>
              {selectedNode.spouse && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Cônjuge: <strong className="text-slate-800 dark:text-slate-200">{selectedNode.spouse}</strong>
                </p>
              )}
            </div>

            {/* Descrição e Notas Bíblicas */}
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              {selectedNode.notes}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs">
              <strong className="text-slate-900 dark:text-white block mb-1">Registos Bíblicos:</strong>
              <span className="font-mono text-[#D4AF37]">{selectedNode.biblicalRefs}</span>
            </div>

            {/* Navegação Entre Gerações: Pai e Filhos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Pai */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs">
                <span className="text-slate-400 block mb-1">Ascendente / Pai:</span>
                {father ? (
                  <button
                    onClick={() => setSelectedNode(father)}
                    className="font-semibold text-sm text-[#D4AF37] hover:underline flex items-center space-x-1"
                  >
                    <span>{father.name}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-slate-500 italic">Início da linhagem ou sem registro de pai direto</span>
                )}
              </div>

              {/* Filhos */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs">
                <span className="text-slate-400 block mb-1">Descendentes Registados:</span>
                {children.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {children.map(ch => (
                      <button
                        key={ch.id}
                        onClick={() => setSelectedNode(ch)}
                        className="px-2.5 py-1 rounded-lg bg-[#1E3E62] text-[#D4AF37] font-semibold text-xs hover:bg-[#1E3E62]/80 transition-colors"
                      >
                        {ch.name}
                      </button>
                    ))}
                  </div>
                ) : (
                  <span className="text-slate-500 italic">Culminação profética ou sem continuação registada</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
