/**
 * @file useMessages hook
 * @description Hook for fetching messages with Supabase Realtime subscription
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import type { Message, User } from '@/types';
import type { RealtimeChannel, RealtimePostgresInsertPayload } from '@supabase/supabase-js';

/**
 * Message with sender information
 */
export interface MessageWithSender extends Message {
  sender?: Partial<User>;
}

/**
 * Return type for useMessages hook
 */
export interface UseMessagesReturn {
  /** Array of messages with sender info */
  messages: MessageWithSender[];
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
  /** Send a new message */
  sendMessage: (content: string) => Promise<void>;
  /** Sending state */
  isSending: boolean;
  /** Refetch messages manually */
  refetch: () => Promise<void>;
}

/**
 * Fetch sender information for messages
 */
async function fetchSenders(
  senderIds: string[]
): Promise<Map<string, Partial<User>>> {
  if (senderIds.length === 0) return new Map();

  const { data } = await supabase
    .from('users')
    .select('id, display_name, avatar_url')
    .in('id', senderIds);

  return new Map(data?.map((s) => [s.id, s]) || []);
}

/**
 * Hook for managing messages with Supabase Realtime
 * @param chatroomId - The chatroom ID to fetch messages for
 */
export function useMessages(chatroomId: string | undefined): UseMessagesReturn {
  const user = useAuthStore((state) => state.user);
  const [messages, setMessages] = useState<MessageWithSender[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const sendersRef = useRef<Map<string, Partial<User>>>(new Map());

  // Fetch initial messages
  const fetchMessages = useCallback(async () => {
    if (!chatroomId) {
      setMessages([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Fetch messages ordered by created_at
      const { data, error: fetchError } = await supabase
        .from('messages')
        .select('*')
        .eq('chatroom_id', chatroomId)
        .order('created_at', { ascending: true });

      if (fetchError) throw fetchError;

      // Fetch senders
      const senderIds = [...new Set(data?.map((m) => m.sender_id) || [])];
      const senders = await fetchSenders(senderIds);
      sendersRef.current = senders;

      // Map messages with sender info
      const messagesWithSenders: MessageWithSender[] = (data || []).map(
        (msg) => ({
          ...msg,
          sender: senders.get(msg.sender_id),
        })
      );

      setMessages(messagesWithSenders);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch messages'));
    } finally {
      setIsLoading(false);
    }
  }, [chatroomId]);

  // Handle realtime INSERT events
  const handleInsert = useCallback(
    async (payload: RealtimePostgresInsertPayload<Message>) => {
      const newMessage = payload.new;

      // Fetch sender if not cached
      if (!sendersRef.current.has(newMessage.sender_id)) {
        const { data } = await supabase
          .from('users')
          .select('id, display_name, avatar_url')
          .eq('id', newMessage.sender_id)
          .single();

        if (data) {
          sendersRef.current.set(newMessage.sender_id, data);
        }
      }

      const messageWithSender: MessageWithSender = {
        ...newMessage,
        sender: sendersRef.current.get(newMessage.sender_id),
      };

      setMessages((prev) => {
        // Avoid duplicates
        if (prev.some((m) => m.id === newMessage.id)) {
          return prev;
        }
        return [...prev, messageWithSender];
      });
    },
    []
  );

  // Setup Supabase Realtime subscription
  useEffect(() => {
    if (!chatroomId) return;

    // Fetch initial messages
    fetchMessages();

    // Subscribe to realtime changes
    const channel = supabase
      .channel(`messages:${chatroomId}`)
      .on<Message>(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chatroom_id=eq.${chatroomId}`,
        },
        handleInsert
      )
      .subscribe();

    channelRef.current = channel;

    // Cleanup on unmount
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [chatroomId, fetchMessages, handleInsert]);

  // Send message function
  const sendMessage = useCallback(
    async (content: string) => {
      if (!chatroomId || !user?.id || !content.trim() || isSending) return;

      setIsSending(true);

      // Optimistic update
      const optimisticMessage: MessageWithSender = {
        id: `temp-${Date.now()}`,
        chatroom_id: chatroomId,
        sender_id: user.id,
        content: content.trim(),
        type: 'text',
        created_at: new Date().toISOString(),
        image_url: null,
        read_at: null,
        sender: {
          id: user.id,
          display_name: (user as any).user_metadata?.display_name || (user as any).user_metadata?.full_name || 'Moi',
          avatar_url: (user as any).user_metadata?.avatar_url,
        },
      };

      setMessages((prev) => [...prev, optimisticMessage]);

      try {
        const { data, error: insertError } = await supabase
          .from('messages')
          .insert({
            chatroom_id: chatroomId,
            sender_id: user.id,
            content: content.trim(),
            type: 'text',
          })
          .select()
          .single();

        if (insertError) throw insertError;

        // Replace optimistic message with real one
        setMessages((prev) =>
          prev.map((m) =>
            m.id === optimisticMessage.id
              ? { ...data, sender: optimisticMessage.sender }
              : m
          )
        );
      } catch (err) {
        console.error('Failed to send message:', err);
        // Rollback optimistic update
        setMessages((prev) =>
          prev.filter((m) => m.id !== optimisticMessage.id)
        );
        throw err;
      } finally {
        setIsSending(false);
      }
    },
    [chatroomId, user, isSending]
  );

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    isSending,
    refetch: fetchMessages,
  };
}

export default useMessages;
