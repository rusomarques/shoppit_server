const db = require('./../schemas');

const seedModel = {};

seedModel.setItemsfromCategory = async bulk => {
  try {
    await db.Item.bulkCreate(bulk);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
};

module.exports = seedModel;
