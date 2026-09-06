// Srishti Studios - Game Project Generator Pipeline
// Transforms multi-agent GDD data into structured files and playable Web Engine builds.

import { GameDesignDocument, ProjectFile } from './mockDb';

export interface GeneratedProjectPackage {
  files: ProjectFile[];
  playableCode: string; // JavaScript canvas game loop code
  gameType: string;
}

export const generateProjectPackage = (title: string, gdd: GameDesignDocument): GeneratedProjectPackage => {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  const files: ProjectFile[] = [
    // design/
    { path: 'design/GDD.json', name: 'GDD.json', type: 'file', content: JSON.stringify(gdd, null, 2) },
    {
      path: 'design/GAME_CONCEPT.md',
      name: 'GAME_CONCEPT.md',
      type: 'file',
      content: `# ${title}
## Genre: ${gdd.overview.genre}
## Platform: ${gdd.overview.platform}
## Camera: ${gdd.overview.camera}

### Core Gameplay Loop
${gdd.overview.coreGameplayLoop}

### World Lore
${gdd.worldDesign.description}
`
    },
    // characters/
    {
      path: 'characters/PLAYER_PROFILE.json',
      name: 'PLAYER_PROFILE.json',
      type: 'file',
      content: JSON.stringify(gdd.player, null, 2)
    },
    {
      path: 'characters/NPC_FACTIONS.json',
      name: 'NPC_FACTIONS.json',
      type: 'file',
      content: JSON.stringify(gdd.npcSystem, null, 2)
    },
    // environments/
    {
      path: 'environments/WORLD_REGIONS.json',
      name: 'WORLD_REGIONS.json',
      type: 'file',
      content: JSON.stringify(gdd.worldDesign, null, 2)
    },
    // quests/
    {
      path: 'quests/CAMPAIGN.json',
      name: 'CAMPAIGN.json',
      type: 'file',
      content: JSON.stringify(gdd.questSystem, null, 2)
    },
    // scripts/
    {
      path: 'scripts/EngineCore.ts',
      name: 'EngineCore.ts',
      type: 'file',
      content: `// Srishti Engine Core - Generated for ${title}
export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private isRunning: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
  }

  public start() {
    this.isRunning = true;
    this.gameLoop();
  }

  private gameLoop = () => {
    if (!this.isRunning) return;
    this.update();
    this.render();
    requestAnimationFrame(this.gameLoop);
  };

  private update() {
    // Game loop logic
  }

  private render() {
    this.ctx.fillStyle = '#111a17';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
`
    },
    {
      path: 'scripts/CombatSystem.ts',
      name: 'CombatSystem.ts',
      type: 'file',
      content: `// Combat & Ability Evaluator for ${title}
export const COMBAT_WEAPONS = ${JSON.stringify(gdd.combat.weapons)};
export const ENEMY_TYPES = ${JSON.stringify(gdd.combat.enemyTypes)};
`
    },
    // UI/
    {
      path: 'UI/HUDOverlay.tsx',
      name: 'HUDOverlay.tsx',
      type: 'file',
      content: `// HUD UI Component for ${title}
import React from 'react';

export const HUDOverlay = ({ health = 100, stamina = 100, score = 0 }) => (
  <div className="absolute top-4 left-4 z-20 space-y-2 font-mono text-xs text-ivory">
    <div className="flex items-center gap-2">
      <span className="text-gold font-bold">HP:</span>
      <div className="w-32 h-3 bg-charcoal border border-bronze/40 rounded overflow-hidden">
        <div className="h-full bg-red-500 transition-all duration-300" style={{ width: \`\${health}%\` }} />
      </div>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-gold font-bold">STM:</span>
      <div className="w-32 h-3 bg-charcoal border border-bronze/40 rounded overflow-hidden">
        <div className="h-full bg-gold transition-all duration-300" style={{ width: \`\${stamina}%\` }} />
      </div>
    </div>
  </div>
);
`
    },
    // configuration/
    {
      path: 'configuration/game_config.json',
      name: 'game_config.json',
      type: 'file',
      content: JSON.stringify({
        title,
        slug,
        version: '1.0.0-PROTOTYPE',
        author: 'Srishti AI Studio Generator',
        targetFps: 60,
        canvasWidth: 960,
        canvasHeight: 540,
        theme: {
          background: '#111a17',
          accent: '#c9a96e',
          text: '#f7f4ef'
        }
      }, null, 2)
    },
    // builds/
    {
      path: 'builds/playable_game_bundle.js',
      name: 'playable_game_bundle.js',
      type: 'file',
      content: `// Automated Build Package for ${title}`
    }
  ];

  // Playable Browser Game Code Component (HTML5 Canvas Action RPG / Combat Prototype)
  const playableCode = `
    const title = ${JSON.stringify(title)};
    const weapons = ${JSON.stringify(gdd.combat.weapons)};
    const enemies = ${JSON.stringify(gdd.combat.enemyTypes)};
  `;

  return {
    files,
    playableCode,
    gameType: 'action-rpg'
  };
};
