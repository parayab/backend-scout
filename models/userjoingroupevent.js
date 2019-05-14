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
  userJoinGroupEvent.associate = () => {};
  return userJoinGroupEvent;
};
