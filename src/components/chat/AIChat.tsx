// src/components/chat/AIChat.tsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Send, 
  Mic, 
  MicOff,
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  BookmarkPlus, 
  ShieldCheck, 
  BookOpen, 
  AlertCircle,
  HelpCircle,
  Trash2
} from 'lucide-react';
import { queryBibliaKnowledge, type AIResponse, type ResponseLevel } from '../../services/aiService';
import { speechService } from '../../services/speechService';
import { db } from '../../db/bibliaOnDb';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  response?: AIResponse;
  timestamp: number;
}

interface AIChatProps {
  initialQuery?: string;
  isOfflineMode: boolean;
}

export const AIChat: React.FC<AIChatProps> = ({ initialQuery = '', isOfflineMode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState(initialQuery);
  const [responseLevel, setResponseLevel] = useState<ResponseLevel>('aprofundado');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedStudyId, setSavedStudyId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [micNotice, setMicNotice] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Limpa o microfone se desmontar
  useEffect(() => {
    return () => {
      speechService.stopListening();
      speechService.stop();
    };
  }, []);

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
        setMicNotice('Microfone não suportado diretamente neste navegador. Experimente o Google Chrome ou Microsoft Edge.');
        setTimeout(() => setMicNotice(null), 5000);
        return;
      }
    }

    setMicNotice('🎙️ Ouvindo com atenção... Fale agora a sua pergunta sobre a Bíblia.');

    const ok = speechService.startListening({
      onStart: () => {
        setIsListening(true);
      },
      onResult: (transcript, isFinal) => {
        setInputQuery(transcript);
        if (isFinal) {
          setIsListening(false);
          setMicNotice('Pergunta captada com sucesso! Clique em Enviar para pesquisar.');
          setTimeout(() => setMicNotice(null), 3000);
        }
      },
      onError: (err) => {
        setIsListening(false);
        setMicNotice(err);
        setTimeout(() => setMicNotice(null), 5000);
      },
      onEnd: () => {
        setIsListening(false);
      }
    }, 'pt-BR');

    if (!ok) {
      setIsListening(false);
    }
  };

  // Executa query inicial se fornecida da HomePage
  useEffect(() => {
    if (initialQuery) {
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  const handleSend = async (queryToSend?: string) => {
    const q = (queryToSend || inputQuery).trim();
    if (!q || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const result = await queryBibliaKnowledge(q, responseLevel);

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'assistant',
        text: result.answer,
        response: result,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        sender: 'assistant',
        text: 'Ocorreu uma falha temporária. A comutação automática para o modo estruturado offline foi ativada.',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveToLibrary = async (msg: ChatMessage) => {
    if (!msg.response) return;

    await db.savedStudies.add({
      id: `study_${Date.now()}`,
      title: `Estudo: ${msg.text.slice(0, 45)}...`,
      topic: 'Investigação Bíblica',
      content: msg.response.thematicExplanation,
      keyVerses: msg.response.relevantScriptures.map(s => s.reference),
      createdAt: Date.now(),
      updatedAt: Date.now()
    });

    setSavedStudyId(msg.id);
    setTimeout(() => setSavedStudyId(null), 3000);
  };

  const handleSpeak = (msgId: string, text: string) => {
    if (isSpeaking === msgId) {
      speechService.stop();
      setIsSpeaking(null);
    } else {
      speechService.speak(text, 1.0, () => setIsSpeaking(null));
      setIsSpeaking(msgId);
    }
  };

  const handleClearChat = () => {
    speechService.stop();
    setIsSpeaking(null);
    setMessages([]);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col h-[calc(100vh-6rem)]">
      {/* Cabeçalho do Chat & Seleção de Nível */}
      <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-[#1E3E62] border border-[#D4AF37]/50 text-[#D4AF37]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-semibold text-slate-900 dark:text-white text-base flex items-center space-x-2">
              <span>Assistente Bíblico Inteligente</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
                {isOfflineMode ? 'Motor Estruturado Resiliente' : 'IA & RAG Ativo'}
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Respostas rigorosas baseadas na TNM de Estudo, com exegese, contexto e auditoria doutrinária.
            </p>
          </div>
        </div>

        {/* Ações do Cabeçalho: Apagar Conversa & Níveis de Profundidade */}
        <div className="flex items-center space-x-2 self-end sm:self-auto">
          {/* Botão de Apagar Conversa */}
          {messages.length > 0 && (
            <button
              onClick={handleClearChat}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 dark:text-rose-400 border border-rose-500/30 hover:border-rose-400 transition-all cursor-pointer shadow-xs active:scale-95 animate-in fade-in"
              title="Apagar todo o histórico de mensagens desta conversa"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Apagar Conversa</span>
            </button>
          )}

          {/* Níveis de Profundidade */}
          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl text-xs">
            {(['simples', 'aprofundado', 'academico'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setResponseLevel(level)}
                className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-all ${
                  responseLevel === level
                    ? 'bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/40 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-white'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Área de Mensagens com Scroll */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2 mb-4 scrollbar-thin">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#1E3E62]/40 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-4">
              <BookOpen className="w-8 h-8" />
            </div>
            <h2 className="font-title text-xl font-bold text-slate-900 dark:text-white mb-2">
              Investigação Bíblica Confiável
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Faz uma pergunta sobre qualquer versículo, personagem, profecia ou tema bíblico. Cada resposta é acompanhada por textos originais e verificação de integridade doutrinária.
            </p>
            <div className="w-full space-y-2 text-left">
              {[
                'O que a Bíblia ensina sobre a morte e a ressurreição?',
                'Quem foi Melquisedeque e qual a sua relação com Jesus?',
                'Qual é a relação profética entre Daniel e Apocalipse?'
              ].map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(sug)}
                  className="w-full text-xs p-3 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-[#D4AF37] text-slate-700 dark:text-slate-300 transition-all flex items-center justify-between"
                >
                  <span>{sug}</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-3xl rounded-2xl p-5 ${
                  msg.sender === 'user'
                    ? 'bg-[#1E3E62] text-white border border-[#D4AF37]/30 shadow-md'
                    : 'bg-white dark:bg-[#0B192C] text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-md w-full'
                }`}
              >
                {/* Resposta do Usuário */}
                {msg.sender === 'user' ? (
                  <p className="text-sm font-medium">{msg.text}</p>
                ) : (
                  /* Resposta do Assistente com Estrutura Completa */
                  <div className="space-y-4">
                    {/* Badge do Auditor de Qualidade */}
                    {msg.response && (
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 text-xs">
                        <div className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                          <ShieldCheck className="w-4 h-4 text-emerald-500" />
                          <span>Auditado: Fidelidade ao Texto Bíblico & Diretrizes Doutrinárias</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {msg.response.modeUsed === 'ia_ativa' ? 'IA Híbrida' : 'Motor Estruturado TNM'}
                        </span>
                      </div>
                    )}

                    {/* Resposta Direta */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                        Resposta Direta
                      </h4>
                      <p className="text-sm sm:text-base leading-relaxed font-sans text-slate-800 dark:text-slate-200">
                        {msg.text}
                      </p>
                    </div>

                    {/* Textos Bíblicos Relevantes */}
                    {msg.response?.relevantScriptures && msg.response.relevantScriptures.length > 0 && (
                      <div className="bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/60">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-[#D4AF37] mb-2 flex items-center space-x-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Passagens Bíblicas Fundamentais</span>
                        </h4>
                        <div className="space-y-2">
                          {msg.response.relevantScriptures.map((s, idx) => (
                            <div key={idx} className="border-l-2 border-[#D4AF37] pl-3">
                              <span className="font-semibold text-xs text-slate-900 dark:text-white">
                                {s.reference}:
                              </span>
                              <p className="font-scripture text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic mt-0.5">
                                "{s.text}"
                              </p>
                              {s.note && (
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                                  {s.note}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Contexto Histórico e Explicação */}
                    {msg.response?.historicalContext && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                          Contexto Histórico & Literário
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          {msg.response.historicalContext}
                        </p>
                      </div>
                    )}

                    {/* Distinções Rigorosas (Fato vs Inferência vs Aplicação) */}
                    {msg.response?.doctrinalDistinctions && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2">
                        <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-[#1E3E62]/30 border border-blue-200 dark:border-blue-900/40">
                          <span className="font-bold text-blue-700 dark:text-blue-300 block mb-0.5">
                            Afirmação Explícita do Texto:
                          </span>
                          <span className="text-slate-600 dark:text-slate-300">
                            {msg.response.doctrinalDistinctions.explicitScripturalStatement}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40">
                          <span className="font-bold text-emerald-700 dark:text-emerald-300 block mb-0.5">
                            Aplicação Prática:
                          </span>
                          <span className="text-slate-600 dark:text-slate-300">
                            {msg.response.doctrinalDistinctions.practicalApplication}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Fontes & Limitações */}
                    {msg.response?.sourcesUsed && (
                      <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400">
                        <span>Fontes: {msg.response.sourcesUsed.join(', ')}</span>
                        {msg.response.doctrinalDistinctions.uncertaintiesOrLimits && (
                          <span className="italic">
                            Limite: {msg.response.doctrinalDistinctions.uncertaintiesOrLimits}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Ações na Resposta (Ouvir, Copiar, Guardar na Biblioteca) */}
                    <div className="flex items-center space-x-2 pt-2">
                      <button
                        onClick={() => handleSpeak(msg.id, msg.text)}
                        className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs hover:text-[#D4AF37]"
                        title="Ouvir resposta em voz alta"
                      >
                        {isSpeaking === msg.id ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" />}
                        <span>{isSpeaking === msg.id ? 'Parar' : 'Ouvir'}</span>
                      </button>

                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs hover:text-emerald-400"
                        title="Copiar texto"
                      >
                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === msg.id ? 'Copiado' : 'Copiar'}</span>
                      </button>

                      <button
                        onClick={() => handleSaveToLibrary(msg)}
                        className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs hover:text-[#D4AF37]"
                        title="Guardar na Biblioteca Pessoal"
                      >
                        <BookmarkPlus className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{savedStudyId === msg.id ? 'Guardado!' : 'Guardar Estudo'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex items-center space-x-2 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-xs text-slate-400 w-fit">
            <Sparkles className="w-4 h-4 text-[#D4AF37] animate-spin" />
            <span>A pesquisar nas Escrituras e a auditar conformidade doutrinária...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Alerta / Status de Voz do Microfone */}
      {micNotice && (
        <div className="mb-2 px-4 py-2 rounded-xl bg-[#1E3E62] border border-[#D4AF37] text-[#D4AF37] text-xs font-semibold flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            <span>{micNotice}</span>
          </div>
          {isListening && (
            <button
              onClick={handleToggleMic}
              className="text-[10px] text-white underline hover:text-[#D4AF37]"
            >
              Concluir Fala
            </button>
          )}
        </div>
      )}

      {/* Caixa de Entrada de Pergunta com Microfone Ativo */}
      <div className={`bg-white dark:bg-[#0B192C] border-2 rounded-2xl p-2 shadow-lg transition-all ${
        isListening ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-200 dark:border-slate-800 focus-within:border-[#D4AF37]'
      }`}>
        <div className="flex items-center space-x-2">
          {/* Botão de Microfone / Gravação de Voz */}
          <button
            type="button"
            onClick={handleToggleMic}
            className={`p-3 rounded-xl transition-all border shadow-sm flex items-center justify-center relative shrink-0 ${
              isListening 
                ? 'bg-rose-600 text-white border-rose-400 animate-pulse ring-4 ring-rose-500/30' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#D4AF37] hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700'
            }`}
            title={isListening ? 'Clique para parar microfone' : 'Ativar microfone para falar pergunta bíblica'}
          >
            {isListening ? (
              <>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping"></span>
                <MicOff className="w-4 h-4 text-white" />
              </>
            ) : (
              <Mic className="w-4 h-4 text-[#D4AF37]" />
            )}
          </button>

          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={isListening ? "🎙️ Ouvindo a sua voz... Fale a sua pergunta bíblica agora..." : "Pergunta qualquer coisa sobre a Bíblia (ou fala pelo microfone)..."}
            className="flex-1 bg-transparent px-3 py-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />

          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim() || isLoading}
            className="p-3 rounded-xl bg-[#1E3E62] text-[#D4AF37] hover:bg-[#1E3E62]/80 disabled:opacity-40 transition-all border border-[#D4AF37]/40 shadow-sm shrink-0"
            title="Enviar pergunta"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
