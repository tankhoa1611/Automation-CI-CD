const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Login page', () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).goto();
  });

  test('shows the login form', async ({ page }) => {
    const login = new LoginPage(page);
    await expect(page).toHaveTitle(/Login/);
    await expect(login.username).toBeVisible();
    await expect(login.password).toBeVisible();
    await expect(login.loginButton).toBeEnabled();
  });

  test('logs in with valid credentials', async ({ page }) => {
    await new LoginPage(page).login('admin', 'admin123');
    await expect(page).toHaveURL(/home\.html$/);
  });

  test('rejects invalid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.login('admin', 'wrong');
    await expect(login.error).toHaveText('Invalid username or password');
    await expect(page).not.toHaveURL(/home\.html$/);
  });

  test('requires username and password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.loginButton.click();
    await expect(login.error).toHaveText('Username and password are required');
  });
});
