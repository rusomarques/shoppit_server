'use strict';
const data = require('./db.json');

module.exports = {
  up: queryInterface => {
    const users = data.users.map(user => ({
      first_name: user.first_name,
      last_name: user.last_name,
      gender: user.gender,
      birthday: user.birthday,
      avatar_url: user.avatar_url,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    return queryInterface.bulkInsert('users', users, {});
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
