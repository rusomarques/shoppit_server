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

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
  const user = await db.User.findOne({ user_id: id });
  done(null, user);
});

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
        // friends
      } = profile._json;
      if (birthday) {
        birthday = new Date(birthday);
      }
      const currentUser = await db.User.findOne({
        where: { user_id: id }
      });
      // fb_friends: friends.data[0]
      if (currentUser) {
        // user already exists
        done(null, currentUser);
      } else {
        // create new user
        const newUser = await db.User.create({
          user_id: id,
          first_name,
          last_name,
          gender,
          birthday,
          avatar_url: picture.data.url,
          email,
          accessToken
        });
        console.log('🎄 created!', newUser);
        return done(null, newUser);
      }
      // handle errors
    }
  )
);

module.exports = passport;

// const profileJSON = {
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
//         'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10156795786766963&height=50&width=50&ext=1546075310&hash=AeTktz1Rclki_O-J',
//       width: 50
//     }
//   },
//   friends: {
//     data: [{ name: 'Leandro Marques', id: '10157898275884325' }],
//     paging: {
//       cursors: {
//         before:
//           'QVFIUnlqU1ByM2FRMHNudUJSb1dUaXQ4WmgtOFItWlVIalpkVXd4d0xVblA2NTBjZA09LaVV4cERsTkJ2bXFuQUk4MlYZD',
//         after:
//           'QVFIUnlqU1ByM2FRMHNudUJSb1dUaXQ4WmgtOFItWlVIalpkVXd4d0xVblA2NTBjZA09LaVV4cERsTkJ2bXFuQUk4MlYZD'
//       }
//     },
//     summary: { total_count: 725 }
//   }
// };
