const express = require('express');
// const routes = require('./routes');
// add error handlers

const app = express();
const port = 3333;

// enable cors support
// use express.json??
// apply routes

app.get('/', (req, res) => res.send('Hello There!'));

app.listen(port, () =>
  /* eslint-disable-next-line no-console */
  console.log(`🚀 Express server listening on port ${port}!`)
);

// export app (server) and connect to db in start.js
