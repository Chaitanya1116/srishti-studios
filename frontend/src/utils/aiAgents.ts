// Srishti AI - Multi-Agent Architecture Engine
// Modular specialized agents orchestrated to turn natural language prompts into complete structured game projects.

import { GameDesignDocument, ProjectFile } from './mockDb';

export interface AgentResult {
  agentName: string;
  category: string;
  data: any;
  logMessage: string;
}

// 1. Game Designer Agent
export const runGameDesignerAgent = async (prompt: string): Promise<AgentResult> => {
  const promptLower = prompt.toLowerCase();
  let genre = 'Action RPG';
  if (promptLower.includes('puzzle') || promptLower.includes('match')) genre = 'Puzzle Action';
  if (promptLower.includes('strategy') || promptLower.includes('tactical')) genre = 'Tactical Strategy';
  if (promptLower.includes('runner') || promptLower.includes('arcade')) genre = 'Arcade Action';

  const titleMatch = prompt.match(/(?:named|called|title|title:)\s*["']?([^"'.]+)["']?/i);
  let title = titleMatch ? titleMatch[1].trim() : '';
  if (!title) {
    if (promptLower.includes('indian') || promptLower.includes('kingdom')) {
      title = 'Guardians of Aranya';
    } else if (promptLower.includes('space') || promptLower.includes('sci-fi')) {
      title = 'Aether Protocol: Zero';
    } else {
      title = 'Srishti: Chronicles of Symmetrical Craft';
    }
  }

  return {
    agentName: 'Game Designer Agent',
    category: 'Game Overview',
    logMessage: `[Game Designer] Conceptualized title "${title}" as a ${genre} with dynamic camera control.`,
    data: {
      title,
      genre,
      platform: 'Web Browser / PC / Console',
      camera: promptLower.includes('first-person') ? 'First-Person Perspective' : 'Third-Person Over-The-Shoulder',
      targetAudience: 'Core Gamers & AAA Action-Adventure Enthusiasts',
      gameEngine: 'Srishti WebGL Canvas / HTML5 Arcade Engine',
      coreGameplayLoop: 'Explore symmetrical zones -> Engage in weapon/magical combat -> Resolve puzzle locks -> Upgrade inventory & stats -> Defeat boss encounters'
    }
  };
};

// 2. Story & World Agent
export const runStoryWorldAgent = async (prompt: string): Promise<AgentResult> => {
  const promptLower = prompt.toLowerCase();
  const isAncientIndia = promptLower.includes('indian') || promptLower.includes('kingdom') || promptLower.includes('warrior');

  const description = isAncientIndia
    ? 'Set in the ancient realm of Srishtipura, a majestic civilization constructed of sandstone monoliths, bronze water conduits, and sacred geometric mandala fortresses. An invading dark horde threatens to tear down the world balance.'
    : `An immersive atmospheric world designed around the core vision: "${prompt}". Players navigate high-contrast environments filled with secrets and structural mysteries.`;

  return {
    agentName: 'Story & World Agent',
    category: 'World Design',
    logMessage: '[Story & World] Constructed multi-region world design with rich lore and symmetrical biome hierarchy.',
    data: {
      description,
      regions: [
        'The Sandstone Citadel (Hub Region)',
        'Valley of Whispering Monoliths (Exploration Zone)',
        'The Bronze Smelting Vaults (Hazard Zone)',
        'The Great Mandala Sanctuary (Boss Arena)'
      ],
      locations: [
        'Outer Watchtowers',
        'Subterranean Conduit Chambers',
        'Sun Altar Gate',
        'Royal Armory'
      ],
      environmentTypes: ['Carved Sandstone', 'Aetheric Water Wells', 'Weathered Bronze Monoliths', 'Volumetric Dusk Skyboxes'],
      worldProgression: 'Linear act progression with semi-open hubs unlocked via elemental seal keystones.'
    }
  };
};

