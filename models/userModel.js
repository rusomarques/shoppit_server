/* eslint-disable no-console */
const userModel = {};
const db = require('./../schemas');

userModel.getOwnInfo = async accesstoken => {
  const userInfo = await db.User.findOne({
    where: { accesstoken },
    include: [
      {
        model: db.Category,
        as: 'category',
        attributes: ['category_id', 'category_name'],
        required: false
      }
    ]
  });

  return userInfo.get({ plain: true });
};

userModel.getFollowing = async accesstoken => {
  const me = await db.User.findOne({
    where: { accesstoken }
  });

  const user1Friends = await me.getUser_1();
  const user2Friends = await me.getUser_2();
  return user1Friends.concat(user2Friends);
};

userModel.addCategory = async (accesstoken, category_id) => {
  const created = await db.UserCategory.findOrCreate({
    where: {
      accesstoken,
      category_id
    }
  });
  return created;
};

userModel.removeCategory = async (accesstoken, category_id) => {
  await db.UserCategory.destroy({
    where: {
      accesstoken,
      category_id
    }
  });
};

userModel.getLikedItems = async accesstoken => {
  const user = await db.User.findOne({
    where: { accesstoken }
  });
  const allItems = await user.getItem();
  const filtered = allItems
    .filter(item => item.UserItem.affinity === true)
    .map(item => {
      delete item.dataValues.UserItem;
      item.dataValues.affinity = true;
      return item;
    });

  const likedItems = [];

  await Promise.all(
    filtered.map(async item => {
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
      likedItems.push(item);
    })
  );

  return likedItems;
};

module.exports = userModel;
