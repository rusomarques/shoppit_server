const db = require('./../schemas');

const itemModel = {};

itemModel.setItemsfromCategory = async bulk => {
  try {
    await db.Item.bulkCreate(bulk);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
};

itemModel.getAllbyCagtegory = async catId => {
  const items = await db.Item.findAll({
    raw: true,
    include: [
      {
        model: db.Category,
        as: 'category',
        where: {
          category_id: catId
        }
      }
    ]
  });
  console.log(items); // eslint-disable-line no-console
};

itemModel.getAllbyCagtegory(4);

itemModel.getRecommended = async () => {};

itemModel.setAffinity = async () => {};

itemModel.removeAffinity = async () => {};

// itemModel.getCategories();

module.exports = itemModel;
