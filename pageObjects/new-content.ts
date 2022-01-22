import { Locator, Page } from '@playwright/test';

export class NewContent {
  readonly mainSection: Locator;
  private addWikiBtn: Locator;
  readonly wikiSection: Locator;
  private titleField: Locator;
  private descriptionField: Locator;
  private textField: Locator;
  private textArea: Locator;
  private createBtn: Locator;
  private saveChangesBtn: Locator;

  constructor(page: Page) {
    this.mainSection = page.locator('.virtuoso-grid-list');
    this.addWikiBtn = page.locator('.virtuoso-grid-list > li:last-child');
    this.wikiSection = page.locator('#root > div > section');
    this.titleField = page.locator('div:first-child > .InlineEditor');
    this.descriptionField = page.locator('div:last-child > .InlineEditor');
    this.textField = page.locator('textarea.InlineEditor__input');
    this.textArea = page.locator('div.fr-element.fr-view');
    this.createBtn = page.locator('[title=Create]');
    this.saveChangesBtn = page.locator('[title=Save]');
  }

  async createWiki() {
    await this.addWikiBtn.click();
  }

  async fillTitleField(text: string) {
    await this.titleField.click();
    await this.textField.fill(text);
  }

  async fillDescriptionField(text: string) {
    await this.descriptionField.click();
    await this.textField.fill(text);
  }

  async create() {
    await this.createBtn.click();
  }

  async fillTextArea(text: string) {
    await this.textArea.fill(text);
  }

  async saveChanges() {
    await this.saveChangesBtn.click();
  }
}
