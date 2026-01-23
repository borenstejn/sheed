/**
 * @file New Sheed screen tests
 * @description Tests for the sheed creation modal
 */

describe('New Sheed screen', () => {
  it('should have new-sheed screen file', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/new-sheed.tsx');

    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should be a default export screen', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/new-sheed.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('export default function');
  });

  it('should have two contact selector slots', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/new-sheed.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should have selector for two contacts
    expect(content).toContain('contact');
    expect(content).toContain('Contact 1');
  });

  it('should have intro message input', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/new-sheed.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('TextInput');
    expect(content).toContain('introMessage');
  });

  it('should have submit CTA button', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/new-sheed.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should have "Sheed les!" button
    expect(content).toContain('Sheed');
  });

  it('should use modal presentation', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/new-sheed.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should be a modal screen
    expect(content).toContain('Modal');
  });

  it('should have state for selected contacts', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/new-sheed.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('useState');
    expect(content).toContain('selected');
  });

  it('should use NativeWind styling', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/new-sheed.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('className');
  });
});
