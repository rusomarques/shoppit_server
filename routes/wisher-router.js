const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const categoriesController = require('../controllers/categoriesController');
const itemsController = require('../controllers/itemsController');

// (User) me controllers
router
  .get('/me', usersController.getOwnInfo)
  .get('/me/friends', usersController.getFollowing)
  .put('/me/categories/:category_id', usersController.addCategory)
  .delete('/me/categories/:category_id', usersController.removeCategory)
  // .put('/me/follow/:user_id', user.followFriend)
  // .delete('/me/follow/:user_id', user.unfollowFriend)
  .get('/users/:user_id/items', usersController.getLikedItems);

// Item controllers
router
  // get the array of recommended items for authenticated user
  .get('/items/recommended', itemsController.getRecommended)
  .put('/items/:item_id/like/:value', itemsController.setAffinity);

// Category controllers
router
  .get('/categories', categoriesController.getAll)
  .get('/categories/:category_id/items', categoriesController.getAllItems);

module.exports = router;
