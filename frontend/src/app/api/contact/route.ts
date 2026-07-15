import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/utils/mockDb';
import { verifyAuth } from '@/utils/auth';

export async function GET(req: NextRequest) {
  const auth = verifyAuth(req);
  if (!auth) {
    return NextResponse.json({ error: 'Access denied. Unauthorized.' }, { status: 401 });
  }
  return NextResponse.json(mockDb.getInquiries());
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields: name, email, subject, message are required' }, { status: 400 });
    }

    const inquiry = mockDb.createInquiry({ name, email, subject, message });
    return NextResponse.json(inquiry, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: 'Submission failed', details: err.message }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
