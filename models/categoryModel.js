/* eslint-disable no-console */
const categoryModel = {};
const db = require('./../schemas');

categoryModel.getAll = async () => {
  const categories = await db.Category.findAll();
  const allCats = categories.map(cat => cat.dataValues);
  // console.log('all cats! 🐈', allCats);
  return allCats;
};

categoryModel.getAllItems = async category_id => {
  const items = await db.ItemCategory.findAll({
    where: { category_id },
    include: [
      {
        model: db.Item,
        as: 'item'
      }
    ]
  });
  const itemsInCategory = items.map(join => join.dataValues.item.dataValues);
  // console.log('items in this category', itemsInCategory);
  return itemsInCategory;
};

// categoryModel.getAll();
// categoryModel.getAllItems(1);

module.exports = categoryModel;
