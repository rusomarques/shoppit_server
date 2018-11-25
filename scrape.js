const rp = require('request-promise');
const cheerio = require('cheerio');

const options = {
  url: 'https://canopy.co/shop/gifts',
  transform: function(body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then($ => {
    $('.CollectionGrid-tile').each((i, el) => {
      const title = $(el)
        .find('.CollectionGrid-tileName')
        .text()
        .trim();
      const link = $(el).attr('href');
      console.log(title);
      console.log(link);
    });
  })
  .catch(err => console.log('ERROR', err));
