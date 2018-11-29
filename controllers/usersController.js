/* eslint-disable no-console */
const usersController = {};
const User = require('./../models/userModel');

usersController.getOwnInfo = async (req, res) => {
  // authentication through headers?
  try {
    const { user_id } = req.headers;
    const info = await User.getOwnInfo(user_id);
    res.send(info).sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

usersController.getFriends = async (req, res) => {
  try {
    const { user_id } = req.headers;
    const friends = await User.getFriends(user_id);
    res.send(friends).sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

usersController.addCategory = async (req, res) => {
  try {
    const { user_id } = req.headers;
    const category_id = req.params.category_id;
    const category = await User.addCategory(user_id, category_id);
    res.send(category).sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
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
    res.sendStatus(400);
  }
};

usersController.getLikedItems = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const items = await User.getLikedItems(user_id);
    res.send(items).sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

module.exports = usersController;
