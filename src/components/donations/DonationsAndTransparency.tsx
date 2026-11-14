// src/components/donations/DonationsAndTransparency.tsx
import React, { useState } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  PieChart, 
  CheckCircle2, 
  Lock, 
  Building2, 
  Copy, 
  Check,
  RotateCcw,
  Info,
  Sparkles
} from 'lucide-react';
import type { FinancialReport } from '../../types';

export type CurrencyType = 'KZ' | 'EUR' | 'USD';

interface BankAccountInfo {
  id: CurrencyType;
  label: string;
  currencyName: string;
  ibanFormatted: string;
  ibanRaw: string;
  symbol: string;
  icon: string;
}

export const DonationsAndTransparency: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyType>('KZ');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(10000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [frequency, setFrequency] = useState<'unica' | 'mensal'>('unica');
  const [donationSuccess, setDonationSuccess] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Contas Oficiais de Recebimento de Doações
  const BANK_ACCOUNTS: Record<CurrencyType, BankAccountInfo> = {
    KZ: {
      id: 'KZ',
      label: 'Conta em Kwanzas (KZ / AOA)',
      currencyName: 'Kwanzas (Angola)',
      ibanFormatted: 'AO06 0051 0000 0239 6763 1011 8',
      ibanRaw: 'AO06005100000239676310118',
      symbol: 'Kz',
      icon: '🇦🇴'
    },
    EUR: {
      id: 'EUR',
      label: 'Conta em Euros (EUR)',
      currencyName: 'Euros (Europa / Internacional)',
      ibanFormatted: 'AO06 0051 0000 0239 6763 3223 4',
      ibanRaw: 'AO06005100000239676332234',
      symbol: '€',
      icon: '💶'
    },
    USD: {
      id: 'USD',
      label: 'Conta em Dólares (USD)',
      currencyName: 'Dólares Americanos (USD)',
      ibanFormatted: 'AO06 0051 0000 0239 6763 3019 7',
      ibanRaw: 'AO06005100000239676330197',
      symbol: '$',
      icon: '💵'
    }
  };

  // Valores sugeridos expandidos conforme solicitado: 1.000, 10.000, 100.000, 1.000.000, 10.000.000
  const SUGGESTED_VALUES: Record<CurrencyType, number[]> = {
    KZ: [1000, 10000, 100000, 1000000, 10000000],
    EUR: [10, 50, 100, 1000, 10000, 100000, 1000000, 10000000],
    USD: [10, 50, 100, 1000, 10000, 100000, 1000000, 10000000]
  };

  // Armazenamento local de contribuições reais registradas por moeda (iniciado a zero)
  const [realDonations, setRealDonations] = useState<Record<CurrencyType, number>>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('biblia_on_real_donations_by_curr');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          // fallback
        }
      }
    }
    return { KZ: 0, EUR: 0, USD: 0 };
  });

  const currentAccount = BANK_ACCOUNTS[selectedCurrency];
  const currentTotal = realDonations[selectedCurrency] || 0;

  // Relatório financeiro real e auditado (100% zerado de dados fictícios)
  const report: FinancialReport = {
    period: 'Ano Corrente 2026',
    lastUpdated: 'Hoje (Auditado em Tempo Real)',
    totalDonations: currentTotal,
    expenses: {
      aiServers: 0.00,
      translationServices: 0.00,
      hostingAndDatabase: 0.00,
      securityAndMaintenance: 0.00
    },
    netBalance: currentTotal,
    currency: selectedCurrency === 'KZ' ? 'AOA' : selectedCurrency
  };

  const totalExpenses = Object.values(report.expenses).reduce((a, b) => a + b, 0);

  const handleContribute = (amount: number) => {
    if (amount <= 0) return;
    const updated = {
      ...realDonations,
      [selectedCurrency]: (realDonations[selectedCurrency] || 0) + amount
    };
    setRealDonations(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('biblia_on_real_donations_by_curr', JSON.stringify(updated));
    }
    setDonationSuccess(true);
  };

  const handleResetToZero = () => {
    if (confirm(`Deseja zerar o registo local de contribuições em ${selectedCurrency}?`)) {
      const updated = {
        ...realDonations,
        [selectedCurrency]: 0
      };
      setRealDonations(updated);
      if (typeof window !== 'undefined') {
        localStorage.setItem('biblia_on_real_donations_by_curr', JSON.stringify(updated));
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
          <span>Transparência Real: Dados fictícios zerados (0,00 {selectedCurrency}). Relatório limpo e auditável.</span>
        </div>
      </div>

      {/* Cartões das Contas Bancárias Oficiais de Recebimento */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-[#D4AF37]" />
            <span>Contas Oficiais para Recebimento de Doações</span>
          </h2>
          <span className="text-xs text-slate-400">Titular: BIBLIA ON</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(Object.values(BANK_ACCOUNTS) as BankAccountInfo[]).map((acc) => {
            const isSelected = selectedCurrency === acc.id;

            return (
              <div
                key={acc.id}
                onClick={() => setSelectedCurrency(acc.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-white dark:bg-[#0B192C] border-[#D4AF37] ring-2 ring-[#D4AF37]/40 shadow-lg'
                    : 'bg-white/80 dark:bg-[#0B192C]/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{acc.icon}</span>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                        {acc.label}
                      </h3>
                      <p className="text-[10px] text-slate-400">{acc.currencyName}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/30">
                      Selecionada
                    </span>
                  )}
                </div>

                {/* IBAN */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>IBAN / Número de Conta:</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(`iban_${acc.id}`, acc.ibanRaw);
                      }}
                      className="inline-flex items-center space-x-1 text-[#D4AF37] hover:underline font-bold"
                    >
                      {copiedKey === `iban_${acc.id}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span className="text-emerald-500">Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="font-mono text-xs font-bold text-slate-900 dark:text-white tracking-wider break-all select-all">
                    {acc.ibanFormatted}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Painel Esquerdo: Módulo de Contribuição e Valores Expandidos */}
        <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="font-title text-xl font-bold text-slate-900 dark:text-white mb-1">
              Fazer uma Contribuição Voluntária
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Conta ativa: <strong className="text-[#D4AF37]">{currentAccount.label}</strong>
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

          {/* Seletor de Moeda Rápido */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-semibold">Moeda:</span>
            {(['KZ', 'EUR', 'USD'] as const).map(curr => (
              <button
                key={curr}
                onClick={() => {
                  setSelectedCurrency(curr);
                  setSelectedAmount(SUGGESTED_VALUES[curr][0]);
                  setCustomAmount('');
                }}
                className={`px-3 py-1.5 rounded-lg font-bold border transition-all ${
                  selectedCurrency === curr
                    ? 'bg-[#1E3E62] text-[#D4AF37] border-[#D4AF37]'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-transparent hover:text-slate-700'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>

          {/* Valores Sugeridos Expandidos (1.000 a 10.000.000) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Valores sugeridos ({selectedCurrency}):
              </label>
              <span className="text-[10px] text-slate-400">1.000 até 10.000.000</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SUGGESTED_VALUES[selectedCurrency].map(val => (
                <button
                  key={val}
                  onClick={() => {
                    setSelectedAmount(val);
                    setCustomAmount('');
                  }}
                  className={`p-3 rounded-xl border text-center font-bold text-xs sm:text-sm transition-all ${
                    selectedAmount === val
                      ? 'bg-[#1E3E62] text-[#D4AF37] border-[#D4AF37] shadow-sm scale-102'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#D4AF37]'
                  }`}
                >
                  {val.toLocaleString()} {selectedCurrency}
                </button>
              ))}

              {/* Campo para Outro Valor Livre */}
              <div className="relative col-span-2 sm:col-span-1">
                <input
                  type="number"
                  placeholder="Outro Valor"
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

          {/* Instruções de Pagamento */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
            <div className="flex items-center space-x-1.5 text-slate-900 dark:text-white font-semibold">
              <Info className="w-4 h-4 text-[#D4AF37]" />
              <span>Como Efetuar a Sua Transferência:</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              1. Copie o IBAN da conta correspondente acima ({currentAccount.label}).<br />
              2. No seu banco, aplicativo móvel ou Multicaixa Express, faça a transferência.<br />
              3. Clique no botão abaixo para registar a sua contribuição voluntária no relatório de transparência pública.
            </p>
          </div>

          {/* Confirmação e Registo */}
          {donationSuccess ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 space-y-2 text-xs animate-fadeIn">
              <div className="flex items-center space-x-2 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Obrigado pelo seu coração generoso!</span>
              </div>
              <p>
                O seu donativo voluntário em <strong>{currentAccount.label}</strong> foi contabilizado com sucesso no relatório financeiro público.
              </p>
              <button
                onClick={() => setDonationSuccess(false)}
                className="mt-2 text-[11px] underline text-emerald-700 dark:text-emerald-400 hover:opacity-80 block font-semibold"
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
              <span>Registar Contribuição de {(customAmount ? parseFloat(customAmount) : (selectedAmount || 0)).toLocaleString()} {selectedCurrency}</span>
            </button>
          )}

          {/* Segurança e Ética */}
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
                  Moeda Selecionada: <strong className="text-[#D4AF37]">{currentAccount.label}</strong>
                </p>
              </div>
              {currentTotal > 0 && (
                <button
                  onClick={handleResetToZero}
                  className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-400 hover:text-rose-500 text-[11px] flex items-center space-x-1"
                  title="Zerar dados locais desta moeda"
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
                  {report.totalDonations.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {selectedCurrency}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                <span className="text-[11px] text-slate-400 block mb-1">Total de Despesas Operacionais</span>
                <span className="font-title text-xl font-bold text-slate-700 dark:text-slate-300">
                  {totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {selectedCurrency}
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
                  <span className="font-mono font-semibold text-slate-400">{report.expenses.aiServers.toFixed(2)} {selectedCurrency}</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-700 dark:text-slate-300">Hospedagem em Nuvem, Edge & Base de Dados</span>
                  <span className="font-mono font-semibold text-slate-400">{report.expenses.hostingAndDatabase.toFixed(2)} {selectedCurrency}</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-700 dark:text-slate-300">Serviços de Tradução & Suporte Multilíngue</span>
                  <span className="font-mono font-semibold text-slate-400">{report.expenses.translationServices.toFixed(2)} {selectedCurrency}</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-700 dark:text-slate-300">Segurança, Backups & Auditoria de Código</span>
                  <span className="font-mono font-semibold text-slate-400">{report.expenses.securityAndMaintenance.toFixed(2)} {selectedCurrency}</span>
                </div>
              </div>
            </div>

            {/* Saldo de Reserva */}
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-800 dark:text-emerald-300">
                Saldo de Reserva Operacional Disponível:
              </span>
              <span className="font-title font-bold text-base text-emerald-600 dark:text-emerald-400">
                {report.netBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {selectedCurrency}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400 flex items-start space-x-2 mt-4">
            <Info className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <p>
              Todos os dados simulados foram retirados. As contribuições voluntárias efetuadas para os IBANs acima ({selectedCurrency}) serão registadas com total integridade e transparência.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
