'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sliders, ChevronRight, Check } from 'lucide-react';

// Sound Synth Engine utilizing Web Audio API
class AudioSynth {
  private ctx: AudioContext | null = null;
  private masterVolume: GainNode | null = null;
  private musicVolume: number = 0.4;
  private sfxVolume: number = 0.6;
  private isMuted: boolean = false;
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;

  constructor() {
    // Lazy initialize on first interaction
  }

  private init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterVolume = this.ctx.createGain();
      this.masterVolume.gain.setValueAtTime(this.isMuted ? 0 : 1, this.ctx.currentTime);
      this.masterVolume.connect(this.ctx.destination);
      this.startAmbientDrone();
    } catch (e) {
      console.warn('Web Audio API not supported in this browser.', e);
    }
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (this.masterVolume && this.ctx) {
      this.masterVolume.gain.setValueAtTime(muted ? 0 : 1, this.ctx.currentTime);
    }
  }

  public setVolume(music: number, sfx: number) {
    this.musicVolume = music;
    this.sfxVolume = sfx;
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(music * 0.15, this.ctx.currentTime);
    }
  }

  private startAmbientDrone() {
    if (!this.ctx || !this.masterVolume) return;
    try {
      // Low rumble
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note
      
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(55.5, this.ctx.currentTime); // detuned

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, this.ctx.currentTime);

      gainNode.gain.setValueAtTime(this.musicVolume * 0.15, this.ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.masterVolume);

      osc1.start();
      osc2.start();

      this.ambientOsc = osc1;
      this.ambientGain = gainNode;
    } catch (e) {
      console.error(e);
    }
  }

  public playDash() {
    this.init();
    if (!this.ctx || !this.masterVolume) return;
    try {
      const time = this.ctx.currentTime;
      // White noise buffer
      const bufferSize = this.ctx.sampleRate * 0.15; // 0.15 seconds
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1000, time);
      filter.frequency.exponentialRampToValueAtTime(100, time + 0.15);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(this.sfxVolume * 0.5, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterVolume);
      noise.start(time);
    } catch (e) {}
  }

  public playGravityShift(rotation: boolean) {
    this.init();
    if (!this.ctx || !this.masterVolume) return;
    try {
      const time = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      if (rotation) {
        // High sweep up
        osc.frequency.setValueAtTime(150, time);
        osc.frequency.exponentialRampToValueAtTime(600, time + 0.25);
      } else {
        // Deep plunge
        osc.frequency.setValueAtTime(300, time);
        osc.frequency.exponentialRampToValueAtTime(80, time + 0.3);
      }

      gain.gain.setValueAtTime(this.sfxVolume * 0.35, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);

      osc.connect(gain);
      gain.connect(this.masterVolume);
      osc.start(time);
      osc.stop(time + 0.35);
    } catch (e) {}
  }

  public playSwitch() {
    this.init();
    if (!this.ctx || !this.masterVolume) return;
    try {
      const time = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, time);
      osc.frequency.setValueAtTime(880, time + 0.05);

      gain.gain.setValueAtTime(this.sfxVolume * 0.25, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

      osc.connect(gain);
      gain.connect(this.masterVolume);
      osc.start(time);
      osc.stop(time + 0.2);
    } catch (e) {}
  }

  public playDroneDestroy() {
    this.init();
    if (!this.ctx || !this.masterVolume) return;
    try {
      const time = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, time);
      osc.frequency.linearRampToValueAtTime(30, time + 0.4);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, time);

      gain.gain.setValueAtTime(this.sfxVolume * 0.6, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterVolume);
      osc.start(time);
      osc.stop(time + 0.45);
    } catch (e) {}
  }

  public playWin() {
    this.init();
    if (!this.ctx || !this.masterVolume) return;
    try {
      const time = this.ctx.currentTime;
      const notes = [261.63, 329.63, 392.00, 523.25]; // C major chord
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time + idx * 0.08);

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(this.sfxVolume * 0.3, time + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, time + idx * 0.08 + 0.4);

        osc.connect(gain);
        gain.connect(this.masterVolume!);
        osc.start(time);
        osc.stop(time + 0.8);
      });
    } catch (e) {}
  }
}

// Global synth instance
const synth = new AudioSynth();

