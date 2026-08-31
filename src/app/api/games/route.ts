import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/utils/mockDb';
import { verifyAuth } from '@/utils/auth';

export async function GET() {
  return NextResponse.json(mockDb.getGames());
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
