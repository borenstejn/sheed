import { test, expect } from '@playwright/test';

test.describe('App Basic Tests', () => {
  test('should load the app without errors', async ({ page }) => {
    // Listen for console errors
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // App should render something
    await expect(page.locator('body')).not.toBeEmpty();

    // Filter out known non-critical errors
    const criticalErrors = errors.filter(
      (e) =>
        !e.includes('favicon') &&
        !e.includes('manifest') &&
        !e.includes('serviceWorker')
    );

    // No critical console errors
    expect(criticalErrors).toHaveLength(0);
  });

  test('should have dark background', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check that dark mode is applied
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 812 }); // iPhone X
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Content should be visible
    await expect(page.getByText('Play Cupid')).toBeVisible({ timeout: 10000 });

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad
    await expect(page.getByText('Play Cupid')).toBeVisible();

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.getByText('Play Cupid')).toBeVisible();
  });
});
