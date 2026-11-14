// src/services/toolExpertService.ts
import { aiModelLifecycleService } from './aiModelLifecycleService';
import { personaAIService } from './personaAIService';
import type { ActiveTab } from '../components/layout/Navbar';

export interface ToolAction {
  label: string;
  tab: ActiveTab;
  context?: any;
  description?: string;
  icon?: string;
}

export interface ToolExpertResponse {
  answer: string;
  actions: ToolAction[];
  suggestedFollowUps?: string[];
  source: 'offline_knowledge' | 'groq' | 'gemini';
}

interface FeatureTopic {
  keywords: string[];
  title: string;
  answer: string;
  actions: ToolAction[];
  suggestedFollowUps: string[];
}

const FEATURE_KNOWLEDGE_BASE: FeatureTopic[] = [
  // 1. PERSONAGENS BÍBLICOS & LETREIRO TV
  {
    keywords: ['personagem', 'personagens', 'conversar', 'mentor', 'jeová', 'jesus', 'davi', 'moisés', 'abraão', 'letreiro', 'tv', 'ticker', 'voz', 'falar', 'avatar'],
    title: 'Diálogo com Personagens Bíblicos & Letreiro TV',
    answer: `O módulo de **Diálogo com Personagens Bíblicos** permite conversar com mais de 94 figuras sagradas (incluindo Jeová Deus, Jesus Cristo, Adão, Moisés, Davi, Salomão, os 12 Apóstolos, Profetas e Mulheres Fiéis).\n\n**Recursos Principais:**\n• **Letreiro de Televisão (TV Ticker):** Corre continuamente estilo rodapé de telejornal. Pausa automaticamente ao passar o rato (hover) para facilitar o clique.\n• **3 Velocidades:** Mínima da TV (0.4x), Padrão de TV (1.0x) e Dinâmico (1.8x), além do botão de pausar e alternar para grade estática.\n• **Superpoderes da IA:** Respostas sensoriais em 1ª pessoa, estrita fidelidade à Tradução do Novo Mundo (TNM) e polimorfismo.\n• **Voz Personalizada & Microfone:** Sintetizador de voz adaptado ao arquétipo e botão de microfone para falar por voz.`,
    actions: [
      { label: 'Conversar com Personagens', tab: 'personas', icon: 'MessageSquare', description: 'Abrir o chat de diálogos e o letreiro de TV' },
      { label: 'Ver Enciclopédia Biográfica', tab: 'characters', icon: 'Users', description: 'Consultar fichas históricas de todos os personagens' }
    ],
    suggestedFollowUps: [
      'Como funciona a pausa ao passar o rato no letreiro?',
      'Como ativar a voz das personagens bíblicas?',
      'Quais personagens estão disponíveis para conversar?'
    ]
  },

  // 2. LETREIRO DE TELEVISÃO
  {
    keywords: ['letreiro', 'televisão', 'correr', 'ticker', 'tv', 'rodapé', 'pausar', 'velocidade'],
    title: 'Letreiro Contínuo de TV das Personagens',
    answer: `O letreiro superior na área de personagens é um **Letreiro Contínuo de Notícias de TV (Broadcast Ticker)**:\n\n• **Movimento Contínuo:** Desloca-se da direita para a esquerda em loop infinito.\n• **Pausa Inteligente (Hover):** Ao aproximar o ponteiro do rato de qualquer botão, ele congela imediatamente para que você clique sem precisar persegui-lo.\n• **Botão Pausar/Rodar:** Permite fixar o letreiro a qualquer instante.\n• **Modo Grade / Ver Todos:** Alterna entre a esteira em movimento e a lista estática horizontal.\n• **Todas as personagens são 100% clicáveis**, abrindo a conversa na hora.`,
    actions: [
      { label: 'Ir para o Letreiro de TV', tab: 'personas', icon: 'Tv', description: 'Experimentar o letreiro contínuo de personagens' }
    ],
    suggestedFollowUps: [
      'Como ajustar a velocidade do letreiro?',
      'Quantas personagens aparecem no letreiro?'
    ]
  },

  // 3. IA, GEMINI, GROQ & AUTO-ATUALIZAÇÃO
  {
    keywords: ['ia', 'ai', 'chave', 'api', 'gemini', 'groq', 'byok', 'descontinuada', 'descontinuado', 'atualizar', 'modelo', 'llama', 'grátis', 'inteligência artificial'],
    title: 'Configuração de IA (BYOK) e Auto-Atualização de Modelos',
    answer: `O BIBLIA ON opera no modelo **BYOK (Bring Your Own Key)**, sendo 100% seguro, gratuito e open-source:\n\n• **Google Gemini:** Aceita chaves gratuitas do Google AI Studio.\n• **Groq Cloud:** Inferência ultra-rápida (< 1s) com o modelo Llama 3.3 70B da Meta.\n• **Mecanismo de Auto-Atualização em Descontinuação:** Quando o Google ou a Groq aposentam um modelo (erro 404/410/decommissioned), o BIBLIA ON detecta automaticamente a deprecação, promove para o modelo sucessor imediato, grava a preferência no navegador e reexecuta a sua pergunta sem falhas nem telas de erro!\n• **Privacidade Total:** A sua chave fica guardada exclusivamente no seu navegador (localStorage) ou no arquivo local .env.`,
    actions: [
      { label: 'Configurar Chaves de IA', tab: 'personas', icon: 'Key', description: 'Abrir modal de IA para gerir chaves Gemini e Groq' },
      { label: 'Ver Métricas no Painel Admin', tab: 'admin', icon: 'ShieldCheck', description: 'Inspecionar status da IA e modelos ativos' }
    ],
    suggestedFollowUps: [
      'Como obter uma chave gratuita da Groq?',
      'Como obter uma chave gratuita do Google AI Studio?',
      'O que acontece quando um modelo é descontinuado?'
    ]
  },

  // 4. MICROFONE E VOZ
  {
    keywords: ['microfone', 'mic', 'falar', 'ouvir', 'áudio', 'som', 'voz', 'fala', 'reconhecimento', 'escutar'],
    title: 'Microfone e Síntese de Voz (Text-to-Speech)',
    answer: `O BIBLIA ON dispõe de suporte completo a voz em português:\n\n• **Microfone (Speech Recognition):** Presente no Diálogo com Personagens e no Chat Investigador. Clique no ícone do microfone, autorize o navegador e faça a sua pergunta falando naturalmente. O texto é transcrito em tempo real.\n• **Leitura em Voz Alta (Speech Synthesis):** Clique no botão 'Ouvir' nas respostas para escutar a resposta com modulação acústica personalizada para cada arquétipo bíblico (Solene, Profético, Patriarcal, etc.).\n• **Controlo de Velocidade:** Pode selecionar a velocidade de leitura e da digitação animada entre Solene, Natural e Rápido.`,
    actions: [
      { label: 'Testar Microfone com Personagens', tab: 'personas', icon: 'Mic', description: 'Fazer uma pergunta por voz a Jeová ou Jesus' },
      { label: 'Ir para o Motor Investigador', tab: 'chat', icon: 'Brain', description: 'Perguntar por voz sobre qualquer texto bíblico' }
    ],
    suggestedFollowUps: [
      'Qual navegador tem melhor suporte a microfone?',
      'Posso parar a voz no meio da leitura?'
    ]
  },

  // 5. LEITOR BÍBLICO E EXPLORADOR
  {
    keywords: ['ler', 'leitor', 'bíblia', 'capítulo', 'versículo', 'livro', 'gênesis', 'apocalipse', 'tnm', 'explorador', 'fonte'],
    title: 'Leitor Bíblico & Explorador Canônico',
    answer: `O **Leitor Bíblico** oferece acesso integral aos **66 livros canônicos das Escrituras Sagradas** com base na Tradução do Novo Mundo (TNM):\n\n• **Navegação Dinâmica:** Seletor intuitivo entre Escrituras Hebraico-Aramaicas (Antigo Testamento) e Escrituras Gregas Cristãs (Novo Testamento).\n• **Estudo Versículo a Versículo:** Notas de rodapé explicativas, referências cruzadas e marcadores pessoais.\n• **Ajuste de Tipografia:** Alterne o tamanho do texto entre Pequeno, Normal e Grande para conforto visual.\n• **Totalmente Offline:** O texto bíblico canônico completo fica disponível no seu dispositivo mesmo sem sinal de rede.`,
    actions: [
      { label: 'Abrir Leitor Bíblico', tab: 'explorer', icon: 'BookOpen', description: 'Ler e estudar os 66 livros da Bíblia' }
    ],
    suggestedFollowUps: [
      'Como mudar o tamanho da letra?',
      'Como marcar um versículo favorito?'
    ]
  },

  // 6. MOTOR DE INVESTIGAÇÃO BÍBLICA (AIChat)
  {
    keywords: ['pesquisa', 'investigação', 'motor', 'pergunta', 'responder', 'doutrina', 'perguntar', 'dúvida', 'trindade', 'alma', 'inferno', 'morte'],
    title: 'Motor de Investigação Bíblica sobre as Escrituras',
    answer: `O **Motor de Investigação Bíblica** foi construído para responder com exatidão a qualquer dúvida das Escrituras:\n\n• **Guardrails TNM Rígidos:** Respostas alinhadas aos fatos bíblicos — Jeová é o Deus Supremo; Jesus Cristo é o Filho Primogênito e Salvador; a alma humana é mortal (Ezequiel 18:4); a morte é um estado inconsciente semelhante ao sono (Eclesiastes 9:5,10); a esperança para os justos é a ressurreição no Paraíso na Terra; e Jesus morreu numa estaca de execução/madeiro.\n• **Citações Bíblicas Precisas:** Toda resposta apresenta os livros, capítulos e versículos de apoio.\n• **Filtro de Dúvidas Complexas:** Tópicos sobre o Reino de Deus, sinais dos últimos dias, profecias de Daniel e Apocalipse.`,
    actions: [
      { label: 'Abrir Motor de Investigação', tab: 'chat', icon: 'Brain', description: 'Fazer qualquer pergunta sobre o texto sagrado' }
    ],
    suggestedFollowUps: [
      'O que a Bíblia ensina sobre a condição dos mortos?',
      'Qual a diferença entre a alma e o espírito segundo a Bíblia?'
    ]
  },

  // 7. O CODEX VIVO & HIPERGRAFO DA HARMONIA
  {
    keywords: ['codex', 'vivo', 'hipergrafo', 'harmonia', 'manuscrito', 'manuscritos', 'mar morto', 'alepo', 'leningrado', 'sinaítico', 'vaticano', 'chave de ouro'],
    title: 'O Codex Vivo & Hipergrafo da Harmonia Bíblica',
    answer: `O **Codex Vivo** é a joia de erudição bíblica da plataforma:\n\n• **Hipergrafo da Harmonia:** Mapeamento interativo de mais de 63.000 conexões textuais entre o Antigo e o Novo Testamento.\n• **Manuscritos Antigos em Alta Resolução:** Exame de códices reais, incluindo o Grande Rolo de Isaías do Mar Morto (1QIsaᵃ), o Códice de Alepo (século X), o Códice de Leningrado (1008 d.C.), o Códice Vaticano (século IV) e o Códice Sinaítico.\n• **Fidelidade Textual:** Demonstra como o texto sagrado foi preservado milagrosamente sem adulterações fundamentais através dos séculos.`,
    actions: [
      { label: 'Abrir O Codex Vivo 👑', tab: 'codex', icon: 'Sparkles', description: 'Explorar manuscritos antigos e o hipergrafo' }
    ],
    suggestedFollowUps: [
      'Quais manuscritos antigos estão catalogados?',
      'O que provam os Rolos do Mar Morto sobre a Bíblia?'
    ]
  },

  // 8. PAINEL ADMIN & MÉTRICAS
  {
    keywords: ['admin', 'painel', 'métrica', 'métricas', 'auditor', 'auditoria', 'logs', 'desempenho', 'administrador', 'pwa status'],
    title: 'Painel Admin & Auditoria em Tempo Real',
    answer: `O **Painel Admin** reúne a telemetria, diagnóstico e segurança da aplicação:\n\n• **Métricas em Tempo Real:** Total de consultas bíblicas, sessões com personagens, tempo médio de resposta e taxa de acerto doutrinário.\n• **Auditor de Conformidade:** Verifica continuamente os guardrails doutrinais (TNM, Cânon de 66 livros e pureza teológica).\n• **Monitorização de PWA e Cache:** Status dos registros do Service Worker, volumes do IndexedDB e integridade do cache offline.\n• **Logs do Sistema:** Registro operacional de transições de modelos, chamadas de API e auto-recuperação.`,
    actions: [
      { label: 'Abrir Painel Admin Completo', tab: 'admin', icon: 'ShieldCheck', description: 'Consultar métricas em tempo real e auditoria' }
    ],
    suggestedFollowUps: [
      'O que mede o Auditor de Conformidade Doutrinária?',
      'Como ver o histórico de atualizações de IA?'
    ]
  },

  // 9. PWA E FUNCIONAMENTO OFFLINE
  {
    keywords: ['offline', 'pwa', 'instalar', 'celular', 'telemóvel', 'computador', 'sem internet', 'rede', 'service worker', 'cache', 'indexeddb'],
    title: 'Sistema PWA e Funcionamento 100% Offline',
    answer: `O BIBLIA ON foi desenhado com arquitetura **Offline-First** via Progressive Web App (PWA):\n\n• **Instalação Direta:** Pode ser instalado no telemóvel (Android / iOS) ou no computador (Chrome / Edge) como um aplicativo nativo.\n• **Sem Dependência de Internet:** Uma vez aberto, os 66 livros da Bíblia, as 94 personagens, a enciclopédia, os mapas, o dicionário e o motor de respostas locais continuam 100% funcionais no meio do mar, no deserto ou em modo de voo.\n• **IndexedDB Seguro:** Todo o histórico de mensagens, notas e preferências é armazenado localmente no dispositivo do usuário com total privacidade.`,
    actions: [
      { label: 'Ver Status Offline no Admin', tab: 'admin', icon: 'Download', description: 'Conferir status do Service Worker e do cache' }
    ],
    suggestedFollowUps: [
      'Como instalar o BIBLIA ON no meu telemóvel?',
      'O que funciona se eu estiver sem internet?'
    ]
  },

  // 10. RECURSOS ADICIONAIS: ÁRVORE GENEALÓGICA, MAPAS, CRONOLOGIA, LÉXICO
  {
    keywords: ['recursos', 'genealogia', 'árvore', 'léxico', 'grego', 'hebraico', 'mapas', 'atlas', 'cronologia', 'profecias', 'tutor', 'quiz', 'comparador'],
    title: 'Recursos Avançados e Ferramentas Auxiliares',
    answer: `O BIBLIA ON dispõe de um ecossistema completo de ferramentas auxiliares:\n\n• **Árvore Genealógica:** Linhagem messiânica de Adão a Jesus Cristo.\n• **Léxico Original:** Definições em Hebraico, Aramaico e Grego Koiné com números Strong.\n• **Atlas & Linha do Tempo:** Mapas dos tempos bíblicos, rota do Êxodo e cronologia histórica de 4026 a.C. até 100 d.C.\n• **Comparador de Traduções:** Compare versículos lado a lado.\n• **Laboratório de Profecias:** Mapeamento de profecias messiânicas e cumprimentos históricos.\n• **Professor Adaptativo & Tutor:** Ensino pedagógico em 3 níveis e exercícios adaptativos.\n• **Quizzes:** Testes bíblicos gamificados para autoavaliação.`,
    actions: [
      { label: 'Ver Árvore Genealógica', tab: 'genealogy', icon: 'GitBranch' },
      { label: 'Abrir Atlas Bíblico', tab: 'atlas', icon: 'MapPin' },
      { label: 'Consultar Léxico Grego/Hebraico', tab: 'lexicon', icon: 'Languages' },
      { label: 'Comparar Traduções', tab: 'compare', icon: 'Columns' }
    ],
    suggestedFollowUps: [
      'Como usar a Árvore Genealógica?',
      'Como comparar duas versões bíblicas?'
    ]
  }
];

