# 📁 Project Structure - aprendeSwift

This document describes the complete organization of the aprendeSwift project.

## 🗂️ Directory Layout

```
swiftly/
├── .github/               # GitHub configuration
│   ├── ISSUE_TEMPLATE/   # Issue templates (bug, feature, enhancement)
│   ├── workflows/        # GitHub Actions (CI, project automation)
│   ├── labeler.yml       # Auto-labeling rules
│   └── pull_request_template.md # PR template
│
├── config/                # Configuration files
│   ├── eslint.config.mjs  # ESLint configuration
│   ├── knip.json          # Knip (unused exports) configuration
│   └── postcss.config.mjs # PostCSS configuration
│
├── docs/                  # Documentation
│   ├── CHANGELOG.md       # Version history
│   ├── CLAUDE.md          # Claude AI assistant instructions
│   ├── GITFLOW.md         # Git workflow documentation
│   ├── GITFLOW-TEST.md    # GitFlow verification test
│   ├── PROJECT_STRUCTURE.md # This file
│   ├── ROADMAP.md         # Future development plans
│   └── firebase-security-setup.md # Firebase security guide
│
├── firebase/              # Firebase configuration files
│   ├── firestore.indexes.json # Firestore composite indexes
│   ├── firestore.rules    # Firestore security rules
│   └── storage.rules      # Storage security rules
│
├── public/                # Static assets
│   ├── favicon.ico
│   ├── icons/            # App icons
│   └── robots.txt        # SEO robots file
│
├── src/                   # Source code
│   ├── app/              # Next.js App Router pages
│   │   ├── (auth)/       # Authentication pages group
│   │   ├── (feed)/       # Public feed pages group
│   │   ├── (legal)/      # Legal pages (privacy, terms)
│   │   ├── admin/        # Admin panel pages
│   │   ├── api/          # API routes
│   │   ├── posts/        # Post pages
│   │   ├── profile/      # User profile pages
│   │   ├── tags/         # Tag pages
│   │   ├── tutorials/    # Tutorial pages
│   │   ├── error.tsx     # Error boundary
│   │   ├── layout.tsx    # Root layout
│   │   ├── not-found.tsx # 404 page
│   │   └── page.tsx      # Homepage
│   │
│   ├── components/       # React components
│   │   ├── admin/        # Admin-specific components
│   │   ├── auth/         # Authentication components
│   │   ├── comments/     # Comment system components
│   │   ├── common/       # Shared components
│   │   ├── home/         # Homepage components
│   │   ├── layout/       # Layout components (navbar, footer)
│   │   ├── posts/        # Post-related components
│   │   ├── profile/      # Profile components
│   │   ├── tags/         # Tag components
│   │   └── tutorials/    # Tutorial components
│   │
│   ├── constants/        # Application constants
│   │   ├── navigation.ts # Navigation items
│   │   └── tutorial-sections.ts # Tutorial categories
│   │
│   ├── hooks/            # Custom React hooks
│   │   ├── useAuth.ts    # Authentication hook
│   │   ├── useDebounce.ts # Debounce hook
│   │   ├── useFirebaseData.ts # Firebase data fetching
│   │   ├── useShare.ts   # Social sharing hook
│   │   └── useUserNewsletter.ts # Newsletter subscription
│   │
│   ├── lib/              # Library code
│   │   └── firebase-admin.ts # Firebase Admin SDK setup
│   │
│   ├── middleware.ts     # Next.js middleware
│   │
│   ├── services/         # Business logic and services
│   │   ├── auth/         # Authentication services
│   │   ├── comments/     # Comment management
│   │   ├── email/        # Email services (SendGrid)
│   │   ├── firebase/     # Firebase services
│   │   │   ├── client/   # Client-side Firebase
│   │   │   └── firestore/ # Firestore operations
│   │   ├── openai/       # OpenAI API integration
│   │   ├── posts/        # Post services
│   │   ├── seo/          # SEO utilities
│   │   └── utils/        # Service utilities
│   │
│   ├── store/            # Zustand state management
│   │   ├── authStore.ts  # Authentication state
│   │   ├── postStore.ts  # Post state
│   │   └── tutorialStore.ts # Tutorial state
│   │
│   ├── styles/           # Global styles
│   │   └── globals.css   # Tailwind CSS imports
│   │
│   ├── types/            # TypeScript type definitions
│   │   ├── index.ts      # Common types
│   │   └── *.ts          # Domain-specific types
│   │
│   └── utils/            # Utility functions
│       ├── dateUtils.ts  # Date formatting
│       ├── postUtils.ts  # Post utilities
│       └── stringUtils.ts # String manipulation
│
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore rules
├── README.md            # Project readme
├── apphosting.yaml      # Firebase App Hosting config
├── firebase.json        # Firebase project configuration
├── next-env.d.ts        # Next.js TypeScript declarations
├── next.config.ts       # Next.js configuration
├── package.json         # Node.js dependencies
├── package-lock.json    # Locked dependencies
├── tsconfig.json        # TypeScript configuration
├── eslint.config.mjs    # ESLint config wrapper
└── postcss.config.mjs   # PostCSS config wrapper
```

