/* eslint-disable no-console */
const usersController = {};
const User = require('./../models/userModel');

usersController.createUser = async (req, res) => {
  // do stuff;
  console.log('usersController.createUser firing', req, res);
};

usersController.getOwnInfo = async (req, res) => {
  // authentication through headers?
  try {
    const { user_id } = req.headers;
    const info = await User.getOwnInfo(user_id);
    res.send(info).sendStatus(200);
  } catch (e) {
    console.log(e);
  }
};

usersController.getFriends = async (req, res) => {
  try {
    const { user_id } = req.headers;
    const friends = await User.getFriends(user_id);
    res.send(friends).sendStatus(200);
  } catch (e) {
    console.log(e);
  }
};

usersController.addCategory = async (req, res) => {
  // do stuff;
  console.log('usersController.addCategory firing', req, res);
};

usersController.removeCategory = async (req, res) => {
  // do stuff;
  console.log('usersController.removeCategory firing', req, res);
};

usersController.getLikedItems = async (req, res) => {
  // do stuff;
  console.log('usersController.getLikedItems firing', req, res);
};

module.exports = usersController;
