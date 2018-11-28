const Seed = require('./../models/seedModel');
const scrape = require('../scrape/get-items-by-cat');

const seedController = {};

seedController.seedItems = async (mainCategory, category, limit, offset) => {
  try {
    const data = await scrape.getCategoryItems(
      mainCategory,
      category,
      limit,
      offset
    );
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
