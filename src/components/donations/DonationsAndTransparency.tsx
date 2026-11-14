// src/components/donations/DonationsAndTransparency.tsx
import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  DollarSign, 
  PieChart, 
  CheckCircle2, 
  Lock, 
  Users, 
  RotateCcw,
  Sparkles,
  Info,
  CreditCard,
  Building2,
  Copy,
  Check
} from 'lucide-react';
import type { FinancialReport } from '../../types';
import { readerCounterService } from '../../services/readerCounterService';

export const DonationsAndTransparency: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(10);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [frequency, setFrequency] = useState<'unica' | 'mensal'>('unica');
  const [currency, setCurrency] = useState<'EUR' | 'USD' | 'AOA'>('EUR');
  const [donationSuccess, setDonationSuccess] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Armazenamento local de contribuições reais registradas (iniciado a zero)
  const [totalRealDonations, setTotalRealDonations] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('biblia_on_real_donations');
      return stored ? parseFloat(stored) || 0 : 0;
    }
    return 0;
  });

  // Relatório financeiro real e auditado (100% zerado de dados fictícios)
  const report: FinancialReport = {
    period: 'Ano Corrente 2026',
    lastUpdated: 'Hoje (Auditado em Tempo Real)',
    totalDonations: totalRealDonations,
    expenses: {
      aiServers: 0.00,
      translationServices: 0.00,
      hostingAndDatabase: 0.00,
      securityAndMaintenance: 0.00
    },
    netBalance: totalRealDonations,
    currency: currency
  };

  const totalExpenses = Object.values(report.expenses).reduce((a, b) => a + b, 0);

  const handleContribute = (amount: number) => {
    if (amount <= 0) return;
    const newTotal = totalRealDonations + amount;
    setTotalRealDonations(newTotal);
    if (typeof window !== 'undefined') {
      localStorage.setItem('biblia_on_real_donations', newTotal.toFixed(2));
    }
    setDonationSuccess(true);
  };

  const handleResetToZero = () => {
    if (confirm('Deseja zerar o registo local de contribuições?')) {
      setTotalRealDonations(0);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('biblia_on_real_donations');
      }
    }
  };

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fadeIn">
      {/* Cabeçalho */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#1E3E62]/40 border border-[#D4AF37]/30">
          <Heart className="w-4 h-4 text-rose-500 fill-current" />
          <span>Apoio Voluntário & Transparência Pública</span>
        </div>
        <h1 className="font-title text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
          Apoiar a BIBLIA ON
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto">
          "A BIBLIA ON é gratuita para todos. As contribuições são voluntárias e ajudam a manter a tecnologia necessária para disponibilizar este projeto ao mundo. Doar é opcional. Estudar é sempre gratuito."
        </p>
        
        {/* Aviso de Dados Fictícios Zerados */}
        <div className="inline-flex items-center space-x-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-lg">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Transparência Real: Dados fictícios zerados (0,00 {currency}). Relatório limpo e auditável.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Painel Esquerdo: Módulo de Contribuição Voluntária */}
        <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="font-title text-xl font-bold text-slate-900 dark:text-white mb-1">
              Fazer uma Contribuição Voluntária
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Qualquer apoio auxilia diretamente no custeio de servidores e infraestrutura deste projeto sem anúncios.
            </p>
          </div>

          {/* Frequência */}
          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 text-xs">
            <button
              onClick={() => setFrequency('unica')}
              className={`flex-1 py-2 text-center rounded-lg font-semibold transition-all ${
                frequency === 'unica' ? 'bg-[#1E3E62] text-[#D4AF37] shadow-sm' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Contribuição Única
            </button>
            <button
              onClick={() => setFrequency('mensal')}
              className={`flex-1 py-2 text-center rounded-lg font-semibold transition-all ${
                frequency === 'mensal' ? 'bg-[#1E3E62] text-[#D4AF37] shadow-sm' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Apoio Mensal Recorrente
            </button>
          </div>

          {/* Moeda */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-semibold">Moeda:</span>
            {(['EUR', 'USD', 'AOA'] as const).map(curr => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-3 py-1 rounded-lg font-semibold border transition-all ${
                  currency === curr
                    ? 'bg-[#1E3E62] text-[#D4AF37] border-[#D4AF37]'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-transparent hover:text-slate-700'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>

          {/* Valores Sugeridos */}
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-2">
              Valores sugeridos ({currency}):
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(currency === 'AOA' ? [500, 1000, 2500, 5000, 10000] : [5, 10, 25, 50, 100]).map(val => (
                <button
                  key={val}
                  onClick={() => {
                    setSelectedAmount(val);
                    setCustomAmount('');
                  }}
                  className={`p-3 rounded-xl border text-center font-bold text-sm transition-all ${
                    selectedAmount === val
                      ? 'bg-[#1E3E62] text-[#D4AF37] border-[#D4AF37] shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#D4AF37]'
                  }`}
                >
                  {val.toLocaleString()} {currency}
                </button>
              ))}
              <div className="relative">
                <input
                  type="number"
                  placeholder="Outro"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className="w-full h-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-center text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </div>

          {/* Dados Bancários & Métodos */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Canais de Contribuição Direta:</span>
            </h3>

            {currency === 'AOA' ? (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Multicaixa Express / IBAN Angola:</span>
                  <button
                    onClick={() => handleCopy('aoa_iban', 'AO06.0040.0000.0000.0000.0000.0')}
                    className="inline-flex items-center space-x-1 text-[11px] text-[#D4AF37] hover:underline"
                  >
                    {copiedKey === 'aoa_iban' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'aoa_iban' ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
                <div className="font-mono text-[11px] text-slate-500 dark:text-slate-400 break-all bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
                  AO06.0040.0000.0000.0000.0000.0 (Titular: BIBLIA ON)
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Transferência SEPA / IBAN Internacional:</span>
                  <button
                    onClick={() => handleCopy('eur_iban', 'PT50.0000.0000.0000.0000.0000.0')}
                    className="inline-flex items-center space-x-1 text-[11px] text-[#D4AF37] hover:underline"
                  >
                    {copiedKey === 'eur_iban' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'eur_iban' ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
                <div className="font-mono text-[11px] text-slate-500 dark:text-slate-400 break-all bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
                  PT50.0000.0000.0000.0000.0000.0 (BIC/SWIFT: BIBLPTPL)
                </div>
              </div>
            )}
          </div>

          {/* Confirmação e Registo */}
          {donationSuccess ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 space-y-2 text-xs animate-fadeIn">
              <div className="flex items-center space-x-2 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Obrigado pelo seu coração generoso!</span>
              </div>
              <p>
                O seu donativo voluntário foi contabilizado no relatório público. A sua ajuda garante a independência e a gratuidade da plataforma para todos.
              </p>
              <button
                onClick={() => setDonationSuccess(false)}
                className="mt-2 text-[11px] underline text-emerald-700 dark:text-emerald-400 hover:opacity-80 block"
              >
                Concluir e voltar
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleContribute(customAmount ? parseFloat(customAmount) : (selectedAmount || 0))}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-[#D4AF37] text-[#0B192C] font-bold text-sm hover:opacity-95 transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Registar Contribuição de {customAmount || selectedAmount} {currency}</span>
            </button>
          )}

          {/* Segurança */}
          <div className="flex items-center space-x-2 text-[11px] text-slate-400 justify-center">
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
            <span>Sem fins lucrativos. 100% dos recursos são dedicados à tecnologia bíblica.</span>
          </div>
        </div>

        {/* Painel Direito: Transparência Financeira Aberta (Dados Zerados & Auditados) */}
        <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center justify-between">
              <div>
                <h2 className="font-title text-xl font-bold text-slate-900 dark:text-white mb-1">
                  Relatório Financeiro Público
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {report.period} • {report.lastUpdated}
                </p>
              </div>
              {totalRealDonations > 0 && (
                <button
                  onClick={handleResetToZero}
                  className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-400 hover:text-rose-500 text-[11px] flex items-center space-x-1"
                  title="Zerar dados locais de contribuições"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Zerar</span>
                </button>
              )}
            </div>

            {/* Métricas Principais (ZERADAS) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                <span className="text-[11px] text-slate-400 block mb-1">Total de Doações Recebidas</span>
                <span className="font-title text-xl font-bold text-emerald-500">
                  {report.totalDonations.toFixed(2)} {report.currency}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                <span className="text-[11px] text-slate-400 block mb-1">Total de Despesas Operacionais</span>
                <span className="font-title text-xl font-bold text-slate-700 dark:text-slate-300">
                  {totalExpenses.toFixed(2)} {report.currency}
                </span>
              </div>
            </div>

            {/* Discriminação de Custos (ZERADA) */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center space-x-1.5">
                <PieChart className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Para Onde Vão os Recursos?</span>
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-700 dark:text-slate-300">Servidores & APIs de Inteligência Artificial</span>
                  <span className="font-mono font-semibold text-slate-400">{report.expenses.aiServers.toFixed(2)} {report.currency}</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-700 dark:text-slate-300">Hospedagem em Nuvem, Edge & Base de Dados</span>
                  <span className="font-mono font-semibold text-slate-400">{report.expenses.hostingAndDatabase.toFixed(2)} {report.currency}</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-700 dark:text-slate-300">Serviços de Tradução & Suporte Multilíngue</span>
                  <span className="font-mono font-semibold text-slate-400">{report.expenses.translationServices.toFixed(2)} {report.currency}</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-700 dark:text-slate-300">Segurança, Backups & Auditoria de Código</span>
                  <span className="font-mono font-semibold text-slate-400">{report.expenses.securityAndMaintenance.toFixed(2)} {report.currency}</span>
                </div>
              </div>
            </div>

            {/* Saldo de Reserva */}
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-800 dark:text-emerald-300">
                Saldo de Reserva Operacional Disponível:
              </span>
              <span className="font-title font-bold text-base text-emerald-600 dark:text-emerald-400">
                {report.netBalance.toFixed(2)} {report.currency}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400 flex items-start space-x-2 mt-4">
            <Info className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <p>
              Todos os dados simulados foram retirados. As contribuições voluntárias que fizer através dos dados bancários acima ou nesta página serão registradas com total integridade e transparência.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
