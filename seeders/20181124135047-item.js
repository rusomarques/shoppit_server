'use strict';
const data = require('./db.json');

module.exports = {
  up: queryInterface => {
    const items = data.items.map(item => ({
      item_name: item.item_name,
      img_url: item.img_url,
      amazon_url: item.amazon_url,
      price: item.price,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    return queryInterface.bulkInsert('Items', items, {});
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
