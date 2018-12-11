/* eslint-disable no-console */
const rp = require('request-promise');
const fs = require('fs');
const cheerio = require('cheerio');

let db = {};

const getCategoryLinks = async (mainCategory, limit, offset = 0) => {
  // read local db in links.json initialized as an empty object {}
  await fs.readFile(__dirname + '/data/links.json', 'utf8', (err, data) => {
    if (err) console.log('could not read /data/links.json');
    else db = JSON.parse(data);
  });

  const options = {
    url: `https://canopy.co/shop/${mainCategory}`,
    transform: function(body) {
      return cheerio.load(body);
    }
  };

  try {
    const $ = await rp(options);
    $('.CollectionGrid-tile').each((i, el) => {
      const title = $(el)
        .find('.CollectionGrid-tileName')
        .text()
        .trim();
      const specificlink = $(el)
        .attr('href')
        .replace(/\/shop\//, '');
      const encodedLink = encodeURIComponent(specificlink);
      const completeLink = `https://canopy.co/ajax/product_feed?include_users=true&order=trending&query=${encodedLink}&type=category&limit=${limit}&offset=${offset}`;
      db[mainCategory][title] = completeLink;
    });
  } catch (error) {
    console.log('ERROR', error);
  }

  // write to links.json (existing and new data)
  fs.writeFile(
    __dirname + '/data/links.json',
    JSON.stringify(db),
    'utf8',
    err => {
      if (err) console.log('Not able to save to json');
      else console.log(`${mainCategory} links saved to /data/links.json`); // eslint-disable-line no-console
    }
  );
};

getCategoryLinks('categories', 10, 0);
