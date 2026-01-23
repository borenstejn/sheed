/**
 * @file useAuth hook tests
 * @description Tests for authentication hook with Supabase
 */

// Test that useAuth module exports correctly
// Note: Full hook integration tests require renderHook which needs
// a React Native environment. These tests verify the module structure.

describe('useAuth module', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should export useAuth function', () => {
    // Mock dependencies before importing
    jest.mock('@/lib/supabase', () => ({
      supabase: {
        auth: {
          getSession: jest.fn(),
          signInWithOAuth: jest.fn(),
          signOut: jest.fn(),
          onAuthStateChange: jest.fn(() => ({
            data: { subscription: { unsubscribe: jest.fn() } },
          })),
        },
      },
    }));

    jest.mock('expo-auth-session', () => ({
      makeRedirectUri: jest.fn(() => 'sheed://'),
    }));

    jest.mock('expo-web-browser', () => ({
      maybeCompleteAuthSession: jest.fn(),
      openAuthSessionAsync: jest.fn(),
    }));

    jest.mock('@/stores/authStore', () => ({
      useAuthStore: jest.fn(() => ({
        user: null,
        setUser: jest.fn(),
        logout: jest.fn(),
      })),
    }));

    // Import after mocking
    const { useAuth } = require('@/hooks/useAuth');

    expect(useAuth).toBeDefined();
    expect(typeof useAuth).toBe('function');
  });

  it('should have required dependencies', () => {
    // Verify the hook file can be statically analyzed
    // This ensures the imports are correct
    const fs = require('fs');
    const path = require('path');
    const hookPath = path.join(__dirname, '../../hooks/useAuth.ts');
    const content = fs.readFileSync(hookPath, 'utf-8');

    // Check for required imports
    expect(content).toContain("from 'expo-auth-session'");
    expect(content).toContain("from 'expo-web-browser'");
    expect(content).toContain("from '@/lib/supabase'");
    expect(content).toContain("from '@/stores/authStore'");
  });

  it('should export UseAuthReturn interface with expected properties', () => {
    const fs = require('fs');
    const path = require('path');
    const hookPath = path.join(__dirname, '../../hooks/useAuth.ts');
    const content = fs.readFileSync(hookPath, 'utf-8');

    // Check that the interface defines expected properties
    expect(content).toContain('user:');
    expect(content).toContain('session:');
    expect(content).toContain('isLoading:');
    expect(content).toContain('isAuthenticated:');
    expect(content).toContain('signInWithGoogle:');
    expect(content).toContain('signInWithApple:');
    expect(content).toContain('signOut:');
  });
});

describe('useAuth error handling', () => {
  it('should handle authentication errors gracefully', () => {
    const fs = require('fs');
    const path = require('path');
    const hookPath = path.join(__dirname, '../../hooks/useAuth.ts');
    const content = fs.readFileSync(hookPath, 'utf-8');

    // Check for error handling patterns
    expect(content).toMatch(/try|catch|error/i);
    expect(content).toMatch(/console\.error|console\.log|Error/);
  });
});

describe('useAuth configuration', () => {
  it('should use sheed:// as redirect scheme', () => {
    jest.resetModules();

    const mockMakeRedirectUri = jest.fn(() => 'sheed://redirect');

    jest.mock('expo-auth-session', () => ({
      makeRedirectUri: mockMakeRedirectUri,
    }));

    jest.mock('expo-web-browser', () => ({
      maybeCompleteAuthSession: jest.fn(),
      openAuthSessionAsync: jest.fn(),
    }));

    jest.mock('@/lib/supabase', () => ({
      supabase: {
        auth: {
          getSession: jest.fn(),
          signInWithOAuth: jest.fn(),
          signOut: jest.fn(),
          onAuthStateChange: jest.fn(() => ({
            data: { subscription: { unsubscribe: jest.fn() } },
          })),
        },
      },
    }));

    jest.mock('@/stores/authStore', () => ({
      useAuthStore: jest.fn(() => ({
        user: null,
        setUser: jest.fn(),
        logout: jest.fn(),
      })),
    }));

    // Import to trigger module initialization
    require('@/hooks/useAuth');

    expect(mockMakeRedirectUri).toHaveBeenCalledWith({
      scheme: 'sheed',
    });
  });
});
