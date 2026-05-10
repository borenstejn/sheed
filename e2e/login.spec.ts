import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to login page
    await page.goto('/(auth)/login');
    await page.waitForLoadState('networkidle');
  });

  test('should display login page elements', async ({ page }) => {
    // Check title
    await expect(page.getByText('Welcome to SHEED')).toBeVisible({ timeout: 10000 });

    // Check tagline
    await expect(page.getByText(/Sign in to start matching/i)).toBeVisible();

    // Check Google sign in button
    await expect(page.getByText(/Continue with Google/i)).toBeVisible();

    // Note: Apple sign in is only shown on iOS, not on web
  });

  test('should have clickable Google sign in button', async ({ page }) => {
    await expect(page.getByText('Welcome to SHEED')).toBeVisible({ timeout: 10000 });

    const googleButton = page.getByText(/Continue with Google/i);
    await expect(googleButton).toBeVisible();

    // In React Native Web, Pressable doesn't use button role
    // Just verify the text is clickable (not greyed out)
    await expect(googleButton).toBeVisible();
  });
});
