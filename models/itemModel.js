const db = require('./../schemas');
const _ = require('lodash');

const itemModel = {};

itemModel.getRecommended = async user_id => {
  const user = await db.User.findOne({
    where: { user_id }
  });
  const categories = await user.getCategory();
  const flatten = [];
  await Promise.all(
    categories.map(async category => {
      const cat = await category.getItem();
      flatten.push(...cat);
    })
  );

  const filtered = _.uniqBy(flatten, 'item_id');

  const itemFeed = [];
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

module.exports = itemModel;
