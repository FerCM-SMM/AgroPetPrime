import { test, expect } from '@playwright/test';

test.describe('AgroPet Pr1me - E2E Core Journeys', () => {
  test('should load the homepage with brand header and hero', async ({ page }) => {
    await page.goto('/');
    
    // Check brand presence
    await expect(page).toHaveTitle(/AgroPet Pr1me/i);
    
    // Check main navigation links
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Check hero heading
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
    
    // Check category section
    const categorySection = page.locator('section:has-text("Categoria")');
    await expect(categorySection).toBeVisible();
  });
});
