import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/utils/auth';
import { mockDb } from '@/utils/mockDb';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = verifyAdminAuth(req);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized. Admin role required.' }, { status: 403 });
  }

  const { id } = await params;
  const project = mockDb.getProjectById(id);
  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = verifyAdminAuth(req);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized. Admin role required.' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const updates = await req.json();
    const updated = mockDb.updateProject(id, updates);

    if (!updated) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    mockDb.logActivity(auth.userId || 'admin', auth.username, `Updated project status/details for ${updated.name}`);

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update project', details: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = verifyAdminAuth(req);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized. Admin role required.' }, { status: 403 });
  }

  const { id } = await params;
  const success = mockDb.deleteProject(id);
  if (!success) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  mockDb.logActivity(auth.userId || 'admin', auth.username, `Deleted project ID ${id}`);

  return NextResponse.json({ message: 'Project deleted' });
}

export const dynamic = 'force-dynamic';
