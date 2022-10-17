import { expect, Page, Locator } from "@playwright/test";

import { AbstractPage } from './AbstractPage';

export class WordPressGutenbergEditor extends AbstractPage {
  private readonly contentWrapper: Locator;
  private readonly topBarWrapper: Locator;
  private readonly publishSidebar: Locator;
  private readonly popover: Locator;
  readonly addBlockButton: Locator;
  readonly addBlockPopoverNewParagraph: Locator;
  readonly titleInput: Locator;
  readonly paragraphInput: Locator;
  readonly publishButton: Locator;
  readonly confirmPublishButton: Locator;
  readonly viewPostButton: Locator;

  constructor(page: Page) {
    super(page);
    this.contentWrapper = this.page.locator('[aria-label="Editor content"]');
    this.topBarWrapper = this.page.locator('[aria-label="Editor top bar"]');
    this.publishSidebar = this.page.locator('[aria-label="Editor publish"]');
    this.popover = this.page.locator('.popover-slot');
    this.addBlockButton = this.contentWrapper.locator('[aria-label="Add block"]');
    this.addBlockPopoverNewParagraph = this.popover.locator('text="Paragraph"');
    this.titleInput = this.contentWrapper.locator('[aria-label="Add title"]');
    this.paragraphInput = this.contentWrapper.locator('[data-title="Paragraph"]');
    this.publishButton = this.topBarWrapper.locator('text="Publish"');
    this.confirmPublishButton = this.publishSidebar.locator('text="Publish"');
    this.viewPostButton = this.publishSidebar.locator('text="View Post"');
  }

  async goto() {
    throw new Error('Cannot open Gutenberg editor directly.');
  }

  async expectToBeThePage() {
    await this.waitForJsInitialised();
    await expect(this.contentWrapper).toBeVisible();
  }
}