// Interfaces
interface Vector2D {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface SentryDrone {
  x: number;
  y: number;
  startX: number;
  endX: number;
  direction: number; // 1 or -1
  speed: number;
  shootCooldown: number;
  bullets: DroneBullet[];
}

interface DroneBullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

interface MovingPlatform {
  x: number;
  y: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  t: number; // interpolation factor 0 to 1
  speed: number;
  direction: number; // 1 or -1
}

interface PressurePlate {
  gridX: number;
  gridY: number;
  isPressed: boolean;
  targetId: string; // opens vertical barriers
}

interface EnergySwitch {
  gridX: number;
  gridY: number;
  isActive: boolean;
  targetId: string;
}

interface GravityField {
  gridX: number;
  gridY: number;
  forceDir: 'DOWN' | 'UP' | 'LEFT' | 'RIGHT';
}

// Tile specifications
const TILE_SIZE = 32;

// Levels design
const LEVELS = [
  // LEVEL 1: Introduction (Simple Gravity Reversal & Switch)
  {
    width: 25,
    height: 14,
    startX: 3,
    startY: 10,
    exitX: 22,
    exitY: 10,
    layout: [
      "#########################",
      "#.......................#",
      "#.......................#",
      "#.......................#",
      "#.......................#",
      "#.......................#",
      "#.........###...........#",
      "#.......................#",
      "#.......................#",
      "#....##.................#",
      "#....................E..#",
      "###########...###########",
      "##########.....##########",
      "#########################"
    ],
    switches: [
      { gridX: 10, gridY: 5, isActive: false, targetId: 'barrier-1' }
    ],
    plates: [],
    barriers: [
      { id: 'barrier-1', gridX: 18, gridY: 9, height: 2, isOpen: false }
    ],
    fields: [],
    drones: [],
    platforms: []
  },
  // LEVEL 2: Geometry (Rotations & Plates)
  {
    width: 30,
    height: 16,
    startX: 3,
    startY: 13,
    exitX: 26,
    exitY: 3,
    layout: [
      "##############################",
      "#............................#",
      "#............................#",
      "#........................E...#",
      "#..........#######..##########",
      "#..........#........##########",
      "#..........#........##########",
      "#...................##########",
      "#............................#",
      "#.....##.....................#",
      "#............................#",
      "#...................##########",
      "#.........#.........##########",
      "#...................##########",
      "#...................##########",
      "##############################"
    ],
    switches: [],
    plates: [
      { gridX: 12, gridY: 13, isPressed: false, targetId: 'barrier-2' }
    ],
    barriers: [
      { id: 'barrier-2', gridX: 20, gridY: 1, height: 3, isOpen: false }
    ],
    fields: [],
    drones: [],
    platforms: [
      { x: 450, y: 350, startX: 450, startY: 350, endX: 600, endY: 350, t: 0, speed: 0.008, direction: 1 }
    ]
  },
  // LEVEL 3: Drones and Force Fields
  {
    width: 30,
    height: 16,
    startX: 3,
    startY: 13,
    exitX: 27,
    exitY: 3,
    layout: [
      "##############################",
      "#............................#",
      "#............................#",
      "#............................#",
      "#......###...................#",
      "#...................##########",
      "#...................##########",
      "#####..######.......##########",
      "#...................##########",
      "#............................#",
      "#....G.......................#",
      "#...................##########",
      "#.........#.........##########",
      "#...................##########",
      "#...................##########",
      "##############################"
    ],
    switches: [
      { gridX: 8, gridY: 3, isActive: false, targetId: 'barrier-3' }
    ],
    plates: [],
    barriers: [
      { id: 'barrier-3', gridX: 24, gridY: 1, height: 4, isOpen: false }
    ],
    fields: [
      { gridX: 5, gridY: 10, forceDir: 'UP' as const }
    ],
    drones: [
      { x: 400, y: 150, startX: 350, endX: 600, direction: 1, speed: 1.5, shootCooldown: 0, bullets: [] }
    ],
    platforms: [
      { x: 350, y: 250, startX: 350, startY: 250, endX: 350, endY: 450, t: 0, speed: 0.012, direction: 1 }
    ]
  },
  // LEVEL 4: Srishti Forge (The Memory Shrine)
  {
    width: 30,
    height: 18,
    startX: 3,
    startY: 14,
    exitX: 25,
    exitY: 8,
    layout: [
      "##############################",
      "#............................#",
      "#...#....................#...#",
      "#...#....................#...#",
      "#...#....................#...#",
      "#####....................#####",
      "#............................#",
      "#............................#",
      "#............................#",
      "#............................#",
      "#............................#",
      "#............................#",
      "#............................#",
      "#....#####..........#####....#",
      "#............................#",
      "#............................#",
      "##############################",
      "##############################"
    ],
    switches: [
      { gridX: 3, gridY: 10, isActive: false, targetId: 'forge-lock-1' },
      { gridX: 26, gridY: 10, isActive: false, targetId: 'forge-lock-2' }
    ],
    plates: [
      { gridX: 14, gridY: 12, isPressed: false, targetId: 'forge-lock-3' }
    ],
    barriers: [
      { id: 'forge-lock-1', gridX: 23, gridY: 7, height: 3, isOpen: false },
      { id: 'forge-lock-2', gridX: 23, gridY: 6, height: 1, isOpen: false },
      { id: 'forge-lock-3', gridX: 23, gridY: 9, height: 1, isOpen: false }
    ],
    fields: [
      { gridX: 8, gridY: 7, forceDir: 'RIGHT' as const },
      { gridX: 20, gridY: 7, forceDir: 'LEFT' as const }
    ],
    drones: [
      { x: 450, y: 100, startX: 300, endX: 650, direction: 1, speed: 2, shootCooldown: 0, bullets: [] },
      { x: 450, y: 480, startX: 250, endX: 680, direction: -1, speed: 2.2, shootCooldown: 0, bullets: [] }
    ],
    platforms: [
      { x: 300, y: 300, startX: 300, startY: 300, endX: 600, endY: 300, t: 0, speed: 0.007, direction: 1 }
    ]
  }
];

export const AetherForgeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Game state
  const [levelIndex, setLevelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [health, setHealth] = useState(100);
  const [energy, setEnergy] = useState(100);
  const [hasWon, setHasWon] = useState(false);
  
  // Settings
  const [musicVol, setMusicVol] = useState(0.4);
  const [sfxVol, setSfxVol] = useState(0.6);
  const [muted, setMuted] = useState(false);

  // References to keep state available in non-react canvas loop
  const stateRef = useRef({
    player: {
      x: 100,
      y: 100,
      vx: 0,
      vy: 0,
      width: 22,
      height: 22,
      gravityDir: 'DOWN' as 'DOWN' | 'UP' | 'LEFT' | 'RIGHT',
      dashCooldown: 0,
      dashTimer: 0,
      dashDir: { x: 0, y: 0 },
      isGrounded: false
    },
    keys: {} as Record<string, boolean>,
    particles: [] as Particle[],
    screenShake: 0,
    switches: [] as EnergySwitch[],
    plates: [] as PressurePlate[],
    barriers: [] as any[],
    fields: [] as GravityField[],
    drones: [] as SentryDrone[],
    platforms: [] as MovingPlatform[],
    levelComplete: false,
    deathTimer: 0,
    levelCompleteTimer: 0
  });

  // Start/Restart Game Handler
  const startGame = () => {
    setIsPlaying(true);
    setIsPaused(false);
    setHealth(100);
    setEnergy(100);
    setHasWon(false);
    
    // Load level values
    loadLevel(levelIndex);
    synth.setVolume(musicVol, sfxVol);
    synth.setMute(muted);
    synth.playSwitch();
  };

  const resetLevel = () => {
    setHealth(100);
    setEnergy(100);
    loadLevel(levelIndex);
    synth.playSwitch();
  };

  // Load level geometry into current physics state
  const loadLevel = (idx: number) => {
    const lvl = LEVELS[idx];
    const state = stateRef.current;
    
    state.player.x = lvl.startX * TILE_SIZE;
    state.player.y = lvl.startY * TILE_SIZE;
    state.player.vx = 0;
    state.player.vy = 0;
    state.player.gravityDir = 'DOWN';
    state.player.dashCooldown = 0;
    state.player.dashTimer = 0;
    
    state.switches = JSON.parse(JSON.stringify(lvl.switches));
    state.plates = JSON.parse(JSON.stringify(lvl.plates));
    state.barriers = JSON.parse(JSON.stringify(lvl.barriers));
    state.fields = JSON.parse(JSON.stringify(lvl.fields));
    state.drones = JSON.parse(JSON.stringify(lvl.drones));
    state.platforms = JSON.parse(JSON.stringify(lvl.platforms));
    state.particles = [];
    state.screenShake = 0;
    state.levelComplete = false;
    state.deathTimer = 0;
    state.levelCompleteTimer = 0;
  };

  // Trigger next level
  const nextLevel = () => {
    if (levelIndex < LEVELS.length - 1) {
      setLevelIndex(prev => prev + 1);
      loadLevel(levelIndex + 1);
      setHealth(100);
      setEnergy(100);
    } else {
      setHasWon(true);
      setIsPlaying(false);
      synth.playWin();
    }
  };

  // Keep volume settings updated
  useEffect(() => {
    synth.setVolume(musicVol, sfxVol);
    synth.setMute(muted);
  }, [musicVol, sfxVol, muted]);

  // Main Canvas Setup and Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleKeyDown = (e: KeyboardEvent) => {
      stateRef.current.keys[e.key.toLowerCase()] = true;
      
      if (!isPlaying || isPaused) return;

      // Handle direct shifts on press (rather than hold)
      if (e.key.toLowerCase() === 'q') {
        // Rotate gravity CCW
        rotateGravity(false);
      } else if (e.key.toLowerCase() === 'e') {
        // Rotate gravity CW
        rotateGravity(true);
      } else if (e.key.toLowerCase() === 'f' || e.key.toLowerCase() === 'r') {
        // Reverse gravity
        reverseGravity();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      stateRef.current.keys[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Shift Logic Helpers
    const rotateGravity = (clockwise: boolean) => {
      const state = stateRef.current;
      const dirs = ['DOWN', 'LEFT', 'UP', 'RIGHT'] as const;
      let currIdx = dirs.indexOf(state.player.gravityDir);
      
      if (clockwise) {
        currIdx = (currIdx + 1) % 4;
      } else {
        currIdx = (currIdx + 3) % 4;
      }
      state.player.gravityDir = dirs[currIdx];
      state.screenShake = 6;
      synth.playGravityShift(true);
    };

    const reverseGravity = () => {
      const state = stateRef.current;
      const invert: Record<string, 'DOWN' | 'UP' | 'LEFT' | 'RIGHT'> = {
        'DOWN': 'UP',
        'UP': 'DOWN',
        'LEFT': 'RIGHT',
        'RIGHT': 'LEFT'
      };
      state.player.gravityDir = invert[state.player.gravityDir];
      state.screenShake = 8;
      synth.playGravityShift(false);
    };

    // Particles Emitter
    const spawnParticles = (x: number, y: number, count: number, color: string, speed = 2) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const vel = Math.random() * speed + 0.5;
        stateRef.current.particles.push({
          x,
          y,
          vx: Math.cos(angle) * vel,
          vy: Math.sin(angle) * vel,
          life: 0,
          maxLife: Math.random() * 20 + 20,
          color,
          size: Math.random() * 3 + 1
        });
      }
    };

    // AABB overlap checking
    const checkOverlap = (rect1: any, rect2: any) => {
      return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
      );
    };

