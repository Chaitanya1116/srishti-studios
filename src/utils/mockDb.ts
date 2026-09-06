// Srishti Studios - Frontend Serverless Mock Database Storage
// Manages authentication, users, game projects, AI designs, released games, and studio content.

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: 'ADMIN' | 'USER';
  status: 'ACTIVE' | 'SUSPENDED';
  createdAt: string;
  lastLogin: string;
}

const DB_OBJECT_URL = 'https://api.restful-api.dev/objects/ff808181a067127101a0774c1d8c28ff';

async function fetchRemoteUsers(): Promise<User[]> {
  try {
    const res = await fetch(DB_OBJECT_URL, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data?.data?.users && Array.isArray(data.data.users)) {
        return data.data.users;
      }
    }
  } catch (e) {
    // Ignore fetch error
  }
  return [];
}

async function saveRemoteUsers(users: User[]) {
  try {
    const sanitizedUsers = users.map(u => ({
      id: u.id,
      username: u.username,
      email: u.email,
      passwordHash: u.passwordHash,
      role: u.role,
      status: u.status,
      createdAt: u.createdAt,
      lastLogin: u.lastLogin
    }));
    await fetch(DB_OBJECT_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'srishti_database_v1', data: { users: sanitizedUsers } })
    });
  } catch (e) {
    // Ignore save error
  }
}

export interface ProjectFile {
  path: string;
  name: string;
  type: 'file' | 'directory';
  content?: string;
}

export interface GameDesignDocument {
  overview: {
    title: string;
    genre: string;
    platform: string;
    camera: string;
    targetAudience: string;
    gameEngine: string;
    coreGameplayLoop: string;
  };
  worldDesign: {
    description: string;
    regions: string[];
    locations: string[];
    environmentTypes: string[];
    worldProgression: string;
  };
  player: {
    character: string;
    abilities: string[];
    health: number;
    stamina: number;
    inventory: string[];
    progression: string;
  };
  combat: {
    weapons: string[];
    attacks: string[];
    defense: string[];
    specialAbilities: string[];
    enemyTypes: string[];
    bosses: string[];
  };
  questSystem: {
    mainQuests: string[];
    sideQuests: string[];
    objectives: string[];
    rewards: string[];
    progression: string;
  };
  npcSystem: {
    npcTypes: string[];
    behaviors: string[];
    dialogueRequirements: string[];
    factions: string[];
  };
  levelDesign: {
    levels: string[];
    areas: string[];
    difficultyProgression: string;
    checkpoints: string;
  };
  artDirection: {
    characterStyle: string;
    environmentStyle: string;
    uiStyle: string;
    lighting: string;
    assetRequirements: string[];
  };
  audio: {
    musicRequirements: string[];
    soundEffects: string[];
    ambientAudio: string[];
  };
  technicalDesign: {
    engine: string;
    projectStructure: string[];
    requiredSystems: string[];
    requiredScripts: string[];
    dependencies: string[];
  };
}

export type ProjectStatus = 'DRAFT' | 'DESIGNING' | 'BUILDING' | 'TESTING' | 'READY_FOR_REVIEW' | 'RELEASED' | 'ARCHIVED';

