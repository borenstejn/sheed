/**
 * @file Sheed detail screen
 * @description Shows sheed details with triangle visualization (Sheeder view)
 */

import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSheed, useSheeds } from '@/hooks/useSheeds';
import { useAuthStore } from '@/stores/authStore';
import type { SheedStatus } from '@/types';

// Status badge configuration
const statusConfig: Record<
  SheedStatus,
  { emoji: string; label: string; color: string }
> = {
  pending: { emoji: '⏳', label: 'En attente', color: 'bg-yellow-500/20' },
  active: { emoji: '💬', label: 'Actif', color: 'bg-green-500/20' },
  success: { emoji: '💕', label: 'Match !', color: 'bg-sheed-pink/20' },
  expired: { emoji: '⌛', label: 'Expiré', color: 'bg-gray-500/20' },
  declined: { emoji: '😔', label: 'Décliné', color: 'bg-red-500/20' },
};

// Avatar component
interface AvatarProps {
  name: string;
  avatarUrl?: string | null;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

function Avatar({ name, avatarUrl, size = 'md', label }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <View className="items-center">
      <View
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-sheed-pink to-sheed-purple items-center justify-center`}
      >
        <Text className={`text-white font-bold ${textSizes[size]}`}>
          {name.charAt(0).toUpperCase()}
        </Text>
      </View>
      {label && (
        <Text className="text-gray-400 text-xs mt-1" numberOfLines={1}>
          {label}
        </Text>
      )}
    </View>
  );
}

// Chat link card component
interface ChatLinkCardProps {
  title: string;
  subtitle: string;
  onPress: () => void;
  locked?: boolean;
}

function ChatLinkCard({ title, subtitle, onPress, locked }: ChatLinkCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={locked}
      className={`bg-gray-800 rounded-xl p-4 mb-3 ${locked ? 'opacity-50' : ''}`}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-white font-semibold">{title}</Text>
          <Text className="text-gray-400 text-sm">{subtitle}</Text>
        </View>
        {locked ? (
          <Text className="text-gray-500 text-2xl">🔒</Text>
        ) : (
          <Text className="text-sheed-pink text-2xl">💬</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function SheedDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const user = useAuthStore((state) => state.user);
  const { data: sheed, isLoading, error, refetch } = useSheed(id);
  const { acceptSheed, declineSheed, isAccepting, isDeclining } = useSheeds(user?.id);

  // Determine user's role in this sheed
  const userRole = useMemo(() => {
    if (!sheed || !user) return null;
    if (sheed.sheeder_id === user.id) return 'sheeder';
    if (sheed.sheede_1_id === user.id) return 'sheede_1';
    if (sheed.sheede_2_id === user.id) return 'sheede_2';
    return null;
  }, [sheed, user]);

  const isSheeder = userRole === 'sheeder';
  const isSheede = userRole === 'sheede_1' || userRole === 'sheede_2';
  const isFirstSheede = userRole === 'sheede_1';

  // Determine if user has already responded
  const hasResponded = useMemo(() => {
    if (!sheed || !isSheede) return false;
    const myAccepted = isFirstSheede ? sheed.sheede_1_accepted : sheed.sheede_2_accepted;
    return myAccepted !== null;
  }, [sheed, isSheede, isFirstSheede]);

  // Get the other sheedé (for sheedé view)
  const otherSheede = useMemo(() => {
    if (!sheed) return null;
    return isFirstSheede ? sheed.sheede_2 : sheed.sheede_1;
  }, [sheed, isFirstSheede]);

  // Navigate back
  const handleBack = useCallback(() => {
    router.back();
  }, []);

  // Navigate to chat
  const handleChatPress = useCallback(
    (chatroomType: 'sheeder_sheede_1' | 'sheeder_sheede_2' | 'sheede_sheede') => {
      // TODO: Navigate to chat with correct chatroom
      router.push(`/chat/${id}?type=${chatroomType}`);
    },
    [id]
  );

  // Handle accept sheed
  const handleAccept = useCallback(() => {
    if (!id) return;
    acceptSheed(
      { sheedId: id, isFirstSheede },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  }, [id, isFirstSheede, acceptSheed, refetch]);

  // Handle decline sheed
  const handleDecline = useCallback(() => {
    if (!id) return;
    declineSheed(
      { sheedId: id, isFirstSheede },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  }, [id, isFirstSheede, declineSheed, refetch]);

  // Loading state
  if (isLoading) {
    return (
      <View className="flex-1 bg-sheed-dark items-center justify-center">
        <ActivityIndicator size="large" color="#FF1493" />
        <Text className="text-gray-400 mt-4">Chargement...</Text>
      </View>
    );
  }

  // Error state
  if (error || !sheed) {
    return (
      <View className="flex-1 bg-sheed-dark items-center justify-center px-8">
        <Text className="text-gray-400 text-center">
          Impossible de charger le sheed.
        </Text>
        <TouchableOpacity
          onPress={handleBack}
          className="mt-4 bg-sheed-pink px-6 py-2 rounded-full"
        >
          <Text className="text-white font-semibold">Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const status = sheed.status || 'pending';
  const statusInfo = statusConfig[status];
  const isActive = status === 'active';
  const bothAccepted = sheed.sheede_1_accepted && sheed.sheede_2_accepted;

  return (
    <ScrollView className="flex-1 bg-sheed-dark">
      {/* Header */}
      <View className="flex-row items-center px-4 pt-12 pb-4">
        <TouchableOpacity onPress={handleBack} className="p-2 -ml-2">
          <Text className="text-sheed-pink text-lg">← Retour</Text>
        </TouchableOpacity>
      </View>

      {/* Status Badge */}
      <View className="items-center mb-6">
        <View className={`${statusInfo.color} px-4 py-2 rounded-full`}>
          <Text className="text-white font-semibold">
            {statusInfo.emoji} {statusInfo.label}
          </Text>
        </View>
      </View>

      {/* Triangle Visualization */}
      <View className="px-4 mb-8">
        <View className="bg-gray-800/50 rounded-2xl p-6">
          {/* Sheeder at top */}
          <View className="items-center mb-6">
            <Avatar
              name={sheed.sheeder?.display_name || 'Sheeder'}
              avatarUrl={sheed.sheeder?.avatar_url}
              size="lg"
              label={isSheeder ? 'Toi (Sheeder)' : 'Sheeder'}
            />
          </View>

          {/* Connecting lines */}
          <View className="flex-row justify-center items-center mb-2">
            <View className="w-20 h-0.5 bg-gray-600 transform -rotate-45" />
            <Text className="text-2xl mx-4">💕</Text>
            <View className="w-20 h-0.5 bg-gray-600 transform rotate-45" />
          </View>

          {/* Sheedés at bottom */}
          <View className="flex-row justify-around">
            <View className="items-center">
              <Avatar
                name={sheed.sheede_1?.display_name || 'Sheedé 1'}
                avatarUrl={sheed.sheede_1?.avatar_url}
                size="md"
                label={sheed.sheede_1?.display_name || 'Sheedé 1'}
              />
              <Text className="text-xs mt-1">
                {sheed.sheede_1_accepted === true ? '✅' : sheed.sheede_1_accepted === false ? '❌' : '⏳'}
              </Text>
            </View>

            {/* Connection between sheedés */}
            <View className="items-center justify-center">
              <View className="w-16 h-0.5 bg-gray-600" />
              {bothAccepted && (
                <Text className="text-lg mt-1">
                  {status === 'success' ? '💕' : '💬'}
                </Text>
              )}
            </View>

            <View className="items-center">
              <Avatar
                name={sheed.sheede_2?.display_name || 'Sheedé 2'}
                avatarUrl={sheed.sheede_2?.avatar_url}
                size="md"
                label={sheed.sheede_2?.display_name || 'Sheedé 2'}
              />
              <Text className="text-xs mt-1">
                {sheed.sheede_2_accepted === true ? '✅' : sheed.sheede_2_accepted === false ? '❌' : '⏳'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Intro Message */}
      <View className="px-4 mb-6">
        <Text className="text-white font-semibold mb-2">Ton message d'intro</Text>
        <View className="bg-gray-800 rounded-xl p-4">
          <Text className="text-gray-300">{sheed.intro_message}</Text>
        </View>
      </View>

      {/* Chat Links (Sheeder view) */}
      {isSheeder && (
        <View className="px-4 mb-6">
          <Text className="text-white font-semibold mb-3">Conversations</Text>

          {/* Sheeder <-> Sheedé 1 */}
          <ChatLinkCard
            title={`Chat avec ${sheed.sheede_1?.display_name || 'Sheedé 1'}`}
            subtitle={sheed.sheede_1_accepted ? 'Conversation active' : 'En attente de réponse'}
            onPress={() => handleChatPress('sheeder_sheede_1')}
            locked={!sheed.sheede_1_accepted}
          />

          {/* Sheeder <-> Sheedé 2 */}
          <ChatLinkCard
            title={`Chat avec ${sheed.sheede_2?.display_name || 'Sheedé 2'}`}
            subtitle={sheed.sheede_2_accepted ? 'Conversation active' : 'En attente de réponse'}
            onPress={() => handleChatPress('sheeder_sheede_2')}
            locked={!sheed.sheede_2_accepted}
          />

          {/* Sheedé <-> Sheedé (locked for sheeder) */}
          <ChatLinkCard
            title="Chat entre les sheedés"
            subtitle="Tu ne peux pas voir cette conversation 🔒"
            onPress={() => {}}
            locked={true}
          />
        </View>
      )}

      {/* Sheedé View - Accept/Decline */}
      {isSheede && status === 'pending' && !hasResponded && (
        <View className="px-4 mb-6">
          <View className="bg-gray-800/50 rounded-2xl p-6">
            <Text className="text-white font-semibold text-center mb-2">
              {sheed.sheeder?.display_name || 'Quelqu\'un'} veut te présenter{' '}
              {otherSheede?.display_name || 'quelqu\'un'}
            </Text>
            <Text className="text-gray-400 text-center text-sm mb-6">
              Accepte pour découvrir qui c'est et commencer à discuter !
            </Text>

            <View className="flex-row gap-4">
              <TouchableOpacity
                onPress={handleDecline}
                disabled={isDeclining}
                className="flex-1 bg-gray-700 py-4 rounded-full items-center"
                activeOpacity={0.7}
              >
                <Text className="text-gray-300 font-semibold">
                  {isDeclining ? '...' : 'Décliner'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleAccept}
                disabled={isAccepting}
                className="flex-1 bg-sheed-pink py-4 rounded-full items-center"
                activeOpacity={0.7}
              >
                <Text className="text-white font-semibold">
                  {isAccepting ? '...' : 'Accepter 💕'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Sheedé View - Waiting for other */}
      {isSheede && hasResponded && status === 'pending' && (
        <View className="px-4 mb-6">
          <View className="bg-gray-800/50 rounded-2xl p-6">
            {(isFirstSheede ? sheed.sheede_1_accepted : sheed.sheede_2_accepted) ? (
              <>
                <Text className="text-white font-semibold text-center mb-2">
                  Tu as accepté ! 🎉
                </Text>
                <Text className="text-gray-400 text-center text-sm">
                  En attente de la réponse de l'autre personne...
                </Text>
              </>
            ) : (
              <>
                <Text className="text-gray-400 font-semibold text-center mb-2">
                  Tu as décliné ce sheed
                </Text>
                <Text className="text-gray-500 text-center text-sm">
                  Pas de souci, il y en aura d'autres !
                </Text>
              </>
            )}
          </View>
        </View>
      )}

      {/* Sheedé View - Active (both accepted) */}
      {isSheede && status === 'active' && (
        <View className="px-4 mb-6">
          <Text className="text-white font-semibold mb-3">Conversations</Text>

          {/* Chat with sheeder */}
          <ChatLinkCard
            title={`Chat avec ${sheed.sheeder?.display_name || 'Sheeder'}`}
            subtitle="Votre intermédiaire"
            onPress={() => handleChatPress(isFirstSheede ? 'sheeder_sheede_1' : 'sheeder_sheede_2')}
          />

          {/* Chat with other sheedé */}
          <ChatLinkCard
            title={`Chat avec ${otherSheede?.display_name || 'L\'autre'}`}
            subtitle="Faites connaissance ! 💬"
            onPress={() => handleChatPress('sheede_sheede')}
          />
        </View>
      )}

      {/* Message Progress (if active) */}
      {isActive && sheed.message_count !== null && (
        <View className="px-4 mb-6">
          <Text className="text-white font-semibold mb-2">Progression</Text>
          <View className="bg-gray-800 rounded-xl p-4">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-400">Messages échangés</Text>
              <Text className="text-white font-semibold">
                {sheed.message_count}/50
              </Text>
            </View>
            <View className="bg-gray-700 rounded-full h-2">
              <View
                className="bg-gradient-to-r from-sheed-pink to-sheed-purple h-2 rounded-full"
                style={{ width: `${Math.min((sheed.message_count / 50) * 100, 100)}%` }}
              />
            </View>
            <Text className="text-gray-500 text-xs mt-2">
              50 messages = Match confirmé ! 💕
            </Text>
          </View>
        </View>
      )}

      {/* Expiry Warning */}
      {status === 'pending' && sheed.expires_at && (
        <View className="px-4 mb-6">
          <View className="bg-yellow-500/10 rounded-xl p-4">
            <Text className="text-yellow-500 text-sm">
              ⏰ Ce sheed expire le{' '}
              {new Date(sheed.expires_at).toLocaleDateString('fr-FR')}
            </Text>
          </View>
        </View>
      )}

      {/* Bottom spacing */}
      <View className="h-8" />
    </ScrollView>
  );
}
