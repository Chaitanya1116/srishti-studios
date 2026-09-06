import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/utils/auth';
import { mockDb } from '@/utils/mockDb';

export async function GET(req: NextRequest) {
  const auth = verifyAuth(req);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = mockDb.getUserByUsername(auth.username);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    lastLogin: user.lastLogin
  });
}
export const dynamic = 'force-dynamic';
