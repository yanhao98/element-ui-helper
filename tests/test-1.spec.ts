import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('radio', { name: 'dialog-example' }).click();
  await page.getByRole('button', { name: 'open' }).click();
  await page.getByRole('button', { name: '取消' }).click();
});
