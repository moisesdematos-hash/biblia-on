// src/data/genealogyData.ts

export interface GenealogyNode {
  id: string;
  name: string;
  fatherId?: string;
  motherId?: string;
  spouse?: string;
  generation: number;
  lineage: 'patriarcal' | 'davi_salomao_legal' | 'davi_nata_biologico' | 'doze_tribos';
  notes: string;
  biblicalRefs: string;
  characterId?: string;
}

export const GENEALOGY_DATA: GenealogyNode[] = [
  // De Adão a Noé e Abraão
  { id: 'adao', name: 'Adão', generation: 1, lineage: 'patriarcal', notes: 'Primeiro homem, criado diretamente por Deus a partir do pó do solo.', biblicalRefs: 'Gênesis 2:7; Lucas 3:38' },
  { id: 'sete', name: 'Sete', fatherId: 'adao', generation: 2, lineage: 'patriarcal', notes: 'Nascido após a morte de Abel; continuador da linha da promessa.', biblicalRefs: 'Gênesis 4:25; Lucas 3:38' },
  { id: 'enos', name: 'Enos', fatherId: 'sete', generation: 3, lineage: 'patriarcal', notes: 'Geração em que começou a invocação do nome de Jeová.', biblicalRefs: 'Gênesis 5:6; Lucas 3:38' },
  { id: 'quena', name: 'Quenã', fatherId: 'enos', generation: 4, lineage: 'patriarcal', notes: 'Patriarca antediluviano.', biblicalRefs: 'Gênesis 5:9; Lucas 3:37' },
  { id: 'maalalel', name: 'Maalaleel', fatherId: 'quena', generation: 5, lineage: 'patriarcal', notes: 'Patriarca antediluviano.', biblicalRefs: 'Gênesis 5:12; Lucas 3:37' },
  { id: 'jarede', name: 'Jarede', fatherId: 'maalalel', generation: 6, lineage: 'patriarcal', notes: 'Pai de Enoque.', biblicalRefs: 'Gênesis 5:15; Lucas 3:37' },
  { id: 'enoque', name: 'Enoque', fatherId: 'jarede', generation: 7, lineage: 'patriarcal', notes: 'Andou com o verdadeiro Deus; profetizou contra os ímpios.', biblicalRefs: 'Gênesis 5:22; Judas 14; Lucas 3:37' },
  { id: 'matusalem', name: 'Matusalém', fatherId: 'enoque', generation: 8, lineage: 'patriarcal', notes: 'O homem de maior longevidade registada nas Escrituras (969 anos).', biblicalRefs: 'Gênesis 5:27; Lucas 3:37' },
  { id: 'lameque', name: 'Lameque', fatherId: 'matusalem', generation: 9, lineage: 'patriarcal', notes: 'Profetizou sobre o alívio que Noé traria à terra amaldiçoada.', biblicalRefs: 'Gênesis 5:28; Lucas 3:36' },
  { id: 'noe', name: 'Noé', fatherId: 'lameque', generation: 10, lineage: 'patriarcal', notes: 'Homem justo e inculpe; construtor da arca de preservação.', biblicalRefs: 'Gênesis 6:9; Lucas 3:36' },
  { id: 'sem', name: 'Sem', fatherId: 'noe', generation: 11, lineage: 'patriarcal', notes: 'Filho abençoado de Noé; progenitor dos povos semitas e da linha messiânica.', biblicalRefs: 'Gênesis 9:26; Lucas 3:36' },
  { id: 'arpaxade', name: 'Arpaxade', fatherId: 'sem', generation: 12, lineage: 'patriarcal', notes: 'Nascido dois anos após o Dilúvio.', biblicalRefs: 'Gênesis 11:10; Lucas 3:36' },
  { id: 'sela', name: 'Selá', fatherId: 'arpaxade', generation: 13, lineage: 'patriarcal', notes: 'Descendente pós-diluviano.', biblicalRefs: 'Gênesis 11:12; Lucas 3:35' },
  { id: 'eber', name: 'Éber', fatherId: 'sela', generation: 14, lineage: 'patriarcal', notes: 'Origem provável do gentílico "hebreu".', biblicalRefs: 'Gênesis 11:14; Lucas 3:35' },
  { id: 'pelegue', name: 'Pelegue', fatherId: 'eber', generation: 15, lineage: 'patriarcal', notes: 'Nos seus dias dividiu-se a terra (confusão de línguas em Babel).', biblicalRefs: 'Gênesis 10:25; Lucas 3:35' },
  { id: 'reu', name: 'Reú', fatherId: 'pelegue', generation: 16, lineage: 'patriarcal', notes: 'Patriarca pós-diluviano.', biblicalRefs: 'Gênesis 11:18; Lucas 3:35' },
  { id: 'serugue', name: 'Serugue', fatherId: 'reu', generation: 17, lineage: 'patriarcal', notes: 'Antepassado de Abraão.', biblicalRefs: 'Gênesis 11:20; Lucas 3:35' },
  { id: 'naor', name: 'Naor', fatherId: 'serugue', generation: 18, lineage: 'patriarcal', notes: 'Avô de Abraão.', biblicalRefs: 'Gênesis 11:22; Lucas 3:34' },
  { id: 'tera', name: 'Terá', fatherId: 'naor', generation: 19, lineage: 'patriarcal', notes: 'Pai de Abraão; saiu de Ur dos Caldeus em direção a Canaã.', biblicalRefs: 'Gênesis 11:26; Lucas 3:34' },
  { id: 'abraao', name: 'Abraão', fatherId: 'tera', spouse: 'Sara', generation: 20, lineage: 'patriarcal', notes: 'Amigo de Deus e pai de todos os que exercem fé.', biblicalRefs: 'Gênesis 12:1-3; Mateus 1:2', characterId: 'abraao' },
  { id: 'isaque', name: 'Isaque', fatherId: 'abraao', motherId: 'Sara', spouse: 'Rebeca', generation: 21, lineage: 'patriarcal', notes: 'Filho da promessa divina, obediente e pacífico.', biblicalRefs: 'Gênesis 21:1-3; Mateus 1:2' },
  { id: 'jaco', name: 'Jacó (Israel)', fatherId: 'isaque', motherId: 'Rebeca', spouse: 'Lia e Raquel', generation: 22, lineage: 'patriarcal', notes: 'Lutou com um anjo e recebeu o nome Israel; pai das 12 tribos.', biblicalRefs: 'Gênesis 32:28; Mateus 1:2' },

  // As 12 Tribos (Filhos de Jacó)
  { id: 'juda', name: 'Judá', fatherId: 'jaco', generation: 23, lineage: 'doze_tribos', notes: 'Tribo régia da qual viria Siló (o Messias).', biblicalRefs: 'Gênesis 49:10; Mateus 1:2' },
  { id: 'ruben', name: 'Rúben', fatherId: 'jaco', generation: 23, lineage: 'doze_tribos', notes: 'Primogênito de Jacó; perdeu os direitos de primogenitura por má conduta.', biblicalRefs: 'Gênesis 49:3-4' },
  { id: 'simeao', name: 'Simeão', fatherId: 'jaco', generation: 23, lineage: 'doze_tribos', notes: 'Segundo filho de Lia.', biblicalRefs: 'Gênesis 29:33' },
  { id: 'levi', name: 'Levi', fatherId: 'jaco', generation: 23, lineage: 'doze_tribos', notes: 'Tribo designada por Jeová para o serviço sacerdotal sagrado.', biblicalRefs: 'Números 3:5-10' },
  { id: 'jose_tribo', name: 'José', fatherId: 'jaco', generation: 23, lineage: 'doze_tribos', notes: 'Governador no Egito; recebeu porção dupla através de Efraim e Manassés.', biblicalRefs: 'Gênesis 41:40; 48:5' },
  { id: 'benjamim', name: 'Benjamim', fatherId: 'jaco', generation: 23, lineage: 'doze_tribos', notes: 'Filho mais novo de Jacó e Raquel.', biblicalRefs: 'Gênesis 35:18' },

  // Linhagem de Judá até David
  { id: 'perez', name: 'Perez', fatherId: 'juda', generation: 24, lineage: 'patriarcal', notes: 'Filho de Judá e Tamar.', biblicalRefs: 'Mateus 1:3' },
  { id: 'hezrom', name: 'Hezrom', fatherId: 'perez', generation: 25, lineage: 'patriarcal', notes: 'Descendente de Judá no Egito.', biblicalRefs: 'Mateus 1:3' },
  { id: 'rao', name: 'Rão', fatherId: 'hezrom', generation: 26, lineage: 'patriarcal', notes: 'Linhagem régia.', biblicalRefs: 'Mateus 1:3' },
  { id: 'aminadabe', name: 'Aminadabe', fatherId: 'rao', generation: 27, lineage: 'patriarcal', notes: 'Pai de Nasom e Eliseba (esposa de Aarão).', biblicalRefs: 'Mateus 1:4' },
  { id: 'nasom', name: 'Nasom', fatherId: 'aminadabe', generation: 28, lineage: 'patriarcal', notes: 'Líder principal da tribo de Judá durante o Êxodo.', biblicalRefs: 'Números 1:7; Mateus 1:4' },
  { id: 'salmom', name: 'Salmom', fatherId: 'nasom', spouse: 'Raabe', generation: 29, lineage: 'patriarcal', notes: 'Casou-se com Raabe de Jericó.', biblicalRefs: 'Mateus 1:5' },
  { id: 'boaz', name: 'Boaz', fatherId: 'salmom', spouse: 'Rute', generation: 30, lineage: 'patriarcal', notes: 'Resgatador leal em Belém; esposo da moabita Rute.', biblicalRefs: 'Rute 4:13; Mateus 1:5' },
  { id: 'obede', name: 'Obede', fatherId: 'boaz', generation: 31, lineage: 'patriarcal', notes: 'Filho de Rute e Boaz.', biblicalRefs: 'Mateus 1:5' },
  { id: 'jesse', name: 'Jessé', fatherId: 'obede', generation: 32, lineage: 'patriarcal', notes: 'Pai do rei David em Belém de Judá.', biblicalRefs: '1 Samuel 16:1; Mateus 1:5' },
  { id: 'david', name: 'Rei David', fatherId: 'jesse', generation: 33, lineage: 'patriarcal', notes: 'Homem segundo o coração de Deus; recebeu o pacto do Reino eterno.', biblicalRefs: '2 Samuel 7:12; Mateus 1:6', characterId: 'david' },

  // Ramos a partir de David: Sucessão Régia de Salomão (Mateus) e Ramo Biológico de Natã (Lucas)
  { id: 'salomao', name: 'Rei Salomão', fatherId: 'david', generation: 34, lineage: 'davi_salomao_legal', notes: 'Linhagem régia legal ao trono de Judá (Mateus 1).', biblicalRefs: 'Mateus 1:6' },
  { id: 'nata', name: 'Natã', fatherId: 'david', generation: 34, lineage: 'davi_nata_biologico', notes: 'Filho de David e Bate-Seba; linhagem materna de Maria (Lucas 3).', biblicalRefs: 'Lucas 3:31' },
  { id: 'heli', name: 'Heli', generation: 74, lineage: 'davi_nata_biologico', notes: 'Pai biológico de Maria; sogro de José (Lucas 3:23).', biblicalRefs: 'Lucas 3:23; Talmude de Jerusalém' },
  { id: 'maria', name: 'Maria', fatherId: 'heli', spouse: 'José', generation: 75, lineage: 'davi_nata_biologico', notes: 'Mãe biológica de Jesus; descendente carnal de David por Natã.', biblicalRefs: 'Lucas 1:27; Romanos 1:3' },
  { id: 'jose_esposo', name: 'José (Carpinteiro)', generation: 75, lineage: 'davi_salomao_legal', notes: 'Pai adotivo e legal de Jesus; transmitiu o direito régio davídico.', biblicalRefs: 'Mateus 1:16' },
  { id: 'jesus_cristo', name: 'Jesus Cristo', motherId: 'maria', generation: 76, lineage: 'patriarcal', notes: 'O Messias prometido, Herdeiro do trono davídico com direito legal e biológico perfeito.', biblicalRefs: 'Mateus 1:16; Lucas 3:23; Atos 2:30', characterId: 'jesus' }
];
