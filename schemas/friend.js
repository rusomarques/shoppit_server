'use strict';
module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define(
    'Friend',
    {
      user_1_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      user_2_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
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
