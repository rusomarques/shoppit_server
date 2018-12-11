const app = require('./server');
const port = 3333;

app.listen(port, () =>
  /* eslint-disable-next-line no-console */
  console.log(`🚀 Express server listening on port ${port}!`)
);
