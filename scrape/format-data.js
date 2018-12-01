const _ = require('lodash');

const scrapeController = {};

// reads raw data and returns data to save in psql db (tables: Items, Categories, ItemsCategories)
scrapeController.formatData = async data => {
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
    return db;
  } catch (e) {
    console.log('not able to format data', e); // eslint-disable-line no-console
  }
};

const renameCategory = name => {
  if (name === 'for-her') return 'For her';
  else if (name === 'for-him') return 'For him';
  else if (name === 'for-mom') return 'For mom';
  else if (name === 'for-dad') return 'For dad';
  else if (name === 'for-kids') return 'For kids';
  else if (name === 'for-the-pet') return 'Animal lover';
  else {
    const sanitize = name.replace(/for-the-/, '');
    name = sanitize.charAt(0).toUpperCase() + sanitize.slice(1);
  }
  return name;
};

module.exports = scrapeController;
