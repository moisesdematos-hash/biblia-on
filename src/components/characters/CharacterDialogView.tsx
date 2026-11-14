// src/components/characters/CharacterDialogView.tsx
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  MessageSquare, Send, Sparkles, BookOpen, Volume2, VolumeX, 
  Copy, Check, ShieldCheck, Search, Filter, RefreshCw, UserCheck, 
  Info, ChevronRight, X, HeartHandshake, Compass, Flame, Crown, Scale, Tent, Anchor,
  Sliders, Mic, MicOff, Zap, Play, Pause, Tv, FastForward, ChevronLeft, Grid, Star, Users, Bot, Cpu, Settings2, Key, CheckCircle2,
  Trash2, Eye, EyeOff
} from 'lucide-react';
import { 
  BIBLICAL_PERSONAS, 
  MOST_REQUESTED_PERSONA_IDS,
  PROPHETS_PERSONA_IDS,
  TWELVE_DISCIPLES_IDS,
  resolveBiblicalPersona, 
  generatePersonaResponse, 
  ERA_METADATA,
  ARCHETYPE_METADATA,
  type BiblicalPersona, 
  type BiblicalEra,
  type PersonaArchetype
} from '../../data/biblicalPersonasData';
import { speechService } from '../../services/speechService';
import { personaAIService } from '../../services/personaAIService';
import { aiModelLifecycleService, type ModelUpgradeEvent } from '../../services/aiModelLifecycleService';
import { 
  getPersonaConversation, 
  savePersonaConversation, 
  clearPersonaConversation 
} from '../../db/bibliaOnDb';

interface DialogMessage {
  id: string;
  sender: 'user' | 'persona';
  text: string;
  scriptures?: string[];
  timestamp: number;
}

