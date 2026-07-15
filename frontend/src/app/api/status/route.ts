import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    database: { connected: true, type: 'Serverless Mock Database' },
    version: '1.0.0'
  });
}
export const dynamic = 'force-dynamic';
