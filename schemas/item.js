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
  Item.associate = function() {
    // associations can be defined here
  };
  return Item;
};
