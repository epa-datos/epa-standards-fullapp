# EPA Digital Full Stack Template

NextJS + Go fullstack application with hexagonal architecture.

**Use this as a template for fullstack apps combining a NextJS frontend with an integrated Go backend.**

## 🚀 Quick Start

```bash
# 1. Clone
git clone https://github.com/epa-datos/epa-standards-fullapp.git my-fullapp
cd my-fullapp

# 2. Setup
npm install

# 3. Run
npm run dev
# → http://localhost:3000

# 4. Read architecture
cat CLAUDE.md
```

## 📋 Commands

```bash
# Development
npm run dev          # Dev server
npm run build        # Production build
npm run preview      # Preview build

# Testing
npm run test         # Vitest watch
npm run test:run     # Tests once (CI)
npm run test:e2e     # E2E tests

# Code Quality
npm run typecheck    # TypeScript check
npm run lint         # ESLint
npm run format       # Prettier format
```

## 📁 Structure

```
my-fullapp/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (auth)/          # Auth pages
│   │   ├── (dashboard)/     # Protected routes
│   │   ├── api/             # API routes / RPC
│   │   └── layout.tsx       # Root layout
│   ├── components/          # Shared UI components
│   ├── features/            # Feature modules
│   └── lib/                 # Utilities (api-client, etc)
│
├── server/                  # Go-style backend logic
│   ├── domain/              # Business entities
│   ├── usecases/            # Business logic
│   ├── adapters/            # HTTP/DB adapters
│   └── shared/              # Shared utilities
│
├── __tests__/               # Tests
├── public/                  # Static assets
├── .github/workflows/       # CI/CD
├── CLAUDE.md               # Complete guide
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## 🏗️ Architecture

**Fullstack Pattern:**
- **Frontend:** NextJS Server Components + React hooks
- **Backend Logic:** `server/` directory (hexagonal architecture)
- **API:** Next.js API routes or Server Actions
- **Data:** Firestore (GCP)

```
┌─────────────────────┐
│  UI Components      │ ← React
│  (Server + Client)  │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│  server/            │ ← Business logic
│  (Hexagonal)        │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│  Firestore / APIs   │ ← Data
└─────────────────────┘
```

## 🔐 Environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

## 📚 Documentation

See [CLAUDE.md](./CLAUDE.md) for detailed architecture guide.

---

**Good luck!** 🚀
