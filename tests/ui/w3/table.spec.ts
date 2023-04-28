import {expect} from '@playwright/test';
import {Table} from 'src/ui/components/table';
import {test} from 'fixtures/ui-hooks';

test.describe('Table:', () => {
  const homeURL = process.env.TABLE_URL;
  let table: Table;

  test.beforeEach(async ({page}) => {
    table = new Table(page);
    await page.goto(homeURL);
    await table.table().waitFor({state: 'visible'});
  });

  test('Check column titles', async () => {
    expect(await table.getColumnHeader()).toEqual([
      'First Name',
      'Last Name',
      'Company',
      'Address',
      'Favorite Number',
    ]);
  });

  test('Check First Name column content', async () => {
    expect(await table.getColumnTextContents('First Name')).toEqual(
      expect.arrayContaining(['Fred', 'Sara', 'Ralph', 'Nancy'])
    );
  });

  test('Check table sorting', async () => {
    await table.sortColumn({columnTitle: 'First Name', sortOrder: 'ascending'});

    expect.soft(await table.getColumnSortingState('First Name')).toEqual('ascending');
    expect.soft(await table.getColumnTextContents('First Name')).toBeSorted({
      descending: false,
      coerce: true,
    });

    await table.sortColumn({columnTitle: 'First Name', sortOrder: 'descending'});

    expect.soft(await table.getColumnSortingState('First Name')).toEqual('descending');
    expect.soft(await table.getColumnTextContents('First Name')).toBeSorted({
      descending: true,
      coerce: true,
    });
  });
});
