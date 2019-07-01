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
    group.belongsTo(models.user, {
      targetKey: "id",
      foreignKey: "leaderId",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
      as: "leader"
      // enables group.getLeader()
    });
    group.belongsTo(models.user, {
      targetKey: "id",
      foreignKey: "assistantId",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
      as: "assistant"
      // enables group.getAssistant()
    });
    group.hasMany(models.groupEvent, {
      // Will add groupId to groupEvent model
      foreignKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      as: "events"
      // enables group.getEvents()
    });
    group.hasMany(models.userJoinGroupEvent, {
      // Will add groupId to userJoinGroupEvent model
      foreignKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      as: "participant"
      // enables group.getParticipants()
    });
    group.hasMany(models.groupTransaction, {
      foreignKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      as: "transaction"
      // enables group.getTransactions()
    });
  };
  return group;
};
