'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'USER';
  status: 'ACTIVE' | 'SUSPENDED';
  createdAt?: string;
  lastLogin?: string;
}

export interface GameProject {
  id: string;
  ownerId: string;
  name: string;
  prompt: string;
  status: 'DRAFT' | 'DESIGNING' | 'BUILDING' | 'TESTING' | 'READY_FOR_REVIEW' | 'RELEASED' | 'ARCHIVED';
  designData: any;
  files: Array<{ path: string; name: string; type: 'file' | 'directory'; content?: string }>;
  gameType?: string;
  playableCode?: string;
  releasedGameId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ComicChapter {
  id: string;
  title: string;
  pdfUrl: string;
  description?: string;
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
  comicChapters?: ComicChapter[];
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
  projects: GameProject[];
  users: User[];
  token: string | null;
  user: User | null;
  loading: boolean;
  backendOnline: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  refreshData: () => Promise<void>;
  fetchProjects: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  generateAiProject: (prompt: string) => Promise<{ project: GameProject; agentLogs: string[] }>;
  approveAndReleaseProject: (projectId: string) => Promise<boolean>;
  updateUserStatus: (userId: string, status: 'ACTIVE' | 'SUSPENDED') => Promise<boolean>;
  deleteUserAccount: (userId: string) => Promise<boolean>;
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

const API_BASE = '/api';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [projects, setProjects] = useState<GameProject[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [backendOnline, setBackendOnline] = useState<boolean>(true);

  // Sync session on startup
  useEffect(() => {
    const storedToken = localStorage.getItem('srishti_token');
    const storedUser = localStorage.getItem('srishti_user');
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('srishti_token');
        localStorage.removeItem('srishti_user');
      }
    }
    refreshData();
  }, []);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('srishti_token', newToken);
    localStorage.setItem('srishti_user', JSON.stringify(newUser));

    // Persist registered player in browser local storage
    try {
      const existingStr = localStorage.getItem('srishti_registered_users');
      let existingList: User[] = existingStr ? JSON.parse(existingStr) : [];
      if (!existingList.some(u => u.email.toLowerCase() === newUser.email.toLowerCase())) {
        existingList.push(newUser);
        localStorage.setItem('srishti_registered_users', JSON.stringify(existingList));
      }
    } catch (e) {
      console.error('Error caching registered user', e);
    }

