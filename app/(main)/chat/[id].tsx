/**
 * @file Conversation screen
 * @description Chat conversation view with messages and input
 */

import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { useMessages, type MessageWithSender } from '@/hooks';
import type { Message, User, Chatroom } from '@/types';

// Extended chatroom with participant info
interface ChatroomWithParticipant extends Chatroom {
  otherParticipant?: Partial<User>;
  sheed?: {
    intro_message?: string;
  };
}

// Avatar component
interface AvatarProps {
  name: string;
  size?: 'sm' | 'md';
}

function Avatar({ name, size = 'sm' }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
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

// Message bubble component
interface MessageBubbleProps {
  message: MessageWithSender;
  isOwnMessage: boolean;
  showAvatar?: boolean;
}

function MessageBubble({ message, isOwnMessage, showAvatar }: MessageBubbleProps) {
  const timestamp = message.created_at
    ? new Date(message.created_at).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <View
      className={`flex-row items-end mb-2 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
    >
      {/* Avatar for other user */}
      {!isOwnMessage && showAvatar && (
        <View className="mr-2">
          <Avatar name={message.sender?.display_name || 'U'} size="sm" />
        </View>
      )}
      {!isOwnMessage && !showAvatar && <View className="w-10" />}

      {/* Message content */}
      <View
        className={`max-w-[75%] px-4 py-2 rounded-2xl ${
          isOwnMessage
            ? 'bg-sheed-pink rounded-br-sm'
            : 'bg-gray-700 rounded-bl-sm'
        }`}
      >
        <Text className="text-white">{message.content}</Text>
        <Text className={`text-xs mt-1 ${isOwnMessage ? 'text-pink-200' : 'text-gray-400'}`}>
          {timestamp}
        </Text>
      </View>
    </View>
  );
}

// Intro message banner component
interface IntroBannerProps {
  message: string;
  sheederName?: string;
}

function IntroBanner({ message, sheederName }: IntroBannerProps) {
  return (
    <View className="bg-gray-800/80 mx-4 my-2 p-4 rounded-xl border border-sheed-pink/30">
      <Text className="text-gray-400 text-xs mb-1">
        Message d'intro de {sheederName || 'Sheeder'}
      </Text>
      <Text className="text-white italic">"{message}"</Text>
    </View>
  );
}

// Header component
interface ChatHeaderProps {
  participant: Partial<User> | undefined;
  onBack: () => void;
}

function ChatHeader({ participant, onBack }: ChatHeaderProps) {
  return (
    <View className="flex-row items-center px-4 pt-12 pb-4 bg-sheed-dark border-b border-gray-800">
      <TouchableOpacity onPress={onBack} className="p-2 -ml-2 mr-2">
        <Text className="text-sheed-pink text-lg">←</Text>
      </TouchableOpacity>

      <Avatar name={participant?.display_name || 'Inconnu'} size="md" />

      <View className="ml-3 flex-1">
        <Text className="text-white font-semibold text-lg">
          {participant?.display_name || 'Conversation'}
        </Text>
        <Text className="text-gray-400 text-sm">En ligne</Text>
      </View>
    </View>
  );
}

// Input bar component
interface InputBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  isSending: boolean;
}

function InputBar({ value, onChangeText, onSend, isSending }: InputBarProps) {
  const canSend = value.trim().length > 0 && !isSending;

  return (
    <View className="flex-row items-center px-4 py-3 bg-gray-900 border-t border-gray-800">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Écris un message..."
        placeholderTextColor="#8A8A8E"
        className="flex-1 bg-gray-800 rounded-full px-4 py-2 text-white mr-3"
        multiline
        maxLength={1000}
      />
      <TouchableOpacity
        onPress={onSend}
        disabled={!canSend}
        className={`w-10 h-10 rounded-full items-center justify-center ${
          canSend ? 'bg-sheed-pink' : 'bg-gray-700'
        }`}
        activeOpacity={0.7}
      >
        {isSending ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text className="text-white text-lg">↑</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

export default function ConversationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const user = useAuthStore((state) => state.user);
  const flatListRef = useRef<FlatList>(null);
  const [inputText, setInputText] = useState('');

  // Use useMessages hook for realtime messages
  const {
    messages,
    isLoading: isMessagesLoading,
    sendMessage,
    isSending,
  } = useMessages(id);

  // Fetch chatroom data
  const { data: chatroom, isLoading: isChatroomLoading } = useQuery({
    queryKey: ['chatroom', id],
    queryFn: async () => {
      if (!id || !user?.id) return null;

      // Fetch chatroom
      const { data: chatroomData, error: chatroomError } = await supabase
        .from('chatrooms')
        .select('*')
        .eq('id', id)
        .single();

      if (chatroomError) throw chatroomError;
      if (!chatroomData) return null;

      // Determine other participant
      const otherParticipantId =
        chatroomData.participant_a_id === user.id
          ? chatroomData.participant_b_id
          : chatroomData.participant_a_id;

      // Fetch other participant
      const { data: participantData } = await supabase
        .from('users')
        .select('id, display_name, avatar_url')
        .eq('id', otherParticipantId)
        .single();

      // Fetch sheed for intro message
      const { data: sheedData } = await supabase
        .from('sheeds')
        .select('intro_message')
        .eq('id', chatroomData.sheed_id)
        .single();

      return {
        ...chatroomData,
        otherParticipant: participantData || undefined,
        sheed: sheedData || undefined,
      } as ChatroomWithParticipant;
    },
    enabled: !!id && !!user?.id,
  });

  // Handle back navigation
  const handleBack = useCallback(() => {
    router.back();
  }, []);

  // Handle send message using useMessages hook
  const handleSend = useCallback(async () => {
    if (!inputText.trim() || isSending) return;

    const messageContent = inputText.trim();
    setInputText('');

    try {
      await sendMessage(messageContent);

      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (err) {
      console.error('Failed to send message:', err);
      // Restore input on error
      setInputText(messageContent);
    }
  }, [inputText, isSending, sendMessage]);

  // Render message item
  const renderMessage = useCallback(
    ({ item, index }: { item: MessageWithSender; index: number }) => {
      const isOwnMessage = item.sender_id === user?.id;
      const previousMessage = messages?.[index - 1];
      const showAvatar =
        !isOwnMessage &&
        (!previousMessage || previousMessage.sender_id !== item.sender_id);

      return (
        <MessageBubble
          message={item}
          isOwnMessage={isOwnMessage}
          showAvatar={showAvatar}
        />
      );
    },
    [user?.id, messages]
  );

  // Key extractor
  const keyExtractor = useCallback((item: MessageWithSender) => item.id, []);

  // Loading state
  const isLoading = isChatroomLoading || isMessagesLoading;

  if (isLoading) {
    return (
      <View className="flex-1 bg-sheed-dark items-center justify-center">
        <ActivityIndicator size="large" color="#FF1493" />
        <Text className="text-gray-400 mt-4">Chargement...</Text>
      </View>
    );
  }

  // Memoized messages list
  const messagesList = useMemo(() => messages || [], [messages]);

  // Intro message from sheed
  const introMessage = chatroom?.sheed?.intro_message;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-sheed-dark"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <ChatHeader
        participant={chatroom?.otherParticipant}
        onBack={handleBack}
      />

      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={messagesList}
        renderItem={renderMessage}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          introMessage ? (
            <IntroBanner message={introMessage} />
          ) : null
        }
        onContentSizeChange={() => {
          flatListRef.current?.scrollToEnd({ animated: false });
        }}
      />

      {/* Input Bar */}
      <InputBar
        value={inputText}
        onChangeText={setInputText}
        onSend={handleSend}
        isSending={isSending}
      />
    </KeyboardAvoidingView>
  );
}
