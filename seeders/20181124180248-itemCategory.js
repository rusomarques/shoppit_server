'use strict';
// const data = require('./db.json');
const realData = require('./../scrape/data/seed-real-data.json');

module.exports = {
  up: queryInterface => {
    const ItemCategories = realData.itemCategories.map(itemCat => ({
      item_id: itemCat.item_id,
      category_id: itemCat.category_id,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    return queryInterface.bulkInsert('ItemCategories', ItemCategories, {});
  },

  down: () => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
