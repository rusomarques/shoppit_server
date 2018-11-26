/* eslint-disable no-console */

const userModel = {};
const db = require('./../schemas');
const Op = require('Sequelize').Op;

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

  // return object with basic info, categories
  return userInfo.get({ plain: true });
};

userModel.getFriends = async user_id => {
  const friends = await db.User.findAll({
    include: [
      {
        association: db.Friend,
        // attributes: ['first_name'],
        where: {
          [Op.or]: [{ user_1_id: user_id }, { user_2_id: user_id }]
        }
      }
    ]
    // include: [
    //   {
    //     model: db.User,
    //     as: 'user'
    //   }
    // ]
  });
  console.log('my friends', friends);
  // get array of friends' basic info
  // get friends' liked categories
  // return array of objects with friends' basic info, categories
};

// userModel.addCategory = async (user_id, category_id) => {
//   // create UserCategory join entry
// };

// userModel.addCategory = async (user_id, category_id) => {
//   // delete UserCategory join entry
// };

// userModel.getLikedItems = async user_id => {
//   // add affinity && user relationship
// };

// userModel.getOwnInfo(1);
userModel.getFriends(1);

module.exports = userModel;
