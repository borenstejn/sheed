/**
 * @file Profile screen
 * @description User profile with stats and settings
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';

/**
 * Avatar component for profile
 */
interface AvatarProps {
  uri?: string | null;
  name?: string;
  size?: number;
}

function Avatar({ uri, name, size = 100 }: AvatarProps) {
  if (uri) {
    return (
      <Image
        source={{ uri }}
        className="rounded-full"
        style={{ width: size, height: size }}
      />
    );
  }

  const initial = (name || 'U').charAt(0).toUpperCase();

  return (
    <View
      className="bg-gradient-to-br from-sheed-pink to-sheed-purple rounded-full items-center justify-center"
      style={{ width: size, height: size, backgroundColor: '#FF1493' }}
    >
      <Text className="text-white font-bold" style={{ fontSize: size * 0.4 }}>
        {initial}
      </Text>
    </View>
  );
}

/**
 * Stat card component
 */
interface StatCardProps {
  label: string;
  value: number | string;
  isPercentage?: boolean;
}

function StatCard({ label, value, isPercentage }: StatCardProps) {
  return (
    <View className="flex-1 bg-gray-800/50 rounded-2xl p-4 mx-1 items-center border border-gray-700/50">
      <Text className="text-3xl font-bold text-white">
        {value}
        {isPercentage && <Text className="text-xl">%</Text>}
      </Text>
      <Text className="text-gray-400 text-sm mt-1 text-center">{label}</Text>
    </View>
  );
}

/**
 * Settings row component
 */
interface SettingsRowProps {
  label: string;
  onPress: () => void;
  icon?: string;
}

function SettingsRow({ label, onPress, icon }: SettingsRowProps) {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-between py-4 px-4 border-b border-gray-800"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center">
        {icon && <Text className="mr-3 text-lg">{icon}</Text>}
        <Text className="text-white text-base">{label}</Text>
      </View>
      <Text className="text-gray-500">→</Text>
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);

  // Fetch user stats from database
  const { data: stats, isLoading } = useQuery({
    queryKey: ['userStats', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const { data, error } = await supabase
        .from('users')
        .select('total_sheeds_created, total_sheeds_received, successful_sheeds')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  // Navigate to settings
  const handleSettingsPress = () => {
    router.push('/settings');
  };

  // Calculate success rate
  const totalCreated = stats?.total_sheeds_created || 0;
  const successfulSheeds = stats?.successful_sheeds || 0;
  const successRate = totalCreated > 0
    ? Math.round((successfulSheeds / totalCreated) * 100)
    : 0;

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
    <ScrollView className="flex-1 bg-sheed-dark">
      {/* Header with Avatar */}
      <View className="items-center pt-16 pb-8 px-4">
        <Avatar
          uri={user?.user_metadata?.avatar_url}
          name={user?.user_metadata?.display_name || user?.user_metadata?.full_name || user?.email}
          size={100}
        />
        <Text className="text-white text-2xl font-bold mt-4">
          {user?.user_metadata?.display_name || user?.user_metadata?.full_name || 'Utilisateur'}
        </Text>
        {user?.email && (
          <Text className="text-gray-400 text-sm mt-1">{user.email}</Text>
        )}
      </View>

      {/* Stats Cards */}
      <View className="px-4 mb-8">
        <Text className="text-white font-semibold text-lg mb-4">Mes Stats</Text>
        <View className="flex-row">
          <StatCard
            label="Sheeds lancés"
            value={totalCreated}
          />
          <StatCard
            label="Sheeds réussis"
            value={successfulSheeds}
          />
          <StatCard
            label="Taux de succès"
            value={successRate}
            isPercentage
          />
        </View>
      </View>

      {/* Settings Section */}
      <View className="px-4 mb-8">
        <Text className="text-white font-semibold text-lg mb-4">Paramètres</Text>
        <View className="bg-gray-800/30 rounded-2xl overflow-hidden">
          <SettingsRow
            icon="⚙️"
            label="Paramètres"
            onPress={handleSettingsPress}
          />
          <SettingsRow
            icon="🔔"
            label="Notifications"
            onPress={() => router.push('/settings')}
          />
          <SettingsRow
            icon="🚫"
            label="Comptes bloqués"
            onPress={() => router.push('/settings')}
          />
          <SettingsRow
            icon="❓"
            label="Aide & Support"
            onPress={() => router.push('/settings')}
          />
        </View>
      </View>

      {/* Version info */}
      <View className="items-center pb-8">
        <Text className="text-gray-600 text-xs">SHEED v1.0.0</Text>
      </View>
    </ScrollView>
  );
}
