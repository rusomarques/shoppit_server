const express = require('express');
const router = express.Router();
const usersController = require('./../controllers/usersController');
const categoriesController = require('./../controllers/categoriesController');
const itemsController = require('./../controllers/itemsController');
// to authenticate user identity
const authMiddleware = require('./../middlewares/authMiddleware');

// // (User) me controllers
// router
//   // get user info including liked categories
//   .get('/me', authMiddleware, usersController.getOwnInfo)
//   // include friends' liked categories?
//   .get('/me/friends', authMiddleware, usersController.getFriends)
//   .put(
//     '/me/categories/:category_id',
//     authMiddleware,
//     usersController.addCategory
//   )
//   .delete(
//     '/me/categories/:category_id',
//     authMiddleware,
//     usersController.removeCategory
//   );
// // .post('/me/friends', user.addFriend)
// // .delete('/me/friends', user.deleteFriend)

// // User controllers
// router
//   .post('/register', usersController.createUser)
//   .get('/users/:user_id/items', authMiddleware, usersController.getLikedItems);

// // Item controllers
// router
//   // get the array of recommended items for authenticated user
//   .get('/items/recommended', authMiddleware, itemsController.getRecommended)
//   .put(
//     '/items/:item_id/like/:value',
//     authMiddleware,
//     itemsController.setAffinity
//   );

// Category controllers
router
  .get('/categories', categoriesController.getAll)
  .get('/categories/:category_id/items', categoriesController.getAllItems);

module.exports = router;
