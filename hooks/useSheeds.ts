/**
 * @file useSheeds hook
 * @description Hook for managing sheeds (create, fetch, accept/decline)
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Sheed, SheedStatus } from '@/types';

// Types for sheed operations
export interface CreateSheedInput {
  sheede_1_id: string;
  sheede_2_id: string;
  intro_message: string;
}

export interface CreateSheedResponse {
  success: boolean;
  sheed_id?: string;
  error?: string;
}

export interface SheedWithUsers extends Sheed {
  sheeder?: {
    id: string;
    display_name: string;
    avatar_url: string | null;
  };
  sheede_1?: {
    id: string;
    display_name: string;
    avatar_url: string | null;
  };
  sheede_2?: {
    id: string;
    display_name: string;
    avatar_url: string | null;
  };
}

// Query keys for cache management
export const sheedKeys = {
  all: ['sheeds'] as const,
  created: (userId: string) => [...sheedKeys.all, 'created', userId] as const,
  received: (userId: string) => [...sheedKeys.all, 'received', userId] as const,
  detail: (id: string) => [...sheedKeys.all, 'detail', id] as const,
};

/**
 * Hook for managing sheeds
 */
export function useSheeds(userId?: string) {
  const queryClient = useQueryClient();

  // Fetch sheeds I created (where I am the sheeder)
  const createdSheedsQuery = useQuery({
    queryKey: sheedKeys.created(userId || ''),
    queryFn: async (): Promise<SheedWithUsers[]> => {
      if (!userId) return [];

      // Fetch sheeds first
      const { data: sheeds, error } = await supabase
        .from('sheeds')
        .select('*')
        .eq('sheeder_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (!sheeds?.length) return [];

      // Fetch related users
      const userIds = new Set<string>();
      sheeds.forEach((s) => {
        if (s.sheede_1_id) userIds.add(s.sheede_1_id);
        if (s.sheede_2_id) userIds.add(s.sheede_2_id);
      });

      const { data: users } = await supabase
        .from('users')
        .select('id, display_name, avatar_url')
        .in('id', Array.from(userIds));

      const usersMap = new Map(users?.map((u) => [u.id, u]) || []);

      // Combine sheeds with user data
      return sheeds.map((sheed) => ({
        ...sheed,
        sheede_1: usersMap.get(sheed.sheede_1_id),
        sheede_2: usersMap.get(sheed.sheede_2_id),
      }));
    },
    enabled: !!userId,
  });

  // Fetch sheeds where I am a sheedé (received)
  const receivedSheedsQuery = useQuery({
    queryKey: sheedKeys.received(userId || ''),
    queryFn: async (): Promise<SheedWithUsers[]> => {
      if (!userId) return [];

      // Fetch sheeds first
      const { data: sheeds, error } = await supabase
        .from('sheeds')
        .select('*')
        .or(`sheede_1_id.eq.${userId},sheede_2_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (!sheeds?.length) return [];

      // Fetch related users
      const userIds = new Set<string>();
      sheeds.forEach((s) => {
        if (s.sheeder_id) userIds.add(s.sheeder_id);
        if (s.sheede_1_id) userIds.add(s.sheede_1_id);
        if (s.sheede_2_id) userIds.add(s.sheede_2_id);
      });

      const { data: users } = await supabase
        .from('users')
        .select('id, display_name, avatar_url')
        .in('id', Array.from(userIds));

      const usersMap = new Map(users?.map((u) => [u.id, u]) || []);

      // Combine sheeds with user data
      return sheeds.map((sheed) => ({
        ...sheed,
        sheeder: usersMap.get(sheed.sheeder_id),
        sheede_1: usersMap.get(sheed.sheede_1_id),
        sheede_2: usersMap.get(sheed.sheede_2_id),
      }));
    },
    enabled: !!userId,
  });

  // Create sheed mutation - calls Edge Function
  const createSheedMutation = useMutation({
    mutationFn: async (input: CreateSheedInput): Promise<CreateSheedResponse> => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      const response = await supabase.functions.invoke('create-sheed', {
        body: input,
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to create sheed');
      }

      return response.data as CreateSheedResponse;
    },
    // Optimistic update for faster UI feedback
    onMutate: async (newSheed) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: sheedKeys.created(userId || '') });

      // Snapshot previous value
      const previousSheeds = queryClient.getQueryData(sheedKeys.created(userId || ''));

      // We could add optimistic data here if we had all the required fields
      // For now, we'll just invalidate on success

      return { previousSheeds };
    },
    onError: (err, newSheed, context) => {
      // Rollback on error
      if (context?.previousSheeds) {
        queryClient.setQueryData(sheedKeys.created(userId || ''), context.previousSheeds);
      }
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: sheedKeys.created(userId || '') });
    },
  });

  // Accept sheed mutation
  const acceptSheedMutation = useMutation({
    mutationFn: async ({
      sheedId,
      isFirstSheede,
    }: {
      sheedId: string;
      isFirstSheede: boolean;
    }) => {
      const updateField = isFirstSheede ? 'sheede_1_accepted' : 'sheede_2_accepted';

      const { data, error } = await supabase
        .from('sheeds')
        .update({ [updateField]: true })
        .eq('id', sheedId)
        .select()
        .single();

      if (error) throw error;

      // Check if both accepted - update status to active
      const otherField = isFirstSheede ? 'sheede_2_accepted' : 'sheede_1_accepted';
      if (data && data[otherField] === true) {
        await supabase
          .from('sheeds')
          .update({ status: 'active' as SheedStatus })
          .eq('id', sheedId);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sheedKeys.received(userId || '') });
    },
  });

  // Decline sheed mutation
  const declineSheedMutation = useMutation({
    mutationFn: async ({
      sheedId,
      isFirstSheede,
    }: {
      sheedId: string;
      isFirstSheede: boolean;
    }) => {
      const updateField = isFirstSheede ? 'sheede_1_accepted' : 'sheede_2_accepted';

      const { data, error } = await supabase
        .from('sheeds')
        .update({
          [updateField]: false,
          status: 'declined' as SheedStatus,
        })
        .eq('id', sheedId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sheedKeys.received(userId || '') });
    },
  });

  return {
    // Queries
    createdSheeds: createdSheedsQuery.data || [],
    receivedSheeds: receivedSheedsQuery.data || [],
    isLoadingCreated: createdSheedsQuery.isLoading,
    isLoadingReceived: receivedSheedsQuery.isLoading,
    createdError: createdSheedsQuery.error,
    receivedError: receivedSheedsQuery.error,

    // Mutations
    createSheed: createSheedMutation.mutate,
    createSheedAsync: createSheedMutation.mutateAsync,
    isCreating: createSheedMutation.isPending,
    createError: createSheedMutation.error,

    acceptSheed: acceptSheedMutation.mutate,
    isAccepting: acceptSheedMutation.isPending,

    declineSheed: declineSheedMutation.mutate,
    isDeclining: declineSheedMutation.isPending,

    // Refetch functions
    refetchCreated: createdSheedsQuery.refetch,
    refetchReceived: receivedSheedsQuery.refetch,
  };
}

/**
 * Hook to fetch a single sheed by ID
 */
export function useSheed(sheedId: string | undefined) {
  return useQuery({
    queryKey: sheedKeys.detail(sheedId || ''),
    queryFn: async (): Promise<SheedWithUsers | null> => {
      if (!sheedId) return null;

      // Fetch sheed first
      const { data: sheed, error } = await supabase
        .from('sheeds')
        .select('*')
        .eq('id', sheedId)
        .single();

      if (error) throw error;
      if (!sheed) return null;

      // Fetch related users
      const userIds = [sheed.sheeder_id, sheed.sheede_1_id, sheed.sheede_2_id];

      const { data: users } = await supabase
        .from('users')
        .select('id, display_name, avatar_url')
        .in('id', userIds);

      const usersMap = new Map(users?.map((u) => [u.id, u]) || []);

      return {
        ...sheed,
        sheeder: usersMap.get(sheed.sheeder_id),
        sheede_1: usersMap.get(sheed.sheede_1_id),
        sheede_2: usersMap.get(sheed.sheede_2_id),
      };
    },
    enabled: !!sheedId,
  });
}
