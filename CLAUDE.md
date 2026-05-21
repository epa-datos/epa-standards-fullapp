# CLAUDE.md - EPA Digital Full Stack (NextJS + Go)

Template de fullstack con NextJS (frontend) + lógica Go (backend) integradas en un único repo.

**Usa este repo como base para aplicaciones fullstack en EPA Digital.**

## 🚀 Quick Start

```bash
# 1. Clone
git clone https://github.com/epa-datos/epa-standards-fullapp.git my-app
cd my-app

# 2. Setup
npm install

# 3. Run
npm run dev
# → http://localhost:3000

# 4. Test
npm run test        # Unit tests (watch)
npm run test:run    # Tests once (CI)
npm run test:e2e    # E2E tests

# 5. Read architecture
cat CLAUDE.md  # ← Read this completely
```

## 📋 Comandos

```bash
# Development
npm run dev          # Dev server with Turbopack
npm run build        # Production build
npm run preview      # Preview production build

# Testing
npm run test         # Vitest watch mode
npm run test:run     # Vitest one-shot (CI)
npm run test:coverage # Coverage report
npm run test:e2e     # Playwright tests
npm run test:e2e:ui  # Playwright UI mode

# Code Quality
npm run typecheck    # TypeScript check
npm run lint         # ESLint check
npm run format       # Prettier format

# Other
npm run clean        # Remove build artifacts
```

## 🏗️ Arquitectura

**Full Stack Pattern:** NextJS + server-side business logic (Go-style hexagonal architecture)

```
┌──────────────────────────────────┐
│  Frontend Components              │ ← React (Server + Client)
│  (UI, interactions)               │
└──────────┬───────────────────────┘
           │
┌──────────▼───────────────────────┐
│  API Routes / Server Actions      │ ← Next.js API
│  (HTTP endpoints)                 │
└──────────┬───────────────────────┘
           │
┌──────────▼───────────────────────┐
│  server/ (Business Logic)         │ ← Hexagonal architecture
│  ├─ domain/                       │   (entities, interfaces)
│  ├─ usecases/                     │   (business rules)
│  └─ adapters/                     │   (persistence, external)
└──────────┬───────────────────────┘
           │
┌──────────▼───────────────────────┐
│  Firestore / External APIs        │ ← Data layer
└──────────────────────────────────┘
```

## 📁 Estructura

```
src/
├── app/                    # Next.js App Router
│   ├── (public)/           # Marketing pages (no auth)
│   │   └── page.tsx        # Landing
│   ├── (auth)/             # Auth pages
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/        # Protected routes
│   │   ├── app/
│   │   │   └── ...
│   │   └── layout.tsx      # Dashboard layout
│   ├── api/                # API routes / RPC
│   │   ├── auth/
│   │   └── ...
│   └── layout.tsx          # Root layout
│
├── components/             # Reusable UI components
│   ├── ui/                 # shadcn/ui components
│   ├── navbar/
│   └── ...
│
├── lib/                    # Shared utilities
│   └── api-client.ts       # HTTP client
│
└── globals.css             # Global styles
    └── layout.tsx

server/                    # Business Logic (Hexagonal)
├── domain/                 # Business entities
│   ├── user.ts            # User entity + interfaces
│   └── ...
├── usecases/              # Business logic
│   ├── create-user.ts     # Use case: Create user
│   └── ...
├── adapters/              # External dependencies
│   ├── persistence/       # Database (Firestore)
│   │   └── user-repo.ts
│   └── external/          # External APIs
│       └── ...
└── shared/                # Utilities
    ├── logger.ts
    └── errors.ts

__tests__/
├── unit/                  # Unit tests
├── integration/           # Integration tests
└── e2e/                   # E2E tests
```

## 🎨 Design System

### Colors (OKLCH - Semantic Tokens)
No hardcoded colors. Use semantic tokens:

```tsx
// ❌ DON'T
<div className="bg-gray-900 text-white">

// ✅ DO
<div className="bg-background text-foreground">
```

