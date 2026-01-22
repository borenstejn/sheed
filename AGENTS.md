# SHEED - Agent Instructions & Coding Conventions

> Procedural memory for Claude during Ralph Wiggum development loop

---

## Project Identity

**SHEED** = Matchmaking app where users ("Sheeders") connect two of their contacts ("Sheedés"). Inspired by the Hebrew word "shidour" (matchmaking).

**Target**: Gen-Z (18-28), mobile-first, gamified experience.

---

## Tech Stack (DO NOT CHANGE)

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Expo | SDK 52+ |
| Routing | Expo Router | 4.x |
| Styling | NativeWind | 4.x |
| State (local) | Zustand | 4.x |
| State (server) | TanStack Query | 5.x |
| Backend | Supabase | Latest |
| Database | PostgreSQL | 15+ |
| Language | TypeScript | Strict |

---

## File Naming Conventions

```
components/Button.tsx        # PascalCase for components
components/SheedCard.tsx
hooks/useAuth.ts             # camelCase with 'use' prefix
hooks/useSheeds.ts
stores/authStore.ts          # camelCase with 'Store' suffix
lib/supabase.ts              # camelCase for utilities
lib/utils.ts
__tests__/hooks/useAuth.test.ts  # Mirror source structure
app/(main)/(tabs)/sheeds.tsx # lowercase for routes
```

---

## Component Structure

```tsx
// components/SheedCard.tsx
import { View, Text, Pressable } from 'react-native';

interface SheedCardProps {
  sheed: Sheed;
  onPress: () => void;
}

export function SheedCard({ sheed, onPress }: SheedCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-neutral-900/70 backdrop-blur-xl rounded-3xl p-4 border border-neutral-800"
    >
      {/* Content */}
    </Pressable>
  );
}
```

**Rules:**
- Named exports only (no default exports)
- Props interface above component
- NativeWind classes inline
- No StyleSheet.create()

---

## Hook Structure

```tsx
// hooks/useSheeds.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useSheeds() {
  const queryClient = useQueryClient();

  const sheedsQuery = useQuery({
    queryKey: ['sheeds'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sheeds')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const createSheedMutation = useMutation({
    mutationFn: async (newSheed: CreateSheedInput) => {
      // ... implementation
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sheeds'] });
    },
  });

  return {
    sheeds: sheedsQuery.data ?? [],
    isLoading: sheedsQuery.isLoading,
    error: sheedsQuery.error,
    createSheed: createSheedMutation.mutate,
  };
}
```

---

## Zustand Store Pattern

```tsx
// stores/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

---

## NativeWind / Tailwind Classes

### Color Palette (tailwind.config.js)

```js
colors: {
  sheed: {
    pink: '#FF3B7A',
    purple: '#9A3BFF',
    neon: '#00F5A0',
  },
  neutral: {
    950: '#101012',  // bg-neutral-950 (main bg)
    900: '#1C1C1E',  // bg-neutral-900 (surface)
    800: '#3A3A3C',  // border-neutral-800
    400: '#8A8A8E',  // text-neutral-400 (secondary)
    100: '#F5F5F7',  // text-neutral-100 (primary)
  }
}
```

### Common Patterns

```tsx
// Glassmorphism card
className="bg-neutral-900/70 backdrop-blur-xl border border-neutral-800 rounded-3xl"

// Primary gradient button
className="bg-gradient-to-r from-sheed-pink to-sheed-purple rounded-full px-6 py-3"

// Status badges
className="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full text-xs"
className="bg-green-400/20 text-green-400 px-2 py-1 rounded-full text-xs"

// Text hierarchy
className="text-neutral-100 text-lg font-semibold"  // Primary
className="text-neutral-400 text-sm"                 // Secondary
```

---

## Testing Patterns

### Component Test

```tsx
// __tests__/components/SheedCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react-native';
import { SheedCard } from '@/components/SheedCard';

