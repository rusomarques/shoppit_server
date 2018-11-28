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
        email,
        accessToken
      });
      const createdUser = await newUser.save();
      console.log('🎄 created!', createdUser);
      // handle errors

      return done(null, profile);
    }
  )
);

// passport.serializeUser here

// passport.deserializeUser here

module.exports = passport;
