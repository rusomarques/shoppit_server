/* eslint-disable-next-line no-console */
const express = require('express');
const router = express.Router();
const passport = require('./../fbStrategy');

router
  // auth with facebook
  .get(
    '/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['public_profile', 'user_gender', 'user_birthday', 'email']
    })
  )

  // callback route with facebook to redirect to after authentication
  .get(
    '/auth/facebook/redirect',
    passport.authenticate('facebook'),
    (req, res) => {
      res.send('You are redirected!!');
    }
  );

// passport.authenticate('facebook', {
//   successRedirect: '/lalala',
//   failureRedirect: '/login'
// })

// add routes for login/logout

module.exports = router;
