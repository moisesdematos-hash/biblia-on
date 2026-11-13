// src/services/pwaService.ts
export interface StorageEstimateInfo {
  usageBytes: number;
  quotaBytes: number;
  usageMB: number;
  quotaMB: number;
  usagePercent: number;
}

export interface CacheDetails {
  name: string;
  itemCount: number;
}

export interface PWAState {
  isSupported: boolean;
  isInstallable: boolean;
  isInstalled: boolean;
  isOnline: boolean;
  displayMode: 'standalone' | 'browser' | 'twa' | 'minimal-ui';
  swState: 'unsupported' | 'registering' | 'active' | 'waiting' | 'redundant' | 'not_registered';
  updateAvailable: boolean;
  storage: StorageEstimateInfo;
  caches: CacheDetails[];
  latencyMs: number | null;
  lastSync: number;
}

class PWAService {
  private deferredPrompt: any = null;
  private listeners: Set<(state: PWAState) => void> = new Set();
  private swRegistration: ServiceWorkerRegistration | null = null;
  private state: PWAState = {
    isSupported: typeof window !== 'undefined' && 'serviceWorker' in navigator,
    isInstallable: false,
    isInstalled: false,
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    displayMode: 'browser',
    swState: 'unsupported',
    updateAvailable: false,
    storage: {
      usageBytes: 0,
      quotaBytes: 0,
      usageMB: 0,
      quotaMB: 0,
      usagePercent: 0
    },
    caches: [],
    latencyMs: null,
    lastSync: Date.now()
  };

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private async init() {
    this.checkDisplayMode();
    this.setupNetworkListeners();
    this.setupInstallPrompt();
    await this.setupServiceWorker();
    await this.refreshStorageAndCaches();
    this.measureLatency();
  }

  private checkDisplayMode() {
    if (typeof window === 'undefined') return;
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true ||
      document.referrer.includes('android-app://');

    this.state.isInstalled = isStandalone;
    this.state.displayMode = isStandalone ? 'standalone' : 'browser';
  }

  private setupNetworkListeners() {
    window.addEventListener('online', () => {
      this.state.isOnline = true;
      this.measureLatency();
      this.notifyListeners();
    });

    window.addEventListener('offline', () => {
      this.state.isOnline = false;
      this.state.latencyMs = null;
      this.notifyListeners();
    });
  }

  private setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e: any) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.state.isInstallable = true;
      this.notifyListeners();
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
      this.state.isInstallable = false;
      this.state.isInstalled = true;
      this.state.displayMode = 'standalone';
      this.notifyListeners();
    });
  }

  private async setupServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      this.state.swState = 'unsupported';
      return;
    }

    try {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg) {
        this.swRegistration = reg;
        this.evaluateRegistration(reg);

        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                this.state.updateAvailable = true;
                this.notifyListeners();
              }
            });
          }
        });
      } else {
        this.state.swState = 'not_registered';
      }
    } catch (err) {
      console.warn('Erro ao inspecionar Service Worker:', err);
      this.state.swState = 'not_registered';
    }
  }

  private evaluateRegistration(reg: ServiceWorkerRegistration) {
    if (reg.waiting) {
      this.state.swState = 'waiting';
      this.state.updateAvailable = true;
    } else if (reg.installing) {
      this.state.swState = 'registering';
    } else if (reg.active) {
      this.state.swState = 'active';
    }
    this.notifyListeners();
  }

  public async refreshStorageAndCaches() {
    // 1. Quota de armazenamento
    if (navigator.storage && navigator.storage.estimate) {
      try {
        const est = await navigator.storage.estimate();
        const usageBytes = est.usage || 0;
        const quotaBytes = est.quota || 1;
        const usageMB = Math.round((usageBytes / (1024 * 1024)) * 100) / 100;
        const quotaMB = Math.round((quotaBytes / (1024 * 1024)) * 100) / 100;
        const usagePercent = Math.min(100, Math.round((usageBytes / quotaBytes) * 10000) / 100);

        this.state.storage = {
          usageBytes,
          quotaBytes,
          usageMB,
          quotaMB,
          usagePercent
        };
      } catch (err) {
        console.warn('Erro ao estimar armazenamento:', err);
      }
    }

    // 2. Caches ativos
    if (typeof caches !== 'undefined') {
      try {
        const keys = await caches.keys();
        const details: CacheDetails[] = [];
        for (const key of keys) {
          const cache = await caches.open(key);
          const requests = await cache.keys();
          details.push({
            name: key,
            itemCount: requests.length
          });
        }
        this.state.caches = details;
      } catch (err) {
        console.warn('Erro ao inspecionar caches:', err);
      }
    }

    this.state.lastSync = Date.now();
    this.notifyListeners();
  }

  public async measureLatency(): Promise<number | null> {
    if (!navigator.onLine) {
      this.state.latencyMs = null;
      return null;
    }

    const t0 = performance.now();
    try {
      await fetch('/logo.svg?t=' + Date.now(), { method: 'HEAD', cache: 'no-store' });
      const lat = Math.round(performance.now() - t0);
      this.state.latencyMs = lat;
      this.notifyListeners();
      return lat;
    } catch {
      this.state.latencyMs = null;
      return null;
    }
  }

  /**
   * Aciona a caixa de diálogo nativa de instalação do PWA
   */
  public async promptInstall(): Promise<boolean> {
    if (!this.deferredPrompt) {
      console.warn('Prompt de instalação do PWA não disponível no momento.');
      return false;
    }

    try {
      this.deferredPrompt.prompt();
      const choiceResult = await this.deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        this.state.isInstallable = false;
        this.state.isInstalled = true;
        this.deferredPrompt = null;
        this.notifyListeners();
        return true;
      }
      return false;
    } catch (err) {
      console.error('Erro ao acionar prompt de instalação PWA:', err);
      return false;
    }
  }

  /**
   * Força verificação de novas atualizações do app
   */
  public async checkForUpdates(): Promise<boolean> {
    if (!this.swRegistration) {
      await this.setupServiceWorker();
    }
    if (this.swRegistration) {
      try {
        await this.swRegistration.update();
        await this.refreshStorageAndCaches();
        return this.state.updateAvailable;
      } catch (err) {
        console.warn('Erro ao verificar atualizações do SW:', err);
      }
    }
    return false;
  }

  /**
   * Aplica a atualização pendente ativando o novo Service Worker
   */
  public applyUpdate(): void {
    if (this.swRegistration?.waiting) {
      this.swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    window.location.reload();
  }

  /**
   * Limpa todos os caches e força recarregamento offline
   */
  public async clearAllCaches(): Promise<void> {
    if (typeof caches !== 'undefined') {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    }
    await this.refreshStorageAndCaches();
    this.notifyListeners();
  }

  public getState(): PWAState {
    return { ...this.state };
  }

  public subscribe(callback: (state: PWAState) => void): () => void {
    this.listeners.add(callback);
    callback(this.getState());
    return () => this.listeners.delete(callback);
  }

  private notifyListeners() {
    const s = this.getState();
    this.listeners.forEach(cb => {
      try {
        cb(s);
      } catch (err) {
        console.error('Erro no listener PWA:', err);
      }
    });
  }
}

export const pwaService = new PWAService();
