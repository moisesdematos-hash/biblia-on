// src/components/study/VerseCardGeneratorModal.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Download, Copy, Check, Sparkles, X, Image as ImageIcon, Share2 } from 'lucide-react';
import type { BibleVerse } from '../../types';

interface VerseCardGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  verse: BibleVerse;
}

type ThemeOption = 'ouro_azul' | 'pergaminho' | 'noite_estrelada' | 'alvorada_sinai';

export const VerseCardGeneratorModal: React.FC<VerseCardGeneratorModalProps> = ({
  isOpen,
  onClose,
  verse
}) => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>('ouro_azul');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1080;
    const height = 1080;
    canvas.width = width;
    canvas.height = height;

    // Fundo segundo o tema
    if (selectedTheme === 'ouro_azul') {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#0B192C');
      grad.addColorStop(0.5, '#1E3E62');
      grad.addColorStop(1, '#051121');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Borda dourada
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 14;
      ctx.strokeRect(40, 40, width - 80, height - 80);

      // Moldura interna sutil
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
      ctx.lineWidth = 2;
      ctx.strokeRect(60, 60, width - 120, height - 120);
    } else if (selectedTheme === 'pergaminho') {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#F5EEDA');
      grad.addColorStop(1, '#E2D5BA');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = '#8B5A2B';
      ctx.lineWidth = 14;
      ctx.strokeRect(40, 40, width - 80, height - 80);
    } else if (selectedTheme === 'noite_estrelada') {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#090D16');
      grad.addColorStop(1, '#1A2238');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Pequenas estrelas
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      for (let i = 0; i < 70; i++) {
        const x = (i * 137) % width;
        const y = (i * 249) % height;
        const r = (i % 3) + 1;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.strokeStyle = '#93C5FD';
      ctx.lineWidth = 10;
      ctx.strokeRect(40, 40, width - 80, height - 80);
    } else {
      // Alvorada Sinai
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#2D1537');
      grad.addColorStop(0.5, '#78281F');
      grad.addColorStop(1, '#B9770E');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = '#FDE047';
      ctx.lineWidth = 12;
      ctx.strokeRect(40, 40, width - 80, height - 80);
    }

    // Marca d'água / Logo superior
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = selectedTheme === 'pergaminho' ? '#8B5A2B' : '#D4AF37';
    ctx.letterSpacing = '6px';
    ctx.fillText('B Í B L I A   O N', width / 2, 140);

    // Aspas de abertura
    ctx.font = 'italic bold 110px serif';
    ctx.fillStyle = selectedTheme === 'pergaminho' ? 'rgba(139, 90, 43, 0.25)' : 'rgba(212, 175, 55, 0.25)';
    ctx.fillText('“', width / 2, 280);

    // Texto do Versículo com quebra de linha inteligente
    const textColor = selectedTheme === 'pergaminho' ? '#2D1B00' : '#FFFFFF';
    ctx.fillStyle = textColor;
    ctx.font = '36px serif';
    ctx.letterSpacing = '0px';

    const words = verse.text.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    const maxWidth = width - 240;

    words.forEach(w => {
      const testLine = currentLine ? `${currentLine} ${w}` : w;
      const testWidth = ctx.measureText(testLine).width;
      if (testWidth > maxWidth) {
        lines.push(currentLine);
        currentLine = w;
      } else {
        currentLine = testLine;
      }
    });
    if (currentLine) lines.push(currentLine);

    // Centralizar verticalmente o texto
    const lineHeight = 56;
    const startY = 540 - ((lines.length * lineHeight) / 2);

    lines.forEach((line, idx) => {
      ctx.fillText(line, width / 2, startY + (idx * lineHeight));
    });

    // Referência Bíblica
    const refColor = selectedTheme === 'pergaminho' ? '#8B5A2B' : '#D4AF37';
    ctx.fillStyle = refColor;
    ctx.font = 'bold 40px sans-serif';
    ctx.fillText(`${verse.bookName} ${verse.chapter}:${verse.verse}`, width / 2, 860);

    // Tradução
    ctx.fillStyle = selectedTheme === 'pergaminho' ? '#785A3A' : '#94A3B8';
    ctx.font = '22px sans-serif';
    ctx.fillText('Tradução do Novo Mundo de Estudo', width / 2, 910);
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(drawCard, 50);
    }
  }, [isOpen, selectedTheme, verse]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `biblia-on-${verse.bookName}-${verse.chapter}-${verse.verse}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleCopyImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } catch {
      // Fallback
      handleDownload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 flex flex-col max-h-[92vh] overflow-y-auto">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-title font-bold text-slate-900 dark:text-white">
                Gerador de Card para Partilha
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {verse.bookName} {verse.chapter}:{verse.verse} em imagem artística de alta resolução
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pré-visualização do Canvas */}
        <div className="flex justify-center items-center bg-slate-950 p-3 rounded-2xl border border-slate-800 overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full max-w-[340px] aspect-square rounded-xl shadow-2xl object-contain"
          />
        </div>

        {/* Seleção de Temas */}
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Escolha o Estilo Visual:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'ouro_azul', label: 'Azul & Ouro', bg: 'bg-[#1E3E62] text-amber-300' },
              { id: 'pergaminho', label: 'Pergaminho', bg: 'bg-[#E2D5BA] text-amber-900' },
              { id: 'noite_estrelada', label: 'Céu Noturno', bg: 'bg-[#090D16] text-blue-200' },
              { id: 'alvorada_sinai', label: 'Alvorada Sinai', bg: 'bg-[#78281F] text-amber-100' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTheme(t.id as ThemeOption)}
                className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${t.bg} ${
                  selectedTheme === t.id
                    ? 'ring-2 ring-[#D4AF37] border-white shadow-md scale-102'
                    : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleDownload}
            className="flex-1 py-3 px-4 rounded-xl bg-[#1E3E62] hover:bg-[#28507d] text-[#D4AF37] font-semibold text-xs flex items-center justify-center space-x-2 border border-[#D4AF37]/50 shadow-md transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Descarregar Imagem PNG</span>
          </button>

          <button
            onClick={handleCopyImage}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-xs flex items-center justify-center space-x-2 border border-slate-300 dark:border-slate-700 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copiada para a Área de Transferência!' : 'Copiar Imagem'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
