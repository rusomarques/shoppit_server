const passport = require('passport');
const { FacebookStrategy } = require('passport-facebook');
const {
  clientID,
  clientSecret,
  callbackURL,
  profileFields
} = require('./config');

passport.use(
  new FacebookStrategy(
    {
      clientID,
      clientSecret,
      callbackURL,
      profileFields
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

// passport.serializeUser here

// passport.deserializeUser here

module.exports = passport;
