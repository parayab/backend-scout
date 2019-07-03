module.exports = (sequelize, DataTypes) => {
  const groupTransaction = sequelize.define(
    "groupTransaction",
    {
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Amount can't be empty"
          }
        }
      },
      date: {
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
      income: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Income can't be empty"
          }
        }
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "GroupId can't be empty"
          }
        }
      }
    },
    {}
  );
  groupTransaction.associate = models => {
    groupTransaction.belongsTo(models.group, {
      foreignKey: "groupId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      as: "group"
    });
  };
  return groupTransaction;
};
