// src/components/assistant/ToolExpertChat.tsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Send, Mic, MicOff, Volume2, VolumeX, Sparkles, X, 
  ChevronRight, ArrowRight, RefreshCw, Minimize2, Maximize2, 
  BookOpen, Users, Key, ShieldCheck, Tv, Download, Brain, 
  GitBranch, MapPin, Columns, Languages, HelpCircle, Zap
} from 'lucide-react';
import { toolExpertService, type ToolAction, type ToolExpertResponse } from '../../services/toolExpertService';
import { speechService } from '../../services/speechService';
import type { ActiveTab } from '../layout/Navbar';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  actions?: ToolAction[];
  suggestedFollowUps?: string[];
  source?: 'offline_knowledge' | 'groq' | 'gemini';
  timestamp: number;
}

interface ToolExpertChatProps {
  onNavigate: (tab: ActiveTab, context?: any) => void;
  isFloating?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const ACTION_ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  MessageSquare: Tv,
  Tv: Tv,
  BookOpen: BookOpen,
  Users: Users,
  Key: Key,
  ShieldCheck: ShieldCheck,
  Download: Download,
  Brain: Brain,
  Sparkles: Sparkles,
  GitBranch: GitBranch,
  MapPin: MapPin,
  Languages: Languages,
  Columns: Columns
};

