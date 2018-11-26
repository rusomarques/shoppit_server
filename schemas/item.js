'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    'Item',
    {
      // item_id: {
      //   allowNull: false,
      //   type: DataTypes.INTEGER
      // },
      item_name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      img_url: {
        allowNull: false,
        type: DataTypes.STRING
      },
      amazon_url: {
        allowNull: false,
        type: DataTypes.STRING
      },
      price: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {}
  );
  Item.associate = function(models) {
    Item.belongsToMany(models.User, {
      through: models.UserItem,
      as: 'user',
      foreignKey: 'item_id'
    });
    Item.belongsToMany(models.Category, {
      through: models.ItemCategory,
      as: 'category',
      foreignKey: 'item_id'
    });
  };
  return Item;
};
