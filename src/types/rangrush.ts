// RangRush: Elements of Srishti - Game Types & Level Definitions

export type ElementType = 'AGNI' | 'JALA' | 'PRITHVI' | 'VAJRA' | 'CHANDRA' | 'SURYA';

export type SpecialType = 'NONE' | 'LINE_HORIZ' | 'LINE_VERT' | 'BOMB' | 'RAINBOW';

export type ObstacleType = 'NONE' | 'STONE' | 'SEAL' | 'BARRIER';

export interface Tile {
  id: string;
  element: ElementType;
  special: SpecialType;
  obstacle: ObstacleType;
  obstacleHp: number; // e.g. 1 for STONE/BARRIER, 2 for SEAL
  row: number;
  col: number;
  isMatched?: boolean;
  isNew?: boolean;
  isSwapping?: boolean;
}

export type ObjectiveType = 'SCORE' | 'DESTROY_ELEMENTS' | 'CLEAR_OBSTACLES';

export interface LevelObjective {
  type: ObjectiveType;
  targetScore?: number;
  requiredElements?: Partial<Record<ElementType, number>>;
  requiredObstacles?: number;
}

export interface LevelConfig {
  id: number;
  title: string;
  moves: number;
  targetScore: number;
  objective: LevelObjective;
  initialObstacles?: { row: number; col: number; type: ObstacleType; hp: number }[];
  starThresholds: [number, number, number]; // [1 star score, 2 stars score, 3 stars score]
  allowedElements: ElementType[];
}

export interface GameStats {
  score: number;
  movesLeft: number;
  combo: number;
  elementsDestroyed: Record<ElementType, number>;
  obstaclesCleared: number;
  specialTilesCreated: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

export interface SoundSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  reducedMotion: boolean;
}

// 6 Mystical Elemental Visual Definitions
export const ELEMENT_METADATA: Record<ElementType, {
  name: string;
  sanskrit: string;
  symbol: string;
  color: string;
  glowColor: string;
  bgGradient: string;
  description: string;
}> = {
  AGNI: {
    name: 'Agni',
    sanskrit: 'अग्नि',
    symbol: '🔥',
    color: '#F97316', // Vibrant Ember Orange
    glowColor: 'rgba(249, 115, 22, 0.6)',
    bgGradient: 'from-amber-700/80 to-red-900/90',
    description: 'The Primordial Fire — Radiates intense heat and line-clearing power.'
  },
  JALA: {
    name: 'Jala',
    sanskrit: 'जल',
    symbol: '💧',
    color: '#06B6D4', // Deep Ocean Cyan
    glowColor: 'rgba(6, 182, 212, 0.6)',
    bgGradient: 'from-cyan-700/80 to-blue-900/90',
    description: 'The Fluid Water — Flows with serene elegance and cascading energy.'
  },
  PRITHVI: {
    name: 'Prithvi',
    sanskrit: 'पृथ्वी',
    symbol: '🌿',
    color: '#10B981', // Emerald Nature
    glowColor: 'rgba(16, 185, 129, 0.6)',
    bgGradient: 'from-emerald-700/80 to-teal-950/90',
    description: 'The Sacred Earth — Grounding strength that withstands elemental forces.'
  },
  VAJRA: {
    name: 'Vajra',
    sanskrit: 'वज्र',
    symbol: '⚡',
    color: '#A855F7', // Mystic Electric Purple
    glowColor: 'rgba(168, 85, 247, 0.6)',
    bgGradient: 'from-purple-700/80 to-indigo-950/90',
    description: 'The Cosmic Thunderbolt — Pierces vertical columns with lightning power.'
  },
  CHANDRA: {
    name: 'Chandra',
    sanskrit: 'चन्द्र',
    symbol: '🌙',
    color: '#38BDF8', // Celestial Silver Blue
    glowColor: 'rgba(56, 189, 248, 0.6)',
    bgGradient: 'from-sky-700/80 to-slate-900/90',
    description: 'The Lunar Light — Illuminates hidden path patterns and shatters targets.'
  },
  SURYA: {
    name: 'Surya',
    sanskrit: 'सूर्य',
    symbol: '☀️',
    color: '#EAB308', // Solar Gold
    glowColor: 'rgba(234, 179, 8, 0.6)',
    bgGradient: 'from-yellow-600/80 to-amber-900/90',
    description: 'The Solar Sun — Unleashes powerful surrounding explosive bursts.'
  }
};

