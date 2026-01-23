/**
 * @file Settings screen tests
 * @description Tests for the settings screen
 */

describe('Settings screen', () => {
  it('should have settings screen file', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/settings.tsx');

    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should be a default export screen', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/settings.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('export default function');
  });

  it('should have notifications toggle', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/settings.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should have notifications setting
    expect(content).toMatch(/notification|Switch|toggle/i);
  });

  it('should have blocked accounts section', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/settings.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should have blocked accounts
    expect(content).toMatch(/blocked|bloqué/i);
  });

  it('should have help/support option', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/settings.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should have help
    expect(content).toMatch(/help|aide|support/i);
  });

  it('should have logout button', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/settings.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should have logout
    expect(content).toMatch(/logout|signOut|déconnexion/i);
  });

  it('should use useAuth for logout', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/settings.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should use auth hook
    expect(content).toMatch(/useAuth|authStore/);
  });

  it('should have back navigation', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/settings.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should have back button
    expect(content).toMatch(/router\.back|goBack|Retour/i);
  });

  it('should use NativeWind styling', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/settings.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('className');
  });

  it('should have privacy policy link', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/settings.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should have privacy or terms
    expect(content).toMatch(/privacy|confidentialité|terms|conditions/i);
  });
});
