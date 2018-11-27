const db = require('./../schemas');

const itemModel = {};

itemModel.setItemsfromCategory = async bulk => {
  try {
    await db.Item.bulkCreate(bulk);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
};

itemModel.getRecommended = async () => {};

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

itemModel.removeAffinity = async () => {};

module.exports = itemModel;
