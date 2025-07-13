// src/app/api/user/newsletter/route.ts
import { NextRequest } from 'next/server';
import { headers } from 'next/headers';
import { subscribe, unsubscribe, getSubscriptionStatus } from '@/services/firebase/firestore/newsletter';

export async function GET(request: NextRequest) {
  try {
    // Get auth header
    const headersList = await headers();
    const authHeader = headersList.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Basic token validation
    const token = authHeader.substring(7);
    if (!token || token.length < 100) {
      return Response.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get email from query params (sent from frontend)
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return Response.json({ error: 'Email parameter is required' }, { status: 400 });
    }

    console.log(`User API: Getting newsletter status for user: ${email}`);

    try {
      const status = await getSubscriptionStatus(email);
      
      return Response.json({ 
        subscriptionStatus: status || { isSubscribed: false, isActive: false }
      });
    } catch (dbError) {
      console.error('Database error in user newsletter status query:', dbError);
      return Response.json({ 
        error: 'Service temporarily unavailable', 
        message: 'Unable to get subscription status. Please try again later.' 
      }, { status: 503 });
    }
  } catch (error) {
    console.error('Error in GET /api/user/newsletter:', error);
    return Response.json({ 
      error: 'Internal server error',
      message: 'An unexpected error occurred'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get auth header
    const headersList = await headers();
    const authHeader = headersList.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Basic token validation
    const token = authHeader.substring(7);
    if (!token || token.length < 100) {
      return Response.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { action, email } = body;

    if (!action || !['subscribe', 'unsubscribe'].includes(action)) {
      return Response.json({ 
        error: 'Bad request', 
        message: 'Action must be either "subscribe" or "unsubscribe"' 
      }, { status: 400 });
    }

    if (!email) {
      return Response.json({ 
        error: 'Bad request', 
        message: 'Email is required' 
      }, { status: 400 });
    }

    console.log(`User API: ${action} newsletter for user: ${email}`);

    try {
      if (action === 'subscribe') {
        await subscribe(email, {
          source: 'profile'
        });
        
        return Response.json({ 
          success: true,
          message: 'Te has suscrito al newsletter correctamente',
          isSubscribed: true,
          isActive: true
        });
      } else {
        await unsubscribe(email);
        
        return Response.json({ 
          success: true,
          message: 'Te has desuscrito del newsletter correctamente',
          isSubscribed: true,
          isActive: false
        });
      }
    } catch (dbError) {
      console.error(`Database error in user newsletter ${action}:`, dbError);
      
      // Handle specific errors
      if (dbError instanceof Error) {
        if (dbError.message.includes('ya está suscrito')) {
          return Response.json({ 
            error: 'Already subscribed', 
            message: 'Ya estás suscrito al newsletter' 
          }, { status: 409 });
        }
        
        if (dbError.message.includes('not found')) {
          return Response.json({ 
            error: 'Not found', 
            message: 'No se encontró la suscripción' 
          }, { status: 404 });
        }
      }
      
      return Response.json({ 
        error: 'Service temporarily unavailable', 
        message: `No se pudo ${action === 'subscribe' ? 'suscribir' : 'desuscribir'}. Inténtalo de nuevo.` 
      }, { status: 503 });
    }
  } catch (error) {
    console.error('Error in POST /api/user/newsletter:', error);
    return Response.json({ 
      error: 'Internal server error',
      message: 'An unexpected error occurred'
    }, { status: 500 });
  }
}