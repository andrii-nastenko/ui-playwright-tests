import {type Locator, type Page} from '@playwright/test';

export class CreateContent {
  readonly mainSection: Locator;
  private readonly addWikiBtn: Locator;
  readonly wikiSectionIcon: Locator;
  private readonly titleField: Locator;
  private readonly descriptionField: Locator;
  private readonly submitFieldBtn: Locator;
  private readonly activeInput: Locator;
  private readonly createBtn: Locator;
  private readonly textArea: Locator;
  private readonly saveBtn: Locator;
  readonly breadcrumbs: Locator;

  constructor(page: Page) {
    this.mainSection = page.locator('.virtuoso-grid-list');
    this.addWikiBtn = page.locator('li:has-text("Wiki Page")');
    this.wikiSectionIcon = page.locator('img[alt=Note]');
    this.titleField = page.locator('[title="Click to edit"]:has-text("Add title")');
    this.descriptionField = page.locator('[title="Click to edit"]:has-text("Add description here")');
    this.submitFieldBtn = page.locator('.gem-type-check');
    this.activeInput = page.locator('.InlineEditor__input');
    this.createBtn = page.locator('.ActionButton[title=Create]');
    this.textArea = page.locator('.fr-element.fr-view');
    this.saveBtn = page.locator('.ActionButton[title=Save]');
    this.breadcrumbs = page.locator('.Breadcrumbs');
  }

  async createWiki(): Promise<void> {
    await this.addWikiBtn.click();
  }

  async fillTitle(text: string): Promise<void> {
    await this.titleField.click();
    await this.activeInput.fill(text);
    await this.submitFieldBtn.click();
  }

  async fillDescription(text: string): Promise<void> {
    await this.descriptionField.click();
    await this.activeInput.fill(text);
    await this.submitFieldBtn.click();
  }

  async createGem(): Promise<void> {
    await this.createBtn.click({delay: 1000, clickCount: 5});
  }

  async fillTextArea(text: string): Promise<void> {
    await this.textArea.fill(text);
  }

  async saveChanges(): Promise<void> {
    await this.saveBtn.click();
  }
}
