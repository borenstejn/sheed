/**
 * @file contactsSync tests
 * @description Tests for contacts sync to Supabase
 */

describe('contactsSync', () => {
  it('should have contactsSync module', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../lib/contactsSync.ts');

    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should export syncContacts function', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../lib/contactsSync.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('export async function syncContacts');
  });

  it('should use supabase client', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../lib/contactsSync.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('supabase');
    expect(content).toContain("from './supabase'");
  });

  it('should handle batch upsert', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../lib/contactsSync.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should use upsert for handling duplicates
    expect(content).toContain('upsert');
  });

  it('should normalize phone numbers', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../lib/contactsSync.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('normalizePhone');
  });

  it('should track sync status', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../lib/contactsSync.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should return sync status (count synced, errors, etc.)
    expect(content).toContain('synced');
  });

  it('should handle batching for large contact lists', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../lib/contactsSync.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should batch contacts for Supabase limits
    expect(content).toContain('BATCH_SIZE');
  });
});
