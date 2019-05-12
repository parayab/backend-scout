module.exports = (sequelize, DataTypes) => {
  const section = sequelize.define(
    "section",
    {
      leaderId: DataTypes.INTEGER,
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name can't be empty"
          }
        }
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Group can't be empty"
          }
        }
      },
      typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Section type can't be empty"
          }
        }
      }
    },
    {}
  );
  section.associate = function(models) {
    section.belongsTo(models.group, {
      foreignKey: "groupId",
      as: "group"
    });
    section.hasMany(models.user, {
      onDelete: "CASCADE"
    });
    section.belongsTo(models.sectionType, {
      foreignKey: "typeId",
      as: "type"
    });
    section.belongsTo(models.user, {
      foreignKey: "leaderId",
      as: "leader"
    });
  };
  return section;
};
