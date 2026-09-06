import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/utils/auth';
import { mockDb } from '@/utils/mockDb';

// GET /api/admin/users - List all users
export async function GET(req: NextRequest) {
  const auth = verifyAdminAuth(req);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized. Admin role required.' }, { status: 403 });
  }

  const users = await mockDb.getUsersAsync();
  return NextResponse.json(users);
}

// PUT /api/admin/users - Update user status / role
export async function PUT(req: NextRequest) {
  const auth = verifyAdminAuth(req);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized. Admin role required.' }, { status: 403 });
  }

  try {
    const { userId, status, role } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const updated = mockDb.updateUser(userId, {
      ...(status && { status }),
      ...(role && { role })
    });

    if (!updated) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    mockDb.logActivity(auth.userId || 'admin', auth.username, `Updated user ${updated.username} status to ${status || updated.status}`);

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update user' }, { status: 400 });
  }
}

// DELETE /api/admin/users - Remove user
export async function DELETE(req: NextRequest) {
  const auth = verifyAdminAuth(req);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized. Admin role required.' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const success = mockDb.deleteUser(userId);
    if (!success) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    mockDb.logActivity(auth.userId || 'admin', auth.username, `Deleted user account ID ${userId}`);

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to delete user' }, { status: 400 });
  }
}

export const dynamic = 'force-dynamic';
