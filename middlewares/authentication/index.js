/* eslint-disable-next-line no-console */
const express = require('express');
const router = express.Router();
const passport = require('./passport');

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

// add routes for login/logout

module.exports = router;
