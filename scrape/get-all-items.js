const itemProvider = require('./fetch-item-provider');
const fs = require('fs');
const format = require('./format-data');

const rawData = {};

exports.getAllItems = async (categoriesNames, limit, offset = 0) => {
  // get items from different categories;
  await Promise.all(
    categoriesNames.map(async category => {
      const itemsOneCategory = await itemProvider.getItems(
        category,
        limit,
        offset
      );
      rawData[category] = itemsOneCategory;
    })
  );

  // format data and get relations between items and categories
  const db = await format.formatData(rawData);

  // write to data.json (existing and new data)
  fs.writeFile(
    __dirname + '/data/seed-real-data.json',
    JSON.stringify(db),
    'utf8',
    err => {
      /* eslint-disable no-console */
      if (err) console.log('Not able to save to json');
      else console.log(`items saved to json file, ready to seed into db`);
    }
  );
};
