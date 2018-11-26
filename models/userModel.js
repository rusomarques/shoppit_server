const userModel = {};
const db = require('./../schemas');

userModel.createUser = async () => {
  // idk yet we gotta do something cool here
};

userModel.getOwnInfo = async user_id => {
  // get basic info
  const userInfo = await db.User.findOne({
    where: { user_id },
    // include user's liked categories
    include: [
      {
        model: db.Category,
        as: 'category',
        attributes: ['category_id', 'category_name'],
        required: false
      }
    ]
  });
  // let potato = userInfo.get({ plain: true });
  return userInfo.get({ plain: true });
  // console.log('hay', potato.category[0].UserCategory);

  // return object with basic info, categories
};

// userModel.getFriends = async user_id => {
//   // get array of friends' basic info
//   // get friends' liked categories
//   // return array of objects with friends' basic info, categories
// };

// userModel.addCategory = async (user_id, category_id) => {
//   // create UserCategory join entry
// };

// userModel.addCategory = async (user_id, category_id) => {
//   // delete UserCategory join entry
// };

// userModel.getLikedItems = async user_id => {};

userModel.getOwnInfo(1);

module.exports = userModel;
