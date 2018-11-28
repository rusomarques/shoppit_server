const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const {
  clientID,
  clientSecret,
  callbackURL,
  profileFields
} = require('./config').facebook;

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
