// src/components/explorer/BibleExplorer.tsx
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  BookmarkCheck, 
  Edit3, 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Info,
  Share2,
  Columns3,
  Sparkles,
  Paintbrush,
  Layers,
  Palette
} from 'lucide-react';
import { BIBLE_BOOKS, BIBLE_DIVISIONS } from '../../data/bibleBooks';
import { getChapterVerses } from '../../services/bibleTextService';
import type { BibleBook, BibleVerse, UserNote, UserBookmark, UserHighlight, HighlightColor } from '../../types';
import { db, addReadingHistory } from '../../db/bibliaOnDb';
import { speechService } from '../../services/speechService';
import { BiblicalConcordanceModal } from '../study/BiblicalConcordanceModal';
import { VerseCardGeneratorModal } from '../study/VerseCardGeneratorModal';
import { VerseComparisonModal } from '../translations/VerseComparisonModal';

interface BibleExplorerProps {
  initialBookId?: string;
  initialChapter?: number;
  fontSize: 'small' | 'normal' | 'large';
}

const HIGHLIGHT_STYLES: Record<HighlightColor, { label: string; bg: string; text: string; ring: string }> = {
  yellow: { label: 'Promessa Divina', bg: 'bg-amber-300/30 dark:bg-amber-400/20', text: 'text-amber-500', ring: 'ring-amber-400' },
  green: { label: 'Princípio Moral', bg: 'bg-emerald-300/30 dark:bg-emerald-400/20', text: 'text-emerald-500', ring: 'ring-emerald-400' },
  blue: { label: 'Profecia & Soberania', bg: 'bg-sky-300/30 dark:bg-sky-400/20', text: 'text-sky-500', ring: 'ring-sky-400' },
  red: { label: 'Mandamento & Alerta', bg: 'bg-rose-300/30 dark:bg-rose-400/20', text: 'text-rose-500', ring: 'ring-rose-400' },
  purple: { label: 'Amor Leal (Chésed)', bg: 'bg-purple-300/30 dark:bg-purple-400/20', text: 'text-purple-500', ring: 'ring-purple-400' },
};

