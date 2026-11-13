// src/services/aiModelLifecycleService.ts

export interface ModelUpgradeEvent {
  provider: 'gemini' | 'groq';
  deprecatedModel: string;
  newModel: string;
  reason: string;
  timestamp: number;
}

// 1. Escada de Sucessão para Google Gemini (do mais novo/estável ao legado)
export const GEMINI_SUCCESSION_LADDER: string[] = [
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-1.5-flash-latest',
  'gemini-2.0-flash-exp',
  'gemini-1.5-pro',
  'gemini-1.5-pro-latest',
  'gemini-pro'
];

// 2. Escada de Sucessão para Groq Cloud (Modelos ativos e testados com sucesso)
export const GROQ_SUCCESSION_LADDER: string[] = [
  'qwen/qwen3.8-27b',
  'openai/gpt-oss-120b',
  'openai/gpt-oss-20b',
  'allam-2-7b'
];

class AIModelLifecycleService {
  private activeGeminiModel: string;
  private activeGroqModel: string;
  private upgradeListeners: ((event: ModelUpgradeEvent) => void)[] = [];
  private lastNotice: ModelUpgradeEvent | null = null;

  constructor() {
    this.activeGeminiModel = typeof window !== 'undefined'
      ? (localStorage.getItem('biblia_on_gemini_active_model') || 'gemini-1.5-flash')
      : 'gemini-1.5-flash';

    let storedGroq = typeof window !== 'undefined'
      ? (localStorage.getItem('biblia_on_groq_active_model') || 'qwen/qwen3.8-27b')
      : 'qwen/qwen3.8-27b';

    // Auto-atualização: se houver o modelo descontinuado 'llama' salvo no navegador, atualiza para 'qwen/qwen3.8-27b'
    if (storedGroq.includes('llama') || !GROQ_SUCCESSION_LADDER.includes(storedGroq)) {
      storedGroq = 'qwen/qwen3.8-27b';
      if (typeof window !== 'undefined') {
        localStorage.setItem('biblia_on_groq_active_model', 'qwen/qwen3.8-27b');
        localStorage.setItem('biblia_on_groq_model', 'qwen/qwen3.8-27b');
      }
    }

    this.activeGroqModel = storedGroq;
  }

  public getActiveGeminiModel(): string {
    return this.activeGeminiModel;
  }

  public getActiveGroqModel(): string {
    return this.activeGroqModel;
  }

  public getLastNotice(): ModelUpgradeEvent | null {
    return this.lastNotice;
  }

  public onModelUpgraded(callback: (event: ModelUpgradeEvent) => void): () => void {
    this.upgradeListeners.push(callback);
    return () => {
      this.upgradeListeners = this.upgradeListeners.filter(cb => cb !== callback);
    };
  }

  private notifyUpgrade(event: ModelUpgradeEvent): void {
    this.lastNotice = event;
    if (typeof window !== 'undefined') {
      try {
        const history = JSON.parse(localStorage.getItem('biblia_on_model_upgrades') || '[]');
        history.unshift(event);
        localStorage.setItem('biblia_on_model_upgrades', JSON.stringify(history.slice(0, 20)));
      } catch (e) {
        // ignora
      }
    }
    this.upgradeListeners.forEach(cb => {
      try { cb(event); } catch (err) { console.error('Erro no listener de upgrade:', err); }
    });
  }

  /**
   * Avalia se um erro de API é indicativo de modelo descontinuado / obsoleto / não encontrado
   */
  public isDeprecationError(status: number, errorBodyText: string = ''): boolean {
    if (status === 404 || status === 410) return true;
    const lower = errorBodyText.toLowerCase();
    return (
      lower.includes('decommissioned') ||
      lower.includes('deprecated') ||
      lower.includes('no longer supported') ||
      lower.includes('not found') ||
      lower.includes('invalid model') ||
      lower.includes('has been discontinued') ||
      lower.includes('model_not_found') ||
      lower.includes('model not available')
    );
  }

