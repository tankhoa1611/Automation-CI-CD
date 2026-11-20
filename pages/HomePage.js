class HomePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.welcome = page.getByTestId('welcome');
    this.menu = page.getByTestId('menu');
    this.logoutButton = page.getByTestId('logout-button');
  }

  async goto() {
    await this.page.goto('home.html');
  }

  async logout() {
    await this.logoutButton.click();
  }
}

module.exports = { HomePage };
