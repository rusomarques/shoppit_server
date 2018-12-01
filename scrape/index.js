const scrape = require('./get-all-items');
const categories = require('./config').categories;

const buildRealData = async () => {
  await scrape.getAllItems(categories, 24, 0);
};

buildRealData();
