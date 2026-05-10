import { test, expect } from '@playwright/test';

test.describe('Onboarding Flow', () => {
  test('should display onboarding slides and navigate through them', async ({ page }) => {
    await page.goto('/');

    // Wait for the app to load
    await page.waitForLoadState('networkidle');

    // Should show first slide with "Play Cupid"
    await expect(page.getByText('Play Cupid')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('💘')).toBeVisible();

    // All slides should exist in the DOM (FlatList renders them)
    // Note: Due to FlatList rendering, we verify initial state
    await expect(page.getByText('Next')).toBeVisible();

    // Click Next button and wait for animation
    await page.getByText('Next').click();
    await page.waitForTimeout(600);

    // Should now show second slide (or have advanced state)
    // Note: FlatList scrolling on web may behave differently
    // We verify the button still works
    await page.getByText('Next').click();
    await page.waitForTimeout(600);

    // After 2 clicks, we should be on the last slide
    // The button text should change to "Let's Go!"
    await expect(page.getByText("Let's Go!")).toBeVisible({ timeout: 5000 });
  });

  test('should navigate to login when clicking "Let\'s Go!"', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait for first slide
    await expect(page.getByText('Play Cupid')).toBeVisible({ timeout: 10000 });

    // Navigate through all slides - click Next twice to get to last slide
    await page.getByText('Next').click();
    await page.waitForTimeout(600);
    await page.getByText('Next').click();
    await page.waitForTimeout(600);

    // Wait for "Let's Go!" button to appear (state update)
    const letsGoButton = page.getByText("Let's Go!");
    await expect(letsGoButton).toBeVisible({ timeout: 5000 });

    // Click "Let's Go!"
    await letsGoButton.click();

    // Should navigate to login page
    await expect(page.getByText('Welcome to SHEED')).toBeVisible({ timeout: 5000 });
  });

  test('should skip onboarding when clicking Skip', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait for first slide
    await expect(page.getByText('Play Cupid')).toBeVisible({ timeout: 10000 });

    // Click Skip
    await page.getByText('Skip').click();

    // Should navigate to login page
    await expect(page.getByText('Welcome to SHEED')).toBeVisible({ timeout: 5000 });
  });
});
