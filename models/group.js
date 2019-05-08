module.exports = (sequelize, DataTypes) => {
  const group = sequelize.define(
    "group",
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
            msg: "Foundation date can't be empty"
          }
        }
      },
      leaderId: DataTypes.INTEGER,
      assistantId: DataTypes.INTEGER
    },
    {}
  );
  // eslint-disable-next-line func-names
  group.associate = function(models) {
    group.hasMany(models.section, {
      onDelete: "CASCADE"
    });
  };
  return group;
};
