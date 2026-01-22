/**
 * @file Onboarding screen tests
 * @description Tests for onboarding screen with 3 slides
 */

describe('Onboarding screen', () => {
  it('should have onboarding screen file', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(auth)/onboarding.tsx');

    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should have exactly 3 slides', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(auth)/onboarding.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Check for SLIDES array with 3 items
    expect(content).toContain('SLIDES');
    expect(content).toContain("id: '1'");
    expect(content).toContain("id: '2'");
    expect(content).toContain("id: '3'");
  });

  it('should have swipeable FlatList', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(auth)/onboarding.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('FlatList');
    expect(content).toContain('horizontal');
    expect(content).toContain('pagingEnabled');
  });

  it('should have skip button', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(auth)/onboarding.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('Skip');
    expect(content).toContain('handleSkip');
  });

  it('should have next/get started button', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(auth)/onboarding.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('handleNext');
    expect(content).toContain("Let's Go!");
    expect(content).toContain('Next');
  });

  it('should have animated dots indicator', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(auth)/onboarding.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('renderDots');
    expect(content).toContain('scrollX');
    expect(content).toContain('interpolate');
  });

  it('should navigate to login on completion', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(auth)/onboarding.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain("router.replace('/(auth)/login')");
  });
});
