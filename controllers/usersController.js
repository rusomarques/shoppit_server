/* eslint-disable no-console */
const usersController = {};
// const User = require('./../models/userModel');

usersController.getOwnInfo = async (req, res) => {
  // do stuff;
  console.log('usersController.getOwnInfo firing', req, res);
};

usersController.getFriends = async (req, res) => {
  // do stuff;
  console.log('usersController.getFriends firing', req, res);
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