export const BibleExplorer: React.FC<BibleExplorerProps> = ({
  initialBookId = 'gen',
  initialChapter = 1,
  fontSize
}) => {
  const [selectedBook, setSelectedBook] = useState<BibleBook>(
    BIBLE_BOOKS.find(b => b.id === initialBookId) || BIBLE_BOOKS[0]
  );
  const [selectedChapter, setSelectedChapter] = useState<number>(initialChapter);
  const [testamentFilter, setTestamentFilter] = useState<'todos' | 'antigo' | 'novo'>('todos');
  const [bookSearchQuery, setBookSearchQuery] = useState('');
  
  // Notas, Favoritos e Marcações com Cores
  const [bookmarks, setBookmarks] = useState<UserBookmark[]>([]);
  const [notes, setNotes] = useState<UserNote[]>([]);
  const [highlights, setHighlights] = useState<UserHighlight[]>([]);
  const [activeHighlightPicker, setActiveHighlightPicker] = useState<string | null>(null);

  // Modais de Estudo Avançado
  const [isConcordanceOpen, setIsConcordanceOpen] = useState(false);
  const [cardVerse, setCardVerse] = useState<BibleVerse | null>(null);
  const [comparisonVerse, setComparisonVerse] = useState<BibleVerse | null>(null);

  // Nota modal
  const [activeNoteVerse, setActiveNoteVerse] = useState<BibleVerse | null>(null);
  const [noteContent, setNoteContent] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);

  // Carregar dados locais e salvar histórico
  useEffect(() => {
    addReadingHistory(selectedBook.id, selectedBook.name, selectedChapter);

    // Carregar favoritos, notas e destaques do livro
    db.bookmarks.where('bookId').equals(selectedBook.id).toArray().then(setBookmarks);
    db.notes.where('bookId').equals(selectedBook.id).toArray().then(setNotes);
    db.highlights.where('bookId').equals(selectedBook.id).toArray().then(setHighlights);
  }, [selectedBook, selectedChapter]);

  // Filtragem de livros
  const filteredBooks = BIBLE_BOOKS.filter(b => {
    if (testamentFilter !== 'todos' && b.testament !== testamentFilter) return false;
    if (bookSearchQuery && !b.name.toLowerCase().includes(bookSearchQuery.toLowerCase())) return false;
    return true;
  });

  // Versículos do capítulo selecionado (via serviço bíblico canônico ampliado)
  const currentVerses: BibleVerse[] = getChapterVerses(selectedBook, selectedChapter);

  const handleToggleBookmark = async (verse: BibleVerse) => {
    const isMarked = bookmarks.some(b => b.chapter === verse.chapter && b.verse === verse.verse);
    if (isMarked) {
      const target = bookmarks.find(b => b.chapter === verse.chapter && b.verse === verse.verse);
      if (target) {
        await db.bookmarks.delete(target.id);
        setBookmarks(bookmarks.filter(b => b.id !== target.id));
      }
    } else {
      const newBookmark: UserBookmark = {
        id: `bm_${verse.id}_${Date.now()}`,
        reference: `${selectedBook.name} ${verse.chapter}:${verse.verse}`,
        bookId: selectedBook.id,
        chapter: verse.chapter,
        verse: verse.verse,
        createdAt: Date.now()
      };
      await db.bookmarks.add(newBookmark);
      setBookmarks([...bookmarks, newBookmark]);
    }
  };

  const handleToggleHighlight = async (verse: BibleVerse, color: HighlightColor) => {
    const existing = highlights.find(h => h.chapter === verse.chapter && h.verse === verse.verse);
    if (existing && existing.color === color) {
      // Remover marcação
      await db.highlights.delete(existing.id);
      setHighlights(highlights.filter(h => h.id !== existing.id));
    } else {
      // Adicionar ou atualizar cor
      const hlId = `hl_${verse.id}`;
      const newHl: UserHighlight = {
        id: hlId,
        reference: `${selectedBook.name} ${verse.chapter}:${verse.verse}`,
        bookId: selectedBook.id,
        chapter: verse.chapter,
        verse: verse.verse,
        color,
        meaningLabel: HIGHLIGHT_STYLES[color].label,
        createdAt: Date.now()
      };
      await db.highlights.put(newHl);
      setHighlights([...highlights.filter(h => !(h.chapter === verse.chapter && h.verse === verse.verse)), newHl]);
    }
    setActiveHighlightPicker(null);
  };

  const handleSaveNote = async () => {
    if (!activeNoteVerse || !noteContent.trim()) return;

    const newNote: UserNote = {
      id: `note_${activeNoteVerse.id}_${Date.now()}`,
      reference: `${selectedBook.name} ${activeNoteVerse.chapter}:${activeNoteVerse.verse}`,
      bookId: selectedBook.id,
      chapter: activeNoteVerse.chapter,
      verse: activeNoteVerse.verse,
      title: `Nota sobre ${selectedBook.name} ${activeNoteVerse.chapter}:${activeNoteVerse.verse}`,
      content: noteContent.trim(),
      tags: [selectedBook.division],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    await db.notes.add(newNote);
    setNotes([...notes, newNote]);
    setActiveNoteVerse(null);
    setNoteContent('');
  };

  const handleCopyVerse = (verse: BibleVerse) => {
    const textToCopy = `"${verse.text}" — ${selectedBook.name} ${verse.chapter}:${verse.verse} (${verse.translation})`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(verse.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReadChapterAloud = () => {
    if (isReadingAloud) {
      speechService.stop();
      setIsReadingAloud(false);
    } else {
      const fullChapterText = currentVerses.map(v => `${v.verse}. ${v.text}`).join(' ');
      const intro = `${selectedBook.name}, capítulo ${selectedChapter}. `;
      speechService.speak(intro + fullChapterText, playbackRate, () => setIsReadingAloud(false));
      setIsReadingAloud(true);
    }
  };

  const fontClass = fontSize === 'small' ? 'text-base' : fontSize === 'large' ? 'text-xl' : 'text-lg';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Barra de Seleção de Livro e Capítulo */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Coluna Esquerda: Seletor de Livros */}
        <div className="lg:col-span-1 bg-white dark:bg-[#0B192C] rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col h-[780px]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
              <span>Cânon Sagrado (66)</span>
            </h2>
            <button
              onClick={() => setIsConcordanceOpen(true)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-[#1E3E62] text-[#D4AF37] font-semibold flex items-center space-x-1 hover:bg-[#28507d] transition-all"
              title="Abrir Concordância Exaustiva"
            >
              <Search className="w-3 h-3" />
              <span>Concordância</span>
            </button>
          </div>

          {/* Filtro de Testamento */}
          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800/80 p-1 border border-slate-200 dark:border-slate-700 mb-3 text-xs">
            {(['todos', 'antigo', 'novo'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTestamentFilter(t)}
                className={`flex-1 py-1 rounded-lg font-medium transition-all capitalize ${
                  testamentFilter === t
                    ? 'bg-[#1E3E62] text-[#D4AF37] shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-white'
                }`}
              >
                {t === 'todos' ? 'Todos' : t === 'antigo' ? 'Hebraico' : 'Grego'}
              </button>
            ))}
          </div>

          {/* Busca de Livro */}
          <div className="relative mb-3">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Localizar livro..."
              value={bookSearchQuery}
              onChange={(e) => setBookSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
            />
          </div>

          {/* Lista de Livros com Barra de Rolagem */}
          <div className="flex-1 overflow-y-auto space-y-1 pr-1">
            {filteredBooks.map((book) => {
              const isSelected = selectedBook.id === book.id;
              return (
                <button
                  key={book.id}
                  onClick={() => {
                    setSelectedBook(book);
                    setSelectedChapter(1);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#1E3E62] text-[#D4AF37] font-semibold border border-[#D4AF37]/40 shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] w-5 text-slate-400 font-mono">{book.order}</span>
                    <span>{book.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{book.chaptersCount} cap.</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Coluna Direita: Leitor Bíblico com Capítulos e Versículos */}
        <div className="lg:col-span-3 bg-white dark:bg-[#0B192C] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            {/* Cabeçalho do Livro */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5 mb-6 gap-4">
              <div>
                <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <span className="uppercase tracking-wider font-semibold text-[#D4AF37]">
                    {selectedBook.testament === 'antigo' ? 'Escrituras Hebraico-Aramaicas' : 'Escrituras Gregas Cristãs'}
                  </span>
                  <span>•</span>
                  <span>{selectedBook.author} ({selectedBook.writtenPeriod})</span>
                </div>
                <h1 className="font-title text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {selectedBook.name} — Capítulo {selectedChapter}
                </h1>
              </div>

              {/* Controles de Áudio, Velocidade e Navegação de Capítulo */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Velocidade de Leitura */}
                <select
                  value={playbackRate}
                  onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                  className="bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 focus:outline-none"
                  title="Velocidade de Narração"
                >
                  <option value={0.75}>0.75x</option>
                  <option value={1.0}>1.0x (Padrão)</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                </select>

                <button
                  onClick={handleReadChapterAloud}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    isReadingAloud
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500 animate-pulse'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:text-[#D4AF37]'
                  }`}
                  title={isReadingAloud ? "Parar leitura em voz alta" : "Ouvir capítulo completo em voz alta"}
                >
                  {isReadingAloud ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#D4AF37]" />}
                  <span>{isReadingAloud ? 'Parar Áudio' : 'Ouvir Capítulo'}</span>
                </button>

                {/* Seletores rápidos de capítulo anterior e seguinte */}
                <div className="flex items-center space-x-1">
                  <button
                    disabled={selectedChapter <= 1}
                    onClick={() => setSelectedChapter(prev => Math.max(1, prev - 1))}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-200 dark:hover:bg-slate-700"
                    title="Capítulo anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-semibold px-2 text-slate-700 dark:text-slate-300">
                    {selectedChapter} / {selectedBook.chaptersCount}
                  </span>
                  <button
                    disabled={selectedChapter >= selectedBook.chaptersCount}
                    onClick={() => setSelectedChapter(prev => Math.min(selectedBook.chaptersCount, prev + 1))}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-200 dark:hover:bg-slate-700"
                    title="Capítulo seguinte"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Lista dos Capítulos para Escolha Rápida */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-3 mb-6 scrollbar-thin">
              {Array.from({ length: selectedBook.chaptersCount }, (_, i) => i + 1).map((cap) => (
                <button
                  key={cap}
                  onClick={() => setSelectedChapter(cap)}
                  className={`w-7 h-7 shrink-0 rounded-md text-xs font-semibold flex items-center justify-center transition-all ${
                    selectedChapter === cap
                      ? 'bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cap}
                </button>
              ))}
            </div>

            {/* Texto dos Versículos (Tipografia Bíblica Refinada com Destaques Semânticos) */}
            <div className="space-y-4">
              {currentVerses.map((verse) => {
                const isBookmarked = bookmarks.some(b => b.chapter === verse.chapter && b.verse === verse.verse);
                const verseNotes = notes.filter(n => n.chapter === verse.chapter && n.verse === verse.verse);
                const highlight = highlights.find(h => h.chapter === verse.chapter && h.verse === verse.verse);
                const hlStyle = highlight ? HIGHLIGHT_STYLES[highlight.color] : null;

                return (
                  <div
                    key={verse.id}
                    className={`group relative p-3 rounded-xl transition-all ${
                      hlStyle 
                        ? `${hlStyle.bg} border-l-4 border-l-[#D4AF37]` 
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Número do Versículo */}
                      <span className="font-semibold text-xs text-[#D4AF37] select-none pt-1 shrink-0 font-mono">
                        {verse.verse}
                      </span>

                      {/* Texto do Versículo */}
                      <div className="flex-1">
                        <p className={`font-scripture ${fontClass} leading-relaxed text-slate-800 dark:text-slate-200`}>
                          {verse.text}
                        </p>

                        {/* Rótulo de Destaque Semântico */}
                        {highlight && (
                          <div className="mt-1 flex items-center space-x-1.5 text-[10px] font-semibold text-[#D4AF37]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                            <span>{highlight.meaningLabel || HIGHLIGHT_STYLES[highlight.color].label}</span>
                          </div>
                        )}

                        {/* Notas de Estudo / Rodapés */}
                        {verse.footnotes && verse.footnotes.length > 0 && (
                          <div className="mt-2 text-xs text-amber-600 dark:text-amber-400/90 bg-amber-50 dark:bg-amber-950/20 p-2.5 rounded-lg border border-amber-200 dark:border-amber-900/30">
                            <strong>Nota de Estudo TNM: </strong>
                            {verse.footnotes.join('; ')}
                          </div>
                        )}

                        {/* Notas Pessoais do Utilizador salvas neste versículo */}
                        {verseNotes.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {verseNotes.map(n => (
                              <div key={n.id} className="text-xs bg-blue-50 dark:bg-[#1E3E62]/40 text-blue-900 dark:text-blue-200 p-2 rounded-lg border border-blue-200 dark:border-blue-800/50 flex items-start space-x-2">
                                <Edit3 className="w-3.5 h-3.5 text-[#D4AF37] mt-0.5 shrink-0" />
                                <div>
                                  <span className="font-semibold">Nota pessoal: </span>
                                  <span>{n.content}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Ações Rápidas no Hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 shrink-0 bg-white dark:bg-slate-800 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm relative">
                        {/* Seletor de Cores de Destaque */}
                        <div className="relative">
                          <button
                            onClick={() => setActiveHighlightPicker(activeHighlightPicker === verse.id ? null : verse.id)}
                            className="p-1 text-slate-400 hover:text-[#D4AF37]"
                            title="Colorir versículo (Destaque semântico)"
                          >
                            <Palette className="w-3.5 h-3.5" />
                          </button>

                          {activeHighlightPicker === verse.id && (
                            <div className="absolute right-0 top-full mt-1 z-30 bg-white dark:bg-[#0B192C] p-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl flex items-center space-x-1.5">
                              {(['yellow', 'green', 'blue', 'red', 'purple'] as HighlightColor[]).map(c => (
                                <button
                                  key={c}
                                  onClick={() => handleToggleHighlight(verse, c)}
                                  className={`w-5 h-5 rounded-full border border-black/20 dark:border-white/20 transition-transform hover:scale-125 ${
                                    c === 'yellow' ? 'bg-amber-400' :
                                    c === 'green' ? 'bg-emerald-400' :
                                    c === 'blue' ? 'bg-sky-400' :
                                    c === 'red' ? 'bg-rose-400' : 'bg-purple-400'
                                  }`}
                                  title={HIGHLIGHT_STYLES[c].label}
                                />
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Comparador de Traduções */}
                        <button
                          onClick={() => setComparisonVerse(verse)}
                          className="p-1 text-slate-400 hover:text-[#D4AF37]"
                          title="Comparar traduções lado a lado"
                        >
                          <Columns3 className="w-3.5 h-3.5" />
                        </button>

                        {/* Gerador de Card de Versículo */}
                        <button
                          onClick={() => setCardVerse(verse)}
                          className="p-1 text-slate-400 hover:text-amber-400"
                          title="Gerar card visual para partilha"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>

                        {/* Favorito */}
                        <button
                          onClick={() => handleToggleBookmark(verse)}
                          className="p-1 text-slate-400 hover:text-[#D4AF37]"
                          title={isBookmarked ? "Remover dos favoritos" : "Salvar nos favoritos"}
                        >
                          {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Bookmark className="w-3.5 h-3.5" />}
                        </button>

                        {/* Nota */}
                        <button
                          onClick={() => {
                            setActiveNoteVerse(verse);
                            setNoteContent('');
                          }}
                          className="p-1 text-slate-400 hover:text-blue-400"
                          title="Criar nota pessoal"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        {/* Copiar */}
                        <button
                          onClick={() => handleCopyVerse(verse)}
                          className="p-1 text-slate-400 hover:text-emerald-400"
                          title="Copiar versículo"
                        >
                          {copiedId === verse.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Modal / Painel de Criação de Nota */}
          {activeNoteVerse && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white dark:bg-[#0B192C] border border-[#D4AF37]/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm flex items-center space-x-2">
                    <Edit3 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Adicionar Nota Pessoal — {selectedBook.name} {activeNoteVerse.chapter}:{activeNoteVerse.verse}</span>
                  </h3>
                  <button onClick={() => setActiveNoteVerse(null)} className="text-slate-400 hover:text-white text-xs">✕</button>
                </div>
                <p className="text-xs text-slate-500 italic mb-3">"{activeNoteVerse.text}"</p>
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Escreve aqui as tuas reflexões, referências cruzadas ou pensamentos..."
                  rows={4}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37] mb-4"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setActiveNoteVerse(null)}
                    className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveNote}
                    className="px-4 py-2 rounded-xl bg-[#1E3E62] text-[#D4AF37] font-semibold text-xs border border-[#D4AF37]/50 hover:bg-[#1E3E62]/80"
                  >
                    Guardar no Dispositivo
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modais de Concordância, Card e Comparador */}
          <BiblicalConcordanceModal
            isOpen={isConcordanceOpen}
            onClose={() => setIsConcordanceOpen(false)}
            onSelectVerse={(bId, ch) => {
              const bookObj = BIBLE_BOOKS.find(b => b.id === bId);
              if (bookObj) {
                setSelectedBook(bookObj);
                setSelectedChapter(ch);
              }
            }}
          />

          {cardVerse && (
            <VerseCardGeneratorModal
              isOpen={Boolean(cardVerse)}
              onClose={() => setCardVerse(null)}
              verse={cardVerse}
            />
          )}

          {comparisonVerse && (
            <VerseComparisonModal
              isOpen={Boolean(comparisonVerse)}
              onClose={() => setComparisonVerse(null)}
              verse={comparisonVerse}
            />
          )}

          {/* Rodapé de Navegação entre Capítulos */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <button
              disabled={selectedChapter <= 1}
              onClick={() => setSelectedChapter(prev => Math.max(1, prev - 1))}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium disabled:opacity-40 hover:text-[#D4AF37]"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Capítulo Anterior</span>
            </button>
            <span className="text-slate-400 text-[11px]">
              Tradução de Referência: TNM (Edição de Estudo)
            </span>
            <button
              disabled={selectedChapter >= selectedBook.chaptersCount}
              onClick={() => setSelectedChapter(prev => Math.min(selectedBook.chaptersCount, prev + 1))}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium disabled:opacity-40 hover:text-[#D4AF37]"
            >
              <span>Capítulo Seguinte</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
