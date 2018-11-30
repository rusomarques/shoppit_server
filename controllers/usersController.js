/* eslint-disable no-console */
const usersController = {};
const User = require('./../models/userModel');

usersController.getOwnInfo = async (req, res) => {
  try {
    const { accesstoken } = req.headers;
    const info = await User.getOwnInfo(accesstoken);
    res.status(200).send(info);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

usersController.getFollowing = async (req, res) => {
  try {
    const { accesstoken } = req.headers;
    const friends = await User.getFollowing(accesstoken);
    res.status(200).send(friends);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

usersController.addCategory = async (req, res) => {
  try {
    const { accesstoken } = req.headers;
    const category_id = req.params.category_id;
    const category = await User.addCategory(accesstoken, category_id);
    res.status(201).send(category);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

usersController.removeCategory = async (req, res) => {
  try {
    const { accesstoken } = req.headers;
    const category_id = req.params.category_id;
    await User.removeCategory(accesstoken, category_id);
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
