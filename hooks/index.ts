// Barrel export for hooks
export { QueryProvider } from './useQueryClient';
export { useAuth } from './useAuth';
export { useContacts, type Contact } from './useContacts';
export {
  useSheeds,
  useSheed,
  type CreateSheedInput,
  type CreateSheedResponse,
  type SheedWithUsers,
} from './useSheeds';
export {
  useMessages,
  type MessageWithSender,
  type UseMessagesReturn,
} from './useMessages';
export {
  useUserStats,
  type UserStats,
  type UseUserStatsReturn,
} from './useUserStats';
