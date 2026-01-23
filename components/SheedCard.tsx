/**
 * @file SheedCard component
 * @description Card displaying a sheed with avatar pair, status, and message progress
 */

import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import type { SheedStatus } from '@/types/database.types';

// Sheed data for display
export interface SheedCardData {
  id: string;
  sheede1: {
    name: string;
    avatarUrl?: string;
  };
  sheede2: {
    name: string;
    avatarUrl?: string;
  };
  sheeder?: {
    name: string;
    avatarUrl?: string;
  };
  status: SheedStatus;
  messageCount: number;
  introMessage: string;
  createdAt: string;
  expiresAt?: string;
}

// Props for SheedCard
interface SheedCardProps {
  sheed: SheedCardData;
  onPress?: (sheed: SheedCardData) => void;
  showSheeder?: boolean;
}

// Status badge colors and labels
const statusConfig: Record<SheedStatus, { color: string; label: string; emoji: string }> = {
  pending: { color: 'bg-yellow-500', label: 'En attente', emoji: '⏳' },
  active: { color: 'bg-green-500', label: 'Actif', emoji: '💬' },
  success: { color: 'bg-sheed-pink', label: 'Succès', emoji: '💘' },
  expired: { color: 'bg-gray-500', label: 'Expiré', emoji: '⌛' },
  declined: { color: 'bg-red-500', label: 'Refusé', emoji: '❌' },
};

// Message threshold for "success" (from PRD)
const MESSAGE_THRESHOLD = 50;

// Avatar component for consistent styling
interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: 'small' | 'medium' | 'large';
}

function Avatar({ name, imageUrl, size = 'medium' }: AvatarProps) {
  const sizeClasses = {
    small: 'w-8 h-8 text-xs',
    medium: 'w-12 h-12 text-base',
    large: 'w-16 h-16 text-xl',
  };

  const initial = name.charAt(0).toUpperCase();

  if (imageUrl) {
    return (
      <Image
        source={{ uri: imageUrl }}
        className={`${sizeClasses[size].split(' ').slice(0, 2).join(' ')} rounded-full bg-gray-700`}
      />
    );
  }

  return (
    <View
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-sheed-pink to-sheed-purple items-center justify-center`}
    >
      <Text className={`text-white font-bold ${sizeClasses[size].split(' ')[2]}`}>
        {initial}
      </Text>
    </View>
  );
}

// Avatar pair showing two sheedés
interface AvatarPairProps {
  sheede1: { name: string; avatarUrl?: string };
  sheede2: { name: string; avatarUrl?: string };
}

function AvatarPair({ sheede1, sheede2 }: AvatarPairProps) {
  return (
    <View className="flex-row items-center">
      <Avatar name={sheede1.name} imageUrl={sheede1.avatarUrl} />
      <View className="w-8 h-8 rounded-full bg-sheed-dark items-center justify-center -ml-3 z-10 border-2 border-gray-800">
        <Text className="text-sheed-pink text-sm">💕</Text>
      </View>
      <Avatar name={sheede2.name} imageUrl={sheede2.avatarUrl} />
    </View>
  );
}

// Status badge component
interface StatusBadgeProps {
  status: SheedStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <View className={`${config.color} px-2 py-1 rounded-full flex-row items-center`}>
      <Text className="text-xs mr-1">{config.emoji}</Text>
      <Text className="text-white text-xs font-medium">{config.label}</Text>
    </View>
  );
}

// Message progress bar
interface MessageProgressProps {
  messageCount: number;
  threshold?: number;
}

function MessageProgress({ messageCount, threshold = MESSAGE_THRESHOLD }: MessageProgressProps) {
  const progress = Math.min((messageCount / threshold) * 100, 100);
  const isComplete = messageCount >= threshold;

  return (
    <View className="mt-3">
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-gray-400 text-xs">Messages</Text>
        <Text className={`text-xs font-medium ${isComplete ? 'text-sheed-pink' : 'text-gray-400'}`}>
          {messageCount}/{threshold}
        </Text>
      </View>
      <View className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <View
          className={`h-full rounded-full ${isComplete ? 'bg-sheed-pink' : 'bg-sheed-purple'}`}
          style={{ width: `${progress}%` }}
        />
      </View>
    </View>
  );
}

// Main SheedCard component
export function SheedCard({ sheed, onPress, showSheeder = false }: SheedCardProps) {
  const handlePress = useCallback(() => {
    onPress?.(sheed);
  }, [sheed, onPress]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      className="mx-4 mb-3"
    >
      {/* Glassmorphism card with gradient border */}
      <View className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50">
        {/* Header row: Avatars + Status */}
        <View className="flex-row items-center justify-between">
          <AvatarPair sheede1={sheed.sheede1} sheede2={sheed.sheede2} />
          <StatusBadge status={sheed.status} />
        </View>

        {/* Names */}
        <View className="mt-3">
          <Text className="text-white font-semibold text-base">
            {sheed.sheede1.name} × {sheed.sheede2.name}
          </Text>
          {showSheeder && sheed.sheeder && (
            <Text className="text-gray-400 text-sm mt-1">
              Par {sheed.sheeder.name}
            </Text>
          )}
        </View>

        {/* Intro message preview */}
        <Text className="text-gray-400 text-sm mt-2" numberOfLines={2}>
          "{sheed.introMessage}"
        </Text>

        {/* Message progress (only for active sheeds) */}
        {(sheed.status === 'active' || sheed.status === 'success') && (
          <MessageProgress messageCount={sheed.messageCount} />
        )}

        {/* Expiry warning for active sheeds */}
        {sheed.status === 'active' && sheed.expiresAt && (
          <View className="mt-3 flex-row items-center">
            <Text className="text-yellow-500 text-xs">⏰</Text>
            <Text className="text-gray-400 text-xs ml-1">
              Expire le {new Date(sheed.expiresAt).toLocaleDateString('fr-FR')}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
