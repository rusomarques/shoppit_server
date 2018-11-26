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

// categoryModel.getAllItems = async category_id => {
//   const items = await db.ItemCategory.findAll({
//     where: { category_id },
//     include: [
//       {
//         model: db.Item,
//         as: 'item'
//       }
//     ]
//   });
//   const itemsInCategory = items.map(join => join.dataValues.item.dataValues);
//   console.log('items in this category', itemsInCategory);
//   return itemsInCategory;
// };

// try this approach
// const items = await db.ItemCategory.findAll({
//   where: { category_id }
// });
// console.log(items.map(el => el.get({ plain: true })));
// // create an array with item ids;
// const items2 = await db.Items.findAll({
//   where: { item_id }
// });

// categoryModel.getAll();
categoryModel.getAllItems(1);

module.exports = categoryModel;
