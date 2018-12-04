const mocks = require('./mocks/mocks');
const format = require('../scrape/format-data');

describe('Formating scrape to save into db', () => {
  it('itemCategories length should be >= Items length', async () => {
    const formatedData = await format.formatData(mocks);
    expect(formatedData.itemCategories.length).toBeGreaterThanOrEqual(
      formatedData.items.length
    );
  });
  it('itemCategories length should be = to the sum of all categories length', async () => {
    let sum = 0;
    for (let category in mocks) {
      sum += mocks[category].length;
    }
    const formatedData = await format.formatData(mocks);
    expect(sum).toEqual(formatedData.itemCategories.length);
  });
  it('Categories length should be = to the number of categories', async () => {
    let sum = 0;
    for (let category in mocks) {
      category;
      sum++;
    }
    const formatedData = await format.formatData(mocks);
    expect(sum).toEqual(formatedData.categories.length);
  });
});
