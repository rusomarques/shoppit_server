const request = require('request');
const cheerio = require('cheerio');
console.log('hlfaslfa');

request('http://codedemos.com/sampleblog'),
  (error, response, html) => {
    console.log(error, response, html);

    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      // const category = $('.CollectionGrid-tileImage');
      // console.log('hola');

      console.log($);

      // console.log(category.html());
    }
    console.log(error);
  };
