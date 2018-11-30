require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = express.json();
const wisherRouter = require('./routes/wisher-router');

const app = express();

app
  .use(cors())
  .use(bodyParser)
  .use(wisherRouter)
  .use((req, res) => {
    res.status(404).send(`${req.path} not found!`);
  });

// connect server to port in index.js
module.exports = app;
