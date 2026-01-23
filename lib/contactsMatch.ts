/**
 * @file contactsMatch
 * @description Match imported contacts with existing SHEED users
 */

import { supabase } from './supabase';
import type { Contact, User } from '@/types/database.types';

// Result of match operation
export interface MatchResult {
  matched: number;
  unmatched: number;
  total: number;
}

// Normalize phone for matching (remove non-digits except +)
const normalizePhone = (phone: string | null | undefined): string | null => {
  if (!phone) return null;
  return phone.replace(/[^\d+]/g, '');
};

// Normalize email for matching (lowercase, trim)
const normalizeEmail = (email: string | null | undefined): string | null => {
  if (!email) return null;
  return email.toLowerCase().trim();
};

/**
 * Match contacts with existing SHEED users by phone or email
 * Updates contact_user_id for any matches found
 */
export async function matchContacts(ownerId: string): Promise<MatchResult> {
  const result: MatchResult = {
    matched: 0,
    unmatched: 0,
    total: 0,
  };

  // Get all contacts for this owner that don't already have a match
  const { data: contacts, error: contactsError } = await supabase
    .from('contacts')
    .select('*')
    .eq('owner_id', ownerId)
    .is('contact_user_id', null);

  if (contactsError) {
    throw new Error(`Failed to fetch contacts: ${contactsError.message}`);
  }

  if (!contacts || contacts.length === 0) {
    return result;
  }

  result.total = contacts.length;

  // Get all SHEED users (excluding current user)
  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('id, phone, email')
    .neq('id', ownerId);

  if (usersError) {
    throw new Error(`Failed to fetch users: ${usersError.message}`);
  }

  if (!users || users.length === 0) {
    result.unmatched = contacts.length;
    return result;
  }

  // Build lookup maps for fast matching
  const phoneToUser = new Map<string, User>();
  const emailToUser = new Map<string, User>();

  for (const user of users) {
    const normalizedPhone = normalizePhone(user.phone);
    const normalizedEmail = normalizeEmail(user.email);

    if (normalizedPhone) {
      phoneToUser.set(normalizedPhone, user as User);
    }
    if (normalizedEmail) {
      emailToUser.set(normalizedEmail, user as User);
    }
  }

  // Match contacts and update
  for (const contact of contacts) {
    const normalizedPhone = normalizePhone(contact.phone);
    const normalizedEmail = normalizeEmail(contact.email);

    // Try to match by phone first, then by email
    let matchedUser: User | undefined;

    if (normalizedPhone) {
      matchedUser = phoneToUser.get(normalizedPhone);
    }

    if (!matchedUser && normalizedEmail) {
      matchedUser = emailToUser.get(normalizedEmail);
    }

    if (matchedUser) {
      // Update contact with matched user ID
      const { error: updateError } = await supabase
        .from('contacts')
        .update({ contact_user_id: matchedUser.id })
        .eq('id', contact.id);

      if (updateError) {
        console.error(`Failed to update contact ${contact.id}:`, updateError);
        result.unmatched++;
      } else {
        result.matched++;
      }
    } else {
      result.unmatched++;
    }
  }

  return result;
}

/**
 * Get all contacts for a user that are matched to SHEED users
 */
export async function getMatchedContacts(ownerId: string) {
  const { data, error } = await supabase
    .from('contacts')
    .select('*, users!contact_user_id(*)')
    .eq('owner_id', ownerId)
    .not('contact_user_id', 'is', null)
    .order('name');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Get all contacts for a user that are NOT matched to SHEED users
 */
export async function getUnmatchedContacts(ownerId: string) {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('owner_id', ownerId)
    .is('contact_user_id', null)
    .order('name');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Re-run matching for a single contact (e.g., when a new user signs up)
 */
export async function matchSingleContact(contactId: string): Promise<boolean> {
  // Get the contact
  const { data: contact, error: contactError } = await supabase
    .from('contacts')
    .select('*')
    .eq('id', contactId)
    .single();

  if (contactError || !contact) {
    return false;
  }

  // Already matched
  if (contact.contact_user_id) {
    return true;
  }

  const normalizedPhone = normalizePhone(contact.phone);
  const normalizedEmail = normalizeEmail(contact.email);

  // Try to find a matching user
  let matchedUserId: string | null = null;

  if (normalizedPhone) {
    const { data: userByPhone } = await supabase
      .from('users')
      .select('id')
      .eq('phone', normalizedPhone)
      .neq('id', contact.owner_id)
      .single();

    if (userByPhone) {
      matchedUserId = userByPhone.id;
    }
  }

  if (!matchedUserId && normalizedEmail) {
    const { data: userByEmail } = await supabase
      .from('users')
      .select('id')
      .ilike('email', normalizedEmail)
      .neq('id', contact.owner_id)
      .single();

    if (userByEmail) {
      matchedUserId = userByEmail.id;
    }
  }

  if (matchedUserId) {
    const { error: updateError } = await supabase
      .from('contacts')
      .update({ contact_user_id: matchedUserId })
      .eq('id', contactId);

    return !updateError;
  }

  return false;
}
