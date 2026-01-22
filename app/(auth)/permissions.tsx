import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, Platform } from 'react-native';
import { router } from 'expo-router';
import * as Contacts from 'expo-contacts';
import * as Notifications from 'expo-notifications';

interface PermissionState {
  contacts: boolean;
  notifications: boolean;
}

export default function PermissionsScreen() {
  const [permissions, setPermissions] = useState<PermissionState>({
    contacts: false,
    notifications: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const requestContactsPermission = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      const granted = status === 'granted';
      setPermissions((prev) => ({ ...prev, contacts: granted }));

      if (!granted) {
        Alert.alert(
          'Contacts Access Required',
          'SHEED needs access to your contacts to help you match your friends. You can enable this in Settings.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error requesting contacts permission:', error);
    }
  };

  const requestNotificationsPermission = async () => {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      const granted = finalStatus === 'granted';
      setPermissions((prev) => ({ ...prev, notifications: granted }));

      if (!granted) {
        Alert.alert(
          'Notifications',
          'Enable notifications to know when your sheeds accept or when matches happen!',
          [{ text: 'OK' }]
        );
      }

      // Configure notification handling
      if (granted) {
        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
            shouldShowBanner: true,
            shouldShowList: true,
          }),
        });
      }
    } catch (error) {
      console.error('Error requesting notifications permission:', error);
    }
  };

  const handleContinue = async () => {
    setIsLoading(true);

    // Request any missing permissions
    if (!permissions.contacts) {
      await requestContactsPermission();
    }
    if (!permissions.notifications) {
      await requestNotificationsPermission();
    }

    setIsLoading(false);

    // Navigate to main app regardless of permission status
    // Users can grant permissions later in settings
    router.replace('/(main)/(tabs)/sheeds');
  };

  const allPermissionsGranted = permissions.contacts && permissions.notifications;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.emoji}>🔐</Text>
        <Text style={styles.title}>Just a few permissions</Text>
        <Text style={styles.subtitle}>
          We need these to help you play matchmaker
        </Text>
      </View>

      {/* Permission cards */}
      <View style={styles.permissionsContainer}>
        {/* Contacts permission */}
        <Pressable
          style={[
            styles.permissionCard,
            permissions.contacts && styles.permissionGranted,
          ]}
          onPress={requestContactsPermission}
        >
          <View style={styles.permissionIcon}>
            <Text style={styles.permissionEmoji}>📇</Text>
          </View>
          <View style={styles.permissionContent}>
            <Text style={styles.permissionTitle}>Contacts</Text>
            <Text style={styles.permissionDescription}>
              Find friends who are already on SHEED
            </Text>
          </View>
          <View style={styles.permissionStatus}>
            <Text style={styles.statusIcon}>
              {permissions.contacts ? '✓' : '→'}
            </Text>
          </View>
        </Pressable>

        {/* Notifications permission */}
        <Pressable
          style={[
            styles.permissionCard,
            permissions.notifications && styles.permissionGranted,
          ]}
          onPress={requestNotificationsPermission}
        >
          <View style={styles.permissionIcon}>
            <Text style={styles.permissionEmoji}>🔔</Text>
          </View>
          <View style={styles.permissionContent}>
            <Text style={styles.permissionTitle}>Notifications</Text>
            <Text style={styles.permissionDescription}>
              Get notified when your sheeds accept
            </Text>
          </View>
          <View style={styles.permissionStatus}>
            <Text style={styles.statusIcon}>
              {permissions.notifications ? '✓' : '→'}
            </Text>
          </View>
        </Pressable>
      </View>

      {/* Continue button */}
      <View style={styles.footer}>
        <Pressable
          style={[
            styles.continueButton,
            allPermissionsGranted && styles.continueButtonActive,
          ]}
          onPress={handleContinue}
          disabled={isLoading}
        >
          <Text style={styles.continueText}>
            {allPermissionsGranted ? "Let's Sheed!" : 'Continue'}
          </Text>
        </Pressable>

        <Pressable onPress={() => router.replace('/(main)/(tabs)/sheeds')}>
          <Text style={styles.skipText}>Skip for now</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101012',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 48,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8A8A8E',
    textAlign: 'center',
  },
  permissionsContainer: {
    gap: 16,
  },
  permissionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  permissionGranted: {
    borderColor: '#00F5A0',
    backgroundColor: 'rgba(0, 245, 160, 0.1)',
  },
  permissionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#3A3A3C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  permissionEmoji: {
    fontSize: 24,
  },
  permissionContent: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  permissionDescription: {
    fontSize: 13,
    color: '#8A8A8E',
  },
  permissionStatus: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3A3A3C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusIcon: {
    fontSize: 16,
    color: '#00F5A0',
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 48,
    left: 24,
    right: 24,
    alignItems: 'center',
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#3A3A3C',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  continueButtonActive: {
    backgroundColor: '#FF3B7A',
    shadowColor: '#FF3B7A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  skipText: {
    color: '#8A8A8E',
    fontSize: 14,
  },
});
