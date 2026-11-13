// src/services/speechService.ts
import type { BiblicalPersona, PersonaArchetype } from '../data/biblicalPersonasData';

export interface PersonaVoiceOptions {
  archetype?: PersonaArchetype;
  gender?: 'male' | 'female' | 'divine';
  rate?: number;
  pitch?: number;
  volume?: number;
  personaId?: string;
  preferredVoiceURI?: string;
}

export interface AcousticPreset {
  gender: 'male' | 'female' | 'divine';
  pitch: number;
  rate: number;
  volume: number;
  descriptor: string;
}

export interface SpeechRecognitionCallbacks {
  onStart?: () => void;
  onResult?: (transcript: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
}

const FEMALE_PERSONA_IDS = new Set([
  'eva', 'sara', 'rute', 'ana', 'debora', 'raabe', 'abigail', 
  'ester', 'maria_jesus', 'marta', 'maria_madalena', 'lidia', 'isabel',
  'rebeca', 'miria', 'bate_seba', 'marta_betania', 'lidia_tiatira', 'priscila_aquila'
]);

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private utterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking = false;
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoiceURI: string | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => {
          this.initVoices();
        };
      }
    }
  }

  private initVoices(): void {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  public isAvailable(): boolean {
    return this.synth !== null;
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if (this.voices.length === 0 && this.synth) {
      this.voices = this.synth.getVoices();
    }
    return this.voices;
  }

  public getPortugueseVoices(): SpeechSynthesisVoice[] {
    const all = this.getVoices();
    return all.filter(v => v.lang.toLowerCase().startsWith('pt'));
  }

  public setSelectedVoice(voiceURI: string): void {
    this.selectedVoiceURI = voiceURI;
  }

  public getSelectedVoiceURI(): string | null {
    return this.selectedVoiceURI;
  }

  /**
   * Calcula as propriedades acústicas sob medida para a persona bíblica
   */
  public getPersonaAcousticPreset(persona: BiblicalPersona): AcousticPreset {
    const isFemale = persona.archetype === 'mulher_de_fe' || FEMALE_PERSONA_IDS.has(persona.id);

    // 1. Jeová Deus (Voz Divina, solene, paternal, ressonante)
    if (persona.id === 'jeova_deus' || persona.archetype === 'deus') {
      return {
        gender: 'divine',
        pitch: 0.78,
        rate: 0.88,
        volume: 1.0,
        descriptor: 'Voz Soberana & Paternal Ressonante'
      };
    }

    // 2. Jesus Cristo (Voz do Messias, mansa, clara, compassiva)
    if (persona.id === 'jesus_cristo' || persona.archetype === 'filho_de_deus') {
      return {
        gender: 'male',
        pitch: 0.92,
        rate: 0.92,
        volume: 1.0,
        descriptor: 'Voz Mansa e Compassiva do Messias'
      };
    }

    // 3. Mulheres de Fé (Sara, Rute, Ester, Maria, Marta, Débora...)
    if (isFemale) {
      return {
        gender: 'female',
        pitch: 1.22,
        rate: 0.96,
        volume: 1.0,
        descriptor: 'Voz Feminina Calma e Melódica'
      };
    }

    // 4. Patriarcas Idosos (Abraão, Jó, Noé, Moisés)
    if (persona.id === 'abraao' || persona.id === 'jo' || persona.id === 'noe' || persona.id === 'moises') {
      return {
        gender: 'male',
        pitch: 0.82,
        rate: 0.88,
        volume: 1.0,
        descriptor: 'Voz Madura & Patriarcal'
      };
    }

    // 5. Profetas (Elias, Isaías, Jeremias, Daniel)
    if (persona.archetype === 'profeta' || persona.id === 'elias' || persona.id === 'isaias' || persona.id === 'daniel') {
      return {
        gender: 'male',
        pitch: 0.88,
        rate: 0.96,
        volume: 1.0,
        descriptor: 'Voz Profética Firme e Solene'
      };
    }

    // 6. Reis e Líderes (Davi, Salomão, Ezequias)
    if (persona.archetype === 'rei' || persona.id === 'davi' || persona.id === 'salomao') {
      return {
        gender: 'male',
        pitch: 0.90,
        rate: 0.92,
        volume: 1.0,
        descriptor: 'Voz Régia e Majestosa'
      };
    }

    // 7. Juízes Guerreiros (Gideão, Sansão)
    if (persona.archetype === 'juiz' || persona.id === 'gideao' || persona.id === 'sansao') {
      return {
        gender: 'male',
        pitch: 0.86,
        rate: 1.00,
        volume: 1.0,
        descriptor: 'Voz Corajosa de Libertador'
      };
    }

    // 8. Jovens na fé (Timóteo, Josias jovem)
    if (persona.id === 'timoteo' || persona.id === 'josias') {
      return {
        gender: 'male',
        pitch: 1.08,
        rate: 1.00,
        volume: 1.0,
        descriptor: 'Voz Jovem e Entusiasmada'
      };
    }

    // 9. Monarcas Imperiais e Governadores (Nabucodonosor, Faraó, Pilatos, Herodes)
    if (persona.id === 'nabucodonosor' || persona.id === 'farao_exodo' || persona.id === 'poncio_pilatos' || persona.id === 'herodes_rei') {
      return {
        gender: 'male',
        pitch: 0.84,
        rate: 0.90,
        volume: 1.0,
        descriptor: 'Voz Imperiosa de Governante Antigo'
      };
    }

    // 10. Apóstolo Judas Iscariotes e Caim
    if (persona.id === 'judas_iscariotes' || persona.id === 'caim') {
      return {
        gender: 'male',
        pitch: 0.82,
        rate: 0.86,
        volume: 1.0,
        descriptor: 'Voz Sombria e Pesarosa'
      };
    }

    // 11. Satanás, o Opositor
    if (persona.id === 'satanas_opositor') {
      return {
        gender: 'male',
        pitch: 0.74,
        rate: 0.85,
        volume: 1.0,
        descriptor: 'Voz Profunda e Sombria de Advertência'
      };
    }

    // 12. Anjos Celestiais (Gabriel e Arcanjo Miguel)
    if (persona.archetype === 'anjo_celestial' || persona.id === 'anjo_gabriel' || persona.id === 'arcanjo_miguel') {
      return {
        gender: 'male',
        pitch: 1.04,
        rate: 0.92,
        volume: 1.0,
        descriptor: 'Voz Celestial Serena e Luminosa'
      };
    }

    // 13. Urias, o Heteu
    if (persona.id === 'urias_heteu') {
      return {
        gender: 'male',
        pitch: 0.88,
        rate: 0.94,
        volume: 1.0,
        descriptor: 'Voz Firme e Nobre de Soldado'
      };
    }

    // 14. Pescadores e Apóstolos da Galileia (Pedro, André, Tiago, Tomé, Mateus)
    if (persona.archetype === 'apostolo_missionario') {
      return {
        gender: 'male',
        pitch: 0.93,
        rate: 0.97,
        volume: 1.0,
        descriptor: 'Voz Fervorosa de Apóstolo'
      };
    }

    // Padrão Mentor Masculino
    return {
      gender: 'male',
      pitch: 0.94,
      rate: 0.95,
      volume: 1.0,
      descriptor: 'Voz de Mentor da Fé'
    };
  }

  /**
   * Encontra a melhor voz do sistema operacional de acordo com gênero e idioma
   */
  private matchBestVoice(gender: 'male' | 'female' | 'divine', customVoiceURI?: string): SpeechSynthesisVoice | null {
    const ptVoices = this.getPortugueseVoices();
    if (ptVoices.length === 0) {
      const all = this.getVoices();
      if (all.length > 0) return all[0];
      return null;
    }

    // Se o usuário selecionou uma voz explicitamente
    if (customVoiceURI) {
      const found = ptVoices.find(v => v.voiceURI === customVoiceURI);
      if (found) return found;
    }
    if (this.selectedVoiceURI) {
      const found = ptVoices.find(v => v.voiceURI === this.selectedVoiceURI);
      if (found) return found;
    }

    // Detecta vozes femininas e masculinas com base nos nomes comuns em Windows / Chrome / iOS
    const femaleKeywords = ['female', 'mulher', 'maria', 'helia', 'francisca', 'raquel', 'luciana', 'yara', 'vitoria', 'clara', 'fernanda'];
    const maleKeywords = ['male', 'homem', 'daniel', 'duarte', 'antonio', 'joao', 'jorge', 'sergio', 'ricardo', 'felipe', 'gustavo'];

    if (gender === 'female') {
      const femaleVoice = ptVoices.find(v => {
        const name = v.name.toLowerCase();
        return femaleKeywords.some(kw => name.includes(kw));
      });
      if (femaleVoice) return femaleVoice;
    } else {
      const maleVoice = ptVoices.find(v => {
        const name = v.name.toLowerCase();
        return maleKeywords.some(kw => name.includes(kw));
      });
      if (maleVoice) return maleVoice;
    }

    // Fallback: preferencialmente voz de Portugal ou Brasil
    const ptPT = ptVoices.find(v => v.lang.toLowerCase().includes('pt-pt'));
    if (ptPT) return ptPT;

    return ptVoices[0];
  }

  /**
   * Fala em voz alta reproduzindo o tom personalizado e timbre da Persona Bíblica
   * com suporte a multiplicador de velocidade (3 níveis: Solene, Natural, Rápido)
   */
  public speakPersona(
    text: string, 
    persona: BiblicalPersona, 
    onEnd?: () => void, 
    onError?: (err: any) => void,
    speedMultiplier: number = 1.0
  ): boolean {
    if (!this.synth) return false;

    const preset = this.getPersonaAcousticPreset(persona);
    const calculatedRate = Math.min(2.0, Math.max(0.5, preset.rate * speedMultiplier));
    return this.speakCustom(text, {
      gender: preset.gender,
      pitch: preset.pitch,
      rate: calculatedRate,
      volume: preset.volume,
      personaId: persona.id,
      archetype: persona.archetype
    }, onEnd, onError);
  }

  /**
   * Método de fala com opções acústicas detalhadas
   */
  public speakCustom(
    text: string,
    options: PersonaVoiceOptions,
    onEnd?: () => void,
    onError?: (err: any) => void
  ): boolean {
    if (!this.synth) return false;

    this.stop();

    this.utterance = new SpeechSynthesisUtterance(text);
    this.utterance.rate = options.rate ?? 0.95;
    this.utterance.pitch = options.pitch ?? 1.0;
    this.utterance.volume = options.volume ?? 1.0;
    this.utterance.lang = 'pt-PT';

    const matchedVoice = this.matchBestVoice(options.gender || 'male', options.preferredVoiceURI);
    if (matchedVoice) {
      this.utterance.voice = matchedVoice;
    }

    this.utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    this.utterance.onerror = (e) => {
      this.isSpeaking = false;
      if (onError) onError(e);
    };

    this.synth.speak(this.utterance);
    this.isSpeaking = true;
    return true;
  }

  /**
   * Fala padrão retrocompatível
   */
  public speak(text: string, rate: number = 1.0, onEnd?: () => void, onError?: (err: any) => void): boolean {
    return this.speakCustom(text, { rate }, onEnd, onError);
  }

  public pause(): void {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  public resume(): void {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }

  public getStatus(): boolean {
    return this.synth ? this.synth.speaking : false;
  }

  // -------------------------------------------------------------
  // RECONHECIMENTO DE VOZ (SPEECH-TO-TEXT / MICROFONE)
  // -------------------------------------------------------------
  private recognition: any = null;
  private isListening = false;

  public isRecognitionSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
  }

  public async requestMicrophonePermission(): Promise<boolean> {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) return false;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(t => t.stop());
      return true;
    } catch {
      return false;
    }
  }

  public startListening(callbacks: SpeechRecognitionCallbacks, lang: string = 'pt-BR'): boolean {
    if (typeof window === 'undefined') return false;
    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      if (callbacks.onError) callbacks.onError('O seu navegador não suporta reconhecimento de voz direto. Recomendamos Google Chrome ou Microsoft Edge.');
      return false;
    }

    try {
      this.stopListening();
      const rec = new SpeechRecognitionClass();
      rec.lang = lang;
      rec.continuous = false;
      rec.interimResults = true;
      rec.maxAlternatives = 1;

      rec.onstart = () => {
        this.isListening = true;
        if (callbacks.onStart) callbacks.onStart();
      };

      rec.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            finalTranscript += item[0].transcript;
          } else {
            interimTranscript += item[0].transcript;
          }
        }
        const text = (finalTranscript || interimTranscript).trim();
        const isFinal = Boolean(finalTranscript);
        if (callbacks.onResult && text) {
          callbacks.onResult(text, isFinal);
        }
      };

      rec.onerror = (e: any) => {
        this.isListening = false;
        let msg = 'Erro no microfone.';
        if (e.error === 'not-allowed' || e.error === 'permission-denied') {
          msg = 'Permissão do microfone negada. Clique no ícone de cadeado na barra de endereços para permitir.';
        } else if (e.error === 'no-speech') {
          msg = 'Nenhuma fala detectada. Aproxime-se do microfone e tente novamente.';
        } else if (e.error === 'network') {
          msg = 'Erro de rede temporário no serviço de voz.';
        }
        if (callbacks.onError) callbacks.onError(msg);
      };

      rec.onend = () => {
        this.isListening = false;
        if (callbacks.onEnd) callbacks.onEnd();
      };

      rec.start();
      this.recognition = rec;
      return true;
    } catch (err: any) {
      this.isListening = false;
      if (callbacks.onError) callbacks.onError(err.message || 'Falha ao acionar microfone');
      return false;
    }
  }

  public stopListening(): void {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch {}
      this.recognition = null;
    }
    this.isListening = false;
  }

  public getIsListening(): boolean {
    return this.isListening;
  }
}

export const speechService = new SpeechService();
