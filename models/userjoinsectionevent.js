module.exports = (sequelize, DataTypes) => {
  const userJoinSectionEvent = sequelize.define(
    "userJoinSectionEvent",
    {
      sectionEventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "SectionEventId can't be empty!!"
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
  userJoinSectionEvent.associate = models => {
    userJoinSectionEvent.belongsTo(models.sectionEvent, {
      // Will add sectionEventId to userJoinSectionEvent model
      foreignKey: "id",
      onDelete: "set null",
      onUpdate: "CASCADE",
      as: "sectionEvent"
      // enables sectionEvent.getParticipants()
    });
    userJoinSectionEvent.belongsTo(models.user, {
      // Will add sectionEventId to userJoinSectionEvent model
      foreignKey: "id",
      onDelete: "set null",
      onUpdate: "CASCADE",
      as: "user"
      // enables sectionEvent.getParticipants()
    });
  };
  return userJoinSectionEvent;
};
