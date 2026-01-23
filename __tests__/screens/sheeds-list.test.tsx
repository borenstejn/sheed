/**
 * @file Sheeds list screen tests
 * @description Tests for the main sheeds list screen with toggle
 */

describe('Sheeds list screen', () => {
  it('should have sheeds list screen file', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/(tabs)/sheeds.tsx');

    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should be a default export screen', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/(tabs)/sheeds.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('export default function');
  });

  it('should have toggle between tabs', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/(tabs)/sheeds.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should have toggle between "Mes Sheeds" and "Sheedé(e)"
    expect(content).toContain('Mes Sheeds');
    expect(content).toContain('Sheed');
  });

  it('should have animated pill/tab indicator', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/(tabs)/sheeds.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should use animation for tab switching
    expect(content).toContain('Animated');
  });

  it('should have empty states', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/(tabs)/sheeds.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should show empty state when no sheeds
    expect(content).toContain('EmptyState');
  });

  it('should use NativeWind styling', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/(tabs)/sheeds.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('className');
  });

  it('should have state for active tab', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/(tabs)/sheeds.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('useState');
    expect(content).toContain('activeTab');
  });
});
