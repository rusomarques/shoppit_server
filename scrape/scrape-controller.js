const fs = require('fs');
const data = require('./data/data.json');

const scrapeController = {};

scrapeController.seedCategories = async () => {
  const categories = {
    categories: []
  };

  try {
    let i = 0;
    for (let category in data) {
      categories.categories.push({
        category_id: i,
        category_name: category
      });
      i++;
    }
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }

  fs.writeFile(
    __dirname + '/data/categories.json',
    JSON.stringify(categories),
    'utf8',
    e => {
      /* eslint-disable no-console */
      if (e) console.log(`couldn save to json`);
      else console.log(`categories saved to /data/categories.json`);
    }
  );
};

module.exports = scrapeController;
