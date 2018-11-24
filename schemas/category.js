'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      category_name: DataTypes.STRING
    },
    {}
  );
  Category.associate = function() {
    // associations can be defined here
  };
  return Category;
};
