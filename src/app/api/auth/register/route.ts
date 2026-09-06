import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { mockDb } from '@/utils/mockDb';
import { JWT_SECRET } from '@/utils/auth';

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ error: 'Username, email, and password are required' }, { status: 400 });
    }

    if (username.length < 3) {
      return NextResponse.json({ error: 'Username must be at least 3 characters long' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters long' }, { status: 400 });
    }

    // Check duplicate username or email
    if (mockDb.getUserByUsername(username)) {
      return NextResponse.json({ error: 'Username is already taken' }, { status: 400 });
    }

    if (mockDb.getUserByEmail(email)) {
      return NextResponse.json({ error: 'Email address is already registered' }, { status: 400 });
    }

    // Hash password with bcrypt
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = mockDb.createUser({
      username,
      email,
      passwordHash,
      role: 'USER', // Standard user role
      status: 'ACTIVE'
    });

    const payload = {
      userId: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    return NextResponse.json({
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status
      }
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: 'Registration error', details: err.message }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