    // Engine loop updates (runs 60hz)
    const updateGameLogic = () => {
      if (!isPlaying || isPaused || hasWon) return;

      const state = stateRef.current;
      const p = state.player;
      const lvl = LEVELS[levelIndex];

      // Handle Death State
      if (health <= 0) {
        state.deathTimer++;
        if (state.deathTimer >= 40) {
          resetLevel();
        }
        return;
      }

      // Handle Level Exit Progress transition
      if (state.levelComplete) {
        state.levelCompleteTimer++;
        if (state.levelCompleteTimer >= 60) {
          nextLevel();
        }
        return;
      }

      // 1. Dashing Cooldown & Duration
      if (p.dashCooldown > 0) p.dashCooldown--;
      if (p.dashTimer > 0) {
        p.dashTimer--;
        // Spawn dash trails
        state.particles.push({
          x: p.x + p.width/2,
          y: p.y + p.height/2,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          life: 0,
          maxLife: 15,
          color: '#E5C583',
          size: Math.random() * 4 + 2
        });

        // Dash movement ignores gravity
        p.vx = p.dashDir.x * 9;
        p.vy = p.dashDir.y * 9;
      } else {
        // Apply Gravity Force
        const gravAcc = 0.35;
        if (p.gravityDir === 'DOWN') p.vy += gravAcc;
        else if (p.gravityDir === 'UP') p.vy -= gravAcc;
        else if (p.gravityDir === 'LEFT') p.vx -= gravAcc;
        else if (p.gravityDir === 'RIGHT') p.vx += gravAcc;

        // Walking Mechanics based on local floor orientation
        const moveAcc = 0.45;
        const drag = 0.82;
        const maxWalkSpeed = 4.2;

        if (p.gravityDir === 'DOWN' || p.gravityDir === 'UP') {
          // Horizontal walk
          if (state.keys['a'] || state.keys['arrowleft']) {
            p.vx -= moveAcc;
          } else if (state.keys['d'] || state.keys['arrowright']) {
            p.vx += moveAcc;
          }
          p.vx *= drag;
          if (Math.abs(p.vx) > maxWalkSpeed) p.vx = Math.sign(p.vx) * maxWalkSpeed;
        } else {
          // Vertical walk
          if (state.keys['w'] || state.keys['arrowup']) {
            p.vy -= moveAcc;
          } else if (state.keys['s'] || state.keys['arrowdown']) {
            p.vy += moveAcc;
          }
          p.vy *= drag;
          if (Math.abs(p.vy) > maxWalkSpeed) p.vy = Math.sign(p.vy) * maxWalkSpeed;
        }

        // Trigger Dash action
        if (state.keys[' '] && p.dashCooldown === 0) {
          let dx = 0;
          let dy = 0;
          if (p.gravityDir === 'DOWN' || p.gravityDir === 'UP') {
            if (state.keys['a'] || state.keys['arrowleft']) dx = -1;
            else if (state.keys['d'] || state.keys['arrowright']) dx = 1;
            else dx = p.vx >= 0 ? 1 : -1;
          } else {
            if (state.keys['w'] || state.keys['arrowup']) dy = -1;
            else if (state.keys['s'] || state.keys['arrowdown']) dy = 1;
            else dy = p.vy >= 0 ? 1 : -1;
          }
          p.dashDir = { x: dx, y: dy };
          p.dashTimer = 10;
          p.dashCooldown = 50;
          synth.playDash();
          state.screenShake = 4;
        }
      }

      // 2. Physics & Collision Loop
      p.x += p.vx;
      resolveTileCollisions('x');
      p.y += p.vy;
      resolveTileCollisions('y');

      // Update Moving Platforms & carry player along
      state.platforms.forEach((plat) => {
        plat.t += plat.speed * plat.direction;
        if (plat.t >= 1 || plat.t <= 0) plat.direction *= -1;
        
        const oldX = plat.x;
        const oldY = plat.y;
        plat.x = plat.startX + (plat.endX - plat.startX) * plat.t;
        plat.y = plat.startY + (plat.endY - plat.startY) * plat.t;

        const platWidth = 64;
        const platHeight = 16;
        
        const playerFeet = {
          x: p.x,
          y: p.y,
          width: p.width,
          height: p.height
        };
        const platRect = {
          x: plat.x,
          y: plat.y,
          width: platWidth,
          height: platHeight
        };

        if (checkOverlap(playerFeet, platRect)) {
          if (p.gravityDir === 'DOWN' && p.y + p.height - p.vy <= oldY) {
            p.y = plat.y - p.height;
            p.vy = 0;
            p.x += (plat.x - oldX);
          } else if (p.gravityDir === 'UP' && p.y - p.vy >= oldY + platHeight) {
            p.y = plat.y + platHeight;
            p.vy = 0;
            p.x += (plat.x - oldX);
          }
        }
      });

      // 3. Level exit logic
      const exitPixelX = lvl.exitX * TILE_SIZE + TILE_SIZE/2;
      const exitPixelY = lvl.exitY * TILE_SIZE + TILE_SIZE/2;
      const distToExit = Math.hypot((p.x + p.width/2) - exitPixelX, (p.y + p.height/2) - exitPixelY);
      if (distToExit < 24 && !state.levelComplete) {
        state.levelComplete = true;
        state.levelCompleteTimer = 0;
        spawnParticles(exitPixelX, exitPixelY, 40, '#E5C583', 3);
        synth.playWin();
      }

      // 4. Update switches and pressure plates
      state.plates.forEach((plate) => {
        const plateRect = {
          x: plate.gridX * TILE_SIZE + 4,
          y: plate.gridY * TILE_SIZE + 24,
          width: TILE_SIZE - 8,
          height: 8
        };
        const pRect = { x: p.x, y: p.y, width: p.width, height: p.height };
        const overlapped = checkOverlap(pRect, plateRect);
        if (overlapped && !plate.isPressed) {
          plate.isPressed = true;
          synth.playSwitch();
          state.screenShake = 2;
          state.barriers.forEach(b => {
            if (b.id === plate.targetId) b.isOpen = true;
          });
        } else if (!overlapped && plate.isPressed) {
          plate.isPressed = false;
          state.barriers.forEach(b => {
            if (b.id === plate.targetId) b.isOpen = false;
          });
        }
      });

      state.switches.forEach((sw) => {
        const swRect = {
          x: sw.gridX * TILE_SIZE + 6,
          y: sw.gridY * TILE_SIZE + 6,
          width: TILE_SIZE - 12,
          height: TILE_SIZE - 12
        };
        const pRect = { x: p.x, y: p.y, width: p.width, height: p.height };
        if (checkOverlap(pRect, swRect)) {
          if (p.dashTimer > 0 && !sw.isActive) {
            sw.isActive = true;
            synth.playSwitch();
            state.screenShake = 3;
            state.barriers.forEach(b => {
              if (b.id === sw.targetId) b.isOpen = true;
            });
            spawnParticles(swRect.x + 10, swRect.y + 10, 15, '#E5C583');
          }
        }
      });

      // 5. Laser triggers & force fields
      state.fields.forEach((field) => {
        const fRect = {
          x: field.gridX * TILE_SIZE,
          y: field.gridY * TILE_SIZE,
          width: TILE_SIZE,
          height: TILE_SIZE
        };
        const pRect = { x: p.x, y: p.y, width: p.width, height: p.height };
        if (checkOverlap(pRect, fRect)) {
          if (p.gravityDir !== field.forceDir) {
            p.gravityDir = field.forceDir;
            synth.playGravityShift(false);
            state.screenShake = 3;
            spawnParticles(p.x + p.width/2, p.y + p.height/2, 10, '#A8753B');
          }
        }
      });

      lvl.layout.forEach((row, rIdx) => {
        for (let cIdx = 0; cIdx < row.length; cIdx++) {
          if (row[cIdx] === 'L') {
            let laserLen = 1;
            let hitSolid = false;
            while (!hitSolid && rIdx + laserLen < lvl.height) {
              const checkCell = lvl.layout[rIdx + laserLen][cIdx];
              const barrierHit = state.barriers.find(b => !b.isOpen && b.gridX === cIdx && b.gridY === rIdx + laserLen);
              if (checkCell === '#' || barrierHit) {
                hitSolid = true;
              } else {
                laserLen++;
              }
            }

            const laserBeamRect = {
              x: cIdx * TILE_SIZE + TILE_SIZE/2 - 2,
              y: (rIdx + 1) * TILE_SIZE,
              width: 4,
              height: (laserLen - 1) * TILE_SIZE
            };
            const pRect = { x: p.x, y: p.y, width: p.width, height: p.height };
            if (checkOverlap(pRect, laserBeamRect)) {
              if (p.dashTimer === 0) {
                setHealth(prev => {
                  const n = Math.max(0, prev - 2.5);
                  if (n <= 0) {
                    spawnParticles(p.x + p.width/2, p.y + p.height/2, 25, '#A8753B');
                    synth.playDroneDestroy();
                  }
                  return n;
                });
              }
            }
          }
        }
      });

      // 6. Update Sentry Drones and bullets
      state.drones.forEach((drone) => {
        if (drone.x === -1000) return;
        
        drone.x += drone.speed * drone.direction;
        if (drone.x >= drone.endX) {
          drone.x = drone.endX;
          drone.direction = -1;
        } else if (drone.x <= drone.startX) {
          drone.x = drone.startX;
          drone.direction = 1;
        }

        const droneRect = { x: drone.x, y: drone.y, width: 24, height: 24 };
        const pRect = { x: p.x, y: p.y, width: p.width, height: p.height };
        if (checkOverlap(pRect, droneRect)) {
          if (p.dashTimer > 0) {
            drone.x = -1000;
            synth.playDroneDestroy();
            state.screenShake = 8;
            spawnParticles(droneRect.x + 12, droneRect.y + 12, 20, '#A8753B', 2.5);
          } else {
            setHealth(prev => Math.max(0, prev - 10));
            p.vx = -p.vx * 1.5;
            p.vy = -p.vy * 1.5;
            state.screenShake = 6;
          }
        }

        drone.shootCooldown++;
        if (drone.shootCooldown > 120) {
          drone.shootCooldown = 0;
          const angle = Math.atan2((p.y + p.height/2) - (drone.y + 12), (p.x + p.width/2) - (drone.x + 12));
          drone.bullets.push({
            x: drone.x + 12,
            y: drone.y + 12,
            vx: Math.cos(angle) * 3,
            vy: Math.sin(angle) * 3,
            life: 0
          });
          synth.playSwitch();
        }

        drone.bullets.forEach((b, bIdx) => {
          b.x += b.vx;
          b.y += b.vy;
          b.life++;

          const bRect = { x: b.x - 3, y: b.y - 3, width: 6, height: 6 };
          if (checkOverlap(pRect, bRect)) {
            if (p.dashTimer === 0) {
              setHealth(prev => Math.max(0, prev - 15));
              state.screenShake = 4;
            }
            drone.bullets.splice(bIdx, 1);
            spawnParticles(b.x, b.y, 5, '#E5C583');
          }

          const gX = Math.floor(b.x / TILE_SIZE);
          const gY = Math.floor(b.y / TILE_SIZE);
          if (gX >= 0 && gX < lvl.width && gY >= 0 && gY < lvl.height) {
            if (lvl.layout[gY][gX] === '#') {
              drone.bullets.splice(bIdx, 1);
            }
          }
          if (b.life > 180) drone.bullets.splice(bIdx, 1);
        });
      });

      state.particles.forEach((part, idx) => {
        part.x += part.vx;
        part.y += part.vy;
        part.life++;
        if (part.life >= part.maxLife) {
          state.particles.splice(idx, 1);
        }
      });
    };

