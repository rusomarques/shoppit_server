const express = require('express');
const router = express.Router();
const users = require('./../controllers/usersController');
const categories = require('./../controllers/categoriesController');
const items = require('./../controllers/itemsControllers');
// to authenticate user identity
const authMiddleware = require('./../middlewares/authMiddleware');

// me (users) controllers
router
  // get user info including liked categories
  .get('/me', authMiddleware, users.getOwnInfo)
  // include friends' liked categories?
  .get('/me/friends', authMiddleware, users.getFriends)
  .put('/me/categories/:category_id', authMiddleware, users.addCategory)
  .delete('/me/categories/:category_id', authMiddleware, users.removeCategory);
// .post('/me/friends', user.addFriend)
// .delete('/me/friends', user.deleteFriend)

// users controllers
router.get('/users/:user_id/items', authMiddleware, users.getLikedItems);

// Item controllers
router
  // get the array of recommended items for authenticated user
  .get('/items/recommended', authMiddleware, items.getRecommended)
  .put('/items/:item_id/like/:value', authMiddleware, items.setAffinity)
  .delete('/items/:item_id/like/', authMiddleware, items.removeAffinity);

// Category controllers
router
  // append category_id and send auth token through headers?
  .get('/categories', categories.getAll)
  .get('/categories/:category_id/items', categories.getAllItems);

module.exports = router;
