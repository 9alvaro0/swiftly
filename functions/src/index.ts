import {onRequest} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import cors from "cors";
import {User} from "./User";
import {Post} from "./Post";
import NewsletterSubscriber from "./NewsletterSubscriber";

// Initialize Firebase Admin SDK
admin.initializeApp();

const corsHandler = cors({origin: true});

// Helper function to verify admin token
async function verifyAdminToken(authHeader: string | null): Promise<{uid: string; email: string; isAdmin: boolean} | null> {
  try {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Check if user is admin based on email or custom claims
    const isAdmin = 
      decodedToken.admin === true ||
      decodedToken.role === 'admin' ||
      decodedToken.email === '9alvaro0@gmail.com';

    if (!isAdmin) {
      return null;
    }

    return {
      uid: decodedToken.uid,
      email: decodedToken.email || '',
      isAdmin: true,
    };
  } catch (error) {
    console.error('Error verifying admin token:', error);
    return null;
  }
}

// Admin Users API
export const adminUsers = onRequest((request, response) => {
  corsHandler(request, response, async () => {
    if (request.method !== 'GET') {
      response.status(405).json({ error: 'Method not allowed' });
      return;
    }

    // Verify admin authentication
    const adminUser = await verifyAdminToken(request.headers.authorization || null);
    if (!adminUser) {
      response.status(401).json({ error: 'Unauthorized: Admin access required' });
      return;
    }

    try {
      const searchTerm = request.query.search as string || '';
      const role = request.query.role as string || '';
      const status = request.query.status as string || '';

      // Get all users from Firestore
      const usersSnapshot = await admin.firestore()
        .collection('users')
        .orderBy('createdAt', 'desc')
        .get();

      const users: User[] = usersSnapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
            lastLogin: data.lastLogin?.toDate() || new Date(),
          } as User;
        })
        .filter(user => {
          const matchesRole = role ? user.role === role : true;
          const matchesStatus = status ? user.isActive === (status === 'active') : true;
          const matchesSearch = searchTerm ? 
            (user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
             user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
             user.name?.toLowerCase().includes(searchTerm.toLowerCase())) : true;

          return matchesRole && matchesStatus && matchesSearch;
        });

      response.json({ users });
    } catch (error) {
      console.error('Error getting users:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Admin Posts API
export const adminPosts = onRequest((request, response) => {
  corsHandler(request, response, async () => {
    if (request.method !== 'GET') {
      response.status(405).json({ error: 'Method not allowed' });
      return;
    }

    // Verify admin authentication
    const adminUser = await verifyAdminToken(request.headers.authorization || null);
    if (!adminUser) {
      response.status(401).json({ error: 'Unauthorized: Admin access required' });
      return;
    }

    try {
      const searchTerm = request.query.search as string || '';
      const status = request.query.status as string || '';
      const type = request.query.type as string || '';

      // Get all posts from Firestore
      const postsSnapshot = await admin.firestore()
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .get();

      const posts: Post[] = postsSnapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
            publishedAt: data.publishedAt?.toDate() || null,
          } as Post;
        })
        .filter(post => {
          const matchesStatus = status ? 
            (status === 'published' ? post.isPublished : !post.isPublished) : true;
          const matchesType = type ? post.type === type : true;
          const matchesSearch = searchTerm ? 
            (post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
             post.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
             post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) : true;

          return matchesStatus && matchesType && matchesSearch;
        });

      response.json({ posts });
    } catch (error) {
      console.error('Error getting posts:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Admin Newsletter API
export const adminNewsletter = onRequest((request, response) => {
  corsHandler(request, response, async () => {
    if (request.method !== 'GET') {
      response.status(405).json({ error: 'Method not allowed' });
      return;
    }

    // Verify admin authentication
    const adminUser = await verifyAdminToken(request.headers.authorization || null);
    if (!adminUser) {
      response.status(401).json({ error: 'Unauthorized: Admin access required' });
      return;
    }

    try {
      const searchTerm = request.query.search as string || '';
      const status = request.query.status as string || '';

      // Get all newsletter subscribers from Firestore
      const subscribersSnapshot = await admin.firestore()
        .collection('newsletterSubscribers')
        .orderBy('createdAt', 'desc')
        .get();

      const subscribers: NewsletterSubscriber[] = subscribersSnapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            email: data.email || '',
            isActive: data.isActive || false,
            createdAt: data.createdAt?.toDate() || new Date(),
            lastEmailSent: data.lastEmailSent?.toDate(),
            metadata: data.metadata,
          } as NewsletterSubscriber;
        })
        .filter(subscriber => {
          const matchesStatus = status ? subscriber.isActive === (status === 'active') : true;
          const matchesSearch = searchTerm ? 
            subscriber.email?.toLowerCase().includes(searchTerm.toLowerCase()) : true;

          return matchesStatus && matchesSearch;
        });

      response.json({ subscribers });
    } catch (error) {
      console.error('Error getting newsletter subscribers:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Contact Form API
export const contactForm = onRequest((request, response) => {
  corsHandler(request, response, async () => {
    if (request.method !== 'POST') {
      response.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const { name, email, message } = request.body;

      // Validation
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        response.status(400).json({ error: 'El nombre es obligatorio' });
        return;
      }
      if (name.trim().length > 100) {
        response.status(400).json({ error: 'El nombre debe tener máximo 100 caracteres' });
        return;
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
        response.status(400).json({ error: 'Email inválido' });
        return;
      }
      if (email.length > 254) {
        response.status(400).json({ error: 'Email demasiado largo' });
        return;
      }

      if (!message || typeof message !== 'string' || message.trim().length === 0) {
        response.status(400).json({ error: 'El mensaje es obligatorio' });
        return;
      }
      if (message.trim().length > 5000) {
        response.status(400).json({ error: 'El mensaje debe tener máximo 5000 caracteres' });
        return;
      }

      // Store contact message in Firestore
      await admin.firestore().collection('contactMessages').add({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        status: 'pending'
      });

      // TODO: Send email notification (integrate with email service)
      console.log('Contact form submitted:', { name: name.trim(), email: email.trim().toLowerCase() });

      response.json({ message: 'Mensaje enviado correctamente. Te responderemos pronto.' });
    } catch (error) {
      console.error('Error processing contact form:', error);
      response.status(500).json({ error: 'Error interno del servidor' });
    }
  });
});

// Newsletter Welcome API
export const newsletterWelcome = onRequest((request, response) => {
  corsHandler(request, response, async () => {
    if (request.method !== 'POST') {
      response.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const { email, name } = request.body;

      // Basic validation
      if (!email || typeof email !== 'string') {
        response.status(400).json({ error: 'Email es requerido' });
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        response.status(400).json({ error: 'Email inválido' });
        return;
      }

      // TODO: Send welcome email (integrate with email service)
      console.log('Newsletter welcome requested:', { email: email.trim().toLowerCase(), name });

      response.json({ message: 'Email de bienvenida enviado' });
    } catch (error) {
      console.error('Error sending newsletter welcome:', error);
      response.status(500).json({ error: 'Error interno del servidor' });
    }
  });
});

// ===============================
// PUBLIC FUNCTIONS (No Auth Required)
// ===============================

// Get all published posts with filtering
export const posts = onRequest((request, response) => {
  corsHandler(request, response, async () => {
    if (request.method !== 'GET') {
      response.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const searchTerm = request.query.search as string || '';
      const level = request.query.level as string || '';
      const type = request.query.type as string || '';
      const limit = parseInt(request.query.limit as string) || 50;
      const offset = parseInt(request.query.offset as string) || 0;

      // Get published posts from Firestore
      let query = admin.firestore()
        .collection('posts')
        .where('isPublished', '==', true)
        .where('status', '==', 'published')
        .orderBy('publishedAt', 'desc');

      if (limit && limit > 0) {
        query = query.limit(limit + offset) as any;
      }

      const postsSnapshot = await query.get();

      let posts: Post[] = postsSnapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
            publishedAt: data.publishedAt?.toDate() || null,
          } as Post;
        })
        .filter(post => {
          const matchesSearch = searchTerm ? 
            (post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
             post.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
             post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) : true;
          const matchesLevel = level ? post.level === level : true;
          const matchesType = type ? post.type === type : true;

          return matchesSearch && matchesLevel && matchesType;
        });

      // Apply offset after filtering
      if (offset > 0) {
        posts = posts.slice(offset);
      }
      if (limit > 0) {
        posts = posts.slice(0, limit);
      }

      response.json({ posts, total: posts.length });
    } catch (error) {
      console.error('Error getting posts:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Get single post by slug
export const postBySlug = onRequest((request, response) => {
  corsHandler(request, response, async () => {
    if (request.method !== 'GET') {
      response.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const slug = request.query.slug as string;
      
      if (!slug) {
        response.status(400).json({ error: 'Slug is required' });
        return;
      }

      // Get post by slug
      const postsSnapshot = await admin.firestore()
        .collection('posts')
        .where('slug', '==', slug)
        .where('isPublished', '==', true)
        .where('status', '==', 'published')
        .limit(1)
        .get();

      if (postsSnapshot.empty) {
        response.status(404).json({ error: 'Post not found' });
        return;
      }

      const doc = postsSnapshot.docs[0];
      const data = doc.data();
      const post: Post = {
        ...data,
        id: doc.id,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        publishedAt: data.publishedAt?.toDate() || null,
      } as Post;

      response.json({ post });
    } catch (error) {
      console.error('Error getting post by slug:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Get related posts
export const relatedPosts = onRequest((request, response) => {
  corsHandler(request, response, async () => {
    if (request.method !== 'GET') {
      response.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const postId = request.query.postId as string;
      const tags = request.query.tags as string;
      const limit = parseInt(request.query.limit as string) || 3;

      if (!postId || !tags) {
        response.status(400).json({ error: 'PostId and tags are required' });
        return;
      }

      const tagArray = tags.split(',');

      // Get posts with similar tags
      const postsSnapshot = await admin.firestore()
        .collection('posts')
        .where('isPublished', '==', true)
        .where('status', '==', 'published')
        .orderBy('publishedAt', 'desc')
        .limit(20) // Get more to filter better
        .get();

      const posts: Post[] = postsSnapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
            publishedAt: data.publishedAt?.toDate() || null,
          } as Post;
        })
        .filter(post => post.id !== postId) // Exclude current post
        .filter(post => {
          // Check if post has any similar tags
          return post.tags?.some(tag => tagArray.includes(tag)) || false;
        })
        .slice(0, limit);

      response.json({ posts });
    } catch (error) {
      console.error('Error getting related posts:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Increment post views
export const incrementPostViews = onRequest((request, response) => {
  corsHandler(request, response, async () => {
    if (request.method !== 'POST') {
      response.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const { postId } = request.body;

      if (!postId) {
        response.status(400).json({ error: 'PostId is required' });
        return;
      }

      // Increment views count
      await admin.firestore()
        .collection('posts')
        .doc(postId)
        .update({
          views: admin.firestore.FieldValue.increment(1),
        });

      response.json({ success: true });
    } catch (error) {
      console.error('Error incrementing post views:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Toggle post like
export const togglePostLike = onRequest((request, response) => {
  corsHandler(request, response, async () => {
    if (request.method !== 'POST') {
      response.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const { postId, userId, likeStatus } = request.body;

      if (!postId || !userId || typeof likeStatus !== 'boolean') {
        response.status(400).json({ error: 'PostId, userId, and likeStatus are required' });
        return;
      }

      const postRef = admin.firestore().collection('posts').doc(postId);

      await admin.firestore().runTransaction(async (transaction) => {
        const postDoc = await transaction.get(postRef);

        if (!postDoc.exists) {
          throw new Error('Post not found');
        }

        if (likeStatus) {
          // Add like
          transaction.update(postRef, {
            likedBy: admin.firestore.FieldValue.arrayUnion(userId),
          });
        } else {
          // Remove like
          transaction.update(postRef, {
            likedBy: admin.firestore.FieldValue.arrayRemove(userId),
          });
        }
      });

      response.json({ success: true });
    } catch (error) {
      console.error('Error toggling post like:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Get all tags
export const tags = onRequest((request, response) => {
  corsHandler(request, response, async () => {
    if (request.method !== 'GET') {
      response.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const searchTerm = request.query.search as string || '';

      const tagsSnapshot = await admin.firestore()
        .collection('tags')
        .get();

      let tags = tagsSnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(tag => {
          if (!tag.name) return false;
          return searchTerm ? 
            tag.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
        });

      response.json({ tags });
    } catch (error) {
      console.error('Error getting tags:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Get posts by tag
export const postsByTag = onRequest((request, response) => {
  corsHandler(request, response, async () => {
    if (request.method !== 'GET') {
      response.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const tag = request.query.tag as string;
      const limit = parseInt(request.query.limit as string) || 20;

      if (!tag) {
        response.status(400).json({ error: 'Tag is required' });
        return;
      }

      // Get posts that contain the tag
      const postsSnapshot = await admin.firestore()
        .collection('posts')
        .where('isPublished', '==', true)
        .where('status', '==', 'published')
        .where('tags', 'array-contains', tag)
        .orderBy('publishedAt', 'desc')
        .limit(limit)
        .get();

      const posts: Post[] = postsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          publishedAt: data.publishedAt?.toDate() || null,
        } as Post;
      });

      response.json({ posts });
    } catch (error) {
      console.error('Error getting posts by tag:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Newsletter subscription
export const newsletterSubscribe = onRequest((request, response) => {
  corsHandler(request, response, async () => {
    if (request.method !== 'POST') {
      response.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const { email, metadata = {} } = request.body;

      if (!email || typeof email !== 'string') {
        response.status(400).json({ error: 'Email is required' });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        response.status(400).json({ error: 'Invalid email format' });
        return;
      }

      const normalizedEmail = email.toLowerCase().trim();

      // Check if already subscribed
      const existingSubscriber = await admin.firestore()
        .collection('newsletterSubscribers')
        .where('email', '==', normalizedEmail)
        .limit(1)
        .get();

      if (!existingSubscriber.empty) {
        const existingDoc = existingSubscriber.docs[0];
        const existingData = existingDoc.data();

        // If inactive, reactivate
        if (existingData.isActive === false) {
          await admin.firestore()
            .collection('newsletterSubscribers')
            .doc(existingDoc.id)
            .update({
              isActive: true,
              reactivatedAt: admin.firestore.FieldValue.serverTimestamp(),
              metadata: {
                ...existingData.metadata,
                ...metadata,
                source: 'website',
                reactivated: true,
              },
            });

          response.json({ message: 'Subscription reactivated successfully' });
          return;
        }

        response.status(400).json({ error: 'Este correo ya está suscrito' });
        return;
      }

      // Create new subscription
      await admin.firestore()
        .collection('newsletterSubscribers')
        .add({
          email: normalizedEmail,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          isActive: true,
          metadata: {
            ...metadata,
            source: 'website',
          },
        });

      response.json({ message: 'Subscribed successfully' });
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Get user profile (public info only)
export const userProfile = onRequest((request, response) => {
  corsHandler(request, response, async () => {
    if (request.method !== 'GET') {
      response.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const uid = request.query.uid as string;

      if (!uid) {
        response.status(400).json({ error: 'User ID is required' });
        return;
      }

      const userDoc = await admin.firestore()
        .collection('users')
        .doc(uid)
        .get();

      if (!userDoc.exists) {
        response.status(404).json({ error: 'User not found' });
        return;
      }

      const userData = userDoc.data();
      
      // Return only public information
      const publicProfile = {
        uid: userDoc.id,
        username: userData?.username || '',
        name: userData?.name || '',
        photoURL: userData?.photoURL || '',
        bio: userData?.bio || '',
        location: userData?.location || '',
        socialLinks: userData?.socialLinks || {},
        createdAt: userData?.createdAt?.toDate() || new Date(),
        stats: userData?.stats || { views: [], likes: [] },
      };

      response.json({ user: publicProfile });
    } catch (error) {
      console.error('Error getting user profile:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
});