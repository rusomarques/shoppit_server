'use strict';

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      category_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      category_name: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {}
  );
  Category.associate = function(models) {
    Category.belongsToMany(models.User, {
      through: models.UserCategory,
      as: 'user',
      foreignKey: 'category_id'
    });
    Category.belongsToMany(models.Item, {
      through: models.ItemCategory,
      as: 'item',
      foreignKey: 'category_id'
    });
  };
  return Category;
};
