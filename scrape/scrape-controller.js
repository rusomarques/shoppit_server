const fs = require('fs');
const _ = require('lodash');
const data = require('./data/data.json');

const scrapeController = {};

scrapeController.seed = async () => {
  const db = {
    categories: []
  };
  const tempItems = [];

  try {
    let i = 0;
    for (let category in data) {
      db.categories.push({
        category_id: i,
        category_name: category
      });
      i++;

      tempItems.push(...data[category]);
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
      else console.log(`categories saved to /data/seed-real-data.json`);
    }
  );
};

module.exports = scrapeController;