export interface GameProject {
  id: string;
  ownerId: string;
  name: string;
  prompt: string;
  status: ProjectStatus;
  designData: GameDesignDocument;
  files: ProjectFile[];
  gameType?: string; // e.g. 'action-rpg', 'match3', 'puzzle-action', 'arcade-runner'
  playableCode?: string; // Custom HTML5 canvas engine code string
  releasedGameId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Game {
  id: string;
  projectId?: string;
  name: string;
  slug: string;
  genre: string;
  platforms: string[];
  description: string;
  story: string;
  features: string[];
  status: 'In Production' | 'Pre-Alpha' | 'Concept' | 'Released' | 'RELEASED' | 'DRAFT' | 'DESIGNING' | 'BUILDING' | 'TESTING' | 'READY_FOR_REVIEW';
  artworkUrl: string;
  screenshots: string[];
  trailerUrl: string;
  downloadLinks: {
    steam?: string;
    playstore?: string;
    epic?: string;
  };
  systemRequirements: {
    minimum: { os: string; processor: string; memory: string; graphics: string; storage: string };
    recommended: { os: string; processor: string; memory: string; graphics: string; storage: string };
  };
  gameType?: string;
  playableCode?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'Dev Blog' | 'Announcement' | 'Patch Notes';
  summary: string;
  content: string;
  author: string;
  publishDate: string;
  coverImage: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

export interface JobApplication {
  id: string;
  jobId: string;
  name: string;
  email: string;
  resumeUrl: string;
  coverLetter: string;
  submittedAt: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  username: string;
  action: string;
  timestamp: string;
}

// Seed Users
const initialUsers: User[] = [
  {
    id: 'user-admin-1',
    username: 'mythrichaitu05@gmail.com',
    email: 'mythrichaitu05@gmail.com',
    // Hash of '39553955'
    passwordHash: '$2a$10$WqB8F4iTqIerX3QfLz8Z1.o7QdF.i7yWc812p44zWvjVnE4rL5bB6',
    role: 'ADMIN',
    status: 'ACTIVE',
    createdAt: '2026-01-01T00:00:00.000Z',
    lastLogin: '2026-09-06T19:44:00.000Z'
  },
  {
    id: 'user-standard-1',
    username: 'gamer_raj',
    email: 'raj@example.com',
    // Hash of 'user1234'
    passwordHash: '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeg6Lruj3vjPGga31lW',
    role: 'USER',
    status: 'ACTIVE',
    createdAt: '2026-08-15T12:00:00.000Z',
    lastLogin: '2026-09-05T18:30:00.000Z'
  },
  {
    id: 'user-chaitanya-1',
    username: 'Chaitanya Kumar',
    email: 'potturi.chandra2023@vitstudent.ac.in',
    // Hash of standard password
    passwordHash: '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeg6Lruj3vjPGga31lW',
    role: 'USER',
    status: 'ACTIVE',
    createdAt: '2026-09-06T20:30:00.000Z',
    lastLogin: '2026-09-06T20:35:00.000Z'
  }
];

// Seed Games
const initialGames: Game[] = [
  {
    id: 'game-rangrush',
    name: 'RangRush: Elements of Srishti',
    slug: 'rangrush',
    genre: 'Match-3 Fantasy Puzzle',
    platforms: ['Web', 'Mobile', 'PC'],
    description: 'Master the six mystical elements of Srishti in an original browser match-3 puzzle game with 20 levels, powerful elemental bursts, and cascading combos.',
    story: 'Awaken the elemental forces of creation: Agni, Jala, Prithvi, Vajra, Chandra, and Surya. Navigate 20 intricate puzzle chambers, shatter ancient stone seals, and harness powerful elemental line blasters and area bursts to resolve the great mandala.',
    features: [
      'Six Mystical Elements: Agni (Fire), Jala (Water), Prithvi (Earth), Vajra (Lightning), Chandra (Moon), and Surya (Sun).',
      '20 Playable Levels: Increasing difficulty, move limits, score targets, and obstacle clearing goals.',
      'Elemental Power-Ups: Agni Blast (Row), Vajra Strike (Column), Surya Burst (Area), and Chandra Shatter (Multi-target).',
      'Cascading Combo System: Chain reaction match multipliers with real-time procedural Web Audio API synthesis.'
    ],
    status: 'Released',
    artworkUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop'
    ],
    trailerUrl: '',
    downloadLinks: {},
    systemRequirements: {
      minimum: {
        os: 'Any Web Browser / Windows / macOS / Android / iOS',
        processor: 'Modern Dual-Core CPU',
        memory: '2 GB RAM',
        graphics: 'HTML5 Canvas Compatible GPU',
        storage: 'Online Browser Playable'
      },
      recommended: {
        os: 'Modern Web Browser (Chrome, Firefox, Safari, Edge)',
        processor: 'Quad-Core CPU',
        memory: '4 GB RAM',
        graphics: 'Hardware Accelerated Graphics',
        storage: 'Online Browser Playable'
      }
    },
    gameType: 'match3'
  },
  {
    id: 'game-aether-forge',
    name: 'Project: Aether Forge',
    slug: 'aether-forge',
    genre: '2.5D Puzzle Action',
    platforms: ['Web', 'PC'],
    description: 'Control the Aether Core, manipulate gravity vectors, dodge ancient laser traps, and escape floating sandstone chambers in our premier playable release.',
    story: 'Deep within floating stone ruins built of symmetrical sandstone and bronze, the Aether Core has awakened. You must guide this ancient energy cube through chambers filled with gravity inversion portals, rotating force fields, laser sweeps, and automated defensive drones. Align the geometric energy switches to reconstruct the central forge and escape back to the cosmos.',
    features: [
      'Dynamic Gravity Shifting: Flip, invert, or rotate gravity vectors 90 degrees to walk on walls and ceilings.',
      'Procedural Soundscape: Deep synthesizer drones and stone mechanical sound effects generated entirely in real-time.',
      'Sandstone & Bronze Visuals: Minimalist yet premium aesthetic matching Srishti Studios branding guidelines.',
      'Memory Forge Puzzle: Solve the final puzzle chamber by aligning multi-axis pressure pads.'
    ],
    status: 'Released',
    artworkUrl: '/aether_forge.png',
    screenshots: [
      '/aether_forge.png'
    ],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    downloadLinks: {
      steam: 'https://store.steampowered.com',
      epic: 'https://store.epicgames.com'
    },
    systemRequirements: {
      minimum: {
        os: 'Windows 10/11 64-bit',
        processor: 'Intel Core i3-6100 or AMD Ryzen 3 1200',
        memory: '8 GB RAM',
        graphics: 'NVIDIA GeForce GTX 960 or AMD Radeon RX 460',
        storage: '2 GB available space'
      },
      recommended: {
        os: 'Windows 10/11 64-bit',
        processor: 'Intel Core i5-9600K or AMD Ryzen 5 3600',
        memory: '16 GB RAM',
        graphics: 'NVIDIA GeForce GTX 1660 Ti or AMD Radeon RX 5600 XT',
        storage: '2 GB SSD storage'
      }
    },
    gameType: 'puzzle-action'
  },
  {
    id: 'game-1',
    name: 'Symmetry: Shadows of the Mandala',
    slug: 'symmetry-shadows-of-the-mandala',
    genre: 'Cinematic Action RPG',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    description: 'An atmospheric action-adventure where geometric architecture shapes reality. Uncover an ancient civilization built on bronze, stone, and symmetric forces.',
    story: 'In a world where geometry is the language of creation, players control a lone craftsman who can manipulate stone architecture by resolving structural symmetry.',
    features: [
      'Architectural Puzzle Mechanics: Shape and shift sandstone ruins to open paths and bypass hazards.',
      'Symmetric Combat: Master a fluid swordplay system based on stance balance and rhythmic counter-strikes.',
      'Premium AAA Visuals: Photorealistic stone textures, brushed bronze weaponry, and atmospheric volumetric lighting.'
    ],
    status: 'In Production',
    artworkUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop'
    ],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    downloadLinks: { steam: 'https://store.steampowered.com' },
    systemRequirements: {
      minimum: { os: 'Windows 10 64-bit', processor: 'Intel Core i5-8400', memory: '12 GB RAM', graphics: 'NVIDIA GeForce GTX 1070', storage: '60 GB' },
      recommended: { os: 'Windows 11 64-bit', processor: 'Intel Core i7-10700K', memory: '16 GB RAM', graphics: 'NVIDIA GeForce RTX 3070', storage: '60 GB SSD' }
    }
  }
];

const initialPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Defining Srishti: Creative Philosophy in Modern Game Design',
    slug: 'defining-srishti-creative-philosophy',
    category: 'Dev Blog',
    summary: 'Our studio is named after the concept of Srishti (Creation). In this editorial, we discuss how we interpret creation, geometric symmetry, and craftsmanship in a modern digital canvas.',
    content: `At Srishti Studios, our name is our guiding design philosophy. Srishti translates to "Creation"—the birth of form from the formless.`,
    author: 'Chaitanya, Creative Director',
    publishDate: '2026-07-10',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'
  }
];

const initialJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Gameplay Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-Time',
    description: 'We are seeking an experienced Gameplay Engineer to refine character locomotion and combat systems in Unreal Engine 5.',
    requirements: ['5+ years C++ experience', 'Unreal Engine 5 mastery'],
    responsibilities: ['Write high performance gameplay code', 'Optimize CPU threads']
  }
];

// Persistent Database Singleton
class ServerlessDatabase {
  private users: User[] = [...initialUsers];
  private projects: GameProject[] = [];
  private games: Game[] = [...initialGames];
  private posts: BlogPost[] = [...initialPosts];
  private jobs: Job[] = [...initialJobs];
  private applications: JobApplication[] = [];
  private contacts: ContactInquiry[] = [];
  private newsletters: string[] = [];
  private activityLogs: ActivityLog[] = [
    {
      id: 'log-1',
      userId: 'user-admin-1',
      username: 'admin',
      action: 'System initialized with Srishti AI Game Studio pipeline',
      timestamp: new Date().toISOString()
    }
  ];

