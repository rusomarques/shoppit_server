/* eslint-disable no-console */

const userModel = {};
const db = require('./../schemas');

userModel.createUser = async () => {
  // idk yet we gotta do something cool here
};

userModel.getOwnInfo = async user_id => {
  const userInfo = await db.User.findOne({
    where: { user_id },
    include: [
      {
        model: db.Category,
        as: 'category',
        attributes: ['category_id', 'category_name'],
        required: false
      }
    ]
  });

  // console.log('userinfoooo', userInfo.get({ plain: true }));
  // return object with basic info, categories
  return userInfo.get({ plain: true });
};

userModel.getFriends = async user_id => {
  const me = await db.User.findOne({
    where: { user_id }
  });

  const user1Friends = await me.getUser_1();
  const user2Friends = await me.getUser_2();
  // console.log('🌟', JSON.stringify(user1Friends.concat(user2Friends)));
  return JSON.stringify(user1Friends.concat(user2Friends));
};

userModel.addCategory = async (user_id, category_id) => {
  const created = await db.UserCategory.findOrCreate({
    where: {
      user_id,
      category_id
    }
  });
  console.log('created!!', JSON.stringify(created));
};

userModel.removeCategory = async (user_id, category_id) => {
  const lala = await db.UserCategory.destroy({
    where: {
      user_id,
      category_id
    }
  });
  console.log('deleted!', JSON.stringify(lala));
};

userModel.getLikedItems = async user_id => {
  const user = await db.User.findOne({
    where: { user_id }
  });
  const allItems = await user.getItem();
  const likedItems = allItems.filter(item => item.UserItem.affinity === true);

  // console.log('🎁 like', JSON.stringify(likedItems));
  return likedItems;
};

// userModel.getOwnInfo(1);
// userModel.getFriends(1);
// userModel.getLikedItems(1);
userModel.addCategory(2, 2);
// userModel.removeCategory(2, 2);

module.exports = userModel;
