/**
 * @file ChatBubble component
 * @description Chat message bubble with gradient for self, neutral for other
 */

import React, { useState, useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';
import type { Message } from '@/types';

/**
 * Props for ChatBubble component
 */
export interface ChatBubbleProps {
  /** Message data */
  message: Partial<Message> & { content: string };
  /** Whether message is from current user */
  isOwn?: boolean;
  /** Whether this is first message in a group */
  isFirst?: boolean;
  /** Whether this is last message in a group */
  isLast?: boolean;
  /** Whether to show tail (for last message in group) */
  showTail?: boolean;
  /** Sender name for avatar */
  senderName?: string;
}

/**
 * Format timestamp for display
 */
function formatTimestamp(dateString?: string): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Chat bubble component for displaying messages
 * - Gradient/pink styling for own messages
 * - Gray/neutral styling for other messages
 * - Supports grouped consecutive messages
 * - Timestamp visible on press
 */
export function ChatBubble({
  message,
  isOwn = false,
  isFirst = true,
  isLast = true,
  showTail = true,
  senderName,
}: ChatBubbleProps) {
  const [showTimestamp, setShowTimestamp] = useState(false);

  const handlePress = useCallback(() => {
    setShowTimestamp((prev) => !prev);
  }, []);

  // Content from message
  const content = message.content || '';
  const timestamp = formatTimestamp(message.created_at ?? undefined);

  // Determine corner rounding based on grouping
  const getGroupedRounding = () => {
    if (isOwn) {
      // Own messages: rounded left, varying right corners
      if (isFirst && isLast) return 'rounded-2xl rounded-br-sm';
      if (isFirst) return 'rounded-2xl rounded-br-md';
      if (isLast) return 'rounded-2xl rounded-tr-md rounded-br-sm';
      return 'rounded-2xl rounded-tr-md rounded-br-md';
    } else {
      // Other messages: rounded right, varying left corners
      if (isFirst && isLast) return 'rounded-2xl rounded-bl-sm';
      if (isFirst) return 'rounded-2xl rounded-bl-md';
      if (isLast) return 'rounded-2xl rounded-tl-md rounded-bl-sm';
      return 'rounded-2xl rounded-tl-md rounded-bl-md';
    }
  };

  // Margin based on grouping
  const marginClass = isLast ? 'mb-2' : 'mb-0.5';

  return (
    <Pressable
      onPress={handlePress}
      className={`flex-row ${isOwn ? 'justify-end' : 'justify-start'} ${marginClass}`}
    >
      <View
        className={`max-w-[75%] px-4 py-2 ${getGroupedRounding()} ${
          isOwn
            ? 'bg-gradient-to-br from-sheed-pink to-sheed-purple'
            : 'bg-gray-700'
        }`}
        style={
          isOwn
            ? { backgroundColor: '#FF1493' } // sheed-pink fallback for gradient
            : { backgroundColor: '#374151' } // gray-700
        }
      >
        {/* Message text content */}
        <Text className={`text-white ${isOwn ? 'text-right' : 'text-left'}`}>
          {content}
        </Text>

        {/* Timestamp - always rendered but visibility toggled */}
        {(showTimestamp || showTail) && timestamp && (
          <Text
            className={`text-xs mt-1 ${
              isOwn ? 'text-pink-200 text-right' : 'text-gray-400 text-left'
            }`}
          >
            {timestamp}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

export default ChatBubble;
