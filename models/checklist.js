module.exports = (sequelize, DataTypes) => {
  const checklist = sequelize.define(
    "checklist",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name can't be empty"
          }
        }
      },
      groupEventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "GroupEventId can't be empty!!"
          }
        }
      },
      completed: DataTypes.BOOLEAN
    },
    {}
  );
  checklist.associate = models => {
    checklist.belongsTo(models.groupEvent, {
      // Will add groupEventId to userJoinGroupEvent model
      foreignKey: "groupEventId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      as: "groupEvent"
      // enables groupEvent.getParticipants()
    });
  };
  return checklist;
};
