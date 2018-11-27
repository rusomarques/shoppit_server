/* eslint-disable no-console */
const categoriesController = {};
const Category = require('./../models/categoryModel');

categoriesController.getAll = async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.send(categories).sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

categoriesController.getAllItems = async (req, res) => {
  try {
    const category_id = req.params.category_id;
    const items = await Category.getAllItems(category_id);
    res.send(items).sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

module.exports = categoriesController;
