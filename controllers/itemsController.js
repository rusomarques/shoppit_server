/* eslint-disable no-console */
const itemsController = {};
// const Item = require('./../models/itemModel');

itemsController.getRecommended = async (req, res) => {
  // do stuff;
  console.log('itemsController.getRecommended firing', req, res);
};

itemsController.setAffinity = async (req, res) => {
  // do stuff;
  console.log('itemsController.setAffinity firing', req, res);
};

itemsController.removeAffinity = async (req, res) => {
  // do stuff;
  console.log('itemsController.removeAffinity firing', req, res);
};

module.exports = itemsController;
