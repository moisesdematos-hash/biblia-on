// src/components/atlas/AtlasAndTimeline.tsx
import React, { useState } from 'react';
import { MapPin, Clock, Compass, BookOpen, CheckCircle, HelpCircle, Sparkles, Landmark } from 'lucide-react';
import { PLACES_DATA, type ExtendedBiblicalPlace } from '../../data/placesData';
import { TIMELINE_EVENTS } from '../../data/timelineData';
import { BiblicalMap } from './BiblicalMap';
import { ArchaeologyGallery } from './ArchaeologyGallery';
import type { TimelineEvent } from '../../types';

export const AtlasAndTimeline: React.FC<{ initialMode?: 'atlas' | 'timeline' | 'arqueologia' }> = ({ initialMode = 'atlas' }) => {
  const [activeSubTab, setActiveSubTab] = useState<'atlas' | 'timeline' | 'arqueologia'>(initialMode);
  const [selectedPlace, setSelectedPlace] = useState<ExtendedBiblicalPlace>(PLACES_DATA[0]);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent>(TIMELINE_EVENTS[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
            <Compass className="w-4 h-4" />
            <span>Geografia & Linha Temporal Sagrada</span>
          </div>
          <h1 className="font-title text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Atlas Bíblico & Cronologia Histórica
          </h1>
        </div>

        {/* Alternador Atlas / Cronologia / Arqueologia */}
        <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 text-xs self-start sm:self-auto">
          <button
            onClick={() => setActiveSubTab('atlas')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg font-semibold transition-all ${
              activeSubTab === 'atlas'
                ? 'bg-[#1E3E62] text-[#D4AF37] shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Atlas Bíblico</span>
          </button>
          <button
            onClick={() => setActiveSubTab('timeline')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg font-semibold transition-all ${
              activeSubTab === 'timeline'
                ? 'bg-[#1E3E62] text-[#D4AF37] shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Cronologia Bíblica</span>
          </button>
          <button
            onClick={() => setActiveSubTab('arqueologia')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg font-semibold transition-all ${
              activeSubTab === 'arqueologia'
                ? 'bg-[#1E3E62] text-[#D4AF37] shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>Arqueologia Real</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'arqueologia' ? (
        /* MÓDULO ARQUEOLOGIA BÍBLICA */
        <ArchaeologyGallery 
          onSelectPlaceOnMap={(placeId) => {
            const found = PLACES_DATA.find(p => p.id === placeId);
            if (found) {
              setSelectedPlace(found);
              setActiveSubTab('atlas');
            }
          }}
        />
      ) : activeSubTab === 'atlas' ? (
        /* MÓDULO ATLAS BÍBLICO */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Lista de Cidades e Lugares */}
          <div className="lg:col-span-1 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-2 h-[700px] overflow-y-auto">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Lugares do Mundo Bíblico
            </h2>
            {PLACES_DATA.map((place) => {
              const isSelected = selectedPlace.id === place.id;
              return (
                <button
                  key={place.id}
                  onClick={() => setSelectedPlace(place)}
                  className={`w-full text-left p-3.5 rounded-xl text-xs transition-all flex flex-col ${
                    isSelected
                      ? 'bg-[#1E3E62] text-[#D4AF37] font-semibold border border-[#D4AF37]/50 shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">{place.name}</span>
                    {place.confirmedLocation ? (
                      <span className="w-2 h-2 rounded-full bg-emerald-500" title="Localização arqueológica confirmada"></span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-amber-500" title="Localização provável ou discutida"></span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-0.5">{place.region}</span>
                </button>
              );
            })}
          </div>

          {/* Mapa Vetorial e Ficha do Lugar */}
          <div className="lg:col-span-3 space-y-6">
            {/* Mapa Vetorial Cartográfico Interativo Offline Completo */}
            <BiblicalMap
              selectedPlace={selectedPlace}
              onSelectPlace={(p) => setSelectedPlace(p)}
            />

            {/* Detalhes do Lugar Selecionado */}
            <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 gap-2">
                <div>
                  <h2 className="font-title text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {selectedPlace.name}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Região: <strong className="text-slate-800 dark:text-slate-200">{selectedPlace.region}</strong> 
                    {selectedPlace.modernName && ` • Atualidade: ${selectedPlace.modernName}`}
                  </p>
                </div>

                <div className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedPlace.confirmedLocation 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {selectedPlace.confirmedLocation ? <CheckCircle className="w-3.5 h-3.5" /> : <HelpCircle className="w-3.5 h-3.5" />}
                  <span>{selectedPlace.confirmedLocation ? 'Localização Confirmada' : 'Localização Provável / Discutida'}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {selectedPlace.description}
              </p>

              {/* Eventos Principais no Local */}
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#D4AF37] mb-2 flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Acontecimentos Sagrados Registados Neste Local</span>
                </h3>
                <ul className="space-y-1.5">
                  {selectedPlace.majorEvents.map((ev, i) => (
                    <li key={i} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start space-x-2">
                      <span className="text-[#D4AF37] font-bold">•</span>
                      <span>{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Personagens Associadas e Versículos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs">
                  <strong className="text-slate-900 dark:text-white block mb-1">Personagens Associadas:</strong>
                  <span className="text-slate-600 dark:text-slate-300">{selectedPlace.associatedCharacters.join(', ')}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs">
                  <strong className="text-slate-900 dark:text-white block mb-1">Referências Bíblicas Principais:</strong>
                  <span className="font-mono text-[#D4AF37]">{selectedPlace.keyVerses.join('; ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* MÓDULO CRONOLOGIA HISTÓRICA */
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="font-title text-xl font-bold text-slate-900 dark:text-white mb-2">
              Linha do Tempo Bíblica (Desde a Criação ao Primeiro Século)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              As datas anteriores à monarquia de David são indicadas como aproximadas com base no cálculo dos anos das genealogias massoréticas bíblicas.
            </p>

            <div className="relative border-l-2 border-[#D4AF37] ml-4 space-y-8 pl-6">
              {TIMELINE_EVENTS.map((event) => {
                const isSelected = selectedEvent.id === event.id;
                return (
                  <div
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className="relative cursor-pointer group"
                  >
                    {/* Marcador na Linha */}
                    <div className={`absolute -left-[33px] top-1 w-4 h-4 rounded-full border-2 border-[#0B192C] transition-all ${
                      isSelected ? 'bg-amber-400 ring-4 ring-amber-400/30' : 'bg-[#D4AF37]'
                    }`}></div>

                    <div className={`p-5 rounded-2xl border transition-all ${
                      isSelected 
                        ? 'bg-[#1E3E62] border-[#D4AF37] text-white shadow-lg' 
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:border-[#D4AF37]'
                    }`}>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#0B192C] text-[#D4AF37] font-bold border border-[#D4AF37]/30">
                          {event.yearApproximate} {event.isApproximate && '(Aprox.)'}
                        </span>
                        <span className="text-[11px] text-slate-400 capitalize">
                          Era: {event.category}
                        </span>
                      </div>

                      <h3 className="font-title text-lg font-bold text-slate-900 dark:text-white mb-1">
                        {event.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                        {event.description}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-2 border-t border-slate-200 dark:border-slate-700/60">
                        <span className="text-slate-500 dark:text-slate-400">
                          <strong>Figuras: </strong>{event.keyFigures.join(', ')}
                        </span>
                        <span className="font-mono text-[#D4AF37]">
                          {event.keyScriptures.join('; ')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
