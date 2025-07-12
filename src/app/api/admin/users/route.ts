// src/app/api/admin/users/route.ts
import { NextRequest } from 'next/server';
import { getAllUsers } from '@/services/firebase/firestore/user';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';
    const status = searchParams.get('status') || '';

    // Get all users
    const allUsers = await getAllUsers();
    
    // Apply filters
    const users = allUsers.filter(user => {
      const matchesRole = role ? user.role === role : true;
      const matchesStatus = status ? user.isActive === (status === 'active') : true;
      const matchesSearch = searchTerm ? 
        (user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         user.name?.toLowerCase().includes(searchTerm.toLowerCase())) : true;

      return matchesRole && matchesStatus && matchesSearch;
    });

    return Response.json({ users });
  } catch (error) {
    console.error('Error getting users:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}