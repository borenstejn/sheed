/**
 * @file useContacts hook
 * @description Hook for accessing and managing device contacts
 */

import { useState, useEffect, useCallback } from 'react';
import * as Contacts from 'expo-contacts';

export interface FormattedContact {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  phoneNumbers: string[];
  emails: string[];
  imageUri?: string;
}

// Re-export for convenience
export type Contact = FormattedContact;

interface UseContactsReturn {
  contacts: FormattedContact[];
  isLoading: boolean;
  hasPermission: boolean | null;
  error: Error | null;
  refetch: () => Promise<void>;
  requestPermission: () => Promise<boolean>;
}

// Normalize phone number for comparison (remove non-digits except +)
const normalizePhone = (phone: string): string => {
  return phone.replace(/[^\d+]/g, '');
};

// Format raw expo contact to our FormattedContact interface
// Note: getContactsAsync returns ExistingContact[] which includes the id field
const formatContact = (contact: Contacts.ExistingContact): FormattedContact | null => {
  const phoneNumbers = (contact.phoneNumbers || [])
    .map((p) => normalizePhone(p.number || ''))
    .filter((n) => n.length >= 7); // Filter out too-short numbers

  const emails = (contact.emails || [])
    .map((e) => e.email?.toLowerCase() || '')
    .filter((e) => e.includes('@'));

  return {
    id: contact.id,
    name: contact.name || `${contact.firstName || ''} ${contact.lastName || ''}`.trim() || 'Unknown',
    firstName: contact.firstName || undefined,
    lastName: contact.lastName || undefined,
    phoneNumbers,
    emails,
    imageUri: contact.imageAvailable ? contact.image?.uri : undefined,
  };
};

export function useContacts(): UseContactsReturn {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // Check and request permission
  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      const granted = status === 'granted';
      setHasPermission(granted);
      return granted;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to request permission'));
      return false;
    }
  }, []);

  // Fetch contacts from device
  const fetchContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Check permission first
      const { status } = await Contacts.getPermissionsAsync();
      const granted = status === 'granted';
      setHasPermission(granted);

      if (!granted) {
        setContacts([]);
        return;
      }

      // Fetch all contacts with necessary fields
      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.Name,
          Contacts.Fields.FirstName,
          Contacts.Fields.LastName,
          Contacts.Fields.PhoneNumbers,
          Contacts.Fields.Emails,
          Contacts.Fields.Image,
        ],
        sort: Contacts.SortTypes.FirstName,
      });

      // Format and filter contacts (must have at least phone or email)
      const formattedContacts = data
        .map(formatContact)
        .filter((c): c is Contact => c !== null && (c.phoneNumbers.length > 0 || c.emails.length > 0))
        .sort((a, b) => a.name.localeCompare(b.name));

      setContacts(formattedContacts);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch contacts'));
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // Refetch function for manual refresh
  const refetch = useCallback(async () => {
    await fetchContacts();
  }, [fetchContacts]);

  return {
    contacts,
    isLoading,
    hasPermission,
    error,
    refetch,
    requestPermission,
  };
}
