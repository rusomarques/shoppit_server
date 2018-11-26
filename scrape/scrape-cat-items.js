const rp = require('request-promise');
const fs = require('fs');

let db = {};

const getCategoryItems = async (category, limit = 12, offset = 0) => {
  // read local db in data.json initialized as an empty object {}
  await fs.readFile(__dirname + '/data.json', 'utf8', (err, data) => {
    if (err) console.log('could not read data.json');
    else db = JSON.parse(data);
  });

  // fertch canopy and save to db results
  try {
    const url = `https://canopy.co/ajax/product_feed?include_users=true&order=trending&query=${category}&type=category&limit=${limit}&offset=${offset}`;
    const data = await rp(url);
    const items = JSON.parse(data).products;
    if (!db[category]) {
      db[category] = items;
    } else {
      db[category] = [...db[category], ...items];
    }
  } catch (error) {
    console.log('couldnt fetch canopy', error); // eslint-disable-line no-console
  }

  // write to data.json (existing and new data)
  fs.writeFile(__dirname + '/data.json', JSON.stringify(db), 'utf8', err => {
    if (err) console.log('Not able to save to json');
    else console.log(`${limit} ${category} items saved to db`); // eslint-disable-line no-console
  });
};

getCategoryItems('for-the-curious', 10, 0);
