import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Get auth header
    const headersList = await headers();
    const authHeader = headersList.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Missing or invalid authorization header');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Basic token validation
    const token = authHeader.substring(7);
    if (!token || token.length < 100) {
      console.log('Invalid token format');
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { name, slug, description } = await request.json();

    // Validate input
    if (!name || !slug) {
      return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 });
    }

    // Validate slug format
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json({ error: 'Invalid slug format' }, { status: 400 });
    }

    // Check if tag already exists
    const existingTag = await adminDb.collection('tags').doc(slug).get();
    if (existingTag.exists) {
      return NextResponse.json({ error: 'Tag already exists' }, { status: 409 });
    }

    // Create tag using Admin SDK
    const tagData = {
      name: name.trim(),
      slug: slug.toLowerCase().trim(),
      description: description?.trim() || '',
      createdAt: new Date(),
      updatedAt: new Date(),
      postCount: 0
    };

    await adminDb.collection('tags').doc(slug).set(tagData);

    return NextResponse.json({ 
      success: true, 
      tag: { ...tagData, id: slug } 
    });

  } catch (error) {
    console.error('Error creating tag:', error);
    return NextResponse.json({ 
      error: 'Failed to create tag' 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const tagsSnapshot = await adminDb.collection('tags').orderBy('name').get();
    const tags = tagsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ tags });

  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch tags' 
    }, { status: 500 });
  }
}