// Barrel export for lib utilities
export { supabase } from './supabase';
export {
  syncContacts,
  syncSingleContact,
  getSyncedContacts,
  clearSyncedContacts,
  type SyncResult,
} from './contactsSync';
export {
  matchContacts,
  matchSingleContact,
  getMatchedContacts,
  getUnmatchedContacts,
  type MatchResult,
} from './contactsMatch';
export {
  registerForPushNotifications,
  configureNotificationHandler,
  setupAndroidChannel,
  requestPermissionsAsync,
  getExpoPushTokenAsync,
  storePushToken,
  addNotificationResponseListener,
  addNotificationReceivedListener,
  getNotificationData,
  handleNotificationNavigation,
  removePushToken,
  type NotificationData,
  type NotificationResponseHandler,
} from './notifications';
export {
  usePressAnimation,
  useHeartBounce,
  usePulse,
  useFade,
  useSlide,
  useShake,
  useSuccessAnimation,
  useConfetti,
  AnimationPresets,
} from './animations';
