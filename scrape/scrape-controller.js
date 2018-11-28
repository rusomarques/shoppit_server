const fs = require('fs');
const _ = require('lodash');
const data = require('./data/data.json');

const scrapeController = {};

scrapeController.seed = async () => {
  const db = {
    categories: [],
    itemCategories: []
  };
  const tempItems = [];

  try {
    let i = 1;
    for (let category in data) {
      db.categories.push({
        category_id: i,
        category_name: category
      });

      data[category].forEach(item => {
        tempItems.push(item);
        db.itemCategories.push({
          category_id: i,
          item_id: item.id
        });
      });

      // tempItems.push(...data[category]);
      i++;
    }

    db.items = _.uniqBy(tempItems, 'id');
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }

  fs.writeFile(
    __dirname + '/data/seed-real-data.json',
    JSON.stringify(db),
    'utf8',
    e => {
      /* eslint-disable no-console */
      if (e) console.log(`could not save to json`);
      else
        console.log(
          `categories, items and itemCategories saved to seed-real-data.json`
        );
    }
  );
};

module.exports = scrapeController;
