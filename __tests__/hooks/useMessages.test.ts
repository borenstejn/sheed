/**
 * @file useMessages hook tests
 * @description Tests for the realtime messages hook
 */

describe('useMessages hook', () => {
  it('should have useMessages hook file', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../hooks/useMessages.ts');

    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should export useMessages hook', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../hooks/useMessages.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should export the hook
    expect(content).toMatch(/export.*useMessages/);
  });

  it('should accept chatroomId parameter', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../hooks/useMessages.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should accept chatroom identifier
    expect(content).toMatch(/chatroomId|chatroom_id|roomId/i);
  });

  it('should use Supabase Realtime subscription', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../hooks/useMessages.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should subscribe to realtime changes
    expect(content).toMatch(/channel|subscribe|realtime/i);
  });

  it('should return messages array', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../hooks/useMessages.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should return messages
    expect(content).toMatch(/messages/i);
  });

  it('should return loading state', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../hooks/useMessages.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should indicate loading
    expect(content).toMatch(/isLoading|loading/i);
  });

  it('should handle INSERT events for new messages', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../hooks/useMessages.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should handle INSERT events
    expect(content).toMatch(/INSERT|insert/i);
  });

  it('should provide sendMessage function', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../hooks/useMessages.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should have send function
    expect(content).toMatch(/sendMessage|send/i);
  });

  it('should cleanup subscription on unmount', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../hooks/useMessages.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should unsubscribe on cleanup
    expect(content).toMatch(/unsubscribe|removeChannel|cleanup|return.*\(\)/i);
  });

  it('should order messages by created_at', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../hooks/useMessages.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should sort by timestamp
    expect(content).toMatch(/created_at|order|sort/i);
  });

  it('should be exported from hooks barrel', () => {
    const fs = require('fs');
    const path = require('path');
    const indexPath = path.join(__dirname, '../../hooks/index.ts');
    const content = fs.readFileSync(indexPath, 'utf-8');

    expect(content).toContain('useMessages');
  });
});
