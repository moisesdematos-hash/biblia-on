// src/services/notificationService.ts

export interface NotificationSettings {
  enabled: boolean;
  dailyReminderHour: number; // Ex: 8 (08:00)
  dailyReminderMinute: number; // Ex: 0 (08:00)
  soundEnabled: boolean;
  readingStreakDays: number;
}

const STORAGE_KEY = 'biblia_on_notifications';

export const notificationService = {
  isSupported(): boolean {
    return typeof window !== 'undefined' && 'Notification' in window;
  },

  getPermission(): NotificationPermission {
    if (!this.isSupported()) return 'denied';
    return Notification.permission;
  },

  async requestPermission(): Promise<boolean> {
    if (!this.isSupported()) return false;
    try {
      const perm = await Notification.requestPermission();
      return perm === 'granted';
    } catch {
      return false;
    }
  },

  getSettings(): NotificationSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch {}

    return {
      enabled: false,
      dailyReminderHour: 8,
      dailyReminderMinute: 0,
      soundEnabled: true,
      readingStreakDays: 1
    };
  },

  saveSettings(settings: NotificationSettings): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Erro ao guardar configurações de notificação:', e);
    }
  },

  sendNotification(title: string, body: string): boolean {
    if (!this.isSupported() || Notification.permission !== 'granted') {
      return false;
    }

    try {
      new Notification(title, {
        body,
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-192x192.png',
        tag: 'biblia-on-daily-reading'
      });
      return true;
    } catch (e) {
      console.error('Erro ao emitir notificação:', e);
      return false;
    }
  },

  testDailyReminder(): boolean {
    return this.sendNotification(
      '📖 BIBLIA ON — Hora do seu Estudo Diário',
      'Mantenha a sua lâmpada acesa hoje: "A tua palavra é lâmpada para o meu pé e luz para o meu caminho." (Salmo 119:105)'
    );
  }
};
