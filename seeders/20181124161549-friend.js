'use strict';
const data = require('./db.json');

module.exports = {
  up: queryInterface => {
    const friends = [
      {
        user_1_id: data.users[0].user_id,
        user_2_id: data.users[1].user_id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    return queryInterface.bulkInsert('Friends', friends, {});
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
