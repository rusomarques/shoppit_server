'use strict';
const data = require('./db.json');

module.exports = {
  up: queryInterface => {
    const users = data.users.map(user => ({
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      gender: user.gender,
      birthday: user.birthday,
      avatar_url: user.avatar_url,
      email: user.email,
      accesstoken: user.accesstoken,
      pushtoken: user.pushtoken,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    return queryInterface.bulkInsert('Users', users, {});
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
