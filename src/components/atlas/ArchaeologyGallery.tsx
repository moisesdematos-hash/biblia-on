// src/components/atlas/ArchaeologyGallery.tsx
import React, { useState } from 'react';
import { Landmark, Calendar, MapPin, BookOpen, ShieldCheck, Search, ExternalLink, ArrowRight } from 'lucide-react';
import { ARCHAEOLOGY_FINDINGS } from '../../data/archaeologyData';
import type { ArchaeologicalFinding } from '../../types';

interface ArchaeologyGalleryProps {
  onSelectPlaceOnMap?: (placeId: string) => void;
}

export const ArchaeologyGallery: React.FC<ArchaeologyGalleryProps> = ({ onSelectPlaceOnMap }) => {
  const [selectedFinding, setSelectedFinding] = useState<ArchaeologicalFinding>(ARCHAEOLOGY_FINDINGS[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = ARCHAEOLOGY_FINDINGS.filter(f => {
    const q = searchQuery.toLowerCase().trim();
    return !q || 
      f.title.toLowerCase().includes(q) ||
      f.biblicalCorrelation.toLowerCase().includes(q) ||
      f.locationFound.toLowerCase().includes(q) ||
      f.period.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Barra de Filtro e Apresentação */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-title font-bold text-slate-900 dark:text-white">
              Arqueologia Bíblica: As Pedras Clamam
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Descobertas arqueológicas extrabíblicas que corroboram a fidelidade histórica das Escrituras
            </p>
          </div>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Pesquisar achado ou local..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
          />
        </div>
      </div>

      {/* Grid Principal: Lista + Detalhe */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna Esquerda: Lista de Achados */}
        <div className="lg:col-span-1 space-y-2 max-h-[680px] overflow-y-auto pr-1">
          {filtered.map(f => {
            const isSelected = selectedFinding.id === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setSelectedFinding(f)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start space-x-3 ${
                  isSelected
                    ? 'bg-[#1E3E62] text-white border-[#D4AF37] shadow-md scale-[1.01]'
                    : 'bg-white dark:bg-[#0B192C] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <span className="text-xl p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 shrink-0">
                  {f.iconSymbol}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">{f.period}</span>
                    <span className="text-[10px] text-slate-400">{f.discoveryYear}</span>
                  </div>
                  <h3 className="font-semibold text-xs sm:text-sm truncate mt-0.5">{f.title}</h3>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{f.locationFound}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Coluna Direita: Ficha Completa do Achado Arqueológico */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0B192C] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5 gap-3">
            <div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-[#D4AF37] mb-1">
                <span>{selectedFinding.period}</span>
                <span>•</span>
                <span>Descoberto em {selectedFinding.discoveryYear}</span>
              </div>
              <h2 className="font-title text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {selectedFinding.title}
              </h2>
            </div>

            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 self-start sm:self-auto">
              <ShieldCheck className="w-4 h-4" />
              <span>Autenticidade Confirmada</span>
            </div>
          </div>

          {/* Dados de Descoberta e Museu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-xs">
              <strong className="text-slate-900 dark:text-white block mb-0.5">Local do Achado:</strong>
              <span className="text-slate-600 dark:text-slate-300 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{selectedFinding.locationFound}</span>
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-xs">
              <strong className="text-slate-900 dark:text-white block mb-0.5">Localização Atual:</strong>
              <span className="text-slate-600 dark:text-slate-300 flex items-center space-x-1">
                <Landmark className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{selectedFinding.currentLocation}</span>
              </span>
            </div>
          </div>

          {/* Descrição Histórica */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Descrição do Monumento / Artefacto
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              {selectedFinding.description}
            </p>
          </div>

          {/* Correlação Bíblica Exata */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center space-x-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Correlação Bíblica</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
              {selectedFinding.biblicalCorrelation}
            </p>
            <div className="pt-1 text-xs text-[#D4AF37] font-mono">
              Passagens-chave: {selectedFinding.keyVerses.join('; ')}
            </div>
          </div>

          {/* Significado para a Fé e Apologética */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Significado Arqueológico & Teológico
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {selectedFinding.significance}
            </p>
          </div>

          {/* Botão de Localização no Atlas */}
          {selectedFinding.mapPlaceId && onSelectPlaceOnMap && (
            <div className="pt-2">
              <button
                onClick={() => onSelectPlaceOnMap(selectedFinding.mapPlaceId!)}
                className="px-4 py-2.5 rounded-xl bg-[#1E3E62] hover:bg-[#28507d] text-[#D4AF37] font-semibold text-xs flex items-center space-x-2 border border-[#D4AF37]/50 shadow-sm transition-all"
              >
                <span>Ver Localização no Atlas Bíblico</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
