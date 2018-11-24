'use strict';
const data = require('./db.json');

module.exports = {
  up: queryInterface => {
    const ItemCategories = [
      {
        item_id: data.items[0].item_id,
        category_id: data.categories[0].category_id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        item_id: data.items[0].item_id,
        category_id: data.categories[1].category_id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

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
