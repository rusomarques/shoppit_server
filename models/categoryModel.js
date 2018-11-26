/* eslint-disable no-console */
const categoryModel = {};
const db = require('./../schemas');

categoryModel.getAll = async () => {
  const categories = await db.Category.findAll();
  // console.log('ooo', categories.get('category_name'));
  console.log('here are all categories', categories);
  const allCats = categories.map(cat => cat.dataValues);
  console.log('meow', allCats);
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
    // attributes: ['item_id']
  });
  // console.log('items here', items.dataValues);
  const itemIDs = items.map(item => item.dataValues);
  console.log('aaa', itemIDs);
};

categoryModel.getAll();
// categoryModel.getAllItems(1);

module.exports = categoryModel;
