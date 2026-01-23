/**
 * @file Settings screen
 * @description User settings with notifications, blocked accounts, help, logout
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Linking,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/hooks';
import { useAuthStore } from '@/stores/authStore';

/**
 * Settings section header component
 */
interface SectionHeaderProps {
  title: string;
}

function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <Text className="text-gray-400 text-sm font-semibold uppercase tracking-wide px-4 py-2 mt-4">
      {title}
    </Text>
  );
}

/**
 * Settings row with toggle switch
 */
interface ToggleRowProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  icon?: string;
}

function ToggleRow({ label, value, onValueChange, icon }: ToggleRowProps) {
  return (
    <View className="flex-row items-center justify-between py-4 px-4 bg-gray-800/30 border-b border-gray-800">
      <View className="flex-row items-center flex-1">
        {icon && <Text className="mr-3 text-lg">{icon}</Text>}
        <Text className="text-white text-base">{label}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#3A3A3C', true: '#FF1493' }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

/**
 * Settings row with navigation
 */
interface SettingsRowProps {
  label: string;
  onPress: () => void;
  icon?: string;
  textColor?: string;
}

function SettingsRow({ label, onPress, icon, textColor }: SettingsRowProps) {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-between py-4 px-4 bg-gray-800/30 border-b border-gray-800"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center">
        {icon && <Text className="mr-3 text-lg">{icon}</Text>}
        <Text className={`text-base ${textColor || 'text-white'}`}>{label}</Text>
      </View>
      <Text className="text-gray-500">→</Text>
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const { signOut } = useAuth();
  const user = useAuthStore((state) => state.user);

  // Local settings state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [newSheedNotifications, setNewSheedNotifications] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(true);

  // Handle back navigation
  const handleBack = () => {
    router.back();
  };

  // Handle logout
  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Es-tu sûr(e) de vouloir te déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  // Handle blocked accounts
  const handleBlockedAccounts = () => {
    Alert.alert('Comptes bloqués', 'Aucun compte bloqué pour le moment.');
  };

  // Handle help
  const handleHelp = () => {
    Linking.openURL('mailto:support@sheed.app?subject=Aide SHEED');
  };

  // Handle privacy policy
  const handlePrivacyPolicy = () => {
    Linking.openURL('https://sheed.app/privacy');
  };

  // Handle terms
  const handleTerms = () => {
    Linking.openURL('https://sheed.app/terms');
  };

  return (
    <View className="flex-1 bg-sheed-dark">
      {/* Header */}
      <View className="flex-row items-center px-4 pt-12 pb-4 border-b border-gray-800">
        <TouchableOpacity onPress={handleBack} className="p-2 -ml-2 mr-2">
          <Text className="text-sheed-pink text-lg">← Retour</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold flex-1 text-center mr-10">
          Paramètres
        </Text>
      </View>

      <ScrollView className="flex-1">
        {/* Notifications Section */}
        <SectionHeader title="Notifications" />
        <View className="rounded-2xl overflow-hidden mx-4">
          <ToggleRow
            icon="🔔"
            label="Notifications activées"
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
          <ToggleRow
            icon="💕"
            label="Nouveaux Sheeds"
            value={newSheedNotifications}
            onValueChange={setNewSheedNotifications}
          />
          <ToggleRow
            icon="💬"
            label="Messages"
            value={messageNotifications}
            onValueChange={setMessageNotifications}
          />
        </View>

        {/* Account Section */}
        <SectionHeader title="Compte" />
        <View className="rounded-2xl overflow-hidden mx-4">
          <SettingsRow
            icon="🚫"
            label="Comptes bloqués"
            onPress={handleBlockedAccounts}
          />
        </View>

        {/* Support Section */}
        <SectionHeader title="Support" />
        <View className="rounded-2xl overflow-hidden mx-4">
          <SettingsRow
            icon="❓"
            label="Aide & Support"
            onPress={handleHelp}
          />
          <SettingsRow
            icon="📜"
            label="Politique de confidentialité"
            onPress={handlePrivacyPolicy}
          />
          <SettingsRow
            icon="📋"
            label="Conditions d'utilisation"
            onPress={handleTerms}
          />
        </View>

        {/* Logout Section */}
        <View className="mt-8 mx-4">
          <TouchableOpacity
            className="bg-red-500/20 rounded-2xl py-4 items-center"
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Text className="text-red-500 font-semibold text-base">
              Se déconnecter
            </Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View className="items-center py-8">
          <Text className="text-gray-600 text-sm">
            {user?.email}
          </Text>
          <Text className="text-gray-700 text-xs mt-1">
            SHEED v1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
