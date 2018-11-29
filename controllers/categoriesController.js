/* eslint-disable no-console */
const categoriesController = {};
const Category = require('./../models/categoryModel');

categoriesController.getAll = async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.status(200).send(categories);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

categoriesController.getAllItems = async (req, res) => {
  try {
    const category_id = req.params.category_id;
    const items = await Category.getAllItems(category_id);
    res.status(200).send(items);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

module.exports = categoriesController;
