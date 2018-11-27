const db = require('./../schemas');

const itemModel = {};

itemModel.setItemsfromCategory = async bulk => {
  try {
    await db.Item.bulkCreate(bulk);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
};

itemModel.getRecommended = async user_id => {
  const user = await db.User.findOne({
    where: { user_id }
  });
  const categories = await user.getCategory();

  const items = await Promise.all(
    categories.map(async category => {
      return await category.getItem({ raw: true });
    })
  );

  console.log(items); // eslint-disable-line no-console
};

itemModel.getRecommended(1);

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
