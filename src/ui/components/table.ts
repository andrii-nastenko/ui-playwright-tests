import {BaseClass} from 'src/ui/base-class';
import {type Locator} from '@playwright/test';
import {type Sorting} from 'src/ui/types/table-types';

class Table extends BaseClass {
  table = (): Locator => this.page.locator('//*[@id="ex1"]//table');
  columns = (): Locator => this.table().locator('//thead//th');
  column = (columnTitle: string): Locator =>
    this.columns().locator(`//../*[contains(text(),"${columnTitle}")]`);
  sortBtn = (columnTitle: string): Locator =>
    this.column(columnTitle).locator('//ancestor::th');
  columnItems = (columnNumber: number): Locator =>
    this.table().locator(`//tbody//td[${columnNumber}]`);
  async getColumnHeader(): Promise<string[]> {
    return await this.columns()
      .allTextContents()
      .then((columns) => columns.map((title) => title.trim()));
  }
  async getColumnSortingState(columnTitle: string): Promise<Sorting> {
    const sortState = await this.sortBtn(columnTitle).getAttribute('aria-sort');
    return !sortState ? 'descending' : (sortState as Sorting);
  }
  async sortColumn(params: {sortOrder: Sorting; columnTitle: string}): Promise<void> {
    while ((await this.getColumnSortingState(params.columnTitle)) !== params.sortOrder) {
      await this.sortBtn(params.columnTitle).click();
    }
  }
  async getColumnTextContents(columnTitle: string): Promise<string[]> {
    const columnNumber = await this.getColumnHeader().then(
      (columns) => columns.findIndex((column) => column === columnTitle) + 1
    );
    return await this.columnItems(columnNumber).allTextContents();
  }
}

export {Table};
