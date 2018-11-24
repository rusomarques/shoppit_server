'use strict';
const data = require('./db.json');

module.exports = {
  up: queryInterface => {
    const userItem = [
      {
        user_id: data.users[0].user_id,
        item_id: data.items[2].item_id,
        affinity: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    return queryInterface.bulkInsert('UserItems', userItem, {});
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
