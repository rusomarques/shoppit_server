const Seed = require('./../models/seedModel');
// const realData = require('./../scrape/data/seed-real-data.json');

const seedController = {};

seedController.seedItems = async data => {
  try {
    const bulk = data.items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      img_url: item.image,
      amazon_url: item.amazon_link,
      price: item.price,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    await Seed.seedItems(bulk);
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }
};

seedController.seedCategories = async data => {
  try {
    const bulk = data.categories;
    await Seed.seedCategories(bulk);
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }
};

seedController.seedItemCategories = async data => {
  try {
    const bulk = data.itemCategories;
    await Seed.seedItemCategories(bulk);
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }
};

module.exports = seedController;
