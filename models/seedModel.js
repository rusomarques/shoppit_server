const db = require('./../schemas');

const seedModel = {};

seedModel.seedItems = async bulk => {
  await db.Item.bulkCreate(bulk);
};

seedModel.seedCategories = async bulk => {
  await db.Category.bulkCreate(bulk);
};

// seed join table:
seedModel.seedItemCategories = async bulk => {
  await db.ItemCategory.bulkCreate(bulk);
};

module.exports = seedModel;

/* 
not able to bulkcreate with duplicates in postgres (today v.10.5)
if migrate to mysql the following would work:
db.Item.bulkCreate(bulk, { updateOnDuplicate: true })
*/
