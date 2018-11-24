const rp = require('request-promise');
const cheerio = require('cheerio');

const options = {
  url: 'https://canopy.co/shop/gifts',
  transform: function(body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(data => {
    data('.CollectionGrid-tileName').each((i, el) => {
      const title = cheerio
        .load(el)
        .text()
        .trim();

      console.log(title);
    });
  })
  .catch(err => console.log('ERROR', err));

// rp(options)
//   .then(data => {
//     data('.CollectionGrid-tile').each((i, el) => {
//       const title = cheerio
//         .load(el)
//         .find('.CollectionGrid-tileName')
//         .text()
//         .trim();

//       const link = cheerio.load(el).attr('href');

//       console.log(title);
//       console.log(link);
//     });
//   })
//   .catch(err => console.log('ERROR', err));

// request('http://codedemos.com/sampleblog'),
//   (error, response, html) => {
//     console.log(error, response, html);

//     if (!error && response.statusCode == 200) {
//       const $ = cheerio.load(html);
//       // const category = $('.CollectionGrid-tileImage');
//       // console.log('hola');

//       console.log($);

//       // console.log(category.html());
//     }
//     console.log(error);
//   };
