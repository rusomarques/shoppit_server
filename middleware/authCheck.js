/* eslint-disable no-console */
const db = require('../schemas');
const fetchFacebook = require('./../fetchFacebook');

const authCheck = async (req, res, next) => {
  try {
    const { accesstoken } = req.headers;
    // check in db for accessToken
    const currentUser = await db.User.findOne({
      where: { accesstoken }
    });

    // // if exists in db call next with user id that matches accessToken
    if (currentUser) {
      next();
    } else {
      // if doesn't exist query oAuth provider with accessToken
      const profile = fetchFacebook(accesstoken);

      // upsert user in db by user id returned from oAuth provider
      if (profile.birthday) {
        var birthdayDate = new Date(profile.birthday);
      }
      await db.User.upsert({
        user_id: profile.id,
        first_name: profile.first_name,
        last_name: profile.last_name,
        gender: profile.gender,
        birthday: birthdayDate,
        avatar_url: profile.picture.data.url,
        email: profile.email,
        accesstoken
      });

      next();
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = authCheck;

// get ME access token from req
// make request to facebook
// get profile and parse it
// get friends array data ([{id, name}, {id, name}])

// we need to get relation from ME to each friend
// call ME.getFollow({where: {user_id: id}}) multiple times

// loop over friends array and do User.findOne by id
//   create new array of users

// ---------------------------
// Follow Table
// user1_id           user2_id

// const ids = [{ id, amy }, { id, charlie }, { id, potato }];
// // const ids = Object.values()

// const myFriends = [];

// ids.map(async obj => {
//   const user = await db.User.findOne({
//     where: { user_id: obj[id] }
//   });
//   myFriends.push(user);
// });

// return myFriends;

// [{id, amy, ...allinfo}, {id, charlie, ...allinfo}, {id, potato, ...allinfo}]

// const follows = [];

// myFriends.map(async friend => {
//   const followInfo = await
// })
// const me = await db.User.findOne({
//   where: { id }
// });

// const userFollow = await me.getFollow({where: {user2_id: id}})

// [
//   {
//       "user_id": "10156795786766963",
//       "first_name": "Amy",
//       "last_name": "Kirasack",
//       "gender": "female",
//       "birthday": "1540-06-18T00:00:00.000Z",
//       "avatar_url": "https://i.imgur.com/z3bJzUi.jpg",
//       "email": "wowowow@cool.com",
//       // "isFollowing": true,
//       "Follow": {
//           "isFollowing": true,
//           "user_1_id": "10156795786766963",
//           "user_2_id": "10157898275884325",
//       }
//   },
//   {
//     "user_id": "1273800002",
//     "first_name": "Charlie",
//     "last_name": "Rutland",
//     "gender": "female",
//     "birthday": "1540-06-18T00:00:00.000Z",
//     "avatar_url": "https://i.imgur.com/z3bJzUi.jpg",
//     "email": "catsarecool@cool.com",
//     "Follow": {
//         "isFollowing": true,
//         "user_1_id": "10156795786766963",
//         "user_2_id": "10157898275884325",
//     }
//   },
//   {
//     "user_id": "384903284902384092",
//     "first_name": "Potato",
//     "last_name": "Potato",
//     "gender": "female",
//     "birthday": "1540-06-18T00:00:00.000Z",
//     "avatar_url": "https://i.imgur.com/z3bJzUi.jpg",
//     "email": "catsarecool@cool.com",
//     "Follow": {
//         "isFollowing": false,
//         "user_1_id": "10156795786766963",
//         "user_2_id": "10157898275884325",
//     }
// }
// ]
