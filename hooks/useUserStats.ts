/**
 * @file useUserStats hook
 * @description Hook for fetching and calculating user statistics
 */

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';

/**
 * User statistics data
 */
export interface UserStats {
  /** Total sheeds created by user */
  totalCreated: number;
  /** Total sheeds received by user */
  totalReceived: number;
  /** Number of successful sheeds */
  successfulSheeds: number;
  /** Success rate as percentage (0-100) */
  successRate: number;
  /** Raw data from database */
  raw: {
    total_sheeds_created: number | null;
    total_sheeds_received: number | null;
    successful_sheeds: number | null;
  } | null;
}

/**
 * Return type for useUserStats hook
 */
export interface UseUserStatsReturn {
  /** User statistics */
  stats: UserStats | null;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
  /** Refetch function */
  refetch: () => void;
}

/**
 * Hook for fetching user statistics from Supabase
 * Calculates success rate and provides formatted stats
 */
export function useUserStats(): UseUserStatsReturn {
  const user = useAuthStore((state) => state.user);

  const {
    data: stats,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['userStats', user?.id],
    queryFn: async (): Promise<UserStats | null> => {
      if (!user?.id) return null;

      const { data, error: fetchError } = await supabase
        .from('users')
        .select('total_sheeds_created, total_sheeds_received, successful_sheeds')
        .eq('id', user.id)
        .single();

      if (fetchError) throw fetchError;
      if (!data) return null;

      // Extract values
      const totalCreated = data.total_sheeds_created || 0;
      const totalReceived = data.total_sheeds_received || 0;
      const successfulSheeds = data.successful_sheeds || 0;

      // Calculate success rate percentage
      const successRate = totalCreated > 0
        ? Math.round((successfulSheeds / totalCreated) * 100)
        : 0;

      return {
        totalCreated,
        totalReceived,
        successfulSheeds,
        successRate,
        raw: data,
      };
    },
    enabled: !!user?.id,
  });

  return {
    stats: stats ?? null,
    isLoading,
    error: error instanceof Error ? error : null,
    refetch,
  };
}

export default useUserStats;
