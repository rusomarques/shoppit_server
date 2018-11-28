/* eslint-disable-next-line no-console */
const express = require('express');
const router = express.Router();
const passport = require('./../fbStrategy');

router
  .get(
    '/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['public_profile', 'user_gender', 'user_birthday', 'email']
    })
  )

  .get(
    '/auth/facebook/redirect',
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  );

// add routes for login/logout

module.exports = router;
