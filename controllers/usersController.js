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
  try {
    const { user_id } = req.headers;
    const category_id = req.params.category_id;
    await User.addCategory(user_id, category_id);
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
  }
};

usersController.removeCategory = async (req, res) => {
  try {
    const { user_id } = req.headers;
    const category_id = req.params.category_id;
    await User.removeCategory(user_id, category_id);
    res.sendStatus(204);
  } catch (e) {
    console.log(e);
  }
};

usersController.getLikedItems = async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const likedItems = { user_id };
    likedItems.likes = await User.getLikedItems(user_id);
    res.send(likedItems).sendStatus(200);
  } catch (e) {
    console.log(e);
  }
};

module.exports = usersController;
