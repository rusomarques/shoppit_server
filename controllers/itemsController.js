/* eslint-disable no-console */
const itemModel = require('./../models/itemModel');
const scrape = require('./../scrape/get-items');

const itemsController = {};
// const Item = require('./../models/itemModel');

itemsController.setItemsfromCategory = async (
  mainCategory,
  category,
  limit,
  offset
) => {
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
    await itemModel.setItemsfromCategory(bulk);
  } catch (error) {
    console.log(error);
  }
};

itemsController.getRecommended = async (req, res) => {
  // do stuff;
  console.log('itemsController.getRecommended firing', req, res);
};

itemsController.setAffinity = async (req, res) => {
  // do stuff;
  console.log('itemsController.setAffinity firing', req, res);
};

itemsController.removeAffinity = async (req, res) => {
  // do stuff;
  console.log('itemsController.removeAffinity firing', req, res);
};

module.exports = itemsController;
