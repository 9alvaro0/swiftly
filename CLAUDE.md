# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks (must pass before deployment)

## Architecture Overview

This is a Next.js 15 blog platform called "Swiftly" focused on Swift/SwiftUI content. The application uses Firebase as the backend and follows a modern React/TypeScript architecture with comprehensive error handling.

### Core Technologies
- Next.js 15 with App Router
- TypeScript with strict mode
- Firebase (Auth, Firestore, Storage)
- Tailwind CSS v4
- Zustand for state management
- React Markdown for content rendering
- Sonner for toast notifications

### Key Architecture Patterns

**State Management**: Global auth state is managed via Zustand store (`src/store/authStore.ts`) with persistence. Component-level state uses custom hooks in `src/hooks/`. Auth logout function properly calls Firebase auth service.

**Firebase Integration**: All Firebase services are centralized in `src/services/firebase/` with comprehensive error handling:
- All operations wrapped in try-catch blocks
- Graceful fallbacks for failed operations
- Detailed error logging for debugging
- Input validation before Firebase calls
- Optimized queries to avoid composite index requirements

**Content Model**: Posts support both articles and tutorials with levels (Principiante/Intermedio/Avanzado). The Post type includes comprehensive metadata, SEO fields, and author information. Content is stored as markdown in Firestore.

**Component Structure**:
- `src/components/ui/` - Reusable UI components
- `src/components/admin/` - Admin panel components with dashboard stats
- `src/components/auth/` - Authentication flows and protection (uses Next.js router, not window.location)
- `src/components/layout/` - Header/footer and navigation

**Routing**: Uses App Router with dynamic routes for posts (`/posts/[slug]`), tags (`/tags/[slug]`), and tutorials (`/tutorials/[slug]`). Admin routes are nested under `/admin/`. All navigation uses Next.js router for security.

**Image Handling**: Supports Firebase Storage and GitHub avatars with comprehensive validation. Images are handled through dedicated utilities in `src/utils/` for both posts and user profiles.

**TypeScript**: Uses path aliases (`@/*` maps to `src/*`) and strict TypeScript configuration. All major entities have dedicated type definitions in `src/types/`.

### Security & Validation

**Authentication**: 
- All auth operations properly use async/await
- Social login redirects use Next.js router for security
- Auth store handles logout errors gracefully
- Protected routes validate authentication state

**API Security**:
- Server-side validation on all API endpoints (especially `/api/contact`)
- Input sanitization and length limits
- Email format validation with regex
- Proper error responses without information disclosure

**Form Validation**:
- Client-side validation with server-side verification
- XSS prevention through input sanitization
- File upload validation (type, size limits)

### Performance Optimizations

**Firebase Queries**:
- Optimized to avoid composite index requirements
- Simple queries with client-side filtering when needed
- Proper error handling prevents crashes
- Efficient data fetching patterns

**Memory Management**:
- SessionStorage cleanup in `usePostViews` (max 100 posts)
- Automatic cleanup when threshold exceeded
- Prevents memory leaks in long sessions

### Firebase Configuration
- Authentication with social login support
- Firestore for posts, users, tags, and newsletter data with robust error handling
- Storage for image uploads with validation
- Simple queries designed to work without composite indexes
- Remote config for Firebase Storage and GitHub avatar domains

### Development Guidelines

**Error Handling**: All Firebase operations must include try-catch blocks. Return appropriate fallback values (empty arrays, null, false) to prevent crashes.

**Queries**: Use simple Firestore queries when possible. Complex filtering should be done client-side to avoid index requirements.

**Navigation**: Always use Next.js `useRouter().push()` instead of `window.location.href` for security and proper SSR support.

**Validation**: Implement both client-side and server-side validation. Never trust client-side data in API routes.

**State Management**: Use Zustand for global state, custom hooks for component-specific logic. Ensure proper cleanup in useEffect hooks.

## GitFlow & Deployment Strategy

### Branch Structure & Environments
```
develop → aprende-swift-dev (https://aprende-swift-dev--swiftly-by-warwere.web.app)
   ↓
release → aprende-swift-pre (https://aprende-swift-pre--swiftly-by-warwere.web.app)
   ↓
master → aprende-swift-prod (https://aprendeswift.dev)
```

### Deployment Flow
**Feature Development**:
```bash
git checkout develop
git merge feature/feature-name
git push origin develop
# Auto-deploys to DEV via App Hosting
```

**Promote to Pre-Production**:
```bash
git checkout release
git pull origin release
git merge develop
git push origin release
# Auto-deploys to PRE via App Hosting
# Optional: git tag v1.0.0-beta.1
```

**Deploy to Production**:
```bash
git checkout master
git pull origin master
git merge release
git tag v1.0.0  # REQUIRED for production
git push origin master --tags
# Auto-deploys to PROD via App Hosting
```

### Version Tagging Strategy
- **Production tags**: `v1.0.0` (major.minor.patch)
- **Pre-release tags**: `v1.0.0-beta.1`, `v1.0.0-rc.1`
- **Always tag production deployments**

### CI/CD Pipeline
- GitHub Actions runs quality checks on all branches
- Linting and type checking must pass before deploy
- App Hosting handles automatic deployments
- No manual deploy actions needed