class ToolExpertService {
  /**
   * Responde dúvidas sobre as funcionalidades da ferramenta
   */
  public async answerQuestion(query: string): Promise<ToolExpertResponse> {
    const cleanQuery = query.toLowerCase().trim();

    // 1. Tenta resposta especializada com base de conhecimento local instantânea
    const match = this.findBestLocalMatch(cleanQuery);

    // Se estiver online, prioriza resposta inteligente via IA Online (Groq / Gemini)
    const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

    if (isOnline) {
      try {
        const onlineResult = await this.callOnlineToolExpert(query, match ? match.answer : '');
        if (onlineResult && onlineResult.answer) {
          return {
            answer: onlineResult.answer,
            actions: match ? match.actions : this.getDefaultActions(),
            suggestedFollowUps: match ? match.suggestedFollowUps : this.getDefaultFollowUps(),
            source: onlineResult.source
          };
        }
      } catch (err) {
        console.warn('[ToolExpert] Fallback para base local após erro de rede:', err);
      }
    }

    if (match) {
      return {
        answer: match.answer,
        actions: match.actions,
        suggestedFollowUps: match.suggestedFollowUps,
        source: 'offline_knowledge'
      };
    }

    // Resposta padrão caso nenhuma palavra-chave case e IA offline
    return {
      answer: `Sou o **Guia Especialista do BIBLIA ON**. Posso ajudar-te a dominar e tirar o máximo partido de cada funcionalidade da nossa plataforma!\n\n**Áreas que posso explicar detalhadamente:**\n• **Diálogo com Personagens:** Como falar com 94 figuras bíblicas, regular as 3 velocidades e usar o letreiro contínuo de TV;\n• **Inteligência Artificial (BYOK):** Como adicionar chaves gratuitas do Groq e Gemini e como opera a auto-atualização de modelos descontinuados;\n• **Voz & Microfone:** Como ditar perguntas por voz e ouvir respostas com modulação personalizada;\n• **Leitor Bíblico & Codex Vivo:** Navegação nos 66 livros da TNM e exame de manuscritos antigos do Mar Morto;\n• **Painel Admin & PWA:** Funcionamento 100% offline, instalação e auditoria de conformidade.\n\nQual destas áreas gostarias de explorar agora?`,
      actions: this.getDefaultActions(),
      suggestedFollowUps: [
        'Como conversar com personagens bíblicos?',
        'Como funciona a auto-atualização de IA descontinuada?',
        'Como instalar e usar o app sem internet?',
        'Onde posso ver o Painel Admin com todas as métricas?'
      ],
      source: 'offline_knowledge'
    };
  }

