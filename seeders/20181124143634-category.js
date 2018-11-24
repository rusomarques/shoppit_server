'use strict';
const data = require('./db.json');

module.exports = {
  up: queryInterface => {
    const categories = data.categories.map(category => ({
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
