import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/utils/mockDb';
import { verifyAuth } from '@/utils/auth';

export async function GET() {
  const allGames = mockDb.getGames();
  const cleanGames = allGames.filter(g => g.slug !== 'symmetry-shadows-of-the-mandala' && g.id !== 'game-1');
  
  if (!cleanGames.some(g => g.slug === 'kage-no-koe' || g.id === 'game-kage-no-koe')) {
    cleanGames.push({
      id: 'game-kage-no-koe',
      name: 'Kage No Koe: The Voice of the Shadow',
      slug: 'kage-no-koe',
      genre: 'Cinematic Dark Fantasy & Graphic Novel',
      platforms: ['PC', 'PS5', 'Xbox Series X'],
      description: 'Enter the shadow realm in this dark cinematic saga. Accompanied by official illustrated comic book chapters and high-definition cinematic trailer video.',
      story: 'In a forgotten age where shadows gained consciousness and dark forces awakened, Kage No Koe (The Voice of the Shadow) follows a spectral warrior fighting through ruined sanctuaries.',
      features: [
        'Cinematic Shadow Combat: Manipulate dark energy vectors and execute fluid stance counter-attacks.',
        'Official Graphic Novel Chapters: Includes Chapter 1 and Chapter 2 with built-in online PDF reader view.',
        'High-Definition Official Trailer: Watch the official cinematic trailer video directly inside Srishti Studios.'
      ],
      status: 'In Production',
      artworkUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'
      ],
      trailerUrl: '/Kage No Koe Trailer.mp4',
      downloadLinks: { steam: 'https://store.steampowered.com' },
      systemRequirements: {
        minimum: { os: 'Windows 10 64-bit', processor: 'Intel Core i5-9400F', memory: '16 GB RAM', graphics: 'NVIDIA GeForce GTX 1660 Super', storage: '50 GB SSD' },
        recommended: { os: 'Windows 11 64-bit', processor: 'Intel Core i7-12700K', memory: '32 GB RAM', graphics: 'NVIDIA GeForce RTX 4070', storage: '50 GB NVMe SSD' }
      },
      comicChapters: [
        {
          id: 'ch-1',
          title: 'Chapter 1: The Voice of the Shadow',
          pdfUrl: '/Kage No Koe_Chapter 1.pdf',
          description: 'Illustrated 40-Page Graphic Novel - Chapter 1'
        },
        {
          id: 'ch-2',
          title: 'Chapter 2: The Voice of the Shadow',
          pdfUrl: '/Kage No Koe_Chapter 2.pdf',
          description: 'Illustrated Graphic Novel - Chapter 2'
        }
      ]
    });
  }

  return NextResponse.json(cleanGames, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}

export async function POST(req: NextRequest) {
  const auth = verifyAuth(req);
  if (!auth) {
    return NextResponse.json({ error: 'Access denied. Unauthorized.' }, { status: 401 });
  }

  try {
    const gameData = await req.json();
    const newGame = mockDb.createGame(gameData);
    return NextResponse.json(newGame, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to create game specification', details: err.message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
