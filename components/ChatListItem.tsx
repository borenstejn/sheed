/**
 * @file ChatListItem component
 * @description Reusable chat list item for displaying conversation previews
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { Chatroom, ChatroomType, User, Message } from '@/types';

// Extended chatroom interface with participant info
export interface ChatroomWithDetails extends Chatroom {
  otherParticipant?: Partial<User>;
  lastMessage?: Partial<Message>;
  unreadCount?: number;
}

// Props interface for ChatListItem
export interface ChatListItemProps {
  chatroom: ChatroomWithDetails;
  onPress: () => void;
  currentUserId?: string;
}

// Chatroom type labels for sheeder/sheede indicator
const chatroomTypeLabels: Record<ChatroomType, string> = {
  sheeder_sheede_1: 'Chat avec Sheeder',
  sheeder_sheede_2: 'Chat avec Sheeder',
  sheede_sheede: 'Chat avec match',
};

// Avatar component for participant display
interface AvatarProps {
  name: string;
  avatarUrl?: string | null;
  size?: 'sm' | 'md' | 'lg';
}

function Avatar({ name, size = 'md' }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <View
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-sheed-pink to-sheed-purple items-center justify-center`}
    >
      <Text className={`text-white font-bold ${textSizes[size]}`}>
        {name.charAt(0).toUpperCase()}
      </Text>
    </View>
  );
}

// Format timestamp to relative or absolute time
function formatTimestamp(dateString: string | null | undefined): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  // Less than 1 minute
  if (diffMins < 1) return "À l'instant";
  // Less than 1 hour
  if (diffMins < 60) return `${diffMins}min`;
  // Less than 24 hours
  if (diffHours < 24) return `${diffHours}h`;
  // Less than 7 days
  if (diffDays < 7) return `${diffDays}j`;
  // Otherwise show date
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
  });
}

// Unread badge component
interface UnreadBadgeProps {
  count: number;
}

function UnreadBadge({ count }: UnreadBadgeProps) {
  if (count <= 0) return null;

  const displayCount = count > 99 ? '99+' : count.toString();

  return (
    <View className="bg-sheed-pink rounded-full min-w-[20px] h-5 px-1.5 items-center justify-center ml-2">
      <Text className="text-white text-xs font-bold">{displayCount}</Text>
    </View>
  );
}

/**
 * ChatListItem - Displays a single chat conversation preview
 *
 * Features:
 * - Avatar with participant initial
 * - Participant display_name
 * - Last message preview (truncated)
 * - Timestamp (relative or absolute)
 * - Unread count badge
 * - Chatroom type indicator (sheeder/sheede)
 */
export function ChatListItem({ chatroom, onPress }: ChatListItemProps) {
  const participantName = chatroom.otherParticipant?.display_name || 'Inconnu';
  const lastMessageContent = chatroom.lastMessage?.content || 'Aucun message';
  const timestamp = formatTimestamp(
    chatroom.lastMessage?.created_at || chatroom.last_message_at
  );
  const unreadCount = chatroom.unreadCount || 0;
  const hasUnread = unreadCount > 0;
  const chatroomTypeLabel = chatroomTypeLabels[chatroom.type];

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-gray-800/50 rounded-2xl p-4 mb-3 flex-row items-center"
      activeOpacity={0.7}
    >
      {/* Avatar */}
      <Avatar
        name={participantName}
        avatarUrl={chatroom.otherParticipant?.avatar_url}
      />

      {/* Content */}
      <View className="flex-1 ml-3">
        {/* Name and timestamp row */}
        <View className="flex-row items-center justify-between">
          <Text
            className={`font-semibold flex-1 ${hasUnread ? 'text-white' : 'text-white'}`}
            numberOfLines={1}
          >
            {participantName}
          </Text>
          {timestamp && (
            <Text className="text-gray-500 text-xs ml-2">{timestamp}</Text>
          )}
        </View>

        {/* Message preview and unread badge row */}
        <View className="flex-row items-center justify-between mt-1">
          <Text
            className={`text-sm flex-1 ${hasUnread ? 'text-white font-medium' : 'text-gray-400'}`}
            numberOfLines={1}
          >
            {lastMessageContent}
          </Text>
          <UnreadBadge count={unreadCount} />
        </View>

        {/* Chatroom type indicator */}
        <Text className="text-gray-500 text-xs mt-1">{chatroomTypeLabel}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default ChatListItem;