**Available tokens:**
- `background` / `foreground` - Page backgrounds
- `card` - Card/panel surfaces
- `muted` / `muted-foreground` - Disabled states
- `destructive` - Error/delete actions
- Theme-aware (light/dark automatically)

## 🔌 Server Logic (Hexagonal)

Similar to standalone Go APIs, but in `server/` directory:

### Domain Layer
```ts
// server/domain/user.ts
export interface User {
  id: string
  email: string
  name: string
}

export interface UserRepository {
  create(user: User): Promise<void>
  getByID(id: string): Promise<User | null>
}
```

### Use Case Layer
```ts
// server/usecases/create-user.ts
export class CreateUserUseCase {
  constructor(private repo: UserRepository) {}

  async execute(email: string, name: string): Promise<User> {
    // Validate
    // Create
    // Persist
    // Return
  }
}
```

### API Routes
```ts
// src/app/api/users/route.ts
'use server'

import { createUserUseCase } from '@/server/usecases'

export async function POST(req: Request) {
  const { email, name } = await req.json()
  const user = await createUserUseCase.execute(email, name)
  return Response.json(user)
}
```

## 🔐 Environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

## 🧪 Testing

### Unit Tests (Vitest)
```ts
// __tests__/unit/create-user.test.ts
import { createUserUseCase } from '@/server/usecases'

describe('CreateUserUseCase', () => {
  it('should create a user', async () => {
    const result = await createUserUseCase.execute(
      'user@example.com',
      'John'
    )
    expect(result.email).toBe('user@example.com')
  })
})
```

### E2E Tests (Playwright)
```ts
// __tests__/e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

test('user can signup', async ({ page }) => {
  await page.goto('/signup')
  await page.fill('[data-testid=email]', 'new@example.com')
  await page.fill('[data-testid=password]', 'password')
  await page.click('[data-testid=signup-button]')
  
  await expect(page).toHaveURL('/dashboard')
})
```

## 📝 Conventions

### Files
- Components: `kebab-case.tsx`
- Server functions: `kebab-case.ts`
- Pages: `page.tsx`, `layout.tsx`
- Tests: `*.test.ts` or `*.spec.ts`

### Components
- Keep under 200 lines
- Prefer Server Components
- Use `'use client'` only where necessary

### Server Logic
- Keep domain clean (no framework deps)
- Use dependency injection
- Test with mocks

## 🔄 Git Workflow

1. Create branch: `feature/user-auth`
2. Code → commit → push
3. Open PR to `staging`
4. CI runs: typecheck, lint, tests
5. Get 1 approval → merge
6. Auto-deploy to staging
7. Later: manual PR `staging` → `main`

See [BRANCHING-STRATEGY.md](../epa-standards/docs/BRANCHING-STRATEGY.md)

## 🤖 Available Skills

These Claude skills help with fullstack projects:

### `nextjs-scaffold`
Create a new NextJS repository

**Use:** `"Create a new NextJS app"`

### `go-api-scaffold` (for server/* part)
Add new domain/usecase/adapter structure

**Use:** `"Add a new domain entity"`

### `validate-pr-format`
Check if your PR follows standards

**Use:** `"Validate my PR"`

### `git-flow-guide`
Interactive guide for branching

**Use:** `"What branch should I create?"`

## 🎯 Siguientes Pasos

1. ✅ Lee esta guía completa
2. ✅ Run `npm run dev`
3. ✅ Revisa `src/app/page.tsx` (example page)
4. ✅ Revisa `server/` structure
5. ✅ Run `npm run test` (tests)
6. ✅ Crear tu primer usecase en `server/usecases/`
7. ✅ Crear tu primer API route en `src/app/api/`
8. ✅ PR a `staging`

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vitest](https://vitest.dev/)
- [Playwright](https://playwright.dev/)

## ❓ Questions?

- Read CLAUDE.md (you are here)
- Check examples in `src/` and `server/`
- Check tests in `__tests__/`
- Use available skills (see above)
- Ask the team

---

**Good luck!** 🚀
