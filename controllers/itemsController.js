const Item = require('./../models/itemModel');
const scrape = require('./../scrape/get-items');

const itemsController = {};

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
    await Item.setItemsfromCategory(bulk);
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }
};

itemsController.getRecommended = async (req, res) => {
  try {
    const { user_id } = req.body;
    const result = {
      user_id
    };
    result.items = await Item.getRecommended(user_id);
    res.send(result).status(200);
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }
};

itemsController.setAffinity = async () => {};

module.exports = itemsController;
