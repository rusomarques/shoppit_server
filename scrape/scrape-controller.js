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
        category_name: renameCategory(category)
      });

      data[category].forEach(item => {
        tempItems.push(item);
        db.itemCategories.push({
          category_id: i,
          item_id: item.id
        });
      });

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

const renameCategory = name => {
  if (name === 'for-her') return 'For her';
  else if (name === 'for-him') return 'For him';
  else if (name === 'for-mom') return 'For mom';
  else if (name === 'for-dad') return 'For dad';
  else if (name === 'for-kids') return 'For kids';
  else {
    const sanitize = name.replace(/for-the-/, '');
    name = sanitize.charAt(0).toUpperCase() + sanitize.slice(1);
  }
  return name;
};

module.exports = scrapeController;
