import express, { Request, Response } from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { mockDb } from './utils/mockDb';
import { query, getDbStatus } from './config/db';
import { uploadMedia } from './config/cloudinary';
import { authenticateToken, AuthenticatedRequest, JWT_SECRET } from './middleware/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*', // For local/production ease, customize this for strict production domains
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' })); // Support uploads and large JSON payloads

// --- HEALTH / STATUS ENDPOINT ---
app.get('/api/status', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    database: getDbStatus(),
    version: '1.0.0'
  });
});

// --- AUTHENTICATION ---
app.post('/api/auth/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const admin = mockDb.getAdmin();

  if (username !== admin.username) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  try {
    const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { username: admin.username, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({
      token,
      user: {
        username: admin.username,
        role: 'admin'
      }
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Authentication error', details: err.message });
  }
});

// --- GAMES ROUTES ---
app.get('/api/games', (req: Request, res: Response) => {
  // Fallback to mockDb
  res.json(mockDb.getGames());
});

app.get('/api/games/:slug', (req: Request, res: Response) => {
  const game = mockDb.getGameBySlug(req.params.slug);
  if (!game) return res.status(404).json({ error: 'Game not found' });
  return res.json(game);
});

app.post('/api/games', authenticateToken, (req: Request, res: Response) => {
  const newGame = mockDb.createGame(req.body);
  res.status(201).json(newGame);
});

app.put('/api/games/:id', authenticateToken, (req: Request, res: Response) => {
  const updated = mockDb.updateGame(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Game not found' });
  return res.json(updated);
});

app.delete('/api/games/:id', authenticateToken, (req: Request, res: Response) => {
  const success = mockDb.deleteGame(req.params.id);
  if (!success) return res.status(404).json({ error: 'Game not found' });
  return res.json({ message: 'Game deleted successfully' });
});

// --- NEWS / BLOG ROUTES ---
app.get('/api/news', (req: Request, res: Response) => {
  res.json(mockDb.getPosts());
});

app.get('/api/news/:slug', (req: Request, res: Response) => {
  const post = mockDb.getPostBySlug(req.params.slug);
  if (!post) return res.status(404).json({ error: 'Article not found' });
  return res.json(post);
});

app.post('/api/news', authenticateToken, (req: Request, res: Response) => {
  const newPost = mockDb.createPost(req.body);
  res.status(201).json(newPost);
});

app.put('/api/news/:id', authenticateToken, (req: Request, res: Response) => {
  const updated = mockDb.updatePost(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Article not found' });
  return res.json(updated);
});

app.delete('/api/news/:id', authenticateToken, (req: Request, res: Response) => {
  const success = mockDb.deletePost(req.params.id);
  if (!success) return res.status(404).json({ error: 'Article not found' });
  return res.json({ message: 'Article deleted successfully' });
});

// --- CAREERS ROUTES ---
app.get('/api/careers', (req: Request, res: Response) => {
  res.json(mockDb.getJobs());
});

app.post('/api/careers', authenticateToken, (req: Request, res: Response) => {
  const newJob = mockDb.createJob(req.body);
  res.status(201).json(newJob);
});

app.put('/api/careers/:id', authenticateToken, (req: Request, res: Response) => {
  const updated = mockDb.updateJob(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Job not found' });
  return res.json(updated);
});

app.delete('/api/careers/:id', authenticateToken, (req: Request, res: Response) => {
  const success = mockDb.deleteJob(req.params.id);
  if (!success) return res.status(404).json({ error: 'Job not found' });
  return res.json({ message: 'Job deleted successfully' });
});

// Applications
app.get('/api/applications', authenticateToken, (req: Request, res: Response) => {
  res.json(mockDb.getApplications());
});

app.post('/api/applications', (req: Request, res: Response) => {
  const { jobId, name, email, resumeUrl, coverLetter } = req.body;
  if (!jobId || !name || !email || !resumeUrl) {
    return res.status(400).json({ error: 'Required fields: jobId, name, email, resumeUrl' });
  }
  const application = mockDb.createApplication({ jobId, name, email, resumeUrl, coverLetter });
  return res.status(201).json(application);
});

// --- CONTACT & NEWSLETTER ROUTES ---
app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields: name, email, subject, message are required' });
  }
  const inquiry = mockDb.createInquiry({ name, email, subject, message });
  return res.status(201).json(inquiry);
});

app.get('/api/inquiries', authenticateToken, (req: Request, res: Response) => {
  res.json(mockDb.getInquiries());
});

app.post('/api/newsletter', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });
  mockDb.addNewsletter(email);
  return res.json({ message: 'Subscribed successfully' });
});

app.get('/api/newsletters', authenticateToken, (req: Request, res: Response) => {
  res.json(mockDb.getNewsletters());
});

// --- ANALYTICS ---
app.get('/api/analytics', authenticateToken, (req: Request, res: Response) => {
  res.json(mockDb.getAnalytics());
});

// --- MEDIA UPLOAD ---
app.post('/api/upload', authenticateToken, async (req: Request, res: Response) => {
  const { file } = req.body; // Can be base64 string or file path
  if (!file) return res.status(400).json({ error: 'File data is required' });

  try {
    const secureUrl = await uploadMedia(file);
    return res.json({ url: secureUrl });
  } catch (err: any) {
    return res.status(500).json({ error: 'Upload failed', details: err.message });
  }
});

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`[Server] Srishti Studios Backend running on http://localhost:${PORT}`);
});
