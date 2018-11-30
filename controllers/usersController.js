/* eslint-disable no-console */
const usersController = {};
const User = require('./../models/userModel');

usersController.getOwnInfo = async (req, res) => {
  // authentication through headers?
  try {
    const { user_id } = req.headers;
    const info = await User.getOwnInfo(user_id);
    res.status(200).send(info);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

usersController.getFollowing = async (req, res) => {
  try {
    const { user_id } = req.headers;
    const friends = await User.getFollowing(user_id);
    res.status(200).send(friends);
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
    res.status(201).send(category);
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
    res.status(200).send(items);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

module.exports = usersController;
