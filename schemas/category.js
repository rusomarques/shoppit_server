'use strict';

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      category_name: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {}
  );
  Category.associate = function(models) {
    Category.belongsToMany(models.UserCategory, {
      through: models.UserCategory,
      as: 'user',
      foreignKey: 'category_id'
    });
    Category.belongsToMany(models.ItemCategory, {
      through: models.ItemCategory,
      as: 'item',
      foreignKey: 'item_id'
    });
  };
  return Category;
};
