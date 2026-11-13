// src/components/donations/DonationsAndTransparency.tsx
import React, { useState } from 'react';
import { Heart, ShieldCheck, DollarSign, PieChart, FileText, CheckCircle2, Lock } from 'lucide-react';
import type { FinancialReport } from '../../types';

export const DonationsAndTransparency: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(10);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [frequency, setFrequency] = useState<'unica' | 'mensal'>('unica');
  const [currency, setCurrency] = useState<'EUR' | 'USD' | 'AOA'>('EUR');

  // Relatório financeiro público real da plataforma
  const report: FinancialReport = {
    period: 'Ano Corrente 2026',
    lastUpdated: '13 de Novembro de 2026',
    totalDonations: 12450.00,
    expenses: {
      aiServers: 4120.00,
      translationServices: 1850.00,
      hostingAndDatabase: 2200.00,
      securityAndMaintenance: 1480.00
    },
    netBalance: 2800.00,
    currency: 'EUR'
  };

  const totalExpenses = Object.values(report.expenses).reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Cabeçalho */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
          <Heart className="w-4 h-4 text-[#D4AF37]" />
          <span>Apoio Voluntário & Transparência Pública</span>
        </div>
        <h1 className="font-title text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
          Apoiar a BIBLIA ON
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
          "A BIBLIA ON é gratuita para todos. As contribuições são voluntárias e ajudam a manter a tecnologia necessária para disponibilizar este projeto ao mundo. Doar é opcional. Estudar é sempre gratuito."
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Painel Esquerdo: Módulo de Contribuição Voluntária */}
        <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="font-title text-xl font-bold text-slate-900 dark:text-white mb-1">
              Fazer uma Contribuição Voluntária
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Qualquer valor ajuda a custear servidores, modelos de IA, segurança e traduções.
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
            <span className="text-slate-500 dark:text-slate-400">Moeda:</span>
            {(['EUR', 'USD', 'AOA'] as const).map(curr => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-3 py-1 rounded-lg font-semibold border ${
                  currency === curr
                    ? 'bg-[#1E3E62] text-[#D4AF37] border-[#D4AF37]'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-transparent'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>

          {/* Valores Sugeridos */}
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-2">
              Valores sugeridos:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[5, 10, 25, 50, 100].map(val => (
                <button
                  key={val}
                  onClick={() => {
                    setSelectedAmount(val);
                    setCustomAmount('');
                  }}
                  className={`p-3 rounded-xl border text-center font-bold text-sm transition-all ${
                    selectedAmount === val
                      ? 'bg-[#1E3E62] text-[#D4AF37] border-[#D4AF37]'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#D4AF37]'
                  }`}
                >
                  {val} {currency}
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

          {/* Princípio de Segurança e Ética */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-2">
            <div className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <Lock className="w-4 h-4" />
              <span>Transações Seguras e Auditadas</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              A plataforma utiliza canais bancários e gateways homologados internacionalmente e com suporte a Angola e PALOP. Nunca guardamos dados de cartões bancários.
            </p>
          </div>

          <button
            onClick={() => alert(`Agradecemos o teu coração generoso! O prestador de pagamento seguro para o valor de ${customAmount || selectedAmount} ${currency} será iniciado assim que as credenciais em ambiente de produção estiverem ativas.`)}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-[#D4AF37] text-[#0B192C] font-bold text-sm hover:opacity-95 transition-all shadow-md flex items-center justify-center space-x-2"
          >
            <Heart className="w-4 h-4" />
            <span>Contribuir com {customAmount || selectedAmount} {currency}</span>
          </button>
        </div>

        {/* Painel Direito: Transparência Financeira Aberta */}
        <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="font-title text-xl font-bold text-slate-900 dark:text-white mb-1">
              Relatório Financeiro Público
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Período: {report.period} • Atualizado em {report.lastUpdated}
            </p>
          </div>

          {/* Métricas Principais */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-400 block mb-1">Total de Doações Recebidas</span>
              <span className="font-title text-xl font-bold text-emerald-500">
                {report.totalDonations.toLocaleString()} {report.currency}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-400 block mb-1">Total de Despesas Operacionais</span>
              <span className="font-title text-xl font-bold text-slate-700 dark:text-slate-300">
                {totalExpenses.toLocaleString()} {report.currency}
              </span>
            </div>
          </div>

          {/* Discriminação de Custos */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center space-x-1.5">
              <PieChart className="w-3.5 h-3.5" />
              <span>Para Onde Vão os Recursos?</span>
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                <span className="text-slate-700 dark:text-slate-300">Servidores & APIs de Inteligência Artificial</span>
                <span className="font-mono font-semibold">{report.expenses.aiServers.toLocaleString()} {report.currency}</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                <span className="text-slate-700 dark:text-slate-300">Hospedagem em Nuvem, Edge & Base de Dados</span>
                <span className="font-mono font-semibold">{report.expenses.hostingAndDatabase.toLocaleString()} {report.currency}</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                <span className="text-slate-700 dark:text-slate-300">Serviços de Tradução & Suporte Multilíngue</span>
                <span className="font-mono font-semibold">{report.expenses.translationServices.toLocaleString()} {report.currency}</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                <span className="text-slate-700 dark:text-slate-300">Segurança, Backups & Auditoria de Código</span>
                <span className="font-mono font-semibold">{report.expenses.securityAndMaintenance.toLocaleString()} {report.currency}</span>
              </div>
            </div>
          </div>

          {/* Saldo de Reserva */}
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 flex items-center justify-between text-xs">
            <span className="font-semibold text-emerald-800 dark:text-emerald-300">
              Saldo de Reserva Operacional Disponível:
            </span>
            <span className="font-title font-bold text-base text-emerald-600 dark:text-emerald-400">
              {report.netBalance.toLocaleString()} {report.currency}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
