const data = require('./data.json');

for (let category in data) {
  console.log(`${category}: ${data[category].length} items`); // eslint-disable-line no-console
}
