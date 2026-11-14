// src/services/readerCounterService.ts

export interface ReaderStats {
  totalReaders: number;
  todayReaders: number;
  countriesCount: number;
  isLive: boolean;
  lastUpdated: number;
}

class ReaderCounterService {
  private storageKey = 'biblia_on_reader_stats_v1';
  private visitDateKey = 'biblia_on_last_visit_day';
  private baselineTotal = 0; // Zerado conforme solicitado
  private baselineToday = 0;
  private listeners: ((stats: ReaderStats) => void)[] = [];

  constructor() {
    this.recordSessionVisit();
  }

  /**
   * Obtém as estatísticas agregadas de leitores no mundo
   */
  public getStats(): ReaderStats {
    if (typeof window === 'undefined') {
      return {
        totalReaders: 0,
        todayReaders: 0,
        countriesCount: 1,
        isLive: true,
        lastUpdated: Date.now()
      };
    }

    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Se tinha a baseline artificial de 14320, limpa para iniciar do zero real
        if (parsed.totalReaders >= 14320) {
          localStorage.removeItem(this.storageKey);
        } else {
          return {
            totalReaders: parsed.totalReaders || 0,
            todayReaders: parsed.todayReaders || 0,
            countriesCount: parsed.countriesCount || 1,
            isLive: true,
            lastUpdated: parsed.lastUpdated || Date.now()
          };
        }
      }
    } catch (e) {
      // Ignorar erros de parse do localStorage
    }

    const initialStats: ReaderStats = {
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
   * Regista a visita anónima do leitor (apenas 1 vez por dia por dispositivo)
   */
  public recordSessionVisit(): ReaderStats {
    if (typeof window === 'undefined') return this.getStats();

    const todayStr = new Date().toISOString().split('T')[0];
    const lastVisitDay = localStorage.getItem(this.visitDateKey);

    const stats = this.getStats();

    // Se já visitou hoje, não incrementa duplamente
    if (lastVisitDay === todayStr) {
      return stats;
    }

    // Primeiro acesso do dia para este dispositivo
    localStorage.setItem(this.visitDateKey, todayStr);

    const updatedStats: ReaderStats = {
      ...stats,
      totalReaders: stats.totalReaders + 1,
      todayReaders: stats.todayReaders + 1,
      lastUpdated: Date.now()
    };

    this.saveStats(updatedStats);
    this.notify(updatedStats);

    // Tentativa assíncrona não-bloqueante de sincronização caso exista endpoint configurado
    this.syncRemoteIfConfigured();

    return updatedStats;
  }

  /**
   * Sincronização externa opcional (Edge Worker ou Cloud Analytics)
   */
  private async syncRemoteIfConfigured() {
    try {
      const endpoint = (import.meta as any).env?.VITE_READER_COUNTER_URL;
      if (!endpoint) return;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'ping', timestamp: Date.now() })
      });

      if (res.ok) {
        const data = await res.json();
        if (typeof data.totalReaders === 'number') {
          const current = this.getStats();
          const synced: ReaderStats = {
            ...current,
            totalReaders: Math.max(data.totalReaders, current.totalReaders),
            todayReaders: typeof data.todayReaders === 'number' ? data.todayReaders : current.todayReaders,
            lastUpdated: Date.now()
          };
          this.saveStats(synced);
          this.notify(synced);
        }
      }
    } catch {
      // Falha silenciosa para não degradar a experiência nem bloquear o utilizador
    }
  }

  private saveStats(stats: ReaderStats) {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(stats));
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
