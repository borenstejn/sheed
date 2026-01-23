/**
 * @file Sheeds list screen
 * @description Main screen showing user's sheeds with toggle between "Mes Sheeds" and "Sheedé(e)"
 */

import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { router } from 'expo-router';

// Tab types
type TabType = 'created' | 'received';

// Screen dimensions for animated pill
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_WIDTH = (SCREEN_WIDTH - 32) / 2;

// Empty state component for when no sheeds
interface EmptyStateProps {
  type: TabType;
  onCreateSheed?: () => void;
}

function EmptyState({ type, onCreateSheed }: EmptyStateProps) {
  const isCreated = type === 'created';

  return (
    <View className="flex-1 items-center justify-center py-20 px-8">
      <Text className="text-6xl mb-4">{isCreated ? '💘' : '💌'}</Text>
      <Text className="text-white text-xl font-bold text-center mb-2">
        {isCreated ? 'Aucun Sheed créé' : 'Pas encore sheedé(e)'}
      </Text>
      <Text className="text-gray-400 text-center mb-6">
        {isCreated
          ? 'Joue les cupidons ! Sheed deux de tes contacts et crée des étincelles 🔥'
          : 'Quand quelqu\'un te sheed, tu le verras ici ✨'}
      </Text>
      {isCreated && (
        <TouchableOpacity
          onPress={onCreateSheed}
          className="bg-gradient-to-r from-sheed-pink to-sheed-purple px-8 py-3 rounded-full"
          activeOpacity={0.8}
        >
          <Text className="text-white font-bold text-base">Créer mon premier Sheed</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// Tab toggle component with animated pill
interface TabToggleProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  pillPosition: Animated.Value;
}

function TabToggle({ activeTab, onTabChange, pillPosition }: TabToggleProps) {
  const handleTabPress = useCallback((tab: TabType) => {
    // Animate pill to new position
    Animated.spring(pillPosition, {
      toValue: tab === 'created' ? 0 : TAB_WIDTH,
      useNativeDriver: true,
      tension: 50,
      friction: 10,
    }).start();
    onTabChange(tab);
  }, [pillPosition, onTabChange]);

  return (
    <View className="mx-4 mt-4 mb-2">
      <View className="bg-gray-800 rounded-full p-1 flex-row relative">
        {/* Animated sliding pill */}
        <Animated.View
          className="absolute bg-sheed-pink rounded-full h-10 top-1"
          style={{
            width: TAB_WIDTH - 4,
            transform: [{ translateX: pillPosition }],
            left: 2,
          }}
        />

        {/* Tab buttons */}
        <TouchableOpacity
          onPress={() => handleTabPress('created')}
          className="flex-1 py-2 items-center justify-center z-10"
          activeOpacity={0.7}
        >
          <Text
            className={`font-semibold ${
              activeTab === 'created' ? 'text-white' : 'text-gray-400'
            }`}
          >
            Mes Sheeds
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleTabPress('received')}
          className="flex-1 py-2 items-center justify-center z-10"
          activeOpacity={0.7}
        >
          <Text
            className={`font-semibold ${
              activeTab === 'received' ? 'text-white' : 'text-gray-400'
            }`}
          >
            Sheedé(e)
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function SheedsScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('created');
  const [refreshing, setRefreshing] = useState(false);
  const pillPosition = useRef(new Animated.Value(0)).current;

  // TODO: Replace with actual data from useSheeds hook
  const createdSheeds: unknown[] = [];
  const receivedSheeds: unknown[] = [];

  const currentSheeds = activeTab === 'created' ? createdSheeds : receivedSheeds;

  // Handle creating a new sheed
  const handleCreateSheed = useCallback(() => {
    router.push('/(main)/new-sheed');
  }, []);

  // Handle pull-to-refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    // TODO: Refetch sheeds from useSheeds hook
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  // Render sheed item (placeholder until SheedCard is created)
  const renderItem = useCallback(({ item }: { item: unknown }) => {
    return (
      <View className="mx-4 mb-3 bg-gray-800/50 rounded-2xl p-4">
        <Text className="text-white">Sheed placeholder</Text>
      </View>
    );
  }, []);

  const keyExtractor = useCallback((item: unknown, index: number) => `sheed-${index}`, []);

  return (
    <View className="flex-1 bg-sheed-dark">
      {/* Header */}
      <View className="pt-12 pb-2 px-4">
        <Text className="text-white text-2xl font-bold">Sheeds</Text>
      </View>

      {/* Tab toggle */}
      <TabToggle
        activeTab={activeTab}
        onTabChange={setActiveTab}
        pillPosition={pillPosition}
      />

      {/* Sheed list */}
      {currentSheeds.length === 0 ? (
        <EmptyState type={activeTab} onCreateSheed={handleCreateSheed} />
      ) : (
        <FlatList
          data={currentSheeds}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#FF1493"
            />
          }
        />
      )}

      {/* FAB for creating new sheed */}
      {activeTab === 'created' && currentSheeds.length > 0 && (
        <TouchableOpacity
          onPress={handleCreateSheed}
          className="absolute bottom-24 right-4 w-14 h-14 bg-sheed-pink rounded-full items-center justify-center shadow-lg"
          activeOpacity={0.8}
        >
          <Text className="text-white text-2xl font-bold">+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
