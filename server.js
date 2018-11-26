const express = require('express');
const bodyParser = express.json();
const cors = require('cors');
// const authMiddleware = require('authMiddlewareHere');
// const routes = require('./routes');
// add error handlers

const app = express();

app
  .use(cors())
  .use(bodyParser)
  // .use(authMiddleware)
  // .use(routes)
  .use((req, res) => {
    res.status(404).send(`${req.path} not found!`);
  });

// export app (server) and connect to db in db.js
// connect server to port in index.js
module.exports = app;
