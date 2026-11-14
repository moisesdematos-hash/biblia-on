// src/services/readerCounterService.ts

export interface ReaderStats {
  onlineNow: number;
  totalReaders: number;
  todayReaders: number;
  countriesCount: number;
  isLive: boolean;
  lastUpdated: number;
}

interface ActiveSessionEntry {
  id: string;
  lastPing: number;
}

class ReaderCounterService {
  private statsKey = 'biblia_on_reader_stats_v2';
  private visitDateKey = 'biblia_on_last_visit_day_v2';
  private sessionsKey = 'biblia_on_online_sessions_v2';
  private tabId: string;
  private channel: BroadcastChannel | null = null;
  private heartbeatInterval: any = null;
  private listeners: ((stats: ReaderStats) => void)[] = [];

  constructor() {
    this.tabId = typeof window !== 'undefined' 
      ? `tab_${Date.now()}_${Math.random().toString(36).substring(2, 9)}` 
      : 'server_tab';

    if (typeof window !== 'undefined') {
      this.initPresenceTracking();
    }
  }

  /**
   * Inicializa o rastreamento em tempo real de pessoas online
   */
  private initPresenceTracking() {
    // 1. Limpa rastros de versões anteriores com dados artificiais
    try {
      localStorage.removeItem('biblia_on_reader_stats_v1');
      localStorage.removeItem('biblia_on_last_visit_day');
    } catch {}

    // 2. Configura canal BroadcastChannel para sincronização instantânea entre abas
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        this.channel = new BroadcastChannel('biblia_on_presence_channel');
        this.channel.onmessage = (event) => {
          if (event.data?.type === 'HEARTBEAT' || event.data?.type === 'LEAVE') {
            this.refreshPresence();
          }
        };
      } catch {}
    }

    // 3. Ouve alterações de localStorage para sincronizar outras abas/janelas
    window.addEventListener('storage', (e) => {
      if (e.key === this.sessionsKey || e.key === this.statsKey) {
        this.refreshPresence();
      }
    });

    // 4. Regista presença inicial e inicia batimento cardíaco (heartbeat)
    this.registerHeartbeat();
    this.recordSessionVisit();

    this.heartbeatInterval = setInterval(() => {
      this.registerHeartbeat();
    }, 5000);

    // 5. Ao fechar a aba/aplicação, remove a sessão imediatamente
    const handleLeave = () => {
      this.unregisterSession();
      if (this.channel) {
        try {
          this.channel.postMessage({ type: 'LEAVE', tabId: this.tabId });
        } catch {}
      }
    };

    window.addEventListener('beforeunload', handleLeave);
    window.addEventListener('pagehide', handleLeave);
  }

  /**
   * Regista o ping ativo da aba atual e limpa sessões inativas (> 15 segundos)
   */
  private registerHeartbeat() {
    if (typeof window === 'undefined') return;

    try {
      const raw = localStorage.getItem(this.sessionsKey);
      let sessions: ActiveSessionEntry[] = raw ? JSON.parse(raw) : [];

      const now = Date.now();
      // Remove sessões que não respondem há mais de 15 segundos
      sessions = sessions.filter(s => s && s.id && (now - s.lastPing < 15000) && s.id !== this.tabId);

      // Adiciona/atualiza a aba atual
      sessions.push({ id: this.tabId, lastPing: now });

      localStorage.setItem(this.sessionsKey, JSON.stringify(sessions));

      if (this.channel) {
        this.channel.postMessage({ type: 'HEARTBEAT', tabId: this.tabId, count: sessions.length });
      }

      this.refreshPresence(sessions.length);
    } catch {
      // Ignora erro
    }
  }

  /**
   * Remove a aba da lista de presença ao fechar
   */
  private unregisterSession() {
    if (typeof window === 'undefined') return;

    try {
      const raw = localStorage.getItem(this.sessionsKey);
      if (raw) {
        let sessions: ActiveSessionEntry[] = JSON.parse(raw);
        sessions = sessions.filter(s => s && s.id !== this.tabId);
        localStorage.setItem(this.sessionsKey, JSON.stringify(sessions));
      }
    } catch {}
  }

  /**
   * Atualiza a contagem de pessoas online e notifica os ouvintes
   */
  private refreshPresence(explicitCount?: number) {
    if (typeof window === 'undefined') return;

    let onlineCount = explicitCount;
    if (typeof onlineCount !== 'number') {
      try {
        const raw = localStorage.getItem(this.sessionsKey);
        const sessions: ActiveSessionEntry[] = raw ? JSON.parse(raw) : [];
        const now = Date.now();
        onlineCount = sessions.filter(s => s && (now - s.lastPing < 15000)).length;
      } catch {
        onlineCount = 1;
      }
    }

    // Pelo menos 1 se esta aba estiver aberta e ativa
    onlineCount = Math.max(onlineCount, 1);

    const stats = this.getStats();
    if (stats.onlineNow !== onlineCount) {
      const updated = {
        ...stats,
        onlineNow: onlineCount,
        lastUpdated: Date.now()
      };
      this.saveStats(updated);
      this.notify(updated);
    }
  }

  /**
   * Obtém as estatísticas agregadas (começando rigorosamente do 0)
   */
  public getStats(): ReaderStats {
    if (typeof window === 'undefined') {
      return {
        onlineNow: 0,
        totalReaders: 0,
        todayReaders: 0,
        countriesCount: 1,
        isLive: true,
        lastUpdated: Date.now()
      };
    }

    try {
      const stored = localStorage.getItem(this.statsKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          onlineNow: typeof parsed.onlineNow === 'number' ? parsed.onlineNow : 1,
          totalReaders: parsed.totalReaders || 0,
          todayReaders: parsed.todayReaders || 0,
          countriesCount: parsed.countriesCount || 1,
          isLive: true,
          lastUpdated: parsed.lastUpdated || Date.now()
        };
      }
    } catch {}

    const initialStats: ReaderStats = {
      onlineNow: 1,
      totalReaders: 0,
      todayReaders: 0,
      countriesCount: 1,
      isLive: true,
      lastUpdated: Date.now()
    };
    this.saveStats(initialStats);
    return initialStats;
  }

  /**
   * Regista a visita única do leitor (apenas 1 vez por dia por dispositivo)
   */
  public recordSessionVisit(): ReaderStats {
    if (typeof window === 'undefined') return this.getStats();

    const todayStr = new Date().toISOString().split('T')[0];
    const lastVisitDay = localStorage.getItem(this.visitDateKey);

    const stats = this.getStats();

    // Se já visitou hoje, não incrementa o total acumulado
    if (lastVisitDay === todayStr) {
      return stats;
    }

    localStorage.setItem(this.visitDateKey, todayStr);

    const updatedStats: ReaderStats = {
      ...stats,
      totalReaders: stats.totalReaders + 1,
      todayReaders: stats.todayReaders + 1,
      lastUpdated: Date.now()
    };

    this.saveStats(updatedStats);
    this.notify(updatedStats);

    return updatedStats;
  }

  private saveStats(stats: ReaderStats) {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.statsKey, JSON.stringify(stats));
      } catch {}
    }
  }

  public subscribe(listener: (stats: ReaderStats) => void): () => void {
    this.listeners.push(listener);
    listener(this.getStats());
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify(stats: ReaderStats) {
    this.listeners.forEach(fn => {
      try {
        fn(stats);
      } catch {}
    });
  }
}

export const readerCounterService = new ReaderCounterService();
