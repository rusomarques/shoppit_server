/* eslint-disable no-console */
const userModel = {};
const db = require('./../schemas');
const fetchFacebook = require('../fetchAuth').facebook;

userModel.upsertUser = async (profile, accesstoken, pushtoken) => {
  if (profile.birthday) {
    var birthdayDate = new Date(profile.birthday);
  }

  await db.User.upsert({
    user_id: profile.id,
    first_name: profile.first_name,
    last_name: profile.last_name,
    gender: profile.gender,
    birthday: birthdayDate,
    avatar_url: profile.picture.data.url,
    email: profile.email,
    accesstoken,
    pushtoken
  });

  // set user's relation to category (this is hard coded, and not very category-agnostic)
  const catName = profile.gender === 'female' ? 'for her' : 'for him';
  const findCatID = async category_name => {
    const catObj = await db.Category.findOne({ where: { category_name } });
    return catObj.category_id;
  };
  // TODO: handle a third case? when gender is undefined or other, add both categories
  const category_id = await findCatID(catName);
  await userModel.addCategory(accesstoken, category_id);

  return;
};

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

  return userInfo;
};

userModel.getFriends = async accesstoken => {
  const profile = await fetchFacebook(accesstoken);
  const friendsIDs = profile.friends.data;

  const userFriends = [];

  await Promise.all(
    friendsIDs.map(async obj => {
      const friend = await db.User.findOne({
        where: { user_id: obj.id },
        attributes: { exclude: ['accesstoken'] }
      });
      userFriends.push(friend);
    })
  );

  return userFriends;
};

userModel.addCategory = async (accesstoken, category_id) => {
  const user = await db.User.findOne({
    where: { accesstoken }
  });
  const created = await db.UserCategory.findOrCreate({
    where: {
      user_id: user.user_id,
      category_id
    }
  });
  return created;
};

userModel.removeCategory = async (accesstoken, category_id) => {
  const user = await db.User.findOne({
    where: { accesstoken }
  });
  await db.UserCategory.destroy({
    where: {
      user_id: user.user_id,
      category_id
    }
  });
};

userModel.getLikedItems = async user_id => {
  const user = await db.User.findOne({
    where: { user_id }
  });
  const allItems = await user.getItem({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  });
  const filtered = allItems
    .filter(item => item.UserItem.affinity === true)
    .map(item => {
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

  // we have to rearrange by order her because the Promise.all on line 113 rearranges the order again
  const sorted = likedItems
    .sort((a, b) => b.UserItem.updatedAt - a.UserItem.updatedAt)
    .map(item => {
      delete item.dataValues.UserItem;
      return item;
    });

  return sorted;
};

// userModel._getFriends = async accesstoken => {
//   const me = await db.User.findOne({
//     where: { accesstoken }
//   });

//   const user1Friends = await me.getUser_1();
//   const user2Friends = await me.getUser_2();
//   return user1Friends.concat(user2Friends);
// };

module.exports = userModel;