describe('SheedCard', () => {
  const mockSheed = {
    id: '1',
    status: 'active',
    sheede_1: { display_name: 'Emma' },
    sheede_2: { display_name: 'Lucas' },
  };

  it('displays both sheede names', () => {
    render(<SheedCard sheed={mockSheed} onPress={jest.fn()} />);

    expect(screen.getByText(/Emma/)).toBeTruthy();
    expect(screen.getByText(/Lucas/)).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    render(<SheedCard sheed={mockSheed} onPress={onPress} />);

    fireEvent.press(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
```

### Hook Test

```tsx
// __tests__/hooks/useSheeds.test.ts
import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSheeds } from '@/hooks/useSheeds';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useSheeds', () => {
  it('returns empty array initially', async () => {
    const { result } = renderHook(() => useSheeds(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.sheeds).toEqual([]);
  });
});
```

---

## Supabase Patterns

### Database Types (CRITICAL)

**NEVER manually define interfaces for database tables.** Always use the generated types.

```tsx
// CORRECT - Import from generated types
import { Database } from '@/types/database.types';
type User = Database['public']['Tables']['users']['Row'];
type SheedInsert = Database['public']['Tables']['sheeds']['Insert'];

// WRONG - Don't manually define
interface User { id: string; ... } // NO!
```

To regenerate types after migrations:
```bash
npm run update-types  # Runs: supabase gen types typescript --local > types/database.types.ts
```

### Client Setup

```tsx
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Database } from '@/types/database.types';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: {
      getItem: (key) => SecureStore.getItemAsync(key),
      setItem: (key, value) => SecureStore.setItemAsync(key, value),
      removeItem: (key) => SecureStore.deleteItemAsync(key),
    },
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

### Realtime Subscription

```tsx
// In useMessages hook
useEffect(() => {
  const channel = supabase
    .channel(`chatroom:${chatroomId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `chatroom_id=eq.${chatroomId}`,
      },
      (payload) => {
        // Handle new message
        queryClient.setQueryData(['messages', chatroomId], (old) =>
          [...(old ?? []), payload.new]
        );
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, [chatroomId]);
```

---

## DO's and DON'Ts

### DO

- Write test BEFORE implementation (TDD)
- Use TypeScript strict mode
- Use NativeWind classes (no StyleSheet)
- Use TanStack Query for server state
- Use Zustand only for local/UI state
- Handle loading and error states
- Add proper TypeScript types
- Follow the file structure exactly
- Commit after each completed task

### DON'T

- Skip writing tests
- Use `any` type
- Use StyleSheet.create()
- Mix server state in Zustand
- Leave console.log in code
- Hardcode values (use env vars)
- Create files outside defined structure
- Implement features not in current task
- Change the tech stack

---

## Error Handling

```tsx
// Always handle Supabase errors
const { data, error } = await supabase.from('sheeds').select('*');

if (error) {
  console.error('Supabase error:', error);
  throw new Error(error.message);
}

// In components, use error boundaries or display error states
if (error) {
  return <ErrorState message={error.message} onRetry={refetch} />;
}
```

---

## Navigation (Expo Router)

```
app/
├── _layout.tsx              # Root layout with providers
├── (auth)/
│   ├── _layout.tsx          # Auth stack layout
│   ├── splash.tsx
│   ├── onboarding.tsx
│   ├── login.tsx
│   └── permissions.tsx
└── (main)/
    ├── _layout.tsx          # Main layout (auth guard)
    ├── (tabs)/
    │   ├── _layout.tsx      # Tab navigator
    │   ├── sheeds.tsx
    │   ├── chats.tsx
    │   └── profile.tsx
    ├── sheed/[id].tsx       # Dynamic route
    ├── chat/[id].tsx
    ├── new-sheed.tsx
    └── settings.tsx
```

---

## Git Commit Messages

```
TASK-ID: Short description

- Bullet point of what was done
- Another point if needed

Co-Authored-By: Claude <noreply@anthropic.com>
```

Example:
```
SETUP-04: Configure NativeWind + tailwind.config.js

- Added nativewind and tailwindcss dependencies
- Created tailwind.config.js with SHEED color palette
- Configured babel.config.js for NativeWind
- Added test for NativeWind rendering

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Environment Variables

```
# .env.local (DO NOT COMMIT)
EXPO_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=xxx
```

---

## Quick Reference

| Need | Solution |
|------|----------|
| Fetch data | TanStack Query `useQuery` |
| Mutate data | TanStack Query `useMutation` |
| Local UI state | Zustand store |
| Realtime updates | Supabase Realtime |
| Style component | NativeWind className |
| Navigation | Expo Router Link/router.push |
| Test component | @testing-library/react-native |
| Test hook | renderHook from @testing-library |
| E2E test | Maestro |

---

*Last updated: 2026-01-22*