    refreshData();
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('srishti_token');
    localStorage.removeItem('srishti_user');
  };

  const refreshData = async () => {
    setLoading(true);
    try {
      const [gamesRes, newsRes, careersRes] = await Promise.all([
        fetch(`${API_BASE}/games?t=${Date.now()}`, { cache: 'no-store' }),
        fetch(`${API_BASE}/news?t=${Date.now()}`, { cache: 'no-store' }),
        fetch(`${API_BASE}/careers?t=${Date.now()}`, { cache: 'no-store' })
      ]);

      if (gamesRes.ok) {
        const gamesData = await gamesRes.json();
        const cleanGames = Array.isArray(gamesData) 
          ? gamesData.filter((g: any) => g.slug !== 'symmetry-shadows-of-the-mandala' && g.id !== 'game-1')
          : [];
        setGames(cleanGames);
      }
      if (newsRes.ok) {
        const newsData = await newsRes.json();
        setPosts(newsData);
      }
      if (careersRes.ok) {
        const careersData = await careersRes.json();
        setJobs(careersData);
      }

      // If user is Admin, also load projects and users
      const currentToken = token || localStorage.getItem('srishti_token');
      const currentUserStr = localStorage.getItem('srishti_user');
      const currentUser = currentUserStr ? JSON.parse(currentUserStr) : user;

      if (currentToken && currentUser?.role === 'ADMIN') {
        fetchProjects();
        fetchUsers();
      }

    } catch (err) {
      console.error('Failed to fetch API data', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    const activeToken = token || localStorage.getItem('srishti_token');
    if (!activeToken) return;
    try {
      const res = await fetch(`${API_BASE}/admin/projects`, {
        headers: { 'Authorization': `Bearer ${activeToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (e) {
      console.error('Failed to fetch projects', e);
    }
  };

  const fetchUsers = async () => {
    const activeToken = token || localStorage.getItem('srishti_token');
    if (!activeToken) return;
    try {
      const res = await fetch(`${API_BASE}/admin/users`, {
        headers: { 'Authorization': `Bearer ${activeToken}` }
      });
      let apiUsers: User[] = [];
      if (res.ok) {
        apiUsers = await res.json();
      }

      // Merge with browser local registered users
      let combined = [...apiUsers];
      try {
        const localUsersStr = localStorage.getItem('srishti_registered_users');
        if (localUsersStr) {
          const localUsers: User[] = JSON.parse(localUsersStr);
          localUsers.forEach(lUser => {
            if (!combined.some(u => u.email.toLowerCase() === lUser.email.toLowerCase())) {
              combined.push(lUser);
            }
          });
        }
      } catch (e) {
        console.error('Error combining local users', e);
      }

      setUsers(combined);
    } catch (e) {
      console.error('Failed to fetch users', e);
    }
  };

  const generateAiProject = async (prompt: string): Promise<{ project: GameProject; agentLogs: string[] }> => {
    const activeToken = token || localStorage.getItem('srishti_token');
    if (!activeToken) throw new Error('Unauthorized. Admin session required.');

    const res = await fetch(`${API_BASE}/admin/ai/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${activeToken}`
      },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'AI Generation failed');
    }

    await fetchProjects();
    return { project: data.project, agentLogs: data.agentLogs };
  };

  const approveAndReleaseProject = async (projectId: string): Promise<boolean> => {
    const activeToken = token || localStorage.getItem('srishti_token');
    if (!activeToken) throw new Error('Unauthorized. Admin session required.');

    const res = await fetch(`${API_BASE}/admin/projects/${projectId}/release`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${activeToken}`
      }
    });

    if (res.ok) {
      await refreshData();
      await fetchProjects();
      return true;
    }
    return false;
  };

  const updateUserStatus = async (userId: string, status: 'ACTIVE' | 'SUSPENDED'): Promise<boolean> => {
    const activeToken = token || localStorage.getItem('srishti_token');
    if (!activeToken) throw new Error('Unauthorized');

    const res = await fetch(`${API_BASE}/admin/users`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${activeToken}`
      },
      body: JSON.stringify({ userId, status })
    });

    if (res.ok) {
      await fetchUsers();
      return true;
    }
    return false;
  };

  const deleteUserAccount = async (userId: string): Promise<boolean> => {
    const activeToken = token || localStorage.getItem('srishti_token');
    if (!activeToken) throw new Error('Unauthorized');

    const res = await fetch(`${API_BASE}/admin/users?id=${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${activeToken}`
      }
    });

    if (res.ok) {
      await fetchUsers();
      return true;
    }
    return false;
  };

  const createGame = async (gameData: Omit<Game, 'id'>) => {
    const activeToken = token || localStorage.getItem('srishti_token');
    const res = await fetch(`${API_BASE}/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${activeToken}`
      },
      body: JSON.stringify(gameData)
    });
    if (res.ok) {
      await refreshData();
      return true;
    }
    return false;
  };

  const updateGame = async (id: string, updated: Partial<Game>) => {
    const activeToken = token || localStorage.getItem('srishti_token');
    const res = await fetch(`${API_BASE}/games/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${activeToken}`
      },
      body: JSON.stringify(updated)
    });
    if (res.ok) {
      await refreshData();
      return true;
    }
    return false;
  };

  const deleteGame = async (id: string) => {
    const activeToken = token || localStorage.getItem('srishti_token');
    const res = await fetch(`${API_BASE}/games/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${activeToken}`
      }
    });
    if (res.ok) {
      await refreshData();
      return true;
    }
    return false;
  };

  const createPost = async (postData: Omit<BlogPost, 'id' | 'publishDate'>) => {
    const activeToken = token || localStorage.getItem('srishti_token');
    const res = await fetch(`${API_BASE}/news`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${activeToken}`
      },
      body: JSON.stringify(postData)
    });
    if (res.ok) {
      await refreshData();
      return true;
    }
    return false;
  };

  const updatePost = async (id: string, updated: Partial<BlogPost>) => {
    const activeToken = token || localStorage.getItem('srishti_token');
    const res = await fetch(`${API_BASE}/news/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${activeToken}`
      },
      body: JSON.stringify(updated)
    });
    if (res.ok) {
      await refreshData();
      return true;
    }
    return false;
  };

  const deletePost = async (id: string) => {
    const activeToken = token || localStorage.getItem('srishti_token');
    const res = await fetch(`${API_BASE}/news/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${activeToken}` }
    });
    if (res.ok) {
      await refreshData();
      return true;
    }
    return false;
  };

  const createJob = async (jobData: Omit<Job, 'id'>) => {
    const activeToken = token || localStorage.getItem('srishti_token');
    const res = await fetch(`${API_BASE}/careers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${activeToken}`
      },
      body: JSON.stringify(jobData)
    });
    if (res.ok) {
      await refreshData();
      return true;
    }
    return false;
  };

  const updateJob = async (id: string, updated: Partial<Job>) => {
    const activeToken = token || localStorage.getItem('srishti_token');
    const res = await fetch(`${API_BASE}/careers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${activeToken}`
      },
      body: JSON.stringify(updated)
    });
    if (res.ok) {
      await refreshData();
      return true;
    }
    return false;
  };

  const deleteJob = async (id: string) => {
    const activeToken = token || localStorage.getItem('srishti_token');
    const res = await fetch(`${API_BASE}/careers/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${activeToken}` }
    });
    if (res.ok) {
      await refreshData();
      return true;
    }
    return false;
  };

  const submitApplication = async (appData: Omit<JobApplication, 'id' | 'submittedAt'>) => {
    const res = await fetch(`${API_BASE}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appData)
    });
    if (res.ok) return true;
    return false;
  };

  const submitContact = async (contactData: Omit<ContactInquiry, 'id' | 'submittedAt'>) => {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
    if (res.ok) return true;
    return false;
  };

  const subscribeNewsletter = async (email: string) => {
    const res = await fetch(`${API_BASE}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (res.ok) return true;
    return false;
  };

  return (
    <AppContext.Provider value={{
      games,
      posts,
      jobs,
      inquiries,
      applications,
      projects,
      users,
      token,
      user,
      loading,
      backendOnline,
      login,
      logout,
      refreshData,
      fetchProjects,
      fetchUsers,
      generateAiProject,
      approveAndReleaseProject,
      updateUserStatus,
      deleteUserAccount,
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
