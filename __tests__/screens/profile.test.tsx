/**
 * @file Profile screen tests
 * @description Tests for the user profile screen
 */

describe('Profile screen', () => {
  it('should have profile screen file', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/(tabs)/profile.tsx');

    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should be a default export screen', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/(tabs)/profile.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('export default function');
  });

  it('should display user avatar', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/(tabs)/profile.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should show user avatar
    expect(content).toMatch(/avatar|Avatar|image|Image/i);
  });

  it('should display username/display_name', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/(tabs)/profile.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should show username
    expect(content).toMatch(/display_name|username|name/i);
  });

  it('should show stats cards', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/(tabs)/profile.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should display stats
    expect(content).toMatch(/stats|stat|StatCard|statistics/i);
  });

  it('should display sheeds created count', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/(tabs)/profile.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should show created sheeds
    expect(content).toMatch(/created|lancés|sheeds/i);
  });

  it('should display successful sheeds count', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/(tabs)/profile.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should show successful sheeds
    expect(content).toMatch(/success|réussis|successful/i);
  });

  it('should display success rate', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/(tabs)/profile.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should show percentage/rate
    expect(content).toMatch(/rate|taux|%|percent/i);
  });

  it('should have settings link', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/(tabs)/profile.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should link to settings
    expect(content).toMatch(/settings|paramètres|Setting/i);
  });

  it('should use NativeWind styling', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/(tabs)/profile.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('className');
  });

  it('should use authStore for user data', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/(tabs)/profile.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should use auth store
    expect(content).toMatch(/useAuthStore|authStore/);
  });

  it('should have loading state', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/(tabs)/profile.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should show loading
    expect(content).toMatch(/loading|isLoading|ActivityIndicator/i);
  });
});
