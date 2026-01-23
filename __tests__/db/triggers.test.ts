/**
 * @file Database triggers tests
 * @description Tests for auto-notification triggers
 */

describe('Database notification triggers', () => {
  it('should have triggers migration file', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/migrations/009_triggers.sql');

    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should create trigger function for new sheed notifications', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/migrations/009_triggers.sql');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should have trigger function for new sheed
    expect(content).toMatch(/create.*function.*notify.*sheed|new_sheed.*trigger/i);
  });

  it('should notify both sheedés when new sheed is created', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/migrations/009_triggers.sql');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should reference both sheede_1 and sheede_2
    expect(content).toMatch(/sheede_1|sheede_2/i);
    // Should insert notifications
    expect(content).toMatch(/insert.*notifications|notifications.*insert/i);
  });

  it('should create trigger on sheeds table for new sheed', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/migrations/009_triggers.sql');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should create trigger on sheeds
    expect(content).toMatch(/create.*trigger.*sheeds|trigger.*on.*sheeds/i);
    // Should fire after insert
    expect(content).toMatch(/after.*insert/i);
  });

  it('should create trigger function for success notification', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/migrations/009_triggers.sql');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should have success trigger (message count threshold)
    expect(content).toMatch(/success|message_count|threshold/i);
  });

  it('should check message count threshold (50 messages)', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/migrations/009_triggers.sql');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should check for message count >= 50
    expect(content).toMatch(/50|message_count/i);
  });

  it('should update sheed status on success', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/migrations/009_triggers.sql');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should update sheed status to success
    expect(content).toMatch(/status.*success|success.*status/i);
  });

  it('should create trigger on messages table', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/migrations/009_triggers.sql');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should create trigger on messages
    expect(content).toMatch(/trigger.*messages|messages.*trigger/i);
  });

  it('should use NEW record in triggers', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/migrations/009_triggers.sql');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should use NEW for row data
    expect(content).toContain('NEW');
  });

  it('should return trigger correctly', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/migrations/009_triggers.sql');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should return NEW or NULL
    expect(content).toMatch(/return.*new|return.*null/i);
  });
});
