// src/utils/auth.ts

import { User } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/services/firebase/config';

// User roles definition
export type UserRole = 'admin' | 'editor' | 'author' | 'user' | 'guest';

// Extended user interface with role information
export interface AuthenticatedUser extends User {
  role?: UserRole;
  isAdmin?: boolean;
  customClaims?: {
    admin?: boolean;
    role?: UserRole;
  };
}

/**
 * Check if user has admin privileges
 */
export function isAdmin(user: AuthenticatedUser | null): boolean {
  if (!user) return false;
  return user.customClaims?.admin === true || user.role === 'admin';
}

/**
 * Check if user has content creation privileges
 */
export function canCreateContent(user: AuthenticatedUser | null): boolean {
  if (!user) return false;
  const role = user.customClaims?.role || user.role;
  return ['admin', 'editor', 'author'].includes(role || '');
}

/**
 * Check if user can manage users
 */
export function canManageUsers(user: AuthenticatedUser | null): boolean {
  return isAdmin(user);
}

/**
 * Check if user can moderate comments
 */
export function canModerateComments(user: AuthenticatedUser | null): boolean {
  if (!user) return false;
  const role = user.customClaims?.role || user.role;
  return ['admin', 'editor'].includes(role || '');
}

/**
 * Get user's role from Firestore
 */
export async function getUserRole(uid: string): Promise<UserRole> {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.role || 'user';
    }
    
    return 'user'; // Default role
  } catch (error) {
    console.error('Error getting user role:', error);
    return 'user';
  }
}

/**
 * Create or update user profile in Firestore
 */
export async function createUserProfile(
  user: User,
  additionalData: {
    role?: UserRole;
    name?: string;
    provider?: string;
  } = {}
) {
  try {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    // If user doesn't exist, create profile
    if (!userDoc.exists()) {
      const userData = {
        uid: user.uid,
        email: user.email || '',
        emailVerified: user.emailVerified,
        username: user.displayName || user.email?.split('@')[0] || '',
        name: additionalData.name || user.displayName || '',
        firstName: '',
        lastName: '',
        photoURL: user.photoURL || '',
        bio: '',
        location: '',
        phone: user.phoneNumber || '',
        provider: additionalData.provider || 'email',
        
        // Dates
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        
        // Permissions and status
        role: additionalData.role || 'user',
        isActive: true,
        isBanned: false,
        
        // Stats
        stats: {
          views: [],
          likes: []
        },
        
        // Social links
        socialLinks: {
          linkedin: '',
          github: ''
        }
      };
      
      await setDoc(userRef, userData);
      console.log('User profile created successfully');
    } else {
      // Update last login
      await setDoc(userRef, {
        lastLogin: serverTimestamp()
      }, { merge: true });
    }
    
  } catch (error) {
    console.error('Error creating/updating user profile:', error);
    throw error;
  }
}

/**
 * Validate user permissions for specific actions
 */
export function validatePermissions(
  user: AuthenticatedUser | null,
  action: 'create_post' | 'edit_post' | 'delete_post' | 'manage_users' | 'moderate_comments',
  resourceOwnerId?: string
): boolean {
  if (!user) return false;
  
  switch (action) {
    case 'create_post':
      return canCreateContent(user);
      
    case 'edit_post':
      return canCreateContent(user) || 
             Boolean(resourceOwnerId && user.uid === resourceOwnerId);
      
    case 'delete_post':
      return isAdmin(user);
      
    case 'manage_users':
      return canManageUsers(user);
      
    case 'moderate_comments':
      return canModerateComments(user) ||
             Boolean(resourceOwnerId && user.uid === resourceOwnerId);
      
    default:
      return false;
  }
}

/**
 * Rate limiting helper for user actions
 */
export class RateLimiter {
  private static limits = new Map<string, number>();
  
  static canPerformAction(
    userId: string, 
    action: 'comment' | 'post' | 'like',
    limitPerMinute: number = 5
  ): boolean {
    const key = `${userId}:${action}`;
    const now = Date.now();
    const lastAction = this.limits.get(key) || 0;
    
    // Check if enough time has passed
    if (now - lastAction < (60 * 1000) / limitPerMinute) {
      return false;
    }
    
    // Update last action time
    this.limits.set(key, now);
    
    // Clean up old entries (optional optimization)
    if (this.limits.size > 1000) {
      const cutoff = now - 60 * 1000;
      for (const [k, v] of this.limits.entries()) {
        if (v < cutoff) {
          this.limits.delete(k);
        }
      }
    }
    
    return true;
  }
}

/**
 * Security helper functions
 */
export const SecurityUtils = {
  /**
   * Sanitize user input to prevent XSS
   */
  sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove basic HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: URLs
      .replace(/on\w+=/gi, '') // Remove event handlers
      .trim();
  },
  
  /**
   * Validate email format
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  /**
   * Validate content length
   */
  isValidLength(content: string, min: number = 1, max: number = 10000): boolean {
    return content.length >= min && content.length <= max;
  },
  
  /**
   * Check for spam content (basic implementation)
   */
  isSpam(content: string): boolean {
    const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'click here'];
    const lowerContent = content.toLowerCase();
    
    return spamKeywords.some(keyword => lowerContent.includes(keyword)) ||
           content.includes('http') && content.split('http').length > 3; // Too many links
  }
};