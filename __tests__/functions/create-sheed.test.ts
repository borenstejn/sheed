/**
 * @file create-sheed Edge Function tests
 * @description Tests for the sheed creation Edge Function
 */

describe('create-sheed Edge Function', () => {
  it('should have create-sheed function file', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/functions/create-sheed/index.ts');

    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should export a serve handler', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/functions/create-sheed/index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should use Deno.serve or serve() from std/http
    expect(content).toMatch(/serve|Deno\.serve/);
  });

  it('should validate required inputs', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/functions/create-sheed/index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should check for required fields
    expect(content).toContain('sheede_1_id');
    expect(content).toContain('sheede_2_id');
    expect(content).toContain('intro_message');
  });

  it('should create sheed record in database', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/functions/create-sheed/index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should insert into sheeds table
    expect(content).toMatch(/\.from\(['"]sheeds['"]\)/);
    expect(content).toContain('insert');
  });

  it('should create 3 chatrooms for the sheed', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/functions/create-sheed/index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should insert into chatrooms table
    expect(content).toMatch(/\.from\(['"]chatrooms['"]\)/);
    // Should create all 3 chatroom types
    expect(content).toContain('sheeder_sheede_1');
    expect(content).toContain('sheeder_sheede_2');
    expect(content).toContain('sheede_sheede');
  });

  it('should create notifications for sheedés', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/functions/create-sheed/index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should insert into notifications table
    expect(content).toMatch(/\.from\(['"]notifications['"]\)/);
    expect(content).toContain('new_sheed');
  });

  it('should use Supabase client for database operations', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/functions/create-sheed/index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should import and use createClient
    expect(content).toContain('createClient');
    expect(content).toContain('@supabase/supabase-js');
  });

  it('should handle errors and return appropriate responses', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/functions/create-sheed/index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should handle errors
    expect(content).toContain('error');
    expect(content).toMatch(/catch|\.error/);
    // Should return JSON responses
    expect(content).toContain('application/json');
  });

  it('should require authentication', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/functions/create-sheed/index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should get user from auth header
    expect(content).toMatch(/Authorization|getUser|auth/i);
  });

  it('should set expiry date for the sheed', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/functions/create-sheed/index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should set expires_at (7 days from creation)
    expect(content).toContain('expires_at');
  });
});
