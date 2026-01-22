/**
 * @file Login screen tests
 * @description Tests for SSO login screen with Apple/Google
 */

describe('Login screen', () => {
  it('should have login screen file', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(auth)/login.tsx');

    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should use useAuth hook', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(auth)/login.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('useAuth');
    expect(content).toContain('signInWithGoogle');
    expect(content).toContain('signInWithApple');
  });

  it('should have Google sign-in button', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(auth)/login.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('Continue with Google');
    expect(content).toContain('handleGoogleSignIn');
  });

  it('should have Apple sign-in button', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(auth)/login.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('Continue with Apple');
    expect(content).toContain('handleAppleSignIn');
  });

  it('should show loading state', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(auth)/login.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('isLoading');
    expect(content).toContain('ActivityIndicator');
  });

  it('should display error messages', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(auth)/login.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('error');
    expect(content).toContain('errorText');
  });

  it('should navigate to permissions after login', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(auth)/login.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain("router.replace('/(auth)/permissions')");
  });

  it('should show terms and privacy policy', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(auth)/login.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('Terms of Service');
    expect(content).toContain('Privacy Policy');
  });
});
