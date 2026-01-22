# SHEED Development Loop - Ralph Wiggum Prompt

You are building SHEED, a matchmaking app for Gen-Z. Your task is to implement features according to the task queue in `prd.json`.

## Context Files (READ FIRST)

1. `prd.json` - Task queue with dependencies. Find the next unfinished task.
2. `progress.txt` - Journal of completed work. Read to understand current state.
3. `AGENTS.md` - Coding conventions and patterns for this project.
4. `docs/SHEED-PRD.md` - Complete PRD with SQL schema and API specs.
5. `docs/SHEED-UI-DESIGN-PROPOSALS.md` - Design system "Dopamine & Neon".

## Your Process (TDD)

For each task:

### 1. Find Next Task
```bash
# Read prd.json, find first task where:
# - passes: false
# - All dependencies have passes: true
```

### 2. RED - Write Failing Test First
- Create test file in `__tests__/` directory
- Write test that defines expected behavior
- Run `npm test` - it MUST fail

### 3. GREEN - Minimal Implementation
- Write the minimum code to make the test pass
- No extra features, no premature optimization
- Run `npm test` - it MUST pass

### 4. REFACTOR (if needed)
- Clean up code while keeping tests green
- Apply patterns from AGENTS.md

### 5. Verify
```bash
npm run type-check   # TypeScript compiles (tsc --noEmit)
npm test             # All tests pass
```

**IMPORTANT**: Never run `npx expo start` - it blocks forever. Use `npm run type-check` instead.

### 6. Update Progress
Append to `progress.txt`:
```
[YYYY-MM-DD HH:MM] TASK-ID: Short description
- What was implemented
- Files created/modified
- Any blockers or notes
```

### 7. Update prd.json
Set the task's `passes` to `true`.

## Completion Marker

When ALL tasks in prd.json have `passes: true` AND the app runs:
1. Test full flow: Login -> Create Sheed -> Chat -> Stats
2. Append to `progress.txt`:
```
SHEED_MVP_COMPLETE
```

## Rules

1. **ONE TASK PER ITERATION** - Complete one task fully before moving on
2. **TEST FIRST** - Always write the failing test before implementation
   - EXCEPTION: SETUP-01 (bootstrap) - test written AFTER since __tests__ doesn't exist yet
3. **FOLLOW DEPENDENCIES** - Never start a task with unmet dependencies
4. **UPDATE PROGRESS** - Always append to progress.txt after each task
5. **NO SHORTCUTS** - Don't skip tests, don't hardcode, don't leave TODOs
6. **COMMIT READY** - Code should be production-ready after each task
7. **NON-INTERACTIVE** - Always use --yes, --no-input flags. Never run blocking commands (npx expo start, npm run dev, etc.)
8. **NO MANUAL INPUT** - Assume no human is watching. All commands must complete autonomously.

## Tech Stack Reference

- **Frontend**: Expo SDK 52+, Expo Router, NativeWind v4, Zustand, TanStack Query
- **Backend**: Supabase (PostgreSQL, Auth, Realtime, Storage, Edge Functions)
- **Testing**: Jest + React Native Testing Library + Maestro (E2E)
- **Types**: TypeScript strict mode

## File Structure

```
sheed/
├── app/                  # Expo Router screens
│   ├── (auth)/
│   ├── (main)/(tabs)/
│   └── _layout.tsx
├── components/           # Reusable UI components
├── hooks/               # Custom React hooks
├── stores/              # Zustand stores
├── lib/                 # Utilities, Supabase client
├── __tests__/           # Jest tests
├── supabase/
│   ├── migrations/      # SQL migrations
│   └── functions/       # Edge Functions
└── e2e/                 # Maestro E2E tests
```

## Start Now

1. Read `prd.json` to find next task
2. Check dependencies
3. Write failing test
4. Implement
5. Verify
6. Update progress
7. Update prd.json

Go!