  private analytics = {
    visits: 25800,
    gameClicks: 14200,
    applicationsReceived: 42,
    newsletterSubs: 1205
  };

  // --- USER MANAGEMENT ---
  public getUsers(): User[] {
    return this.users.map(u => ({ ...u, passwordHash: undefined as any })); // Omit password hash in listings
  }

  public async getUsersAsync(): Promise<User[]> {
    const remote = await fetchRemoteUsers();
    if (remote && remote.length > 0) {
      remote.forEach(rUser => {
        if (!this.users.some(u => u.email.toLowerCase() === rUser.email.toLowerCase())) {
          this.users.push(rUser);
        }
      });
    }
    return this.getUsers();
  }

  public getUserByUsername(username: string): User | undefined {
    return this.users.find(u => u.username.toLowerCase() === username.toLowerCase());
  }

  public getUserByEmail(email: string): User | undefined {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  public getUserById(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }

  public createUser(user: Omit<User, 'id' | 'createdAt' | 'lastLogin'>): User {
    const newUser: User = {
      ...user,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    this.users.push(newUser);
    this.logActivity(newUser.id, newUser.username, `New account registered as ${newUser.role}`);
    saveRemoteUsers(this.users).catch(() => {});
    return newUser;
  }

  public updateUser(id: string, updates: Partial<User>): User | null {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) return null;

    // Prevent removing admin privileges from main admin account
    if (this.users[idx].username === 'admin' && updates.role && updates.role !== 'ADMIN') {
      throw new Error('Cannot downgrade primary admin account role');
    }
    if (this.users[idx].username === 'admin' && updates.status && updates.status !== 'ACTIVE') {
      throw new Error('Cannot suspend primary admin account');
    }

    this.users[idx] = { ...this.users[idx], ...updates };
    return this.users[idx];
  }

  public deleteUser(id: string): boolean {
    const user = this.users.find(u => u.id === id);
    if (!user) return false;
    if (user.username === 'admin') {
      throw new Error('Cannot delete primary admin account');
    }
    this.users = this.users.filter(u => u.id !== id);
    return true;
  }

  public recordLogin(id: string) {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx !== -1) {
      this.users[idx].lastLogin = new Date().toISOString();
    }
  }

  public getAdmin() {
    return this.users.find(u => u.role === 'ADMIN') || this.users[0];
  }

  // --- GAME PROJECTS & SRISHTI AI ---
  public getProjects(): GameProject[] {
    return this.projects;
  }

  public getProjectById(id: string): GameProject | undefined {
    return this.projects.find(p => p.id === id);
  }

  public createProject(project: Omit<GameProject, 'id' | 'createdAt' | 'updatedAt'>): GameProject {
    const now = new Date().toISOString();
    const newProject: GameProject = {
      ...project,
      id: `project-${Date.now()}`,
      createdAt: now,
      updatedAt: now
    };
    this.projects.unshift(newProject);
    this.logActivity(project.ownerId, 'admin', `Created AI Game Project: ${project.name} (${project.status})`);
    return newProject;
  }

