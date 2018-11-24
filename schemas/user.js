'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      gender: DataTypes.STRING,
      birthday: DataTypes.DATE,
      avatar_url: DataTypes.STRING
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
  };
  return User;
};
