/* eslint-disable no-console */
const categoryModel = {};
const db = require('./../schemas');

categoryModel.getAll = async () => {
  const categories = await db.Category.findAll({
    raw: true
  });
  // console.log('all cats 🐈', categories);
  return categories;
};

categoryModel.getAllItems = async category_id => {
  const category = await db.Category.findOne({
    where: { category_id }
  });
  const items = await category.getItem();
  // console.log('wowwww', JSON.stringify(items));
  return JSON.stringify(items);
};

// categoryModel.getAll();
categoryModel.getAllItems(1);

module.exports = categoryModel;
