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
    $('.CollectionGrid a').each((i, el) => {
      var link = $(el).attr('href');
      console.log(link);
    });
  })
  .catch(err => console.log('ERROR', err));
