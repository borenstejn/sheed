/**
 * @file Permissions screen tests
 * @description Tests for contacts and notifications permissions screen
 */

describe('Permissions screen', () => {
  it('should have permissions screen file', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(auth)/permissions.tsx');

    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should use expo-contacts', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(auth)/permissions.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('expo-contacts');
    expect(content).toContain('requestPermissionsAsync');
  });

  it('should use expo-notifications', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(auth)/permissions.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('expo-notifications');
    expect(content).toContain('getPermissionsAsync');
  });

  it('should have contacts permission card', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(auth)/permissions.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('Contacts');
    expect(content).toContain('requestContactsPermission');
  });

  it('should have notifications permission card', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(auth)/permissions.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('Notifications');
    expect(content).toContain('requestNotificationsPermission');
  });

  it('should have continue button', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(auth)/permissions.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('handleContinue');
    expect(content).toContain('Continue');
  });

  it('should have skip option', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(auth)/permissions.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('Skip for now');
  });

  it('should navigate to main app after permissions', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(auth)/permissions.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain("router.replace('/(main)/(tabs)/sheeds')");
  });

  it('should track permission state', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(auth)/permissions.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('PermissionState');
    expect(content).toContain('contacts: boolean');
    expect(content).toContain('notifications: boolean');
  });

  it('should configure notification handler when granted', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(auth)/permissions.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('setNotificationHandler');
    expect(content).toContain('shouldShowAlert');
  });
});
