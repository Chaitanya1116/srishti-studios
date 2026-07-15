// Srishti Studios - Frontend Serverless Mock Database Storage
// This manages content state directly within Next.js API routes.

export interface Game {
  id: string;
  name: string;
  slug: string;
  genre: string;
  platforms: string[];
  description: string;
  story: string;
  features: string[];
  status: 'In Production' | 'Pre-Alpha' | 'Concept' | 'Released';
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

// Seed Data
const initialGames: Game[] = [
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
    }
  },
  {
    id: 'game-1',
    name: 'Symmetry: Shadows of the Mandala',
    slug: 'symmetry-shadows-of-the-mandala',
    genre: 'Cinematic Action RPG',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    description: 'An atmospheric action-adventure where geometric architecture shapes reality. Uncover an ancient civilization built on bronze, stone, and symmetric forces.',
    story: 'In a world where geometry is the language of creation, players control a lone craftsman who can manipulate stone architecture by resolving structural symmetry. As the shadows lengthen, ancient mechanical entities guard the secrets of the Great Mandala, a cosmic blueprint of the universe. The game blends high-fidelity sword combat with environmental manipulation using physical and architectural puzzles.',
    features: [
      'Architectural Puzzle Mechanics: Shape and shift sandstone ruins to open paths and bypass hazards.',
      'Symmetric Combat: Master a fluid swordplay system based on stance balance and rhythmic counter-strikes.',
      'Premium AAA Visuals: Photorealistic stone textures, brushed bronze weaponry, and atmospheric volumetric lighting.',
      'Original Indian Orchestral Score: Atmospheric fusion of classical Indian strings (Sitar, Esraj) with deep cinematic sub-bass.'
    ],
    status: 'In Production',
    artworkUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=800&auto=format&fit=crop'
    ],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    downloadLinks: {
      steam: 'https://store.steampowered.com',
      epic: 'https://store.epicgames.com'
    },
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        processor: 'Intel Core i5-8400 or AMD Ryzen 5 2600',
        memory: '12 GB RAM',
        graphics: 'NVIDIA GeForce GTX 1070 or AMD Radeon RX 590',
        storage: '60 GB available space'
      },
      recommended: {
        os: 'Windows 11 64-bit',
        processor: 'Intel Core i7-10700K or AMD Ryzen 7 3700X',
        memory: '16 GB RAM',
        graphics: 'NVIDIA GeForce RTX 3070 or AMD Radeon RX 6800 XT',
        storage: '60 GB SSD storage'
      }
    }
  },
  {
    id: 'game-2',
    name: 'Aethelgard: The Bronze Path',
    slug: 'aethelgard-the-bronze-path',
    genre: 'Tactical Strategy',
    platforms: ['PC', 'Nintendo Switch'],
    description: 'A tactical turn-based strategy game centered around the trade routes of a bronze-fueled industrial empire. Forge alliances, craft artifacts, and command legions.',
    story: 'Aethelgard is a land divided by the monopoly of Bronze crafting. Control the heir of a fallen Guild of Smiths, navigating court intrigue and massive strategic wars across symmetrical fortress towns. Players manage resources, refine metal ores, and engage in high-stakes grid combat where unit positioning and environmental terrain are paramount.',
    features: [
      'Turn-Based Grid Strategy: Command customizable units with distinct metal-forged weaponry.',
      'Resource & Crafting Engine: Mine ore, smelt bronze alloys, and forge legendary masterwork weapons.',
      'Intricate Court Intrigue: Make branching narrative choices that decide which city-state controls the trade gates.'
    ],
    status: 'Pre-Alpha',
    artworkUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1200&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop'
    ],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    downloadLinks: {
      steam: 'https://store.steampowered.com'
    },
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        processor: 'Intel Core i3-6100 or AMD Ryzen 3 1200',
        memory: '8 GB RAM',
        graphics: 'NVIDIA GeForce GTX 960 or AMD Radeon RX 460',
        storage: '25 GB available space'
      },
      recommended: {
        os: 'Windows 10/11 64-bit',
        processor: 'Intel Core i5-9600K or AMD Ryzen 5 3600',
        memory: '16 GB RAM',
        graphics: 'NVIDIA GeForce GTX 1660 Ti or AMD Radeon RX 5600 XT',
        storage: '25 GB SSD storage'
      }
    }
  },
  {
    id: 'game-3',
    name: 'Echoes of Sandstone',
    slug: 'echoes-of-sandstone',
    genre: 'Atmospheric VR Narrative',
    platforms: ['PC', 'VR Headsets'],
    description: 'An immersive virtual reality exploration of a colossal sand-engulfed monolith. Solve puzzles using echo-location and wind flow.',
    story: 'Lost in an endless desert of warm sandstone, you discover an ancient structure that reacts only to sound frequencies. Equipped with a tuning fork, you navigate empty corridors, waking mechanical deities from their slumber by echoing their native architectural frequencies. The experience is designed to be deeply calming, tactile, and slow-paced.',
    features: [
      'Fully Immersive VR Controls: Feel the stone textures and strike resonant bells to unlock massive vaults.',
      'Soundwave Visuals: Watch sound ripple through dust particles and light rays in dark chambers.',
      'Acoustic-driven Puzzles: Solve puzzles by tuning architecture into harmonic pitches.'
    ],
    status: 'Concept',
    artworkUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?q=80&w=800&auto=format&fit=crop'
    ],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    downloadLinks: {
      steam: 'https://store.steampowered.com'
    },
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        processor: 'Intel Core i5-9600 or AMD Ryzen 5 3600X',
        memory: '16 GB RAM',
        graphics: 'NVIDIA GeForce GTX 1080Ti / RTX 2060 or AMD Radeon RX 5700',
        storage: '30 GB available space'
      },
      recommended: {
        os: 'Windows 11 64-bit',
        processor: 'Intel Core i7-10700 or AMD Ryzen 7 5800X',
        memory: '16 GB RAM',
        graphics: 'NVIDIA GeForce RTX 3070 or AMD Radeon RX 6800',
        storage: '30 GB SSD storage'
      }
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
    content: `At Srishti Studios, our name is our guiding design philosophy. Srishti translates to "Creation"—the birth of form from the formless. But in a modern game development context, what does it mean to create?

For us, creation is not just writing lines of code or modeling 3D assets. It is digital craftsmanship. We draw massive inspiration from historical Indian architecture, where symmetry, geometric precision, and material honesty reigned supreme.

### Symmetrical Architecture as Game Design
When you look at structural patterns in stone monuments, you see a deep understanding of mathematical balance. In *Symmetry: Shadows of the Mandala*, we translate this directly into gameplay. Puzzles are resolved by aligning fractured structures back into perfect symmetry, demonstrating that order and beauty are born from balance.

### Muted luxury
In building our visual identity, we wanted to move away from the hyper-saturated cyberpunk aesthetics and flashing RGB neon lights that dominate the gaming landscape. Instead, we embrace a sensory canvas of Warm Ivory, Charcoal Black, and Sandstone. The calming atmosphere allows players to focus on storytelling, detail, and craftsmanship. 

We look forward to sharing more of our journey as we build worlds worth remembering.`,
    author: 'Chaitanya, Creative Director',
    publishDate: '2026-07-10',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'post-2',
    title: 'Symmetry: Shadows of the Mandala - Dev Blog #3: Fluid Swordplay',
    slug: 'symmetry-dev-blog-3-swordplay',
    category: 'Dev Blog',
    summary: 'An in-depth look at our balance-based combat engine, exploring custom motion matching and physical responses to structural parries.',
    content: `Combat in *Symmetry: Shadows of the Mandala* is built on the concept of 'Stance Balance' or 'Symmetry'. When attacking or defending, you aren't just chip-damaging health bars. You are attempting to disrupt the opponent's geometric center.

### Stance and Weight
Every sword swing shifts your center of gravity. Our animation team has meticulously captured movement postures inspired by traditional defensive martial forms, translating them into dynamic procedural poses. If you swing a heavy claymore-style bronze weapon, missing will leave your flank open.

### The Parrying Geometry
When steel meets bronze, the collision point forms an angle. Aligning your sword angle perfectly parallel to the incoming blow executes a 'Symmetric Parry', sending the attacker off-balance and opening them up for a devastating counter-strike.

We will showcase a 3-minute raw combat video in our next update. Stay tuned!`,
    author: 'Vikram, Combat Lead',
    publishDate: '2026-07-01',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'post-3',
    title: 'Srishti Studios is Hiring: Building the Future of Craftsmanship',
    slug: 'srishti-studios-is-hiring',
    category: 'Announcement',
    summary: 'We are expanding our remote core team. Check out our open roles in gameplay engineering, environment art, and level design.',
    content: `Srishti Studios is growing! As we ramp up production on *Symmetry: Shadows of the Mandala*, we are looking for individuals who share our passion for premium digital craftsmanship, elegant design, and technical mastery.

We offer a hybrid working workspace, private healthcare, competitive equity packages, and a creative studio space detailed with stone and natural timber, designed to feel calm and inspiring.

### Open Positions:
1. **Senior Gameplay Engineer (Unreal Engine 5)**: Experience in C++, gameplay systems, and networking.
2. **Environment Artist (AAA Stone & Terrain)**: Specialize in high-fidelity sculpting, PBR texturing, and photogrammetry workflows.
3. **Sound Designer**: Focus on cinematic audio synthesis and traditional acoustic integrations.

Head over to our [Careers Page](/careers) to apply!`,
    author: 'Neha, Head of Talent',
    publishDate: '2026-06-25',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop'
  }
];

const initialJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Gameplay Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-Time',
    description: 'We are seeking an experienced Gameplay Engineer to refine character locomotion, weapon combat systems, and physics-based puzzle actions in Unreal Engine 5.',
    requirements: [
      '5+ years of experience in AAA game development with C++.',
      'Deep understanding of Unreal Engine 5 gameplay framework and replication.',
      'Strong mathematical background, particularly in linear algebra and 3D vector calculations.',
      'Experience optimizing performance for PS5 and Xbox Series X consoles.'
    ],
    responsibilities: [
      'Write clean, maintainable, and highly optimized C++ code.',
      'Collaborate with combat designers to iterate on responsive mechanics.',
      'Profile and optimize CPU-bound gameplay threads.',
      'Integrate audio and visual assets into gameplay triggers.'
    ]
  },
  {
    id: 'job-2',
    title: 'Lead Environment Artist',
    department: 'Art & Design',
    location: 'Remote',
    type: 'Full-Time',
    description: 'Lead the creation of majestic, symmetrical stone ruins, ancient bronze machinery, and vast natural landscapes. Help define our material guidelines.',
    requirements: [
      'Portfolio demonstrating AAA-quality environment assets (ZBrush, Substance Painter).',
      'Expertise in photogrammetry and high-to-low poly baking workflows.',
      'Strong eye for lighting, architectural layout, composition, and color theory.',
      'Experience leading or mentoring a team of junior and mid-level artists.'
    ],
    responsibilities: [
      'Sculpt detailed stone architectures and bronze metal modular kits.',
      'Oversee the texturing pipeline, ensuring PBR correctness.',
      'Set dressed levels in Unreal Engine 5 using custom assets and Nanite.',
      'Provide constructive design feedback and draw up art documentation.'
    ]
  }
];

