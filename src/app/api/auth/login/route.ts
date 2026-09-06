import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { mockDb } from '@/utils/mockDb';
import { JWT_SECRET } from '@/utils/auth';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    // Lookup by username or email
    const user = mockDb.getUserByUsername(username) || mockDb.getUserByEmail(username);

    if (!user) {
      return NextResponse.json({ error: 'Invalid username/email or password' }, { status: 401 });
    }

    // Check account status
    if (user.status === 'SUSPENDED') {
      return NextResponse.json(
        { error: 'Account suspended. Please contact Srishti Studios administration.' },
        { status: 403 }
      );
    }

    // Verify password with bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid username/email or password' }, { status: 401 });
    }

    mockDb.recordLogin(user.id);

    const payload = {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (err: any) {
    return NextResponse.json({ error: 'Authentication error', details: err.message }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
