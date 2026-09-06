import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { mockDb } from './mockDb';

export const JWT_SECRET = process.env.JWT_SECRET || 'srishti-secret-2026-key';

export interface TokenPayload {
  userId: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export const verifyAuth = (req: NextRequest): TokenPayload | null => {
  const authHeader = req.headers.get('authorization');
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    // Check if user is suspended in DB
    if (decoded && decoded.username) {
      const dbUser = mockDb.getUserByUsername(decoded.username);
      if (dbUser && dbUser.status === 'SUSPENDED') {
        return null; // Reject suspended users
      }
    }
    return decoded;
  } catch (err) {
    return null;
  }
};

export const verifyAdminAuth = (req: NextRequest): TokenPayload | null => {
  const auth = verifyAuth(req);
  if (!auth) return null;
  const isMythriAdmin =
    auth.role === 'ADMIN' &&
    (auth.email.toLowerCase() === 'mythrichaitu05@gmail.com' ||
      auth.username.toLowerCase() === 'mythrichaitu05@gmail.com' ||
      auth.username.toLowerCase() === 'mythrichaitu05');
  if (!isMythriAdmin) {
    return null; // Reject all other users from accessing admin routes
  }
  return auth;
};
