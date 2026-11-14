// src/components/chat/AIKeyConfigModal.tsx
import React, { useState, useEffect } from 'react';
import { Key, Shield, Zap, ExternalLink, Check, Trash2, X, Eye, EyeOff, Bot } from 'lucide-react';
import { aiModelLifecycleService } from '../../services/aiModelLifecycleService';
import { personaAIService } from '../../services/personaAIService';

interface AIKeyConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeysUpdated?: () => void;
}

export const AIKeyConfigModal: React.FC<AIKeyConfigModalProps> = ({ isOpen, onClose, onKeysUpdated }) => {
  const [groqKey, setGroqKey] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  const [showGroq, setShowGroq] = useState(false);
  const [showGemini, setShowGemini] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      const g = localStorage.getItem('biblia_on_groq_key') || localStorage.getItem('groq_api_key') || '';
      const m = localStorage.getItem('biblia_on_gemini_key') || localStorage.getItem('biblia_on_gemini_api_key') || '';
      setGroqKey(g);
      setGeminiKey(m);
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      const cleanGroq = groqKey.trim();
      const cleanGemini = geminiKey.trim();

      if (cleanGroq) {
        localStorage.setItem('biblia_on_groq_key', cleanGroq);
      } else {
        localStorage.removeItem('biblia_on_groq_key');
        localStorage.removeItem('groq_api_key');
      }

      if (cleanGemini) {
        localStorage.setItem('biblia_on_gemini_key', cleanGemini);
      } else {
        localStorage.removeItem('biblia_on_gemini_key');
        localStorage.removeItem('biblia_on_gemini_api_key');
      }

      // Atualiza também no serviço de personas
      personaAIService.updateConfig({
        groqApiKey: cleanGroq,
        geminiApiKey: cleanGemini,
        mode: (cleanGroq || cleanGemini) ? 'ia_online' : 'offline_apenas'
      });

      setSavedSuccess(true);
      if (onKeysUpdated) onKeysUpdated();
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 1200);
    }
  };

  const handleClearAll = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('biblia_on_groq_key');
      localStorage.removeItem('groq_api_key');
      localStorage.removeItem('biblia_on_gemini_key');
      localStorage.removeItem('biblia_on_gemini_api_key');
      setGroqKey('');
      setGeminiKey('');
      personaAIService.updateConfig({
        groqApiKey: '',
        geminiApiKey: '',
        mode: 'offline_apenas'
      });
      if (onKeysUpdated) onKeysUpdated();
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 1500);
    }
  };

  const activeGroqModel = aiModelLifecycleService.getActiveGroqModel();
  const activeGeminiModel = aiModelLifecycleService.getActiveGeminiModel();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Topo do Modal */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#1E3E62]/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-title text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Configurar Chaves de Inteligência Artificial
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                BYOK (Bring Your Own Key) • 100% Gratuito, Privado & Ilimitado
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo com Informações e Campos */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs scrollbar-thin">
          {/* Princípio de Privacidade */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 dark:text-emerald-300 space-y-1">
            <div className="flex items-center space-x-2 font-bold text-xs">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>Privacidade Absoluta no Seu Dispositivo</span>
            </div>
            <p className="text-[11px] leading-relaxed opacity-90">
              As suas chaves de API ficam guardadas exclusivamente no seu próprio navegador (<code className="font-mono font-bold">localStorage</code>). Elas <strong>nunca</strong> passam por servidores intermediários e comunicam de forma direta e encriptada com a Groq ou o Google.
            </p>
          </div>

          {/* Opção 1: Groq Cloud (Recomendada) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#081220] border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-500 font-bold text-[10px] uppercase tracking-wider">
                  Recomendado
                </span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center space-x-1.5">
                  <Zap className="w-4 h-4 text-[#D4AF37]" />
                  <span>Groq Cloud (Ultrarrápido)</span>
                </h4>
              </div>
              <a
                href="https://console.groq.com/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-[11px] font-semibold text-[#D4AF37] hover:underline"
              >
                <span>Criar chave grátis</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <p className="text-slate-500 dark:text-slate-400 text-[11px]">
              Gera respostas bíblicas completas com latência quase instantânea (~0.3s). Modelo ativo: <strong className="font-mono text-slate-700 dark:text-slate-300">{activeGroqModel}</strong>.
            </p>

            <div className="relative">
              <input
                type={showGroq ? 'text' : 'password'}
                value={groqKey}
                onChange={(e) => setGroqKey(e.target.value)}
                placeholder="Ex: gsk_..."
                className="w-full bg-white dark:bg-[#0B192C] border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 pr-10 font-mono text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="button"
                onClick={() => setShowGroq(!showGroq)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showGroq ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Opção 2: Google Gemini */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#081220] border border-sky-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-400 font-bold text-[10px] uppercase tracking-wider">
                  Google AI
                </span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center space-x-1.5">
                  <Bot className="w-4 h-4 text-sky-400" />
                  <span>Google Gemini</span>
                </h4>
              </div>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-[11px] font-semibold text-sky-400 hover:underline"
              >
                <span>Criar chave grátis</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <p className="text-slate-500 dark:text-slate-400 text-[11px]">
              Motor exegético com ampla janela de contexto. Modelo ativo: <strong className="font-mono text-slate-700 dark:text-slate-300">{activeGeminiModel}</strong>.
            </p>

            <div className="relative">
              <input
                type={showGemini ? 'text' : 'password'}
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="Ex: AIzaSy..."
                className="w-full bg-white dark:bg-[#0B192C] border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 pr-10 font-mono text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
              />
              <button
                type="button"
                onClick={() => setShowGemini(!showGemini)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showGemini ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Rodapé do Modal */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#1E3E62]/30 flex items-center justify-between gap-3">
          {(groqKey || geminiKey) ? (
            <button
              onClick={handleClearAll}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 border border-rose-500/30 transition-all flex items-center space-x-1.5"
              title="Apagar chaves salvas neste dispositivo"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remover Chaves</span>
            </button>
          ) : (
            <div className="text-[11px] text-slate-400">
              Sem chave inserida? O motor heurístico estruturado TNM local continuará a funcionar.
            </div>
          )}

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-[#D4AF37] text-slate-950 hover:opacity-90 transition-all shadow-md flex items-center space-x-1.5"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>Salvo!</span>
                </>
              ) : (
                <span>Guardar Chaves</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
