const { rawData, processedData } = require('./mocks/mocks.scrape');
const format = require('../scrape/format-data');

describe('Formating scrape to save into db', () => {
  it('itemCategories length should be >= Items length', async () => {
    const formatedData = await format.formatData(rawData);
    expect(formatedData.itemCategories.length).toBeGreaterThanOrEqual(
      formatedData.items.length
    );
  });
  it('itemCategories length should be = to the sum of all categories length', async () => {
    let sum = 0;
    for (let category in rawData) {
      sum += rawData[category].length;
    }
    const formatedData = await format.formatData(rawData);
    expect(sum).toEqual(formatedData.itemCategories.length);
  });
  it('Categories length should be = to the number of categories', async () => {
    let sum = 0;
    for (let category in rawData) {
      category;
      sum++;
    }
    const formatedData = await format.formatData(rawData);
    expect(sum).toEqual(formatedData.categories.length);
  });

  // can vary if mock data changes:
  it('formated data should equeal processed data from mocks', async () => {
    const formatedData = await format.formatData(rawData);
    expect(processedData.categories).toEqual(formatedData.categories);
  });
});
