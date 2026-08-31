// Web Audio API Synthesizer Engine for RangRush: Elements of Srishti

class RangRushAudioEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private musicEnabled: boolean = true;
  private musicGainNode: GainNode | null = null;
  private musicOsc: OscillatorNode | null = null;

  constructor() {
    // AudioContext lazily initialized on user gesture
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (!enabled && this.musicGainNode) {
      this.stopMusic();
    } else if (enabled) {
      this.startMusic();
    }
  }

  // --- STUDIO INTRO SPLASH JINGLE ---
  public playSplashIntroJingle() {
    this.initContext();
    if (!this.ctx || !this.soundEnabled) return;

    const now = this.ctx.currentTime;
    // Deep orchestral drone + tanpura synth chord (A2, E3, A3, C#4)
    const freqs = [110, 164.81, 220, 277.18];
    
    freqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.005, now + 2.5);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12 / (idx + 1), now + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 2.9);
    });

    // Melodic chime highlight
    const chimeTimes = [0.8, 1.2, 1.6, 2.0];
    const chimeFreqs = [440, 554.37, 659.25, 880];
    
    chimeTimes.forEach((t, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(chimeFreqs[i], now + t);

      gain.gain.setValueAtTime(0.001, now + t);
      gain.gain.linearRampToValueAtTime(0.15, now + t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + t);
      osc.stop(now + t + 0.85);
    });
  }

  // --- TILE SWAP ---
  public playSwapSound() {
    this.initContext();
    if (!this.ctx || !this.soundEnabled) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(540, now + 0.08);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  // --- MATCH CLEAR & COMBO SCALE ---
  public playMatchSound(combo: number = 1) {
    this.initContext();
    if (!this.ctx || !this.soundEnabled) return;

    const now = this.ctx.currentTime;
    // Harmonic pitch increases with combo multiplier
    const baseFreq = 440 * Math.pow(1.0594, Math.min(combo * 2, 12));
    
    [baseFreq, baseFreq * 1.25, baseFreq * 1.5].forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      gain.gain.setValueAtTime(0.18, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.26);
    });
  }

  // --- SPECIAL TILE EXPLOSION ---
  public playSpecialSound() {
    this.initContext();
    if (!this.ctx || !this.soundEnabled) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.2);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  // --- POWER-UP ACTIVATIONS ---
  public playPowerUpSound(type: 'AGNI' | 'VAJRA' | 'SURYA' | 'CHANDRA') {
    this.initContext();
    if (!this.ctx || !this.soundEnabled) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (type === 'AGNI') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(600, now + 0.3);
    } else if (type === 'VAJRA') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.25);
    } else if (type === 'SURYA') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.4);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.linearRampToValueAtTime(1200, now + 0.35);
    }

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  // --- LEVEL COMPLETE ---
  public playLevelCompleteSound() {
    this.initContext();
    if (!this.ctx || !this.soundEnabled) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 triumphant chord
    
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);

      gain.gain.setValueAtTime(0.001, now + idx * 0.1);
      gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.1 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.65);
    });
  }

  // --- GAME OVER ---
  public playGameOverSound() {
    this.initContext();
    if (!this.ctx || !this.soundEnabled) return;

    const now = this.ctx.currentTime;
    const notes = [400, 350, 300, 220];

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + idx * 0.15);

      gain.gain.setValueAtTime(0.15, now + idx * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.15 + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.15);
      osc.stop(now + idx * 0.15 + 0.35);
    });
  }

  // --- BUTTON CLICK ---
  public playButtonClick() {
    this.initContext();
    if (!this.ctx || !this.soundEnabled) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  // --- BACKGROUND MUSIC SYNTH DRONE ---
  public startMusic() {
    if (!this.musicEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    if (this.musicOsc) return; // already playing

    try {
      const now = this.ctx.currentTime;
      this.musicOsc = this.ctx.createOscillator();
      this.musicGainNode = this.ctx.createGain();

      this.musicOsc.type = 'sine';
      this.musicOsc.frequency.setValueAtTime(110, now); // A2 ambient drone

      this.musicGainNode.gain.setValueAtTime(0.001, now);
      this.musicGainNode.gain.linearRampToValueAtTime(0.03, now + 2.0);

      this.musicOsc.connect(this.musicGainNode);
      this.musicGainNode.connect(this.ctx.destination);

      this.musicOsc.start(now);
    } catch {
      // AudioContext background autoplay policy safeguard
    }
  }

  public stopMusic() {
    if (this.musicOsc && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        if (this.musicGainNode) {
          this.musicGainNode.gain.linearRampToValueAtTime(0.0001, now + 0.5);
        }
        setTimeout(() => {
          if (this.musicOsc) {
            this.musicOsc.stop();
            this.musicOsc.disconnect();
            this.musicOsc = null;
          }
        }, 550);
      } catch {
        this.musicOsc = null;
      }
    }
  }
}

export const rangRushAudio = new RangRushAudioEngine();
