import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/utils/mockDb';
import { verifyAuth } from '@/utils/auth';

export async function GET(req: NextRequest) {
  const auth = verifyAuth(req);
  if (!auth) {
    return NextResponse.json({ error: 'Access denied. Unauthorized.' }, { status: 401 });
  }
  return NextResponse.json(mockDb.getApplications());
}

export async function POST(req: NextRequest) {
  try {
    const { jobId, name, email, resumeUrl, coverLetter } = await req.json();

    if (!jobId || !name || !email || !resumeUrl) {
      return NextResponse.json({ error: 'Required fields: jobId, name, email, resumeUrl' }, { status: 400 });
    }

    const application = mockDb.createApplication({
      jobId,
      name,
      email,
      resumeUrl,
      coverLetter: coverLetter || ''
    });

    return NextResponse.json(application, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: 'Submission failed', details: err.message }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
// Add POST fallback configuration if needed
export const runtime = 'nodejs';
