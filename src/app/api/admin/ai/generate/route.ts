import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/utils/auth';
import { mockDb } from '@/utils/mockDb';
import { orchestrateGameGeneration } from '@/utils/aiAgents';
import { generateProjectPackage } from '@/utils/projectGenerator';

export async function POST(req: NextRequest) {
  const auth = verifyAdminAuth(req);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized. Admin role required.' }, { status: 403 });
  }

  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 5) {
      return NextResponse.json({ error: 'A descriptive natural-language game prompt is required.' }, { status: 400 });
    }

    // 1. Run multi-agent orchestrator
    const aiOutput = await orchestrateGameGeneration(prompt.trim());

    // 2. Generate structured project package & playable canvas code
    const projectPackage = generateProjectPackage(aiOutput.title, aiOutput.designData);

    // 3. Create project in DB with default status DRAFT
    const newProject = mockDb.createProject({
      ownerId: auth.userId || 'admin',
      name: aiOutput.title,
      prompt: prompt.trim(),
      status: 'DRAFT', // DEFAULT STATUS IS DRAFT, NEVER AUTO-PUBLISH
      designData: aiOutput.designData,
      files: projectPackage.files,
      playableCode: projectPackage.playableCode,
      gameType: projectPackage.gameType
    });

    mockDb.logActivity(auth.userId || 'admin', auth.username, `Srishti AI generated project "${aiOutput.title}" (Status: DRAFT)`);

    return NextResponse.json({
      message: 'Srishti AI generated project specification and files successfully.',
      project: newProject,
      agentLogs: aiOutput.logs
    }, { status: 201 });

  } catch (err: any) {
    return NextResponse.json({ error: 'Srishti AI generation failed', details: err.message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
