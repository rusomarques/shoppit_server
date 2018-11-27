const express = require('express');
const bodyParser = express.json();
const cors = require('cors');
// const authMiddleware = require('authMiddlewareHere');
const router = require('./router');
// add error handlers

const app = express();

app
  .use(cors())
  .use(bodyParser)
  // .use(authMiddleware)
  .use(router)
  .use((req, res) => {
    res.status(404).send(`${req.path} not found!`);
  });

// connect server to port in index.js
module.exports = app;
