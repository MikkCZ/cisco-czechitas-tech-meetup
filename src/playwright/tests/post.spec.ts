import { test, expect } from '@playwright/test';
import moment from 'moment';
import dedent from 'dedent';

import { configuration } from '../configuration';
import { WordPressAdministration } from '../pageObjectModels/WordPressAdministration';
import { WordPressGutenbergEditor } from '../pageObjectModels/WordPressGutenbergEditor';

test.use({ storageState: configuration.author.loggedInState });

test.describe('WordPress Post', () => {
  test('gets published', async ({ page }) => {
    const postTitle = `Test article ${moment().format('YYYY-MM-DD_HH-mm-ss')}`;
    const postContent = dedent`
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    `.replace(/\n/g, '');

    const administrationPage = new WordPressAdministration(page);
    await administrationPage.goto();
    await administrationPage.expectToBeThePage();
    await administrationPage.sidebarMenu.locator('a', { hasText: /^Posts$/ }).click();
    await administrationPage.contentWrapper.locator('text="Add New"').click();
    const postEditor = new WordPressGutenbergEditor(page);
    await postEditor.expectToBeThePage();

    await postEditor.titleInput.fill(postTitle);
    await postEditor.addBlockButton.click();
    await postEditor.addBlockPopoverNewParagraph.click();
    await postEditor.paragraphInput.first().fill(postContent);
    await postEditor.publishButton.click();
    await postEditor.confirmPublishButton.click();

    await postEditor.viewPostButton.click();
    await expect(page.locator('main').locator('h1', { hasText: postTitle })).toBeVisible();
    await expect(page.locator('main').locator('p', { hasText: postContent })).toBeVisible();
  });
});