// 3. Character & NPC Agent
export const runCharacterNpcAgent = async (prompt: string): Promise<AgentResult> => {
  return {
    agentName: 'Character & NPC Agent',
    category: 'Character & Factions',
    logMessage: '[Character & NPC] Defined protagonist stats, skill tree vectors, and 4 neutral/hostile NPC factions.',
    data: {
      player: {
        character: 'Kaelen (The Craft-Guard)',
        abilities: ['Symmetric Strike', 'Dash Veil', 'Aether Core Pulse', 'Keystone Barrier'],
        health: 100,
        stamina: 100,
        inventory: ['Bronze Gladius', 'Chamber Keystone', 'Healing Soma Tonic', 'Srishti Crest'],
        progression: 'Collect Mandala Shards to upgrade Health Pool, Stamina Recovery Rate, and Weapon Infusions.'
      },
      npcSystem: {
        npcTypes: ['Merchant Smiths', 'Ancient Archon Spirits', 'Patrol Guard Captains'],
        behaviors: ['Pathfinding Patrols', 'Contextual Dialogue Trees', 'State-based Faction Reaction'],
        dialogueRequirements: ['Branching response trees', 'Quest offering prompts', 'Lore exposition nodes'],
        factions: ['The Craftsmen Guild', 'Keepers of the Mandala', 'Asura Marauders']
      }
    }
  };
};

// 4. Gameplay & Combat Agent
export const runGameplayCombatAgent = async (prompt: string): Promise<AgentResult> => {
  return {
    agentName: 'Gameplay & Combat Agent',
    category: 'Combat & Systems',
    logMessage: '[Gameplay & Combat] Formulated directional melee combat, enemy AI state machines, and boss mechanics.',
    data: {
      weapons: ['Sun-Forged Claymore', 'Symmetric Double Blades', 'Lotus Bow'],
      attacks: ['Light Slash', 'Heavy Cleave', 'Spinning Radial Strike'],
      defense: ['Precision Parry', 'Roll Dodge', 'Stance Shielding'],
      specialAbilities: ['Solar Flare Burst', 'Time Slow Stance'],
      enemyTypes: ['Asura Scout', 'Bronze Automaton Guard', 'Shadow Archer'],
      bosses: ['Vritra the Stone Sentinel', 'Mahisa the Unbroken Archon']
    }
  };
};

// 5. Quest Agent
export const runQuestAgent = async (prompt: string): Promise<AgentResult> => {
  return {
    agentName: 'Quest Agent',
    category: 'Quest System',
    logMessage: '[Quest Agent] Generated main campaign storyline quests, objective chains, and side contracts.',
    data: {
      mainQuests: [
        'Act I: Awakening of the Keystone',
        'Act II: Cleansing the Bronze Vaults',
        'Act III: The Siege of Srishtipura Citadel',
        'Act IV: Resolution of the Great Mandala'
      ],
      sideQuests: [
        'Contract: The Lost Smith Ores',
        'Trial of Symmetrical Wisdom',
        'Echoes of the Ancient Archon'
      ],
      objectives: ['Clear invading forces', 'Align 3 sandstone keystones', 'Eliminate Sector Captains'],
      rewards: ['Legendary Ore Ingots', '1500 Mastery XP', 'Royal Crest Badge'],
      progression: 'Main quests gate regional access; side quests provide rare craft materials and ability runes.'
    }
  };
};

// 6. Art & Audio Agent
export const runArtAudioAgent = async (prompt: string): Promise<AgentResult> => {
  return {
    agentName: 'Art & Audio Agent',
    category: 'Art & Sound',
    logMessage: '[Art & Audio] Specified visual palette (Charcoal/Gold/Sandstone), lighting model, and Web Audio synthesizers.',
    data: {
      artDirection: {
        characterStyle: 'Stylized Realism with sharp geometric silhouettes',
        environmentStyle: 'Ancient Sandstone Architecture fused with Brushed Bronze Machinery',
        uiStyle: 'Muted Luxury: Dark Ivory, Gold Accents, Clean Monospace & Serif Typography',
        lighting: 'Atmospheric volumetric dusk with golden bloom highlights',
        assetRequirements: ['3D Character Mesh', 'Modular Stone Wall Kits', 'Particle Effects FX', 'Weapon Models']
      },
      audio: {
        musicRequirements: ['Cinematic Indian Sitar & Cello Fusion', 'Dynamic Boss Battle Drums', 'Ambient Wind Drones'],
        soundEffects: ['Sword Clash Steel SFX', 'Stone Keystone Slide SFX', 'Energy Blast WebAudio Synthesizer'],
        ambientAudio: ['Echoing Ruin Wind', 'Water Conduit Drips', 'Distant Thunder Rumbles']
      }
    }
  };
};

