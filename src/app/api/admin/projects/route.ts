import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/utils/auth';
import { mockDb } from '@/utils/mockDb';

// GET /api/admin/projects - List all AI game projects
export async function GET(req: NextRequest) {
  const auth = verifyAdminAuth(req);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized. Admin role required.' }, { status: 403 });
  }

  return NextResponse.json(mockDb.getProjects());
}

// POST /api/admin/projects - Create a new project manually or draft
export async function POST(req: NextRequest) {
  const auth = verifyAdminAuth(req);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized. Admin role required.' }, { status: 403 });
  }

  try {
    const projectData = await req.json();
    const newProject = mockDb.createProject({
      ownerId: auth.userId || 'admin',
      name: projectData.name || 'Untitled AI Project',
      prompt: projectData.prompt || '',
      status: projectData.status || 'DRAFT',
      designData: projectData.designData || {},
      files: projectData.files || [],
      playableCode: projectData.playableCode || '',
      gameType: projectData.gameType || 'action-rpg'
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to create project', details: err.message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