## 🔑 Key Directories Explained

### `/src/app` - Next.js App Router
- **Route Groups**: `(auth)`, `(feed)`, `(legal)` for organization
- **Dynamic Routes**: `[slug]` for posts, tutorials, tags
- **API Routes**: RESTful endpoints in `/api`
- **Admin Section**: Protected admin panel routes

### `/src/components` - Component Library
- **Atomic Design**: Organized by feature/domain
- **Shared Components**: In `/common` directory
- **Lazy Loading**: Heavy components are dynamically imported
- **TypeScript**: All components are fully typed

### `/src/services` - Business Logic
- **Separation of Concerns**: UI logic separated from business logic
- **Firebase Services**: Abstracted Firebase operations
- **External APIs**: SendGrid, OpenAI integrations
- **Error Handling**: Centralized error management

### `/src/hooks` - Custom Hooks
- **Reusable Logic**: Common patterns extracted
- **Performance**: Optimized with proper dependencies
- **Type Safety**: Fully typed with TypeScript

### `/src/store` - State Management
- **Zustand**: Lightweight state management
- **Persistent State**: Using localStorage where needed
- **Performance**: Selective subscriptions to prevent re-renders

## 📋 Configuration Files

### Root Configuration
- **package.json**: Dependencies and scripts
- **tsconfig.json**: TypeScript configuration
- **next.config.ts**: Next.js settings
- **firebase.json**: Firebase deployment config
- **apphosting.yaml**: Firebase App Hosting

### Config Directory
- **eslint.config.mjs**: Code linting rules
- **knip.json**: Dead code detection
- **postcss.config.mjs**: CSS processing

### Wrapper Files
To maintain tool compatibility while organizing configs:
- `eslint.config.mjs` → re-exports from `config/`
- `postcss.config.mjs` → re-exports from `config/`

## 🏗️ Architecture Patterns

### 1. **Feature-Based Organization**
Components and services are organized by feature rather than type, making it easier to locate related code.

### 2. **Separation of Concerns**
- **Presentation**: React components
- **Business Logic**: Services directory
- **State Management**: Zustand stores
- **Side Effects**: Custom hooks

### 3. **Type Safety**
- All code is TypeScript
- Strict mode enabled
- Types co-located with features

### 4. **Performance Optimizations**
- Code splitting by route
- Lazy loading for heavy components
- Image optimization with Next.js
- Static generation where possible

### 5. **Security**
- Firebase security rules
- Environment variables for secrets
- Input validation with Zod
- Protected API routes

## 🚀 Development Workflow

### Adding New Features
1. Create feature branch from `develop`
2. Add components in relevant directory
3. Add services if needed
4. Update types
5. Add tests (when implemented)
6. Update documentation

### File Naming Conventions
- **Components**: PascalCase (e.g., `PostCard.tsx`)
- **Utilities**: camelCase (e.g., `dateUtils.ts`)
- **Types**: PascalCase (e.g., `User.ts`)
- **Constants**: UPPER_SNAKE_CASE in files

### Import Order
1. External dependencies
2. Internal aliases
3. Relative imports
4. Types
5. Styles

## 📦 Build Output

```
.next/                    # Next.js build output
├── cache/               # Build cache
├── server/              # Server-side code
├── static/              # Static assets
└── types/               # Generated types
```

## 🔧 Maintenance

### Regular Tasks
- Update dependencies monthly
- Run `npm run knip` to find dead code
- Check bundle size with `next build`
- Review and update documentation

### Code Quality Tools
- **ESLint**: Code linting
- **TypeScript**: Type checking
- **Knip**: Dead code detection
- **GitHub Actions**: CI/CD

---

*Last updated: July 2025 - v1.5.0*