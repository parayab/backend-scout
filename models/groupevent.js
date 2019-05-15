module.exports = (sequelize, DataTypes) => {
  const groupEvent = sequelize.define(
    "groupEvent",
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
      foundationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Date can't be empty"
          }
        }
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "GroupId can't be empty"
          }
        }
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Location can't be empty"
          }
        }
      },
      description: {
        type: DataTypes.TEXT
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Price type can't be empty"
          }
        }
      }
    },
    {}
  );
  groupEvent.associate = models => {
    groupEvent.hasMany(models.userJoinGroupEvent, {
      // Will add groupEventId to userJoinGroupEvent model
      foreignKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      as: "participant"
      // enables await groupEvent.getParticipant()
    });
  };
  return groupEvent;
};
