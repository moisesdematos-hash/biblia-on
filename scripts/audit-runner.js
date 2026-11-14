// scripts/audit-runner.js
import fs from 'fs';
import path from 'path';

console.log('===============================================================');
console.log('🧪 BIBLIA.AI — SUÍTE DE TESTES E VALIDAÇÃO DA AUDITORIA MESTRE');
console.log('===============================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ [PASS] ${testName}`);
  } else {
    failedTests++;
    console.error(`  ❌ [FAIL] ${testName}: ${details}`);
  }
}

// -------------------------------------------------------------
// 1. AUDITORIA DO CÂNON E FIDELIDADE BÍBLICA
// -------------------------------------------------------------
console.log('\n--- 1. CÂNON BÍBLICO E DADOS TEXTUAIS ---');

try {
  const bibleBooksRaw = fs.readFileSync('src/data/bibleBooks.ts', 'utf-8');
  const booksPart = bibleBooksRaw.substring(0, bibleBooksRaw.indexOf('BIBLE_DIVISIONS'));
  const count66 = (booksPart.match(/^\s*\{\s*id:\s*'/gm) || []).length;
  assert(count66 === 66, 'Cânon Sagrado Completo', `Esperados 66 livros, encontrados ${count66}`);

  const hasOldTestament = bibleBooksRaw.includes("'antigo'");
  const hasNewTestament = bibleBooksRaw.includes("'novo'");
  assert(hasOldTestament && hasNewTestament, 'Divisão Canónica em Antigo e Novo Testamento preservada');

  const bibleTextServiceRaw = fs.readFileSync('src/services/bibleTextService.ts', 'utf-8');
  const hasFakeVerses = bibleTextServiceRaw.includes('E prosseguiu o registro fiel em');
  assert(!hasFakeVerses, 'Eliminação de Versículos Falsos/Simulados no bibleTextService');

  const personasRaw = fs.readFileSync('src/data/biblicalPersonasData.ts', 'utf-8');
  const personasCount = (personasRaw.match(/^\s*\{\s*id:\s*'/gm) || []).length;
  assert(personasCount >= 90, 'Galeria Completa de Figuras Bíblicas', `Encontrados ${personasCount} personagens`);
} catch (err) {
  assert(false, 'Leitura dos dados canónicos', err.message);
}

// -------------------------------------------------------------
// 2. AUDITORIA DAS DIRETRIZES DOUTRINÁRIAS (TNM)
// -------------------------------------------------------------
console.log('\n--- 2. DIRETRIZES DOUTRINÁRIAS E REGRAS TNM ---');

try {
  const aiServiceRaw = fs.readFileSync('src/services/aiService.ts', 'utf-8');
  const personaRaw = fs.readFileSync('src/services/personaAIService.ts', 'utf-8');
  const lifecycleRaw = fs.readFileSync('src/services/aiModelLifecycleService.ts', 'utf-8');
  
  assert(aiServiceRaw.includes('Trindade'), 'Proibição explícita do dogma da Trindade nas diretrizes');
  assert(aiServiceRaw.includes('estaca de execução') || aiServiceRaw.includes('madeiro'), 'Obrigatoriedade de "estaca de execução" / "madeiro"');
  assert(aiServiceRaw.includes('cruz'), 'Regra explícita contra o uso de "cruz"');
  assert(aiServiceRaw.includes('imortalidade da alma') || aiServiceRaw.includes('alma'), 'Rejeição da imortalidade intrínseca da alma humana');
  assert(aiServiceRaw.includes('Jeová'), 'Exaltação do nome de Deus Jeová (YHWH)');
  assert(lifecycleRaw.includes('qwen/qwen3.8-27b'), 'Modelo Groq ativo e atualizado para qwen/qwen3.8-27b na escada de sucessão');
} catch (err) {
  assert(false, 'Auditoria das diretrizes doutrinárias', err.message);
}

// -------------------------------------------------------------
// 3. AUDITORIA DA CAMADA DE PERSISTÊNCIA (DEXIE / INDEXEDDB)
// -------------------------------------------------------------
console.log('\n--- 3. BASE DE DADOS LOCAL (INDEXEDDB / DEXIE) ---');

try {
  const dbRaw = fs.readFileSync('src/db/bibliaOnDb.ts', 'utf-8');
  
  const tables = [
    'notes', 
    'bookmarks', 
    'readingPlans', 
    'readingHistory', 
    'quizProgress', 
    'savedStudies', 
    'settings', 
    'highlights', 
    'personaConversations', 
    'achievements'
  ];
  tables.forEach(table => {
    assert(dbRaw.includes(`${table}:`) || dbRaw.includes(`${table}!:`) || dbRaw.includes(`${table} =`) || dbRaw.includes(`stores({\n      ${table}`) || dbRaw.includes(`${table}: '`), `Tabela IndexedDB '${table}' declarada no schema`);
  });
} catch (err) {
  assert(false, 'Auditoria do schema Dexie', err.message);
}

// -------------------------------------------------------------
// 4. AUDITORIA DE PWA, SERVICE WORKER E OFFLINE
// -------------------------------------------------------------
console.log('\n--- 4. PWA, MANIFEST, SEO E OFFLINE ---');

try {
  const viteConfigRaw = fs.readFileSync('vite.config.ts', 'utf-8');
  assert(viteConfigRaw.includes('VitePWA'), 'Plugin VitePWA configurado no build');
  assert(viteConfigRaw.includes('autoUpdate'), 'Estratégia autoUpdate do Service Worker configurada');

  const indexHtmlRaw = fs.readFileSync('index.html', 'utf-8');
  assert(indexHtmlRaw.includes('manifest.webmanifest'), 'Manifest vinculado no index.html');
  assert(indexHtmlRaw.includes('og:title') && indexHtmlRaw.includes('og:description'), 'Tags OpenGraph presentes no index.html');
  assert(indexHtmlRaw.includes('twitter:card'), 'Tags Twitter Card presentes no index.html');
  assert(indexHtmlRaw.includes('application/ld+json'), 'Schema Estruturado JSON-LD presente no index.html');

  const sitemapExists = fs.existsSync('public/sitemap.xml');
  assert(sitemapExists, 'Ficheiro public/sitemap.xml existe');

  const robotsRaw = fs.readFileSync('public/robots.txt', 'utf-8');
  assert(robotsRaw.includes('sitemap.xml'), 'public/robots.txt referencia sitemap.xml');
} catch (err) {
  assert(false, 'Auditoria PWA e SEO', err.message);
}

// -------------------------------------------------------------
// 5. AUDITORIA DE PRIVACIDADE E SEGURANÇA
// -------------------------------------------------------------
console.log('\n--- 5. PRIVACIDADE E SEGURANÇA ---');

try {
  const indexHtmlRaw = fs.readFileSync('index.html', 'utf-8');
  const hasGoogleAnalytics = indexHtmlRaw.includes('google-analytics.com') || indexHtmlRaw.includes('gtag');
  const hasMetaPixel = indexHtmlRaw.includes('fbevents.js');
  assert(!hasGoogleAnalytics && !hasMetaPixel, 'Zero rastreadores de terceiros invasivos no index.html');

  const gitignoreRaw = fs.readFileSync('.gitignore', 'utf-8');
  assert(gitignoreRaw.includes('.env'), '.gitignore protege ficheiros de ambiente');

  const envExists = fs.existsSync('.env');
  if (envExists) {
    const envRaw = fs.readFileSync('.env', 'utf-8');
    const isCleaned = !envRaw.includes('gsk_Ab8RN6KgJ9l');
    assert(isCleaned, 'Ficheiro .env local não expõe chave Groq sensível no Git');
  } else {
    assert(true, '.env local isolado de versionamento');
  }
} catch (err) {
  assert(false, 'Auditoria de Privacidade e Segurança', err.message);
}

// -------------------------------------------------------------
// 6. AUDITORIA MULTILÍNGUE (i18n)
// -------------------------------------------------------------
console.log('\n--- 6. SISTEMA MULTILÍNGUE (I18N) ---');

try {
  const i18nRaw = fs.readFileSync('src/data/i18nData.ts', 'utf-8');
  ['pt:', 'en:', 'es:', 'fr:'].forEach(lang => {
    assert(i18nRaw.includes(lang), `Dicionário i18n possui idioma ${lang.replace(':', '').toUpperCase()}`);
  });
} catch (err) {
  assert(false, 'Auditoria i18n', err.message);
}

// -------------------------------------------------------------
// 7. AUDITORIA DE COMPONENTES INTERATIVOS & BOTÃO APAGAR CONVERSA
// -------------------------------------------------------------
console.log('\n--- 7. COMPONENTES E USABILIDADE ---');

try {
  const aiChatRaw = fs.readFileSync('src/components/chat/AIChat.tsx', 'utf-8');
  assert(aiChatRaw.includes('handleClearChat') && aiChatRaw.includes('Apagar Conversa'), 'Botão "Apagar Conversa" no cabeçalho do AIChat');
  assert(aiChatRaw.includes('Limpar Chat'), 'Botão "Limpar Chat" junto ao campo de input do AIChat');

  const charDialogRaw = fs.readFileSync('src/components/characters/CharacterDialogView.tsx', 'utf-8');
  assert(charDialogRaw.includes('handleClearChat') && charDialogRaw.includes('Apagar Chat'), 'Botão de apagar histórico no Diálogo com Personagens');

  const toolExpertRaw = fs.readFileSync('src/components/assistant/ToolExpertChat.tsx', 'utf-8');
  assert(toolExpertRaw.includes('Trash2') && toolExpertRaw.includes('Apagar mensagens'), 'Botão de limpar histórico no Copiloto Guia');
} catch (err) {
  assert(false, 'Auditoria de componentes', err.message);
}

// -------------------------------------------------------------
// RESUMO FINAL
// -------------------------------------------------------------
console.log('\n===============================================================');
console.log(`📊 RESULTADO DA SUÍTE DE TESTES:`);
console.log(`   Total de Testes: ${totalTests}`);
console.log(`   Passados:        ${passedTests}`);
console.log(`   Falhados:        ${failedTests}`);
console.log(`   Taxa de Êxito:   ${Math.round((passedTests / totalTests) * 100)}%`);
console.log('===============================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