    const resolveTileCollisions = (axis: 'x' | 'y') => {
      const state = stateRef.current;
      const p = state.player;
      const lvl = LEVELS[levelIndex];

      const checkLeft = Math.floor(p.x / TILE_SIZE);
      const checkRight = Math.floor((p.x + p.width - 0.1) / TILE_SIZE);
      const checkTop = Math.floor(p.y / TILE_SIZE);
      const checkBottom = Math.floor((p.y + p.height - 0.1) / TILE_SIZE);

      for (let r = checkTop; r <= checkBottom; r++) {
        for (let c = checkLeft; c <= checkRight; c++) {
          if (r < 0 || r >= lvl.height || c < 0 || c >= lvl.width) continue;
          
          const tile = lvl.layout[r][c];
          const isBarrier = state.barriers.some(b => !b.isOpen && b.gridX === c && b.gridY === r);

          if (tile === '#' || isBarrier) {
            if (axis === 'x') {
              if (p.vx > 0) {
                p.x = c * TILE_SIZE - p.width;
                p.vx = 0;
              } else if (p.vx < 0) {
                p.x = (c + 1) * TILE_SIZE;
                p.vx = 0;
              }
            } else {
              if (p.vy > 0) {
                p.y = r * TILE_SIZE - p.height;
                p.vy = 0;
              } else if (p.vy < 0) {
                p.y = (r + 1) * TILE_SIZE;
                p.vy = 0;
              }
            }
          }
        }
      }
    };

