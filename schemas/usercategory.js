'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserCategory = sequelize.define(
    'UserCategory',
    {
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      category_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    {}
  );
  UserCategory.associate = function(models) {
    UserCategory.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
    UserCategory.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'category_id'
    });
  };
  return UserCategory;
};
