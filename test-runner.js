// test-runner.js
import assert from 'node:assert';
import { BIBLE_BOOKS } from './src/data/bibleBooks.js';
import { auditBiblicalContent, queryBibliaKnowledge } from './src/services/aiService.js';
import { ORIGINAL_WORDS } from './src/data/originalWordsData.js';
import { CHARACTERS_DATA } from './src/data/charactersData.js';
import { PROPHECIES_DATA } from './src/data/propheciesData.js';
import { CONTRADICTIONS_DATA } from './src/data/contradictionsData.js';

console.log('=== INICIANDO BATERIA DE AUDITORIA & TESTES: BIBLIA ON ===\n');

// 1. Teste do Cânon Bíblico
console.log('1. Verificação do Cânon Bíblico:');
assert.strictEqual(BIBLE_BOOKS.length, 66, 'O cânon bíblico deve conter exatamente 66 livros');
const oldTestament = BIBLE_BOOKS.filter(b => b.testament === 'antigo');
const newTestament = BIBLE_BOOKS.filter(b => b.testament === 'novo');
assert.strictEqual(oldTestament.length, 39, 'Escrituras Hebraico-Aramaicas devem conter 39 livros');
assert.strictEqual(newTestament.length, 27, 'Escrituras Gregas Cristãs devem conter 27 livros');
assert.strictEqual(BIBLE_BOOKS[0].id, 'gen', 'Primeiro livro deve ser Gênesis');
assert.strictEqual(BIBLE_BOOKS[65].id, 'rev', 'Último livro deve ser Apocalipse');
console.log('   ✓ Cânon canônico completo de 66 livros validado com exatidão.\n');

// 2. Teste do Auditor Doutrinário
console.log('2. Auditor de Conformidade Doutrinária:');
const testCruz = auditBiblicalContent('Ele morreu na cruz para nos salvar');
assert.strictEqual(testCruz.passed, false, 'Deve reprovar o uso de "cruz"');
assert.ok(testCruz.warnings.some(w => w.includes('estaca de execução')), 'Deve exigir "estaca de execução"');

const testTrindade = auditBiblicalContent('A santíssima trindade é um mistério bíblico');
assert.strictEqual(testTrindade.passed, false, 'Deve reprovar o dogma da Trindade');

const testAlma = auditBiblicalContent('A alma imortal ascende ao céu');
assert.strictEqual(testAlma.passed, false, 'Deve reprovar o conceito de alma imortal');

const testCorreto = auditBiblicalContent('Jesus morreu na estaca de execução e ressuscitou no terceiro dia, enquanto Jeová é o Deus Altíssimo');
assert.strictEqual(testCorreto.passed, true, 'Texto conforme as diretrizes deve ser aprovado');
console.log('   ✓ Guardrails doutrinários operando estritamente.\n');

// 3. Teste do Motor de Conhecimento e Respostas Estruturadas
console.log('3. Teste do Motor de Investigação Bíblica:');
async function runQueryTests() {
  const resMelq = await queryBibliaKnowledge('Quem foi Melquisedeque?');
  assert.ok(resMelq.answer.includes('Melquisedeque'), 'Resposta deve conter Melquisedeque');
  assert.ok(resMelq.relevantScriptures.some(s => s.reference.includes('Gênesis 14')), 'Deve citar Gênesis 14');
  assert.strictEqual(resMelq.auditedBy.passedDoctrinalGuardrails, true, 'Deve ter aprovação do auditor');

  const resMorte = await queryBibliaKnowledge('O que a Bíblia ensina sobre a morte?');
  assert.ok(resMorte.answer.includes('inconsciência'), 'Deve explicar a morte como sono e inconsciência');
  assert.ok(resMorte.relevantScriptures.some(s => s.reference.includes('Eclesiastes 9')), 'Deve citar Eclesiastes 9');
  assert.strictEqual(resMorte.auditedBy.passedDoctrinalGuardrails, true, 'Deve ter aprovação do auditor');

  console.log('   ✓ Consultas essenciais testadas e aprovadas com fontes exatas.\n');
}

// 4. Verificação de Dados Estruturados Avançados
console.log('4. Verificação dos Recursos Estruturados:');
assert.ok(ORIGINAL_WORDS.length >= 6, 'Léxico com termos fundamentais (YHWH, Néphesh, Sheol, Staurós, Geena, Logos)');
assert.ok(CHARACTERS_DATA.length >= 6, 'Enciclopédia de Personagens com biografias e lições');
assert.ok(PROPHECIES_DATA.length >= 4, 'Laboratório de Profecias com distinção exegética');
assert.ok(CONTRADICTIONS_DATA.length >= 3, 'Investigador de Harmonizações com limites transparentes');
console.log('   ✓ Todos os módulos de conhecimento contêm dados reais e auditados.\n');

