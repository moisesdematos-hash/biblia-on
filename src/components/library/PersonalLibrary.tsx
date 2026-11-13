// src/components/library/PersonalLibrary.tsx
import React, { useState, useEffect } from 'react';
import { 
  Bookmark, 
  Edit3, 
  Download, 
  Upload, 
  Trash2, 
  BookOpen, 
  ShieldCheck, 
  Share2, 
  Clock, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { db } from '../../db/bibliaOnDb';
import type { UserNote, UserBookmark } from '../../types';
import { exportUserData, importUserData, clearAllLocalUserData } from '../../services/backupService';

export const PersonalLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notes' | 'bookmarks' | 'studies' | 'backup'>('notes');
  const [notes, setNotes] = useState<UserNote[]>([]);
  const [bookmarks, setBookmarks] = useState<UserBookmark[]>([]);
  const [savedStudies, setSavedStudies] = useState<any[]>([]);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const reloadData = async () => {
    const n = await db.notes.toArray();
    const b = await db.bookmarks.toArray();
    const s = await db.savedStudies.toArray();
    setNotes(n);
    setBookmarks(b);
    setSavedStudies(s);
  };

  useEffect(() => {
    reloadData();
  }, []);

  const handleDeleteNote = async (id: string) => {
    await db.notes.delete(id);
    setNotes(notes.filter(n => n.id !== id));
  };

  const handleDeleteBookmark = async (id: string) => {
    await db.bookmarks.delete(id);
    setBookmarks(bookmarks.filter(b => b.id !== id));
  };

  const handleDeleteStudy = async (id: string) => {
    await db.savedStudies.delete(id);
    setSavedStudies(savedStudies.filter(s => s.id !== id));
  };

  const handleExportBackup = async () => {
    const jsonStr = await exportUserData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `biblia-on-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      const res = await importUserData(content);
      setImportStatus(res.message);
      if (res.success) {
        await reloadData();
      }
      setTimeout(() => setImportStatus(null), 4000);
    };
    reader.readAsText(file);
  };

  const handleClearAll = async () => {
    if (confirm('Atenção: Tens a certeza de que desejas apagar permanentemente todas as tuas notas e favoritos locais deste dispositivo?')) {
      await clearAllLocalUserData();
      await reloadData();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
            <Bookmark className="w-4 h-4" />
            <span>Biblioteca Pessoal Local (100% Privada)</span>
          </div>
          <h1 className="font-title text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Minhas Notas & Estudos Guardados
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Todos os teus dados são guardados exclusivamente no teu dispositivo, sem necessidade de login e sem envio para servidores externos.
          </p>
        </div>

        {/* Abas da Biblioteca */}
        <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 text-xs self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'notes' ? 'bg-[#1E3E62] text-[#D4AF37] shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Notas ({notes.length})
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'bookmarks' ? 'bg-[#1E3E62] text-[#D4AF37] shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Favoritos ({bookmarks.length})
          </button>
          <button
            onClick={() => setActiveTab('studies')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'studies' ? 'bg-[#1E3E62] text-[#D4AF37] shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Estudos ({savedStudies.length})
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'backup' ? 'bg-[#1E3E62] text-[#D4AF37] shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Cópia & Privacidade
          </button>
        </div>
      </div>

      {/* Conteúdo Conforme a Aba */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          {notes.length === 0 ? (
            <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-xs sm:text-sm">
              <Edit3 className="w-8 h-8 text-[#D4AF37] mx-auto mb-2 opacity-50" />
              Ainda não tens notas gravadas. Podes criar notas enquanto lês os capítulos no Explorador Bíblico.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notes.map((note) => (
                <div key={note.id} className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                    <span className="font-semibold text-xs text-[#D4AF37]">{note.reference}</span>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-slate-400 hover:text-rose-500 text-xs transition-colors"
                      title="Excluir nota"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h3 className="font-semibold text-sm text-slate-900 dark:text-white">{note.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">{note.content}</p>
                  <span className="text-[10px] text-slate-400 block pt-1">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'bookmarks' && (
        <div className="space-y-4">
          {bookmarks.length === 0 ? (
            <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-xs sm:text-sm">
              <Bookmark className="w-8 h-8 text-[#D4AF37] mx-auto mb-2 opacity-50" />
              Ainda não adicionaste nenhum versículo aos favoritos.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {bookmarks.map((bm) => (
                <div key={bm.id} className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-xs text-slate-900 dark:text-white">{bm.reference}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Adicionado em {new Date(bm.createdAt).toLocaleDateString()}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteBookmark(bm.id)}
                    className="text-slate-400 hover:text-rose-500 p-1"
                    title="Remover favorito"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'studies' && (
        <div className="space-y-4">
          {savedStudies.length === 0 ? (
            <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-xs sm:text-sm">
              <BookOpen className="w-8 h-8 text-[#D4AF37] mx-auto mb-2 opacity-50" />
              Não tens estudos salvos no momento. Podes salvar estudos completos a partir do Chat Bíblico com IA.
            </div>
          ) : (
            <div className="space-y-3">
              {savedStudies.map((st) => (
                <div key={st.id} className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#D4AF37]">{st.topic}</span>
                    <button
                      onClick={() => handleDeleteStudy(st.id)}
                      className="text-slate-400 hover:text-rose-500 text-xs"
                      title="Excluir estudo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">{st.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{st.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'backup' && (
        <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 max-w-2xl">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="font-title text-xl font-bold text-slate-900 dark:text-white mb-1">
              Cópia de Segurança & Gestão de Dados
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Garante que as tuas notas e pesquisas estejam sempre sob o teu controle.
            </p>
          </div>

          {importStatus && (
            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{importStatus}</span>
            </div>
          )}

          <div className="space-y-4 text-xs">
            {/* Exportar */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <strong className="text-slate-900 dark:text-white block mb-0.5">Descarregar Cópia de Segurança</strong>
                <span className="text-slate-500 dark:text-slate-400">Exporta todas as tuas notas e favoritos para um ficheiro JSON no teu computador.</span>
              </div>
              <button
                onClick={handleExportBackup}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#1E3E62] text-[#D4AF37] font-semibold hover:bg-[#1E3E62]/80 shrink-0 ml-4"
              >
                <Download className="w-4 h-4" />
                <span>Exportar</span>
              </button>
            </div>

            {/* Importar */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <strong className="text-slate-900 dark:text-white block mb-0.5">Restaurar Ficheiro de Cópia</strong>
                <span className="text-slate-500 dark:text-slate-400">Restaura notas e dados previamente descarregados sem apagar os atuais.</span>
              </div>
              <label className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 cursor-pointer shrink-0 ml-4">
                <Upload className="w-4 h-4" />
                <span>Importar</span>
                <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
              </label>
            </div>

            {/* Eliminar Dados */}
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 flex items-center justify-between">
              <div>
                <strong className="text-rose-700 dark:text-rose-400 block mb-0.5">Eliminar Todos os Dados Locais</strong>
                <span className="text-slate-500 dark:text-slate-400">Limpa todo o histórico e notas deste navegador. Esta ação não pode ser desfeita.</span>
              </div>
              <button
                onClick={handleClearAll}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-rose-600 text-white font-semibold hover:bg-rose-700 shrink-0 ml-4"
              >
                <Trash2 className="w-4 h-4" />
                <span>Limpar Tudo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
