module.exports = (sequelize, DataTypes) => {
  const sectionEvent = sequelize.define(
    "sectionEvent",
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
      sectionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "SectionId can't be empty"
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
  sectionEvent.associate = models => {
    /*
    sectionEvent.hasMany(models.userJoinGroupEvent, {
      // Will add sectionEventId to userJoinGroupEvent model
      foreignKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      as: "participant"
      // enables sectionEvent.getParticipants()
    });
    */
  };
  return sectionEvent;
};
