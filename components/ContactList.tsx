/**
 * @file ContactList component
 * @description List of contacts with search and selection support
 */

import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  ListRenderItem,
} from 'react-native';
import type { FormattedContact } from '@/hooks/useContacts';

// Props for ContactItem subcomponent
interface ContactItemProps {
  contact: FormattedContact;
  selected?: boolean;
  onPress?: (contact: FormattedContact) => void;
  showCheckmark?: boolean;
}

// ContactItem subcomponent
function ContactItem({ contact, selected, onPress, showCheckmark }: ContactItemProps) {
  const handlePress = useCallback(() => {
    onPress?.(contact);
  }, [contact, onPress]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex-row items-center py-3 px-4 border-b border-gray-800"
      activeOpacity={0.7}
    >
      {/* Avatar or placeholder */}
      {contact.imageUri ? (
        <Image
          source={{ uri: contact.imageUri }}
          className="w-12 h-12 rounded-full bg-gray-700"
        />
      ) : (
        <View className="w-12 h-12 rounded-full bg-gradient-to-br from-sheed-pink to-sheed-purple items-center justify-center">
          <Text className="text-white text-lg font-bold">
            {contact.name.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}

      {/* Contact info */}
      <View className="flex-1 ml-3">
        <Text className="text-white font-semibold text-base">{contact.name}</Text>
        {contact.phoneNumbers[0] && (
          <Text className="text-gray-400 text-sm">{contact.phoneNumbers[0]}</Text>
        )}
        {!contact.phoneNumbers[0] && contact.emails[0] && (
          <Text className="text-gray-400 text-sm">{contact.emails[0]}</Text>
        )}
      </View>

      {/* Checkmark for selection mode */}
      {showCheckmark && (
        <View
          className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
            selected
              ? 'bg-sheed-pink border-sheed-pink'
              : 'border-gray-500'
          }`}
        >
          {selected && (
            <Text className="text-white text-sm">✓</Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

// Props for ContactList component
interface ContactListProps {
  contacts: FormattedContact[];
  onSelect?: (contact: FormattedContact) => void;
  selectedIds?: Set<string>;
  selectionMode?: boolean;
  maxSelection?: number;
  emptyMessage?: string;
  searchPlaceholder?: string;
  showSearch?: boolean;
  ListHeaderComponent?: React.ReactElement | null;
}

// Main ContactList component
export function ContactList({
  contacts,
  onSelect,
  selectedIds = new Set(),
  selectionMode = false,
  maxSelection,
  emptyMessage = 'No contacts found',
  searchPlaceholder = 'Search contacts...',
  showSearch = true,
  ListHeaderComponent,
}: ContactListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter contacts by search query
  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) {
      return contacts;
    }

    const query = searchQuery.toLowerCase();
    return contacts.filter((contact) => {
      const nameMatch = contact.name.toLowerCase().includes(query);
      const phoneMatch = contact.phoneNumbers.some((p) => p.includes(query));
      const emailMatch = contact.emails.some((e) => e.includes(query));
      return nameMatch || phoneMatch || emailMatch;
    });
  }, [contacts, searchQuery]);

  // Handle contact selection
  const handleSelect = useCallback(
    (contact: FormattedContact) => {
      if (maxSelection && selectedIds.size >= maxSelection && !selectedIds.has(contact.id)) {
        // At max selection and this contact is not selected
        return;
      }
      onSelect?.(contact);
    },
    [onSelect, selectedIds, maxSelection]
  );

  // Render individual contact item
  const renderItem: ListRenderItem<FormattedContact> = useCallback(
    ({ item }) => (
      <ContactItem
        contact={item}
        selected={selectedIds.has(item.id)}
        onPress={handleSelect}
        showCheckmark={selectionMode}
      />
    ),
    [selectedIds, handleSelect, selectionMode]
  );

  // Key extractor for FlatList
  const keyExtractor = useCallback((item: FormattedContact) => item.id, []);

  // Empty state component
  const ListEmptyComponent = useCallback(
    () => (
      <View className="flex-1 items-center justify-center py-20">
        <Text className="text-gray-500 text-base">{emptyMessage}</Text>
      </View>
    ),
    [emptyMessage]
  );

  // Search header component
  const SearchHeader = showSearch ? (
    <View className="px-4 py-3 border-b border-gray-800">
      <View className="bg-gray-800 rounded-lg px-4 py-2 flex-row items-center">
        <Text className="text-gray-400 mr-2">🔍</Text>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={searchPlaceholder}
          placeholderTextColor="#6B7280"
          className="flex-1 text-white text-base"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text className="text-gray-400 ml-2">✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  ) : null;

  // Combine headers
  const CombinedHeader = (
    <>
      {ListHeaderComponent}
      {SearchHeader}
    </>
  );

  return (
    <View className="flex-1 bg-sheed-dark">
      <FlatList
        data={filteredContacts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={CombinedHeader}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={10}
      />
    </View>
  );
}

// Export ContactItem for potential reuse
export { ContactItem };
