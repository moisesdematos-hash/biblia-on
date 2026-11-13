// src/components/atlas/BiblicalMap.tsx
import React, { useState } from 'react';
import { 
  ZoomIn, ZoomOut, RotateCcw, MapPin, Layers, Compass, 
  Search, Eye, Navigation, Award, Sparkles, Filter
} from 'lucide-react';
import { PLACES_DATA, BIBLICAL_ROUTES, type ExtendedBiblicalPlace, type BiblicalRoute } from '../../data/placesData';

interface BiblicalMapProps {
  selectedPlace: ExtendedBiblicalPlace;
  onSelectPlace: (place: ExtendedBiblicalPlace) => void;
}

export const BiblicalMap: React.FC<BiblicalMapProps> = ({ selectedPlace, onSelectPlace }) => {
  const [mapMode, setMapMode] = useState<'world' | 'canaan'>('world');
  const [theme, setTheme] = useState<'navy' | 'parchment'>('navy');
  const [activeRouteId, setActiveRouteId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredPlace, setHoveredPlace] = useState<ExtendedBiblicalPlace | null>(null);

  const activeRoute: BiblicalRoute | undefined = BIBLICAL_ROUTES.find(r => r.id === activeRouteId);

  // Filtragem de lugares
  const filteredPlaces = PLACES_DATA.filter(p => {
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesSearch = searchTerm === '' || 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.modernName && p.modernName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Se estiver no modo Canaã, priorizar lugares com coordenadas regionais
    if (mapMode === 'canaan' && !p.canaanCoordinates) {
      return false;
    }
    return matchesCategory && matchesSearch;
  });

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.8));
  const handleReset = () => {
    setZoomLevel(1);
    setSearchTerm('');
    setCategoryFilter('all');
    setActiveRouteId(null);
  };

  // Cores dinâmicas segundo o tema selecionado com alto contraste cartográfico
  const isNavy = theme === 'navy';
  const waterColor = isNavy ? '#051121' : '#B8D5E8';
  const landColor = isNavy ? '#1B3860' : '#F5EEDA';
  const landBorder = isNavy ? '#EAB308' : '#8A5D33';
  const riverColor = isNavy ? '#38BDF8' : '#2563EB';
  const gridColor = isNavy ? 'rgba(234, 179, 8, 0.15)' : 'rgba(138, 93, 51, 0.15)';
  const labelColor = isNavy ? '#E2E8F0' : '#634423';
  const seaLabelColor = isNavy ? '#38BDF8' : '#1D4ED8';

  return (
    <div className="space-y-4">
      {/* BARRA DE CONTROLES SUPERIOR */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm text-xs">
        {/* Alternador de Âmbito: Mundo Bíblico vs Canaã / Terra Prometida */}
        <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800/80 p-1 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setMapMode('world')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1.5 transition-all ${
              mapMode === 'world'
                ? 'bg-[#1E3E62] text-[#D4AF37] shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Mundo Bíblico Antigo</span>
          </button>
          <button
            onClick={() => setMapMode('canaan')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1.5 transition-all ${
              mapMode === 'canaan'
                ? 'bg-[#1E3E62] text-[#D4AF37] shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Canaã & Terra Prometida (Zoom)</span>
          </button>
        </div>

        {/* Seletor de Tema Cartográfico */}
        <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setTheme('navy')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              isNavy ? 'bg-[#1E3E62] text-[#D4AF37]' : 'text-slate-500 hover:text-white'
            }`}
            title="Estilo Azul Imperial & Ouro"
          >
            Azul & Ouro
          </button>
          <button
            onClick={() => setTheme('parchment')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              !isNavy ? 'bg-[#8B5A2B] text-amber-100' : 'text-slate-500 hover:text-white'
            }`}
            title="Estilo Pergaminho Ancestral"
          >
            Pergaminho
          </button>
        </div>

        {/* Rotas Históricas */}
        <div className="flex items-center space-x-1.5">
          <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
          <select
            value={activeRouteId || ''}
            onChange={(e) => setActiveRouteId(e.target.value || null)}
            className="bg-slate-50 dark:bg-[#1E3E62] border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
          >
            <option value="">Sem Rotas (Apenas Lugares)</option>
            {BIBLICAL_ROUTES.map(r => (
              <option key={r.id} value={r.id}>{r.title}</option>
            ))}
          </select>
        </div>

        {/* Campo de Pesquisa Rápida */}
        <div className="relative flex-1 sm:flex-initial min-w-[160px]">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Pesquisar lugar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-[#1E3E62] border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
          />
        </div>

        {/* Controles de Zoom */}
        <div className="flex items-center space-x-1 text-slate-700 dark:text-slate-200">
          <button
            onClick={handleZoomIn}
            className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-all"
            title="Aumentar Zoom"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-all"
            title="Diminuir Zoom"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-all"
            title="Redefinir Mapa"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* FILTROS DE CATEGORIA */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs px-1">
        <span className="text-slate-400 text-[11px] font-semibold flex items-center space-x-1 mr-1">
          <Filter className="w-3 h-3 text-[#D4AF37]" />
          <span>Filtro:</span>
        </span>
        {[
          { id: 'all', label: 'Todos os Lugares' },
          { id: 'cidade', label: 'Cidades' },
          { id: 'montanha', label: 'Montes Sagrados' },
          { id: 'mar_rio', label: 'Mares & Rios' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategoryFilter(cat.id)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
              categoryFilter === cat.id
                ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* RECIPIENTE DO MAPA CARTOGRÁFICO INTERATIVO */}
      <div className={`relative w-full h-[420px] sm:h-[500px] rounded-3xl border-2 ${
        isNavy ? 'border-[#D4AF37]/40 shadow-[0_8px_30px_rgb(0,0,0,0.5)]' : 'border-[#997B4D] shadow-xl'
      } overflow-hidden select-none transition-colors duration-500`}>
        
        {/* Painel Flutuante Informativo Superior */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1 pointer-events-none">
          <div className="bg-[#0B192C]/90 dark:bg-[#0B192C]/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#D4AF37]/50 text-white shadow-lg flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-title font-bold text-[#D4AF37]">
              {mapMode === 'world' ? 'Mundo Bíblico Antigo: Mediterrâneo, Canaã, Egito e Mesopotâmia' : 'Canaã & As Doze Tribos de Israel'}
            </span>
          </div>
          {activeRoute && (
            <div className="bg-[#1E3E62]/90 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700 text-[11px] text-amber-200">
              <strong className="text-white">Rota Ativa:</strong> {activeRoute.title} ({activeRoute.period})
            </div>
          )}
        </div>

        {/* Rosa dos Ventos Decorativa */}
        <div className="absolute top-3 right-3 z-20 opacity-80 pointer-events-none flex flex-col items-center">
          <div className="w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-[#0B192C]/60 text-[#D4AF37]">
            <Navigation className="w-5 h-5 -rotate-45" />
          </div>
          <span className="text-[9px] font-bold text-[#D4AF37] mt-0.5 tracking-wider">NORTE</span>
        </div>

        {/* SVG DO MAPA */}
        <div 
          className="w-full h-full transition-transform duration-300 ease-out origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {mapMode === 'world' ? (
            /* MAPA MUNDIAL BÍBLICO (Mediterrâneo à Mesopotâmia) */
            <svg
              viewBox="0 0 1000 650"
              className="w-full h-full"
              style={{ backgroundColor: waterColor }}
            >
              <defs>
                {/* Padrão de Grade Geográfica Náutica */}
                <pattern id="world-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke={gridColor} strokeWidth="0.75" strokeDasharray="3,3" />
                </pattern>
                {/* Gradiente de Relevo com alto relevo cartográfico */}
                <linearGradient id="land-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={landColor} />
                  <stop offset="100%" stopColor={isNavy ? '#234978' : '#ECE1C8'} />
                </linearGradient>
                {/* Brilho da Rota */}
                <filter id="route-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Grade Cartográfica */}
              <rect width="1000" height="650" fill="url(#world-grid)" />

              {/* CONTINENTES E TERRAS BÍBLICAS */}
              {/* 1. Europa Meridional / Península Itálica e Balcãs */}
              <path
                d="M 50,0 L 220,0 L 220,70 L 180,95 L 140,120 L 110,160 L 130,220 L 160,225 L 140,240 L 105,250 L 95,200 L 75,170 L 70,120 L 40,70 Z"
                fill="url(#land-gradient)"
                stroke={landBorder}
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              {/* Sicília */}
              <polygon points="90,260 120,265 105,285" fill="url(#land-gradient)" stroke={landBorder} strokeWidth="1" />
              {/* Grécia / Peloponeso */}
              <path
                d="M 220,0 L 320,0 L 320,70 L 280,100 L 250,140 L 260,180 L 245,225 L 265,245 L 255,270 L 235,275 L 225,240 L 210,190 L 195,140 L 220,70 Z"
                fill="url(#land-gradient)"
                stroke={landBorder}
                strokeWidth="1.2"
              />
              {/* Creta */}
              <path d="M 280,335 C 310,330 350,333 365,340 C 350,345 300,345 280,335 Z" fill="url(#land-gradient)" stroke={landBorder} strokeWidth="1" />

              {/* 2. Ásia Menor (Anatólia) */}
              <path
                d="M 320,0 L 640,0 L 640,90 L 590,110 L 520,115 L 430,105 L 350,110 L 320,130 L 335,170 L 320,200 L 340,230 L 390,235 L 440,245 L 500,230 L 540,235 L 565,210 L 580,170 L 600,120 L 640,90 Z"
                fill="url(#land-gradient)"
                stroke={landBorder}
                strokeWidth="1.2"
              />
              {/* Chipre */}
              <path d="M 485,280 C 510,270 535,275 540,285 C 525,295 495,295 485,280 Z" fill="url(#land-gradient)" stroke={landBorder} strokeWidth="1" />

              {/* 3. Crescente Fértil, Canaã, Mesopotâmia e Arábia */}
              <path
                d="M 640,0 L 1000,0 L 1000,650 L 570,650 
                   L 550,560 L 545,510 L 560,490 L 570,440 L 575,370 L 572,320 L 565,260 L 560,230 
                   L 590,180 L 640,120 L 700,90 L 770,80 L 860,100 L 940,140 L 1000,180 Z"
                fill="url(#land-gradient)"
                stroke={landBorder}
                strokeWidth="1.2"
              />

              {/* Golfo Pérsico (Água cavada no sudeste) */}
              <path
                d="M 850,420 Q 890,460 930,490 Q 980,530 1000,560 L 1000,650 L 860,650 Q 840,550 830,480 Z"
                fill={waterColor}
                stroke={landBorder}
                strokeWidth="1"
              />

              {/* 4. Norte da África, Egito e Península do Sinai */}
              <path
                d="M 0,380 L 410,380 L 450,400 L 485,410 L 515,395 L 545,410 
                   L 540,490 L 535,540 L 525,480 L 505,435 L 490,435 
                   L 485,550 L 480,650 L 0,650 Z"
                fill="url(#land-gradient)"
                stroke={landBorder}
                strokeWidth="1.2"
              />

              {/* Mar Vermelho (Braço de Suez e Aqaba e corpo principal) */}
              <path
                d="M 505,435 L 530,535 L 540,575 L 570,650 L 610,650 L 575,565 L 560,495 L 555,445 L 545,480 L 530,535 Z"
                fill={waterColor}
                stroke={landBorder}
                strokeWidth="1"
              />

              {/* RIOS HISTÓRICOS SAGRADOS */}
              {/* Rio Nilo e Delta */}
              <path
                d="M 485,650 Q 480,560 488,485 Q 492,440 485,420 M 485,420 L 455,400 M 485,420 L 510,400 M 485,420 L 485,405"
                fill="none"
                stroke={riverColor}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Rio Tigre (Hidéquel) */}
              <path
                d="M 680,105 Q 710,130 735,175 Q 770,230 815,320 Q 845,380 870,425"
                fill="none"
                stroke={riverColor}
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Rio Eufrates */}
              <path
                d="M 635,115 Q 645,160 670,210 Q 720,260 775,320 Q 825,380 870,425"
                fill="none"
                stroke={riverColor}
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              {/* Mar da Galileia, Rio Jordão e Mar Salgado */}
              <ellipse cx="575" cy="335" rx="3.5" ry="5" fill={riverColor} stroke={landBorder} strokeWidth="0.5" />
              <path d="M 575,340 L 575,365" fill="none" stroke={riverColor} strokeWidth="1.5" />
              <ellipse cx="575" cy="378" rx="4" ry="12" fill={riverColor} stroke={landBorder} strokeWidth="0.5" />

              {/* RÓTULOS GEOGRÁFICOS DE ÁGUA E TERRA */}
              <text x="280" y="380" fill={seaLabelColor} fontSize="14" fontWeight="bold" letterSpacing="4" opacity="0.6">
                MAR MEDITERRÂNEO (MAR GRANDE)
              </text>
              <text x="680" y="60" fill={seaLabelColor} fontSize="11" fontWeight="bold" letterSpacing="2" opacity="0.6">
                PONTO EUXINO (MAR NEGRO)
              </text>
              <text x="560" y="590" fill={seaLabelColor} fontSize="10" fontWeight="bold" letterSpacing="2" opacity="0.7">
                MAR VERMELHO
              </text>
              <text x="890" y="520" fill={seaLabelColor} fontSize="10" fontWeight="bold" letterSpacing="1" opacity="0.7">
                GOLFO PÉRSICO
              </text>

              <text x="120" y="90" fill={labelColor} fontSize="11" fontWeight="bold" letterSpacing="2" opacity="0.7">
                ITÁLIA
              </text>
              <text x="230" y="150" fill={labelColor} fontSize="11" fontWeight="bold" letterSpacing="2" opacity="0.7">
                GRÉCIA
              </text>
              <text x="430" y="160" fill={labelColor} fontSize="12" fontWeight="bold" letterSpacing="3" opacity="0.7">
                ÁSIA MENOR
              </text>
              <text x="590" y="340" fill="#D4AF37" fontSize="13" fontWeight="bold" letterSpacing="2">
                CANAÃ / ISRAEL
              </text>
              <text x="430" y="510" fill={labelColor} fontSize="12" fontWeight="bold" letterSpacing="3" opacity="0.7">
                EGITO
              </text>
              <text x="535" y="480" fill="#D4AF37" fontSize="10" fontWeight="bold" letterSpacing="1" opacity="0.8">
                SINAI
              </text>
              <text x="730" y="240" fill={labelColor} fontSize="13" fontWeight="bold" letterSpacing="3" opacity="0.7">
                MESOPOTÂMIA
              </text>
              <text x="760" y="340" fill="#D4AF37" fontSize="11" fontWeight="bold" letterSpacing="2" opacity="0.8">
                BABILÔNIA
              </text>

              {/* ROTA ATIVA (se selecionada) */}
              {activeRoute && (
                <g filter="url(#route-glow)">
                  <polyline
                    points={activeRoute.points.map(pt => `${(pt.x / 100) * 1000},${(pt.y / 100) * 650}`).join(' ')}
                    fill="none"
                    stroke={activeRoute.color}
                    strokeWidth="3.5"
                    strokeDasharray="6,4"
                    strokeLinecap="round"
                  />
                  {activeRoute.points.map((pt, idx) => (
                    <circle
                      key={idx}
                      cx={(pt.x / 100) * 1000}
                      cy={(pt.y / 100) * 650}
                      r="4.5"
                      fill={activeRoute.color}
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                  ))}
                </g>
              )}

              {/* PONTOS DOS LUGARES BÍBLICOS */}
              {filteredPlaces.map((place) => {
                const isSelected = selectedPlace.id === place.id;
                const px = (place.coordinates?.x || 50) * 10;
                const py = ((place.coordinates?.y || 50) / 100) * 650;

                return (
                  <g
                    key={place.id}
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => onSelectPlace(place)}
                    onMouseEnter={() => setHoveredPlace(place)}
                    onMouseLeave={() => setHoveredPlace(null)}
                  >
                    {isSelected && (
                      <circle
                        cx={px}
                        cy={py}
                        r="16"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="2"
                        className="animate-ping origin-center opacity-60"
                      />
                    )}
                    <circle
                      cx={px}
                      cy={py}
                      r={isSelected ? 7 : 5}
                      fill={isSelected ? '#F59E0B' : (place.category === 'montanha' ? '#10B981' : place.category === 'mar_rio' ? '#06B6D4' : '#D4AF37')}
                      stroke="#0B192C"
                      strokeWidth="1.5"
                    />
                    <text
                      x={px}
                      y={py - 10}
                      textAnchor="middle"
                      fill={isSelected ? '#F59E0B' : (isNavy ? '#FFFFFF' : '#1E293B')}
                      fontSize={isSelected ? '12' : '10'}
                      fontWeight={isSelected ? 'bold' : '600'}
                      className="drop-shadow-md select-none pointer-events-none"
                    >
                      {place.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          ) : (
            /* ZOOM REGIONAL DE CANAÃ & TERRA PROMETIDA */
            <svg
              viewBox="0 0 700 800"
              className="w-full h-full"
              style={{ backgroundColor: waterColor }}
            >
              <defs>
                <pattern id="canaan-grid" width="70" height="70" patternUnits="userSpaceOnUse">
                  <path d="M 70 0 L 0 0 0 70" fill="none" stroke={gridColor} strokeWidth="0.7" strokeDasharray="3,3" />
                </pattern>
                <linearGradient id="canaan-land" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={landColor} />
                  <stop offset="100%" stopColor={isNavy ? '#234978' : '#ECE1C8'} />
                </linearGradient>
              </defs>

              <rect width="700" height="800" fill="url(#canaan-grid)" />

              {/* TERRA DE CANAÃ / COSTA ORIENTAL DO MEDITERRÂNEO */}
              {/* Costa Marítima a Oeste */}
              <path
                d="M 220,0 
                   Q 210,80 190,140 
                   Q 220,170 170,210 
                   Q 160,280 145,360 
                   Q 130,440 110,540 
                   Q 80,630 40,720 
                   L 0,720 L 0,800 L 700,800 L 700,0 Z"
                fill="url(#canaan-land)"
                stroke={landBorder}
                strokeWidth="1.5"
              />

              {/* RIO JORDÃO, MAR DA GALILEIA E MAR SALGADO (Fenda do Rift) */}
              {/* Mar da Galileia (Lago de Quinerete) */}
              <ellipse cx="430" cy="210" rx="18" ry="26" fill={riverColor} stroke={landBorder} strokeWidth="1" />
              {/* Rio Jordão Sinuoso */}
              <path
                d="M 430,236 Q 425,290 435,340 Q 420,400 435,460 L 435,490"
                fill="none"
                stroke={riverColor}
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Mar Salgado (Mar Morto) */}
              <path
                d="M 435,490 
                   C 455,510 460,560 455,620 
                   C 445,670 425,710 415,730 
                   C 405,710 415,650 420,600 
                   C 425,540 420,510 435,490 Z"
                fill={riverColor}
                stroke={landBorder}
                strokeWidth="1"
              />

              {/* REGIÕES TRIBALIS HISTÓRICAS (Linhas sutis) */}
              <text x="320" y="650" fill={labelColor} fontSize="14" fontWeight="bold" opacity="0.5" letterSpacing="4">
                TRIBO DE JUDÁ
              </text>
              <text x="330" y="470" fill={labelColor} fontSize="12" fontWeight="bold" opacity="0.5" letterSpacing="3">
                BENJAMIM
              </text>
              <text x="330" y="380" fill={labelColor} fontSize="14" fontWeight="bold" opacity="0.5" letterSpacing="4">
                EFRAIM & SAMARIA
              </text>
              <text x="310" y="240" fill={labelColor} fontSize="14" fontWeight="bold" opacity="0.5" letterSpacing="4">
                GALILEIA / ZEBULOM
              </text>
              <text x="50" y="350" fill={seaLabelColor} fontSize="14" fontWeight="bold" letterSpacing="3" opacity="0.7">
                MAR GRANDE
              </text>
              <text x="475" y="580" fill={seaLabelColor} fontSize="11" fontWeight="bold">
                MAR SALGADO
              </text>
              <text x="460" y="210" fill={seaLabelColor} fontSize="11" fontWeight="bold">
                MAR DA GALILEIA
              </text>

              {/* PONTOS DOS LUGARES NO MAPA DE CANAÃ */}
              {filteredPlaces.map((place) => {
                if (!place.canaanCoordinates) return null;
                const isSelected = selectedPlace.id === place.id;
                const px = (place.canaanCoordinates.x / 100) * 700;
                const py = (place.canaanCoordinates.y / 100) * 800;

                return (
                  <g
                    key={place.id}
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => onSelectPlace(place)}
                    onMouseEnter={() => setHoveredPlace(place)}
                    onMouseLeave={() => setHoveredPlace(null)}
                  >
                    {isSelected && (
                      <circle
                        cx={px}
                        cy={py}
                        r="20"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="2.5"
                        className="animate-ping origin-center opacity-70"
                      />
                    )}
                    <circle
                      cx={px}
                      cy={py}
                      r={isSelected ? 8 : 6}
                      fill={isSelected ? '#F59E0B' : (place.category === 'montanha' ? '#10B981' : place.category === 'mar_rio' ? '#06B6D4' : '#D4AF37')}
                      stroke="#0B192C"
                      strokeWidth="2"
                    />
                    <text
                      x={px}
                      y={py - 12}
                      textAnchor="middle"
                      fill={isSelected ? '#F59E0B' : (isNavy ? '#FFFFFF' : '#0F172A')}
                      fontSize={isSelected ? '13' : '11'}
                      fontWeight={isSelected ? 'bold' : '700'}
                      className="drop-shadow-lg select-none pointer-events-none"
                    >
                      {place.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          )}
        </div>

        {/* CARTÃO SUSPENSO DE LUGAR EM HOVER / ATIVO */}
        {hoveredPlace && (
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-sm z-30 bg-[#0B192C]/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#D4AF37] text-white shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-1">
              <span className="font-title text-sm font-bold text-[#D4AF37]">{hoveredPlace.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 capitalize">
                {hoveredPlace.category.replace('_', ' ')}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
              {hoveredPlace.description}
            </p>
            <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
              <span>{hoveredPlace.region}</span>
              <span className="text-[#D4AF37] font-semibold">Clique para abrir detalhes completos</span>
            </div>
          </div>
        )}
      </div>

      {/* LEGENDA INFORMATIVA DA CARTOGRAFIA */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl text-[11px] text-slate-500 dark:text-slate-400">
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-slate-700 dark:text-slate-200">Legenda:</span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span>
            <span>Cidades Sagradas</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
            <span>Montes Sagrados</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4]"></span>
            <span>Mares e Rios</span>
          </span>
        </div>
        <div>
          <span>Mostrando <strong>{filteredPlaces.length}</strong> de {PLACES_DATA.length} sítios bíblicos</span>
        </div>
      </div>
    </div>
  );
};
