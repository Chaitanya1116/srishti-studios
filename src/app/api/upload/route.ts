import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/utils/auth';

export async function POST(req: NextRequest) {
  const auth = verifyAuth(req);
  if (!auth) {
    return NextResponse.json({ error: 'Access denied. Unauthorized.' }, { status: 401 });
  }

  try {
    const { file } = await req.json();
    if (!file) {
      return NextResponse.json({ error: 'File data is required' }, { status: 400 });
    }

    // Mock Upload: Return a high-quality placeholder image
    const mockImages = [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop'
    ];
    const randomUrl = mockImages[Math.floor(Math.random() * mockImages.length)];
    return NextResponse.json({ url: randomUrl });
  } catch (err: any) {
    return NextResponse.json({ error: 'Upload failed', details: err.message }, { status: 500 });
  }
}
