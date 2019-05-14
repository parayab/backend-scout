'use strict';
module.exports = (sequelize, DataTypes) => {
  const userJoinGroupEvent = sequelize.define('userJoinGroupEvent', {
    groupEventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    scholarship: DataTypes.INTEGER
  }, {});
  userJoinGroupEvent.associate = function(models) {
    // associations can be defined here
  };
  return userJoinGroupEvent;
};