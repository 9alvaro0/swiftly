// src/app/api/admin/newsletter/route.ts
import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import NewsletterSubscriber from '@/types/NewsletterSubscriber';
import { headers } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    // Get auth header
    const headersList = await headers();
    const authHeader = headersList.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Missing or invalid authorization header');
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Basic token validation
    const token = authHeader.substring(7);
    if (!token || token.length < 100) {
      console.log('Invalid token format');
      return Response.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';

    console.log(`Admin API: Fetching newsletter subscribers with filters - search: "${searchTerm}", status: "${status}"`);

    // Check if Admin SDK is available
    if (!adminDb) {
      console.error('Firebase Admin SDK not initialized');
      return Response.json({ 
        error: 'Service unavailable', 
        message: 'Admin services not configured' 
      }, { status: 503 });
    }

    try {
      // Get all newsletter subscribers from Firestore using Admin SDK
      const subscribersSnapshot = await adminDb
        .collection('newsletterSubscribers')
        .orderBy('createdAt', 'desc')
        .get();

      console.log(`Admin API: Found ${subscribersSnapshot.docs.length} newsletter documents`);

      const subscribers: NewsletterSubscriber[] = subscribersSnapshot.docs
        .map(doc => {
          try {
            const data = doc.data() as Record<string, unknown>;
            return {
              id: doc.id,
              email: data.email || '',
              isActive: data.isActive !== false, // Default to true if not specified
              createdAt: (data.createdAt as { toDate?: () => Date })?.toDate?.() || new Date(),
              lastEmailSent: (data.lastEmailSent as { toDate?: () => Date })?.toDate?.(),
              metadata: data.metadata,
            } as NewsletterSubscriber;
          } catch (parseError) {
            console.error(`Error parsing document ${doc.id}:`, parseError);
            return null;
          }
        })
        .filter((subscriber): subscriber is NewsletterSubscriber => {
          if (!subscriber) return false;
          
          // Apply filters
          const matchesStatus = status ? subscriber.isActive === (status === 'active') : true;
          const matchesSearch = searchTerm ? 
            subscriber.email?.toLowerCase().includes(searchTerm.toLowerCase()) : true;

          return matchesStatus && matchesSearch;
        });

      console.log(`Admin API: Returning ${subscribers.length} filtered subscribers`);
      return Response.json({ subscribers });
    } catch (dbError) {
      console.error('Database error in newsletter query:', dbError);
      // If Firebase is having issues, return 503
      return Response.json({ 
        error: 'Service temporarily unavailable', 
        message: 'Unable to connect to database. Please try again later.' 
      }, { status: 503 });
    }
  } catch (error) {
    console.error('Error in /api/admin/newsletter:', error);
    
    // Log full error details
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return Response.json({ 
      error: 'Internal server error',
      message: 'An unexpected error occurred'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Get auth header
    const headersList = await headers();
    const authHeader = headersList.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Missing or invalid authorization header');
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Basic token validation
    const token = authHeader.substring(7);
    if (!token || token.length < 100) {
      console.log('Invalid token format');
      return Response.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { subscriberId, currentStatus } = body;

    // Validate input
    if (!subscriberId || typeof subscriberId !== 'string') {
      return Response.json({ 
        error: 'Bad request', 
        message: 'Subscriber ID is required' 
      }, { status: 400 });
    }

    if (typeof currentStatus !== 'boolean') {
      return Response.json({ 
        error: 'Bad request', 
        message: 'Current status must be a boolean' 
      }, { status: 400 });
    }

    console.log(`Admin API: Toggling newsletter status for subscriber ${subscriberId} from ${currentStatus} to ${!currentStatus}`);

    // Check if Admin SDK is available
    if (!adminDb) {
      console.error('Firebase Admin SDK not initialized');
      return Response.json({ 
        error: 'Service unavailable', 
        message: 'Admin services not configured' 
      }, { status: 503 });
    }

    try {
      // Toggle the subscription status using Admin SDK
      await adminDb
        .collection('newsletterSubscribers')
        .doc(subscriberId)
        .update({
          isActive: !currentStatus,
          updatedAt: new Date(),
          ...(currentStatus ? { deactivatedAt: new Date() } : { reactivatedAt: new Date() })
        });

      console.log(`Admin API: Successfully toggled newsletter status for subscriber ${subscriberId}`);
      
      return Response.json({ 
        success: true,
        message: 'Newsletter status updated successfully',
        newStatus: !currentStatus
      });
    } catch (dbError) {
      console.error('Database error in newsletter toggle:', dbError);
      
      if (dbError instanceof Error && dbError.message.includes('No document to update')) {
        return Response.json({ 
          error: 'Not found', 
          message: 'Subscriber not found' 
        }, { status: 404 });
      }
      
      return Response.json({ 
        error: 'Service temporarily unavailable', 
        message: 'Unable to update newsletter status. Please try again later.' 
      }, { status: 503 });
    }
  } catch (error) {
    console.error('Error in PUT /api/admin/newsletter:', error);
    
    // Log full error details
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return Response.json({ 
      error: 'Internal server error',
      message: 'An unexpected error occurred'
    }, { status: 500 });
  }
}