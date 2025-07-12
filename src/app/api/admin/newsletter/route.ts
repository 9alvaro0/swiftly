// src/app/api/admin/newsletter/route.ts
import { NextRequest } from 'next/server';
import { getAllNewsletterSubscribers } from '@/services/firebase/firestore/newsletter';
import { NewsletterSubscriber } from '@/types/NewsletterSubscriber';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';

    // Get all newsletter subscribers
    const allSubscribers = await getAllNewsletterSubscribers();
    
    // Apply filters
    const subscribers = allSubscribers.filter(subscriber => {
      const matchesStatus = status ? subscriber.isActive === (status === 'active') : true;
      const matchesSearch = searchTerm ? 
        subscriber.email?.toLowerCase().includes(searchTerm.toLowerCase()) : true;

      return matchesStatus && matchesSearch;
    });

    return Response.json({ subscribers });
  } catch (error) {
    console.error('Error getting newsletter subscribers:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}