const scrape = require('./get-all-items');
const config = require('./config');

const buildRealData = async () => {
  await scrape.getAllItems(config.categories, config.numOfItems, config.offset);
};

buildRealData();
