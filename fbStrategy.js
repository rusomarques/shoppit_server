/* eslint-disable no-console */
const db = require('./schemas');
const {
  clientID,
  clientSecret,
  callbackURL,
  profileFields
} = require('./config').facebook;
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');

passport.use(
  new FacebookStrategy(
    {
      clientID,
      clientSecret,
      callbackURL,
      profileFields
    },
    async (accessToken, refreshToken, profile, done) => {
      let {
        id,
        first_name,
        last_name,
        birthday,
        gender,
        picture,
        email
      } = profile._json;
      if (birthday) {
        birthday = new Date(birthday);
      }
      const newUser = await db.User.build({
        user_id: id,
        first_name,
        last_name,
        gender,
        birthday,
        avatar_url: picture.data.url,
        email
      });
      const createdUser = await newUser.save();
      console.log('🎄 created!', createdUser);

      return done(null, profile);
    }
  )
);

// passport.serializeUser here

// passport.deserializeUser here

module.exports = passport;

// const newUser = {
//   user_id: data.id,
//   first_name: data.first_name,
//   last_name: data.last_name,
//   gender: data.gender,
//   birthday: data.birthday,
//   avatar_url: data.picture.data.url,
//   email: data.email
// };

// const wow = {
//   id: '10156795786766963',
//   first_name: 'Amy',
//   last_name: 'Kirasack',
//   gender: 'female',
//   birthday: '02/10/1991',
//   email: 'amykirasack@gmail.com',
//   picture: {
//     data: {
//       height: 50,
//       is_silhouette: false,
//       url:
//         'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10156795786766963&height=50&width=50&ext=1546014299&hash=AeTNlJu81NhIStYE',
//       width: 50
//     }
//   }
// };

// const data = profile._json;
// const { user_id } = data;
// const userInDB = await db.User.findOne({
//   where: { user_id }
// });
// try {
//   if (userInDB) {
//     console.log(`User with id ${user_id} exists!`);
//   } else {
//     const newUser = new db.User({
//       user_id: data.id,
//       first_name: data.first_name,
//       last_name: data.last_name,
//       gender: data.gender,
//       birthday: data.birthday,
//       avatar_url: data.picture.data.url,
//       email: data.email
//     });
//     const createdUser = await db.User.create(newUser);
//     console.log('created!', createdUser);
//   }
// } catch (e) {
//   console.log('Error!', e);
// }
