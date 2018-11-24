'use strict';
module.exports = (sequelize, DataTypes) => {
  const ItemCategory = sequelize.define(
    'ItemCategory',
    {
      item_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER
    },
    {}
  );
  ItemCategory.associate = function(models) {
    ItemCategory.belongsTo(models.Item, { as: 'item', foreignKey: 'item_id' });
    ItemCategory.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'category_id'
    });
  };
  return ItemCategory;
};
