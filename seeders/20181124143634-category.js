'use strict';
// const data = require('./db.json');
const realData = require('./../scrape/data/seed-real-data.json');

module.exports = {
  up: queryInterface => {
    const categories = realData.categories.map(category => ({
      category_id: category.category_id,
      category_name: category.category_name,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    return queryInterface.bulkInsert('Categories', categories, {});
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
