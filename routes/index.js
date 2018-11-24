const express = require('express');
const router = express.Router();
const user = require('./controllers/user');
const categories = require('./controllers/categories');
const items = require('./controllers/items');

// add /auth/signin
// add /auth/signup
// add /auth/signout

// User controllers
router
  // get user info including liked categories
  .get('/user/me', user.getOwnInfo)
  // include friends' liked categories?
  .get('/user/me/friends', user.getFriends)
  .get('/user/:user_id/items', user.getLikedItems)
  .put('/user/categories/:category_id', user.addCategory)
  .delete('/user/categories/:category_id', user.removeCategory);
// .post('/user/me/friends', user.addFriend)
// .delete('/user/me/friends', user.deleteFriend)

// Item controllers
router
  // get the array of recommended items for authenticated user
  .get('/items/recommended', items.getRecommended)
  .put('/items/:item_id/like/:value', items.setAffinity)
  .delete('/items/:item_id/like/', items.removeAffinity);

// Category controllers
router
  // append category_id and send auth token through headers?
  .get('/categories', categories.getAll)
  .get('/categories/:category_id/items', categories.getAllItems);