const ALL_ELEMENTS: ElementType[] = ['AGNI', 'JALA', 'PRITHVI', 'VAJRA', 'CHANDRA', 'SURYA'];

// 20 Playable Levels with Escalating Difficulty & Objectives
export const RANGRUSH_LEVELS: LevelConfig[] = [
  {
    id: 1,
    title: 'Awakening of Agni',
    moves: 30,
    targetScore: 1000,
    objective: { type: 'SCORE', targetScore: 1000 },
    starThresholds: [1000, 2000, 3500],
    allowedElements: ['AGNI', 'JALA', 'PRITHVI', 'VAJRA', 'CHANDRA', 'SURYA']
  },
  {
    id: 2,
    title: 'Flowing Jala',
    moves: 28,
    targetScore: 1500,
    objective: { type: 'DESTROY_ELEMENTS', targetScore: 1500, requiredElements: { JALA: 12 } },
    starThresholds: [1500, 2800, 4200],
    allowedElements: ALL_ELEMENTS
  },
  {
    id: 3,
    title: 'Earthly Foundations',
    moves: 26,
    targetScore: 2000,
    objective: { type: 'DESTROY_ELEMENTS', targetScore: 2000, requiredElements: { PRITHVI: 15 } },
    starThresholds: [2000, 3500, 5000],
    allowedElements: ALL_ELEMENTS
  },
  {
    id: 4,
    title: 'Stone Barrier Awakens',
    moves: 25,
    targetScore: 2200,
    objective: { type: 'CLEAR_OBSTACLES', targetScore: 2200, requiredObstacles: 4 },
    initialObstacles: [
      { row: 3, col: 3, type: 'STONE', hp: 1 },
      { row: 3, col: 4, type: 'STONE', hp: 1 },
      { row: 4, col: 3, type: 'STONE', hp: 1 },
      { row: 4, col: 4, type: 'STONE', hp: 1 }
    ],
    starThresholds: [2200, 3800, 5500],
    allowedElements: ALL_ELEMENTS
  },
  {
    id: 5,
    title: 'Vajra Lightning Strike',
    moves: 25,
    targetScore: 2500,
    objective: { type: 'DESTROY_ELEMENTS', targetScore: 2500, requiredElements: { VAJRA: 18 } },
    starThresholds: [2500, 4200, 6000],
    allowedElements: ALL_ELEMENTS
  },
  {
    id: 6,
    title: 'Lunar Reflection',
    moves: 24,
    targetScore: 3000,
    objective: { type: 'DESTROY_ELEMENTS', targetScore: 3000, requiredElements: { CHANDRA: 20 } },
    starThresholds: [3000, 4800, 7000],
    allowedElements: ALL_ELEMENTS
  },
  {
    id: 7,
    title: 'Surya Solar Chamber',
    moves: 24,
    targetScore: 3500,
    objective: { type: 'CLEAR_OBSTACLES', targetScore: 3500, requiredObstacles: 6 },
    initialObstacles: [
      { row: 2, col: 2, type: 'STONE', hp: 1 },
      { row: 2, col: 5, type: 'STONE', hp: 1 },
      { row: 5, col: 2, type: 'STONE', hp: 1 },
      { row: 5, col: 5, type: 'STONE', hp: 1 },
      { row: 3, col: 3, type: 'BARRIER', hp: 1 },
      { row: 4, col: 4, type: 'BARRIER', hp: 1 }
    ],
    starThresholds: [3500, 5500, 8000],
    allowedElements: ALL_ELEMENTS
  },
  {
    id: 8,
    title: 'Dual Elements Harmony',
    moves: 22,
    targetScore: 4000,
    objective: { type: 'DESTROY_ELEMENTS', targetScore: 4000, requiredElements: { AGNI: 15, JALA: 15 } },
    starThresholds: [4000, 6500, 9000],
    allowedElements: ALL_ELEMENTS
  },
  {
    id: 9,
    title: 'Ancient Seal of Stone',
    moves: 22,
    targetScore: 4500,
    objective: { type: 'CLEAR_OBSTACLES', targetScore: 4500, requiredObstacles: 8 },
    initialObstacles: [
      { row: 1, col: 1, type: 'SEAL', hp: 2 },
      { row: 1, col: 6, type: 'SEAL', hp: 2 },
      { row: 6, col: 1, type: 'SEAL', hp: 2 },
      { row: 6, col: 6, type: 'SEAL', hp: 2 },
      { row: 3, col: 3, type: 'STONE', hp: 1 },
      { row: 3, col: 4, type: 'STONE', hp: 1 },
      { row: 4, col: 3, type: 'STONE', hp: 1 },
      { row: 4, col: 4, type: 'STONE', hp: 1 }
    ],
    starThresholds: [4500, 7200, 10000],
    allowedElements: ALL_ELEMENTS
  },
  {
    id: 10,
    title: 'The Great Elemental Conflux',
    moves: 22,
    targetScore: 5000,
    objective: { type: 'SCORE', targetScore: 5000 },
    starThresholds: [5000, 8000, 11500],
    allowedElements: ALL_ELEMENTS
  },
  {
    id: 11,
    title: 'Prithvi Earth Fortress',
    moves: 20,
    targetScore: 5500,
    objective: { type: 'DESTROY_ELEMENTS', targetScore: 5500, requiredElements: { PRITHVI: 25 } },
    starThresholds: [5500, 8800, 12500],
    allowedElements: ALL_ELEMENTS
  },
  {
    id: 12,
    title: 'Barrier of Eternity',
    moves: 20,
    targetScore: 6000,
    objective: { type: 'CLEAR_OBSTACLES', targetScore: 6000, requiredObstacles: 10 },
    initialObstacles: [
      { row: 0, col: 3, type: 'BARRIER', hp: 1 },
      { row: 0, col: 4, type: 'BARRIER', hp: 1 },
      { row: 7, col: 3, type: 'BARRIER', hp: 1 },
      { row: 7, col: 4, type: 'BARRIER', hp: 1 },
      { row: 3, col: 0, type: 'STONE', hp: 1 },
      { row: 4, col: 0, type: 'STONE', hp: 1 },
      { row: 3, col: 7, type: 'STONE', hp: 1 },
      { row: 4, col: 7, type: 'STONE', hp: 1 },
      { row: 3, col: 3, type: 'SEAL', hp: 2 },
      { row: 4, col: 4, type: 'SEAL', hp: 2 }
    ],
    starThresholds: [6000, 9500, 13500],
    allowedElements: ALL_ELEMENTS
  },
  {
    id: 13,
    title: 'Agni & Vajra Storm',
    moves: 20,
    targetScore: 6500,
    objective: { type: 'DESTROY_ELEMENTS', targetScore: 6500, requiredElements: { AGNI: 20, VAJRA: 20 } },
    starThresholds: [6500, 10200, 14500],
    allowedElements: ALL_ELEMENTS
  },
  {
    id: 14,
    title: 'Lunar Eclipse',
    moves: 19,
    targetScore: 7000,
    objective: { type: 'DESTROY_ELEMENTS', targetScore: 7000, requiredElements: { CHANDRA: 25, SURYA: 15 } },
    starThresholds: [7000, 11000, 15500],
    allowedElements: ALL_ELEMENTS
  },
  {
    id: 15,
    title: 'Chamber of Sealed Riches',
    moves: 18,
    targetScore: 7500,
    objective: { type: 'CLEAR_OBSTACLES', targetScore: 7500, requiredObstacles: 12 },
    initialObstacles: [
      { row: 2, col: 2, type: 'SEAL', hp: 2 },
      { row: 2, col: 5, type: 'SEAL', hp: 2 },
      { row: 5, col: 2, type: 'SEAL', hp: 2 },
      { row: 5, col: 5, type: 'SEAL', hp: 2 },
      { row: 3, col: 2, type: 'STONE', hp: 1 },
      { row: 3, col: 5, type: 'STONE', hp: 1 },
      { row: 4, col: 2, type: 'STONE', hp: 1 },
      { row: 4, col: 5, type: 'STONE', hp: 1 },
      { row: 2, col: 3, type: 'BARRIER', hp: 1 },
      { row: 2, col: 4, type: 'BARRIER', hp: 1 },
      { row: 5, col: 3, type: 'BARRIER', hp: 1 },
      { row: 5, col: 4, type: 'BARRIER', hp: 1 }
    ],
    starThresholds: [7500, 12000, 17000],
    allowedElements: ALL_ELEMENTS
  },
  {
    id: 16,
    title: 'Tri-Element Triumph',
    moves: 18,
    targetScore: 8000,
    objective: { type: 'DESTROY_ELEMENTS', targetScore: 8000, requiredElements: { JALA: 20, PRITHVI: 20, SURYA: 20 } },
    starThresholds: [8000, 13000, 18500],
    allowedElements: ALL_ELEMENTS
  },
  {
    id: 17,
    title: 'The Stone Labyrinth',
    moves: 17,
    targetScore: 9000,
    objective: { type: 'CLEAR_OBSTACLES', targetScore: 9000, requiredObstacles: 14 },
    initialObstacles: [
      { row: 1, col: 2, type: 'STONE', hp: 1 },
      { row: 1, col: 5, type: 'STONE', hp: 1 },
      { row: 2, col: 1, type: 'STONE', hp: 1 },
      { row: 2, col: 6, type: 'STONE', hp: 1 },
      { row: 5, col: 1, type: 'STONE', hp: 1 },
      { row: 5, col: 6, type: 'STONE', hp: 1 },
      { row: 6, col: 2, type: 'STONE', hp: 1 },
      { row: 6, col: 5, type: 'STONE', hp: 1 },
      { row: 3, col: 3, type: 'SEAL', hp: 2 },
      { row: 3, col: 4, type: 'SEAL', hp: 2 },
      { row: 4, col: 3, type: 'SEAL', hp: 2 },
      { row: 4, col: 4, type: 'SEAL', hp: 2 },
      { row: 0, col: 0, type: 'BARRIER', hp: 1 },
      { row: 7, col: 7, type: 'BARRIER', hp: 1 }
    ],
    starThresholds: [9000, 14500, 20000],
    allowedElements: ALL_ELEMENTS
  },
  {
    id: 18,
    title: 'Vajra Overcharge',
    moves: 16,
    targetScore: 10000,
    objective: { type: 'DESTROY_ELEMENTS', targetScore: 10000, requiredElements: { VAJRA: 30 } },
    starThresholds: [10000, 16000, 22000],
    allowedElements: ALL_ELEMENTS
  },
  {
    id: 19,
    title: 'Surya Pinnacle',
    moves: 15,
    targetScore: 12000,
    objective: { type: 'DESTROY_ELEMENTS', targetScore: 12000, requiredElements: { SURYA: 30, AGNI: 25 } },
    starThresholds: [12000, 18000, 25000],
    allowedElements: ALL_ELEMENTS
  },
  {
    id: 20,
    title: 'Mastery of Srishti',
    moves: 15,
    targetScore: 15000,
    objective: { type: 'SCORE', targetScore: 15000 },
    initialObstacles: [
      { row: 0, col: 0, type: 'SEAL', hp: 2 },
      { row: 0, col: 7, type: 'SEAL', hp: 2 },
      { row: 7, col: 0, type: 'SEAL', hp: 2 },
      { row: 7, col: 7, type: 'SEAL', hp: 2 },
      { row: 3, col: 3, type: 'BARRIER', hp: 1 },
      { row: 3, col: 4, type: 'BARRIER', hp: 1 },
      { row: 4, col: 3, type: 'BARRIER', hp: 1 },
      { row: 4, col: 4, type: 'BARRIER', hp: 1 }
    ],
    starThresholds: [15000, 22000, 30000],
    allowedElements: ALL_ELEMENTS
  }
];

// Initial Achievements
export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_match', title: 'First Spark', description: 'Make your first match-3 in RangRush', icon: '🔥', unlocked: false, progress: 0, maxProgress: 1 },
  { id: 'combo_master', title: 'Cascading Harmony', description: 'Achieve a 4x Combo match sequence', icon: '✨', unlocked: false, progress: 0, maxProgress: 1 },
  { id: 'powerup_blaster', title: 'Elemental Unleashed', description: 'Activate 10 special power-up tiles', icon: '⚡', unlocked: false, progress: 0, maxProgress: 10 },
  { id: 'level_5', title: 'Apprentice Craftsman', description: 'Complete Level 5', icon: '🥉', unlocked: false, progress: 0, maxProgress: 1 },
  { id: 'level_10', title: 'Master of Symmetry', description: 'Complete Level 10', icon: '🥈', unlocked: false, progress: 0, maxProgress: 1 },
  { id: 'level_20', title: 'Lord of Srishti', description: 'Complete Level 20', icon: '👑', unlocked: false, progress: 0, maxProgress: 1 },
  { id: 'star_collector', title: 'Starlight Sovereign', description: 'Collect 45 total stars across levels', icon: '⭐', unlocked: false, progress: 0, maxProgress: 45 }
];
