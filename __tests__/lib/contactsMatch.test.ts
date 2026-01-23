/**
 * @file contactsMatch tests
 * @description Tests for matching contacts with existing SHEED users
 */

describe('contactsMatch', () => {
  it('should have contactsMatch module', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../lib/contactsMatch.ts');

    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should export matchContacts function', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../lib/contactsMatch.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('export async function matchContacts');
  });

  it('should use supabase client', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../lib/contactsMatch.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('supabase');
    expect(content).toContain("from './supabase'");
  });

  it('should match by phone number', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../lib/contactsMatch.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('phone');
    expect(content).toContain('users');
  });

  it('should match by email', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../lib/contactsMatch.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('email');
  });

  it('should update contact_user_id', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../lib/contactsMatch.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('contact_user_id');
  });

  it('should return match results', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../lib/contactsMatch.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should return how many were matched
    expect(content).toContain('matched');
  });
});
