/* eslint-disable no-console */
const categoryModel = {};
const db = require('./../schemas');

categoryModel.getAll = async () => {
  const categories = await db.Category.findAll();
  return categories;
};

categoryModel.getAllItems = async category_id => {
  const category = await db.Category.findOne({
    where: { category_id }
  });

  const categoryItems = await category.getItem();
  const allInCat = categoryItems.map(item => {
    delete item.dataValues.ItemCategory;
    return item;
  });

  const items = [];

  await Promise.all(
    allInCat.map(async item => {
      item.dataValues.categories = [];
      let cat = await item.getCategory({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      });
      cat = cat.map(c => {
        delete c.dataValues.ItemCategory;
        return c;
      });

      delete item.dataValues.ItemCategory;
      item.dataValues.categories.push(...cat);
      items.push(item);
    })
  );

  // may have to filter out seen items for authenticated user
  return items;
};

module.exports = categoryModel;
