// src/app/api/admin/users/route.ts
import { NextRequest } from 'next/server';
import { getAllUsers } from '@/services/firebase/firestore/user';
import { User } from '@/types/User';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';
    const status = searchParams.get('status') || '';

    // Use the regular Firebase service instead of Admin SDK
    const users = await getAllUsers(searchTerm, role, status);

    return Response.json({ users });
  } catch (error) {
    console.error('Error getting users:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}