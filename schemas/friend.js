'use strict';
module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define(
    'Friend',
    {
      friendship_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_1_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'user_id'
        }
      },
      user_2_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'user_id'
        }
      }
    },
    {}
  );
  Friend.associate = function(models) {
    Friend.belongsTo(models.User, { as: 'user_1', foreignKey: 'user_1_id' });
    Friend.belongsTo(models.User, { as: 'user_2', foreignKey: 'user_2_id' });
  };
  return Friend;
};