// Persistent Global Storage for serverless context
class ServerlessDatabase {
  private games: Game[] = [...initialGames];
  private posts: BlogPost[] = [...initialPosts];
  private jobs: Job[] = [...initialJobs];
  private applications: JobApplication[] = [];
  private contacts: ContactInquiry[] = [];
  private newsletters: string[] = [];
  private analytics = {
    visits: 24500,
    gameClicks: 12400,
    applicationsReceived: 42,
    newsletterSubs: 1205
  };

  private adminUser = {
    username: 'admin',
    passwordHash: '$2a$10$U2c58G96VscRUpWv1v/W3e4yPecwY.uV7w/iCgT9U/Gj3H6fpe80C' // 'srishti2026'
  };

  public getAdmin() {
    return this.adminUser;
  }

  // Games
  public getGames() { return this.games; }
  public getGameBySlug(slug: string) { return this.games.find(g => g.slug === slug); }
  public createGame(game: Omit<Game, 'id'>) {
    const newGame: Game = { ...game, id: `game-${Date.now()}` };
    this.games.push(newGame);
    this.analytics.gameClicks += 10;
    return newGame;
  }
  public updateGame(id: string, updated: Partial<Game>) {
    const idx = this.games.findIndex(g => g.id === id);
    if (idx !== -1) {
      this.games[idx] = { ...this.games[idx], ...updated } as Game;
      return this.games[idx];
    }
    return null;
  }
  public deleteGame(id: string) {
    this.games = this.games.filter(g => g.id !== id);
    return true;
  }

  // Blog Posts
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

  // Careers/Jobs
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

  // Job Applications
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

  // Contact Inquiry
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

  // Newsletter Sub
  public getNewsletters() { return this.newsletters; }
  public addNewsletter(email: string) {
    if (!this.newsletters.includes(email)) {
      this.newsletters.push(email);
      this.analytics.newsletterSubs += 1;
    }
    return true;
  }

  // Analytics
  public getAnalytics() {
    return {
      ...this.analytics,
      gameCount: this.games.length,
      blogCount: this.posts.length,
      jobCount: this.jobs.length,
      applicationCount: this.applications.length,
      inquiryCount: this.contacts.length
    };
  }
}

// Cache the serverless instance to prevent re-instantiation in Vercel hot-reloads
const globalRef = global as unknown as { mockDbInstance?: ServerlessDatabase };
if (!globalRef.mockDbInstance) {
  globalRef.mockDbInstance = new ServerlessDatabase();
}

export const mockDb = globalRef.mockDbInstance;
export default mockDb;
