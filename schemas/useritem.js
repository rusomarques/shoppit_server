'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserItem = sequelize.define(
    'UserItem',
    {
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      item_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      affinity: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {}
  );
  UserItem.associate = function(models) {
    UserItem.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
    UserItem.belongsTo(models.Item, { as: 'item', foreignKey: 'item_id' });
  };
  return UserItem;
};
