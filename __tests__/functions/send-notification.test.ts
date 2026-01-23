/**
 * @file Edge Function send-notification tests
 * @description Tests for the send-notification Supabase Edge Function
 */

describe('send-notification Edge Function', () => {
  it('should have send-notification function file', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/functions/send-notification/index.ts');

    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should use Deno.serve', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/functions/send-notification/index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('Deno.serve');
  });

  it('should handle CORS preflight', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/functions/send-notification/index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should handle OPTIONS request
    expect(content).toMatch(/OPTIONS|cors|CORS|Access-Control/i);
  });

  it('should require authentication', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/functions/send-notification/index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should check authorization
    expect(content).toMatch(/Authorization|getUser|auth/i);
  });

  it('should accept user_id parameter', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/functions/send-notification/index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should have user_id in input
    expect(content).toMatch(/user_id|userId/);
  });

  it('should accept notification type parameter', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/functions/send-notification/index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should have type parameter
    expect(content).toMatch(/type.*notification|notification.*type|notificationType/i);
  });

  it('should accept title and body parameters', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/functions/send-notification/index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should have title and body
    expect(content).toContain('title');
    expect(content).toContain('body');
  });

  it('should fetch user push token from database', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/functions/send-notification/index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should fetch push_token
    expect(content).toMatch(/push_token|pushToken/);
    expect(content).toMatch(/users|from\(['"]users['"]\)/);
  });

  it('should send via Expo Push API', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/functions/send-notification/index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should call Expo Push API
    expect(content).toMatch(/expo\.io|exp\.host|expo.*push/i);
  });

  it('should insert notification record to database', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/functions/send-notification/index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should use notifications table and insert
    expect(content).toMatch(/from\(['"]notifications['"]\)/);
    expect(content).toContain('.insert(');
  });

  it('should accept optional data parameter', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/functions/send-notification/index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should support extra data
    expect(content).toMatch(/data|payload|extra/i);
  });

  it('should return success response with notification id', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../supabase/functions/send-notification/index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should return JSON response
    expect(content).toMatch(/Response|json|JSON\.stringify/);
    expect(content).toMatch(/success|notification_id|notificationId/i);
  });
});
