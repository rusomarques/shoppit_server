const db = require('./../schemas');
const moment = require('moment');
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

const searchBirthdays = async timeRange => {
  const birthdays = await db.sequelize.query(
    `SELECT u.first_name as birthdayPerson, u.birthday, r.first_name as sender, r.pushtoken
    FROM "Users" u
    INNER JOIN "Friends" f ON f.user_2_id = u.user_id
    INNER JOIN "Users" r ON f.user_1_id = r.user_id
    WHERE to_char(u.birthday, 'MM-DD') BETWEEN ? AND ?`,
    {
      replacements: [timeRange.inSixDays, timeRange.inEightDays],
      type: db.sequelize.QueryTypes.SELECT
    }
  );
  // console.log(birthdays);
  return birthdays;
};

// searchBirthdays(today);
// const example = {
//   inSixDays: '03-06',
//   inEightDays: '03-08'
// };
searchBirthdays(oneWeekRange);

// cron to inspect birthdays (every day at 8am)

// if 7 days to a person birthday,
// // save person's name & id = birthdayId

// look in db who whants to remind it (look in second column of friends)
// // x = db.Friend.findAll({where: {user_2_id: birthdayId }})

// for all x search in Users to see if have push token
// // user = db.findOne({where: {x.id}})
// // if (user.pushtoken)
// // // 12pm send a notification (if allowed push notifications)

// SELECT u.first_name, r.first_name
// FROM "Users" u
// INNER JOIN "Friends" f ON f.user_2_id = u.user_id
// INNER JOIN "Users" r ON f.user_1_id = r.user_id
// WHERE to_char(u.birthday, 'MM-DD') BETWEEN '09-29' AND '09-29';

// const birthdays = await db.sequelize.query(
//   `SELECT u.user_id, u.first_name, u.pushtoken
//   FROM "Users" u
//   WHERE to_char(u.birthday, 'MM-DD') BETWEEN ? AND ?`,
//   {
//     replacements: ['09-28', '09-30'],
//     type: db.sequelize.QueryTypes.SELECT
//   }
// );
