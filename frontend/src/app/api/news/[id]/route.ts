import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/utils/mockDb';
import { verifyAuth } from '@/utils/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const idOrSlug = resolvedParams.id;
  const post = mockDb.getPosts().find(p => p.id === idOrSlug || p.slug === idOrSlug);
  
  if (!post) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = verifyAuth(req);
  if (!auth) {
    return NextResponse.json({ error: 'Access denied. Unauthorized.' }, { status: 401 });
  }

  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    const updatedData = await req.json();
    const updated = mockDb.updatePost(id, updatedData);
    if (!updated) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: 'Update failed', details: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = verifyAuth(req);
  if (!auth) {
    return NextResponse.json({ error: 'Access denied. Unauthorized.' }, { status: 401 });
  }

  const resolvedParams = await params;
  const id = resolvedParams.id;

  const success = mockDb.deletePost(id);
  if (!success) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Article deleted successfully' });
}