  public updateProject(id: string, updates: Partial<GameProject>): GameProject | null {
    const idx = this.projects.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.projects[idx] = {
      ...this.projects[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return this.projects[idx];
  }

  public deleteProject(id: string): boolean {
    const proj = this.projects.find(p => p.id === id);
    if (!proj) return false;
    this.projects = this.projects.filter(p => p.id !== id);
    return true;
  }

  // --- AUTOMATIC RELEASE WORKFLOW ---
  public approveAndReleaseProject(projectId: string): { project: GameProject; game: Game } {
    const project = this.getProjectById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    const slug = project.designData.overview.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || `game-${Date.now()}`;

    // Update project state
    project.status = 'RELEASED';
    project.updatedAt = new Date().toISOString();

    // Check if game entry already exists or create new
    let existingGameIdx = this.games.findIndex(g => g.projectId === projectId || g.slug === slug);
    
    const releasedGame: Game = {
      id: existingGameIdx !== -1 ? this.games[existingGameIdx].id : `game-${Date.now()}`,
      projectId: project.id,
      name: project.designData.overview.title,
      slug: slug,
      genre: project.designData.overview.genre || 'Action RPG',
      platforms: ['Web Browser', 'PC'],
      description: project.designData.worldDesign.description || project.prompt,
      story: project.designData.questSystem.mainQuests.join(' ') || project.designData.worldDesign.description,
      features: [
        `Core Loop: ${project.designData.overview.coreGameplayLoop}`,
        `Weapons & Abilities: ${project.designData.combat.weapons.slice(0, 3).join(', ')}`,
        `Art Direction: ${project.designData.artDirection.characterStyle}`,
        `AI Generated Engine: ${project.designData.technicalDesign.engine}`
      ],
      status: 'Released',
      artworkUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop'
      ],
      trailerUrl: '',
      downloadLinks: {},
      systemRequirements: {
        minimum: {
          os: 'Any Web Browser / Windows 10/11',
          processor: 'Dual-Core CPU',
          memory: '4 GB RAM',
          graphics: 'WebGL / HTML5 Canvas Compatible GPU',
          storage: 'Online Playable'
        },
        recommended: {
          os: 'Modern Browser (Chrome, Firefox, Edge)',
          processor: 'Quad-Core CPU',
          memory: '8 GB RAM',
          graphics: 'Dedicated GPU',
          storage: 'Online Playable'
        }
      },
      gameType: project.gameType || 'action-rpg',
      playableCode: project.playableCode
    };

    if (existingGameIdx !== -1) {
      this.games[existingGameIdx] = releasedGame;
    } else {
      this.games.unshift(releasedGame);
    }

    project.releasedGameId = releasedGame.id;

    this.logActivity('user-admin-1', 'admin', `APPROVED & RELEASED Game: ${releasedGame.name} to Srishti Studios public site`);

    return { project, game: releasedGame };
  }

  // --- GAMES ---
  public getGames(): Game[] {
    // Only return games that are Released for public views, but preserve all in internal memory
    const rangRush = initialGames[0];
    const idx = this.games.findIndex(g => g.slug === 'rangrush' || g.id === 'game-rangrush');
    if (idx === -1) {
      this.games.unshift(rangRush);
    } else {
      this.games[idx] = { ...rangRush, ...this.games[idx], status: 'Released', slug: 'rangrush' };
    }
    return this.games;
  }

  public getPublicReleasedGames(): Game[] {
    return this.getGames().filter(g => g.status === 'Released');
  }

  public getGameBySlug(slug: string): Game | undefined {
    const norm = slug.toLowerCase().replace(/[^a-z0-9]/g, '');
    return this.getGames().find(g => {
      const gNorm = g.slug.toLowerCase().replace(/[^a-z0-9]/g, '');
      const idNorm = g.id.toLowerCase().replace(/[^a-z0-9]/g, '');
      return g.slug.toLowerCase() === slug.toLowerCase() || gNorm === norm || idNorm === norm;
    });
  }

  public createGame(game: Omit<Game, 'id'>): Game {
    const newGame: Game = { ...game, id: `game-${Date.now()}` };
    this.games.push(newGame);
    this.analytics.gameClicks += 10;
    return newGame;
  }

  public updateGame(id: string, updated: Partial<Game>): Game | null {
    const idx = this.games.findIndex(g => g.id === id);
    if (idx !== -1) {
      this.games[idx] = { ...this.games[idx], ...updated } as Game;
      return this.games[idx];
    }
    return null;
  }

  public deleteGame(id: string): boolean {
    this.games = this.games.filter(g => g.id !== id);
    return true;
  }

  // --- BLOG POSTS, JOBS, APPLICATIONS, CONTACTS ---
  public getPosts() { return this.posts; }
  public getPostBySlug(slug: string) { return this.posts.find(p => p.slug === slug); }
  public createPost(post: Omit<BlogPost, 'id' | 'publishDate'>) {
    const newPost: BlogPost = {
      ...post,
      id: `post-${Date.now()}`,
      publishDate: new Date().toISOString().split('T')[0]
    };
    this.posts.unshift(newPost);
    return newPost;
  }
  public updatePost(id: string, updated: Partial<BlogPost>) {
    const idx = this.posts.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.posts[idx] = { ...this.posts[idx], ...updated } as BlogPost;
      return this.posts[idx];
    }
    return null;
  }
  public deletePost(id: string) {
    this.posts = this.posts.filter(p => p.id !== id);
    return true;
  }

