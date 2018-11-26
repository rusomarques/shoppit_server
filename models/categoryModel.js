/* eslint-disable no-console */
const categoryModel = {};
const db = require('./../schemas');

categoryModel.getAll = async () => {
  const categories = await db.Category.findAll({
    raw: true
  });
  console.log('all cats 🐈', categories);
  return categories;
};

categoryModel.getAllItems = async category_id => {
  const items = await db.Item.findAll({
    include: [
      {
        model: db.Category,
        as: 'category',
        where: { category_id }
      }
    ],
    raw: true
  });
  return items;
};

// categoryModel.getAll();
categoryModel.getAllItems(1);

module.exports = categoryModel;
