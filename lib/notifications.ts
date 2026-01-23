/**
 * @file Push notification configuration
 * @description Expo Push Notifications setup, permissions, token storage
 */

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { supabase } from './supabase';

/**
 * Notification data interface
 */
export interface NotificationData {
  type: 'new_sheed' | 'sheed_accepted' | 'sheed_declined' | 'new_message' | 'sheed_expired' | 'sheed_success';
  sheedId?: string;
  chatroomId?: string;
  senderId?: string;
  title?: string;
  body?: string;
}

/**
 * Push notification response handler
 */
export type NotificationResponseHandler = (
  response: Notifications.NotificationResponse
) => void;

/**
 * Configure notification handler for foreground notifications
 * Must be called at app startup
 */
export function configureNotificationHandler(): void {
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

/**
 * Setup Android notification channel
 * Required for Android 8.0+ (API 26+)
 */
export async function setupAndroidChannel(): Promise<void> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'SHEED Notifications',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF1493',
    });
  }
}

/**
 * Request notification permissions
 * @returns Whether permissions were granted
 */
export async function requestPermissionsAsync(): Promise<boolean> {
  if (!Device.isDevice) {
    console.log('Push notifications require a physical device');
    return false;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
}

/**
 * Get Expo push token
 * @returns Push token string or null if unavailable
 */
export async function getExpoPushTokenAsync(): Promise<string | null> {
  try {
    const token = await Notifications.getExpoPushTokenAsync({
      projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    });
    return token.data;
  } catch (error) {
    console.error('Error getting push token:', error);
    return null;
  }
}

/**
 * Store push token in Supabase users table
 * @param userId - User ID to update
 * @param pushToken - Push token to store
 */
export async function storePushToken(
  userId: string,
  pushToken: string
): Promise<boolean> {
  const { error } = await supabase
    .from('users')
    .update({ push_token: pushToken })
    .eq('id', userId);

  if (error) {
    console.error('Error storing push token:', error);
    return false;
  }

  return true;
}

/**
 * Register for push notifications
 * Requests permissions, gets token, stores in Supabase
 * @param userId - User ID to associate token with
 * @returns Push token if successful, null otherwise
 */
export async function registerForPushNotifications(
  userId: string
): Promise<string | null> {
  // Configure handler
  configureNotificationHandler();

  // Setup Android channel
  await setupAndroidChannel();

  // Request permissions
  const hasPermission = await requestPermissionsAsync();
  if (!hasPermission) {
    console.log('Notification permission not granted');
    return null;
  }

  // Get push token
  const pushToken = await getExpoPushTokenAsync();
  if (!pushToken) {
    console.log('Could not get push token');
    return null;
  }

  // Store in Supabase
  const stored = await storePushToken(userId, pushToken);
  if (!stored) {
    console.log('Could not store push token');
    return null;
  }

  return pushToken;
}

/**
 * Add notification response listener
 * Called when user taps on a notification
 * @param handler - Handler function for notification response
 * @returns Subscription to remove listener
 */
export function addNotificationResponseListener(
  handler: NotificationResponseHandler
): Notifications.Subscription {
  return Notifications.addNotificationResponseReceivedListener(handler);
}

/**
 * Add notification received listener
 * Called when notification is received while app is foregrounded
 * @param handler - Handler function for received notification
 * @returns Subscription to remove listener
 */
export function addNotificationReceivedListener(
  handler: (notification: Notifications.Notification) => void
): Notifications.Subscription {
  return Notifications.addNotificationReceivedListener(handler);
}

/**
 * Get notification data from response
 * @param response - Notification response
 * @returns Parsed notification data
 */
export function getNotificationData(
  response: Notifications.NotificationResponse
): NotificationData | null {
  const data = response.notification.request.content.data;
  if (!data) return null;

  return {
    type: data.type as NotificationData['type'],
    sheedId: data.sheedId as string | undefined,
    chatroomId: data.chatroomId as string | undefined,
    senderId: data.senderId as string | undefined,
    title: data.title as string | undefined,
    body: data.body as string | undefined,
  };
}

/**
 * Handle notification navigation
 * Navigate to appropriate screen based on notification data
 * @param data - Notification data
 * @param navigate - Navigation function
 */
export function handleNotificationNavigation(
  data: NotificationData,
  navigate: (path: string) => void
): void {
  switch (data.type) {
    case 'new_sheed':
    case 'sheed_accepted':
    case 'sheed_declined':
    case 'sheed_expired':
    case 'sheed_success':
      if (data.sheedId) {
        navigate(`/sheed/${data.sheedId}`);
      }
      break;
    case 'new_message':
      if (data.chatroomId) {
        navigate(`/chat/${data.chatroomId}`);
      }
      break;
    default:
      console.log('Unknown notification type:', data.type);
  }
}

/**
 * Remove push token from Supabase (on logout)
 * @param userId - User ID to clear token for
 */
export async function removePushToken(userId: string): Promise<void> {
  await supabase
    .from('users')
    .update({ push_token: null })
    .eq('id', userId);
}
