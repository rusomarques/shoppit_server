const Item = require('./../models/itemModel');

const itemsController = {};

itemsController.getRecommended = async (req, res) => {
  try {
    // user id may not be in req.body
    const { user_id } = req.headers;
    const items = await Item.getRecommended(user_id);
    res.status(200).send(items);
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
    const seenItem = await Item.setAffinity(user_id, item_id, affinity);
    res.status(201).send(seenItem);
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
    res.sendStatus(400);
  }
};

module.exports = itemsController;
