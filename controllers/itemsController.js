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
    // user id may not be in req.body
    const { user_id } = req.headers;
    const result = { user_id };
    result.items = await Item.getRecommended(user_id);
    res.send(result).sendStatus(200);
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
    res.sendStatus(400);
  }
};

itemsController.setAffinity = async (req, res) => {
  try {
    // user id may not be in req.body
    const { user_id } = req.headers;

    const item_id = parseInt(req.params.item_id);
    let affinity = req.params.value;
    if (affinity === 'true') affinity = true;
    else if (affinity === 'false') affinity = false;
    else throw new Error('affinity must be true or false');
    await Item.setAffinity(user_id, item_id, affinity);
    res.sendStatus(201);
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
    res.sendStatus(400);
  }
};

module.exports = itemsController;
