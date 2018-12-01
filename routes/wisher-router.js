const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const categoriesController = require('../controllers/categoriesController');
const itemsController = require('../controllers/itemsController');
const authCheck = require('../middleware/authCheck');

// User controllers
router
  .get('/me', authCheck, usersController.getOwnInfo)
  .get('/me/friends', authCheck, usersController.getFriends)
  .put('/me/categories/:category_id', authCheck, usersController.addCategory)
  .delete(
    '/me/categories/:category_id',
    authCheck,
    usersController.removeCategory
  )
  // .put('/me/follow/:user_id', user.followFriend)
  // .delete('/me/follow/:user_id', user.unfollowFriend)
  .get('/users/:user_id/items', authCheck, usersController.getLikedItems);

// Item controllers
router
  .get('/items/recommended', authCheck, itemsController.getRecommended)
  .put('/items/:item_id/like/:value', authCheck, itemsController.setAffinity);

// Category controllers
router
  .get('/categories', authCheck, categoriesController.getAll)
  .get(
    '/categories/:category_id/items',
    authCheck,
    categoriesController.getAllItems
  );

module.exports = router;
