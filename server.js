require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = express.json();
// const session = require('express-session');
const passport = require('./passport');
// const auth = require('./middlewares/authentication');
const router = require('./router');
// add error handlers

const app = express();

app
  .use(cors())
  // .use(session({ secret: process.env.EXPRESS_SECRET }))
  .use(bodyParser)
  .use(passport.initialize())
  .use(passport.session())
  // have to figure out how to pass app to middlewares and return?
  // .use(auth)
  .use(router)
  .use((req, res) => {
    res.status(404).send(`${req.path} not found!`);
  });

// connect server to port in index.js
module.exports = app;
