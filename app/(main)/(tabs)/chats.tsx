/**
 * @file Chats list screen
 * @description Shows all user conversations grouped by sheed context
 */

import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import type { User, Message } from '@/types';
import { ChatListItem, type ChatroomWithDetails } from '@/components';

// Empty state component
function EmptyState() {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <Text className="text-6xl mb-4">💬</Text>
      <Text className="text-white text-xl font-bold text-center">
        Aucune conversation
      </Text>
      <Text className="text-gray-400 text-center mt-2">
        Tes chats apparaîtront ici une fois que tes sheeds seront acceptés
      </Text>
    </View>
  );
}

export default function ChatsScreen() {
  const user = useAuthStore((state) => state.user);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch chatrooms where user is a participant
  const {
    data: chatrooms,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['chatrooms', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      // Fetch chatrooms where user is participant_a or participant_b
      const { data: chatroomsData, error: chatroomsError } = await supabase
        .from('chatrooms')
        .select('*')
        .or(`participant_a_id.eq.${user.id},participant_b_id.eq.${user.id}`)
        .order('last_message_at', { ascending: false, nullsFirst: false });

      if (chatroomsError) throw chatroomsError;
      if (!chatroomsData || chatroomsData.length === 0) return [];

      // Get unique participant IDs (excluding current user)
      const participantIds = new Set<string>();
      chatroomsData.forEach((room) => {
        if (room.participant_a_id !== user.id) {
          participantIds.add(room.participant_a_id);
        }
        if (room.participant_b_id !== user.id) {
          participantIds.add(room.participant_b_id);
        }
      });

      // Fetch participant details
      const { data: usersData } = await supabase
        .from('users')
        .select('id, display_name, avatar_url')
        .in('id', Array.from(participantIds));

      const usersMap = new Map(usersData?.map((u) => [u.id, u]) || []);

      // Fetch last message for each chatroom
      const chatroomIds = chatroomsData.map((room) => room.id);
      const { data: messagesData } = await supabase
        .from('messages')
        .select('*')
        .in('chatroom_id', chatroomIds)
        .order('created_at', { ascending: false });

      // Group messages by chatroom and get the latest
      const lastMessagesMap = new Map<string, Message>();
      messagesData?.forEach((msg) => {
        if (!lastMessagesMap.has(msg.chatroom_id)) {
          lastMessagesMap.set(msg.chatroom_id, msg);
        }
      });

      // Count unread messages per chatroom
      const { data: unreadData } = await supabase
        .from('messages')
        .select('chatroom_id')
        .in('chatroom_id', chatroomIds)
        .neq('sender_id', user.id)
        .is('read_at', null);

      const unreadCountMap = new Map<string, number>();
      unreadData?.forEach((msg) => {
        const count = unreadCountMap.get(msg.chatroom_id) || 0;
        unreadCountMap.set(msg.chatroom_id, count + 1);
      });

      // Combine all data
      const enrichedChatrooms: ChatroomWithDetails[] = chatroomsData.map((room) => {
        const otherParticipantId =
          room.participant_a_id === user.id
            ? room.participant_b_id
            : room.participant_a_id;

        return {
          ...room,
          otherParticipant: usersMap.get(otherParticipantId) as User | undefined,
          lastMessage: lastMessagesMap.get(room.id),
          unreadCount: unreadCountMap.get(room.id) || 0,
        };
      });

      return enrichedChatrooms;
    },
    enabled: !!user?.id,
  });

  // Handle pull to refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  // Navigate to chat detail
  const handleChatPress = useCallback((chatroomId: string) => {
    router.push(`/chat/${chatroomId}`);
  }, []);

  // Render chat item
  const renderChatItem = useCallback(
    ({ item }: { item: ChatroomWithDetails }) => (
      <ChatListItem chatroom={item} onPress={() => handleChatPress(item.id)} />
    ),
    [handleChatPress]
  );

  // Key extractor
  const keyExtractor = useCallback((item: ChatroomWithDetails) => item.id, []);

  // Memoized list data
  const listData = useMemo(() => chatrooms || [], [chatrooms]);

  // Loading state
  if (isLoading) {
    return (
      <View className="flex-1 bg-sheed-dark items-center justify-center">
        <ActivityIndicator size="large" color="#FF1493" />
        <Text className="text-gray-400 mt-4">Chargement...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-sheed-dark">
      {/* Header */}
      <View className="px-4 pt-12 pb-4">
        <Text className="text-white text-2xl font-bold">Messages</Text>
      </View>

      {/* Chat List */}
      {listData.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={listData}
          renderItem={renderChatItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#FF1493"
              colors={['#FF1493']}
            />
          }
        />
      )}
    </View>
  );
}
