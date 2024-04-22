import { test, expect } from '@playwright/test';

test('打开关闭弹窗', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('radio', { name: 'dialog-example' }).click();

  await page.getByRole('button', { name: 'open' }).click();
  await page.waitForSelector('.el-dialog__wrapper');
  expect(await page.isVisible('text=标题')).toBeTruthy();
  expect(await page.isVisible('text=内容')).toBeTruthy();

  await page.getByRole('button', { name: '取消' }).click();
  await page.waitForSelector('.el-dialog__wrapper', { state: 'detached' });
  expect(await page.isVisible('text=标题')).toBeFalsy();
  expect(await page.isVisible('text=内容')).toBeFalsy();

});
