'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    'Item',
    {
      item_name: DataTypes.STRING,
      img_url: DataTypes.STRING,
      amazon_url: DataTypes.STRING,
      price: DataTypes.INTEGER
    },
    {}
  );
  Item.associate = function(models) {
    Item.belongsToMany(models.UserItem, {
      through: models.UserItem,
      as: 'user',
      foreignKey: 'item_id'
    });
  };
  return Item;
};
