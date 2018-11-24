'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserItem = sequelize.define(
    'UserItem',
    {
      user_id: DataTypes.INTEGER,
      item_id: DataTypes.INTEGER,
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
