'use strict';
const data = require('./db.json');

module.exports = {
  up: queryInterface => {
    const UserCategories = [
      {
        user_id: data.users[0].user_id,
        category_id: data.categories[0].category_id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: data.users[0].user_id,
        category_id: data.categories[2].category_id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: data.users[0].user_id,
        category_id: data.categories[3].category_id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: data.users[1].user_id,
        category_id: data.categories[2].category_id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: data.users[1].user_id,
        category_id: data.categories[3].category_id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    return queryInterface.bulkInsert('UserCategories', UserCategories, {});
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