export const ToolExpertChat: React.FC<ToolExpertChatProps> = ({
  onNavigate,
  isFloating = false,
  isOpen = true,
  onClose
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome_expert',
      sender: 'assistant',
      text: `Olá! Sou o **Especialista do BIBLIA ON**, o teu assistente dedicado para todas as funcionalidades da plataforma.\n\nPosso explicar-te qualquer recurso, como configurar chaves de IA, como funciona a auto-atualização de modelos descontinuados, como navegar no letreiro de TV, usar o microfone ou estudar offline com o PWA.\n\nComo posso ajudar-te hoje?`,
      actions: [
        { label: 'Letreiro de Personagens', tab: 'personas', icon: 'Tv' },
        { label: 'O Codex Vivo 👑', tab: 'codex', icon: 'Sparkles' },
        { label: 'Painel Admin & Métricas', tab: 'admin', icon: 'ShieldCheck' },
        { label: 'Leitor Bíblico TNM', tab: 'explorer', icon: 'BookOpen' }
      ],
      suggestedFollowUps: [
        'Como funciona o letreiro de TV das personagens?',
        'O que acontece quando uma IA é descontinuada?',
        'Como usar o microfone para conversar?',
        'Como instalar o PWA e usar 100% offline?'
      ],
      timestamp: Date.now()
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [micNotice, setMicNotice] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAnswering]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isAnswering) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsAnswering(true);

    try {
      const response: ToolExpertResponse = await toolExpertService.answerQuestion(textToSend);

      const assistantMsg: ChatMessage = {
        id: `assistant_${Date.now()}`,
        sender: 'assistant',
        text: response.answer,
        actions: response.actions,
        suggestedFollowUps: response.suggestedFollowUps,
        source: response.source,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        sender: 'assistant',
        text: 'Desculpe, ocorreu uma instabilidade temporária. Por favor, tente novamente.',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsAnswering(false);
    }
  };

  const handleToggleMic = async () => {
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
      setMicNotice(null);
      return;
    }

    const supported = speechService.isRecognitionSupported();
    if (!supported) {
      const perm = await speechService.requestMicrophonePermission();
      if (!perm) {
        setMicNotice('Microfone não suportado no navegador atual. Tente Chrome ou Edge.');
        setTimeout(() => setMicNotice(null), 4000);
        return;
      }
    }

    setMicNotice('🎙️ Ouvindo... Pergunte sobre qualquer funcionalidade...');
    speechService.startListening({
      onStart: () => setIsListening(true),
      onResult: (transcript, isFinal) => {
        setInputQuery(transcript);
        if (isFinal) {
          setIsListening(false);
          setMicNotice(null);
          handleSendMessage(transcript);
        }
      },
      onError: (err) => {
        setIsListening(false);
        setMicNotice(err);
        setTimeout(() => setMicNotice(null), 4000);
      },
      onEnd: () => setIsListening(false)
    }, 'pt-BR');
  };

  const handleSpeak = (msgId: string, text: string) => {
    if (isSpeakingId === msgId) {
      speechService.stop();
      setIsSpeakingId(null);
      return;
    }

    speechService.stop();
    setIsSpeakingId(msgId);

    // Remove markdown e links para áudio límpido
    const cleanText = text
      .replace(/\*\*/g, '')
      .replace(/•/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/#+/g, '');

    speechService.speak(cleanText, 1.0, () => {
      setIsSpeakingId(null);
    }, () => {
      setIsSpeakingId(null);
    });
  };

  const handleExecuteAction = (action: ToolAction) => {
    onNavigate(action.tab, action.context);
    if (isFloating && onClose) {
      // Opcional: fechar ou manter aberto
    }
  };

  const formatText = (text: string) => {
    const paragraphs = text.split('\n\n').filter(Boolean);
    return (
      <div className="space-y-2">
        {paragraphs.map((p, idx) => {
          const lines = p.split('\n');
          return (
            <div key={idx} className="space-y-1">
              {lines.map((line, lIdx) => {
                const parts = line.split(/(\*\*[^*]+\*\*)/g).map((sub, sIdx) => {
                  if (sub.startsWith('**') && sub.endsWith('**')) {
                    return (
                      <strong key={sIdx} className="text-[#D4AF37] font-semibold">
                        {sub.slice(2, -2)}
                      </strong>
                    );
                  }
                  return sub;
                });

                if (line.trim().startsWith('•')) {
                  return (
                    <div key={lIdx} className="flex items-start space-x-2 pl-2">
                      <span className="text-[#D4AF37] mt-0.5">•</span>
                      <span>{parts}</span>
                    </div>
                  );
                }

                return <p key={lIdx}>{parts}</p>;
              })}
            </div>
          );
        })}
      </div>
    );
  };

  if (!isOpen && isFloating) return null;

  return (
    <div
      className={`${
        isFloating
          ? `fixed bottom-5 right-5 z-50 w-[95vw] sm:w-[480px] shadow-2xl rounded-2xl border-2 border-[#D4AF37]/60 bg-[#0B192C] text-white flex flex-col transition-all duration-300 ${
              isMinimized ? 'h-14 overflow-hidden' : 'h-[620px] max-h-[88vh]'
            }`
          : 'w-full max-w-5xl mx-auto p-4 sm:p-6 bg-white dark:bg-[#0B192C] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md flex flex-col h-[750px]'
      }`}
    >
      {/* Cabeçalho do Chat Especialista */}
      <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#0B192C] via-[#1E3E62] to-[#0B192C] border-b border-[#D4AF37]/40 flex items-center justify-between rounded-t-2xl shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-br from-[#D4AF37] to-amber-600 text-slate-950 shadow-md">
            <Bot className="w-5 h-5 text-slate-950 fill-current" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-title text-sm sm:text-base font-bold text-white tracking-wide">
                Especialista do BIBLIA ON
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>IA Online: Groq Qwen 27B ⚡</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              Guia oficial em todas as funcionalidades, configurações e atalhos
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          {isFloating && (
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              title={isMinimized ? 'Expandir janela' : 'Minimizar janela'}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
          )}

          {isFloating && onClose && (
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              title="Fechar chat especialista"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Conteúdo do Chat (oculto quando minimizado) */}
      {!isMinimized && (
        <div className="flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-[#07111E] rounded-b-2xl">
          {/* Barra de Tópicos Rápidos */}
          <div className="p-2.5 bg-slate-100 dark:bg-[#0B192C]/70 border-b border-slate-200 dark:border-slate-800/80 flex items-center space-x-1.5 overflow-x-auto scrollbar-thin shrink-0">
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider shrink-0 pl-1">
              Perguntas Frequentes:
            </span>
            <button
              onClick={() => handleSendMessage('Como funciona o letreiro de TV das personagens?')}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-lg bg-white dark:bg-[#1E3E62] border border-slate-200 dark:border-slate-700 hover:border-[#D4AF37] text-slate-800 dark:text-slate-200 transition-all shrink-0 cursor-pointer"
            >
              📺 Letreiro TV
            </button>
            <button
              onClick={() => handleSendMessage('Como funciona a auto-atualização de IA quando descontinuada?')}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-lg bg-white dark:bg-[#1E3E62] border border-slate-200 dark:border-slate-700 hover:border-[#D4AF37] text-slate-800 dark:text-slate-200 transition-all shrink-0 cursor-pointer"
            >
              🛡️ Auto-Sucessão IA
            </button>
            <button
              onClick={() => handleSendMessage('Como instalar e usar o app sem internet (PWA)?')}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-lg bg-white dark:bg-[#1E3E62] border border-slate-200 dark:border-slate-700 hover:border-[#D4AF37] text-slate-800 dark:text-slate-200 transition-all shrink-0 cursor-pointer"
            >
              📶 Offline & PWA
            </button>
            <button
              onClick={() => handleSendMessage('Como usar o microfone e voz na conversa com personagens?')}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-lg bg-white dark:bg-[#1E3E62] border border-slate-200 dark:border-slate-700 hover:border-[#D4AF37] text-slate-800 dark:text-slate-200 transition-all shrink-0 cursor-pointer"
            >
              🎙️ Microfone & Voz
            </button>
            <button
              onClick={() => handleSendMessage('O que é o Hipergrafo da Harmonia e o Codex Vivo?')}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-lg bg-white dark:bg-[#1E3E62] border border-slate-200 dark:border-slate-700 hover:border-[#D4AF37] text-slate-800 dark:text-slate-200 transition-all shrink-0 cursor-pointer"
            >
              👑 Codex Vivo
            </button>
            <button
              onClick={() => handleSendMessage('Onde vejo o Painel Admin com todas as métricas?')}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-lg bg-white dark:bg-[#1E3E62] border border-slate-200 dark:border-slate-700 hover:border-[#D4AF37] text-slate-800 dark:text-slate-200 transition-all shrink-0 cursor-pointer"
            >
              📊 Painel Admin
            </button>
          </div>

          {/* Área de Mensagens com Rolagem Suave */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#1E3E62] text-white border border-[#D4AF37]/40 rounded-br-none'
                      : 'bg-white dark:bg-[#0B192C] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 rounded-bl-none'
                  }`}
                >
                  {msg.sender === 'assistant' && (
                    <div className="flex items-center space-x-1.5 mb-2 pb-1.5 border-b border-slate-200/50 dark:border-slate-800 text-[10px] font-mono">
                      {msg.source === 'groq' ? (
                        <span className="inline-flex items-center space-x-1 text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/30">
                          <Zap className="w-3 h-3 text-emerald-400 fill-current" />
                          <span>IA Groq Cloud • Qwen 27B (Online)</span>
                        </span>
                      ) : msg.source === 'gemini' ? (
                        <span className="inline-flex items-center space-x-1 text-sky-400 font-bold bg-sky-500/10 px-2 py-0.5 rounded-md border border-sky-500/30">
                          <Sparkles className="w-3 h-3 text-sky-400" />
                          <span>IA Google Gemini 2.0</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-[#D4AF37] font-semibold bg-amber-500/10 px-2 py-0.5 rounded-md border border-[#D4AF37]/30">
                          <Brain className="w-3 h-3 text-[#D4AF37]" />
                          <span>Especialista BIBLIA ON (Base Canônica)</span>
                        </span>
                      )}
                    </div>
                  )}
                  <div className="font-sans">
                    {formatText(msg.text)}
                  </div>

                  {/* Ações Rápidas de Navegação Direta na Aplicação */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700/60 space-y-1.5">
                      <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block">
                        Acesso Direto na Ferramenta:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.actions.map((act, aIdx) => {
                          const IconComp = ACTION_ICON_MAP[act.icon || ''] || ArrowRight;
                          return (
                            <button
                              key={aIdx}
                              onClick={() => handleExecuteAction(act)}
                              className="text-xs px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-[#D4AF37] hover:text-amber-300 border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all flex items-center space-x-1.5 font-semibold cursor-pointer shadow-xs active:scale-95"
                              title={act.description || `Ir para ${act.label}`}
                            >
                              <IconComp className="w-3.5 h-3.5" />
                              <span>{act.label}</span>
                              <ChevronRight className="w-3 h-3 opacity-60" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Sugestões de Perguntas Complementares */}
                  {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700/50 flex flex-wrap gap-1">
                      {msg.suggestedFollowUps.map((q, qIdx) => (
                        <button
                          key={qIdx}
                          onClick={() => handleSendMessage(q)}
                          className="text-[10px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-[#D4AF37] hover:border-[#D4AF37] border border-transparent transition-colors cursor-pointer"
                        >
                          ❓ {q}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Botão de Ouvir Mensagem */}
                  {msg.sender === 'assistant' && (
                    <div className="mt-2 flex justify-end">
                      <button
                        onClick={() => handleSpeak(msg.id, msg.text)}
                        className={`text-[11px] p-1 rounded-lg flex items-center space-x-1 transition-colors ${
                          isSpeakingId === msg.id
                            ? 'text-rose-400 animate-pulse bg-rose-500/10'
                            : 'text-slate-400 hover:text-[#D4AF37]'
                        }`}
                        title="Ouvir explicação em áudio"
                      >
                        {isSpeakingId === msg.id ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                            <span className="text-[10px]">Parar</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span className="text-[10px]">Ouvir</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isAnswering && (
              <div className="flex items-center space-x-2 text-xs text-[#D4AF37] p-2 bg-amber-500/5 rounded-xl border border-[#D4AF37]/20 w-fit">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>O Especialista está a consultar a arquitetura da ferramenta...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Notificação de Microfone */}
          {micNotice && (
            <div className="px-4 py-1.5 bg-sky-950/80 border-t border-sky-500/40 text-[11px] text-sky-200 flex items-center justify-between">
              <span>{micNotice}</span>
              <button onClick={() => setMicNotice(null)} className="p-0.5 text-slate-400 hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Campo de Entrada de Pergunta com Microfone */}
          <div className="p-3 bg-white dark:bg-[#0B192C] border-t border-slate-200 dark:border-slate-800 rounded-b-2xl">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleToggleMic}
                className={`p-2.5 rounded-xl transition-all cursor-pointer border ${
                  isListening
                    ? 'bg-rose-600 text-white animate-pulse border-rose-400 shadow-md'
                    : 'bg-slate-100 dark:bg-[#1E3E62] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-[#D4AF37] hover:border-[#D4AF37]'
                }`}
                title="Ditar pergunta pelo microfone"
              >
                {isListening ? <MicOff className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Pergunte sobre qualquer recurso da BIBLIA ON..."
                className="flex-1 bg-slate-50 dark:bg-[#07111E] border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                disabled={isAnswering}
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={!inputQuery.trim() || isAnswering}
                className="p-2.5 rounded-xl bg-[#D4AF37] hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold transition-all shadow-md cursor-pointer disabled:cursor-not-allowed"
                title="Enviar pergunta ao especialista"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400 px-1">
              <span>💡 Dica: Digite ou fale pelo microfone sobre qualquer tela ou botão.</span>
              <span className="font-mono text-emerald-400">100% Grátis & Open-Source</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
