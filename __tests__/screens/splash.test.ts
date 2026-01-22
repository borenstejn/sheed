/**
 * @file Splash screen tests
 * @description Tests for animated splash screen
 */

describe('Splash screen', () => {
  it('should have splash screen file', () => {
    const fs = require('fs');
    const path = require('path');
    const splashPath = path.join(__dirname, '../../app/(auth)/splash.tsx');

    expect(fs.existsSync(splashPath)).toBe(true);
  });

  it('should contain animated components', () => {
    const fs = require('fs');
    const path = require('path');
    const splashPath = path.join(__dirname, '../../app/(auth)/splash.tsx');
    const content = fs.readFileSync(splashPath, 'utf-8');

    // Check for animation imports
    expect(content).toContain('Animated');
    expect(content).toContain('useRef');
    expect(content).toContain('useEffect');
  });

  it('should have SHEED branding', () => {
    const fs = require('fs');
    const path = require('path');
    const splashPath = path.join(__dirname, '../../app/(auth)/splash.tsx');
    const content = fs.readFileSync(splashPath, 'utf-8');

    expect(content).toContain('SHEED');
    expect(content).toContain('#FF3B7A'); // SHEED pink color
  });

  it('should auto-navigate after animation', () => {
    const fs = require('fs');
    const path = require('path');
    const splashPath = path.join(__dirname, '../../app/(auth)/splash.tsx');
    const content = fs.readFileSync(splashPath, 'utf-8');

    // Check for navigation after timeout
    expect(content).toContain('setTimeout');
    expect(content).toContain('router.replace');
  });

  it('should have animation duration around 0.8s', () => {
    const fs = require('fs');
    const path = require('path');
    const splashPath = path.join(__dirname, '../../app/(auth)/splash.tsx');
    const content = fs.readFileSync(splashPath, 'utf-8');

    // Check for splash duration constant
    expect(content).toContain('SPLASH_DURATION');
    expect(content).toContain('800');
  });
});
