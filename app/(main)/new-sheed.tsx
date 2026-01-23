/**
 * @file New Sheed screen
 * @description Modal for creating a new sheed by selecting two contacts
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { ContactList } from '@/components/ContactList';
import { useContacts, type Contact } from '@/hooks/useContacts';
import { useSheeds } from '@/hooks/useSheeds';
import { useAuthStore } from '@/stores/authStore';

// Contact slot component
interface ContactSlotProps {
  label: string;
  contact: Contact | null;
  onPress: () => void;
  onClear?: () => void;
}

function ContactSlot({ label, contact, onPress, onClear }: ContactSlotProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 bg-gray-800 rounded-2xl p-4 items-center justify-center min-h-32"
      activeOpacity={0.7}
    >
      {contact ? (
        <View className="items-center">
          <View className="w-16 h-16 rounded-full bg-gradient-to-br from-sheed-pink to-sheed-purple items-center justify-center mb-2">
            <Text className="text-white text-2xl font-bold">
              {contact.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text className="text-white font-semibold" numberOfLines={1}>
            {contact.name}
          </Text>
          {onClear && (
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation?.();
                onClear();
              }}
              className="mt-2"
            >
              <Text className="text-gray-400 text-sm">Modifier</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View className="items-center">
          <View className="w-16 h-16 rounded-full bg-gray-700 border-2 border-dashed border-gray-500 items-center justify-center mb-2">
            <Text className="text-gray-400 text-2xl">+</Text>
          </View>
          <Text className="text-gray-400">{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function NewSheedScreen() {
  const { contacts, isLoading, hasPermission } = useContacts();
  const user = useAuthStore((state) => state.user);
  const { createSheedAsync, isCreating } = useSheeds(user?.id);

  // State for selected contacts
  const [selectedContact1, setSelectedContact1] = useState<Contact | null>(null);
  const [selectedContact2, setSelectedContact2] = useState<Contact | null>(null);
  const [introMessage, setIntroMessage] = useState('');
  const [activeSlot, setActiveSlot] = useState<1 | 2 | null>(null);

  // Filter out already selected contacts
  const availableContacts = useMemo(() => {
    const selectedIds = new Set<string>();
    if (selectedContact1) selectedIds.add(selectedContact1.id);
    if (selectedContact2) selectedIds.add(selectedContact2.id);
    return contacts.filter((c) => !selectedIds.has(c.id));
  }, [contacts, selectedContact1, selectedContact2]);

  // Handle contact selection from modal
  const handleContactSelect = useCallback((contact: Contact) => {
    if (activeSlot === 1) {
      setSelectedContact1(contact);
    } else if (activeSlot === 2) {
      setSelectedContact2(contact);
    }
    setActiveSlot(null);
  }, [activeSlot]);

  // Handle slot press
  const handleSlot1Press = useCallback(() => setActiveSlot(1), []);
  const handleSlot2Press = useCallback(() => setActiveSlot(2), []);

  // Clear selected contacts
  const clearContact1 = useCallback(() => setSelectedContact1(null), []);
  const clearContact2 = useCallback(() => setSelectedContact2(null), []);

  // Close modal
  const handleCloseModal = useCallback(() => setActiveSlot(null), []);

  // Validate form
  const canSubmit = selectedContact1 && selectedContact2 && introMessage.trim().length > 0;

  // Submit sheed
  const handleSubmit = useCallback(async () => {
    if (!canSubmit || !selectedContact1 || !selectedContact2) return;

    try {
      // Call createSheed via Edge Function
      const result = await createSheedAsync({
        sheede_1_id: selectedContact1.id,
        sheede_2_id: selectedContact2.id,
        intro_message: introMessage.trim(),
      });

      if (result.success) {
        Alert.alert(
          '💘 Sheed créé !',
          `Tu as sheedé ${selectedContact1.name} et ${selectedContact2.name} !`,
          [
            {
              text: 'Super !',
              onPress: () => router.back(),
            },
          ]
        );
      } else {
        Alert.alert('Erreur', result.error || 'Impossible de créer le sheed.');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de créer le sheed. Réessaie plus tard.');
    }
  }, [canSubmit, selectedContact1, selectedContact2, introMessage, createSheedAsync]);

  // Handle close/cancel
  const handleClose = useCallback(() => {
    router.back();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-sheed-dark"
    >
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-12 pb-4">
          <TouchableOpacity onPress={handleClose}>
            <Text className="text-sheed-pink text-base">Annuler</Text>
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">Nouveau Sheed</Text>
          <View className="w-16" />
        </View>

        {/* Description */}
        <View className="px-4 mb-6">
          <Text className="text-gray-400 text-center">
            Choisis deux contacts à présenter l'un à l'autre 💕
          </Text>
        </View>

        {/* Contact slots */}
        <View className="px-4 mb-6">
          <View className="flex-row gap-4">
            <ContactSlot
              label="Contact 1"
              contact={selectedContact1}
              onPress={handleSlot1Press}
              onClear={selectedContact1 ? clearContact1 : undefined}
            />
            <View className="justify-center">
              <View className="w-10 h-10 rounded-full bg-sheed-pink items-center justify-center">
                <Text className="text-white text-lg">💕</Text>
              </View>
            </View>
            <ContactSlot
              label="Contact 2"
              contact={selectedContact2}
              onPress={handleSlot2Press}
              onClear={selectedContact2 ? clearContact2 : undefined}
            />
          </View>
        </View>

        {/* Intro message */}
        <View className="px-4 mb-6">
          <Text className="text-white font-semibold mb-2">Message d'intro</Text>
          <Text className="text-gray-400 text-sm mb-3">
            Ce message sera envoyé aux deux personnes pour les présenter
          </Text>
          <TextInput
            value={introMessage}
            onChangeText={setIntroMessage}
            placeholder="Ex: Je pense que vous devriez vous rencontrer... 😉"
            placeholderTextColor="#6B7280"
            multiline
            numberOfLines={4}
            maxLength={200}
            className="bg-gray-800 rounded-xl p-4 text-white text-base min-h-24"
            style={{ textAlignVertical: 'top' }}
          />
          <Text className="text-gray-500 text-right text-sm mt-1">
            {introMessage.length}/200
          </Text>
        </View>

        {/* Info box */}
        <View className="mx-4 mb-6 bg-gray-800/50 rounded-xl p-4">
          <Text className="text-gray-400 text-sm">
            🔒 Les deux personnes recevront une notification et devront accepter avant de pouvoir discuter entre elles.
          </Text>
        </View>
      </ScrollView>

      {/* Submit button */}
      <View className="px-4 pb-8 pt-4">
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!canSubmit || isCreating}
          className={`py-4 rounded-full items-center ${
            canSubmit && !isCreating
              ? 'bg-gradient-to-r from-sheed-pink to-sheed-purple'
              : 'bg-gray-700'
          }`}
          activeOpacity={0.8}
        >
          <Text
            className={`font-bold text-lg ${
              canSubmit && !isCreating ? 'text-white' : 'text-gray-500'
            }`}
          >
            {isCreating ? 'Création...' : 'Sheed les ! 💘'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contact selection modal */}
      <Modal
        visible={activeSlot !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCloseModal}
      >
        <View className="flex-1 bg-sheed-dark">
          {/* Modal header */}
          <View className="flex-row items-center justify-between px-4 pt-12 pb-4 border-b border-gray-800">
            <TouchableOpacity onPress={handleCloseModal}>
              <Text className="text-sheed-pink text-base">Annuler</Text>
            </TouchableOpacity>
            <Text className="text-white text-lg font-bold">
              Choisir Contact {activeSlot}
            </Text>
            <View className="w-16" />
          </View>

          {/* Contact list */}
          {hasPermission === false ? (
            <View className="flex-1 items-center justify-center px-8">
              <Text className="text-gray-400 text-center">
                Accorde l'accès à tes contacts pour créer un Sheed
              </Text>
            </View>
          ) : isLoading ? (
            <View className="flex-1 items-center justify-center">
              <Text className="text-gray-400">Chargement...</Text>
            </View>
          ) : (
            <ContactList
              contacts={availableContacts}
              onSelect={handleContactSelect}
              showSearch={true}
              emptyMessage="Aucun contact disponible"
            />
          )}
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
