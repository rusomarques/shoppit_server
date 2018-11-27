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

  const categoryItems = {};
  const catProp = category.get({ plain: true }).category_name;
  const itemsKey = await category.getItem();

  categoryItems[catProp] = itemsKey;
  return categoryItems;
};

// categoryModel.getAll();
categoryModel.getAllItems(1);

module.exports = categoryModel;