    const draw = () => {
      const state = stateRef.current;
      const p = state.player;
      const lvl = LEVELS[levelIndex];

      ctx.save();
      if (state.screenShake > 0) {
        const shakeX = (Math.random() - 0.5) * state.screenShake;
        const shakeY = (Math.random() - 0.5) * state.screenShake;
        ctx.translate(shakeX, shakeY);
        state.screenShake *= 0.88;
        if (state.screenShake < 0.2) state.screenShake = 0;
      }

      ctx.fillStyle = '#0E0E0E';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(168, 117, 59, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += TILE_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += TILE_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const rayGrad = ctx.createRadialGradient(
        p.x + p.width/2, p.y + p.height/2, 5,
        p.x + p.width/2, p.y + p.height/2, 280
      );
      rayGrad.addColorStop(0, 'rgba(229, 197, 131, 0.15)');
      rayGrad.addColorStop(0.5, 'rgba(34, 53, 47, 0.05)');
      rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = rayGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      lvl.layout.forEach((row, rIdx) => {
        for (let cIdx = 0; cIdx < row.length; cIdx++) {
          const tile = row[cIdx];
          const x = cIdx * TILE_SIZE;
          const y = rIdx * TILE_SIZE;

          if (tile === '#') {
            ctx.fillStyle = '#1A1813';
            ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
            
            ctx.strokeStyle = 'rgba(168, 117, 59, 0.4)';
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4);
            
            ctx.beginPath();
            ctx.moveTo(x + TILE_SIZE/2, y + 6);
            ctx.lineTo(x + TILE_SIZE - 6, y + TILE_SIZE/2);
            ctx.lineTo(x + TILE_SIZE/2, y + TILE_SIZE - 6);
            ctx.lineTo(x + 6, y + TILE_SIZE/2);
            ctx.closePath();
            ctx.strokeStyle = 'rgba(229, 197, 131, 0.12)';
            ctx.stroke();
          } else if (tile === 'E') {
            const cx = x + TILE_SIZE/2;
            const cy = y + TILE_SIZE/2;
            
            ctx.strokeStyle = '#A8753B';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(cx, cy, 22, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = 'rgba(229, 197, 131, 0.2)';
            ctx.beginPath();
            ctx.arc(cx, cy, 14, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = '#E5C583';
            ctx.lineWidth = 1.5;
            for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
              ctx.beginPath();
              ctx.moveTo(cx + Math.cos(angle) * 14, cy + Math.sin(angle) * 14);
              ctx.lineTo(cx + Math.cos(angle) * 28, cy + Math.sin(angle) * 28);
              ctx.stroke();
            }
          }
        }
      });

      state.plates.forEach((plate) => {
        const px = plate.gridX * TILE_SIZE;
        const py = plate.gridY * TILE_SIZE;
        ctx.fillStyle = plate.isPressed ? '#E5C583' : '#A8753B';
        ctx.fillRect(px + 4, py + 26, TILE_SIZE - 8, 6);
        if (!plate.isPressed) {
          ctx.fillStyle = '#D6C2A1';
          ctx.fillRect(px + 6, py + 22, TILE_SIZE - 12, 4);
        }
      });

      state.switches.forEach((sw) => {
        const sx = sw.gridX * TILE_SIZE + TILE_SIZE/2;
        const sy = sw.gridY * TILE_SIZE + TILE_SIZE/2;
        
        ctx.strokeStyle = '#A8753B';
        ctx.lineWidth = 2;
        ctx.strokeRect(sw.gridX * TILE_SIZE + 6, sw.gridY * TILE_SIZE + 6, TILE_SIZE - 12, TILE_SIZE - 12);
        
        ctx.fillStyle = sw.isActive ? 'rgba(229, 197, 131, 0.7)' : 'rgba(34, 53, 47, 0.5)';
        ctx.beginPath();
        ctx.arc(sx, sy, 6, 0, Math.PI * 2);
        ctx.fill();
        
        if (sw.isActive) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#E5C583';
          ctx.strokeStyle = '#E5C583';
          ctx.strokeRect(sw.gridX * TILE_SIZE + 3, sw.gridY * TILE_SIZE + 3, TILE_SIZE - 6, TILE_SIZE - 6);
          ctx.shadowBlur = 0;
        }
      });

      state.barriers.forEach((b) => {
        if (!b.isOpen) {
          const bx = b.gridX * TILE_SIZE;
          const by = b.gridY * TILE_SIZE;
          const heightPixels = b.height * TILE_SIZE;
          
          ctx.fillStyle = '#22352F';
          ctx.fillRect(bx + 4, by, TILE_SIZE - 8, heightPixels);
          
          ctx.strokeStyle = '#A8753B';
          ctx.lineWidth = 2;
          ctx.strokeRect(bx + 4, by, TILE_SIZE - 8, heightPixels);
          
          for (let py = by; py < by + heightPixels; py += 16) {
            ctx.beginPath();
            ctx.moveTo(bx + 4, py);
            ctx.lineTo(bx + TILE_SIZE - 4, py);
            ctx.stroke();
          }
        }
      });

      state.fields.forEach((field) => {
        const fx = field.gridX * TILE_SIZE;
        const fy = field.gridY * TILE_SIZE;
        ctx.fillStyle = 'rgba(168, 117, 59, 0.08)';
        ctx.fillRect(fx, fy, TILE_SIZE, TILE_SIZE);
        
        ctx.strokeStyle = 'rgba(229, 197, 131, 0.4)';
        ctx.lineWidth = 1.5;
        const offset = (Date.now() / 8) % 16;
        
        ctx.save();
        ctx.beginPath();
        ctx.rect(fx, fy, TILE_SIZE, TILE_SIZE);
        ctx.clip();
        
        if (field.forceDir === 'UP') {
          for (let y = fy + offset; y < fy + TILE_SIZE + 16; y += 16) {
            ctx.beginPath();
            ctx.moveTo(fx + 8, y);
            ctx.lineTo(fx + TILE_SIZE/2, y - 8);
            ctx.lineTo(fx + TILE_SIZE - 8, y);
            ctx.stroke();
          }
        } else if (field.forceDir === 'RIGHT') {
          for (let x = fx - offset; x < fx + TILE_SIZE + 16; x += 16) {
            ctx.beginPath();
            ctx.moveTo(x, fy + 8);
            ctx.lineTo(x + 8, fy + TILE_SIZE/2);
            ctx.lineTo(x, fy + TILE_SIZE - 8);
            ctx.stroke();
          }
        } else if (field.forceDir === 'LEFT') {
          for (let x = fx + offset; x < fx + TILE_SIZE + 16; x += 16) {
            ctx.beginPath();
            ctx.moveTo(x, fy + 8);
            ctx.lineTo(x - 8, fy + TILE_SIZE/2);
            ctx.lineTo(x, fy + TILE_SIZE - 8);
            ctx.stroke();
          }
        }
        ctx.restore();
      });

      lvl.layout.forEach((row, rIdx) => {
        for (let cIdx = 0; cIdx < row.length; cIdx++) {
          if (row[cIdx] === 'L') {
            const lx = cIdx * TILE_SIZE;
            const ly = rIdx * TILE_SIZE;

            ctx.fillStyle = '#A8753B';
            ctx.fillRect(lx + 8, ly, TILE_SIZE - 16, 12);
            ctx.fillStyle = '#0E0E0E';
            ctx.fillRect(lx + 12, ly + 8, TILE_SIZE - 24, 4);

            let laserLen = 1;
            let hitSolid = false;
            while (!hitSolid && rIdx + laserLen < lvl.height) {
              const checkCell = lvl.layout[rIdx + laserLen][cIdx];
              const barrierHit = state.barriers.find(b => !b.isOpen && b.gridX === cIdx && b.gridY === rIdx + laserLen);
              if (checkCell === '#' || barrierHit) {
                hitSolid = true;
              } else {
                laserLen++;
              }
            }

            const beamX = lx + TILE_SIZE/2;
            const beamYStart = ly + 12;
            const beamYEnd = (rIdx + laserLen) * TILE_SIZE;

            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(255, 70, 70, 0.9)';
            
            ctx.strokeStyle = 'rgba(255, 50, 50, 0.4)';
            ctx.lineWidth = 4 + Math.sin(Date.now() / 40) * 1.5;
            ctx.beginPath();
            ctx.moveTo(beamX, beamYStart);
            ctx.lineTo(beamX, beamYEnd);
            ctx.stroke();

            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(beamX, beamYStart);
            ctx.lineTo(beamX, beamYEnd);
            ctx.stroke();

            ctx.shadowBlur = 0;
          }
        }
      });

      state.platforms.forEach((plat) => {
        ctx.fillStyle = '#A8753B';
        ctx.fillRect(plat.x, plat.y, 64, 16);
        ctx.strokeStyle = '#E5C583';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(plat.x + 2, plat.y + 2, 60, 12);
        
        ctx.beginPath();
        ctx.moveTo(plat.x + 32, plat.y + 2);
        ctx.lineTo(plat.x + 32, plat.y + 14);
        ctx.stroke();
      });

      state.drones.forEach((drone) => {
        if (drone.x === -1000) return;
        
        const dx = drone.x;
        const dy = drone.y;
        
        ctx.fillStyle = '#22352F';
        ctx.beginPath();
        ctx.moveTo(dx + 12, dy);
        ctx.lineTo(dx + 24, dy + 12);
        ctx.lineTo(dx + 12, dy + 24);
        ctx.lineTo(dx, dy + 12);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#A8753B';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#E5C583';
        ctx.beginPath();
        ctx.arc(dx + 12, dy + 12, 4 + Math.sin(Date.now() / 150) * 2, 0, Math.PI * 2);
        ctx.fill();

        drone.bullets.forEach((b) => {
          ctx.fillStyle = '#E5C583';
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#E5C583';
          ctx.beginPath();
          ctx.arc(b.x, b.y, 3.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      });

      if (health > 0) {
        ctx.save();
        ctx.translate(p.x + p.width/2, p.y + p.height/2);
        
        let rotAngle = 0;
        if (p.gravityDir === 'UP') rotAngle = Math.PI;
        else if (p.gravityDir === 'LEFT') rotAngle = Math.PI / 2;
        else if (p.gravityDir === 'RIGHT') rotAngle = -Math.PI / 2;
        ctx.rotate(rotAngle);

        ctx.fillStyle = '#1A150D';
        ctx.fillRect(-p.width/2, -p.height/2, p.width, p.height);

        ctx.strokeStyle = '#A8753B';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(-p.width/2 + 1, -p.height/2 + 1, p.width - 2, p.height - 2);

        ctx.strokeStyle = '#E5C583';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = p.dashTimer > 0 ? '#FFFFFF' : '#E5C583';
        ctx.shadowBlur = p.dashTimer > 0 ? 15 : 6;
        ctx.shadowColor = '#E5C583';
        ctx.beginPath();
        ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.restore();
      }

      state.particles.forEach((part) => {
        ctx.fillStyle = part.color;
        ctx.globalAlpha = 1 - (part.life / part.maxLife);
        ctx.beginPath();
        ctx.arc(part.x, part.y, part.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      ctx.restore();
    };

    const loop = () => {
      updateGameLogic();
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlaying, isPaused, hasWon, levelIndex]);

  useEffect(() => {
    let statInterval: NodeJS.Timeout;
    if (isPlaying && !isPaused && !hasWon) {
      statInterval = setInterval(() => {
        const state = stateRef.current;
        if (state.player.dashCooldown === 0) {
          setEnergy(prev => Math.min(100, prev + 2.5));
        } else {
          setEnergy(Math.round((1 - state.player.dashCooldown / 50) * 100));
        }
      }, 100);
    }
    return () => clearInterval(statInterval);
  }, [isPlaying, isPaused, hasWon]);

  useEffect(() => {
    const savedMusic = localStorage.getItem('aether_music_volume');
    const savedSfx = localStorage.getItem('aether_sfx_volume');
    const savedMute = localStorage.getItem('aether_muted');
    if (savedMusic) setMusicVol(parseFloat(savedMusic));
    if (savedSfx) setSfxVol(parseFloat(savedSfx));
    if (savedMute) setMuted(savedMute === 'true');
  }, []);

  const saveSettings = (m: number, s: number, mute: boolean) => {
    setMusicVol(m);
    setSfxVol(s);
    setMuted(mute);
    localStorage.setItem('aether_music_volume', m.toString());
    localStorage.setItem('aether_sfx_volume', s.toString());
    localStorage.setItem('aether_muted', mute.toString());
  };

  return (
    <div className="w-full flex flex-col items-center select-none bg-charcoal border border-bronze/10 rounded-lg overflow-hidden shadow-2xl relative">
      <div className="relative aspect-[16/9] w-full max-w-4xl bg-black overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={960}
          height={512}
          className="w-full h-full object-contain"
        />

        {!isPlaying && !hasWon && (
          <div className="absolute inset-0 bg-charcoal/95 backdrop-blur-md flex flex-col items-center justify-center p-6 z-30">
            <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-gold mb-2">
              Srishti Studios Release
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-light text-ivory tracking-wider mb-6 text-center">
              PROJECT: <span className="gold-gradient-text italic font-normal">AETHER FORGE</span>
            </h1>
            
            <p className="text-xs text-ivory/60 text-center max-w-md mb-8 leading-relaxed font-light">
              Use gravity vector shifting and force dashes to navigate ancient sandstone vault chambers. Solve the Aether Forge.
            </p>

            <button
              onClick={startGame}
              className="group flex items-center gap-2 rounded bg-gold px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-charcoal hover:bg-ivory hover:scale-[1.02] transition-all shadow-lg pointer-events-auto cursor-pointer"
            >
              <Play size={14} fill="currentColor" /> Play in Browser
            </button>

            <div className="mt-12 flex gap-12 text-[10px] tracking-widest uppercase text-ivory/40">
              <span className="flex items-center gap-1.5"><Sliders size={12} /> Keyboard Controls</span>
            </div>
          </div>
        )}

        {hasWon && (
          <div className="absolute inset-0 bg-charcoal/95 backdrop-blur-md flex flex-col items-center justify-center p-6 z-30">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold mb-2">Mandala Completed</span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-ivory mb-6 text-center">
              Forge Solved <span className="gold-gradient-text italic font-normal">Successfully.</span>
            </h2>
            <p className="text-xs text-ivory/70 text-center max-w-sm mb-8 leading-relaxed font-light">
              Thank you for playing the first release of Srishti Studios. You have restored energy balance to the Aether ruins.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => { setLevelIndex(0); startGame(); }}
                className="rounded bg-gold px-6 py-3 text-xs font-bold uppercase tracking-widest text-charcoal hover:bg-ivory transition-all shadow-lg cursor-pointer"
              >
                Replay Game
              </button>
              <a
                href="/aether_forge.png"
                download="AetherForge_Desktop.zip"
                className="rounded border border-bronze/40 bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-bronze/20 transition-all cursor-pointer"
              >
                Get Windows Build
              </a>
            </div>
          </div>
        )}

        {isPlaying && health <= 0 && (
          <div className="absolute inset-0 bg-red-950/60 backdrop-blur-sm flex flex-col items-center justify-center z-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-red-400 font-bold mb-2">Core Fragmented</span>
            <h3 className="text-2xl font-serif text-ivory tracking-wider uppercase font-light">Reconstructing Core...</h3>
          </div>
        )}

        {isPlaying && stateRef.current.levelComplete && (
          <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm flex flex-col items-center justify-center z-20 transition-all">
            <div className="text-center p-8 bg-charcoal/90 border border-gold/20 rounded shadow-2xl">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-2 block">Symmetry Restored</span>
              <h3 className="text-xl font-serif text-ivory tracking-wide font-light flex items-center justify-center gap-2">
                Chamber {levelIndex + 1} Cleared <Check size={18} className="text-gold" />
              </h3>
            </div>
          </div>
        )}

        {isPlaying && health > 0 && !stateRef.current.levelComplete && (
          <div className="absolute inset-x-0 top-0 p-4 flex justify-between items-center pointer-events-none z-10 text-xs text-ivory/80 font-mono select-none">
            <div className="flex flex-col gap-2 pointer-events-auto">
              <div className="flex items-center gap-2">
                <span className="w-12 text-[10px] tracking-widest uppercase text-ivory/50">Core</span>
                <div className="w-32 h-1.5 bg-black border border-bronze/20 rounded overflow-hidden">
                  <div className="h-full bg-gold transition-all" style={{ width: `${health}%` }} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-12 text-[10px] tracking-widest uppercase text-ivory/50">Dash</span>
                <div className="w-32 h-1.5 bg-black border border-bronze/20 rounded overflow-hidden">
                  <div className="h-full bg-cyan-400 transition-all" style={{ width: `${energy}%` }} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pointer-events-auto">
              <span className="text-[10px] tracking-widest uppercase text-gold">Chamber {levelIndex + 1} / 4</span>
              
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-1.5 rounded border border-bronze/20 bg-charcoal/80 text-ivory hover:text-gold hover:border-gold backdrop-blur transition-all cursor-pointer"
                title="Pause Menu"
              >
                {isPaused ? <Play size={12} fill="currentColor" /> : <Pause size={12} fill="currentColor" />}
              </button>

              <button
                onClick={resetLevel}
                className="p-1.5 rounded border border-bronze/20 bg-charcoal/80 text-ivory hover:text-gold hover:border-gold backdrop-blur transition-all cursor-pointer"
                title="Reset Level"
              >
                <RotateCcw size={12} />
              </button>
            </div>
          </div>
        )}

        {isPlaying && isPaused && (
          <div className="absolute inset-0 bg-charcoal/90 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20">
            <h2 className="text-2xl font-serif text-ivory tracking-wide mb-6">Game Paused</h2>
            
            <div className="w-64 space-y-6 mb-8 text-xs font-light text-ivory/80">
              <div className="space-y-2">
                <div className="flex justify-between font-mono">
                  <span>AMBIENCE VOLUME</span>
                  <span>{Math.round(musicVol * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={musicVol}
                  onChange={(e) => saveSettings(parseFloat(e.target.value), sfxVol, muted)}
                  className="w-full accent-gold bg-bronze/10 h-1 rounded cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between font-mono">
                  <span>EFFECTS VOLUME</span>
                  <span>{Math.round(sfxVol * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={sfxVol}
                  onChange={(e) => saveSettings(musicVol, parseFloat(e.target.value), muted)}
                  className="w-full accent-gold bg-bronze/10 h-1 rounded cursor-pointer"
                />
              </div>

              <button
                onClick={() => saveSettings(musicVol, sfxVol, !muted)}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-gold hover:text-white cursor-pointer"
              >
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} />} {muted ? 'Unmute Sound' : 'Mute Sound'}
              </button>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setIsPaused(false)}
                className="rounded bg-gold px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-charcoal hover:bg-ivory transition-all shadow-md cursor-pointer"
              >
                Resume
              </button>
              <button
                onClick={() => { setIsPlaying(false); setIsPaused(false); }}
                className="rounded border border-bronze/30 bg-transparent px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-bronze/10 transition-all cursor-pointer"
              >
                Main Menu
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-full bg-[#090909] border-t border-bronze/10 p-5 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-ivory/60 font-light leading-relaxed select-none">
        <div>
          <h4 className="text-[10px] font-bold tracking-widest uppercase text-gold mb-1">AETHER MOVEMENT</h4>
          <p>Use <strong className="text-ivory">A / D</strong> or <strong className="text-ivory">Arrow Keys</strong> to walk horizontally. If gravity is shifted sideways, use <strong className="text-ivory">W / S</strong> to walk along walls.</p>
        </div>
        <div>
          <h4 className="text-[10px] font-bold tracking-widest uppercase text-gold mb-1">GRAVITY SHIFT</h4>
          <p>Press <strong className="text-ivory">Q / E</strong> to rotate gravity 90 degrees left or right. Press <strong className="text-ivory">R / F</strong> to reverse gravity upside down.</p>
        </div>
        <div>
          <h4 className="text-[10px] font-bold tracking-widest uppercase text-gold mb-1">FORCE DASH</h4>
          <p>Press <strong className="text-ivory">Spacebar</strong> while moving to dash. Dashing provides brief invulnerability to bypass lasers and destroy sentry drones.</p>
        </div>
      </div>
    </div>
  );
};

export default AetherForgeGame;
