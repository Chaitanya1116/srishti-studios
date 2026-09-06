import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/utils/auth';
import { mockDb } from '@/utils/mockDb';

export async function GET(req: NextRequest) {
  const auth = verifyAdminAuth(req);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized. Admin role required.' }, { status: 403 });
  }

  return NextResponse.json({
    analytics: mockDb.getAnalytics(),
    activityLogs: mockDb.getActivityLogs()
  });
}

export const dynamic = 'force-dynamic';
