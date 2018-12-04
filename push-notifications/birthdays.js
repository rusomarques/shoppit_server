const db = require('./../schemas');
const moment = require('moment');

const searchBirthdays = async () => {
  const today = {
    inSixDays: new Date(),
    inEightDays: new Date()
  };

  today.inSixDays.setDate(today.inSixDays.getDate() + 6);
  today.inEightDays.setDate(today.inEightDays.getDate() + 8);
  const oneWeekRange = [
    moment(today.inSixDays).format('MM-DD'),
    moment(today.inEightDays).format('MM-DD')
  ];

  const birthdays = await db.sequelize.query(
    `SELECT u.first_name as birthdayPerson, u.birthday, r.first_name as sender, r.pushtoken
    FROM "Users" u
    INNER JOIN "Friends" f ON f.user_2_id = u.user_id
    INNER JOIN "Users" r ON f.user_1_id = r.user_id
    WHERE to_char(u.birthday, 'MM-DD') BETWEEN ? AND ?`,
    {
      replacements: [oneWeekRange[0], oneWeekRange[1]],
      type: db.sequelize.QueryTypes.SELECT
    }
  );

  return birthdays;
};

module.exports = searchBirthdays;

/*
  return birthdays is an array like the following: 

  [ { birthdayperson: 'Leandro',
    birthday: 1988-09-28T23:00:00.000Z,
    sender: 'Amy',
    pushtoken: ExponentPushToken[_MUr0xHnfdasfaDJfadsfasBns] },
  { birthdayperson: 'Leandro',
    birthday: 1988-09-28T23:00:00.000Z,
    sender: 'Luke',
    pushtoken: ExponentPushToken[_MUr0xHnfffsaDJfaddfasfdBns] } ]
*/

// replacements: ['03-06', '03-08'],

// SELECT u.first_name, r.first_name
// FROM "Users" u
// INNER JOIN "Friends" f ON f.user_2_id = u.user_id
// INNER JOIN "Users" r ON f.user_1_id = r.user_id
// WHERE to_char(u.birthday, 'MM-DD') BETWEEN '09-29' AND '09-29';
