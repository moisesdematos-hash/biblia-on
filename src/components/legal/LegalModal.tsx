// src/components/legal/LegalModal.tsx
import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  HelpCircle, 
  BookOpen, 
  Lock, 
  CheckCircle2, 
  Sparkles,
  ExternalLink,
  Heart
} from 'lucide-react';

export type LegalTab = 'termos' | 'privacidade' | 'faq' | 'documentacao';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTab;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'termos'
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0B192C] border-2 border-[#D4AF37]/50 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden text-slate-900 dark:text-slate-100 animate-in zoom-in-95 duration-200">
        
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#1E3E62]/40 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1E3E62] to-[#0B192C] p-1.5 border border-[#D4AF37]/50 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h2 className="font-title text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Centro de Transparência & Conformidade
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                BIBLIA ON — Documentação Oficial, Ética, Privacidade & Termos
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Abas de Navegação */}
        <div className="flex items-center space-x-1 px-6 pt-3 pb-2 border-b border-slate-200 dark:border-slate-800/80 bg-slate-100/60 dark:bg-[#0B192C]/80 overflow-x-auto scrollbar-thin shrink-0">
          {[
            { id: 'termos' as LegalTab, label: 'Termos de Uso', icon: FileText },
            { id: 'privacidade' as LegalTab, label: 'Política de Privacidade', icon: Lock },
            { id: 'faq' as LegalTab, label: 'Perguntas Frequentes (FAQ)', icon: HelpCircle },
            { id: 'documentacao' as LegalTab, label: 'Documentação & Cânon', icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1E3E62] text-[#D4AF37] border border-[#D4AF37]/50 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D4AF37]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Conteúdo com Scroll */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm leading-relaxed scrollbar-thin">
          
          {/* ========================================================================= */}
          {/* ABA 1: TERMOS DE USO */}
          {/* ========================================================================= */}
          {activeTab === 'termos' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-[#D4AF37]/30 text-xs">
                <strong className="text-[#D4AF37] block font-semibold mb-1">
                  Princípio Institucional Inegociável:
                </strong>
                "A BIBLIA ON é 100% gratuita para todas as pessoas em qualquer lugar do mundo. Não há assinaturas, não há anúncios, não há comercialização de textos sagrados nem cobrança por acesso ao conhecimento bíblico."
              </div>

              <section className="space-y-2">
                <h3 className="font-title font-bold text-base text-[#D4AF37]">1. Objeto e Propósito da Plataforma</h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                  A <strong>BIBLIA ON</strong> é uma plataforma independente de tecnologia educacional, pesquisa teológica e exegese bíblica rigorosa. O seu propósito primordial é democratizar o acesso às Escrituras Sagradas, integrando ferramentas de inteligência artificial alinhadas ao texto bíblico, léxicos interlineares das línguas originais (hebraico, aramaico e grego), mapas históricos e módulos pedagógicos.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-title font-bold text-base text-[#D4AF37]">2. Fidelidade ao Texto e Rigor Canônico</h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                  A plataforma adota como texto base a <em>Tradução do Novo Mundo das Escrituras Sagradas com Notas e Referências</em>, complementada por comparações com outras traduções históricas reconhecidas (como a Almeida Revista e Corrigida e a King James Version). Todas as consultas e interações de inteligência artificial respeitam o cânon fechado de 66 livros inspirados, rejeitando apócrifos e interpolações dogmáticas tardias.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-title font-bold text-base text-[#D4AF37]">3. Natureza dos Diálogos com Personagens Bíblicos</h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                  O módulo de conversação com personagens bíblicos e representações históricas é um recurso de dramatização educativa e exegética fundamentado exclusivamente no testemunho bíblico. As respostas são geradas respeitando o tom, as palavras exatas, a personalidade canônica e o contexto histórico de cada figura, sem atribuir revelações extrabíblicas nem contradizer a teologia revelada nas Escrituras.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-title font-bold text-base text-[#D4AF37]">4. Isenção Comercial e Doações Voluntárias</h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                  Nenhuma funcionalidade requer ou jamais requererá pagamento. A futura aceitação de contribuições voluntárias (atualmente em estado de homologação e indicada como <strong>BREVEMENTE</strong>) terá como única finalidade o custeio de servidores de alta velocidade, largura de banda PWA e APIs públicas de processamento sem qualquer intuito lucrativo.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-title font-bold text-base text-[#D4AF37]">5. Propriedade Intelectual e Uso Pessoal</h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                  O utilizador tem o direito de utilizar todo o material disponibilizado para o seu estudo pessoal, ensino familiar e pregação bíblica sem custos ou taxas de licenciamento.
                </p>
              </section>
            </div>
          )}

          {/* ========================================================================= */}
          {/* ABA 2: POLÍTICA DE PRIVACIDADE */}
          {/* ========================================================================= */}
          {activeTab === 'privacidade' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
                <strong className="block font-semibold mb-1 text-emerald-400">
                  Compromisso Máximo com a Sua Privacidade:
                </strong>
                "Não registamos os seus dados pessoais, não criamos perfis comportamentais religiosos, não vendemos informações a terceiros e não utilizamos cookies de rastreamento publicitário."
              </div>

              <section className="space-y-2">
                <h3 className="font-title font-bold text-base text-emerald-400">1. Armazenamento 100% Local (IndexedDB & LocalStorage)</h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                  Todas as suas anotações pessoais, versículos favoritos, histórico de leitura diária, progresso nos planos e estatísticas do Arcade ficam guardados <strong>exclusivamente no seu próprio dispositivo</strong>, através das bases de dados locais seguras do seu navegador (IndexedDB / LocalStorage). A equipa da BIBLIA ON não tem acesso nem armazena as suas notas pessoais.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-title font-bold text-base text-emerald-400">2. Segurança de Chaves de Inteligência Artificial</h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                  Quando configura uma chave de API gratuita pessoal (ex: Google Gemini ou Groq Cloud), essa chave é criptografada e salva apenas no seu navegador. As requisições de chat são enviadas diretamente do seu dispositivo para os servidores dos provedores oficiais através de conexões HTTPS encriptadas, sem passar por servidores intermediários da BIBLIA ON.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-title font-bold text-base text-emerald-400">3. Contador de Pessoas Online Anónimo</h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                  O contador de pessoas online em tempo real utiliza um identificador efêmero e aleatório gerado em cada aba aberta (sessão volátil) com sincronização em memória. Não recolhe endereços IP, geolocalização por GPS nem dados identificáveis. Ao fechar a aba, a contagem é reduzida automaticamente.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-title font-bold text-base text-emerald-400">4. Exportação e Eliminação Instantânea de Dados</h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                  No módulo <strong>Biblioteca Pessoal</strong>, o utilizador pode a qualquer momento fazer o download de um arquivo JSON completo com todas as suas notas e marcações, ou clicar no botão de destruição segura para eliminar irreversivelmente todos os vestígios da sua atividade no dispositivo.
                </p>
              </section>
            </div>
          )}

          {/* ========================================================================= */}
          {/* ABA 3: PERGUNTAS FREQUENTES (FAQ) */}
          {/* ========================================================================= */}
          {activeTab === 'faq' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {[
                {
                  q: 'A BIBLIA ON é verdadeiramente 100% gratuita?',
                  a: 'Sim, totalmente. Não existem assinaturas premium, paywalls nem funcionalidades bloqueadas. O nosso estatuto fundamental define que estudar a Palavra de Deus deve ser sempre livre e acessível a qualquer ser humano.'
                },
                {
                  q: 'Como funciona a conversa com Jesus e os Personagens Bíblicos?',
                  a: 'Através de modelos de linguagem de ponta configurados com diretrizes teológicas rigorosas (guardrails doutrinários). Cada personagem responde em primeira pessoa com fidelidade aos manuscritos sagrados, usando a linguagem, a história e os fatos canônicos registados na Bíblia.'
                },
                {
                  q: 'Porque é que o botão "Apoiar" está marcado como BREVEMENTE?',
                  a: 'As contas bancárias oficiais (em KZ, EUR e USD) estão em fase final de homologação técnica e auditoria institucional para garantir total transparência antes do recebimento de qualquer contribuição voluntária.'
                },
                {
                  q: 'A aplicação funciona sem ligação à Internet (Offline)?',
                  a: 'Sim! A BIBLIA ON foi desenvolvida como uma Progressive Web App (PWA). Uma vez carregada pela primeira vez, os 66 livros da Bíblia, notas de estudo, mapas vetoriais e jogos de Arcade ficam em cache local e funcionam perfeitamente mesmo em modo avião ou sem sinal.'
                },
                {
                  q: 'Qual é a tradução bíblica de referência principal?',
                  a: 'A Tradução do Novo Mundo das Escrituras Sagradas (Edição de Estudo), reconhecida pela sua fidelidade aos manuscritos hebraicos, aramaicos e gregos mais antigos, incluindo o restabelecimento do nome divino Jeová (Tetragrama YHWH) nos seus devidos lugares.'
                },
                {
                  q: 'Posso usar a ferramenta para estudo em família e ensino bíblico?',
                  a: 'Sim. A BIBLIA ON oferece o Professor Adaptativo, Planos de Leitura, Arcade Bíblico com 13 jogos interactivos e ferramentas de pesquisa profunda ideais para noites de adoração em família e estudo individual.'
                }
              ].map((faq, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1E3E62]/40 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
                  <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm flex items-center space-x-2">
                    <span className="text-[#D4AF37] font-bold">Q{i + 1}.</span>
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 text-xs pl-5 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* ========================================================================= */}
          {/* ABA 4: DOCUMENTAÇÃO & CÂNON */}
          {/* ========================================================================= */}
          {activeTab === 'documentacao' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-300">
                <strong className="block font-semibold mb-1 text-purple-400">
                  Estrutura Teológica e Canônica Canônica:
                </strong>
                66 Livros Inspirados • Antigo Testamento (Escrituras Hebraico-Aramaicas) • Novo Testamento (Escrituras Gregas Cristãs) • Códices de Leningrado, Aleppo e Manuscritos de Qumran.
              </div>

              <section className="space-y-2">
                <h3 className="font-title font-bold text-base text-purple-400">1. O Cânon das Escrituras Sagradas</h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                  A Bíblia compõe-se de 66 livros divinamente inspirados, divididos harmoniosamente entre as Escrituras Hebraico-Aramaicas (39 livros, de Gênesis a Malaquias) e as Escrituras Gregas Cristãs (27 livros, de Mateus a Apocalipse). Toda a compilação aponta para o tema supremo: a vindicação da soberania de Jeová Deus através do Seu Reino messiânico sob Cristo Jesus.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-title font-bold text-base text-purple-400">2. Termos Originais & Exegese Linguística</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1E3E62]/60 border border-slate-200 dark:border-slate-700">
                    <strong className="text-[#D4AF37] block font-mono">YHWH (יהוה) — Jeová</strong>
                    <span className="text-slate-400">O nome pessoal do Deus Todo-Poderoso, ocorrendo cerca de 7.000 vezes nos manuscritos originais.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1E3E62]/60 border border-slate-200 dark:border-slate-700">
                    <strong className="text-[#D4AF37] block font-mono">Staurós (σταυρός) — Estaca de Execução</strong>
                    <span className="text-slate-400">Um poste reto ou madeiro simples, sem travessas, onde Jesus entregou a sua vida como resgate.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1E3E62]/60 border border-slate-200 dark:border-slate-700">
                    <strong className="text-[#D4AF37] block font-mono">Néphesh / Psykhē (נֶפֶשׁ / ψυχή) — Alma</strong>
                    <span className="text-slate-400">A pessoa viva, o animal ou a vida em si, sujeita à morte física (Ezequiel 18:4).</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1E3E62]/60 border border-slate-200 dark:border-slate-700">
                    <strong className="text-[#D4AF37] block font-mono">Sheol / Hades (שְׁאוֹל / ᾅδης) — Sepultura Comum</strong>
                    <span className="text-slate-400">O estado inconsciente de descanso dos mortos à espera da ressurreição na Terra prometida.</span>
                  </div>
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="font-title font-bold text-base text-purple-400">3. Tecnologia e Arquitetura PWA</h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                  A plataforma foi construída com tecnologia moderna de ponta (React 19, TypeScript, Tailwind CSS v4, Dexie IndexedDB e Workbox PWA Service Worker), proporcionando carregamento ultra-rápido, resiliência total a falhas de rede e portabilidade para qualquer tela.
                </p>
              </section>
            </div>
          )}

        </div>

        {/* Rodapé do Modal */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#1E3E62]/40 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span className="text-[11px]">BIBLIA ON • Documento Oficial Registado</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#1E3E62] hover:bg-[#2A4F77] text-[#D4AF37] font-bold text-xs border border-[#D4AF37]/50 transition-colors cursor-pointer"
          >
            Compreendido & Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
