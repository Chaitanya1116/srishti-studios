// LocalStorage Persistence Manager for RangRush: Elements of Srishti

import { SoundSettings, INITIAL_ACHIEVEMENTS, Achievement } from '@/types/rangrush';

const KEYS = {
  UNLOCKED_LEVEL: 'rangrush_unlocked_level',
  LEVEL_STARS: 'rangrush_level_stars',
  BEST_SCORES: 'rangrush_best_scores',
  SETTINGS: 'rangrush_settings',
  ACHIEVEMENTS: 'rangrush_achievements',
  DAILY_COMPLETED: 'rangrush_daily_completed_date'
};

export class RangRushStorage {
  static getUnlockedLevel(): number {
    if (typeof window === 'undefined') return 1;
    const saved = localStorage.getItem(KEYS.UNLOCKED_LEVEL);
    return saved ? parseInt(saved, 10) : 1;
  }

  static unlockNextLevel(completedLevelId: number): void {
    if (typeof window === 'undefined') return;
    const currentUnlocked = this.getUnlockedLevel();
    if (completedLevelId >= currentUnlocked && completedLevelId < 20) {
      localStorage.setItem(KEYS.UNLOCKED_LEVEL, (completedLevelId + 1).toString());
    }
  }

  static getLevelStars(): Record<number, number> {
    if (typeof window === 'undefined') return {};
    const saved = localStorage.getItem(KEYS.LEVEL_STARS);
    return saved ? JSON.parse(saved) : {};
  }

  static saveLevelStars(levelId: number, stars: number): void {
    if (typeof window === 'undefined') return;
    const current = this.getLevelStars();
    const existingStars = current[levelId] || 0;
    if (stars > existingStars) {
      current[levelId] = stars;
      localStorage.setItem(KEYS.LEVEL_STARS, JSON.stringify(current));
    }
  }

  static getBestScores(): Record<number, number> {
    if (typeof window === 'undefined') return {};
    const saved = localStorage.getItem(KEYS.BEST_SCORES);
    return saved ? JSON.parse(saved) : {};
  }

  static saveBestScore(levelId: number, score: number): void {
    if (typeof window === 'undefined') return;
    const current = this.getBestScores();
    const existingBest = current[levelId] || 0;
    if (score > existingBest) {
      current[levelId] = score;
      localStorage.setItem(KEYS.BEST_SCORES, JSON.stringify(current));
    }
  }

  static getSettings(): SoundSettings {
    if (typeof window === 'undefined') {
      return { soundEnabled: true, musicEnabled: true, reducedMotion: false };
    }
    const saved = localStorage.getItem(KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : { soundEnabled: true, musicEnabled: true, reducedMotion: false };
  }

  static saveSettings(settings: SoundSettings): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  }

  static getAchievements(): Achievement[] {
    if (typeof window === 'undefined') return INITIAL_ACHIEVEMENTS;
    const saved = localStorage.getItem(KEYS.ACHIEVEMENTS);
    return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
  }

  static saveAchievements(achievements: Achievement[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  }

  static isDailyCompletedToday(): boolean {
    if (typeof window === 'undefined') return false;
    const today = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem(KEYS.DAILY_COMPLETED);
    return saved === today;
  }

  static markDailyCompletedToday(): void {
    if (typeof window === 'undefined') return;
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(KEYS.DAILY_COMPLETED, today);
  }

  static resetAllData(): void {
    if (typeof window === 'undefined') return;
    Object.values(KEYS).forEach(key => localStorage.removeItem(key));
  }
}
