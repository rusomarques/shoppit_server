'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserItem = sequelize.define(
    'UserItem',
    {
      affinity_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_id: {
        allowNull: false,
        type: DataTypes.STRING
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
