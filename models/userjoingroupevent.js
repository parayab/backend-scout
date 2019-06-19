module.exports = (sequelize, DataTypes) => {
  const userJoinGroupEvent = sequelize.define(
    "userJoinGroupEvent",
    {
      groupEventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "GroupEventId can't be empty!!"
          }
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "UserId can't be empty"
          }
        }
      },
      scholarship: DataTypes.INTEGER
    },
    {}
  );
  userJoinGroupEvent.associate = models => {
    userJoinGroupEvent.belongsTo(models.groupEvent, {
      // Will add groupEventId to userJoinGroupEvent model
      foreignKey: "groupEventId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      as: "groupEvent"
      // enables groupEvent.getParticipants()
    });
    userJoinGroupEvent.belongsTo(models.user, {
      // Will add userId to userJoinGroupEvent model
      foreignKey: "userId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      as: "user"
      // enables groupEvent.getParticipants()
    });
  };
  return userJoinGroupEvent;
};