export const CharacterDialogView: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState<BiblicalPersona>(BIBLICAL_PERSONAS[0]); // Jesus Cristo
  const [filterMode, setFilterMode] = useState<'most_requested' | 'prophets' | 'disciples' | 'archetype' | 'era'>('most_requested');
  const [selectedArchetype, setSelectedArchetype] = useState<PersonaArchetype | 'all'>('all');
  const [selectedEra, setSelectedEra] = useState<BiblicalEra | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPersonaInfo, setShowPersonaInfo] = useState(false);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiConfig, setAiConfig] = useState(personaAIService.getConfig());
  const [apiKeyInput, setApiKeyInput] = useState(aiConfig.geminiApiKey || '');
  const [groqKeyInput, setGroqKeyInput] = useState(aiConfig.groqApiKey || '');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [suggestedReplies, setSuggestedReplies] = useState<string[]>(() => {
    return personaAIService.getModernEraInquiry(BIBLICAL_PERSONAS[0]).replies;
  });
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');
  const [isTickerPaused, setIsTickerPaused] = useState(false);
  const [tickerSpeed, setTickerSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [tickerMode, setTickerMode] = useState<'tv' | 'static'>('tv');
  const [isMobileGalleryOpen, setIsMobileGalleryOpen] = useState(false);
  const chatPanelRef = useRef<HTMLDivElement>(null);

  const tickerDuration = useMemo(() => {
    if (tickerSpeed === 'slow') return '115s'; // 0.4x da velocidade de TV (mínima solene e serena)
    if (tickerSpeed === 'fast') return '25s';  // 1.8x
    return '45s';                              // 1.0x TV
  }, [tickerSpeed]);

  const [isCleanMode, setIsCleanMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('biblia_on_clean_chat_mode') === 'true';
    }
    return false;
  });

  const toggleCleanMode = () => {
    setIsCleanMode(prev => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('biblia_on_clean_chat_mode', String(next));
      }
      return next;
    });
  };
  
  const initialInquiry = personaAIService.getModernEraInquiry(BIBLICAL_PERSONAS[0]);
  const [messages, setMessages] = useState<DialogMessage[]>([
    {
      id: 'init_welcome',
      sender: 'persona',
      text: `A paz esteja convosco. Eu sou Jesus Cristo, o Filho Primogênito de Deus e o Bom Pastor. Quem me segue nunca andará em escuridão, mas terá a luz da vida. O que gostarias de aprender comigo hoje?\n\n💬 **E diz-me uma coisa sobre o vosso tempo moderno:**\n${initialInquiry.question}`,
      scriptures: BIBLICAL_PERSONAS[0].scriptureSources,
      timestamp: Date.now()
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [micNotice, setMicNotice] = useState<string | null>(null);
  const [upgradeNotice, setUpgradeNotice] = useState<ModelUpgradeEvent | null>(aiModelLifecycleService.getLastNotice());
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const [streamedText, setStreamedText] = useState<string>('');
  const streamingIntervalRef = useRef<any>(null);
  const fullTextPendingRef = useRef<string>('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
        setMicNotice('Reconhecimento de voz não suportado nativamente. Recomendamos o Google Chrome ou Edge.');
        setTimeout(() => setMicNotice(null), 5000);
        return;
      }
    }

    setMicNotice(`🎙️ Ouvindo a sua voz... Fale a sua pergunta para ${selectedPersona.name} agora...`);
    const ok = speechService.startListening({
      onStart: () => {
        setIsListening(true);
      },
      onResult: (transcript, isFinal) => {
        setInputQuery(transcript);
        if (isFinal) {
          setIsListening(false);
          setMicNotice('Pergunta captada com sucesso! Clique no botão de enviar.');
          setTimeout(() => setMicNotice(null), 3500);
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

  const renderFormattedMessage = (text: string, isPersona: boolean) => {
    const paragraphs = text.split('\n\n').filter(Boolean);

    return (
      <div className="space-y-3">
        {paragraphs.map((p, idx) => {
          const isModernInquiry = p.includes('tempo moderno') || p.includes('vosso tempo') || p.startsWith('💬') || p.includes('Diz-me, meu filho:');

          const formattedParts = p.split(/(\*\*[^*]+\*\*)/g).map((sub, i) => {
            if (sub.startsWith('**') && sub.endsWith('**')) {
              return (
                <strong key={i} className="text-[#D4AF37] font-semibold">
                  {sub.slice(2, -2)}
                </strong>
              );
            }
            return sub;
          });

          if (isModernInquiry && isPersona) {
            if (isCleanMode) return null;
            return (
              <div
                key={idx}
                className="mt-3 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#1E3E62]/40 to-amber-500/10 border border-[#D4AF37]/50 text-xs sm:text-sm text-amber-100/90 leading-relaxed space-y-1 shadow-sm"
              >
                <div className="flex items-center space-x-1.5 text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Reflexão de {selectedPersona.name} sobre o nosso século XXI:</span>
                </div>
                <p className="font-serif italic text-slate-100">
                  {formattedParts}
                </p>
              </div>
            );
          }

          return (
            <p key={idx} className="font-serif text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-100">
              {isPersona && idx === 0 && !p.startsWith('"') ? `“${p}` : p}{isPersona && idx === paragraphs.length - 1 && !p.endsWith('"') && !isModernInquiry ? '”' : ''}
            </p>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Carregar histórico persistente do IndexedDB ao trocar de personagem
  useEffect(() => {
    let active = true;
    getPersonaConversation(selectedPersona.id).then(saved => {
      if (!active) return;
      if (saved && saved.messages && saved.messages.length > 0) {
        setMessages(saved.messages);
      } else {
        const inquiry = personaAIService.getModernEraInquiry(selectedPersona);
        let greeting = `A paz seja contigo. Eu sou ${selectedPersona.name} (${selectedPersona.archetypeLabel}). Como testemunha dos propósitos sagrados de Deus durante ${selectedPersona.historicalPeriod}, estou pronto para conversar contigo. O que tens no coração para inquirir hoje?`;
        
        if (selectedPersona.id === 'jeova_deus') {
          greeting = `A paz seja contigo, meu filho. Eu sou Jeová, o Soberano Senhor do Universo e teu Pai Celestial. Como Criador que estendeu os céus e formou a Terra para ser habitada em paz eterna, estou pronto a ouvir a tua alma. O que gostarias de inquirir da minha Palavra sagrada hoje?`;
        } else if (selectedPersona.id === 'jesus_cristo') {
          greeting = `A paz esteja convosco. Eu sou Jesus Cristo, o Filho Primogênito de Deus e o Bom Pastor. Quem me segue nunca andará em escuridão, mas terá a luz da vida. O que gostarias de aprender comigo hoje?`;
        }

        if (aiConfig.askAboutModernEra && !isCleanMode) {
          greeting += `\n\n💬 **E diz-me uma coisa sobre o vosso tempo moderno:**\n${inquiry.question}`;
        }

        const freshMsg: DialogMessage = {
          id: `init_${Date.now()}`,
          sender: 'persona',
          text: greeting,
          scriptures: selectedPersona.scriptureSources,
          timestamp: Date.now()
        };
        setMessages([freshMsg]);
      }
    });

    return () => { active = false; };
  }, [selectedPersona.id]);

  // Salvar histórico no IndexedDB automaticamente a cada mensagem enviada ou recebida
  useEffect(() => {
    if (messages.length > 1) {
      savePersonaConversation(selectedPersona.id, selectedPersona.name, messages);
    }
  }, [messages, selectedPersona.id, selectedPersona.name]);

  // Carrega vozes do sistema operacional
  useEffect(() => {
    const updateVoices = () => {
      const pt = speechService.getPortugueseVoices();
      setAvailableVoices(pt.length > 0 ? pt : speechService.getVoices());
    };
    updateVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  useEffect(() => {
    const unsubscribe = aiModelLifecycleService.onModelUpgraded((evt) => {
      setUpgradeNotice(evt);
      setAiConfig(personaAIService.getConfig());
      setTimeout(() => setUpgradeNotice(null), 12000);
    });
    return () => {
      unsubscribe();
      if (streamingIntervalRef.current) {
        clearInterval(streamingIntervalRef.current);
      }
    };
  }, []);

  const acousticPreset = useMemo(() => {
    return speechService.getPersonaAcousticPreset(selectedPersona);
  }, [selectedPersona]);

  // Lista curada de conversas mais requisitadas
  const mostRequestedList = useMemo(() => {
    return MOST_REQUESTED_PERSONA_IDS
      .map(id => BIBLICAL_PERSONAS.find(p => p.id === id))
      .filter((p): p is BiblicalPersona => Boolean(p));
  }, []);

  // Lista dos Doze Discípulos de Jesus
  const twelveDisciplesList = useMemo(() => {
    return TWELVE_DISCIPLES_IDS
      .map(id => BIBLICAL_PERSONAS.find(p => p.id === id))
      .filter((p): p is BiblicalPersona => Boolean(p));
  }, []);

  // Lista dos Santos Profetas de Deus
  const prophetsList = useMemo(() => {
    return PROPHETS_PERSONA_IDS
      .map(id => BIBLICAL_PERSONAS.find(p => p.id === id))
      .filter((p): p is BiblicalPersona => Boolean(p));
  }, []);

  // Lista filtrada de personagens por arquétipo/papel bíblico ou era
  const filteredPersonas = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return BIBLICAL_PERSONAS.filter(p => {
      let matchCategory = true;
      if (filterMode === 'most_requested') {
        matchCategory = MOST_REQUESTED_PERSONA_IDS.includes(p.id);
      } else if (filterMode === 'prophets') {
        matchCategory = PROPHETS_PERSONA_IDS.includes(p.id);
      } else if (filterMode === 'disciples') {
        matchCategory = TWELVE_DISCIPLES_IDS.includes(p.id);
      } else if (filterMode === 'archetype') {
        matchCategory = selectedArchetype === 'all' || p.archetype === selectedArchetype;
      } else {
        matchCategory = selectedEra === 'all' || p.era === selectedEra;
      }

      const matchQuery = !q || 
        p.name.toLowerCase().includes(q) || 
        p.title.toLowerCase().includes(q) ||
        p.archetypeLabel.toLowerCase().includes(q) ||
        p.eraLabel.toLowerCase().includes(q) ||
        p.keyThemes.some(t => t.toLowerCase().includes(q));

      return matchCategory && matchQuery;
    });
  }, [filterMode, selectedArchetype, selectedEra, searchQuery]);

  const handleSelectPersona = (p: BiblicalPersona) => {
    setSelectedPersona(p);
    speechService.stop();
    setIsSpeakingId(null);

    const inquiry = personaAIService.getModernEraInquiry(p);
    setSuggestedReplies(inquiry.replies);

    let greeting = `A paz seja contigo. Eu sou ${p.name}, ${p.title} (${p.historicalPeriod}). O que gostarias de me perguntar sobre a minha caminhada nas Escrituras?`;
    if (p.id === 'jeova_deus') {
      greeting = `A paz seja contigo, meu filho. Eu sou Jeová, o Soberano Senhor do Universo e teu Pai Celestial. O que gostarias de me perguntar hoje?`;
    } else if (p.id === 'jesus_cristo') {
      greeting = `A paz esteja convosco. Eu sou Jesus Cristo, o Filho de Deus e o Bom Pastor. Em que posso edificar o teu coração com as palavras que ouvi de meu Pai?`;
    }

    if (aiConfig.askAboutModernEra) {
      greeting += `\n\n💬 **E diz-me uma coisa sobre o vosso tempo moderno:**\n${inquiry.question}`;
    }

    setMessages([
      {
        id: `welcome_${p.id}_${Date.now()}`,
        sender: 'persona',
        text: greeting,
        scriptures: p.scriptureSources,
        timestamp: Date.now()
      }
    ]);

    setIsMobileGalleryOpen(false);

    // Em dispositivos móveis ou telas estreitas, rola suavemente até o painel de chat
    if (typeof window !== 'undefined' && window.innerWidth < 1024 && chatPanelRef.current) {
      chatPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCreateDynamicPersona = () => {
    if (!searchQuery.trim()) return;
    const dynamicPersona = resolveBiblicalPersona(searchQuery.trim());
    setSelectedPersona(dynamicPersona);
    const inquiry = personaAIService.getModernEraInquiry(dynamicPersona);
    setSuggestedReplies(inquiry.replies);

    let dynGreeting = `A paz seja contigo. Sou ${dynamicPersona.name}, ${dynamicPersona.title} (${dynamicPersona.historicalPeriod}). Pergunta-me o que desejas saber sobre o relato sagrado das Escrituras.`;
    if (aiConfig.askAboutModernEra) {
      dynGreeting += `\n\n💬 **E diz-me uma coisa sobre o vosso tempo moderno:**\n${inquiry.question}`;
    }

    setMessages([
      {
        id: `welcome_dyn_${Date.now()}`,
        sender: 'persona',
        text: dynGreeting,
        scriptures: dynamicPersona.scriptureSources,
        timestamp: Date.now()
      }
    ]);
  };

  const handleSendMessage = (textToSend?: string) => {
    const q = (textToSend || inputQuery).trim();
    if (!q) return;

    const userMsg: DialogMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setSuggestedReplies([]);
    setIsGeneratingAI(true);

    // Gera resposta bíblica realista em 1ª pessoa com mentoria profunda e indagação sobre o século XXI
    setTimeout(async () => {
      try {
        const localBase = generatePersonaResponse(selectedPersona, q);
        const historyForAI = messages.map(m => ({ sender: m.sender, text: m.text }));

        const interactive = await personaAIService.generateInteractiveResponse(
          selectedPersona,
          q,
          historyForAI,
          localBase.responseText,
          localBase.scriptureBasis
        );

        const personaMsgId = `persona_${Date.now()}`;
        const fullText = interactive.fullResponseWithQuestion;

        if (aiConfig.speedLevel === 'fast') {
          // Nível 3: Rápido / Instantâneo
          const personaMsg: DialogMessage = {
            id: personaMsgId,
            sender: 'persona',
            text: fullText,
            scriptures: interactive.scriptureBasis,
            timestamp: Date.now()
          };
          setMessages(prev => [...prev, personaMsg]);
        } else {
          // Níveis 1 e 2: Digitação Dinâmica em Tempo Real
          // 'slow' (Solene): 32ms por caractere
          // 'normal' (Natural): 14ms por 2 caracteres
          const stepDelay = aiConfig.speedLevel === 'slow' ? 32 : 14;
          const chunkSize = aiConfig.speedLevel === 'slow' ? 1 : 2;

          fullTextPendingRef.current = fullText;
          setStreamingMessageId(personaMsgId);
          setStreamedText('');

          let currentIndex = 0;
          if (streamingIntervalRef.current) clearInterval(streamingIntervalRef.current);

          streamingIntervalRef.current = setInterval(() => {
            currentIndex += chunkSize;
            if (currentIndex >= fullText.length) {
              clearInterval(streamingIntervalRef.current);
              streamingIntervalRef.current = null;
              setStreamingMessageId(null);
              setStreamedText('');
              const completeMsg: DialogMessage = {
                id: personaMsgId,
                sender: 'persona',
                text: fullText,
                scriptures: interactive.scriptureBasis,
                timestamp: Date.now()
              };
              setMessages(prev => [...prev, completeMsg]);
            } else {
              setStreamedText(fullText.slice(0, currentIndex));
            }
          }, stepDelay);
        }

        if (aiConfig.showQuickReplies) {
          setSuggestedReplies(interactive.suggestedUserReplies);
        }
      } catch (err) {
        console.error('Erro na resposta interativa da IA:', err);
      } finally {
        setIsGeneratingAI(false);
      }
    }, 350);
  };

  const handleSkipStreaming = () => {
    if (streamingIntervalRef.current && streamingMessageId) {
      clearInterval(streamingIntervalRef.current);
      streamingIntervalRef.current = null;
      const fullText = fullTextPendingRef.current;
      setStreamingMessageId(null);
      setStreamedText('');
      const completeMsg: DialogMessage = {
        id: streamingMessageId,
        sender: 'persona',
        text: fullText,
        scriptures: selectedPersona.scriptureSources,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, completeMsg]);
    }
  };

  const handleClearChat = () => {
    speechService.stop();
    setIsSpeakingId(null);
    clearPersonaConversation(selectedPersona.id);
    setMessages([]);
  };

  const handleSpeak = (id: string, text: string) => {
    if (isSpeakingId === id) {
      speechService.stop();
      setIsSpeakingId(null);
    } else {
      const speedMultiplier = 
        aiConfig.speedLevel === 'slow' ? 0.85 :
        aiConfig.speedLevel === 'fast' ? 1.22 : 1.0;
      speechService.speakPersona(text, selectedPersona, () => setIsSpeakingId(null), undefined, speedMultiplier);
      setIsSpeakingId(id);
    }
  };

  const handleTestVoice = () => {
    let testPhrase = `A paz seja contigo. Eu sou ${selectedPersona.name}, ${selectedPersona.title}. Esta é a minha voz personalizada nas Escrituras.`;
    if (selectedPersona.id === 'jeova_deus') {
      testPhrase = `Eu sou Jeová, o Deus Altíssimo sobre toda a terra, teu Criador e Pai. Ouve a minha voz na minha Palavra inspirada.`;
    } else if (selectedPersona.id === 'jesus_cristo') {
      testPhrase = `A paz esteja convosco. Eu sou Jesus Cristo, o Bom Pastor que dá a vida pelas ovelhas.`;
    }
    speechService.speakPersona(testPhrase, selectedPersona);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const archetypesList: Array<{ id: PersonaArchetype | 'all'; label: string; icon: string }> = [
    { id: 'all', label: 'Todos os Papéis', icon: '✨' },
    { id: 'deus', label: 'Jeová Deus', icon: '☀️' },
    { id: 'filho_de_deus', label: 'Jesus Cristo', icon: '🕊️' },
    { id: 'anjo_celestial', label: 'Mensageiros Celestiais (Anjos)', icon: '✨' },
    { id: 'profeta', label: 'Profetas', icon: '🔥' },
    { id: 'rei', label: 'Reis & Líderes', icon: '👑' },
    { id: 'juiz', label: 'Juízes & Valentes', icon: '⚖️' },
    { id: 'mentor_patriarca', label: 'Patriarcas & Mentores', icon: '⛺' },
    { id: 'apostolo_missionario', label: 'Apóstolos', icon: '⛵' },
    { id: 'mulher_de_fe', label: 'Mulheres de Fé', icon: '🌸' },
    { id: 'advertencia_opositor', label: 'Advertências Bíblicas', icon: '⚠️' }
  ];

  const eras: Array<{ id: BiblicalEra | 'all'; label: string; icon: string }> = [
    { id: 'all', label: 'Todas as Eras', icon: '✨' },
    { id: 'soberano', label: 'Jeová Deus', icon: '☀️' },
    { id: 'messias', label: 'Jesus Cristo', icon: '🕊️' },
    { id: 'origens', label: 'Origens & Éden', icon: '🌿' },
    { id: 'patriarcas', label: 'Patriarcas', icon: '⛺' },
    { id: 'exodo', label: 'Êxodo & Deserto', icon: '🔥' },
    { id: 'juizes', label: 'Juízes', icon: '⚖️' },
    { id: 'monarquia', label: 'Monarquia', icon: '👑' },
    { id: 'profetas', label: 'Profetas', icon: '📜' },
    { id: 'exilio', label: 'Exílio & Retorno', icon: '🏛️' },
    { id: 'evangelhos', label: 'Dias do Messias', icon: '📖' },
    { id: 'apostolos', label: 'Expansão Apostólica', icon: '⛵' },
    { id: 'apocalipse', label: 'Apocalipse', icon: '👑' }
  ];

  // Perguntas existenciais de aconselhamento pastoral/mentoria
  const lifeGuidancePrompts = [
    { label: 'Como vencer a ansiedade e o medo?', query: 'Como vencer o medo, a ansiedade e a incerteza do amanhã?' },
    { label: 'Como suportar uma dor ou luto?', query: 'Estou passando por dor, sofrimento e perda, como suportar sem desfalecer?' },
    { label: 'Errei e pequei, como obter perdão?', query: 'Pequei e sinto o peso da culpa, há perdão verdadeiro para mim?' },
    { label: 'Como tomar decisões com sabedoria?', query: 'Preciso tomar uma decisão importante, como conhecer a vontade de Deus?' },
    { label: 'Como orar com sinceridade?', query: 'Como posso orar a Jeová de coração sincero e achegar-me a Ele?' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
            <MessageSquare className="w-4 h-4" />
            <span>Diálogos Imersivos & Vozes Diferenciadas da Fé</span>
          </div>
          <h1 className="font-title text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            O Criador, Seu Filho & Figuras Bíblicas
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Meditação bíblica interativa com rigor exegético: consulte os conselhos e promessas do Soberano Deus Jeová, os ensinamentos de Jesus Cristo e o exemplo de 56 servos fiéis das Escrituras Sagradas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setShowAIModal(true)}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 via-[#1E3E62] to-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-semibold hover:border-emerald-300 transition-all shadow-md hover:scale-[1.02] cursor-pointer"
            title="IA Ativa — Clique para alternar entre Groq Cloud e Google Gemini"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <Bot className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-bold text-white">IA Online Ativa:</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black tracking-wide ml-0.5 shadow-xs">
              {aiConfig.provider === 'groq' ? 'Groq Qwen 27B 🚀' : 'Gemini 2.0 ⚡'}
            </span>
          </button>
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Fidelidade Bíblica Rigorosa</span>
          </div>
          <button
            onClick={handleClearChat}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs hover:border-[#D4AF37] border border-transparent transition-all shadow-xs"
            title="Reiniciar conversa com esta persona"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Nova Conversa</span>
          </button>
        </div>
      </div>

      {/* SEÇÃO DESTACADA: LETREIRO CONTÍNUO DE TELEVISÃO (TV TICKER) */}
      <div className="bg-gradient-to-r from-[#0B192C] via-[#1E3E62] to-[#0B192C] border-2 border-[#D4AF37]/50 rounded-2xl p-3.5 sm:p-4 shadow-xl space-y-3 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          <div className="flex items-center space-x-2.5">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            <div className="flex items-center space-x-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white font-mono text-[10px] font-black tracking-wider uppercase shadow-xs">
                TV AO VIVO
              </span>
              <h2 className="font-title text-sm sm:text-base md:text-lg font-bold text-white flex items-center space-x-2">
                <span>Letreiro das Personagens Bíblicas</span>
                <span className="text-[11px] font-normal text-[#D4AF37] px-2 py-0.5 rounded-full bg-[#0B192C] border border-[#D4AF37]/30">
                  {mostRequestedList.length} Destaques da Fé
                </span>
              </h2>
            </div>
          </div>

          {/* Controles do Letreiro de TV: Pausar/Rodar, Velocidade e Alternância de Modo */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            {/* Botão Pausar / Rodar */}
            <button
              onClick={() => setIsTickerPaused(!isTickerPaused)}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all border cursor-pointer ${
                isTickerPaused
                  ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md ring-1 ring-amber-300'
                  : 'bg-[#0B192C] text-slate-200 border-slate-700 hover:border-[#D4AF37] hover:bg-[#1E3E62]'
              }`}
              title={isTickerPaused ? 'Retomar movimento do letreiro' : 'Pausar letreiro para clicar com calma'}
            >
              {isTickerPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-slate-950 fill-current" />
                  <span>Rodar</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-300 fill-current" />
                  <span>Pausar</span>
                </>
              )}
            </button>

            {/* Seletor de Velocidade do Letreiro */}
            <div className="flex items-center bg-[#0B192C] border border-slate-700/80 rounded-xl p-0.5 text-[11px]">
              <button
                onClick={() => setTickerSpeed('slow')}
                className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                  tickerSpeed === 'slow' ? 'bg-[#1E3E62] text-[#D4AF37] font-bold shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
                title="Velocidade Mínima da TV (0.4x - 115s)"
              >
                0.4x TV
              </button>
              <button
                onClick={() => setTickerSpeed('normal')}
                className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                  tickerSpeed === 'normal' ? 'bg-[#1E3E62] text-[#D4AF37] font-bold shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
                title="Velocidade Padrão de TV (45s)"
              >
                1.0x TV
              </button>
              <button
                onClick={() => setTickerSpeed('fast')}
                className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                  tickerSpeed === 'fast' ? 'bg-[#1E3E62] text-[#D4AF37] font-bold shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
                title="Velocidade Dinâmica / Rápida (25s)"
              >
                1.8x
              </button>
            </div>

            {/* Alternador entre Letreiro Contínuo (TV) e Modo Grade Estática */}
            <button
              onClick={() => setTickerMode(tickerMode === 'tv' ? 'static' : 'tv')}
              className="px-2.5 py-1 rounded-xl bg-[#0B192C] text-slate-300 border border-slate-700/80 hover:border-[#D4AF37] text-xs flex items-center space-x-1 cursor-pointer"
              title="Alternar entre Letreiro Contínuo de TV e Grade Estática"
            >
              {tickerMode === 'tv' ? (
                <>
                  <Grid className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Ver Todos</span>
                </>
              ) : (
                <>
                  <Tv className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Modo TV</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-300">
          <p className="flex items-center space-x-1.5">
            <span className="text-[#D4AF37] font-bold">💡 Dica de TV:</span>
            <span>O letreiro corre continuamente. Passa o rato ou toca por cima para pausar e clica em qualquer personagem para falar com ela!</span>
          </p>
        </div>

        {/* MODO 1: LETREIRO CONTÍNUO DE TELEVISÃO (MARQUEE INFINITO E 100% CLICÁVEL) */}
        {tickerMode === 'tv' ? (
          <div 
            className="relative overflow-hidden py-1 rounded-xl bg-[#07111E]/90 border border-[#D4AF37]/30 group"
          >
            {/* Gradientes de desvanecimento cinematográfico nas bordas laterais estilo TV */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#07111E] to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#07111E] to-transparent z-10" />

            <div
              className={`tv-ticker-track ${isTickerPaused ? 'tv-ticker-paused' : ''} flex items-center space-x-2.5 py-1 px-2`}
              style={{ '--ticker-duration': tickerDuration } as React.CSSProperties}
            >
              {/* Duplicamos a lista de personagens para gerar um looping contínuo suave estilo televisão */}
              {[...mostRequestedList, ...mostRequestedList].map((p, idx) => {
                const isSelected = selectedPersona.id === p.id;
                return (
                  <button
                    key={`${p.id}_ticker_${idx}`}
                    onClick={() => handleSelectPersona(p)}
                    className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 shrink-0 border cursor-pointer select-none active:scale-95 ${
                      isSelected
                        ? 'bg-[#D4AF37] text-slate-950 border-white shadow-xl ring-2 ring-[#D4AF37] scale-105 font-bold z-20'
                        : 'bg-[#0B192C] text-white border-slate-700/90 hover:border-[#D4AF37] hover:bg-[#1E3E62] hover:text-[#D4AF37] hover:scale-105'
                    }`}
                    title={`Clique para iniciar conversa com ${p.name} (${p.title})`}
                  >
                    <span className="text-base leading-none">{p.avatarSymbol}</span>
                    <span className="tracking-wide">{p.name}</span>
                    {isSelected ? (
                      <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse ml-0.5"></span>
                    ) : (
                      <span className="text-[10px] text-slate-400 group-hover:text-amber-300/80 font-normal">
                        • {p.archetypeLabel.split('&')[0].trim()}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* MODO 2: GRADE ESTÁTICA COM SCROLL HORIZONTAL */
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin">
            {mostRequestedList.map(p => {
              const isSelected = selectedPersona.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectPersona(p)}
                  className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 shrink-0 border cursor-pointer ${
                    isSelected
                      ? 'bg-[#D4AF37] text-slate-950 border-white shadow-lg scale-105 font-bold'
                      : 'bg-[#0B192C]/90 text-white border-slate-700/80 hover:border-[#D4AF37] hover:bg-[#1E3E62]'
                  }`}
                  title={`Clique para conversar com ${p.name}`}
                >
                  <span className="text-base">{p.avatarSymbol}</span>
                  <span>{p.name}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-slate-950"></span>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Controles de Filtro: Mais Requisitadas, Os Doze Discípulos, Papel e Eras Históricas */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 p-3 rounded-2xl shadow-xs">
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl self-start">
          <button
            onClick={() => setFilterMode('most_requested')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-all ${
              filterMode === 'most_requested'
                ? 'bg-[#1E3E62] text-[#D4AF37] shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Mais Requisitadas ({mostRequestedList.length})</span>
          </button>
          <button
            onClick={() => setFilterMode('prophets')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-all ${
              filterMode === 'prophets'
                ? 'bg-[#1E3E62] text-[#D4AF37] shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Os Profetas ({prophetsList.length})</span>
          </button>
          <button
            onClick={() => setFilterMode('disciples')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-all ${
              filterMode === 'disciples'
                ? 'bg-[#1E3E62] text-[#D4AF37] shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Os Doze Discípulos ({twelveDisciplesList.length})</span>
          </button>
          <button
            onClick={() => setFilterMode('archetype')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              filterMode === 'archetype'
                ? 'bg-[#1E3E62] text-[#D4AF37] shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Por Papel (Mentor, Rei, Profeta...)
          </button>
          <button
            onClick={() => setFilterMode('era')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              filterMode === 'era'
                ? 'bg-[#1E3E62] text-[#D4AF37] shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Por Era Cronológica
          </button>
        </div>

        {/* Chips de Seleção Subordinados quando em modo papel ou era */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-thin flex-1 sm:justify-end">
          {filterMode === 'archetype' && archetypesList.map(item => (
            <button
              key={item.id}
              onClick={() => setSelectedArchetype(item.id)}
              className={`whitespace-nowrap px-3 py-1 rounded-xl text-xs font-medium transition-all flex items-center space-x-1.5 shrink-0 ${
                selectedArchetype === item.id
                  ? 'bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/50 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
          {filterMode === 'era' && eras.map(item => (
            <button
              key={item.id}
              onClick={() => setSelectedEra(item.id)}
              className={`whitespace-nowrap px-3 py-1 rounded-xl text-xs font-medium transition-all flex items-center space-x-1.5 shrink-0 ${
                selectedEra === item.id
                  ? 'bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/50 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
          {filterMode === 'most_requested' && (
            <span className="text-[11px] text-[#D4AF37] font-semibold hidden sm:inline">
              Exibindo as {mostRequestedList.length} figuras mais solicitadas das Escrituras
            </span>
          )}
          {filterMode === 'prophets' && (
            <span className="text-[11px] text-[#D4AF37] font-semibold hidden sm:inline">
              Exibindo os {prophetsList.length} santos profetas inspirados de Deus
            </span>
          )}
          {filterMode === 'disciples' && (
            <span className="text-[11px] text-[#D4AF37] font-semibold hidden sm:inline">
              Exibindo os {twelveDisciplesList.length} apóstolos e discípulos de Jesus
            </span>
          )}
        </div>
      </div>

      {/* Seletor Compacto no Mobile para Alternar Personagem Sem Bloquear o Ecrã */}
      <div className="lg:hidden flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 shadow-sm mb-4">
        <div className="flex items-center space-x-2.5 min-w-0">
          <span className="text-2xl p-1.5 rounded-xl bg-amber-500/10 border border-[#D4AF37]/40 shrink-0">
            {selectedPersona.avatarSymbol}
          </span>
          <div className="min-w-0">
            <span className="text-[10px] text-slate-400 block font-mono uppercase">
              {selectedPersona.id === 'jeova_deus'
                ? '👑 O Criador em Foco:'
                : selectedPersona.id === 'jesus_cristo'
                  ? '✝️ O Filho de Deus em Foco:'
                  : '📜 Servo Bíblico em Foco:'}
            </span>
            <h4 className="font-title text-sm font-bold text-slate-900 dark:text-white truncate">
              {selectedPersona.name} <span className="text-[11px] text-[#D4AF37] font-normal">({selectedPersona.archetypeLabel})</span>
            </h4>
          </div>
        </div>
        <button
          onClick={() => setIsMobileGalleryOpen(!isMobileGalleryOpen)}
          className="px-3 py-1.5 rounded-xl bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-semibold flex items-center space-x-1.5 shrink-0 active:scale-95 transition-all shadow-xs cursor-pointer"
        >
          <Users className="w-3.5 h-3.5" />
          <span>{isMobileGalleryOpen ? 'Fechar Lista' : 'Figuras (58)'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Painel Esquerdo: Galeria e Busca de Personagens */}
        <div className={`${isMobileGalleryOpen ? 'flex' : 'hidden lg:flex'} lg:col-span-1 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex-col h-[480px] lg:h-[750px] mb-4 lg:mb-0 animate-in fade-in`}>
          {/* Campo de Pesquisa em Tempo Real */}
          <div className="relative mb-3">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar (ex: Jeová, Jesus, Davi, Noé, Ester)..."
              className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
            <span>Escrituras Sagradas ({filteredPersonas.length})</span>
            <span className="text-[#D4AF37] font-mono">
              {filterMode === 'archetype' 
                ? (selectedArchetype !== 'all' ? ARCHETYPE_METADATA[selectedArchetype]?.label : 'Todos')
                : (selectedEra !== 'all' ? ERA_METADATA[selectedEra]?.label : 'Todas')}
            </span>
          </div>

          {/* Lista Estruturada com Distinção de Honra ao Criador */}
          <div className="overflow-y-auto flex-1 space-y-3 pr-1 scrollbar-thin">
            {filteredPersonas.length > 0 ? (
              (() => {
                const sovereignGod = filteredPersonas.find(p => p.id === 'jeova_deus');
                const messianicSon = filteredPersonas.find(p => p.id === 'jesus_cristo');
                const humanWitnesses = filteredPersonas.filter(p => p.id !== 'jeova_deus' && p.id !== 'jesus_cristo');

                return (
                  <>
                    {/* 1. SEÇÃO DE REVERÊNCIA MÁXIMA: O SOBERANO DEUS */}
                    {sovereignGod && (
                      <div className="space-y-1">
                        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center space-x-1.5 bg-[#1E3E62]/40 rounded-lg border border-[#D4AF37]/40 shadow-xs">
                          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                          <span>O Soberano Senhor do Universo</span>
                        </div>
                        <button
                          onClick={() => handleSelectPersona(sovereignGod)}
                          className={`w-full text-left p-3 rounded-xl text-xs transition-all flex items-start space-x-3 cursor-pointer ${
                            selectedPersona.id === sovereignGod.id
                              ? 'bg-gradient-to-r from-[#1E3E62] via-[#0B192C] to-[#1E3E62] text-[#D4AF37] font-semibold border-2 border-[#D4AF37] shadow-md ring-1 ring-[#D4AF37]/50'
                              : 'bg-amber-500/10 hover:bg-amber-500/20 text-slate-900 dark:text-white border border-[#D4AF37]/40 shadow-xs'
                          }`}
                        >
                          <span className="text-2xl shrink-0 p-1.5 rounded-xl bg-amber-500/20 border border-[#D4AF37]/50 shadow-xs">
                            {sovereignGod.avatarSymbol}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1.5">
                              <span className="font-bold text-sm text-[#D4AF37] shrink-0 font-title">
                                {sovereignGod.name}
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1E3E62] text-[#D4AF37] font-mono font-semibold">
                                Todo-Poderoso
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 dark:text-slate-300 truncate mt-0.5">
                              {sovereignGod.title}
                            </p>
                          </div>
                        </button>
                      </div>
                    )}

                    {/* 2. SEÇÃO MESSIÂNICA: O FILHO DE DEUS */}
                    {messianicSon && (
                      <div className="space-y-1">
                        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center space-x-1.5 bg-[#0B192C] rounded-lg border border-slate-700 shadow-xs">
                          <Crown className="w-3 h-3 text-amber-400" />
                          <span>O Filho de Deus & Rei Messiânico</span>
                        </div>
                        <button
                          onClick={() => handleSelectPersona(messianicSon)}
                          className={`w-full text-left p-3 rounded-xl text-xs transition-all flex items-start space-x-3 cursor-pointer ${
                            selectedPersona.id === messianicSon.id
                              ? 'bg-[#1E3E62] text-[#D4AF37] font-semibold border-2 border-[#D4AF37] shadow-md'
                              : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-[#1E3E62]/30 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700/60'
                          }`}
                        >
                          <span className="text-2xl shrink-0 p-1.5 rounded-xl bg-amber-500/15 border border-[#D4AF37]/30">
                            {messianicSon.avatarSymbol}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1.5">
                              <span className="font-bold text-sm text-slate-900 dark:text-white shrink-0 font-title">
                                {messianicSon.name}
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-amber-700 dark:text-amber-300 font-mono font-semibold">
                                O Redentor
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {messianicSon.title}
                            </p>
                          </div>
                        </button>
                      </div>
                    )}

                    {/* 3. SEÇÃO DOS SERVOS E TESTEMUNHAS HUMANAS */}
                    {humanWitnesses.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                          <span>Servos & Testemunhas Bíblicas ({humanWitnesses.length})</span>
                        </div>
                        {humanWitnesses.map((persona) => {
                          const isSelected = selectedPersona.id === persona.id;
                          return (
                            <button
                              key={persona.id}
                              onClick={() => handleSelectPersona(persona)}
                              className={`w-full text-left p-3 rounded-xl text-xs transition-all flex items-start space-x-3 cursor-pointer ${
                                isSelected
                                  ? 'bg-[#1E3E62] text-[#D4AF37] font-semibold border border-[#D4AF37]/50 shadow-sm'
                                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent'
                              }`}
                            >
                              <span className="text-xl shrink-0 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                                {persona.avatarSymbol}
                              </span>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-1.5">
                                  <span className="font-bold text-sm text-slate-900 dark:text-white shrink-0">
                                    {persona.name}
                                  </span>
                                  <span className="text-[10px] text-[#D4AF37] font-mono truncate text-right">
                                    {persona.archetypeLabel.split('&')[0].trim()}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                  {persona.title}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </>
                );
              })()
            ) : (
              <div className="p-4 text-center space-y-3">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Nenhum registro encontrado para "{searchQuery}".
                </p>
                <button
                  onClick={handleCreateDynamicPersona}
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-500/10 border border-[#D4AF37] text-[#D4AF37] hover:bg-amber-500/20 text-xs font-semibold flex items-center justify-center space-x-2 transition-all shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Conversar com "{searchQuery}"</span>
                </button>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  A BIBLIA ON conecta-te instantaneamente com qualquer figura bíblica das Escrituras Sagradas como teu mentor.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Painel Central: Chat e Diálogo com o Mentor/Profeta/Rei/Juiz/Deus */}
        <div ref={chatPanelRef} className="lg:col-span-3 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 sm:p-6 shadow-sm flex flex-col h-[750px] justify-between relative">
          {/* Cabeçalho da Personagem Ativa com Arquétipo e Indicador de Voz (Estruturado em Linhas no Mobile para Evitar Sobreposições) */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3 mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-3">
            {/* Linha 1: Identidade da Personagem */}
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <span className="text-2xl sm:text-3xl p-1.5 sm:p-2 rounded-2xl bg-amber-500/10 border border-[#D4AF37]/40 shrink-0">
                {selectedPersona.avatarSymbol}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="font-title text-base sm:text-xl font-bold text-slate-900 dark:text-white truncate">
                    {selectedPersona.name}
                  </h3>
                  <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#1E3E62] text-[#D4AF37] font-semibold truncate max-w-[150px] sm:max-w-none">
                    {selectedPersona.archetypeLabel}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0">
                    {selectedPersona.eraLabel}
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  <span className="truncate">{selectedPersona.title}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="text-[#D4AF37] font-mono hidden sm:inline-flex items-center space-x-1">
                    <Mic className="w-3 h-3 inline" />
                    <span>{acousticPreset.descriptor} ({acousticPreset.pitch}x)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Linha 2 (Mobile) / Lado Direito (Desktop): Barra de Ferramentas e Configurações */}
            <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800/80">
              {/* Botão Chat Limpo (Modo Zen sem escritas que atrapalham) */}
              <button
                onClick={toggleCleanMode}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 border transition-all cursor-pointer shadow-xs ${
                  isCleanMode
                    ? 'bg-[#D4AF37] text-slate-950 border-white font-bold ring-1 ring-amber-300 shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-300 hover:text-[#D4AF37] border-slate-200 dark:border-slate-700'
                }`}
                title={isCleanMode ? 'Desativar Chat Limpo (Voltar a exibir perguntas sugeridas e chips)' : 'Ativar Chat Limpo (Ocultar escritas, chips e distrações)'}
              >
                {isCleanMode ? <EyeOff className="w-3.5 h-3.5 text-slate-950" /> : <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />}
                <span className="text-[11px] sm:text-xs">{isCleanMode ? 'Limpo ✓' : 'Limpo'}</span>
              </button>

              {/* Botão Apagar Chat */}
              <button
                onClick={handleClearChat}
                className="px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/30 hover:border-rose-400 transition-all cursor-pointer shadow-xs active:scale-95"
                title="Apagar todo o histórico de mensagens deste chat"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">Apagar</span>
              </button>

              {/* Botão de Estado da IA e Chave */}
              <button
                onClick={() => setShowAIModal(true)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 border transition-all ${
                  personaAIService.hasActiveAI()
                    ? 'bg-sky-500/15 text-sky-300 border-sky-500/40 hover:bg-sky-500/25 shadow-xs'
                    : 'bg-amber-500/10 text-[#D4AF37] border-[#D4AF37]/40 hover:bg-amber-500/20'
                }`}
                title="Configurar Inteligência Artificial (Google Gemini, Groq ou Motor Local)"
              >
                <Bot className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[11px] sm:text-xs">
                  {personaAIService.hasActiveAI() ? 'IA ⚡' : 'TNM 🛡️'}
                </span>
              </button>

              {/* Botão de Configurações Vocais */}
              <button
                onClick={() => setShowVoiceSettings(!showVoiceSettings)}
                className={`p-2 rounded-xl transition-colors flex items-center space-x-1.5 text-xs font-mono ${
                  showVoiceSettings 
                    ? 'bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/40' 
                    : 'text-slate-400 hover:text-[#D4AF37] hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title="Configurações de Áudio e Vozes Diferenciadas"
              >
                <Sliders className="w-4 h-4" />
                <span className="hidden sm:inline">Voz</span>
              </button>

              <button
                onClick={() => setShowPersonaInfo(!showPersonaInfo)}
                className="p-2 rounded-xl text-slate-400 hover:text-[#D4AF37] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Ver perfil completo e passagens bíblicas"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tarja Solene de Reverência para Jeová Deus */}
          {selectedPersona.id === 'jeova_deus' && (
            <div className="mb-3 px-3.5 py-2.5 rounded-xl bg-amber-500/10 border border-[#D4AF37]/50 text-amber-200 text-xs flex items-start space-x-2.5 shadow-sm animate-in fade-in">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="text-[#D4AF37] block font-semibold text-xs">
                  Nota de Reverência ao Soberano Deus Jeová:
                </strong>
                <span className="text-slate-600 dark:text-slate-300 text-[11px] block mt-0.5">
                  Todas as respostas fundamentam-se exclusivamente nas palavras, promessas e conselhos que o Criador revelou no Cânon Sagrado das Escrituras (Tradução do Novo Mundo). Esta ferramenta tem caráter estritamente educativo para meditação bíblica e não constitui nova revelação nem substitui a oração pessoal sincera.
                </span>
              </div>
            </div>
          )}

          {/* Tarja de Reverência para Jesus Cristo */}
          {selectedPersona.id === 'jesus_cristo' && (
            <div className="mb-3 px-3.5 py-2 rounded-xl bg-[#1E3E62]/40 border border-[#D4AF37]/40 text-amber-200 text-xs flex items-start space-x-2.5 shadow-sm animate-in fade-in">
              <Crown className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="text-[#D4AF37] block font-semibold text-xs">
                  O Filho de Deus e Rei Messiânico:
                </strong>
                <span className="text-slate-600 dark:text-slate-300 text-[11px] block mt-0.5">
                  Diálogo reflexivo baseado com rigor e fidelidade histórica nos ensinamentos, milagres e ministério de Cristo registados nos Evangelhos e no restante cânon bíblico.
                </span>
              </div>
            </div>
          )}

          {/* Drawer / Painel de Configurações Vocais Diferenciadas */}
          {showVoiceSettings && (
            <div className="absolute top-20 right-6 left-6 z-20 bg-white dark:bg-[#081220] border border-[#D4AF37]/50 rounded-2xl p-5 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Mic className="w-4 h-4 text-[#D4AF37]" />
                  <h4 className="font-title text-sm font-bold text-slate-900 dark:text-white">
                    Perfil Vocal Acústico: {selectedPersona.name}
                  </h4>
                </div>
                <button
                  onClick={() => setShowVoiceSettings(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Timbre & Modulação Ativa:</span>
                    <span className="font-bold text-sm text-[#D4AF37]">{acousticPreset.descriptor}</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Tom: <span className="font-mono text-slate-300">{acousticPreset.pitch}x</span> • Velocidade: <span className="font-mono text-slate-300">{acousticPreset.rate}x</span> • Gênero: <span className="font-mono text-slate-300">{acousticPreset.gender}</span>
                    </p>
                  </div>

                  <button
                    onClick={handleTestVoice}
                    className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/40 hover:bg-[#1E3E62]/80 transition-all font-semibold shrink-0"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Testar Voz de {selectedPersona.name}</span>
                  </button>
                </div>

                {/* Seletor de voz nativa do dispositivo */}
                {availableVoices.length > 0 && (
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                      Voz Sintetizada do Sistema (Disponíveis: {availableVoices.length}):
                    </label>
                    <select
                      value={selectedVoiceURI || speechService.getSelectedVoiceURI() || ''}
                      onChange={(e) => {
                        setSelectedVoiceURI(e.target.value);
                        speechService.setSelectedVoice(e.target.value);
                      }}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="">(Automático - Seleciona a melhor voz para {selectedPersona.name})</option>
                      {availableVoices.map(v => (
                        <option key={v.voiceURI} value={v.voiceURI}>
                          {v.name} ({v.lang})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Drawer / Card de Detalhes da Personagem */}
          {showPersonaInfo && (
            <div className="absolute top-20 right-6 left-6 z-20 bg-white dark:bg-[#081220] border border-[#D4AF37]/40 rounded-2xl p-5 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <UserCheck className="w-4 h-4 text-[#D4AF37]" />
                  <h4 className="font-title text-sm font-bold text-slate-900 dark:text-white">
                    Perfil Bíblico: {selectedPersona.name} ({selectedPersona.archetypeLabel})
                  </h4>
                </div>
                <button
                  onClick={() => setShowPersonaInfo(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <p className="leading-relaxed font-serif italic bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700/60">
                  "{selectedPersona.biographyContext}"
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <span className="font-semibold text-slate-400 block mb-1">Temas da Vida e Ministração:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedPersona.keyThemes.map((theme, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-400 block mb-1">Passagens Bíblicas de Base:</span>
                    <span className="font-mono text-[11px] text-[#D4AF37]">
                      {selectedPersona.scriptureSources.join('; ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal / Painel de Configurações da IA Híbrida & Perguntas do Nosso Tempo */}
          {showAIModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="w-full max-w-xl bg-white dark:bg-[#0B192C] border-2 border-[#D4AF37]/60 rounded-3xl p-6 shadow-2xl space-y-5 text-slate-900 dark:text-white max-h-[90vh] overflow-y-auto">
                <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 rounded-xl bg-[#D4AF37] text-slate-950">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-title text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        Configuração da IA Híbrida & Diálogo do Século 21
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Interatividade bíblica bidirecional e modelo de raciocínio
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAIModal(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Seleção do Motor de IA */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center space-x-1.5">
                    <Cpu className="w-4 h-4" />
                    <span>Modo de Operação da IA:</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Modo 1: Motor Local TNM */}
                    <button
                      type="button"
                      onClick={() => {
                        personaAIService.updateConfig({ mode: 'hibrido' });
                        setAiConfig(personaAIService.getConfig());
                      }}
                      className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                        aiConfig.mode === 'hibrido' || aiConfig.mode === 'offline_apenas'
                          ? 'bg-[#1E3E62] border-[#D4AF37] shadow-md ring-1 ring-[#D4AF37]'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs sm:text-sm text-[#D4AF37]">Híbrido / TNM Local</span>
                          {(aiConfig.mode === 'hibrido' || aiConfig.mode === 'offline_apenas') && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          100% offline e sem necessidade de chave de API. Respostas auditadas e exegéticas da Tradução do Novo Mundo.
                        </p>
                      </div>
                      <span className="mt-2 text-[10px] font-mono font-bold text-emerald-400">✓ Gratuito e offline</span>
                    </button>

                    {/* Modo 2: Google Gemini AI */}
                    <button
                      type="button"
                      onClick={() => {
                        personaAIService.updateConfig({ mode: 'ia_online', provider: 'gemini' });
                        setAiConfig(personaAIService.getConfig());
                      }}
                      className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                        aiConfig.mode === 'ia_online' && aiConfig.provider === 'gemini'
                          ? 'bg-[#1E3E62] border-[#D4AF37] shadow-md ring-1 ring-[#D4AF37]'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs sm:text-sm text-sky-400">Google Gemini AI</span>
                          {aiConfig.mode === 'ia_online' && aiConfig.provider === 'gemini' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          Raciocínio teológico profundo e reflexão histórica detalhada via Gemini 1.5 Flash.
                        </p>
                      </div>
                      <span className="mt-2 text-[10px] font-mono font-bold text-sky-300">⚡ Google AI Studio</span>
                    </button>

                    {/* Modo 3: Groq Cloud AI */}
                    <button
                      type="button"
                      onClick={() => {
                        personaAIService.updateConfig({ mode: 'ia_online', provider: 'groq' });
                        setAiConfig(personaAIService.getConfig());
                      }}
                      className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                        aiConfig.mode === 'ia_online' && aiConfig.provider === 'groq'
                          ? 'bg-[#1E3E62] border-[#D4AF37] shadow-md ring-1 ring-[#D4AF37]'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs sm:text-sm text-amber-300">Groq Cloud (Llama 3.3)</span>
                          {aiConfig.mode === 'ia_online' && aiConfig.provider === 'groq' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          Velocidade extrema de inferência (&lt; 1s) com Llama 3.3 70B da Meta na infraestrutura ultra-rápida Groq LPU.
                        </p>
                      </div>
                      <span className="mt-2 text-[10px] font-mono font-bold text-amber-300">🚀 Ultra-Rápido & Grátis</span>
                    </button>
                  </div>

                  {/* Campo de Chave de API Gemini (se Gemini selecionado) */}
                  {aiConfig.mode === 'ia_online' && aiConfig.provider === 'gemini' && (
                    <div className="p-3.5 rounded-2xl bg-sky-950/30 border border-sky-500/40 space-y-2 animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5 text-xs font-semibold text-sky-300">
                          <Key className="w-3.5 h-3.5" />
                          <span>Chave de API Gemini (Google AI Studio):</span>
                        </div>
                        <a
                          href="https://aistudio.google.com/app/apikey"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-sky-400 hover:text-sky-300 underline font-medium"
                        >
                          Obter chave gratuita no Google AI Studio ↗
                        </a>
                      </div>
                      <input
                        type="password"
                        value={apiKeyInput}
                        onChange={(e) => {
                          setApiKeyInput(e.target.value);
                          personaAIService.updateConfig({ geminiApiKey: e.target.value });
                          setAiConfig(personaAIService.getConfig());
                        }}
                        placeholder="Ex: AIzaSy..."
                        className="w-full bg-[#081220] border border-sky-500/50 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                      <p className="text-[10px] text-slate-400">
                        A sua chave fica guardada unicamente no seu navegador (<code className="text-amber-300">localStorage</code>) ou pode ser definida no arquivo <code className="text-amber-300">.env</code> como <code className="text-sky-300">VITE_GEMINI_API_KEY</code>.
                      </p>
                      <div className="flex items-center justify-between pt-1 border-t border-sky-500/20 text-[10px]">
                        <span className="text-sky-300 font-mono flex items-center space-x-1">
                          <Zap className="w-3 h-3 text-[#D4AF37]" />
                          <span>Modelo Ativo: <strong>{aiModelLifecycleService.getActiveGeminiModel()}</strong></span>
                        </span>
                        <span className="text-emerald-400 flex items-center space-x-1 font-semibold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Auto-sucessão em deprecação ativa</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Campo de Chave de API Groq (se Groq selecionado) */}
                  {aiConfig.mode === 'ia_online' && aiConfig.provider === 'groq' && (
                    <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-2 animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5 text-xs font-semibold text-amber-300">
                          <Key className="w-3.5 h-3.5" />
                          <span>Chave de API Groq Cloud (Llama 3.3 70B):</span>
                        </div>
                        <a
                          href="https://console.groq.com/keys"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-amber-400 hover:text-amber-300 underline font-medium"
                        >
                          Obter chave gratuita no Groq Console ↗
                        </a>
                      </div>
                      <input
                        type="password"
                        value={groqKeyInput}
                        onChange={(e) => {
                          setGroqKeyInput(e.target.value);
                          personaAIService.updateConfig({ groqApiKey: e.target.value });
                          setAiConfig(personaAIService.getConfig());
                        }}
                        placeholder="Ex: gsk_..."
                        className="w-full bg-[#081220] border border-amber-500/50 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                      <p className="text-[10px] text-slate-400">
                        A sua chave Groq é armazenada localmente de forma privada no seu dispositivo ou no arquivo <code className="text-amber-300">.env</code> como <code className="text-amber-300">VITE_GROQ_API_KEY</code>.
                      </p>
                      <div className="flex items-center justify-between pt-1 border-t border-amber-500/20 text-[10px]">
                        <span className="text-amber-300 font-mono flex items-center space-x-1">
                          <Zap className="w-3 h-3 text-[#D4AF37]" />
                          <span>Modelo Ativo: <strong>{aiModelLifecycleService.getActiveGroqModel()}</strong></span>
                        </span>
                        <span className="text-emerald-400 flex items-center space-x-1 font-semibold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Auto-sucessão em deprecação ativa</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Alternadores Interativos */}
                <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block">
                    Interatividade do Século 21 & Chips:
                  </label>

                  {/* Toggle 1: Personagens nos perguntam sobre nosso tempo */}
                  <label className="flex items-start space-x-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <input
                      type="checkbox"
                      checked={aiConfig.askAboutModernEra}
                      onChange={(e) => {
                        personaAIService.updateConfig({ askAboutModernEra: e.target.checked });
                        setAiConfig(personaAIService.getConfig());
                      }}
                      className="mt-0.5 rounded text-[#D4AF37] focus:ring-[#D4AF37] w-4 h-4"
                    />
                    <div>
                      <span className="font-semibold text-xs text-slate-900 dark:text-white block">
                        Personagens bíblicos nos questionam sobre os tempos modernos
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed block mt-0.5">
                        Ao responder, a personagem bíblica indaga sobre dilemas do século 21 (como telas, pressa, desintegração moral ou secularismo) sob a ótica de sua vivência sagrada.
                      </span>
                    </div>
                  </label>
                </div>

                {/* Guardrails e Botão de Conclusão */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-[11px] text-emerald-400 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Guardrails TNM & Doutrinais Ativos</span>
                  </div>
                  <button
                    onClick={() => setShowAIModal(false)}
                    className="px-5 py-2 rounded-xl bg-[#D4AF37] text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all shadow-md"
                  >
                    Salvar e Concluir
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Banner de Auto-Atualização de Modelo Descontinuado */}
          {upgradeNotice && (
            <div className="bg-gradient-to-r from-amber-500/20 via-sky-500/20 to-amber-500/20 border border-[#D4AF37] p-3 rounded-2xl flex items-center justify-between text-xs text-amber-200 shadow-lg mb-3 animate-in slide-in-from-top">
              <div className="flex items-center space-x-2.5">
                <Zap className="w-4 h-4 text-[#D4AF37] animate-bounce shrink-0" />
                <div className="leading-snug">
                  <span className="font-bold text-white">Auto-Atualização de IA Ativada: </span>
                  O modelo <code className="text-rose-300 font-mono px-1 py-0.5 bg-rose-950/60 rounded">{upgradeNotice.deprecatedModel}</code> foi descontinuado pelo provedor e atualizado com sucesso para <code className="text-emerald-300 font-mono font-bold px-1 py-0.5 bg-emerald-950/60 rounded">{upgradeNotice.newModel}</code>.
                  <span className="block text-[10px] text-slate-300 mt-0.5">As tuas conversas continuam sem interrupções e sem erros.</span>
                </div>
              </div>
              <button 
                onClick={() => setUpgradeNotice(null)} 
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-2"
                title="Fechar notificação"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Área de Mensagens com Scroll */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-3 scrollbar-thin">
            {messages.length === 0 && (
              <div className="h-full min-h-[280px] flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3 animate-in fade-in">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-[#D4AF37]/30 flex items-center justify-center text-3xl shadow-sm">
                  {selectedPersona.avatarSymbol}
                </div>
                <div className="space-y-1">
                  <h4 className="font-title text-base font-bold text-slate-200">
                    Conversa limpa com {selectedPersona.name}
                  </h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                    {isCleanMode
                      ? 'Modo Chat Limpo ativado. O histórico e todas as distrações foram removidos para manter o foco total.'
                      : 'O histórico de mensagens foi apagado. Digite ou fale pelo microfone abaixo para conversar.'}
                  </p>
                </div>
                <div className="pt-2">
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] bg-slate-800/90 text-amber-300 border border-[#D4AF37]/20 font-mono">
                    <span>✨ Pronto para conversar</span>
                  </span>
                </div>
              </div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-2xl rounded-2xl p-4 sm:p-5 ${
                    msg.sender === 'user'
                      ? 'bg-[#1E3E62] text-white border border-[#D4AF37]/30 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700/80 shadow-xs'
                  }`}
                >
                  <div className="font-serif text-sm sm:text-base leading-relaxed">
                    {renderFormattedMessage(msg.text, msg.sender === 'persona')}
                  </div>

                  {/* Base Bíblica Explícita */}
                  {msg.scriptures && msg.scriptures.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#D4AF37]">
                      <div className="flex items-center space-x-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Base Bíblica: {msg.scriptures.join('; ')}</span>
                      </div>

                      {/* Controles: Ouvir com voz diferenciada / Copiar */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleSpeak(msg.id, msg.text)}
                          className={`p-1.5 rounded-lg transition-colors flex items-center space-x-1 text-xs ${
                            isSpeakingId === msg.id 
                              ? 'bg-rose-500/20 text-rose-400 animate-pulse' 
                              : 'text-slate-400 hover:text-[#D4AF37] hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                          title={`Ouvir com a voz personalizada de ${selectedPersona.name} (${acousticPreset.descriptor})`}
                        >
                          {isSpeakingId === msg.id ? (
                            <>
                              <VolumeX className="w-4 h-4 text-rose-400" />
                              <span className="text-[10px] font-mono text-rose-400">Parar</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-4 h-4" />
                              <span className="text-[10px] font-mono hidden sm:inline">Ouvir</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                          title="Copiar texto"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {/* Mensagem em Digitação / Transmissão Dinâmica em Tempo Real */}
            {streamingMessageId && (
              <div className="flex flex-col items-start animate-in fade-in">
                <div className="max-w-2xl rounded-2xl p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 border border-[#D4AF37]/50 shadow-md">
                  <div className="font-serif text-sm sm:text-base leading-relaxed">
                    {renderFormattedMessage(streamedText, true)}
                    <span className="inline-block w-2 h-4 bg-[#D4AF37] ml-1.5 animate-pulse align-middle" />
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center space-x-1.5 text-amber-300">
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      <span>{selectedPersona.name} está respondendo em tempo real...</span>
                    </span>
                    <button
                      onClick={handleSkipStreaming}
                      className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-[#D4AF37] text-[10px] font-mono transition-colors"
                      title="Pular animação e exibir resposta completa"
                    >
                      Ver Completo ⏩
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isGeneratingAI && !streamingMessageId && (
              <div className="flex items-start space-x-2 my-2 animate-pulse">
                <div className="bg-[#1E3E62]/40 rounded-2xl px-4 py-3 border border-[#D4AF37]/40 flex items-center space-x-2.5 text-xs text-amber-200">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:0.4s]"></span>
                  <span className="font-serif italic text-slate-200 ml-1">
                    {selectedPersona.name} está ponderando as Escrituras e a vossa época...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {!isCleanMode && (
            <>
              {/* Sugestões de Perguntas Rápidas da Personagem */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                <span className="text-[11px] font-semibold text-slate-400 py-1">Perguntas sugeridas:</span>
                {selectedPersona.sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="text-[11px] px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors truncate max-w-[280px]"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Chips de Aconselhamento Pastoral / Vida Pessoal */}
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 scrollbar-thin">
                <span className="text-[10px] font-semibold text-[#D4AF37] uppercase tracking-wider shrink-0 flex items-center space-x-1">
                  <Compass className="w-3 h-3" />
                  <span>Dilemas da Vida:</span>
                </span>
                {lifeGuidancePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(p.query)}
                    className="whitespace-nowrap text-[10px] px-2.5 py-0.5 rounded-lg bg-amber-500/5 hover:bg-amber-500/15 border border-[#D4AF37]/30 text-slate-700 dark:text-slate-300 hover:text-[#D4AF37] transition-all"
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Barra Dinâmica de 3 Níveis de Velocidade de Resposta & Fala */}
              <div className="flex items-center justify-between px-1 text-xs">
                <div className="flex items-center space-x-1.5 text-[11px] text-slate-400">
                  <Sliders className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="font-medium hidden sm:inline">Velocidade da Resposta:</span>
                </div>
                <div className="flex items-center space-x-1 bg-slate-200/60 dark:bg-slate-800/80 p-0.5 rounded-xl border border-slate-300 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => {
                      personaAIService.updateConfig({ speedLevel: 'slow' });
                      setAiConfig(personaAIService.getConfig());
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all flex items-center space-x-1 ${
                      aiConfig.speedLevel === 'slow'
                        ? 'bg-[#1E3E62] text-[#D4AF37] shadow-xs ring-1 ring-[#D4AF37]/50 font-bold'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    title="Ritmo Solene & Contemplativo (Pausado / Meditativo - 0.85x de fala)"
                  >
                    <span>🐢</span>
                    <span>Solene</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      personaAIService.updateConfig({ speedLevel: 'normal' });
                      setAiConfig(personaAIService.getConfig());
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all flex items-center space-x-1 ${
                      aiConfig.speedLevel === 'normal'
                        ? 'bg-[#1E3E62] text-[#D4AF37] shadow-xs ring-1 ring-[#D4AF37]/50 font-bold'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    title="Ritmo Natural Humano (1.0x de fala)"
                  >
                    <span>⚡</span>
                    <span>Natural</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      personaAIService.updateConfig({ speedLevel: 'fast' });
                      setAiConfig(personaAIService.getConfig());
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all flex items-center space-x-1 ${
                      aiConfig.speedLevel === 'fast'
                        ? 'bg-[#1E3E62] text-[#D4AF37] shadow-xs ring-1 ring-[#D4AF37]/50 font-bold'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    title="Ritmo Ultrarrápido Instantâneo (1.22x de fala)"
                  >
                    <span>🚀</span>
                    <span>Rápido</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Alerta / Status Flutuante do Microfone */}
          {micNotice && (
            <div className="flex items-center justify-between text-xs px-3.5 py-2 rounded-xl bg-amber-500/15 border border-[#D4AF37]/60 text-amber-200 animate-in fade-in">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span>{micNotice}</span>
              </div>
              {isListening && (
                <button
                  type="button"
                  onClick={handleToggleMic}
                  className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 font-medium text-[10px]"
                >
                  Concluir Fala
                </button>
              )}
            </div>
          )}

          {/* Campo de Entrada de Mensagem com Microfone */}
          <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/80 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 focus-within:border-[#D4AF37] transition-colors">
            {/* Botão de Microfone / Gravação por Voz */}
            <button
              type="button"
              onClick={handleToggleMic}
              className={`p-2.5 rounded-xl transition-all border flex items-center justify-center shrink-0 ${
                isListening
                  ? 'bg-rose-600 text-white border-rose-400 animate-pulse ring-2 ring-rose-400/50 shadow-md shadow-rose-900/30'
                  : 'bg-slate-200/70 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 border-transparent'
              }`}
              title={isListening ? 'Parar gravação do microfone' : 'Falar pelo microfone (Reconhecimento de Voz)'}
            >
              {isListening ? (
                <MicOff className="w-4 h-4 text-white animate-bounce" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </button>

            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={
                isListening
                  ? `🎙️ Ouvindo a sua voz... Fale com ${selectedPersona.name} agora...`
                  : `Pergunta ou aconselha-te com ${selectedPersona.name} (ou fala pelo microfone)...`
              }
              className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputQuery.trim()}
              className="p-2.5 rounded-xl bg-[#1E3E62] text-[#D4AF37] hover:bg-[#1E3E62]/80 disabled:opacity-40 transition-all border border-[#D4AF37]/40 shadow-sm shrink-0"
              title="Enviar pergunta"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
