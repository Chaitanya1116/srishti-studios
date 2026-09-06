import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/utils/auth';
import { mockDb } from '@/utils/mockDb';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = verifyAdminAuth(req);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized. Admin role required.' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const { project, game } = mockDb.approveAndReleaseProject(id);

    return NextResponse.json({
      message: 'Game approved and released to public website successfully!',
      project,
      releasedGame: game,
      publicUrl: `/games/${game.slug}`
    });
  } catch (err: any) {
    return NextResponse.json({ error: 'Release failed', details: err.message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
