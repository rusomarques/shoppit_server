const db = require('./../schemas');

const seedModel = {};

seedModel.setItemsfromCategory = async bulk => {
  await db.Item.bulkCreate(bulk);
};

seedModel.setCategories = async bulk => {
  await db.Category.bulkCreate(bulk);
};

module.exports = seedModel;

/* 
not able to bulkcreate with duplicates in postgres (today v.10.5)
if migrate to mysql the following would work:
db.Item.bulkCreate(bulk, { updateOnDuplicate: true })
*/
