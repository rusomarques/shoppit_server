'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      gender: DataTypes.STRING,
      birthday: DataTypes.DATE,
      avatar_url: DataTypes.STRING
    },
    {}
  );
  User.associate = function() {
    // associations can be defined here
  };
  return User;
};
