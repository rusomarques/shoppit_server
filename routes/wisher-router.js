const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const categoriesController = require('../controllers/categoriesController');
const itemsController = require('../controllers/itemsController');
const authCheck = require('../middleware/authCheck');

// (User) me controllers
router
  // get user info including liked categories
  .get('/me', authCheck, usersController.getOwnInfo)
  // include friends' liked categories?
  .get('/me/friends', authCheck, usersController.getFriends)
  .put('/me/categories/:category_id', authCheck, usersController.addCategory)
  .delete(
    '/me/categories/:category_id',
    authCheck,
    usersController.removeCategory
  );
// .post('/me/friends', user.addFriend)
// .delete('/me/friends', user.deleteFriend)

// User controllers
router.get('/users/:user_id/items', authCheck, usersController.getLikedItems);

// Item controllers
router
  // get the array of recommended items for authenticated user
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
