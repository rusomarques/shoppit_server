const mocks = require('./mocks/mocks');
const format = require('../scrape/format-data');

describe('Formating scrape to save into db', () => {
  it('itemCategories length should be >= Items length', async () => {
    const formatedData = await format.formatData(mocks);
    expect(formatedData.itemCategories.length).toBeGreaterThanOrEqual(
      formatedData.items.length
    );
  });
});
