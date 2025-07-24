# Project Structure

This document describes the organization of the Swiftly project.

## Directory Layout

```
swiftly/
├── config/                 # Configuration files
│   ├── eslint.config.mjs  # ESLint configuration
│   ├── knip.json          # Knip (unused exports) configuration
│   └── postcss.config.mjs # PostCSS configuration
│
├── docs/                   # Documentation
│   ├── CHANGELOG.md       # Version history
│   ├── CLAUDE.md          # Claude AI assistant instructions
│   ├── GITFLOW.md         # Git workflow documentation
│   ├── PROJECT_STRUCTURE.md # This file
│   ├── ROADMAP.md         # Future development plans
│   └── firebase-security-setup.md # Firebase security guide
│
├── firebase/              # Firebase configuration files
│   ├── firestore.indexes.json # Firestore composite indexes
│   ├── firestore.rules    # Firestore security rules
│   └── storage.rules      # Storage security rules
│
├── functions/             # Firebase Cloud Functions
│   └── lib/              # Compiled JavaScript functions
│
├── public/               # Static assets
│   ├── favicon.ico
│   ├── icons/
│   └── robots.txt
│
├── src/                  # Source code
│   ├── app/             # Next.js App Router pages
│   ├── components/      # React components
│   ├── constants/       # Application constants
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Library code (Firebase Admin)
│   ├── middleware.ts   # Next.js middleware
│   ├── services/       # Business logic and API services
│   ├── store/          # Zustand state management
│   ├── styles/         # Global styles
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
│
├── .gitignore           # Git ignore rules
├── README.md            # Project readme
├── apphosting.yaml      # Firebase App Hosting config
├── firebase.json        # Firebase project configuration
├── next-env.d.ts        # Next.js TypeScript declarations
├── next.config.ts       # Next.js configuration
├── package.json         # Node.js dependencies
├── tsconfig.json        # TypeScript configuration
└── eslint.config.mjs    # ESLint config wrapper (points to config/)
└── postcss.config.mjs   # PostCSS config wrapper (points to config/)
```

## Key Files in Root

The following files remain in the root directory by necessity:

- **package.json**: NPM requires this in the root
- **tsconfig.json**: TypeScript and Next.js expect this in the root
- **next.config.ts**: Next.js configuration must be in the root
- **firebase.json**: Firebase CLI looks for this in the root
- **apphosting.yaml**: Firebase App Hosting configuration
- **.gitignore**: Git configuration
- **README.md**: Standard project documentation location

## Config Wrappers

To maintain compatibility while organizing config files:

- **eslint.config.mjs**: Re-exports from `config/eslint.config.mjs`
- **postcss.config.mjs**: Re-exports from `config/postcss.config.mjs`

## Benefits of This Structure

1. **Cleaner root directory**: Less clutter, easier to navigate
2. **Logical grouping**: Related files are grouped together
3. **Clear separation**: Configuration, documentation, and source code are clearly separated
4. **Maintains compatibility**: Tools still work as expected
5. **Scalable**: Easy to add new documentation or configuration without cluttering the root