  /**
   * Tenta atualizar e obter o sucessor imediato para Google Gemini
   */
  public async upgradeGeminiModel(failedModel: string, reason: string = 'Modelo descontinuado', apiKey?: string): Promise<string | null> {
    console.warn(`[AI Lifecycle] Detectada descontinuação do modelo Gemini "${failedModel}". Iniciando sucessão automática...`);

    // 1. Tenta descoberta dinâmica via API do Google se apiKey estiver disponível
    if (apiKey) {
      try {
        const discovered = await this.discoverGeminiModels(apiKey);
        if (discovered.length > 0) {
          const newest = discovered.find(m => m !== failedModel && !m.includes('vision') && !m.includes('embedding'));
          if (newest) {
            this.setGeminiModel(newest, reason, failedModel);
            return newest;
          }
        }
      } catch (err) {
        console.warn('[AI Lifecycle] Falha na descoberta remota do Gemini, usando escada de sucessão estática:', err);
      }
    }

    // 2. Fallback na Escada de Sucessão Estática
    const currentIndex = GEMINI_SUCCESSION_LADDER.indexOf(failedModel);
    let nextModel: string | undefined;

    if (currentIndex >= 0 && currentIndex < GEMINI_SUCCESSION_LADDER.length - 1) {
      nextModel = GEMINI_SUCCESSION_LADDER[currentIndex + 1];
    } else {
      nextModel = GEMINI_SUCCESSION_LADDER.find(m => m !== failedModel);
    }

    if (nextModel) {
      this.setGeminiModel(nextModel, reason, failedModel);
      return nextModel;
    }

    return null;
  }

  /**
   * Tenta atualizar e obter o sucessor imediato para Groq Cloud
   */
  public async upgradeGroqModel(failedModel: string, reason: string = 'Modelo descontinuado', apiKey?: string): Promise<string | null> {
    console.warn(`[AI Lifecycle] Detectada descontinuação do modelo Groq "${failedModel}". Iniciando sucessão automática...`);

    // 1. Tenta descoberta remota dinâmica no Groq Cloud
    if (apiKey) {
      try {
        const discovered = await this.discoverGroqModels(apiKey);
        if (discovered.length > 0) {
          const newest = discovered.find(m => m !== failedModel && !m.includes('whisper') && !m.includes('guard'));
          if (newest) {
            this.setGroqModel(newest, reason, failedModel);
            return newest;
          }
        }
      } catch (err) {
        console.warn('[AI Lifecycle] Falha na descoberta remota do Groq, usando escada de sucessão:', err);
      }
    }

    // 2. Fallback na Escada de Sucessão Estática
    const currentIndex = GROQ_SUCCESSION_LADDER.indexOf(failedModel);
    let nextModel: string | undefined;

    if (currentIndex >= 0 && currentIndex < GROQ_SUCCESSION_LADDER.length - 1) {
      nextModel = GROQ_SUCCESSION_LADDER[currentIndex + 1];
    } else {
      nextModel = GROQ_SUCCESSION_LADDER.find(m => m !== failedModel);
    }

    if (nextModel) {
      this.setGroqModel(nextModel, reason, failedModel);
      return nextModel;
    }

    return null;
  }

  private setGeminiModel(newModel: string, reason: string, oldModel: string): void {
    this.activeGeminiModel = newModel;
    if (typeof window !== 'undefined') {
      localStorage.setItem('biblia_on_gemini_active_model', newModel);
    }
    this.notifyUpgrade({
      provider: 'gemini',
      deprecatedModel: oldModel,
      newModel,
      reason,
      timestamp: Date.now()
    });
  }

  private setGroqModel(newModel: string, reason: string, oldModel: string): void {
    this.activeGroqModel = newModel;
    if (typeof window !== 'undefined') {
      localStorage.setItem('biblia_on_groq_active_model', newModel);
      localStorage.setItem('biblia_on_groq_model', newModel);
    }
    this.notifyUpgrade({
      provider: 'groq',
      deprecatedModel: oldModel,
      newModel,
      reason,
      timestamp: Date.now()
    });
  }

  /**
   * Consulta a API do Google para descobrir modelos atualmente ativos e suportados
   */
  public async discoverGeminiModels(apiKey: string): Promise<string[]> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey.trim()}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    const models: any[] = data.models || [];
    return models
      .filter((m: any) => m.supportedGenerationMethods?.includes('generateContent'))
      .map((m: any) => m.name.replace(/^models\//, ''));
  }

  /**
   * Consulta a API da Groq para descobrir modelos ativos e não descontinuados
   */
  public async discoverGroqModels(apiKey: string): Promise<string[]> {
    const url = 'https://api.groq.com/openai/v1/models';
    const res = await fetch(url, {
      headers: { 'Authorization': `Bearer ${apiKey.trim()}` }
    });
    if (!res.ok) return [];
    const data = await res.json();
    const models: any[] = data.data || [];
    return models
      .filter((m: any) => m.active !== false)
      .map((m: any) => m.id)
      .filter((id: string) => {
        const lower = id.toLowerCase();
        return (
          !lower.includes('whisper') &&
          !lower.includes('guard') &&
          !lower.includes('orpheus') &&
          !lower.includes('vision') &&
          !lower.includes('safeguard') &&
          !lower.includes('embedding')
        );
      });
  }
}

export const aiModelLifecycleService = new AIModelLifecycleService();
