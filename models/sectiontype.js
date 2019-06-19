module.exports = (sequelize, DataTypes) => {
  const sectionType = sequelize.define(
    "sectionType",
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
      minAge: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Min age can't be empty"
          }
        }
      },
      maxAge: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Max age can't be empty"
          }
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description can't be empty"
          }
        }
      },
      gender: DataTypes.STRING
    },
    {}
  );
  // eslint-disable-next-line func-names
  sectionType.associate = function(models) {
    sectionType.hasMany(models.section, {
      onDelete: "CASCADE",
      foreignKey: "typeId"
    });
  };
  return sectionType;
};
