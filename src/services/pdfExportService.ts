// src/services/pdfExportService.ts
import { db } from '../db/bibliaOnDb';

export const pdfExportService = {
  async generateStudyReport(): Promise<void> {
    const [notes, bookmarks, highlights, lastRead] = await Promise.all([
      db.notes.toArray(),
      db.bookmarks.toArray(),
      db.highlights.toArray(),
      db.readingHistory.orderBy('timestamp').reverse().limit(10).toArray()
    ]);

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Por favor permita janelas pop-up para gerar o relatório impresso/PDF.');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="pt">
      <head>
        <meta charset="UTF-8">
        <title>BIBLIA ON — Caderno de Estudos Bíblicos</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
            color: #1e293b;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
          }
          .header {
            border-bottom: 2px solid #D4AF37;
            padding-bottom: 20px;
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .title {
            color: #0B192C;
            font-size: 26px;
            font-weight: bold;
            margin: 0;
          }
          .subtitle {
            color: #64748b;
            font-size: 13px;
          }
          .section {
            margin-bottom: 30px;
          }
          .section-title {
            color: #1E3E62;
            font-size: 16px;
            font-weight: bold;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 6px;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .item {
            background-color: #f8fafc;
            border-left: 4px solid #D4AF37;
            padding: 12px 16px;
            margin-bottom: 10px;
            border-radius: 4px;
          }
          .item-ref {
            font-weight: bold;
            color: #0f172a;
            font-size: 14px;
          }
          .item-content {
            font-size: 13px;
            color: #334155;
            margin-top: 4px;
          }
          .footer {
            margin-top: 50px;
            border-top: 1px solid #e2e8f0;
            padding-top: 15px;
            font-size: 11px;
            color: #94a3b8;
            text-align: center;
          }
          @media print {
            body { padding: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1 class="title">BÍBLIA ON</h1>
            <div class="subtitle">Relatório Consolidado de Estudo Pessoal das Escrituras Sagradas</div>
          </div>
          <div style="text-align: right; font-size: 12px; color: #64748b;">
            Data: ${new Date().toLocaleDateString('pt-PT')}<br>
            Tradução: TNM de Estudo
          </div>
        </div>

        <div class="section">
          <div class="section-title">Anotações Pessoais de Estudo (${notes.length})</div>
          ${notes.length === 0 ? '<p style="font-size: 12px; color: #94a3b8;">Nenhuma anotação registrada ainda.</p>' : ''}
          ${notes.map(n => `
            <div class="item">
              <div class="item-ref">${n.reference}</div>
              <div class="item-content">${n.content}</div>
              <div style="font-size: 10px; color: #94a3b8; margin-top: 4px;">Registado em: ${new Date(n.createdAt).toLocaleDateString('pt-PT')}</div>
            </div>
          `).join('')}
        </div>

        <div class="section">
          <div class="section-title">Versículos Marcados nos Favoritos (${bookmarks.length})</div>
          ${bookmarks.length === 0 ? '<p style="font-size: 12px; color: #94a3b8;">Nenhum versículo nos favoritos.</p>' : ''}
          ${bookmarks.map(b => `
            <div class="item" style="border-left-color: #3b82f6;">
              <div class="item-ref">${b.reference}</div>
            </div>
          `).join('')}
        </div>

        <div class="section">
          <div class="section-title">Destaques com Cores Semânticas (${highlights.length})</div>
          ${highlights.length === 0 ? '<p style="font-size: 12px; color: #94a3b8;">Nenhum destaque colorido registrado.</p>' : ''}
          ${highlights.map(h => `
            <div class="item" style="border-left-color: ${h.color === 'yellow' ? '#f59e0b' : h.color === 'green' ? '#10b981' : h.color === 'blue' ? '#0ea5e9' : h.color === 'red' ? '#f43f5e' : '#a855f7'};">
              <div class="item-ref">${h.reference} — <span style="font-size: 11px; font-weight: normal; color: #64748b;">${h.meaningLabel || h.color}</span></div>
            </div>
          `).join('')}
        </div>

        <div class="footer">
          Documento gerado por BIBLIA ON — O Conhecimento Bíblico ao alcance de todos. "A tua palavra é a verdade." (João 17:17)
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  }
};
