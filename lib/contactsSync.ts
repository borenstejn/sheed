/**
 * @file contactsSync
 * @description Sync device contacts to Supabase
 */

import { supabase } from './supabase';
import type { FormattedContact } from '@/hooks/useContacts';
import type { TablesInsert } from '@/types/database.types';

// Batch size for Supabase inserts (stay under API limits)
const BATCH_SIZE = 100;

// Result of sync operation
export interface SyncResult {
  synced: number;
  errors: number;
  skipped: number;
  total: number;
}

// Normalize phone number for storage (remove non-digits except +)
const normalizePhone = (phone: string): string => {
  return phone.replace(/[^\d+]/g, '');
};

// Convert FormattedContact to Supabase insert format
const toSupabaseContact = (
  contact: FormattedContact,
  ownerId: string
): TablesInsert<'contacts'> | null => {
  // Need at least a phone or email
  const phone = contact.phoneNumbers[0] ? normalizePhone(contact.phoneNumbers[0]) : null;
  const email = contact.emails[0]?.toLowerCase() || null;

  if (!phone && !email) {
    return null;
  }

  return {
    name: contact.name,
    phone,
    email,
    owner_id: ownerId,
    imported_at: new Date().toISOString(),
  };
};

/**
 * Sync contacts from device to Supabase
 * Uses upsert to handle duplicates (based on owner_id + phone/email)
 */
export async function syncContacts(
  contacts: FormattedContact[],
  ownerId: string
): Promise<SyncResult> {
  const result: SyncResult = {
    synced: 0,
    errors: 0,
    skipped: 0,
    total: contacts.length,
  };

  // Transform contacts to Supabase format
  const supabaseContacts: TablesInsert<'contacts'>[] = [];

  for (const contact of contacts) {
    const transformed = toSupabaseContact(contact, ownerId);
    if (transformed) {
      supabaseContacts.push(transformed);
    } else {
      result.skipped++;
    }
  }

  // Process in batches
  for (let i = 0; i < supabaseContacts.length; i += BATCH_SIZE) {
    const batch = supabaseContacts.slice(i, i + BATCH_SIZE);

    try {
      // Upsert batch - on conflict update name and imported_at
      const { error } = await supabase
        .from('contacts')
        .upsert(batch, {
          onConflict: 'owner_id,phone',
          ignoreDuplicates: false,
        });

      if (error) {
        console.error('Batch sync error:', error);
        result.errors += batch.length;
      } else {
        result.synced += batch.length;
      }
    } catch (err) {
      console.error('Batch sync exception:', err);
      result.errors += batch.length;
    }
  }

  return result;
}

/**
 * Sync a single contact to Supabase
 */
export async function syncSingleContact(
  contact: FormattedContact,
  ownerId: string
): Promise<{ success: boolean; error?: Error }> {
  const transformed = toSupabaseContact(contact, ownerId);

  if (!transformed) {
    return { success: false, error: new Error('Contact has no phone or email') };
  }

  try {
    const { error } = await supabase
      .from('contacts')
      .upsert(transformed, {
        onConflict: 'owner_id,phone',
        ignoreDuplicates: false,
      });

    if (error) {
      return { success: false, error: new Error(error.message) };
    }

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err : new Error('Unknown error')
    };
  }
}

/**
 * Get all synced contacts for a user
 */
export async function getSyncedContacts(ownerId: string) {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('owner_id', ownerId)
    .order('name');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Delete all synced contacts for a user
 */
export async function clearSyncedContacts(ownerId: string) {
  const { error } = await supabase
    .from('contacts')
    .delete()
    .eq('owner_id', ownerId);

  if (error) {
    throw new Error(error.message);
  }
}