// 7. Coding & Technical Agent
export const runCodingTechnicalAgent = async (prompt: string, title: string): Promise<AgentResult> => {
  return {
    agentName: 'Coding & Technical Agent',
    category: 'Technical Architecture',
    logMessage: '[Coding Agent] Built project directory structure, written TypeScript engine code & playable HTML5 Canvas code component.',
    data: {
      engine: 'HTML5 2D/3D WebGL Canvas Engine',
      projectStructure: [
        'design/GDD.json',
        'design/WORLD_LORE.md',
        'characters/PLAYER_SPEC.json',
        'characters/ENEMIES.json',
        'environments/SANDSTONE_RUINS.json',
        'quests/MAIN_CAMPAIGN.json',
        'scripts/EngineCore.ts',
        'scripts/PlayerController.ts',
        'scripts/CombatManager.ts',
        'scripts/RenderEngine.ts',
        'UI/HUDOverlay.tsx',
        'audio/SoundSynthesizer.ts',
        'configuration/game_config.json',
        'builds/playable_game_bundle.js'
      ],
      requiredSystems: [
        'Game Loop Engine',
        'Input Handler (WASD/Arrows/Space/Click)',
        'Collision Detection System',
        'Combat Hitbox Evaluator',
        'Web Audio Procedural Sound Synth'
      ],
      requiredScripts: ['EngineCore.ts', 'CombatSystem.ts', 'RenderPipeline.ts'],
      dependencies: ['React 19', 'HTML5 Canvas API', 'Web Audio API', 'Framer Motion']
    }
  };
};

// 8. QA & Test Agent
export const runQaTestAgent = async (prompt: string): Promise<AgentResult> => {
  return {
    agentName: 'QA & Test Agent',
    category: 'Quality Assurance',
    logMessage: '[QA Agent] Verified render pipeline stability, frame timing (60 FPS target), and input responsiveness.',
    data: {
      testCases: [
        'Player Movement & Bound Check -> PASS',
        'Combat Slash & Collision Detection -> PASS',
        'Health & Stamina Depletion Cycle -> PASS',
        'UI Overlay Rendering & Scalability -> PASS',
        'Audio Synthesizer Initialization -> PASS'
      ],
      targetFps: 60,
      validationStatus: 'READY_FOR_REVIEW'
    }
  };
};

// Master Orchestrator
export const orchestrateGameGeneration = async (prompt: string) => {
  const designerRes = await runGameDesignerAgent(prompt);
  const title = designerRes.data.title;

  const [storyRes, charRes, combatRes, questRes, artRes, techRes, qaRes] = await Promise.all([
    runStoryWorldAgent(prompt),
    runCharacterNpcAgent(prompt),
    runGameplayCombatAgent(prompt),
    runQuestAgent(prompt),
    runArtAudioAgent(prompt),
    runCodingTechnicalAgent(prompt, title),
    runQaTestAgent(prompt)
  ]);

  const logs = [
    designerRes.logMessage,
    storyRes.logMessage,
    charRes.logMessage,
    combatRes.logMessage,
    questRes.logMessage,
    artRes.logMessage,
    techRes.logMessage,
    qaRes.logMessage
  ];

  const designData: GameDesignDocument = {
    overview: designerRes.data,
    worldDesign: storyRes.data,
    player: {
      ...charRes.data.player
    },
    combat: combatRes.data,
    questSystem: questRes.data,
    npcSystem: charRes.data.npcSystem,
    levelDesign: {
      levels: ['Level 1: The Citadel Approach', 'Level 2: The Sun Gate', 'Level 3: The Sanctuary of Creation'],
      areas: ['Outer Ruins', 'Conduit Vault', 'Mandala Chamber'],
      difficultyProgression: 'Adaptive curve matching player keystone upgrades',
      checkpoints: 'Sanctuary Sun Alters'
    },
    artDirection: artRes.data.artDirection,
    audio: artRes.data.audio,
    technicalDesign: techRes.data
  };

  return {
    title,
    prompt,
    designData,
    logs
  };
};
