'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Interfaces matching backend models
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

interface AppContextType {
  games: Game[];
  posts: BlogPost[];
  jobs: Job[];
  inquiries: ContactInquiry[];
  applications: JobApplication[];
  token: string | null;
  user: { username: string; role: string } | null;
  loading: boolean;
  backendOnline: boolean;
  login: (token: string, user: { username: string; role: string }) => void;
  logout: () => void;
  refreshData: () => Promise<void>;
  createGame: (game: Omit<Game, 'id'>) => Promise<boolean>;
  updateGame: (id: string, game: Partial<Game>) => Promise<boolean>;
  deleteGame: (id: string) => Promise<boolean>;
  createPost: (post: Omit<BlogPost, 'id' | 'publishDate'>) => Promise<boolean>;
  updatePost: (id: string, post: Partial<BlogPost>) => Promise<boolean>;
  deletePost: (id: string) => Promise<boolean>;
  createJob: (job: Omit<Job, 'id'>) => Promise<boolean>;
  updateJob: (id: string, job: Partial<Job>) => Promise<boolean>;
  deleteJob: (id: string) => Promise<boolean>;
  submitApplication: (app: Omit<JobApplication, 'id' | 'submittedAt'>) => Promise<boolean>;
  submitContact: (contact: Omit<ContactInquiry, 'id' | 'submittedAt'>) => Promise<boolean>;
  subscribeNewsletter: (email: string) => Promise<boolean>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Base mock content for client fallback
const mockGamesFallback: Game[] = [
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

const mockPostsFallback: BlogPost[] = [
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

const mockJobsFallback: Job[] = [
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

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [games, setGames] = useState<Game[]>(mockGamesFallback);
  const [posts, setPosts] = useState<BlogPost[]>(mockPostsFallback);
  const [jobs, setJobs] = useState<Job[]>(mockJobsFallback);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [backendOnline, setBackendOnline] = useState<boolean>(false);

  // Sync token from localStorage on load
  useEffect(() => {
    const storedToken = localStorage.getItem('srishti_token');
    const storedUser = localStorage.getItem('srishti_user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    refreshData();
  }, []);

  const refreshData = async () => {
    setLoading(true);
    try {
      // Check server health
      const statusRes = await fetch(`${API_BASE}/status`, { signal: AbortSignal.timeout(3000) });
      if (statusRes.ok) {
        setBackendOnline(true);
        
        // Fetch fresh content
        const [gamesRes, newsRes, careersRes] = await Promise.all([
          fetch(`${API_BASE}/games`),
          fetch(`${API_BASE}/news`),
          fetch(`${API_BASE}/careers`)
        ]);

        if (gamesRes.ok) setGames(await gamesRes.json());
        if (newsRes.ok) setPosts(await newsRes.json());
        if (careersRes.ok) setJobs(await careersRes.json());

        // Protected fetches if logged in
        const storedToken = localStorage.getItem('srishti_token');
        if (storedToken) {
          const [appsRes, inqsRes] = await Promise.all([
            fetch(`${API_BASE}/applications`, { headers: { 'Authorization': `Bearer ${storedToken}` } }),
            fetch(`${API_BASE}/inquiries`, { headers: { 'Authorization': `Bearer ${storedToken}` } })
          ]);
          if (appsRes.ok) setApplications(await appsRes.json());
          if (inqsRes.ok) setInquiries(await inqsRes.json());
        }
      } else {
        setBackendOnline(false);
      }
    } catch (e) {
      setBackendOnline(false);
      console.log('[Connection] Express backend offline. Using client mock database.');
    } finally {
      setLoading(false);
    }
  };

  const login = (jwtToken: string, userData: { username: string; role: string }) => {
    setToken(jwtToken);
    setUser(userData);
    localStorage.setItem('srishti_token', jwtToken);
    localStorage.setItem('srishti_user', JSON.stringify(userData));
    refreshData();
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('srishti_token');
    localStorage.removeItem('srishti_user');
    setApplications([]);
    setInquiries([]);
  };

  // --- CRUD ACTIONS ---

  const createGame = async (gameData: Omit<Game, 'id'>) => {
    if (backendOnline && token) {
      try {
        const res = await fetch(`${API_BASE}/games`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(gameData)
        });
        if (res.ok) {
          await refreshData();
          return true;
        }
      } catch (e) {
        console.error(e);
      }
    }
    // Client fallback
    const localNew: Game = { ...gameData, id: `game-${Date.now()}` };
    setGames(prev => [...prev, localNew]);
    return true;
  };

  const updateGame = async (id: string, gameData: Partial<Game>) => {
    if (backendOnline && token) {
      try {
        const res = await fetch(`${API_BASE}/games/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(gameData)
        });
        if (res.ok) {
          await refreshData();
          return true;
        }
      } catch (e) {
        console.error(e);
      }
    }
    // Client fallback
    setGames(prev => prev.map(g => g.id === id ? { ...g, ...gameData } as Game : g));
    return true;
  };

  const deleteGame = async (id: string) => {
    if (backendOnline && token) {
      try {
        const res = await fetch(`${API_BASE}/games/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          await refreshData();
          return true;
        }
      } catch (e) {
        console.error(e);
      }
    }
    // Client fallback
    setGames(prev => prev.filter(g => g.id !== id));
    return true;
  };

  const createPost = async (postData: Omit<BlogPost, 'id' | 'publishDate'>) => {
    if (backendOnline && token) {
      try {
        const res = await fetch(`${API_BASE}/news`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(postData)
        });
        if (res.ok) {
          await refreshData();
          return true;
        }
      } catch (e) {
        console.error(e);
      }
    }
    // Client fallback
    const localNew: BlogPost = {
      ...postData,
      id: `post-${Date.now()}`,
      publishDate: new Date().toISOString().split('T')[0]
    };
    setPosts(prev => [localNew, ...prev]);
    return true;
  };

  const updatePost = async (id: string, postData: Partial<BlogPost>) => {
    if (backendOnline && token) {
      try {
        const res = await fetch(`${API_BASE}/news/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(postData)
        });
        if (res.ok) {
          await refreshData();
          return true;
        }
      } catch (e) {
        console.error(e);
      }
    }
    // Client fallback
    setPosts(prev => prev.map(p => p.id === id ? { ...p, ...postData } as BlogPost : p));
    return true;
  };

  const deletePost = async (id: string) => {
    if (backendOnline && token) {
      try {
        const res = await fetch(`${API_BASE}/news/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          await refreshData();
          return true;
        }
      } catch (e) {
        console.error(e);
      }
    }
    // Client fallback
    setPosts(prev => prev.filter(p => p.id !== id));
    return true;
  };

  const createJob = async (jobData: Omit<Job, 'id'>) => {
    if (backendOnline && token) {
      try {
        const res = await fetch(`${API_BASE}/careers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(jobData)
        });
        if (res.ok) {
          await refreshData();
          return true;
        }
      } catch (e) {
        console.error(e);
      }
    }
    // Client fallback
    const localNew: Job = { ...jobData, id: `job-${Date.now()}` };
    setJobs(prev => [...prev, localNew]);
    return true;
  };

  const updateJob = async (id: string, jobData: Partial<Job>) => {
    if (backendOnline && token) {
      try {
        const res = await fetch(`${API_BASE}/careers/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(jobData)
        });
        if (res.ok) {
          await refreshData();
          return true;
        }
      } catch (e) {
        console.error(e);
      }
    }
    // Client fallback
    setJobs(prev => prev.map(j => j.id === id ? { ...j, ...jobData } as Job : j));
    return true;
  };

  const deleteJob = async (id: string) => {
    if (backendOnline && token) {
      try {
        const res = await fetch(`${API_BASE}/careers/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          await refreshData();
          return true;
        }
      } catch (e) {
        console.error(e);
      }
    }
    // Client fallback
    setJobs(prev => prev.filter(j => j.id !== id));
    return true;
  };

  const submitApplication = async (appData: Omit<JobApplication, 'id' | 'submittedAt'>) => {
    if (backendOnline) {
      try {
        const res = await fetch(`${API_BASE}/applications`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(appData)
        });
        if (res.ok) {
          return true;
        }
      } catch (e) {
        console.error(e);
      }
    }
    // Client fallback
    const localApp: JobApplication = {
      ...appData,
      id: `app-${Date.now()}`,
      submittedAt: new Date().toISOString()
    };
    setApplications(prev => [localApp, ...prev]);
    return true;
  };

  const submitContact = async (contactData: Omit<ContactInquiry, 'id' | 'submittedAt'>) => {
    if (backendOnline) {
      try {
        const res = await fetch(`${API_BASE}/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contactData)
        });
        if (res.ok) {
          return true;
        }
      } catch (e) {
        console.error(e);
      }
    }
    // Client fallback
    const localContact: ContactInquiry = {
      ...contactData,
      id: `contact-${Date.now()}`,
      submittedAt: new Date().toISOString()
    };
    setInquiries(prev => [...prev, localContact]);
    return true;
  };

  const subscribeNewsletter = async (email: string) => {
    if (backendOnline) {
      try {
        const res = await fetch(`${API_BASE}/newsletter`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        if (res.ok) return true;
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  };

  return (
    <AppContext.Provider value={{
      games,
      posts,
      jobs,
      inquiries,
      applications,
      token,
      user,
      loading,
      backendOnline,
      login,
      logout,
      refreshData,
      createGame,
      updateGame,
      deleteGame,
      createPost,
      updatePost,
      deletePost,
      createJob,
      updateJob,
      deleteJob,
      submitApplication,
      submitContact,
      subscribeNewsletter
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
