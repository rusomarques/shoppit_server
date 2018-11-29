require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = express.json();
// const session = require('express-session');
const passport = require('passport');
const authRouter = require('./routes/auth-router');
const wisherRouter = require('./routes/wisher-router');
const cookieSession = require('cookie-session');
const key = require('./config');
// add error handlers

const app = express();

app
  .use(express.static('./public'))
  .use(
    cookieSession({
      maxAge: 24 * 60 * 60 * 1000,
      keys: key.session.keys
    })
  )
  .use(cors())
  // .use(session({ secret: process.env.EXPRESS_SECRET }))
  .use(bodyParser)
  .use(passport.initialize())
  .use(passport.session())
  // have to figure out how to pass app to middlewares and return?
  .use(authRouter)
  .use(wisherRouter)
  .use((req, res) => {
    res.status(404).send(`${req.path} not found!`);
  });

// connect server to port in index.js
module.exports = app;