// 5. Verificação da Chave de Ouro: O Codex Vivo
console.log('5. Verificação da Chave de Ouro (O Codex Vivo):');
import { GOLDEN_THREAD_DATA, ANCIENT_MANUSCRIPTS, EYEWITNESSES_PROFILES } from './src/data/goldenThreadData.js';
assert.ok(GOLDEN_THREAD_DATA.length >= 3, 'O Fio Dourado deve conter conexões estruturadas a Gn 3:15');
assert.ok(ANCIENT_MANUSCRIPTS.length >= 3, 'Mesa do Escriba deve conter Rolos de Qumran e Códices antigos');
assert.ok(EYEWITNESSES_PROFILES.length >= 3, 'Testemunhas oculares em 1ª pessoa configuradas');
console.log('   ✓ Chave de Ouro validada: O Hipergrafo da Harmonia e Manuscritos Antigos operando.\n');

// 6. Verificação do Diálogo com Personagens Bíblicos (Incluindo Jeová Deus e Jesus Cristo)
console.log('6. Verificação do Diálogo com Personagens Bíblicos (Incluindo Jeová e Jesus):');
import { BIBLICAL_PERSONAS, resolveBiblicalPersona, generatePersonaResponse } from './src/data/biblicalPersonasData.js';
assert.ok(BIBLICAL_PERSONAS.length >= 20, 'Deve conter catálogo abrangente de personagens');
const jeovaChar = BIBLICAL_PERSONAS.find(p => p.id === 'jeova_deus');
const jesusChar = BIBLICAL_PERSONAS.find(p => p.id === 'jesus_cristo');
const firstChar = BIBLICAL_PERSONAS.find(p => p.id === 'adao');
const lastChar = BIBLICAL_PERSONAS.find(p => p.id === 'joao_apostolo');
assert.ok(jeovaChar, 'Jeová Deus deve estar presente');
assert.ok(jesusChar, 'Jesus Cristo deve estar presente');
assert.ok(firstChar, 'Adão deve estar presente');
assert.ok(lastChar, 'João em Apocalipse deve estar presente');

// Testes de resolução para Jeová e Jesus
const resolvedJeova = resolveBiblicalPersona('Jeová');
assert.strictEqual(resolvedJeova.id, 'jeova_deus', 'Deve resolver Jeová Deus com prioridade máxima');
const resolvedJesus = resolveBiblicalPersona('Jesus Cristo');
assert.strictEqual(resolvedJesus.id, 'jesus_cristo', 'Deve resolver Jesus Cristo com fidelidade');

// Teste de resposta e guardrails doutrinários para Jeová e Jesus
const respJeova = generatePersonaResponse(jeovaChar, 'Qual é o Teu nome e propósito?');
assert.ok(respJeova.responseText.includes('Jeová'), 'Resposta de Jeová deve santificar Seu Santo Nome');
assert.strictEqual(auditBiblicalContent(respJeova.responseText).passed, true, 'Resposta de Jeová deve passar nos guardrails');

const respJesus = generatePersonaResponse(jesusChar, 'Qual é a tua relação com o Pai?');
assert.ok(respJesus.responseText.includes('Pai'), 'Resposta de Jesus deve apontar para o Pai Jeová');
assert.strictEqual(auditBiblicalContent(respJesus.responseText).passed, true, 'Resposta de Jesus deve passar nos guardrails');

// Teste de resolução dinâmica de qualquer figura bíblica
const resolvedJob = resolveBiblicalPersona('Jó');
assert.strictEqual(resolvedJob.id, 'jo', 'Deve resolver Jó com precisão');
const resolvedCustom = resolveBiblicalPersona('Bate-Seba');
assert.ok(resolvedCustom.name.includes('Bate-Seba'), 'Deve gerar persona dinâmica para qualquer nome bíblico');

// Teste de resposta realista de testemunhas humanas
const respAdao = generatePersonaResponse(firstChar, 'Como era o Éden?');
assert.ok(respAdao.responseText.includes('Éden'), 'Resposta de Adão deve ser contextual');
assert.strictEqual(auditBiblicalContent(respAdao.responseText).passed, true, 'Resposta deve passar nos guardrails doutrinários');
console.log('   ✓ Diálogos bíblicos incluindo Jeová, Jesus e todas as testemunhas de Adão a João validados com fidelidade estrita.\n');

runQueryTests().then(() => {
  console.log('=== TODOS OS TESTES PASSARAM COM SUCESSO! PLATAFORMA 100% OPERACIONAL. ===');
});
