# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Development server with Turbopack
pnpm build      # Production build
pnpm lint       # ESLint with auto-fix
pnpm start      # Start production server
```

Pre-commit hooks (Husky + lint-staged) automatically run ESLint and Prettier on staged .ts/.tsx files.

## Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4 + shadcn/ui + Radix UI
- **State**: TanStack Query (server state), Zustand (UI state), nuqs (URL state)
- **Forms**: React Hook Form + Zod
- **API**: Axios with JWT interceptors → Strapi v5 backend
- **Package Manager**: pnpm

## Architecture

This project uses a Feature-Sliced Design (FSD) variant:

```
src/
├── app/                    # Next.js App Router pages
│   ├── (authorized)/       # Protected route group
│   └── auth/               # Public auth routes
├── entities/               # Domain models (project, time-entry, task, user, etc.)
│   └── {entity}/
│       ├── api/            # API hooks and endpoints
│       ├── models/         # Types and Zod schemas
│       ├── ui/             # Entity-specific components
│       └── hooks/          # Entity-specific hooks
├── features/               # User features (auth, timer, create-project, etc.)
├── widgets/                # Page-level compositions (sidebar, lists)
└── shared/
    ├── api/                # Axios instance, API factory, server actions
    ├── ui/                 # Reusable UI components
    │   └── fields/         # Form field wrappers
    ├── hooks/              # Shared hooks
    ├── lib/                # Utilities
    └── types/              # TypeScript types and generated Strapi types
```

## Key Patterns

**API Layer**: Uses `createApiEndpoint<DTO, Payload, Entity>()` factory for CRUD operations with optional DTO-to-Entity mapping. Axios interceptors handle JWT refresh automatically.

**Authentication**: Cookie-based with refresh tokens (`strapi_up_refresh`). Middleware redirects unauthenticated users to `/auth`. OTP-based email login.

**Forms**: Field components in `shared/ui/fields/` wrap react-hook-form. Form schemas use Zod and live in `{entity}/models/`.

**Imports**: Use `@/*` path alias for `src/*`.

## Environment Variables

```
NEXT_PUBLIC_BACKEND_URL     # Strapi backend URL
NEXT_PUBLIC_VAPID_PUBLIC_KEY # Push notifications
```
