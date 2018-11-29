/* eslint-disable no-console */
const db = require('./../schemas');
const _ = require('lodash');

const itemModel = {};

itemModel.getRecommended = async user_id => {
  const user = await db.User.findOne({
    where: { user_id }
  });
  // get all the categories a user likes
  const categories = await user.getCategory();
  const flatten = [];

  // for each category, get all of the items in that category
  await Promise.all(
    categories.map(async category => {
      const cat = await category.getItem();
      // this results to an array of arrays, so you should flatten it
      flatten.push(...cat);
    })
  );

  // filter the array of items to remove duplicates (because an item can be in multiple categories)
  const filtered = _.uniqBy(flatten, 'item_id');

  const itemFeed = [];

  // remove any items that the user has seen (set an affinity for it) before
  await Promise.all(
    filtered.map(async item => {
      const product = await item.getUser({ where: { user_id } });
      if (!product.length) itemFeed.push(item);
    })
  );

  return _.shuffle(itemFeed);
};

itemModel.setAffinity = async (user_id, item_id, affinity) => {
  const user = await db.User.findOne({
    where: { user_id }
  });
  const item = await user.getItem({ where: { item_id } });
  if (item.length) {
    await db.UserItem.update(
      { affinity },
      {
        where: {
          user_id,
          item_id
        }
      }
    );
  } else {
    await db.UserItem.create({
      user_id,
      item_id,
      affinity
    });
  }
};

itemModel.getRecommended('2');

module.exports = itemModel;

// itemModel.getRecommended = async user_id => {
//   const recommended = await db.sequelize.query(
//     `SELECT i.item_id, i.item_name, i.img_url, i.amazon_url, i.price
//     FROM "Items" i
//     INNER JOIN "ItemCategories" ic ON ic.item_id = i.item_id
//     INNER JOIN "Categories" c ON ic.category_id = c.category_id
//     INNER JOIN "UserCategories" uc ON uc.category_id = c.category_id
//     INNER JOIN "Users" u ON u.user_id = uc.user_id AND u.user_id = :user_id
//     LEFT JOIN "UserItems" ui ON ui.user_id = u.user_id AND ui.item_id = i.item_id
//     WHERE ui.user_id IS NULL`,
//     {
//       nest: true,
//       replacements: { user_id }
//     }
//   );

//   // u.first_name as "user.first_name"
//   console.log(JSON.stringify(recommended));
// };

// const itemCategories = [];

// // get an array of arrays of all the categories that correspond to each item
// await Promise.all(
//   noAffinity.map(async item => {
//     const cat = await item.getCategory();
//     itemCategories.push(cat);
//   })
// );

// console.log('🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌', JSON.stringify(itemCategories));

// // shuffle the resulting array of items, and return
// // console.log('🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅', JSON.stringify(itemFeed));