  public getJobs() { return this.jobs; }
  public createJob(job: Omit<Job, 'id'>) {
    const newJob: Job = { ...job, id: `job-${Date.now()}` };
    this.jobs.push(newJob);
    return newJob;
  }
  public updateJob(id: string, updated: Partial<Job>) {
    const idx = this.jobs.findIndex(j => j.id === id);
    if (idx !== -1) {
      this.jobs[idx] = { ...this.jobs[idx], ...updated } as Job;
      return this.jobs[idx];
    }
    return null;
  }
  public deleteJob(id: string) {
    this.jobs = this.jobs.filter(j => j.id !== id);
    return true;
  }

  public getApplications() { return this.applications; }
  public createApplication(app: Omit<JobApplication, 'id' | 'submittedAt'>) {
    const newApp: JobApplication = {
      ...app,
      id: `app-${Date.now()}`,
      submittedAt: new Date().toISOString()
    };
    this.applications.unshift(newApp);
    this.analytics.applicationsReceived += 1;
    return newApp;
  }

  public getInquiries() { return this.contacts; }
  public createInquiry(contact: Omit<ContactInquiry, 'id' | 'submittedAt'>) {
    const newContact: ContactInquiry = {
      ...contact,
      id: `contact-${Date.now()}`,
      submittedAt: new Date().toISOString()
    };
    this.contacts.push(newContact);
    return newContact;
  }

  public getNewsletters() { return this.newsletters; }
  public addNewsletter(email: string) {
    if (!this.newsletters.includes(email)) {
      this.newsletters.push(email);
      this.analytics.newsletterSubs += 1;
    }
    return true;
  }

  // --- ACTIVITY LOGS ---
  public getActivityLogs(): ActivityLog[] {
    return this.activityLogs;
  }

  public logActivity(userId: string, username: string, action: string) {
    this.activityLogs.unshift({
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId,
      username,
      action,
      timestamp: new Date().toISOString()
    });
    if (this.activityLogs.length > 100) {
      this.activityLogs = this.activityLogs.slice(0, 100);
    }
  }

  // --- ANALYTICS ---
  public getAnalytics() {
    return {
      ...this.analytics,
      gameCount: this.games.length,
      releasedGameCount: this.games.filter(g => g.status === 'Released').length,
      projectCount: this.projects.length,
      userCount: this.users.length,
      activeUserCount: this.users.filter(u => u.status === 'ACTIVE').length,
      blogCount: this.posts.length,
      jobCount: this.jobs.length,
      applicationCount: this.applications.length,
      inquiryCount: this.contacts.length
    };
  }
}

// Global serverless instance persistence
const globalRef = global as unknown as { mockDbInstance?: ServerlessDatabase };
if (!globalRef.mockDbInstance) {
  globalRef.mockDbInstance = new ServerlessDatabase();
}

export const mockDb = globalRef.mockDbInstance;
export default mockDb;
