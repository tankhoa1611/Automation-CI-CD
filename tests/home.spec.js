const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { HomePage } = require('../pages/HomePage');

test.describe('Home page', () => {
  test('redirects to login when not signed in', async ({ page }) => {
    await new HomePage(page).goto();
    await expect(page).toHaveTitle(/Login/);
  });

  test.describe('when signed in', () => {
    test.beforeEach(async ({ page }) => {
      const login = new LoginPage(page);
      await login.goto();
      await login.login('admin', 'admin123');
      await expect(page).toHaveURL(/home\.html$/);
    });

    test('shows welcome message and menu', async ({ page }) => {
      const home = new HomePage(page);
      await expect(home.welcome).toHaveText('Welcome, admin');
      await expect(home.menu.locator('li')).toHaveText(['Dashboard', 'Reports', 'Settings']);
    });

    test('logs out back to login page', async ({ page }) => {
      await new HomePage(page).logout();
      await expect(page).toHaveTitle(/Login/);
    });
  });
});
