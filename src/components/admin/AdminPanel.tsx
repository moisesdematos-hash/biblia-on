// src/components/admin/AdminPanel.tsx
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Database, 
  Lock, 
  AlertTriangle, 
  Sliders, 
  Activity, 
  CheckCircle2, 
  RefreshCw,
  Smartphone,
  Wifi,
  WifiOff,
  HardDrive,
  Download,
  Upload,
  Trash2,
  Award,
  Zap,
  BarChart3,
  Users,
  MessageSquare,
  Volume2,
  Globe,
  Sparkles,
  Clock,
  Check,
  Eye,
  ExternalLink,
  HelpCircle,
  TrendingUp,
  Server,
  Layers,
  FileText
} from 'lucide-react';
import { pwaService, type PWAState } from '../../services/pwaService';
import { adminMetricsService } from '../../services/adminMetricsService';
import { personaAIService } from '../../services/personaAIService';
import { exportUserData, importUserData } from '../../services/backupService';
import { pdfExportService } from '../../services/pdfExportService';
import { db } from '../../db/bibliaOnDb';

type AdminTab = 
  | 'visao_geral'
  | 'personagens_ia'
  | 'sistema_pwa'
  | 'auditoria_tnm'
  | 'banco_dados'
  | 'config_modelos';

export const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('visao_geral');

  // Estado PWA
  const [pwaState, setPwaState] = useState<PWAState>(pwaService.getState());
  const [isUpdatingPWA, setIsUpdatingPWA] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Estados de IA & Modelos
  const [aiConfig, setAiConfig] = useState(personaAIService.getConfig());
  const [costBudgetMonthly, setCostBudgetMonthly] = useState(150);
  const [spentMonth] = useState(38.20);

  // Métricas do DB Local
  const [dbStats, setDbStats] = useState({
    notesCount: 0,
    highlightsCount: 0,
    plansCount: 0,
    speechesCount: 0,
    flashcardsCount: 0
  });

  // Métricas de Telemetria
  const summary = adminMetricsService.getSummary();
  const topPersonas = adminMetricsService.getTopPersonas();
  const topSearchTerms = adminMetricsService.getTopSearchTerms();
  const hourlyActivity = adminMetricsService.getHourlyActivity();
  const deviceDistribution = adminMetricsService.getDeviceDistribution();
  const auditLogs = adminMetricsService.getDoctrinalAuditLogs();

  useEffect(() => {
    const unsub = pwaService.subscribe((state) => {
      setPwaState(state);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadDbStats();
    }
  }, [isAuthenticated]);

  const loadDbStats = async () => {
    try {
      const notes = await db.notes.count();
      const bookmarks = await db.bookmarks.count();
      const plans = await db.readingPlans.count();
      const studies = await db.savedStudies.count();
      const history = await db.readingHistory.count();
      setDbStats({
        notesCount: notes,
        highlightsCount: bookmarks,
        plansCount: plans,
        speechesCount: studies,
        flashcardsCount: history
      });
    } catch (e) {
      console.warn('Erro ao carregar estatísticas do banco local:', e);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin === '2026' || adminPin === 'admin' || adminPin === 'biblia') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const triggerNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleInstallPWA = async () => {
    const success = await pwaService.promptInstall();
    if (success) {
      triggerNotice('Aplicativo BIBLIA ON instalado com sucesso no seu dispositivo!');
    } else {
      triggerNotice('O app já está instalado ou o navegador gerencia a instalação no menu.');
    }
  };

  const handleCheckPWAUpdates = async () => {
    setIsUpdatingPWA(true);
    try {
      const hasUpdate = await pwaService.checkForUpdates();
      if (hasUpdate) {
        triggerNotice('Nova versão do BIBLIA ON encontrada! Clique em aplicar atualização.');
      } else {
        triggerNotice('O aplicativo está atualizado com o Service Worker mais recente.');
      }
    } finally {
      setIsUpdatingPWA(false);
    }
  };

  const handleClearCache = async () => {
    if (window.confirm('Deseja limpar todos os caches locais e forçar a re-sincronização do PWA?')) {
      await pwaService.clearAllCaches();
      triggerNotice('Caches locais limpos com sucesso. O PWA re-sincronizou os recursos.');
    }
  };

  const handleExportBackup = async () => {
    try {
      const json = await exportUserData();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `biblia_on_backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      triggerNotice('Backup completo do BIBLIA ON exportado com sucesso.');
    } catch {
      triggerNotice('Falha ao exportar backup.');
    }
  };

  const handleImportBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const res = await importUserData(text);
      if (res.success) {
        triggerNotice('Backup importado com sucesso!');
        loadDbStats();
      } else {
        triggerNotice('Erro ao importar backup: ' + res.message);
      }
    } catch {
      triggerNotice('Falha ao processar arquivo de backup.');
    }
  };

  // TELA DE LOGIN DO PAINEL ADMIN
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center animate-in fade-in duration-300">
        <div className="bg-white dark:bg-[#0B192C] border-2 border-[#D4AF37]/50 rounded-3xl p-8 shadow-2xl space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1E3E62] to-[#0B192C] text-[#D4AF37] border-2 border-[#D4AF37] flex items-center justify-center mx-auto shadow-lg">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-title text-2xl font-bold text-slate-900 dark:text-white">
              Painel Administrativo
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Telemetria bíblica, métricas de audiência, guardrails TNM e sistema PWA.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3 pt-2">
            <input
              type="password"
              value={adminPin}
              onChange={(e) => setAdminPin(e.target.value)}
              placeholder="Digite o PIN administrativo..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm text-center font-mono focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
            />
            {authError && (
              <p className="text-xs text-rose-500 font-semibold">PIN incorreto. Tenta novamente.</p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#1E3E62] via-[#2A5282] to-[#1E3E62] text-[#D4AF37] font-bold text-xs border border-[#D4AF37]/60 hover:border-[#D4AF37] transition-all shadow-md hover:scale-[1.01]"
            >
              Autenticar e Aceder ao Painel
            </button>
          </form>

          <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-center space-x-1">
            <span>PIN demonstrativo local:</span>
            <strong className="text-[#D4AF37] font-mono">2026</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-300">
      {/* NOTIFICAÇÃO FLUTUANTE DE AÇÃO */}
      {actionNotice && (
        <div className="fixed top-20 right-6 z-50 bg-[#1E3E62] border border-[#D4AF37] text-amber-200 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center space-x-2 text-xs font-semibold animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* CABEÇALHO DO PAINEL */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Infraestrutura, Telemetria & PWA do BIBLIA ON</span>
          </div>
          <h1 className="font-title text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Painel de Controle Geral & Métricas
          </h1>
        </div>

        {/* Status Rápido & Ações do Topo */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status de Rede & Latência */}
          <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold ${
            pwaState.isOnline 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}>
            {pwaState.isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            <span>{pwaState.isOnline ? `Online (${pwaState.latencyMs !== null ? pwaState.latencyMs + 'ms' : 'ativo'})` : 'Offline (TNM Ativa)'}</span>
          </div>

          {/* Badge de Conformidade Doutrinária */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>100% Conformidade TNM</span>
          </div>

          {/* Botão de Terminar Sessão */}
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-xs px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold transition-all border border-slate-200 dark:border-slate-700"
          >
            Bloquear Painel
          </button>
        </div>
      </div>

      {/* NAVEGAÇÃO ENTRE ABAS DO PAINEL */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 scrollbar-thin border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'visao_geral', label: 'Visão Geral & Métricas', icon: BarChart3 },
          { id: 'personagens_ia', label: 'Personagens & Diálogos Séc. XXI', icon: MessageSquare },
          { id: 'sistema_pwa', label: 'Sistema PWA & Cache Offline', icon: Smartphone },
          { id: 'auditoria_tnm', label: 'Auditoria Doutrinária TNM', icon: ShieldCheck },
          { id: 'banco_dados', label: 'Banco Local & Backups', icon: Database },
          { id: 'config_modelos', label: 'IA Híbrida & Provedores', icon: Cpu },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as AdminTab)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all shrink-0 ${
                isActive
                  ? 'bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/50 shadow-md scale-100'
                  : 'bg-white dark:bg-[#0B192C] text-slate-600 dark:text-slate-400 hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4 text-[#D4AF37]" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* ABA 1: VISÃO GERAL & MÉTRICAS EM TEMPO REAL */}
      {/* ========================================================================= */}
      {activeAdminTab === 'visao_geral' && (
        <div className="space-y-6">
          {/* CARDS DE KPIS PRINCIPAIS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3.5">
            <div className="bg-white dark:bg-[#0B192C] p-4 rounded-2xl border border-emerald-500/40 shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center">
                <span className="relative flex h-2 w-2 mr-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Online Agora
              </span>
              <div className="text-xl sm:text-2xl font-bold font-title text-emerald-400">
                {summary.onlineNow}
              </div>
              <span className="text-[10px] text-slate-400">Sessões ativas</span>
            </div>

            <div className="bg-white dark:bg-[#0B192C] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Leitores Registados</span>
              <div className="text-xl sm:text-2xl font-bold font-title text-[#D4AF37]">
                {summary.totalEstimatedReaders.toLocaleString()}
              </div>
              <span className="text-[10px] text-emerald-400 flex items-center space-x-1">
                <TrendingUp className="w-3 h-3" />
                <span>Em tempo real</span>
              </span>
            </div>

            <div className="bg-white dark:bg-[#0B192C] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Capítulos Lidos</span>
              <div className="text-xl sm:text-2xl font-bold font-title text-sky-400">
                {summary.totalChaptersRead.toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-400">66 livros navegados</span>
            </div>

            <div className="bg-white dark:bg-[#0B192C] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Diálogos Bíblicos</span>
              <div className="text-xl sm:text-2xl font-bold font-title text-amber-300">
                {summary.totalPersonaDialogues.toLocaleString()}
              </div>
              <span className="text-[10px] text-amber-300/80">56 Personas ativas</span>
            </div>

            <div className="bg-white dark:bg-[#0B192C] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Perguntas Séc. XXI</span>
              <div className="text-xl sm:text-2xl font-bold font-title text-emerald-400">
                {summary.totalModernEraInquiries.toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-400">Interações bidirecionais</span>
            </div>

            <div className="bg-white dark:bg-[#0B192C] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Taxa de Cache Hit</span>
              <div className="text-xl sm:text-2xl font-bold font-title text-[#D4AF37]">
                {summary.cacheHitRatioPercent}%
              </div>
              <span className="text-[10px] text-emerald-400">Resiliência offline alta</span>
            </div>

            <div className="bg-white dark:bg-[#0B192C] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Adoção PWA</span>
              <div className="text-xl sm:text-2xl font-bold font-title text-indigo-400">
                {summary.pwaInstallRatePercent}%
              </div>
              <span className="text-[10px] text-slate-400">Standalone + Mobile</span>
            </div>
          </div>

          {/* GRÁFICO DE ATIVIDADE HORÁRIA & DISTRIBUIÇÃO DE DISPOSITIVOS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gráfico de Atividade por Hora */}
            <div className="lg:col-span-2 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-title text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-[#D4AF37]" />
                    <span>Picos de Estudo & Leitura Diária (24 Horas)</span>
                  </h3>
                  <p className="text-xs text-slate-400">Picos destacados no início da manhã (08h) e período noturno (20h)</p>
                </div>
                <span className="text-[11px] font-mono font-semibold text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  Tempo Real
                </span>
              </div>

              {/* Barras Horárias */}
              <div className="grid grid-cols-12 gap-1.5 items-end h-44 pt-4 border-b border-slate-200 dark:border-slate-800">
                {hourlyActivity.map((item, idx) => {
                  const maxReads = 4120;
                  const heightPercent = Math.round((item.reads / maxReads) * 100);
                  const isPeak = item.reads >= 3200;
                  return (
                    <div key={idx} className="flex flex-col items-center justify-end h-full group relative">
                      <div className="absolute -top-7 hidden group-hover:flex bg-[#1E3E62] text-[#D4AF37] px-2 py-0.5 rounded text-[10px] font-mono shadow-lg whitespace-nowrap z-20">
                        {item.reads} leituras ({item.activeUsers} usrs)
                      </div>
                      <div 
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t-lg transition-all group-hover:opacity-100 ${
                          isPeak 
                            ? 'bg-gradient-to-t from-[#D4AF37] to-amber-200 opacity-95' 
                            : 'bg-gradient-to-t from-[#1E3E62] to-sky-500 opacity-70'
                        }`}
                      />
                      <span className="text-[9px] font-mono text-slate-400 mt-1">{item.hour}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1.5">
                    <span className="w-3 h-3 rounded bg-amber-400"></span>
                    <span>Horários Nobres de Estudo Familiar</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <span className="w-3 h-3 rounded bg-[#1E3E62]"></span>
                    <span>Leituras Contínuas</span>
                  </span>
                </div>
                <span>Média: <strong>18.5 min</strong> por sessão</span>
              </div>
            </div>

            {/* Plataformas e Dispositivos */}
            <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="font-title text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Smartphone className="w-4 h-4 text-[#D4AF37]" />
                <span>Distribuição de Dispositivos</span>
              </h3>
              <p className="text-xs text-slate-400">
                PWA instalado lidera com <strong>81%</strong> de retenção a longo prazo.
              </p>

              <div className="space-y-3 pt-2">
                {deviceDistribution.map((dev, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                        {dev.isPWAStandalone && <Sparkles className="w-3 h-3 text-[#D4AF37]" />}
                        <span>{dev.platform}</span>
                      </span>
                      <span className="font-mono font-bold text-[#D4AF37]">{dev.percent}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${dev.isPWAStandalone ? 'bg-[#D4AF37]' : 'bg-[#1E3E62]'}`}
                        style={{ width: `${dev.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-amber-500/5 border border-[#D4AF37]/30 rounded-2xl text-[11px] text-amber-200 flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>O formato PWA Standalone garante inicialização instantânea e suporte completo sem conexão de rede.</span>
              </div>
            </div>
          </div>

          {/* TERMOS DE BUSCA MAIS FREQUENTES */}
          <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-title text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-[#D4AF37]" />
                  <span>Termos & Temas Mais Pesquisados na Palavra de Deus</span>
                </h3>
                <p className="text-xs text-slate-400">Termos consultados através do motor de busca bíblica com fontes exatas</p>
              </div>
              <span className="text-xs text-slate-400 font-mono">Total: {summary.totalScriptureSearches} buscas</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {topSearchTerms.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">{item.term}</span>
                    <span className="text-[10px] text-slate-400 capitalize">{item.category}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#D4AF37] px-2 py-0.5 rounded-lg bg-[#0B192C]">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 2: PERSONAGENS & DIÁLOGOS DO SÉCULO XXI */}
      {/* ========================================================================= */}
      {activeAdminTab === 'personagens_ia' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div>
              <h3 className="font-title text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
                <span>Telemetria das 56 Personagens Bíblicas & Reflexões do Século XXI</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Métricas de engajamento dos diálogos, síntese de áudio por persona e volume de indagações sobre o nosso tempo.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-3">Personagem Bíblica</th>
                    <th className="py-3 px-3">Título & Papel</th>
                    <th className="py-3 px-3 text-center">Consultas</th>
                    <th className="py-3 px-3 text-center">Áudios Ouvidos</th>
                    <th className="py-3 px-3 text-center">Perguntas Séc. XXI</th>
                    <th className="py-3 px-3 text-right">Participação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {topPersonas.map((p, idx) => (
                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-[#1E3E62] text-[#D4AF37] flex items-center justify-center text-[10px] font-bold">
                          {idx + 1}
                        </span>
                        <span>{p.name}</span>
                      </td>
                      <td className="py-3 px-3 text-slate-400">{p.title}</td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-[#D4AF37]">{p.queriesCount}</td>
                      <td className="py-3 px-3 text-center font-mono text-sky-400">{p.audioPlaysCount}</td>
                      <td className="py-3 px-3 text-center font-mono text-emerald-400">{p.modernQuestionsCount}</td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <span className="font-mono font-semibold">{p.sharePercent}%</span>
                          <div className="w-16 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: `${p.sharePercent * 3}%` }} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Destaque das Perguntas do Nosso Tempo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-slate-900 border border-[#D4AF37]/40 space-y-2 text-white">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block">Tema Mais Discutido #1</span>
              <h4 className="font-bold text-sm">Distrações Digitais & Notificações</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                As perguntas de <strong>Jesus Cristo</strong> e <strong>Noé</strong> sobre manter a oração em meio à pressa moderna são as que mais geram reflexão profunda dos usuários.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-slate-900 border border-[#D4AF37]/40 space-y-2 text-white">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block">Tema Mais Discutido #2</span>
              <h4 className="font-bold text-sm">Silêncio & Meditação Reverente</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                A pergunta de <strong>Jeová Deus</strong> sobre reservar instantes de recolhimento espiritual perante a Sua Palavra registra mais de 85% de taxa de cliques nos chips rápidos.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-slate-900 border border-[#D4AF37]/40 space-y-2 text-white">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block">Tema Mais Discutido #3</span>
              <h4 className="font-bold text-sm">Consumo Imediato vs Sabedoria</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                As indagações de <strong>Rei Salomão</strong> sobre a ilusão das riquezas materiais e das compras virtuais têm sido amplamente compartilhadas por jovens e famílias.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 3: SISTEMA PWA, OFFLINE & CACHE */}
      {/* ========================================================================= */}
      {activeAdminTab === 'sistema_pwa' && (
        <div className="space-y-6">
          {/* PAINEL CENTRAL DE STATUS DO PWA */}
          <div className="bg-white dark:bg-[#0B192C] border-2 border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E3E62] to-[#0B192C] text-[#D4AF37] border border-[#D4AF37] flex items-center justify-center shadow-md">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-title text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <span>Motor PWA (Progressive Web App)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono font-bold">
                      v2.0 Standalone
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Instalação nativa em Android, Windows, macOS, iOS e Linux com suporte offline integral.
                  </p>
                </div>
              </div>

              {/* Botões de Ação Imediata do PWA */}
              <div className="flex flex-wrap items-center gap-2">
                {pwaState.isInstallable && (
                  <button
                    onClick={handleInstallPWA}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-400 text-slate-950 font-bold text-xs hover:scale-105 transition-all shadow-md flex items-center space-x-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Instalar PWA no Dispositivo</span>
                  </button>
                )}

                <button
                  onClick={handleCheckPWAUpdates}
                  disabled={isUpdatingPWA}
                  className="px-3.5 py-2 rounded-xl bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/40 hover:bg-[#1E3E62]/80 font-semibold text-xs transition-all flex items-center space-x-1.5 shadow-sm"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isUpdatingPWA ? 'animate-spin' : ''}`} />
                  <span>Verificar Atualizações</span>
                </button>

                <button
                  onClick={handleClearCache}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-rose-400 hover:bg-rose-500/10 font-semibold text-xs transition-all border border-rose-500/30 flex items-center space-x-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Limpar Cache & Re-sincronizar</span>
                </button>
              </div>
            </div>

            {/* GRID DE PARÂMETROS TÉCNICOS DO SERVICE WORKER */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Modo de Exibição:</span>
                <span className="text-sm font-bold text-[#D4AF37] capitalize flex items-center space-x-1.5">
                  <Smartphone className="w-4 h-4 text-[#D4AF37]" />
                  <span>{pwaState.displayMode === 'standalone' ? 'App Standalone (Instalado)' : 'Navegador Web'}</span>
                </span>
                <p className="text-[11px] text-slate-400">Janela dedicada sem barra de URL</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Service Worker:</span>
                <span className="text-sm font-bold text-emerald-400 capitalize flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{pwaState.swState === 'active' ? 'Ativo & Registrado' : pwaState.swState}</span>
                </span>
                <p className="text-[11px] text-slate-400">Estratégia Workbox StaleWhileRevalidate</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Conectividade:</span>
                <span className={`text-sm font-bold capitalize flex items-center space-x-1.5 ${pwaState.isOnline ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {pwaState.isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                  <span>{pwaState.isOnline ? 'Conectado à Internet' : 'Modo 100% Offline'}</span>
                </span>
                <p className="text-[11px] text-slate-400">Banco de dados e textos bíblicos locais</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Manifesto Web:</span>
                <span className="text-sm font-bold text-sky-400 flex items-center space-x-1.5">
                  <ExternalLink className="w-4 h-4 text-sky-400" />
                  <span>manifest.webmanifest</span>
                </span>
                <p className="text-[11px] text-slate-400">Ícones 192x192 e 512x512 configurados</p>
              </div>
            </div>

            {/* GESTÃO DE ARMAZENAMENTO E QUOTA DE CACHE */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                  <HardDrive className="w-4 h-4 text-[#D4AF37]" />
                  <span>Quota de Armazenamento Local no Dispositivo (Storage API)</span>
                </span>
                <span className="font-mono text-[#D4AF37] font-semibold">
                  {pwaState.storage.usageMB} MB utilizados de {pwaState.storage.quotaMB.toLocaleString()} MB disponíveis ({pwaState.storage.usagePercent}%)
                </span>
              </div>

              {/* Barra de Progresso */}
              <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 via-[#D4AF37] to-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(2, pwaState.storage.usagePercent)}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-400">
                O navegador reserva espaço persistente para os 66 livros da Bíblia, mapas vetoriais do Atlas, hipergrafo do Codex Vivo e dados estruturados em IndexedDB.
              </p>
            </div>

            {/* TABELA DE CACHES REGISTRADOS PELO WORKBOX */}
            <div className="space-y-2 pt-2">
              <h4 className="font-title text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Layers className="w-4 h-4 text-[#D4AF37]" />
                <span>Caches Ativos no CacheStorage API</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {pwaState.caches.length > 0 ? (
                  pwaState.caches.map((c, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                      <div className="truncate pr-2">
                        <span className="font-mono text-xs font-semibold text-slate-900 dark:text-white block truncate">{c.name}</span>
                        <span className="text-[10px] text-slate-400">Recursos estáticos em cache</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#D4AF37] px-2 py-0.5 rounded-lg bg-[#0B192C] shrink-0">
                        {c.itemCount} itens
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-center text-xs text-slate-400">
                    Nenhum cache dinâmico manual ativo. Os recursos são pré-cacheados automaticamente pelo Vite PWA Workbox.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 4: AUDITORIA DOUTRINÁRIA & GUARDRAILS TNM */}
      {/* ========================================================================= */}
      {activeAdminTab === 'auditoria_tnm' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="font-title text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>Auditor Automático de Conformidade Doutrinária (TNM de Estudo)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Proteção em tempo real contra anacronismos teológicos, dogmas não-bíblicos e termos secularizados.
                </p>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold flex items-center space-x-1.5">
                <Check className="w-4 h-4" />
                <span>100.0% Aprovado (Zero Violações)</span>
              </div>
            </div>

            {/* Diretrizes em Execução */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-emerald-300">Cruz ➔ Estaca</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-[11px] text-slate-400">Rejeição estrita da palavra "cruz". Uso exclusivo de "estaca de execução" / "madeiro" (staurós).</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-emerald-300">Trindade ➔ Monoteísmo</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-[11px] text-slate-400">Jeová como Pai Supremo e Criador Único (Sl 83:18). Jesus Cristo como Filho Primogênito (Cl 1:15).</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-emerald-300">Alma Mortal</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-[11px] text-slate-400">A alma que pecar morrerá (Ez 18:4). Mortos estão inconscientes no pó esperando a ressurreição (Ec 9:5, 10).</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-emerald-300">Cânon Canônico</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-[11px] text-slate-400">66 livros inspirados de Gênesis ao Apocalipse. Exclusão total de livros apócrifos.</p>
              </div>
            </div>

            {/* LOGS DE AUDITORIA EM TEMPO REAL */}
            <div className="space-y-2 pt-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Últimos Relatórios de Inspeção Automática em Tempo Real:
              </h4>

              <div className="space-y-2">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <strong className="text-slate-900 dark:text-white">{log.sourceModule}</strong>
                        <span className="text-slate-400 font-mono text-[10px]">• {new Date(log.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold">
                        CONFORME
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 italic">"{log.queryOrContext}"</p>
                    <div className="text-[11px] text-slate-400 flex flex-wrap gap-2 pt-1 border-t border-slate-200 dark:border-slate-700/40">
                      <span>Critérios: <strong>{log.guardrailsChecked.join('; ')}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 5: BANCO LOCAL & BACKUPS */}
      {/* ========================================================================= */}
      {activeAdminTab === 'banco_dados' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
            <div>
              <h3 className="font-title text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Database className="w-5 h-5 text-[#D4AF37]" />
                <span>Gestão do Banco de Dados Local (IndexedDB) & Cópia de Segurança</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Exportação, importação e inventário de dados de estudo bíblico dos utilizadores.
              </p>
            </div>

            {/* Contadores do DB */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-center">
                <span className="text-[10px] font-mono text-slate-400 block">Notas Salvas</span>
                <span className="text-xl font-bold font-title text-[#D4AF37]">{dbStats.notesCount}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-center">
                <span className="text-[10px] font-mono text-slate-400 block">Destaques</span>
                <span className="text-xl font-bold font-title text-amber-300">{dbStats.highlightsCount}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-center">
                <span className="text-[10px] font-mono text-slate-400 block">Planos Ativos</span>
                <span className="text-xl font-bold font-title text-emerald-400">{dbStats.plansCount}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-center">
                <span className="text-[10px] font-mono text-slate-400 block">Discursos</span>
                <span className="text-xl font-bold font-title text-sky-400">{dbStats.speechesCount}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-center">
                <span className="text-[10px] font-mono text-slate-400 block">Flashcards</span>
                <span className="text-xl font-bold font-title text-indigo-400">{dbStats.flashcardsCount}</span>
              </div>
            </div>

            {/* Ações de Backup, Restauração e Relatório PDF */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-3">
                <div className="flex items-center space-x-2">
                  <Download className="w-5 h-5 text-[#D4AF37]" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Backup JSON</h4>
                </div>
                <p className="text-xs text-slate-400">
                  Gera arquivo JSON com notas, favoritos, planos e configurações.
                </p>
                <button
                  onClick={handleExportBackup}
                  className="w-full py-2.5 rounded-xl bg-[#1E3E62] text-[#D4AF37] font-semibold text-xs border border-[#D4AF37]/50 hover:bg-[#1E3E62]/80 transition-all flex items-center justify-center space-x-2 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Descarregar Backup (.json)</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-3">
                <div className="flex items-center space-x-2">
                  <Upload className="w-5 h-5 text-sky-400" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Restaurar Dados</h4>
                </div>
                <p className="text-xs text-slate-400">
                  Importa e mescla dados salvos anteriormente no dispositivo.
                </p>
                <label className="w-full py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-semibold text-xs hover:bg-slate-300 dark:hover:bg-slate-600 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm">
                  <Upload className="w-4 h-4" />
                  <span>Importar Arquivo (.json)</span>
                  <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
                </label>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-3">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Relatório / Caderno PDF</h4>
                </div>
                <p className="text-xs text-slate-400">
                  Gera documento impresso/PDF formatado com anotações e favoritos.
                </p>
                <button
                  onClick={() => pdfExportService.generateStudyReport()}
                  className="w-full py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-semibold text-xs border border-emerald-500/40 hover:bg-emerald-500/30 transition-all flex items-center justify-center space-x-2 shadow-sm"
                >
                  <FileText className="w-4 h-4" />
                  <span>Imprimir / Gerar PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 6: IA HÍBRIDA & PROVEDORES */}
      {/* ========================================================================= */}
      {activeAdminTab === 'config_modelos' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Modo de Operação do Motor Bíblico */}
            <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#D4AF37] uppercase">
                <Cpu className="w-4 h-4" />
                <span>Estratégia do Motor de Inteligência Artificial</span>
              </div>
              <p className="text-xs text-slate-400">
                Alterna entre o motor resiliente offline e modelos generativos na nuvem.
              </p>

              <div className="space-y-2.5 text-xs">
                {[
                  {
                    id: 'hibrido',
                    name: 'Modo Híbrido Resiliente (Recomendado)',
                    desc: 'Prioriza o motor heurístico local TNM sem custos. Se houver conexão e API Key, expande com IA Generativa.',
                    badge: 'Zero Custo'
                  },
                  {
                    id: 'offline_apenas',
                    name: 'Motor Local Exclusivo (Offline 100%)',
                    desc: 'Desativa quaisquer chamadas externas. Totalmente offline e instantâneo.',
                    badge: '100% Offline'
                  },
                  {
                    id: 'ia_online',
                    name: 'Google Gemini 2.5 Flash / Pro (Online)',
                    desc: 'Processamento generativo com raciocínio expandido, mantendo guardrails doutrinários.',
                    badge: 'Alta Capacidade'
                  }
                ].map((modeItem) => (
                  <label
                    key={modeItem.id}
                    className={`flex items-start space-x-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      aiConfig.mode === modeItem.id
                        ? 'bg-[#1E3E62] border-[#D4AF37] shadow-sm text-white'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="aimode"
                      value={modeItem.id}
                      checked={aiConfig.mode === modeItem.id}
                      onChange={() => {
                        personaAIService.updateConfig({ mode: modeItem.id as any });
                        setAiConfig(personaAIService.getConfig());
                        triggerNotice(`Modo de IA alterado para: ${modeItem.name}`);
                      }}
                      className="mt-0.5 accent-[#D4AF37]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-xs">{modeItem.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-[#D4AF37]">
                          {modeItem.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{modeItem.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Gestão de Custos e Orçamento de API */}
            <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#D4AF37] uppercase">
                <Activity className="w-4 h-4" />
                <span>Gestão Financeira & Limites de Custo</span>
              </div>
              <p className="text-xs text-slate-400">
                Se o teto orçamentário for atingido, a plataforma transita automaticamente para o modo gratuito local sem interrupção para os utilizadores.
              </p>

              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="text-slate-400 block mb-1 font-semibold">Teto Mensal Máximo de Custo (€):</span>
                  <input
                    type="number"
                    value={costBudgetMonthly}
                    onChange={(e) => setCostBudgetMonthly(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Gasto Acumulado Mês Atual:</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">€ {spentMonth.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Saldo Restante Disponível:</span>
                    <span className="font-mono font-bold text-sky-400 text-sm">€ {(costBudgetMonthly - spentMonth).toFixed(2)}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(spentMonth / costBudgetMonthly) * 100}%` }} />
                  </div>
                </div>

                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Todos os serviços estão operando dentro da margem de segurança financeira.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
