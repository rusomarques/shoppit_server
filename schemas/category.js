'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      category_name: DataTypes.STRING
    },
    {}
  );
  Category.associate = function(models) {
    Category.belongsToMany(models.UserCategory, {
      through: models.UserCategory,
      as: 'user',
      foreignKey: 'category_id'
    });
  };
  return Category;
};