  private findBestLocalMatch(query: string): FeatureTopic | null {
    let bestTopic: FeatureTopic | null = null;
    let maxScore = 0;

    for (const topic of FEATURE_KNOWLEDGE_BASE) {
      let score = 0;
      for (const kw of topic.keywords) {
        if (query.includes(kw)) {
          score += kw.length > 4 ? 3 : 1;
        }
      }

      if (score > maxScore) {
        maxScore = score;
        bestTopic = topic;
      }
    }

    return maxScore >= 2 ? bestTopic : null;
  }

  private async callOnlineToolExpert(userPrompt: string, baseContext: string): Promise<{ answer: string; source: 'groq' | 'gemini' } | null> {
    const groqKey = personaAIService.getEffectiveApiKey('groq');
    const geminiKey = personaAIService.getEffectiveApiKey('gemini');

    const systemPrompt = `Você é o "Especialista do BIBLIA ON", um assistente erudito, solícito, inteligente e amigável da plataforma aberta BIBLIA ON.
Responda diretamente à pergunta ou comentário do usuário:
"${userPrompt}"

DIRETRIZES DE RESPOSTA:
1. Se a pergunta for sobre funcionalidades ou atalhos da ferramenta, explique detalhadamente onde encontrar e como usar no BIBLIA ON.
2. Se a pergunta for lúdica, reflexiva ou criativa (como "que poderes gostaria de ter?"), responda em primeira pessoa com bom humor, sabedoria e inteligência, relacionando criativamente com os grandes "superpoderes" da plataforma BIBLIA ON:
   - O poder de viajar no tempo até 4026 a.C. examinando manuscritos reais dos Rolos do Mar Morto no Codex Vivo;
   - O poder de dialogar de perto com 94 testemunhas fiéis da história bíblica de Adão ao apóstolo João;
   - O superpoder da inferência e sabedoria instantânea com a IA Groq Cloud (Llama 3.3 70B);
   - E o maior poder de todos: a fidelidade pura e inabalável à Palavra de Deus sob a Tradução do Novo Mundo (TNM).
3. Mantenha um tom caloroso, educado e estruturado (use negrito e listas quando apropriado).
${baseContext ? `\nContexto auxiliar da ferramenta:\n${baseContext}` : ''}`;

    // 1. Prioridade máxima: Groq Cloud (Llama 3.3 70B)
    if (groqKey && groqKey.startsWith('gsk_')) {
      try {
        let activeModel = aiModelLifecycleService.getActiveGroqModel();
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${groqKey}`
          },
          signal: AbortSignal.timeout(15000),
          body: JSON.stringify({
            model: activeModel,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt }
            ],
            temperature: 0.7,
            max_tokens: 1800
          })
        });

        if (res.ok) {
          const data = await res.json();
          const content = data.choices?.[0]?.message?.content;
          if (content) {
            return { answer: content, source: 'groq' };
          }
        } else {
          const errText = await res.text();
          console.warn('[ToolExpert] Groq status:', res.status, errText);
          if (aiModelLifecycleService.isDeprecationError(res.status, errText)) {
            const upgraded = await aiModelLifecycleService.upgradeGroqModel(activeModel, 'Modelo Groq descontinuado', groqKey);
            if (upgraded) {
              const retryRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${groqKey}`
                },
                body: JSON.stringify({
                  model: upgraded,
                  messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                  ],
                  temperature: 0.7,
                  max_tokens: 1800
                })
              });
              if (retryRes.ok) {
                const retryData = await retryRes.json();
                const retryContent = retryData.choices?.[0]?.message?.content;
                if (retryContent) return { answer: retryContent, source: 'groq' };
              }
            }
          }
        }
      } catch (err) {
        console.warn('[ToolExpert] Erro na conexão com Groq:', err);
      }
    }

    // 2. Fallback: Google Gemini
    if (geminiKey && geminiKey.length > 10) {
      try {
        let activeModel = aiModelLifecycleService.getActiveGeminiModel();
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${activeModel}:generateContent?key=${geminiKey}`;
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemPrompt}\n\nPergunta do usuário: ${userPrompt}` }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 800
            }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (content) return { answer: content, source: 'gemini' };
        } else {
          console.warn('[ToolExpert] Gemini status:', res.status);
        }
      } catch (err) {
        console.warn('[ToolExpert] Erro na conexão com Gemini:', err);
      }
    }

    return null;
  }

  private getDefaultActions(): ToolAction[] {
    return [
      { label: 'Conversar com Personagens', tab: 'personas', icon: 'MessageSquare' },
      { label: 'O Codex Vivo 👑', tab: 'codex', icon: 'Sparkles' },
      { label: 'Leitor Bíblico', tab: 'explorer', icon: 'BookOpen' },
      { label: 'Painel Admin', tab: 'admin', icon: 'ShieldCheck' }
    ];
  }

  private getDefaultFollowUps(): string[] {
    return [
      'Como funciona o letreiro de TV das personagens?',
      'Como funciona a auto-atualização de IA descontinuada?',
      'Como instalar e usar o app sem internet?',
      'Como usar o microfone para pesquisar?'
    ];
  }
}

export const toolExpertService = new ToolExpertService();
