/* eslint-disable no-console */
const categoryModel = {};
const db = require('./../schemas');

categoryModel.getAll = async () => {
  const categories = await db.Category.findAll;
  console.log(categories);
};

categoryModel.getAll();

module.exports = categoryModel;
