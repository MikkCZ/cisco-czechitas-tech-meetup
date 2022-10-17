import { expect, Page, Locator } from "@playwright/test";

import { AbstractPage } from './AbstractPage';

export class WordPressAdministration extends AbstractPage {
  readonly sidebarMenu: Locator;
  readonly contentWrapper: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    super(page);
    this.sidebarMenu = this.page.locator('#adminmenu');
    this.contentWrapper = this.page.locator('[role=main]');
    this.title = this.contentWrapper.locator('h1');
  }

  async goto() {
    await this.page.goto('/wp-admin');
  }

  async expectToBeThePage() {
    await this.waitForJsInitialised();
    await expect(this.sidebarMenu).toBeVisible();
  }
}
