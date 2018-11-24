'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gender: DataTypes.STRING,
      birthday: DataTypes.DATE,
      avatar_url: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  User.associate = function(models) {
    User.belongsToMany(models.User, {
      through: models.Friend,
      as: 'user_1',
      foreignKey: 'user_1_id'
    });
    User.belongsToMany(models.User, {
      through: models.Friend,
      as: 'user_2',
      foreignKey: 'user_2_id'
    });
    User.belongsToMany(models.UserItem, {
      through: models.UserItem,
      as: 'item',
      foreignKey: 'user_id'
    });
    User.belongsToMany(models.UserCategory, {
      through: models.UserCategory,
      as: 'category',
      foreignKey: 'user_id'
    });
  };
  return User;
};
