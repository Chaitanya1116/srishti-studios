import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/utils/mockDb';
import { verifyAuth } from '@/utils/auth';

export async function GET(req: NextRequest) {
  const auth = verifyAuth(req);
  if (!auth) {
    return NextResponse.json({ error: 'Access denied. Unauthorized.' }, { status: 401 });
  }
  return NextResponse.json(mockDb.getNewsletters());
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    mockDb.addNewsletter(email);
    return NextResponse.json({ message: 'Subscribed successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Subscription failed', details: err.message }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
