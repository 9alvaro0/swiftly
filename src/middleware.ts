// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting storage (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMITS = {
  api: { requests: 100, windowMs: 15 * 60 * 1000 }, // 100 requests per 15 minutes
  comments: { requests: 10, windowMs: 60 * 1000 }, // 10 comments per minute
  contact: { requests: 3, windowMs: 60 * 1000 }, // 3 contact submissions per minute
  auth: { requests: 5, windowMs: 15 * 60 * 1000 }, // 5 auth attempts per 15 minutes
};

function getRateLimitKey(request: NextRequest, type: string): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'anonymous';
  return `${type}:${ip}`;
}

function checkRateLimit(key: string, limit: { requests: number; windowMs: number }): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    // Create new record or reset expired one
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + limit.windowMs
    });
    return true;
  }

  if (record.count >= limit.requests) {
    return false; // Rate limit exceeded
  }

  // Increment count
  record.count += 1;
  return true;
}

function cleanupRateLimitMap(): void {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}

// Clean up expired entries every 5 minutes
setInterval(cleanupRateLimitMap, 5 * 60 * 1000);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Security headers for all responses
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: https: blob:; " +
    "connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://firestore.googleapis.com; " +
    "frame-src 'self' https://www.youtube.com https://player.vimeo.com;"
  );

  // Rate limiting for API routes
  if (pathname.startsWith('/api/')) {
    let limitType = 'api';
    let limit = RATE_LIMITS.api;

    // Specific rate limits for different endpoints
    if (pathname.includes('/comments')) {
      limitType = 'comments';
      limit = RATE_LIMITS.comments;
    } else if (pathname.includes('/contact')) {
      limitType = 'contact';
      limit = RATE_LIMITS.contact;
    } else if (pathname.includes('/auth')) {
      limitType = 'auth';
      limit = RATE_LIMITS.auth;
    }

    const rateLimitKey = getRateLimitKey(request, limitType);
    
    if (!checkRateLimit(rateLimitKey, limit)) {
      return new NextResponse(
        JSON.stringify({
          error: 'Too many requests',
          message: 'Rate limit exceeded. Please try again later.',
          retryAfter: Math.ceil(limit.windowMs / 1000)
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(Math.ceil(limit.windowMs / 1000)),
            ...Object.fromEntries(response.headers.entries())
          }
        }
      );
    }
  }

  // Admin route protection (basic check - Firebase Auth handles the real security)
  if (pathname.startsWith('/admin')) {
    // Add additional headers for admin pages
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
  }

  // Block suspicious user agents
  const userAgent = request.headers.get('user-agent') || '';
  const suspiciousAgents = ['sqlmap', 'nikto', 'gobuster', 'dirb'];
  
  if (suspiciousAgents.some(agent => userAgent.toLowerCase().includes(agent))) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // Block requests with suspicious patterns
  const suspiciousPatterns = [
    /\.\.\//, // Path traversal
    /\<script/i, // XSS attempts
    /union.*select/i, // SQL injection
    /exec\(/i, // Code execution
  ];

  const url = request.url;
  if (suspiciousPatterns.some(pattern => pattern.test(url))) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  // Add CORS headers for API routes
  if (pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production' ? 'https://aprendeswift.dev' : '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers: response.headers });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)',
  ],
};