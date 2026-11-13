// src/services/bibleSearchService.ts
import { BIBLE_BOOKS } from '../data/bibleBooks';
import { SAMPLE_VERSES } from '../data/bibleVerses';
import type { BibleVerse, BibleBook } from '../types';

export interface SearchResult {
  verses: BibleVerse[];
  matchedBooks: BibleBook[];
  totalMatches: number;
}

export function searchBible(query: string, testamentFilter?: 'antigo' | 'novo'): SearchResult {
  const clean = query.trim().toLowerCase();
  if (!clean) {
    return { verses: [], matchedBooks: [], totalMatches: 0 };
  }

  // Busca por livros correspondentes
  const matchedBooks = BIBLE_BOOKS.filter(b => 
    (!testamentFilter || b.testament === testamentFilter) &&
    (b.name.toLowerCase().includes(clean) || b.abbreviation.toLowerCase() === clean)
  );

  // Busca por versículos correspondentes
  const verses = SAMPLE_VERSES.filter(v => {
    const book = BIBLE_BOOKS.find(b => b.id === v.bookId);
    if (testamentFilter && book && book.testament !== testamentFilter) {
      return false;
    }
    const fullRef = `${v.bookName} ${v.chapter}:${v.verse}`.toLowerCase();
    return (
      v.text.toLowerCase().includes(clean) ||
      fullRef.includes(clean) ||
      (v.footnotes && v.footnotes.some(fn => fn.toLowerCase().includes(clean)))
    );
  });

  return {
    verses,
    matchedBooks,
    totalMatches: verses.length + matchedBooks.length
  };
}

// Analisador de referências bíblicas livres (ex: "João 3:16", "Gn 1:1", "Salmo 83")
export function parseScriptureReference(input: string): { bookId?: string; chapter?: number; verse?: number } | null {
  const text = input.trim().toLowerCase();
  const match = text.match(/^([1-3]?\s*[a-zçãéíóúâêô]+)\s*(\d+)?(?::(\d+))?$/i);
  if (!match) return null;

  const bookPart = match[1].replace(/\s+/g, ' ').trim();
  const chapter = match[2] ? parseInt(match[2], 10) : undefined;
  const verse = match[3] ? parseInt(match[3], 10) : undefined;

  const book = BIBLE_BOOKS.find(b => 
    b.name.toLowerCase() === bookPart || 
    b.abbreviation.toLowerCase() === bookPart ||
    b.name.toLowerCase().startsWith(bookPart)
  );

  if (!book) return null;

  return {
    bookId: book.id,
    chapter,
    verse
  };
}
