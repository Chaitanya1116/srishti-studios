import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/utils/mockDb';
import { verifyAuth } from '@/utils/auth';

export async function GET() {
  return NextResponse.json(mockDb.getPosts());
}

export async function POST(req: NextRequest) {
  const auth = verifyAuth(req);
  if (!auth) {
    return NextResponse.json({ error: 'Access denied. Unauthorized.' }, { status: 401 });
  }

  try {
    const postData = await req.json();
    const newPost = mockDb.createPost(postData);
    return NextResponse.json(newPost, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to create blog post', details: err.message }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
