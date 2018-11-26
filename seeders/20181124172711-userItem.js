'use strict';
const data = require('./db.json');

module.exports = {
  up: queryInterface => {
    const userItem = [
      {
        user_id: data.users[0].user_id,
        item_id: data.items[0].item_id,
        affinity: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: data.users[0].user_id,
        item_id: data.items[1].item_id,
        affinity: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: data.users[0].user_id,
        item_id: data.items[2].item_id,
        affinity: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: data.users[0].user_id,
        item_id: data.items[3].item_id,
        affinity: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: data.users[1].user_id,
        item_id: data.items[4].item_id,
        affinity: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: data.users[1].user_id,
        item_id: data.items[0].item_id,
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
