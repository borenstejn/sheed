/**
 * @file useAuth hook
 * @description Authentication hook for Supabase OAuth (Google, Apple)
 */

import { useState, useEffect, useCallback } from 'react';
import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import type { Session, User } from '@supabase/supabase-js';

// Complete any pending auth sessions
WebBrowser.maybeCompleteAuthSession();

// Redirect URI for OAuth
const redirectUri = makeRedirectUri({
  scheme: 'sheed',
});

interface UseAuthReturn {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  error: Error | null;
}

export function useAuth(): UseAuthReturn {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { user, setUser, logout } = useAuthStore();

  // Initialize auth state
  useEffect(() => {
    // Check for existing session
    const initializeAuth = async () => {
      try {
        const { data, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (data.session) {
          setSession(data.session);
          setUser(data.session.user);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to get session'));
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);

        if (newSession?.user) {
          setUser(newSession.user);
        } else {
          logout();
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, logout]);

  // Sign in with Google OAuth
  const signInWithGoogle = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUri,
          skipBrowserRedirect: true,
        },
      });

      if (signInError) {
        throw signInError;
      }

      if (data?.url) {
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          redirectUri
        );

        if (result.type === 'success') {
          const { url } = result;
          // Extract the access token from the URL
          await supabase.auth.getSession();
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Google sign-in failed'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sign in with Apple OAuth
  const signInWithApple = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: redirectUri,
          skipBrowserRedirect: true,
        },
      });

      if (signInError) {
        throw signInError;
      }

      if (data?.url) {
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          redirectUri
        );

        if (result.type === 'success') {
          await supabase.auth.getSession();
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Apple sign-in failed'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sign out
  const signOut = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) {
        throw signOutError;
      }

      setSession(null);
      logout();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Sign out failed'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  return {
    user,
    session,
    isLoading,
    isAuthenticated: !!session && !!user,
    signInWithGoogle,
    signInWithApple,
    signOut,
    error,
  };
}
